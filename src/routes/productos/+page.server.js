import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) { // <-- Añadimos 'url' para leer parámetros
    // Leer el parámetro ?linaje= de la URL
    const linajeSlugFilter = url.searchParams.get('linaje'); // ej: 'camarillo'

    // --- Definir filtros GROQ ---
    let filters = ['_type == "product"', 'defined(category)']; // Filtros base
    let queryParams = {}; // Parámetros para la consulta

    // Añadir filtro de linaje si existe el parámetro en la URL
    if (linajeSlugFilter) {
        filters.push('linaje->slug.current == $linajeSlugFilter');
        queryParams.linajeSlugFilter = linajeSlugFilter;
        console.log(`Filtrando productos por linaje: ${linajeSlugFilter}`); // Log para depuración
    }

    // Unir los filtros con '&&'
    const filterString = filters.join(' && ');

    // --- Consultas GROQ ---
    // Consulta de Productos (con filtro dinámico)
    const productQuery = `*[${filterString}] | order(_createdAt desc) {
        title,
        "slug": slug.current,
        price,
        description,
        "mainImageUrl": gallery[0].asset->url,
        "category": category->{ title, "slug": slug.current },
        "linajeInfo": linaje->{ "slug": slug.current, "title": title } // Mantenemos linajeInfo por si acaso
    }`;

    // Consulta de Categorías (solo las usadas por los productos FILTRADOS si hay filtro de linaje)
    // O todas las categorías si no hay filtro de linaje.
    // Esto hace que los filtros de categoría se ajusten al linaje seleccionado.
    const categoryQuery = `*[_type == "category" && count(*[${filterString} && references(^._id)]) > 0] {
        title,
        "slug": slug.current
    } | order(title asc)`;


    try {
        // Ejecutamos ambas consultas en paralelo con los parámetros necesarios
        const [products, usedCategories] = await Promise.all([
            client.fetch(productQuery, queryParams), // <-- Pasamos queryParams
            client.fetch(categoryQuery, queryParams)  // <-- Pasamos queryParams también aquí
        ]);

        const categoryFilters = [
            { title: 'Todos', slug: 'todos' },
            ...usedCategories
        ];

        return {
            products: products || [],
            categoryFilters: categoryFilters,
            activeLinajeFilter: linajeSlugFilter || null // <-- Pasar el filtro activo a la página
        };

    } catch (err) {
        console.error('Error fetching dynamic catalog data from Sanity:', err);
        throw error(500, 'No se pudieron cargar los datos para el catálogo');
    }
}

