<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import LinajeModal from '../../components/LinajeModal.svelte';

  // --- VARIABLES DE ESTADO ---
  let mostrarModal = false;
  let linajeSeleccionado = null;
  let terminoBusqueda = '';
  let svgElement;

  // --- LA MINI-BASE DE DATOS ---
  const todosLosLinajes = [
    { id: 'Garza', introduccion: 'El linaje Garza, arraigado en la nobleza...', articulos: [{ titulo: 'Los Garza y la Fundación de Monterrey', url: '/blog/garza-1' }] },
    { id: 'Martínez', introduccion: 'Descubre la historia de los Martínez...', articulos: [{ titulo: 'El Arte Perdido de la Forja', url: '/blog/martinez-1' }, { titulo: 'Isabel Martínez: La Matriarca', url: '/blog/martinez-2' }] },
    { id: 'Treviño', introduccion: 'De origen Cántabro, el apellido Treviño...', articulos: [{ titulo: 'Diego de Treviño y el Camino Real', url: '/blog/trevino-1' }] },
    { id: 'Villarreal', introduccion: 'Información sobre Villarreal próximamente.', articulos: [] },
    { id: 'González', introduccion: 'Información sobre González próximamente.', articulos: [] },
    { id: 'De la Garza', introduccion: 'Información sobre De la Garza próximamente.', articulos: [] },
    { id: 'Elizondo', introduccion: 'Información sobre Elizondo próximamente.', articulos: [] },
  ];

  // --- LÓGICA DE BÚSQUEDA ---
  $: linajesFiltrados = terminoBusqueda === ''
    ? todosLosLinajes
    : todosLosLinajes.filter(l => l.id.toLowerCase().includes(terminoBusqueda.toLowerCase()));

  // --- FUNCIONES DEL MODAL ---
  function abrirModal(linaje) { linajeSeleccionado = linaje; mostrarModal = true; }
  function cerrarModal() { mostrarModal = false; }

  // --- FUNCIÓN PARA ENVIAR DATOS A LA API ---
  async function handleFormSubmit(event) {
    const email = event.target.elements.email.value;
    if (!email) {
      alert('Por favor, ingresa un correo electrónico.');
      return;
    }

    // --- ¡MUY IMPORTANTE! REEMPLAZA LA IP DE ABAJO CON LA DE TU SERVIDOR ---
    const apiUrl = 'http://134.209.48.133:8000/capture-lead';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apellido: terminoBusqueda, email: email }),
      });
      
      if (response.ok) {
        alert('¡Gracias! Te notificaremos en cuanto tengamos noticias.');
        event.target.reset();
      } else {
        alert('Hubo un error al procesar la solicitud en el servidor.');
      }
    } catch (error) {
      alert('Error de conexión con el servidor. Revisa la consola para más detalles.');
      console.error('Error al enviar el formulario:', error);
    }
  }

  // --- CÓDIGO D3 PARA DIBUJAR LA CONSTELACIÓN ---
  function dibujarConstelacion(datos) {
    if (!svgElement || !datos) return;
    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();
    const width = 1200, height = 600;

    const simulation = d3.forceSimulation(datos).force('charge', d3.forceManyBody().strength(-150)).force('center', d3.forceCenter(width / 2, height / 2));
    const nodes = svg.append('g').selectAll('circle').data(datos).enter().append('circle').attr('r', 8).attr('fill', '#c0a062').style('cursor', 'pointer').on('mouseover', handleMouseOver).on('mouseout', handleMouseOut).on('click', (event, d) => abrirModal(d));
    const labels = svg.append('g').selectAll('text').data(datos).enter().append('text').text(d => d.id).attr('font-size', '12px').attr('fill', '#e0e0e0').style('pointer-events', 'none');

    function handleMouseOver(event, d) { d3.select(this).transition().duration(200).attr('r', 12).attr('fill', '#ffffff'); labels.filter(ld => ld.id === d.id).transition().duration(200).attr('font-size', '16px').attr('font-weight', 'bold'); }
    function handleMouseOut(event, d) { d3.select(this).transition().duration(200).attr('r', 8).attr('fill', '#c0a062'); labels.filter(ld => ld.id === d.id).transition().duration(200).attr('font-size', '12px').attr('font-weight', 'normal'); }

    simulation.on('tick', () => {
      nodes.attr('cx', d => d.x).attr('cy', d => d.y);
      labels.attr('x', d => d.x + 18).attr('y', d => d.y + 5);
    });
  }

  onMount(() => { if (svgElement) dibujarConstelacion(todosLosLinajes); });
  $: if (svgElement) { dibujarConstelacion(linajesFiltrados); }
