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
      <p class="tagline">Historias familiares, listas para heredarse.</p>
    </div>

    <div class="footer-socials">
      <a href="https://www.instagram.com/somos1egacy/" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://x.com/somos1egacy" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
      <a href="https://www.youtube.com/@somos1egacy" target="_blank" rel="noopener noreferrer">YouTube</a>
      <a href="https://www.tiktok.com/@somos1egacy_" target="_blank" rel="noopener noreferrer">TikTok</a>
      <a href="https://www.facebook.com/profile.php?id=61579103341000" target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href="https://linkedin.com/company/1egacy/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="legal-info">
      <p>
        &copy; {year} 1egacy. Todos los derechos reservados. 
        <span class="legal-links">
          <span class="sep">·</span> <a href="/privacidad">Privacidad</a> 
          <span class="sep">·</span> <a href="/terminos">Términos</a>
        </span>
      </p>
      <a href="/solicitar-consulta" class="footer-cta">Solicitar evaluación</a>
    </div>

    <p class="credits">
      Sitio por <a href="https://acclarolabs.com/" target="_blank" rel="noopener noreferrer">Acclaro</a>
    </p>
  </div>
</footer>

<style>
  .footer {
    padding: 5rem 2rem 3rem;
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
    font-size: 1rem;
    letter-spacing: 0.02em;
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
    color: #666; 
    transition: color 0.3s ease;
    text-decoration: none;
  }

  .footer-socials a:hover { color: #c0a062; }

  /* FOOTER BOTTOM */
  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center; /* Alineación vertical */
    color: #444;
    font-size: 0.75rem;
  }

  .legal-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .legal-info p { margin: 0; }

  .legal-links a {
    color: #444;
    text-decoration: none;
    transition: color 0.2s;
  }
  .legal-links a:hover { color: #888; }
  .sep { margin: 0 5px; }

  /* Nuevo CTA discreto */
  .footer-cta {
    color: #c0a062;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.7rem;
    margin-top: 0.2rem;
    border-bottom: 1px solid transparent;
    transition: all 0.3s;
  }
  .footer-cta:hover { border-bottom-color: #c0a062; color: #fff; }

  .credits { margin: 0; }
  .credits a { color: #666; font-weight: 600; text-decoration: none; transition: color 0.3s; }
  .credits a:hover { color: #c0a062; }

  @media (max-width: 768px) {
    .footer-content { flex-direction: column; align-items: center; text-align: center; }
    .footer-socials { justify-content: center; }
    
    .footer-bottom { flex-direction: column; gap: 2rem; text-align: center; }
    .legal-info { align-items: center; }
  }
</style>