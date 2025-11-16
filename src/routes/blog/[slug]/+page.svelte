<script>
	import { PortableText } from '@portabletext/svelte';
	// Usamos las importaciones que sabemos que funcionan para tu estructura
	import SanityImage from '$lib/components/SanityImage.svelte';
	import FaqItem from '../../../components/FaqItem.svelte';
	import Navbar from '../../../components/Navbar.svelte';

	export let data;

	
	// data.post ahora contiene el objeto de autor completo { name, image, bio, socialLink, authorSlug }
	// data.baseUrl también viene de +page.server.js
	const { post, baseUrl } = data;
const safeBaseUrl = baseUrl || 'https://somos1egacy.com';
    const canonicalUrl = `${safeBaseUrl}/blog/${post?.slug?.current || ''}`;
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
		const safeBaseUrl = pageBaseUrl || 'https://somos1egacy.com'; // Fallback por si baseUrl no llega

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
					...(postData.mainImage?.url && { 'image': postData.mainImage.url }), // Corregido para usar la estructura correcta

					// --- SECCIÓN 'author' ACTUALIZADA Y MEJORADA ---
					'author': {
						'@type': 'Person',
						'name': authorName,
						// --- LA LÍNEA QUE RESUELVE LA ALERTA ---
						...(authorData.authorSlug && { 'url': `${safeBaseUrl}/autor/${authorData.authorSlug}` }),
						// --- FIN DE LA LÍNEA ---
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
									.map((block) => (block.children || []).map((child) => child.text).join(''))
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

	// **** INICIO CAMBIO: Función para truncar texto ****
	function truncate(text, maxLength = 150) {
		if (!text) return '';
		if (text.length <= maxLength) return text;
		// Intenta cortar en un espacio para no cortar palabras
		const lastSpace = text.lastIndexOf(' ', maxLength);
		return text.slice(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
	}
	// **** FIN CAMBIO: Función para truncar texto ****

</script>

<svelte:head>
	<title>{post?.seoTitle || post?.title || 'Artículo'} | 1egacy Blog</title>
	<meta
		name="description"
		content={post?.seoDescription || post?.subtitle || ''}
	/>


	<meta name="description" content={post.excerpt || ''} />
  
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt || ''} />
  <meta property="og:image" content={post.mainImage?.url || 'https://somos1egacy.com/1egacy-og-logo.jpg'} />
  <meta name="twitter:image" content={post.mainImage?.url || 'https://somos1egacy.com/1egacy-og-logo.jpg'} />
  <meta property="og:type" content="article" />

  
<link rel="canonical" href={canonicalUrl} />
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
				{#if post.mainImage && post.mainImage.url}
	<img
		class="featured-image svelte-1teoznn"
		src={post.mainImage.url}
		alt={post.mainImage.alt || post.title}
		width={post.mainImage.dimensions?.width ?? undefined}
		height={post.mainImage.dimensions?.height ?? undefined}
		style={post.mainImage.dimensions?.aspectRatio
			? `aspect-ratio: ${post.mainImage.dimensions.aspectRatio}; background-color: #eee;` /* Añadimos aspect-ratio si existe */
			: 'background-color: #eee;'} 
		loading="lazy" />
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
							width="80" height="80" loading="lazy"
						/>
					{/if}
					<div class="author-info">
						<p class="author-label">Escrito por</p> {#if post.author.authorSlug}
							<a href="/autor/{post.author.authorSlug}" class="author-name-link">
								<h3 class="author-name">{post.author.name}</h3>
							</a>
						{:else}
							<h3 class="author-name">{post.author.name}</h3>
						{/if}
						
						{#if post.author.bio}
							<p class="author-bio">{truncate(post.author.bio, 120)}</p> {/if}
						
						{#if post.author.authorSlug}
							<a href="/autor/{post.author.authorSlug}" class="author-profile-button">
								Ver Perfil Completo
							</a>
						{/if}

						{#if post.author.socialLink}
							<a
								href={post.author.socialLink}
								target="_blank"
								rel="noopener noreferrer author"
								class="author-social"> Conectar con {post.author.name}
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
										width="50" height="50" />
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
	height: auto; /* Mantenemos height auto para responsividad */
	border-radius: 8px;
	margin-top: 2rem;
	margin-bottom: 3rem;
	display: block; /* Asegura que se comporte como bloque */
	background-color: #eee; /* Color de fondo mientras carga */
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

	/* **** INICIO CAMBIO: Estilos de Autor MODIFICADOS **** */
	.author-bio-box {
		display: flex;
		align-items: flex-start; /* Alinea items al inicio para mejor layout vertical */
		gap: 1.5rem; 
		background-color: #1a1a1a;
		border: 1px solid #333;
		border-radius: 8px;
		padding: 1.5rem; 
		margin-top: 4rem; 
		flex-wrap: nowrap; /* Evita que el contenido se envuelva por defecto */
	}

	@media (max-width: 576px) {
		.author-bio-box {
			flex-direction: column; /* Apila en móvil */
			align-items: center; /* Centra en móvil */
			text-align: center;
		}
		.author-info {
			align-items: center; /* Centra los elementos internos en móvil */
		}
	}


	.author-image {
		width: 80px; 
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0; /* No se encoge */
	}

	.author-info {
		flex-grow: 1; 
		display: flex; /* Añadido para controlar hijos */
		flex-direction: column; /* Organiza verticalmente */
		gap: 0.5rem; /* Espacio entre elementos */
	}
	
	.author-label { /* Estilo para "Escrito por" */
      font-size: 0.8rem;
      color: #777;
      margin-bottom: -0.25rem; /* Reduce espacio bajo la etiqueta */
      text-transform: uppercase;
  }


	.author-name { /* Estilo unificado para el nombre */
		margin: 0;
		color: #c0a062;
		font-size: 1.5rem; 
		font-weight: 600; /* Añadido para destacar */
	}

	.author-name-link { /* Estilo para el enlace del nombre */
		text-decoration: none;
		color: inherit; /* Hereda el color dorado de .author-name */
		transition: color 0.2s ease;
	}
	.author-name-link:hover {
		color: #e0b87c; /* Un dorado más claro al pasar el ratón */
	}

	.author-bio { /* Renombrado desde .author-info p */
		color: #b0b0b0;
		margin: 0; /* Quitamos margen por defecto */
		font-size: 0.9rem;
		line-height: 1.6; 
	}

	.author-profile-button { /* Nuevo estilo para el botón */
		display: inline-block; 
		margin-top: 0.75rem; 
		padding: 0.6rem 1.2rem; /* Ligeramente más grande */
		background-color: var(--color-primary, #c0a062); 
		color: #121212; /* Texto oscuro para contraste */
		text-decoration: none;
		border-radius: 4px;
		font-size: 0.9rem;
		font-weight: bold; /* Más peso */
		text-align: center;
		transition: background-color 0.2s ease, color 0.2s ease;
		max-width: fit-content; 
	}

	.author-profile-button:hover {
		background-color: var(--color-primary-light, #e0b87c); /* Color más claro en hover */
		color: #000; 
	}

	.author-social { /* Estilo para el enlace social */
		font-weight: bold;
		font-size: 0.9rem;
		color: #a0a0a0; /* Un gris más claro */
		text-decoration: none; 
		margin-top: 0.5rem; /* Espacio adicional */
	}
	.author-social:hover {
		text-decoration: underline; 
		color: #c0a062; /* Cambia a dorado en hover */
	}
	/* **** FIN CAMBIO: Estilos de Autor MODIFICADOS **** */

</style>