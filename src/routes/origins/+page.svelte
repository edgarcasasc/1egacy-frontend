<script>

  import { onMount } from 'svelte';

  import * as d3 from 'd3';

  import LinajeModal from '../../components/LinajeModal.svelte';



  export let data;



  let mostrarModal = false;

  let linajeSeleccionado = null;

  let terminoBusqueda = '';

  let svgElement;



  // Usamos el nombre 'linajes' como decidiste

  const linajes = [

    { id: 'Garza', introduccion: 'El linaje Garza, arraigado en la nobleza...', articulos: [] },

    { id: 'Martínez', introduccion: 'Descubre la historia de los Martínez...', articulos: [] },

    { id: 'Treviño', introduccion: 'De origen Cántabro...', articulos: [] },

    { id: 'Villarreal', introduccion: 'Información sobre Villarreal próximamente.', articulos: [] },

    { id: 'González', introduccion: 'Información sobre González próximamente.', articulos: [] },

    { id: 'De la Garza', introduccion: 'Información sobre De la Garza próximamente.', articulos: [] },

    { id: 'Elizondo', introduccion: 'Información sobre Elizondo próximamente.', articulos: [] },

  ];



  // La variable reactiva ahora filtra los datos que vienen de Sanity

  $: linajesFiltrados = terminoBusqueda === ''

    ? data.linajes

    : data.linajes.filter(l => l.id.toLowerCase().includes(terminoBusqueda.toLowerCase()));



  // Las funciones del modal y de D3 no necesitan grandes cambios

  function abrirModal(linaje) { linajeSeleccionado = linaje; mostrarModal = true; }

  function cerrarModal() { mostrarModal = false; }

 



   // Esta lógica se simplifica

  $: if (svgElement && data.linajes) {

    dibujarConstelacion(linajesFiltrados);

  }



 

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



  onMount(() => { if (svgElement) dibujarConstelacion(linajes); });

  $: if (svgElement) { dibujarConstelacion(linajesFiltrados); }

</script>



<div class="origins-container">

  <div class="manifesto">

    <h1>El Legado del Linaje</h1>

    <p>Tu apellido es la clave de un universo de historias no contadas.</p>

  </div>

  <div class="buscador-wrapper">

    <input type="text" placeholder="Busca tu apellido..." bind:value={terminoBusqueda} />

  </div>

  {#if linajesFiltrados.length > 0}

    <div class="constelacion-wrapper">

      <svg id="constelacion-svg" bind:this={svgElement}></svg>

    </div>

  {:else if terminoBusqueda !== ''}

    <div class="no-resultados-wrapper">

      <h3>El apellido "{terminoBusqueda}" aún no está en nuestra constelación.</h3>

      <p>Somos un estudio en constante investigación. Déjanos tu correo y te notificaremos.</p>

      <form class="formulario-interes" on:submit|preventDefault={handleFormSubmit}>

        <input type="email" name="email" placeholder="Tu correo electrónico" />

        <button type="submit">Notificarme</button>

      </form>

    </div>

  {/if}

</div>



{#if mostrarModal}

  <LinajeModal linaje={linajeSeleccionado} onCerrar={cerrarModal} />

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

  /* ... (tus estilos existentes van aquí arriba) ... */



.tooltip {

  background-color: #1a1a1a;

  border: 1px solid #c0a062;

  border-radius: 4px;

  padding: 1rem;

  width: 250px;

  pointer-events: none; /* Evita que el tooltip interfiera con el mouse */

  transition: opacity 0.3s ease;

  z-index: 10;

}



.tooltip h4 {

  margin: 0 0 0.5rem 0;

  color: #c0a062;

  font-family: 'Playfair Display', serif;

}



.tooltip p {

  margin: 0;

  font-size: 0.9rem;

  color: #b0b0b0;

}

</style>