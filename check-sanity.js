import { createClient } from '@sanity/client';

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET;
const token = process.env.VITE_SANITY_READ_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-10-15',
  useCdn: true,
  token,
});

async function check() {
  const posts = await client.fetch('*[_type == "post"]{title, "slug": slug.current, _createdAt}');
  console.log('Posts:', posts.map(p => p.title));
  
  const linajes = await client.fetch('*[_type == "linaje"]{title, "slug": slug.current, _createdAt}');
  console.log('Linajes:', linajes.map(l => l.title));
}

check().catch(console.error);
