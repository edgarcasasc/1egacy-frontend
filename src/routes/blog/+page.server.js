// src/routes/blog/+page.server.js
import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

// --- LÍNEA MÁGICA: Rasteriza esta página para evitar errores 5xx ---
export const prerender = true; 

export async function load() {
  const query = `*[_type == "topic"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3]{
      title,
      subtitle,
      "slug": slug.current,
      "mainImageUrl": mainImage.asset->url,
    }
  }`;
  
  try {
    const topicsWithPosts = await client.fetch(query);

    if (!topicsWithPosts) {
      console.warn('Sin resultados en Sanity.');
      return { topics: [] };
    }

    return {
      topics: topicsWithPosts 
    };

  } catch (err) {
    console.error('[SERVER LOAD ERROR]', err);
    // Devolvemos un objeto vacío en lugar de "romper" la página con un 500
    return { topics: [] };
  }
}