<script>
    import { onMount } from 'svelte';
    import { PortableText } from '@portabletext/svelte';
    import Chart from 'chart.js/auto'; 

    export let data;
    const { linaje } = data;
    let chartCanvas;

    onMount(() => {
        if (linaje.estadisticas?.length > 0 && chartCanvas) {
            new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: linaje.estadisticas.map(d => d.pais),
                    datasets: [{
                        label: 'Portadores',
                        data: linaje.estadisticas.map(d => d.cantidad),
                        backgroundColor: '#c0a062',
                        borderColor: '#fff',
                        borderWidth: 0.5
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: '#888', font: { family: "'EB Garamond', serif" } }, grid: { color: '#333' } },
                        y: { ticks: { color: '#e0e0e0', font: { family: "'EB Garamond', serif", size: 14 } }, grid: { display: false } }
                    }
                }
            });
        }
    });
</script>

<svelte:head>
    <title>Legado Bespoke: {linaje.title} | 1egacy</title>
    <meta name="robots" content="noindex, nofollow" />
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
</svelte:head>

<a href="/" class="btn-volver-flotante" data-sveltekit-preload-data="off">← Inicio</a>

<div class="legado-wrapper">
    
    <section class="hero-section" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.7), #0a0a0a), url('{linaje.escudoUrl}')">
        <div class="hero-content">
            <span class="badge-bespoke">Edición Única</span>
            <h1 class="linaje-title">{linaje.title}</h1>
            <div class="divider-gold"></div>
            <p class="linaje-subtitle">{linaje.introduccion}</p>
        </div>
    </section>

    <section class="shield-section">
        <div class="shield-container">
            {#if linaje.escudoUrl}
                <img src={linaje.escudoUrl} alt="Escudo Bespoke" class="main-shield" />
            {/if}
        </div>
        <div class="blazon-box">
            <h3>Blasonamiento Oficial</h3>
            <div class="portable-text">
                {#if linaje.blason} <PortableText value={linaje.blason} /> {/if}
            </div>
        </div>
    </section>

    {#if linaje.historia}
    <section class="content-section">
        <h2 class="section-title">Investigación Genealógica</h2>
        <div class="text-block">
            <PortableText value={linaje.historia} />
        </div>
    </section>
    {/if}

    {#if linaje.origen}
    <section class="content-section alt-bg">
        <h2 class="section-title">Orígenes</h2>
        <div class="text-block text-center">
            <PortableText value={linaje.origen} />
        </div>
    </section>
    {/if}

    {#if linaje.estadisticas}
    <section class="content-section">
        <h2 class="section-title">Rastro Global</h2>
        <div class="chart-container">
            <canvas bind:this={chartCanvas}></canvas>
        </div>
    </section>
    {/if}

    <footer class="footer-bespoke">
        <p>Investigación realizada exclusivamente para el portador del token.</p>
        <img src="/logo1egacy_beige.png" alt="1egacy" class="footer-logo">
    </footer>
</div>

<style>
    /* --- MODO OSCURO DE LUJO --- */
    :global(body) { background-color: #0a0a0a !important; color: #e0e0e0 !important; font-family: 'EB Garamond', serif; margin: 0; }
    :global(header), :global(.mobile-nav) { display: none !important; }

    .legado-wrapper { width: 100%; overflow-x: hidden; }

    /* BOTÓN */
    .btn-volver-flotante { position: fixed; top: 20px; left: 20px; z-index: 100; color: #c0a062; text-decoration: none; border: 1px solid #c0a062; padding: 8px 16px; border-radius: 30px; font-family: sans-serif; font-size: 0.75rem; text-transform: uppercase; background: rgba(0,0,0,0.5); backdrop-filter: blur(5px); transition: 0.3s; }
    .btn-volver-flotante:hover { background: #c0a062; color: #000; }

    /* HERO */
    .hero-section { min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center; background-size: cover; background-position: center; padding: 2rem; }
    .badge-bespoke { color: #000; background: #c0a062; padding: 5px 15px; text-transform: uppercase; font-weight: bold; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 20px; display: inline-block; }
    .linaje-title { font-size: clamp(3rem, 10vw, 6rem); margin: 0; color: #fff; text-transform: uppercase; letter-spacing: 0.1em; }
    .divider-gold { width: 100px; height: 2px; background: #c0a062; margin: 30px auto; }
    .linaje-subtitle { font-size: 1.5rem; color: #aaa; max-width: 700px; margin: 0 auto; font-style: italic; }

    /* ESCUDO */
    .shield-section { padding: 4rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 3rem; }
    .shield-container { padding: 20px; border: 1px solid #333; background: radial-gradient(circle, #1a1a1a 0%, #000 70%); border-radius: 50%; box-shadow: 0 0 50px rgba(192, 160, 98, 0.1); }
    .main-shield { max-width: 300px; width: 100%; height: auto; display: block; }
    
    .blazon-box { max-width: 600px; text-align: center; border: 1px solid #c0a062; padding: 30px; position: relative; }
    .blazon-box h3 { margin-top: -42px; background: #0a0a0a; display: inline-block; padding: 0 15px; color: #c0a062; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; }
    
    /* CONTENIDO */
    .content-section { padding: 5rem 2rem; max-width: 900px; margin: 0 auto; }
    .alt-bg { background: #111; max-width: 100%; } /* Fondo alterno ancho */
    .section-title { text-align: center; font-size: 2.5rem; color: #c0a062; margin-bottom: 3rem; }
    
    .text-block { font-size: 1.25rem; line-height: 1.8; color: #ccc; }
    .text-center { text-align: center; }

    /* TEXTO RICO */
    .portable-text :global(strong) { color: #fff; font-weight: bold; }
    .portable-text :global(p) { margin-bottom: 1.5rem; }

    /* CHART */
    .chart-container { height: 400px; margin: 0 auto; }

    /* FOOTER */
    .footer-bespoke { text-align: center; padding: 4rem 2rem; border-top: 1px solid #222; color: #555; font-size: 0.8rem; }
    .footer-logo { width: 80px; margin-top: 20px; opacity: 0.5; }

    @media (max-width: 768px) {
        .linaje-title { font-size: 3rem; }
        .blazon-box { border: none; padding: 0; text-align: left; }
        .blazon-box h3 { margin-top: 0; display: block; background: none; padding: 0; margin-bottom: 10px; }
    }
</style>