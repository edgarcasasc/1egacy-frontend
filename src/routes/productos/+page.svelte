<script lang="ts">
    import { page } from '$app/stores'; 

    export let data;
    const safeBaseUrl = 'https://somos1egacy.com';

    // Estado reactivo para los filtros
    let selectedCategorySlug = 'todos';
    let searchTerm = '';

    // Datos del servidor
    $: products = data.products || [];
    $: categoryFilters = data.categoryFilters || [{ title: 'Todos', slug: 'todos' }];
    $: activeLinajeFilter = data.activeLinajeFilter || null; 

    // Lógica reactiva para filtrar productos
    $: filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategorySlug === 'todos' || (product.category && product.category.slug === selectedCategorySlug);
        const searchMatch = !searchTerm || (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return categoryMatch && searchMatch;
    });

    // --- Meta Tags Dinámicos ---
    $: pageTitle = activeLinajeFilter
        ? `Colección del Linaje ${activeLinajeFilter.charAt(0).toUpperCase() + activeLinajeFilter.slice(1)} | 1egacy`
        : "Colección de Legados | 1egacy";
    
    // Copy actualizado para SEO
    const pageDescription = "Piezas creadas a partir de linajes e historias reales. Diseñadas para exhibir, conservar y heredar.";
    $: canonicalUrl = `${safeBaseUrl}${$page.url.pathname}`;

    // --- HELPER: Formateo de Títulos y Extractos ---
    // Esto asegura consistencia visual (Escudo de... — Familia Soto)
    function formatProductInfo(title) {
        if (!title) return { displayTitle: 'Pieza de Colección', excerpt: 'Una pieza única para tu legado.' };
        
        // Intentamos detectar si el título tiene "Familia" o "Linaje" para separarlo
        const regex = /(?:Familia|Linaje)\s+(.*)/i;
        const match = title.match(regex);
        
        if (match) {
            const surname = match[1]; // "Soto"
            const type = title.split(regex)[0].trim(); // "Escudo de Escritorio"
            
            // Capitalizar tipo de pieza si viene en minúsculas
            const typeCap = type.charAt(0).toUpperCase() + type.slice(1);

            return {
                displayTitle: `${typeCap} — Familia ${surname}`,
                excerpt: `${typeCap} — Linaje ${surname}. Una pieza para exhibir y preservar el legado.`
            };
        }
        
        // Si el título no sigue el patrón estándar, lo devolvemos limpio
        return {
            displayTitle: title,
            excerpt: `${title}. Una pieza para exhibir y preservar el legado.`
        };
    }

    // --- HELPER: Renombrado de Categorías en Frontend ---
    function formatCategoryName(cat) {
        if (cat.slug === 'todos') return 'Ver todo';
        if (cat.slug === 'escudo-impreso-en-3d' || cat.title.toLowerCase().includes('3d')) return 'Escudo 3D';
        return cat.title;
    }

    // --- SCHEMA GRAPH ---
    function createCollectionSchema(prods, domain) {
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "CollectionPage",
                    "@id": `${domain}/productos/#collection`,
                    "url": `${domain}/productos`,
                    "name": pageTitle,
                    "description": pageDescription,
                    "isPartOf": { "@id": `${domain}/#website` },
                    "about": { "@id": `${domain}/#organization` },
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": prods.slice(0, 15).map((p, i) => ({
                            "@type": "ListItem",
                            "position": i + 1,
                            "url": `${domain}/productos/${p.slug}`
                        }))
                    }
                }
            ]
        };
    }

    $: collectionSchema = createCollectionSchema(filteredProducts, safeBaseUrl);
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:site_name" content="1egacy" />
    <meta property="og:image" content="{safeBaseUrl}/1egacy-og-logo.jpg" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />

    {#if collectionSchema}
        {@html `<script type="application/ld+json">${JSON.stringify(collectionSchema)}</script>`}
    {/if}
</svelte:head>

<div class="catalog-container">
    <aside class="sidebar">
        <h2>Filtrar</h2>

        {#if activeLinajeFilter}
            <div class="active-linaje-filter">
                <span>Linaje: <strong>{activeLinajeFilter}</strong></span>
                <a href="/productos" class="reset-link" title="Quitar filtro">×</a>
            </div>
        {/if}

        <div class="filter-section">
            <label for="search-legacy">Buscar</label>
            <input type="search" id="search-legacy" placeholder="Buscar por apellido o pieza (ej. Soto, escudo...)" bind:value={searchTerm}/>
        </div>

        <div class="filter-section">
            <h3>Tipo de pieza</h3>
            
            <div class="category-select-mobile">
                <select bind:value={selectedCategorySlug} aria-label="Seleccionar tipo de pieza">
                    {#each categoryFilters as category}
                        <option value={category.slug}>{formatCategoryName(category)}</option>
                    {/each}
                </select>
            </div>

            <nav class="category-filters-desktop" aria-label="Filtros de tipo de pieza">
                <ul>
                    {#each categoryFilters as category}
                        <li>
                            <button on:click={() => selectedCategorySlug = category.slug} class:active={selectedCategorySlug === category.slug}>
                                {formatCategoryName(category)}
                            </button>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
        
        <p class="filter-microcopy">Mostrando piezas disponibles.</p>
    </aside>

    <main class="main-content">
        <header class="catalog-header">
            <h1 class="title-serif">Colección</h1>
            {#if activeLinajeFilter}
                <p>Piezas exclusivas del linaje <strong>{activeLinajeFilter}</strong>.</p>
            {:else}
                <p>Piezas creadas a partir de linajes e historias reales. Diseñadas para exhibir, conservar y heredar.</p>
                <p class="header-sub">Cada pieza pertenece a un linaje específico. Busca tu apellido para ver lo disponible.</p>
            {/if}
        </header>

        {#if filteredProducts.length > 0}
            <div class="product-grid">
                {#each filteredProducts as product (product.slug)}
                    {@const info = formatProductInfo(product.title)}
                    
                    <a href="/productos/{product.slug}" class="product-card">
                        <div class="product-image-container">
                            {#if product.mainImageUrl}
                                <img src={product.mainImageUrl} alt={info.displayTitle}>
                            {:else}
                                <div class="placeholder-image"><span>Imagen Próx.</span></div>
                            {/if}
                        </div>
                        
                        <div class="product-info">
                             <h3>{info.displayTitle}</h3>
                             
                             <p class="product-excerpt">{info.excerpt}</p>
                             
                             <div class="card-footer">
                                 <div class="product-price">
                                     {product.price ? `$MXN ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Consultar'}
                                 </div>
                                 <span class="btn-ver-pieza">Ver pieza</span>
                             </div>
                        </div>
                    </a>
                {/each}
            </div>
        {:else}
            <div class="no-products-message">
                <p>
                    {#if searchTerm || selectedCategorySlug !== 'todos' || activeLinajeFilter}
                        No se encontraron piezas que coincidan con{#if activeLinajeFilter} el linaje <strong>{activeLinajeFilter}</strong> y{/if} tus filtros.
                    {:else}
                        No hay piezas disponibles en este momento. Vuelve pronto.
                    {/if}
                </p>
            </div>
        {/if}
    </main>
</div>

<style>
    /* LAYOUT */
    .catalog-container { display: grid; grid-template-columns: 260px 1fr; gap: 50px; max-width: 1400px; margin: 0 auto; padding: 0px 40px 80px 40px; }
    
    /* HEADER */
    .catalog-header { text-align: center; margin-bottom: 60px; border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 30px; }
    .catalog-header h1 { font-size: 3em; margin-bottom: 15px; color: #c0a062; font-family: 'Playfair Display', serif; }
    .catalog-header p { font-size: 1.15em; color: #e0e0e0; max-width: 750px; margin: 0 auto 10px; line-height: 1.5; }
    .header-sub { font-size: 0.95em !important; color: #888 !important; }

    /* SIDEBAR */
    .sidebar { background-color: #111; padding: 30px 25px; border-radius: 4px; border: 1px solid #222; height: fit-content; position: sticky; top: 120px; }
    .sidebar h2 { font-family: 'Source Sans 3', sans-serif; font-size: 1.4em; margin-top: 0; margin-bottom: 25px; color: #f5f5f5; border-bottom: 1px solid #333; padding-bottom: 15px; text-transform: uppercase; letter-spacing: 0.05em; }
    
    .filter-section { margin-bottom: 35px; }
    .filter-section label, .filter-section h3 { display: block; font-weight: 700; color: #c0a062; margin-bottom: 12px; font-size: 0.95em; text-transform: uppercase; }
    .filter-section input[type="search"] { width: 100%; padding: 12px; background-color: #1a1a1a; border: 1px solid #444; color: #e0e0e0; border-radius: 4px; font-size: 0.9em; transition: border-color 0.3s; }
    .filter-section input[type="search"]:focus { border-color: #c0a062; outline: none; }

    .active-linaje-filter { background-color: rgba(192, 160, 98, 0.15); border: 1px solid #c0a062; padding: 12px; margin-bottom: 30px; border-radius: 4px; font-size: 0.9em; display: flex; justify-content: space-between; align-items: center; color: #fff; }
    .reset-link { color: #fff; font-size: 1.5em; font-weight: bold; text-decoration: none; line-height: 1; }

    .filter-microcopy { font-size: 0.75rem; color: #666; margin-top: 20px; border-top: 1px solid #222; padding-top: 15px; }

    /* GRID DE PRODUCTOS */
    .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
    
    .product-card { 
        background-color: #111; 
        border: 1px solid #222;
        border-radius: 6px; 
        overflow: hidden; 
        transition: transform 0.3s ease, border-color 0.3s ease; 
        text-decoration: none; 
        color: inherit; 
        display: flex; 
        flex-direction: column; 
    }
    .product-card:hover { 
        transform: translateY(-5px); 
        border-color: #c0a062;
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }

    .product-image-container { width: 100%; aspect-ratio: 1/1; position: relative; background-color: #1a1a1a; overflow: hidden; }
    .product-image-container img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .product-card:hover .product-image-container img { transform: scale(1.05); }
    
    .product-info { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }
    .product-info h3 { 
        font-family: 'Source Sans 3', sans-serif; 
        font-size: 1.1em; 
        font-weight: 700; 
        color: #e0e0e0; 
        margin: 0 0 10px 0; 
        line-height: 1.3;
    }
    
    .product-excerpt {
        font-size: 0.85em;
        color: #999;
        margin-bottom: 20px;
        line-height: 1.5;
        flex-grow: 1;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    .product-price { font-size: 1.1em; font-weight: 700; color: #c0a062; }
    
    .btn-ver-pieza {
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: 700;
        color: #fff;
        background: transparent;
        border: 1px solid #444;
        padding: 6px 12px;
        border-radius: 4px;
        transition: all 0.3s;
    }
    .product-card:hover .btn-ver-pieza {
        background: #c0a062;
        border-color: #c0a062;
        color: #000;
    }

    /* Categorías */
    .category-select-mobile { display: none; }
    .category-filters-desktop button { 
        background: none; 
        border: none; 
        color: #888; 
        padding: 8px 0; 
        text-align: left; 
        width: 100%; 
        cursor: pointer; 
        transition: color 0.2s ease; 
        font-size: 0.95em;
    }
    .category-filters-desktop button:hover { color: #ccc; }
    .category-filters-desktop button.active { color: #c0a062; font-weight: 700; padding-left: 10px; border-left: 2px solid #c0a062; }

    .no-products-message { grid-column: 1 / -1; text-align: center; color: #888; padding: 40px; border: 1px dashed #333; border-radius: 8px; }

    /* RESPONSIVO */
    @media (max-width: 1024px) { 
        .product-grid { grid-template-columns: repeat(2, 1fr); } 
        .catalog-container { gap: 30px; }
    }
    @media (max-width: 768px) { 
        .catalog-container { grid-template-columns: 1fr; padding: 40px 20px; } 
        .sidebar { position: static; margin-bottom: 40px; }
        .category-select-mobile { display: block; }
        .category-select-mobile select { width: 100%; padding: 10px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px; }
        .category-filters-desktop { display: none; }
    }
    @media (max-width: 480px) { .product-grid { grid-template-columns: 1fr; } }
</style>