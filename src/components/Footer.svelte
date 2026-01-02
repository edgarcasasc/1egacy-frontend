<script>
  import Logo from './Logo.svelte';
  const year = new Date().getFullYear();
</script>

<footer class="footer svelte-1egacy">
  <div class="footer-content">
    <div class="footer-brand">
      <a href="/" class="footer-logo-link" aria-label="Ir a la página de inicio de 1egacy">
        <Logo />
      </a>
      <p class="tagline">Narrando lo que no se ha narrado.</p>
    </div>

    <div class="footer-socials">
      <a href="https://www.instagram.com/somos1egacy/" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://x.com/somos1egacy" target="_blank" rel="noopener noreferrer">X</a>
      <a href="https://www.youtube.com/@somos1egacy" target="_blank" rel="noopener noreferrer">YouTube</a>
      <a href="https://www.tiktok.com/@somos1egacy_" target="_blank" rel="noopener noreferrer">TikTok</a>
      <a href="https://www.facebook.com/profile.php?id=61579103341000" target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href="https://linkedin.com/company/1egacy/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="legal-info">
      <p>&copy; {year} 1egacy. Todos los derechos reservados.</p>
    </div>
    <p class="credits">
      Desarrollado por <a href="https://acclarolabs.com/" target="_blank" rel="noopener noreferrer">Acclaro Labs</a>
    </p>
  </div>
</footer>

<style>
  .footer {
    padding: 5rem 2rem 2rem;
    background-color: #0a0a0a;
    border-top: 1px solid #1a1a1a;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto 4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 3rem;
  }

  .footer-logo-link {
    width: 140px;
    margin-bottom: 1.5rem;
    display: block;
    transition: opacity 0.3s ease;
  }

  .footer-logo-link:hover { opacity: 0.7; }

  .tagline {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color: #c0a062;
    font-size: 0.95rem;
  }

  .footer-socials {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    max-width: 500px;
    justify-content: flex-end;
  }

  .footer-socials a {
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #666; /* Color tenue para redes "pasivas" */
    transition: color 0.3s ease;
  }

  .footer-socials a:hover { color: #c0a062; text-decoration: none; }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    color: #444;
    font-size: 0.75rem;
  }

  .credits a { color: #666; font-weight: 600; transition: color 0.3s; }
  .credits a:hover { color: #c0a062; }

  @media (max-width: 768px) {
    .footer-content { flex-direction: column; align-items: center; text-align: center; }
    .footer-socials { justify-content: center; }
    .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
  }
</style>