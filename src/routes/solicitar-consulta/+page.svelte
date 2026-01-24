<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags';
    import { fade } from 'svelte/transition';

    let isSubmitting = false;
    let submitStatus: 'success' | 'error' | null = null;
    let errorMessage = '';
    let feedbackElement: HTMLParagraphElement | null = null;
    let consultaFormElement: HTMLFormElement;

    // --- LÓGICA DE VALIDACIÓN ---
    function showValidationMessages() {
        if (!consultaFormElement) return;
        consultaFormElement.classList.add('submitted');

        const inputs = consultaFormElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            'input[required], textarea[required], select[required], input[type="email"]'
        );
        inputs.forEach(input => {
            const errorContainer = input.parentElement?.querySelector('.error-message');
            if (errorContainer) {
                errorContainer.textContent = '';
                if (!input.checkValidity()) {
                    if (input.validity.valueMissing) {
                        errorContainer.textContent = 'Este campo es necesario para continuar.';
                    } else if (input.validity.tooShort) {
                        errorContainer.textContent = `Por favor, comparte un poco más (mínimo ${input.minLength} caracteres).`;
                    } else if (input.validity.typeMismatch && input.type === 'email') {
                        errorContainer.textContent = 'Por favor, introduce un correo válido.';
                    } else {
                        errorContainer.textContent = input.validationMessage;
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
        
        // Ajustamos el tipo según la selección del usuario o por defecto
        const interes = data.interes ? ` (${data.interes})` : '';
        const payload = { ...data, tipo: `Solicitud de Evaluación${interes}` };

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
    const pageTitle = "Solicitar Evaluación - Códice del Legado | 1egacy";
    const pageDescription = "Solicita una evaluación para tu Códice. Revisamos tu caso y definimos el mejor camino para preservar tu historia.";
    const canonicalUrl = "https://somos1egacy.com/solicitar-consulta";
</script>

<MetaTags
    title={pageTitle}
    description={pageDescription}
    canonical={canonicalUrl}
/>

<div class="consultation-page">

    <header class="consultation-header">
        <h1>Solicita una evaluación para tu Códice</h1>
        <p>Este es el primer paso para entender tu caso y proponerte el mejor camino (Códice, Origins o Producciones).</p>
        <p>Revisamos tu información y, si hay encaje, coordinamos una videollamada breve para definir alcance y siguientes pasos.</p>
        <p class="hero-micro">Privado · Sin compromiso · Respuesta en 24–48 h hábiles</p>
    </header>

    <section class="consultation-process">
        <h3>Qué pasa después</h3>
        <div class="process-steps">
            <div class="step"><h4>1) Envías tu solicitud</h4><p>Compártenos el contexto y lo que quieres preservar.</p></div>
            <div class="step"><h4>2) Revisamos y te contactamos</h4><p>Si tu caso es elegible, coordinamos una videollamada.</p></div>
            <div class="step"><h4>3) Definimos alcance y propuesta</h4><p>Sales con claridad de entregables, tiempos y siguiente paso.</p></div>
        </div>
    </section>

    <section class="consultation-form">
        <h2 class="title-serif">Solicitud de evaluación</h2>

        <form bind:this={consultaFormElement} on:submit|preventDefault={handleConsultaSubmit} novalidate>
            <div class="form-group">
                <label for="nombre">Nombre(s)</label>
                <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required aria-required="true">
                <span class="error-message" aria-live="polite"></span> 
            </div>
            
            <div class="form-group">
                <label for="apellido">Apellido(s)</label>
                <input type="text" id="apellido" name="apellido" placeholder="Tus apellidos" required aria-required="true">
                <span class="error-message" aria-live="polite"></span> 
            </div>
            
            <div class="form-group">
                <label for="email">Correo Electrónico de Contacto</label>
                <input type="email" id="email" name="email" placeholder="tuemail@ejemplo.com" required aria-required="true">
                <span class="error-message" aria-live="polite"></span> 
            </div>
            
            <div class="form-group">
                <label for="telefono">Teléfono (Opcional)</label>
                <input type="tel" id="telefono" name="telefono" placeholder="WhatsApp (opcional)">
                <span class="error-message" aria-live="polite"></span> 
            </div>

            <div class="form-group">
                <label for="interes">¿Qué te interesa?</label>
                <select id="interes" name="interes" required>
                    <option value="" disabled selected>Selecciona una opción</option>
                    <option value="Códice del Legado">Códice del Legado</option>
                    <option value="Investigación Origins">Investigación Origins</option>
                    <option value="Producción Films">Producción Films</option>
                    <option value="No estoy seguro">Aún no estoy seguro</option>
                </select>
                <span class="error-message" aria-live="polite"></span>
            </div>
            
            <div class="form-group">
                <label for="tema-central">Apellido principal o tema</label>
                <input type="text" id="tema-central" name="tema_central" placeholder="Ej. Rodríguez (Asturias) / Historia familiar en Monterrey / Escudo y Códice" required aria-required="true" minlength="3">
                <span class="error-message" aria-live="polite"></span> 
            </div>
            
            <div class="form-group">
                <label for="vision">Qué quieres preservar</label>
                <textarea id="vision" name="vision" placeholder="Personas, lugares, fechas aproximadas y cualquier detalle importante." required aria-required="true" minlength="20"></textarea>
                <span class="error-message" aria-live="polite"></span> 
            </div>

            <div class="form-group">
                <label for="motivo">Para qué lo quieres</label>
                <input type="text" id="motivo" name="motivo" placeholder="Ej. regalo familiar, preservar memoria, reunificación de ramas, archivo para hijos.">
                <span class="error-message" aria-live="polite"></span> 
            </div>

            <div class="submit-button-container">
                <button type="submit" class="cta-button" class:loading={isSubmitting} disabled={isSubmitting}>
                    <span>
                        {#if isSubmitting}
                            <div class="spinner"></div>
                        {:else}
                            Enviar solicitud
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

        <p class="trust-microcopy">Tu información es privada. Solo se usa para evaluar tu caso y contactarte. No la compartimos con terceros.</p>
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
    :global(body) { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        margin: 0; background-color: #121212; color: #e0e0e0; line-height: 1.7; }
    
    h1, h2.title-serif, h3.title-serif { font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
        font-weight: 400; color: #f5f5f5; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
    
    .consultation-page { padding: 80px 40px; max-width: 900px; margin: 60px auto;
        border-radius: 12px; background-color: #1a1a1a; box-shadow: 0 0 30px rgba(0, 0, 0, 0.4); }

    /* --- SECCIÓN 1: HEADER --- */
    .consultation-header { text-align: center; margin-bottom: 60px;
        border-bottom: 1px solid rgba(192, 160, 98, 0.2); padding-bottom: 40px; }
    .consultation-header h1 { font-size: 2.8em; margin-bottom: 20px; }
    .consultation-header p { font-size: 1.1em; color: #bdbdbd; max-width: 700px; margin: 0 auto 10px; }
    .hero-micro { font-size: 0.9em; font-style: italic; color: #888; margin-top: 15px; }

    /* --- SECCIÓN 2: PROCESO --- */
    .consultation-process { margin-bottom: 60px; text-align: center; }
    .consultation-process h3 { font-family: -apple-system, sans-serif;
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
    .consultation-form h2.title-serif { font-size: 2.2em; text-align: center; margin-bottom: 40px; }
    .form-group { margin-bottom: 25px; }
    .form-group label { display: block; margin-bottom: 8px; font-size: 0.95em;
        color: #bdbdbd; font-weight: 500; }
    
    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="tel"],
    .form-group textarea,
    .form-group select {
        width: 100%; padding: 14px 18px; background-color: #2a2a2a;
        border: 1px solid #444; border-radius: 6px; color: #e0e0e0;
        font-size: 1em; box-sizing: border-box; font-family: inherit;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .form-group select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23bdbdbd' d='M6 9L1 4h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 15px center; }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none; border-color: #c0a062;
        box-shadow: 0 0 0 3px rgba(192, 160, 98, 0.3);
        background-color: #333;
    }
    .form-group textarea { min-height: 120px; resize: vertical; }

    /* ESTADO INVÁLIDO */
    form.submitted input:invalid,
    form.submitted textarea:invalid,
    form.submitted select:invalid {
         border-color: #e53e3e;
         box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2);
    }

    ::placeholder { color: #777; opacity: 1; font-style: italic; }

    .error-message { color: #fc8181; font-size: 0.875rem; display: block;
        min-height: 1.2em; margin-top: 6px; font-style: italic; }

    .submit-button-container { text-align: center; margin-top: 40px; }
    
    .cta-button { display: inline-block; padding: 15px 30px; background-color: #c0a062;
        color: #121212; text-decoration: none; font-weight: bold; font-size: 1.1rem;
        border-radius: 5px; transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer; border: none; text-transform: uppercase; letter-spacing: 1px; }
    
    .cta-button:hover { background-color: #a08450; transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(192, 160, 98, 0.3); }
    
    button:disabled { opacity: 0.6; cursor: not-allowed; }

    .feedback { text-align: center; margin-top: 20px; padding: 15px;
        border-radius: 6px; font-weight: 500; }
    .feedback.success { background-color: rgba(50, 150, 50, 0.2); color: #68d391; border: 1px solid #68d391; }
    .feedback.error { background-color: rgba(200, 50, 50, 0.2); color: #fc8181; border: 1px solid #fc8181; }

    .trust-microcopy { text-align: center; margin-top: 20px; font-size: 0.9em; color: #888; }

    /* --- RESPONSIVIDAD --- */
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
        .form-group input, .form-group textarea, .form-group select { padding: 12px 15px; font-size: 0.95em;}
    }
</style>