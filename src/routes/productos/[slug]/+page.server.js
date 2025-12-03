import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
  const { slug } = params;
  const baseUrl = url.origin;

  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    
    // --- AQUÍ PEDIMOS EL ESTATUS GLOBAL ---
    availabilityStatus, 

    "mainImageUrl": select(
      defined(gallery[0].asset) => gallery[0].asset->url,
      null
    ),
    "galleryImages": coalesce(gallery[].asset->url, []),

    sku,
    rating,
    reviewCount,
    priceCurrency,
    priceValidUntil,
    shippingDetails,
    hasMerchantReturnPolicy,
    shippingCost, 
    returnPolicyDays, 

    "category": category->{
      title,
      "slug": slug.current
    },

    // --- VARIANTES (Ya no pedimos status aquí adentro) ---
    "variants": coalesce(variants, [])[]{ 
      title,
      size,
      color,
      price
    },

    "linajeInfo": linaje->{ "slug": slug.current, "title": title }
  }`;

  try {
    const productData = await client.fetch(query, { slug });
    if (!productData) throw error(404, 'Producto no encontrado');

    return { product: productData, baseUrl };

  } catch (err) {
    if (err.status === 404) throw err;
    console.error(`[SERVER LOAD ERROR]: ${err.message}`);
    throw error(500, `Error interno: ${err.message}`);
  }
}