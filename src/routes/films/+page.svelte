<script lang="ts">
    import { onMount } from 'svelte';

    onMount(() => {
        document.body.classList.add('route-films');
        return () => document.body.classList.remove('route-films');
    });

    const projects = [
        { 
            id: 'instantes', 
            title: 'Instantes', 
            format: 'Cortometraje (Disponible)', 
            description: 'Un poema visual sobre la memoria y la conexión humana. Explora cómo los recuerdos más pequeños pueden definir una vida entera. Nuestra ópera prima ahora en línea.', 
            image: 'articulos/instantes.webp',
            videoUrl: 'https://www.youtube-nocookie.com/embed/tP4V5myfKI0?rel=0&modestbranding=1'
        },
        { 
            id: 'receta-abuela', 
            title: 'La Obra del Sabor', 
            format: 'Cortometraje Documental', 
            description: 'Más allá de los ingredientes, una receta es una herencia, un lenguaje de amor transmitido a través de generaciones. Este cortometraje es un tributo a esos legados intangibles que se guardan en el corazón de la cocina familiar.', 
            image: 'articulos/cocina_corazon.webp' 
        },
        { 
            id: 'akari', 
            title: 'Akari: El Susurro de los Olvidados', 
            format: 'Serie Animada (En Desarrollo)', 
            description: 'Nuestro proyecto más ambicioso. Una historia épica de memoria, pérdida y redención en un mundo fantástico. Akari es nuestra prueba de que la animación es un medio poderoso para construir mundos complejos.', 
            image: 'articulos/akari.webp' 
        },
        { 
            id: 'princesa-luna', 
            title: 'La Princesa de la Luna', 
            format: 'Cortometraje Animado (En Desarrollo)', 
            description: 'Una fábula atemporal sobre la luz, la promesa y la devoción. Este cuento busca capturar la magia de las historias que nos contaban bajo las estrellas.', 
            image: 'articulos/princesa.webp' 
        }
    ];

    const pageTitle = "1egacy FILMS | Historias que trascienden";
    const pageDescription = "En 1egacy FILMS esculpimos legados cinematográficos. Documentales de linaje y archivos cinematográficos.";
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
     <script type="application/ld+json">
  { 
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Instantes",
    "description": "Un poema visual sobre la memoria y la conexión humana.",
    "thumbnailUrl": ["https://somos1egacy.com/instantes-og.jpg"],
    "embedUrl": "https://www.youtube-nocookie.com/embed/tP4V5myfKI0",
    "publisher": {
      "@type": "Organization",
      "name": "1egacy",
      "url": "https://somos1egacy.com"
    }
  }
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
        <h1>Historias que trascienden el tiempo</h1>
        <h2>Documentales de linaje y archivos cinematográficos para preservar tu legado.</h2>
        <a href="#proyectos" class="cta-button">Ver Producciones</a>
    </div>
    
    <div class="scroll-down-arrow"></div>
</section>

<div class="films-page-content"> 
    <section class="film-philosophy-section">
        <h3 class="title-serif">Creemos en el Cine como un Acto de Memoria.</h3>
        <p>
            El mundo está lleno de imágenes fugaces. Nosotros buscamos lo eterno. Nuestro propósito es simple: crear piezas audiovisuales con la profundidad de un relato y la belleza de una obra de arte. Fusionamos la sensibilidad de un cineasta de autor con la rigurosidad de un historiador.
        </p>
    </section>

    <section class="film-projects-section" id="proyectos">
        <h2 class="title-serif section-title">Nuestro Laboratorio de Historias</h2>
        <div class="projects-grid">
            {#each projects as project (project.id)}
                <div class="project-card">
                    <div class="card-image-container">
                        {#if project.videoUrl}
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={project.videoUrl} 
                                title={project.title} 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen
                                style="position: absolute; top: 0; left: 0;">
                            </iframe>
                        {:else}
                            <img src={project.image} alt={project.title} loading="lazy" decoding="async">
                            {#if project.format.includes('(En Desarrollo)')}
                                <span class="status-badge">En Desarrollo</span>
                            {/if}
                        {/if}
                    </div>
                    <div class="card-info">
                        <h4>{project.title}</h4>
                        <span class="format-label">{project.format.replace(' (En Desarrollo)', '')}</span>
                        <p>{project.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section class="film-process-section">
        <h2 class="title-serif section-title">Nuestra Metodología</h2>
        <ol class="process-steps-list">
            <li><h4>1. Inmersión</h4><p>Investigación profunda y desarrollo narrativo.</p></li>
            <li><h4>2. Producción</h4><p>Rodaje con atención meticulosa al detalle cinematográfico.</p></li>
            <li><h4>3. Post-Producción</h4><p>Edición, colorización y diseño sonoro original.</p></li>
            <li><h4>4. Entrega</h4><p>Formatos de alta calidad para preservación de legados.</p></li>
        </ol>
    </section>

    <section class="film-final-cta-section" id="contacto">
        <h2 class="title-serif">Tu historia merece ser contada con luz.</h2>
        <a href="/contacto" class="cta-button">Iniciar Conversación</a> 
    </section>
</div>

<style>
    h1, .title-serif { 
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif; 
        color: #f5f5f5; 
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
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
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle, transparent 20%, rgba(18,18,18,0.8) 100%);
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
        /* El header está encima; evita que el texto quede tapado */
        padding-top: var(--header-h);
        margin-top: 0;
    }

    .hero-content h1 { font-size: clamp(2.5rem, 8vw, 4rem); line-height: 1.1; margin-bottom: 0.5em; }
    .hero-content h2 { font-size: clamp(1rem, 3vw, 1.4rem); font-weight: 300; color: #d0d0d0; margin-bottom: 2em; }

    .cta-button {
        display: inline-block; padding: 16px 32px; background-color: var(--gold);
        color: #000; text-decoration: none; font-weight: bold; border-radius: 2px; 
        transition: 0.3s; text-transform: uppercase; letter-spacing: 2px; 
    }

    .films-page-content { max-width: 1200px; margin: 0 auto; padding: 0 5% 80px 5%; }
    .film-philosophy-section { padding: 120px 0; text-align: center; border-bottom: 1px solid #222; }
    .film-philosophy-section p { font-size: 1.25rem; color: #888; line-height: 1.8; max-width: 850px; margin: 0 auto; }

    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; padding: 80px 0; }
    .project-card { background: #111; border: 1px solid #222; overflow: hidden; display: flex; flex-direction: column; }
    .card-image-container { position: relative; width: 100%; aspect-ratio: 16/9; background: #000; }
    .card-image-container img { width: 100%; height: 100%; object-fit: cover; }
    
    .status-badge { 
        position: absolute; top: 15px; right: 15px; background: var(--gold); color: #000; 
        padding: 5px 12px; font-size: 0.7rem; font-weight: bold; text-transform: uppercase;
    }

    .card-info { padding: 30px; }
    .card-info h4 { font-size: 1.3rem; color: #fff; margin-bottom: 5px; }
    .format-label { color: var(--gold); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 15px; display: block; }

    .process-steps-list { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; margin-bottom: 100px; }
    .process-steps-list li { border-top: 1px solid var(--gold); padding-top: 25px; }
    .process-steps-list h4 { color: var(--gold); margin-bottom: 10px; }

    .film-final-cta-section { padding: 100px 0; text-align: center; border-top: 1px solid #222; }
    .scroll-down-arrow { position: absolute; bottom: 30px; left: 50%; width: 1px; height: 50px; background: rgba(255,255,255,0.2); }
</style>
