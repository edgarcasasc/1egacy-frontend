import { client } from '$lib/sanityClient';

// Velocidad de estático, pero permite que los nuevos apellidos aparezcan sin re-deploy
export const prerender = 'auto';

export async function load() {
    // OPTIMIZACIÓN 2026: Solo traemos datos de navegación (ID, Slug, Escudo). 
    // La introducción se cargará solo cuando el usuario abra el modal (o desde el slug).
    const query = `*[_type == "linaje"] | order(title asc) {
        "id": title,
        "slug": slug.current,
        "escudoUrl": escudo.asset->url
    }`;

    try {
        const linajes = await client.fetch(query);
        
        if (!linajes || linajes.length === 0) {
            return { linajes: [] };
        }

        return {
            linajes,
            // Cabeceras de resiliencia: rápido en el Edge, fresco en el fondo.
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600'
            }
        };
    } catch (e) {
        console.error("CRITICAL 5xx - Origins Vault Timeout:", e);
        // Lanzamos 503 para que Google sepa que es una saturación temporal y no un sitio roto.
        throw error(503, 'La Bóveda de Linajes está saturada, reintentando conexión...');
    }
}