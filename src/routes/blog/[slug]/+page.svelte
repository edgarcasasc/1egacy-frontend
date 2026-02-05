<script>
    import { PortableText } from '@portabletext/svelte';
    import SanityImage from '$lib/components/SanityImage.svelte';
    import Table from '$lib/components/serializers/Table.svelte';
    
    // CORRECCIÓN: Usamos la ruta relativa original para encontrar el archivo
    import FaqItem from '../../../components/FaqItem.svelte'; 

    export let data;
    const { post, baseUrl } = data; 

    // --- 1. CONFIGURACIÓN TÉCNICA ---
    const safeBaseUrl = baseUrl || 'https://somos1egacy.com';
    
    // URL Canónica
    $: currentSlug = post?.slug?.current;
    $: permalink = currentSlug ? `${safeBaseUrl}/blog/${currentSlug}` : `${safeBaseUrl}/blog`;

    // Título SEO
    $: pageTitle = post?.seoTitle 
        ? (post.seoTitle.includes('1egacy') ? post.seoTitle : `${post.seoTitle} | 1egacy`)
        : `${post?.title || 'Artículo'} | 1egacy`;

    // Imagen OG
    $: ogImage = post?.mainImage?.url 
        ? `${post.mainImage.url}?w=1200&h=630&fit=crop&auto=format` 
        : `${safeBaseUrl}/og-default.jpg`;

    // --- 2. DATOS DE AUTORIDAD (E-E-A-T) ---
    const AUTHOR_AUTHORITY = {
        name: "Ovidio Casas Jr.",
        jobTitle: "Historiador Genealógico",
        url: "https://edgar.casascamarillo.com/",
        sameAs: [
            "https://www.linkedin.com/in/edgar-ovidio-camarillo-camarillo/",
            "https://x.com/EdyKzaz"
        ]
    };

    // --- 3. PROCESAMIENTO DE FAQs ---
    $: validFaqsForTemplate = (post && Array.isArray(post.faqSection))
        ? post.faqSection.filter((item) => item?.question && item?.answer)
        : [];

    // --- 4. SCHEMA.ORG BLINDADO (El arreglo del crash) ---
    $: jsonLd = (() => {
        if (!post) return null; // <--- ESTO EVITA EL ERROR CRÍTICO

        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": `${safeBaseUrl}/#organization`,
                    "name": "1egacy",
                    "url": safeBaseUrl,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${safeBaseUrl}/logo1egacy.svg`
                    },
                    "sameAs": AUTHOR_AUTHORITY.sameAs
                },
                {
                    "@type": "WebSite",
                    "@id": `${safeBaseUrl}/#website`,
                    "url": safeBaseUrl,
                    "name": "1egacy",
                    "publisher": { "@id": `${safeBaseUrl}/#organization` },
                    "inLanguage": "es-MX"
                },
                {
                    "@type": "BreadcrumbList",
                    "@id": `${permalink}/#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": safeBaseUrl },
                        { "@type": "ListItem", "position": 2, "name": "El Códice", "item": `${safeBaseUrl}/blog` },
                        { "@type": "ListItem", "position": 3, "name": post.title, "item": permalink }
                    ]
                },
                {
                    "@type": "WebPage",
                    "@id": `${permalink}/#webpage`,
                    "url": permalink,
                    "name": pageTitle,
                    "isPartOf": { "@id": `${safeBaseUrl}/#website` },
                    "about": { "@id": `${safeBaseUrl}/#organization` },
                    "inLanguage": "es-MX",
                    "description": post.seoDescription || post.subtitle,
                    "breadcrumb": { "@id": `${permalink}/#breadcrumb` },
                    "datePublished": post.publishedAt,
                    "dateModified": post._updatedAt
                },
                {
                    "@type": "BlogPosting",
                    "@id": `${permalink}/#article`,
                    "mainEntityOfPage": { "@id": `${permalink}/#webpage` },
                    "headline": post.title,
                    "description": post.seoDescription || post.subtitle,
                    "image": post.mainImage?.url ? {
                        "@type": "ImageObject",
                        "url": post.mainImage.url,
                        "width": post.mainImage.asset?.metadata?.dimensions?.width || 1200,
                        "height": post.mainImage.asset?.metadata?.dimensions?.height || 630
                    } : undefined,
                    "author": {
                        "@type": "Person",
                        "@id": `${safeBaseUrl}/#ovidio-casas`,
                        "name": AUTHOR_AUTHORITY.name,
                        "url": AUTHOR_AUTHORITY.url,
                        "sameAs": AUTHOR_AUTHORITY.sameAs,
                        "worksFor": { "@id": `${safeBaseUrl}/#organization` }
                    },
                    "publisher": { "@id": `${safeBaseUrl}/#organization` },
                    "datePublished": post.publishedAt,
                    "dateModified": post._updatedAt,
                    "inLanguage": "es-MX"
                },
                ...(validFaqsForTemplate.length > 0 ? [{
                    "@type": "FAQPage",
                    "@id": `${permalink}/#faq`,
                    "mainEntity": validFaqsForTemplate.map(faq => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": Array.isArray(faq.answer) 
                                ? faq.answer.map(b => (b.children || []).map(c => c.text).join('')).join('\n') 
                                : String(faq.answer || '')
                        }
                    }))
                }] : [])
            ]
        };
    })();

    // --- 5. COMPONENTES ---
    const components = {
        types: {
            image: SanityImage,
            table: Table
        }
    };
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={post?.seoDescription || post?.subtitle || ''} />
    
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href={permalink} />

    <meta name="author" content={AUTHOR_AUTHORITY.name}>

    <meta property="og:site_name" content="1egacy" />
    <meta property="og:locale" content="es_MX" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={post?.seoDescription || post?.subtitle || ''} />
    <meta property="og:url" content={permalink} />
    <meta property="og:image" content={ogImage} />
    
    {#if post}
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post._updatedAt} />
        <meta property="og:updated_time" content={post._updatedAt} />
    {/if}
    <meta property="article:author" content={AUTHOR_AUTHORITY.url} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={post?.seoDescription || post?.subtitle || ''} />
    <meta name="twitter:image" content={ogImage} />

    {#if jsonLd}
        {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
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
                    por {AUTHOR_AUTHORITY.name}
                </p>

                {#if post.mainImage?.url}
                    <img
                        class="featured-image"
                        src={post.mainImage.url}
                        alt={post.mainImage.alt || post.title}
                        width={post.mainImage.asset?.metadata?.dimensions?.width}
                        height={post.mainImage.asset?.metadata?.dimensions?.height}
                        style={post.mainImage.asset?.metadata?.dimensions?.aspectRatio ? `aspect-ratio: ${post.mainImage.asset.metadata.dimensions.aspectRatio}` : ''}
                        fetchpriority="high"
                        loading="eager"
                        decoding="async"
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

            <section class="author-bio-box">
                {#if post.author?.image}
                     <img src={post.author.image} alt={AUTHOR_AUTHORITY.name} class="author-image" />
                {:else}
                     <div class="author-image-placeholder" style="width: 80px; height: 80px; background: #333; border-radius: 50%;"></div>
                {/if}
                
                <div class="author-info">
                    <p class="author-label">Escrito por</p>
                    <a href={AUTHOR_AUTHORITY.url} target="_blank" class="author-name-link">
                        <h3 class="author-name">{AUTHOR_AUTHORITY.name}</h3>
                    </a>
                    
                    <p class="author-bio">
                        Soy Ovidio Casas. Después de una vida en las aulas, hoy escribo el Códice: guiones, guías y reflexiones para investigar la historia familiar y convertirla en legado.
                    </p>
                    
                    <div class="author-actions">
                        <a href={AUTHOR_AUTHORITY.url} target="_blank" class="author-profile-button">
                            Ver perfil
                        </a>
                        <a href={AUTHOR_AUTHORITY.sameAs[1]} target="_blank" rel="noopener noreferrer author" class="author-social">
                            Conectar
                        </a>
                    </div>
                </div>
            </section>
           
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
        object-fit: cover; /* Asegura que la imagen llene el contenedor */
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