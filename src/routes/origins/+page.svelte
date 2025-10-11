<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import LinajeModal from '../../components/LinajeModal.svelte'; // Importamos el componente del modal

  // --- Variables de estado para controlar el modal ---
  let mostrarModal = false;
  let apellidoSeleccionado = '';

  // --- Datos de los linajes ---
  const linajes = [
    { id: 'Garza' },
    { id: 'Martínez' },
    { id: 'Treviño' },
    { id: 'Villarreal' },
    { id: 'González' },
    { id: 'De la Garza' },
    { id: 'Elizondo' },
  ];

  // --- Funciones para abrir y cerrar el modal ---
  function abrirModal(apellido) {
    apellidoSeleccionado = apellido;
    mostrarModal = true;
  }

  function cerrarModal() {
    mostrarModal = false;
  }
  
  onMount(() => {
    const svg = d3.select('#constelacion-svg');
    const width = 1200;
    const height = 600;

    const simulation = d3.forceSimulation(linajes)
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const nodes = svg.append('g')
      .selectAll('circle')
      .data(linajes)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('fill', '#c0a062')
      .style('cursor', 'pointer')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('click', (event, d) => abrirModal(d.id)); // <-- EVENTO CLICK AÑADIDO

    const labels = svg.append('g')
      .selectAll('text')
      .data(linajes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('font-size', '12px')
      .attr('fill', '#e0e0e0')
      .style('pointer-events', 'none');

    function handleMouseOver(event, d) {
      d3.select(this).transition().duration(200).attr('r', 12).attr('fill', '#ffffff');
      labels.filter(ld => ld.id === d.id).transition().duration(200).attr('font-size', '16px').attr('font-weight', 'bold');
    }

    function handleMouseOut(event, d) {
      d3.select(this).transition().duration(200).attr('r', 8).attr('fill', '#c0a062');
      labels.filter(ld => ld.id === d.id).transition().duration(200).attr('font-size', '12px').attr('font-weight', 'normal');
    }

    simulation.on('tick', () => {
      nodes.attr('cx', d => d.x).attr('cy', d => d.y);
      labels.attr('x', d => d.x + 18).attr('y', d => d.y + 5);
    });
  });
</script>

<div class="origins-container">
  <div class="manifesto">
    <h1>El Legado del Linaje</h1>
    <p>
      Tu apellido es la clave de un universo de historias no contadas. En 1egacy
      ORIGINS, nos dedicamos a la arqueología de la identidad, rastreando los
      orígenes de linajes para revelar las sagas que te dieron forma.
    </p>
  </div>

  <div class="constelacion-wrapper">
    <svg id="constelacion-svg"></svg>
  </div>
</div>

{#if mostrarModal}
  <LinajeModal apellido={apellidoSeleccionado} onCerrar={cerrarModal} />
{/if}

<style>
  .origins-container {
    padding-top: 120px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .manifesto {
    text-align: center;
    max-width: 800px;
    margin-bottom: 4rem;
  }

  .manifesto h1 {
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .manifesto p {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .constelacion-wrapper {
    width: 100%;
    max-width: 1200px;
    height: 600px;
    border: 1px solid #333;
    margin-top: 2rem;
  }

  #constelacion-svg {
    width: 100%;
    height: 100%;
  }
</style>