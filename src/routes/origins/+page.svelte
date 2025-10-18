<script>
	// Imports
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import LinajeModal from '../../components/LinajeModal.svelte';
	import Navbar from '../../components/Navbar.svelte';

	export let data;

	// --- LÓGICA DEL MODAL ---
	let mostrarModal = false;
	let linajeSeleccionado = null;
	function abrirModal(linaje) {
		linajeSeleccionado = linaje;
		mostrarModal = true;
	}
	function cerrarModal() {
		mostrarModal = false;
	}

	// --- LÓGICA DE BÚSQUEDA Y FORMULARIO ---
	let terminoBusqueda = '';
	let svgElement;
	let isSubmitting = false; // Variable para controlar el estado de envío
	let formStatusMessage = ''; // Variable para mostrar mensajes al usuario

	// Filtra los linajes que vienen de Sanity
	$: linajesFiltrados =
		!data.linajes
			? []
			: terminoBusqueda === ''
			? data.linajes
			: data.linajes.filter((l) =>
					l.id.toLowerCase().includes(terminoBusqueda.toLowerCase())
				);

	// --- FUNCIÓN DEL FORMULARIO ---
	async function handleFormSubmit(event) {
		isSubmitting = true;
		formStatusMessage = '';
		const form = event.target;
		const email = form.elements.email.value;

		const payload = { 
			tipo: 'Lead de Investigacion',
			apellido: terminoBusqueda, 
			email: email 
		};

		try {
			const response = await fetch('https://api.somos1egacy.com/capture-lead', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				formStatusMessage = '¡Gracias! Te notificaremos pronto.';
				form.reset();
			} else {
				formStatusMessage = 'Error: No se pudo enviar tu solicitud.';
			}
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
			formStatusMessage = 'Error de conexión. Por favor, inténtalo de nuevo.';
		} finally {
			isSubmitting = false;
		}
	}

	// --- LÓGICA DE LA CONSTELACIÓN (D3) ---
	function dibujarConstelacion(datos) {
		if (!svgElement || !datos || datos.length === 0) return;
		const svg = d3.select(svgElement);
		svg.selectAll('*').remove();

		const width = svgElement.clientWidth;
		const height = svgElement.clientHeight;

		const simulation = d3.forceSimulation(datos)
			.force('charge', d3.forceManyBody().strength(-150))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force('x', d3.forceX(width / 2).strength(0.05))
			.force('y', d3.forceY(height / 2).strength(0.05));

		const nodes = svg.append('g').selectAll('circle').data(datos).enter().append('circle')
			.attr('r', 8).attr('fill', '#c0a062').style('cursor', 'pointer')
			.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut)
			.on('click', (event, d) => abrirModal(d));

		const labels = svg.append('g').selectAll('text').data(datos).enter().append('text')
			.text((d) => d.id).attr('font-size', '12px').attr('fill', '#e0e0e0').style('pointer-events', 'none');

		function handleMouseOver(event, d) { /* ... */ }
		function handleMouseOut(event, d) { /* ... */ }

		simulation.on('tick', () => {
			nodes
				.attr('cx', (d) => (d.x = Math.max(12, Math.min(width - 12, d.x))))
				.attr('cy', (d) => (d.y = Math.max(12, Math.min(height - 12, d.y))));
			labels.attr('x', (d) => d.x + 18).attr('y', (d) => d.y + 5);
		});
	}

	$: if (svgElement && data.linajes) {
		dibujarConstelacion(linajesFiltrados);
	}

	onMount(() => {
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				if (svgElement && data.linajes) {
					dibujarConstelacion(linajesFiltrados);
				}
			}, 200);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<svelte:head>
	<title>Constelación de Linajes | 1egacy</title>
	<meta name="description" content="Explora la historia y el legado de tu apellido en nuestra constelación de linajes. Descubre el origen de tu familia." />
</svelte:head>

<!-- Navbar ya se carga desde el layout, así que no la necesitamos aquí -->

<div class="origins-container">
	<div class="manifesto">
		<h1>El Legado del Linaje</h1>
		<p>Tu apellido es la clave de un universo de historias no contadas.</p>
	</div>
	<div class="buscador-wrapper">
		<input type="text" placeholder="Busca tu apellido..." bind:value={terminoBusqueda} />
	</div>

	{#if data.linajes && linajesFiltrados.length > 0}
		<div class="constelacion-wrapper">
			<svg id="constelacion-svg" bind:this={svgElement} />
		</div>
	{:else if terminoBusqueda !== ''}
		<div class="no-resultados-wrapper">
			<h3>El apellido "{terminoBusqueda}" aún no está en nuestra constelación.</h3>
			<p>Somos un estudio en constante investigación. Déjanos tu correo y te notificaremos.</p>
			
			<form class="formulario-interes" on:submit|preventDefault={handleFormSubmit}>
				<input type="email" name="email" placeholder="Tu correo electrónico" required disabled={isSubmitting} />
				<button type="submit" disabled={isSubmitting}>
					{#if isSubmitting} Enviando... {:else} Notificarme {/if}
				</button>
			</form>
			
			{#if formStatusMessage}
				<p class="form-status">{formStatusMessage}</p>
			{/if}
		</div>
	{:else}
		<div class="cargando-wrapper">
			<p>Cargando constelación...</p>
		</div>
	{/if}
</div>

{#if mostrarModal}
	<LinajeModal linaje={linajeSeleccionado} onCerrar={cerrarModal} />
{/if}

<style>
	/* Estilos para el formulario mejorado */
	.formulario-interes button:disabled { background-color: #555; cursor: not-allowed; }
	.form-status { margin-top: 1rem; font-size: 0.9rem; color: #c0a062; }

	.origins-container { padding-top: 120px; padding-bottom: 60px; display: flex; flex-direction: column; align-items: center; width: 100%; min-height: 100vh; box-sizing: border-box; }
	.manifesto { text-align: center; max-width: 800px; margin-bottom: 2rem; }
	.constelacion-wrapper { width: 100%; max-width: 1200px; height: 600px; border: 1px solid #333; border-radius: 8px; overflow: hidden; }
	#constelacion-svg { width: 100%; height: 100%; }
	.buscador-wrapper { margin-bottom: 2rem; width: 100%; max-width: 400px; }
	.buscador-wrapper input { width: 100%; padding: 1rem; background-color: #1a1a1a; border: 1px solid #333; color: #e0e0e0; font-size: 1.1rem; text-align: center; border-radius: 4px; }
	.no-resultados-wrapper, .cargando-wrapper { width: 100%; max-width: 1200px; height: 600px; border: 1px solid #333; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; }
	.formulario-interes { display: flex; width: 100%; max-width: 500px; }
	.formulario-interes input { flex-grow: 1; padding: 1rem; background-color: #1a1a1a; border: 1px solid #333; color: #e0e0e0; font-size: 1rem; border-right: none; border-radius: 4px 0 0 4px; }
	.formulario-interes button { background-color: #c0a062; color: #121212; border: 1px solid #c0a062; padding: 1rem 2rem; font-size: 1rem; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: background-color 0.3s ease; border-radius: 0 4px 4px 0; }
	
	@media (max-width: 768px) {
		.constelacion-wrapper, .no-resultados-wrapper, .cargando-wrapper { height: 500px; }
	}
	@media (max-width: 576px) {
		.origins-container { padding: 100px 1rem 40px 1rem; }
		.constelacion-wrapper, .no-resultados-wrapper, .cargando-wrapper { height: 60vh; }
	}
</style>

