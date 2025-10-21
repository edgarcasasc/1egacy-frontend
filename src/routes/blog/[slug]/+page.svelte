<script>
    import { PortableText } from '@portabletext/svelte';
    // Usamos las importaciones que sabemos que funcionan para tu estructura
    import SanityImage from '$lib/components/SanityImage.svelte';
    import FaqItem from '../../../components/FaqItem.svelte';
    import Navbar from '../../../components/Navbar.svelte';


    export let data;
    const { post } = data;


    const components = {
        types: {
            image: SanityImage
        }
    };


    // --- PREPARACIÓN SEGURA DE DATOS PARA EL TEMPLATE ---
    // Filtramos el array de FAQs ANTES de pasarlo al template para evitar errores.
    const validFaqsForTemplate = Array.isArray(post?.faqSection)
        ? post.faqSection.filter((item) => item && typeof item === 'object' && item.question && item.answer)
        : [];


    // --- IMPLEMENTACIÓN DE SCHEMA MARKUP A PRUEBA DE ERRORES ---
    function createSchema(postData) {
        if (!postData) return {};


        const schema = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'Article',
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': `https://somos1egacy.com/blog/${postData.slug?.current || ''}`
                    },
                    headline: postData.title,
                    description: postData.seoDescription || postData.subtitle,
                    image: postData.mainImageUrl,
                    author: {
                        '@type': 'Person',
                        name: postData.author?.name || '1egacy Studio'
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: '1egacy',
                        logo: {
                            '@type': 'ImageObject',
                            url: 'https://somos1egacy.com/logo1egacy.svg' // Asegúrate de que este logo exista
                        }
                    },
                    datePublished: postData.publishedAt,
                    dateModified: postData._updatedAt
                }
            ]
        };


        if (validFaqsForTemplate.length > 0) {
            schema['@graph'].push({
                '@type': 'FAQPage',
                mainEntity: validFaqsForTemplate.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: Array.isArray(faq.answer)
                            ? faq.answer.map(block => block.children.map(child => child.text).join('')).join('\n')
                            : faq.answer
                    }
                }))
            });
        }
        return schema;
    }


    const schema = createSchema(post);
</script>


