// src/routes/blog/+page.server.js
import { client } from '$lib/sanityClient';

export async function load() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    subtitle,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url,
    snippet,
    publishedAt
  }`;
  
  const posts = await client.fetch(query);

  if (posts) {
    return {
      posts
    };
  }

  return {
    status: 500,
    body: new Error("Internal Server Error")
  };
}