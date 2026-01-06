<script>
  import { fade } from 'svelte/transition';
  // Eliminamos onMount y la variable mounted para que Google vea el contenido al instante
</script>

<svelte:head>
  <title>Studio | 1egacy</title>
  <meta
    name="description"
    content="En 1egacy Studio forjamos guardianes: piezas y archivos diseñados para custodiar la memoria y hacer eterno tu legado."
  />
  <link rel="canonical" href="https://somos1egacy.com/studio" />
</svelte:head>

<div class="studio-container">
  <section class="manifesto" aria-labelledby="studio-title">
    <h1 id="studio-title">El arte de hacer eterno tu legado</h1>

    <p>
      ¿Alguna vez has sostenido un objeto —la pluma de tu abuelo, una fotografía gastada— y has sentido el peso de una vida entera en tus manos?
    </p>

    <p>
      Ese instante es sagrado. Es la prueba de que una historia vive en el alma, pero su eco necesita un lugar donde resonar. Esa es el alma de <strong>1egacy Studio</strong>.
    </p>

    <p>
      Porque sabemos que un recuerdo es aire, es luz, es intangible. Pero un legado necesita un guardián. Algo que puedas tocar cuando necesites recordar. Algo que tus hijos puedan sostener para atreverse a preguntar.
    </p>

    <p>
      Aquí, fusionamos la reverencia de un historiador con el pulso de un maestro artesano. No creamos objetos; forjamos guardianes. Piezas que no aprisionan la memoria, sino que la custodian y la invitan a conversar en silencio.
    </p>
  </section>

  <section class="productos-grid" aria-label="Servicios y piezas de Studio">
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
        <p>
          No es un libro; es el testamento visual de tu linaje. Una obra de archivo, encuadernada a mano con calidad museística, destinada a ser la pieza central de tu biblioteca.
        </p>
        <div class="boton-visual">Descubrir el Códice</div>
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
        <p>
          Transformamos el símbolo de tu linaje en un tótem personal. Desde un escudo para presidir tu estudio, hasta textiles que susurran historias en cada hilo.
        </p>
        <div class="boton-visual">Explorar colección</div>
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
        <p>
          Custodiamos memoria corporativa o alma familiar mediante documentales, archivos digitales o instalaciones artísticas para quienes construyen sobre un pasado bien contado.
        </p>
        <div class="boton-visual">Iniciar un proyecto</div>
      </div>
    </a>
  </section>
</div>

<style>
.studio-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .manifesto {
    text-align: center; 
    max-width: 850px;
    margin-bottom: 6rem;
  }

  .manifesto h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .manifesto p {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #b0b0b0;
    margin-bottom: 1.5rem;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    width: 100%;
  }

  .producto-card {
    text-decoration: none;
    color: inherit;
    background-color: #161616;
    border: 1px solid #252525;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      border-color 0.4s ease,
      box-shadow 0.4s ease;
  }

  .producto-card:hover {
    transform: translateY(-10px);
    border-color: var(--gold);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .image-wrapper {
    width: 100%;
    height: 250px;
    overflow: hidden;
    background-color: #222;
  }

  .producto-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .producto-card:hover img {
    transform: scale(1.05);
  }

  .card-content {
    padding: 2.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .card-content h3 {
    margin-top: 0; 
    margin-bottom: 1.2rem;
    font-size: 1.6rem;
    color: var(--gold);
  }

  .card-content p {
    max-width: none; 
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    flex-grow: 1;
  }

  .boton-visual {
    align-self: center;
    background-color: var(--gold);
    color: #121212;
    padding: 1rem 2rem;
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .producto-card:hover .boton-visual {
    background-color: #ffffff;
  }

@media (max-width: 768px) {
  .studio-container {
    padding-bottom: 60px; 
  }
  .card-content {
    padding: 1.5rem;
  }
}
</style>