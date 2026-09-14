import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colecciones tipadas. Nada de contenido hardcodeado en componentes.
 */

const newsroom = defineCollection({
  loader: glob({ base: './src/content/newsroom', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(140),
      /**
       * Categoría visible en el tag. Cerrada a propósito.
       *
       * «Actualidad» son noticias, normas y estudios reales de terceros sobre
       * inteligencia artificial que tocan lo que hace la compañía. Cada pieza
       * tiene página propia, escrita con la voz del sitio y relacionada con
       * lo que hacemos, y cita y enlaza la fuente al final.
       */
      category: z.enum(['Publicación', 'Anuncio', 'Prensa', 'Actualidad']),
      date: z.coerce.date(),
      excerpt: z.string().max(320),
      /** Si el artículo vive fuera del sitio, el enlace apunta allá. */
      externalUrl: z.string().url().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      /**
       * Atribución de la foto, cuando su licencia la exige (CC-BY). Va bajo
       * la imagen, que es donde la atribución corresponde: junto a la obra y
       * no en un pie de página que la separa de lo que acredita.
       */
      imageCredit: z
        .object({ text: z.string(), href: z.string().url() })
        .optional(),
      /**
       * La fuente de una pieza de actualidad: quién lo publicó y dónde. Se
       * pinta al final del artículo con el tratamiento de enlace externo del
       * sitio y va al JSON-LD como `citation`. Obligatoria en esa categoría.
       */
      source: z.object({ text: z.string(), href: z.string().url() }).optional(),
      /** Un solo destacado por índice; si hay varios gana el más reciente. */
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    })
      .refine((d) => !d.image || (d.imageAlt && d.imageAlt.length > 0), {
        message: 'Una imagen de contenido necesita alt real.',
        path: ['imageAlt'],
      })
      .refine((d) => d.category !== 'Actualidad' || Boolean(d.source), {
        message: 'Una pieza de actualidad necesita su fuente.',
        path: ['source'],
      }),
});

const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      /** Orden de aparición. Menor primero. */
      order: z.number().int().default(99),
      founder: z.boolean().default(false),
      /** Igual que en newsroom: la ficha existe pero no se publica todavia. */
      draft: z.boolean().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
      links: z
        .array(z.object({ label: z.string(), href: z.string().url() }))
        .default([]),
    }),
});

export const collections = { newsroom, team };
