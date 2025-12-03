<script lang="ts">


	const projects = [
		{
			id: 'instantes',
			title: 'Instantes',
			format: 'Cortometraje',
			description: 'Un poema visual sobre la memoria y la conexión humana. "Instantes" explora cómo los recuerdos más pequeños pueden definir una vida entera, demostrando nuestra filosofía de que las historias más grandes a menudo se esconden en los momentos más silenciosos. Es el alma de nuestra casa productora en su forma más pura.',
			image: 'articulos/instantes.webp' // <-- REEMPLAZAR RUTA
		},
		{
			id: 'receta-abuela',
			title: 'La Obra del Sabor',
			format: 'Cortometraje Documental (En Desarrollo)',
			description: 'Más allá de los ingredientes, una receta es una herencia, un lenguaje de amor transmitido a través de generaciones. Este cortometraje es un tributo a esos legados intangibles que se guardan no en cajas fuertes, sino en el corazón de la cocina familiar.',
			image: 'articulos/cocina_corazon.webp' // <-- REEMPLAZAR RUTA
		},
		{
			id: 'akari',
			title: 'Akari: El Susurro de los Olvidados',
			format: 'Serie Animada (En Desarrollo)',
			description: 'Nuestro proyecto más ambicioso. Un salto a la narrativa de ficción para contar una historia épica de memoria, pérdida y redención. "Akari" es nuestra prueba de que la animación es un medio poderoso para construir mundos complejos y explorar las profundidades del alma humana.',
			image: 'articulos/akari.webp' // <-- REEMPLAZAR RUTA
		},
		{
			id: 'princesa-luna',
			title: 'La Princesa de la Luna',
			format: 'Cortometraje Animado (En Desarrollo)',
			description: 'Una fábula atemporal sobre la luz, la promesa y la devoción. Este cuento, nacido del corazón de nuestro estudio, está siendo transformado en una pieza de animación que busca capturar la magia de las historias que nos contaban bajo las estrellas.',
			image: 'articulos/princesa.webp' // <-- REEMPLAZAR RUTA
		}
	];

	// Meta descriptions and titles
	const pageTitle = "1egacy FILMS | Historias que Merecen ser Vistas";
	const pageDescription = "En 1egacy FILMS esculpimos legados cinematográficos. Desde cortometrajes hasta series animadas, damos vida a las historias que el tiempo no debe olvidar.";
	const canonicalUrl = "https://somos1egacy.com/films"; // Asegúrate que esta sea la URL final

</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>


<section class="films-hero-section">
	<div class="hero-background-video">
		<img src="articulos/back_films.webp" alt="Fondo cinemático abstracto">
	</div>
	<div class="hero-content">
		<h1>Historias que Merecen ser Vistas.</h1>
		<h2>
			En 1egacy FILMS, no producimos videos, esculpimos legados cinematográficos. Desde cortometrajes que capturan el alma de un instante hasta series animadas que construyen universos enteros. Damos vida a las historias que el tiempo no debe olvidar.
		</h2>
		<a href="#proyectos" class="cta-button">Explorar Nuestros Proyectos</a>
	</div>
	<a href="#filosofia" class="scroll-down-arrow" aria-label="Ir a la siguiente sección"></a>
</section>

