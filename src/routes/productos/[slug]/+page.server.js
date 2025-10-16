import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;
  const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    price,
    description,
    "gallery": gallery[].asset->url,
    variants,
    "linajeInfo": linaje->{ "slug": slug.current, "title": title }
  }`;
  const product = await client.fetch(query, { slug });
  if (product) {
    return { product };
  }
  throw error(404, 'Producto no encontrado');
}