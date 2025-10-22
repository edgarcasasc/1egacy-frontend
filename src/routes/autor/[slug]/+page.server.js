// src/routes/autor/[slug]/+page.server.js
import { client } from '$lib/sanityClient'; // Asegúrate que la ruta a tu cliente Sanity sea correcta
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params; // Obtiene el slug del autor desde la URL

  // Consulta GROQ para encontrar al autor por su slug
  const query = `*[_type == "author" && slug.current == $slug][0]{
    name,
    "slug": slug.current, // Opcional, pero útil tenerlo
    "image": image.asset->url, // Obtiene la URL de la imagen
    bio,
    socialLink
    // Añade cualquier otro campo que necesites del autor
  }`;

  try {
    const authorData = await client.fetch(query, { slug });

    // Si no se encuentra el autor con ese slug, devuelve un 404
    if (!authorData) {
      throw error(404, `Autor no encontrado: ${slug}`);
    }

    // Si se encuentra, devuelve los datos del autor
    return {
      autor: authorData // Pasa los datos como 'autor' a +page.svelte
    };

  } catch (err) {
    // Si es un error 404 que lanzamos nosotros, lo re-lanzamos
    if (err.status === 404) {
        throw err;
    }
    // Para otros errores, logueamos y lanzamos 500
    console.error(`[SERVER LOAD ERROR - AUTHOR PAGE: ${slug}]`, err);
    throw error(500, `Error interno al cargar datos del autor: ${err.message}`);
  }
}