<svelte:head>
    <title>{post?.seoTitle || post?.title || 'Artículo'} | 1egacy</title>
    <meta name="description" content={post?.seoDescription || post?.snippet || ''} />


    {#if post && Object.keys(schema).length > 0}
        {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
    {/if}
</svelte:head>


<Navbar />


<div class="layout-container">
    {#if post}
        <article class="post-container">
            <header>
                <h1>{post.title}</h1>
                {#if post.subtitle}
                    <p class="subtitle">{post.subtitle}</p>
                {/if}
                <p class="meta">
                    Publicado el {new Date(post.publishedAt).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    {#if post.author?.name}
                        por {post.author.name}
                    {/if}
                </p>
                {#if post.mainImageUrl}
                    <img
                        class="featured-image"
                        src={post.mainImageUrl}
                        alt="Ilustración principal para el artículo: {post.title}"
                    />
                {/if}
            </header>


<div class="post-content">
                {#if post.body}
                    <PortableText value={post.body} {components} />
                {/if}
            </div>


            {#if validFaqsForTemplate.length > 0}
                <section class="faq-section">
                    <h2>Preguntas Frecuentes</h2>
                    <div class="faq-list">
                        {#each validFaqsForTemplate as faqItem}
                            <FaqItem {faqItem} {components} />
                        {/each}
                    </div>
                </section>
            {/if}
        </article>


<aside class="sidebar">
            <div class="sidebar-content">
 {#if post.apellidosRelacionados && post.apellidosRelacionados.length > 0}
 <h3>Legados Mencionados</h3>
                    <div class="anuncios-apellidos">
 {#each post.apellidosRelacionados as apellido}
<a href="/origins/{apellido.slug}" class="anuncio-card"> 
<img
 src="/escudos/{apellido.slug}.svg"
 alt="Escudo {apellido.nombre}"
 on:error={(e) => (e.target.style.display = 'none')}
 />
<span>Explorar el Legado {apellido.nombre}</span>
 </a>
 {/each}
 </div>
 {:else}
 <div class="anuncio-generico">
 <h3>¿Conoces la Historia de tu Apellido?</h3>
 <p>
 Cada linaje tiene una saga esperando ser contada. En 1egacy Origins, transformamos
 esa historia en arte.
 </p>
 <a href="/origins" class="boton-anuncio">Explorar la Constelación</a>
 </div>
 {/if}
 </div>
 </aside>
 {:else}
<div class="error-container">
 <h1>404</h1>
 <p>Artículo no encontrado.</p>
 </div>
 {/if}
</div>

<style>
    .layout-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 150px 2rem 60px 2rem;
        display: grid;
        grid-template-columns: 2.5fr 1fr; /* Diseño para escritorio */
        gap: 4rem;
        align-items: start;
    }


    .post-container {
        max-width: 800px;
    }


    header {
        text-align: center;
        margin-bottom: 3rem;
    }
    h1 {
        font-size: 3.2rem;
        line-height: 1.2;
        margin-bottom: 0.5rem;
    }
    .subtitle {
        font-size: 1.5rem;
        color: #aaa;
        margin-bottom: 1rem;
    }
    .meta {
        font-style: italic;
        color: #888;
    }
    .featured-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-top: 2rem;
        margin-bottom: 3rem;
    }


    .post-content {
        font-size: 1.1rem;
        line-height: 1.8;
    }


    .sidebar {
        position: sticky;
        top: 120px;
    }


    .sidebar-content {
        background-color: #1a1a1a;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #333;
    }


    .sidebar h3 {
        text-align: center;
        margin-top: 0;
        margin-bottom: 1.5rem;
    }


    .anuncio-generico {
        text-align: center;
    }


    .anuncio-generico p {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }
    .anuncio-generico .boton-anuncio {
        display: inline-block;
        text-decoration: none;
        background-color: #c0a062;
        color: #121212;
        padding: 0.8rem 2rem;
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }


    .anuncio-generico .boton-anuncio:hover {
        background-color: #ffffff;
    }


    .anuncios-apellidos {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .anuncio-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #333;
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
    }
    .anuncio-card:hover {
        border-color: #c0a062;
        background-color: #222;
    }
    .anuncio-card img {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
    }
    .anuncio-card span {
        font-weight: bold;
    }
   
    .faq-section {
        margin-top: 4rem;
        padding-top: 2rem;
        border-top: 1px solid #333;
    }
    .faq-section h2 {
        text-align: center;
        font-size: 2.2rem;
        margin-bottom: 2.5rem;
    }


    .error-container {
        grid-column: 1 / -1;
        text-align: center;
        padding: 5rem 0;
    }
   
    /* --- INICIO DE LA SECCIÓN RESPONSIVA --- */
    @media (max-width: 992px) {
        .layout-container {
            grid-template-columns: 1fr; /* Cambia a una sola columna */
            gap: 3rem;
            padding-top: 120px;
        }


        .sidebar {
            position: static; /* Quita el 'sticky' para que fluya normalmente */
            width: 100%;
            max-width: 500px;
            margin: 0 auto; /* Centra la barra lateral */
        }


        h1 {
            font-size: 2.5rem;
        }
        .subtitle {
            font-size: 1.3rem;
        }
    }


    @media (max-width: 576px) {
        .layout-container {
            padding: 100px 1rem 40px 1rem;
        }
        h1 {
            font-size: 2rem;
        }
        .post-content {
            font-size: 1rem;
        }
        .faq-section h2 {
            font-size: 1.8rem;
        }
    }
    /* --- FIN DE LA SECCIÓN RESPONSIVA --- */
</style>