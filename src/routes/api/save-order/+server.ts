import { json } from '@sveltejs/kit';
import { client } from '$lib/sanityClient';

export async function POST({ request }) {
    try {
        const { orderDetails, cartItems } = await request.json();

        // 1. Extraer datos que nos manda PayPal
        const payer = orderDetails.payer;
        const shipping = orderDetails.purchase_units[0].shipping;

        // 2. Armar el documento para Sanity
        const orderDoc = {
            _type: 'order',
            stripeCheckoutId: `PAYPAL-${orderDetails.id}`, // Usamos el ID de PayPal con prefijo
            customerName: `${payer.name.given_name} ${payer.name.surname}`,
            customerEmail: payer.email_address,
            // PayPal no siempre comparte teléfono, lo guardamos si viene
            customerPhone: payer.phone ? payer.phone.phone_number.national_number : null,
            
            amount: parseFloat(orderDetails.purchase_units[0].amount.value),
            currency: 'MXN',
            status: 'paid',
            paymentMethod: 'paypal',
            
            // 3. Guardar la dirección de envío que puso en PayPal
            shippingAddress: {
                line1: shipping?.address?.address_line_1,
                line2: shipping?.address?.address_line_2,
                city: shipping?.address?.admin_area_2, // Ciudad
                state: shipping?.address?.admin_area_1, // Estado
                postal_code: shipping?.address?.postal_code,
                country: shipping?.address?.country_code
            },

            // 4. Mapear los productos del carrito
            items: cartItems.map(item => ({
                _key: item.id,
                productName: item.title + (item.customizationLevel === 'bespoke' ? ' (Bespoke)' : ''),
                quantity: item.quantity,
                serviceLevel: item.customizationLevel,
                size: item.selectedSize,
                color: item.selectedColor
            })),

            orderDate: new Date().toISOString()
        };

        // 5. Guardar en Sanity
        await client.create(orderDoc);

        return json({ success: true });

    } catch (err) {
        console.error('Error guardando orden de PayPal:', err);
        return json({ error: err.message }, { status: 500 });
    }
}