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

 // --- INICIO DE LA CORRECCIÓN 5XX ---
 // Usamos 'select' y 'coalesce' para manejar de forma segura los productos sin galería
 "mainImageUrl": select(
  defined(gallery[0].asset) => gallery[0].asset->url,
  null // Devuelve null si no hay imagen principal
 ),
 "galleryImages": coalesce(gallery[].asset->url, []), // Devuelve un array vacío si no hay galería
 // --- FIN DE LA CORRECCIÓN 5XX ---

 sku,

  rating,
  reviewCount,
  priceCurrency,
  priceValidUntil,
  shippingDetails,
  hasMerchantReturnPolicy,

 // --- INICIO DE CORRECCIÓN DE ADVERTENCIAS AMARILLAS ---
  shippingCost, // <-- AÑADE ESTA LÍNEA (Asumiendo que el campo se llama 'shippingCost' en Sanity)
  returnPolicyDays, // <-- AÑADE ESTA LÍNEA (Asumiendo que el campo se llama 'returnPolicyDays' en Sanity)
  // --- FIN DE CORRECCIÓN ---
 
 "category": category->{ // Esto es seguro, GROQ devuelve null si no hay referencia
   title,
   "slug": slug.current
  },
 "variants": coalesce(variants, [])[]{ // Devuelve un array vacío si no hay variantes
   size,
   color
 },
 "linajeInfo": linaje->{ "slug": slug.current, "title": title } // Esto también es seguro
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
