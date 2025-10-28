<script>
	import { fade } from 'svelte/transition';

	/**
	 * @typedef {object} LinajeData
	 * @property {string} id - The display name (e.g., "López")
	 * @property {string} slug - The URL-friendly slug (e.g., "lopez") // This is needed
	 * @property {string} [escudoUrl] - URL of the coat of arms image
	 * @property {string} [introduccion] - Introduction text
	 */

	/** @type {LinajeData} */
	export let linaje = {}; // Default to empty object to avoid errors
	export let onCerrar = () => {};

	// Derive values safely
	$: apellido = linaje?.id || 'Linaje Desconocido'; // Use optional chaining and fallback
	$: introduccion = linaje?.introduccion || 'Información no disponible.';
	$: escudoUrl = linaje?.escudoUrl || '';
	$: slug = linaje?.slug || ''; // <-- Obtenemos el slug

</script>

<div
	class="modal-background"
	on:click={onCerrar}
	on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') onCerrar(); }}
	role="button"
	tabindex="0"
	aria-label="Cerrar ventana modal"
	transition:fade={{ duration: 300 }}>

<div class="modal-content" on:click|stopPropagation transition:fade={{ duration: 300, delay: 150 }}>
	<h2>{apellido}</h2>
	{#if escudoUrl}
		<div class="escudo-wrapper">
			<img src={escudoUrl} alt="Escudo de Armas de {apellido}" />
		</div>
	{/if}
	<p class="introduccion">{introduccion}</p>

	<div class="acciones">
		{#if slug}
			<a href="/origins/{slug}" class="cta-principal">Explorar Legado {apellido}</a>
		{:else}
			<button class="cta-principal" disabled>Enlace no disponible</button>
		{/if}
		<button class="cta-secundario" on:click={onCerrar}>Cerrar</button>
	</div>
</div>
</div>

<style>
	/* --- Estilos sin cambios --- */
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.9); /* Más oscuro para más drama */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background-color: #1a1a1a;
		padding: 2rem;
		border: 1px solid #333;
		max-width: 450px; /* Un poco más estrecho para un formato vertical */
		width: 90%;
		text-align: center;
		border-radius: 8px; /* Añadido borde redondeado */
	}

	/* NUEVOS ESTILOS PARA EL ESCUDO */
	.escudo-wrapper {
		margin: 0 auto 1.5rem auto;
		width: 120px; /* Tamaño fijo */
		height: auto; /* Altura automática basada en ancho */
	}

	.escudo-wrapper img {
		width: 100%;
		height: auto; /* Cambiado de 100% a auto */
		object-fit: contain; /* Asegura que el escudo se vea completo */
		display: block; /* Evita espacio extra bajo la imagen */
	}

	h2 {
		font-size: 2.5rem;
		font-weight: 300; /* Coincide con estilo global H1/H2 */
		font-family: 'Playfair Display', serif; /* Coincide con estilo global H1/H2 */
		color: #c0a062;
		margin-bottom: 1rem;
		margin-top: 0; /* Quitar margen superior */
	}

	.introduccion {
		line-height: 1.6;
		margin-bottom: 2rem;
		font-size: 0.95rem;
		color: #b0b0b0;
		max-height: 150px; /* Limitar altura si es mucho texto */
		overflow-y: auto; /* Añadir scroll si excede */
		padding-right: 5px; /* Espacio para el scrollbar */
	}

 .acciones {
		display: flex;
		flex-direction: column; /* Cambiado a columna para mejor layout móvil */
		gap: 1rem;
		margin-top: 1.5rem; /* Añadir espacio sobre los botones */
	}

	/* Estilos comunes para botones */
	.cta-principal, .cta-secundario {
		display: block; /* Ocupan todo el ancho disponible */
		width: auto; /* Ancho automático */
		padding: 0.8rem 1.5rem; /* Ajustar padding */
		text-align: center;
		border-radius: 4px; /* Bordes redondeados consistentes */
		font-size: 0.95rem; /* Ligeramente más pequeño */
		font-weight: bold; /* Peso consistente */
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase; /* MAYÚSCULAS */
		font-family: 'Source Sans 3', sans-serif; /* Fuente estándar */
		border: 1px solid transparent; /* Borde base transparente */
	}

	.cta-principal {
		background-color: #c0a062;
		color: #121212;
		border-color: #c0a062;
		text-decoration: none; /* Asegurar que no haya subrayado */
	}
	.cta-principal:hover {
		background-color: #ffffff;
		color: #121212;
		border-color: #ffffff;
	}
	.cta-principal:disabled { /* Estilo para botón deshabilitado */
		background-color: #555;
		border-color: #555;
		color: #999;
		cursor: not-allowed;
	}


	.cta-secundario {
		background-color: transparent;
		border: 1px solid #555;
		color: #aaa;
	}
	.cta-secundario:hover {
		background-color: #333;
		border-color: #333;
		color: #fff;
	}

	/* Media query para botones lado a lado en pantallas más grandes si se prefiere */
	@media (min-width: 480px) {
		.acciones {
			flex-direction: row; /* Lado a lado en pantallas más anchas */
		}
		.cta-principal, .cta-secundario {
			flex: 1; /* Ocupan espacio equitativamente */
		}
	}
</style>