import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) { 
    // Leer el parámetro ?linaje= de la URL
    const linajeSlugFilter = url.searchParams.get('linaje'); 

    // --- Definir filtros GROQ ---
    // AQUÍ ESTÁ EL CAMBIO CLAVE: Agregamos la condición para excluir ocultos
    let filters = [
        '_type == "product"', 
        'defined(category)',
        'availabilityStatus != "hidden"' // <--- ¡ESTO FILTRA LOS OCULTOS!
    ]; 
    
    let queryParams = {}; 

    // Añadir filtro de linaje si existe el parámetro en la URL
    if (linajeSlugFilter) {
        filters.push('linaje->slug.current == $linajeSlugFilter');
        queryParams.linajeSlugFilter = linajeSlugFilter;
    }

    // Unir los filtros con '&&'
    const filterString = filters.join(' && ');

    // --- Consultas GROQ ---
    const productQuery = `*[${filterString}] | order(_createdAt desc) {
        title,
        "slug": slug.current,
        price,
        description,
        "mainImageUrl": gallery[0].asset->url,
        "category": category->{ title, "slug": slug.current },
        "linajeInfo": linaje->{ "slug": slug.current, "title": title },
        availabilityStatus // (Opcional) Por si quieres depurar
    }`;

    // Consulta de Categorías (dinámica basada en los filtros activos)
    const categoryQuery = `*[_type == "category" && count(*[${filterString} && references(^._id)]) > 0] {
        title,
        "slug": slug.current
    } | order(title asc)`;

    try {
        const [products, usedCategories] = await Promise.all([
            client.fetch(productQuery, queryParams), 
            client.fetch(categoryQuery, queryParams)
        ]);

        const categoryFilters = [
            { title: 'Todos', slug: 'todos' },
            ...usedCategories
        ];

        return {
            products: products || [],
            categoryFilters: categoryFilters,
            activeLinajeFilter: linajeSlugFilter || null 
        };

    } catch (err) {
        console.error('Error fetching dynamic catalog data from Sanity:', err);
        throw error(500, 'No se pudieron cargar los datos para el catálogo');
    }
}