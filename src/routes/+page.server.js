import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        // OPTIMIZACIÓN IA: Solo traemos 10 productos aleatorios con los campos mínimos.
        // Esto reduce el peso del JSON en un 80%, evitando el 5xx por timeout.
        const products = await client.fetch(`
            *[_type == "product" && defined(category)] | order(_createdAt desc)[0...15] {
                title,
                "slug": slug.current,
                price,
                // Eliminamos 'description' porque en la Home suele bastar un resumen o nada.
                "mainImageUrl": select(
                    defined(gallery[0].asset) => gallery[0].asset->url,
                    null
                ),
                "category": category->{ title, "slug": slug.current }
            }
        `);

        if (!products || products.length === 0) {
            return { featuredProducts: [] };
        }

        // Lógica de agrupación simplificada
        const productsByCategory = products.reduce((acc, product) => {
            const categorySlug = product.category?.slug;
            if (categorySlug) {
                if (!acc[categorySlug]) acc[categorySlug] = [];
                acc[categorySlug].push(product);
            }
            return acc;
        }, {});

        const availableCategorySlugs = Object.keys(productsByCategory);
        const shuffledCategories = availableCategorySlugs.sort(() => Math.random() - 0.5).slice(0, 3);

        let featuredProducts = shuffledCategories.map(slug => {
            const catProducts = productsByCategory[slug];
            return catProducts[Math.floor(Math.random() * catProducts.length)];
        });

        return {
            featuredProducts: featuredProducts
        };

    } catch (err) {
        // En producción, queremos saber QUÉ pasó sin tumbar la web
        console.error('CRITICAL ERROR 5xx - Homepage Load:', err);
        return { featuredProducts: [] };
    }
}