<script>
    import { cart, removeFromCart, cartTotal } from '$lib/stores/cart';
    import PayPalButton from '$lib/components/PayPalButton.svelte';
    import { fade, slide } from 'svelte/transition';

    // --- 1. ESTADO DEL CLIENTE Y ENVÍO ---
    let contactInfo = {
        email: '',
        phone: '',
        shippingZone: 'mty' // por defecto MTY (Gratis)
    };

    let acceptedTerms = false; // <--- NUEVO: Estado de la casilla
    let shippingCost = 0;
    let isLoading = false;

    // --- 2. LÓGICA DE COSTOS ---
    $: if (contactInfo.shippingZone === 'nacional') {
        shippingCost = 180;
    } else {
        shippingCost = 0;
    }

    $: totalFinal = $cartTotal + shippingCost;

    // --- 3. LÓGICA DE TIEMPOS ---
    $: hasBespokeItems = $cart.some(item => item.customizationLevel === 'bespoke');
    $: productionTimeMsg = hasBespokeItems 
        ? "Tiempo de Arte y Producción: 10-15 días hábiles" 
        : "Tiempo de Preparación: 24-48 horas hábiles";

    function getImage(item) {
        return item.imageToDisplay || item.mainImageUrl || item.image || null;
    }

    // --- 4. PROCESO DE PAGO (STRIPE) ---
    async function handleStripeCheckout() {
        // Validaciones
        if (!acceptedTerms) {
            alert("Por favor acepta los términos y condiciones para continuar.");
            return;
        }
        if (!contactInfo.email || !contactInfo.phone) {
            alert("Por favor completa tu correo y teléfono.");
            return;
        }

        isLoading = true;
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({
                    items: $cart,
                    customerInfo: contactInfo,
                    shippingTotal: shippingCost 
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Error:', data);
                alert('Hubo un problema iniciando el pago. Intenta de nuevo.');
                isLoading = false;
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión.');
            isLoading = false;
        }
    }
</script>

<svelte:head>
    <title>Tu Selección | 1egacy</title>
</svelte:head>

<div class="cart-page-container">
    
    <div class="cart-header">
        <h1 class="title-serif text-dorado">Tu Bóveda de Selección</h1>
        <div class="divider"></div>
    </div>

    {#if $cart.length === 0}
        <div class="empty-state" in:fade>
            <div class="empty-icon">📜</div>
            <p>Tu historia aún espera ser escrita.</p>
            <a href="/productos" class="boton-accion" style="max-width: 300px; margin: 0 auto;">Explorar Colección</a>
        </div>
    {:else}
        <div class="cart-layout">
            
            <div class="cart-items-list">
                {#each $cart as item (item.id + item.customizationLevel + item.selectedSize)}
                    <div class="cart-item-card" transition:slide|local>
                        <div class="item-image">
                            {#if getImage(item)}
                                <img src={getImage(item)} alt={item.title} />
                            {:else}
                                <div class="placeholder">Sin Imagen</div>
                            {/if}
                            {#if item.customizationLevel === 'bespoke'}
                                <span class="badge-bespoke">Bespoke</span>
                            {/if}
                        </div>

                        <div class="item-details">
                            <div class="item-header">
                                <h3 class="title-serif item-title">{item.title}</h3>
                                <span class="item-price">${(item.price * item.quantity).toLocaleString('es-MX')}</span>
                            </div>
                            <div class="item-meta">
                                <span class="tag">{item.productType === 'digital' ? 'Digital' : 'Físico'}</span>
                                {#if item.selectedSize} <span class="tag">Talla: {item.selectedSize}</span> {/if}
                                {#if item.selectedColor} <span class="tag">{item.selectedColor}</span> {/if}
                            </div>
                            <div class="item-actions">
                                <span class="qty">Cant: {item.quantity}</span>
                                <button class="btn-remove" on:click={() => removeFromCart(item.id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="cart-summary-wrapper">
                <div class="cart-summary">
                    <h3 class="title-serif summary-title">Datos de Entrega</h3>
                    
                    <div class="form-group">
                        <label>Correo Electrónico</label>
                        <input type="email" bind:value={contactInfo.email} placeholder="tu@email.com" class="input-dark">
                    </div>
                    
                    <div class="form-group">
                        <label>Teléfono / WhatsApp</label>
                        <input type="tel" bind:value={contactInfo.phone} placeholder="81..." class="input-dark">
                    </div>

                    <div class="form-group">
                        <label>Zona de Envío</label>
                        <div class="radio-group">
                            <label class="radio-option {contactInfo.shippingZone === 'mty' ? 'selected' : ''}">
                                <input type="radio" bind:group={contactInfo.shippingZone} value="mty">
                                <div>
                                    <span class="block font-bold">Monterrey (Local)</span>
                                    <span class="text-xs text-gray-500">Entrega 1-2 días hábiles</span>
                                </div>
                                <span class="price-tag">Gratis</span>
                            </label>
                            
                            <label class="radio-option {contactInfo.shippingZone === 'nacional' ? 'selected' : ''}">
                                <input type="radio" bind:group={contactInfo.shippingZone} value="nacional">
                                <div>
                                    <span class="block font-bold">Resto de México</span>
                                    <span class="text-xs text-gray-500">Envío 3-5 días hábiles</span>
                                </div>
                                <span class="price-tag">+$180</span>
                            </label>
                        </div>
                    </div>

                    <div class="time-notice {hasBespokeItems ? 'bespoke-time' : 'standard-time'}">
                        <div class="icon-time">⏱️</div>
                        <div class="text-time">
                            <strong>Estimación de Entrega:</strong>
                            <p class="mb-0 text-sm">{productionTimeMsg}</p>
                            <p class="small-shipping text-xs opacity-70">+ Tiempo de paquetería seleccionado</p>
                        </div>
                    </div>

                    <div class="divider-thin"></div>

                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${$cartTotal.toLocaleString('es-MX')}</span>
                    </div>
                    <div class="summary-row">
                        <span>Envío</span>
                        <span>${shippingCost.toLocaleString('es-MX')}</span>
                    </div>
                    <div class="summary-total">
                        <span>Total Final</span>
                        <span class="text-dorado">${totalFinal.toLocaleString('es-MX')}</span>
                    </div>

                    <div class="terms-box">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" bind:checked={acceptedTerms} class="mt-1 accent-[#c0a062]">
                            <span class="text-xs text-gray-400">
                                He leído y acepto los <a href="/terminos" target="_blank" class="underline hover:text-[#c0a062]">Términos y Condiciones</a> y la <a href="/privacidad" target="_blank" class="underline hover:text-[#c0a062]">Política de Privacidad</a>.
                            </span>
                        </label>
                    </div>

                    <button 
                        class="boton-accion full-width" 
                        on:click={handleStripeCheckout}
                        disabled={isLoading || !contactInfo.email || !contactInfo.phone || !acceptedTerms}
                        style={isLoading || !acceptedTerms ? 'opacity: 0.5; cursor: not-allowed;' : ''}
                    >
                        {#if isLoading} Procesando... {:else} Pagar con Tarjeta {/if}
                    </button>
                    
                    <div class="or-divider"><span>O PAGAR CON</span></div>

                    <div class="paypal-box { !acceptedTerms ? 'disabled-payment' : '' }">
                        <PayPalButton amount={totalFinal} customerInfo={contactInfo} />
                    </div>    
                    
                    {#if !acceptedTerms}
                        <p class="text-xs text-center text-red-400 mt-2">
                            * Debes aceptar los términos para habilitar el pago.
                        </p>
                    {/if}

                    <p class="security-note">🔒 Pago encriptado SSL. Garantía 1egacy.</p>
                </div>
            </div>

        </div>
    {/if}
</div>

<style>
    /* --- ESTILOS GLOBALES --- */
    :global(body) { background-color: #121212; color: #e0e0e0; }
    :global(.paypal-button-container label) { color: #333 !important; }

    .cart-page-container { max-width: 1200px; margin: 0 auto; padding: 140px 2rem 80px; min-height: 80vh; }
    .title-serif { font-family: "Palatino Linotype", serif; font-weight: 400; }
    .text-dorado { color: #c0a062; }
    
    .cart-header { text-align: center; margin-bottom: 40px; }
    .cart-header h1 { font-size: 2.5rem; margin: 0 0 10px 0; }
    .cart-header .divider { height: 2px; width: 60px; background-color: #c0a062; margin: 0 auto; }

    .cart-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; align-items: start; }
    .cart-items-list { display: flex; flex-direction: column; gap: 15px; }
    .cart-item-card { background-color: #1a1a1a; border: 1px solid #333; border-radius: 6px; padding: 15px; display: flex; gap: 15px; }
    
    .item-image { width: 80px; height: 80px; background: #000; border-radius: 4px; overflow: hidden; flex-shrink: 0; position: relative; border: 1px solid #333; }
    .item-image img { width: 100%; height: 100%; object-fit: cover; }
    .badge-bespoke { position: absolute; bottom: 0; width: 100%; background: #c0a062; color: #000; font-size: 0.5rem; text-align: center; font-weight: bold; padding: 2px 0; text-transform: uppercase; }
    
    .item-details { flex-grow: 1; }
    .item-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
    .item-title { font-size: 1rem; margin: 0; color: #fff; }
    .item-price { color: #c0a062; font-weight: bold; }
    .tag { background: #333; font-size: 0.7rem; padding: 2px 6px; border-radius: 3px; color: #aaa; margin-right: 5px; border: 1px solid #444; }
    .btn-remove { background: none; border: none; color: #666; font-size: 0.75rem; text-decoration: underline; cursor: pointer; margin-top: 5px; }
    .btn-remove:hover { color: #ff4444; }

    .cart-summary { background-color: #1a1a1a; padding: 25px; border-radius: 8px; border: 1px solid #333; border-top: 3px solid #c0a062; position: sticky; top: 100px; }
    .summary-title { font-size: 1.3rem; margin-bottom: 20px; color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px; }
    
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; font-size: 0.75rem; color: #aaa; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
    .input-dark { width: 100%; background: #111; border: 1px solid #444; color: #fff; padding: 10px; border-radius: 4px; outline: none; font-size: 0.9rem; transition: border-color 0.3s; }
    .input-dark:focus { border-color: #c0a062; }

    .radio-group { display: flex; flex-direction: column; gap: 8px; }
    .radio-option { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #444; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
    .radio-option:hover { background: #222; }
    .radio-option.selected { border-color: #c0a062; background: rgba(192, 160, 98, 0.08); }
    .radio-option input { margin-right: 12px; accent-color: #c0a062; }
    .price-tag { font-weight: bold; color: #c0a062; font-size: 0.9rem; }

    .time-notice { display: flex; gap: 10px; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-size: 0.85rem; align-items: start; border: 1px solid; }
    .time-notice.standard-time { background-color: rgba(255, 255, 255, 0.03); border-color: #444; color: #ccc; }
    .time-notice.bespoke-time { background-color: rgba(192, 160, 98, 0.08); border-color: #c0a062; color: #e0e0e0; }
    .icon-time { font-size: 1.2rem; line-height: 1; }

    .divider-thin { height: 1px; background: #333; margin: 20px 0; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; color: #ccc; font-size: 0.9rem; }
    .summary-total { display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px; padding-top: 10px; border-top: 1px solid #333; }

    /* TÉRMINOS Y CONDICIONES */
    .terms-box { margin-bottom: 20px; }
    .terms-box input { cursor: pointer; }

    .boton-accion { display: block; width: 100%; background: #c0a062; color: #000; padding: 14px; text-align: center; font-weight: bold; border: none; border-radius: 4px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
    .boton-accion:hover:not(:disabled) { background: #fff; }
    .boton-accion:disabled { background: #333; color: #666; cursor: not-allowed; }

    .or-divider { text-align: center; margin: 15px 0; font-size: 0.7rem; color: #666; text-transform: uppercase; letter-spacing: 1px; }
    
    .paypal-box { background: #fff; padding: 10px; border-radius: 4px; transition: opacity 0.3s; }
    /* CLASE PARA BLOQUEAR PAYPAL VISUALMENTE Y FUNCIONALMENTE */
    .paypal-box.disabled-payment { opacity: 0.4; pointer-events: none; filter: grayscale(100%); }

    .security-note { font-size: 0.7rem; text-align: center; color: #555; margin-top: 15px; }

    @media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } .cart-summary { position: static; } }
</style>