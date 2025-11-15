<script>
	// Importaciones (Asegúrate que Navbar esté en la ruta correcta)
	import Navbar from '../../components/Navbar.svelte'; 

	// Recibimos 'topics' desde data (proveniente de +page.server.js)
	export let data;
	const { topics } = data; // Ahora trabajamos con 'topics' en lugar de 'posts'
</script>

<svelte:head>
	<title>El Códice - Clústeres Temáticos | 1egacy</title>


	<meta 
		name="description" 
		content="Explora los clústeres temáticos de 1egacy: Historias de legado, estrategia de crecimiento y más." 
	/>

	<link rel="canonical" href="https://somos1egacy.com/blog" />

<script type="application/ld+json">
{
"@context": "https://schema.org",
"@type": "Blog",
"name": "El Códice | 1egacy",
"url": "https://somos1egacy.com/blog",
"description": "Explora los clústeres temáticos de 1egacy: Historias de legado, estrategia de crecimiento y más.",
"publisher": {
"@type": "Organization",
"name": "1egacy",
"logo": {
"@type": "ImageObject",
"url": "https://somos1egacy.com/logo1egacy.svg"
}
}
// Opcionalmente, puedes listar los artículos aquí,
// pero para SvelteKit es más simple solo definir el Blog.
}
</script>
	</svelte:head>

<Navbar />

<div class="blog-clusters-container"> 
	<header class="clusters-header"> 
		<h1>El Códice por Clúster Temático</h1>
		<p>Navega nuestra sabiduría organizada por los pilares de conocimiento de 1egacy.</p>
	</header>

	{#if topics && topics.length > 0}
		{#each topics as topic (topic._id)} <section class="topic-cluster">
				<div class="topic-header">
					<a href="/blog/topic/{topic.slug}" aria-label="Ver todos los artículos sobre {topic.title}"> 
						<h2>{topic.title}</h2>
					</a>
					{#if topic.description}
						<p>{topic.description}</p>
					{/if}
				</div>
				
				{#if topic.posts && topic.posts.length > 0}
					<div class="posts-grid"> {#each topic.posts as post (post.slug)} <a href="/blog/{post.slug}" class="post-preview-card"> {#if post.mainImageUrl}
									<img 
										src={`${post.mainImageUrl}?w=400&h=250&fit=crop&auto=format`} 
										alt={post.title} 
										loading="lazy" />
								{:else}
									<div class="image-placeholder"></div>
								{/if}
								<div class="post-info">
									<h3>{post.title}</h3> {#if post.subtitle}
										<p class="snippet">{post.subtitle}</p> 
									{/if}
									<span>Leer más &rarr;</span>
								</div>
							</a>
						{/each}
					</div>
					{#if topic.posts.length >= 3} 
						<div class="view-all-link">
							<a href="/blog/topic/{topic.slug}">Ver todos en {topic.title} &rarr;</a>
						</div>
					{/if}
				{:else}
					<p class="no-posts">Aún no hay artículos publicados en este clúster.</p>
				{/if}
			</section>
		{/each}
	{:else}
		<p class="no-topics">No se encontraron clústeres temáticos. Revisa la configuración en Sanity.</p>
	{/if}
</div>

<style>
	/* --- ESTILOS ADAPTADOS Y NUEVOS PARA LA VISTA DE CLÚSTERES --- */
	.blog-clusters-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 120px 2rem 60px 2rem;
	}

	.clusters-header {
		text-align: center;
		margin-bottom: 5rem; /* Más espacio */
	}
	.clusters-header h1 {
		font-size: 3.5rem; /* Mantenemos tamaño */
		margin-bottom: 1rem;
	}
	.clusters-header p {
		font-size: 1.2rem; /* Un poco más grande */
		color: #b0b0b0; /* Mejor contraste */
		max-width: 750px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.topic-cluster {
		margin-bottom: 5rem; /* Más separación entre clústeres */
		padding-bottom: 4rem;
		border-bottom: 1px solid #2a2a2a; /* Borde más sutil */
	}
	.topic-cluster:last-child {
		border-bottom: none;
		margin-bottom: 0;
	}

	.topic-header {
		margin-bottom: 3rem; /* Más espacio antes de los posts */
	}
	.topic-header a {
		text-decoration: none;
		display: inline-block; /* Importante para el hover */
	}
	.topic-header h2 {
		font-size: 2.5rem; /* Título de clúster prominente */
		color: #c0a062; 
		margin-bottom: 0.8rem;
		transition: color 0.3s ease;
	}
	.topic-header a:hover h2 {
		color: #ffffff;
	}
	.topic-header p {
		font-size: 1rem;
		color: #aaa;
		max-width: 800px;
		line-height: 1.6;
	}

	.posts-grid {
		display: grid;
		/* Crea columnas automáticas (mínimo 300px, máximo 1fr) */
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
		gap: 2.5rem; /* Espacio entre tarjetas */
	}

	.post-preview-card {
		display: flex; /* Cambiado a flex para mejor control vertical */
		flex-direction: column; /* Apila imagen y texto */
		text-decoration: none;
		background-color: #1a1a1a;
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
		border: 1px solid #333;
		height: 100%; /* Asegura que todas las tarjetas tengan la misma altura */
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
		border-bottom: 1px solid #333; /* Línea sutil bajo la imagen */
	}
	.image-placeholder {
		background-color: #2a2a2a; /* Placeholder más oscuro */
	}

	.post-info {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1; /* Permite que esta sección ocupe el espacio restante */
	}
	.post-info h3 { /* Era h2, cambiado a h3 por semántica */
		font-family: 'Playfair Display', serif; /* Usar fuente de títulos */
		font-size: 1.5rem; /* Ligeramente más grande */
		color: #ffffff;
		margin: 0 0 0.8rem 0; /* Más espacio inferior */
		line-height: 1.4;
	}
	.post-info .snippet { /* Era post.subtitle */
		font-size: 0.95rem; /* Ligeramente más pequeño */
		color: #b0b0b0;
		margin-bottom: 1rem;
		line-height: 1.6;
		flex-grow: 1; /* Empuja el "Leer más" hacia abajo */
		/* Opcional: Limitar líneas con ellipsis */
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;  
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.post-info span { /* "Leer más" */
		font-weight: bold;
		color: #c0a062;
		font-size: 0.9rem;
		margin-top: auto; /* Empuja al final */
		align-self: flex-start; /* Alinea a la izquierda */
	}
	
	.view-all-link {
		text-align: right;
		margin-top: 1.5rem;
	}
	.view-all-link a {
		color: #c0a062;
		font-weight: bold;
		text-decoration: none;
		font-size: 0.9rem;
	}
	.view-all-link a:hover {
		text-decoration: underline;
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
			grid-template-columns: 1fr; /* Una columna en móviles */
		}
		.clusters-header h1 {
			font-size: 2.5rem;
		}
		.topic-header h2 {
			font-size: 2rem;
		}
	}
</style>