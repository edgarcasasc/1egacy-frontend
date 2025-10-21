// src/routes/blog/+page.server.js
import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit'; // Importar el helper de error

export async function load() {
  // --- CONSULTA GROQ ACTUALIZADA ---
  // Pide todos los Clústeres Temáticos ('topic')
  // Y para cada clúster, pide los 3 posts más recientes que lo referencian.
  const query = `*[_type == "topic"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    // Sub-consulta para obtener los posts asociados a ESTE clúster (^._id)
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3]{
      title,
      subtitle, // Usaremos esto como snippet si 'snippet' no existe
      "slug": slug.current,
      "mainImageUrl": mainImage.asset->url,
      // snippet // Puedes incluir 'snippet' si lo tienes y prefieres usarlo
    }
  }`;
  
  try {
    const topicsWithPosts = await client.fetch(query);

    // Verificación robusta: si la consulta falla o no devuelve nada
    if (!topicsWithPosts) {
      console.warn('La consulta a Sanity para clústeres temáticos no devolvió resultados.');
      // Devolver un array vacío para que el frontend pueda manejarlo
      return { topics: [] };
    }

    // Devolvemos el array de clústeres, cada uno con su lista de posts
    return {
      topics: topicsWithPosts 
    };

  } catch (err) {
    // Manejo de errores más detallado
    console.error('[SERVER LOAD ERROR - BLOG CLUSTERS]', err);
    // Usar el helper de SvelteKit para devolver un error HTTP adecuado
    throw error(500, `Error interno al cargar los clústeres del blog: ${err.message}`);
  }
}