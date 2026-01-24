<script>
    import { PortableText } from '@portabletext/svelte';
    import SanityImage from '$lib/components/SanityImage.svelte';
    import FaqItem from '../../../components/FaqItem.svelte';

    export let data;

    // Extraemos datos y aseguramos la URL de producción
    const { post } = data;
    const safeBaseUrl = 'https://somos1egacy.com'; 
    const canonicalUrl = `${safeBaseUrl}/blog/${post?.slug?.current || ''}`;

    // --- MEJORA SEO: Título e Imagen Dinámica ---
    $: pageTitle = post?.seoTitle?.includes('1egacy') 
        ? post.seoTitle 
        : `${post?.seoTitle || post?.title || 'Artículo'} | 1egacy`;

    // Imagen para redes sociales
    const ogImage = post?.mainImage?.url 
        ? `${post.mainImage.url}?w=1200&h=630&fit=crop&auto=format` 
        : `${safeBaseUrl}/1egacy-og-logo.jpg`;
    
    const components = {
        types: {
            image: SanityImage
        }
    };

    // Preparación de FAQs
    const validFaqsForTemplate = Array.isArray(post?.faqSection)
        ? post.faqSection.filter((item) => item?.question && item?.answer)
        : [];

    // --- CONSTRUCCIÓN DEL GRAPH CONECTADO ---
    function createConnectedSchema(postData, domain) {
        if (!postData) return {};

        const currentUrl = `${domain}/blog/${postData.slug?.current || ''}`;
        const authorData = postData.author || {};
        
        const orgId = `${domain}/#organization`;
        const websiteId = `${domain}/#website`;
        const webpageId = `${currentUrl}#webpage`;
        const articleId = `${currentUrl}#article`;
        const personId = `${domain}/autor/${authorData.authorSlug || 'studio'}#person`;

        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Person",
                    "@id": personId,
                    "name": authorData.name || '1egacy Studio',
                    ...(authorData.image && { "image": authorData.image }),
                    ...(authorData.bio && { "description": authorData.bio }),
                    ...(authorData.socialLink && { "sameAs": [authorData.socialLink] }),
                    "worksFor": { "@id": orgId }
                },
                {
                    "@type": "WebPage",
                    "@id": webpageId,
                    "url": currentUrl,
                    "name": pageTitle,
                    "isPartOf": { "@id": websiteId },
                    "about": { "@id": orgId },
                    "description": postData.seoDescription || postData.subtitle,
                    "inLanguage": "es-MX"
                },
                {
                    "@type": "Article",
                    "@id": articleId,
                    "mainEntityOfPage": { "@id": webpageId },
                    "headline": postData.title,
                    "description": postData.seoDescription || postData.subtitle,
                    ...(postData.mainImage?.url && { "image": postData.mainImage.url }),
                    "author": { "@id": personId },
                    "publisher": { "@id": orgId },
                    "datePublished": postData.publishedAt,
                    "dateModified": postData._updatedAt,
                    "inLanguage": "es-MX"
                },
                ...(validFaqsForTemplate.length > 0 ? [{
                    "@type": "FAQPage",
                    "@id": `${currentUrl}#faq`,
                    "mainEntity": validFaqsForTemplate.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": Array.isArray(faq.answer)
                                ? faq.answer.map(b => (b.children || []).map(c => c.text).join('')).join('\n\n')
                                : String(faq.answer || '')
                        }
                    }))
                }] : [])
            ]
        };
    }

    const schema = createConnectedSchema(post, safeBaseUrl);
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={post?.seoDescription || post?.subtitle || ''} />
    
    <meta property="og:type" content="article" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={post?.seoDescription || post?.subtitle || ''} />
    <meta property="og:image" content={ogImage} />
    <meta property="article:published_time" content={post.publishedAt} />
    <meta property="article:author" content={post.author?.name || '1egacy Studio'} />

    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={post?.seoDescription || post?.subtitle || ''} />
    <meta name="twitter:image" content={ogImage} />

    {#if post && schema}
        {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
    {/if}
</svelte:head>

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
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}
                    {#if post.author?.name && post.author.name !== '1egacy Studio'}
                        por {post.author.name}
                    {/if}
                </p>
                {#if post.mainImage?.url}
                    <img
                        class="featured-image"
                        src={post.mainImage.url}
                        alt={post.mainImage.alt || post.title}
                        width={post.mainImage.dimensions?.width}
                        height={post.mainImage.dimensions?.height}
                        style={post.mainImage.dimensions?.aspectRatio ? `aspect-ratio: ${post.mainImage.dimensions.aspectRatio}` : ''}
                        loading="eager" 
                    />
                {/if}
            </header>

            <div class="cta-box">
                <p class="cta-heading">¿Quieres encontrar tu apellido en el Códice?</p>
                <a href="/origins" class="cta-button">Buscar mi apellido</a>
                <p class="cta-micro">Te mostramos artículos y legados relacionados.</p>
            </div>

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
                            <FaqItem {faqItem} />
                        {/each}
                    </div>
                </section>
            {/if}

            {#if post.author && post.author.name !== '1egacy Studio'}
                <section class="author-bio-box">
                    {#if post.author.image}
                        <img src={post.author.image} alt={post.author.name} class="author-image" />
                    {/if}
                    <div class="author-info">
                        <p class="author-label">Escrito por</p>
                        {#if post.author.authorSlug}
                            <a href="/autor/{post.author.authorSlug}" class="author-name-link">
                                <h3 class="author-name">{post.author.name}</h3>
                            </a>
                        {:else}
                            <h3 class="author-name">{post.author.name}</h3>
                        {/if}
                        
                        <p class="author-bio">
                            {#if post.author.name.includes('Ovidio')}
                                Soy Ovidio Casas. Después de una vida en las aulas, hoy escribo el Códice: guiones, guías y reflexiones para investigar la historia familiar y convertirla en legado.
                            {:else}
                                {post.author.bio || 'Investigador y custodio de historias en 1egacy.'}
                            {/if}
                        </p>
                        
                        <div class="author-actions">
                            {#if post.author.authorSlug}
                                <a href="/autor/{post.author.authorSlug}" class="author-profile-button">
                                    Ver perfil
                                </a>
                            {/if}
                            {#if post.author.socialLink}
                                <a href={post.author.socialLink} target="_blank" rel="noopener noreferrer author" class="author-social">
                                    Conectar
                                </a>
                            {/if}
                        </div>
                    </div>
                </section>
            {/if}
           
        </article>

        <aside class="sidebar">
            <div class="sidebar-content">
                {#if post.apellidosRelacionados?.length > 0}
                    <h3>Legados Mencionados</h3>
                    <p class="sidebar-micro">Relacionado con este artículo</p>
                    <div class="anuncios-apellidos">
                        {#each post.apellidosRelacionados as apellido}
                            <a href="/origins/{apellido.slug}" class="anuncio-card">
                                {#if apellido.escudoUrl} 
                                    <img src={apellido.escudoUrl} alt="Escudo {apellido.nombre}" width="50" height="50" />
                                {:else}
                                    <div class="escudo-placeholder"></div>
                                {/if}
                                <span>Legado {apellido.nombre}</span>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="anuncio-generico">
                        <h3>Tu apellido es una herencia.</h3>
                        <p>Si quieres precisión por rama familiar, inicia una investigación a medida en Origins.</p>
                        <a href="/solicitar-consulta" class="boton-anuncio">Iniciar Origins</a>
                        <p class="microcopy">Privado · 3 min · Te decimos el siguiente paso</p>
                    </div>
                {/if}
            </div>
        </aside>
    {/if}
</div>

<style>
    /* --- CTA BOX (EN EL CONTENIDO) --- */
    .cta-box {
        background: #1a1a1a;
        border: 1px solid #333;
        border-left: 3px solid #c0a062; /* Acento dorado */
        padding: 1.5rem;
        text-align: center;
        border-radius: 4px;
        margin: 2rem 0;
    }
    .cta-heading {
        margin-bottom: 1rem;
        font-weight: 700;
        color: #fff;
        font-size: 1.1rem;
    }
    .cta-button {
        display: inline-block;
        background: #c0a062;
        color: #121212;
        padding: 0.8rem 2rem;
        text-decoration: none;
        font-weight: 800;
        text-transform: uppercase;
        border-radius: 4px;
        transition: 0.3s;
        margin-bottom: 0.8rem;
    }
    .cta-button:hover {
        background: #fff;
        transform: translateY(-2px);
    }
    .cta-micro {
        font-size: 0.85rem;
        color: #888;
        margin: 0;
    }

    /* --- LAYOUT Y ESTILOS ORIGINALES --- */
    .layout-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0px 2rem 60px 2rem;
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        gap: 4rem;
        align-items: start;
    }

    .post-container { max-width: 800px; }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 3rem;
        width: 100%;
    }

    h1 { font-size: 3.2rem; line-height: 1.2; margin-bottom: 0.5rem; }
    .subtitle { font-size: 1.5rem; color: #aaa; margin-bottom: 1rem; }
    .meta { font-style: italic; color: #888; margin-top: 0.5rem; width: 100%; }

    .featured-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-top: 2rem;
        margin-bottom: 3rem;
        display: block;
        background-color: #eee;
    }

    .post-content { font-size: 1.1rem; line-height: 1.8; }

    /* --- SIDEBAR --- */
    .sidebar { position: sticky; top: 120px; }
    .sidebar-content { background-color: #1a1a1a; padding: 1.5rem; border-radius: 8px; border: 1px solid #333; }
    .sidebar h3 { text-align: center; margin-top: 0; margin-bottom: 0.5rem; color: #c0a062; }
    
    .sidebar-micro {
        text-align: center;
        font-size: 0.85rem;
        color: #888;
        margin-top: 0;
        margin-bottom: 1.5rem;
        font-style: italic;
    }

    /* Anuncio Genérico */
    .anuncio-generico { text-align: center; }
    .anuncio-generico p { font-size: 0.95rem; margin-bottom: 1.5rem; color: #ccc; line-height: 1.5; }
    
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
        width: 100%;
        box-sizing: border-box;
    }
    .anuncio-generico .boton-anuncio:hover { background-color: #ffffff; }

    .microcopy {
        font-size: 0.75rem;
        color: #666;
        margin-top: 0.8rem;
        margin-bottom: 0;
    }

    /* Lista Apellidos */
    .anuncios-apellidos { display: flex; flex-direction: column; gap: 1rem; }
    .anuncio-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #333;
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
        border-radius: 4px;
        background: #111;
    }
    .anuncio-card:hover { border-color: #c0a062; background-color: #222; transform: translateX(5px); }
    .anuncio-card img { width: 50px; height: 50px; flex-shrink: 0; object-fit: contain; }
    .anuncio-card span { font-weight: bold; }
    .escudo-placeholder { width: 50px; height: 50px; flex-shrink: 0; background-color: #333; border-radius: 4px; }

    .faq-section { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #333; }
    .faq-section h2 { text-align: center; font-size: 2.2rem; margin-bottom: 2.5rem; }

    /* Estilos de Autor */
    .author-bio-box { display: flex; gap: 1.5rem; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 2rem; margin-top: 4rem; }
    .author-image { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .author-info { flex-grow: 1; display: flex; flex-direction: column; gap: 0.5rem; }
    .author-label { font-size: 0.8rem; color: #777; text-transform: uppercase; }
    .author-name { margin: 0; color: #c0a062; font-size: 1.5rem; font-weight: 600; }
    .author-name-link { text-decoration: none; color: inherit; transition: color 0.2s ease; }
    .author-name-link:hover { color: #e0b87c; }
    .author-bio { color: #b0b0b0; margin: 0; font-size: 0.95rem; line-height: 1.6; }
    .author-actions { display: flex; gap: 1rem; align-items: center; margin-top: 1rem; }
    
    .author-profile-button {
        display: inline-block;
        padding: 0.6rem 1.2rem;
        background-color: transparent;
        border: 1px solid #c0a062;
        color: #c0a062;
        text-decoration: none;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: bold;
        transition: all 0.2s ease;
        text-transform: uppercase;
    }
    .author-profile-button:hover { background-color: #c0a062; color: #121212; }
    
    .author-social { font-weight: bold; font-size: 0.9rem; color: #a0a0a0; text-decoration: none; }
    .author-social:hover { text-decoration: underline; color: #c0a062; }

    @media (max-width: 992px) {
        .layout-container { grid-template-columns: 1fr; padding-top: 120px; }
        .sidebar { position: static; width: 100%; max-width: 500px; margin: 2rem auto 0; order: 3; }
        .post-container { order: 2; }
    }

    @media (max-width: 576px) {
        .author-bio-box { flex-direction: column; align-items: center; text-align: center; }
        .author-info { align-items: center; }
        h1 { font-size: 2rem; }
    }
</style>