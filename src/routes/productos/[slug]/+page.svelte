<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags';
    import { page } from '$app/stores';
    import { addToCart } from '$lib/stores/cart';
    import { fade } from 'svelte/transition';

    export let data;
    // Protección inicial por si data viene vacía
    const product = data?.product || {};
    const baseUrl = data?.baseUrl || '';

    // --- ESTADO DE SELECCIÓN ---
    let selectedServiceLevel = 'standard'; // 'standard' | 'bespoke'
    let isAdding = false; 

    // --- LÓGICA DE PRECIO ---
    $: currentPrice = selectedServiceLevel === 'standard' 
        ? (product.price || 0)
        : ((product.price || 0) * 1.5); 

    // --- LÓGICA DE IMAGEN ---
    $: gallerySource = product?.galleryImages || product?.gallery || [];
    let imagenSeleccionadaGaleria = '';

    $: if (gallerySource.length > 0 && !imagenSeleccionadaGaleria) {
        imagenSeleccionadaGaleria = gallerySource[0];
    }

    $: imageToDisplay = selectedServiceLevel === 'bespoke'
        ? '/blueprint-generico.webp'
        : (imagenSeleccionadaGaleria || '/placeholder-default.webp');

    // --- LÓGICA DE VARIANTES (BLINDADA) ---
    $: variantsData = Array.isArray(product?.variants) ? product.variants : [];

    // 1. BUSCAR LA VARIANTE "BESPOKE/PERSONALIZADO" PARA CONTROLAR EL BOTÓN GRANDE
    $: bespokeVariant = variantsData.find(v => {
        if (!v) return false;
        // Usamos || '' para evitar que .toLowerCase() explote con null
        const t = (v.title || '').toLowerCase();
        const s = (v.size || '').toLowerCase();
        return t.includes('personalizado') || t.includes('bespoke') || s.includes('personalizado');
    });

    // 2. ESTADOS DEL BOTÓN BESPOKE
    // En lugar de buscarlo en la variante...
