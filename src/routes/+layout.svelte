<script>
  import '../app.css'; // Importa el CSS global
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { page } from '$app/stores';

  // SEO Globals
  const SITE_URL = 'https://somos1egacy.com';

  // Recomendado: crea este archivo en /static
  // /static/og-default.jpg (1200x630)
  const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

  $: canonical = `${SITE_URL}${$page.url.pathname}`;
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" />

  <!-- Canonical global (dinámico por ruta, sin query/hash) -->
  <link rel="canonical" href={canonical} />

  <meta property="og:site_name" content="1egacy" />
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Recomendado: URL canónica para OG -->
  <meta property="og:url" content={canonical} />

  <!-- OG/Twitter image global (URL absoluta) -->
  <meta property="og:image" content={DEFAULT_OG_IMAGE} />
  <meta property="og:image:secure_url" content={DEFAULT_OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

  <link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
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
          "https://www.tiktok.com/@somos1egacy"
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

<div class="app-shell">
  <Navbar />
  <main id="main-content"><slot /></main>
  <Footer /> 
</div>
