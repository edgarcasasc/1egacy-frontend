<script>
  // 'data' es el objeto que nos llega desde +page.server.js
  // y contiene la información del 'linaje' que pedimos a Sanity.
  export let data;
  const { linaje } = data;
</script>

<div class="linaje-container">
  {#if linaje}
    <div class="linaje-header">
      <h1 class="apellido-titulo">{linaje.title}</h1>
    </div>

    <div class="linaje-contenido">
      <div class="escudo-columna">
        {#if linaje.escudoUrl}
          <div class="escudo-wrapper">
            <img src={linaje.escudoUrl} alt="Escudo de Armas de {linaje.title}" />
          </div>
        {/if}
        <p>{linaje.descripcionEscudo}</p>
{#if linaje.productos && linaje.productos.length > 0}
  <a href="/productos/{linaje.productos[0].slug}" class="boton-compra">
    Adquirir Playera del Legado
  </a>
{:else}
  <button class="boton-compra" disabled>Productos Próximamente</button>
{/if}      </div>

      <div class="articulos-columna">
        <h3>El Códice de {linaje.title}</h3>
        {#if linaje.articulosRelacionados && linaje.articulosRelacionados.length > 0}
          {#each linaje.articulosRelacionados as articulo}
            <a href="/blog/{articulo.slug}" class="articulo-card">
              <img src={articulo.mainImageUrl} alt="Imagen para {articulo.title}" />
              <div class="articulo-info">
                <h4>{articulo.title}</h4>
                <span>Leer más &rarr;</span>
              </div>
            </a>
          {/each}
        {:else}
          <p>No hay artículos relacionados por el momento.</p>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
.boton-compra:disabled {
  background-color: #333;
  color: #666;
  cursor: not-allowed;
}
  .linaje-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 120px 2rem 60px 2rem;
  }

  .apellido-titulo {
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    color: #c0a062;
    margin-bottom: 3rem;
    text-transform: capitalize;
  }

  .linaje-contenido {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    align-items: start;
  }

  .escudo-columna {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky; /* Hacemos que la columna del escudo se quede fija al hacer scroll */
    top: 120px;
  }
  
  .escudo-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    border-radius: 50%;
  }

  .escudo-wrapper img {
    width: 100%;
    max-width: 300px; /* Tamaño ajustado */
    height: auto;
    border: 1px solid #333;
    margin-bottom: 1.5rem;
    border-radius: 50%; /* Aseguramos que la imagen también sea redonda */
  }

  .escudo-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: -85%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
    transform: skewX(-25deg);
    transition: left 0.8s;
  }

  .escudo-wrapper:hover::before {
    left: 120%;
  }

  .escudo-columna p {
    font-style: italic;
    color: #aaa;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  .boton-compra {
    background-color: #c0a062;
    color: #121212;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.3s ease;
    width: 100%;
  }
  .boton-compra:hover {
    background-color: #ffffff;
  }

  .articulos-columna h3 {
    font-size: 2rem;
    font-weight: 700;
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  .articulo-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-decoration: none;
    color: #e0e0e0;
    margin-bottom: 1.5rem;
    transition: background-color 0.3s ease;
    padding: 1rem;
    border-radius: 4px;
  }

  .articulo-card:hover {
    background-color: #1a1a1a;
  }

  .articulo-card img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }

  .articulo-card h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  .articulo-card span {
    color: #c0a062;
    font-weight: bold;
  }
</style>