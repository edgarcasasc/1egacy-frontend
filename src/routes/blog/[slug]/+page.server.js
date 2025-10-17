// src/routes/blog/[slug]/+page.server.js
import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;

  // Esta es la consulta correcta para TU schema.
  // Solo pide los campos que existen.
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    subtitle,
    publishedAt,
    "mainImageUrl": mainImage.asset->url,
    body,
    seoTitle,
    seoDescription,
    apellidosRelacionados // <-- Esto trae el array de strings, ej: ['Garza', 'Casas']
  }`;
  
  const post = await client.fetch(query, { slug });

  if (post) {
    // Si 'apellidosRelacionados' es null (en un post genérico),
    // lo convertimos a un array vacío para que Svelte no falle.
    if (!post.apellidosRelacionados) {
      post.apellidosRelacionados = [];
    }
    return { post };
  }

  throw error(404, 'Artículo no encontrado');
}