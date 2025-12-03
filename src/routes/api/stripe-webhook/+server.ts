import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { client } from '$lib/sanityClient';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST({ request }) {
    const signature = request.headers.get('stripe-signature');
    const body = await request.text(); // Stripe necesita el texto crudo para validar

    let event;

    try {
        // 1. VALIDACIÓN DE SEGURIDAD (¿Es realmente Stripe?)
        if (!signature || !STRIPE_WEBHOOK_SECRET) {
            throw new Error('Falta firma o secreto');
        }
        event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`⚠️ Webhook Error: ${err.message}`);
        return json({ error: 'Webhook Error' }, { status: 400 });
    }

    // 2. PROCESAR EL PAGO EXITOSO
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        console.log(`💰 Pago recibido: ${session.id}`);

        // Recuperar los items comprados (Stripe no los manda en el evento por defecto)
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
             expand: ['data.price.product'] 
        });

        // 3. PREPARAR DATOS PARA SANITY
        const orderDoc = {
            _type: 'order', // Asegúrate de crear este esquema en Sanity después
            stripeCheckoutId: session.id,
            customerName: session.customer_details?.name,
            customerEmail: session.customer_details?.email,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency,
            status: 'paid',
            shippingAddress: session.shipping_details?.address,
            
            // Mapeamos los productos comprados
            items: lineItems.data.map(item => ({
                _key: item.id, // Clave única para array en Sanity
                productName: item.description,
                quantity: item.quantity,
                price: item.amount_total / 100,
                // Intentamos recuperar el ID de Sanity que guardamos en metadata en el checkout
                sanityProductId: item.price?.product?.metadata?.sanityId || null,
                serviceLevel: item.price?.product?.metadata?.serviceLevel || 'standard'
            })),
            
            orderDate: new Date().toISOString()
        };

        // 4. GUARDAR EN SANITY
        try {
            await client.create(orderDoc);
            console.log('✅ Orden guardada en Sanity');
        } catch (err) {
            console.error('❌ Error guardando en Sanity:', err);
            // No devolvemos error 500 para que Stripe no reintente infinitamente si es error de datos
        }
    }

    return json({ received: true });
}