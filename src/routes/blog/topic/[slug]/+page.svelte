<script>

	export let data;
	const { topic } = data; // Recibimos el objeto 'topic' que incluye el array 'posts'
</script>

<svelte:head>
	<title>{topic?.title || 'Clúster Temático'} | El Códice | 1egacy</title>
	<meta 
		name="description" 
		content={topic?.description || `Explora artículos sobre ${topic?.title} en 1egacy.`} 
	/>
	</svelte:head>

<Navbar />

<div class="topic-page-container">
	{#if topic}
		<header class="topic-page-header">
			<h1>{topic.title}</h1>
			{#if topic.description}
				<p>{topic.description}</p>
			{/if}
			<nav aria-label="Breadcrumb" class="breadcrumbs">
				<a href="/blog">El Códice</a> &rsaquo; <span>{topic.title}</span>
			</nav>
		</header>

		{#if topic.posts && topic.posts.length > 0}
			<div class="posts-grid">
				{#each topic.posts as post (post.slug)}
					<a href="/blog/{post.slug}" class="post-preview-card">
						{#if post.mainImageUrl}
							<img 
								src={`${post.mainImageUrl}?w=400&h=250&fit=crop&auto=format`} 
								alt={post.title} 
								loading="lazy" 
							/>
						{:else}
							<div class="image-placeholder"></div>
						{/if}
						<div class="post-info">
							<h3>{post.title}</h3>
							{#if post.subtitle}
								<p class="snippet">{post.subtitle}</p> 
							{/if}
							<span>Leer más &rarr;</span>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<p class="no-posts">Aún no hay artículos publicados en este clúster.</p>
		{/if}

	{:else}
		<p class="no-topics">Clúster temático no encontrado.</p> 
	{/if}
</div>

<style>
	/* --- ESTILOS PARA LA PÁGINA DE ARCHIVO DEL CLÚSTER --- */
	/* Puedes reusar muchos estilos de /src/routes/blog/+page.svelte */
	/* Importante: Ajusta selectores si es necesario */

	.topic-page-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 120px 2rem 60px 2rem;
	}

	.topic-page-header {
		text-align: center;
		margin-bottom: 4rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #2a2a2a;
	}
	.topic-page-header h1 {
		font-size: 3rem; 
		color: #c0a062;
		margin-bottom: 0.8rem;
	}
	.topic-page-header p {
		font-size: 1.1rem;
		color: #b0b0b0;
		max-width: 750px;
		margin: 0 auto 1.5rem auto; /* Espacio antes de breadcrumbs */
		line-height: 1.6;
	}
	
	.breadcrumbs {
		font-size: 0.9rem;
		color: #888;
	}
	.breadcrumbs a {
		color: #aaa;
		text-decoration: none;
	}
	.breadcrumbs a:hover {
		text-decoration: underline;
	}
	.breadcrumbs span {
		font-weight: bold;
		color: #ccc;
	}

	/* Reutiliza .posts-grid, .post-preview-card, .image-placeholder, .post-info de la página /blog */
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
		gap: 2.5rem; 
	}

	.post-preview-card {
		display: flex; 
		flex-direction: column; 
		text-decoration: none;
		background-color: #1a1a1a;
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
		border: 1px solid #333;
		height: 100%; 
	}
	.post-preview-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 24px rgba(0,0,0,0.3);
		border-color: #c0a062;
	}

	.post-preview-card img, .image-placeholder {
		width: 100%;
		height: 200px; 
		object-fit: cover;
		display: block;
		border-bottom: 1px solid #333; 
	}
	.image-placeholder {
		background-color: #2a2a2a; 
	}

	.post-info {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1; 
	}
	.post-info h3 { 
		font-family: 'Playfair Display', serif; 
		font-size: 1.5rem; 
		color: #ffffff;
		margin: 0 0 0.8rem 0; 
		line-height: 1.4;
	}
	.post-info .snippet { 
		font-size: 0.95rem; 
		color: #b0b0b0;
		margin-bottom: 1rem;
		line-height: 1.6;
		flex-grow: 1; 
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;  
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.post-info span { 
		font-weight: bold;
		color: #c0a062;
		font-size: 0.9rem;
		margin-top: auto; 
		align-self: flex-start; 
	}
	
	.no-posts, .no-topics {
		text-align: center;
		color: #888;
		margin-top: 3rem;
		font-style: italic;
	}

	/* --- Responsive --- */
	@media (max-width: 600px) {
		.posts-grid {
			grid-template-columns: 1fr; 
		}
		.topic-page-header h1 {
			font-size: 2.5rem;
		}
	}
</style>