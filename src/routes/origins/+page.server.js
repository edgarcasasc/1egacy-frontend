import { client } from '$lib/sanityClient';

// --- LÍNEA MÁGICA: Genera HTML estático en el build para máxima velocidad ---
export const prerender = true; 

export async function load() {
    // Ordenamos por título de la A a la Z para una constelación organizada
    const query = `*[_type == "linaje"] | order(title asc) {
        "id": title,
        "slug": slug.current,
        introduccion,
        "escudoUrl": escudo.asset->url
    }`;

    try {
        const linajes = await client.fetch(query);
        
        // Retornamos un array vacío si no hay datos, evitando errores de undefined en el svelte
        return {
            linajes: linajes || []
        };
    } catch (e) {
        // Si hay un error de conexión, el sitio sigue vivo pero con la constelación vacía
        console.error("Error cargando la Bóveda de Linajes:", e);
        return {
            linajes: []
        };
    }
}