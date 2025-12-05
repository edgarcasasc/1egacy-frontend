<script>
    import { onMount } from 'svelte';
    import { PortableText } from '@portabletext/svelte';
    import Chart from 'chart.js/auto'; 

    export let data;
    const { linaje } = data;

    // --- GRÁFICA ---
    let chartCanvas;
    
    onMount(() => {
        if (linaje.estadisticas && linaje.estadisticas.length > 0 && chartCanvas) {
            const labels = linaje.estadisticas.map(d => d.pais);
            const values = linaje.estadisticas.map(d => d.cantidad);

            new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Portadores estimados`,
                        data: values,
                        backgroundColor: '#C0A062', 
                        borderColor: '#A08042',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { 
                            beginAtZero: true,
                            ticks: { font: { family: "'EB Garamond', serif" }, color: '#4B3F3A' }
                        },
                        y: {
                            ticks: { font: { family: "'EB Garamond', serif", size: 14 }, color: '#4B3F3A' }
                        }
                    }
                }
            });
        }
    });

    let activeTimelineIndex = 0;
</script>

<svelte:head>
    <title>La Crónica de {linaje.title} | 1egacy</title>
    <meta name="robots" content="noindex, nofollow" />
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
</svelte:head>

<a href="/" class="btn-volver-flotante" data-sveltekit-preload-data="off">
    ← Volver a 1egacy
</a>

<div class="codice-wrapper">
    
    <section id="portada" class="hero-section" style="background-image: linear-gradient(rgba(253, 251, 245, 0.85), rgba(253, 251, 245, 1)), url('{linaje.escudoUrl}')">
        <div class="hero-content">
            <h1 class="linaje-title">LINAJE {linaje.title}</h1>
            <p class="linaje-subtitle">
                {linaje.introduccion || 'Una historia forjada en el tiempo.'}
            </p>
            <div class="scroll-indicator">
                <div class="mouse"><div class="wheel"></div></div>
            </div>
        </div>
    </section>

    <section id="origen" class="section-container">
        <h2 class="section-title">Orígenes y Significado</h2>
        <div class="divider-gold"></div>
        
        <div class="content-block portable-text-center">
            {#if linaje.origen}
                <PortableText value={linaje.origen} />
            {:else}
                <p>Información de origen pendiente de investigación.</p>
            {/if}
        </div>
    </section>

    {#if linaje.historia}
    <section id="narrativa" class="section-container bg-paper">
        <h2 class="section-title">Historia Completa del Linaje</h2>
        <div class="divider-gold"></div>
        
        <div class="content-block portable-text-center">
            <PortableText value={linaje.historia} />
        </div>
    </section>
    {/if}

    {#if linaje.hitos && linaje.hitos.length > 0}
    <section id="hitos" class="section-container">
        <h2 class="section-title">Línea de Tiempo</h2>
        <div class="divider-gold"></div>
        
        <div class="timeline-layout">
            <div class="timeline-nav">
                {#each linaje.hitos as hito, i}
                    <button 
                        class="timeline-btn {activeTimelineIndex === i ? 'active' : ''}"
                        on:click={() => activeTimelineIndex = i}
                    > 
                        <div class="dot"></div>
                        <span class="year">{hito.year}</span>
                        <span class="evt-title">{hito.title}</span>
                    </button>
                {/each}
            </div>

            <div class="timeline-content-box">
                {#each linaje.hitos as hito, i}
                    <div class="timeline-card {activeTimelineIndex === i ? 'visible' : 'hidden'}">
                        <h3>{hito.title}</h3>
                        <span class="card-year">{hito.year}</span>
                        <p>{hito.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>
    {/if}

    <section id="heraldica" class="section-container bg-paper">
        <h2 class="section-title">Heráldica</h2>
        <div class="divider-gold"></div>
        
        <div class="heraldica-grid">
            <div class="shield-display">
                {#if linaje.escudoUrl}
                    <div class="shield-frame">
                        <img src={linaje.escudoUrl} alt="Escudo de {linaje.title}" />
                    </div>
                    <p class="caption">Representación heráldica del linaje.</p>
                {/if}
            </div>
            
            <div class="blazon-text">
                <h3>Blasonamiento</h3>
                <div class="portable-text-left">
                    {#if linaje.blason}
                        <PortableText value={linaje.blason} />
                    {:else}
                        <p>Descripción técnica no disponible.</p>
                    {/if}
                </div>
            </div>
        </div>
    </section>

    {#if linaje.estadisticas && linaje.estadisticas.length > 0}
    <section id="expansion" class="section-container">
        <h2 class="section-title">Expansión Global</h2>
        <div class="divider-gold"></div>
        <p class="intro-text">Presencia estimada del apellido en el mundo actual.</p>
        <div class="chart-wrapper">
            <canvas bind:this={chartCanvas}></canvas>
        </div>
    </section>
    {/if}

</div>

<style>
    /* --- 1. OCULTAR HEADER --- */
    :global(header), :global(.mobile-nav), :global(.mobile-nav-overlay) {
        display: none !important;
    }

    /* --- 2. BOTÓN VOLVER --- */
    .btn-volver-flotante {
        position: fixed; top: 20px; left: 20px; z-index: 100;
        text-decoration: none; color: #4B3F3A;
        font-family: 'Source Sans 3', sans-serif; font-weight: 600; font-size: 0.8rem;
        text-transform: uppercase; letter-spacing: 1px;
        background: rgba(253, 251, 245, 0.8);
        padding: 10px 20px; border: 1px solid #4B3F3A; border-radius: 30px;
        backdrop-filter: blur(5px); transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .btn-volver-flotante:hover { background: #4B3F3A; color: #FDFBF5; transform: translateY(-2px); }

    /* --- BASE --- */
    :global(body) {
        background-color: #FDFBF5 !important; 
        color: #4B3F3A !important;
        font-family: 'EB Garamond', serif;
        margin: 0; line-height: 1.6;
    }
    .codice-wrapper { width: 100%; overflow-x: hidden; }

    /* --- HERO --- */
    .hero-section {
        min-height: 100vh; display: flex; flex-direction: column;
        justify-content: center; align-items: center; text-align: center;
        padding: 2rem; background-size: cover; background-position: center; position: relative;
    }
    .hero-content { max-width: 800px; z-index: 2; }
    .linaje-title {
        font-size: clamp(3rem, 8vw, 5rem); font-weight: 700; color: #4B3F3A;
        text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;
        border-bottom: 2px solid #C0A062; display: inline-block; padding-bottom: 10px;
    }
    .linaje-subtitle { font-size: 1.5rem; color: #6D5F5A; font-style: italic; margin-top: 0; }

    /* Scroll Indicator */
    .scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); }
    .mouse { width: 26px; height: 40px; border: 2px solid #C0A062; border-radius: 20px; position: relative; }
    .wheel { width: 4px; height: 8px; background: #C0A062; position: absolute; top: 6px; left: 50%; transform: translateX(-50%); border-radius: 2px; animation: scroll 1.5s infinite; }
    @keyframes scroll { 0% { top: 6px; opacity: 1; } 100% { top: 20px; opacity: 0; } }

    /* --- SECCIONES --- */
    .section-container { padding: 5rem 2rem; max-width: 1100px; margin: 0 auto; }
    .bg-paper { background-color: #F7F2EC; }
    .section-title { font-size: 2.5rem; text-align: center; color: #A08042; margin-bottom: 10px; font-weight: bold; }
    .divider-gold { width: 60px; height: 3px; background-color: #C0A062; margin: 0 auto 3rem auto; }
    .intro-text { text-align: center; max-width: 700px; margin: 0 auto 3rem auto; font-size: 1.2rem; }

    /* --- ESTILOS DE TEXTO RICO (CORREGIDOS) --- */
    
    .content-block { max-width: 750px; margin: 0 auto; } /* Ancho de lectura cómodo */

    /* Clase para centrar todo el contenido rico */
    .portable-text-center {
        font-size: 1.25rem;
        color: #4B3F3A;
        line-height: 1.8;
        text-align: center !important; /* Fuerza el centrado */
    }
    /* Forzar centrado en los hijos generados por PortableText */
    .portable-text-center :global(p),
    .portable-text-center :global(h1),
    .portable-text-center :global(h2),
    .portable-text-center :global(h3),
    .portable-text-center :global(ul),
    .portable-text-center :global(li) {
        text-align: center !important;
        margin-bottom: 1.5rem;
    }
    
    /* Clase para alinear a la izquierda (Blasón) */
    .portable-text-left {
        font-size: 1.1rem;
        color: #4B3F3A;
        line-height: 1.6;
        text-align: left !important;
    }
    .portable-text-left :global(p) { margin-bottom: 1rem; }

    /* Negritas Doradas */
    :global(strong) { color: #A08042; font-weight: 700; }

    /* --- TIMELINE --- */
    .timeline-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; align-items: start; }
    .timeline-nav { position: relative; padding-left: 20px; border-left: 2px dashed #C0A062; }
    .timeline-btn { display: block; background: none; border: none; text-align: left; margin-bottom: 2rem; cursor: pointer; position: relative; width: 100%; padding-left: 15px; transition: all 0.3s ease; }
    .timeline-btn .year { display: block; font-size: 1.2rem; font-weight: bold; color: #4B3F3A; }
    .timeline-btn .evt-title { font-size: 0.9rem; color: #888; font-style: italic; }
    .timeline-btn .dot { position: absolute; left: -27px; top: 5px; width: 12px; height: 12px; background: #FDFBF5; border: 2px solid #C0A062; border-radius: 50%; transition: all 0.3s; }
    .timeline-btn:hover .year, .timeline-btn.active .year { color: #C0A062; }
    .timeline-btn.active .dot { background: #C0A062; transform: scale(1.3); }
    
    .timeline-content-box { background: #fff; padding: 2rem; border: 1px solid #EAE3D9; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-radius: 4px; min-height: 200px; }
    .timeline-card { animation: fadeIn 0.5s ease; }
    .timeline-card h3 { font-size: 1.8rem; margin-top: 0; color: #4B3F3A; margin-bottom: 5px; }
    .card-year { display: inline-block; background: #F7F2EC; padding: 4px 10px; font-size: 0.8rem; color: #888; margin-bottom: 1rem; border-radius: 4px; }
    .hidden { display: none; }
    .visible { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* --- HERÁLDICA --- */
    .heraldica-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .shield-frame { padding: 20px; border: 4px double #EAE3D9; background: #fff; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .shield-frame img { max-width: 250px; width: 100%; height: auto; display: block; }
    .shield-display { text-align: center; }
    .caption { font-size: 0.9rem; font-style: italic; color: #888; margin-top: 10px; }
    .blazon-text h3 { font-size: 1.8rem; color: #A08042; border-bottom: 1px solid #C0A062; padding-bottom: 10px; margin-bottom: 20px; }

    /* --- EXPANSIÓN --- */
    .chart-wrapper { width: 100%; max-width: 800px; height: 400px; margin: 0 auto; }

    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
        .linaje-title { font-size: 2.5rem; }
        .timeline-layout { grid-template-columns: 1fr; }
        .timeline-nav { display: flex; overflow-x: auto; border-left: none; border-bottom: 2px dashed #C0A062; padding-bottom: 10px; margin-bottom: 20px; }
        .timeline-btn { margin-bottom: 0; width: auto; margin-right: 20px; padding-left: 0; }
        .timeline-btn .dot { display: none; }
        .heraldica-grid { grid-template-columns: 1fr; text-align: center; }
        .blazon-text h3 { border-bottom: none; text-decoration: underline text-decoration-color: #C0A062; }
    }
</style>