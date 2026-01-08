<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { gsap } from 'gsap';

    onMount(() => {
        if (browser) {
            // 1. Efecto Ken Burns: Zoom ultra lento y paneo
            gsap.to(".hero-bg-image", {
                scale: 1.15,
                x: -20,
                y: -10,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 2. Revelación suave del texto (Stagger)
            const tl = gsap.timeline();
            tl.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power4.out",
                delay: 0.5
            });

            // 3. Animación de "Polvo Atmosférico" (Sutil)
            gsap.to(".dust-particle", {
                y: "-=50",
                x: "+=20",
                opacity: 0.3,
                duration: "random(5, 10)",
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: 0.5,
                    from: "random"
                },
                ease: "sine.inOut"
            });
        }
    });
</script>

<section class="relative flex items-center justify-center min-h-[90vh] text-center text-white overflow-hidden bg-black">
    <div class="absolute inset-0 z-0">
        <img 
            src="/placeholder-hero-codice-bg.webp" 
            alt="Detalle artesanal del Códice" 
            class="hero-bg-image w-full h-full object-cover will-change-transform opacity-60"
        >
        
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        
        <div class="absolute inset-0 pointer-events-none">
            {#each Array(12) as _}
                <div class="dust-particle absolute w-1 h-1 bg-white/20 rounded-full" 
                     style="top: {Math.random() * 100}%; left: {Math.random() * 100}%">
                </div>
            {/each}
        </div>
    </div>

    <div class="hero-content relative z-10 p-4 max-w-5xl mx-auto">
        <span class="block text-gold-500 uppercase tracking-[0.3em] text-sm mb-4 opacity-80 font-sans">
            Tradición & Maestría
        </span>
        
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-2xl">
            El Códice del <span class="text-gold-400">Legado</span>
        </h1>
        
        <h2 class="text-xl md:text-2xl lg:text-3xl font-light mb-10 max-w-3xl mx-auto leading-relaxed text-gray-200">
            El Testamento Visual de Tu Linaje. Donde la investigación histórica se encuentra con la <span class="italic font-serif">maestría artesanal</span>.
        </h2>
        
        <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#consulta" class="cta-primary">
                Comenzar tu Códice
            </a>
            <button class="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest border-b border-white/20 pb-1">
                Explorar la metodología
            </button>
        </div>
    </div>
</section>

<style>
    /* Usando los tokens de oro de tu marca 1egacy */
    :root {
        --gold: #c0a062;
        --gold-light: #d4bc8d;
    }

    .text-gold-500 { color: var(--gold); }
    .text-gold-400 { color: var(--gold-light); }

    .cta-primary {
        @apply inline-block bg-[#c0a062] hover:bg-white hover:text-black text-black text-lg font-bold py-4 px-10 rounded-sm transition-all duration-500 shadow-2xl uppercase tracking-widest;
    }

    /* Mejora de la fuente Serif para el Códice */
    h1 {
        font-family: 'Playfair Display', serif;
        letter-spacing: -0.02em;
    }

    /* Rendimiento: Optimización para animaciones pesadas */
    .hero-bg-image {
        backface-visibility: hidden;
        -webkit-perspective: 1000;
    }
</style>