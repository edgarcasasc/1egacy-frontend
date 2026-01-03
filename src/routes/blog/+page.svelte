<script lang="ts">
    import { page } from '$app/stores';
    import { fade, fly } from 'svelte/transition';
    
    export let data;
    const { topics, mostRead, searchIndex } = data; 

    const safeBaseUrl = 'https://somos1egacy.com';
    $: canonicalUrl = `${safeBaseUrl}/blog`;
    const ogImage = `${safeBaseUrl}/og-blog-codice.jpg`;

    // --- 1) LÓGICA DE BÚSQUEDA (Solo UI) ---
    let searchTerm = '';
    $: searchResults = searchTerm 
        ? searchIndex.filter(p => {
            const term = searchTerm.toLowerCase();
            return p.title?.toLowerCase().includes(term) || 
                   p.subtitle?.toLowerCase().includes(term) ||
                   p.apellidos?.some(a => a.toLowerCase().includes(term));
        })
        : [];

    // --- 2) SCHEMA REACTIVO Y ESTÁTICO (Fuente de Verdad) ---
    // ✅ Reactive ($:): Se actualiza si la data cambia, pero es independiente del buscador
    $: staticSchemaItems = topics
        .flatMap(t => t.posts)
        .slice(0, 10)
        .map((post, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": `${safeBaseUrl}/blog/${post.slug}`,
            "name": post.title
        }));

    $: fullSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${safeBaseUrl}/blog/#webpage`,
                "url": canonicalUrl,
                "name": "El Códice: Sabiduría y Linaje | 1egacy",
                "isPartOf": { "@id": `${safeBaseUrl}/#website` },
                "inLanguage": "es-MX",
                "description": "Repositorio de sabiduría heráldica y narrativa de legados.",
                "mainEntity": {
                    "@type": "ItemList",
                    "numberOfItems": staticSchemaItems.length,
                    "itemListElement": staticSchemaItems
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${safeBaseUrl}/blog/#breadcrumb`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": safeBaseUrl },
                    { "@type": "ListItem", "position": 2, "name": "El Códice", "item": canonicalUrl }
                ]
            }
        ]
    };
</script>

<svelte:head>
    <title>El Códice: Sabiduría y Linaje | 1egacy</title>
    <meta name="description" content="Busca tu apellido y explora el archivo vivo de 1egacy: historias de legado e investigación de linajes." />
    <link rel="canonical" href={canonicalUrl} />

    <link rel="alternate" hreflang="es-MX" href={canonicalUrl} />
    <link rel="alternate" hreflang="es" href={canonicalUrl} />
    <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_MX" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content="El Códice: Sabiduría y Linaje | 1egacy" />
    <meta property="og:description" content="Busca tu apellido y explora el archivo vivo de 1egacy." />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:alt" content="Portada de El Códice: Archivo vivo de 1egacy" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <meta name="twitter:site" content="@somos1egacy" />
    <meta name="twitter:creator" content="@somos1egacy" />
    <meta name="twitter:title" content="El Códice: Sabiduría y Linaje | 1egacy" />
    <meta name="twitter:description" content="Busca tu apellido y explora el archivo vivo de 1egacy." />
    <meta name="twitter:image" content={ogImage} />

    {@html `<script type="application/ld+json">${JSON.stringify(fullSchema)}<\/script>`}
</svelte:head>

