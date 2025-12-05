


    <script>
    import { fade, fly } from 'svelte/transition';
    import { afterUpdate } from 'svelte';
    // Asegúrate de que este componente exista en esta ruta
    import Logo from '../../../components/Logo.svelte';
    export let data;
    const { order } = data;

    // --- CONFIGURACIÓN ---
    const MAX_QUESTIONS = 10; 

    const statusConfig = {
        'pending': { label: 'Recepción de Datos', desc: 'Hemos recibido tu solicitud. El Concierge está listo para entrevistarte.', step: 1 },
        'processing': { label: 'Investigación en Archivos', desc: 'Nuestros historiadores están consultando los registros físicos.', step: 2 },
        'completed': { label: 'Legado Revelado', desc: 'Tu investigación está completa. Descarga tus archivos.', step: 3 }
    };

    $: currentStatus = statusConfig[order.investigationStatus] || statusConfig['pending'];
    
    // --- CHAT (CORREGIDO) ---
    // Si hay historial guardado, lo usamos. Si no, iniciamos con el saludo.
    let chatMessages = order.chatHistory && order.chatHistory.length > 0
        ? order.chatHistory
        : [{ role: 'ai', text: `Bienvenido a tu Bóveda, ${order.customerName}. Soy el guardián de tu registro.` }];

    let newMessage = '';
    let isTyping = false;
    let chatContainer;

    // CÁLCULO DE CRÉDITOS
    $: userQuestionsCount = chatMessages.filter(msg => msg.role === 'user').length;
    $: remainingCredits = Math.max(0, MAX_QUESTIONS - userQuestionsCount);
    $: isLimitReached = remainingCredits === 0;

    const exampleQuestions = [
        "¿Cuál es el origen geográfico de mi apellido?",
        "¿Qué significan los símbolos de mi escudo?",
        "¿Hay registros de mi linaje en la nobleza?"
    ];

    function sendQuickReply(text) {
        if (isLimitReached) return;
        newMessage = text;
        sendMessage();
    }

    async function sendMessage() {
        if (isLimitReached) {
            alert("Has utilizado todas tus consultas disponibles por hoy.");
            return;
        }
        if (!newMessage.trim()) return;
        
        const userText = newMessage;
        // Actualización optimista (se muestra inmediato)
        chatMessages = [...chatMessages, { role: 'user', text: userText }];
        newMessage = '';
        isTyping = true;

        const isBespoke = order.items.some(item => item.serviceLevel === 'bespoke');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({
                    message: userText,
                    history: chatMessages,
                    orderId: order._id, // Enviamos ID para guardar en Sanity
                    context: {
                        customerName: order.customerName,
                        status: order.investigationStatus,
                        linajeVinculado: order.linajeVinculado,
                        isBespoke: isBespoke
                    }
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (data.text && data.text.includes("[ERROR TÉCNICO]")) {
                throw new Error(data.text);
            }

            chatMessages = [...chatMessages, { role: 'ai', text: data.text }];

        } catch (e) {
            console.error(e);
            chatMessages = [...chatMessages, { 
                role: 'system-error', 
                text: "Hemos perdido conexión momentánea con los archivos." 
            }];
        } finally {
            isTyping = false;
        }
    }

    afterUpdate(() => {
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    });
</script>

<svelte:head>
    <title>Bóveda Privada de {order.customerName} | 1egacy</title>

    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="vault-container">
    
    <header class="vault-header">
        <div class="header-left">
            <a href="/" class="btn-exit">← Salir</a>
            <div class="logo-wrapper">
                <Logo />
            </div>
        </div>
        <div class="security-badge">🔒 Acceso Seguro</div>
    </header>

    <main class="vault-grid">
        
        <section class="status-panel" in:fade={{ duration: 800 }}>
            <h1 class="welcome-title">Expediente: <br><span class="text-dorado">{order.customerName}</span></h1>
            <div class="order-info">
                <p><strong>ID de Orden:</strong> #{order._id.slice(-8).toUpperCase()}</p>
                <p><strong>Fecha de Inicio:</strong> {order.orderDate ? new Date(order.orderDate).toLocaleDateString('es-MX') : 'Pendiente'}</p>
            </div>
            <div class="timeline">
                <div class="step {currentStatus.step >= 1 ? 'active' : ''}">
                    <div class="dot"></div><div class="info"><h3>Recepción</h3></div>
                </div>
                <div class="line {currentStatus.step >= 2 ? 'filled' : ''}"></div>
                <div class="step {currentStatus.step >= 2 ? 'active' : ''}">
                    <div class="dot"></div><div class="info"><h3>Investigación</h3></div>
                </div>
                <div class="line {currentStatus.step >= 3 ? 'filled' : ''}"></div>
                <div class="step {currentStatus.step >= 3 ? 'active' : ''}">
                    <div class="dot"></div><div class="info"><h3>Entrega</h3></div>
                </div>
            </div>
            <div class="current-status-card">
                <h2>ESTADO ACTUAL</h2>
                <div class="status-pulse">
                    <span class="pulse-dot"></span>
                    <h3>{currentStatus.label}</h3>
                </div>
                <p>{currentStatus.desc}</p>
            </div>
        </section>

        <section class="concierge-panel" in:fly={{ x: 50, duration: 800, delay: 200 }}>
            
            {#if order.investigationStatus === 'pending'}
                <div class="waiting-mode">
                    <div class="icon-lock">⏳</div>
                    <h3 class="waiting-title">Los Archivos Reales se han abierto</h3>
                    <p class="waiting-text">El Artesano ha recibido tu solicitud y ha descendido a la biblioteca para iniciar el rastreo de tu linaje.</p>
                    <div class="status-box"><span class="status-label">Tiempo estimado:</span><span class="status-time">24 Horas</span></div>
                </div>
            {:else}
                
                <div class="chat-header">
                    <img src="/escudo_chat_1egacy.webp" alt="El Artesano" class="avatar-img">
                    <div class="flex-grow">
                        <h3>El Artesano</h3>
                        <span class="status-text">
                            {isTyping ? 'Escribiendo...' : 'En línea - Archivista'}
                        </span>
                    </div>
                    
                    <div class="credits-badge {remainingCredits === 0 ? 'zero' : ''}">
                        <span class="count">{remainingCredits}</span>
                        <span class="label">Consultas</span>
                    </div>
                </div>

                <div class="chat-window" bind:this={chatContainer}>
                    {#each chatMessages as msg}
                        {#if msg.role === 'system-error'}
                            <div class="message error-msg">
                                <p>{msg.text}</p>
                                <a href="mailto:soporte@somos1egacy.com" class="btn-support">Contactar Soporte</a>
                            </div>
                        {:else}
                            <div class="message {msg.role === 'user' ? 'user-msg' : 'ai-msg'}">
                                <p>{msg.text}</p>
                            </div>
                        {/if}
                    {/each}
                    {#if isTyping}
                        <div class="message ai-msg typing-indicator"><span></span><span></span><span></span></div>
                    {/if}
                    
                    {#if isLimitReached}
                        <div class="limit-reached-msg" in:fade>
                            <p>Has alcanzado el límite de consultas.</p>
                            <span class="sub-text">El Artesano se retira a investigar tus datos.</span>
                        </div>
                    {/if}
                </div>

                {#if !isTyping && !isLimitReached}
                <div class="quick-replies">
                    {#each exampleQuestions as question}
                        <button class="reply-chip" on:click={() => sendQuickReply(question)}>{question}</button>
                    {/each}
                </div>
                {/if}

                <div class="chat-input-area {isLimitReached ? 'locked' : ''}">
                    <input 
                        type="text" 
                        bind:value={newMessage} 
                        on:keydown={(e) => e.key === 'Enter' && sendMessage()} 
                        placeholder={isLimitReached ? "Has alcanzado el límite de consultas incluidas en tu investigación." : "Escribe un mensaje..."} 
                        disabled={isTyping || isLimitReached}
                    >
                    <button on:click={sendMessage} disabled={isTyping || isLimitReached}>
                        {isLimitReached ? '🔒' : 'Enviar'}
                    </button>
                </div>
            {/if}
        </section>

    </main>
</div>

<style>
    /* --- OCULTAR MENÚ SUPERIOR GLOBAL --- */
    :global(header), :global(nav.mobile-nav), :global(.mobile-nav-overlay) {
        display: none !important;
    }

    /* --- CONFIGURACIÓN GLOBAL --- */
    :global(body) { background-color: #0a0a0a; color: #e0e0e0; margin: 0; font-family: 'Source Sans 3', sans-serif; overflow: hidden; height: 100vh; }
    .vault-container { height: 100vh; display: flex; flex-direction: column; background: radial-gradient(circle at top right, #1a1a1a 0%, #000000 80%); }
    
    /* --- HEADER BÓVEDA --- */
    .vault-header { flex-shrink: 0; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; background: #0a0a0a; z-index: 100; }
    .header-left { display: flex; align-items: center; gap: 25px; }
    .btn-exit { text-decoration: none; color: #666; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; transition: color 0.3s; font-weight: bold; }
    .btn-exit:hover { color: #fff; }
    .logo-wrapper { width: 120px; display: flex; align-items: center; }
    .security-badge { font-size: 0.75rem; color: #4CAF50; background: rgba(76, 175, 80, 0.1); padding: 4px 12px; border-radius: 20px; border: 1px solid #4CAF50; }
    
    /* --- GRID --- */
    .vault-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 0; flex-grow: 1; overflow: hidden; height: 100%; }

    /* --- PANEL IZQUIERDO --- */
    .status-panel { padding: 60px; border-right: 1px solid #222; display: flex; flex-direction: column; justify-content: center; overflow-y: auto; }
    .welcome-title { font-family: 'Playfair Display', serif; font-size: 3rem; line-height: 1.1; margin-bottom: 30px; }
    .text-dorado { color: #c0a062; }
    .order-info { font-size: 0.9rem; color: #666; margin-bottom: 50px; }
    .timeline { display: flex; align-items: center; justify-content: space-between; margin-bottom: 60px; position: relative; max-width: 400px; }
    .step { position: relative; z-index: 2; text-align: center; }
    .dot { width: 15px; height: 15px; background: #333; border-radius: 50%; border: 2px solid #000; transition: all 0.5s; }
    .step.active .dot { background: #c0a062; box-shadow: 0 0 15px rgba(192, 160, 98, 0.5); }
    .info h3 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; color: #555; transition: color 0.5s; }
    .step.active .info h3 { color: #fff; }
    .line { flex-grow: 1; height: 2px; background: #333; margin: 0 10px; margin-bottom: 20px; }
    .line.filled { background: #c0a062; }
    .current-status-card { background: rgba(255,255,255,0.03); padding: 30px; border-radius: 8px; border: 1px solid #333; }
    .current-status-card h2 { font-size: 0.8rem; color: #666; letter-spacing: 2px; margin-bottom: 15px; }
    .status-pulse { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .status-pulse h3 { font-size: 1.5rem; margin: 0; color: #fff; font-family: 'Playfair Display', serif; }
    .pulse-dot { width: 10px; height: 10px; background: #4CAF50; border-radius: 50%; animation: pulse 2s infinite; }

    /* --- PANEL DERECHO --- */
    .concierge-panel { background: #0e0e0e; display: flex; flex-direction: column; border-left: 1px solid #222; height: 100%; overflow: hidden; }
    .chat-header { flex-shrink: 0; padding: 20px; border-bottom: 1px solid #222; display: flex; align-items: center; gap: 15px; background: #111; }
    .avatar-img { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid #c0a062; }
    .chat-header h3 { margin: 0; font-size: 1rem; color: #fff; }
    .status-text { font-size: 0.75rem; color: #4CAF50; }
    .flex-grow { flex-grow: 1; }

    .credits-badge { background: rgba(255,255,255,0.1); border: 1px solid #444; padding: 5px 12px; border-radius: 20px; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
    .credits-badge.zero { border-color: #666; opacity: 0.5; }
    .credits-badge .count { font-weight: bold; color: #c0a062; font-size: 1.1rem; }
    .credits-badge .label { font-size: 0.7rem; text-transform: uppercase; color: #aaa; }

    .chat-window { flex-grow: 1; padding: 30px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; scroll-behavior: smooth; }
    .message { padding: 12px 18px; font-size: 0.95rem; line-height: 1.5; max-width: 80%; width: fit-content; word-wrap: break-word; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
    .ai-msg { background: #1f1f1f; color: #e0e0e0; align-self: flex-start; border-radius: 12px 12px 12px 0; border: 1px solid #333; }
    .user-msg { background: #6e4c06; color: #000000; align-self: flex-end; border-radius: 12px 12px 0 12px; font-weight: 500; }
    .error-msg { background: rgba(255, 100, 100, 0.1); border: 1px solid #ff4444; color: #ffaaaa; align-self: center; text-align: center; width: 100%; border-radius: 8px; }
    .btn-support { display: inline-block; margin-top: 10px; background: #ff4444; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 0.8rem; font-weight: bold; }
    
    .typing-indicator { display: flex; gap: 5px; padding: 15px 20px; width: fit-content; align-self: flex-start; border-radius: 12px 12px 12px 0; background: #1f1f1f; border: 1px solid #333; }
    .typing-indicator span { width: 8px; height: 8px; background: #666; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
    .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

    .limit-reached-msg { text-align: center; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 8px; margin-top: 20px; border: 1px dashed #444; }
    .limit-reached-msg p { color: #c0a062; font-weight: bold; margin: 0 0 5px 0; }
    .limit-reached-msg .sub-text { font-size: 0.8rem; color: #666; font-style: italic; }

    .quick-replies { padding: 10px 20px; display: flex; gap: 10px; overflow-x: auto; background: #111; border-top: 1px solid #222; scrollbar-width: none; flex-shrink: 0; }
    .reply-chip { background: rgba(255, 255, 255, 0.05); border: 1px solid #333; color: #aaa; padding: 8px 16px; border-radius: 20px; font-size: 0.75rem; cursor: pointer; white-space: nowrap; transition: all 0.3s ease; }
    .reply-chip:hover { background: #c0a062; color: #000; transform: translateY(-2px); }

    .chat-input-area { flex-shrink: 0; padding: 20px; border-top: 1px solid #222; display: flex; gap: 10px; background: #111; transition: opacity 0.3s; }
    .chat-input-area.locked { opacity: 0.5; pointer-events: none; }
    .chat-input-area input { flex-grow: 1; background: #000; border: 1px solid #333; padding: 15px; color: #fff; border-radius: 4px; outline: none; }
    .chat-input-area input:focus { border-color: #c0a062; }
    .chat-input-area button { background: #c0a062; border: none; padding: 0 25px; color: #000; font-weight: bold; border-radius: 4px; cursor: pointer; text-transform: uppercase; font-size: 0.8rem; }
    .chat-input-area button:disabled { background: #333; color: #666; cursor: not-allowed; }

    .waiting-mode { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; background: radial-gradient(circle at center, #151515 0%, #0a0a0a 100%); }
    .icon-lock { font-size: 4rem; margin-bottom: 20px; opacity: 0.8; }
    .waiting-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #c0a062; margin-bottom: 15px; }
    .waiting-text { color: #888; font-size: 1rem; max-width: 400px; line-height: 1.6; margin-bottom: 30px; }
    .status-box { border: 1px solid #333; padding: 15px 25px; border-radius: 4px; background: rgba(255,255,255,0.03); margin-bottom: 30px; }
    .status-label { display: block; font-size: 0.7rem; text-transform: uppercase; color: #666; letter-spacing: 1px; margin-bottom: 5px; }
    .status-time { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #fff; }

    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); background: #c0a062; } }
    @keyframes pulse { 0% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); } 70% { opacity: 1; box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); } 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); } }

    @media (max-width: 900px) {
        .vault-container { height: 100dvh; }
        .vault-grid { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
        .status-panel { display: none; } 
        .concierge-panel { height: 100%; border-left: none; }
    }
</style>