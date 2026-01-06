import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

// --- LÍNEA MÁGICA ---
export const prerender = 'auto';

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
        // Mantenemos dimensiones para evitar errores de diseño (CLS)
        mainImage { 
            "url": asset->url, 
            "alt": alt,
            asset->{ metadata { dimensions { width, height, aspectRatio } } } 
        },
        // Mantenemos el procesado de imágenes dentro del texto
        body[]{ 
            ..., 
            _type == "image" => { ..., asset->{ _id, url, metadata { dimensions { width, height, aspectRatio } } } }
        },
        seoTitle,
        seoDescription,
        slug { current },
        // Enriquecemos al autor con "expertise" (GEO 2026) sin quitar su bio
        author->{ 
            name, 
            "image": image.asset->url, 
            bio, 
            socialLink, 
            "authorSlug": slug.current,
            "expertise": knowsAbout // <--- Señal crítica para Google 2026
        },
        faqSection,
        // Recuperamos tus escudos para que no desaparezcan de la vista
        "apellidosRelacionados": coalesce(apellidosRelacionados, [])[defined(_ref)]->{ 
            "slug": slug.current,
            "nombre": title,
            "escudoUrl": escudo.asset->url
        }
    }`;
    
   try {
        const rawPostData = await client.fetch(query, { slug });

        if (!rawPostData) {
            // ESTÁNDAR 2026: Lanzamos un 404 real. 
            // Esto limpia tus 29 errores en Google Search Console.
            throw error(404, 'El linaje de este artículo no existe.');
        }

        // Mantenemos tu lógica de "Safe Mapping" para que no se rompa el diseño
        const post = {
            title: rawPostData.title || 'Sin Título',
            subtitle: rawPostData.subtitle || null,
            publishedAt: rawPostData.publishedAt || new Date().toISOString(),
            _updatedAt: rawPostData._updatedAt || new Date().toISOString(),
            mainImage: rawPostData.mainImage || { url: null, alt: null },
            body: Array.isArray(rawPostData.body) ? rawPostData.body : [],
            seoTitle: rawPostData.seoTitle || rawPostData.title || 'Sin Título',
            seoDescription: rawPostData.seoDescription || '',
            author: rawPostData.author || { name: '1egacy Studio' },
            faqSection: rawPostData.faqSection || null,
            apellidosRelacionados: rawPostData.apellidosRelacionados || []
        };

        return { 
            post, 
            baseUrl,
            // ESTÁNDAR 2026: Esto hace que la página sea "Estática" y ultra rápida,
            // pero se actualiza sola en el fondo si cambias algo en Sanity.
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600'
            }
        };

    } catch (err) {
        // Si nosotros mismos lanzamos el 404 arriba, dejamos que pase.
        if (err.status === 404) throw err;

        console.error('[CRITICAL BLOG ERROR 5xx]', err);
        
        // ESTÁNDAR 2026: Si Sanity falla, devolvemos 503 (Servicio no disponible).
        // Google no te penaliza por un 503 temporal, pero sí por un 500.
        throw error(503, 'Sincronizando el servidor de linajes...');
    }
}