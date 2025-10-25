<script>
    // 'data' es el objeto que nos llega desde +page.server.js
    export let data;
    // Ahora 'linaje' contiene también 'relatedProducts'
    const { linaje } = data;
    // Extraemos los productos para usarlos más fácil
    $: relatedProducts = linaje?.relatedProducts || [];

    // ESTADO PARA EL TEXTO COLAPSABLE DEL ESCUDO (Sin cambios)
    let mostrarDetallesEscudo = false;
    function toggleEscudoDetails() {
        mostrarDetallesEscudo = !mostrarDetallesEscudo;
    }

    // Lógica base para variantes (Sin cambios - aunque no se usan aquí, los dejamos por si acaso)
    let imagenActiva = '';
    $: if (linaje?.gallery?.length > 0) { /* ... */ }
    $: tallasUnicas = linaje?.variants ? [] : []; // Simplificado
    $: coloresUnicos = linaje?.variants ? [] : []; // Simplificado
    let tallaSeleccionada = '';
    let colorSeleccionado = '';
</script>

<svelte:head>
    <title>{linaje?.title || 'Linaje'} | 1egacy Origins</title>
    <meta name="description" content={linaje?.introduccion?.substring(0, 160) || `Explora la historia y el legado del linaje ${linaje?.title}.`} />
    <!-- Schema.org específico para esta página si aplica -->
</svelte:head>

