<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { gsap } from 'gsap';
    import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

    // *** Importar datos del servidor ***
    export let data;
    $: featuredProducts = data?.featuredProducts || [];

    // --- DATOS LOCALES ---
    let expandedStates = {}; 
    
    const testimonials = [
        { 
            id: 'ana', 
            name: 'Ana Sofía Martínez', 
            title: 'Cliente Origins', 
            image: '/imagenes_clientes/ana_sofia.webp', 
            quote: "Quería un símbolo para mi familia que fuera más allá de un logo genérico. El proceso de 1egacy fue una revelación, dándonos una identidad que mis hijos ya reconocen como propia." 
        },
        { 
            id: 'santiago', 
            name: 'Santiago Camarillo', 
            title: 'Cliente Origins', 
            image: '/imagenes_clientes/chagocama.webp', 
            quote: "Cuando 1egacy me entregó el Códice de mi linaje, sentí que sostenía no solo un libro, sino un mapa del alma. Es la herencia más valiosa que dejaré." 
        },
        { 
            id: 'carlos', 
            name: 'Carlos Rivas Villareal', 
            title: 'Cliente Films', 
            image: '/imagenes_clientes/carlosrivas.webp', 
            quote: "Buscábamos honrar la vida de mi padre... 1egacy FILMS superó todas nuestras expectativas capturando su esencia para siempre." 
        }
    ];

    testimonials.forEach(t => expandedStates[t.id] = false);
    function toggleExpand(id) { expandedStates[id] = !expandedStates[id]; }

    // --- LÓGICA SPOTLIGHT ---
    function handleMouseMove(e) {
        if (!browser) return;
        const cards = document.getElementsByClassName('spotlight-card');
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    }

    // --- ANIMACIONES GSAP ---
    onMount(() => {
        let animationTimeoutId; 

        if (browser) {
            const container = document.querySelector('.testimonial-carousel-wrapper');
            if (container) container.addEventListener('mousemove', handleMouseMove);

            gsap.registerPlugin(MotionPathPlugin); 
            
            animationTimeoutId = setTimeout(() => {
                try {
                    const hiloPathElement = document.querySelector('#hilo-path');
                    if (hiloPathElement) {
                        // 1. Contenedor flotante
                        gsap.to('.hilo-destino-container', {
                            y: 10, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' 
                        });

                        // 2. Partículas individuales
                        const particulasSingle = gsap.utils.toArray('.particle-single');
                        if (particulasSingle.length > 0) {
                            particulasSingle.forEach((particle, i) => {
                                gsap.to(particle, {
                                    motionPath: {
                                        path: hiloPathElement,
                                        align: hiloPathElement,
                                        alignOrigin: [0.5, 0.5]
                                    },
                                    duration: 12 + Math.random() * 5,
                                    delay: i * 0.8,
                                    repeat: -1,
                                    ease: 'linear',
                                    opacity: 0,
                                    onStart: () => gsap.to(particle, { opacity: 1, duration: 1.5 }),
                                    onRepeat: () => {
                                        gsap.set(particle, { opacity: 0 });
                                        gsap.to(particle, { opacity: 1, duration: 1.5, delay: 0.1 });
                                    }
                                });
                            });
                        }

                        // 3. Enjambre / Cardumen
                        const enjambreContainer = document.querySelector('.enjambre-container');
                        if (enjambreContainer) {
                            gsap.to(enjambreContainer, {
                                motionPath: {
                                    path: hiloPathElement,
                                    align: hiloPathElement,
                                    alignOrigin: [0.5, 0.5],
                                    start: 0.1, end: 0.9 
                                },
                                duration: 25, repeat: -1, yoyo: true, ease: 'sine.inOut' 
                            });

                            const particulasEnjambre = gsap.utils.toArray('.particle-enjambre');
                            particulasEnjambre.forEach((particle) => {
                                gsap.to(particle, {
                                    x: () => Math.random() * 40 - 20,
                                    y: () => Math.random() * 40 - 20,
                                    scale: () => 0.6 + Math.random() * 0.6,
                                    duration: 1.5 + Math.random() * 1.5,
                                    repeat: -1, yoyo: true, ease: 'sine.inOut'
                                });
                            });
                        }
                    }
                } catch (e) { console.error('GSAP Error:', e); }
            }, 300);

            return () => {
                 clearTimeout(animationTimeoutId); 
                 gsap.killTweensOf('.hilo-destino-container, .particle-single, .enjambre-container, .particle-enjambre');
                 if (container) container.removeEventListener('mousemove', handleMouseMove);
             };
        }
    });
