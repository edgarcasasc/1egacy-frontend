import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { client } from '$lib/sanityClient';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST({ request }) {
  try {
    // Recibimos los datos del Frontend (incluyendo el envío seleccionado)
    const { items, customerInfo, shippingTotal } = await request.json();

    const lineItems = [];

    // 1. Validar precios de PRODUCTOS con Sanity (Seguridad Base)
    for (const item of items) {
      const query = `*[_type == "product" && (_id == $id || slug.current == $id)][0]{
        title, price, mainImageUrl
      }`;
      const product = await client.fetch(query, { id: item.id });

      if (!product) throw new Error(`Producto no encontrado: ${item.id}`);

      // Lógica de Precio Bespoke (x1.5)
      let finalPrice = product.price;
      let finalTitle = product.title;

      if (item.customizationLevel === 'bespoke') {
        finalPrice = product.price * 1.5;
        finalTitle = `${product.title} (Edición Bespoke)`;
      } else {
        finalTitle = `${product.title} (Edición Clásica)`;
      }

      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: finalTitle,
            description: `Talla: ${item.selectedSize} | Color: ${item.selectedColor}`,
            images: product.mainImageUrl ? [product.mainImageUrl] : [],
            metadata: { 
                sanityId: item.id, 
                serviceLevel: item.customizationLevel 
            }
          },
          unit_amount: Math.round(finalPrice * 100),
        },
        quantity: item.quantity,
      });
    }

    // 2. Agregar el ENVÍO como un ítem más (si aplica)
    // Esto iguala la lógica con PayPal: cobramos lo que el cliente eligió
    if (shippingTotal > 0) {
        lineItems.push({
            price_data: {
                currency: 'mxn',
                product_data: {
                    name: 'Servicio de Envío',
                    description: customerInfo.shippingZone === 'nacional' ? 'Envío Nacional' : 'Tarifa Estándar'
                },
                unit_amount: Math.round(shippingTotal * 100), // Convertir a centavos
            },
            quantity: 1
        });
    }

    // 3. Crear la Sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      locale: 'es-419', // Español Latino
      
      // Pre-llenamos el email para que no lo escriba dos veces
      customer_email: customerInfo.email,

      // Pedimos la dirección solo para tener el registro (pero ya no cobramos extra aquí)
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'], 
      },
      // NOTA: Ya NO usamos shipping_options aquí, porque el costo ya va en lineItems

      // Guardamos los datos de contacto en metadata para el Webhook
      metadata: {
        source: '1egacy-web',
        customerPhone: customerInfo.phone,
        shippingZone: customerInfo.shippingZone
      },

      success_url: `${request.headers.get('origin')}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/carrito`,
    });

    return json({ url: session.url });

  } catch (err) {
    console.error('Error en Checkout:', err);
    return json({ error: err.message }, { status: 500 });
  }
}