$: isBespokeLocked = product.availabilityStatus === 'coming_soon';
$: isBespokeSoldOut = product.availabilityStatus === 'sold_out';
    $: isBespokeDisabled = isBespokeLocked || isBespokeSoldOut;

    // --- NUEVA LÓGICA PARA OCULTO/SEO ---
    // Si está oculto, bloqueamos TODO el carrito, no solo el bespoke
    $: isProductHidden = product.availabilityStatus === 'hidden';
    // 3. LISTAS DE TALLAS Y COLORES (Filtrando "Personalizado" para que no salga duplicado abajo)
    $: tallasUnicas = [...new Set(variantsData
        .filter(v => {
            if (!v) return false;
            const t = (v.title || '').toLowerCase();
            const s = (v.size || '').toLowerCase();
            // Excluir la variante personalizada de la lista de tallas normales
            return !t.includes('personalizado') && !t.includes('bespoke') && !s.includes('personalizado');
        })
        .map(v => v.size).filter(Boolean))];
    
    $: coloresUnicos = [...new Set(variantsData.map(v => v.color).filter(Boolean))];

    let tallaSeleccionada = '';
    let colorSeleccionado = '';

    // --- CARRITO ---
    function handleAddToCart() {
        isAdding = true;
        addToCart({
            id: product._id || product.slug,
            title: product.title || 'Producto',
            slug: product.slug,
            price: currentPrice,
            image: imageToDisplay,
            productType: product.productType || 'physical',
            customizationLevel: selectedServiceLevel,
            selectedSize: tallaSeleccionada,
            selectedColor: colorSeleccionado,
            quantity: 1
        });
        setTimeout(() => isAdding = false, 800);
    }

    // --- SCHEMA ---
    function createProductSchema(productData, pageBaseUrl) {
        if (!productData) return null;
        const mainImageForSchema = productData?.mainImageUrl || null;
        return {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": productData.title || '',
            "brand": { "@type": "Brand", "name": "1egacy" },
            "image": mainImageForSchema ? [`${mainImageForSchema}?w=1200`] : [], 
            "description": productData.description || '',
            "sku": productData.sku || productData._id || '', 
            "offers": {
                "@type": "Offer",
                "url": `${pageBaseUrl}/productos/${productData.slug || ''}`,
                "priceCurrency": productData.priceCurrency || "MXN", 
                "price": currentPrice,
                "availability": "https://schema.org/InStock"
            }
        };
    }
    
    $: productSchema = createProductSchema(product, baseUrl);
    $: pageTitle = `${product?.title || 'Producto'} | 1egacy`;
    $: canonicalUrl = `https://somos1egacy.com${$page.url.pathname}`;
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={product?.description?.substring(0, 160)} />
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:image" content={imageToDisplay} />
    {#if productSchema}
        {@html `<script type="application/ld+json">${JSON.stringify(productSchema)}</script>`}
    {/if}
</svelte:head>

<div class="producto-container">
    {#if product && product.title}
        <div class="galeria-columna">
            <div class="imagen-principal-container relative group">
                {#key imageToDisplay}
                    <img 
                        src={imageToDisplay} 
                        alt={product.title} 
                        class="imagen-animada"
                        in:fade={{ duration: 300 }}
                    />
                {/key}
                
                <div class="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 text-xs font-bold tracking-widest uppercase text-[#c0a062] border border-[#c0a062]/30 rounded">
                    {selectedServiceLevel === 'standard' ? 'Diseño Final' : 'Boceto Artesanal'}
                </div>
            </div>

            {#if selectedServiceLevel === 'standard' && gallerySource.length > 1}
                <div class="thumbnails">
                    {#each gallerySource as imagen, i (i)}
                        <button
                            class="thumbnail-wrapper"
                            class:active={imagen === imagenSeleccionadaGaleria}
                            on:click={() => imagenSeleccionadaGaleria = imagen}
                            aria-label="Ver imagen {i + 1}"
                        >
                            <img src={`${imagen}?w=100&h=100&fit=crop`} alt="" />
                        </button>
                    {/each}
                </div>
            {/if}
            
            {#if selectedServiceLevel === 'bespoke'}
                <p class="text-xs text-center mt-4 text-[#c0a062] italic">
                    * La imagen muestra un esquema genérico. Tu diseño será único.
                </p>
            {/if}
        </div>

        <div class="detalles-columna">
            <nav aria-label="Ruta de navegación" class="breadcrumbs-container">
                <ol class="breadcrumbs-list">
                    <li><a href="/">Inicio</a></li>
                    <li class="separator">/</li>
                    <li><a href="/productos">Colección</a></li>
                    {#if product.category}
                        <li class="separator">/</li>
                        <li><a href="/productos?categoria={product.category.slug}">{product.category.title}</a></li>
                    {/if}
                    <li class="separator">/</li>
                    <li><span class="current">{product.title}</span></li>
                </ol>
            </nav>

            <h1 class="titulo-producto">{product.title}</h1>
            
            <div class="precio-container">
                <span class="precio">${currentPrice.toLocaleString('es-MX')} MXN</span>
            </div>

            <div class="descripcion">
                <p>{product.description || 'Una pieza de historia forjada para perdurar.'}</p>
            </div>

            <div class="separador"></div>

            <div class="opciones-servicio mb-8">
                <h3 class="label-seccion">Selecciona tu Acabado</h3>
                <div class="grid grid-cols-1 gap-4">
                    <button 
                        class="opcion-card {selectedServiceLevel === 'standard' ? 'activa' : ''}"
                        on:click={() => selectedServiceLevel = 'standard'}
                    >
                        <div class="flex justify-between w-full items-center">
                            <div class="text-left">
                                <span class="titulo-opcion">Edición Clásica</span>
                                <span class="desc-opcion">Diseño fiel al registro histórico del apellido.</span>
                            </div>
                            <div class="radio-circle">
                                {#if selectedServiceLevel === 'standard'} <div class="radio-dot"></div> {/if}
                            </div>
                        </div>
                    </button>

                    <button 
                        class="opcion-card {selectedServiceLevel === 'bespoke' ? 'activa' : ''} {isBespokeDisabled ? 'deshabilitada' : ''}"
                        on:click={() => { if (!isBespokeDisabled) selectedServiceLevel = 'bespoke'; }}
                        disabled={isBespokeDisabled}
                    >
                        <div class="flex justify-between w-full items-center">
                            <div class="text-left relative">
                                <span class="titulo-opcion text-[#c0a062]">
                                    Bespoke (A la Medida)
                                    {#if isBespokeLocked}
                                        <span class="etiqueta-estado pronto">Próximamente</span>
                                    {/if}
                                    {#if isBespokeSoldOut}
                                        <span class="etiqueta-estado agotado">Agotado</span>
                                    {/if}
                                </span>
                                <span class="desc-opcion">Investigación profunda, rediseño único y ceremonia digital.</span>
                            </div>
                            
                            {#if !isBespokeDisabled}
                                <div class="radio-circle">
                                    {#if selectedServiceLevel === 'bespoke'} <div class="radio-dot"></div> {/if}
                                </div>
                            {:else}
                                <span class="text-gray-600 text-xl">🔒</span>
                            {/if}
                        </div>
                    </button>
                </div>
            </div>

            <div class="variantes-container">
                {#if tallasUnicas.length > 0}
                    <div class="grupo-variante">
                        <h3 class="label-seccion">Talla</h3>
                        <div class="botones-grid">
                            {#each tallasUnicas as talla}
                                {@const variantAsoc = variantsData.find(v => v.size === talla)}
                                {@const status = variantAsoc?.availabilityStatus}
                                {@const isLocked = status === 'coming_soon'}
                                {@const isSoldOut = status === 'sold_out'}
                                {@const isDisabled = isLocked || isSoldOut}
                                {@const isSelected = tallaSeleccionada === talla}

                                <button
                                    class="boton-variante {isSelected ? 'seleccionado' : ''} {isDisabled ? 'deshabilitado' : ''}"
                                    disabled={isDisabled}
                                    on:click={() => { if (!isDisabled) tallaSeleccionada = talla }}
                                >
                                    <span class="texto-boton">{talla}</span>
                                    {#if isLocked} <div class="etiqueta-flotante">Pronto</div> {/if}
                                    {#if isSoldOut} <div class="etiqueta-flotante agotado">Agotado</div> {/if}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}

                {#if coloresUnicos.length > 0}
                    <div class="grupo-variante">
                        <h3 class="label-seccion">Color</h3>
                        <div class="botones-grid">
                            {#each coloresUnicos as color}
                                {@const isSelected = colorSeleccionado === color}
                                <button
                                    class="boton-variante color {isSelected ? 'seleccionado' : ''}"
                                    on:click={() => colorSeleccionado = color}
                                >
                                    <span class="bolita-color" 
                                          style="background-color: {color === 'Amarillo' ? '#FFD700' : color === 'Negro' ? '#000' : '#fff'}">
                                    </span>
                                    <span class="texto-boton">{color}</span>
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

            <button
    class="boton-compra"
    on:click={handleAddToCart}
    disabled={isAdding || isProductHidden || (tallasUnicas.length > 0 && !tallaSeleccionada)}
    class:hidden-btn={isProductHidden} >
    {#if isAdding}
        <span class="animate-pulse">Agregando...</span>
    {:else if isProductHidden}
        No disponible temporalmente
    {:else}
        Agregar al Legado — ${currentPrice.toLocaleString('es-MX')}
    {/if}
</button>
            
            <p class="garantia-texto">
                🔒 Compra segura. Envíos globales asegurados.
            </p>

        </div>
    {:else}
        <div class="loading-container">
            <div class="loading-text">Cargando legado...</div>
        </div>
    {/if}
</div>

<style>
    /* --- BASE --- */
    :global(body) { background-color: #121212; color: #e0e0e0; }
    .producto-container { max-width: 1200px; margin: 0 auto; padding: 140px 2rem 80px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: start; }
    
    .loading-container { display: flex; justify-content: center; align-items: center; height: 50vh; width: 100%; grid-column: 1 / -1; }
    .loading-text { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #c0a062; animation: pulse 2s infinite; }
    @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }

    /* --- GALERÍA --- */
    .galeria-columna { position: sticky; top: 120px; }
    .imagen-principal-container { width: 100%; aspect-ratio: 1/1; background-color: #1a1a1a; border-radius: 4px; overflow: hidden; border: 1px solid #333; position: relative; }
    .imagen-animada { width: 100%; height: 100%; object-fit: cover; }
    
    .thumbnails { display: flex; gap: 10px; margin-top: 15px; overflow-x: auto; padding-bottom: 5px; }
    .thumbnail-wrapper { width: 70px; height: 70px; border: 1px solid #333; border-radius: 4px; overflow: hidden; opacity: 0.6; transition: all 0.3s; cursor: pointer; flex-shrink: 0; }
    .thumbnail-wrapper:hover, .thumbnail-wrapper.active { opacity: 1; border-color: #c0a062; }
    .thumbnail-wrapper img { width: 100%; height: 100%; object-fit: cover; }

    /* --- BREADCRUMBS --- */
    .breadcrumbs-container { margin-bottom: 2rem; width: 100%; }
    .breadcrumbs-list { display: flex; flex-wrap: wrap; align-items: center; list-style: none; padding: 0; margin: 0; gap: 0.5rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888; }
    .breadcrumbs-list a { text-decoration: none; color: #888; transition: color 0.2s; white-space: nowrap; }
    .breadcrumbs-list a:hover { color: #c0a062; }
    .separator { color: #444; font-size: 0.7rem; }
    .current { color: #c0a062; font-weight: bold; }
    
    /* --- TEXTOS --- */
    .titulo-producto { font-family: "Palatino Linotype", serif; font-size: 2.8rem; line-height: 1.1; margin-bottom: 10px; color: #fff; }
    .precio { font-size: 1.5rem; color: #c0a062; font-weight: bold; letter-spacing: 1px; }
    .descripcion { margin-top: 20px; color: #aaa; line-height: 1.6; font-size: 1rem; }
    .separador { height: 1px; background: #333; margin: 30px 0; }
    .label-seccion { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 10px; display: block; font-weight: bold; }

    /* --- OPCIONES SERVICIO (TARJETAS GRANDES) --- */
    .opcion-card { width: 100%; background: transparent; border: 1px solid #333; padding: 15px 20px; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-align: left; }
    .opcion-card:hover:not(:disabled) { border-color: #666; background: #1a1a1a; }
    .opcion-card.activa { border-color: #c0a062; background: rgba(192, 160, 98, 0.05); }
    
    .opcion-card.deshabilitada { background-color: #1a1a1a; border-color: #2a2a2a; opacity: 0.6; cursor: not-allowed; }
    .opcion-card.deshabilitada .titulo-opcion, .opcion-card.deshabilitada .desc-opcion { color: #555 !important; }

    .titulo-opcion { display: block; font-weight: bold; color: #e0e0e0; font-size: 1rem; margin-bottom: 2px; }
    .desc-opcion { display: block; font-size: 0.85rem; color: #888; }
    
    .radio-circle { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #555; display: flex; align-items: center; justify-content: center; }
    .activa .radio-circle { border-color: #c0a062; }
    .radio-dot { width: 10px; height: 10px; background-color: #c0a062; border-radius: 50%; }

    /* Etiquetas de estado (Próximamente/Agotado) */
    .etiqueta-estado { display: inline-block; font-size: 0.6rem; text-transform: uppercase; padding: 2px 6px; border-radius: 2px; margin-left: 8px; vertical-align: middle; letter-spacing: 0.5px; font-weight: bold; }
    .etiqueta-estado.pronto { background-color: rgba(192, 160, 98, 0.1); color: #c0a062; border: 1px solid #c0a062; }
    .etiqueta-estado.agotado { background-color: rgba(255, 107, 107, 0.1); color: #ff6b6b; border: 1px solid #ff6b6b; }

    /* --- VARIANTES (BOTONES PEQUEÑOS) --- */
    .variantes-container { margin: 1.5rem 0 2rem 0; display: flex; flex-direction: column; gap: 1.5rem; }
    .grupo-variante { display: flex; flex-direction: column; gap: 0.5rem; }
    .botones-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }

    .boton-variante {
        position: relative; padding: 0.8rem 1.2rem; background-color: transparent; border: 1px solid #444; color: #ccc; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; min-width: 70px; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    }
    .texto-boton { font-size: 0.9rem; font-weight: 500; text-transform: uppercase; }

    .boton-variante:hover:not(.deshabilitado):not(.seleccionado) { border-color: #c0a062; color: #c0a062; }
    .boton-variante.seleccionado { background-color: #c0a062; border-color: #c0a062; color: #121212; font-weight: bold; box-shadow: 0 0 10px rgba(192, 160, 98, 0.3); }
    .boton-variante.deshabilitado { background-color: #1a1a1a; border-color: #333; color: #555; cursor: not-allowed; opacity: 0.8; }

    .etiqueta-flotante { position: absolute; top: -8px; right: -5px; font-size: 0.6rem; text-transform: uppercase; background-color: #121212; color: #c0a062; padding: 0 4px; font-weight: bold; letter-spacing: 0.5px; border: 1px solid #333; }
    .etiqueta-flotante.agotado { color: #ff6b6b; }
    
    .bolita-color { display: block; width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); }

    /* --- BOTÓN COMPRA --- */
    .boton-compra { width: 100%; background-color: #c0a062; color: #000; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; padding: 18px; border: none; border-radius: 4px; cursor: pointer; margin-top: 30px; font-size: 1rem; transition: all 0.3s; }
    .boton-compra:hover:not(:disabled) { background-color: #dcb87a; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(192, 160, 98, 0.2); }
    .boton-compra:disabled { background-color: #333; color: #666; cursor: not-allowed; }

    .garantia-texto { text-align: center; font-size: 0.8rem; color: #555; margin-top: 15px; }
.boton-compra:disabled {
    background-color: #333;
    color: #666;
    cursor: not-allowed;
}
    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
        .producto-container { grid-template-columns: 1fr; gap: 40px; padding-top: 100px; }
        .galeria-columna { position: static; }
        .titulo-producto { font-size: 2rem; }
    }
    
</style>