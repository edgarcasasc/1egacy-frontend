<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { fade } from 'svelte/transition';
	// onMount no es necesario aquí

	let isSubmitting = false;
	let submitStatus: 'success' | 'error' | null = null;
	let errorMessage = '';
	let feedbackElement: HTMLParagraphElement | null = null;
	let consultaFormElement: HTMLFormElement; // <-- Referencia al formulario

	// --- LÓGICA DE VALIDACIÓN ---
	function showValidationMessages() {
		if (!consultaFormElement) return;
		consultaFormElement.classList.add('submitted'); // Marca que se intentó enviar

		const inputs = consultaFormElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
			'input[required], textarea[required], input[type="email"]'
		);
		inputs.forEach(input => {
			const errorContainer = input.parentElement?.querySelector('.error-message');
			if (errorContainer) {
				errorContainer.textContent = ''; // Limpiar previo
				if (!input.checkValidity()) {
					if (input.validity.valueMissing) {
						errorContainer.textContent = 'Este campo es esencial para iniciar la conversación.';
					} else if (input.validity.tooShort) {
						errorContainer.textContent = `Por favor, comparte un poco más. Necesitamos al menos ${input.minLength} caracteres.`;
					} else if (input.validity.typeMismatch && input.type === 'email') {
						errorContainer.textContent = 'Por favor, introduce un correo electrónico válido.';
					} else {
						errorContainer.textContent = input.validationMessage; // Mensaje por defecto del navegador
					}
				}
			}
		});
	}

	function clearValidationMessages() {
		if (!consultaFormElement) return;
		consultaFormElement.classList.remove('submitted');
		const errorMessages = consultaFormElement.querySelectorAll('.error-message');
		errorMessages.forEach(span => {
			span.textContent = '';
		});
	}

	async function handleConsultaSubmit() {
		if (!consultaFormElement.checkValidity()) {
			showValidationMessages();
			const firstInvalid = consultaFormElement.querySelector<HTMLElement>(':invalid');
			firstInvalid?.focus();
			return;
		}

		clearValidationMessages();
		isSubmitting = true;
		submitStatus = null;
		errorMessage = '';

		const formData = new FormData(consultaFormElement);
		const data = Object.fromEntries(formData.entries());
		const payload = { ...data, tipo: 'Solicitud de Consulta Codice' };

		try {
			const response = await fetch('https://api.somos1egacy.com/capture-consulta', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				let errorDetail = response.statusText;
				try { const errorJson = await response.json(); errorDetail = errorJson.detail || errorDetail; } catch (_) {}
				throw new Error(`Error del servidor (${response.status}): ${errorDetail}`);
			}

			const result = await response.json();
			if (result.status === 'success') {
				submitStatus = 'success';
				consultaFormElement.reset();
			} else {
				throw new Error(result.message || 'La respuesta del servidor no indicó éxito.');
			}

			setTimeout(() => { feedbackElement?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50);

		} catch (error) {
			console.error('Error al enviar formulario:', error);
			submitStatus = 'error';
			errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
			setTimeout(() => { feedbackElement?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50);
		} finally {
			isSubmitting = false;
		}
	}

	// --- Meta Tags ---
	const pageTitle = "Solicitar Consulta - Códice del Legado | 1egacy";
	const pageDescription = "Inicia la conversación sobre tu legado...";
	const canonicalUrl = "https://somos1egacy.com/solicitar-consulta";
	const openGraphImageUrl = "https://somos1egacy.com/og-consulta.webp";

</script>

<MetaTags
	title={pageTitle}
	description={pageDescription}
	canonical={canonicalUrl}
	openGraph={{ /* ... */ }}
	twitter={{ /* ... */ }}
/>

<div class="consultation-page">

	<header class="consultation-header">
		<h1>Iniciemos la Conversación sobre tu Legado</h1>
		<p>Todo gran legado comienza con una conversación. Este no es un formulario de venta, sino el primer paso para que podamos entender tu visión y explorar juntos cómo materializar la historia que merece ser recordada.</p>
		<p>Una consulta con nosotros es una charla sin compromiso, diseñada para escucharte, responder tus preguntas y determinar si somos los artesanos adecuados para custodiar tu historia.</p>
	</header>

	<section class="consultation-process">
		<h3>Nuestro Proceso de Consulta</h3>
		<div class="process-steps">
			<div class="step"><h4>Completa el Formulario</h4><p>Tómate un momento para compartir los detalles iniciales de tu proyecto. Cuanta más información nos brindes, mejor podremos prepararnos para nuestra charla.</p></div>
			<div class="step"><h4>Agendamos la Cita</h4><p>Una vez recibida tu solicitud, nuestro equipo se pondrá en contacto contigo en las próximas 24-48 horas hábiles para coordinar una videollamada en el horario que mejor te convenga.</p></div>
			<div class="step"><h4>La Conversación</h4><p>Tendremos nuestra consulta inicial. Hablaremos de tus ancestros, tus metas y tus sueños para el Códice. Al final, tendrás una visión clara de los siguientes pasos, sin ninguna obligación.</p></div>
		</div>
	</section>

	<section class="consultation-form">
		<h2 class="title-serif">Formulario de Consulta para tu Códice</h2>

		<form bind:this={consultaFormElement} on:submit|preventDefault={handleConsultaSubmit} novalidate>
			<div class="form-group">
				<label for="nombre">Nombre(s)</label>
				<input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" required aria-required="true">
				<span class="error-message" aria-live="polite"></span> </div>
			<div class="form-group">
				<label for="apellido">Apellido(s)</label>
				<input type="text" id="apellido" name="apellido" placeholder="Escribe tu apellido" required aria-required="true">
				<span class="error-message" aria-live="polite"></span> </div>
			<div class="form-group">
				<label for="email">Correo Electrónico de Contacto</label>
				<input type="email" id="email" name="email" placeholder="tuemail@ejemplo.com" required aria-required="true">
				<span class="error-message" aria-live="polite"></span> </div>
			<div class="form-group">
				<label for="telefono">Teléfono (Opcional)</label>
				<input type="tel" id="telefono" name="telefono" placeholder="(Opcional) Tu número para contacto vía WhatsApp">
				<span class="error-message" aria-live="polite"></span> </div>
			<div class="form-group">
				<label for="tema-central">El Apellido o Tema Central de tu Interés</label>
				<input type="text" id="tema-central" name="tema_central" placeholder="Ej. 'La historia del apellido Rodríguez en Asturias'" required aria-required="true" minlength="3">
				<span class="error-message" aria-live="polite"></span> </div>
			<div class="form-group">
				<label for="vision">Cuéntanos brevemente sobre la historia que deseas preservar</label>
				<textarea id="vision" name="vision" placeholder="¿Qué te motiva a crear este Códice? ..." required aria-required="true" minlength="50"></textarea>
				<span class="error-message" aria-live="polite"></span> </div>

			<div class="submit-button-container">
				<button type="submit" class="cta-button" class:loading={isSubmitting} disabled={isSubmitting}>
					<span>
						{#if isSubmitting}
							<div class="spinner"></div>
						{:else}
							Enviar mi Solicitud de Consulta
						{/if}
					</span>
				</button>
			</div>
		</form>

		{#if submitStatus === 'success'}
			<p bind:this={feedbackElement} class="feedback success" transition:fade>¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto pronto.</p>
		{:else if submitStatus === 'error'}
			<p bind:this={feedbackElement} class="feedback error" transition:fade>Error al enviar: {errorMessage}. Por favor, intenta de nuevo o contáctanos directamente.</p>
		{/if}

		<p class="trust-microcopy">Tu información es confidencial y será tratada con el mayor respeto...</p>
	</section>

</div>

<style>
    /* --- ESTILOS PARA EL SPINNER --- */
    .spinner { display: inline-block; width: 20px; height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3); border-radius: 50%;
        border-top-color: #ffffff; animation: spin 1s ease-in-out infinite;
        vertical-align: middle; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .cta-button.loading span { display: flex; justify-content: center; align-items: center; }

    /* --- ESTILOS GLOBALES --- */
    /* (Mismos estilos globales: body, h1, h2.title-serif, .consultation-page) */
     body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        margin: 0; background-color: #121212; color: #e0e0e0; line-height: 1.7; }
    h1, h2.title-serif, h3.title-serif { font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        font-weight: 400; color: #f5f5f5; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
    .consultation-page { padding: 80px 40px; max-width: 900px; margin: 60px auto;
        border-radius: 12px; background-color: #1a1a1a; box-shadow: 0 0 30px rgba(0, 0, 0, 0.4); }


    /* --- SECCIÓN 1: HEADER --- */
    /* (Mismos estilos .consultation-header) */
     .consultation-header { text-align: center; margin-bottom: 60px;
        border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 40px; }
    .consultation-header h1 { font-size: 2.8em; margin-bottom: 20px; }
    .consultation-header p { font-size: 1.2em; color: #bdbdbd; max-width: 700px; margin: 0 auto; }


    /* --- SECCIÓN 2: PROCESO --- */
    /* (Mismos estilos .consultation-process, .process-steps, .step) */
     .consultation-process { margin-bottom: 60px; text-align: center; }
    .consultation-process h3 { font-family: -apple-system, /*...*/ sans-serif;
        font-size: 1.6em; color: #e0e0e0; margin-bottom: 40px; font-weight: 600; }
    .process-steps { display: flex; justify-content: space-around; gap: 30px;
        text-align: left; flex-wrap: wrap; }
    .step { flex-basis: calc(33.333% - 20px); min-width: 250px; background-color: #222;
        padding: 25px; border-radius: 8px; border-left: 3px solid #c0a062; }
    .step h4 { font-size: 1.1em; font-weight: 600; color: #c0a062;
        margin: 0 0 10px 0; display: flex; align-items: center; }
    .step h4::before { content: '✓'; display: inline-block; margin-right: 10px;
        font-size: 1.2em; color: #c0a062; }
    .step p { font-size: 0.95em; color: #bdbdbd; line-height: 1.6; margin: 0; }


    /* --- SECCIÓN 3: FORMULARIO --- */
    /* (Mismos estilos .consultation-form h2.title-serif, .form-group, inputs, textarea, :focus) */
     .consultation-form h2.title-serif { font-size: 2.2em; text-align: center; margin-bottom: 40px; }
    .form-group { margin-bottom: 25px; }
    .form-group label { display: block; margin-bottom: 8px; font-size: 0.95em;
        color: #bdbdbd; font-weight: 500; }
    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="tel"],
    .form-group textarea {
        width: 100%; padding: 14px 18px; background-color: #2a2a2a;
        border: 1px solid #444; border-radius: 6px; color: #e0e0e0;
        font-size: 1em; box-sizing: border-box; font-family: inherit;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none; border-color: #c0a062;
        box-shadow: 0 0 0 3px rgba(192, 160, 98, 0.3);
        background-color: #333;
    }
    .form-group textarea { min-height: 150px; resize: vertical; }

    /* ESTADO INVÁLIDO (CORREGIDO CON CLASE .submitted) */
     form.submitted input:invalid,
     form.submitted textarea:invalid {
         border-color: #e53e3e; /* Rojo oscuro para error */
         box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2); /* Glow rojo sutil */
     }
     form.submitted input:invalid:focus,
     form.submitted textarea:invalid:focus {
        /* Mantiene el glow rojo incluso si está enfocado pero inválido después del submit */
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2);
     }


    /* PLACEHOLDER */
    ::placeholder { color: #777; opacity: 1; font-style: italic; }

    /* MENSAJE DE ERROR */
    .error-message { color: #fc8181; font-size: 0.875rem; display: block;
        min-height: 1.2em; margin-top: 6px; font-style: italic; }

    /* BOTÓN Y SU CONTENEDOR */
    .submit-button-container { text-align: center; margin-top: 40px; }
    .cta-button { display: inline-block; padding: 15px 30px; background-color: #c0a062;
        color: #121212; text-decoration: none; font-weight: bold; font-size: 1.1rem;
        border-radius: 5px; transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer; border: none; text-transform: uppercase; letter-spacing: 1px; }
    .cta-button:hover { background-color: #a08450; transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(192, 160, 98, 0.3); }
    button:disabled { opacity: 0.6; cursor: not-allowed; }

    /* ESTILOS FEEDBACK */
    .feedback { text-align: center; margin-top: 20px; padding: 15px;
        border-radius: 6px; font-weight: 500; }
    .feedback.success { background-color: rgba(50, 150, 50, 0.2); color: #68d391; border: 1px solid #68d391; }
    .feedback.error { background-color: rgba(200, 50, 50, 0.2); color: #fc8181; border: 1px solid #fc8181; }

    /* MICROCOPY */
    .trust-microcopy { text-align: center; margin-top: 20px; font-size: 0.9em; color: #888; }

    /* --- RESPONSIVIDAD --- */
    /* (Mismas media queries) */
     @media (max-width: 768px) {
        .consultation-page { padding: 60px 20px; margin: 40px 15px; }
        .consultation-header h1 { font-size: 2.2em; }
        .consultation-header p { font-size: 1.1em; }
        .process-steps { flex-direction: column; gap: 20px; }
        .step { flex-basis: 100%; }
        .consultation-form h2.title-serif { font-size: 1.8em; }
    }
    @media (max-width: 480px) {
        .consultation-page { padding: 40px 15px; }
        .consultation-header h1 { font-size: 1.9em; }
        .consultation-header p { font-size: 1em; }
        .consultation-process h3 { font-size: 1.4em; }
        .step p { font-size: 0.9em; }
        .consultation-form h2.title-serif { font-size: 1.6em; }
        .form-group input, .form-group textarea { padding: 12px 15px; font-size: 0.95em;}
    }

</style>