<script>
  import { PortableText } from '@portabletext/svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  export let data;
  const { post } = data;

  const components = {
    types: {
      image: SanityImage,
    },
  };
</script>

<article class="post-container">
  {#if post}
    <header>
      <h1>{post.title}</h1>
      {#if post.subtitle}
        <p class="subtitle">{post.subtitle}</p>
      {/if}
      <p class="meta">Publicado el {new Date(post.publishedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      {#if post.mainImageUrl}
        <img class="featured-image" src={post.mainImageUrl} alt={post.title} />
      {/if}
    </header>
    
    <div class="post-content">
      {#if post.body}
        <PortableText value={post.body} {components} />
      {/if}
    </div>
  {:else}
    <h1>Artículo no encontrado</h1>
  {/if}
</article>

<style>
  .post-container { max-width: 750px; margin: 0 auto; padding: 150px 2rem 60px 2rem; }
  header { text-align: center; margin-bottom: 3rem; }
  h1 { font-size: 3.2rem; font-weight: 700; line-height: 1.2; margin-bottom: 0.5rem; }
  .subtitle { font-size: 1.5rem; color: #aaa; margin-bottom: 1rem; }
  .meta { font-style: italic; color: #888; }
  .featured-image { width: 100%; height: auto; border-radius: 8px; margin-top: 2rem; margin-bottom: 3rem; }
  .post-content { font-size: 1.1rem; line-height: 1.8; }
  :global(.post-content h2) { font-size: 2rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; color: #c0a062; }
  :global(.post-content h3) { font-size: 1.7rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #c0a062; }
  :global(.post-content p) { margin-bottom: 1.5rem; color: #b0b0b0; }
  :global(.post-content ul) { padding-left: 2rem; margin-bottom: 1.5rem; }
</style>