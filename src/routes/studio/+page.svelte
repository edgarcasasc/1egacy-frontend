<div class="studio-container">
	<div class="manifesto">
		<h1>El Legado Materializado</h1>
		<p>
			Una historia no contada es solo un eco. En 1egacy STUDIO, tomamos las investigaciones de
			ORIGINS y las convertimos en obras de arte tangibles. Somos un taller creativo donde
			historiadores, diseñadores y artesanos colaboran para forjar piezas que encapsulan la esencia
			de un linaje. Cada objeto que creamos es un tótem: un ancla física a tu pasado y un faro
			para las generaciones futuras.
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
				El alma de tu historia familiar, encuadernada. Un libro de archivo de calidad museística
				que narra la saga de tu linaje, ilustrado con mapas, árboles genealógicos y el escudo
				heráldico rediseñado.
			</p>
			<a href="/productos/codice-del-legado" class="boton-tarjeta">Ver Detalles del Códice</a>
		</div>

		<div class="producto-card">
			<img
				src="/articulos/camisas-legado.webp"
				alt="Piezas de Legado Físico"
			/>
			<h3>Piezas de Legado Físico</h3>
			<p>
				Desde el escudo de tu apellido forjado en acero hasta playeras con bordados heráldicos de
				alta definición. Creamos objetos que portan con orgullo el símbolo de tu linaje.
			</p>
			<a href="/productos" class="boton-tarjeta">Explorar Colección</a><br/><br/><br/><br/>
		</div>

		<div class="producto-card">
			<img
				src="/articulos/proyectos.webp"
				alt="Proyectos Especiales y Corporativos"
			/>
			<h3>Proyectos Especiales y Corporativos</h3>
			<p>
				Para familias o empresas que buscan inmortalizar su historia. Producimos archivos
				digitales, documentales cortos o instalaciones que preservan un legado para futuras
				generaciones.
			</p>
			<a href="/contacto" class="boton-tarjeta">Cotizar un Proyecto</a>
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