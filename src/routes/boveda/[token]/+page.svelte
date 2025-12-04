<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    export let data;
    const { order } = data;

    // Mapeo de estatus a textos elegantes
    const statusConfig = {
        'pending': { label: 'Recepción de Datos', desc: 'Hemos recibido tu solicitud. El Concierge está listo para entrevistarte.', step: 1 },
        'processing': { label: 'Investigación en Archivos', desc: 'Nuestros historiadores están consultando los registros físicos.', step: 2 },
        'completed': { label: 'Legado Revelado', desc: 'Tu investigación está completa. Descarga tus archivos.', step: 3 }
    };

    $: currentStatus = statusConfig[order.investigationStatus] || statusConfig['pending'];
    
    // Estado del Chat (Simulado por ahora)
    let chatMessages = [
        { role: 'ai', text: `Bienvenido a tu Bóveda, ${order.customerName}. Soy el guardián de tu registro.` },
        { role: 'ai', text: 'Mientras iniciamos la investigación, ¿podrías contarme si conoces el nombre de tu bisabuelo paterno o el pueblo de origen de tu familia?' }
    ];
    let newMessage = '';

    function sendMessage() {
        if (!newMessage.trim()) return;
        // Agregamos mensaje del usuario
        chatMessages = [...chatMessages, { role: 'user', text: newMessage }];
        const tempMsg = newMessage;
        newMessage = '';
        
        // Aquí conectaríamos con tu API de IA real más adelante
        setTimeout(() => {
            chatMessages = [...chatMessages, { role: 'ai', text: 'Gracias. He guardado este dato en tu expediente. ¿Hay alguna otra historia familiar que recuerdes?' }];
        }, 1500);
    }
</script>

<svelte:head>
    <title>Bóveda Privada de {order.customerName} | 1egacy</title>
</svelte:head>

