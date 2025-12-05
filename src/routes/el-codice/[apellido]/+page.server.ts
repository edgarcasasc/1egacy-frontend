import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) { // <-- Importante: 'url' para leer el token
    const slug = params.apellido.toLowerCase();
    const token = url.searchParams.get('k'); // Leemos el parámetro '?k='

    // 1. VALIDACIÓN DE SEGURIDAD
    // Si no hay token, rechazamos la entrada inmediatamente
    if (!token) {
        throw error(403, 'Acceso denegado. Se requiere una llave de acceso válida.');
    }

    // 2. VERIFICACIÓN CRUZADA EN SANITY
    // Preguntamos: "¿Existe una orden con este token QUE ESTÉ VINCULADA a este linaje?"
    // Nota: Asumimos que en la orden ya vinculaste el 'linajeVinculado'
    const accessQuery = `count(*[_type == "order" && accessToken == $token && linajeVinculado->slug.current == $slug]) > 0`;
    
    const hasAccess = await client.fetch(accessQuery, { token, slug });

    if (!hasAccess) {
        // Opcional: Permitir acceso si es una orden "Bespoke" terminada aunque el slug no coincida exacto (casos especiales)
        // Pero por ahora, somos estrictos.
        throw error(403, 'Tu llave de acceso no corresponde a este linaje o la sesión ha expirado.');
    }

    // 3. SI PASÓ LA SEGURIDAD, DESCARGAMOS EL CONTENIDO
    // (Esta es la misma query de antes)
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
        // Si el error ya es 403 o 404, lo dejamos pasar
        if (err.status === 403 || err.status === 404) {
             throw err;
        }
        console.error(`ERROR CARGANDO LINAJE (${slug}):`, err);
        throw error(500, 'Error interno de seguridad.');
    }
}