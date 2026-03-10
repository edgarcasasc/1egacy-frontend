<script lang="ts">
    import { onMount } from "svelte";

    let activeVideoId: string | null = null;

    function playVideo(id: string) {
        activeVideoId = id;
    }

    onMount(() => {
        document.body.classList.add("route-films");
        return () => document.body.classList.remove("route-films");
    });

    const projects = [
        {
            id: "instantes",
            title: "Instantes",
            format: "Disponible · Cortometraje",
            description:
                "Un poema visual sobre la memoria y la conexión humana. Explora cómo los recuerdos más pequeños pueden definir una vida entera.",
            image: "articulos/instantes.webp",
            videoUrl:
                "https://www.youtube-nocookie.com/embed/tP4V5myfKI0?rel=0&modestbranding=1",
            status: "available",
            uploadDate: "2026-02-15T08:00:00-06:00",
        },
        {
            id: "receta-abuela",
            title: "La Obra del Sabor",
            format: "Disponible · Documental",
            description:
                "Más allá de los ingredientes, una receta es una herencia. Un tributo a los legados intangibles que se guardan en el corazón de la cocina familiar.",
            image: "articulos/cocina_corazon.webp",
            status: "available",
        },
        {
            id: "akari",
            title: "Akari",
            format: "En desarrollo · Serie animada",
            description:
                "Una historia épica de memoria, pérdida y redención en un mundo fantástico. Nuestra exploración sobre la construcción de mundos complejos.",
            image: "articulos/akari.webp",
            status: "dev",
        },
        {
            id: "princesa-luna",
            title: "La Princesa de la Luna",
            format: "En desarrollo · Cortometraje",
            description:
                "Una fábula atemporal sobre la luz y la promesa. Este cuento busca capturar la magia de las historias orales bajo las estrellas.",
            image: "articulos/princesa.webp",
            status: "dev",
        },
    ];

    const pageTitle = "1egacy FILMS | Films que preservan memoria";
    const pageDescription =
        "Documentales familiares y archivos cinematográficos para conservar y compartir tu historia.";
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <script type="application/ld+json">
      {@html `
  { 
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Instantes",
    "description": "Un poema visual sobre la memoria y la conexión humana.",
    "thumbnailUrl": ["https://somos1egacy.com/instantes-og.jpg"],
    "embedUrl": "https://www.youtube-nocookie.com/embed/tP4V5myfKI0",
    "uploadDate": "2026-02-15T08:00:00-06:00",
    "publisher": {
      "@type": "Organization",
      "name": "1egacy",
      "url": "https://somos1egacy.com"
    }
  }
      `}
    </script>
</svelte:head>

<section class="films-hero-section">
    <div class="hero-background-video" aria-hidden="true">
        <video
            autoplay
            muted
            loop
            playsinline
            poster="/films-poster.webp"
            src="/films-bg.mp4"
        ></video>
    </div>

    <div class="hero-content">
        <h1>Films que preservan memoria</h1>
        <h2>
            Documentales familiares y archivos cinematográficos para conservar y
            compartir tu historia.
        </h2>
        <p class="hero-extra">
            Para familias que quieren dejar un registro audiovisual serio:
            íntimo, bello y perdurable.
        </p>
        <a href="#proyectos" class="cta-button">Ver proyectos</a>
    </div>

    <a href="#proyectos" class="scroll-down-arrow" aria-label="Ver proyectos"></a>
</section>

