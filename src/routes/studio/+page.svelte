<script>
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>Studio | 1egacy</title>
  <meta
    name="description"
    content="1egacy Studio: Transformamos historia familiar en piezas físicas y archivos digitales diseñados para conservar y heredar."
  />
  <link rel="canonical" href="https://somos1egacy.com/studio" />
</svelte:head>

<div class="studio-container">
  
  <section class="studio-hero">
    <h1>1egacy Studio</h1>
    <h2 class="hero-sub">Transformamos historia familiar en piezas físicas y archivos digitales diseñados para conservar y heredar.</h2>
    <p class="hero-bullets-text">Códice del Legado · Piezas físicas · Proyectos especiales</p>
    
    <div class="hero-actions">
      <a href="/solicitar-consulta" class="btn-primary">Solicitar evaluación</a>
      <a href="/productos" class="btn-secondary">Ver la Colección</a>
    </div>
    <p class="microcopy">Privado · 3–5 min · Te decimos el siguiente paso</p>
  </section>

  <section class="why-section">
    <h2 class="section-label">Por qué existe</h2>
    <p class="why-text">
      Un recuerdo se pierde si no tiene forma. En 1egacy Studio convertimos memoria en objetos y archivos que pueden sostenerse, compartirse y heredarse. Trabajamos con criterio editorial, diseño y oficio artesanal.
    </p>
  </section>

  <section class="what-we-do">
    <div class="grid-header">
      <h2 class="section-label">Qué hacemos</h2>
      <p class="section-sub">Tres caminos para materializar tu legado.</p>
    </div>

    <div class="productos-grid">
      
      <a href="/codice-del-legado" class="producto-card" in:fade={{ delay: 200, duration: 800 }}>
        <div class="image-wrapper">
          <img
            src="/articulos/El-Cedice-del-Legado.webp"
            alt="El Códice del Legado"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="card-content">
          <h3>El Códice del Legado</h3>
          <p class="card-desc">
            Un archivo familiar curado: investigación, narrativa y diseño en una edición lista para conservar y compartir.
          </p>
          <ul class="card-bullets">
            <li>Incluye: historia, símbolos y narrativa visual.</li>
            <li>Entregables: versión digital + edición física.</li>
          </ul>
          <div class="boton-visual">Ver Códice</div>
        </div>
      </a>

      <a href="/productos" class="producto-card" in:fade={{ delay: 400, duration: 800 }}>
        <div class="image-wrapper">
          <img
            src="/articulos/camisas-legado.webp"
            alt="Piezas de Legado Físico"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="card-content">
          <h3>Piezas de Legado Físico</h3>
          <p class="card-desc">
            Objetos creados a partir de linajes e historias reales: escudos 3D, piezas de escritorio y textiles.
          </p>
          <ul class="card-bullets">
            <li>Ediciones disponibles por apellido/linaje.</li>
            <li>Hecho para exhibir y heredar.</li>
          </ul>
          <div class="boton-visual">Ver Colección</div>
        </div>
      </a>

      <a href="/contacto" class="producto-card" in:fade={{ delay: 600, duration: 800 }}>
        <div class="image-wrapper">
          <img
            src="/articulos/proyectos.webp"
            alt="Proyectos Especiales"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="card-content">
          <h3>Proyectos Especiales</h3>
          <p class="card-desc">
            Producciones y archivos a medida: documentales familiares, series, archivos digitales o instalaciones.
          </p>
          <ul class="card-bullets">
            <li>Para: familias, fundaciones o empresas.</li>
            <li>Proceso por evaluación y alcance.</li>
          </ul>
          <div class="boton-visual">Iniciar proyecto</div>
        </div>
      </a>

    </div>
  </section>
</div>

<style>
  .studio-container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 1.5rem 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* --- HERO SECTION --- */
  .studio-hero {
    text-align: center;
    padding: 120px 0 80px;
    max-width: 800px;
    margin: 0 auto;
  }

  .studio-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 6vw, 4.5rem);
    margin-bottom: 1rem;
    color: #f5f5f5;
    line-height: 1.1;
  }

  .hero-sub {
    font-size: 1.25rem;
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }

  .hero-bullets-text {
    font-family: 'Source Sans 3', sans-serif;
    color: var(--gold);
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 1px;
    margin-bottom: 2.5rem;
    font-weight: 600;
  }

  .hero-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    background-color: var(--gold);
    color: #121212;
    padding: 1rem 2rem;
    font-weight: 800;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: 0.3s;
  }
  .btn-primary:hover { background-color: #fff; transform: translateY(-2px); }

  .btn-secondary {
    background-color: transparent;
    color: #e0e0e0;
    border: 1px solid #444;
    padding: 1rem 2rem;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    transition: 0.3s;
  }
  .btn-secondary:hover { border-color: #fff; color: #fff; }

  .microcopy {
    font-size: 0.8rem;
    color: #666;
    margin-top: 1rem;
  }

  /* --- WHY SECTION --- */
  .why-section {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 6rem;
    padding: 3rem 0;
    border-top: 1px solid #222;
    border-bottom: 1px solid #222;
  }

  .section-label {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 1.5rem;
    letter-spacing: 2px;
  }

  .why-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    line-height: 1.6;
    color: #d0d0d0;
  }

  /* --- WHAT WE DO (GRID) --- */
  .what-we-do { width: 100%; }
  
  .grid-header { text-align: center; margin-bottom: 3rem; }
  .section-sub { font-size: 1.2rem; color: #e0e0e0; margin-top: -1rem; }

  .productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    width: 100%;
  }

  .producto-card {
    text-decoration: none;
    color: inherit;
    background-color: #111;
    border: 1px solid #222;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .producto-card:hover {
    transform: translateY(-8px);
    border-color: var(--gold);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .image-wrapper {
    width: 100%;
    height: 220px;
    overflow: hidden;
    background-color: #000;
  }

  .producto-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    opacity: 0.9;
  }

  .producto-card:hover img {
    transform: scale(1.05);
    opacity: 1;
  }

  .card-content {
    padding: 2rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .card-content h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    color: #fff;
    font-family: 'Source Sans 3', sans-serif;
  }

  .card-desc {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #aaa;
    margin-bottom: 1.5rem;
  }

  .card-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
    flex-grow: 1;
  }

  .card-bullets li {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;
  }

  .card-bullets li::before {
    content: "•";
    color: var(--gold);
    position: absolute;
    left: 0;
  }

  .boton-visual {
    align-self: flex-start;
    color: var(--gold);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid transparent;
    transition: 0.3s;
  }

  .producto-card:hover .boton-visual {
    color: #fff;
    border-bottom-color: #fff;
  }

  @media (max-width: 768px) {
    .studio-hero { padding-top: 100px; }
    .hero-actions { flex-direction: column; gap: 1rem; width: 100%; }
    .btn-primary, .btn-secondary { width: 100%; text-align: center; }
    .why-text { font-size: 1.2rem; }
  }
</style>