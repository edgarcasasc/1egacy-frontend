<script>
    /**
     * ====================================================================================
     * Canvas Arquitectónico: Proyecto 1egacy - Página de Inicio
     * ====================================================================================
     */

    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { gsap } from 'gsap';
    import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

   // *** Importar datos del servidor ***
    // Esta variable 'data' será poblada por la función 'load' en +page.server.js
    export let data;
    // Extraemos los productos destacados. Si no hay, usamos un array vacío.
    $: featuredProducts = data?.featuredProducts || [];
    // *** FIN ***

    // --- CÓDIGO GSAP PARA ANIMACIONES (Corregido y Blindado) ---
    onMount(() => {
        let animationTimeoutId; // Variable para guardar el ID del temporizador

        // Solo ejecutar GSAP en el navegador
        if (browser) {
            gsap.registerPlugin(MotionPathPlugin); // Registrar el plugin necesario
            console.log('Entorno de navegador detectado. Preparando animaciones GSAP...');

            // Diferir la ejecución de las animaciones para mejorar la carga inicial y asegurar renderizado
            animationTimeoutId = setTimeout(() => {
                console.log('Iniciando animaciones GSAP ahora.');
                
                try {
                    // 1. Buscamos el elemento CRÍTICO físicamente en el DOM
                    const hiloPathElement = document.querySelector('#hilo-path');

                    // 2. BLINDAJE: Solo ejecutamos las animaciones de ruta si el path existe
                    if (hiloPathElement) {
                        
                        // --- A. Animación de flotación vertical (General) ---
                        gsap.to('.hilo-destino-container', {
                            y: 10, 
                            duration: 7, 
                            repeat: -1, 
                            yoyo: true, 
                            ease: 'sine.inOut' 
                        });

                        // --- B. Partículas Individuales ---
                        const particulasSingle = gsap.utils.toArray('.particle-single');
                        
                        if (particulasSingle.length > 0) {
                            particulasSingle.forEach((particle, i) => {
                                gsap.to(particle, {
                                    motionPath: {
                                        path: hiloPathElement, // Usamos el elemento directo (Más seguro)
                                        align: hiloPathElement,
                                        alignOrigin: [0.5, 0.5]
                                    },
                                    duration: 8 + Math.random() * 4,
                                    delay: i * 0.5 + Math.random() * 1,
                                    repeat: -1,
                                    ease: 'linear',
                                    opacity: 0,
                                    // Al empezar, hacer fade in
                                    onStart: () => gsap.to(particle, { opacity: 1, duration: 1 }),
                                    // Al repetir, resetear opacidad y hacer fade in de nuevo
                                    onRepeat: () => {
                                        gsap.set(particle, { opacity: 0 });
                                        gsap.to(particle, { opacity: 1, duration: 1, delay: 0.1 });
                                    }
                                });
                            });
                        }

                        // --- C. Contenedor del Enjambre ---
                        const enjambreContainer = document.querySelector('.enjambre-container');
                        
                        if (enjambreContainer) {
                            gsap.to(enjambreContainer, {
                                motionPath: {
                                    path: hiloPathElement,
                                    align: hiloPathElement,
                                    alignOrigin: [0.5, 0.5],
                                    start: 0.1, 
                                    end: 0.9 
                                },
                                duration: 20, 
                                repeat: -1, 
                                yoyo: true, 
                                ease: 'sine.inOut' 
                            });

                            // --- D. Partículas dentro del Enjambre (Movimiento caótico local) ---
                            const particulasEnjambre = gsap.utils.toArray('.particle-enjambre');
                            particulasEnjambre.forEach((particle) => {
                                gsap.to(particle, {
                                    x: () => Math.random() * 30 - 15,
                                    y: () => Math.random() * 30 - 15,
                                    scale: () => 0.8 + Math.random() * 0.4,
                                    duration: 1.5 + Math.random() * 1,
                                    repeat: -1,
                                    yoyo: true,
                                    ease: 'sine.inOut'
                                });
                            });
                        }

                    } else {
                        // Si no encuentra el path, avisamos pero NO rompemos la página
                        console.warn("⚠️ Animación saltada: #hilo-path no se encontró en esta carga.");
                    }

                } catch (e) {
                    // Capturar y mostrar errores si GSAP falla por otra razón
                    console.error('Error controlado al inicializar animaciones:', e);
                }
            }, 300); // Ejecutar después de 300ms

            // Función de limpieza: se ejecuta cuando el componente se destruye (cambio de página)
            return () => {
                 console.log('Limpiando animaciones GSAP y timeout...');
                 clearTimeout(animationTimeoutId); 
                 gsap.killTweensOf('.hilo-destino-container, .particle-single, .enjambre-container, .particle-enjambre');
             };
        }
    });
    // --- FIN CÓDIGO GSAP ---

    // *** Lógica para expandir/colapsar testimonios ***
    let expandedStates = {}; // Objeto para guardar el estado (expandido/colapsado)

    const testimonials = [
        { id: 'ana', name: 'Ana Sofía Martínez', title: 'Emprendedora y Guardiana de un Símbolo', image: '/imagenes_clientes/ana_sofia.webp', quote: "Quería un símbolo para mi familia que fuera más allá de un logo genérico. El proceso de 1egacy fue una revelación: el equipo del Maestro Ovidio no solo investigó la heráldica auténtica de mi linaje, sino que luego, como verdaderos artesanos, la rediseñaron con una elegancia moderna, explicándome el 'porqué' de cada elemento. El resultado no es solo un diseño, es nuestro estandarte. Una pieza de arte que se siente histórica y completamente actual, y que ahora usamos con un orgullo inmenso como la firma de nuestra familia." },
        { id: 'santiago', name: 'Santiago Camarillo', title: 'Jefe del clan Camarillo', image: '/imagenes_clientes/chagocama.webp', quote: "Cuando 1egacy me entregó el Códice de mi linaje, sentí que sostenía no solo un libro, sino un mapa del alma de mi familia. Su equipo demostró una maestría excepcional, desenterrando 'Fragmentos de Vida' desde la Castilla del siglo XIV hasta la California del XIX, tejiéndolos en una narrativa que va más allá de las fechas. Lo que realmente valoro es cómo capturaron la esencia de nuestro legado —la lealtad, la resiliencia, la lección de la tarraya — y lo convirtieron en una obra de arte tangible. No es solo investigación; es la materialización de la identidad, una brújula que honra nuestro pasado y fortalece nuestro camino hacia el futuro." },
        { id: 'carlos', name: 'Carlos Rivas Villareal', title: 'Hijo y Custodio de una Historia', image: '/imagenes_clientes/carlosrivas.webp', quote: "Buscábamos honrar la vida de mi padre, el fundador de nuestra empresa, por su 80 aniversario. 1egacy FILMS superó todas nuestras expectativas. Su equipo no solo tiene una calidad cinematográfica impecable, sino una sensibilidad de 'Maestro' para encontrar el alma de la historia. No crearon un video corporativo; capturaron la filosofía de vida de mi padre en un documental biográfico que nos conmovió a todos. Han inmortalizado su voz y su legado de una forma que trasciende el tiempo." }
    ];

    // Inicializar el estado de todos los testimonios como colapsados (false)
    testimonials.forEach(t => expandedStates[t.id] = false);

    // Función para cambiar el estado de expansión de un testimonio específico
    function toggleExpand(id) {
        expandedStates[id] = !expandedStates[id];
    }
    // *** FIN LÓGICA TESTIMONIOS ***
