<script>
  // 1. Lógica de Datos (La misma que ya funciona)
  export let value = undefined;        
  export let portableText = undefined; 
  export let block = undefined;        

  $: finalData = value || portableText?.value || portableText || block || {};
  $: rows = finalData.rows || [];
</script>

{#if rows.length > 0}
  <div class="table-container">
    <div class="scroll-wrapper">
      <table class="legacy-table">
        <tbody>
          {#each rows as row, rowIndex}
            <tr class={rowIndex === 0 ? 'header-row' : 'body-row'}>
              
              {#each row.cells as cell}
                <td>{cell}</td>
              {/each}

            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <div class="table-footer-line"></div>
  </div>
{/if}

<style>
  /* --- CONTENEDOR PRINCIPAL --- */
  .table-container {
    margin: 3rem 0; /* Espacio vertical */
    width: 100%;
    background-color: #0a0a0a; /* Fondo casi negro */
    border: 1px solid #222; /* Borde sutil exterior */
    border-radius: 6px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Sombra elegante */
    overflow: hidden; /* Para redondear esquinas */
  }

  /* --- WRAPPER PARA SCROLL EN MÓVIL --- */
  .scroll-wrapper {
    width: 100%;
    overflow-x: auto; /* Scroll horizontal si no cabe */
  }

  /* --- TABLA BASE --- */
  .legacy-table {
    width: 100%;
    border-collapse: collapse; /* Quita espacios entre celdas */
    min-width: 600px; /* Ancho mínimo para que no se apriete en móviles */
    font-family: inherit; /* Hereda la fuente del sitio */
  }

  /* --- CELDAS GENERALES --- */
  td {
    padding: 1.2rem;
    text-align: left;
    vertical-align: top;
    line-height: 1.5;
  }

  /* --- ESTILOS DE ENCABEZADO (FILA 0) --- */
  .header-row td {
    background-color: #c0a062; /* Tu color DORADO 1egacy */
    color: #121212; /* Texto oscuro para contraste */
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    border-right: 1px solid #a3864d; /* Separador dorado más oscuro */
  }

  .header-row td:last-child {
    border-right: none;
  }

  /* --- ESTILOS DEL CUERPO --- */
  .body-row td {
    color: #e0e0e0; /* Texto gris claro */
    font-size: 0.95rem;
    border-bottom: 1px solid #222; /* Líneas horizontales sutiles */
    border-right: 1px solid #222;  /* Líneas verticales sutiles */
  }

  .body-row td:last-child {
    border-right: none;
  }

  .body-row:last-child td {
    border-bottom: none; /* Quitar borde a la última fila */
  }

  /* Efecto Hover (Al pasar el mouse) */
  .body-row:hover {
    background-color: rgba(255, 255, 255, 0.03); /* Iluminación muy sutil */
    transition: background-color 0.2s ease;
  }

  /* --- PIE DECORATIVO --- */
  .table-footer-line {
    height: 2px;
    width: 100%;
    /* Gradiente dorado sutil */
    background: linear-gradient(90deg, #0a0a0a 0%, #c0a062 50%, #0a0a0a 100%);
    opacity: 0.4;
  }
</style>