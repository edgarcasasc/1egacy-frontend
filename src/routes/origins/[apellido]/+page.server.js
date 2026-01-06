import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

// ISR 2026: Velocidad de estático con actualización automática
export const prerender = 'auto'; 

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
            // Un 404 controlado ahora que tienes el archivo +error.svelte
            throw error(404, `El linaje '${params.apellido}' no está en nuestros registros aún.`);
        }

        const cleanSEOList = linajeData.blasonTexto 
            ? linajeData.blasonTexto.replace(/\n/g, ' ').trim() 
            : '';

        return {
            linaje: {
                ...linajeData,
                blasonTexto: cleanSEOList
            },
            // ESTÁNDAR 2026: Velocidad máxima. 
            // Si el servidor tarda, sirve la versión vieja mientras se actualiza.
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600'
            }
        };

    } catch (err) {
        // Si es 404, lo lanzamos para que lo atrape +error.svelte
        if (err.status === 404) throw err;
        
        console.error(`CRITICAL 5xx Origins [${slug}]:`, err);
        // Evitamos el 500. Usamos 503 para que Google no nos penalice el ranking.
        throw error(503, 'La Bóveda de Linajes está temporalmente saturada.');
    }
}