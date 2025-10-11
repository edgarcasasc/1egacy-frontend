<script>
  // Este script es para una futura animación, por ahora lo dejamos vacío.
</script>

<div class="origins-container">
  <div class="manifesto">
    <h1>El Legado del Linaje</h1>
    <p>
      Tu apellido es la clave de un universo de historias no contadas. En 1egacy
      ORIGINS, nos dedicamos a la arqueología de la identidad, rastreando los
      orígenes de linajes para revelar las sagas que te dieron forma. No se
      trata solo de árboles genealógicos; se trata de comprender el carácter,
      las luchas y los triunfos codificados en tu nombre.
    </p>
  </div>

  <div class="servicios-grid">
    <div class="servicio-card">
      <h3>Estudio de Origen de Apellido</h3>
      <p>
        El punto de partida de tu viaje. Investigamos el origen etimológico,
        geográfico e histórico de tu apellido, revelando su significado y las
        primeras familias que lo portaron.
      </p>
      <button>Solicitar un Estudio</button>
    </div>

    <div class="servicio-card">
      <h3>Investigación Genealógica Profunda</h3>
      <p>
        Para quienes buscan respuestas concretas. Trazamos tu linaje familiar
        directo tan atrás como los registros lo permitan, documentando nombres,
        fechas y lugares.
      </p>
      <button>Iniciar Investigación</button>
    </div>

    <div class="servicio-card">
      <h3>Rediseño Heráldico</h3>
      <p>
        Transformamos la heráldica de tu familia en una obra de arte
        contemporánea. Respetamos la simbología original y la elevamos con un
        diseño digno de tu legado.
      </p>
      <button>Consultar Diseño</button>
    </div>
  </div>
</div>

<style>
  .origins-container {
    padding-top: 120px; /* ¡AQUÍ ESTÁ LA SOLUCIÓN! Este padding empuja el contenido hacia abajo para que no choque con la Navbar */
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .manifesto {
    text-align: center;
    max-width: 800px;
    margin-bottom: 4rem;
  }

  .manifesto h1 {
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .manifesto p {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .servicios-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Crea 3 columnas */
    gap: 2rem; /* Espacio entre las tarjetas */
    width: 100%;
    max-width: 1200px;
    padding: 0 2rem;
  }

  .servicio-card {
    background-color: #1a1a1a; /* Un poco más claro que el fondo para destacar */
    padding: 2rem;
    border: 1px solid #333;
    text-align: center;
    transition: all 0.3s ease;
  }

  .servicio-card:hover {
    transform: translateY(-10px);
    border-color: #c0a062; /* Borde dorado al pasar el mouse */
  }

  .servicio-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #c0a062;
  }

  .servicio-card p {
    margin-bottom: 2rem;
  }

  /* Usamos el mismo estilo de botón que en la página de inicio */
  button {
    background-color: #c0a062;
    color: #121212;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #ffffff;
  }
</style>