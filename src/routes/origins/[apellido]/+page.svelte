<script>
    import { PortableText } from '@portabletext/svelte';

    export let data;
    const { linaje } = data;
    $: relatedProducts = linaje?.relatedProducts || [];

    // ESTADO PARA EL TEXTO COLAPSABLE
    let mostrarDetallesEscudo = false;
    function toggleEscudoDetails() {
        mostrarDetallesEscudo = !mostrarDetallesEscudo;
    }
</script>

<svelte:head>
    <title>{linaje?.title || 'Linaje'} | 1egacy Origins</title>
    <meta name="description" content={linaje?.blasonTexto?.substring(0, 160) || `Explora la historia del linaje ${linaje?.title}.`} />
</svelte:head>

<div class="linaje-container">
    {#if linaje}
        <div class="linaje-header">
            <h1 class="apellido-titulo">{linaje.title}</h1>
        </div>

        <div class="linaje-contenido">
            <div class="escudo-columna">
                {#if linaje.escudoUrl}
                    <div class="escudo-wrapper">
                        <img src={linaje.escudoUrl} alt="Escudo de Armas de {linaje.title}" />
                    </div>
                {/if}

                {#if linaje.blason}
                    <div class="escudo-descripcion-wrapper" class:expanded={mostrarDetallesEscudo} id="escudo-details">
                        <div class="texto-blason">
                            <PortableText value={linaje.blason} />
                        </div>
                    </div>
                    
                    <button class="boton-toggle-escudo" on:click={toggleEscudoDetails} aria-expanded={mostrarDetallesEscudo} aria-controls="escudo-details">
                        {#if mostrarDetallesEscudo} Ver Menos Info &uarr; {:else} Ver Descripción del Escudo &darr; {/if}
                    </button>
                {/if}
            </div>

            <div class="contenido-columna">
                {#if linaje.articulosRelacionados && linaje.articulosRelacionados.length > 0}
                    <div class="articulos-seccion">
                        <h3 class="subtitulo-seccion">El Códice de {linaje.title}</h3>
                        <div class="articulos-grid">
                            {#each linaje.articulosRelacionados as articulo}
                                <a href="/blog/{articulo.slug}" class="articulo-card">
                                    <div class="articulo-imagen-wrapper">
                                        {#if articulo.mainImageUrl}
                                            <img src={articulo.mainImageUrl} alt={articulo.title} />
                                        {:else}
                                            <div class="placeholder-image-article"></div>
                                        {/if}
                                    </div>
                                    <div class="articulo-info">
                                        <h4>{articulo.title}</h4>
                                        <span>Leer más &rarr;</span>
                                    </div>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}

                {#if relatedProducts.length > 0}
                    <div class="productos-seccion">
                        <h3 class="subtitulo-seccion">Materializa el Legado {linaje.title}</h3>
                        <div class="productos-grid">
                            {#each relatedProducts as product (product.slug)}
                                <a href="/productos/{product.slug}" class="product-card-origin">
                                    <div class="product-image-container-origin">
                                        {#if product.mainImageUrl}
                                            <img src={product.mainImageUrl} alt={product.title}>
                                        {:else}
                                            <div class="placeholder-image-origin"><span>Imagen Próx.</span></div>
                                        {/if}
                                    </div>
                                    <div class="product-info-origin">
                                        <h4>{product.title}</h4>
                                        <div class="product-price-origin">
                                            {product.price ? `$MXN ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Consultar'}
                                        </div>
                                    </div>
                                </a>
                            {/each}
                        </div>
                        <div class="ver-mas-productos">
                            <a href="/productos?linaje={linaje.slug}" class="button-secondary-outline">Ver todos los productos {linaje.title}</a>
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
    /* --- ESTILOS DEL TEXTO BLASÓN --- */
    .texto-blason {
        color: #aaa;
        line-height: 1.6;
        text-align: left; /* <--- CAMBIO: Alineado a la izquierda */
        font-size: 0.95rem;
    }
    
    /* Estilos para los párrafos dentro del texto rico */
    .texto-blason :global(p) {
        margin-bottom: 1rem; /* Espacio entre párrafos */
    }

    /* Estilos globales para negritas dentro del PortableText */
    .texto-blason :global(strong) {
        color: #c0a062;
        font-weight: 700;
    }

    /* --- ESTILOS GENERALES --- */
    .linaje-container { max-width: 1100px; margin: 0 auto; padding: 120px 2rem 60px 2rem; }
    .apellido-titulo { font-size: clamp(3rem, 8vw, 4.5rem); font-weight: 700; text-align: center; color: #c0a062; margin-bottom: 3rem; text-transform: capitalize; }
    .linaje-contenido { display: grid; grid-template-columns: 300px 1fr; gap: 4rem; align-items: start; }
    .subtitulo-seccion { font-size: 1.8rem; font-weight: 600; border-bottom: 1px solid #333; padding-bottom: 0.8rem; margin-bottom: 2rem; color: #e0e0e0; font-family: 'Source Sans 3', sans-serif; }

    .escudo-columna { display: flex; flex-direction: column; align-items: center; position: sticky; top: 120px; }
    .escudo-wrapper { position: relative; overflow: hidden; display: inline-block; border-radius: 50%; margin-bottom: 1.5rem; }
    .escudo-wrapper img { width: 100%; max-width: 250px; height: auto; border: 1px solid #333; border-radius: 50%; display: block; }
    .escudo-wrapper::before { content: ''; position: absolute; top: 0; left: -85%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%); transform: skewX(-25deg); transition: left 0.8s; }
    .escudo-wrapper:hover::before { left: 120%; }

    .escudo-descripcion-wrapper { max-height: 250px; overflow: hidden; margin-bottom: 0.5rem; padding: 0 1rem; transition: max-height 0.5s ease-in-out; width: 100%; /* Asegurar ancho completo */ }
    .escudo-descripcion-wrapper.expanded { max-height: 2000px; }
    
    .boton-toggle-escudo { background: none; border: none; color: #c0a062; cursor: pointer; font-weight: bold; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 2rem; transition: color 0.2s; }
    .boton-toggle-escudo:hover { color: #ffffff; }

    .contenido-columna { display: flex; flex-direction: column; gap: 4rem; }
    .articulos-grid, .productos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
    
    .articulo-card, .product-card-origin { background-color: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #333; display: flex; flex-direction: column; text-decoration: none; color: inherit; transition: all 0.3s ease; }
    .articulo-card:hover, .product-card-origin:hover { transform: translateY(-5px); border-color: #c0a062; }
    
    .articulo-imagen-wrapper, .product-image-container-origin { width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background-color: #222; position: relative; }
    .product-image-container-origin { aspect-ratio: 1/1; }
    .articulo-card img, .product-card-origin img { width: 100%; height: 100%; object-fit: cover; position: absolute; top:0; left:0; }
    
    .articulo-info, .product-info-origin { padding: 1rem; flex-grow: 1; display: flex; flex-direction: column; }
    .articulo-info h4, .product-info-origin h4 { font-size: 1.1rem; font-weight: 600; color: #e0e0e0; margin: 0 0 8px 0; line-height: 1.3; }
    .articulo-info span { color: #c0a062; font-weight: bold; margin-top: auto; font-size: 0.9em; }
    .product-price-origin { font-size: 1rem; font-weight: bold; color: #c0a062; margin-top: auto; text-align: right; }

    .ver-mas-productos { text-align: center; margin-top: 2.5rem; }
    .button-secondary-outline { display: inline-block; padding: 10px 25px; background-color: transparent; color: #c0a062; border: 1px solid #c0a062; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 0.9em; transition: all 0.3s ease; }
    .button-secondary-outline:hover { background-color: #c0a062; color: #121212; }

    .placeholder-image-article, .placeholder-image-origin { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #2a2a2a; color: #777; }

    @media (max-width: 768px) {
        .linaje-container { padding: 100px 1rem 40px 1rem; }
        .apellido-titulo { font-size: clamp(2.5rem, 10vw, 3.5rem); }
        .linaje-contenido { grid-template-columns: 1fr; gap: 2rem; }
        .escudo-columna { order: 1; position: static; margin-bottom: 2rem; }
        .escudo-wrapper img { max-width: 200px; }
        .contenido-columna { order: 2; }
        .subtitulo-seccion { text-align: center; }
        .boton-toggle-escudo { display: block; }
    }
    @media (min-width: 769px) {
        .boton-toggle-escudo { display: none; }
        .escudo-descripcion-wrapper { max-height: none; }
    }
</style>