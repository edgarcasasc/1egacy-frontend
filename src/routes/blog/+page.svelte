<script>
  // La variable 'data' contiene los 'posts' que cargamos desde Sanity.
  // Este script no necesita cambios.
  export let data;
</script>

<div class="blog-container">
  <div class="blog-header">
    <h1>El Códice</h1>
    <p>Historias, análisis y descubrimientos del universo 1egacy.</p>
  </div>

  <div class="posts-list">
    {#if data.posts && data.posts.length > 0}
      {#each data.posts as post}
        <a href="/blog/{post.slug}" class="post-card">
          <div class="post-image-wrapper">
            {#if post.mainImageUrl}
              <img src={post.mainImageUrl} alt={post.title} />
            {:else}
              <div class="image-placeholder"></div>
            {/if}
          </div>
          
          <div class="post-info">
            <h2>{post.title}</h2>
            {#if post.subtitle}
              <p class="subtitle">{post.subtitle}</p>
            {/if}
            <p class="snippet">{post.snippet}</p>
            <span>Leer más &rarr;</span>
          </div>
        </a>
      {/each}
    {/if}
  </div>
</div>

<style>
  .blog-container {
    max-width: 900px; /* Un poco más ancho para el nuevo diseño */
    margin: 0 auto;
    padding: 120px 2rem 60px 2rem;
  }

.blog-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  /* --- AÑADE ESTA NUEVA REGLA --- */
  .blog-header p {
    /* Centra el bloque del párrafo dentro de su contenedor */
    margin-left: auto;
    margin-right: auto;
  }
  /* --- FIN DE LA NUEVA REGLA --- */

  .posts-list {
    display: grid;
    gap: 2.5rem;
  }

  .blog-header h1 {
    font-size: 3.5rem;
  }

  .posts-list {
    display: grid;
    gap: 2.5rem; /* Más espacio entre tarjetas */
  }

  .post-card {
    display: grid;
    grid-template-columns: 1fr 2fr; /* Divide la tarjeta en 1/3 para imagen, 2/3 para texto */
    gap: 2rem;
    padding: 1.5rem;
    border: 1px solid #333;
    text-decoration: none;
    color: #e0e0e0;
    transition: all 0.3s ease;
    border-radius: 8px; /* Bordes redondeados */
  }

  .post-card:hover {
    border-color: #c0a062;
    background-color: #1a1a1a;
  }

  .post-image-wrapper img, .image-placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Asegura que la imagen llene el espacio sin deformarse */
    border-radius: 4px;
  }
  
  .image-placeholder {
    background-color: #222;
  }

  .post-info h2 {
    font-size: 1.8rem;
    font-weight: 700; /* Hacemos el título un poco más pesado */
    margin: 0 0 0.5rem 0;
    color: #ffffff; /* Título en blanco para más contraste */
  }
  
  .post-info .subtitle {
    font-size: 1rem;
    color: #aaa;
    margin-bottom: 1rem;
  }

  .post-info .snippet {
    font-size: 1rem;
    color: #b0b0b0;
  }

  .post-info span {
    display: inline-block;
    margin-top: 1rem;
    font-weight: bold;
    color: #c0a062;
  }
</style>