// src/routes/origins/[apellido]/+page.server.js
import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  // Obtenemos el apellido de la URL y lo convertimos a minúsculas
  const slug = params.apellido.toLowerCase();

  // Creamos una consulta para pedirle a Sanity el linaje específico,
  // comparando los slugs en minúsculas.
 const query = `*[_type == "linaje" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    introduccion,
    "escudoUrl": escudo.asset->url,
    descripcionEscudo,
    articulosRelacionados[]->{
      title,
      "slug": slug.current,
      "mainImageUrl": mainImage.asset->url
    },
    // --- NUEVA SECCIÓN: Pide los productos relacionados ---
    "productos": *[_type == "product" && references(^._id)]{
      "slug": slug.current
    }
  }`;
  
  // Pasamos el slug en minúsculas a la consulta
  const linaje = await client.fetch(query, { slug });

  if (linaje) {
    return {
      linaje
    };
  }

  // Si no se encuentra, mostramos un error 404
  throw error(404, 'Linaje no encontrado');
}