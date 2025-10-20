<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Códice del Legado | 1egacy</title>
    <style>
        /* --- ESTILOS GLOBALES --- */
        body {
            /* Fuente limpia y moderna para el cuerpo general */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            margin: 0;
            background-color: #121212; /* Fondo oscuro principal */
            color: #e0e0e0; /* Color de texto claro por defecto */
            line-height: 1.7; /* Mayor espaciado entre líneas */
            overflow-x: hidden; /* Evita scroll horizontal */
        }

        /* Fuentes Serif para títulos principales H2 y H3 específicos */
        h1, h2.title-serif, h3.title-serif {
             font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
             font-weight: 400; /* Peso normal o ligero */
             color: #f5f5f5; /* Blanco casi puro */
             text-shadow: 0 1px 3px rgba(0,0,0,0.5); /* Sombra sutil */
        }

        /* Estilos generales de sección (excepto Hero) */
        section:not(.hero-section) {
            padding: 80px 40px; /* Padding generoso */
            max-width: 1100px; /* Ancho máximo estándar */
            margin: 0 auto 60px auto; /* Centrado con margen inferior */
            border-radius: 12px; /* Bordes suaves */
            background-color: #1a1a1a; /* Fondo de sección ligeramente diferente */
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.4); /* Sombra difusa */
            box-sizing: border-box; /* Incluye padding en el ancho */
        }

        /* Botón CTA general (adaptado del Hero) */
        .cta-button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #c0a062; /* Color dorado/ocre */
            color: #121212; /* Texto oscuro para contraste */
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
            transform: translateY(-2px); /* Ligero lift al pasar el ratón */
            box-shadow: 0 4px 10px rgba(192, 160, 98, 0.3); /* Sombra dorada */
        }

        /* --- ESTILOS SECCIÓN HERO (Mantenidos y ajustados) --- */
        .hero-section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Altura mínima de pantalla completa */
            width:100%;
            position: relative;
            text-align: center;
            color: white;
            overflow: hidden;
            box-sizing: border-box;
        }
        .hero-content {
            max-width: 800px;
            padding: 20px;
            position: relative;
            z-index: 1;
        }
        .hero-content h1 {
            font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
            font-size: 3.8rem;
            font-weight: 500;
            line-height: 1.2;
            margin-bottom: 0.5em;
            color: #f5f5f5;
            text-shadow: 0 2px 5px rgba(0,0,0,0.6);
        }
        .hero-content h2 {
            font-size: 1.6rem;
            font-weight: 300;
            line-height: 1.5;
            margin-bottom: 2em;
            color: #e0e0e0;
            /* Asegura sans-serif si h2.title-serif no aplica */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        }
        .hero-background {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
            background-image: url('articulos/back_codice.webp');
            background-size: cover; background-position: center; filter: brightness(0.5);
        }
        .scroll-down-arrow {
            position: absolute; bottom: 30px; left: 50%;
            transform: translateX(-50%); width: 30px; height: 50px;
            cursor: pointer; z-index: 2; animation: bounce 2s infinite;
        }
        .scroll-down-arrow::before, .scroll-down-arrow::after {
            content: ''; position: absolute; top: 60%; left: 50%;
            width: 2px; height: 20px; background-color: white;
        }
        .scroll-down-arrow::before { transform: translateX(-50%) rotate(45deg); }
        .scroll-down-arrow::after { transform: translateX(-50%) rotate(-45deg); }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
            40% { transform: translateX(-50%) translateY(-10px); }
            60% { transform: translateX(-50%) translateY(-5px); }
        }

        /* --- ESTILOS SECCIÓN PROBLEMA --- */
        .problem-section-futuristic {
            max-width: 750px;
            text-align: center;
    
        }
        .problem-section-futuristic h3 { /* No necesita .title-serif aquí */
            font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
            font-size: 2em; color: #e0e0e0; margin-bottom: 1.5em; font-weight: 400;
        }
        .problem-section-futuristic p {
            font-size: 1.2em; color: #bdbdbd; margin-bottom: 1.5em; ;
        }
        .key-question-futuristic {
            font-size: 1.4em; color: #f5f5f5; font-weight: 500; font-style: italic;
            margin-top: 2.5em; padding-top: 1.5em;
            border-top: 1px solid rgba(192, 160, 98, 0.3); /* Línea dorada sutil */
             display: inline-block; width: auto; max-width: 100%; /* Ajuste para border-top */
        }
        .key-question-futuristicdos {
            
             display: inline-block; width: auto; max-width: 100%; /* Ajuste para border-top */
        }


        /* --- ESTILOS SECCIÓN SOLUCIÓN --- */
        .solution-section-futuristic h3.title-serif { font-size: 2.8em; margin-bottom: 50px; text-align: center; }
        .solution-content-futuristic { display: flex; align-items: center; gap: 60px; }
        .solution-image-futuristic { flex: 1; max-width: 500px; }
        .solution-image-futuristic img {
            width: 100%; height: auto; display: block; border-radius: 10px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3); transition: transform 0.4s ease-out;
        }
        .solution-image-futuristic img:hover { transform: scale(1.03); }
        .solution-text-futuristic { flex: 1.1; text-align: left; }
        .solution-text-futuristic p { font-size: 1.2em; color: #bdbdbd; margin-bottom: 1.8em; letter-spacing: 0.5px; }
        .solution-text-futuristic p:first-of-type::before {
            content: ''; display: block; width: 50px; height: 2px;
            background-color: #c0a062; margin-bottom: 20px;
        }

        /* --- ESTILOS SECCIÓN CARACTERÍSTICAS --- */
        .features-list-futuristic { text-align: center; }
        .features-list-futuristic h2.title-serif { font-size: 2.8em; margin-bottom: 20px; }
        .features-list-futuristic > p {
            font-size: 1.3em; color: #bdbdbd; max-width: 800px; margin: 0 auto 50px auto;
        }
        .features-grid {
            list-style: none; padding: 0; display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;
        }
        .features-grid li {
            background-color: #222; padding: 30px; border-radius: 8px;
            border: 1px solid #333; transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .features-grid li:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); }
        .features-grid h4 {
            font-size: 1.4em; color: #c0a062; margin-top: 0; margin-bottom: 15px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            font-weight: 600; text-align: left; /* Alineado a la izquierda dentro del item */
        }
        .features-grid p { font-size: 1em; color: #bdbdbd; text-align: left; } /* Alineado a la izquierda */

        /* --- ESTILOS SECCIÓN PROCESO --- */
        .process-list-futuristic { text-align: center; background-color: #121212; }
        .process-list-futuristic h2.title-serif { font-size: 2.8em; margin-bottom: 20px; }
        .process-list-futuristic > p {
             font-size: 1.3em; color: #bdbdbd; max-width: 800px; margin: 0 auto 50px auto;
        }
        .process-timeline {
            list-style: none; padding-left: 0; position: relative;
            max-width: 700px; margin: 0 auto; counter-reset: process-counter;
        }
        .process-timeline li {
            position: relative; margin-bottom: 40px; padding-left: 60px;
            text-align: left; padding-bottom: 20px; border-left: 2px solid #333;
        }
        .process-timeline li:last-child { border-left: none; padding-bottom: 0; }
        .process-timeline li::before {
            counter-increment: process-counter; content: counter(process-counter);
            position: absolute; left: -21px; top: 0; background-color: #c0a062;
            color: #121212; width: 40px; height: 40px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; font-size: 1.2em; border: 3px solid #1a1a1a;
            box-shadow: 0 0 10px rgba(192, 160, 98, 0.4);
        }
        .process-timeline h4 {
            font-size: 1.4em; margin-top: 5px; margin-bottom: 10px; color: #e0e0e0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            font-weight: 600;
        }
        .process-timeline p { font-size: 1em; color: #bdbdbd; margin-bottom: 0; }

        /* --- ESTILOS SECCIÓN TESTIMONIOS --- */
        .testimonials-futuristic { text-align: center; }
        .testimonials-futuristic h2.title-serif { font-size: 2.8em; margin-bottom: 50px; }
        .testimonial-item {
            max-width: 700px; margin: 0 auto 40px auto; padding: 30px;
            background-color: #222; border-left: 5px solid #c0a062;
            border-radius: 0 8px 8px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .testimonial-item blockquote {
            margin: 0; padding: 0; font-size: 1.2em; color: #e0e0e0;
            font-style: italic; line-height: 1.6; text-align: left; /* Alineado a la izquierda */
        }
        .testimonial-item footer {
            margin-top: 20px; font-style: normal; font-weight: 600;
            color: #f5f5f5; font-size: 1.1em; text-align: right;
        }
        .testimonial-item footer span {
            display: block; font-weight: 300; font-size: 0.9em; color: #bdbdbd;
        }

        /* --- ESTILOS SECCIÓN FINAL CTA --- */
        .final-cta-futuristic {
            background-color: #121212; color: white; text-align: center;
            /* Quitamos el margen inferior para que sea el final */
             margin-bottom: 0;
             padding-bottom: 100px; /* Más espacio al final */
             padding-top: 100px;
        }
        .final-cta-futuristic h2.title-serif { font-size: 2.5em; color: white; margin-bottom: 30px;}
        .final-cta-futuristic p { font-size: 1.2em; color: #bdbdbd; max-width: 700px; margin: 0 auto 40px auto;}


        /* --- RESPONSIVIDAD GENERAL --- */
        @media (max-width: 900px) {
             section:not(.hero-section) { padding: 60px 30px; }
             /* Ajusta tamaños de títulos generales en tablet */
             h2.title-serif, .solution-section-futuristic h3.title-serif { font-size: 2.4em; }
             .problem-section-futuristic h3 { font-size: 1.8em; }

             .solution-content-futuristic { flex-direction: column; gap: 40px; }
             .solution-text-futuristic { text-align: center; }
             .solution-text-futuristic p:first-of-type::before { margin-left: auto; margin-right: auto;}
             .solution-image-futuristic { max-width: 80%; order: -1;}

             .features-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;}
             .process-timeline { max-width: 90%; }
             .process-timeline li { padding-left: 50px; }
             .process-timeline li::before { left: -18px; width: 36px; height: 36px; font-size: 1.1em; }
             .testimonial-item { max-width: 90%; }
        }

        @media (max-width: 600px) {
            body { line-height: 1.6; }
            section:not(.hero-section) { padding: 40px 20px; margin-bottom: 40px; }
             /* Ajusta tamaños de títulos generales en móvil */
            h2.title-serif, .solution-section-futuristic h3.title-serif { font-size: 2em; }
             .problem-section-futuristic h3 { font-size: 1.6em; }

            .hero-content h1 { font-size: 2.5rem; }
            .hero-content h2 { font-size: 1.2rem; }
            .cta-button { padding: 12px 25px; font-size: 1rem; }

            .problem-section-futuristic p { font-size: 1em; }
            .key-question-futuristic { font-size: 1.1em; }

            .solution-content-futuristic { gap: 30px; }
            .solution-text-futuristic p { font-size: 1em; }

            .features-list-futuristic > p { font-size: 1.1em; margin-bottom: 30px;}
            .features-grid li { padding: 25px; }
            .features-grid h4 { font-size: 1.2em; }

            .process-list-futuristic > p { font-size: 1.1em; margin-bottom: 30px;}
            .process-timeline li { padding-left: 45px; margin-bottom: 30px; }
            .process-timeline li::before { left: -16px; width: 32px; height: 32px; font-size: 1em; }

            .testimonials-futuristic h2.title-serif { margin-bottom: 30px;}
            .testimonial-item blockquote { font-size: 1.1em; }
            .testimonial-item footer { font-size: 1em; }

            .final-cta-futuristic h2.title-serif { font-size: 2em; } /* Ajuste */
            .final-cta-futuristic p { font-size: 1em; }
        }

    </style>
</head>
<body>

    <section class="hero-section">
        <div class="hero-background"></div>
        <div class="hero-content">
            <h1>El Códice del Legado</h1>
            <h2>El Testamento Visual de Tu Linaje. Donde la investigación histórica se encuentra con la maestría artesanal para hacer eterna tu historia.</h2>
            <a href="#solicitar-consulta" class="cta-button">Comenzar tu Códice</a>
        </div>
        <a href="#problem-section" class="scroll-down-arrow" aria-label="Ir a la siguiente sección"></a>
    </section>

    <section class="problem-section-futuristic" id="problem-section">
        <h3>Las historias familiares son como susurros en el tiempo.</h3>
        <p class="key-question-futuristicdos">
            Se cuentan en reuniones, se recuerdan con nostalgia y, con demasiada frecuencia, se desvanecen con cada generación que pasa. La memoria es frágil. Un nombre olvidado, una fecha perdida, una saga entera reducida a un eco.
        </p>
        <p class="key-question-futuristic">
            ¿Quién será el guardián de tu historia cuando ya no estés para contarla?
        </p>
    </section>

    <section class="solution-section-futuristic">
        <h3 class="title-serif">Un Ancla para la Memoria. Un Faro para el Futuro.</h3>
        <div class="solution-content-futuristic">
            <div class="solution-image-futuristic">
                <img src="articulos/El-Cedice-del-Legado.webp" alt="El Códice del Legado elegantemente presentado">
            </div>
            <div class="solution-text-futuristic">
                <p>
                    El Códice del Legado no es un libro. Es la respuesta a esa pregunta. Es un acto de preservación; una declaración de que tu historia familiar importa.
                </p>
                <p>
                    Concebido como una obra de archivo de calidad museística, cada Códice es una pieza única, investigada por historiadores y forjada a mano por artesanos. Es el lugar donde los susurros de tu pasado se convierten en una crónica imborrable, lista para ser descubierta por tus hijos, tus nietos y las generaciones que aún no conoces.
                </p>
            </div>
        </div>
    </section>

    <section class="features-list-futuristic">
        <h2 class="title-serif">Las Páginas de Tu Historia</h2>
        <p>Cada Códice es un universo en sí mismo, meticulosamente compuesto por:</p>
        <ul class="features-grid">
            <li>
                <h4>La Saga Narrativa</h4>
                <p>Una crónica cautivadora que relata la historia de tu linaje...</p>
            </li>
            <li>
                <h4>Cartografía del Linaje</h4>
                <p>Mapas históricos y personalizados que trazan las migraciones...</p>
            </li>
            <li>
                <h4>El Blasón Rediseñado</h4>
                <p>La investigación y el rediseño heráldico de tu escudo...</p>
            </li>
            <li>
                <h4>Árbol Genealógico Visual</h4>
                <p>Un árbol genealógico completo y elegantemente diseñado...</p>
            </li>
            <li>
                <h4>Materialidad de Archivo</h4>
                <p>Encuadernado a mano con técnicas tradicionales...</p>
            </li>
             <li>
                 <h4>Presentación Exclusiva</h4>
                 <p>Entregado en un estuche a medida, diseñado para proteger...</p>
             </li>
        </ul>
    </section>

    <section class="process-list-futuristic">
        <h2 class="title-serif">De la Memoria a la Obra Maestra: Nuestro Proceso</h2>
        <p>Crear un legado es un viaje que emprendemos contigo.</p>
        <ol class="process-timeline">
            <li>
                <h4>Consulta y Descubrimiento</h4>
                <p>Todo comienza con una conversación. Escuchamos tu historia...</p>
            </li>
            <li>
                <h4>Investigación y Narración</h4>
                <p>Nuestro equipo de historiadores se sumerge en archivos...</p>
            </li>
            <li>
                <h4>Diseño y Artesanía</h4>
                <p>Los diseñadores y artesanos toman el relevo...</p>
            </li>
            <li>
                <h4>Entrega del Legado</h4>
                <p>Recibes tu Códice, una obra de arte única...</p>
            </li>
        </ol>
    </section>

    <section class="testimonials-futuristic">
        <h2 class="title-serif">Lo que los Guardianes de Legados Dicen</h2>
        <div class="testimonial-item">
            <blockquote>
                <p>"Ver la historia de mi padre, encuadernada de esa manera... hubo lágrimas..."</p>
            </blockquote>
            <footer> Mariana V. <span>Guardiana de la Historia Familiar</span> </footer>
        </div>
        <div class="testimonial-item">
            <blockquote>
                <p>"Como profesional, valoro la precisión y la excelencia..."</p>
            </blockquote>
            <footer> Ricardo E. <span>Fundador y CEO</span> </footer>
        </div>
    </section>

    <section class="final-cta-futuristic" id="solicitar-consulta">
        <h2 class="title-serif">Tu historia merece ser contada. Tu legado merece un guardián.</h2>
        <p>
            Un Códice es más que una compra; es una comisión. Es el acto de asegurar que las generaciones futuras no solo conozcan tu nombre, sino que entiendan la saga que te dio forma.
        </p>
        <a href="solicitar-consulta" class="cta-button">Solicitar una Consulta para tu Códice</a>
    </section>

</body>
</html>