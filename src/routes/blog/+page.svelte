<script>
    import { page } from '$app/stores';
    import { fade, fly } from 'svelte/transition';
    
    export let data;
    
    // Extraemos las 3 fuentes de datos del servidor:
    // 1. topics: Los grupos temáticos con sus 3 primeros posts.
    // 2. mostRead: Los 5 artículos destacados de la barra lateral.
    // 3. searchIndex: La lista COMPLETA de artículos para que el buscador encuentre todo.
    const { topics, mostRead, searchIndex } = data; 

    const safeBaseUrl = 'https://somos1egacy.com';
    $: canonicalUrl = `${safeBaseUrl}${$page.url.pathname}`;

    // --- LÓGICA DE BÚSQUEDA GLOBAL ---
    let searchTerm = '';
    
    // El filtro busca en el 'searchIndex' (que tiene todos los posts de Sanity)
    // Busca coincidencias en: Título, Subtítulo y la lista de Apellidos vinculados.
    $: searchResults = searchTerm 
        ? searchIndex.filter(p => {
            const term = searchTerm.toLowerCase();
            const inTitle = p.title?.toLowerCase().includes(term);
            const inSubtitle = p.subtitle?.toLowerCase().includes(term);
            // Busca si el apellido está en el array de apellidos del post
            const inApellidos = p.apellidos?.some(apellido => 
                apellido.toLowerCase().includes(term)
            );

            return inTitle || inSubtitle || inApellidos;
        })
        : [];
</script>

<svelte:head>
    <title>El Códice: Sabiduría y Linaje | 1egacy</title>
    <meta name="description" content="Busca tu apellido y explora el archivo vivo de 1egacy: historias de legado, investigación de linajes y narrativa heráldica." />
    <link rel="canonical" href={canonicalUrl} />

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Blog",
                "@id": "https://somos1egacy.com/blog/#blog",
                "name": "El Códice | 1egacy",
                "url": "https://somos1egacy.com/blog",
                "description": "Repositorio de sabiduría heráldica y narrativa de legados.",
                "publisher": { "@id": "https://somos1egacy.com/#organization" },
                "inLanguage": "es-MX"
            },
            {
                "@type": "WebPage",
                "@id": "https://somos1egacy.com/blog/#webpage",
                "url": "https://somos1egacy.com/blog",
                "name": "El Códice: Sabiduría y Linaje | 1egacy",
                "isPartOf": { "@id": "https://somos1egacy.com/#website" },
                "about": { "@id": "https://somos1egacy.com/#organization" },
                "description": "Explora los clústeres temáticos de 1egacy: Historias de legado e investigación de linajes."
            }
        ]
    }
    </script>
</svelte:head>

<div class="blog-main-layout">
    <aside class="blog-sidebar">
        <div class="sidebar-sticky-content">
            <div class="search-section">
                <h3 class="sidebar-label">Rastrear mi Linaje</h3>
                <div class="search-input-wrapper">
                    <input 
                        type="text" 
                        bind:value={searchTerm} 
                        placeholder="Ej: Aguilar, Heráldica..."
                        aria-label="Buscar artículos o apellidos"
                    />
                    <span class="search-icon">🔍</span>
                </div>
            </div>

            <div class="most-read-section">
                <h3 class="sidebar-label">Sabiduría Destacada</h3>
                <div class="most-read-list">
                    {#if mostRead && mostRead.length > 0}
                        {#each mostRead as post, i}
                            <a href="/blog/{post.slug}" class="most-read-item">
                                <span class="rank">{i + 1}</span>
                                <div class="item-info">
                                    <h4>{post.title}</h4>
                                    <span class="topic-tag">{post.topicTitle || 'Destacado'}</span>
                                </div>
                            </a>
                        {/each}
                    {:else}
                        <p class="empty-msg">Explora los clústeres para descubrir los legados más profundos.</p>
                    {/if}
                </div>
            </div>
        </div>
    </aside>

    <main class="blog-content">
        {#if searchTerm}
            <section class="search-results-view" in:fade>
                <header class="results-header">
                    <h2>Hallazgos para: "{searchTerm}"</h2>
                    <p>{searchResults.length} registros encontrados en el Códice</p>
                    <button class="clear-search" on:click={() => searchTerm = ''}>Volver al Códice Completo</button>
                </header>

                {#if searchResults.length > 0}
                    <div class="posts-grid">
                        {#each searchResults as post (post.slug)}
                            <a href="/blog/{post.slug}" class="post-preview-card" in:fly={{ y: 20 }}>
                                <div class="card-image-wrapper">
                                    <img src={`${post.mainImageUrl}?w=500&h=300&fit=crop&auto=format`} alt={post.title} />
                                </div>
                                <div class="post-info">
                                    <span class="topic-label">{post.topicTitle || 'Legado'}</span>
                                    <h3>{post.title}</h3>
                                    <span class="read-more">Leer Registro &rarr;</span>
                                </div>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="no-results">
                        <p>No hay fragmentos en el Códice que coincidan con ese término.</p>
                    </div>
                {/if}
            </section>
        {:else}
            <header class="clusters-header"> 
                <h1>El Códice</h1>
                <p>Un archivo vivo: ideas, hallazgos y fragmentos que merecen permanecer.</p>
            </header>

            {#if topics && topics.length > 0}
                {#each topics as topic (topic._id)} 
                    <section class="topic-cluster">
                        <div class="topic-header">
                            <a href="/blog/topic/{topic.slug}"><h2>{topic.title}</h2></a>
                            {#if topic.description} <p>{topic.description}</p> {/if}
                        </div>
                        
                        <div class="posts-grid"> 
                            {#each topic.posts as post (post.slug)} 
                                <a href="/blog/{post.slug}" class="post-preview-card"> 
                                    {#if post.mainImageUrl}
                                        <div class="card-image-wrapper">
                                            <img src={`${post.mainImageUrl}?w=500&h=300&fit=crop&auto=format`} alt={post.title} loading="lazy" />
                                        </div>
                                    {/if}
                                    <div class="post-info">
                                        <h3>{post.title}</h3> 
                                        <span class="read-more">Leer más &rarr;</span>
                                    </div>
                                </a>
                            {/each}
                        </div>
                    </section>
                {/each}
            {:else}
                <p class="no-topics">Restaurando los archivos del Santuario...</p>
            {/if}
        {/if}
    </main>
</div>

<style>
    /* LAYOUT TIPO AMAZON (SIDEBAR + CONTENIDO) */
    .blog-main-layout {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 5rem;
        max-width: 1400px;
        margin: 0 auto;
        padding: 160px 2rem 80px;
    }

    .blog-sidebar { border-right: 1px solid #1a1a1a; padding-right: 2rem; }
    .sidebar-sticky-content { position: sticky; top: 120px; }
    .sidebar-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; color: #c0a062; margin-bottom: 1.5rem; font-weight: 800; }

    /* BUSCADOR */
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

    @media (max-width: 1024px) {
        .blog-main-layout { grid-template-columns: 1fr; }
        .blog-sidebar { border-right: none; border-bottom: 1px solid #1a1a1a; padding-right: 0; padding-bottom: 3rem; margin-bottom: 4rem; }
        .sidebar-sticky-content { position: relative; top: 0; }
    }
</style>