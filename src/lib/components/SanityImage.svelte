<script>
  import { client } from '$lib/sanityClient.js';
  import imageUrlBuilder from '@sanity/image-url';

  export let value; // El objeto de imagen que llega desde Sanity

  // Función para verificar si el objeto de imagen es válido
  function isValidImage(source) {
    return source && source.asset && (source.asset._ref || source.asset._id);
  }

  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }
</script>

{#if isValidImage(value)}
  <img
    src={urlFor(value).width(800).auto('format').url()}
    alt={value.alt || 'Imagen del artículo'}
    loading="lazy"
  />
{/if}

<style>
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
  }
</style>