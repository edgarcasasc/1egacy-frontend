import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const { token } = params;

    // --- 1. LISTA DE TOKENS HISTÓRICOS (SALVAVIDAS) ---
    // Aquí pones los tokens antiguos que deben seguir funcionando
    const LEGACY_TOKENS = [
        '3ff94e4a-6803-485a-b188-1ad168904b0f', // Token original de Casas
        // 'otro-token-antiguo-aqui'
    ];

    const isLegacyToken = LEGACY_TOKENS.includes(token);

    // --- 2. CONSTRUCCIÓN DE LA QUERY ---
    // Si es legacy, quizás necesites buscar por otro campo o simplemente buscar la orden que coincida con ese token antiguo si está guardado en Sanity.
    // Si el token antiguo NO está en el campo 'accessToken' de la orden nueva en Sanity, tendrás que decidir qué orden cargar.
    
    // ESTRATEGIA HÍBRIDA: Buscamos por token.
    // Si Sanity ya tiene el token nuevo, y tú entras con el viejo, la query normal fallará.
    
    // SOLUCIÓN INTELIGENTE:
    // Si es un token Legacy conocido, forzamos la búsqueda de la orden específica (por ejemplo, la de "Casas").
    // Si no, buscamos normal por accessToken.

    let queryFilter = `accessToken == $token`; // Búsqueda normal

    if (isLegacyToken) {
        console.log(`🔓 Acceso Legacy detectado para token: ${token}`);
        // OPCIÓN A: Si actualizaste manualmente el token en Sanity al viejo, la query normal funcionará.
        // OPCIÓN B: Si quieres que busque por nombre de cliente o ID específico para ese token viejo:
        // queryFilter = `customerName match "Edgar Casas"`; // Ejemplo forzado
        
        // Pero como ya me dijiste que actualizaste manualmente el token en Sanity, 
        // la búsqueda normal DEBERÍA funcionar si el token en Sanity coincide con el de la URL.
    }

    const query = `*[_type == "order" && ${queryFilter}][0]{
        _id,
        customerName,
        investigationStatus,
        orderDate,
        "items": items[]{ productName, serviceLevel, size },
        chatHistory, 
        linajeVinculado->{
            title, origen, historia, blason,
            "hitos": hitos[]{ year, title, description }
        }
    }`;

    try {
        const order = await client.fetch(query, { token });

        if (!order) {
            // Si es legacy pero no se encontró, damos una pista en consola
            if (isLegacyToken) console.warn("⚠️ Token legacy usado pero no se encontró orden en Sanity.");
            throw error(403, 'Acceso denegado. Token inválido o expirado.');
        }

        return { order };

    } catch (err) {
        if (err.status) throw err;
        console.error('🔥 ERROR CRÍTICO EN BÓVEDA:', err);
        throw error(500, `No pudimos abrir la bóveda: ${err.message}`);
    }
}