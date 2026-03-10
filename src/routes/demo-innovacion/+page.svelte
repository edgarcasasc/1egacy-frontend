<script>
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    // --- REPRODUCTOR DE AUDIO STATE ---
    let isPlaying = false;
    let progress = 0;
    
    // Simulación del progreso de audio
    let interval;
    function toggleAudio() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            interval = setInterval(() => {
                if (progress >= 100) {
                    progress = 0;
                    isPlaying = false;
                    clearInterval(interval);
                } else {
                    progress += 0.5;
                }
            }, 100);
        } else {
            clearInterval(interval);
        }
    }

    // --- TEASER TOOL STATE ---
    let step = 0;
    let selectedValues = { valor: '', origen: '', elemento: '' };
    let resultArchetype = null;

    const questions = [
        { title: "El Origen de tu Historia", description: "Para entender a dónde va tu linaje, debemos mirar dónde empezó.", question: "¿De dónde provienen los primeros recuerdos de tus ancestros?", options: [ { id: 'campo', label: 'La Tierra', text: 'Raíces campesinas o agricultoras' }, { id: 'mar', label: 'El Mar', text: 'Costas, puertos y viajes largos' }, { id: 'ciudad', label: 'La Ciudad', text: 'Comercio, industria y cemento' } ] },
        { title: "El Alma Familiar", description: "Cada apellido porta un espíritu rector invisible.", question: "¿Qué valor ha defendido tu familia a través de las generaciones?", options: [ { id: 'honor', label: 'El Honor', text: 'Lealtad y respeto por el nombre' }, { id: 'resiliencia', label: 'La Resiliencia', text: 'Levantarse frente a la adversidad' }, { id: 'sabiduria', label: 'La Sabiduría', text: 'Educación, letras y memoria' } ] },
        { title: "El Símbolo", description: "Si tuvieras que fundir el legado en oro...", question: "¿Qué elemento representaría mejor su herencia?", options: [ { id: 'roble', label: 'El Roble', text: 'Por su inquebrantable fortaleza' }, { id: 'brujula', label: 'La Brújula', text: 'Por su espíritu explorador' }, { id: 'libro', label: 'El Libro Abierto', text: 'Por el conocimiento compartido' } ] }
    ];

    const archetypes = {
        'campo-resiliencia-roble': { title: 'Los Guardianes de la Tierra', desc: 'Un legado marcado por el trabajo arduo y raíces profundas que ninguna tormenta puede arrancar.' },
        'mar-honor-brujula': { title: 'Los Navegantes del Destino', desc: 'Tu historia es de pioneros. Quienes cruzaron fronteras para fundar nuevos horizontes.' },
        'ciudad-sabiduria-libro': { title: 'Los Arquitectos del Espacio', desc: 'Forjadores de cultura y comercio. El conocimiento es el verdadero patrimonio de este linaje.' }
    };

    function startExperience() { step = 1; }

    function selectOption(key, value) {
        selectedValues[key] = value;
        setTimeout(() => {
            if (step < questions.length) {
                step += 1;
            } else {
                generateArchetype();
            }
        }, 400);
    }

    function generateArchetype() {
        const combo = `${selectedValues.origen}-${selectedValues.valor}-${selectedValues.elemento}`;
        resultArchetype = archetypes[combo] || { title: 'Los Forjadores de Dinastía', desc: 'Una historia única tejida con honor y memoria. Cada apellido es un universo.' };
        step = 4;
    }

    function resetDemo() {
        step = 0; selectedValues = { valor: '', origen: '', elemento: '' }; resultArchetype = null;
    }
</script>

