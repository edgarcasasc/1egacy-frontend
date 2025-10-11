<script>
  import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />

<main>
  <slot />
</main>

<style>
  main {
    /* Esto es opcional, pero ayuda a asegurar que el layout principal
       no tenga márgenes o paddings extraños por defecto. */
    padding: 0;
    margin: 0;
  }
</style>