<style>
  /* :global(body) selecciona el cuerpo de toda la página */
  :global(body) {
    background-color: #121212; /* Un fondo oscuro y elegante */
    color: #e0e0e0; /* Un color de texto casi blanco, fácil de leer */
    font-family: sans-serif; /* Una fuente simple y moderna para empezar */
  }

  /* El 'div' invisible que centrará nuestro contenido */
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh; /* Ocupa toda la altura de la pantalla */
    padding: 2rem; /* Un poco de espacio en los bordes */
  }

  h1 {
    font-size: 3rem; /* Título más grande e impactante */
    font-weight: 300; /* Un peso más ligero, más refinado */
    max-width: 800px; /* Evita que el título sea demasiado ancho en pantallas grandes */
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    max-width: 600px; /* El párrafo es un poco más estrecho */
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  button {
    background-color: #c0a062; /* Un color dorado/bronce, evocando lujo */
    color: #121212; /* Texto oscuro para contraste */
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease; /* Una transición suave para el efecto hover */
  }

  /* Efecto al pasar el mouse sobre el botón */
  button:hover {
    background-color: #ffffff;
    transform: translateY(-3px); /* El botón se eleva un poco */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
</style>

<div>
  <h1>Tu apellido no es el final de tu historia. Es el comienzo de tu legado.</h1>
  <p>
    En 1egacy, desenterramos la historia de tus ancestros, la decodificamos y la
    transformamos en arte. Porque tu identidad es un tesoro y tu legado, la
    herencia más valiosa. Contamos las historias que merecen ser recordadas.
  </p>
  <button>Descubre tu Origen</button>
</div>

