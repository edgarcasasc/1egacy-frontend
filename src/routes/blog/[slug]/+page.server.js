import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

// --- LÍNEA MÁGICA ---
export const prerender = true;

// Esta función le dice a Netlify qué artículos debe "rasterizar" al publicar
export async function entries() {
    const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
    return slugs.map(slug => ({ slug }));
}

export async function load({ params, url }) {
    const { slug } = params;
const baseUrl = 'https://somos1egacy.com';
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
        author->{ name, "image": image.asset->url, bio, socialLink, "authorSlug": slug.current },
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
            throw error(404, 'Artículo no encontrado');
        }

        const post = {
            title: rawPostData.title || 'Sin Título',
            subtitle: rawPostData.subtitle || null,
            publishedAt: rawPostData.publishedAt || new Date().toISOString(),
            _updatedAt: rawPostData._updatedAt || new Date().toISOString(),
            mainImage: rawPostData.mainImage ? { 
                url: rawPostData.mainImage.url || null, 
                alt: rawPostData.mainImage.alt || null,
                dimensions: rawPostData.mainImage.asset?.metadata?.dimensions || null 
            } : { url: null, alt: null, dimensions: null }, 
            body: Array.isArray(rawPostData.body) ? rawPostData.body : [], 
            seoTitle: rawPostData.seoTitle || rawPostData.title || 'Sin Título',
            seoDescription: rawPostData.seoDescription || '',
            slug: rawPostData.slug || { current: slug },
            apellidosRelacionados: Array.isArray(rawPostData.apellidosRelacionados) ? rawPostData.apellidosRelacionados : [],
            faqSection: Array.isArray(rawPostData.faqSection) ? rawPostData.faqSection : null,
            author: rawPostData.author ? {
                    name: rawPostData.author.name || '1egacy Studio',
                    image: rawPostData.author.image || null,
                    bio: rawPostData.author.bio || null,
                    socialLink: rawPostData.author.socialLink || null,
                    authorSlug: rawPostData.author.authorSlug || null, 
                } : {
                    name: '1egacy Studio', image: null, bio: null, socialLink: null, authorSlug: null 
                }
        };

        return { post, baseUrl };

    } catch (err) {
        console.error('[SERVER LOAD ERROR]', err);
        // --- CAMBIO CRÍTICO: Nunca mandes un 500 ---
        return { 
            post: null, 
            baseUrl,
            error: "Estamos recuperando este legado, por favor refresca la página." 
        };
    }
}