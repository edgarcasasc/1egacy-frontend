<script>
  import { fade } from 'svelte/transition';

  // 1. Ahora recibimos el objeto 'linaje' completo.
  export let linaje = {};
  export let onCerrar = () => {};

  // 2. Extraemos los datos del objeto para usarlos en el HTML.
  $: apellido = linaje.id || '';
  $: introduccion = linaje.introduccion || 'Información no disponible.';
  $: articulos = linaje.articulos || [];

</script>

<div class="modal-background" on:click={onCerrar} transition:fade={{ duration: 300 }}>
  <div class="modal-content" on:click|stopPropagation transition:fade={{ duration: 300, delay: 150 }}>
    <h2>{apellido}</h2>
    <p class="introduccion">{introduccion}</p>

    {#if articulos.length > 0}
      <div class="articulos-relacionados">
        <h4>Artículos Relacionados</h4>
        <ul>
          {#each articulos as articulo}
            <li><a href={articulo.url}>{articulo.titulo}</a></li>
          {/each}
        </ul>
      </div>
    {/if}

    <div class="acciones">
<a href="/origins/{apellido}" class="cta-principal">Explorar Legado {apellido}</a>
      <button class="cta-secundario" on:click={onCerrar}>Cerrar</button>
    </div>
  </div>
</div>

<style>
  /* El CSS se queda exactamente igual que en la versión anterior */
  .modal-background { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; }
  .modal-content { background-color: #1a1a1a; padding: 3rem; border: 1px solid #333; max-width: 600px; width: 90%; }
  h2 { font-size: 2.5rem; font-weight: 300; color: #c0a062; margin-bottom: 1.5rem; text-align: center; }
  .introduccion { line-height: 1.6; margin-bottom: 2rem; }
  .articulos-relacionados { margin-top: 2rem; }
  .articulos-relacionados h4 { font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 0.5rem; margin-bottom: 1rem; }
  .articulos-relacionados ul { list-style: none; padding: 0; }
  .articulos-relacionados li a { text-decoration: none; color: #e0e0e0; }
  .articulos-relacionados li a:hover { text-decoration: underline; color: #c0a062; }
  .acciones { margin-top: 2.5rem; display: flex; justify-content: center; gap: 1rem; }
  .cta-principal { background-color: #c0a062; color: #121212; border: none; padding: 1rem 2rem; font-size: 1rem; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: background-color 0.3s ease; }
  .cta-principal:hover { background-color: #ffffff; }
  .cta-secundario { background-color: transparent; border: 1px solid #555; color: #aaa; padding: 1rem 2rem; cursor: pointer; transition: all 0.3s ease; }
  .cta-secundario:hover { background-color: #333; color: #fff; }
  .cta-principal {
  /* ... tus estilos existentes ... */
  text-decoration: none; /* <-- AÑADE ESTA LÍNEA */
  display: inline-block; /* <-- AÑADE ESTA LÍNEA */
}
</style>