// @ts-nocheck
// src/routes/productos/+page.server.js
import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Consulta para obtener TODOS los productos CON SU CATEGORÍA (título y slug)
    // Asegúrate que productType.ts tiene el campo 'category' tipo reference a 'category'
    const productQuery = `*[_type == "product" && defined(category)] | order(_createdAt desc) {
        title,
        "slug": slug.current,
        price,
        description,
        "mainImageUrl": gallery[0].asset->url,
        "category": category->{ title, "slug": slug.current } // Obtenemos título y slug de la categoría referenciada
    }`;

    // Consulta para obtener SÓLO las categorías que están referenciadas por al menos un producto
    const categoryQuery = `*[_type == "category" && count(*[_type == "product" && references(^._id)]) > 0] {
        title,
        "slug": slug.current
    } | order(title asc)`;

    try {
        // Ejecutamos ambas consultas en paralelo
        const [products, usedCategories] = await Promise.all([
            client.fetch(productQuery),
            client.fetch(categoryQuery)
        ]);

        // Preparamos los filtros añadiendo 'Todos' al inicio
        const categoryFilters = [
            { title: 'Todos', slug: 'todos' }, // Slug especial para mostrar todos
            ...(usedCategories || []) // Asegura que sea un array aunque no haya categorías
        ];

        // Devolvemos ambos: productos y la lista dinámica de filtros
        return {
            products: products || [],
            categoryFilters: categoryFilters
        };

    } catch (err) {
        console.error('Error fetching dynamic catalog data from Sanity:', err);
        // Lanzamos un error del servidor si falla alguna consulta
        throw error(500, 'No se pudieron cargar los datos para el catálogo');
    }
}
