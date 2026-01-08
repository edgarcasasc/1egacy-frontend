<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { gsap } from 'gsap';
    import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

    // *** Importar datos del servidor ***
    export let data;
    $: featuredProducts = data?.featuredProducts || [];
    // *** FIN ***

    // --- CÓDIGO GSAP PARA ANIMACIONES (Corregido y Blindado) ---
    onMount(() => {
        let animationTimeoutId; 

        if (browser) {
            gsap.registerPlugin(MotionPathPlugin); 
            animationTimeoutId = setTimeout(() => {
                try {
                    const hiloPathElement = document.querySelector('#hilo-path');
                    if (hiloPathElement) {
                        gsap.to('.hilo-destino-container', {
                            y: 10, 
                            duration: 7, 
                            repeat: -1, 
                            yoyo: true, 
                            ease: 'sine.inOut' 
                        });

                        const particulasSingle = gsap.utils.toArray('.particle-single');
                        if (particulasSingle.length > 0) {
                            particulasSingle.forEach((particle, i) => {
                                gsap.to(particle, {
                                    motionPath: {
                                        path: hiloPathElement,
                                        align: hiloPathElement,
                                        alignOrigin: [0.5, 0.5]
                                    },
                                    duration: 8 + Math.random() * 4,
                                    delay: i * 0.5 + Math.random() * 1,
                                    repeat: -1,
                                    ease: 'linear',
                                    opacity: 0,
                                    onStart: () => gsap.to(particle, { opacity: 1, duration: 1 }),
                                    onRepeat: () => {
                                        gsap.set(particle, { opacity: 0 });
                                        gsap.to(particle, { opacity: 1, duration: 1, delay: 0.1 });
                                    }
                                });
                            });
                        }

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
                    }
                } catch (e) {
                    console.error('Error animaciones:', e);
                }
            }, 300);

            return () => {
                 clearTimeout(animationTimeoutId); 
                 gsap.killTweensOf('.hilo-destino-container, .particle-single, .enjambre-container, .particle-enjambre');
             };
        }
    });

    let expandedStates = {}; 
    const testimonials = [
        { id: 'ana', name: 'Ana Sofía Martínez', title: 'Emprendedora y Guardiana de un Símbolo', image: '/imagenes_clientes/ana_sofia.webp', quote: "Quería un símbolo para mi familia que fuera más allá de un logo genérico. El proceso de 1egacy fue una revelación..." },
        { id: 'santiago', name: 'Santiago Camarillo', title: 'Jefe del clan Camarillo', image: '/imagenes_clientes/chagocama.webp', quote: "Cuando 1egacy me entregó el Códice de mi linaje, sentí que sostenía no solo un libro, sino un mapa del alma..." },
        { id: 'carlos', name: 'Carlos Rivas Villareal', title: 'Hijo y Custodio de una Historia', image: '/imagenes_clientes/carlosrivas.webp', quote: "Buscábamos honrar la vida de mi padre... 1egacy FILMS superó todas nuestras expectativas..." }
    ];
    testimonials.forEach(t => expandedStates[t.id] = false);
    function toggleExpand(id) { expandedStates[id] = !expandedStates[id]; }
</script>

<svelte:head>
  <title>1egacy | Investigación de Linajes y Heráldica Contemporánea</title>
  <meta name="description" content="Investigamos tu linaje latín, reinterpretamos tu escudo y lo convertimos en un Códice digital de alta gama. Servicio exclusivo para familias en USA y México." />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_MX" />
  <meta property="og:title" content="1egacy | Linaje, Escudo Heráldico y Códice Digital" />
  <meta property="og:description" content="Transformamos historias de linaje en activos tangibles de valor eterno." />
  <meta property="og:url" content="https://somos1egacy.com/" />
  
  <meta name="twitter:title" content="1egacy | Investigación de Linajes y Heráldica" />
  <meta name="twitter:description" content="Recupera la identidad de tu familia para las futuras generaciones." />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": "https://somos1egacy.com/#business",
          "name": "1egacy: Estudio Creativo",
          "url": "https://somos1egacy.com/",
          "image": "https://somos1egacy.com/og-default.jpg",
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Monterrey",
            "addressRegion": "NL",
            "addressCountry": "MX"
          },
          "areaServed": [
            { "@type": "Country", "name": "United States" },
            { "@type": "Country", "name": "Mexico" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Legado",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "id": "https://somos1egacy.com/#origins",
                  "name": "1egacy Origins",
                  "description": "Investigación de linajes y heráldica para hogares latinos en USA."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "id": "https://somos1egacy.com/#films",
                  "name": "1egacy Films",
                  "description": "Cortometrajes biográficos para preservar la memoria familiar."
                }
              }
            ]
          }
        }
      ]
    }
  </script>
