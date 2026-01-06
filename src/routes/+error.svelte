<script>
  import { page } from '$app/stores';
</script>

<div style="text-align: center; padding: 4rem 2rem; font-family: 'Playfair Display', serif;">
  <h1 style="color: #D4AF37; font-size: 3rem;">
    {$page.status === 404 ? 'Legado No Encontrado' : 'Cruce de Linajes'}
  </h1>
  <p style="color: #666; max-width: 600px; margin: 1rem auto;">
    {$page.error?.message || 'Nuestros archivos están siendo restaurados.'}
  </p>
  <a href="/" style="display: inline-block; margin-top: 2rem; color: #D4AF37; text-decoration: underline;">
    Volver al origen de la historia
  </a>
</div>