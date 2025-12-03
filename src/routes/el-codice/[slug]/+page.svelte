<script>
  import { addToCart } from '$lib/stores/cart';
  import { fade } from 'svelte/transition';

  export let data;
  const { product } = data; // Tu producto cargado desde Sanity

  // --- ESTADO LOCAL ---
  let selectedOption = 'standard'; // 'standard' o 'bespoke'

  // --- IMAGEN DINÁMICA ---
  // Si es estándar: Usa la imagen del producto (Escudo Casas).
  // Si es bespoke: Usa la imagen genérica de "Armado/Boceto".
  $: currentImage = selectedOption === 'standard' 
      ? product.mainImageUrl 
      : '/blueprint-generico.jpg'; // <--- OJO: Pon tu imagen real aquí en la carpeta static

  // --- PRECIO DINÁMICO (Opcional) ---
  // Si el bespoke es más caro, ajusta el multiplicador o usa un campo de Sanity
  $: currentPrice = selectedOption === 'standard' 
      ? product.price 
      : product.price * 1.5; // Ejemplo: Bespoke cuesta 50% más

  // --- FUNCIÓN AGREGAR ---
  function handleAddToCart() {
    addToCart({
        ...product,
        price: currentPrice, // Mandamos el precio actualizado
        selectedOption: selectedOption, // Guardamos qué eligió
        imageToDisplay: currentImage // Para mostrar la correcta en el carrito
    });
  }
</script>

<div class="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
  <div class="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-stone-200 grid grid-cols-1 lg:grid-cols-2">
    
    <div class="relative bg-stone-100 h-[500px] lg:h-auto flex items-center justify-center p-8 overflow-hidden group">
      
      {#key currentImage}
        <img 
          src={currentImage} 
          alt={product.title} 
          in:fade={{ duration: 300 }}
          class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      {/key}

      <div class="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded text-xs font-bold tracking-widest uppercase shadow-sm">
        {selectedOption === 'standard' ? 'Diseño Final' : 'Boceto de Artesano'}
      </div>
    </div>

    <div class="p-10 lg:p-16 flex flex-col justify-center">
      
      <h1 class="text-4xl font-serif font-bold text-stone-900 mb-2">
        {product.title}
      </h1>
      <p class="text-sm text-stone-500 uppercase tracking-wide mb-6">
        Linaje {product.linajeInfo?.title || 'Exclusivo'}
      </p>

      <div class="mb-8 text-stone-600 leading-relaxed">
        {product.description || 'Una pieza de historia forjada para perdurar.'}
      </div>

      <div class="space-y-4 mb-10">
        <label class="text-sm font-bold text-stone-900 uppercase tracking-wider">
          Selecciona tu Acabado:
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <button 
            class="relative border-2 rounded-lg p-4 text-left transition-all duration-300
            {selectedOption === 'standard' 
              ? 'border-[#C0A062] bg-[#FDFBF5]' 
              : 'border-stone-200 hover:border-stone-300'}"
            on:click={() => selectedOption = 'standard'}
          >
            <div class="font-bold text-stone-900">Versión Clásica</div>
            <div class="text-xs text-stone-500 mt-1">Escudo oficial del linaje.</div>
            {#if selectedOption === 'standard'}
              <div class="absolute top-2 right-2 text-[#C0A062]">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              </div>
            {/if}
          </button>

          <button 
            class="relative border-2 rounded-lg p-4 text-left transition-all duration-300
            {selectedOption === 'bespoke' 
              ? 'border-[#C0A062] bg-[#FDFBF5]' 
              : 'border-stone-200 hover:border-stone-300'}"
            on:click={() => selectedOption = 'bespoke'}
          >
            <div class="font-bold text-stone-900">A la Medida</div>
            <div class="text-xs text-stone-500 mt-1">Rediseño único y artesanal.</div>
            {#if selectedOption === 'bespoke'}
              <div class="absolute top-2 right-2 text-[#C0A062]">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              </div>
            {/if}
          </button>

        </div>
      </div>

      <div class="flex items-center justify-between border-t border-stone-200 pt-8">
        <div>
          <span class="block text-xs text-stone-500">Precio Total</span>
          <span class="text-3xl font-bold text-stone-900">
            ${currentPrice.toLocaleString('es-MX')}
          </span>
        </div>
        <button 
          on:click={handleAddToCart}
          class="bg-stone-900 text-white py-4 px-8 rounded-lg hover:bg-[#C0A062] transition-colors duration-300 font-medium shadow-lg transform active:scale-95"
        >
          Agregar al Legado
        </button>
      </div>

    </div>
  </div>
</div>