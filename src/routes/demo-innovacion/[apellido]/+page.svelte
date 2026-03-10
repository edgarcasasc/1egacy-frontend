
<script>
    import { PortableText } from '@portabletext/svelte';
    import { enhance } from '$app/forms';
    
    export let data;
    export let form; // Recibe datos si el action fue exitoso

    let submitting = false;
    let consentChecked = false; // Estado local para el checkbox

    const { linaje } = data;

    const SITE = 'https://somos1egacy.com';

    // --- HELPERS DE LIMPIEZA SEO ---
    const cleanText = (s = '') =>
        s.replace(/\s+/g, ' ').replace(/[“”"]/g, '').trim();

    const truncate = (s, max = 160) => {
        const t = cleanText(s);
        if (t.length <= max) return t;
        const cut = t.slice(0, max + 1);
        const lastSpace = cut.lastIndexOf(' ');
        const end = lastSpace > 60 ? lastSpace : max;
        return cut.slice(0, end).trimEnd() + '...';
    };

    // --- VARIABLES REACTIVAS PARA EL HEAD ---
    $: slug = linaje?.slug || '';
    $: canonicalUrl = slug ? `${SITE}/demo-innovacion/${slug}` : `${SITE}/demo-innovacion`;
    
    $: seoDescription = truncate(
        linaje?.blasonTexto || linaje?.introduccion || `Explora el origen y heráldica del linaje ${linaje?.title || ''}.`, 
        160
    );

    // --- LÓGICA DE VIDEO YOUTUBE ---
    function getYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // --- LÓGICA DE INTERFAZ ---
    let relatedProducts = linaje?.relatedProducts || [];
</script>

<svelte:head>
    <title>{linaje?.title || 'Linaje'} | Demo Innovación</title>
</svelte:head>

<!-- BARRA AVISO DEMO -->
<div class="demo-banner">
    ⚠️ ESTO ES UN DEMO: Ruta de innovación para {linaje?.title}
</div>

<div class="linaje-container">
    {#if linaje}
        <div class="linaje-header">
            <h1 class="apellido-titulo">Apellido {linaje.title}: Origen, Historia y Escudo</h1>
        </div>

        <div class="linaje-contenido">
            <div class="escudo-columna">
                {#if linaje.escudoUrl}
                    <div class="escudo-wrapper">
                        <img 
                            src={linaje.escudoUrl} 
                            alt={`Escudo heráldico y blasón del linaje ${linaje.title}`} 
                            title={`Escudo de armas de la familia ${linaje.title}`}
                            loading="eager"
                        />
                    </div>
                {/if}

                {#if linaje.blason}
                    <div class="escudo-descripcion-wrapper" id="escudo-details">
                        <div class="texto-blason">
                            
                            <p class="intro-contexto">
                                Una versión heráldica atribuida al linaje <strong>{linaje.title}</strong> en fuentes tradicionales.
                            </p>

                            <PortableText value={linaje.blason} />

                            <div class="disclaimer-box">
                                <p class="nota-precision">
                                    <strong>Nota:</strong> Un mismo apellido puede tener múltiples linajes y escudos según región y época. Para precisión por rama familiar, se requiere investigación a medida.
                                </p>
                            </div>

                        </div>
                    </div>
                {/if}
            </div>

            <div class="contenido-columna">
                
                <!-- NUEVA SECCIÓN: ORIGEN Y SIGNIFICADO -->
                {#if linaje.origen}
                    <div class="origen-seccion">
                        <h3 class="subtitulo-seccion">Origen y Significado</h3>
                        <div class="texto-rico-base">
                            <PortableText value={linaje.origen} />
                        </div>
                    </div>
                {/if}

                <!-- --- NUEVO DISEÑO: ARTÍCULOS (El Códice) --- -->
                {#if linaje.articulosRelacionados && linaje.articulosRelacionados.length > 0}
                    <div class="demo-section-block" style="margin-top:0; border-top:none;">
                        <div class="section-badge-inline">El Pergamino</div>
                        <h3 class="subtitulo-seccion">Secretos del Códice {linaje.title}</h3>
                        <div class="codex-grid">
                            {#each linaje.articulosRelacionados as articulo}
                                <a href="/blog/{articulo.slug}" class="codex-scroll-card">
                                    <div class="codex-image">
                                        {#if articulo.mainImageUrl}
                                            <img src={articulo.mainImageUrl} alt={articulo.title} loading="lazy" />
                                        {:else}
                                            <div class="placeholder-image"></div>
                                        {/if}
                                        <div class="codex-overlay"></div>
                                    </div>
                                    <div class="codex-info">
                                        <h4>{articulo.title}</h4>
                                        <span class="read-more-btn">Descubrir Manuscrito &rarr;</span>
                                    </div>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- NUEVA SECCIÓN: HISTORIA COMPLETA CON CAPTURA DE CORREO -->
                {#if linaje.historia}
                    <div class="historia-seccion historia-premium-bg">
                        <h3 class="subtitulo-seccion">Historia Completa del Linaje</h3>
                        
                        {#if data.isUnlocked || form?.success}
                            <!-- ESTADO 3: DESBLOQUEADO GLOBALMENTE -->
                            {#if form?.success}
                                <div class="success-message">
                                    <div class="icon-success">✨</div>
                                    <h4>¡Identidad Confirmada!</h4>
                                    <p>El candado del Códice se ha abierto. Este dispositivo recordando tu acceso para toda la colección.</p>
                                </div>
                            {/if}
                            <div class="texto-rico-base desbloqueado">
                                <PortableText value={linaje.historia} />
                            </div>
                        
                        {:else if form?.pendingVerification}
                            <!-- ESTADO 2: ESPERANDO VERIFICACIÓN DE CORREO -->
                            <div class="historia-bloqueada">
                                <div class="fade-out-text">
                                    <p>A lo largo de los siglos, los portadores del nombre {linaje.title} han dejado una marca indeleble en la historia...</p>
                                </div>
                                <div class="lead-capture-box verification-mode">
                                    <div class="icon-mail">✉️</div>
                                    <h4>Revisa tu Bandeja</h4>
                                    <p>Hemos enviado un enlace sellado a <strong>{form.email}</strong>. <br>{form.message}</p>
                                    
                                </div>
                            </div>
                            
                        {:else}
                            <!-- ESTADO 1: BLOQUEADO (LEAD GEN) -->
                            <div class="historia-bloqueada">
                                <!-- Texto simulado desvaneciéndose (teaser) -->
                                <div class="fade-out-text">
                                    <p>A lo largo de los siglos, los portadores del nombre {linaje.title} han dejado una marca indeleble en la historia. Los primeros registros de este linaje se remontan a las antiguas crónicas donde se describe cómo sus fundadores participaron en...</p>
                                </div>
                                
                                <div class="lead-capture-box">
                                    <div class="lock-header">
                                        <div class="lock-icon">
                                            {#if submitting}
                                                <div class="spinner"></div>
                                            {:else}
                                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm9 13H6v-8h12v8z"/><circle cx="12" cy="15" r="1.5"/></svg>
                                            {/if}
                                        </div>
                                        <h4>Desbloquea el Legado Completo</h4>
                                    </div>
                                    <p style="margin-bottom: 15px;">Ingresa tu correo para leer la <strong>historia completa</strong> de la familia {linaje.title} (sin costo).</p>
                                    
                                    <!-- Formulario SvelteKit Mejorado -->
                                    <form method="POST" action="?/unlockStory" 
                                          use:enhance={() => {
                                              submitting = true;
                                              return async ({ update }) => {
                                                  submitting = false;
                                                  update();
                                              };
                                          }} 
                                          class="unlock-form">
                                        <input type="hidden" name="linaje" value={linaje.slug} />
                                        <input type="hidden" name="titulo" value={linaje.title} />
                                        <input type="email" name="email" required placeholder="tu@correo.com" class="email-input" disabled={submitting} />
                                        
                                        <!-- Casilla de Consentimiento (Obligatoria) -->
                                        <label class="consent-label">
                                            <input type="checkbox" name="consent" bind:checked={consentChecked} required disabled={submitting} class="consent-checkbox" />
                                            <span>Acepto recibir la historia en mi correo y comunicaciones esporádicas del legado familiar. Entiendo que puedo darme de baja en cualquier momento.</span>
                                        </label>

                                        <button type="submit" class="cta-unlock" disabled={submitting || !consentChecked}>
                                            {submitting ? 'Abriendo Códice...' : 'Ver historia completa →'}
                                        </button>
                                    </form>
                                    <p class="micro-note">Tus datos están seguros con nosotros. Solo historia majestuosa, cero spam.</p>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}

                <!-- --- NUEVO DISEÑO: VIDEOS (Cine) --- -->
                {#if linaje.videos && linaje.videos.length > 0}
                    <div class="demo-section-block">
                        <div class="section-badge-inline">El Archivo visual</div>
                        <h3 class="subtitulo-seccion">Documentales Cortos {linaje.title}</h3>
                        <div class="cine-strip">
                            {#each linaje.videos as video}
                                {@const videoId = getYouTubeId(video.youtubeUrl)}
                                {#if videoId}
                                    <div class="cine-card">
                                        <div class="cine-frame">
                                            <iframe 
                                                src={`https://www.youtube.com/embed/${videoId}`} 
                                                title={video.title}
                                                frameborder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowfullscreen>
                                            </iframe>
                                        </div>
                                        <div class="cine-info">
                                            <span class="cine-tag">Short Film</span>
                                            <h4>{video.title}</h4>
                                            <p>{video.description}</p>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}


                <!-- --- NUEVO DISEÑO: PRODUCTOS (La Boutique) --- -->
                {#if relatedProducts.length > 0}
                    <div class="demo-section-block boutique-section">
                        <div class="section-badge-inline" style="background:#fff; color:#000;">La Boutique</div>
                        <h3 class="subtitulo-seccion">Objetos de Herencia {linaje.title}</h3>
                        <div class="boutique-gallery">
                            {#each relatedProducts as product (product.slug)}
                                <a href="/productos/{product.slug}" class="boutique-item">
                                    <div class="boutique-image-box">
                                        {#if product.mainImageUrl}
                                            <img src={product.mainImageUrl} alt={product.title} loading="lazy">
                                        {:else}
                                            <div class="placeholder-image">Próximamente</div>
                                        {/if}
                                    </div>
                                    <div class="boutique-details">
                                        <h4>{product.title}</h4>
                                        <div class="boutique-price">
                                            {product.price ? `$MXN ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Bajo pedido'}
                                        </div>
                                    </div>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- --- NUEVO DISEÑO: FAQs (Acordeón de Oro) --- -->
                {#if linaje.faqs && linaje.faqs.length > 0}
                    <div class="demo-section-block" style="border:none;">
                        <h3 class="subtitulo-seccion" style="text-align:center;">Dudas sobre tu Linaje</h3>
                        <div class="faq-gold-accordion">
                            {#each linaje.faqs as faq}
                                <details class="faq-gold-item">
                                    <summary class="faq-gold-question">
                                        {faq.question}
                                        <span class="faq-icon-cross"></span>
                                    </summary>
                                    <div class="faq-gold-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            {/each}
                        </div>
                    </div>
                {/if}

            </div> 
        </div> 
    {:else}
        <p>Cargando información del linaje...</p>
    {/if}
</div>

<style>
    /* Estilos copiados del original ajustados al demo */
    .demo-banner {
        background-color: #d4af37;
        color: #000;
        text-align: center;
        padding: 5px;
        font-weight: bold;
        font-family: monospace;
        letter-spacing: 1px;
    }

    /* --- ESTILOS DEL TEXTO BLASÓN Y NOTAS --- */
    .texto-blason { color: #aaa; line-height: 1.6; text-align: left; font-size: 0.95rem; }
    .texto-blason :global(p) { margin-bottom: 1rem; }
    .texto-blason :global(strong) { color: #c0a062; font-weight: 700; }
    .intro-contexto { font-style: italic; color: #e0e0e0; margin-bottom: 1.5rem !important; border-left: 2px solid #c0a062; padding-left: 1rem; }
    .disclaimer-box { margin-top: 2rem; padding: 1.5rem; background-color: rgba(255, 255, 255, 0.03); border: 1px solid #333; border-radius: 4px; }
    .nota-precision { font-size: 0.85rem; color: #888; margin-bottom: 0 !important; }

    /* --- ESTILOS GENERALES --- */
    .linaje-container { max-width: 1100px; margin: 0 auto; padding: 0 2rem 60px 2rem; color: #e0e0e0; font-family: 'Source Sans 3', sans-serif;}
    .apellido-titulo { font-size: clamp(2.5rem, 8vw, 4rem); font-family: 'Palatino Linotype', serif; font-weight: 700; text-align: center; color: #c0a062; margin-bottom: 3rem; margin-top: 1rem; text-transform: capitalize; }
    .linaje-contenido { display: grid; grid-template-columns: 320px 1fr; gap: 4rem; align-items: start; }
    .subtitulo-seccion { font-size: 1.8rem; font-weight: 600; border-bottom: 1px solid #333; padding-bottom: 0.8rem; margin-bottom: 2rem; color: #e0e0e0; font-family: 'Palatino Linotype', serif; }

    /* --- ESTILOS DEL ESCUDO --- */
    .escudo-columna { display: flex; flex-direction: column; align-items: center; position: sticky; top: 120px; }
    .escudo-wrapper { position: relative; overflow: hidden; display: inline-block; margin-bottom: 1.5rem; border-radius: 8px; background: #121212; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #333; }
    .escudo-wrapper img { width: 100%; max-width: 280px; height: auto; display: block; border-radius: 8px; }
    .escudo-descripcion-wrapper { max-height: 60vh; overflow-y: auto; overflow-x: hidden; margin-bottom: 2rem; padding: 0 1rem; width: 100%; scrollbar-width: thin; scrollbar-color: #d4af37 #222; }
    .escudo-descripcion-wrapper::-webkit-scrollbar { width: 6px; }
    .escudo-descripcion-wrapper::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }

    .contenido-columna { display: flex; flex-direction: column; gap: 4rem; }

    /* --- ESTILOS TEXTO RICO BASE (Origen y Significado) --- */
    .texto-rico-base {
        font-size: 1.15rem;
        line-height: 1.8;
        color: #bbb;
    }
    .texto-rico-base :global(p) { margin-bottom: 1.5rem; }
    .texto-rico-base :global(strong) { color: #fff; font-weight: 600;}
    .texto-rico-base :global(h4) { color: #d4af37; font-size: 1.3rem; margin: 2rem 0 1rem 0; font-family: 'Palatino Linotype', serif;}
    .texto-rico-base :global(ul) { margin-bottom: 1.5rem; padding-left: 2rem; }
    .texto-rico-base :global(li) { margin-bottom: 0.5rem; }

    /* --- NUEVO: LEAD CAPTURE (Historia) --- */
    .historia-premium-bg {
        background-color: #161512;
        border: 1px solid #2a2416;
        border-radius: 12px;
        padding: 2.5rem 2rem;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }

    .historia-bloqueada {
        position: relative;
        margin-top: 1rem;
    }

    .fade-out-text {
        font-size: 1.15rem;
        line-height: 1.8;
        color: #bbb;
        mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        padding-bottom: 80px;
        filter: blur(1px);
        user-select: none;
    }

    .lead-capture-box {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 100%; max-width: 420px;
        background: rgba(18, 18, 18, 0.95);
        border: 1px solid #c0a062;
        border-radius: 12px;
        padding: 30px;
        text-align: center;
        box-shadow: 0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(212,175,55,0.2);
        backdrop-filter: blur(10px);
    }
    .lock-header { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px; }
    .lock-header h4 { color: #fff; font-family: 'Palatino Linotype', serif; font-size: 1.6rem; margin: 0 !important; }
    .lock-icon { color: #c0a062; display:flex; justify-content: center; align-items:center; height:24px; margin-bottom: 0 !important;}
    
    .spinner {
        width: 24px; height: 24px;
        border: 3px solid rgba(212,175,55,0.3);
        border-top-color: #d4af37;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }

    .lead-capture-box h4 {
        color: #fff;
        font-family: 'Palatino Linotype', serif;
        font-size: 1.6rem;
        margin: 0 0 10px 0;
    }
    .lead-capture-box p {
        color: #aaa; font-size: 0.95rem; margin-bottom: 25px; line-height: 1.5;
    }

    .free-content-badge { display: inline-block; background: rgba(192, 160, 98, 0.1); border: 1px dashed rgba(192, 160, 98, 0.4); padding: 8px 16px; border-radius: 6px; margin-bottom: 25px; }
    .free-content-badge span { color: #d4af37; font-size: 0.85rem; letter-spacing: 0.5px;}

    .unlock-form {
        display: flex; flex-direction: column; gap: 15px; margin-bottom: 15px;
    }
    .email-input {
        background: rgba(255,255,255,0.05);
        border: 1px solid #444; color: #fff;
        padding: 12px 16px; border-radius: 6px;
        font-size: 1rem; transition: border-color 0.3s;
    }
    .email-input:focus { outline: none; border-color: #c0a062; }
    .email-input:disabled { opacity: 0.5; }

    .cta-unlock {
        background: linear-gradient(135deg, #d4af37 0%, #aa8529 100%);
        color: #000; border: none; padding: 14px;
        font-size: 1rem; font-weight: bold; text-transform: uppercase;
        border-radius: 6px; cursor: pointer; transition: transform 0.2s;
        letter-spacing: 1px;
    }
    .cta-unlock:hover:not(:disabled) { transform: scale(1.02); }
    .cta-unlock:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(100%); }

    /* Estilos de la casilla de consentimiento */
    .consent-label {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        text-align: left;
        margin-top: 5px;
        margin-bottom: 5px;
        cursor: pointer;
    }
    .consent-checkbox {
        margin-top: 4px;
        accent-color: #d4af37;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }
    .consent-label span {
        font-size: 0.8rem;
        color: #888;
        line-height: 1.4;
    }

    .micro-note { font-size: 0.8rem !important; color: #666 !important; margin: 0 !important; }

    /* Estado Desbloqueado */
    .success-message {
        background: rgba(212, 175, 55, 0.1);
        border-left: 4px solid #d4af37;
        padding: 20px; border-radius: 0 8px 8px 0;
        margin-bottom: 30px;
    }
    .icon-success { font-size: 1.5rem; margin-bottom: 10px; }
    .success-message h4 { color: #d4af37; font-family: 'Palatino Linotype', serif; font-size: 1.4rem; margin:0 0 10px 0; }
    .success-message p { color: #ddd; margin: 0; line-height: 1.5;}

    .desbloqueado {
        animation: fade-in 1s ease-out forwards;
    }

    /* Estado de Verificación (Simulación) */
    .verification-mode { border-color: #666; }
    .icon-mail { font-size: 2rem; margin-bottom: 10px; }
    .magic-link-simulator { margin-top: 25px; padding-top: 20px; border-top: 1px dashed #444; }
    .micro-note-dev { font-size: 0.8rem; color: #888; margin-bottom: 10px; font-style: italic; }
    .verified-btn { background: #222; color: #d4af37; border: 1px solid #d4af37; }
    .verified-btn:hover { background: #d4af37; color: #000; }

    @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }

    @media (max-width: 768px) {
        .linaje-container { padding: 40px 1rem 40px 1rem; }
        .apellido-titulo { font-size: clamp(2.5rem, 10vw, 3.5rem); }
        .linaje-contenido { grid-template-columns: 1fr; gap: 2rem; }
        .escudo-columna { order: 1; position: static; margin-bottom: 2rem; }
        .escudo-wrapper img { max-width: 200px; }
        .contenido-columna { order: 2; }
        .subtitulo-seccion { text-align: center; }
        .lead-capture-box { padding: 25px 20px; width: 90%; }
        
        .cine-strip { flex-direction: column; overflow-x: hidden; padding-bottom: 0; }
        .cine-card { min-width: 100%; border-right: none; border-bottom: 1px solid #333; }
        
        .boutique-gallery { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .boutique-image-box { height: 150px; }
    }

    /* --- ESTILOS DE LOS NUEVOS COMPONENTES (CINE, CODICE, BOUTIQUE, FAQ) --- */
    
    .demo-section-block {
        margin-top: 4rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(212,175,55,0.2);
        position: relative;
    }

    .section-badge-inline {
        display: inline-block;
        background: #d4af37;
        color: #000;
        padding: 4px 12px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 15px;
        border-radius: 2px;
    }

    /* CINE STRIP */
    .cine-strip {
        display: flex; gap: 20px; overflow-x: auto; padding-bottom: 20px;
        scrollbar-width: thin; scrollbar-color: #d4af37 #222;
    }
    .cine-strip::-webkit-scrollbar { height: 6px; }
    .cine-strip::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }
    
    .cine-card {
        min-width: 300px; max-width: 350px; flex-shrink: 0;
        background: #0a0a0a; border: 1px solid #333; border-radius: 4px;
        overflow: hidden; transition: border-color 0.3s;
    }
    .cine-card:hover { border-color: #d4af37; box-shadow: 0 5px 15px rgba(212,175,55,0.1); }
    
    .cine-frame { position: relative; width: 100%; padding-bottom: 56.25%; background: #000; }
    .cine-frame iframe { position: absolute; top:0; left:0; width:100%; height:100%; }
    
    .cine-info { padding: 1.2rem; }
    .cine-tag { font-family: monospace; color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
    .cine-info h4 { color: #fff; font-family: 'Palatino Linotype', serif; font-size: 1.2rem; margin: 5px 0 10px 0; }
    .cine-info p { color: #aaa; font-size: 0.9rem; margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    /* CODEX CARDS */
    .codex-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
    .codex-scroll-card {
        display: block; text-decoration: none; position: relative;
        background: #111; border: 1px solid #222; border-radius: 6px; overflow: hidden;
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .codex-scroll-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-color: #333; }
    
    .codex-image { width: 100%; height: 180px; position: relative; background: #222; }
    .codex-image img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(50%) contrast(1.2); transition: filter 0.5s; }
    .codex-scroll-card:hover .codex-image img { filter: grayscale(0%) contrast(1.1); }
    
    .codex-overlay { position: absolute; inset:0; background: linear-gradient(to top, #111 0%, transparent 100%); }
    
    .codex-info { padding: 20px; position: relative; z-index: 2; margin-top: -30px; }
    .codex-info h4 { color: #e0e0e0; font-family: 'Palatino Linotype', serif; font-size: 1.3rem; margin: 0 0 15px 0; line-height: 1.3; }
    .read-more-btn { color: #d4af37; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }

    /* BOUTIQUE */
    .boutique-section { background: rgba(255,255,255,0.02); padding: 30px; border-radius: 12px; margin-top: 5rem;}
    .boutique-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
    .boutique-item { text-decoration: none; color: inherit; display: flex; flex-direction: column; transition: transform 0.3s; }
    .boutique-item:hover { transform: translateY(-3px); }
    
    .boutique-image-box { width: 100%; height: 200px; background: #1a1a1a; margin-bottom: 15px; border-radius: 4px; overflow: hidden; border: 1px solid #333; }
    .boutique-image-box img { width: 100%; height: 100%; object-fit: cover; }
    
    .boutique-details h4 { color: #e0e0e0; font-size: 1rem; margin: 0 0 5px 0; font-weight: normal; }
    .boutique-price { color: #d4af37; font-weight: bold; font-family: monospace; font-size: 1.1rem; }

    /* FAQ GOLD ACCORDION */
    .faq-gold-accordion { display: flex; flex-direction: column; gap: 10px; max-width: 800px; margin: 0 auto; }
    .faq-gold-item { background: transparent; border-bottom: 1px solid #333; transition: all 0.3s; }
    .faq-gold-item[open] { padding-bottom: 15px; border-color: #d4af37; }
    
    .faq-gold-question { 
        display: flex; justify-content: space-between; align-items: center; 
        padding: 20px 0; cursor: pointer; color: #fff; font-size: 1.1rem; 
        font-family: 'Palatino Linotype', serif;
    }
    .faq-gold-question::-webkit-details-marker { display: none; }
    
    .faq-icon-cross { position: relative; width: 16px; height: 16px; margin-left: 15px; flex-shrink: 0;}
    .faq-icon-cross::before, .faq-icon-cross::after { content: ''; position: absolute; background: #d4af37; transition: transform 0.3s; }
    .faq-icon-cross::before { top: 7px; left: 0; width: 100%; height: 2px; }
    .faq-icon-cross::after { top: 0; left: 7px; width: 2px; height: 100%; }
    
    .faq-gold-item[open] .faq-icon-cross::after { transform: rotate(90deg); opacity: 0; }
    
    .faq-gold-answer { padding-right: 40px; color: #aaa; line-height: 1.6; font-size: 0.95rem; }
    
    .placeholder-image { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #1a1a1a; color: #555; }
</style>