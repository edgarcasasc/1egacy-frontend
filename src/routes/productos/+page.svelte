<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores'; // Importar $page store

	export let data;

	// Estado reactivo para los filtros
	let selectedCategorySlug = 'todos';
	let searchTerm = '';

	// Datos del servidor
	$: products = data.products || [];
	$: categoryFilters = data.categoryFilters || [{ title: 'Todos', slug: 'todos' }];
	$: activeLinajeFilter = data.activeLinajeFilter || null; // Recibir filtro de linaje activo

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
	// Usar $page.url para obtener la URL actual completa con parámetros
	$: canonicalUrl = `https://somos1egacy.com${$page.url.pathname}${$page.url.search}`;

</script>

<MetaTags
	title={pageTitle}
	description={pageDescription}
	canonical={canonicalUrl}
	openGraph={{ url: canonicalUrl, title: pageTitle, description: pageDescription, siteName: '1egacy' }}
	twitter={{ cardType: 'summary_large_image', title: pageTitle, description: pageDescription }}
/>

<div class="catalog-container">

	<!-- BARRA LATERAL (SIDEBAR) -->
	<aside class="sidebar">
		<h2>Filtrar Legados</h2>

		<!-- Indicador de filtro de linaje activo CON BOTÓN RESET -->
		{#if activeLinajeFilter}
			<div class="active-linaje-filter">
				<span> <!-- Envolver texto en span para mejor control -->
					Mostrando linaje: <strong>{activeLinajeFilter}</strong>
				</span>
				<!-- Enlace simple para resetear -->
				<a href="/productos" class="reset-link" title="Mostrar todos los linajes">×</a>
			</div>
		{/if}

		<!-- Buscador -->
		<div class="filter-section">
			<label for="search-legacy">Buscar por nombre:</label>
			<input type="search" id="search-legacy" placeholder="Buscar producto..." bind:value={searchTerm}/>
		</div>

		<!-- Filtros de Categoría -->
		<div class="filter-section">
			<h3>Categorías</h3>
			<!-- Select en móvil -->
			<div class="category-select-mobile">
				<select bind:value={selectedCategorySlug} aria-label="Seleccionar categoría">
					{#each categoryFilters as category}
						<option value={category.slug}>{category.title}</option>
					{/each}
				</select>
			</div>
			<!-- Lista en desktop -->
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

	<!-- CONTENIDO PRINCIPAL (GRID DE PRODUCTOS) -->
	<main class="main-content">
		<header class="catalog-header">
			<h1 class="title-serif">Nuestras Creaciones</h1>
			<!-- Subtítulo dinámico -->
			{#if activeLinajeFilter}
				<p>Explorando los artículos exclusivos del linaje <strong>{activeLinajeFilter}</strong>.</p>
			{:else}
				<p>Objetos que encapsulan el legado. Piezas únicas donde la historia familiar se encuentra con la maestría artesanal.</p>
			{/if}
		</header>

		<!-- Grid de Productos -->
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
			<!-- Mensaje "Sin productos" -->
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
	/* --- ESTILOS GLOBALES Y LAYOUT (sin cambios) --- */
	:global(body) { /*...*/ }
	h1, h2.title-serif { /*...*/ }
	.catalog-container { display: grid; grid-template-columns: 250px 1fr; gap: 40px; max-width: 1400px; margin: 0 auto; padding: 100px 40px 60px 40px; }
	.main-content { /*...*/ }
	.catalog-header { text-align: center; margin-bottom: 60px; border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 30px; }
	.catalog-header h1 { font-size: 2.8em; margin-bottom: 15px; }
	.catalog-header p { font-size: 1.2em; color: #bdbdbd; max-width: 700px; margin: 0 auto; text-transform: capitalize; /* Capitalizar nombre de linaje */}
	.no-products-message { text-align: center; font-size: 1.2em; color: #888; padding: 50px 0; }
	.no-products-message strong { text-transform: capitalize; } /* Capitalizar nombre de linaje */

	/* --- SIDEBAR --- */
	.sidebar { background-color: #1a1a1a; padding: 30px 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); height: fit-content; position: sticky; top: 100px; }
	.sidebar h2 { font-family: "Palatino Linotype", serif; font-size: 1.6em; margin-top: 0; margin-bottom: 30px; color: #f5f5f5; border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 15px; }
	.filter-section { margin-bottom: 30px; }
	.filter-section label, .filter-section h3 { display: block; font-weight: 600; color: #c0a062; margin-bottom: 10px; font-size: 1.1em; }
	.filter-section input[type="search"] { width: 100%; padding: 10px 12px; background-color: #2c2c2c; border: 1px solid #444; color: #e0e0e0; border-radius: 5px; font-size: 0.95em; }

	/* --- Indicador Filtro Linaje (ACTUALIZADO CON RESET LINK) --- */
	.active-linaje-filter {
		background-color: rgba(192, 160, 98, 0.1);
		border: 1px solid rgba(192, 160, 98, 0.3);
		padding: 10px 15px;
		margin-bottom: 30px;
		border-radius: 5px;
		font-size: 0.9em;
		color: #bdbdbd;
		display: flex; /* Para alinear texto y 'x' */
		justify-content: space-between;
		align-items: center;
		text-transform: capitalize; /* Poner primera letra mayúscula */
	}
	.active-linaje-filter span { /* Contenedor del texto */
		flex-grow: 1; /* Ocupa espacio disponible */
		margin-right: 10px; /* Espacio antes de la 'x' */
	}
	.active-linaje-filter strong {
		color: #e0e0e0;
		margin-left: 5px;
	}
	/* Estilo para el enlace 'x' de reseteo */
	.reset-link {
		color: #aaa;
		font-size: 1.4em; /* Hacer la 'x' un poco más grande */
		font-weight: bold;
		line-height: 1;
		text-decoration: none;
		padding: 0 5px; /* Área clicable */
		border-radius: 3px;
		transition: color 0.2s ease, background-color 0.2s ease;
	}
	.reset-link:hover {
		color: #121212; /* Texto oscuro */
		background-color: #aaa; /* Fondo gris claro */
	}
	/* --- FIN ESTILOS INDICADOR --- */

	/* Filtros Categoría (Select móvil / Lista desktop) */
	.category-select-mobile { display: none; }
	.category-select-mobile select { width: 100%; padding: 10px 12px; background-color: #2c2c2c; border: 1px solid #444; color: #e0e0e0; border-radius: 5px; font-size: 0.95em; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23aaa' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 0 1 .708-.708L8 10.293l3.646-3.647a.5.5 0 0 1 .708.708l-4 4A.5.5 0 0 1 8 11.5z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 16px 12px; }
	.category-filters-desktop ul { list-style: none; padding: 0; margin: 0; }
	.category-filters-desktop li { margin-bottom: 8px; }
	.category-filters-desktop button { background: none; border: none; color: #bdbdbd; padding: 5px 0; text-align: left; width: 100%; cursor: pointer; font-size: 1em; transition: color 0.2s ease; }
	.category-filters-desktop button:hover { color: #f5f5f5; }
	.category-filters-desktop button.active { color: #c0a062; font-weight: bold; }

	/* --- PRODUCT GRID Y CARD (sin cambios) --- */
	 .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; /* Forzar 3 columnas en desktop */ }
	 .product-card { background-color: #1a1a1a; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; color: inherit; display: flex; flex-direction: column; }
	 .product-card:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); }
	 .product-image-container { width: 100%; padding-top: 100%; position: relative; background-color: #222; }
	 .product-image-container img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
	 .placeholder-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #2a2a2a; color: #777; font-size: 0.9em; text-align: center; }
	 .product-info { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
	 .product-info h3 { font-family: 'Source Sans 3', sans-serif; font-size: 1.3em; font-weight: 600; color: #e0e0e0; margin: 0 0 10px 0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: calc(1.3em * 2); }
	 .product-info p { font-size: 0.95em; color: #bdbdbd; margin: 0 0 20px 0; flex-grow: 1; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: calc(1.5em * 3); }
	 .product-price { font-size: 1.2em; font-weight: bold; color: #c0a062; margin-top: auto; text-align: right; }

	/* --- RESPONSIVIDAD --- */
	@media (max-width: 1023px) { /* Tablet y móvil */
        .product-grid {
             grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablet */
             gap: 30px;
         }
    }
	@media (max-width: 768px) { /* Tablet pequeña y móvil */
		.catalog-container { grid-template-columns: 1fr; padding: 80px 20px 40px 20px; }
		.sidebar { position: static; margin-bottom: 40px; }
		.catalog-header h1 { font-size: 2.2em; }
		.catalog-header p { font-size: 1.1em; }
		.category-select-mobile { display: block; } /* Mostrar Select */
		.category-filters-desktop { display: none; } /* Ocultar Lista */
		/* .product-grid ya tiene 2 columnas por el breakpoint anterior */
	}
	 @media (max-width: 480px) { /* Móvil pequeño */
		 .catalog-container { padding: 60px 15px 30px 15px; }
		 .catalog-header h1 { font-size: 1.9em; }
		 .catalog-header p { font-size: 1em; }
		 .product-grid { grid-template-columns: 1fr; gap: 25px; } /* 1 columna móvil */
		 .product-info h3 { font-size: 1.2em; }
		 .product-info p { font-size: 0.9em; min-height: calc(1.5em * 2); -webkit-line-clamp: 2; }
		 .product-price { font-size: 1.1em; }
	 }
</style>

