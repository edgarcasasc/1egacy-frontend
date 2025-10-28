// src/routes/sitemap.xml/+server.js
import { client } from '$lib/sanityClient'; // Asegúrate que la ruta a tu cliente Sanity sea correcta

// URL base de tu sitio
const siteUrl = 'https://somos1egacy.com';

export async function GET() {
  try {
		// --- INICIO DE NUEVAS QUERIES ---

    // 1. Obtener Posts (Tu consulta original, perfecta)
    const postsQuery = `*[_type == "post" && defined(slug.current) && publishedAt < now()] {
      "slug": slug.current,
      _updatedAt 
    }`;

		// 2. NUEVO: Obtener Linajes/Orígenes
		// Asumo que tu tipo se llama 'linaje' y la URL es /origins/[slug]
		const linajesQuery = `*[_type == "linaje" && defined(slug.current)] {
			"slug": slug.current,
			_updatedAt
		}`;

		// 3. NUEVO: Obtener Autores
		const autoresQuery = `*[_type == "author" && defined(slug.current)] {
			"slug": slug.current,
			_updatedAt
		}`;

		// Ejecutar todas las consultas en paralelo
		const [posts, linajes, autores] = await Promise.all([
			client.fetch(postsQuery),
			client.fetch(linajesQuery),
			client.fetch(autoresQuery)
		]);

		// --- FIN DE NUEVAS QUERIES ---


    // 4. Definir páginas estáticas (Tu lista original)
    const staticPages = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/origins', priority: 0.8, changefreq: 'weekly' },
      { path: '/studio', priority: 0.7, changefreq: 'monthly' },
      { path: '/films', priority: 0.7, changefreq: 'monthly' },
      { path: '/el-codice', priority: 0.9, changefreq: 'weekly' }, 
    ];

    // 5. Construir el XML del sitemap
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

	  ${linajes.map(linaje => `
    <url>
      <loc>${siteUrl}/origins/${linaje.slug}</loc>
      <lastmod>${new Date(linaje._updatedAt).toISOString().split('T')[0]}</lastmod> 
      <priority>0.6</priority>
      <changefreq>yearly</changefreq>
    </url>
  `).join('')}

	  ${autores.map(autor => `
    <url>
      <loc>${siteUrl}/autor/${autor.slug}</loc>
      <lastmod>${new Date(autor._updatedAt).toISOString().split('T')[0]}</lastmod> 
      <priority>0.5</priority>
      <changefreq>yearly</changefreq>
    </url>
  `).join('')}
</urlset>`;

    // 6. Devolver la respuesta XML
    return new Response(sitemapXml.trim(), {
      headers: {
        'Content-Type': 'application/xml'
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}