</script>

<svelte:head>
  <title>1egacy | Tu Linaje convertido en Legado</title>
  <meta name="description" content="Estudio creativo de alta gama. Investigamos y curamos la historia de tu familia para convertirla en un Códice digital y heráldica contemporánea." />
  <meta property="og:title" content="1egacy | Tu Linaje convertido en Legado" />
  <meta property="og:description" content="Investigación genealógica y diseño heráldico para conservar, compartir y heredar tu historia." />
  <meta property="og:image" content="https://somos1egacy.com/og-default.jpg" />
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
            {#each Array(10) as _} <div class="particle particle-single"></div> {/each}
            <div class="enjambre-container">
                 {#each Array(12) as _} <div class="particle particle-enjambre"></div> {/each}
            </div>
        </div>

        <section class="hero-content">
            <h1>Tu Linaje no termina en un árbol genealógico. <br class="hidden-mobile"><span style="color: var(--gold)">Se convierte en un legado.</span></h1>
            
            <p>
                Investigamos y curamos la historia de tu familia para convertirla en un Códice digital de alta gama y una reinterpretación heráldica contemporánea—diseñados para conservar, compartir y heredar.
            </p>

           <div class="hero-actions">
    <a href="/origins" class="button-primary">Iniciar Origins</a>
    
    <a 
       href="/el-codice/casas?k=3ff94e4a-6803-485a-b188-1ad168904b0f" 
       class="button-text"
       target="_blank" 
       rel="noopener noreferrer"
    >
       Ver ejemplo del Códice &rarr;
    </a>
</div>
            
            <p class="microcopy">
                <small>Toma 3 minutos. Te diremos si tu caso es elegible y cuál es el siguiente paso.</small>
            </p>
        </section>
    </section>

    <section class="methodology-section">
        <div class="container">
            <h2 class="section-title title-serif text-center">El Camino 1egacy</h2>
            <p class="section-subtitle text-center">Un proceso discreto y riguroso para transformar apellidos en activos patrimoniales.</p>
            <div class="steps-grid">
                <div class="step-card">
                    <span class="step-number">01</span>
                    <h3>Investigación</h3>
                    <p>Genealogía documental y validación de fuentes históricas para encontrar la raíz de tu linaje.</p>
                </div>
                <div class="step-card">
                    <span class="step-number">02</span>
                    <h3>Curaduría & Diseño</h3>
                    <p>Reinterpretación heráldica contemporánea y redacción de la narrativa familiar (El Códice).</p>
                </div>
                <div class="step-card">
                    <span class="step-number">03</span>
                    <h3>Entrega Patrimonial</h3>
                    <p>Archivos digitales de alta resolución y piezas físicas opcionales listas para heredar.</p>
                </div>
            </div>
        </div>
    </section>

    {#if featuredProducts.length > 0}
    <section class="featured-products">
        <h2 class="section-title title-serif">Colección y Derivados</h2>
        <p class="section-subtitle">Piezas seleccionadas creadas a partir de investigaciones reales.</p>
        <div class="product-grid-home">
            {#each featuredProducts as product (product.slug)}
                <a href="/productos/{product.slug}" class="product-card-home">
                    <div class="product-image-container-home">
                        {#if product.mainImageUrl}
                            <img src={product.mainImageUrl} alt="{product.title} - 1egacy" loading="lazy">
                        {:else}
                            <div class="placeholder-image-home"><span>Imagen<br>Próximamente</span></div>
                        {/if}
                    </div>
                    <div class="product-info-home">
                        <h3>{product.title}</h3>
                        <div class="product-meta">
                            {#if product.category} <span class="product-category-home">{product.category.title}</span> {/if}
                            <span class="product-price-home">
                                {product.price ? `$MXN ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : 'Consultar'}
                            </span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
        <div class="cta-catalog">
            <a href="/productos" class="button-secondary">Ver Colección Completa</a>
        </div>
    </section>
    {/if}
    
    <section class="editorial-seo-container">
        <div class="editorial-content">
            <h2>Lo que tu familia no puede perder</h2>
            <p>
                En <strong>1egacy</strong>, operamos como un estudio creativo de alta gama para familias latinas en Estados Unidos y México. Transformamos la historia familiar en un activo cultural y patrimonial.
            </p>
            <p>
                No se trata solo de saber de dónde vienes, sino de dejar claro hacia dónde vas. Con <strong>1egacy Origins</strong>, tu historia queda clara, presentable y protegida contra el olvido.
            </p>
        </div>
    </section>

    <section class="social-proof-section">
        <div class="container">
            <h2 class="text-center">Lo que dicen las familias</h2>
            <p class="section-subtitle text-center">Historias reales de quienes ya materializaron su legado.</p>
            <div class="testimonial-carousel-wrapper">
                <div class="testimonial-carousel">
                    {#each testimonials as testimonial (testimonial.id)}
                        <article class="testimonial-card spotlight-card">
                            <div class="spotlight-overlay"></div>
                            <div class="card-content-wrapper">
                                <span class="quote-icon">“</span>
                                <blockquote class:collapsed={!expandedStates[testimonial.id]}>
                                    {testimonial.quote}
                                </blockquote>
                                <button class="toggle-button" on:click={() => toggleExpand(testimonial.id)}>
                                    {expandedStates[testimonial.id] ? 'Leer menos' : 'Leer completo'}
                                </button>
                                <footer>
                                    <img src={testimonial.image} alt="{testimonial.name}" class="author-avatar" loading="lazy" />
                                    <div>
                                        <p class="author-name">{testimonial.name}</p>
                                        <p class="author-title">{testimonial.title}</p>
                                    </div>
                                </footer>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <section class="final-cta-section">
        <div class="cta-content">
            <h2 class="title-serif">Empieza con una evaluación inicial</h2>
            <p>Cuéntanos lo mínimo: tu apellido y tu objetivo. Si tu caso es elegible, te propondremos el camino ideal para tu legado.</p>
            <a href="/origins" class="button-primary">Iniciar Evaluación</a>
            <p class="privacy-note"><small>Privado. Sin publicaciones automáticas. Sin compromiso.</small></p>
        </div>
    </section>

</div>

<style>
    /* --- VARIABLES & BASE --- */
    :global(:root) {
        --gold: #c0a062;
        --gold-light: #e6c88a;
        --bg-dark: #121212;
        --bg-card: #1a1a1a;
        --text-main: #e0e0e0;
        --text-muted: #b0b0b0;
    }

    /* FIX #1: El Banner sube arriba */
    :global(#main-content) { padding-top: 0 !important; }

    /* FIX #2: Forzar que el Menú esté SIEMPRE encima del Banner */
    /* Esto soluciona que el menú desaparezca al pasar sobre los botones */
    :global(.site-header), :global(header) {
        z-index: 1000 !important;
        position: relative; 
    }

    .hidden-mobile { display: none; }
    @media(min-width: 768px) { .hidden-mobile { display: inline; } }
    .text-center { text-align: center; }

    /* --- HERO --- */
    .home-container { 
        min-height: 100vh;
        position: relative; 
        display: flex; justify-content: center; align-items: center; 
        overflow: hidden; 
        background-color: hsl(225, 20%, 8%); 
        text-align: center; padding: 0 1.5rem;
    }
    
    /* FIX #3: El contenido del Hero tiene Z-Index 5 (menor que el Header que pusimos en 1000) */
    .hero-content { position: relative; z-index: 5; max-width: 900px; width: 100%; margin: 0 auto; }
    
    .hero-content h1 { font-size: clamp(2.2rem, 5vw, 4rem); margin-bottom: 1.5rem; font-weight: 700; color: #f5f5f5; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
    .hero-content p { font-size: clamp(1.1rem, 2vw, 1.3rem); color: var(--text-muted); margin-bottom: 2.5rem; max-width: 700px; margin-left: auto; margin-right: auto; }
    
    .hero-actions { display: flex; flex-direction: column; gap: 1.5rem; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
    @media(min-width: 600px) { .hero-actions { flex-direction: row; gap: 2rem; } }
    .microcopy { color: #666; font-size: 0.9rem; margin-top: 1rem; }

    /* --- BOTONES --- */
    .button-primary { 
        background-color: var(--gold); color: #050505; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 700; 
        text-transform: uppercase; border-radius: 2px; transition: all 0.3s ease; border: 1px solid var(--gold); letter-spacing: 0.05em;
    }
    .button-primary:hover { background-color: #fff; border-color: #fff; box-shadow: 0 0 20px rgba(192, 160, 98, 0.4); }

    .button-secondary {
        background: transparent; color: var(--gold); border: 1px solid var(--gold); padding: 0.8rem 2rem; font-weight: 600; 
        text-transform: uppercase; border-radius: 2px; transition: all 0.3s ease;
    }
    .button-secondary:hover { background: rgba(192, 160, 98, 0.1); color: #fff; border-color: #fff; }

    .button-text { color: var(--text-main); text-decoration: underline; text-underline-offset: 4px; font-size: 1rem; transition: color 0.2s; }
    .button-text:hover { color: var(--gold); }

    /* --- METHODOLOGY --- */
    .methodology-section { padding: 5rem 1.5rem; background: #0e0e0e; border-bottom: 1px solid #222; }
    .steps-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; max-width: 1100px; margin: 3rem auto 0; }
    @media(min-width: 768px) { .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; } }
    .step-card { text-align: center; padding: 1rem; }
    .step-number { display: block; font-family: 'Playfair Display', serif; font-size: 3rem; color: rgba(192, 160, 98, 0.3); margin-bottom: 0.5rem; }
    .step-card h3 { color: var(--gold); margin-bottom: 1rem; font-size: 1.4rem; }
    .step-card p { font-size: 1rem; color: var(--text-muted); line-height: 1.5; }

    /* --- PRODUCTS --- */
    .featured-products { max-width: 1200px; margin: 80px auto; padding: 0 2rem; text-align: center; }
    .product-grid-home { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-bottom: 50px; margin-top: 40px; }
    .product-card-home { background-color: var(--bg-card); border: 1px solid #222; transition: transform 0.3s ease, border-color 0.3s; display: flex; flex-direction: column; text-align: left; }
    .product-card-home:hover { transform: translateY(-5px); border-color: var(--gold); }
    .product-image-container-home { aspect-ratio: 1/1; position: relative; background-color: #222; overflow: hidden; }
    .product-image-container-home img { width: 100%; height: 100%; object-fit: cover; transition: scale 0.5s ease; }
    .product-card-home:hover img { scale: 1.05; }
    .product-info-home { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
    .product-info-home h3 { font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem; font-weight: 600; font-family: 'Source Sans 3', sans-serif; }
    .product-meta { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
    .product-category-home { font-size: 0.8rem; text-transform: uppercase; color: #666; letter-spacing: 1px; }
    .product-price-home { color: var(--gold); font-weight: 700; }

    /* --- EDITORIAL --- */
    .editorial-seo-container { padding: 80px 2rem; background-color: rgba(255, 255, 255, 0.02); display: flex; justify-content: center; }
    .editorial-content { max-width: 750px; text-align: center; }
    .editorial-content h2 { color: var(--gold); margin-bottom: 2rem; font-size: 2.2rem; font-family: 'Playfair Display', serif; }

    /* --- SOCIAL PROOF (SPOTLIGHT) --- */
    .social-proof-section { background-color: #0d0d0d; padding: 6rem 0; overflow: hidden; }
    .testimonial-carousel-wrapper { margin-top: 3rem; padding: 0 1rem; }
    .testimonial-carousel { display: flex; gap: 1.5rem; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 1rem; }
    
    .testimonial-card.spotlight-card {
        flex: 0 0 85%; max-width: 350px; background-color: rgba(22, 22, 22, 1); border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 2rem; border-radius: 4px; scroll-snap-align: center; display: flex; flex-direction: column; position: relative; overflow: hidden; transition: border-color 0.3s ease;
    }
    .card-content-wrapper { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; }
    
    .spotlight-overlay {
        pointer-events: none; position: absolute; inset: -1px; border-radius: inherit; z-index: 0;
        background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(192, 160, 98, 0.1), transparent 40%);
        opacity: 0; transition: opacity 0.3s;
    }
    .testimonial-carousel-wrapper:hover .spotlight-overlay { opacity: 1; }

    .spotlight-card::before {
        content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
        background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(192, 160, 98, 0.5), transparent 40%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
        pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.3s;
    }
    .testimonial-carousel-wrapper:hover .spotlight-card::before { opacity: 1; }

    .quote-icon { font-size: 4rem; color: var(--gold); opacity: 0.2; position: absolute; top: -1rem; left: -1rem; font-family: serif; }
    .testimonial-card blockquote { margin: 1.5rem 0; font-style: italic; color: #ddd; position: relative; z-index: 1; }
    .testimonial-card footer { display: flex; gap: 1rem; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid #333; }
    .author-avatar { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 1px solid var(--gold); }
    .author-name { color: #fff; font-weight: 600; margin: 0; font-size: 0.95rem; }
    .author-title { color: #888; font-size: 0.8rem; margin: 0; }
    .toggle-button { background: none; border: none; color: var(--gold); font-size: 0.8rem; cursor: pointer; padding: 0; margin-bottom: 1rem; align-self: flex-start; }

    /* --- FINAL CTA --- */
    .final-cta-section { padding: 6rem 1.5rem; background: linear-gradient(to bottom, #121212, #0a0a0a); text-align: center; border-top: 1px solid #222; }
    .cta-content { max-width: 600px; margin: 0 auto; }
    .cta-content h2 { font-size: 2.5rem; color: var(--gold); margin-bottom: 1rem; }
    .cta-content p { color: #ccc; margin-bottom: 2.5rem; font-size: 1.1rem; }
    .privacy-note { margin-top: 1.5rem; color: #555; }

    /* --- ANIMATED BG UTILS --- */
    .animated-background { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
    .nebula { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.15; }
    .nebula-blue { width: 60vw; height: 60vw; background: #1e3a8a; top: -10%; left: -10%; animation: drift 30s infinite alternate; }
    .nebula-gold { width: 50vw; height: 50vw; background: #ca8a04; bottom: -10%; right: -10%; animation: drift 25s infinite alternate-reverse; }
    @keyframes drift { from { transform: translate(0,0); } to { transform: translate(5%, 5%); } }
    
    /* --- HILO SVG --- */
    .hilo-destino-container { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
    .hilo-glow { stroke: var(--gold); stroke-width: 2; filter: drop-shadow(0 0 5px var(--gold)); opacity: 0.6; }
    .particle { position: absolute; background: var(--gold); border-radius: 50%; width: 6px; height: 6px; box-shadow: 0 0 10px var(--gold); }
    
    .enjambre-container { position: absolute; width: 50px; height: 50px; }
    .particle-enjambre { position: absolute; width: 3px; height: 3px; opacity: 0.8; box-shadow: 0 0 5px 1px hsla(45, 100%, 70%, 0.5); }

    @media(min-width: 1024px) {
        .testimonial-carousel { justify-content: center; overflow: hidden; }
        .testimonial-card.spotlight-card { flex: 0 0 30%; }
    }
</style>