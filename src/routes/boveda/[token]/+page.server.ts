import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { token } = params;

  // Query completa con Historial de Chat y Linaje
  const query = `*[_type == "order" && accessToken == $token][0]{
    _id,
    customerName,
    investigationStatus,
    orderDate,
    
    // Carrito
    "items": items[]{ 
        productName, 
        serviceLevel, 
        size 
    },
    
    // Memoria del Chat (Vital para que no se borre al recargar)
    chatHistory, 

    // Datos del Linaje para la IA
    linajeVinculado->{
      title,
      origen,
      historia,
      blason,
      "hitos": hitos[]{ year, title, description }
    }
  }`;

  try {
    const order = await client.fetch(query, { token });

    if (!order) {
      // Si no encuentra la orden, lanzamos 404
      throw error(404, 'Acceso denegado. Token inválido.');
    }

    return { order };

  } catch (err) {
    // --- CORRECCIÓN DE ERROR 500 ---
    // Si el error ya tiene un status (ej. 404), lo dejamos pasar tal cual
    if (err.status) {
        throw err;
    }
    
    // Si es otro error (código roto), lo mostramos en la consola y damos 500
    console.error('🔥 ERROR CRÍTICO EN BÓVEDA:', err);
    throw error(500, `No pudimos abrir la bóveda: ${err.message}`);
  }
}