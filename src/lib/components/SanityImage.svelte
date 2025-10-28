<script>
	import { urlFor } from '$lib/imageBuilder'; // Importamos el constructor de URLs

	/**
	 * Estas props son inyectadas automáticamente por el componente <PortableText>
	 * cuando se configura en la opción `components.types`.
	 * @type {{ portableText: import('@portabletext/svelte').CustomBlockComponentProps<SanityImageValue> }}
	 */
	export let portableText;

	// Obtenemos el objeto de valor de la imagen
	const { value } = portableText;

	let imageUrl;
	let altText;
	/** @type {number | undefined} */
	let imageWidth; // Variable para el ancho
	/** @type {number | undefined} */
	let imageHeight; // Variable para el alto
	/** @type {number | undefined} */
	let aspectRatio; // Variable para aspect ratio

	// Nos aseguramos de que el 'value' y el 'asset' con sus metadatos existan antes de construir la URL
	if (value && value.asset && value.asset.metadata && value.asset.metadata.dimensions) {
		// Construimos la URL de la imagen.
		imageUrl = urlFor(value)
			.width(800) // Define un ancho base para la URL (no afecta el layout inicial)
			.auto('format')
			.url();

		// Obtenemos el texto alternativo. Es crucial para SEO y accesibilidad.
		// *** IMPORTANTE: Asegúrate de añadir un buen 'alt' text en Sanity para la imagen del caballo ***
		altText = value.alt || 'Imagen descriptiva del artículo'; // Fallback genérico si alt está vacío

		// ¡Obtenemos las dimensiones originales!
		imageWidth = value.asset.metadata.dimensions.width;
		imageHeight = value.asset.metadata.dimensions.height;
		aspectRatio = value.asset.metadata.dimensions.aspectRatio;

	} else {
		// Loguea un error si faltan las dimensiones para depuración
		console.error("Error: Faltan metadatos de dimensiones para la imagen:", value?.asset?._id || value?.asset?._ref);
		// Intentamos construir la URL incluso sin dimensiones, pero sin width/height
		if (value && value.asset) {
			imageUrl = urlFor(value).auto('format').url();
			altText = value.alt || 'Imagen descriptiva del artículo';
		}
	}
</script>

{#if imageUrl}
	<figure>
		<img
			src={imageUrl}
			alt={altText}
			loading="lazy"
			width={imageWidth ?? undefined}   height={imageHeight ?? undefined}  style={
				aspectRatio
					? `aspect-ratio: ${aspectRatio}; background-color: #eee;` /* Usa aspect-ratio si existe */
					: 'background-color: #eee;' /* Solo background si no existe */
			} />

		{#if value.caption}
			<figcaption>{value.caption}</figcaption>
		{/if}
	</figure>
{:else}
	<div style="background-color: #fdd; border: 1px solid red; padding: 1rem;">
		<strong>Error de Imagen:</strong> No se pudo cargar la imagen o faltan dimensiones. Verifica la consulta GROQ y que el asset exista en Sanity. ID del asset (si existe): {value?.asset?._ref || value?.asset?._id || 'No disponible'}
	</div>
{/if}

<style>
	figure {
		margin: 2rem 0; /* Espaciado vertical para la imagen */
		padding: 0;
		max-width: 100%; /* Asegura que la figura no exceda el contenedor */
	}
	img {
		width: 100%; /* Mantiene la imagen responsiva */
		height: auto; /* Permite que la altura se ajuste automáticamente según el aspect-ratio */
		max-width: 100%; /* Asegura que la imagen no se desborde */
		border-radius: 8px; /* Estética moderna */
		display: block; /* Clave para que width/height/aspect-ratio funcionen bien */
		background-color: #eee; /* Color de fondo mientras carga (importante con aspect-ratio) */
	}
	figcaption {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: #666; /* Ajusta el color si tu fondo es oscuro */
		text-align: center;
		font-style: italic;
	}
</style>