<div class="films-page-content"> <section class="film-philosophy-section" id="filosofia">
		<h3 class="title-serif">Creemos en el Cine como un Acto de Memoria.</h3>
		<p>
			El mundo está lleno de imágenes fugaces. Nosotros buscamos lo eterno. Nuestro propósito es simple: crear piezas audiovisuales con la profundidad de un relato y la belleza de una obra de arte. Fusionamos la sensibilidad de un cineasta de autor con la rigurosidad de un historiador para forjar crónicas que no solo se ven, sino que se sienten y se recuerdan. Dejamos que el eco de una buena historia resuene a través de la pantalla.
		</p>
	</section>

	<section class="film-projects-section" id="proyectos">
		<h2 class="title-serif section-title">Nuestro Laboratorio de Historias</h2>
		<p class="section-subtitle">Estos son los mundos que estamos construyendo y las historias que estamos custodiando.</p>

		<div class="projects-grid">
			{#each projects as project (project.id)}
				<div class="project-card">
					<div class="card-image-container">
						<img src={project.image} alt="Fotograma o arte conceptual de {project.title}">
						{#if project.format.includes('(En Desarrollo)')}
							<span class="status-badge">En Desarrollo</span>
						{/if}
					</div>
					<div class="card-info">
						<h4>{project.title}</h4>
						<span class="format-label">{project.format.replace(' (En Desarrollo)', '')}</span>
						<p>{project.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="film-process-section">
		<h2 class="title-serif section-title">De la Idea al Estreno: Nuestra Metodología</h2>
		<ol class="process-steps-list">
			<li>
				<h4>1. Inmersión y Guion</h4>
				<p>Investigación profunda, desarrollo narrativo y guion técnico.</p>
			</li>
			<li>
				<h4>2. Producción Artesanal</h4>
				<p>Rodaje o creación de assets con atención meticulosa al detalle visual.</p>
			</li>
			<li>
				<h4>3. Post-Producción y Partitura</h4>
				<p>Edición, colorización, efectos visuales y diseño sonoro original.</p>
			</li>
			<li>
				<h4>4. Proyección y Entrega</h4>
				<p>Entrega final en formatos de alta calidad y estrategia de difusión.</p>
			</li>
		</ol>
	</section>

	<section class="film-final-cta-section">
		<h2 class="title-serif">Tienes una historia que merece ser contada con luz.</h2>
		<p>
			Ya sea un recuerdo íntimo, la saga de tu familia o un universo que solo existe en tu imaginación, estamos aquí para ayudarte a darle vida en la pantalla. Hablemos de ese legado que espera ser filmado.
		</p>
		<a href="/contacto" class="cta-button">Iniciar una Conversación Cinematográfica</a> </section>

</div>

<style>
	/* --- ESTILOS GLOBALES --- */
	body { margin: 0; background-color: #121212; color: #e0e0e0; line-height: 1.7;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", /*...*/ sans-serif; }
	h1, h2.title-serif, h3.title-serif { font-family: "Palatino Linotype", /*...*/ serif; font-weight: 400; color: #f5f5f5; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
	.cta-button { /* Reutiliza el estilo del botón dorado/oscuro */
		 display: inline-block; padding: 14px 28px; background-color: #c0a062;
		 color: #121212; text-decoration: none; font-weight: bold; font-size: 1rem;
		 border-radius: 5px; transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
		 cursor: pointer; border: none; text-transform: uppercase; letter-spacing: 1px; text-align: center; }
	.cta-button:hover { background-color: #a08450; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(192, 160, 98, 0.3); }
	.scroll-down-arrow { /* Reutiliza el estilo de la flecha */
		 position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 30px; height: 50px;
		 cursor: pointer; z-index: 2; animation: bounce 2s infinite; }
	.scroll-down-arrow::before, .scroll-down-arrow::after { content: ''; position: absolute; top: 60%; left: 50%;
		 width: 2px; height: 20px; background-color: white; }
	.scroll-down-arrow::before { transform: translateX(-50%) rotate(45deg); }
	.scroll-down-arrow::after { transform: translateX(-50%) rotate(-45deg); }
	@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
		 40% { transform: translateX(-50%) translateY(-10px); } 60% { transform: translateX(-50%) translateY(-5px); } }
	.title-serif { /* Clase helper por si necesitas aplicar fuente serif a otros H2/H3 */ }

	/* --- HERO SECTION --- */
	.films-hero-section { display: flex; flex-direction: column; justify-content: center; align-items: center;
		min-height: 100vh; width: 100%; position: relative; text-align: center; color: white; overflow: hidden; box-sizing: border-box; }
	.hero-background-video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; filter: brightness(0.4); } /* Ajusta brillo */
	.hero-background-video video, .hero-background-video img { width: 100%; height: 100%; object-fit: cover; }
	.hero-content { max-width: 800px; padding: 20px; position: relative; z-index: 1; }
	.hero-content h1 { font-size: 3.5rem; font-weight: 500; line-height: 1.2; margin-bottom: 0.7em; }
	.hero-content h2 { font-size: 1.4rem; font-weight: 300; line-height: 1.6; margin-bottom: 2em; color: #e0e0e0; font-family: inherit; } /* Usar fuente del body */

	/* --- CONTENEDOR PRINCIPAL POST-HERO --- */
	.films-page-content { max-width: 1100px; margin: 0 auto; padding: 0 40px 60px 40px; }

	/* --- SECCIÓN FILOSOFÍA --- */
	.film-philosophy-section { padding: 80px 0; text-align: center; border-bottom: 1px solid rgba(192, 160, 98, 0.15); margin-bottom: 60px; }
	.film-philosophy-section h3 { font-size: 2.2em; margin-bottom: 1.5em; }
	.film-philosophy-section p { font-size: 1.2em; color: #bdbdbd; max-width: 750px; margin: 0 auto; }

	/* --- TÍTULOS Y SUBTÍTULOS DE SECCIÓN --- */
	.section-title { font-size: 2.8em; text-align: center; margin-bottom: 15px; }
	.section-subtitle { font-size: 1.3em; color: #bdbdbd; text-align: center; max-width: 800px; margin: 0 auto 50px auto; }

	/* --- SECCIÓN PROYECTOS --- */
	.film-projects-section { padding: 60px 0; margin-bottom: 60px; border-bottom: 1px solid rgba(192, 160, 98, 0.15); }
	.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }
	.project-card { background-color: #1a1a1a; border-radius: 10px; overflow: hidden;
		 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; }
	.project-card:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); }
	.card-image-container { width: 100%; padding-top: 56.25%; /* Proporción 16:9 */ position: relative; background-color: #222; }
	.card-image-container img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
	.status-badge { position: absolute; top: 15px; right: 15px; background-color: rgba(192, 160, 98, 0.85); /* Dorado semi-transparente */
		 color: #121212; padding: 5px 10px; border-radius: 4px; font-size: 0.8em; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
	.card-info { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
	.card-info h4 { font-family: inherit; font-size: 1.4em; font-weight: 600; color: #e0e0e0; margin: 0 0 5px 0; }
	.format-label { font-size: 0.9em; color: #888; margin-bottom: 15px; display: block; text-transform: uppercase; letter-spacing: 1px; }
	.card-info p { font-size: 0.95em; color: #bdbdbd; margin: 0; line-height: 1.6; }

	/* --- SECCIÓN PROCESO --- */
	.film-process-section { padding: 60px 0; margin-bottom: 60px; border-bottom: 1px solid rgba(192, 160, 98, 0.15); }
	.process-steps-list { list-style: none; padding-left: 0; max-width: 800px; margin: 0 auto; counter-reset: process-counter; }
	.process-steps-list li { background-color: #1a1a1a; border-left: 3px solid #c0a062; padding: 20px 25px;
		 margin-bottom: 20px; border-radius: 0 8px 8px 0; position: relative; }
	.process-steps-list h4 { font-size: 1.2em; font-weight: 600; color: #c0a062; margin: 0 0 8px 0; }
	.process-steps-list p { font-size: 1em; color: #bdbdbd; margin: 0; }

	/* --- SECCIÓN FINAL CTA --- */
	.film-final-cta-section { padding: 80px 40px; text-align: center; background-color: #1a1a1a; border-radius: 12px;
		 margin-bottom: 0; /* Última sección sin margen inferior extra */ box-shadow: 0 0 30px rgba(0, 0, 0, 0.4); }
	.film-final-cta-section h2 { font-size: 2.5em; margin-bottom: 25px; }
	.film-final-cta-section p { font-size: 1.2em; color: #bdbdbd; max-width: 700px; margin: 0 auto 40px auto; }

	/* --- RESPONSIVIDAD --- */
	@media (max-width: 900px) {
		.films-page-content { padding: 0 30px 40px 30px; }
		.section-title { font-size: 2.4em; }
		.section-subtitle { font-size: 1.2em; margin-bottom: 40px; }
		.projects-grid { gap: 30px; }
	}
	@media (max-width: 768px) {
		.hero-content h1 { font-size: 2.8rem; }
		.hero-content h2 { font-size: 1.2rem; }
		.film-philosophy-section h3 { font-size: 1.9em; }
		.film-philosophy-section p { font-size: 1.1em; }
		.films-page-content { padding: 0 20px 30px 20px; }
	}
	@media (max-width: 576px) {
		.hero-content h1 { font-size: 2.2rem; }
		.hero-content h2 { font-size: 1.1rem; }
		.films-page-content { padding: 0 15px 20px 15px; }
		.section-title { font-size: 2em; }
		.section-subtitle { font-size: 1.1em; margin-bottom: 30px; }
		.projects-grid { grid-template-columns: 1fr; gap: 25px; }
		.card-info h4 { font-size: 1.3em; }
		.card-info p { font-size: 0.9em; }
		.process-steps-list h4 { font-size: 1.1em; }
		.process-steps-list p { font-size: 0.95em; }
		.film-final-cta-section h2 { font-size: 2em; }
		.film-final-cta-section p { font-size: 1em; }
	}
.video-container {
  /* Estilos para posicionar/dimensionar el video */
  width: 100%;
  height: /* Define altura o proporción */;
  position: relative;
  overflow: hidden;
}
.video-container video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cubre el contenedor */
  transform: translate(-50%, -50%); /* Centra el video */
  z-index: -1; /* Si es un fondo */
}
</style>