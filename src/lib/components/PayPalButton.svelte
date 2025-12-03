<script>
    import { onMount } from 'svelte';
    import { loadScript } from "@paypal/paypal-js";
    import { cart } from '$lib/stores/cart'; // Importamos el carrito para saber qué compró

    export let amount;

    onMount(async () => {
        let paypal;
        try {
            paypal = await loadScript({ 
                "client-id": "AQNyhi5Vo-LrG2UrBGdvOmY0-s5Lw-7ImhlhaRwOn7Oc9D4k6A346XQlyaoRKuq4dlYHvZDsiiYu0fFI", // <--- ¡Pega tu Client ID aquí!
                currency: "MXN"
            });
        } catch (error) {
            console.error("Error cargando PayPal:", error);
        }

        if (paypal) {
            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color:  'blue', // Azul para que resalte en tu fondo gris
                    shape:  'rect',
                    label:  'pay'
                },
                
                // 1. CONFIGURACIÓN DE LA ORDEN
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount.toString()
                            },
                            description: "Compra en 1egacy"
                        }],
                        // 2. OBLIGAR A PEDIR DIRECCIÓN (Shipping Preference)
                        application_context: {
                            shipping_preference: "GET_FROM_FILE", // Usa la dirección guardada en PayPal
                            user_action: "PAY_NOW"
                        }
                    });
                },

                // 3. CUANDO EL PAGO ES EXITOSO
                onApprove: async function (data, actions) {
                    // Capturamos el dinero
                    const orderDetails = await actions.order.capture();
                    
                    console.log('Pago PayPal exitoso:', orderDetails);

                    // 4. GUARDAR EN SANITY (Llamamos a nuestro puente)
                    try {
                        const response = await fetch('/api/save-order', {
                            method: 'POST',
                            body: JSON.stringify({
                                orderDetails: orderDetails,
                                cartItems: $cart // Enviamos qué compró
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        });

                        if (response.ok) {
                            // 5. REDIRIGIR A GRACIAS
                            window.location.href = `/gracias?session_id=PAYPAL-${orderDetails.id}`;
                        } else {
                            alert('Pago recibido, pero hubo un error guardando la orden. Contáctanos.');
                        }
                    } catch (err) {
                        console.error('Error guardando orden:', err);
                    }
                },

                onError: function (err) {
                    console.error('Error en PayPal:', err);
                    alert('Hubo un error con PayPal. Intenta nuevamente.');
                }
            }).render("#paypal-button-container");
        }
    });
</script>

<div id="paypal-button-container"></div>