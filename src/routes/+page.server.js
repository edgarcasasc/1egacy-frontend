import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        // 1. Fetch todos los productos que tengan categoría definida
        const products = await client.fetch(`*[_type == "product" && defined(category)] {
            title,
            "slug": slug.current,
            price,
            description, // Para posible uso futuro, aunque no se muestre en home
            "mainImageUrl": gallery[0].asset->url,
            "category": category->{ title, "slug": slug.current } // Necesitamos el slug de categoría
        }`);

        if (!products || products.length === 0) {
            // Si no hay productos, devolvemos un array vacío para evitar errores
            return { featuredProducts: [] };
        }

        // 2. Agrupar productos por slug de categoría
        const productsByCategory = products.reduce((acc, product) => {
            const categorySlug = product.category?.slug;
            if (categorySlug) {
                if (!acc[categorySlug]) {
                    acc[categorySlug] = [];
                }
                acc[categorySlug].push(product);
            }
            return acc;
        }, {});

        // 3. Seleccionar aleatoriamente hasta 3 categorías distintas
        const availableCategorySlugs = Object.keys(productsByCategory);
        const numberOfCategoriesToShow = Math.min(3, availableCategorySlugs.length); // Máximo 3 o las disponibles

        let featuredProducts = [];
        if (numberOfCategoriesToShow > 0) {
            // Barajar las categorías disponibles
            const shuffledCategorySlugs = availableCategorySlugs.sort(() => 0.5 - Math.random());
            // Tomar las primeras N categorías barajadas
            const selectedCategorySlugs = shuffledCategorySlugs.slice(0, numberOfCategoriesToShow);

            // 4. Seleccionar un producto aleatorio de cada categoría elegida
            selectedCategorySlugs.forEach(slug => {
                const categoryProducts = productsByCategory[slug];
                if (categoryProducts && categoryProducts.length > 0) {
                    const randomIndex = Math.floor(Math.random() * categoryProducts.length);
                    featuredProducts.push(categoryProducts[randomIndex]);
                }
            });
             // Opcional: Barajar el resultado final si quieres que el orden también sea aleatorio
             featuredProducts.sort(() => 0.5 - Math.random());
        }

        // Aquí podrías añadir fetch de otros datos necesarios para la home (ej. últimos posts del blog)
        // const latestPosts = await client.fetch(`*[_type == "post"] | order(_createdAt desc)[0...3]{ title, "slug": slug.current }`);

        return {
            featuredProducts: featuredProducts,
            // latestPosts: latestPosts || []
        };

    } catch (err) {
        console.error('Error loading data for homepage:', err);
        // Es mejor devolver datos vacíos que romper la home por productos destacados
        return {
             featuredProducts: []
             // latestPosts: []
             // Considera lanzar error si falla una carga de datos *crítica* para la home
        };
    }
}

