<script>
    import { fade } from 'svelte/transition';

    /**
     * @typedef {object} LinajeData
     * @property {string} id - El Apellido (ej. "López")
     * @property {string} slug - El slug URL (ej. "lopez")
     * @property {string} [escudoUrl] - URL de la imagen
     * @property {string} [modalDescription] - Descripción corta (si existe)
     */

    /** @type {LinajeData} */
    export let linaje = {}; 
    export let onCerrar = () => {};

    // --- VARIABLES DERIVADAS ---
    $: apellido = linaje?.id || 'Linaje';
    $: escudoUrl = linaje?.escudoUrl || '';
    $: slug = linaje?.slug || '';
    
    // Detectamos si existe contenido real (si hay slug)
    $: hasContent = !!slug;

    // --- LÓGICA DE TEXTOS (COPYWRITING) ---
    $: tituloEstado = hasContent 
        ? (linaje?.modalDescription || 'Disponible en el Códice')
        : 'Aún no está publicado';

    $: descripcionEstado = hasContent
        ? `Artículos y piezas relacionadas con el linaje ${apellido}.`
        : 'Podemos priorizarlo para ti con una investigación a medida.';

</script>

<div
    class="modal-background"
    on:click={onCerrar}
    on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') onCerrar(); }}
    role="button"
    tabindex="0"
    aria-label="Cerrar ventana modal"
    transition:fade={{ duration: 300 }}>

    <div class="modal-content" on:click|stopPropagation transition:fade={{ duration: 300, delay: 150 }}>
        
        <h2>{apellido}</h2>
        
        {#if escudoUrl}
            <div class="escudo-wrapper">
                <img src={escudoUrl} alt="Escudo de Armas de {apellido}" />
            </div>
        {/if}
        
        <div class="info-block">
            <p class="status-title">{tituloEstado}</p>
            <p class="status-desc">{descripcionEstado}</p>
        </div>

        <div class="acciones">
            {#if hasContent}
                <a href="/origins/{slug}" class="cta-principal">
                    Abrir Códice de {apellido}
                </a>
                <button class="cta-secundario" on:click={onCerrar}>
                    Cerrar
                </button>
            {:else}
                <a href="/contacto?asunto=Investigacion%20{apellido}" class="cta-principal">
                    Solicitar investigación
                </a>
                <button class="cta-secundario" on:click={onCerrar}>
                    Ver apellidos disponibles
                </button>
            {/if}
        </div>

    </div>
</div>

<style>
    /* --- Estructura Modal --- */
    .modal-background {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.92);
        display: flex; justify-content: center; align-items: center;
        z-index: 2000;
        backdrop-filter: blur(4px);
    }

    .modal-content {
        background-color: #1a1a1a;
        padding: 2.5rem 2rem;
        border: 1px solid #333;
        max-width: 480px;
        width: 90%;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }

    /* --- Escudo --- */
    .escudo-wrapper {
        margin: 0 auto 1.5rem auto;
        width: 130px;
        height: auto;
    }
    .escudo-wrapper img {
        width: 100%; height: auto;
        object-fit: contain; display: block;
        filter: drop-shadow(0 0 15px rgba(192, 160, 98, 0.15));
    }

    /* --- Tipografía --- */
    h2 {
        font-size: 2.5rem;
        font-weight: 400;
        font-family: 'Playfair Display', serif;
        color: #c0a062;
        margin-bottom: 1rem;
        margin-top: 0;
    }

    /* --- Bloque de Información --- */
    .info-block {
        margin-bottom: 2rem;
    }
    .status-title {
        color: #e0e0e0;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-family: 'Source Sans 3', sans-serif;
        line-height: 1.4;
    }
    .status-desc {
        color: #b0b0b0;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
        font-family: 'Source Sans 3', sans-serif;
    }

    /* --- Botones --- */
    .acciones {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .cta-principal, .cta-secundario {
        display: block;
        width: auto;
        padding: 0.9rem 1.5rem;
        text-align: center;
        border-radius: 4px;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        font-family: 'Source Sans 3', sans-serif;
        border: 1px solid transparent;
        text-decoration: none;
        box-sizing: border-box;
    }

    .cta-principal {
        background-color: #c0a062;
        color: #121212;
        border-color: #c0a062;
    }
    .cta-principal:hover {
        background-color: #fff;
        color: #121212;
        border-color: #fff;
        box-shadow: 0 0 15px rgba(255,255,255,0.2);
    }

    .cta-secundario {
        background-color: transparent;
        border: 1px solid #444;
        color: #aaa;
    }
    .cta-secundario:hover {
        background-color: #333;
        border-color: #666;
        color: #fff;
    }

    @media (min-width: 480px) {
        .acciones { flex-direction: row; }
        .cta-principal, .cta-secundario { flex: 1; }
    }
</style>