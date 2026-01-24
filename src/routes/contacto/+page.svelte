<script>
    import { fade } from 'svelte/transition';
</script>

<svelte:head>
    <title>Contacto | 1egacy</title>
    <meta name="description" content="Cuéntanos qué necesitas y te diremos el siguiente paso. Solicita una evaluación para tu Códice o escríbenos directamente." />
    <link rel="canonical" href="https://somos1egacy.com/contacto" />
</svelte:head>

<div class="contact-page-container">

    <section class="contact-section contact-header">
        <h1 class="title-serif">Contacto</h1>
        <p>
            Cuéntanos qué necesitas y te diremos el siguiente paso. Puedes solicitar una evaluación para tu Códice o escribirnos directamente para dudas generales.
        </p>
        <p class="hero-micro">Privado · Respuesta en 24–48 h hábiles</p>
    </section>

    <section class="contact-section contact-options">
        <h2>Elige tu Camino</h2>
        <div class="options-grid">
            
            <div class="contact-method">
                <h4>Solicitar evaluación (Códice y proyectos)</h4>
                <p class="description">
                    Para Códice del Legado, Origins o Producciones. Nos ayuda a preparar la llamada y darte una respuesta precisa.
                </p>
                <a href="/solicitar-consulta" class="cta-button">Ir a solicitud de evaluación</a>
            </div>

            <div class="contact-method">
                <h4>Correo directo</h4>
                <p class="description">
                    Para preguntas generales, colaboraciones o prensa.
                </p>
                <div class="email-block">
                    <a href="mailto:hello@1egado.com" class="email-link">hello@1egado.com</a>
                    <p class="microcopy">Incluye tu apellido y país para responder más rápido.</p>
                </div>
            </div>

        </div>
    </section>

    <section class="contact-section faq-section">
        <h2>Preguntas que Quizás Ya Tengas</h2>
        <div class="faq-list">
            
            <details>
                <summary>¿Cuál es el costo aproximado de un Códice?</summary>
                <div class="faq-content">
                    <p>El precio varía según alcance (investigación, diseño, edición y entrega). Después de la evaluación inicial te compartimos una propuesta clara, con entregables y sin sorpresas.</p>
                </div>
            </details>

            <details>
                <summary>¿Cuánto tiempo toma el proceso completo?</summary>
                <div class="faq-content">
                    <p>Depende del alcance y de la información disponible. Un Códice suele tomar entre 3 y 6 meses. Te compartimos un estimado al definir el proyecto y te mantenemos al tanto por etapas.</p>
                </div>
            </details>

            <details>
                <summary>¿Trabajan con clientes fuera de México?</summary>
                <div class="faq-content">
                    <p>Sí. Trabajamos con familias dentro y fuera de México. Podemos coordinar todo de forma remota y entregar en formatos digitales; la logística de piezas físicas se define según el país.</p>
                </div>
            </details>

        </div>
    </section>

</div>

<style>
    /* --- ESTILOS GLOBALES --- */
    :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        margin: 0;
        background-color: #121212;
        color: #e0e0e0;
        line-height: 1.7;
    }

    h1, h2.title-serif {
         font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
         font-weight: 400;
         color: #f5f5f5;
         text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }

    .contact-page-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 120px 40px 60px 40px; /* Ajustado para navbar fija */
    }

    .contact-section {
        padding: 60px 0;
        margin-bottom: 60px;
        border-bottom: 1px solid rgba(192, 160, 98, 0.15);
    }
    .contact-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    /* BOTONES */
    .cta-button {
        display: inline-block;
        padding: 14px 28px;
        background-color: #c0a062;
        color: #121212;
        text-decoration: none;
        font-weight: bold;
        font-size: 1rem;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.3s ease;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-align: center;
        margin-top: auto;
    }
    .cta-button:hover {
        background-color: #a08450;
        transform: translateY(-2px);
    }

    /* --- HEADER --- */
    .contact-header {
        text-align: center;
        padding-bottom: 40px;
    }
    .contact-header h1 {
        font-size: 3em;
        margin-bottom: 25px;
    }
    .contact-header p {
        font-size: 1.2em;
        color: #bdbdbd;
        max-width: 750px;
        margin: 0 auto;
    }
    .hero-micro {
        margin-top: 1.5em !important;
        font-size: 0.9em !important;
        font-style: italic;
        color: #888 !important;
    }

    /* --- OPTIONS --- */
    .contact-options h2 {
        font-family: -apple-system, sans-serif;
        font-size: 2.2em;
        text-align: center;
        margin-bottom: 50px;
        color: #e0e0e0;
        font-weight: 600;
    }
    .options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 40px;
    }
    .contact-method {
        background-color: #1a1a1a;
        padding: 35px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        border-top: 3px solid #c0a062;
        display: flex;
        flex-direction: column;
    }
    .contact-method h4 {
        font-size: 1.3em;
        color: #c0a062;
        margin: 0 0 15px 0;
        font-weight: 600;
    }
    .contact-method p.description {
        font-size: 1em;
        color: #bdbdbd;
        margin: 0 0 25px 0;
        flex-grow: 1;
    }
    
    /* Bloque email */
    .email-block {
        margin-top: auto;
    }
    .email-link {
        font-size: 1.2rem;
        color: #c0a062;
        text-decoration: none;
        font-weight: 600;
        word-break: break-all;
        transition: color 0.3s ease;
        display: block;
        margin-bottom: 0.5rem;
    }
    .email-link:hover { color: #a08450; }
    .microcopy {
        font-size: 0.85rem;
        color: #777;
        margin: 0;
        font-style: italic;
    }

    /* --- FAQ --- */
    .faq-section h2 {
        font-family: -apple-system, sans-serif;
        font-size: 2.2em;
        text-align: center;
        margin-bottom: 50px;
        color: #e0e0e0;
        font-weight: 600;
    }
    .faq-list details {
        background-color: #1a1a1a;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #333;
    }
    .faq-list summary {
        padding: 20px;
        font-weight: 600;
        color: #e0e0e0;
        cursor: pointer;
        list-style: none;
        position: relative;
        font-size: 1.1em;
    }
    .faq-list summary::-webkit-details-marker { display: none; }
    
    .faq-list summary::after {
        content: '+';
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.5em;
        color: #c0a062;
    }
    .faq-list details[open] summary::after { content: '−'; }
    
    .faq-content {
        padding: 0 20px 20px 20px;
        color: #bdbdbd;
        font-size: 1em;
        border-top: 1px solid #333;
    }

    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
        .contact-page-container { padding: 100px 20px 40px 20px; }
        .contact-header h1 { font-size: 2.4em; }
        .options-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
        .contact-page-container { padding: 80px 15px 30px 15px; }
        .contact-header h1 { font-size: 2em; }
        .contact-options h2, .faq-section h2 { font-size: 1.8em; }
        .email-link { font-size: 1.1rem; }
    }
</style>