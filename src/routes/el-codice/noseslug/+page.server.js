import { client } from '$lib/server/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params; // ej: "casas" o "garza"

  // Buscamos el linaje en Sanity
  const query = `*[_type == "linaje" && slug.current == $slug][0]{
    surname,
    "shieldUrl": shieldImage.asset->url,
    history, // El array de texto rico
    originMap // Los datos para el gráfico (JSON)
  }`;

  const linaje = await client.fetch(query, { slug });

  if (!linaje) {
    throw error(404, 'Linaje no encontrado en los archivos.');
  }

  return { linaje };
}