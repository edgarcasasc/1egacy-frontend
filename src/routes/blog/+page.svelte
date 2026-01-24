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

    // --- 2) SCHEMA (SEO) ---
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
                "description": "Un archivo vivo de linajes, heráldica y cultura.",
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
    <meta name="description" content="Un archivo vivo de linajes, heráldica y cultura: investigación editorial para preservar lo que importa." />

    <link rel="alternate" hreflang="es-MX" href={canonicalUrl} />
    <link rel="alternate" hreflang="es" href={canonicalUrl} />
    
    <meta property="og:type" content="website" />
    <meta property="og:title" content="El Códice: Sabiduría y Linaje | 1egacy" />
    <meta property="og:description" content="Un archivo vivo de linajes, heráldica y cultura." />
    <meta property="og:image" content={ogImage} />

    {@html `<script type="application/ld+json">${JSON.stringify(fullSchema)}<\/script>`}
</svelte:head>

<div class="blog-main-layout">
    
    <aside class="blog-sidebar">
        <div class="sidebar-sticky-content">
            
            <div class="search-section">
                <h3 class="sidebar-label">Encuentra tu apellido</h3>
                <div class="search-input-wrapper">
                    <input 
                        type="text" 
                        bind:value={searchTerm} 
                        placeholder="Escribe tu apellido (ej. Aguilar, Soto, Balam)" 
                        aria-label="Buscar" 
                    />
                    <span class="search-icon">🔍</span>
                </div>
                <div class="search-helper">
                    <p>Te mostramos artículos del Códice relacionados con tu apellido.</p>
                    <a href="/solicitar-consulta" class="helper-link">¿No aparece? Solicitar investigación a medida</a>
                </div>
            </div>

            <div class="most-read-section">
                <h3 class="sidebar-label">Destacados del Códice</h3>
                <p class="section-subtitle-sidebar">Lecturas seleccionadas para entender legado, símbolos e identidad.</p>
                
                <div class="most-read-list">
                    {#each mostRead as post}
                        <a href="/blog/{post.slug}" class="most-read-item">
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
                    <button class="clear-search" on:click={() => searchTerm = ''}>Volver al Códice</button>
                </header>
                <div class="posts-grid">
                    {#each searchResults as post (post.slug)}
                        <a href="/blog/{post.slug}" class="post-preview-card">
                            <div class="card-image-wrapper">
                                <img src={`${post.mainImageUrl}?w=500&h=300&fit=crop`} alt={post.title} width="500" height="300" loading="lazy" />
                            </div>
                            <div class="post-info">
                                <h3>{post.title}</h3>
                                <p class="card-excerpt">{post.excerpt || 'Una guía breve para entender este legado y su significado.'}</p>
                                <span class="read-more">Leer &rarr;</span>
                            </div>
                        </a>
                    {/each}
                </div>
            </section>
        
        {:else}
            <header class="clusters-header"> 
                <h1>El Códice</h1>
                <p>Un archivo vivo de linajes, heráldica y cultura: investigación editorial para preservar lo que importa.</p>
            </header>

            {#each topics as topic (topic._id)} 
                <section class="topic-cluster">
                    <div class="topic-header">
                        <a href="/blog/topic/{topic.slug}"><h2>{topic.title}</h2></a>
                        
                        {#if topic.title.includes('Maestro') || topic.title.includes('Taller')}
                            <p class="topic-description">
                                La mesa de trabajo de El Maestro Ovidio Casas: ideas, guiones y temas de legado aplicados a la vida real.
                            </p>
                            <p class="editorial-note">
                                <small>Nota editorial: esta sección es libre. Principios, método y cultura del legado.</small>
                            </p>
                            <a href="/blog/topic/{topic.slug}" class="topic-cta">Ver todos los ensayos del Maestro &rarr;</a>
                        {/if}
                    </div>

                    <div class="posts-grid"> 
                        {#each topic.posts as post (post.slug)} 
                            <a href="/blog/{post.slug}" class="post-preview-card"> 
                                <div class="card-image-wrapper">
                                    <img src={`${post.mainImageUrl}?w=500&h=300&fit=crop`} alt={post.title} width="500" height="300" loading="lazy" />
                                    {#if topic.title.includes('Maestro')}
                                        <span class="card-badge">Ensayo</span>
                                    {/if}
                                </div>
                                <div class="post-info">
                                    <h3>{post.title}</h3> 
                                    
                                    <p class="card-excerpt">
                                        {post.excerpt || 'Qué significa y cómo se conecta con tu linaje...'}
                                    </p>

                                    <span class="read-more">Leer &rarr;</span>
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
    /* --- LAYOUT PRINCIPAL --- */
    .blog-main-layout { display: grid; grid-template-columns: 320px 1fr; gap: 5rem; max-width: 1400px; margin: 0 auto; padding: 0px 2rem 80px; }
    
    /* --- SIDEBAR --- */
    .blog-sidebar { border-right: 1px solid #1a1a1a; padding-right: 2rem; }
    .sidebar-sticky-content { position: sticky; top: 120px; }
    .sidebar-label { font-size: 0.8rem; text-transform: uppercase; color: #c0a062; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 1rem; }
    
    /* Buscador */
    .search-section { margin-bottom: 4rem; }
    .search-input-wrapper { background: #0d0d0d; border: 1px solid #333; border-radius: 4px; padding: 0.8rem; display: flex; align-items: center; transition: border-color 0.3s; }
    .search-input-wrapper:focus-within { border-color: #c0a062; }
    .search-input-wrapper input { background: transparent; border: none; color: #fff; width: 100%; outline: none; font-size: 0.9rem; }
    .search-icon { opacity: 0.5; }
    
    /* Helper del Buscador */
    .search-helper { margin-top: 0.8rem; font-size: 0.85rem; color: #888; line-height: 1.4; }
    .search-helper p { margin: 0 0 0.4rem 0; }
    .helper-link { color: #c0a062; text-decoration: none; border-bottom: 1px solid transparent; transition: all 0.2s; font-size: 0.8rem; }
    .helper-link:hover { border-bottom-color: #c0a062; color: #fff; }

    /* Destacados */
    .most-read-section { margin-top: 3rem; }
    .section-subtitle-sidebar { font-size: 0.85rem; color: #888; margin-bottom: 1.5rem; line-height: 1.4; font-style: italic; border-left: 2px solid #333; padding-left: 10px; }
    .most-read-item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #1a1a1a; text-decoration: none; transition: transform 0.2s; }
    .most-read-item:hover { transform: translateX(5px); }
    .item-info h4 { color: #e0e0e0; font-size: 0.95rem; margin: 0 0 0.4rem; line-height: 1.4; font-weight: 500; }
    .topic-tag { font-size: 0.7rem; color: #666; text-transform: uppercase; letter-spacing: 0.05em; }

    /* --- CONTENIDO PRINCIPAL --- */
    .blog-content { padding-top: 2rem; }
    
    .clusters-header { margin-bottom: 5rem; text-align: left; border-bottom: 1px solid #1a1a1a; padding-bottom: 3rem; }
    .clusters-header h1 { font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: 1rem; color: #c0a062; font-family: 'Playfair Display', serif; }
    .clusters-header p { font-size: 1.2rem; color: #b0b0b0; max-width: 70ch; margin: 0; line-height: 1.6; }

    /* Topic Clusters */
    .topic-cluster { margin-bottom: 7rem; }
    .topic-header { margin-bottom: 2rem; }
    .topic-header h2 { font-size: 2.2rem; color: #e0e0e0; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif; }
    
    /* Estilos específicos "Taller del Maestro" */
    .topic-description { color: #aaa; font-size: 1.05rem; margin-bottom: 0.5rem; max-width: 65ch; }
    .editorial-note { color: #666; margin-bottom: 1rem; }
    .topic-cta { color: #c0a062; font-weight: 600; text-decoration: none; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .topic-cta:hover { color: #fff; text-decoration: underline; }

    /* Grid de Posts */
    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2.5rem; }
    
    .post-preview-card { background: #111; border: 1px solid #222; display: flex; flex-direction: column; height: 100%; text-decoration: none; transition: all 0.3s ease; border-radius: 4px; overflow: hidden; }
    .post-preview-card:hover { border-color: #c0a062; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    
    .card-image-wrapper { height: 180px; overflow: hidden; position: relative; background-color: #1a1a1a; }
    .card-image-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: scale 0.5s ease; }
    .post-preview-card:hover img { scale: 1.05; }
    
    .card-badge { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: #c0a062; padding: 4px 10px; font-size: 0.7rem; text-transform: uppercase; font-weight: 700; border-radius: 2px; letter-spacing: 0.05em; backdrop-filter: blur(4px); }

    .post-info { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
    .post-info h3 { color: #e0e0e0; font-size: 1.3rem; margin: 0 0 0.8rem; line-height: 1.3; font-family: 'Source Sans 3', sans-serif; font-weight: 600; }
    
    .card-excerpt { font-size: 0.95rem; color: #888; line-height: 1.5; margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    
    .read-more { margin-top: auto; color: #c0a062; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }

    /* Resultados Búsqueda */
    .results-header { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid #222; }
    .results-header h2 { color: #c0a062; font-family: 'Playfair Display', serif; }
    .clear-search { background: none; border: 1px solid #333; color: #888; padding: 0.6rem 1.2rem; margin-top: 1rem; cursor: pointer; font-size: 0.8rem; border-radius: 2px; transition: all 0.3s; }
    .clear-search:hover { border-color: #c0a062; color: #c0a062; }

    /* RESPONSIVO */
    @media (max-width: 1024px) {
        .blog-main-layout { grid-template-columns: 1fr; gap: 4rem; padding-bottom: 60px; }
        .blog-sidebar { border-right: none; border-bottom: 1px solid #1a1a1a; padding-right: 0; padding-bottom: 3rem; margin-bottom: 0; }
        .sidebar-sticky-content { position: relative; top: 0; }
        
        /* En móvil ocultamos destacados si se desea ahorrar espacio, o los dejamos abajo */
        /* .most-read-section { display: none; } */
    }

    @media (max-width: 768px) {
        .clusters-header h1 { font-size: 3rem; }
        .posts-grid { gap: 2rem; }
        .card-image-wrapper { height: 160px; }
        .blog-main-layout { padding-top: 40px; }
    }
</style>