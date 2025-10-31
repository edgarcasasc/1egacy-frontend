import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
  const { slug } = params;
  const baseUrl = url.origin;

  // Consulta GROQ actualizada: Añadimos la obtención de category->{title, "slug": slug.current}
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "mainImageUrl": gallery[0].asset->url,
    "galleryImages": gallery[].asset->url,
    sku,

    // --- CAMPOS CORREGIDOS PARA GSC ---
    rating,
    reviewCount,
    priceCurrency,
    priceValidUntil,
    // ----------------------------------
    // Obtener título y slug de la categoría referenciada
    "category": category->{
        title,
        "slug": slug.current
     },
     // Consulta detallada para variantes (como estaba antes)
    "variants": variants[]{
        // ... campos de variantes ...
        size, // <-- Asegúrate que estos campos existen en variantType.ts
        color // <-- Asegúrate que estos campos existen en variantType.ts
    },
    "linajeInfo": linaje->{ "slug": slug.current, "title": title }
  }`;

  try {
    const productData = await client.fetch(query, { slug });

    if (!productData) {
      throw error(404, 'Producto no encontrado');
    }

    // Devolvemos los datos del producto (que ahora incluyen category) y la baseUrl
    return {
      product: productData,
      baseUrl
    };

  } catch (err) {
    if (err.status === 404) {
      throw err;
    }
    console.error(`[SERVER LOAD ERROR - PRODUCT PAGE: ${slug}]`, err);
    throw error(500, `Error interno al cargar el producto: ${err.message}`);
  }
}
