<script lang="ts">
  const pageTitle = 'Términos y Condiciones | 1egacy';
  const pageDescription = 'Condiciones de uso, venta y servicios de 1egacy.';
  const canonicalUrl = 'https://somos1egacy.com/terminos';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<div class="legal-page-container">
  <header class="legal-header">
    <h1>Términos y Condiciones</h1>
    <p class="last-updated">Última actualización: 24 de Enero de 2026</p>
  </header>

  <section class="legal-content">
    <p>
      Estos Términos y Condiciones (los “Términos”) regulan el acceso y uso del sitio <strong>somos1egacy.com</strong> (el “Sitio”), así como la compra de productos físicos y digitales, y la contratación de servicios ofrecidos por 1egacy (“1egacy”, “nosotros”).
    </p>
    <p>Al navegar el Sitio, crear una solicitud, comprar o contratar, aceptas estos Términos.</p>

    <h2>1. Identidad y Contacto</h2>
    <p>
      <strong>Titular:</strong> 1egacy<br>
      <strong>Domicilio comercial:</strong> [Domicilio Comercial / Oficina Virtual], Monterrey, NL, México.<br>
      <strong>Contacto general:</strong> <a href="mailto:hola@acclaroflow.com">hola@acclaroflow.com</a><br>
      <strong>Privacidad:</strong> <a href="mailto:privacidad@acclaroflow.com">privacidad@acclaroflow.com</a>
    </p>

    <h2>2. Qué ofrecemos</h2>
    <p>1egacy ofrece, entre otros:</p>
    <ul>
      <li><strong>Productos físicos:</strong> Piezas artesanales (ej. escudos 3D, impresiones, textiles) que pueden ser de edición histórica o personalizadas.</li>
      <li><strong>Productos digitales:</strong> Archivos o entregables digitales (ej. PDFs, imágenes de alta resolución, accesos).</li>
      <li><strong>Servicios:</strong> Investigación genealógica, rediseño heráldico, consultoría creativa y producción audiovisual.</li>
    </ul>

    <h2>3. Compras, Precios e Impuestos</h2>
    <p>Los precios se muestran en <strong>MXN</strong> salvo indicación contraria. Nos reservamos el derecho de corregir errores evidentes de precio antes de procesar un pedido (en cuyo caso te notificaremos y podrás cancelar sin penalización).</p>

    <h2>4. Productos Físicos: Envíos y Devoluciones</h2>
    <h3>4.1 Producción y Variaciones</h3>
    <p>Al ser piezas artesanales, pueden existir variaciones menores de textura o tono sin que se considere defecto. Si el producto es personalizado, puede requerir aprobación previa.</p>
    
    <h3>4.2 Envíos</h3>
    <p>Los tiempos de producción y envío son estimados. Para envíos internacionales, el cliente es responsable de impuestos de importación o aranceles.</p>

    <h3>4.3 Devoluciones</h3>
    <ul>
      <li><strong>Productos no personalizados:</strong> Puedes solicitar devolución dentro de 10 días naturales desde la entrega, siempre que esté sin uso y en su empaque original.</li>
      <li><strong>Productos personalizados / bajo comisión:</strong> No admiten devolución salvo defecto de fabricación o daño en envío.</li>
    </ul>

    <h3>4.4 Daños</h3>
    <p>Si tu producto llega dañado, repórtalo dentro de las primeras 48 horas con fotos del empaque y del daño a <a href="mailto:hola@acclaroflow.com">hola@acclaroflow.com</a>.</p>

    <h2>5. Productos Digitales</h2>
    <p>Los productos digitales se entregan bajo una licencia de uso personal, no transferible y no exclusiva. No adquieres la propiedad intelectual para reventa o uso comercial sin autorización escrita.</p>
    <p><strong>No reembolsos:</strong> Por la naturaleza del contenido digital, una vez entregado o descargado, no hay reembolsos salvo falla técnica del archivo.</p>

    <h2>6. Investigación Genealógica y Heráldica</h2>
    <p>La investigación histórica depende de las fuentes disponibles y puede contener variantes ortográficas, registros incompletos o interpretaciones alternativas.</p>
    <p><strong>Limitación:</strong> 1egacy entrega un resultado académico/creativo con rigor, pero no garantiza exactitud absoluta ni utilidad para trámites legales o procesos oficiales (ej. ciudadanías). El cliente debe validar el uso legal por su cuenta.</p>

    <h2>7. Propiedad Intelectual</h2>
    <p>1egacy conserva la propiedad intelectual de metodologías, plantillas, estilo y dirección creativa. El cliente recibe una licencia de uso sobre el entregable final conforme al fin pactado.</p>

    <h2>8. Modificaciones</h2>
    <p>Podemos actualizar estos Términos ocasionalmente. Publicaremos la versión vigente con su fecha de actualización en esta página.</p>
  </section>
</div>

<style>
  :global(body) {
    background-color: #121212;
    color: #e0e0e0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .legal-page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 120px 20px 80px;
  }

  .legal-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid rgba(192, 160, 98, 0.2);
    padding-bottom: 2rem;
  }

  .legal-header h1 {
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: 2.5rem;
    color: #f5f5f5;
    margin-bottom: 0.5rem;
  }

  .last-updated {
    font-size: 0.9rem;
    color: #888;
    font-style: italic;
  }

  .legal-content h2 {
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: 1.5rem;
    color: #c0a062;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
  }

  .legal-content h3 {
    font-size: 1.1rem;
    color: #e0e0e0;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .legal-content p, .legal-content li {
    font-size: 1rem;
    line-height: 1.7;
    color: #ccc;
    margin-bottom: 1rem;
  }

  .legal-content ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .legal-content li {
    margin-bottom: 0.5rem;
  }

  .legal-content strong {
    color: #fff;
    font-weight: 600;
  }

  .legal-content a {
    color: #c0a062;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .legal-content a:hover {
    border-bottom-color: #c0a062;
  }

  @media (max-width: 600px) {
    .legal-page-container { padding-top: 100px; }
    .legal-header h1 { font-size: 2rem; }
  }
</style>