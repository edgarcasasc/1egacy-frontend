<script>
	import Navbar from '../../../components/Navbar.svelte'; // Ajusta la ruta si es necesario

	// --- DATOS DEL AUTOR ---
	// Temporalmente, pondremos los datos directamente aquí.
	// Idealmente, estos vendrían de Sanity a través de +page.server.js
	// pero para implementar el Schema, podemos usar datos estáticos por ahora.
	const autor = {
		name: "Maestro Ovidio Casas",
		slug: "maestro-ovidio-casas", // Asegúrate que coincida con el slug en Sanity si lo creas
		image: "https://cdn.sanity.io/images/9pou5g3d/production/2df9f6b19a83ed901196af3b7f36ba851b76e2cb-1056x992.png",
		bio: `Permítanme presentarme, soy Ovidio Casas, pero después de una vida en las aulas, me he quedado con el título más grande de todos: "Maestro".\n\nNací en Monterrey en 1950, pero mi alma pertenece a la sierra de Laguna de Sánchez, en Santiago, de donde eran mis padres. De ellos aprendí que las raíces importan.\n\nMi vocación siempre fue clara. Dediqué 44 años a la educación primaria en la SEP, primero como maestro de grupo y luego como director de escuela.\n\nA los 65 años, me retiré. Pero, ¿saben una cosa? Un Maestro nunca se retira de verdad. Simplemente cambia de materia.\n\nHoy, esa misma pasión por la enseñanza la aplico en 1egacy. Cambié el pizarrón por los archivos históricos para ayudar a las personas a leer el mapa de su pasado y honrar la historia de su linaje.\n\nPorque estoy convencido de que para saber a dónde vamos, muchachos, primero debemos entender, con orgullo, de quiénes venimos.`,
		socialLink: null // Añade el link si lo tienes
		// Podrías añadir más campos como 'jobTitle', 'knowsAbout', etc.
	};

	const baseUrl = 'https://somos1legacy.com'; // O obténlo de data si usas .server.js

	// --- PERSON SCHEMA ---
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		"name": autor.name,
		"url": `${baseUrl}/autor/${autor.slug}`, // URL canónica de esta página
		...(autor.image && { "image": autor.image }),
		"description": autor.bio, // Usamos la bio completa como descripción
		...(autor.socialLink && { "sameAs": [autor.socialLink] }),
		"worksFor": { // Afiliación con 1egacy
			"@type": "Organization",
			"name": "1egacy",
			"url": baseUrl
		}
		// Opcional: "jobTitle": "Historiador y Fundador" (o lo que aplique)
		// Opcional: "knowsAbout": ["Genealogía", "Heráldica", "Historia Familiar"] (Temas de expertise)
	};

</script>

<svelte:head>
	<title>Sobre el Autor: {autor.name} | 1egacy</title>
	<meta name="description" content={`Conoce a ${autor.name}, ${autor.bio.substring(0, 150)}...`} /> 
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
</svelte:head>

<Navbar />

<div class="author-page-container">
	<header class="author-header">
		{#if autor.image}
			<img src={autor.image} alt="Foto de {autor.name}" class="author-photo" />
		{/if}
		<h1>{autor.name}</h1>
		</header>

	<section class="author-bio-content">
		{#each autor.bio.split('\n\n') as paragraph}
			<p>{paragraph}</p>
		{/each}

		{#if autor.socialLink}
			<p class="social-link">
				<a href={autor.socialLink} target="_blank" rel="noopener noreferrer me">Conectar con {autor.name}</a> 
				</p>
		{/if}
	</section>

	</div>

<style>
	.author-page-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 120px 2rem 60px 2rem;
	}
	.author-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-bottom: 3rem;
	}
	.author-photo {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: 1.5rem;
		border: 3px solid #c0a062; /* Borde dorado */
	}
	.author-header h1 {
		font-size: 2.8rem;
		color: #c0a062;
		margin: 0;
	}
	.author-bio-content {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #b0b0b0;
	}
	.author-bio-content p {
		margin-bottom: 1.5rem; /* Espacio entre párrafos */
	}
	.social-link {
		margin-top: 2rem;
		font-weight: bold;
	}
	.social-link a {
		color: #c0a062;
	}

	/* Estilos opcionales para lista de artículos */
	.author-articles {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid #333;
	}
	.author-articles h2 {
		font-size: 1.8rem;
		margin-bottom: 1.5rem;
	}
	.author-articles ul {
		list-style: none;
		padding: 0;
	}
	.author-articles li {
		margin-bottom: 0.8rem;
	}
	.author-articles a {
		text-decoration: none;
	}
</style>