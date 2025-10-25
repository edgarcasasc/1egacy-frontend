<script lang="ts">
    // Importamos los datos cargados por +page.server.js
    export let data;

    // Estado y Lógica de Filtros
    let selectedCategorySlug = 'todos';
    let searchTerm = '';
    $: products = data.products || [];
    $: categoryFilters = data.categoryFilters || [{ title: 'Todos', slug: 'todos' }];
    $: filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategorySlug === 'todos' || (product.category && product.category.slug === selectedCategorySlug);
        const searchMatch = !searchTerm || (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return categoryMatch && searchMatch;
    });

    import { MetaTags } from 'svelte-meta-tags';
    const pageTitle = "Catálogo de Productos | 1egacy";
    const pageDescription = "Descubre nuestras creaciones únicas que encapsulan el legado familiar con maestría artesanal.";
    const canonicalUrl = "https://somos1egacy.com/productos";
</script>

<MetaTags
    title={pageTitle}
    description={pageDescription}
    canonical={canonicalUrl}
    openGraph={{
        url: canonicalUrl,
        title: pageTitle,
        description: pageDescription,
        siteName: '1egacy'
     }}
    twitter={{
        cardType: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
     }}
/>

<!-- Contenedor Principal: Grid de 2 columnas (Sidebar + Contenido) -->
<div class="catalog-container">

    <!-- Columna 1: Barra Lateral (Sidebar) -->
    <aside class="sidebar">
        <h2>Filtrar Legados</h2>

        <!-- Buscador -->
        <div class="filter-section">
            <label for="search-legacy">Buscar por nombre:</label>
            <input
                type="search"
                id="search-legacy"
                placeholder="Buscar producto..."
                bind:value={searchTerm}
            />
        </div>

        <!-- Filtros de Categoría -->
        <div class="filter-section">
            <h3>Categorías</h3>

             <!-- Lista Desplegable para Móvil -->
             <div class="category-select-mobile">
                <label for="category-select" class="visually-hidden">Selecciona una categoría</label> <!-- Label oculto para accesibilidad -->
                 <select id="category-select" bind:value={selectedCategorySlug}>
                    {#each categoryFilters as category (category.slug)}
                         <option value={category.slug}>{category.title}</option>
                     {/each}
                 </select>
             </div>

            <!-- Lista de Botones para Desktop/Tablet -->
            <nav class="category-filters-desktop">
                <ul>
                    {#each categoryFilters as category (category.slug)}
                        <li>
                            <button
                                on:click={() => selectedCategorySlug = category.slug}
                                class:active={selectedCategorySlug === category.slug}
                            >
                                {category.title}
                            </button>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    </aside>

    <!-- Columna 2: Contenido Principal -->
    <main class="main-content">
        <header class="catalog-header">
            <h1 class="title-serif">Nuestras Creaciones</h1>
            <p>Objetos que encapsulan el legado. Piezas únicas donde la historia familiar se encuentra con la maestría artesanal.</p>
        </header>

        <!-- Sección de Productos: Grid Interno (responsivo) -->
        {#if products.length > 0}
             {#if filteredProducts.length > 0}
                <!-- Este DIV es el grid para las tarjetas -->
                <div class="product-grid">
                     {#each filteredProducts as product (product.slug)}
                        <a href="/productos/{product.slug}" class="product-card">
                            <div class="product-image-container">
                                {#if product.mainImageUrl}
                                    <img src={product.mainImageUrl} alt={product.title || 'Producto 1egacy'}>
                                {:else}
                                    <div class="placeholder-image">
                                        <span>Imagen Próximamente</span>
                                    </div>
                                {/if}
                            </div>
                            <div class="product-info">
                                <h3>{product.title || 'Nombre no disponible'}</h3>
                                <p>{product.description ? (product.description.length > 100 ? product.description.substring(0, 97) + '...' : product.description) : 'Descripción próximamente.'}</p>
                                <div class="product-price">
                                    {product.price ? `$MXN ${product.price.toLocaleString('es-MX')}` : 'Precio no disponible'}
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
             {:else}
                 <!-- Mensaje si los filtros no devuelven resultados -->
                <p class="no-products-message">
                    No se encontraron productos que coincidan con tus filtros. Prueba a ajustar la búsqueda o la categoría.
                </p>
             {/if}
        {:else}
             <!-- Mensaje si no hay productos en absoluto -->
            <p class="no-products-message">No hay productos disponibles en este momento. Vuelve pronto.</p>
        {/if}
    </main>

</div>

<style>
    /* --- ESTILOS GLOBALES --- */
    :global(body) {
        font-family: 'Source Sans 3', sans-serif; margin: 0;
        background-color: #121212; color: #e0e0e0; line-height: 1.6;
    }
    :global(h1, h2, h3) {
       font-family: 'Playfair Display', serif; font-weight: 400; color: #c0a062;
    }
    .title-serif {
         font-family: 'Playfair Display', serif; font-weight: 400; color: #f5f5f5;
    }

    /* Clase para ocultar visualmente pero mantener accesible */
    .visually-hidden {
        position: absolute; width: 1px; height: 1px; padding: 0;
        margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0);
        white-space: nowrap; border: 0;
    }

    /* --- ESTRUCTURA PRINCIPAL: SIDEBAR + CONTENT --- */
    .catalog-container {
        display: grid; grid-template-columns: 250px 1fr; gap: 40px;
        max-width: 1400px; margin: 0 auto;
        padding: 100px 40px 60px 40px;
    }

    /* --- ESTILOS SIDEBAR --- */
    .sidebar {
        background-color: #1a1a1a; padding: 30px 20px; border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3); height: fit-content;
        position: sticky; top: 100px; align-self: start;
    }
    .sidebar h2 {
        font-size: 1.6em; margin-top: 0; margin-bottom: 30px;
        color: #f5f5f5; border-bottom: 1px solid rgba(192, 160, 98, 0.2);
        padding-bottom: 15px;
    }
    .filter-section { margin-bottom: 30px; }
    .filter-section:last-child { margin-bottom: 0; }
    .filter-section label,
    .filter-section h3 {
        display: block; font-weight: 600; color: #c0a062;
        margin-bottom: 12px; font-size: 1.1em;
    }
    .filter-section input[type="search"] {
        width: 100%; padding: 10px 12px; background-color: #2c2c2c;
        border: 1px solid #444; color: #e0e0e0; border-radius: 5px;
        font-size: 0.95em; box-sizing: border-box;
    }

    /* --- Filtros de Categoría: Select (Móvil) vs Lista (Desktop) --- */
    .category-select-mobile { display: none; /* Oculto por defecto */ }
    .category-select-mobile select {
        width: 100%; padding: 10px 12px; background-color: #2c2c2c;
        border: 1px solid #444; color: #e0e0e0; border-radius: 5px;
        font-size: 1em; box-sizing: border-box; appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23aaa' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 0 1 .708-.708L8 10.293l3.646-3.647a.5.5 0 0 1 .708.708l-4 4A.5.5 0 0 1 8 11.5z'/%3E%3C/svg%3E");
        background-repeat: no-repeat; background-position: right 0.75rem center;
        background-size: 16px 12px; cursor: pointer;
    }
    .category-filters-desktop ul { list-style: none; padding: 0; margin: 0; }
    .category-filters-desktop li { margin-bottom: 8px; }
    .category-filters-desktop button {
        background: none; border: none; color: #bdbdbd; padding: 6px 0;
        text-align: left; width: 100%; cursor: pointer; font-size: 1em;
        transition: color 0.2s ease; border-radius: 4px;
    }
    .category-filters-desktop button:hover { color: #ffffff; }
    .category-filters-desktop button.active { color: #c0a062; font-weight: bold; }

    /* --- ESTILOS CONTENIDO PRINCIPAL --- */
    .main-content { /* Contenedor del header y product-grid */ }
    .catalog-header {
        text-align: center; margin-bottom: 60px;
        border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 30px;
    }
    .catalog-header h1 { font-size: 2.8em; margin-bottom: 15px; }
    .catalog-header p { font-size: 1.2em; color: #bdbdbd; max-width: 700px; margin: 0 auto; }

    /* --- ESTILOS GRID DE PRODUCTOS --- */
    .product-grid {
        display: grid;
        /* Default a 1 columna */
        grid-template-columns: 1fr;
        gap: 25px; /* Gap más pequeño para móvil */
        width: 100%;
    }

    /* Aplicar 2 columnas en pantallas medianas */
    @media (min-width: 640px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px; /* Gap mediano */
      }
    }

    /* --- CAMBIO CLAVE: Forzar 3 columnas en pantallas grandes --- */
    @media (min-width: 1024px) {
      .product-grid {
        /* Fija explícitamente a 3 columnas */
        grid-template-columns: repeat(3, 1fr);
        gap: 40px; /* Gap original */
      }
    }

    /* --- ESTILOS TARJETA DE PRODUCTO --- */
    .product-card {
        background-color: #1a1a1a; border-radius: 10px; overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        text-decoration: none; color: inherit;
        display: flex; flex-direction: column;
    }
    .product-card:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); }
    .product-image-container {
        width: 100%; padding-top: 75%; /* Ratio 4:3 */ position: relative;
        background-color: #222;
    }
    .product-image-container img {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        object-fit: cover; border-bottom: 1px solid #333;
    }
    .placeholder-image {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        background-color: #2a2a2a; color: #777; font-size: 0.9em;
        text-align: center; border-bottom: 1px solid #333;
    }
    .product-info { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
    .product-info h3 {
        font-family: 'Source Sans 3', sans-serif; font-size: 1.3em; font-weight: 600;
        color: #e0e0e0; margin: 0 0 10px 0;
    }
    .product-info p {
        font-size: 0.95em; color: #bdbdbd; margin: 0 0 20px 0; line-height: 1.5;
        display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
        overflow: hidden; text-overflow: ellipsis; min-height: calc(1.5em * 3);
        flex-grow: 1;
    }
    .product-price {
        font-size: 1.2em; font-weight: bold; color: #c0a062;
        margin-top: auto; text-align: right;
    }

    /* --- MENSAJE SIN PRODUCTOS --- */
    .no-products-message {
        text-align: center; font-size: 1.2em; color: #888; padding: 50px 0;
        grid-column: 1 / -1; /* Ocupa todo el ancho del grid padre si está vacío */
    }

    /* --- RESPONSIVIDAD GENERAL --- */
    @media (max-width: 768px) { /* Tablet y Móvil */
        .catalog-container {
            grid-template-columns: 1fr; /* Apila */
            padding: 80px 20px 40px 20px; gap: 30px;
        }
        .sidebar { position: static; top: auto; align-self: auto; }
        .catalog-header h1 { font-size: 2.2em; }
        .catalog-header p { font-size: 1.1em; }

        /* Mostrar Select, Ocultar Lista */
        .category-select-mobile { display: block; }
        .category-filters-desktop { display: none; }
        /* La regla @media (min-width: 640px) para 2 columnas sigue aplicando aquí */
    }

    @media (max-width: 639px) { /* Móvil pequeño */
         .product-grid { grid-template-columns: 1fr; gap: 25px; }
    }
    @media (max-width: 480px) {
        .catalog-container { padding: 60px 15px 30px 15px; }
        .catalog-header h1 { font-size: 1.9em; }
        .catalog-header p { font-size: 1em; }
         .product-info h3 { font-size: 1.2em; }
         .product-info p { font-size: 0.9em; min-height: calc(1.5em * 2); -webkit-line-clamp: 2; }
         .product-price { font-size: 1.1em; }
    }
</style>

