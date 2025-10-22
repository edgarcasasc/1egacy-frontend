// src/routes/productos/[slug]/+page.server.js
import { client } from '$lib/sanityClient.js'; // Asegúrate que la ruta sea correcta
import { error } from '@sveltejs/kit';

export async function load({ params, url }) { // Añadido 'url'
  const { slug } = params;
  const baseUrl = url.origin; // Obtenemos la URL base

  // Consulta GROQ actualizada para incluir campos para Schema y baseUrl
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id, // Añadido _id
    title,
    "slug": slug.current, // Aseguramos que el slug se obtenga
    price, // Precio base (si aplica)
    description,
    "mainImageUrl": gallery[0].asset->url, // Asume que la primera imagen es la principal
    "galleryImages": gallery[].asset->url, // Renombrado para claridad
    sku, // Añadido SKU (si existe en tu schema productType)
    
    // Consulta detallada para variantes - AJUSTA CAMPOS SEGÚN TU SCHEMA variantType.ts
    "variants": variants[]{ 
      _id,
      title, // Ej. "Talla M", "Color Negro"
      sku,   // SKU específico de la variante
      price  // Precio específico de la variante
      // "variantImageUrl": image.asset->url // Si las variantes tienen imagen propia
    }, 
    
    "linajeInfo": linaje->{ "slug": slug.current, "title": title } 
    // "brand": vendor->{name} // Descomenta y ajusta si tienes marca/vendedor
  }`;

  try {
    const productData = await client.fetch(query, { slug });

    if (!productData) {
      throw error(404, 'Producto no encontrado'); // Mantenemos tu error 404
    }

    // Devolvemos los datos del producto y la baseUrl
    return { 
      product: productData,
      baseUrl 
    };

  } catch (err) {
    // Si es un 404 que lanzamos, lo re-lanzamos
    if (err.status === 404) {
        throw err;
    }
    // Para otros errores, logueamos y lanzamos 500
    console.error(`[SERVER LOAD ERROR - PRODUCT PAGE: ${slug}]`, err);
    throw error(500, `Error interno al cargar el producto: ${err.message}`);
  }
}