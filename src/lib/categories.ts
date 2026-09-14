/**
 * Las categorías del newsroom, una sola vez.
 *
 * De aquí salen el enum del esquema (content.config.ts) y los botones del
 * filtro (data/home.ts). El valor es el dato, en singular; el rótulo cuenta
 * un conjunto, en plural. Una categoría nueva es una línea aquí y nada más.
 */
export const CATEGORIES = {
  Publicación: 'Publicaciones',
  Anuncio: 'Anuncios',
  Prensa: 'Prensa',
  /**
   * Noticias, normas y estudios reales de terceros sobre inteligencia
   * artificial que tocan lo que hace la compañía. Cada pieza tiene página
   * propia, escrita con la voz del sitio, y cita y enlaza su fuente.
   */
  Actualidad: 'Actualidad',
} as const;

export type Category = keyof typeof CATEGORIES;

export const CATEGORY_VALUES = Object.keys(CATEGORIES) as [Category, ...Category[]];
