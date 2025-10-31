<script>
    import PreorderModal from '$lib/components/PreorderModal.svelte';
    import Navbar from '../../../components/Navbar.svelte'; // Asegúrate que la ruta sea correcta

    export let data;
    const { product, baseUrl } = data;

    // --- Lógica Galería ---
    $: gallerySource = product?.galleryImages || product?.gallery || [];
    let imagenActiva = '';
    $: if (gallerySource.length > 0) {
        imagenActiva = gallerySource[0];
    } else {
        imagenActiva = '/placeholder-default.webp'; // Placeholder si no hay galería
    }

    // --- Lógica para Variantes ---
    $: variantsData = product?.variants || [];
    $: tallasUnicas = [...new Set(variantsData.map(v => v.size).filter(Boolean))];
    $: coloresUnicos = [...new Set(variantsData.map(v => v.color).filter(Boolean))];

    let tallaSeleccionada = '';
    let colorSeleccionado = '';
    let mostrarModal = false;

    // --- Lógica Schema (sin cambios) ---
    function createProductSchema(productData, pageBaseUrl) {
       const mainImageForSchema = gallerySource?.[0] || null;
       const schema = {
           "@context": "https://schema.org/",
           "@type": "Product",
           "name": productData?.title || '',
           "image": mainImageForSchema ? [`${mainImageForSchema}?w=1200`] : [], // Usa la imagen principal
           "description": productData?.description || '',
           "sku": productData?.sku || productData?._id || '', // Usa SKU si existe, si no _id
           // "brand": { // Descomenta si tienes marca
           //   "@type": "Brand",
           //   "name": productData?.brand?.name || "1egacy"
           // },
           "offers": {
               "@type": "Offer",
               "url": `${pageBaseUrl}/productos/${productData?.slug || ''}`,
               "priceCurrency": "MXN",
               "price": productData?.price || '0.00', // Usa precio base o 0 si no hay
               "availability": "https://schema.org/PreOrder", // O InStock, OutOfStock
               "itemCondition": "https://schema.org/NewCondition"
           },
           // Opcional: Añadir AggregateRating si tienes reseñas
       };

       if (productData?.rating && productData?.reviewCount) {
           schema.aggregateRating = {
               "@type": "AggregateRating",
               "ratingValue": productData.rating,       // ej: 4.5
               "reviewCount": productData.reviewCount   // ej: 12
           };
       }
       if (productData?.priceValidUntil) {
           schema.offers.priceValidUntil = productData.priceValidUntil; // ej: "2025-11-30"
       }

       return schema;
     }
    const productSchema = createProductSchema(product, baseUrl);

    // --- Lógica Pre-orden (sin cambios) ---
    async function handlePreOrderSubmit(email) {
      const payload = {
            email: email,
            productName: product.title,
            productSlug: product.slug,
            talla: tallaSeleccionada || 'N/A',
            color: colorSeleccionado || 'N/A',
            source: 'Preorden Producto Pagina'
       };

        try {
            const response = await fetch('/api/preorder', { // Ajusta la ruta de tu API endpoint si es diferente
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Éxito - Puedes cerrar el modal y mostrar un mensaje
                console.log('Preorden enviada:', payload);
                mostrarModal = false;
                alert('¡Gracias por tu preorden! Nos pondremos en contacto pronto.'); // Considera un toast/notificación más elegante
            } else {
                // Error del servidor
                const errorData = await response.json();
                console.error('Error al enviar preorden:', errorData);
                alert(`Hubo un error al procesar tu solicitud: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            // Error de red u otro
            console.error('Error de red al enviar preorden:', error);
            alert('Hubo un error de conexión. Por favor, inténtalo de nuevo.');
        }
    }
</script>

<svelte:head>
    <title>{product?.title || 'Producto'} | 1egacy</title>
    <meta
        name="description"
        content={product?.description?.substring(0, 160) || product?.title || ''}
    />
    {#if productSchema}
        {@html `<script type="application/ld+json">${JSON.stringify(productSchema)}</script>`}
    {/if}
</svelte:head>

<Navbar /> <!-- Asume que Navbar está fuera del main para que sea sticky/fixed -->

<div class="producto-container">
    {#if product}
        <!-- Columna de Galería -->
        <div class="galeria-columna">
            <div class="imagen-principal">
                 <img src={imagenActiva} alt={product.title} />
            </div>
            <div class="thumbnails">
                {#if gallerySource.length > 1} <!-- Solo mostrar si hay más de 1 imagen -->
                    {#each gallerySource as imagen, i (i)}
                        <div
                            class="thumbnail-wrapper"
                            class:active={imagen === imagenActiva}
                            on:click={() => imagenActiva = imagen}
                            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') imagenActiva = imagen; }}
                            role="button"
                            tabindex="0"
                            aria-label="Ver imagen {i + 1}"
                        >
                             <img src={`${imagen}?w=100&h=100&fit=crop&auto=format`} alt="Vista {i + 1} de {product.title}" loading="lazy"/>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>

        <!-- Columna de Detalles -->
        <div class="detalles-columna">

            <!-- *** INICIO BREADCRUMBS *** -->
            <nav aria-label="breadcrumb" class="breadcrumbs">
                <ol>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/productos">Catálogo</a></li>
                    {#if product.category}
                        <li><a href="/productos?categoria={product.category.slug}">{product.category.title}</a></li>
                        <!-- El enlace a categoría podría llevar a la página de catálogo pre-filtrada -->
                    {/if}
                    <li><span aria-current="page">{product.title}</span></li>
                </ol>
            </nav>
            <!-- *** FIN BREADCRUMBS *** -->

            <h1>{product.title}</h1>
            {#if product.price}
                <p class="precio">${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</p>
                <!-- Usar toLocaleString para formato de moneda -->
            {/if}
            <p class="descripcion">{product.description || 'Descripción no disponible.'}</p>

            <!-- Selectores de Variantes -->
            {#if tallasUnicas.length > 0 || coloresUnicos.length > 0}
                <div class="selectores">
                    {#if tallasUnicas.length > 0}
                    <div>
                        <label for="talla-select">Talla:</label>
                        <select id="talla-select" bind:value={tallaSeleccionada}>
                            <option value="" disabled selected>Elige una Talla</option>
                            {#each tallasUnicas as talla} <option value={talla}>{talla}</option> {/each}
                        </select>
                    </div>
                    {/if}
                    {#if coloresUnicos.length > 0}
                    <div>
                        <label for="color-select">Color:</label>
                        <select id="color-select" bind:value={colorSeleccionado}>
                            <option value="" disabled selected>Elige un Color</option>
                            {#each coloresUnicos as color} <option value={color}>{color}</option> {/each}
                        </select>
                    </div>
                    {/if}
                </div>
            {/if}

            <!-- Botón de Compra/Pre-orden -->
            <button
                class="boton-compra"
                on:click={() => mostrarModal = true}
                disabled={ (tallasUnicas.length > 0 && !tallaSeleccionada) || (coloresUnicos.length > 0 && !colorSeleccionado) }
                aria-disabled={ (tallasUnicas.length > 0 && !tallaSeleccionada) || (coloresUnicos.length > 0 && !colorSeleccionado) }
            >
                Próximamente
            </button>
        </div>
    {:else}
        <p>Cargando producto...</p> <!-- O un componente de Skeleton Loader -->
    {/if}
</div>

<!-- Modal -->
{#if mostrarModal}
    <PreorderModal
        producto={product.title}
        onCerrar={() => mostrarModal = false}
        onEnviar={handlePreOrderSubmit}
    />
{/if}

<style>
    /* --- ESTILOS GENERALES (sin cambios significativos) --- */
    .producto-container { max-width: 1100px; margin: 0 auto; padding: 120px 2rem 60px 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
    .galeria-columna { position: sticky; top: 120px; }
    .imagen-principal img { width: 100%; height: auto; display: block; border-radius: 8px; border: 1px solid #333; aspect-ratio: 1 / 1; object-fit: cover; }
    .thumbnails { display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 1rem; margin-top: 1rem; }
    .thumbnail-wrapper { cursor: pointer; border: 2px solid #333; border-radius: 4px; overflow: hidden; transition: border-color 0.3s ease; aspect-ratio: 1 / 1; }
    .thumbnail-wrapper:hover, .thumbnail-wrapper:focus { border-color: #c0a062; outline: none; }
    .thumbnail-wrapper.active { border-color: #ffffff; }
    .thumbnail-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; }

    /* --- ESTILOS COLUMNA DETALLES (sin cambios) --- */
    .detalles-columna h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #ffffff; }
    .precio { font-size: 1.8rem; font-family: 'Playfair Display', serif; color: #c0a062; margin-bottom: 1.5rem; }
    .descripcion { margin-bottom: 2rem; color: #b0b0b0; line-height: 1.7; }
    .selectores { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; }
    .selectores div { display: flex; flex-direction: column; gap: 0.5rem; }
    .selectores label { font-size: 0.9rem; color: #aaa; font-weight: 600; }
    select { /* ... estilos del select ... */ width: 100%; max-width: 300px; padding: 0.8rem 1rem; background-color: #1a1a1a; border: 1px solid #333; color: #e0e0e0; font-size: 1rem; border-radius: 4px; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23aaa' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 0 1 .708-.708L8 10.293l3.646-3.647a.5.5 0 0 1 .708.708l-4 4A.5.5 0 0 1 8 11.5z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 16px 12px;}
    .boton-compra { /* ... estilos del botón ... */ width: 100%; max-width: 300px; background-color: #c0a062; color: #121212; padding: 1.2rem; font-size: 1.1rem; text-transform: uppercase; font-weight: bold; border: none; cursor: pointer; border-radius: 4px; transition: background-color 0.3s ease, opacity 0.3s ease; }
    .boton-compra:hover:not(:disabled) { background-color: #ffffff; }
    .boton-compra:disabled { background-color: #555; color: #999; cursor: not-allowed; opacity: 0.7; }

    /* --- *** NUEVOS ESTILOS PARA BREADCRUMBS *** --- */
    .breadcrumbs {
        margin-bottom: 1.5rem; /* Espacio antes del título */
        font-size: 0.9em;
        color: #aaa; /* Color tenue */
    }
    .breadcrumbs ol {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex; /* Alinea horizontalmente */
        flex-wrap: wrap; /* Permite que se rompa en líneas si es muy largo */
        gap: 0.5em; /* Espacio entre elementos */
    }
    .breadcrumbs li:not(:last-child)::after {
        content: '/'; /* Separador */
        margin-left: 0.5em; /* Espacio después del separador */
        color: #666; /* Color del separador */
    }
    .breadcrumbs a {
        color: #aaa;
        text-decoration: none;
        transition: color 0.2s ease;
    }
    .breadcrumbs a:hover {
        color: #c0a062; /* Color de acento al pasar el ratón */
        text-decoration: underline;
    }
    .breadcrumbs span[aria-current="page"] {
        font-weight: 600; /* Destaca la página actual */
        color: #e0e0e0; /* Un poco más brillante */
    }
    /* --- *** FIN ESTILOS BREADCRUMBS *** --- */


    /* Responsive (sin cambios) */
    @media (max-width: 768px) {
        .producto-container { grid-template-columns: 1fr; gap: 2rem; padding-top: 100px; }
        .galeria-columna { position: static; top: auto; }
        .detalles-columna { margin-top: 2rem; }
        .detalles-columna h1 { font-size: 2rem; }
        .precio { font-size: 1.5rem; }
        .selectores, .boton-compra { max-width: 100%; }
        /* Opcional: Ocultar thumbnails en móvil muy pequeño */
        @media (max-width: 480px) {
            .thumbnails { display: none; }
        }
    }
</style>
