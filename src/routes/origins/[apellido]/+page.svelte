<script>
  import { page } from '$app/stores';

  // SvelteKit automáticamente nos da el valor de [apellido] desde la URL
  const apellido = $page.params.apellido;
</script>

<div class="linaje-container">
  <h1>El Legado de {apellido}</h1>
  <p>
    Bienvenido a la página dedicada a la historia del linaje {apellido}. Aquí
    encontrarás la investigación completa, los productos de legado y las
    historias que hemos desenterrado.
  </p>
</div>

<style>
  .linaje-container {
    padding-top: 120px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 300;
    color: #c0a062;
    margin-bottom: 2rem;
  }
</style>