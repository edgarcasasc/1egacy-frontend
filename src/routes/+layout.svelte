<script>
  import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />

<main>
  <slot />
</main>

<style>
  /* :global(body) selecciona el cuerpo de toda la página */
  :global(body) {
    background-color: #121212; /* Un fondo oscuro y elegante */
    color: #e0e0e0; /* Un color de texto casi blanco, fácil de leer */
    font-family: sans-serif; /* Una fuente simple y moderna para empezar */
  }

  main {
    /* Esto es opcional, pero ayuda a asegurar que el layout principal
       no tenga márgenes o paddings extraños por defecto. */
    padding: 0;
    margin: 0;
  }
</style>