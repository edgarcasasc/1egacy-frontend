<script>
    import { fade } from 'svelte/transition';
</script>

<svelte:head>
    <title>El Códice del Legado | 1egacy</title>
    <meta name="description" content="Un Códice familiar curado: investigación, narrativa y diseño en una edición lista para conservar y heredar." />
    <link rel="canonical" href="https://somos1egacy.com/codice-del-legado" />
</svelte:head>

<div class="codice-wrapper">

    <section class="hero-section">
        <div class="hero-background"></div>
        
        <div class="hero-content">
            <h1>El Códice del Legado</h1>
            <h2>Un Códice familiar curado: investigación, narrativa y diseño en una edición lista para conservar y heredar.</h2>
            
            <a href="/solicitar-consulta" class="cta-button">Solicitar evaluación</a>
            <p class="hero-micro">Privado · 3–5 min · Te respondemos con el siguiente paso</p>
        </div>
        
        <div class="scroll-down-arrow" aria-label="Ir a la siguiente sección"></div>
    </section>

    <section class="problem-section-futuristic" id="problem-section">
        <h3>Las historias familiares se pierden cuando no quedan registradas.</h3>
        <p class="key-question-futuristicdos">
            Un nombre olvidado, una fecha confusa, una rama que se rompe. La memoria es frágil si no tiene un soporte.
        </p>
        <p class="key-question-futuristic">
            El Códice existe para convertir memoria dispersa en un archivo claro, presentable y heredable.
        </p>
    </section>

    <section class="solution-section-futuristic">
        <h3 class="title-serif">Un archivo familiar curado.</h3>
        <div class="solution-content-futuristic">
            <div class="solution-image-futuristic">
                <img src="/articulos/El-Cedice-del-Legado.webp" alt="El Códice del Legado edición física" loading="lazy">
            </div>
            <div class="solution-text-futuristic">
                <p>
                    El Códice del Legado no es un libro común. Es una edición diseñada para organizar tu historia.
                </p>
                <p>
                    Reúne investigación, narrativa y diseño para que tu legado quede protegido en un formato físico y digital. Cada pieza se construye con criterio editorial y acabados de calidad de archivo, lista para ser descubierta por tus hijos y las generaciones futuras.
                </p>
            </div>
        </div>
    </section>

    <section class="features-list-futuristic">
        <h2 class="title-serif">Qué incluye</h2>
        <p>Estructuramos tu historia en seis pilares fundamentales:</p>
        
        <ul class="features-grid">
            <li>
                <h4>Narrativa del linaje</h4>
                <p>Una historia escrita y estructurada con los hallazgos disponibles.</p>
            </li>
            <li>
                <h4>Mapa y rutas familiares</h4>
                <p>Mapas y contexto de migraciones cuando se puede documentar.</p>
            </li>
            <li>
                <h4>Heráldica reinterpretada</h4>
                <p>Investigación y reinterpretación visual del escudo asociado al linaje (cuando aplica).</p>
            </li>
            <li>
                <h4>Árbol genealógico</h4>
                <p>Árbol visual con las ramas y relaciones que se puedan validar.</p>
            </li>
            <li>
                <h4>Edición y materiales</h4>
                <p>Diseño editorial y acabados pensados para conservarse.</p>
            </li>
             <li>
                 <h4>Entrega</h4>
                 <p>Entrega cuidada y lista para guardar o regalar.</p>
             </li>
        </ul>
        <p class="section-note">Nota: el alcance final depende de la información disponible y lo que la familia pueda aportar.</p>
    </section>

    <section class="process-list-futuristic">
        <h2 class="title-serif">Cómo trabajamos</h2>
        <p>Crear un legado es un proceso colaborativo y ordenado.</p>
        
        <ol class="process-timeline">
            <li>
                <h4>1. Evaluación inicial</h4>
                <p>Definimos objetivo, alcance y qué materiales existen (fotos, actas, relatos).</p>
            </li>
            <li>
                <h4>2. Investigación y curaduría</h4>
                <p>Buscamos fuentes y organizamos los hallazgos con criterio editorial.</p>
            </li>
            <li>
                <h4>3. Diseño y producción</h4>
                <p>Diseño editorial, arte heráldico (si aplica) y preparación de entregables.</p>
            </li>
            <li>
                <h4>4. Entrega</h4>
                <p>Recibes tu Códice y una guía para conservarlo y compartirlo.</p>
            </li>
        </ol>
        <p class="section-note">Requisitos típicos: apellido(s), lugares aproximados y cualquier documento/foto que quieras incluir.</p>
    </section>

    <section class="testimonials-futuristic">
        <h2 class="title-serif">Lo que dicen las familias</h2>
        <div class="testimonial-item">
            <blockquote>
                <p>"Ver la historia de mi padre, encuadernada de esa manera... hubo lágrimas. Es algo que mis hijos ahora conocen."</p>
            </blockquote>
            <footer> Mariana V. <span>Cliente</span> </footer>
        </div>
        <div class="testimonial-item">
            <blockquote>
                <p>"Como profesional, valoro la precisión. No inventaron nada, organizaron lo que teníamos y le dieron el valor que merecía."</p>
            </blockquote>
            <footer> Ricardo E. <span>Cliente</span> </footer>
        </div>
    </section>

    <section class="final-cta-futuristic" id="solicitar-consulta">
        <h2 class="title-serif">Tu historia merece un archivo a la altura.</h2>
        <p>
            Un Códice es una comisión familiar: definimos alcance, fuentes y entregables antes de iniciar. Si tu caso es elegible, te compartimos propuesta y siguientes pasos.
        </p>
        <a href="/solicitar-consulta" class="cta-button">Solicitar evaluación para mi Códice</a>
        <p class="cta-micro">Privado · Sin compromiso · Respuesta por correo</p>
    </section>

