import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) { 
    const slug = params.apellido.toLowerCase();
    const token = url.searchParams.get('k'); 

    // --- 1. SEGURIDAD BÁSICA ---
    if (!token) {
        throw error(403, 'Acceso denegado. Se requiere una llave de acceso válida.');
    }

    // --- 2. LISTA DE TOKENS HISTÓRICOS (SALVAVIDAS) ---
    // Aquí pones los tokens antiguos que NO quieres que dejen de funcionar nunca,
    // independientemente de lo que diga la base de datos nueva.
    const LEGACY_TOKENS = [
        '3ff94e4a-6803-485a-b188-1ad168904b0f', // Token original de Casas
        // 'otro-token-antiguo-aqui'
    ];

    const isLegacyToken = LEGACY_TOKENS.includes(token);

    // --- 3. VERIFICACIÓN DE ACCESO ---
    let hasAccess = false;

    if (isLegacyToken) {
        // A. Si está en la lista blanca, le damos pase VIP directo
        console.log(`🔓 Acceso permitido por Token Histórico: ${token}`);
        hasAccess = true;
    } else {
        // B. Si no es histórico, verificamos en Sanity (Lógica Nueva)
        // Preguntamos: "¿Existe una orden con este token QUE ESTÉ VINCULADA a este linaje?"
        const accessQuery = `count(*[_type == "order" && accessToken == $token && linajeVinculado->slug.current == $slug]) > 0`;
        hasAccess = await client.fetch(accessQuery, { token, slug });
    }

    if (!hasAccess) {
        throw error(403, 'Tu llave de acceso no corresponde a este linaje o la sesión ha expirado.');
    }

    // --- 4. DESCARGAR EL CONTENIDO (Si pasó la seguridad) ---
    const query = `*[_type == "linaje" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        introduccion,
        "escudoUrl": escudo.asset->url,
        blason, 
        origen, 
        historia,
        "hitos": coalesce(hitos, []), 
        "estadisticas": coalesce(estadisticas, []),
        "articulosRelacionados": coalesce(articulosRelacionados[]->{
            title,
            "slug": slug.current,
            "mainImageUrl": mainImage.asset->url,
            excerpt
        }, []),
        "relatedProducts": coalesce(*[_type == "product" && references(^._id)] | order(_createdAt desc) {
            title,
            "slug": slug.current,
            price,
            "mainImageUrl": gallery[0].asset->url
        }, [])
    }`;

    try {
        const linajeData = await client.fetch(query, { slug });

        if (!linajeData) {
            throw error(404, 'El linaje existe pero no se encontraron datos.');
        }

        return {
            linaje: linajeData
        };

    } catch (err) {
        if (err.status === 403 || err.status === 404) {
             throw err;
        }
        console.error(`ERROR CARGANDO LINAJE (${slug}):`, err);
        throw error(500, 'Error interno de seguridad.');
    }
}