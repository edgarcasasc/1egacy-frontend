// src/lib/sanityClient.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '9pou5g3d', // Tu Project ID de Sanity
  dataset: 'production',   // El dataset que creamos
  apiVersion: '2025-10-15', // La fecha de hoy
  useCdn: true, // `false` si quieres datos 100% en tiempo real, `true` para mejor rendimiento
});