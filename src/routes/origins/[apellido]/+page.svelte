<script>
	// 'data' es el objeto que nos llega desde +page.server.js
	export let data;
	const { linaje } = data;

	// ESTADO PARA EL TEXTO COLAPSABLE DEL ESCUDO
	let mostrarDetallesEscudo = false;
	
	// Usamos una función para alternar la visibilidad
	function toggleEscudoDetails() {
		mostrarDetallesEscudo = !mostrarDetallesEscudo;
	}
	
	// Lógica reactiva para imágenes y variantes (base)
	let imagenActiva = '';
	$: if (linaje?.gallery?.length > 0) {
		imagenActiva = linaje.gallery[0];
	}
	$: tallasUnicas = linaje?.variants ? [...new Set(linaje.variants.map(v => v.size).filter(Boolean))] : [];
	$: coloresUnicos = linaje?.variants ? [...new Set(linaje.variants.map(v => v.color).filter(Boolean))] : [];
	
	let tallaSeleccionada = '';
	let colorSeleccionado = '';

</script>

<svelte:head>
 <title>{linaje?.title || 'Linaje'} | 1egacy</title>
  <!-- Aquí iría tu Schema.org/Article o lo que aplique -->
</svelte:head>

<div class="linaje-container">
{#if linaje}
 <div class="linaje-header">
 <h1 class="apellido-titulo">{linaje.title}</h1>
 </div>

 <div class="linaje-contenido">
  <!-- COLUMNA DEL ESCUDO (Order 1 en móvil) -->
 <div class="escudo-columna">
  {#if linaje.escudoUrl}
  <div class="escudo-wrapper">
   <img src={linaje.escudoUrl} alt="Escudo de Armas de {linaje.title}" />
  </div>
  {/if}
   
    <!-- INICIO: TEXTO DEL ESCUDO COLAPSABLE -->
    {#if linaje.descripcionEscudo}
      <div
        class="escudo-descripcion-wrapper"
        class:expanded={mostrarDetallesEscudo}
        id="escudo-details"
      >
        <!-- Mostrar el texto del escudo -->
        <p>{linaje.descripcionEscudo}</p>
      </div>
     
      <!-- Botón para alternar la visibilidad -->
      <button
        class="boton-toggle-escudo"
        on:click={toggleEscudoDetails}
        aria-expanded={mostrarDetallesEscudo}
        aria-controls="escudo-details"
      >
        {#if mostrarDetallesEscudo}
          Ver Menos Info del Escudo &uarr;
        {:else}
          Ver Más Info del Escudo &darr;
        {/if}
      </button>
    {/if}
    <!-- FIN: TEXTO DEL ESCUDO COLAPSABLE -->


    {#if linaje.productos && linaje.productos.length > 0}
     <!-- Enlace estilizado como botón, con texto actualizado -->
     <a href="/productos/{linaje.productos[0].slug}" class="boton-compra">
       Adquirir Artículos del Legado
     </a>
    {:else}
     <!-- Botón deshabilitado con texto actualizado -->
     <button class="boton-compra" disabled>Productos Próximamente</button>
    {/if} 
  </div>

 <!-- COLUMNA DE ARTÍCULOS (El Códice de Garza) (Order 2 en móvil) -->
 <div class="articulos-columna">
  <h3>El Códice de {linaje.title}</h3>
    <!-- Contenedor para el nuevo layout de cuadrícula -->
    <div class="articulos-grid"> 
        {#if linaje.articulosRelacionados && linaje.articulosRelacionados.length > 0}
         {#each linaje.articulosRelacionados as articulo}
             <a href="/blog/{articulo.slug}" class="articulo-card">
                    <!-- CONTENIDO DE LA TARJETA EN COLUMNA -->
                 <div class="articulo-imagen-wrapper">
                      <img src={articulo.mainImageUrl} alt="Imagen para {articulo.title}" />
                    </div>
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
 </div>
{/if}
</div>

<style>
/* --- ESTILOS GENERALES Y BOTONES --- */
.boton-compra:disabled {
background-color: #333;
color: #666;
cursor: not-allowed;
}
/* --- ESTILOS DEL BOTÓN DE COMPRA CORREGIDOS --- */
.boton-compra {
    background-color: #c0a062;
    color: #121212 !important; /* Fuerza el color negro del texto */
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.3s ease;
    width: 100%;
    /* Estilos de bloque para enlaces (<a>) y botones (<button>) */
    text-decoration: none; 
    display: block; 
    text-align: center; 
    border-radius: 4px; 
}
.boton-compra:hover {
  background-color: #ffffff;
}
/* --- FIN ESTILOS DEL BOTÓN DE COMPRA CORREGIDOS --- */


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

/* --- LAYOUT ORIGINAL (GRID) --- */
.linaje-contenido {
 display: grid;
 grid-template-columns: 1fr 2fr; /* Escritorio: 1/3 Escudo, 2/3 Códice */
 gap: 4rem;
 align-items: start;
}
/* --- FIN LAYOUT ORIGINAL --- */


/* --- ESTILOS DE LA COLUMNA IZQUIERDA (ESCUDO) --- */
.escudo-columna {
 display: flex;
 flex-direction: column;
 align-items: center;
 position: sticky;
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


/* --- ESTILOS DEL TEXTO DEL ESCUDO Y FUNCIONALIDAD COLAPSABLE --- */
.escudo-descripcion-wrapper {
  /* Altura MÁXIMA por defecto en móvil para evitar que se desborde al inicio */
  max-height: 250px;
  overflow: hidden;
  margin-bottom: 0.5rem; /* Más pequeño para que esté cerca del botón */
  padding: 0 1rem;
  transition: max-height 0.5s ease-in-out;
}

/* Estado Expandido */
.escudo-descripcion-wrapper.expanded {
  max-height: 2000px; /* Suficiente para mostrar todo */
}

.escudo-columna p {
  font-style: italic;
  color: #aaa;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 0; /* Lo gestiona el wrapper */
  font-size: 0.9rem;
}

.boton-toggle-escudo {
  background: none;
  border: none;
  color: #c0a062;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  transition: color 0.2s;
}
.boton-toggle-escudo:hover {
  color: #ffffff;
}

/* --- ADAPTACIÓN MÓVIL CRÍTICA --- */
@media (min-width: 769px) {
  /* Escritorio: Quitar la restricción de altura */
  .escudo-descripcion-wrapper {
    max-height: none;
  }
  /* Escritorio: Ocultar el botón de toggle */
  .boton-toggle-escudo {
    display: none;
  }
}

@media (max-width: 768px) {
  /* Móvil: Cambiar a columna única */
  .linaje-contenido {
    grid-template-columns: 1fr;
  }
  /* MÓVIL: ESCUDO ARRIBA (ORDER: 1) y CÓDICE ABAJO (ORDER: 2) */
  .escudo-columna {
    order: 1; /* ESCUDO ES LO PRIMERO */
    position: static; /* Quitar sticky en móvil */
    margin-top: 2rem;
  }
  .articulos-columna {
    order: 2; /* CÓDICE ES LO SEGUNDO */
    text-align: center;
  }
}


/* --- ESTILOS DE LA COLUMNA DERECHA (ARTÍCULOS) --- */
/* 1. LAYOUT DE COLUMNA PARA LA TARJETA */
.articulos-columna h3 {
 font-size: 2rem;
 font-weight: 700;
 border-bottom: 1px solid #333;
 padding-bottom: 1rem;
 margin-bottom: 2rem;
}

/* Contenedor de Artículos: Grid de 2 columnas en escritorio */
.articulos-grid { 
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

/* La tarjeta individual */
.articulo-card {
    display: flex;
    flex-direction: column; /* IMAGEN ARRIBA, TEXTO ABAJO */
    text-decoration: none;
    color: #e0e0e0;
    transition: background-color 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
    background-color: #1a1a1a; /* Fondo para que se vea como tarjeta */
    border: 1px solid #333;
}

.articulo-card:hover {
 background-color: #222;
}

/* Contenedor de Imagen: Forzar Aspect Ratio */
.articulo-imagen-wrapper {
    width: 100%;
    /* Aspect ratio: 16:9 es más cinematográfico que 1:1 */
    aspect-ratio: 16 / 9; 
    overflow: hidden; /* Asegura que la imagen no se salga */
}

.articulo-card img {
    /* La imagen debe cubrir el wrapper sin deformarse */
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 0; /* Quitamos el radio de la imagen para que sea uniforme con el wrapper */
}

/* Contenedor de Texto */
.articulo-info {
    padding: 1rem;
    flex-grow: 1; /* Permite que ocupe el espacio para alinear botones */
    text-align: left; /* Asegurar que el texto esté alineado a la izquierda */
}


.articulo-card h4 {
 font-size: 1.2rem;
 font-weight: 600;
 margin: 0 0 0.5rem 0;
}

.articulo-card span {
 color: #c0a062;
 font-weight: bold;
 /* Añadir margen superior para separar del texto largo */
 display: block; 
  margin-top: 0.5rem;
}
/* --- FIN ESTILOS DE LA COLUMNA DERECHA --- */

/* Ajuste Responsivo para la Columna de Artículos en Móvil */
@media (max-width: 768px) {
    .articulos-columna {
        /* Deshacer el text-align: center que pusimos al contenedor en el media query principal */
        text-align: left; 
    }
    .articulos-grid {
        grid-template-columns: 1fr; /* Una sola columna en móvil */
    }
}
</style>
