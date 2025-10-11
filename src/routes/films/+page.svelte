<div class="films-container">
  <div class="manifesto">
    <h1>Legados que Inspiran</h1>
    <p>
      Hay legados que no caben en un libro. Historias de individuos, familias o
      empresas cuya visión cambió el mundo que los rodeaba. 1egacy FILMS es
      nuestra casa productora, dedicada a encontrar estas sagas y contarlas con
      la belleza y el rigor cinematográfico que merecen. Producimos documentales
      que no solo registran el pasado, sino que encienden una conversación
      sobre el futuro.
    </p>
  </div>

  <div class="proyectos-section">
    <h2>Proyectos en Desarrollo</h2>

    <div class="proyecto-item">
      <div class="proyecto-info">
        <h3>El Gigante de Acero</h3>
        <p>
          Un largometraje sobre la saga de una familia pionera en la industria
          del acero en Monterrey. Un relato de innovación, riesgo y el carácter
          indomable que forjó una metrópoli. <em>(En fase de investigación)</em>
        </p>
      </div>
      <div class="proyecto-status">
        <span>Largometraje</span>
      </div>
    </div>

    <div class="proyecto-item">
      <div class="proyecto-info">
        <h3>La Viña Prometida</h3>
        <p>
          Una serie documental corta que explora el legado de los inmigrantes
          italianos en el noreste de México, trazando el viaje desde los viñedos
          de Génova hasta las comunidades que fundaron. <em>(En fase de pre-producción)</em>
        </p>
      </div>
      <div class="proyecto-status">
        <span>Serie Documental</span>
      </div>
    </div>
  </div>

  <button>Ver Trailers y Teasers</button>
</div>

<style>
  .films-container {
    padding-top: 120px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
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

  .proyectos-section {
    width: 100%;
    max-width: 900px;
    margin-bottom: 3rem;
  }

  .proyectos-section h2 {
    font-size: 2rem;
    font-weight: 300;
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
  }

  .proyecto-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: 2rem 0;
    border-bottom: 1px solid #333;
    transition: background-color 0.3s ease;
  }

  .proyecto-item:hover {
    background-color: #1a1a1a;
  }

  .proyecto-info h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #e0e0e0;
  }

  .proyecto-info p {
    max-width: 600px;
    line-height: 1.5;
  }

  .proyecto-info em {
    color: #888;
    font-size: 0.9rem;
  }

  .proyecto-status span {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: 1px solid #c0a062;
    color: #c0a062;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8rem;
  }

  /* Reutilizamos el estilo del botón una vez más */
  button {
    background-color: #c0a062;
    color: #121212;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }

  button:hover {
    background-color: #ffffff;
    transform: translateY(-3px);
  }
</style>