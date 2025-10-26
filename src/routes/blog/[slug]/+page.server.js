// src/routes/blog/[slug]/+page.server.js
import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
  const { slug } = params;
  const baseUrl = url.origin; // Para URLs dinámicas en el schema

  // --- CONSULTA GROQ FINAL Y LIMPIA ---
  // Pide todos los campos necesarios y expande las referencias
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    subtitle,
    publishedAt,
    _updatedAt,
    "mainImageUrl": mainImage.asset->url,
    body,
    seoTitle,
    seoDescription,
    slug { current },
    
    // --- DATOS DE AUTOR PARA E-E-A-T ---
    author->{ 
      name,
      "image": image.asset->url,
      bio,
      socialLink,
      "authorSlug": slug.current // <--- ¡AÑADE ESTA LÍNEA!
    },
    // --- FIN DATOS DE AUTOR ---

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

    // --- CONSTRUCCIÓN SEGURA DEL OBJETO 'post' ---
    // Se asegura de que todos los campos tengan un valor por defecto seguro
    const post = {
      title: rawPostData.title || 'Sin Título',
      subtitle: rawPostData.subtitle || null,
      publishedAt: rawPostData.publishedAt || new Date().toISOString(),
      _updatedAt: rawPostData._updatedAt || new Date().toISOString(),
      mainImageUrl: rawPostData.mainImageUrl || null,
      body: Array.isArray(rawPostData.body) ? rawPostData.body : [],
      seoTitle: rawPostData.seoTitle || rawPostData.title || 'Sin Título',
      seoDescription: rawPostData.seoDescription || '',
      slug: rawPostData.slug || { current: slug },
      apellidosRelacionados: Array.isArray(rawPostData.apellidosRelacionados) ? rawPostData.apellidosRelacionados : [],
      faqSection: Array.isArray(rawPostData.faqSection) ? rawPostData.faqSection : null,
      
      // --- INICIO DE LA CORRECCIÓN DE AUTOR ---
      // Pasamos el objeto 'author' completo, con fallbacks seguros
      // para evitar errores en el frontend si un campo viene nulo.
      author: rawPostData.author ? {
          name: rawPostData.author.name || '1egacy Studio',
          image: rawPostData.author.image || null,
          bio: rawPostData.author.bio || null,
          socialLink: rawPostData.author.socialLink || null,
          authorSlug: rawPostData.author.authorSlug || null, // <--- ¡AÑADE ESTA LÍNEA!
        } : {
          // Fallback si NINGÚN autor está asignado al post
          name: '1egacy Studio',
          image: null,
          bio: null,
          socialLink: null,
          authorSlug: null // <--- ¡Y AÑÁDALA AQUÍ TAMBIÉN!
        }
      // --- FIN DE LA CORRECCIÓN DE AUTOR ---
    };

    // Devolvemos el post Y la baseUrl para las URLs del schema
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