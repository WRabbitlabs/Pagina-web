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
      /** Categoría visible en el tag. Cerrada a propósito. */
      category: z.enum(['Publicación', 'Anuncio', 'Prensa']),
      date: z.coerce.date(),
      excerpt: z.string().max(320),
      /** Si el artículo vive fuera del sitio, el enlace apunta allá. */
      externalUrl: z.string().url().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Un solo destacado por índice; si hay varios gana el más reciente. */
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    })
      .refine((d) => !d.image || (d.imageAlt && d.imageAlt.length > 0), {
        message: 'Una imagen de contenido necesita alt real.',
        path: ['imageAlt'],
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
      image: image().optional(),
      imageAlt: z.string().optional(),
      links: z
        .array(z.object({ label: z.string(), href: z.string().url() }))
        .default([]),
    }),
});

export const collections = { newsroom, team };
