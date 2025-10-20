import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'; // <-- ¡Añade esta importación!

export default defineConfig({
    plugins: [sveltekit()],
    // --- AÑADE ESTA SECCIÓN ---
    resolve: {
        alias: {
            // Asegura que $lib apunte a src/lib
            $lib: path.resolve('./src/lib')
        }
    }
    // --- FIN DE LA SECCIÓN AÑADIDA ---
});