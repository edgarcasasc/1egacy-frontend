<script>
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  // GTM ya vive en app.html, no se requiere lógica aquí.
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />

  <meta property="og:site_name" content="1egacy" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://somos1egacy.com/#organization",
        "name": "1egacy",
        "url": "https://somos1egacy.com",
        "logo": "https://somos1egacy.com/logo1egacy.svg",
        "sameAs": [
          "https://www.instagram.com/somos1egacy/",
          "https://x.com/somos1egacy",
          "https://www.youtube.com/@somos1egacy",
          "https://www.tiktok.com/@somos1egacy_"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://somos1egacy.com/#website",
        "url": "https://somos1egacy.com",
        "name": "1egacy",
        "publisher": { "@id": "https://somos1egacy.com/#organization" }
      }
    ]
  }
  </script>
</svelte:head>

<Navbar />

<main id="main-content">
  <slot />
</main>

<Footer /> 

<style>
  /* --- ESTILOS GLOBALES (Diseño original preservado) --- */
  :global(body) {
    background-color: #121212;
    color: #e0e0e0;
    font-family: 'Source Sans 3', sans-serif; 
    font-weight: 400;
    line-height: 1.6;
    margin: 0; 
    padding: 0; 
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
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
    max-width: 70ch;
    margin-top: 0; 
    margin-bottom: 1.5rem;
    color: #b0b0b0; 
    line-height: 1.7;
  }

  :global(a) {
    color: #c0a062;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  :global(a:hover) { color: #ffffff; text-decoration: underline; }

  main { display: block; min-height: 100vh;}
  
  :global(img, svg, video) { max-width: 100%; height: auto; display: block; }
</style>