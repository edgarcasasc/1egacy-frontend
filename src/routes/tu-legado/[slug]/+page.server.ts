import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
    const slug = params.slug.toLowerCase(); // ej: 'edgar-casas'
    const token = url.searchParams.get('k');

    // 1. SEGURIDAD: ¿Trae llave?
    if (!token) {
        throw error(403, 'Acceso denegado. Se requiere llave de seguridad.');
    }

    // 2. VALIDACIÓN CRUZADA: ¿El token coincide con este linaje?
    // Buscamos una orden que tenga este token Y cuyo linaje vinculado sea este slug.
    const accessQuery = `count(*[_type == "order" && accessToken == $token && linajeVinculado->slug.current == $slug]) > 0`;
    const hasAccess = await client.fetch(accessQuery, { token, slug });

    if (!hasAccess) {
        throw error(403, 'Tu llave no corresponde a este Legado Bespoke.');
    }

    // 3. DESCARGA DE DATOS (Igual que Códice pero para esta ruta)
    const query = `*[_type == "linaje" && slug.current == $slug][0]{
        title,
        introduccion,
        "escudoUrl": escudo.asset->url,
        blason,
        origen,
        historia,
        "hitos": coalesce(hitos, []),
        "estadisticas": coalesce(estadisticas, []),
        
        // Para Bespoke, no mostramos productos relacionados (ya compraron lo máximo)
        // pero sí el códice genérico por si quieren comparar
        "articulosRelacionados": coalesce(articulosRelacionados[]->{
            title, "slug": slug.current, "mainImageUrl": mainImage.asset->url
        }, [])
    }`;

    try {
        const linaje = await client.fetch(query, { slug });
        if (!linaje) throw error(404, 'Legado no encontrado.');
        
        return { linaje };

    } catch (err) {
        if (err.status) throw err;
        console.error(`Error Tu Legado (${slug}):`, err);
        throw error(500, 'Error interno.');
    }
}