<script>
  // Importa una herramienta de SvelteKit que nos da información sobre la página actual.
  import { page } from '$app/stores';

  // SvelteKit automáticamente pone el valor del [slug] (ej: 'el-arte-perdido-de-la-forja')
  // en un objeto llamado 'params'. Lo extraemos de ahí.
  // El signo '$' al principio es para que la variable se actualice automáticamente.
  const slug = $page.params.slug;

  // Creamos un título simple y legible a partir del slug, reemplazando guiones
  // por espacios y poniendo la primera letra de cada palabra en mayúscula.
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
</script>

<article class="post-container">
  <h1>{title}</h1>
  
  <div class="post-content">
    <p>
      Este es el comienzo del artículo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</article>

<style>
  .post-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 150px 2rem 60px 2rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 300;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 3rem;
  }

  .post-content p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
</style>