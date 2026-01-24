<script lang="ts">
  // SEO Meta Tags
  const pageTitle = 'Política de Privacidad | 1egacy';
  const pageDescription = 'Consulta cómo 1egacy protege y gestiona tus datos personales. Conoce tus derechos y nuestro compromiso con tu privacidad.';
  const canonicalUrl = 'https://somos1egacy.com/politica-de-privacidad';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<div class="legal-page-container">
  <header class="legal-header">
    <h1>Política de Privacidad</h1>
    <p class="last-updated">Última actualización: Enero 2026</p>
  </header>

  <section class="legal-content">
    <h2>1. Introducción</h2>
    <p>
      Bienvenido a 1egacy. Somos un estudio creativo dedicado a contar las historias que merecen ser recordadas. Tu privacidad es fundamental para nosotros. Esta Política explica qué datos recopilamos, cómo los usamos y cómo los protegemos.
    </p>
    <p>
      Operamos en cumplimiento con la normativa aplicable en México y aplicamos prácticas alineadas a estándares internacionales de privacidad cuando corresponda.
    </p>

    <h2>2. Responsable del Tratamiento</h2>
    <p>
      <strong>Responsable:</strong> 1egacy (en adelante, "1egacy").<br>
      <strong>Domicilio de contacto:</strong> [Domicilio Comercial / Oficina Virtual], Monterrey, Nuevo León, México.<br>
      <strong>Correo de privacidad:</strong> <a href="mailto:privacidad@acclaroflow.com">privacidad@acclaroflow.com</a>
    </p>

    <h2>3. Datos que Recopilamos</h2>
    <p>Recopilamos diferentes tipos de datos según tu interacción:</p>
    <ul>
      <li><strong>Datos de Identificación:</strong> Nombre, correo y país (al llenar formularios).</li>
      <li><strong>Datos de Navegación:</strong> Dirección IP, navegador y cookies (para mejorar tu experiencia).</li>
      <li><strong>Datos Transaccionales:</strong> Información para procesar pagos (gestionada por pasarelas externas seguras).</li>
      <li><strong>Datos para Servicios (Origins):</strong> Información genealógica o histórica que nos proporciones voluntariamente para la creación de tu Códice o investigación.</li>
    </ul>
    
    <div class="highlight-box">
      <p><strong>Nota sobre datos sensibles:</strong> Tratamos la información genealógica con máxima confidencialidad, medidas de seguridad reforzadas y únicamente para el propósito del servicio contratado.</p>
    </div>

    <h2>4. Finalidad del Tratamiento</h2>
    <p>Usamos tus datos para:</p>
    <ul>
      <li>Proveer y gestionar los servicios solicitados (Códice, Origins, Films).</li>
      <li>Responder a tus consultas y solicitudes.</li>
      <li>Cumplir con obligaciones legales y de seguridad.</li>
      <li>Mejorar nuestro sitio web y experiencia de usuario (analítica agregada).</li>
      <li>Enviarte comunicaciones relevantes (solo si has dado tu consentimiento explícito).</li>
    </ul>
    <p><strong>No vendemos tus datos personales a terceros.</strong></p>

    <h2>5. Con Quién Compartimos tus Datos</h2>
    <p>
      Podemos compartir tus datos únicamente cuando sea necesario con proveedores que nos ayudan a operar, quienes actúan como encargados y están obligados a proteger tu información:
    </p>
    <ul>
      <li>Hosting e infraestructura web.</li>
      <li>Pasarelas de pago (para procesar compras de forma segura).</li>
      <li>Herramientas de gestión y operación (correo, soporte).</li>
      <li>Servicios de analítica (solo con consentimiento).</li>
    </ul>

    <h2>6. Tus Derechos</h2>
    <p>Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos (Derechos ARCO), así como a retirar tu consentimiento.</p>
    <p>
      Para ejercer estos derechos, contáctanos en: <a href="mailto:privacidad@acclaroflow.com">privacidad@acclaroflow.com</a>.
    </p>

    <h2>7. Seguridad y Cookies</h2>
    <p>
      Implementamos medidas técnicas y organizativas para proteger tus datos. Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas/marketing solo con tu consentimiento. Puedes gestionar tus preferencias en cualquier momento.
    </p>

    <h2>8. Contacto</h2>
    <p>
      Si tienes dudas sobre esta Política, escríbenos a: <a href="mailto:privacidad@acclaroflow.com">privacidad@acclaroflow.com</a>.
    </p>
  </section>
</div>

<style>
  /* --- ESTILOS GLOBALES DEL COMPONENTE --- */
  :global(body) {
    background-color: #121212;
    color: #e0e0e0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .legal-page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 120px 20px 80px; /* Espacio para navbar fija */
  }

  /* HEADER */
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

  /* CONTENIDO */
  .legal-content h2 {
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    font-size: 1.5rem;
    color: #c0a062; /* Dorado */
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
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

  /* Highlight Box */
  .highlight-box {
    background-color: rgba(192, 160, 98, 0.05);
    border-left: 3px solid #c0a062;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 4px 4px 0;
  }
  .highlight-box p {
    margin: 0;
    color: #e0e0e0;
  }

  @media (max-width: 600px) {
    .legal-page-container {
      padding-top: 100px;
    }
    .legal-header h1 {
      font-size: 2rem;
    }
  }
</style>