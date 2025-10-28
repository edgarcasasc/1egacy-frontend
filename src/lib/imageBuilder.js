// src/lib/imageBuilder.js
// IMPORTANTE: Asegúrate de que la ruta a tu cliente sea correcta.
// Viendo tu estructura, debería estar en '$lib/sanityClient'.

import imageUrlBuilder from '@sanity/image-url';
import { client } from '$lib/sanityClient'; // <-- Verifica que esta sea la ruta correcta a tu cliente

const builder = imageUrlBuilder(client);

/**
 * Genera una URL de imagen optimizada de Sanity.
 * @param {object} source - El objeto de imagen o asset de Sanity.
 * @returns {import('@sanity/image-url/lib/types/builder').SanityImageBuilder}
 */
export function urlFor(source) {
  if (!source || !source.asset) {
    console.warn('Fuente de imagen de Sanity inválida', source);
    return null; // Devuelve null si la fuente no es válida
  }
  return builder.image(source);
}