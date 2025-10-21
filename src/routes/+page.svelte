<script>
	/**
	 * ====================================================================================
	 * Canvas Arquitectónico: Proyecto 1egacy
	 * ====================================================================================
	 */

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

	onMount(() => {
		if (browser) {
			gsap.registerPlugin(MotionPathPlugin);
			console.log('Entorno de navegador detectado, iniciando animaciones GSAP...');

			try {
				// --- Animaciones de fondo y partículas (sin cambios) ---
				gsap.to('.hilo-destino-container', {
					y: 10,
					duration: 7,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut'
				});
				const particulasSingle = gsap.utils.toArray('.particle-single');
				particulasSingle.forEach((particle, i) => {
					gsap.to(particle, {
						motionPath: {
							path: '#hilo-path',
							align: '#hilo-path',
							alignOrigin: [0.5, 0.5]
						},
						duration: 8 + Math.random() * 4,
						delay: i * 0.5 + Math.random() * 1,
						repeat: -1,
						ease: 'linear',
						opacity: 0,
						onStart: () => gsap.to(particle, { opacity: 1, duration: 1 }),
						onRepeat: () => {
							gsap.set(particle, { opacity: 0 });
							gsap.to(particle, { opacity: 1, duration: 1, delay: 0.1 });
						}
					});
				});
				const enjambreContainer = '.enjambre-container';
				const particulasEnjambre = gsap.utils.toArray('.particle-enjambre');
				gsap.to(enjambreContainer, {
					motionPath: {
						path: '#hilo-path',
						align: '#hilo-path',
						alignOrigin: [0.5, 0.5],
						start: 0.1,
						end: 0.9
					},
					duration: 20,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut'
				});
				particulasEnjambre.forEach((particle) => {
					gsap.to(particle, {
						x: () => Math.random() * 30 - 15,
						y: () => Math.random() * 30 - 15,
						scale: () => 0.8 + Math.random() * 0.4,
						duration: 1.5 + Math.random() * 1,
						repeat: -1,
						yoyo: true,
						ease: 'sine.inOut'
					});
				});
			} catch (e) {
				console.error('Error al inicializar las animaciones GSAP:', e);
			}

			return () => {
				console.log('Limpiando animaciones GSAP...');
				gsap.killTweensOf(
					'.hilo-destino-container, .particle-single, .enjambre-container, .particle-enjambre'
				);
			};
		}

		return () => {};
	});
</script>

<svelte:head>
	<title>1egacy - El Comienzo de tu Legado</title>
	<meta
		name="description"
		content="En 1egacy, desenterramos la historia de tus ancestros para forjar el mapa de tu futuro. Tu apellido es solo el comienzo."
	/>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "1egacy",
			"url": "https://somos1legacy.com",
			"logo": "https://somos1legacy.com/logo1egacy.svg",
			"description": "Contamos las historias que merecen ser recordadas.",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Monterrey",
				"postalCode": "67140",
				"addressCountry": "MX"
			},
			"sameAs": [
				"https://www.instagram.com/somos1egacy/",
				"https://x.com/somos1egacy",
				"https://www.youtube.com/@somos1egacy",
				"https://www.tiktok.com/@somos1egacy",
				"https://www.facebook.com/profile.php?id=61579103341000"
			]
		}
	</script>
</svelte:head>

