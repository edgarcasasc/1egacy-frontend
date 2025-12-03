import { client } from '$lib/server/sanity';

export async function load() {
  // Consulta GROQ para traer todos los productos
  const products = await client.fetch(`*[_type == "product"]{title, price}`);
  return { products };
}