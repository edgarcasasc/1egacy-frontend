// src/routes/blog/topic/[slug]/+page.server.js
import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params; 
  
  console.log('(Topic Page) Slug recibido en params:', slug); // Mantener para debug

  // --- CONSULTA GROQ COMPLETA (CORREGIDA) ---
  const query = `*[_type == "topic" && slug.current == $slug][0]{
    _id,
    title,
    description,
    // Sub-consulta para obtener TODOS los posts asociados a este clúster
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc){
      title,
      subtitle,
      "slug": slug.current,
      "mainImageUrl": mainImage.asset->url,
      publishedAt 
      // Añade aquí cualquier otro campo del post que necesites mostrar en la tarjeta
    }
  }`;
  // --- FIN DE LA CONSULTA ---

  try {
    const topicData = await client.fetch(query, { slug });

    console.log('(Topic Page) Datos recibidos de Sanity (topicData):', topicData); // Mantener para debug

    if (!topicData) {
      console.error(`(Topic Page) No se encontró topicData para el slug: ${slug}`);
      throw error(404, `Clúster temático no encontrado: ${slug}`);
    }
    
    // Verificación extra: Asegurarse de que 'posts' sea un array, incluso si está vacío
    if (!Array.isArray(topicData.posts)) {
        topicData.posts = [];
        console.warn(`(Topic Page) La consulta para el slug ${slug} devolvió topicData pero 'posts' no era un array. Se forzó a []`);
    }

    return {
      topic: topicData 
    };

  } catch (err) {
    if (err.status === 404) {
        throw err;
    }
    console.error(`[SERVER LOAD ERROR - TOPIC PAGE: ${slug}]`, err);
    throw error(500, `Error interno al cargar el clúster temático: ${err.message}`);
  }
}