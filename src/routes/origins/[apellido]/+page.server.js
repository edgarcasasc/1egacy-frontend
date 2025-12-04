import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const slug = params.apellido.toLowerCase();

    const query = `*[_type == "linaje" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        introduccion,
        "escudoUrl": escudo.asset->url,
        
        // --- AQUÍ ESTÁ EL CAMBIO ---
        // Pedimos 'blason' (el nuevo campo de texto rico)
        blason, 
        
        // Opcional: Pedimos también el texto plano por si algo falla con el rico
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
            throw error(404, 'Linaje no encontrado');
        }

        return {
            linaje: linajeData
        };

    } catch (err) {
         if (err.status === 404) {
             throw err;
         }
        console.error(`Error loading data for linaje page (${slug}):`, err);
        throw error(500, 'No se pudo cargar la información del linaje');
    }
}