<div class="studio-container">
  <div class="manifesto">
    <h1>El Legado Materializado</h1>
    <p>
      Una historia no contada es solo un eco. En 1egacy STUDIO, tomamos las
      investigaciones de ORIGINS y las convertimos en obras de arte tangibles.
      Somos un taller creativo donde historiadores, diseñadores y artesanos
      colaboran para forjar piezas que encapsulan la esencia de un linaje. Cada
      objeto que creamos es un tótem: un ancla física a tu pasado y un faro para
      las generaciones futuras.
    </p>
  </div>

  <div class="productos-grid">
    <div class="producto-card">
      <h3>El Códice del Legado</h3>
      <p>
        El alma de tu historia familiar, encuadernada. Un libro de archivo de
        calidad museística que narra la saga de tu linaje, ilustrado con mapas,
        árboles genealógicos y el escudo heráldico rediseñado.
      </p>
      <button>Ver Detalles del Códice</button>
    </div>

    <div class="producto-card">
      <h3>Piezas de Legado Físico</h3>
      <p>
        Desde el escudo de tu apellido forjado en acero hasta playeras con
        bordados heráldicos de alta definición. Creamos objetos de uso diario o
        decorativo que portan con orgullo el símbolo de tu linaje.
      </p>
      <button>Explorar Colección</button>
    </div>

    <div class="producto-card">
      <h3>Proyectos Especiales y Corporativos</h3>
      <p>
        Para familias o empresas que buscan inmortalizar su historia. Producimos
        archivos digitales, documentales cortos o instalaciones que preservan un
        legado para futuras generaciones.
      </p>
      <button>Cotizar un Proyecto</button>
    </div>
  </div>
</div>

<style>
  .studio-container {
    padding-top: 120px; /* Mantenemos el mismo padding para consistencia */
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

  .productos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columnas, igual que en Origins */
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    padding: 0 2rem;
  }

  .producto-card {
    background-color: #1a1a1a;
    padding: 2rem;
    border: 1px solid #333;
    text-align: center;
    transition: all 0.3s ease;
  }

  .producto-card:hover {
    transform: translateY(-10px);
    border-color: #c0a062;
  }

  .producto-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #c0a062;
  }

  .producto-card p {
    margin-bottom: 2rem;
  }

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