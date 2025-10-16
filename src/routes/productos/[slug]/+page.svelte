<script>
  import PreorderModal from '$lib/components/PreorderModal.svelte';

  export let data;
  $: product = data.product;

  let imagenActiva = '';
  $: if (product?.gallery?.length > 0) {
    imagenActiva = product.gallery[0];
  }
// --- Lógica para Variantes y Pre-orden ---
  $: tallasUnicas = product?.variants ? [...new Set(product.variants.map(v => v.size).filter(Boolean))] : [];
  $: coloresUnicos = product?.variants ? [...new Set(product.variants.map(v => v.color).filter(Boolean))] : [];
  
  let tallaSeleccionada = '';
  let colorSeleccionado = '';
  let mostrarModal = false;

  async function handlePreOrderSubmit(email) {
    if (!tallaSeleccionada || !colorSeleccionado) {
      alert('Por favor, selecciona una talla y un color.');
      return;
    }

    const preorden = {
      tipo: 'Pre-orden de Producto',
      producto: product.title,
      talla: tallaSeleccionada,
      color: colorSeleccionado,
      email: email
    };

    const apiUrl = 'https://api.somos1egacy.com/capture-lead'; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apellido: product.title, email: email, ...preorden }),
      });
      
      if (response.ok) {
        alert('¡Pre-orden registrada con éxito! Gracias por ser un fundador.');
        mostrarModal = false;
      } else {
        alert('Hubo un error al registrar tu pre-orden.');
      }
    } catch (error) {
      alert('Error de conexión. Inténtalo más tarde.');
      console.error('Error en pre-orden:', error);
    }
  }
</script>

<div class="producto-container">
  {#if product}
    <div class="galeria-columna">
      {#if product.linajeInfo}
        <a href="/origins/{product.linajeInfo.slug}" class="enlace-regresar">
          &larr; Volver al Legado {product.linajeInfo.title}
        </a>
      {/if}
      <div class="imagen-principal">
        {#if imagenActiva}
          <img src={imagenActiva} alt={product.title} />
        {/if}
      </div>
      <div class="thumbnails">
        {#if product.gallery}
          {#each product.gallery as imagen}
            <div class="thumbnail-wrapper" on:click={() => imagenActiva = imagen} on:keydown={() => imagenActiva = imagen} role="button" tabindex="0">
              <img src={imagen} alt="Vista de {product.title}" />
            </div>
          {/each}
        {/if}
      </div>
    </div>

    <div class="detalles-columna">
      <h1>{product.title}</h1>
      <p class="precio">${product.price || 'N/A'} MXN</p>
      <p class="descripcion">{product.description}</p>
      
      <div class="selectores">
        <select bind:value={tallaSeleccionada} aria-label="Talla">
          <option value="" disabled>Elige una Talla</option>
          {#each tallasUnicas as talla} <option value={talla}>{talla}</option> {/each}
        </select>
        <select bind:value={colorSeleccionado} aria-label="Color">
          <option value="" disabled>Elige un Color</option>
          {#each coloresUnicos as color} <option value={color}>{color}</option> {/each}
        </select>
      </div>

      <button class="boton-compra" on:click={() => mostrarModal = true}>Pre-ordenar</button>
    </div>
  {:else}
    <p>Cargando producto...</p>
  {/if}
</div>

{#if mostrarModal}
  <PreorderModal 
    producto={product.title} 
    onCerrar={() => mostrarModal = false}
    onEnviar={handlePreOrderSubmit}
  />
{/if}

<style>
  .producto-container { max-width: 1100px; margin: 0 auto; padding: 120px 2rem 60px 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .enlace-regresar { display: inline-block; margin-bottom: 2rem; color: #aaa; text-decoration: none; font-weight: 600; }
  .enlace-regresar:hover { color: #c0a062; }
  .galeria-columna { position: sticky; top: 120px; }
  .imagen-principal img { width: 100%; height: auto; border-radius: 8px; border: 1px solid #333; }
  .thumbnails { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
  .thumbnail-wrapper { cursor: pointer; border: 2px solid #333; border-radius: 4px; overflow: hidden; transition: border-color 0.3s ease; }
  .thumbnail-wrapper:hover { border-color: #c0a062; }
  .thumbnail-wrapper img { width: 100%; height: auto; display: block; }
  .detalles-columna h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #ffffff; } /* Ajustado h1 */
  .precio { font-size: 1.8rem; font-family: 'Playfair Display', serif; color: #c0a062; margin-bottom: 1.5rem; }
  .descripcion { margin-bottom: 2rem; color: #b0b0b0; }
  .selectores { display: flex; gap: 1rem; margin-bottom: 2rem; }
  select { width: 100%; padding: 0.8rem; background-color: #1a1a1a; border: 1px solid #333; color: #e0e0e0; font-size: 1rem; border-radius: 4px; }
  .boton-compra { width: 100%; background-color: #c0a062; color: #121212; padding: 1.2rem; font-size: 1.1rem; text-transform: uppercase; font-weight: bold; border: none; cursor: pointer; border-radius: 4px; transition: background-color 0.3s ease; }
  .boton-compra:hover { background-color: #ffffff; }
</style>