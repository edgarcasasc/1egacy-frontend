import { client } from '$lib/sanityClient';

export const prerender = true; 

export async function load() {
    // 1. Consulta para Clústeres (Lo que se ve al inicio)
    const topicsQuery = `*[_type == "topic"] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3]{
            title,
            "slug": slug.current,
            "mainImageUrl": mainImage.asset->url,
            "apellidos": apellidosRelacionados[]->title 
        }
    }`;

    // 2. Consulta para Sabiduría Destacada (Sidebar)
    const mostReadQuery = `*[_type == "post"] | order(publishedAt desc)[0...5]{
        title,
        "slug": slug.current,
        "topicTitle": topics[0]->title
    }`;

    // 3. NUEVA: Consulta Global para el Buscador (Index de búsqueda liviano)
    const searchIndexQuery = `*[_type == "post"]{
        title,
        subtitle,
        "slug": slug.current,
        "mainImageUrl": mainImage.asset->url,
        "apellidos": apellidosRelacionados[]->title,
        "topicTitle": topics[0]->title
    }`;

    try {
        const [topics, mostRead, searchIndex] = await Promise.all([
            client.fetch(topicsQuery),
            client.fetch(mostReadQuery),
            client.fetch(searchIndexQuery)
        ]);

        return {
            topics: topics || [],
            mostRead: mostRead || [],
            searchIndex: searchIndex || [] // Enviamos todos para que el buscador no falle
        };
    } catch (err) {
        console.error('[SERVER LOAD ERROR]', err);
        return { topics: [], mostRead: [], searchIndex: [] };
    }
}