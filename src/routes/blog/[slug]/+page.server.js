import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export const prerender = 'auto';

// Generación estática para rendimiento máximo en builds
export async function entries() {
    const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
    return slugs
        .filter(slug => slug && typeof slug === 'string' && slug.trim() !== '' && slug.trim() !== '/')
        .map(slug => ({ slug: slug.trim().replace(/^\/+|\/+$/g, '') }));
}

export async function load({ params }) {
    const { slug } = params;
    const baseUrl = 'https://somos1egacy.com'; // URL canónica base firme

    const query = `*[_type == "post" && slug.current == $slug][0]{
        title,
        subtitle,
        publishedAt,
        _updatedAt,
        mainImage { 
            "url": asset->url, 
            "alt": alt,
            asset->{ metadata { dimensions { width, height, aspectRatio } } } 
        },
        body[]{ 
            ..., 
            _type == "image" => { ..., asset->{ _id, url, metadata { dimensions { width, height, aspectRatio } } } }
        },
        seoTitle,
        seoDescription,
        slug { current },
        author->{ 
            name, 
            "image": image.asset->url, 
            bio, 
            socialLink, 
            "authorSlug": slug.current,
            "expertise": knowsAbout 
        },
        faqSection,
        "apellidosRelacionados": coalesce(apellidosRelacionados, [])[defined(_ref)]->{ 
            "slug": slug.current,
            "nombre": title,
            "escudoUrl": escudo.asset->url
        }
    }`;
    
    try {
        const rawPostData = await client.fetch(query, { slug });

        if (!rawPostData) {
            throw error(404, 'El artículo solicitado no existe.');
        }

        return { 
            post: rawPostData,
            baseUrl, // Enviamos esto al frontend para armar el canonical
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600'
            }
        };

    } catch (err) {
        if (err.status === 404) throw err;
        console.error('[CRITICAL BLOG ERROR]', err);
        throw error(503, 'Servicio temporalmente no disponible.');
    }
}