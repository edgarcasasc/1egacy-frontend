<script>
	import { PortableText } from '@portabletext/svelte';
	import { slide } from 'svelte/transition';

	// Props: el objeto faq y los componentes de PortableText
	export let faq;
	export let components;

	// Estado para controlar si el acordeón está abierto o cerrado
	let isOpen = false;
</script>

<div class="faq-item">
	<!-- El botón que contiene la pregunta y alterna la visibilidad de la respuesta -->
	<button class="faq-question" on:click={() => (isOpen = !isOpen)} aria-expanded={isOpen}>
		<span>{faq.question}</span>
		<!-- El ícono de flecha que rota según el estado -->
		<svg
			class="chevron"
			class:rotated={isOpen}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6 9L12 15L18 9"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	<!-- La respuesta se muestra condicionalmente con una transición suave -->
	{#if isOpen}
		<div class="faq-answer-wrapper" transition:slide={{ duration: 300 }}>
			<div class="faq-answer">
				<PortableText value={faq.answer} {components} />
			</div>
		</div>
	{/if}
</div>

<style>
	.faq-item {
		border-bottom: 1px solid #333;
		padding: 1.5rem 0;
	}
	.faq-item:first-child {
		border-top: 1px solid #333;
	}
	.faq-question {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: none;
		border: none;
		color: #e0e0e0;
		font-size: 1.2rem;
		font-weight: 600;
		text-align: left;
		cursor: pointer;
		padding: 0;
	}
	.faq-question span {
		flex: 1;
		padding-right: 1rem;
	}
	.chevron {
		transition: transform 0.3s ease;
		flex-shrink: 0;
		color: #c0a062;
	}
	.chevron.rotated {
		transform: rotate(180deg);
	}
	.faq-answer-wrapper {
		overflow: hidden;
	}
	.faq-answer {
		padding: 1rem 0 0 0;
		line-height: 1.7;
		color: #b0b0b0;
	}
</style>
