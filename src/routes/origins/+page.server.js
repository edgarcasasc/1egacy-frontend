// src/routes/origins/+page.server.js
import { client } from '$lib/sanityClient';

export async function load() {
  // Esta es una consulta en el lenguaje de Sanity (GROQ)
  // Pide todos los documentos de tipo 'linaje'
  const query = `*[_type == "linaje"]{
    "id": title, // Usamos el título como 'id'
    "slug": slug.current,
    introduccion,
    "escudoUrl": escudo.asset->url
  }`;
  
  const linajes = await client.fetch(query);

  if (linajes) {
    return {
      linajes // Enviamos los datos a la página
    };
  }

  return {
    status: 500,
    body: new Error("Error interno del servidor")
  };
}