<div class="linaje-container">
    {#if linaje}
        <div class="linaje-header">
            <h1 class="apellido-titulo">{linaje.title}</h1>
        </div>

        <div class="linaje-contenido">
            <!-- COLUMNA DEL ESCUDO (Sin cambios funcionales, se mantiene colapsable en móvil) -->
            <div class="escudo-columna">
                {#if linaje.escudoUrl}
                <div class="escudo-wrapper">
                    <img src={linaje.escudoUrl} alt="Escudo de Armas de {linaje.title}" />
                </div>
                {/if}

                {#if linaje.descripcionEscudo}
                    <div class="escudo-descripcion-wrapper" class:expanded={mostrarDetallesEscudo} id="escudo-details">
                        <p>{linaje.descripcionEscudo}</p>
                    </div>
                    <button class="boton-toggle-escudo" on:click={toggleEscudoDetails} aria-expanded={mostrarDetallesEscudo} aria-controls="escudo-details">
                        {#if mostrarDetallesEscudo} Ver Menos Info del Escudo &uarr; {:else} Ver Más Info del Escudo &darr; {/if}
                    </button>
                {/if}

                <!-- *** BOTÓN ANTIGUO ELIMINADO *** -->
                <!-- {#if linaje.productos && linaje.productos.length > 0}
                    <a href="/productos/{linaje.productos[0].slug}" class="boton-compra">...</a>
                {:else}
                    <button class="boton-compra" disabled>...</button>
                {/if} -->
                 <!-- *** FIN ELIMINACIÓN *** -->

            </div><!-- Fin escudo-columna -->

            <!-- COLUMNA DE ARTÍCULOS Y PRODUCTOS -->
            <div class="contenido-columna">
                <!-- SECCIÓN CÓDICE (Artículos relacionados) -->
                {#if linaje.articulosRelacionados && linaje.articulosRelacionados.length > 0}
                    <div class="articulos-seccion">
                        <h3 class="subtitulo-seccion">El Códice de {linaje.title}</h3>
                        <div class="articulos-grid">
                            {#each linaje.articulosRelacionados as articulo}
                                <a href="/blog/{articulo.slug}" class="articulo-card">
                                    <div class="articulo-imagen-wrapper">
                                        {#if articulo.mainImageUrl}
                                            <img src={articulo.mainImageUrl} alt="Imagen para {articulo.title}" />
                                        {:else}
                                             <div class="placeholder-image-article"></div> <!-- Placeholder -->
                                        {/if}
                                    </div>
                                    <div class="articulo-info">
                                        <h4>{articulo.title}</h4>
                                         {#if articulo.excerpt} <p class="excerpt">{articulo.excerpt}</p> {/if}
                                        <span>Leer más &rarr;</span>
                                    </div>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- *** NUEVA SECCIÓN DE PRODUCTOS RELACIONADOS *** -->
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
                         <!-- Enlace opcional a catálogo filtrado si hay muchos productos -->
                         <div class="ver-mas-productos">
                            <a href="/productos?linaje={linaje.slug}" class="button-secondary-outline">Ver todos los productos {linaje.title}</a>
                            <!-- Este enlace requerirá lógica de filtrado por query param en /productos -->
                         </div>
                    </div>
                {/if}
                 <!-- *** FIN NUEVA SECCIÓN *** -->

            </div> <!-- Fin contenido-columna -->
        </div> <!-- Fin linaje-contenido -->
    {:else}
        <p>Cargando información del linaje...</p> <!-- Mensaje de carga -->
    {/if}
</div>

<style>
    /* --- ESTILOS GENERALES Y LAYOUT --- */
    .linaje-container { max-width: 1100px; margin: 0 auto; padding: 120px 2rem 60px 2rem; }
    .apellido-titulo { font-size: clamp(3rem, 8vw, 4.5rem); font-weight: 700; text-align: center; color: #c0a062; margin-bottom: 3rem; text-transform: capitalize; }
    .linaje-contenido { display: grid; grid-template-columns: 300px 1fr; /* Columna fija para escudo */ gap: 4rem; align-items: start; }
    .subtitulo-seccion { font-size: 1.8rem; font-weight: 600; /* Menos peso que H1/H2 global */ border-bottom: 1px solid #333; padding-bottom: 0.8rem; margin-bottom: 2rem; color: #e0e0e0; /* Color texto normal */ font-family: 'Source Sans 3', sans-serif; /* Fuente estándar */ }

    /* --- COLUMNA ESCUDO (IZQUIERDA) --- */
    .escudo-columna { display: flex; flex-direction: column; align-items: center; position: sticky; top: 120px; /* Mantener sticky */ }
    .escudo-wrapper { position: relative; overflow: hidden; display: inline-block; border-radius: 50%; margin-bottom: 1.5rem; /* Separar del texto */ }
    .escudo-wrapper img { width: 100%; max-width: 250px; /* Ligeramente más pequeño */ height: auto; border: 1px solid #333; border-radius: 50%; display: block; /* Evitar espacio extra */}
    /* Efecto hover (sin cambios) */
    .escudo-wrapper::before { content: ''; position: absolute; top: 0; left: -85%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%); transform: skewX(-25deg); transition: left 0.8s; }
    .escudo-wrapper:hover::before { left: 120%; }

    /* Texto colapsable del escudo (sin cambios) */
    .escudo-descripcion-wrapper { max-height: 250px; overflow: hidden; margin-bottom: 0.5rem; padding: 0 1rem; transition: max-height 0.5s ease-in-out; }
    .escudo-descripcion-wrapper.expanded { max-height: 2000px; }
    .escudo-columna p { font-style: italic; color: #aaa; line-height: 1.6; text-align: center; margin-bottom: 0; font-size: 0.9rem; }
    .boton-toggle-escudo { background: none; border: none; color: #c0a062; cursor: pointer; font-weight: bold; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 2rem; transition: color 0.2s; }
    .boton-toggle-escudo:hover { color: #ffffff; }

    /* --- COLUMNA CONTENIDO (DERECHA) --- */
    .contenido-columna { display: flex; flex-direction: column; gap: 4rem; /* Espacio entre sección Códice y Productos */ }

    /* --- SECCIÓN CÓDICE (ARTÍCULOS) --- */
    .articulos-seccion {}
    .articulos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Columnas más flexibles */ gap: 1.5rem; }
    .articulo-card { display: flex; flex-direction: column; text-decoration: none; color: #e0e0e0; transition: background-color 0.3s ease; border-radius: 8px; overflow: hidden; background-color: #1a1a1a; border: 1px solid #333; }
    .articulo-card:hover { background-color: #222; }
    .articulo-imagen-wrapper { width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background-color: #2a2a2a; /* Fondo para placeholder */}
    .articulo-card img { width: 100%; height: 100%; object-fit: cover; }
    .placeholder-image-article { width: 100%; height: 100%; background-color: #2a2a2a; } /* Placeholder simple */
    .articulo-info { padding: 1rem; flex-grow: 1; text-align: left; }
    .articulo-info h4 { font-size: 1.1rem; /* Más pequeño que H3 global */ font-weight: 600; margin: 0 0 0.5rem 0; font-family: 'Source Sans 3', sans-serif; color: #e0e0e0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: calc(1.3em * 2); }
    .articulo-info p.excerpt { font-size: 0.9rem; color: #aaa; margin-bottom: 0.5rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: calc(1.6em * 3); }
    .articulo-info span { color: #c0a062; font-weight: bold; display: block; margin-top: auto; /* Empuja al final */ font-size: 0.9em; }

    /* --- SECCIÓN PRODUCTOS RELACIONADOS --- */
    .productos-seccion {}
    .productos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Mismo grid que artículos */ gap: 1.5rem; }
    /* Reutilizar estilos de tarjeta de Home/Catálogo con sufijo '-origin' */
    .product-card-origin { background-color: #1a1a1a; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; color: inherit; display: flex; flex-direction: column; text-align: left; border: 1px solid #333; }
    .product-card-origin:hover { transform: translateY(-5px); box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); border-color: #c0a062; }
    .product-image-container-origin { width: 100%; padding-top: 100%; position: relative; background-color: #222; }
    .product-image-container-origin img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
    .placeholder-image-origin { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #2a2a2a; color: #777; font-size: 0.8em; text-align: center; }
    .product-info-origin { padding: 1rem; flex-grow: 1; display: flex; flex-direction: column; }
    .product-info-origin h4 { font-size: 1.1rem; font-weight: 600; color: #e0e0e0; margin: 0 0 8px 0; font-family: 'Source Sans 3', sans-serif; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: calc(1.3em * 2); }
    .product-price-origin { font-size: 1rem; font-weight: bold; color: #c0a062; margin-top: auto; text-align: right; }
    .ver-mas-productos { text-align: center; margin-top: 2.5rem; }
    .button-secondary-outline { /* Botón similar a la home pero quizás outline */ display: inline-block; padding: 10px 25px; background-color: transparent; color: #c0a062; border: 1px solid #c0a062; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 0.9em; transition: all 0.3s ease; }
    .button-secondary-outline:hover { background-color: #c0a062; color: #121212; }


    /* --- RESPONSIVIDAD --- */
    @media (max-width: 768px) {
        .linaje-container { padding: 100px 1rem 40px 1rem; }
        .apellido-titulo { font-size: clamp(2.5rem, 10vw, 3.5rem); }
        .linaje-contenido { grid-template-columns: 1fr; /* Stack en móvil */ gap: 2rem; }
        .escudo-columna { order: 1; position: static; margin-top: 0; /* Quitar margen extra */ margin-bottom: 2rem; /* Espacio antes del códice */}
        .escudo-wrapper img { max-width: 200px; /* Más pequeño en móvil */}
        .contenido-columna { order: 2; gap: 3rem; /* Menos espacio entre secciones */}
        .subtitulo-seccion { font-size: 1.5rem; margin-bottom: 1.5rem; text-align: center; /* Centrar subtítulos en móvil */}
        .articulos-grid, .productos-grid { grid-template-columns: 1fr; /* Una columna para tarjetas */ gap: 1rem; }
         /* Mostrar botón toggle en móvil */
         .boton-toggle-escudo { display: block; }
    }
     /* Ocultar botón toggle en escritorio (redundante con el media query anterior pero más explícito) */
     @media (min-width: 769px) {
         .boton-toggle-escudo { display: none; }
         .escudo-descripcion-wrapper { max-height: none; /* Sin límite de altura en escritorio */}
     }
</style>
