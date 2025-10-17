// src/routes/sitemap.xml/+server.js
import { client } from '$lib/sanityClient'; // Asegúrate que la ruta a tu cliente Sanity sea correcta

// URL base de tu sitio
const siteUrl = 'https://somos1egacy.com';

export async function GET() {
    try {
        // 1. Obtener los slugs y fechas de actualización de todos los posts publicados
        const postsQuery = `*[_type == "post" && defined(slug.current) && publishedAt < now()] | order(publishedAt desc) {
            "slug": slug.current,
            _updatedAt // Usamos _updatedAt para lastmod si está disponible
        }`;
        const posts = await client.fetch(postsQuery);

        // 2. Definir páginas estáticas (añade más según necesites)
        const staticPages = [
            { path: '/', priority: 1.0, changefreq: 'daily' },
            { path: '/origins', priority: 0.8, changefreq: 'weekly' },
            { path: '/studio', priority: 0.7, changefreq: 'monthly' },
            { path: '/films', priority: 0.7, changefreq: 'monthly' },
            { path: '/el-codice', priority: 0.9, changefreq: 'weekly' }, // Asumiendo que esta es la página principal del blog
            // Agrega aquí otras páginas importantes como /contacto, /sobre-nosotros, etc.
        ];

        // 3. Construir el XML del sitemap
        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(page => `
        <url>
            <loc>${siteUrl}${page.path}</loc>
            <priority>${page.priority}</priority>
            <changefreq>${page.changefreq}</changefreq>
        </url>
    `).join('')}
    ${posts.map(post => `
        <url>
            <loc>${siteUrl}/blog/${post.slug}</loc>
            <lastmod>${new Date(post._updatedAt).toISOString().split('T')[0]}</lastmod> 
            <priority>0.7</priority>
            <changefreq>monthly</changefreq>
        </url>
    `).join('')}
</urlset>`;

        // 4. Devolver la respuesta XML
        return new Response(sitemapXml.trim(), {
            headers: {
                'Content-Type': 'application/xml'
            }
        });

    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Devolver un error 500 si algo falla
        return new Response('Internal Server Error', { status: 500 });
    }
}