<div class="blog-main-layout">
    <aside class="blog-sidebar">
        <div class="sidebar-sticky-content">
            <div class="search-section">
                <h3 class="sidebar-label">Rastrear mi Linaje</h3>
                <div class="search-input-wrapper">
                    <input type="text" bind:value={searchTerm} placeholder="Ej: Aguilar..." aria-label="Buscar" />
                    <span class="search-icon">🔍</span>
                </div>
            </div>

            <div class="most-read-section">
                <h3 class="sidebar-label">Sabiduría Destacada</h3>
                <div class="most-read-list">
                    {#each mostRead as post, i}
                        <a href="/blog/{post.slug}" class="most-read-item">
                            <span class="rank">{i + 1}</span>
                            <div class="item-info">
                                <h4>{post.title}</h4>
                                <span class="topic-tag">{post.topicTitle || 'Destacado'}</span>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    </aside>

    <main class="blog-content">
        {#if searchTerm}
            <section class="search-results-view" in:fade>
                <header class="results-header">
                    <h2>Hallazgos para: "{searchTerm}"</h2>
                    <p>{searchResults.length} registros encontrados</p>
                    <button class="clear-search" on:click={() => searchTerm = ''}>Volver</button>
                </header>
                <div class="posts-grid">
                    {#each searchResults as post (post.slug)}
                        <a href="/blog/{post.slug}" class="post-preview-card">
                            <div class="card-image-wrapper">
                                <img src={`${post.mainImageUrl}?w=500&h=300&fit=crop`} alt={post.title} width="500" height="300" loading="lazy" />
                            </div>
                            <div class="post-info">
                                <h3>{post.title}</h3>
                                <span class="read-more">Leer Registro &rarr;</span>
                            </div>
                        </a>
                    {/each}
                </div>
            </section>
        {:else}
            <header class="clusters-header"> 
                <h1>El Códice</h1>
                <p>Un archivo vivo: ideas, hallazgos y fragmentos que merecen permanecer.</p>
            </header>
            {#each topics as topic (topic._id)} 
                <section class="topic-cluster">
                    <div class="topic-header">
                        <a href="/blog/topic/{topic.slug}"><h2>{topic.title}</h2></a>
                    </div>
                    <div class="posts-grid"> 
                        {#each topic.posts as post (post.slug)} 
                            <a href="/blog/{post.slug}" class="post-preview-card"> 
                                <div class="card-image-wrapper">
                                    <img src={`${post.mainImageUrl}?w=500&h=300&fit=crop`} alt={post.title} width="500" height="300" loading="lazy" />
                                </div>
                                <div class="post-info">
                                    <h3>{post.title}</h3> 
                                    <span class="read-more">Leer más &rarr;</span>
                                </div>
                            </a>
                        {/each}
                    </div>
                </section>
            {/each}
        {/if}
    </main>
</div>

<style>
    /* LAYOUT TIPO AMAZON (SIDEBAR + CONTENIDO) */
    .blog-main-layout { display: grid; grid-template-columns: 320px 1fr; gap: 5rem; max-width: 1400px; margin: 0 auto; padding: 160px 2rem 80px; }
    .blog-sidebar { border-right: 1px solid #1a1a1a; padding-right: 2rem; }
    .sidebar-sticky-content { position: sticky; top: 120px; }
    .sidebar-label { font-size: 0.7rem; text-transform: uppercase; color: #c0a062; font-weight: 800; }
    .search-section { margin-bottom: 4rem; }
    .search-input-wrapper { background: #0d0d0d; border: 1px solid #2a2a2a; border-radius: 4px; padding: 0.8rem; display: flex; align-items: center; }
    .search-input-wrapper input { background: transparent; border: none; color: #fff; width: 100%; outline: none; font-size: 0.9rem; }
    .search-icon { opacity: 0.4; }

    /* MÁS LEÍDOS */
    .most-read-item { display: flex; gap: 1rem; padding: 1.2rem 0; border-bottom: 1px solid #151515; text-decoration: none; transition: opacity 0.3s; }
    .most-read-item:hover { opacity: 0.7; }
    .rank { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #c0a062; opacity: 0.5; }
    .item-info h4 { color: #fff; font-size: 0.9rem; margin: 0 0 0.2rem; line-height: 1.3; }
    .topic-tag { font-size: 0.65rem; color: #666; text-transform: uppercase; }

    /* GRID Y CONTENIDO PRINCIPAL */
    .clusters-header { margin-bottom: 5rem; text-align: left; }
    .clusters-header h1 { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1rem; }
    .topic-cluster { margin-bottom: 6rem; }
    .topic-header h2 { font-size: 2rem; color: #c0a062; margin-bottom: 1.5rem; }
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2.5rem; }
    
    .post-preview-card { background: #0d0d0d; border: 1px solid #1a1a1a; display: flex; flex-direction: column; height: 100%; text-decoration: none; transition: 0.3s; }
    .post-preview-card:hover { border-color: #c0a062; transform: translateY(-5px); }
    
    .card-image-wrapper { height: 180px; overflow: hidden; }
    .card-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
    
    .post-info { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
    .post-info h3 { color: #fff; font-size: 1.2rem; margin-bottom: 1rem; line-height: 1.3; }
    .read-more { margin-top: auto; color: #c0a062; font-weight: bold; font-size: 0.8rem; }
    
    .topic-label { font-size: 0.6rem; text-transform: uppercase; color: #c0a062; margin-bottom: 0.5rem; display: block; }
    .results-header { margin-bottom: 3rem; }
    .clear-search { background: none; border: 1px solid #c0a062; color: #c0a062; padding: 0.5rem 1rem; margin-top: 1rem; cursor: pointer; font-size: 0.8rem; border-radius: 4px; }

    /* RESPONSIVO */
    @media (max-width: 1024px) {
        .blog-main-layout { grid-template-columns: 1fr; gap: 2rem; }
        .blog-sidebar { border-right: none; border-bottom: 1px solid #1a1a1a; padding-right: 0; padding-bottom: 2rem; margin-bottom: 3rem; }
        .sidebar-sticky-content { position: relative; top: 0; }
        
        /* [CAMBIO] Ocultar Sabiduría Destacada en móvil */
        .most-read-section { display: none; }
        .search-section { margin-bottom: 1rem; }
    }

    @media (max-width: 768px) {
        /* [CAMBIO] Fotos más pequeñas en móvil */
        .card-image-wrapper { height: 140px; }
        .blog-main-layout { padding-top: 120px; }
    }
</style>