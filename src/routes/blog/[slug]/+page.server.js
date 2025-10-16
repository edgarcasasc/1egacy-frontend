// src/routes/blog/[slug]/+page.server.js
import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    subtitle,
    publishedAt,
    "mainImageUrl": mainImage.asset->url,
    body
  }`;
  
const post = await client.fetch(query, { slug });
  if (post) {
    return { post };
  }

throw error(404, 'Artículo no encontrado');
}