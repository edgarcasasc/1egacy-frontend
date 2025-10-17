<script>
  import { PortableText } from '@portabletext/svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let data;
  const { post } = data;

  const components = {
    types: {
      image: SanityImage,
    },
  };
</script>

<!-- SEO HEAD (sin cambios) -->
<svelte:head>
  <title>{post?.seoTitle || post?.title || 'Artículo'} | 1egacy</title>
  <meta name="description" content={post?.seoDescription || post?.snippet || ''} />
</svelte:head>

<!-- NUEVA ESTRUCTURA DE 2 COLUMNAS -->
<div class="layout-container">
  {#if post}
    <!-- Columna Principal: El Artículo -->
    <article class="post-container">
      <header>
        <h1>{post.title}</h1>
        {#if post.subtitle}
          <p class="subtitle">{post.subtitle}</p>
        {/if}
        <p class="meta">Publicado el {new Date(post.publishedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        {#if post.author?.name}
   por {post.author.name}
 {/if}
        {#if post.mainImageUrl}
          <img class="featured-image" src={post.mainImageUrl} alt={post.title} />
        {/if}
      </header>
      
      <div class="post-content">
        {#if post.body}
          <PortableText value={post.body} {components} />
        {/if}
      </div>
    </article>

    <!-- Barra Lateral: Los Anuncios Dinámicos -->
    <aside class="sidebar">
      <div class="sidebar-content">
        {#if post.apellidosRelacionados && post.apellidosRelacionados.length > 0}
          <!-- Caso 1: El blog está ligado a apellidos -->
          <h3>Legados Mencionados</h3>
          <div class="anuncios-apellidos">
            {#each post.apellidosRelacionados as apellido}
<a href="/origins/{apellido.trim().toLowerCase()}" class="anuncio-card">
  
  <!-- Asumimos que tienes un SVG para cada apellido en /escudos/ -->
<img src="/escudos/{apellido.trim().toLowerCase()}.svg" alt="Escudo {apellido.trim()}" />

                <span>Explorar el Legado {apellido}</span>
              </a>
            {/each}
          </div>
        {:else}
          <!-- Caso 2: El blog es genérico -->
          <div class="anuncio-generico">
            <h3>¿Conoces la Historia de tu Apellido?</h3>
            <p>Cada linaje tiene una saga esperando ser contada. En 1egacy Origins, transformamos esa historia en arte.</p>
            <a href="/origins" class="boton-anuncio">Explorar la Constelación</a>
          </div>
        {/if}
      </div>
    </aside>

  {:else}
    <div class="error-container">
      <h1>404</h1>
      <p>Artículo no encontrado.</p>
    </div>
  {/if}
</div>

<style>
  .layout-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 150px 2rem 60px 2rem;
    display: grid;
    grid-template-columns: 2.5fr 1fr; /* 2.5 partes para el artículo, 1 para la barra lateral */
    gap: 4rem;
    align-items: start;
  }

  .post-container {
    max-width: 800px;
  }
  
  header { text-align: center; margin-bottom: 3rem; }
  h1 { font-size: 3.2rem; line-height: 1.2; margin-bottom: 0.5rem; }
  .subtitle { font-size: 1.5rem; color: #aaa; margin-bottom: 1rem; }
  .meta { font-style: italic; color: #888; }
  .featured-image { width: 100%; height: auto; border-radius: 8px; margin-top: 2rem; margin-bottom: 3rem; }
  .post-content { font-size: 1.1rem; line-height: 1.8; }
  
  .sidebar {
    position: sticky; /* Hacemos que la barra lateral se "pegue" al hacer scroll */
    top: 120px; 
  }

  .sidebar-content {
    background-color: #1a1a1a;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #333;
  }

  .sidebar h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  /* --- INICIO DE LA CORRECCIÓN --- */
  .anuncio-generico {
    text-align: center; /* Centra todos los elementos 'inline' dentro de este contenedor */
  }

  .anuncio-generico p {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  .anuncio-generico .boton-anuncio {
    display: inline-block; /* Permite que el botón sea centrado por el 'text-align' del padre */
    text-decoration: none;
    background-color: #c0a062;
    color: #121212;
    padding: 0.8rem 2rem; /* Más padding horizontal para que no se vea apretado */
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 4px; /* Consistencia con otros botones */
    transition: background-color 0.3s ease;
  }

  .anuncio-generico .boton-anuncio:hover {
    background-color: #ffffff;
  }
  /* --- FIN DE LA CORRECCIÓN --- */
  
  .anuncios-apellidos { display: flex; flex-direction: column; gap: 1rem; }
  .anuncio-card { display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #333; transition: all 0.3s ease; }
  .anuncio-card:hover { border-color: #c0a062; background-color: #222; }
.anuncio-card img {
  width: 50px;
  height: 50px;
  flex-shrink: 0; /* <-- AÑADE ESTA LÍNEA */
}  .anuncio-card span { font-weight: bold; }

  .error-container {
    grid-column: 1 / -1; /* Ocupa todo el ancho si hay un error */
    text-align: center;
    padding: 5rem 0;
  }
</style>

