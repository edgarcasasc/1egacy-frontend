// src/routes/origins/[apellido]/+page.server.js
import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    // Usamos 'apellido' como el slug, asegurándonos que sea minúsculas
    const slug = params.apellido.toLowerCase();

    // Consulta GROQ mejorada para obtener Linaje y Productos relacionados detallados
    const query = `*[_type == "linaje" && slug.current == $slug][0]{
        _id, // Necesitamos el ID para buscar productos
        title,
        "slug": slug.current,
        introduccion, // Si lo usas
        "escudoUrl": escudo.asset->url,
        descripcionEscudo,
        // Artículos relacionados (como lo tenías, asegúrate que pidan los campos correctos)
        articulosRelacionados[]->{
            title,
            "slug": slug.current,
            "mainImageUrl": mainImage.asset->url, // Asume que 'mainImage' existe en 'post'
            excerpt // Asume que 'excerpt' existe en 'post'
        },
        // --- SECCIÓN MEJORADA: Obtener Productos relacionados con detalles para tarjetas ---
        "relatedProducts": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
            title,
            "slug": slug.current,
            price,
            "mainImageUrl": gallery[0].asset->url // Imagen principal para la tarjeta
            // Podrías añadir category->{title} si quieres mostrarla
        }
    }`;

    try {
        const linajeData = await client.fetch(query, { slug });

        if (!linajeData) {
            // Mantenemos el error 404 si no se encuentra el linaje
            throw error(404, 'Linaje no encontrado');
        }

        // Devolvemos el objeto linajeData completo, que ahora contiene 'relatedProducts'
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
