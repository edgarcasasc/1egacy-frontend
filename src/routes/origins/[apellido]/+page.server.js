import { client } from '$lib/sanityClient.js';
import { error } from '@sveltejs/kit';

// ISR 2026: Velocidad de estático con actualización automática
export const prerender = false; // Desactivado para habilitar form actions de prospectos

export async function load({ params, setHeaders, cookies }) {
   try {
        const slug = params.apellido?.toLowerCase() || '';
        const isUnlocked = cookies.get('legado_unlocked') === 'true';

        const query = `*[_type == "linaje" && slug.current == $slug][0]{
            _id,
            title,
            "slug": slug.current,
            introduccion,
            // Traemos el escudo con metadatos de dimensiones para el SEO Social
            "escudoUrl": escudo.asset->url,
            "escudoMeta": escudo.asset->metadata.dimensions,
            
            // Texto rico para el diseño
            blason, 
            origen,
            historia,
            
            // --- FAQs ---
            faqs[] {
                question,
                answer
            },

            // --- VIDEOS ---
            videos[] {
                title,
                description,
                youtubeUrl,
                uploadDate,
                duration,
                // Dereferenciamos el asset para obtener la URL directa de la imagen
                "thumbnailUrl": thumbnail.asset->url
            },

            // --- HITOS (LINEA DE TIEMPO) ---
            hitos[] {
                year,
                title,
                description
            },

            articulosRelacionados[]->{
                title,
                "slug": slug.current,
                "mainImageUrl": mainImage.asset->url,
                excerpt
            },
            "relatedProducts": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
                title,
                "slug": slug.current,
                price,
                "mainImageUrl": gallery[0].asset->url
            }
        }`;

        const linajeData = await client.fetch(query, { slug });

        if (!linajeData) {
            throw error(404, `El linaje '${params.apellido}' no está en nuestros registros aún.`);
        }

        // Extracción segura del texto plano localmente en lugar de GROQ pt::text()
        const cleanSEOList = linajeData.blason && Array.isArray(linajeData.blason)
            ? linajeData.blason
                .map(block => block.children ? block.children.map(child => child.text).join('') : '')
                .join(' ')
                .replace(/\n/g, ' ')
                .trim()
            : '';

        // Configuramos los headers reales para SvelteKit / Vercel
        // Cache más largo (1 hora CDN) ya que son orígenes históricos estáticos
        setHeaders({
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        });

        return {
            linaje: {
                ...linajeData,
                blasonTexto: cleanSEOList
            },
            isUnlocked
        };

    } catch (err) {
        if (err.status === 404) throw err;
        
        // Evitamos que 'slug' rompa el catch si falló antes de definirse
        const errorSlug = params.apellido || 'desconocido';
        console.error(`CRITICAL 5xx Origins [${errorSlug}]:`, err);
        throw error(503, 'La Bóveda de Linajes está temporalmente saturada.');
    }
}

import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const actions = {
    unlockStory: async ({ request, url }) => {
        const data = await request.formData();
        const email = data.get('email');
        const lastNameSlug = data.get('linaje');
        const lastNameTitle = data.get('titulo') || lastNameSlug;
        const consent = data.get('consent') === 'on';
        
        try {
            if (!email) throw new Error("Email is required");
            
            // Generamos un token criptográfico seguro de 32 caracteres (hex)
            const magicToken = crypto.randomBytes(16).toString('hex');
            
            // Guardamos el token en PostgreSQL
            const newLead = await prisma.leads.upsert({
                where: { email: email.toString() },
                update: {
                    source: `origins_linaje_${lastNameTitle}`,
                    marketing_consent: consent,
                    magic_link_token: magicToken,
                    is_verified: false,
                    updated_at: new Date()
                },
                create: {
                    email: email.toString(),
                    source: `origins_linaje_${lastNameTitle}`,
                    marketing_consent: consent,
                    magic_link_token: magicToken,
                    is_verified: false
                }
            });
            
            // Construimos el Link Mágico Absoluto
            const verifyUrl = new URL(`/verify?token=${magicToken}&linaje=${lastNameSlug}`, url.origin).toString();
            
            // Enviamos el correo real usando Resend
            try {
                await resend.emails.send({
                    from: 'El Códice 1egacy <legado@acclarolabs.com>', // Cambia esto por tu remitente oficial cuando lo verifiques
                    to: newLead.email,
                    subject: `Desbloqueaste el Códice: Familia ${lastNameTitle}`,
                    html: `
                        <div style="font-family: 'Georgia', serif; background-color: #111; color: #e0e0e0; padding: 40px 20px; text-align: center; border: 1px solid #333;">
                            <h1 style="color: #d4af37; margin-bottom: 10px; font-weight: normal;">El Códice ha despertado</h1>
                            <p style="font-size: 16px; color: #aaa; margin-bottom: 30px;">
                                Saludos, portador del apellido <strong>${lastNameTitle}</strong>.
                                <br><br>
                                Para desenrollar el pergamino y revelar la historia completa de tu linaje en el archivo histórico de 1egacy, haz clic en el siguiente botón para verificar tu identidad:
                            </p>
                            
                            <a href="${verifyUrl}" style="background: linear-gradient(135deg, #d4af37 0%, #aa8529 100%); color: #000; text-decoration: none; padding: 14px 30px; font-size: 16px; font-weight: bold; border-radius: 4px; text-transform: uppercase; display: inline-block;">
                                Leer mi Historia Completa
                            </a>
                            
                            <p style="font-size: 11px; color: #555; margin-top: 40px;">
                                Este sello es mágico y solo puede usarse una vez.<br>
                                Si tú no solicitaste esta llave, ignora el mensaje.<br>
                                © 2026 1egacy / Powered by Acclarolabs
                            </p>
                        </div>
                    `
                });
                console.log(`[RESEND] Correo Mágico enviado a: ${newLead.email}`);
            } catch (emailError) {
                console.error('[RESEND_ERROR] Falló el envío del correo:', emailError);
            }

        } catch (dbError) {
            console.error('[POSTGRES_ERROR] Error al guardar el prospecto:', dbError);
        }
        
        // Retornamos un estado de "verificación pendiente"
        return { 
            pendingVerification: true, 
            email,
            message: "Por seguridad y respeto a la privacidad del legaje, necesitamos verificar tu identidad."
        };
    }
};