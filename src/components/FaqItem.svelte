<script>
	import { PortableText } from '@portabletext/svelte';

	// Este prop recibirá cada par de pregunta/respuesta
	export let faqItem;
	export let components; // Para renderizar el contenido de Sanity

	// --- Lógica del Acordeón ---
	let isOpen = false;

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<!-- 
  LA CORRECCIÓN CLAVE: 
  Este #if es la barrera de protección. El componente SÓLO intentará renderizar 
  el contenido si el objeto 'faqItem' es válido y tiene las propiedades 'question' 
  y 'answer'. Si no, no hará nada y evitará el error 500.
-->
{#if faqItem && faqItem.question && faqItem.answer}
	<div class="faq-item" class:open={isOpen}>
		<button class="faq-question" on:click={toggle}>
			<span>{faqItem.question}</span>
			<span class="faq-icon">{isOpen ? '−' : '+'}</span>
		</button>
		{#if isOpen}
			<div class="faq-answer">
				<!-- Usamos PortableText para la respuesta, por si tiene formato -->
				<PortableText value={faqItem.answer} {components} />
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
	}

	.faq-question:hover {
		color: #c0a062;
	}

	.faq-icon {
		font-size: 1.5rem;
		font-weight: 300;
		transition: transform 0.2s ease;
	}

	.faq-item.open .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1rem 1.5rem 1rem;
		line-height: 1.7;
		color: #b0b0b0;
	}
</style>

