<script>
  import { fade } from 'svelte/transition';

  export let linaje = {}; 
  export let onCerrar = () => {};

  $: apellido = linaje.id || '';
  $: introduccion = linaje.introduccion || 'Información no disponible.';
  $: escudoUrl = linaje.escudoUrl || ''; // <-- Obtenemos la URL del escudo
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
      <a href="/origins/{apellido}" class="cta-principal">Explorar Legado {apellido}</a>
      <button class="cta-secundario" on:click={onCerrar}>Cerrar</button>
    </div>
  </div>
</div>

<style>
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
  }

  /* NUEVOS ESTILOS PARA EL ESCUDO */
  .escudo-wrapper {
    margin: 0 auto 1.5rem auto;
    width: 120px;
    height: 120px;
  }

  .escudo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Asegura que el escudo se vea completo */
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 300;
    color: #c0a062;
    margin-bottom: 1rem;
  }

  .introduccion {
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 0.95rem;
    color: #b0b0b0;
  }
  
 .acciones {
    display: flex;
    flex-direction: row; /* <-- CAMBIA ESTO */
    gap: 1rem;
  }

  .cta-principal, .cta-secundario {
    display: block;
    width: 100%;
    padding: 1rem;
    text-align: center;
  }

  .cta-principal {
    background-color: #c0a062;
    color: #121212;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }
  .cta-principal:hover {
    background-color: #ffffff;
  }

  .cta-secundario {
    background-color: transparent;
    border: 1px solid #555;
    color: #aaa;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .cta-secundario:hover {
    background-color: #333;
    color: #fff;
  }
</style>