<script>
	import { PortableText } from '@portabletext/svelte';
	// Usamos las importaciones que sabemos que funcionan para tu estructura
	import SanityImage from '$lib/components/SanityImage.svelte';
	import FaqItem from '../../../components/FaqItem.svelte';
	import Navbar from '../../../components/Navbar.svelte';

	export let data;
	// data.post ahora contiene el objeto de autor completo { name, image, bio, socialLink }
	// data.baseUrl también viene de +page.server.js
	const { post, baseUrl } = data; 

	const components = {
		types: {
			image: SanityImage
		}
	};

	// --- PREPARACIÓN SEGURA DE DATOS PARA EL TEMPLATE ---
	const validFaqsForTemplate = Array.isArray(post?.faqSection)
		? post.faqSection.filter((item) => item && typeof item === 'object' && item.question && item.answer)
		: [];

	// --- IMPLEMENTACIÓN DE SCHEMA MARKUP CON E-E-A-T (CORREGIDA) ---
	function createSchema(postData, pageBaseUrl) { // Renombrado para evitar conflicto con variable global
		if (!postData) return {};

		// Prepara los datos del autor de forma segura
		const authorData = postData.author || {}; // Usa objeto vacío si no hay autor
		const authorName = authorData.name || '1egacy Studio';
		const safeBaseUrl = pageBaseUrl || 'https://somos1legacy.com'; // Fallback por si baseUrl no llega

		const schema = {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'Article',
					'mainEntityOfPage': {
						'@type': 'WebPage',
						'@id': `${safeBaseUrl}/blog/${postData.slug?.current || ''}` // Usa safeBaseUrl
					},
					'headline': postData.title,
					'description': postData.seoDescription || postData.subtitle,
					// Asegúrate de que la imagen principal sea una URL absoluta
					...(postData.mainImageUrl && { 'image': postData.mainImageUrl }), 
					
					// --- SECCIÓN 'author' ACTUALIZADA Y MEJORADA ---
					'author': {
						'@type': 'Person',
						'name': authorName,
						// Añadir URL absoluta de imagen si existe
						...(authorData.image && { 'image': authorData.image }), 
						// Añadir bio como description si existe
						...(authorData.bio && { 'description': authorData.bio }), 
						// Añadir enlace social como array de sameAs si existe
						...(authorData.socialLink && { 'sameAs': [authorData.socialLink] }), 
						// Afiliación (siempre y cuando no sea '1egacy Studio')
						...(authorName !== '1egacy Studio' && {
							'affiliation': {
								'@type': 'Organization',
								'name': '1egacy',
								'url': safeBaseUrl // Usa safeBaseUrl
							}
						})
					},
					// --- FIN DE ACTUALIZACIÓN 'author' ---

					'publisher': {
						'@type': 'Organization',
						'name': '1egacy',
						'logo': {
							'@type': 'ImageObject',
							'url': `${safeBaseUrl}/logo1egacy.svg` // Usa safeBaseUrl
						}
					},
					'datePublished': postData.publishedAt,
					'dateModified': postData._updatedAt
				}
			]
		};

		// Lógica para añadir FAQPage (sin cambios, usa validFaqsForTemplate)
		if (validFaqsForTemplate && validFaqsForTemplate.length > 0) {
			schema['@graph'].push({
				'@type': 'FAQPage',
				'mainEntity': validFaqsForTemplate.map((faq) => ({
					'@type': 'Question',
					'name': faq.question,
					'acceptedAnswer': {
						'@type': 'Answer',
						// Convierte el contenido de Sanity a texto plano para JSON-LD
						'text': Array.isArray(faq.answer) 
							? faq.answer
								.map(block => 
									(block.children || []).map(child => child.text).join('')
								)
								.join('\n\n') // Doble salto para párrafos
							: String(faq.answer || '').replace(/\n/g, '\n\n') // Convertir saltos simples a dobles
					}
				}))
			});
		}
		return schema;
	}

	// Llamada a la función createSchema (asegúrate que 'baseUrl' venga de 'data')
	const schema = createSchema(post, baseUrl); 
