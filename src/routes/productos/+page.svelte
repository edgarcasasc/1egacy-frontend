<script lang="ts">
	// Importamos los datos cargados por +page.server.js
	export let data;
	// Extraemos el array de productos para facilitar su uso
	$: products = data.products || [];

	// Puedes añadir MetaTags aquí también si lo deseas
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
		// images: [ ... ] // Añade una imagen OG representativa del catálogo
		siteName: '1egacy'
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: pageTitle,
		description: pageDescription,
		// image: '...', // Imagen para Twitter
		// imageAlt: '...'
	}}
/>

<div class="catalog-page">

	<header class="catalog-header">
		<h1 class="title-serif">Nuestras Creaciones</h1>
		<p>Objetos que encapsulan el legado. Piezas únicas donde la historia familiar se encuentra con la maestría artesanal.</p>
	</header>

	{#if products.length > 0}
		<div class="product-grid">
			{#each products as product (product.slug)} <a href="/productos/{product.slug}" class="product-card"> <div class="product-image-container">
						{#if product.mainImageUrl}
							<img src={product.mainImageUrl} alt={product.title || 'Producto 1egacy'}>
						{:else}
							<img src="/placeholder-default.webp" alt="Imagen no disponible">
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
		<p class="no-products-message">No hay productos disponibles en este momento. Vuelve pronto.</p>
	{/if}

</div>

<style>
    /* --- ESTILOS GLOBALES --- */
    /* (Mismos estilos globales que ya tienes: body, h1, h2.title-serif) */
     body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            margin: 0;
            background-color: #121212; /* Fondo oscuro principal */
            color: #e0e0e0;
            line-height: 1.6; /* Ajustado para mejor lectura */
        }
    h1, h2.title-serif {
            font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
            font-weight: 400;
            color: #f5f5f5;
            text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }

    /* Contenedor principal */
    .catalog-page {
        max-width: 1200px; margin: 0 auto; padding: 100px 40px 60px 40px;
    }

    /* --- TÍTULO --- */
    .catalog-header { text-align: center; margin-bottom: 60px;
        border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 30px; }
    .catalog-header h1 { font-size: 2.8em; margin-bottom: 15px; }
    .catalog-header p { font-size: 1.2em; color: #bdbdbd; max-width: 700px; margin: 0 auto; }

    /* --- GRID --- */
/* --- GRID DE PRODUCTOS --- */
.product-grid {
    display: grid;
    /* 1 columna por defecto (móvil) */
    grid-template-columns: 1fr;
    gap: 25px; /* Gap más pequeño para móvil */
}

/* 2 columnas en pantallas medianas (tablets) */
@media (min-width: 640px) { /* Ajusta este breakpoint si es necesario */
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px; /* Gap mediano */
    }
}

/* 3 columnas fijas en pantallas grandes (escritorio) */
@media (min-width: 1024px) { /* Ajusta este breakpoint si es necesario */
    .product-grid {
        grid-template-columns: repeat(3, 1fr); /* <-- CAMBIO CLAVE: Fija a 3 columnas */
        gap: 40px; /* Gap original para escritorio */
    }
}

/* (El resto de tus estilos .product-card, .product-image-container, etc., permanecen igual) */
    /* --- TARJETA --- */
    .product-card { background-color: #1a1a1a; border-radius: 10px; overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease;
        text-decoration: none; color: inherit; display: flex; flex-direction: column; }
    .product-card:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); }

    /* --- IMAGEN --- */
    .product-image-container { width: 100%; padding-top: 75%; /* Proporción 4:3 */ position: relative;
        background-color: #222; }
    .product-image-container img { position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        object-fit: cover; border-bottom: 1px solid #333; }

    /* --- INFO --- */
    .product-info { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
    .product-info h3 { font-family: -apple-system, BlinkMacSystemFont, /*...*/ sans-serif;
        font-size: 1.3em; font-weight: 600; color: #e0e0e0; margin: 0 0 10px 0; }
    .product-info p { font-size: 0.95em; color: #bdbdbd; margin: 0 0 20px 0;
        flex-grow: 1; line-height: 1.5;
        /* Limita descripción a 3 líneas con ellipsis (opcional) */
        display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;
        min-height: calc(1.5em * 3); /* Reserva espacio aprox para 3 líneas */
     }
    .product-price { font-size: 1.2em; font-weight: bold; color: #c0a062;
        margin-top: auto; text-align: right; }

    /* --- MENSAJE SIN PRODUCTOS --- */
    .no-products-message {
        text-align: center; font-size: 1.2em; color: #888; padding: 50px 0;
    }

    /* --- RESPONSIVIDAD --- */
    @media (max-width: 768px) {
        .catalog-page { padding: 80px 20px 40px 20px; }
        .catalog-header h1 { font-size: 2.2em; }
        .catalog-header p { font-size: 1.1em; }
        .product-grid { gap: 30px; }
    }
     @media (max-width: 480px) {
         .catalog-page { padding: 60px 15px 30px 15px; }
         .catalog-header h1 { font-size: 1.9em; }
         .catalog-header p { font-size: 1em; }
         .product-grid { grid-template-columns: 1fr; gap: 25px; }
         .product-info h3 { font-size: 1.2em; }
         .product-info p { font-size: 0.9em; min-height: calc(1.5em * 2); -webkit-line-clamp: 2;} /* Ajusta a 2 líneas en móvil */
         .product-price { font-size: 1.1em; }
     }
</style>