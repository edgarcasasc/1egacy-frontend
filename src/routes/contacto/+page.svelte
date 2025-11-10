<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto | 1egacy - Hablemos de tu Legado</title>
    <style>
        /* --- ESTILOS GLOBALES --- */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            margin: 0;
            background-color: #121212;
            color: #e0e0e0;
            line-height: 1.7;
        }

        /* Fuentes Serif elegantes */
        h1, h2.title-serif, h3.title-serif, h4.title-serif {
             font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
             font-weight: 400;
             color: #f5f5f5;
             text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        /* Contenedor principal de la página */
        .contact-page-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 100px 40px 60px 40px; /* Padding Top ajustado para navbar fija */
        }

        /* Estilos generales de sección */
        .contact-section {
            padding: 60px 0; /* Padding vertical, sin horizontal extra */
            margin-bottom: 60px;
            border-bottom: 1px solid rgba(192, 160, 98, 0.15); /* Separador dorado muy sutil */
        }
        .contact-section:last-child {
            border-bottom: none; /* Sin borde en la última sección */
            margin-bottom: 0;
        }

        /* Botón CTA general (reutilizado) */
        .cta-button {
            display: inline-block;
            padding: 14px 28px; /* Ligeramente ajustado */
            background-color: #c0a062;
            color: #121212;
            text-decoration: none;
            font-weight: bold;
            font-size: 1rem; /* Tamaño base */
            border-radius: 5px;
            transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            border: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: center;
        }
        .cta-button:hover {
            background-color: #a08450;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(192, 160, 98, 0.3);
        }

        /* --- SECCIÓN 1: HEADER --- */
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
        .contact-header p:last-of-type {
            margin-top: 1em; /* Espacio antes del segundo párrafo */
            font-style: italic; /* Darle un toque diferente */
            color: #aaa;
        }

        /* --- SECCIÓN 2: OPCIONES DE CONTACTO --- */
        .contact-options h2 { /* Título H2 normal, no serif */
             font-family: -apple-system, BlinkMacSystemFont, /* ... */ sans-serif;
             font-size: 2.2em;
             text-align: center;
             margin-bottom: 50px;
             color: #e0e0e0;
             font-weight: 600;
        }
        .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Columnas responsivas */
            gap: 40px;
        }
        .contact-method {
            background-color: #1a1a1a;
            padding: 35px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            border-top: 3px solid #c0a062; /* Acento dorado arriba */
            display: flex;
            flex-direction: column; /* Apila contenido */
        }
        .contact-method h4 { /* Título de la opción */
            font-family: -apple-system, BlinkMacSystemFont, /* ... */ sans-serif;
            font-size: 1.3em;
            color: #c0a062; /* Dorado */
            margin: 0 0 15px 0;
            font-weight: 600;
        }
        .contact-method p {
            font-size: 1em;
            color: #bdbdbd;
            margin: 0 0 25px 0; /* Espacio antes del botón/enlace */
            flex-grow: 1; /* Empuja el botón/enlace hacia abajo */
        }
        .contact-method .cta-button,
        .contact-method .email-link {
            margin-top: auto; /* Asegura que esté al final */
            font-size: 0.95rem; /* Botón ligeramente más pequeño */
            padding: 12px 25px;
        }
        .email-link { /* Estilo específico para el enlace de email */
            color: #c0a062;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all; /* Evita desbordamiento de email largo */
             transition: color 0.3s ease;
        }
        .email-link:hover {
            color: #a08450;
        }

        /* --- SECCIÓN 3: PREGUNTAS FRECUENTES (FAQ) --- */
        .faq-section h2 { /* Título H2 normal */
             font-family: -apple-system, BlinkMacSystemFont, /* ... */ sans-serif;
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
            border: 1px solid #333; /* Borde sutil */
        }
        .faq-list summary {
            padding: 20px;
            font-weight: 600;
            color: #e0e0e0;
            cursor: pointer;
            list-style: none; /* Quita el marcador por defecto */
            position: relative;
            font-size: 1.1em;
        }
        /* Indicador de acordeón (flecha) */
        .faq-list summary::after {
            content: '+';
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.5em;
            color: #c0a062;
            transition: transform 0.3s ease;
        }
        .faq-list details[open] summary::after {
            content: '−'; /* Cambia a menos cuando está abierto */
             transform: translateY(-50%);
        }
        .faq-content {
            padding: 0 20px 20px 20px; /* Padding solo abajo y a los lados */
            color: #bdbdbd;
            font-size: 1em;
            border-top: 1px solid #333; /* Línea separadora */
            margin-left: 20px; /* Indentación del contenido */
            margin-right: 20px;
        }

        /* --- FORMULARIO DE CONSULTA (Placeholder - Estilos básicos) --- */
        #consulta-form-placeholder { /* ID para identificar el placeholder */
             background-color: #222;
             padding: 30px;
             border-radius: 8px;
             text-align: center;
             border: 1px dashed #555;
        }
         #consulta-form-placeholder p {
             margin: 0;
             color: #888;
             font-style: italic;
         }


        /* --- RESPONSIVIDAD --- */
        @media (max-width: 768px) {
            .contact-page-container { padding: 80px 20px 40px 20px; }
            .contact-header h1 { font-size: 2.4em; }
            .contact-header p { font-size: 1.1em; }
            .options-grid { grid-template-columns: 1fr; /* Una columna en tablet/móvil */ gap: 30px; }
            .contact-section { padding: 40px 0; }
        }
        @media (max-width: 480px) {
            .contact-page-container { padding: 60px 15px 30px 15px; }
            .contact-header h1 { font-size: 2em; }
            .contact-header p { font-size: 1em; }
            .contact-options h2, .faq-section h2 { font-size: 1.8em; margin-bottom: 30px;}
            .contact-method { padding: 25px; }
            .faq-list summary { font-size: 1em; padding: 15px; }
            .faq-list summary::after { font-size: 1.3em; right: 15px;}
            .faq-content { padding: 0 15px 15px 15px; font-size: 0.95em; margin-left: 15px; margin-right: 15px;}
        }

    </style>