</script>

<svelte:head>
    
    <!-- Metadata para SEO y redes sociales --><title>1egacy: Estudio Creativo | Descubre y Materializa tu Legado</title>
    <meta name="description" content="Estudio creativo que narra lo que no se ha narrado. Investigamos tu linaje, rediseñamos tu escudo y narramos tu historia. Transforma tu pasado en arte tangible." />
    
    <link rel="canonical" href="https://somos1egacy.com/" />
    

    <!-- Favicon (ya lo tenías en +layout.svelte, puedes quitarlo de aquí si prefieres) --><!-- <link rel="icon" href="/favicon.svg" /> --><!-- Preconexión a Google Fonts (ya lo tenías en +layout.svelte) --><!-- <link rel="preconnect" href="https://fonts.googleapis.com"> --><!-- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> --><!-- Carga diferida de fuentes (ya lo tenías en +layout.svelte) --><!-- <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet" media="print" on:load={(event) => event.target.media='all'} > --><!-- Fallback de fuentes para noscript (ya lo tenías en +layout.svelte) --><!-- <noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet"></noscript> --></svelte:head>

<!-- Contenedor principal de la página --><div class="page-wrapper">

    <!-- Sección Hero Principal con Animación --><div class="home-container">
        <!-- Fondo animado con nebulosas --><div class="animated-background">
            <div class="nebula nebula-blue"></div>
            <div class="nebula nebula-gold"></div>
        </div>
        <!-- Contenedor para el SVG del hilo y las partículas animadas --><div class="hilo-destino-container">
            <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <!-- Filtro SVG para el efecto de brillo --><filter id="glow">
                        <!-- Aumentado stdDeviation para un brillo más visible --><feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge> <feMergeNode in="coloredBlur" /> <feMergeNode in="SourceGraphic" /> </feMerge>
                    </filter>
                </defs>
                <!-- El path SVG que siguen las partículas --><path id="hilo-path" class="hilo-glow" d="M0,591.2s400.9-336.8,831.4-134.7,561.4,197.9,1088.6-32.6" />
            </svg>
            <!-- Crear 15 partículas individuales (antes 5) -->{#each Array(15) as _} <div class="particle particle-single"></div> {/each}
            <!-- Contenedor para el enjambre de partículas --><div class="enjambre-container">
                 <!-- Crear 10 partículas para el enjambre -->{#each Array(10) as _} <div class="particle particle-enjambre"></div> {/each}
            </div>
        </div>
        <!-- Contenido textual del Hero --><main class="hero-content">
            <h1>Tu apellido no es el final de tu historia.<br /> Es el comienzo de tu legado.</h1>
            <p>
                En 1egacy, desenterramos la historia de tus ancestros, revelando las pruebas que superaron y
                los triunfos que alcanzaron, para forjar el mapa de tu futuro.
            </p>
            <a href="/origins" class="cta-button"> Descubre tu origen </a>
        </main>
    </div>

    <!-- *** INICIO NUEVA SECCIÓN DE PRODUCTOS DESTACADOS *** --><!-- Solo mostrar esta sección si hay productos cargados desde el servidor -->{#if featuredProducts.length > 0}
    <section class="featured-products">
        <h2 class="section-title title-serif">Materializa Tu Legado</h2>
        <p class="section-subtitle">Descubre algunas de nuestras creaciones emblemáticas donde la historia cobra vida.</p>

        <!-- Cuadrícula para mostrar los productos --><div class="product-grid-home">
            <!-- Iterar sobre cada producto destacado -->{#each featuredProducts as product (product.slug)}
                <!-- Enlace a la página del producto individual --><a href="/productos/{product.slug}" class="product-card-home">
                    <!-- Contenedor de la imagen --><div class="product-image-container-home">
                        {#if product.mainImageUrl}
                            <!-- Mostrar imagen si existe --><img src={product.mainImageUrl} alt={product.title}>
                        {:else}
                            <!-- Mostrar placeholder si no hay imagen --><div class="placeholder-image-home">
                                <span>Imagen<br>Próximamente</span>
                            </div>
                        {/if}
                    </div>
                    <!-- Información del producto --><div class="product-info-home">
                        <h3>{product.title}</h3>
                        <!-- Mostrar categoría si existe -->{#if product.category}
                            <span class="product-category-home">{product.category.title}</span>
                        {/if}
                        <!-- Mostrar precio formateado o texto alternativo --><div class="product-price-home">
                            {product.price ? `$MXN ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Consultar Precio'}
                        </div>
                    </div>
                </a>
            {/each}
        </div>

        <!-- Botón para ver el catálogo completo --><div class="cta-catalog">
            <a href="/productos" class="button-secondary">Ver Catálogo Completo</a>
        </div>
    </section>
    {/if}
    <!-- *** FIN NUEVA SECCIÓN *** --><!-- Sección de Testimonios --><section class="social-proof-section">
        <div class="container">
            <!-- Título y subtítulo (existentes) --><h2>Lo que los Guardianes de Legados Dicen</h2>
            <p class="section-subtitle">
                Historias reales de quienes han transformado su pasado en un legado tangible.
            </p>
            <!-- Contenedor del carrusel --><div class="testimonial-carousel-wrapper">
                <div class="testimonial-carousel">
                    <!-- Iterar sobre los datos de testimonios -->{#each testimonials as testimonial (testimonial.id)}
                        <article class="testimonial-card">
                            <span class="quote-icon">“</span>
                            <!-- Cita: aplicar clase 'collapsed' si el estado es false --><blockquote class:collapsed={!expandedStates[testimonial.id]}>
                                {testimonial.quote}
                            </blockquote>
                            <!-- Botón para expandir/colapsar --><button class="toggle-button" on:click={() => toggleExpand(testimonial.id)}>
                                <!-- Cambiar texto del botón según el estado -->{expandedStates[testimonial.id] ? 'Ver menos' : 'Ver más'}
                            </button>
                            <!-- Footer con información del autor --><footer>
                                <img src={testimonial.image} alt="Foto de perfil de {testimonial.name}" class="author-avatar" />
                                <div>
                                    <p class="author-name">{testimonial.name}</p>
                                    <p class="author-title">{testimonial.title}</p>
                                </div>
                            </footer>
                        </article>
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <!-- Puedes añadir más secciones aquí si es necesario --></div>

<style>
    /* --- ESTILOS GLOBALES Y DE SECCIONES EXISTENTES --- */
    /* Asegúrate de tener :global(body), :global(h1), etc. definidos aquí o en +layout.svelte */
    :global(body) { background-color: #121212; color: #e0e0e0; font-family: 'Source Sans 3', sans-serif; font-weight: 400; line-height: 1.6; margin: 0; padding: 0; box-sizing: border-box; }
    :global(*, *:before, *:after) { box-sizing: inherit; }
    :global(h1), :global(h2), :global(h3) { font-family: 'Playfair Display', serif; font-weight: 400; color: #c0a062; line-height: 1.2; margin-top: 0; margin-bottom: 1rem; }
    :global(h1) { font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 700; }
    :global(h2) { font-size: clamp(2rem, 5vw, 2.5rem); margin-top: 3rem; }
    :global(h3) { font-size: clamp(1.5rem, 4vw, 1.8rem); margin-top: 2.5rem; }
    :global(p) { max-width: 75ch; margin-top: 0; margin-bottom: 1.5rem; color: #b0b0b0; }
    :global(a) { color: #c0a062; text-decoration: none; transition: color 0.3s ease; }
    :global(a:hover) { color: #ffffff; text-decoration: underline; }
    :global(img, svg, video) { max-width: 100%; height: auto; display: block; }
    :global(ul, ol) { list-style: none; padding: 0; margin: 0 0 1.5rem 0; }
    :global(li) { margin-bottom: 0.5rem; }

     .title-serif { font-family: 'Playfair Display', serif; font-weight: 400; /* Asume color de :global(h*) */ }

    .home-container { min-height: 100vh; position: relative; display: flex; justify-content: center; align-items: center; overflow: hidden; background-color: hsl(225, 20%, 8%); }
    .hero-content { position: relative; z-index: 10; text-align: center; padding: 2rem; max-width: 800px; color: #e0e0e0; }
    .hero-content h1 { font-size: clamp(2.5rem, 6vw, 4rem); margin-bottom: 1.5rem; font-weight: 700; line-height: 1.3; text-shadow: 0 0 15px rgba(0, 0, 0, 0.5); color: #f5f5f5; /* Color específico si es diferente */}
    .hero-content p { font-size: clamp(1rem, 2.5vw, 1.2rem); color: #b0b0b0; margin-bottom: 2.5rem; max-width: 650px; margin-left: auto; margin-right: auto; }
    .cta-button { display: inline-block; background-color: #c0a062; color: #121212; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; }
    .cta-button:hover { background-color: #ffffff; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(192, 160, 98, 0.2); }
    .animated-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
    .nebula { position: absolute; border-radius: 50%; filter: blur(120px); }
    .nebula-blue { width: 80vw; height: 80vw; background: radial-gradient(circle, hsla(220, 50%, 60%, 0.1) 0%, transparent 70%); top: 10%; left: -20%; animation: drift 45s infinite linear alternate; }
    .nebula-gold { width: 60vw; height: 60vw; background: radial-gradient(circle, hsla(35, 100%, 75%, 0.8) 0%, transparent 70%); opacity: 0.1; bottom: 5%; right: -15%; animation: pulse 12s infinite ease-in-out alternate; }
    @keyframes drift { from { transform: translateX(-20%) translateY(-5%); } to { transform: translateX(20%) translateY(5%); } }
    @keyframes pulse { from { transform: scale(0.95); opacity: 0.08; } to { transform: scale(1.05); opacity: 0.12; } }
    .hilo-destino-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; mix-blend-mode: screen; pointer-events: none; }
    .hilo-destino-container svg { display: block; width: 100%; height: 100%; position: absolute; }
    .hilo-glow { fill: none; stroke: #c0a062; stroke-width: 3px; /* Mantener o ajustar el grosor del trazo */ filter: url(#glow); }
    .particle { position: absolute; border-radius: 50%; background-color: #c0a062; opacity: 0; }
    /* Ajustes para particle-single */
    .particle-single {
        width: 10px; /* Aumentado de 6px a 10px */
        height: 10px; /* Aumentado de 6px a 10px */
        box-shadow: 0 0 12px 6px hsla(45, 100%, 70%, 0.7); /* Sombra más grande y extendida */
    }
    .enjambre-container { position: absolute; }
    .particle-enjambre { position: absolute; width: 3px; height: 3px; opacity: 1; box-shadow: 0 0 5px 2px hsla(45, 100%, 70%, 0.5); /* Sombra para las del enjambre también */}
    @media (max-width: 768px) { .hero-content h1 { font-size: clamp(2rem, 8vw, 2.8rem); } .hero-content p { font-size: clamp(0.9rem, 4vw, 1rem); } .cta-button { padding: 0.8rem 1.8rem; font-size: 1rem; } }

    .page-wrapper { /* Contenedor general si es necesario */ }


    /* --- *** INICIO NUEVOS ESTILOS PARA PRODUCTOS DESTACADOS *** --- */
    .featured-products {
        max-width: 1200px;
        margin: 80px auto; /* Margen vertical separador */
        padding: 0 40px; /* Padding horizontal */
        text-align: center; /* Centrar título y subtítulo */
    }
     .featured-products .section-title {
        /* Hereda de :global(h2) o define específicamente */
        /* font-size: 2.8em; */
        margin-bottom: 15px;
        color: #f5f5f5; /* Asegurar color claro */
    }
     .featured-products .section-subtitle {
         font-size: 1.2em;
         color: #bdbdbd;
         margin-bottom: 60px; /* Espacio antes de la cuadrícula */
         max-width: 700px; /* Ancho máximo para el subtítulo */
         margin-left: auto;
         margin-right: auto;
         font-family: 'Source Sans 3', sans-serif; /* Asegurar fuente correcta */
         font-weight: 400; /* Asegurar peso correcto */
    }

    .product-grid-home {
        display: grid;
        /* Columnas automáticas: intentará meter columnas de min 300px */
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
        gap: 40px; /* Espacio entre tarjetas */
        margin-bottom: 60px; /* Espacio antes del botón Ver Catálogo */
    }

    /* Estilos para la tarjeta de producto en la Home */
    .product-card-home {
        background-color: #1a1a1a; /* Fondo oscuro de tarjeta */
        border-radius: 10px; /* Bordes redondeados */
        overflow: hidden; /* Para que la imagen respete los bordes */
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Sombra sutil */
        transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición hover */
        text-decoration: none; /* Quitar subrayado del enlace */
        color: inherit; /* Heredar color de texto */
        display: flex; /* Flexbox para alinear contenido */
        flex-direction: column; /* Apilar imagen e info */
        text-align: left; /* Alinear texto a la izquierda */
    }
     .product-card-home:hover {
        transform: translateY(-8px); /* Efecto elevación al pasar el ratón */
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); /* Sombra más pronunciada */
     }
     /* Contenedor de imagen con ratio 1:1 */
     .product-image-container-home {
        width: 100%;
        padding-top: 100%; /* Para ratio 1:1 */
        position: relative; /* Para posicionar la imagen absoluta */
        background-color: #222; /* Fondo mientras carga la imagen */
     }
     .product-image-container-home img {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        object-fit: cover; /* Cubrir el espacio sin deformar */
    }
     /* Placeholder visual si no hay imagen */
     .placeholder-image-home {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        background-color: #2a2a2a; color: #777; font-size: 0.9em; text-align: center;
        line-height: 1.3; padding: 10px; box-sizing: border-box;
    }
    /* Contenedor para la información (título, categoría, precio) */
    .product-info-home {
        padding: 20px; /* Espaciado interno */
        flex-grow: 1; /* Ocupa el espacio restante */
        display: flex; flex-direction: column; /* Apilar elementos internos */
    }
    /* Estilo para el título del producto */
    .product-info-home h3 {
        font-family: 'Source Sans 3', sans-serif; /* Usar fuente sans-serif */
        font-size: 1.25em; font-weight: 600; /* Más peso que el texto normal */
        color: #e0e0e0; /* Color claro */
        margin: 0 0 8px 0; /* Margen inferior */
        line-height: 1.3; /* Altura de línea */
         /* Limitar a 2 líneas con puntos suspensivos */
         display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
         overflow: hidden; text-overflow: ellipsis; min-height: calc(1.3em * 2); /* Reserva espacio */
    }
    /* Estilo para la categoría (opcional) */
    .product-category-home {
        font-size: 0.85em; color: #aaa; /* Color tenue */
        margin-bottom: 15px; /* Espacio antes del precio */
        display: block; /* Asegurar que esté en su línea */
    }
     /* Estilo para el precio */
     .product-price-home {
        font-size: 1.15em; font-weight: bold; color: #c0a062; /* Color de acento */
        margin-top: auto; /* Empuja el precio al final de la tarjeta */
        text-align: right; /* Alinear a la derecha */
    }

    /* Estilo para el contenedor del botón 'Ver Catálogo' */
    .cta-catalog { text-align: center; }
    /* Estilo para el botón secundario */
    .button-secondary {
        display: inline-block; padding: 12px 30px; background-color: transparent;
        color: #c0a062; border: 1px solid #c0a062; /* Borde con color de acento */
        text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 1em;
        transition: all 0.3s ease; /* Transición suave */
    }
    .button-secondary:hover {
        background-color: #c0a062; /* Fondo de acento al pasar el ratón */
        color: #121212; /* Texto oscuro */
    }

     /* --- RESPONSIVIDAD PARA PRODUCTOS DESTACADOS --- */
     @media (max-width: 768px) {
        .featured-products { margin: 60px auto; padding: 0 20px; }
        .featured-products .section-title { font-size: 2.2em; } /* Título más pequeño */
        .featured-products .section-subtitle { font-size: 1.1em; margin-bottom: 40px; } /* Subtítulo más pequeño */
        .product-grid-home { gap: 30px; } /* Espacio menor entre tarjetas */
     }
      @media (max-width: 480px) {
        .featured-products { margin: 40px auto; } /* Menos margen vertical */
         .featured-products .section-title { font-size: 1.9em; } /* Título aún más pequeño */
         .featured-products .section-subtitle { font-size: 1em; margin-bottom: 30px; } /* Subtítulo aún más pequeño */
        .product-grid-home { gap: 20px; } /* Espacio menor entre tarjetas */
      }
    /* --- *** FIN NUEVOS ESTILOS *** --- */


    /* --- ESTILOS TESTIMONIOS (CON AJUSTES PARA EXPANSIÓN) --- */
    .social-proof-section { background-color: #111111; padding: 6rem 0; color: #e0e0e0; overflow: hidden; position: relative; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center; }
    .social-proof-section h2 { font-size: 2.8rem; color: #ffffff; margin-bottom: 1rem; /* Hereda fuente serif global */}
    .social-proof-section .section-subtitle { font-size: 1.1rem; color: #aaa; max-width: 600px; margin: 0 auto 4rem auto; /* Hereda fuente sans-serif global */}
    .testimonial-carousel-wrapper { /* Contenedor si necesitas padding extra */ }
    .testimonial-carousel { display: flex; gap: 2rem; padding: 1rem 0; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; /* Ocultar scrollbars */}
    .testimonial-carousel::-webkit-scrollbar { display: none; }
    .testimonial-card { flex: 0 0 90%; /* Ancho en móvil */ max-width: 300px; background: linear-gradient(145deg, #1e1e1e, #141414); border: 1px solid #333; padding: 2.5rem; border-radius: 12px; text-align: left; scroll-snap-align: start; /* Alinear tarjetas al inicio */ transition: all 0.4s ease; position: relative; display: flex; flex-direction: column; /* Para alinear footer abajo */}
    .testimonial-card:hover { transform: translateY(-10px); border-color: #c0a062; box-shadow: 0 20px 40px rgba(192, 160, 98, 0.1); }
    .quote-icon { font-family: 'Playfair Display', serif; font-size: 5rem; color: #c0a062; position: absolute; top: 1rem; left: 1.5rem; opacity: 0.2; z-index: 0; /* Detrás del texto */}
    /* Blockquote para la cita */
    .testimonial-card blockquote {
        font-size: 1.1rem; line-height: 1.6; color: #d0d0d0; margin: 0 0 1rem 0;
        font-style: normal; border: none; padding: 0; position: relative; z-index: 1;
        overflow: hidden; /* Ocultar texto extra */
        transition: max-height 0.5s ease-out; /* Animación suave al expandir/colapsar */
    }
    /* Estado colapsado del blockquote */
    .testimonial-card blockquote.collapsed {
        /* Limita la altura visible (aprox. 6 líneas) */
        max-height: calc(1.6em * 6); /* 1.6 (line-height) * 6 (líneas) */
    }
    /* Botón Ver más / Ver menos */
    .toggle-button {
        background: none; border: none; color: #c0a062; font-weight: bold; cursor: pointer;
        padding: 0.5rem 0; margin-bottom: 1.5rem; align-self: flex-start; /* Alinear a la izquierda */
        font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .toggle-button:hover { text-decoration: underline; }
    /* Footer de la tarjeta */
    .testimonial-card footer { margin-top: auto; /* Empuja al final */ display: flex; align-items: center; gap: 1rem; text-align: left; border-top: 1px solid #333; padding-top: 1.5rem; }
    .author-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background-color: #c0a062; flex-shrink: 0; }
    .author-name { font-weight: bold; color: #ffffff; margin: 0; font-size: 1em; /* Tamaño normal */}
    .author-title { font-size: 0.9rem; color: #aaa; margin: 0; }

    /* Responsividad para testimonios */
    @media (min-width: 768px) {
        .testimonial-card { flex-basis: 45%; max-width: none; /* Permitir que crezca */}
    }
    @media (min-width: 1024px) {
        /* Centrar tarjetas si caben todas */
        .testimonial-carousel { justify-content: center; overflow-x: hidden; /* Desactivar scroll si caben */}
        .testimonial-card { flex-basis: 30%; /* Tres columnas */}
    }

</style>

