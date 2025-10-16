// src/lib/data/linajes.js

export const linajes = [
  {
    id: 'Garza',
    escudoUrl: '/escudos/garza.svg', // Usamos el SVG que ya subiste
    descripcionEscudo: 'El campo de Plata representa pureza, integridad y sabiduría. Las cinco Garzas de Sable (negras) simbolizan vigilancia, astucia y un alma prudente. Es el emblema de un estratega que observa, espera y actúa con precisión.',
    introduccion: 'El linaje Garza, arraigado en la nobleza del norte de España, es sinónimo de resiliencia y liderazgo. Su historia en el Nuevo Mundo está marcada por la fundación de ciudades y la forja de industrias.',
    articulos: [
      {
        titulo: 'Los Fundadores Ocultos: ¿Estaban los Garza en la Cuna del Nuevo Reino de León?',
        // Creamos el 'slug' a partir del título para la URL
        url: '/blog/los-fundadores-ocultos-estaban-los-garza-en-la-cuna-del-nuevo-reino-de-leon',
        imagenUrl: 'https://cdn.sanity.io/images/9pou5g3d/production/aac30227a79c9099a41cabda6405309d2d7ed413-1024x1024.webp'
      },
      {
        titulo: 'De Gigantes Industriales a Corridos Prohibidos: El Legado Inesperado de los Garza',
        url: '/blog/de-gigantes-industriales-a-corridos-prohibidos-el-legado-inesperado-de-los-garza',
        imagenUrl: 'https://cdn.sanity.io/images/9pou5g3d/production/99d9cafbf1f84408467ccf7e5bc9a1999670a7ad-1024x1024.webp'
      }
    ]
  },
  {
    id: 'Martínez',
    escudoUrl: '/escudos/martinez.svg', // Asumimos que pronto tendrás este archivo
    descripcionEscudo: 'Descripción del escudo Martínez próximamente...',
    introduccion: 'Descubre la historia de los Martínez, un linaje de artesanos y pioneros...',
    articulos: []
  },
  {
    id: 'Treviño',
    escudoUrl: '/escudos/trevino.svg', // Asumimos que pronto tendrás este archivo
    descripcionEscudo: 'Descripción del escudo Treviño próximamente...',
    introduccion: 'De origen Cántabro, el apellido Treviño está ligado a la exploración...',
    articulos: []
  },
  // ... Aquí irían los demás apellidos
];