</head>
<body>

    <div class="contact-page-container">

        <section class="contact-section contact-header">
            <h1 class="title-serif">Hablemos de tu Legado</h1>
            <p>
                Has explorado las posibilidades, has reflexionado sobre tu historia y ahora estás aquí. Este es el espacio donde las ideas toman forma y los legados comienzan a forjarse. Ya sea que tengas una pregunta precisa, una visión audaz o simplemente la curiosidad de saber más, te damos la bienvenida.
            </p>
            <p>
                Considera esta página no como un formulario, sino como la puerta abierta a nuestro estudio. Estamos aquí para escuchar.
            </p>
        </section>

<section class="contact-section contact-options">
    <h2>Elige tu Camino</h2>
    <div class="options-grid-two">
        <div class="contact-method">
            <h4>Envíanos tu Visión (Consulta Códice)</h4>
            <p class="description">Para consultas detalladas sobre El Códice del Legado u otros proyectos específicos, usa nuestro formulario dedicado. Nos permite prepararnos mejor para nuestra conversación.</p>
            <a href="/solicitar-consulta" class="cta-button">Ir al Formulario Detallado</a>
        </div>

        <div class="contact-method">
            <h4>Escríbenos Directamente</h4>
            <p class="description">Para preguntas generales, colaboraciones, consultas de prensa o si prefieres usar tu propio gestor de correo.</p>
            <a href="mailto:hola@1egado.com" class="email-link">
                hola@1egado.com
            </a>
        </div>
    </div>
</section>

        <section class="contact-section faq-section">
            <h2>Preguntas que Quizás Ya Tengas</h2>
            <div class="faq-list">
                <details>
                    <summary>¿Cuál es el costo aproximado de un Códice del Legado?</summary>
                    <div class="faq-content">
                        <p>Cada Códice es una obra de arte única y su precio varía según la profundidad de la investigación y la complejidad de la artesanía. Tras nuestra consulta inicial, te proporcionaremos una cotización detallada y transparente, sin sorpresas.</p>
                    </div>
                </details>
                <details>
                    <summary>¿Cuánto tiempo toma el proceso completo?</summary>
                    <div class="faq-content">
                        <p>La creación de un legado no puede apresurarse. Un proyecto como el Códice puede tomar entre 3 y 6 meses, desde la investigación inicial hasta la entrega final. Te mantendremos informado en cada etapa del viaje.</p>
                    </div>
                </details>
                <details>
                    <summary>¿Trabajan con clientes fuera de México?</summary>
                    <div class="faq-content">
                        <p>Absolutamente. La historia no tiene fronteras. Hemos colaborado con familias y empresas a nivel internacional para preservar sus legados. La tecnología nos permite mantener una comunicación fluida sin importar la distancia.</p>
                    </div>
                </details>
                </div>
        </section>

    </div> </body>
</html>