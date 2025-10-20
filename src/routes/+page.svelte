<script>
  /**
   * ====================================================================================
   * Canvas Arquitectónico: Proyecto 1egacy
   * ====================================================================================
   * Fecha de Creación: 16 de Octubre, 2025
   * Arquitecto Principal: CWebiA
   * Líder de Proyecto: Edy Kzaz
   *
   * 1. Misión y Principio Cero
   * Misión: Contar las historias que merecen ser recordadas, materializando el 
   * concepto de "legado" a través de un estudio creativo y una casa productora.
   * Principio Cero (Guía de Arquitectura): Cada decisión técnica debe estar enfocada
   * en mejorar el ratio LTV:CAC.
   *
   * 2. Arquitectura General del Sistema (Jamstack/Headless)
   *
   * +---------+      +---------------------------+      +-------------------------+
   * | Usuario |----->| Cloudflare (DNS, CDN, WAF)|----->| Netlify (Frontend)      |
   * +---------+      +---------------------------+      |   - somos1egacy.com     |
   * |                      |   - studio.somos1egacy.com|
   * |                      +-------------------------+
   * |
   * +--------------------->+-------------------------+
   * | DigitalOcean (Backend)  |
   * |   - api.somos1egacy.com   |
   * |   - n8n.somos1egacy.com   |
   * +-------------------------+
   * 3. Desglose de Componentes
   * A. Frontend (El Rostro) - Este componente Svelte forma parte de él.
   * - Proyecto: 1egacy-frontend
   * - Framework: SvelteKit
   * - Alojamiento: Netlify
   *
   * B. Cerebro de Contenido (El Códice Digital)
   * - Plataforma: Sanity.io
   *
   * C. Sala de Máquinas (El Motor)
   * - Proveedor: DigitalOcean VPS
   * - C.1. API: FastAPI (Python) en api.somos1egacy.com
   * - C.2. Automatización: n8n en n8n.somos1egacy.com
   *
   * 4. Flujos de Trabajo Activos
   * - Captura de Leads: somos1egacy.com -> API (FastAPI) -> n8n -> Google Sheets.
   *
   * ESTADO DEL CANVAS: COMPLETO Y VALIDADO
   * ====================================================================================
   */

  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { gsap } from 'gsap';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

  onMount(() => {
    // Las animaciones GSAP y la manipulación del DOM solo deben ejecutarse en el navegador.
    if (browser) {
      gsap.registerPlugin(MotionPathPlugin);
      console.log("Entorno de navegador detectado, iniciando animaciones GSAP...");

      /**
       * ==========================================================================
       * INICIO DE ANIMACIONES - Implementación del "Blueprint" Animado
       * ==========================================================================
       */
      try {
        // --- Capa 3: El Hilo del Destino (SVG Animado) ---
        
        // Animación 1: Flotación etérea de todo el contenedor SVG.
        // Mueve suavemente el SVG hacia arriba y abajo para dar una sensación de flotación.
        gsap.to('.hilo-destino-container', {
          y: 10,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Animación 2: Partículas Viajeras (Círculos individuales)
        // Cada partícula viaja a lo largo del camino SVG a su propio ritmo.
        const particulasSingle = gsap.utils.toArray('.particle-single');
        particulasSingle.forEach((particle, i) => {
          gsap.to(particle, {
            motionPath: {
              path: '#hilo-path',
              align: '#hilo-path',
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },
            duration: 8 + Math.random() * 4, // Duración aleatoria para desincronizar
            delay: i * 0.5 + Math.random() * 1, // Retraso aleatorio
            repeat: -1,
            ease: 'linear',
            opacity: 0,
            // Efecto de aparición gradual al iniciar o repetir la animación
            onStart: () => gsap.to(particle, { opacity: 1, duration: 1 }),
            onRepeat: () => {
              gsap.set(particle, { opacity: 0 });
              gsap.to(particle, { opacity: 1, duration: 1, delay: 0.1 });
            }
          });
        });

        // Animación 3: Enjambre de Ecos (Grupo de partículas)
        const enjambreContainer = '.enjambre-container';
        const particulasEnjambre = gsap.utils.toArray('.particle-enjambre');

        // 3a. Movimiento LENTO del GRUPO a lo largo del camino.
        // Todo el contenedor del enjambre se mueve como una unidad.
        gsap.to(enjambreContainer, {
          motionPath: {
            path: '#hilo-path',
            align: '#hilo-path',
            alignOrigin: [0.5, 0.5],
            start: 0.1, // Empieza un poco adentro del camino
            end: 0.9,   // Termina un poco antes del final
          },
          duration: 20, // ACELERADO: Hacemos el viaje más rápido para que sea más notable
          repeat: -1,
          yoyo: true, // Va y viene a lo largo del segmento
          ease: 'sine.inOut',
        });

        // 3b. Animación de REMOLINO INDIVIDUAL dentro del enjambre.
        // Cada partícula tiene un movimiento caótico y orgánico propio.
        particulasEnjambre.forEach((particle) => {
          gsap.to(particle, {
            x: () => Math.random() * 30 - 15, // RANGO AUMENTADO para más dispersión
            y: () => Math.random() * 30 - 15, // RANGO AUMENTADO para más dispersión
            scale: () => 0.8 + Math.random() * 0.4,
            duration: 1.5 + Math.random() * 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });

      } catch (e) {
        console.error("Error al inicializar las animaciones GSAP:", e);
      }
      
      // --- Función de Limpieza ---
      // Es una buena práctica detener todas las animaciones cuando el componente se destruye
      // para evitar fugas de memoria.
      return () => {
        console.log("Limpiando animaciones GSAP...");
        gsap.killTweensOf('.hilo-destino-container, .particle-single, .enjambre-container, .particle-enjambre');
      };
    }
    
    // Si no es el navegador (ej. durante SSR), devolver una función de limpieza vacía.
    return () => {};
  });
</script>

<svelte:head>
  <title>1egacy - El Comienzo de tu Legado</title>
  <meta name="description" content="En 1egacy, desenterramos la historia de tus ancestros para forjar el mapa de tu futuro. Tu apellido es solo el comienzo." />
</svelte:head>

<!-- Contenedor Principal de la Página -->
<div class="home-container">

  <!-- ======================================================================== -->
  <!-- BLUEPRINT CAPA 1 y 2: El Lienzo Cósmico y las Nebulosas                  -->
  <!-- ======================================================================== -->
  <div class="animated-background">
    <!-- Nebulosa Azul Errante: se desplaza lentamente por la pantalla -->
    <div class="nebula nebula-blue"></div>
    <!-- Sol Distante: un resplandor dorado que pulsa con energía -->
    <div class="nebula nebula-gold"></div>
  </div>

  <!-- ======================================================================== -->
  <!-- BLUEPRINT CAPA 3: El Hilo del Destino (SVG, Partículas, Enjambre)         -->
  <!-- ======================================================================== -->
  <div class="hilo-destino-container">
    <!-- El SVG define la trayectoria para las partículas -->
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Filtro para crear el efecto de resplandor dorado -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="0" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <!-- El Hilo Dorado: la línea curva que sirve de guía -->
      <path id="hilo-path" class="hilo-glow" d="M0,591.2s400.9-336.8,831.4-134.7,561.4,197.9,1088.6-32.6"/>
    </svg>

    <!-- Las Partículas Viajeras (se crean 5) -->
    {#each Array(5) as _}
      <div class="particle particle-single"></div>
    {/each}

    <!-- El Enjambre de Ecos (contenedor + 10 partículas internas) -->
    <div class="enjambre-container">
      {#each Array(10) as _}
        <div class="particle particle-enjambre"></div>
      {/each}
    </div>
  </div>
  
  <!-- Contenido Principal: Título y Llamada a la Acción -->
  <main class="hero-content">
    <h1>Tu apellido no es el final de tu historia.<br> Es el comienzo de tu legado.</h1>
    <p>
      En 1egacy, desenterramos la historia de tus ancestros, revelando las pruebas que superaron 
      y los triunfos que alcanzaron, para forjar el mapa de tu futuro.
    </p>
    <a href="/origins" class="cta-button">
      Descubre tu origen
    </a>
  </main>

</div>

<style>
  /* --- CAPA 1: El Lienzo Cósmico (Fondo Base) --- */
  .home-container {
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* Clave para que los gradientes no se salgan */
    background-color: hsl(225, 20%, 8%); /* Azul oscuro profundo */
  }

  /* --- Contenido Principal --- */
  .hero-content {
    position: relative;
    z-index: 10; /* El contenido siempre debe estar por encima de las animaciones */
    text-align: center;
    padding: 2rem;
    max-width: 800px;
    color: #e0e0e0;
  }
  .hero-content h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    text-shadow: 0 0 15px rgba(0,0,0,0.5);
  }
  .hero-content p {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: #b0b0b0;
    margin-bottom: 2.5rem;
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
  }
  .cta-button {
    display: inline-block;
    background-color: #c0a062;
    color: #121212;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .cta-button:hover {
    background-color: #ffffff;
    transform: translateY(-3px);
  }

  /* --- CAPA 2: Las Nebulosas (Gradientes Animados) --- */
  .animated-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .nebula {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px); /* Aumentamos el desenfoque para un efecto más sutil */
  }
  /* Nebulosa Azul Errante */
  .nebula-blue {
    width: 80vw;
    height: 80vw;
    background: radial-gradient(circle, hsla(220, 50%, 60%, 0.1) 0%, transparent 70%);
    top: 10%;
    left: -20%;
    animation: drift 45s infinite linear alternate;
  }
  /* Sol Distante (Resplandor Dorado) */
  .nebula-gold {
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, hsla(35, 100%, 75%, 0.8) 0%, transparent 70%);
    opacity: 0.1;
    bottom: 5%;
    right: -15%;
    animation: pulse 12s infinite ease-in-out alternate;
  }
  
  /* Animaciones de las Nebulosas */
  @keyframes drift {
    from { transform: translateX(-20%) translateY(-5%); }
    to { transform: translateX(20%) translateY(5%); }
  }
  @keyframes pulse {
    from { transform: scale(0.95); opacity: 0.08; }
    to { transform: scale(1.05); opacity: 0.12; }
  }

  /* --- CAPA 3: El Hilo del Destino (SVG y Partículas) --- */
  .hilo-destino-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2; /* Encima de nebulosas, debajo de texto */
    mix-blend-mode: screen; /* Clave para el efecto luminoso sobre el fondo oscuro */
    pointer-events: none; /* Evita que el SVG intercepte clics del ratón */
  }
  .hilo-destino-container svg {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .hilo-glow {
    fill: none;
    stroke: #c0a062;
    stroke-width: 3px;
    stroke-linecap: round;
    filter: url(#glow); /* Aplica el resplandor definido en el SVG */
  }

  /* Estilo base para todas las partículas */
  .particle {
    position: absolute;
    border-radius: 50%;
    background-color: #c0a062;
    box-shadow: 0 0 8px 3px hsla(45, 100%, 70%, 0.7);
    opacity: 0; /* GSAP controla la visibilidad */
    /* GSAP controla la posición (top/left/transform) */
  }
  .particle-single {
    width: 6px;
    height: 6px;
  }
  .enjambre-container {
    position: absolute;
    width: 1px;
    height: 1px;
  }
  .particle-enjambre {
    position: absolute; /* CORRECCIÓN: Permite posicionar cada partícula individualmente */
    top: 0;
    left: 0;
    width: 3px;
    height: 3px;
    box-shadow: 0 0 5px 2px hsla(45, 100%, 70%, 0.5);
    opacity: 1; /* Son visibles dentro de su contenedor */
  }

  /* --- Optimización para Móviles --- */
  @media (max-width: 768px) {
    .hero-content {
      padding: 1rem; /* Reducir padding en pantallas pequeñas */
    }
    
    .hero-content h1 {
      font-size: clamp(2rem, 8vw, 2.8rem); /* Ajustar tamaño para ser más impactante en móviles */
      line-height: 1.2;
    }

    .hero-content p {
      font-size: clamp(0.9rem, 4vw, 1rem); /* Ajustar tamaño del párrafo */
      margin-bottom: 2rem;
    }

    .cta-button {
      padding: 0.8rem 1.8rem; /* Hacer el botón ligeramente más pequeño */
      font-size: 1rem;
    }
  }
</style>

<!--
  Este archivo es la plantilla para todas las páginas dentro de /studio.
  Su ÚNICA función es mostrar el contenido de las páginas hijas. NO debe tener más código.
-->
<slot />
