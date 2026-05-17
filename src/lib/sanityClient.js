// src/lib/sanityClient.js (VERSIÓN FINAL CON CDN DINÁMICO)

import { createClient } from '@sanity/client';
import { building } from '$app/environment';

// 1. Lee las variables de entorno de Vite/SvelteKit
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const token = import.meta.env.VITE_SANITY_READ_TOKEN; 
const apiVersion = '2025-10-15'; 

// 2. Verificación de seguridad
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

  // 4. LÓGICA DE CDN CORREGIDA
  // Desactivamos el CDN (false) durante el build en Netlify (!building)
  // para forzar la lectura de datos frescos (bypass cache).
  // Durante la navegación real (SSR o cliente), usamos el CDN (true) para velocidad.
  useCdn: !building,
  
  token: token,   // Seguimos pasando el token
});