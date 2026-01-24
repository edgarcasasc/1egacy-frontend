import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export const prerender = 'auto';

export async function load() {
    // FIX: Agregamos explícitamente el campo 'introduccion' a la consulta.
    // Lo mapeamos a 'modalDescription' para que el frontend lo entienda fácil.
    const query = `*[_type == "linaje"] | order(title asc) {
        "id": title,
        "slug": slug.current,
        "escudoUrl": escudo.asset->url,
        
        // AQUÍ ESTABA EL ERROR: No estábamos pidiendo este dato.
        // Usamos coalesce para que, si está vacío, ponga un texto por defecto.
        "modalDescription": coalesce(introduccion, "Historia en proceso de curaduría.")
    }`;

    try {
        const linajes = await client.fetch(query);
        
        if (!linajes || linajes.length === 0) {
            return { linajes: [] };
        }

        return {
            linajes,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600'
            }
        };
    } catch (e) {
        console.error("CRITICAL 5xx - Origins Vault Timeout:", e);
        throw error(503, 'La Bóveda de Linajes está saturada, reintentando conexión...');
    }
}