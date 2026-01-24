<script lang="ts">
    import { addToCart } from '$lib/stores/cart';
    import { fade, fly } from 'svelte/transition';

    export let data;

    // Configuración base
    const safeBaseUrl = 'https://somos1egacy.com';

    // IMPORTANTE: product debe ser reactivo
    let product: any = {};
    $: product = data?.product ?? {};

    // --- 1) LÓGICA SEO ---

    // Título dinámico corrigiendo typos
    $: correctedTitle = (product.title ?? '').replace('Escitorio', 'Escritorio');
    
    // Evitamos duplicidad: Si el título ya tiene "Familia", lo dejamos, si no, lo construimos.
    $: displayTitle = correctedTitle; 

    $: pageTitle = `${displayTitle} | 1egacy`;

    // Descripción limpia para meta tags (aquí sí usamos la data dinámica para SEO)
    $: cleanDescription = (() => {
        const s = (product.description ?? '').replace(/\s+/g, ' ').trim();
        if (s.length <= 155) return s;
        return s.slice(0, 155).replace(/\s+\S*$/, '').trim() + '...';
    })();

    // Slug y Canonical
    $: currentSlug = product.slug || '';
    $: canonicalUrl = `${safeBaseUrl}/productos/${currentSlug}`;

    $: ogImage = product.mainImageUrl || `${safeBaseUrl}/1egacy-og-logo.jpg`;
    $: priceValidUntil = product.priceValidUntil || "2026-12-31";

    // --- 2) LÓGICA DE NEGOCIO ---
    let selectedServiceLevel = 'standard';
    let isAdding = false;
    let showSuccess = false;

    $: currentPrice = selectedServiceLevel === 'standard'
        ? (product.price || 0)
        : ((product.price || 0) * 1.5);

    // Galería
    $: gallerySource = product?.galleryImages || [];
    let imagenSeleccionadaGaleria = '';
    $: if (gallerySource.length > 0 && !imagenSeleccionadaGaleria) {
        imagenSeleccionadaGaleria = gallerySource[0];
    }
    
    // Lógica de imagen: Si es Bespoke, mostramos blueprint, si no, la galería.
    $: imageToDisplay = selectedServiceLevel === 'bespoke'
        ? '/blueprint-generico.webp' 
        : (imagenSeleccionadaGaleria || product.mainImageUrl || '/placeholder-default.webp');

    // Disponibilidad
    const availabilityMap: Record<string, string> = {
        'available': 'https://schema.org/InStock',
        'coming_soon': 'https://schema.org/PreOrder',
        'sold_out': 'https://schema.org/OutOfStock'
    };

    $: isBespokeDisabled = product.availabilityStatus === 'coming_soon' || product.availabilityStatus === 'sold_out';

    // --- 3) SCHEMA MARKUP ---
    function createProductGraph(p: any, title: string, desc: string, price: number, domain: string, slug: string, validUntil: string) {
        if (!p.title) return null;
        const productUrl = `${domain}/productos/${slug}`;

        return {
            "@context": "https://schema.org/",
            "@graph": [
                {
                    "@type": "Product",
                    "@id": `${productUrl}#product`,
                    "name": title,
                    "url": productUrl,
                    "brand": { "@type": "Brand", "name": "1egacy" },
                    "description": desc,
                    "sku": p.sku || p._id,
                    "image": [ p.mainImageUrl ? `${p.mainImageUrl}?w=1200` : "" ],
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "MXN",
                        "price": price,
                        "priceValidUntil": validUntil,
                        "itemCondition": "https://schema.org/NewCondition",
                        "availability": availabilityMap[p.availabilityStatus] || "https://schema.org/InStock",
                        "url": productUrl,
                        "seller": { "@id": `${domain}/#organization` }
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "@id": `${productUrl}#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
                        { "@type": "ListItem", "position": 2, "name": "Colección", "item": `${domain}/productos` }, // Cambiado a Colección
                        { "@type": "ListItem", "position": 3, "name": title, "item": productUrl }
                    ]
                }
            ]
        };
    }

    $: productSchema = createProductGraph(
        product,
        displayTitle,
        cleanDescription,
        currentPrice,
        safeBaseUrl,
        currentSlug,
        priceValidUntil
    );

    function handleAddToCart() {
        isAdding = true;
        addToCart({
            id: product._id,
            title: displayTitle,
            slug: currentSlug,
            price: currentPrice,
            image: imageToDisplay,
            customizationLevel: selectedServiceLevel,
            quantity: 1
        });

        setTimeout(() => {
            isAdding = false;
            showSuccess = true;
            setTimeout(() => showSuccess = false, 3500);
        }, 600);
    }
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={cleanDescription} />

    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={cleanDescription} />
    <meta property="og:type" content="product" />
    <meta property="og:image" content={ogImage} />
    <meta property="product:price:amount" content={currentPrice} />
    <meta property="product:price:currency" content="MXN" />

    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={cleanDescription} />
    <meta name="twitter:image" content={ogImage} />

    {#if productSchema}
        {@html `<script type="application/ld+json">${JSON.stringify(productSchema)}<\/script>`}
    {/if}
</svelte:head>

<div class="producto-container">
    {#if product && product.title}
        <div class="galeria-columna">
            <div class="imagen-principal-container">
                {#key imageToDisplay}
                    <img
                        src={imageToDisplay}
                        alt={displayTitle}
                        class="imagen-animada"
                        in:fade={{ duration: 300 }}
                    />
                {/key}
                <div class="badge-servicio">
                    {selectedServiceLevel === 'standard' ? 'Edición Histórica' : 'Edición Bespoke'}
                </div>
            </div>

            {#if selectedServiceLevel === 'standard' && gallerySource.length > 1}
                <div class="thumbnails">
                    {#each gallerySource as imagen, i}
                        <button
                            class="thumbnail-wrapper"
                            class:active={imagen === imagenSeleccionadaGaleria}
                            on:click={() => imagenSeleccionadaGaleria = imagen}
                        >
                            <img src={`${imagen}?w=100&h=100&fit=crop`} alt="Vista previa {i}" />
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="detalles-columna">
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                    <li><a href="/">Inicio</a></li>
                    <li>/</li>
                    <li><a href="/productos">Colección</a></li>
                    <li>/</li>
                    <li class="active">{displayTitle}</li>
                </ol>
            </nav>

            <h1 class="titulo-producto">{displayTitle}</h1>

            <div class="precio-block">
                <span class="precio">$MXN {currentPrice.toLocaleString('es-MX')}</span>
                {#if selectedServiceLevel === 'bespoke'}
                    <span class="iva-tag">+ Ceremonia de Narración</span>
                {/if}
            </div>

            <div class="descripcion">
                <p class="intro-desc">
                    Escudo 3D de escritorio inspirado en el linaje Soto. Alto relieve con acabado artesanal para exhibir y preservar un símbolo familiar con presencia y carácter.
                </p>
                <ul class="features-list">
                    <li><strong>Águila imperial:</strong> aspiración, visión y custodia.</li>
                    <li><strong>Candado:</strong> lealtad, discreción y protección.</li>
                    <li><strong>Acabados:</strong> imitación de madera antigua y metal forjado (oro y sable).</li>
                </ul>
                <p class="closing-desc">Una pieza de autoridad para quien construye futuro con memoria.</p>
            </div>

            <div class="separador"></div>

            <div class="selector-servicio">
                <h3 class="label-seccion">Elige tu edición</h3> <div class="opciones-grid">
                    
                    <button
                        class="opcion-card"
                        class:activa={selectedServiceLevel === 'standard'}
                        on:click={() => selectedServiceLevel = 'standard'}
                    >
                        <div class="opcion-info">
                            <span class="opcion-titulo">Edición Histórica <span class="status-tag">(lista para entrega)</span></span>
                            <span class="opcion-sub">Basada en nuestra investigación editorial del Códice.</span>
                        </div>
                        <div class="check-circle"></div>
                    </button>

                    <button
                        class="opcion-card"
                        class:activa={selectedServiceLevel === 'bespoke'}
                        class:deshabilitada={isBespokeDisabled}
                        disabled={isBespokeDisabled}
                        on:click={() => selectedServiceLevel = 'bespoke'}
                    >
                        <div class="opcion-info">
                            <span class="opcion-titulo">Edición Bespoke <span>(próximamente)</span></span>
                            <span class="opcion-sub">Rediseño a medida con dirección creativa del estudio.</span>
                            <span class="availability-micro">Disponible a partir de julio 2026.</span>
                        </div>
                        {#if isBespokeDisabled}
                            <span class="lock">🔒</span>
                        {:else}
                            <div class="check-circle"></div>
                        {/if}
                    </button>
                </div>
            </div>

            <button
                class="boton-compra"
                on:click={handleAddToCart}
                disabled={isAdding}
            >
                {#if isAdding} 
                    Procesando... 
                {:else} 
                    Agregar al carrito — $MXN {currentPrice.toLocaleString('es-MX')} 
                {/if}
            </button>
            <p class="shipping-micro">Envío y tiempos se calculan en checkout.</p>

            {#if showSuccess}
                <div in:fly={{ y: 10, duration: 400 }} out:fade={{ duration: 300 }} class="feedback-exito">
                    <span class="icono-check">✧</span>
                    <p>Pieza añadida al carrito correctamente.</p>
                    <a href="/carrito" class="enlace-directo">Ir a la Bóveda (Carrito) →</a>
                </div>
            {/if}

            <p class="nota-seguridad">🛡️ Incluye Sello 1egacy y ficha de pieza (edición y linaje).</p>
        </div>
    {/if}
</div>

<style>
    /* Estética Heráldica Moderna */
    .producto-container {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 5rem;
        max-width: 1300px;
        margin: 0 auto;
        padding: 0px 2rem 80px;
    }

    .galeria-columna { position: sticky; top: 120px; }

    .imagen-principal-container {
        background: #0d0d0d;
        border: 1px solid #1a1a1a;
        aspect-ratio: 1/1;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
    }

    .badge-servicio {
        position: absolute;
        top: 20px; left: 20px;
        background: rgba(0,0,0,0.85);
        color: #c0a062;
        padding: 6px 12px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        border: 1px solid rgba(192, 160, 98, 0.3);
    }

    .titulo-producto {
        font-family: 'Playfair Display', serif;
        font-size: 3.2rem;
        color: #fff;
        line-height: 1.1;
        margin-bottom: 1rem;
    }

    .precio-block {
        margin-bottom: 2rem;
        display: flex;
        align-items: baseline;
        gap: 1rem;
    }

    .precio {
        color: #c0a062;
        font-size: 2rem;
        font-weight: 700;
    }

    /* ESTILOS DE DESCRIPCIÓN MEJORADOS */
    .descripcion {
        font-size: 1rem;
        color: #ccc;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    .intro-desc { margin-bottom: 1rem; }
    .features-list {
        list-style: none;
        padding: 0;
        margin: 1.5rem 0;
        border-left: 2px solid #333;
        padding-left: 1rem;
    }
    .features-list li { margin-bottom: 0.5rem; color: #b0b0b0; }
    .features-list strong { color: #c0a062; }
    .closing-desc { font-style: italic; color: #888; }

    .separador { height: 1px; background: #222; margin: 2rem 0; }

    /* SELECTOR DE EDICIÓN */
    .label-seccion {
        font-size: 0.9rem;
        text-transform: uppercase;
        color: #888;
        margin-bottom: 1rem;
        letter-spacing: 0.05em;
    }

    .opcion-card {
        width: 100%;
        text-align: left;
        padding: 1.5rem;
        background: transparent;
        border: 1px solid #1a1a1a;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .opcion-card.activa {
        border-color: #c0a062;
        background: rgba(192, 160, 98, 0.03);
    }

    .opcion-titulo {
        display: block;
        color: #fff;
        font-weight: 600;
        margin-bottom: 0.3rem;
        font-size: 1rem;
    }
    
    .status-tag { font-size: 0.8rem; color: #888; font-weight: 400; }

    .opcion-sub {
        font-size: 0.85rem;
        color: #666;
        display: block;
    }
    
    .availability-micro {
        display: block;
        font-size: 0.75rem;
        color: #c0a062;
        margin-top: 5px;
        font-style: italic;
    }

    .check-circle {
        width: 18px; height: 18px;
        border: 1px solid #333;
        border-radius: 50%;
    }

    .activa .check-circle {
        border-color: #c0a062;
        background: #c0a062;
        box-shadow: inset 0 0 0 4px #000;
    }

    /* BOTÓN Y FOOTER */
    .boton-compra {
        width: 100%;
        padding: 1.2rem;
        background: #c0a062;
        color: #000;
        border: none;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-top: 2rem;
        cursor: pointer;
        transition: all 0.3s;
    }

    .boton-compra:hover:not(:disabled) {
        background: #fff;
        transform: translateY(-2px);
    }

    .boton-compra:disabled {
        background: #1a1a1a;
        color: #444;
        cursor: not-allowed;
    }
    
    .shipping-micro {
        text-align: center;
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.8rem;
    }

    .nota-seguridad {
        margin-top: 2rem;
        font-size: 0.9rem;
        color: #888;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .breadcrumbs ol {
        display: flex; gap: 0.5rem; list-style: none; padding: 0;
        margin-bottom: 2rem; font-size: 0.75rem; text-transform: uppercase; color: #444;
    }
    .breadcrumbs a { color: #888; text-decoration: none; }
    .breadcrumbs .active { color: #c0a062; }

    .feedback-exito {
        margin-top: 1.5rem; padding: 1.5rem;
        background: rgba(192, 160, 98, 0.05);
        border: 1px solid rgba(192, 160, 98, 0.3);
        text-align: center; border-radius: 4px;
    }
    .icono-check { color: #c0a062; font-size: 1.2rem; display: block; margin-bottom: 0.5rem; }
    .enlace-directo { color: #c0a062; font-weight: bold; text-decoration: underline; font-size: 0.85rem; text-transform: uppercase; }

    .thumbnails { display: flex; gap: 10px; margin-top: 20px; overflow-x: auto; padding-bottom: 5px; }
    .thumbnail-wrapper { width: 80px; height: 80px; border: 1px solid #1a1a1a; padding: 0; cursor: pointer; background: #000; border-radius: 4px; overflow: hidden; opacity: 0.6; transition: 0.3s; }
    .thumbnail-wrapper.active { border-color: #c0a062; opacity: 1; }
    .thumbnail-wrapper img { width: 100%; height: 100%; object-fit: cover; }

    @media (max-width: 900px) {
        .producto-container { grid-template-columns: 1fr; padding-top: 100px; gap: 3rem; }
        .galeria-columna { position: static; }
        .titulo-producto { font-size: 2.5rem; }
    }
</style>