<div class="vault-container">
    <header class="vault-header">
        <div class="logo-small">1EGACY</div>
        <div class="security-badge">🔒 Acceso Seguro Concedido</div>
    </header>

    <main class="vault-grid">
        
        <section class="status-panel" in:fade={{ duration: 800 }}>
            <h1 class="welcome-title">Expediente: <br><span class="text-dorado">{order.customerName}</span></h1>
            
            <div class="order-info">
                <p><strong>ID de Orden:</strong> #{order._id.slice(-8).toUpperCase()}</p>
                <p><strong>Fecha de Inicio:</strong> {new Date(order.orderDate).toLocaleDateString('es-MX')}</p>
            </div>

            <div class="timeline">
                <div class="step {currentStatus.step >= 1 ? 'active' : ''}">
                    <div class="dot"></div>
                    <div class="info">
                        <h3>Recepción</h3>
                    </div>
                </div>
                <div class="line {currentStatus.step >= 2 ? 'filled' : ''}"></div>
                <div class="step {currentStatus.step >= 2 ? 'active' : ''}">
                    <div class="dot"></div>
                    <div class="info">
                        <h3>Investigación</h3>
                    </div>
                </div>
                <div class="line {currentStatus.step >= 3 ? 'filled' : ''}"></div>
                <div class="step {currentStatus.step >= 3 ? 'active' : ''}">
                    <div class="dot"></div>
                    <div class="info">
                        <h3>Entrega</h3>
                    </div>
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
            <div class="chat-header">
                <div class="avatar">AI</div>
                <div>
                    <h3>El Artesano</h3>
                    <span class="status-text">En línea - Archivista</span>
                </div>
            </div>

            <div class="chat-window">
                {#each chatMessages as msg}
                    <div class="message {msg.role === 'user' ? 'user-msg' : 'ai-msg'}">
                        <p>{msg.text}</p>
                    </div>
                {/each}
            </div>

            <div class="chat-input-area">
                <input 
                    type="text" 
                    bind:value={newMessage} 
                    on:keydown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Escribe un dato sobre tu linaje..."
                >
                <button on:click={sendMessage}>Enviar</button>
            </div>
        </section>

    </main>
</div>

<style>
  /* 1. BLOQUEO GLOBAL DEL SCROLL DE LA PÁGINA */
    :global(body) { 
        background-color: #0a0a0a; 
        color: #e0e0e0; 
        margin: 0; 
        font-family: 'Source Sans 3', sans-serif; 
        overflow: hidden; /* <--- CLAVE: Evita que la página entera haga scroll */
        height: 100vh;
    }
    
    /* 2. CONTENEDOR PRINCIPAL FIJO */
    .vault-container { 
        height: 90vh; /* Altura fija exacta del viewport */
        display: flex; 
        flex-direction: column; 
        background: radial-gradient(circle at top right, #1a1a1a 0%, #000000 80%); 
    }

    /* 3. HEADER (No se encoge) */
    .vault-header { 
        flex-shrink: 0; /* Evita que se aplaste */
        padding: 20px 40px; 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        border-bottom: 1px solid #222; 
        background: #0a0a0a; /* Fondo sólido para que no se transparente */
        z-index: 10;
    }
    
    .logo-small { font-family: 'Playfair Display', serif; font-weight: bold; letter-spacing: 2px; color: #fff; }
    .security-badge { font-size: 0.75rem; color: #4CAF50; background: rgba(76, 175, 80, 0.1); padding: 4px 12px; border-radius: 20px; border: 1px solid #4CAF50; }

    /* 4. GRID PRINCIPAL (Ocupa el espacio restante) */
    .vault-grid { 
        display: grid; 
        grid-template-columns: 1fr 1.2fr; 
        gap: 0; 
        flex-grow: 1; /* <--- CLAVE: Toma todo el espacio que sobra debajo del header */
        overflow: hidden; /* <--- CLAVE: Mantiene todo adentro */
        height: 100%;
    }

    /* --- PANEL IZQUIERDO (ESTATUS) --- */
    .status-panel { 
        padding: 60px; 
        border-right: 1px solid #222; 
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        overflow-y: auto; /* Permite scroll solo si el contenido es muy alto */
    }
    
    .welcome-title { font-family: 'Playfair Display', serif; font-size: 3rem; line-height: 1.1; margin-bottom: 30px; }
    .text-dorado { color: #c0a062; }
    
    .order-info { font-size: 0.9rem; color: #666; margin-bottom: 50px; }
    .order-info p { margin: 5px 0; }

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

    /* --- PANEL DERECHO (CHAT) - ARQUITECTURA FLEXBOX --- */
    .concierge-panel { 
        background: #0e0e0e; 
        display: flex; 
        flex-direction: column; /* Apila Header, Chat, Input */
        border-left: 1px solid #222; 
        height: 100%; /* Usa toda la altura disponible */
        overflow: hidden; /* Evita desbordes */
    }
    
    .chat-header { 
        flex-shrink: 0; /* No se encoge */
        padding: 20px; 
        border-bottom: 1px solid #222; 
        display: flex; 
        align-items: center; 
        gap: 15px; 
        background: #111; 
    }
    
    .avatar { width: 40px; height: 40px; background: #c0a062; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: serif; }
    .chat-header h3 { margin: 0; font-size: 1rem; color: #fff; }
    .status-text { font-size: 0.75rem; color: #4CAF50; }

    /* VENTANA DE MENSAJES (SCROLLABLE) */
    .chat-window { 
        flex-grow: 1; /* Ocupa todo el espacio libre */
        padding: 30px; 
        overflow-y: auto; /* <--- AQUÍ ESTÁ EL SCROLL INTERNO */
        display: flex; 
        flex-direction: column; 
        gap: 20px; 
        scroll-behavior: smooth;
    }
    
    .message { max-width: 80%; padding: 15px 20px; border-radius: 12px; font-size: 0.95rem; line-height: 1.5; }
    .ai-msg { background: #1f1f1f; align-self: flex-start; border-bottom-left-radius: 2px; border: 1px solid #333; color: #ddd; }
    .user-msg { background: #c0a062; color: #000; align-self: flex-end; border-bottom-right-radius: 2px; font-weight: 500; }

    /* ÁREA DE INPUT (FIJA ABAJO) */
    .chat-input-area { 
        flex-shrink: 0; /* No se encoge ni desaparece */
        padding: 20px; 
        border-top: 1px solid #222; 
        display: flex; 
        gap: 10px; 
        background: #111; 
    }
    .chat-input-area input { flex-grow: 1; background: #000; border: 1px solid #333; padding: 15px; color: #fff; border-radius: 4px; outline: none; }
    .chat-input-area input:focus { border-color: #c0a062; }
    .chat-input-area button { background: #c0a062; border: none; padding: 0 25px; color: #000; font-weight: bold; border-radius: 4px; cursor: pointer; text-transform: uppercase; font-size: 0.8rem; }

    @keyframes pulse { 0% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); } 70% { opacity: 1; box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); } 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); } }

    /* --- RESPONSIVE (MÓVIL) --- */
    @media (max-width: 900px) {
        .vault-container {
            height: 100dvh; /* Usa dynamic viewport height para móviles (arregla barra de Safari/Chrome) */
        }
        .vault-grid { 
            grid-template-columns: 1fr; 
            grid-template-rows: auto 1fr; /* Estatus arriba (auto), Chat abajo (lo que sobre) */
        }
        
        /* Ocultamos el panel de estatus en móvil para dar prioridad al chat, 
           o lo hacemos colapsable (opción simple: mostrarlo pequeño arriba) */
        .status-panel { 
            padding: 20px; 
            height: auto; 
            border-right: none; 
            border-bottom: 1px solid #333;
            display: none; /* Opcional: Ocultar en móvil para enfocar en chat */
        }
        
        /* Si decides mostrar el estatus, el chat tomará el resto */
        .concierge-panel { 
            height: 100%; 
            border-left: none;
        }
    }
    .chat-header { padding: 20px; border-bottom: 1px solid #222; display: flex; align-items: center; gap: 15px; background: #111; }
    .avatar { width: 40px; height: 40px; background: #c0a062; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: serif; }
    .chat-header h3 { margin: 0; font-size: 1rem; color: #fff; }
    .status-text { font-size: 0.75rem; color: #4CAF50; }

    .chat-window { flex-grow: 1; padding: 30px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }
    
    .message { max-width: 80%; padding: 15px 20px; border-radius: 12px; font-size: 0.95rem; line-height: 1.5; }
    .ai-msg { background: #1f1f1f; align-self: flex-start; border-bottom-left-radius: 2px; border: 1px solid #333; color: #ddd; }
    .user-msg { background: #c0a062; color: #000; align-self: flex-end; border-bottom-right-radius: 2px; font-weight: 500; }

    .chat-input-area { padding: 20px; border-top: 1px solid #222; display: flex; gap: 10px; background: #111; }
    .chat-input-area input { flex-grow: 1; background: #000; border: 1px solid #333; padding: 15px; color: #fff; border-radius: 4px; outline: none; }
    .chat-input-area input:focus { border-color: #c0a062; }
    .chat-input-area button { background: #c0a062; border: none; padding: 0 25px; color: #000; font-weight: bold; border-radius: 4px; cursor: pointer; text-transform: uppercase; font-size: 0.8rem; }

    @keyframes pulse { 0% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); } 70% { opacity: 1; box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); } 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); } }

    @media (max-width: 900px) {
        .vault-grid { grid-template-columns: 1fr; height: auto; }
        .status-panel { padding: 40px 20px; border-right: none; border-bottom: 1px solid #333; }
        .concierge-panel { height: 600px; }
    }
</style>