<!-- Contenedor Principal de la Página -->
<div class="page-wrapper">
	<!-- Hero Section con animaciones (sin cambios) -->
	<div class="home-container">
		<div class="animated-background">
			<div class="nebula nebula-blue"></div>
			<div class="nebula nebula-gold"></div>
		</div>
		<div class="hilo-destino-container">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1920 1080"
				preserveAspectRatio="xMidYMid slice"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<filter id="glow">
						<feGaussianBlur stdDeviation="0" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				<path
					id="hilo-path"
					class="hilo-glow"
					d="M0,591.2s400.9-336.8,831.4-134.7,561.4,197.9,1088.6-32.6"
				/>
			</svg>
			{#each Array(5) as _}
				<div class="particle particle-single" />
			{/each}
			<div class="enjambre-container">
				{#each Array(10) as _}
					<div class="particle particle-enjambre" />
				{/each}
			</div>
		</div>

		<main class="hero-content">
			<h1>Tu apellido no es el final de tu historia.<br /> Es el comienzo de tu legado.</h1>
			<p>
				En 1egacy, desenterramos la historia de tus ancestros, revelando las pruebas que superaron y
				los triunfos que alcanzaron, para forjar el mapa de tu futuro.
			</p>
			<a href="/origins" class="cta-button"> Descubre tu origen </a>
		</main>
	</div>

	<!-- ======================================================================== -->
	<!-- NUEVA SECCIÓN DE TESTIMONIOS (REDiseñada)                              -->
	<!-- ======================================================================== -->
	<section class="social-proof-section">
		<div class="container">
			<h2>Lo que los Guardianes de Legados Dicen</h2>
			<p class="section-subtitle">
				Historias reales de quienes han transformado su pasado en un legado tangible.
			</p>

			<div class="testimonial-carousel-wrapper">
				<div class="testimonial-carousel">
					<!-- Testimonio 1 -->
					<article class="testimonial-card">
						<span class="quote-icon">“</span>
						<blockquote>
							Quería un símbolo para mi familia que fuera más allá de un logo genérico. El proceso de 1egacy fue una revelación: el equipo del Maestro Ovidio no solo investigó la heráldica auténtica de mi linaje, sino que luego, como verdaderos artesanos, la rediseñaron con una elegancia moderna, explicándome el 'porqué' de cada elemento. El resultado no es solo un diseño, es nuestro estandarte. Una pieza de arte que se siente histórica y completamente actual, y que ahora usamos con un orgullo inmenso como la firma de nuestra familia.
						</blockquote>
						<footer>
    						<img src="/imagenes_clientes/ana_sofia.webp" alt="Foto de perfil de Ana Sofía Martínez" class="author-avatar" />
   										 <div>
      							  <p class="author-name">Ana Sofía Martínez</p>
      					  <p class="author-title">Emprendedora y Guardiana de un Símbolo</p>
    									</div>	
								</footer>
					</article>

					<!-- Testimonio 2 -->
					<article class="testimonial-card">
						<span class="quote-icon">“</span>
						<blockquote>
							Cuando 1egacy me entregó el Códice de mi linaje, sentí que sostenía no solo un libro, sino un mapa del alma de mi familia. Su equipo demostró una maestría excepcional, desenterrando 'Fragmentos de Vida' desde la Castilla del siglo XIV hasta la California del XIX, tejiéndolos en una narrativa que va más allá de las fechas. Lo que realmente valoro es cómo capturaron la esencia de nuestro legado —la lealtad, la resiliencia, la lección de la tarraya — y lo convirtieron en una obra de arte tangible. No es solo investigación; es la materialización de la identidad, una brújula que honra nuestro pasado y fortalece nuestro camino hacia el futuro.
						</blockquote>
						<footer>
							<img src="/imagenes_clientes/chagocama.webp" alt="Foto de perfil de Ana Sofía Martínez" class="author-avatar" />
							<div>
								<p class="author-name">Santiago Camarillo</p>
								<p class="author-title">Jefe del clan Camarillo</p>
							</div>
						</footer>
					</article>

					<!-- Testimonio 3 -->
					<article class="testimonial-card">
						<span class="quote-icon">“</span>
						<blockquote>
							Buscábamos honrar la vida de mi padre, el fundador de nuestra empresa, por su 80 aniversario. 1egacy FILMS superó todas nuestras expectativas. Su equipo no solo tiene una calidad cinematográfica impecable, sino una sensibilidad de 'Maestro' para encontrar el alma de la historia. No crearon un video corporativo; capturaron la filosofía de vida de mi padre en un documental biográfico que nos conmovió a todos. Han inmortalizado su voz y su legado de una forma que trasciende el tiempo.
						</blockquote>
						<footer>
							<img src="/imagenes_clientes/carlosrivas.webp" alt="Foto de perfil de Ana Sofía Martínez" class="author-avatar" />
							<div>
								<p class="author-name">Carlos Rivas Villareal</p>
								<p class="author-title">Hijo y Custodio de una Historia</p>
							</div>
						</footer>
					</article>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* --- Estilos del Hero y Animaciones (sin cambios) --- */
	.home-container {
		min-height: 100vh;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background-color: hsl(225, 20%, 8%);
	}
	.hero-content {
		position: relative;
		z-index: 10;
		text-align: center;
		padding: 2rem;
		max-width: 800px;
		color: #e0e0e0;
	}
	.hero-content h1 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		margin-bottom: 1.5rem;
		font-weight: 700;
		line-height: 1.3;
		text-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	}
	.hero-content p {
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		color: #b0b0b0;
		margin-bottom: 2.5rem;
		max-width: 650px;
		margin-left: auto;
		margin-right: auto;
	}
	.cta-button {
		display: inline-block;
		background-color: #c0a062;
		color: #121212;
		padding: 1rem 2.5rem;
		font-size: 1.1rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
	}
	.cta-button:hover {
		background-color: #ffffff;
		transform: translateY(-3px);
		box-shadow: 0 10px 20px rgba(192, 160, 98, 0.2);
	}
	.animated-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.nebula {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
	}
	.nebula-blue {
		width: 80vw;
		height: 80vw;
		background: radial-gradient(circle, hsla(220, 50%, 60%, 0.1) 0%, transparent 70%);
		top: 10%;
		left: -20%;
		animation: drift 45s infinite linear alternate;
	}
	.nebula-gold {
		width: 60vw;
		height: 60vw;
		background: radial-gradient(circle, hsla(35, 100%, 75%, 0.8) 0%, transparent 70%);
		opacity: 0.1;
		bottom: 5%;
		right: -15%;
		animation: pulse 12s infinite ease-in-out alternate;
	}
	@keyframes drift {
		from {
			transform: translateX(-20%) translateY(-5%);
		}
		to {
			transform: translateX(20%) translateY(5%);
		}
	}
	@keyframes pulse {
		from {
			transform: scale(0.95);
			opacity: 0.08;
		}
		to {
			transform: scale(1.05);
			opacity: 0.12;
		}
	}
	.hilo-destino-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		mix-blend-mode: screen;
		pointer-events: none;
	}
	.hilo-destino-container svg {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.hilo-glow {
		fill: none;
		stroke: #c0a062;
		stroke-width: 3px;
		filter: url(#glow);
	}
	.particle {
		position: absolute;
		border-radius: 50%;
		background-color: #c0a062;
		box-shadow: 0 0 8px 3px hsla(45, 100%, 70%, 0.7);
		opacity: 0;
	}
	.particle-single {
		width: 6px;
		height: 6px;
	}
	.enjambre-container {
		position: absolute;
	}
	.particle-enjambre {
		position: absolute;
		width: 3px;
		height: 3px;
		opacity: 1;
	}
	@media (max-width: 768px) {
		.hero-content h1 {
			font-size: clamp(2rem, 8vw, 2.8rem);
		}
		.hero-content p {
			font-size: clamp(0.9rem, 4vw, 1rem);
		}
		.cta-button {
			padding: 0.8rem 1.8rem;
			font-size: 1rem;
		}
	}

	/* --- NUEVOS ESTILOS PARA LA SECCIÓN DE TESTIMONIOS --- */
	.page-wrapper {
		/* Contenedor para toda la página, incluyendo secciones debajo del hero */
	}

	.social-proof-section {
		background-color: #111111; /* Un negro un poco más suave */
		padding: 6rem 0; /* Espaciado vertical generoso */
		color: #e0e0e0;
		overflow: hidden; /* Evita que el glow se desborde */
		position: relative;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		text-align: center;
	}

	.social-proof-section h2 {
		font-size: 2.8rem;
		color: #ffffff;
		margin-bottom: 1rem;
	}

	.section-subtitle {
		font-size: 1.1rem;
		color: #aaa;
		max-width: 600px;
		margin: 0 auto 4rem auto;
	}

	.testimonial-carousel-wrapper {
		/* Contenedor que permite el desbordamiento sin mostrar scrollbar */
	}

	.testimonial-carousel {
		
		transform-origin:-10%;
		display: flex;
		gap: 2rem;
		padding: 1rem 0;
		overflow-x: auto; /* Permite el scroll horizontal */
		scroll-snap-type: x mandatory; /* El scroll se "pegará" a cada tarjeta */
		/* Ocultar la barra de scroll */
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.testimonial-carousel::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
		
	}

	.testimonial-card {
		flex: 0 0 90%; /* En móvil ocupa casi todo el ancho */
		max-width: 300px; /* Ancho máximo por tarjeta */
		background: linear-gradient(145deg, #1e1e1e, #141414);
		border: 1px solid #333;
		padding: 2.5rem;
		border-radius: 12px;
		text-align: left;
		scroll-snap-align: start; /* Cada tarjeta es un punto de "pegado" */
		transition: all 0.4s ease;
		position: relative;
	}

	.testimonial-card:hover {
		transform: translateY(-10px);
		border-color: #c0a062;
		box-shadow: 0 20px 40px rgba(192, 160, 98, 0.1);
	}
	
	.quote-icon {
		font-family: 'Playfair Display', serif;
		font-size: 5rem;
		color: #c0a062;
		position: absolute;
		top: 1rem;
		left: 1.5rem;
		opacity: 0.2;
	}

	.testimonial-card blockquote {
		font-size: 1.2rem;
		line-height: 1.7;
		color: #d0d0d0;
		margin: 0 0 2rem 0;
		font-style: normal;
		border: none;
		padding: 0;
		position: relative;
		z-index: 1;
	}

	.testimonial-card footer {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-align: left;
		border-top: 1px solid #333;
		padding-top: 1.5rem;
	}
	
	.author-avatar {
	width: 50px;
    height: 50px;
    border-radius: 50%; /* Esto crea el círculo */
    object-fit: cover; /* Esto asegura que la imagen cubra el círculo sin deformarse */
    background-color: #c0a062; /* Se puede eliminar si hay imagen */
    flex-shrink: 0; /* Asegura que la imagen no se encoja */
	}

	.author-name {
		font-weight: bold;
		color: #ffffff;
		margin: 0;
	}

	.author-title {
		font-size: 0.9rem;
		color: #aaa;
		margin: 0;
	}

	@media (min-width: 768px) {
		.testimonial-card {
			flex-basis: 45%; /* Dos tarjetas visibles en tablet */
		}
	}

	@media (min-width: 1024px) {
		.testimonial-carousel {
			justify-content: center; /* Centra las tarjetas en escritorio si no llenan el espacio */
		}
		.testimonial-card {
			flex-basis: 30%; /* Tres tarjetas visibles en escritorio */
		}
	}
</style>
