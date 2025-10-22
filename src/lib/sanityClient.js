// src/lib/sanityClient.js (VERSIÓN MEJORADA Y SEGURA)

import { createClient } from '@sanity/client';

// 1. Lee las variables de entorno de Vite/SvelteKit
// Netlify "inyectará" los valores que configuraste en su dashboard.
// Localmente, las leerá de tu archivo .env
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const token = import.meta.env.VITE_SANITY_READ_TOKEN; // ¡La "llave" que faltaba!
const apiVersion = '2025-10-15'; // Mantenemos tu fecha

// 2. Verificación de seguridad (falla rápido si faltan variables)
if (!projectId || !dataset) {
  throw new Error(
    "Error de configuración: Faltan variables de entorno de Sanity (VITE_SANITY_PROJECT_ID o VITE_SANITY_DATASET). " +
    "Asegúrate de que estén definidas en tu archivo .env local o en la configuración de Netlify."
  );
}

// 3. Creación del cliente
export const client = createClient({
  projectId,
  dataset,
  apiVersion,

  // 4. Lógica de Token y CDN (¡Esto es lo más importante!)
  
  // Si SÍ tenemos un token (SSR en Netlify), NO usamos el caché (useCdn: false)
  // para obtener datos frescos y autenticados.
  // Si NO hay token (Navegador del cliente), SÍ usamos el caché (useCdn: true)
  // para velocidad.
  useCdn: !token, // Si existe 'token', !token es false. Si no existe, !token es true.
  
  token: token,   // ¡Esta es la línea que soluciona tu error 5xx!
                  // Le da la "llave" al servidor de Netlify.
});