</svelte:head>

<div class="page-wrapper">
    <section class="home-container">
        <div class="animated-background">
            <div class="nebula nebula-blue"></div>
            <div class="nebula nebula-gold"></div>
        </div>
        <div class="hilo-destino-container">
            <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge> <feMergeNode in="coloredBlur" /> <feMergeNode in="SourceGraphic" /> </feMerge>
                    </filter>
                </defs>
                <path id="hilo-path" class="hilo-glow" d="M0,591.2s400.9-336.8,831.4-134.7,561.4,197.9,1088.6-32.6" />
            </svg>
            {#each Array(15) as _} <div class="particle particle-single"></div> {/each}
            <div class="enjambre-container">
                 {#each Array(10) as _} <div class="particle particle-enjambre"></div> {/each}
            </div>
        </div>
        <section class="hero-content">
            <h1>Tu <span style="color: var(--gold)">Linaje</span> no es el final de tu historia.<br /> Es el comienzo de tu <strong>Legado Familiar</strong>.</h1>
            <p>
                En 1egacy, desenterramos la historia de tus ancestros, revelando las pruebas que superaron y
                los triunfos que alcanzaron, para forjar el mapa de tu futuro.
            </p>
            <a href="/origins" class="cta-button"> Descubre tu origen </a>
        </section>
    </section>

    {#if featuredProducts.length > 0}
    <section class="featured-products">
        <h2 class="section-title title-serif">Materializa Tu Legado</h2>
        <p class="section-subtitle">Descubre algunas de nuestras creaciones emblemáticas donde la historia cobra vida.</p>

        <div class="product-grid-home">
            {#each featuredProducts as product (product.slug)}
                <a href="/productos/{product.slug}" class="product-card-home">
                    <div class="product-image-container-home">
                        {#if product.mainImageUrl}
                            <img src={product.mainImageUrl} alt="Diseño Heráldico Moderno de {product.title} - 1egacy Origins" loading="lazy">
                        {:else}
                            <div class="placeholder-image-home">
                                <span>Imagen<br>Próximamente</span>
                            </div>
                        {/if}
                    </div>
                    <div class="product-info-home">
                        <h3>{product.title}</h3>
                        {#if product.category}
                            <span class="product-category-home">{product.category.title}</span>
                        {/if}
                        <div class="product-price-home">
                            {product.price ? `$MXN ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Consultar Precio'}
                        </div>
                    </div>
                </a>
            {/each}
        </div>

        <div class="cta-catalog">
            <a href="/productos" class="button-secondary">Ver Catálogo Completo</a>
        </div>
    </section>
    {/if}
    
    <section class="editorial-seo-container">
        <div class="editorial-content">
            <h2>La Victoria Definitiva sobre el Olvido</h2>
            <p>
                En <strong>1egacy</strong>, operamos como un estudio creativo y casa productora de alta gama dedicada a materializar el concepto de legado. Para la comunidad latina en <strong>Estados Unidos</strong> y familias de alto perfil en <strong>México</strong>, transformamos narrativas históricas en activos digitales y tangibles de valor eterno.
            </p>
            <p>
                A través de <strong>1egacy Origins</strong>, realizamos investigaciones genealógicas precisas y rediseños heráldicos minimalistas, asegurando que la historia de tu linaje se conserve para las futuras generaciones.
            </p>
        </div>
    </section>

    <section class="social-proof-section">
        <div class="container">
            <h2>Lo que los Guardianes de Legados Dicen</h2>
            <p class="section-subtitle">
                Historias reales de quienes han transformado su pasado en un legado tangible.
            </p>
            <div class="testimonial-carousel-wrapper">
                <div class="testimonial-carousel">
                    {#each testimonials as testimonial (testimonial.id)}
                        <article class="testimonial-card">
                            <span class="quote-icon">“</span>
                            <blockquote class:collapsed={!expandedStates[testimonial.id]}>
                                {testimonial.quote}
                            </blockquote>
                            <button class="toggle-button" on:click={() => toggleExpand(testimonial.id)}>
                                {expandedStates[testimonial.id] ? 'Ver menos' : 'Ver más'}
                            </button>
                            <footer>
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
</div>

<style>
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

     .title-serif { font-family: 'Playfair Display', serif; font-weight: 400; }

    .home-container { 
        min-height: 100vh; 
        position: relative; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        overflow: hidden; 
        background-color: hsl(225, 20%, 8%); 
        text-align: center;
        padding: 0 1.5rem;
    }
    .hero-content { position: relative; z-index: 10; text-align: center; padding: 2rem; max-width: 900px; width: 100%; margin: 0 auto; color: #e0e0e0; }
    .hero-content h1 { font-size: clamp(2.5rem, 6vw, 4rem); margin-bottom: 1.5rem; font-weight: 700; line-height: 1.3; text-shadow: 0 0 15px rgba(0, 0, 0, 0.5); color: #f5f5f5; }
    .hero-content p { font-size: clamp(1rem, 2.5vw, 1.2rem); color: #b0b0b0; margin-bottom: 2.5rem; max-width: 650px; margin-left: auto; margin-right: auto; }
    .cta-button { display: inline-block; background-color: #c0a062; color: #121212; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; }
    .cta-button:hover { background-color: #ffffff; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(192, 160, 98, 0.2); }
    
    .animated-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
    .nebula { position: absolute; border-radius: 50%; filter: blur(120px); }
    .nebula-blue { width: 80vw; height: 80vw; background: radial-gradient(circle, hsla(220, 50%, 60%, 0.1) 0%, transparent 70%); top: 10%; left: -20%; animation: drift 45s infinite linear alternate; }
    .nebula-gold { width: 60vw; height: 60vw; background: radial-gradient(circle, hsla(35, 100%, 75%, 0.8) 0%, transparent 70%); opacity: 0.1; bottom: 5%; right: -15%; animation: pulse 12s infinite ease-in-out alternate; }
    @keyframes drift { from { transform: translateX(-20%) translateY(-5%); } to { transform: translateX(20%) translateY(5%); } }
    @keyframes pulse { from { transform: scale(0.95); opacity: 0.08; } to { transform: scale(1.05); opacity: 0.12; } }

    .hilo-destino-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; 
        overflow: hidden;
        z-index: 2;
    }
    .hilo-destino-container svg { display: block; width: 100%; height: 100%; position: absolute; }
    .hilo-glow { fill: none; stroke: #c0a062; stroke-width: 3px; filter: url(#glow); }
    .particle { position: absolute; border-radius: 50%; background-color: #c0a062; opacity: 0; }
    .particle-single { width: 10px; height: 10px; box-shadow: 0 0 12px 6px hsla(45, 100%, 70%, 0.7); }
    .enjambre-container { position: absolute; }
    .particle-enjambre { position: absolute; width: 3px; height: 3px; opacity: 1; box-shadow: 0 0 5px 2px hsla(45, 100%, 70%, 0.5); }

    .featured-products {
        max-width: 1200px;
        margin: 100px auto;
        padding: 0 2rem;
        text-align: center;
    }
    .featured-products .section-subtitle { font-size: 1.2em; color: #bdbdbd; margin-bottom: 60px; max-width: 700px; margin-left: auto; margin-right: auto; }

    .product-grid-home {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        justify-content: center; 
        gap: 40px;
        margin-bottom: 60px;
    }

    .product-card-home { background-color: #1a1a1a; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; color: inherit; display: flex; flex-direction: column; text-align: left; }
    .product-card-home:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); }
    .product-image-container-home { width: 100%; padding-top: 100%; position: relative; background-color: #222; }
    .product-image-container-home img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
    .placeholder-image-home { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #2a2a2a; color: #777; font-size: 0.9em; text-align: center; line-height: 1.3; padding: 10px; box-sizing: border-box; }
    .product-info-home { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }
    .product-info-home h3 { font-family: 'Source Sans 3', sans-serif; font-size: 1.25em; font-weight: 600; color: #e0e0e0; margin: 0 0 8px 0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: calc(1.3em * 2); }
    .product-category-home { font-size: 0.85em; color: #aaa; margin-bottom: 15px; display: block; }
    .product-price-home { font-size: 1.15em; font-weight: bold; color: #c0a062; margin-top: auto; text-align: right; }

    .button-secondary { display: inline-block; padding: 12px 30px; background-color: transparent; color: #c0a062; border: 1px solid #c0a062; text-decoration: none; border-radius: 5px; font-weight: 600; transition: all 0.3s ease; }
    .button-secondary:hover { background-color: #c0a062; color: #121212; }

    .editorial-seo-container {
        width: 100%;
        padding: 80px 2rem;
        background-color: rgba(255, 255, 255, 0.02);
        display: flex;
        justify-content: center;
    }
    .editorial-content { max-width: 750px; text-align: center; }
    .editorial-content h2 { color: #c0a062; margin-bottom: 2rem; font-size: clamp(2rem, 5vw, 2.5rem); }
    .editorial-content p { margin-left: auto; margin-right: auto; color: #aaa; font-size: 1.1rem; }

    .social-proof-section { background-color: #111111; padding: 6rem 0; color: #e0e0e0; overflow: hidden; position: relative; }
    .testimonial-carousel { display: flex; gap: 2rem; padding: 1rem 0; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
    .testimonial-carousel::-webkit-scrollbar { display: none; }
    .testimonial-card { flex: 0 0 90%; max-width: 300px; background: linear-gradient(145deg, #1e1e1e, #141414); border: 1px solid #333; padding: 2.5rem; border-radius: 12px; text-align: left; scroll-snap-align: start; transition: all 0.4s ease; position: relative; display: flex; flex-direction: column; }
    .testimonial-card:hover { transform: translateY(-10px); border-color: #c0a062; box-shadow: 0 20px 40px rgba(192, 160, 98, 0.1); }
    .quote-icon { font-family: 'Playfair Display', serif; font-size: 5rem; color: #c0a062; position: absolute; top: 1rem; left: 1.5rem; opacity: 0.2; z-index: 0; }
    .testimonial-card blockquote { font-size: 1.1rem; line-height: 1.6; color: #d0d0d0; margin: 0 0 1rem 0; position: relative; z-index: 1; overflow: hidden; transition: max-height 0.5s ease-out; }
    .testimonial-card blockquote.collapsed { max-height: calc(1.6em * 6); }
    .toggle-button { background: none; border: none; color: #c0a062; font-weight: bold; cursor: pointer; padding: 0.5rem 0; margin-bottom: 1.5rem; align-self: flex-start; font-size: 0.9em; text-transform: uppercase; }
    .testimonial-card footer { margin-top: auto; display: flex; align-items: center; gap: 1rem; text-align: left; border-top: 1px solid #333; padding-top: 1.5rem; }
    .author-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background-color: #c0a062; flex-shrink: 0; }
    .author-name { font-weight: bold; color: #ffffff; margin: 0; }
    .author-title { font-size: 0.9rem; color: #aaa; margin: 0; }

    @media (min-width: 768px) {
        .testimonial-card { flex-basis: 45%; max-width: none; }
    }
    @media (min-width: 1024px) {
        .testimonial-carousel { justify-content: center; overflow-x: hidden; }
        .testimonial-card { flex-basis: 30%; }
    }
</style>