<script>
	import PreorderModal from '$lib/components/PreorderModal.svelte';
	import Navbar from '../../../components/Navbar.svelte'; 

	export let data;
	const { product, baseUrl } = data; 
	
	// *** INICIO CORRECCIÓN GALERÍA ***
	// Asegurémonos de usar SIEMPRE la misma fuente de datos para la galería.
	// Usa 'galleryImages' si existe (del server.js nuevo), si no, usa 'gallery' (del server.js viejo)
	$: gallerySource = product?.galleryImages || product?.gallery || []; 

	let imagenActiva = '';
	// Actualiza imagenActiva SOLO cuando gallerySource cambie y tenga elementos
	$: if (gallerySource.length > 0) {
		imagenActiva = gallerySource[0]; 
	} else {
		imagenActiva = ''; 
	}
	// *** FIN CORRECCIÓN GALERÍA ***

	// --- Lógica para Variantes (SIN CAMBIOS) ---
	$: variantsData = product?.variants || []; 
	$: tallasUnicas = [...new Set(variantsData.map(v => v.size).filter(Boolean))];
	$: coloresUnicos = [...new Set(variantsData.map(v => v.color).filter(Boolean))];
	
	let tallaSeleccionada = '';
	let colorSeleccionado = '';
	let mostrarModal = false;

	// --- Función createProductSchema (SIN CAMBIOS) ---
	function createProductSchema(productData, pageBaseUrl) {
		// ... (código existente del schema) ...
		// Verifica que esta línea use la fuente correcta:
		const mainImageForSchema = gallerySource?.[0] || null; 
		// ... (resto del código del schema) ...
		const schema = { /* ... */ };
		return schema;
	}
	const productSchema = createProductSchema(product, baseUrl);

	// --- Lógica de Pre-orden (SIN CAMBIOS) ---
	async function handlePreOrderSubmit(email) {
		// ... (código existente) ...
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
<Navbar /> 

<div class="producto-container">
	{#if product}
	<div class="galeria-columna">
			{#if product.linajeInfo}
				{/if}
			<div class="imagen-principal">
				{#if imagenActiva}
					<img src={imagenActiva} alt={product.title} /> 
				{/if}
			</div>
			<div class="thumbnails">
				{#if gallerySource.length > 0} 
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

		<div class="detalles-columna">
			<h1>{product.title}</h1>
			{#if product.price}
				<p class="precio">${product.price.toFixed(2)} MXN</p>
			{/if}
			<p class="descripcion">{product.description || 'Descripción no disponible.'}</p>
			
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

			<button 
				class="boton-compra" 
				on:click={() => mostrarModal = true}
				disabled={ (tallasUnicas.length > 0 && !tallaSeleccionada) || (coloresUnicos.length > 0 && !colorSeleccionado) } 
				aria-disabled={ (tallasUnicas.length > 0 && !tallaSeleccionada) || (coloresUnicos.length > 0 && !colorSeleccionado) }
			>
				Pre-ordenar
			</button>
		</div>
	{:else}
		<p>Cargando producto...</p>
	{/if}
</div>

{#if mostrarModal}
	<PreorderModal 
		producto={product.title} 
		onCerrar={() => mostrarModal = false}
		onEnviar={handlePreOrderSubmit}
	/>
{/if}

<style>
	/* --- ESTILOS (Originales + mejoras mínimas + disabled/active) --- */
	.producto-container { max-width: 1100px; margin: 0 auto; padding: 120px 2rem 60px 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
	.enlace-regresar { display: inline-block; margin-bottom: 2rem; color: #aaa; text-decoration: none; font-weight: 600; }
	.enlace-regresar:hover { color: #c0a062; }
	.galeria-columna { position: sticky; top: 120px; }
	.imagen-principal img { width: 100%; height: auto; display: block; border-radius: 8px; border: 1px solid #333; aspect-ratio: 1 / 1; object-fit: cover; } /* Ratio 1:1 */
	.thumbnails { display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 1rem; margin-top: 1rem; } /* Auto-fill */
	.thumbnail-wrapper { cursor: pointer; border: 2px solid #333; border-radius: 4px; overflow: hidden; transition: border-color 0.3s ease; aspect-ratio: 1 / 1; } 
	.thumbnail-wrapper:hover, .thumbnail-wrapper:focus { border-color: #c0a062; outline: none; }
	.thumbnail-wrapper.active { border-color: #ffffff; } /* Estilo thumbnail activo */
	.thumbnail-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; } 
	.detalles-columna h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #ffffff; } 
	.precio { font-size: 1.8rem; font-family: 'Playfair Display', serif; color: #c0a062; margin-bottom: 1.5rem; }
	.descripcion { margin-bottom: 2rem; color: #b0b0b0; line-height: 1.7; }
	.selectores { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; } /* Apilados */
	.selectores div { display: flex; flex-direction: column; gap: 0.5rem; } /* Grupo label+select */
	.selectores label { font-size: 0.9rem; color: #aaa; font-weight: 600; } /* Label */
	select { width: 100%; max-width: 300px; padding: 0.8rem 1rem; background-color: #1a1a1a; border: 1px solid #333; color: #e0e0e0; font-size: 1rem; border-radius: 4px; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23aaa' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 0 1 .708-.708L8 10.293l3.646-3.647a.5.5 0 0 1 .708.708l-4 4A.5.5 0 0 1 8 11.5z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 16px 12px; } /* Flecha custom */
	.boton-compra { width: 100%; max-width: 300px; background-color: #c0a062; color: #121212; padding: 1.2rem; font-size: 1.1rem; text-transform: uppercase; font-weight: bold; border: none; cursor: pointer; border-radius: 4px; transition: background-color 0.3s ease, opacity 0.3s ease; }
	.boton-compra:hover:not(:disabled) { background-color: #ffffff; }
	.boton-compra:disabled { background-color: #555; color: #999; cursor: not-allowed; opacity: 0.7; } /* Estilo disabled */

	/* Responsive */
	@media (max-width: 768px) {
		.producto-container { grid-template-columns: 1fr; gap: 2rem; padding-top: 100px; }
		.galeria-columna { position: static; top: auto; } 
		.detalles-columna { margin-top: 2rem; }
		.detalles-columna h1 { font-size: 2rem; }
		.precio { font-size: 1.5rem; }
		.selectores, .boton-compra { max-width: 100%; } 
	}
</style>