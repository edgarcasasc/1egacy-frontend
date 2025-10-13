<script>
  // Datos de ejemplo. Más adelante, vendrán de una base de datos.
  const posts = [
    {
      slug: 'el-arte-perdido-de-la-forja',
      title: 'El Arte Perdido de la Forja: El Legado Martínez',
      date: '10 de Octubre, 2025',
      snippet: 'Un viaje al siglo XVIII para descubrir cómo un maestro herrero dio forma no solo al metal, sino al carácter de un linaje...'
    },
    {
      slug: 'isabel-martinez-la-matriarca',
      title: 'Isabel Martínez: La Matriarca que Financió una Revolución Silenciosa',
      date: '3 de Octubre, 2025',
      snippet: 'Pocos conocen la historia de la mujer que, desde las sombras, utilizó su fortuna para construir una de las redes comerciales más importantes del norte de México...'
    },
    {
      slug: 'los-garza-y-la-fundacion',
      title: 'Los Garza y la Fundación de Monterrey',
      date: '28 de Septiembre, 2025',
      snippet: 'Más allá de los mitos, exploramos los documentos originales que narran el papel crucial del linaje Garza en los primeros días de la ciudad.'
    }
  ];
</script>

<div class="blog-container">
  <div class="blog-header">
    <h1>El Códice</h1>
    <p>Historias, análisis y descubrimientos del universo 1egacy.</p>
  </div>

  <div class="posts-list">
    {#each posts as post}
      <a href="/blog/{post.slug}" class="post-card">
        <h2>{post.title}</h2>
        <p>{post.snippet}</p>
        <span>Leer más &rarr;</span>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 120px 2rem 60px 2rem; /* Padding superior para dejar espacio a la Navbar */
  }

  .blog-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .blog-header h1 {
    font-size: 3.5rem;
    font-weight: 300;
    color: #c0a062;
  }

  .posts-list {
    display: grid;
    gap: 2rem;
  }

  .post-card {
    display: block;
    padding: 2rem;
    border: 1px solid #333;
    text-decoration: none;
    color: #e0e0e0;
    transition: all 0.3s ease;
  }

  .post-card:hover {
    border-color: #c0a062;
    transform: translateY(-5px);
  }

  .post-card h2 {
    font-size: 1.8rem;
    font-weight: 300;
    margin: 0 0 1rem 0;
  }

  .post-card span {
    display: inline-block;
    margin-top: 1rem;
    font-weight: bold;
    color: #c0a062;
  }
</style>