import { error } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function load({ url }) {
    const sessionId = url.searchParams.get('session_id');

    if (!sessionId) {
        // Si alguien entra directo sin comprar, lo mandamos a la tienda
        throw error(303, { message: 'Redirigiendo...', location: '/productos' });
    }

    try {
        // 1. Recuperamos la sesión de Stripe para confirmar detalles
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const customer = session.customer_details;

        return {
            orderId: session.id.slice(-10).toUpperCase(), // ID corto para mostrar
            customerName: customer?.name || 'Cliente',
            customerEmail: customer?.email,
            status: session.payment_status // 'paid'
        };

    } catch (err) {
        console.error('Error recuperando sesión:', err);
        throw error(500, 'No pudimos verificar tu orden.');
    }
}