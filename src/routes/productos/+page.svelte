<script lang="ts">
    import { page } from '$app/stores'; 

    export let data;
    const safeBaseUrl = 'https://somos1egacy.com';

    // Estado reactivo para los filtros (Tu lógica original)
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
        ? `Productos del Linaje ${activeLinajeFilter.charAt(0).toUpperCase() + activeLinajeFilter.slice(1)} | 1egacy`
        : "Catálogo de Productos | 1egacy";
    
    const pageDescription = "Descubre nuestras creaciones únicas que encapsulan el legado familiar.";
    $: canonicalUrl = `${safeBaseUrl}${$page.url.pathname}`;

    // --- SCHEMA GRAPH (Refuerzo SEO) ---
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
    <link rel="canonical" href={canonicalUrl} />
    
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:url" content={canonicalUrl} />
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
        <h2>Filtrar Legados</h2>

        {#if activeLinajeFilter}
            <div class="active-linaje-filter">
                <span>Mostrando linaje: <strong>{activeLinajeFilter}</strong></span>
                <a href="/productos" class="reset-link" title="Mostrar todos los linajes">×</a>
            </div>
        {/if}

        <div class="filter-section">
            <label for="search-legacy">Buscar por nombre:</label>
            <input type="search" id="search-legacy" placeholder="Buscar producto..." bind:value={searchTerm}/>
        </div>

        <div class="filter-section">
            <h3>Categorías</h3>
            <div class="category-select-mobile">
                <select bind:value={selectedCategorySlug} aria-label="Seleccionar categoría">
                    {#each categoryFilters as category}
                        <option value={category.slug}>{category.title}</option>
                    {/each}
                </select>
            </div>
            <nav class="category-filters-desktop" aria-label="Filtros de categoría">
                <ul>
                    {#each categoryFilters as category}
                        <li>
                            <button on:click={() => selectedCategorySlug = category.slug} class:active={selectedCategorySlug === category.slug}>
                                {category.title}
                            </button>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    </aside>

    <main class="main-content">
        <header class="catalog-header">
            <h1 class="title-serif">Nuestras Creaciones</h1>
            {#if activeLinajeFilter}
                <p>Explorando los artículos exclusivos del linaje <strong>{activeLinajeFilter}</strong>.</p>
            {:else}
                <p>Objetos que encapsulan el legado. Piezas únicas donde la historia familiar se encuentra con la maestría artesanal.</p>
            {/if}
        </header>

        {#if filteredProducts.length > 0}
            <div class="product-grid">
                {#each filteredProducts as product (product.slug)}
                    <a href="/productos/{product.slug}" class="product-card">
                        <div class="product-image-container">
                            {#if product.mainImageUrl}
                                <img src={product.mainImageUrl} alt={product.title || 'Producto 1egacy'}>
                            {:else}
                                <div class="placeholder-image"><span>Imagen Próx.</span></div>
                            {/if}
                        </div>
                        <div class="product-info">
                             <h3>{product.title || 'Nombre no disponible'}</h3>
                             <p>{product.description ? (product.description.length > 100 ? product.description.substring(0, 97) + '...' : product.description) : 'Descripción próximamente.'}</p>
                             <div class="product-price">
                                 {product.price ? `$MXN ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Precio no disponible'}
                             </div>
                        </div>
                    </a>
                {/each}
            </div>
        {:else}
            <p class="no-products-message">
                {#if searchTerm || selectedCategorySlug !== 'todos' || activeLinajeFilter}
                    No se encontraron productos que coincidan con{#if activeLinajeFilter} el linaje <strong>{activeLinajeFilter}</strong> y{/if} tus filtros actuales.
                {:else}
                    No hay productos disponibles en este momento. Vuelve pronto.
                {/if}
            </p>
        {/if}
    </main>
</div>

<style>
    /* UNIFICACIÓN DE ESTILOS - Sin cambiar tu diseño */
    .catalog-container { display: grid; grid-template-columns: 250px 1fr; gap: 40px; max-width: 1400px; margin: 0 auto; padding: 100px 40px 60px 40px; }
    .catalog-header { text-align: center; margin-bottom: 60px; border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 30px; }
    .catalog-header h1 { font-size: 2.8em; margin-bottom: 15px; }
    .catalog-header p { font-size: 1.2em; color: #bdbdbd; max-width: 700px; margin: 0 auto; text-transform: capitalize; }
    
    .sidebar { background-color: #1a1a1a; padding: 30px 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); height: fit-content; position: sticky; top: 100px; }
    .sidebar h2 { font-family: "Palatino Linotype", serif; font-size: 1.6em; margin-top: 0; margin-bottom: 30px; color: #f5f5f5; border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 15px; }
    
    .filter-section { margin-bottom: 30px; }
    .filter-section label, .filter-section h3 { display: block; font-weight: 600; color: #c0a062; margin-bottom: 10px; font-size: 1.1em; }
    .filter-section input[type="search"] { width: 100%; padding: 10px 12px; background-color: #2c2c2c; border: 1px solid #444; color: #e0e0e0; border-radius: 5px; font-size: 0.95em; }

    .active-linaje-filter { background-color: rgba(192, 160, 98, 0.1); border: 1px solid rgba(192, 160, 98, 0.3); padding: 10px 15px; margin-bottom: 30px; border-radius: 5px; font-size: 0.9em; display: flex; justify-content: space-between; align-items: center; }
    .reset-link { color: #aaa; font-size: 1.4em; font-weight: bold; text-decoration: none; }

    .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
    .product-card { background-color: #1a1a1a; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; color: inherit; display: flex; flex-direction: column; }
    .product-card:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); }
    .product-image-container { width: 100%; padding-top: 100%; position: relative; background-color: #222; }
    .product-image-container img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
    
    .product-info { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
    .product-info h3 { font-family: 'Source Sans 3', sans-serif; font-size: 1.3em; font-weight: 600; color: #e0e0e0; margin: 0 0 10px 0; }
    .product-price { font-size: 1.2em; font-weight: bold; color: #c0a062; margin-top: auto; text-align: right; }

    .category-select-mobile { display: none; }
    .category-filters-desktop button { background: none; border: none; color: #bdbdbd; padding: 5px 0; text-align: left; width: 100%; cursor: pointer; transition: color 0.2s ease; }
    .category-filters-desktop button.active { color: #c0a062; font-weight: bold; }

    @media (max-width: 1023px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { 
        .catalog-container { grid-template-columns: 1fr; padding: 80px 20px 40px; } 
        .sidebar { position: static; margin-bottom: 40px; }
        .category-select-mobile { display: block; }
        .category-filters-desktop { display: none; }
    }
    @media (max-width: 480px) { .product-grid { grid-template-columns: 1fr; } }
</style>