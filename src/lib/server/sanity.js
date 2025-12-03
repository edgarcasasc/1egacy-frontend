import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '9pou5g3d', // Tu ID real
  dataset: 'production',
  useCdn: false, // false para que los datos de inventario/precios sean siempre frescos
  apiVersion: '2024-03-01',
});