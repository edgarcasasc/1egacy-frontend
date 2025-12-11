<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
import { cart } from '$lib/stores/cart';
  import { fade, fly } from 'svelte/transition';
  

  let sessionId = '';
  let loading = true;

  onMount(() => {
    // 1. Obtener el ID de la sesión de la URL
    sessionId = $page.url.searchParams.get('session_id');
    
    // 2. Limpiar el carrito (porque ya compró)
    if (sessionId) {
      cart.set([]); 
      loading = false;
    }
  });
</script>

<div class="success-container">
  {#if loading}
    <p class="loading-text">Verificando tu legado...</p>
  {:else}
    <div class="card" in:fly={{ y: 50, duration: 1000 }}>
      <div class="icon-wrapper">
        <span class="check-icon">✨</span>
      </div>
      
      <h1 class="title-serif text-dorado">Bienvenido al Legado</h1>
      <p class="subtitle">Tu orden ha sido confirmada con éxito.</p>
      
      <div class="order-info">
        <p class="text-sm text-gray-400">ID de Referencia:</p>
        <code class="order-id">{sessionId.slice(0, 10)}...</code>
      </div>

      <p class="message">
        Hemos enviado un correo de confirmación con los detalles.
        Tu historia comienza ahora.
      </p>

      <div class="actions">
        <a href="/" class="boton-accion">Volver al Inicio</a>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(body) { background-color: #0a0a0a; color: #e0e0e0; }

  .success-container {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
  }

  .card {
    background: #111;
    border: 1px solid #333;
    padding: 3rem 2rem;
    border-radius: 12px;
    text-align: center;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    border-top: 4px solid #c0a062;
  }

  .icon-wrapper {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  .title-serif {
    font-family: "Palatino Linotype", serif;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .text-dorado { color: #c0a062; }
  .subtitle { color: #aaa; margin-bottom: 2rem; font-size: 1.1rem; }

  .order-info {
    background: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 2rem;
    border: 1px dashed #444;
  }

  .order-id {
    color: #fff;
    font-family: monospace;
    font-size: 1.1rem;
    display: block;
    margin-top: 0.25rem;
  }

  .message {
    color: #888;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
  }

  .boton-accion {
    display: inline-block;
    background: #c0a062;
    color: #000;
    padding: 14px 30px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: 0.3s;
    width: 100%;
  }

  .boton-accion:hover {
    background: #fff;
    transform: translateY(-2px);
  }

  @keyframes pop {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
</style>