<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let data;

    onMount(() => {
        // Después de 2.5 segundos, lo devolvemos a su linaje automáticamente
        setTimeout(() => {
            if (data?.redirectUrl) {
                window.location.href = data.redirectUrl; // Fuerzo recarga para enviar la nueva Cookie de auth
            } else {
                window.location.href = '/';
            }
        }, 2500);
    });
</script>

<svelte:head>
    <title>Verificando Legado | 1egacy</title>
</svelte:head>

<div class="verify-container">
    <div class="verify-box">
        {#if data.success}
            <div class="icon status-success">✨</div>
            <h1>Identidad Confirmada</h1>
            <p>Se ha validado tu correo exitosamente.</p>
            <p class="subtitle">Desbloqueando el Códice del servidor oficial...</p>
        {:else}
            <div class="icon status-error">❌</div>
            <h1>Enlace Expirado</h1>
            <p>Este enlace mágico es inválido o ya fue utilizado anteriormente.</p>
            <p class="subtitle">Redirigiéndote para solicitar uno nuevo...</p>
        {/if}

        <div class="spinner-container">
            <div class="gold-spinner"></div>
        </div>
    </div>
</div>

<style>
    .verify-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80vh;
        font-family: 'Source Sans 3', sans-serif;
        color: #e0e0e0;
    }

    .verify-box {
        text-align: center;
        background: #111;
        border: 1px solid #333;
        padding: 40px;
        border-radius: 12px;
        max-width: 450px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    }

    h1 {
        font-family: 'Palatino Linotype', serif;
        color: #c0a062;
        margin-bottom: 0.5rem;
    }

    .subtitle {
        color: #888;
        font-size: 0.9rem;
        margin-top: 20px;
    }

    .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .spinner-container {
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }

    .gold-spinner {
        width: 30px;
        height: 30px;
        border: 3px solid rgba(212,175,55,0.2);
        border-top-color: #d4af37;
        border-radius: 50%;
        animation: spin 1s infinite linear;
    }

    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
</style>