<div class="films-page-content">
    <section class="film-philosophy-section">
        <h3 class="title-serif">Creemos en el Cine como un Acto de Memoria.</h3>
        <p>
            El mundo está lleno de imágenes fugaces. Nosotros creamos obras con
            intención: cine con profundidad narrativa y cuidado estético.
            Combinamos sensibilidad cinematográfica con investigación y
            curaduría para producir piezas que puedan heredarse.
        </p>
    </section>

    <section class="film-projects-section" id="proyectos">
        <p class="service-pitch">
            También producimos documentales familiares a medida. Si quieres
            preservar una historia específica, <a href="/contacto"
                >inicia una evaluación</a
            >.
        </p>

        <h2 class="title-serif section-title">Proyectos</h2>
        <p class="section-micro">Obras publicadas y proyectos en desarrollo.</p>

        <div class="projects-grid">
            {#each projects as project (project.id)}
                <div class="project-card">
                    <div class="card-image-container">
                        {#if project.videoUrl}
                            {#if activeVideoId === project.id}
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={project.videoUrl + "&autoplay=1"}
                                    title={project.title}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                    style="position: absolute; top: 0; left: 0;"
                                >
                                </iframe>
                            {:else}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <button class="play-button" aria-label="Reproducir video" on:click={() => playVideo(project.id)}>
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </button>
                            {/if}
                        {:else}
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                            />
                            {#if project.status === "dev"}
                                <span class="status-badge">En Desarrollo</span>
                            {/if}
                        {/if}
                    </div>
                    <div class="card-info">
                        <h4>{project.title}</h4>
                        <span class="format-label">{project.format}</span>
                        <p>{project.description}</p>

                        <div class="card-action">
                            {#if project.status === "available"}
                                {#if project.videoUrl}
                                    <button class="project-link" on:click={() => playVideo(project.id)}>Ver ahora &rarr;</button>
                                {:else}
                                    <span class="project-link">Ver ahora &rarr;</span>
                                {/if}
                            {:else}
                                <form class="notify-form" on:submit|preventDefault={() => alert('¡Gracias! Te avisaremos cuando se estrene.')}>
                                    <input type="email" placeholder="Tu correo electrónico..." required aria-label="Correo electrónico para estreno"/>
                                    <button type="submit" class="project-link">Avísame del estreno</button>
                                </form>
                            {/if}
                        </div>
                        {#if project.uploadDate}
                            <footer class="card-footer">
                                <time datetime={project.uploadDate}>
                                    Publicado: {new Date(
                                        project.uploadDate,
                                    ).toLocaleDateString("es-MX", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </footer>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section class="film-process-section">
        <h2 class="title-serif section-title">Cómo lo hacemos</h2>
        <ol class="process-steps-list">
            <li>
                <h4>1. Inmersión y entrevista</h4>
                <p>Entrevistas, archivos disponibles y guion.</p>
            </li>
            <li>
                <h4>2. Producción</h4>
                <p>Rodaje y captura con estándar cinematográfico.</p>
            </li>
            <li>
                <h4>3. Postproducción</h4>
                <p>Edición, color y diseño sonoro.</p>
            </li>
            <li>
                <h4>4. Entrega y preservación</h4>
                <p>Entregables listos para conservar, compartir y proyectar.</p>
            </li>
        </ol>
    </section>

    <section class="film-final-cta-section" id="contacto">
        <h2 class="title-serif">Tu historia merece un registro a la altura.</h2>
        <a href="/contacto" class="cta-button">Solicitar evaluación</a>
        <p class="cta-microcopy">
            Privado · Respuesta en 48–72 h · Solo casos seleccionados
        </p>
    </section>
</div>

<style>
    h1,
    .title-serif {
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        color: #f5f5f5;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    .films-hero-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        position: relative;
        text-align: center;
        overflow: hidden;
        background-color: #000;
    }

    .hero-background-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .hero-background-video::after {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(
            circle,
            transparent 20%,
            rgba(18, 18, 18, 0.8) 100%
        );
        z-index: 1;
    }

    .hero-background-video video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.5);
    }

    .hero-content {
        max-width: 850px;
        padding: 20px;
        z-index: 2;
        padding-top: var(--header-h);
        margin-top: 0;
    }

    .hero-content h1 {
        font-size: clamp(2.5rem, 8vw, 4rem);
        line-height: 1.1;
        margin-bottom: 0.5em;
    }
    .hero-content h2 {
        font-size: clamp(1rem, 3vw, 1.4rem);
        font-weight: 300;
        color: #d0d0d0;
        margin-bottom: 1em;
    }
    .hero-extra {
        font-size: 1rem;
        color: #aaa;
        margin-bottom: 2.5em;
        font-style: italic;
    }

    .cta-button {
        display: inline-block;
        padding: 16px 32px;
        background-color: var(--gold);
        color: #000;
        text-decoration: none;
        font-weight: bold;
        border-radius: 2px;
        transition: 0.3s;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .films-page-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 5% 80px 5%;
    }
    .film-philosophy-section {
        padding: 120px 0;
        text-align: center;
        border-bottom: 1px solid #222;
    }
    .film-philosophy-section p {
        font-size: 1.25rem;
        color: #aaa;
        line-height: 1.8;
        max-width: 850px;
        margin: 0 auto;
    }

    /* PROYECTOS */
    .film-projects-section {
        padding: 80px 0;
    }

    .service-pitch {
        text-align: center;
        color: #aaa;
        margin-bottom: 60px;
        font-size: 1.1rem;
        padding-bottom: 40px;
        border-bottom: 1px solid #222;
    }
    .service-pitch a {
        color: var(--gold);
        text-decoration: underline;
    }

    .section-title {
        text-align: center;
        margin-bottom: 10px;
    }
    .section-micro {
        text-align: center;
        color: #999;
        font-size: 0.9rem;
        margin-bottom: 60px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
    }

    .project-card {
        background: #111;
        border: 1px solid #222;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s;
    }
    .project-card:hover {
        border-color: var(--gold);
        transform: translateY(-5px);
    }
    .project-card:hover .card-image-container img {
        transform: scale(1.05);
        filter: brightness(1.1);
    }

    .card-image-container {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        background: #000;
        overflow: hidden;
    }
    .card-image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease, filter 0.5s ease;
    }

    .status-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        color: var(--gold);
        padding: 5px 12px;
        font-size: 0.7rem;
        font-weight: bold;
        text-transform: uppercase;
        border: 1px solid rgba(212, 175, 55, 0.5);
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    .card-info {
        padding: 30px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    .card-info h4 {
        font-size: 1.3rem;
        color: #fff;
        margin-bottom: 5px;
    }
    .format-label {
        color: #999;
        font-size: 0.8rem;
        text-transform: uppercase;
        margin-bottom: 15px;
        display: block;
        letter-spacing: 0.05em;
    }
    .card-info p {
        color: #bbb;
        margin-bottom: 20px;
        flex-grow: 1;
    }

    .card-action {
        margin-top: auto;
    }
    .project-link {
        color: var(--gold);
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        display: inline-block;
        transition: opacity 0.3s;
    }
    .project-link:hover {
        opacity: 0.8;
    }

    .notify-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 5px;
    }
    .notify-form input {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #333;
        color: #fff;
        padding: 8px 12px;
        font-size: 0.85rem;
        border-radius: 4px;
        transition: border-color 0.3s;
    }
    .notify-form input:focus {
        outline: none;
        border-color: var(--gold);
    }
    .notify-form .project-link {
        text-align: left;
    }

    .card-footer {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #222;
        font-size: 0.75rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* METODOLOGÍA */
    .process-steps-list {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 40px;
        margin-bottom: 100px;
        margin-top: 60px;
        position: relative;
    }
    
    @media (min-width: 768px) {
        .process-steps-list {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 80px;
        }
        .process-steps-list::before {
            content: "";
            position: absolute;
            top: 24px;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, var(--gold) 0%, rgba(212,175,55,0.2) 100%);
            z-index: 0;
        }
    }

    .process-steps-list li {
        border-top: none; 
        padding-top: 0;
        position: relative;
        z-index: 1;
    }
    
    @media (min-width: 768px) {
        .process-steps-list li {
            padding-top: 60px;
        }
        .process-steps-list li::before {
            content: "";
            position: absolute;
            top: 19px;
            left: 0;
            width: 12px;
            height: 12px;
            background: var(--gold);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(212,175,55,0.6);
        }
    }
    @media (max-width: 767px) {
        .process-steps-list li {
            border-left: 2px solid var(--gold);
            padding-left: 20px;
            margin-left: 10px;
        }
        .process-steps-list li::before {
            content: "";
            position: absolute;
            top: 0;
            left: -7px;
            width: 12px;
            height: 12px;
            background: var(--gold);
            border-radius: 50%;
        }
    }

    .process-steps-list h4 {
        color: var(--gold);
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
    .process-steps-list p {
        font-size: 0.95rem;
        color: #aaa;
    }

    .film-final-cta-section {
        padding: 100px 0;
        text-align: center;
        border-top: 1px solid #222;
    }
    .cta-microcopy {
        font-size: 0.8rem;
        color: #666;
        margin-top: 20px;
    }

    .scroll-down-arrow {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 60px;
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.5);
        transition: color 0.3s;
    }
    .scroll-down-arrow:hover {
        color: #fff;
    }
    .scroll-down-arrow::before {
        content: "";
        position: absolute;
        top: 0;
        width: 1px;
        height: 100%;
        background: currentColor;
        animation: breath-scroll 2s infinite ease-in-out;
    }
    @keyframes breath-scroll {
        0%, 100% { height: 40px; opacity: 0.4; }
        50% { height: 60px; opacity: 1; }
    }

    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.6);
        border: 2px solid var(--gold);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gold);
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0;
        z-index: 2;
    }
    .play-button svg {
        width: 24px;
        height: 24px;
        margin-left: 4px;
    }
    .play-button:hover {
        background: var(--gold);
        color: #000;
        transform: translate(-50%, -50%) scale(1.1);
    }
</style>
