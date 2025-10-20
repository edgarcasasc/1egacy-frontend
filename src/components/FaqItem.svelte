<script>
    // No necesitamos PortableText aquí porque 'answer' es texto plano
    // import { PortableText } from '@portabletext/svelte';

    // Este prop recibirá cada par de pregunta/respuesta
    export let faqItem;

    // --- Lógica del Acordeón ---
    let isOpen = false;

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<!-- 
    La barrera de protección se asegura de que solo se renderice si hay datos.
-->
{#if faqItem && faqItem.question && faqItem.answer}
    <div class="faq-item" class:open={isOpen}>
        <button class="faq-question" on:click={toggle} aria-expanded={isOpen}>
            <span>{faqItem.question}</span>
            <span class="faq-icon">{isOpen ? '−' : '+'}</span>
        </button>
        {#if isOpen}
            <div class="faq-answer">
                <!-- 
                    CORRECCIÓN CLAVE: 
                    Usamos una etiqueta <p> y {@html} para mostrar el texto plano.
                    .replace(/\n/g, '<br/>') convierte los saltos de línea del
                    campo de texto de Sanity en saltos de línea <br> en HTML.
                -->
                <p>{@html faqItem.answer.replace(/\n/g, '<br/>')}</p>
            </div>
        {/if}
    </div>
{/if}

<style>
    .faq-item {
        border-bottom: 1px solid #333;
        overflow: hidden;
    }

    .faq-question {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 0;
        text-align: left;
        background: none;
        border: none;
        color: #e0e0e0;
        font-size: 1.2rem;
        font-family: 'Source Sans 3', sans-serif;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .faq-question:hover {
        color: #c0a062;
    }

    .faq-icon {
        font-size: 1.5rem;
        font-weight: 300;
        color: #c0a062;
        transition: transform 0.3s ease;
    }
    
    /* El icono de '+' no necesita rotar, solo el de '-' */
    .faq-item.open .faq-icon {
       /* Quitado el rotate para un efecto más simple de cambio de caracter */
    }

    .faq-answer {
        padding: 0 1rem 1.5rem 1rem;
        line-height: 1.7;
        color: #b0b0b0;
    }
</style>