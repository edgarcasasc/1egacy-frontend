<div class="studio-container">
	<div class="manifesto">
		<h1>EL ARTE DE HACER ETERNO TU LEGADO</h1>
		

<p>
¿Alguna vez has sostenido un objeto —la pluma de tu abuelo, una fotografía gastada— y has sentido el peso de una vida entera en tus manos?
</p>

<p>
Ese instante es sagrado. Es la prueba de que una historia vive en el alma, pero su eco necesita un lugar donde resonar. Esa es el alma de 1egacy STUDIO.
</p>

<p>
Porque sabemos que un recuerdo es aire, es luz, es intangible. Pero un legado necesita un guardián. Algo que puedas tocar cuando necesites recordar. Algo que tus hijos puedan sostener para atreverse a preguntar.		</p>


<p>
Aquí, fusionamos la reverencia de un historiador con el pulso de un maestro artesano. No creamos objetos; forjamos guardianes. Piezas que no aprisionan la memoria, sino que la custodian y la invitan a conversar en silencio. Cada tótem es un ancla para tu presente, un puente hacia tu pasado y el juramento que le haces al futuro.
</p>

	</div>

	<div class="productos-grid">
		<div class="producto-card">
			<img
				src="/articulos/El-Cedice-del-Legado.webp"
				alt="El Códice del Legado"
			/>
			<h3>El Códice del Legado</h3>
			<p>
				No es un libro; es el testamento visual de tu linaje. Una obra de archivo, encuadernada a mano con calidad museística, destinada a ser la pieza central de tu biblioteca y el catalizador de historias para las futuras generaciones.
			</p>
			<a href="/productos/codice-del-legado" class="boton-tarjeta">Descubrir el Códice</a>
		</div>

		<div class="producto-card">
			<img
				src="/articulos/camisas-legado.webp"
				alt="Piezas de Legado Físico"
			/>
			<h3>Piezas de Legado Físico</h3>
			<p>
				Transformamos el símbolo de tu linaje en un tótem personal. Desde un escudo forjado para presidir tu estudio, hasta textiles que susurran historias en cada hilo. Objetos diseñados no solo para ser poseídos, sino para ser portados con orgullo.
			</p>
			<a href="/productos" class="boton-tarjeta">Explorar Colección</a><br/><br/><br/><br/>
		</div>

		<div class="producto-card">
			<img
				src="/articulos/proyectos.webp"
				alt="Proyectos Especiales y Corporativos"
			/>
			<h3>Proyectos Especiales </h3>
			<p>
				Para las familias, empresas e instituciones que entienden que el futuro se construye sobre un pasado bien contado. Custodiamos la memoria corporativa o el alma familiar a través de documentales, archivos digitales o instalaciones artísticas.
			</p>
			<a href="/contacto" class="boton-tarjeta">Iniciar un Proyecto</a>
		</div>
	</div>
</div>

<style>
	.studio-container {
		padding-top: 120px;
		padding-bottom: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	.manifesto {
		text-align: center;
		max-width: 800px;
		margin-bottom: 4rem;
	}

	.manifesto h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.manifesto p {
		font-size: 1.1rem;
		line-height: 1.6;
	}

	.productos-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		width: 100%;
		max-width: 1200px;
	}

	.producto-card {
		background-color: #1a1a1a;
		border: 1px solid #333;
		text-align: center;
		transition: all 0.3s ease;
		border-radius: 8px;
		overflow: hidden; /* Asegura que la imagen respete los bordes redondeados */
	}

	/* --- INICIO DE NUEVOS ESTILOS PARA LA IMAGEN --- */
	.producto-card img {
		width: 100%;
		height: 220px; /* Altura fija para todas las imágenes */
		object-fit: cover; /* Asegura que la imagen llene el espacio sin deformarse */
		display: block;
	}

	/* Contenedor para el texto y botón dentro de la tarjeta */
	.producto-card .card-content {
		padding: 2rem;
	}
	/* --- FIN DE NUEVOS ESTILOS --- */

	.producto-card:hover {
		transform: translateY(-5px);
		border-color: #c0a062;
	}

	.producto-card h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #c0a062;
	}

	.producto-card p {
		margin-bottom: 2rem;
	}

	/* He cambiado el <button> por <a> (enlace) para que sea semánticamente correcto */
	.boton-tarjeta {
		display: inline-block; /* Para que el padding funcione bien */
		text-decoration: none; /* Quita el subrayado del enlace */
		background-color: #c0a062;
		color: #121212;
		border: none;
		padding: 0.8rem 1.5rem;
		font-size: 0.9rem;
		font-weight: bold;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: background-color 0.3s ease;
		border-radius: 4px;transition: all 0.3s ease, box-shadow 0.5s ease; /* Más larga para el efecto de sombra */
	}

	.boton-tarjeta:hover {
		background-color: #ffffff;
		transform: translateY(-3px) scale(1.02); /* ELEVACIÓN Y ESCALA */
  /* El resplandor elegante de Brender Studio */
  box-shadow: 0 0 5px #ffc414, /* Brillo interior */
              0 0 20px rgba(192, 160, 98, 0.6), /* Resplandor medio */
              0 10px 20px rgba(192, 160, 98, 0.4); /* Sombra de elevación */
	}

	/* --- REGLAS DE ADAPTACIÓN --- */

	@media (min-width: 768px) {
		.productos-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.productos-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>