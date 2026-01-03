import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    // Normalizamos el slug para evitar duplicidad por mayúsculas
    const slug = params.apellido.toLowerCase();

    const query = `*[_type == "linaje" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        introduccion,
        // Traemos el escudo con metadatos de dimensiones para el SEO Social
        "escudoUrl": escudo.asset->url,
        "escudoMeta": escudo.asset->metadata.dimensions,
        
        // Texto rico para el diseño
        blason, 
        
        // Texto plano limpio para Meta Description (fundamental)
        "blasonTexto": pt::text(blason),

        articulosRelacionados[]->{
            title,
            "slug": slug.current,
            "mainImageUrl": mainImage.asset->url,
            excerpt
        },
        "relatedProducts": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
            title,
            "slug": slug.current,
            price,
            "mainImageUrl": gallery[0].asset->url
        }
    }`;

    try {
        const linajeData = await client.fetch(query, { slug });

        if (!linajeData) {
            // Un 404 limpio es vital para que Google no indexe páginas vacías
            throw error(404, {
                message: `El linaje '${params.apellido}' no está en nuestros registros aún.`
            });
        }

        // Limpieza extra del texto para meta-tags (quitar saltos de línea)
        const cleanSEOList = linajeData.blasonTexto 
            ? linajeData.blasonTexto.replace(/\n/g, ' ').trim() 
            : '';

        return {
            linaje: {
                ...linajeData,
                blasonTexto: cleanSEOList
            }
        };

    } catch (err) {
        if (err.status === 404) throw err;
        
        console.error(`Error en Origins [${slug}]:`, err);
        throw error(500, 'Error de conexión con la Bóveda de Linajes');
    }
}