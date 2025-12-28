import { json } from '@sveltejs/kit';
import { client } from '$lib/sanityClient';

export async function POST({ request }) {
    try {
        // 👇 1. RECIBIMOS EL "logisticsType" DEL FRONTEND
        const { orderDetails, cartItems, logisticsType } = await request.json();

        // Extraer datos que nos manda PayPal
        const payer = orderDetails.payer;
        const shipping = orderDetails.purchase_units[0].shipping;

        // Armar el documento para Sanity
        const orderDoc = {
            _type: 'order',
            stripeCheckoutId: `PAYPAL-${orderDetails.id}`, 
            customerName: `${payer.name.given_name} ${payer.name.surname}`,
            customerEmail: payer.email_address,
            customerPhone: payer.phone ? payer.phone.phone_number.national_number : null,
            
            amount: parseFloat(orderDetails.purchase_units[0].amount.value),
            currency: 'MXN',
            status: 'paid',
            paymentMethod: 'paypal',

            // 👇 2. GUARDAMOS EL TIPO DE LOGÍSTICA EN SANITY
            // Asegúrate de que tu esquema de Sanity tenga un campo para esto (ej. logisticsOption o shippingMethod)
            logisticsStatus: logisticsType || 'hibrido', 

            // Guardar la dirección de envío
            shippingAddress: {
                line1: shipping?.address?.address_line_1,
                line2: shipping?.address?.address_line_2,
                city: shipping?.address?.admin_area_2,
                state: shipping?.address?.admin_area_1,
                postal_code: shipping?.address?.postal_code,
                country: shipping?.address?.country_code
            },

            // Mapear los productos
            items: cartItems.map(item => ({
                _key: item.id,
                productName: item.title + (item.customizationLevel === 'bespoke' ? ' (Bespoke)' : ''),
                quantity: item.quantity,
                serviceLevel: item.customizationLevel,
                size: item.selectedSize,
                color: item.selectedColor,
                // Guardamos el ID real para referencias futuras
                sanityProductId: item.id 
            })),

            orderDate: new Date().toISOString()
        };

        // Guardar en Sanity
        await client.create(orderDoc);

        return json({ success: true });

    } catch (err) {
        console.error('Error guardando orden de PayPal:', err);
        // Aquí no importa devolver error 500 porque el pago YA se hizo en PayPal.
        // Lo importante es que quede registro en los logs.
        return json({ error: err.message }, { status: 500 });
    }
}