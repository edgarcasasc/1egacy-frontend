import { error } from '@sveltejs/kit';

// ESTRATEGIA 2026: Velocidad estática instantánea
export const prerender = 'auto'; 

export async function load() {
    try {
        return {
            // Aquí podrías traer datos de Sanity después, por ahora aseguramos el OK
            status: 'success'
        };
    } catch (err) {
        throw error(503, 'Sincronizando el Studio...');
    }
}