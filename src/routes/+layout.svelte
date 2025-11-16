<script>
    import Navbar from '../components/Navbar.svelte'; // Tu importación existente

    // --- CÓDIGO GTM AÑADIDO ---
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    onMount(() => {
        // Asegúrate de que esto solo se ejecute en el navegador
        if (browser) {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W783R3C7');
        }
    });
    // --- FIN DE CÓDIGO GTM ---
</script>

<svelte:head>
    <title>1egacy: Estudio Creativo | Descubre y Materializa tu Legado</title>
    <link rel="icon" href="/favicon.svg" />
<meta property="og:site_name" content="1egacy" />
  <meta property="og:type" content="website" /> 
  
  <meta property="og:image" content="/1egacy-og-logo.jpg" /> 
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Logo de 1egacy" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="/1egacy-og-logo.jpg" />
  


    <meta
        name="description"
        content="Estudio creativo que narra lo que no se ha narrado. Investigamos tu linaje, rediseñamos tu escudo y narramos tu historia. Transforma tu pasado en arte tangible."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap"
        rel="stylesheet"
    >
    <script type="application/ld+json">
    {
        // ... Tu Schema JSON-LD sin cambios ...
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "1egacy",
        "url": "https://somos1legacy.com",
        "logo": "https://somos1legacy.com/logo1egacy.svg",
        "description": "Contamos las historias que merecen ser recordadas.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Valle Oaxaca 2400, Colonia Chapultepec",
            "addressLocality": "Monterrey",
            "postalCode": "64620",
            "addressCountry": "MX"
        },
        "sameAs": [
            "https://www.instagram.com/somos1egacy/",
            "https://x.com/somos1egacy",
            "https://www.youtube.com/@somos1egacy",
            "https://www.tiktok.com/@somos1egacy",
            "https://www.facebook.com/profile.php?id=61579103341000"
        ]
    }
    </script>

    <noscript>
        <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap"
            rel="stylesheet"
        >
    </noscript>
</svelte:head>

<Navbar />

<main>
	<slot />
</main>

<style>
	/* --- ESTILOS (Sin cambios respecto a la versión anterior) --- */
	:global(body) {
		background-color: #121212;
		color: #e0e0e0;
		font-family: 'Source Sans 3', sans-serif; 
		font-weight: 400;
		line-height: 1.6;
		margin: 0; 
		padding: 0; 
		box-sizing: border-box; 
	}
	:global(*, *:before, *:after) {
		box-sizing: inherit;
	}
	:global(h1), :global(h2), :global(h3) {
		font-family: 'Playfair Display', serif; 
		font-weight: 400;
		color: #c0a062; 
		line-height: 1.2;
		margin-top: 0; 
		margin-bottom: 1rem;
	}
	:global(h1) { font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 700; }
	:global(h2) { font-size: clamp(2rem, 5vw, 2.5rem); margin-top: 3rem; }
	:global(h3) { font-size: clamp(1.5rem, 4vw, 1.8rem); margin-top: 2.5rem; }
	:global(p) {
		max-width: 75ch; 
		margin-top: 0; 
		margin-bottom: 1.5rem;
		color: #b0b0b0; 
	}
	:global(a) {
		color: #c0a062;
		text-decoration: none;
		transition: color 0.3s ease;
	}
	:global(a:hover) { color: #ffffff; text-decoration: underline; }
	main { display: block; }
	:global(img, svg, video) { max-width: 100%; height: auto; display: block; }
	:global(ul, ol) { list-style: none; padding: 0; margin: 0 0 1.5rem 0; }
	:global(li) { margin-bottom: 0.5rem; }
</style>

