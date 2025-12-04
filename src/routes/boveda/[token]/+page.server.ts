import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { token } = params;

  // Buscamos la orden que tenga EXACTAMENTE este token de acceso
  const query = `*[_type == "order" && accessToken == $token][0]{
    _id,
    customerName,
    investigationStatus,
    orderDate,
    "items": items[]{ 
      productName, 
      serviceLevel,
      size 
    }
  }`;

  try {
    const order = await client.fetch(query, { token });

    if (!order) {
      // Si el token no existe o está mal escrito
      throw error(404, 'Acceso denegado. Token inválido o expirado.');
    }

    return {
      order
    };

  } catch (err) {
    console.error('Error en Bóveda:', err);
    throw error(404, 'No pudimos abrir la bóveda.');
  }
}