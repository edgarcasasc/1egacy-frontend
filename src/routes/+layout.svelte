<script>
  import Navbar from '../components/Navbar.svelte';
</script>
<svelte:head>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>
<Navbar />

<main>
  <slot />
</main>

<style>
  /* --- 1. IMPORTACIÓN DE FUENTES --- */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap');

  /* --- 2. REGLAS GLOBALES DEL CUERPO --- */
  :global(body) {
    background-color: #121212;
    color: #e0e0e0;
    font-family: 'Source Sans 3', sans-serif; /* Fuente por defecto para todo */
    font-weight: 400;
    line-height: 1.6;
  }

  /* --- 3. SISTEMA DE TÍTULOS (H1, H2, H3) --- */
  :global(h1), :global(h2), :global(h3) {
    font-family: 'Playfair Display', serif; /* Fuente Serif para títulos */
    font-weight: 400;
    color: #c0a062; /* Color dorado para dar énfasis */
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  :global(h1) {
    font-size: 3.5rem;
    font-weight: 700; /* Más peso para el título principal */
  }

  :global(h2) {
    font-size: 2.5rem;
    margin-top: 3rem;
  }

  :global(h3) {
    font-size: 1.8rem;
    margin-top: 2.5rem;
  }
  
  /* --- 4. SISTEMA DE PÁRRAFOS Y ENLACES --- */
  :global(p) {
    max-width: 750px; /* Asegura una longitud de línea cómoda para leer */
    margin-bottom: 1.5rem;
    color: #b0b0b0; /* Un gris un poco más suave que el blanco puro */
  }

  :global(a) {
    color: #c0a062;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  :global(a:hover) {
    color: #ffffff;
  }

  /* --- 5. ESTILOS BASE (SIN CAMBIOS) --- */
  main {
    padding: 0;
    margin: 0;
  }
</style>