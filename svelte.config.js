import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments
        adapter: adapter(),
        inlineStyleThreshold: 1024,
        
        // 🛠️ SOLUCIÓN PARA NETLIFY: 
        // Permite que el build pase aunque falten assets (404) como iconos o imágenes
        prerender: {
            handleHttpError: 'warn'
        }
    }
};

export default config;