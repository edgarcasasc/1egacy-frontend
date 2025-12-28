// src/routes/origins/+page.server.js
import { client } from '$lib/sanityClient';

// --- LÍNEA MÁGICA: Esto evita los errores 5xx ---
export const prerender = true; 

export async function load() {
  const query = `*[_type == "linaje"]{
    "id": title,
    "slug": slug.current,
    introduccion,
    "escudoUrl": escudo.asset->url
  }`;
  
  const linajes = await client.fetch(query);

  if (linajes) {
    return {
      linajes
    };
  }

  // Si algo falla, SvelteKit manejará el error de forma limpia
  return {
    linajes: []
  };
}