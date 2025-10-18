// src/routes/blog/[slug]/+page.server.js

import { client } from '$lib/sanityClient.js';

import { error } from '@sveltejs/kit';



export async function load({ params }) {

  const { slug } = params;

  console.log(`[DEBUG Load Start] Slug: ${slug}`); // LOG 1



  const query = `*[_type == "post" && slug.current == $slug][0]{

    // Pedimos todo como antes, incluyendo el autor y faq

    title,

    subtitle,

    publishedAt,

    _updatedAt,

    "mainImageUrl": mainImage.asset->url,

    body,

    seoTitle,

    seoDescription,

    apellidosRelacionados,

    author->{

      name

    },

    faqSection

  }`;

 

  let rawPostData = null; // Para guardar el resultado crudo



  try {

    console.log('[DEBUG] Fetching Sanity data...'); // LOG 2

    rawPostData = await client.fetch(query, { slug });

    console.log('[DEBUG] Raw Sanity Result:', JSON.stringify(rawPostData, null, 2)); // LOG 3



    if (!rawPostData) {

      console.log('[DEBUG] Post not found in Sanity.'); // LOG 4

      throw error(404, 'Artículo no encontrado');

    }



    // --- CONSTRUCCIÓN SEGURA DEL OBJETO 'post' (CORREGIDA) ---

    const post = {

      title: typeof rawPostData.title === 'string' ? rawPostData.title : 'Sin Título',

      subtitle: typeof rawPostData.subtitle === 'string' ? rawPostData.subtitle : null,

      publishedAt: typeof rawPostData.publishedAt === 'string' ? rawPostData.publishedAt : new Date().toISOString(),

      _updatedAt: typeof rawPostData._updatedAt === 'string' ? rawPostData._updatedAt : new Date().toISOString(),

      mainImageUrl: typeof rawPostData.mainImageUrl === 'string' ? rawPostData.mainImageUrl : null,

      body: Array.isArray(rawPostData.body) ? rawPostData.body : [],

      seoTitle: typeof rawPostData.seoTitle === 'string' ? rawPostData.seoTitle : (rawPostData.title || 'Sin Título'),

      seoDescription: typeof rawPostData.seoDescription === 'string' ? rawPostData.seoDescription : '',

     

      apellidosRelacionados: Array.isArray(rawPostData.apellidosRelacionados)

        ? rawPostData.apellidosRelacionados.filter(item => typeof item === 'string' && item.trim() !== '')

        : [],

       

      // --- SECCIÓN CORREGIDA ---

      faqSection: Array.isArray(rawPostData.faqSection) ? rawPostData.faqSection : null, // <-- Coma aquí



      author: (rawPostData.author && typeof rawPostData.author === 'object' && typeof rawPostData.author.name === 'string')

        ? { name: rawPostData.author.name } // Solo pasamos 'name'

        : null // Si no, garantizamos que sea null

      // --- SIN coma aquí porque es el último elemento ---

    }; // <-- ÚNICO CIERRE DEL OBJETO 'post'

    // --- FIN CONSTRUCCIÓN SEGURA ---



    console.log('[DEBUG] Cleaned Post Object:', JSON.stringify(post, null, 2)); // LOG 5

    return { post }; // Retornamos el objeto limpio y seguro



  } catch (err) {

    console.error('[DEBUG] CATCH BLOCK ERROR:', err); // LOG 6

    console.error('[DEBUG] Raw data before error (if available):', JSON.stringify(rawPostData, null, 2));

   

    if (err.status === 404) {

      throw err;

    } else {

      const errorMessage = err.message || 'Error desconocido en load function';

      throw error(500, `Error interno del servidor: ${errorMessage}`);

    }

  }

} // <-- LLAVE DE CIERRE FINAL DE LA FUNCIÓN load