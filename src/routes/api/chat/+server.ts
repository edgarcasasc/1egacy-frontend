import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '$env/dynamic/private';
import { client } from '$lib/sanityClient';

export async function POST({ request }) {
    try {
        if (!env.GOOGLE_API_KEY) throw new Error("Falta API Key de Google");
        if (!env.SANITY_API_TOKEN) throw new Error("Falta SANITY_API_TOKEN de escritura");

        // Recibimos el orderId y el mensaje
        const { message, history, context, orderId } = await request.json();
        
        const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // --- 1. LIMPIEZA DEL HISTORIAL PARA GEMINI ---
        let chatHistory = [];
        if (Array.isArray(history) && history.length > 0) {
            const cleanHistory = [...history];
            const lastMsg = cleanHistory[cleanHistory.length - 1];
            
            // Evitamos duplicar el último mensaje si ya lo agregaste en el frontend
            if (lastMsg.role === 'user' && lastMsg.text === message) {
                cleanHistory.pop();
            }

            chatHistory = cleanHistory.map(msg => ({
                role: msg.role === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text || "" }]
            }));

            // Regla: Eliminar saludos iniciales de la IA (Google exige empezar con User)
            while (chatHistory.length > 0 && chatHistory[0].role === 'model') {
                chatHistory.shift();
            }
        }

        // --- 2. CONTEXTO ---
        const linajeInfo = context.linajeVinculado ? `
            === DATOS DEL LINAJE ===
            Apellido: ${context.linajeVinculado.title}
            Origen: ${JSON.stringify(context.linajeVinculado.origen)}
            Historia: ${JSON.stringify(context.linajeVinculado.hitos)}
        ` : "No hay datos específicos cargados.";

        const prompt = `
            ACTÚA COMO: "El Artesano", guardián de 1egacy.
            CLIENTE: ${context.customerName}.
            
            INSTRUCCIONES:
            - NO te vuelvas a presentar si ya hay historial.
            - Si es cliente 'Bespoke' en proceso, entrevístalo sutilmente sobre sus abuelos.
            - Si es cliente 'Estándar', solo responde dudas históricas.
            
            DATOS:
            ${linajeInfo}

            PREGUNTA: "${message}"
        `;

        // --- 3. GENERAR RESPUESTA ---
        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(prompt);
        const aiResponse = result.response.text();

        // --- 4. GUARDAR EN SANITY (CORREGIDO CON _key) ---
        if (orderId) {
            const timestamp = new Date().toISOString();
            
            // Generamos claves únicas para que Sanity Studio pueda mostrar los mensajes
            const userMsgKey = crypto.randomUUID();
            const aiMsgKey = crypto.randomUUID();

            console.log(`💾 Guardando chat en orden: ${orderId}`);

            await client
                .patch(orderId)
                .setIfMissing({ chatHistory: [] }) 
                .append('chatHistory', [
                    { 
                        _key: userMsgKey, // <--- ¡ESTO FALTABA!
                        role: 'user', 
                        text: message, 
                        timestamp 
                    },
                    { 
                        _key: aiMsgKey,   // <--- ¡ESTO FALTABA!
                        role: 'ai', 
                        text: aiResponse, 
                        timestamp 
                    }
                ])
                .commit({ token: env.SANITY_API_TOKEN })
                .then(() => console.log("✅ Chat guardado exitosamente"))
                .catch(err => console.error("❌ Error guardando en Sanity:", err.message));
        }

        return json({ text: aiResponse });

    } catch (err) {
        console.error('🔥 Error en API Chat:', err);
        return json({ text: `[ERROR TÉCNICO]: ${err.message}` });
    }
}