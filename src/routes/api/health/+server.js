// src/routes/api/health/+server.js
import { client } from '$lib/sanityClient';
import { json } from '@sveltejs/kit';

export async function GET() {
    const start = Date.now();
    try {
        // Verificamos Sanity con una consulta mínima (solo el ID de un registro)
        await client.fetch(`*[_type == "product"][0]{_id}`);
        
        return json({
            status: 'online',
            latency: `${Date.now() - start}ms`,
            timestamp: new Date().toISOString(),
            engine: 'SvelteKit + Netlify Functions'
        });
    } catch (err) {
        return json({
            status: 'degraded',
            error: err.message,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}