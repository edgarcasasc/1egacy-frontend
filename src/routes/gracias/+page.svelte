<script>
    import { onMount } from 'svelte';
    import { cart } from '$lib/stores/cart';
    import { fade } from 'svelte/transition';

    export let data;

    // AL CARGAR: Vaciamos el carrito porque ya pagó
    onMount(() => {
        cart.set([]); // Reset del store
        // Aquí podrías disparar eventos de Analytics (ej. "Purchase")
    });
</script>

<svelte:head>
    <title>Pedido Confirmado | 1egacy</title>
</svelte:head>

<div class="success-container" in:fade>
    <div class="card-exito">
        <div class="icono-check">✨</div>
        
        <h1 class="titulo-serif">Tu Legado Comienza Aquí</h1>
        
        <p class="mensaje-principal">
            Gracias, <span class="text-dorado">{data.customerName}</span>. <br>
            El pago ha sido procesado correctamente.
        </p>

        <div class="detalles-orden">
            <div class="dato">
                <span class="label">ID de Orden:</span>
                <span class="valor">#{data.orderId}</span>
            </div>
            <div class="dato">
                <span class="label">Confirmación enviada a:</span>
                <span class="valor">{data.customerEmail}</span>
            </div>
            <div class="dato">
                <span class="label">Estado:</span>
                <span class="tag-exito">Pagado</span>
            </div>
        </div>

        <p class="nota-footer">
            En breve recibirás un correo con los detalles de tu pedido y los siguientes pasos para acceder a tu Bóveda.
        </p>

        <div class="acciones">
            <a href="/" class="btn-volver">Volver al Inicio</a>
        </div>
    </div>
</div>

<style>
    :global(body) { background-color: #121212; color: #e0e0e0; }

    .success-container {
        min-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
    }

    .card-exito {
        background: #1a1a1a;
        border: 1px solid #333;
        padding: 3rem;
        max-width: 500px;
        width: 100%;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }

    .icono-check { font-size: 4rem; margin-bottom: 1rem; }
    
    .titulo-serif { 
        font-family: 'Palatino Linotype', serif; 
        color: #c0a062; 
        font-size: 2rem; 
        margin-bottom: 1rem; 
    }

    .text-dorado { color: #c0a062; font-weight: bold; }

    .mensaje-principal { color: #ccc; margin-bottom: 2.5rem; font-size: 1.1rem; }

    .detalles-orden {
        background: #111;
        padding: 1.5rem;
        border-radius: 6px;
        border: 1px solid #222;
        margin-bottom: 2rem;
        text-align: left;
    }

    .dato { 
        display: flex; 
        justify-content: space-between; 
        margin-bottom: 10px; 
        font-size: 0.9rem; 
        border-bottom: 1px solid #222;
        padding-bottom: 10px;
    }
    .dato:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

    .label { color: #666; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }
    .valor { color: #fff; font-weight: 500; }

    .tag-exito { 
        background: rgba(76, 175, 80, 0.1); 
        color: #4CAF50; 
        padding: 2px 8px; 
        border-radius: 4px; 
        font-size: 0.75rem; 
        border: 1px solid #4CAF50; 
    }

    .nota-footer { font-size: 0.8rem; color: #555; margin-bottom: 2rem; }

    .btn-volver {
        display: inline-block;
        padding: 12px 30px;
        border: 1px solid #c0a062;
        color: #c0a062;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.8rem;
        transition: all 0.3s;
    }
    .btn-volver:hover { background: #c0a062; color: #000; }
</style>