</script>

<svelte:head>
	<title>{post?.seoTitle || post?.title || 'Artículo'} | 1egacy</title>
	<meta
		name="description"
		content={post?.seoDescription || post?.subtitle || ''}
	/>

	{#if post && schema && Object.keys(schema).length > 0}
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
					{#if post.author?.name && post.author.name !== '1egacy Studio'}
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
							<FaqItem {faqItem} /> 
						{/each}
					</div>
				</section>
			{/if}

			{#if post.author && post.author.name !== '1egacy Studio'}
				<section class="author-bio-box">
					{#if post.author.image}
						<img
							src={post.author.image}
							alt="Foto de perfil de {post.author.name}"
							class="author-image"
						/>
					{/if}
					<div class="author-info">
						<h3>Sobre el Autor: {post.author.name}</h3>
						{#if post.author.bio}
							<p>{post.author.bio}</p>
						{/if}
						{#if post.author.socialLink}
							<a
								href={post.author.socialLink}
								target="_blank"
								rel="noopener noreferrer author" >
								Leer más de este autor
							</a>
						{/if}
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
								{#if apellido.escudoUrl} <img
										src={apellido.escudoUrl} alt="Escudo {apellido.nombre}"
										on:error={(e) => (e.target.style.display = 'none')}
									/>
								{:else}
									<div class="escudo-placeholder"></div> 
								{/if}
								<span>Explorar el Legado {apellido.nombre}</span>
							</a>
						{/each}
					</div>
				{:else}
					<div class="anuncio-generico">
						<h3>¿Conoces la Historia de tu Apellido?</h3>
						<p>
							Cada linaje tiene una saga esperando ser contada. En 1egacy
							Origins, transformamos esa historia en arte.
						</p>
						<a href="/origins" class="boton-anuncio"
							>Explorar la Constelación</a
						>
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
	/* --- ESTILOS SIN CAMBIOS --- */
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
		object-fit: contain; /* Ajustado para SVG */
	}
	.anuncio-card span {
		font-weight: bold;
	}
	/* Estilo para placeholder de escudo */
	.escudo-placeholder {
		width: 50px;
		height: 50px;
		flex-shrink: 0;
		background-color: #333; /* Color simple */
		border-radius: 4px; /* Opcional */
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
			margin: 2rem auto 0 auto; /* Separación y centrado */
			order: 3; /* Mueve el sidebar al final en móvil */
		}
		
		.post-container {
			order: 2; /* Mantiene el contenido principal antes del sidebar */
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

	/* --- INICIO DE ESTILOS DE AUTOR (SIN CAMBIOS) --- */
	.author-bio-box {
		display: flex;
		align-items: center; /* Centrado vertical */
		gap: 1.5rem; /* Reducido espacio */
		background-color: #1a1a1a;
		border: 1px solid #333;
		border-radius: 8px;
		padding: 1.5rem; /* Padding reducido */
		margin-top: 4rem; 
		flex-wrap: wrap; /* Permite que el texto fluya si no cabe */
	}

	.author-image {
		width: 80px; /* Tamaño reducido */
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.author-info {
		flex-grow: 1; /* Ocupa el espacio restante */
	}

	.author-info h3 {
		margin-top: 0;
		color: #c0a062;
		font-size: 1.5rem; /* Ajustado */
		margin-bottom: 0.5rem; /* Menos espacio */
	}

	.author-info p {
		color: #b0b0b0;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		line-height: 1.6; /* Mejorado */
	}

	.author-info a {
		font-weight: bold;
		font-size: 0.9rem;
		color: #c0a062; /* Color explícito */
		text-decoration: none; /* Sin subrayado por defecto */
	}
	.author-info a:hover {
		text-decoration: underline; /* Subrayado en hover */
	}
	/* --- FIN DE ESTILOS DE AUTOR --- */
</style>