<svelte:head>
    <title>Demo Innovación | 1egacy</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="demo-wrapper">
    <!-- NAVEGACIÓN DE DEMOS -->
    <nav class="demo-nav">
        <h1>Centro de Prototipos 1egacy</h1>
        <p>Explora conceptos interactivos para el futuro del legado.</p>
    </nav>

    <!-- DEMO 1: THE VAULT (Bóveda Auditiva) -->
    <section class="demo-section audio-vault-demo">
        <div class="section-badge">Demo 1</div>
        <h2 class="demo-title">The Vault (Componente Auditivo)</h2>
        <p class="demo-desc">Imagina este reproductor al inicio de un artículo del "Origins" o del "Codex". En lugar de solo leer, escuchas la voz, la emoción y el acento de tus ancestros.</p>
        
        <div class="article-mockup">
            <h3 class="article-title">La Carta desde Pamplona</h3>
            <p class="article-meta">Escrito por la familia Navarro · 1952</p>

            <!-- COMPONENTE: AUDIO VAULT -->
            <div class="audio-vault-player" class:playing={isPlaying}>
                <button class="play-btn" on:click={toggleAudio} aria-label={isPlaying ? 'Pausar testimonio' : 'Reproducir testimonio'}>
                    {#if isPlaying}
                        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    {:else}
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    {/if}
                </button>
                
                <div class="track-info">
                    <span class="track-name">Testimonio: La Despedida en el Puerto / Abuelo Jose</span>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: {progress}%"></div>
                    </div>
                </div>

                <div class="waveform-fake" class:animated={isPlaying}>
                    <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                </div>
            </div>
            <!-- FIN COMPONENTE -->

            <p class="article-dummy-text">
                "Nunca olvidaré la neblina aquella mañana de abril. El barco zarpaba hacia Veracruz y en mis manos solo llevaba una brújula de latón y la esperanza de un mundo nuevo..." 
                <br><br>
                <em>(El artículo continuaría aquí, la voz acompaña la lectura generando inmersión total).</em>
            </p>
        </div>
    </section>

    <!-- DEMO 2: GENERADOR DE ARQUETIPOS -->
    <section class="demo-section archetype-demo">
        <div class="section-badge">Demo 2</div>
        <h2 class="demo-title">Generador de Legado (Lead Teaser)</h2>
        <p class="demo-desc">Herramienta inmersiva para captar la atención. Transforma curiosos pidiendo su origen en potenciales clientes para un Documental Familiar.</p>

        <div class="demo-vault-section-inner">
            <div class="particles"></div>
            <div class="content-wrapper">
                
                {#if step === 0}
                    <div class="intro-screen" in:fade={{duration: 1000}}>
                        <span class="eyebrow">Experiencia Interactiva</span>
                        <h1 class="vault-title">Descubre tu Arquetipo</h1>
                        <p class="vault-desc">Responde tres preguntas y descubre el símbolo que define tu linaje antes de comenzar tu documental.</p>
                        <button class="gold-btn" on:click={startExperience}>Comenzar el Viaje &rarr;</button>
                    </div>
                {/if}

                {#if step > 0 && step <= questions.length}
                    {#key step}
                        <div class="question-screen" in:fly={{y: 50, duration: 800, delay: 200, easing: quintOut}} out:fade={{duration: 200}}>
                            <span class="step-counter">Acto {step} de {questions.length}</span>
                            <h2 class="q-title">{questions[step-1].title}</h2>
                            <p class="q-prompt">{questions[step-1].question}</p>

                            <div class="options-grid">
                                {#each questions[step-1].options as op}
                                    <button class="option-card" on:click={() => selectOption(Object.keys(selectedValues)[step-1], op.id)}>
                                        <h4>{op.label}</h4>
                                        <p>{op.text}</p>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/key}
                {/if}

                {#if step === 4 && resultArchetype}
                    <div class="result-screen" in:fade={{duration: 1500, delay: 500}}>
                        <div class="sello-container">
                            <div class="sello-glowing"></div>
                        </div>
                        <h2 class="archetype-title">{resultArchetype.title}</h2>
                        <p class="archetype-desc">{resultArchetype.desc}</p>
                        
                        <div class="result-cta-box">
                            <p>Esta es solo la portada de un gran libro.</p>
                            <button class="gold-btn main-action">Preservar en Film</button>
                            <button class="text-btn" on:click={resetDemo}>Repetir Demo</button>
                        </div>
                    </div>
                {/if}

            </div>
        </div>
    </section>
</div>

<style>
    /* Estilos base de la página Demo */
    .demo-wrapper {
        min-height: 100vh;
        background-color: #050505;
        color: #e0e0e0;
        font-family: 'Source Sans 3', sans-serif;
        padding-bottom: 100px;
    }

    .demo-nav {
        padding: 40px 20px;
        text-align: center;
        border-bottom: 1px solid #222;
        background-color: #0a0a0a;
    }
    .demo-nav h1 { color: #d4af37; font-family: 'Palatino Linotype', serif; font-size: 2.5rem; margin:0 0 10px 0;}
    .demo-nav p { color: #888; margin:0; }

    .demo-section {
        max-width: 1000px;
        margin: 60px auto;
        padding: 40px;
        background: #111;
        border: 1px solid #222;
        border-radius: 12px;
        position: relative;
    }

    .section-badge {
        position: absolute;
        top: -15px; left: 40px;
        background: #d4af37; color: #000;
        padding: 6px 16px; font-weight: bold; font-size: 0.8rem;
        text-transform: uppercase; border-radius: 4px; letter-spacing: 1px;
    }

    .demo-title { font-size: 2rem; color: #fff; margin-bottom: 15px; }
    .demo-desc { color: #aaa; line-height: 1.6; margin-bottom: 40px; font-size: 1.1rem;}

    /* =========================================
       AUDIO VAULT ESTILOS
       ========================================= */
    .article-mockup {
        background: #161616;
        padding: 40px;
        border-radius: 8px;
        border: 1px solid #333;
    }

    .article-title { font-family: 'Palatino Linotype', serif; font-size: 2.2rem; margin:0 0 5px 0; color: #fff; }
    .article-meta { color: #666; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 30px; letter-spacing: 1px;}
    .article-dummy-text { color: #aaa; line-height: 1.8; font-size: 1.1rem; border-left: 2px solid #333; padding-left: 20px; }

    .audio-vault-player {
        display: flex;
        align-items: center;
        gap: 20px;
        background: linear-gradient(90deg, #1f1a0e 0%, #151515 100%);
        border: 1px solid rgba(212, 175, 55, 0.3);
        padding: 20px 25px;
        border-radius: 50px; /* Estilo píldora */
        margin-bottom: 40px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    
    .audio-vault-player.playing {
        border-color: #d4af37;
        box-shadow: 0 4px 20px rgba(212, 175, 55, 0.15);
    }

    .play-btn {
        width: 50px; height: 50px;
        flex-shrink: 0;
        border-radius: 50%;
        border: none;
        background: #d4af37; color: #000;
        display: flex; justify-content: center; align-items: center;
        cursor: pointer; transition: transform 0.2s;
    }
    .play-btn svg { width: 20px; height: 20px; }
    .play-btn:hover { transform: scale(1.05); }

    .track-info {
        flex-grow: 1;
        display: flex; flex-direction: column; gap: 8px;
    }
    .track-name { color: #e0e0e0; font-weight: 600; font-size: 0.95rem; }
    
    .progress-bar-container {
        width: 100%; height: 4px; background: #333; border-radius: 2px; overflow: hidden;
    }
    .progress-bar {
        height: 100%; background: #d4af37; transition: width 0.1s linear;
    }

    .waveform-fake {
        display: flex; gap: 3px; align-items: center; height: 30px; margin-left:10px; opacity: 0.3;
    }
    .waveform-fake.animated { opacity: 1; }
    .waveform-fake .bar { width: 4px; background: #d4af37; border-radius: 2px; transition: height 0.1s;}
    
    .waveform-fake .bar:nth-child(1) { height: 10px; }
    .waveform-fake .bar:nth-child(2) { height: 20px; }
    .waveform-fake .bar:nth-child(3) { height: 15px; }
    .waveform-fake .bar:nth-child(4) { height: 25px; }
    .waveform-fake .bar:nth-child(5) { height: 12px; }

    .waveform-fake.animated .bar { animation: eq 1s ease-in-out infinite alternate; }
    .waveform-fake.animated .bar:nth-child(2) { animation-delay: 0.2s; }
    .waveform-fake.animated .bar:nth-child(3) { animation-delay: 0.4s; }
    .waveform-fake.animated .bar:nth-child(4) { animation-delay: 0.1s; }

    @keyframes eq { 0% { height: 5px; } 100% { height: 30px; } }

    /* =========================================
       GENERADOR DE ARQUETIPOS ESTILOS (DEMO 2)
       ========================================= */
    .demo-vault-section-inner {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background: radial-gradient(circle at center, #1a1510 0%, #080808 100%);
        min-height: 600px;
        display: flex; justify-content: center; align-items: center;
        border: 1px solid #333;
    }

    .particles {
        position: absolute; inset: 0;
        background-image: 
            radial-gradient(1px 1px at 20% 30%, rgba(212, 175, 55, 0.4) 1px, transparent 0),
            radial-gradient(1px 1px at 70% 60%, rgba(212, 175, 55, 0.3) 1px, transparent 0),
            radial-gradient(2px 2px at 40% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 0);
        background-size: 100px 100px; opacity: 0.5; z-index: 0;
    }

    .content-wrapper { position: relative; z-index: 10; width: 100%; padding: 40px; text-align: center; }

    .eyebrow { color: #d4af37; text-transform: uppercase; letter-spacing: 3px; font-size: 0.8rem; display: block; margin-bottom: 20px; }
    .vault-title { font-family: 'Palatino Linotype', serif; font-size: clamp(2rem, 4vw, 3.5rem); color: #fff; margin: 0 0 20px 0; text-shadow: 0 4px 20px rgba(212, 175, 55, 0.2); }
    .vault-desc { font-size: 1.1rem; color: #aaa; max-width: 500px; margin: 0 auto 40px auto; }

    .gold-btn { background: linear-gradient(135deg, #d4af37 0%, #aa8529 100%); color: #000; border: none; padding: 16px 36px; font-size: 1.1rem; font-weight: 700; border-radius: 4px; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; text-transform: uppercase; letter-spacing: 1px; }
    .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3); }

    .step-counter { color: #666; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; }
    .q-title { font-family: 'Palatino Linotype', serif; font-size: 2rem; color: #d4af37; margin: 10px 0; }
    .q-prompt { font-size: 1.2rem; color: #fff; margin: 30px 0; }
    .options-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .option-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(212, 175, 55, 0.2); padding: 20px; border-radius: 8px; color: #fff; text-align: center; cursor: pointer; transition: all 0.4s ease; backdrop-filter: blur(5px); }
    .option-card:hover { background: rgba(212, 175, 55, 0.1); border-color: #d4af37; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .option-card h4 { margin: 0 0 10px 0; font-size:1.1rem; color: #d4af37; }
    .option-card p { margin: 0; font-size: 0.85rem; color: #888; }

    .result-cta-box { background: rgba(0,0,0,0.5); border: 1px solid #333; padding: 2rem; border-radius: 8px; margin-top:20px;}
    .sello-glowing { width: 100px; height: 100px; margin: 0 auto 20px auto; border-radius: 50%; border: 2px solid #d4af37; background: rgba(212, 175, 55, 0.1); box-shadow: 0 0 40px rgba(212, 175, 55, 0.4); position: relative; }
    .sello-glowing::after { content: "◆"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2.5rem; color: #d4af37; }
    .archetype-title { font-family: 'Palatino Linotype', serif; font-size: 2.5rem; color: #fff; margin: 0 0 1rem 0; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
    .archetype-desc { font-size: 1.1rem; color: #d4af37; max-width: 500px; margin: 0 auto 1.5rem auto; font-style: italic; }
    .text-btn { background: none; border: none; color: #666; display: block; margin: 20px auto 0 auto; cursor: pointer; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; transition: color 0.3s; }
    .text-btn:hover { color: #fff; }
</style>
