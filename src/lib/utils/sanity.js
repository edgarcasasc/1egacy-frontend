import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

// Creamos una instancia ligera solo para procesar URLs de imágenes
const builder = imageUrlBuilder(createClient({
    projectId: '9pou5g3d',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-01'
}));

export function urlFor(source) {
  return builder.image(source);
}