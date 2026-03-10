import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function load({ url, cookies }) {
    const token = url.searchParams.get('token');
    const linajeTarget = url.searchParams.get('linaje') || '';

    let success = false;
    let fallbackUrl = '/';

    if (linajeTarget) {
        // Determinamos a qué versión redirigirlo basado en la URL que guardó el token
        // Podríamos también usar el campo `source` de la base de datos si quisiéramos.
        fallbackUrl = `/origins/${linajeTarget}`; 
    }

    if (!token) {
        // No hay token, lo mandamos al inicio
        throw redirect(303, fallbackUrl);
    }

    try {
        // Buscamos un prospecto con el token dado
        const lead = await prisma.leads.findFirst({
            where: { 
                magic_link_token: token,
                is_verified: false 
            }
        });

        if (lead) {
            // ¡Token válido! Lo marcamos como verificado
            await prisma.leads.update({
                where: { id: lead.id },
                data: {
                    is_verified: true,
                    magic_link_token: null // Borramos el token para un solo uso
                }
            });

            console.log(`✅ [POSTGRES] Verificación Exitosa: ${lead.email}`);

            // Otorgamos el acceso persistente (1 año) en todo el dominio
            cookies.set('legado_unlocked', 'true', {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });

            success = true;
            
            // Si el source terminaba con _linaje_[Apellido], podríamos extraer el apellido
            // Pero como lo pasamos por la URL lo usamos de ahí.
            if (lead.source && lead.source.startsWith('demo_linaje_')) {
                fallbackUrl = `/demo-innovacion/${linajeTarget}`;
            } else if (lead.source && lead.source.startsWith('origins_linaje_')) {
                fallbackUrl = `/origins/${linajeTarget}`;
            }

        } else {
            console.warn(`[VERIFY_ERROR] Intento de verificación con token inválido o ya usado: ${token}`);
            success = false;
        }

    } catch (dbError) {
        console.error('[VERIFY_ERROR] Error en conexión Prisma al verificar:', dbError);
        success = false;
    }

    return { 
        success,
        redirectUrl: fallbackUrl
    };
}
