<script>
	// Importamos la Navbar para mantener la consistencia del sitio
	import Navbar from '../../components/Navbar.svelte';
</script>

<svelte:head>
	<title>Films | 1egacy</title>
	<meta
		name="description"
		content="1egacy FILMS: producimos documentales que no solo registran el pasado, sino que encienden una conversación sobre el futuro."
	/>
</svelte:head>

<Navbar />

<div class="films-container">
	<div class="manifesto">
		<h1>Legados que Inspiran</h1>
		<p>
			Hay legados que no caben en un libro. Historias de individuos, familias o empresas cuya
			visión cambió el mundo que los rodeaba. 1egacy FILMS es nuestra casa productora, dedicada a
			encontrar estas sagas y contarlas con la belleza y el rigor cinematográfico que merecen.
			Producimos documentales que no solo registran el pasado, sino que encienden una conversación
			sobre el futuro.
		</p>
	</div>

	<div class="proyectos-section">
		<h2>Proyectos en Desarrollo</h2>

		<div class="proyecto-item">
			<div class="proyecto-info">
				<h3>El Gigante de Acero</h3>
				<p>
					Un largometraje sobre la saga de una familia pionera en la industria del acero en
					Monterrey. Un relato de innovación, riesgo y el carácter indomable que forjó una
					metrópoli. <em>(En fase de investigación)</em>
				</p>
			</div>
			<div class="proyecto-status">
				<span>Largometraje</span>
			</div>
		</div>

		<div class="proyecto-item">
			<div class="proyecto-info">
				<h3>La Viña Prometida</h3>
				<p>
					Una serie documental corta que explora el legado de los inmigrantes italianos en el
					noreste de México, trazando el viaje desde los viñedos de Génova hasta las comunidades
					que fundaron. <em>(En fase de pre-producción)</em>
				</p>
			</div>
			<div class="proyecto-status">
				<span>Serie Documental</span>
			</div>
		</div>
	</div>

	<!-- BOTÓN CON EL NUEVO EFECTO LUMINOSO Y FUTURISTA --><button class="cta-premium"><span>Ver Trailers y Teasers</span></button>
</div>

<style>
	.films-container {
		padding: 120px 2rem 60px 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		min-height: 100vh;
	}

	.manifesto {
		text-align: center;
		max-width: 800px;
		margin-bottom: 4rem;
	}

	.manifesto h1 {
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 1rem;
	}

	.manifesto p {
		font-size: 1.1rem;
		line-height: 1.6;
	}

	.proyectos-section {
		width: 100%;
		max-width: 900px;
		margin-bottom: 3rem;
	}

	.proyectos-section h2 {
		font-size: 2rem;
		font-weight: 300;
		text-align: center;
		margin-bottom: 2rem;
		border-bottom: 1px solid #333;
		padding-bottom: 1rem;
	}

	.proyecto-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: transparent;
		padding: 2rem 1rem; /* Padding ajustado para hover */
		border-bottom: 1px solid #333;
		transition: background-color 0.3s ease;
		gap: 1.5rem; /* Espacio entre info y status */
	}

	.proyecto-item:hover {
		background-color: #1a1a1a;
	}

	.proyecto-info h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		color: #e0e0e0;
	}

	.proyecto-info p {
		max-width: 600px;
		line-height: 1.5;
	}

	.proyecto-info em {
		color: #888;
		font-size: 0.9rem;
	}

	.proyecto-status span {
		display: inline-block;
		padding: 0.5rem 1rem;
		border: 1px solid #c0a062;
		color: #c0a062;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: 0.8rem;
		white-space: nowrap; /* Evita que el texto se rompa */
	}

	/* --- INICIO DE ESTILOS PARA EL NUEVO BOTÓN FUTURISTA Y LUMINOSO --- */
	@keyframes rotate-border-glow {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	.cta-premium {
		position: relative;
		overflow: hidden; /* Muy importante para que el glow no se desborde */
		z-index: 1;
		background-color: #1a1a1a; /* Fondo más oscuro para contrastar */
		color: #e0e0e0; /* Color de texto claro */
		border: 1px solid #333; /* Borde sutil */
		padding: 1.2rem 2.5rem; /* Un poco más grande */
		font-size: 1.1rem;
		font-weight: bold;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		transition: all 0.3s ease; /* Transiciones suaves para hover */
		border-radius: 8px; /* Bordes ligeramente redondeados */
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Sombra para profundidad */
	}

	.cta-premium span {
		position: relative;
		z-index: 2; /* Asegura que el texto esté siempre por encima del glow */
		color: #e0e0e0; /* Color del texto inicial */
		transition: color 0.3s ease; /* Transición para el color del texto */
	}

	/* El pseudo-elemento para el efecto de borde luminoso */
	.cta-premium::before {
		content: '';
		position: absolute;
		z-index: -1; /* Detrás del contenido del botón */
		top: 50%;
		left: 50%;
		width: 1000%; /* Controla el tamaño del glow */
		height: 1000%;
		/* Un gradiente cónico para crear el efecto de "luz viajando" */
		background: conic-gradient(
			from 10deg,
			transparent 0%,
			transparent 50%, /* La mayor parte es transparente */
			#c0a062 300%, /* El color de tu marca como glow */
			#ffe6a7 1700%, /* Un punto más brillante */
			transparent 10%
		);
		animation: rotate-border-glow 4s linear infinite; /* Animación de rotación infinita */
		border-radius: 8px; /* Mismo border-radius que el botón */
	}

	.cta-premium:hover {
		transform: scale(1.05) translateY(-2px); /* Un lift más pronunciado */
		background-color: #2a2a2a; /* Fondo ligeramente más claro al pasar el ratón */
		border-color: #c0a062; /* Borde se ilumina */
		box-shadow: 0 0 15px rgba(192, 160, 98, 0.6); /* Sombra más brillante */
	}

	.cta-premium:hover span {
		color: #c0a062; /* El texto también se ilumina */
	}

	.cta-premium:hover::before {
		animation-play-state: paused; /* La animación del glow se detiene al pasar el ratón */
	}
	/* --- FIN DE ESTILOS PARA EL NUEVO BOTÓN FUTURISTA Y LUMINOSO --- */

	/* --- INICIO DE ESTILOS RESPONSIVOS --- */
	@media (max-width: 768px) {
		.manifesto h1 {
			font-size: 2.5rem;
		}
		.proyecto-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
		}
		.proyecto-status {
			align-self: flex-end; /* Alinea la etiqueta a la derecha */
		}
		.cta-premium {
			padding: 1rem 2rem;
			font-size: 1rem;
		}
	}

	@media (max-width: 576px) {
		.films-container {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.manifesto h1 {
			font-size: 2.2rem;
		}
		.proyecto-info h3 {
			font-size: 1.3rem;
		}
		.proyecto-info p {
			font-size: 0.95rem;
		}
		.cta-premium {
			padding: 0.8rem 1.8rem;
			font-size: 0.9rem;
			letter-spacing: 1px;
		}
	}
</style>