</script>

<div class="origins-container">
  <div class="manifesto">
    <h1>El Legado del Linaje</h1>
    <p>
      Tu apellido es la clave de un universo de historias no contadas.
    </p>
  </div>

  <div class="buscador-wrapper">
    <input
      type="text"
      placeholder="Busca tu apellido..."
      bind:value={terminoBusqueda}
    />
  </div>

  {#if linajesFiltrados.length > 0}
    <div class="constelacion-wrapper">
      <svg id="constelacion-svg" bind:this={svgElement}></svg>
    </div>
  {:else if terminoBusqueda !== ''}
    <div class="no-resultados-wrapper">
      <h3>El apellido "{terminoBusqueda}" aún no está en nuestra constelación.</h3>
      <p>
        Somos un estudio en constante investigación. Déjanos tu correo y te notificaremos.
      </p>
      <form class="formulario-interes" on:submit|preventDefault={handleFormSubmit}>
        <input type="email" name="email" placeholder="Tu correo electrónico" />
        <button type="submit">Notificarme</button>
      </form>
    </div>
  {/if}
</div>

{#if mostrarModal}
  <LinajeModal {linajeSeleccionado} onCerrar={cerrarModal} />
{/if}

<style>
  .origins-container { padding-top: 120px; padding-bottom: 60px; display: flex; flex-direction: column; align-items: center; width: 100%; }
  .manifesto { text-align: center; max-width: 800px; margin-bottom: 2rem; }
  .manifesto h1 { font-size: 3rem; font-weight: 300; margin-bottom: 1rem; }
  .manifesto p { font-size: 1.1rem; line-height: 1.6; }
  .constelacion-wrapper { width: 100%; max-width: 1200px; height: 600px; border: 1px solid #333; }
  #constelacion-svg { width: 100%; height: 100%; }
  .buscador-wrapper { margin-bottom: 2rem; width: 100%; max-width: 400px; }
  .buscador-wrapper input { width: 100%; padding: 1rem; background-color: #1a1a1a; border: 1px solid #333; color: #e0e0e0; font-size: 1.1rem; text-align: center; }
  .buscador-wrapper input::placeholder { color: #666; }
  .buscador-wrapper input:focus { outline: none; border-color: #c0a062; }
  .no-resultados-wrapper { width: 100%; max-width: 1200px; height: 600px; border: 1px solid #333; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; }
  .no-resultados-wrapper h3 { font-size: 1.8rem; font-weight: 300; color: #c0a062; margin-bottom: 1.5rem; }
  .no-resultados-wrapper p { max-width: 500px; line-height: 1.6; margin-bottom: 2rem; }
  .formulario-interes { display: flex; width: 100%; max-width: 500px; }
  .formulario-interes input { flex-grow: 1; padding: 1rem; background-color: #1a1a1a; border: 1px solid #333; color: #e0e0e0; font-size: 1rem; border-right: none; }
  .formulario-interes input:focus { outline: none; border-color: #c0a062; }
  .formulario-interes button { background-color: #c0a062; color: #121212; border: 1px solid #c0a062; padding: 1rem 2rem; font-size: 1rem; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: background-color 0.3s ease; }
  .formulario-interes button:hover { background-color: #ffffff; }
</style>