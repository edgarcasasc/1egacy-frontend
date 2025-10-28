import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
	const { slug } = params;
	const baseUrl = url.origin; // Para URLs dinámicas en el schema

	// --- CONSULTA GROQ COMPLETA Y CORREGIDA ---
	const query = `*[_type == "post" && slug.current == $slug][0]{
		title,
		subtitle,
		publishedAt,
		_updatedAt,
		
		// Pide mainImage como objeto (url + alt + dimensions)
		mainImage { 
			"url": asset->url, 
			"alt": alt,
			asset->{ // Expande la referencia del asset para obtener dimensiones
				metadata { 
					dimensions {
						width,
						height,
						aspectRatio
					}
				}
			} 
		},
		
		// Pide body y proyecta dentro para imágenes
		body[]{ 
			..., // Incluye todos los campos por defecto (texto, etc.)
			_type == "image" => { // Si el bloque es de tipo imagen...
				..., // Incluye campos definidos para la imagen (alt, caption, etc.)
				asset->{ // Expande la referencia del asset
					_id, // Incluimos el ID por si acaso
					url, // Trae la URL de la imagen
					metadata { 
						dimensions { // ¡AQUÍ ESTÁ EL CAMBIO! Pedimos las dimensiones
							width,
							height,
							aspectRatio 
						}
					} 
				}
			}
		},

		seoTitle,
		seoDescription,
		slug { current },
		
		// DATOS DE AUTOR PARA E-E-A-T
		author->{ 
			name,
			"image": image.asset->url,
			bio,
			socialLink,
			"authorSlug": slug.current 
		},

		faqSection,
		"apellidosRelacionados": coalesce(apellidosRelacionados, [])[defined(_ref)]->{ 
			"slug": slug.current,
			"nombre": title,
			"escudoUrl": escudo.asset->url
		}
	}`;
	// --- FIN DE LA CONSULTA GROQ ---
	
	try {
		const rawPostData = await client.fetch(query, { slug });

		if (!rawPostData) {
			throw error(404, 'Artículo no encontrado');
		}

		// --- CONSTRUCCIÓN SEGURA DEL OBJETO 'post' ---
		// Asegúrate de procesar mainImage para incluir dimensiones si las necesitas directamente en 'post'
		const post = {
			title: rawPostData.title || 'Sin Título',
			subtitle: rawPostData.subtitle || null,
			publishedAt: rawPostData.publishedAt || new Date().toISOString(),
			_updatedAt: rawPostData._updatedAt || new Date().toISOString(),
			// Modificación para pasar dimensiones de mainImage si existen
			mainImage: rawPostData.mainImage ? { 
				url: rawPostData.mainImage.url || null, 
				alt: rawPostData.mainImage.alt || null,
				dimensions: rawPostData.mainImage.asset?.metadata?.dimensions || null 
			} : { url: null, alt: null, dimensions: null }, 
			
			// El body ya viene procesado por la consulta GROQ
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
					name: '1egacy Studio',
					image: null,
					bio: null,
					socialLink: null,
					authorSlug: null 
				}
		};

		return { post, baseUrl };

	} catch (err) {
		console.error('[SERVER LOAD ERROR]', err);
		if (err.status === 404) {
			throw err;
		} else {
			throw error(500, `Error interno al cargar el post: ${err.message}`);
		}
	}
}