</div>

<style>
    /* --- FIX CRÍTICO: ELIMINAR ESPACIO SUPERIOR --- */
    /* Forzamos que el contenedor principal del sitio no tenga padding superior en esta página */
    :global(body), :global(#main-content), :global(main) {
        padding-top: 0 !important;
        margin-top: 0 !important;
    }

    .codice-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        color: #e0e0e0;
        line-height: 1.7;
        width: 100%;
        overflow-x: hidden;
        background-color: #121212;
    }

    h1, h2.title-serif, h3.title-serif {
         font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
         font-weight: 400;
         color: #f5f5f5;
         text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }

    section:not(.hero-section) {
        padding: 80px 40px;
        max-width: 1100px;
        margin: 0 auto 60px auto;
        border-radius: 12px;
        background-color: #1a1a1a;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
        box-sizing: border-box;
    }

    /* BOTONES */
    .cta-button {
        display: inline-block;
        padding: 15px 30px;
        background-color: #c0a062;
        color: #121212;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1rem;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
        border: none;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .cta-button:hover {
        background-color: #a08450;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(192, 160, 98, 0.3);
    }

    .hero-micro, .cta-micro {
        font-size: 0.85rem;
        color: #888;
        margin-top: 1rem;
        font-style: italic;
    }

    .section-note {
        font-size: 0.9rem;
        color: #666;
        margin-top: 2rem;
        font-style: italic;
    }

    /* --- HERO --- */
    .hero-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        position: relative;
        text-align: center;
        color: white;
        overflow: hidden;
        /* No margins or paddings that push content down */
        margin: 0;
        padding: 0;
    }

    /* IMAGEN DE FONDO */
    .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background-image: url('/articulos/back_codice.webp');
        background-size: cover;
        background-position: center;
        filter: brightness(0.4);
    }

    .hero-content {
        max-width: 800px;
        padding: 20px;
        position: relative;
        z-index: 1;
        /* Un pequeño padding superior para compensar visualmente el menú transparente si es necesario */
        padding-top: 80px; 
    }

    .hero-content h1 {
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        font-size: clamp(3rem, 8vw, 4.5rem);
        font-weight: 500;
        line-height: 1.2;
        margin-bottom: 0.5em;
        color: #f5f5f5;
    }
    .hero-content h2 {
        font-size: clamp(1.1rem, 3vw, 1.6rem);
        font-weight: 300;
        line-height: 1.5;
        margin-bottom: 2em;
        color: #e0e0e0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .scroll-down-arrow {
        position: absolute; bottom: 30px; left: 50%;
        transform: translateX(-50%); width: 30px; height: 50px;
        z-index: 2;
    }
    .scroll-down-arrow::before, .scroll-down-arrow::after {
        content: ''; position: absolute; top: 60%; left: 50%;
        width: 2px; height: 20px; background-color: white;
    }
    .scroll-down-arrow::before { transform: translateX(-50%) rotate(45deg); }
    .scroll-down-arrow::after { transform: translateX(-50%) rotate(-45deg); }

    /* --- PROBLEM --- */
    .problem-section-futuristic {
        max-width: 750px;
        text-align: center;
    }
    .problem-section-futuristic h3 {
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        font-size: 2em; color: #e0e0e0; margin-bottom: 1.5em; font-weight: 400;
    }
    .key-question-futuristic, .key-question-futuristicdos {
        font-size: 1.2em; color: #bdbdbd; margin-bottom: 1.5em;
    }
    .key-question-futuristic {
        font-size: 1.4em; color: #f5f5f5; font-weight: 500; font-style: italic;
        margin-top: 2em; padding-top: 1.5em;
        border-top: 1px solid rgba(192, 160, 98, 0.3);
        display: inline-block;
    }

    /* --- SOLUTION --- */
    .solution-section-futuristic h3.title-serif { font-size: 2.8em; margin-bottom: 50px; text-align: center; }
    .solution-content-futuristic { display: flex; align-items: center; gap: 60px; }
    .solution-image-futuristic { flex: 1; max-width: 500px; }
    .solution-image-futuristic img {
        width: 100%; height: auto; display: block; border-radius: 4px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }
    .solution-text-futuristic { flex: 1.1; text-align: left; }
    .solution-text-futuristic p { font-size: 1.1em; color: #bdbdbd; margin-bottom: 1.5em; }
    
    /* --- FEATURES --- */
    .features-list-futuristic { text-align: center; }
    .features-list-futuristic h2.title-serif { font-size: 2.8em; margin-bottom: 20px; }
    .features-list-futuristic > p { font-size: 1.3em; color: #bdbdbd; margin-bottom: 50px; }
    
    .features-grid {
        list-style: none; padding: 0; display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;
    }
    .features-grid li {
        background-color: #222; padding: 30px; border-radius: 8px;
        border: 1px solid #333; transition: transform 0.3s ease;
        text-align: left;
    }
    .features-grid li:hover { transform: translateY(-5px); border-color: #c0a062; }
    .features-grid h4 {
        font-size: 1.2em; color: #c0a062; margin-top: 0; margin-bottom: 10px;
        font-weight: 600;
    }
    .features-grid p { font-size: 1em; color: #bdbdbd; margin: 0; }

    /* --- PROCESS --- */
    .process-list-futuristic { text-align: center; background-color: #121212; }
    .process-list-futuristic h2.title-serif { font-size: 2.8em; margin-bottom: 20px; }
    .process-timeline {
        list-style: none; padding-left: 0; position: relative;
        max-width: 700px; margin: 40px auto; counter-reset: process-counter;
    }
    .process-timeline li {
        position: relative; margin-bottom: 40px; padding-left: 60px;
        text-align: left; padding-bottom: 20px; border-left: 2px solid #333;
    }
    .process-timeline li:last-child { border-left: none; padding-bottom: 0; }
    .process-timeline li h4 { color: #e0e0e0; font-size: 1.2em; margin-bottom: 5px; margin-top: 0; }
    
    .process-timeline li::before {
        content: ""; 
        position: absolute; left: -6px; top: 5px; background-color: #c0a062;
        width: 14px; height: 14px; border-radius: 50%;
    }

    /* --- TESTIMONIALS --- */
    .testimonials-futuristic { text-align: center; }
    .testimonial-item {
        max-width: 700px; margin: 0 auto 40px auto; padding: 30px;
        background-color: #222; border-left: 4px solid #c0a062;
        border-radius: 0 4px 4px 0;
    }
    .testimonial-item blockquote {
        margin: 0; font-size: 1.1em; color: #e0e0e0;
        font-style: italic; text-align: left;
    }
    .testimonial-item footer {
        margin-top: 15px; font-weight: 600; color: #f5f5f5; 
        text-align: right; font-size: 0.9em;
    }
    .testimonial-item footer span { font-weight: 300; color: #888; margin-left: 5px; }

    /* --- FINAL CTA --- */
    .final-cta-futuristic {
        background-color: #121212; color: white; text-align: center;
        margin-bottom: 0; padding-bottom: 100px; padding-top: 60px;
    }
    .final-cta-futuristic h2.title-serif { font-size: 2.2em; margin-bottom: 20px; }
    .final-cta-futuristic p { font-size: 1.1em; color: #bdbdbd; max-width: 600px; margin: 0 auto 40px auto; }

    /* --- RESPONSIVO --- */
    @media (max-width: 900px) {
        section:not(.hero-section) { padding: 60px 20px; }
        .solution-content-futuristic { flex-direction: column; }
        .solution-image-futuristic { max-width: 100%; }
        .features-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
        .hero-content h1 { font-size: 2.5rem; }
        h2.title-serif { font-size: 2em; }
    }
</style>