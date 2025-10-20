// src/routes/productos/+page.server.js
import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Consulta GROQ para obtener TODOS los productos
    // Seleccionamos los campos necesarios para la tarjeta del catálogo:
    // - Título (title)
    // - Slug (para el enlace)
    // - Precio (price)
    // - Descripción corta (description - opcional, si la muestras en la tarjeta)
    // - Imagen Principal (podemos tomar la primera de la galería o necesitar un campo 'mainImage')
    // - Información del linaje asociado (opcional, para contexto)
    const query = `*[_type == "product"] | order(_createdAt desc) {
        title,
        "slug": slug.current,
        price,
        description, // O un campo específico 'shortDescription' si lo tienes
        // Tomamos la URL de la primera imagen de la galería como imagen principal
        "mainImageUrl": gallery[0].asset->url,
        // Opcional: Si tienes un campo 'mainImage' específico, úsalo:
        // "mainImageUrl": mainImage.asset->url,
        "linajeInfo": linaje->{ "slug": slug.current, "title": title } // Opcional
    }`;

    try {
        const products = await client.fetch(query);

        if (products) {
            // Devolvemos un objeto 'products' que contendrá el array
            return {
                products: products
            };
        }

        // Si no hay productos, podríamos devolver un array vacío o manejarlo como prefieras
        return {
            products: []
        };

    } catch (err) {
        console.error('Error fetching products from Sanity:', err);
        // Lanzamos un error del servidor si falla la consulta
        throw error(500, 'No se pudieron cargar los productos');
    }
}