import type { CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'newsroom'>;

/** Orden canónico del newsroom: fecha descendente, siempre. */
export function byDateDesc(entries: Article[]): Article[] {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Los borradores solo existen en desarrollo. */
export function published(entries: Article[]): Article[] {
  return import.meta.env.PROD ? entries.filter((e) => !e.data.draft) : entries;
}

/** Un artículo externo enlaza fuera; uno propio, a su ruta. */
export function href(entry: Article): string {
  return entry.data.externalUrl ?? `/newsroom/${entry.id}`;
}

export function isExternal(entry: Article): boolean {
  return Boolean(entry.data.externalUrl);
}

/** Rótulo del enlace: lo propio se lee aquí; lo externo, en su fuente. */
export function readLabel(entry: Article): string {
  return isExternal(entry) ? 'Leer en la fuente' : 'Leer artículo';
}

const formatter = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * "6 ago 2026" — compacto, para filas de metadatos.
 * Intl en es-CO devuelve "6 de ago. de 2026"; los conectores y el punto
 * de abreviatura sobran en una línea de metadato.
 */
export function formatDate(date: Date): string {
  return formatter.format(date).replace(/\sde\s/g, ' ').replace(/\./g, '');
}

/** ISO corto para el atributo datetime. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * El destacado es el más reciente marcado como featured; si no hay
 * ninguno, el más reciente a secas. El resto va compacto.
 */
export function splitFeatured(entries: Article[], compactCount = 3) {
  const sorted = byDateDesc(published(entries));
  const featuredIndex = sorted.findIndex((e) => e.data.featured);
  const idx = featuredIndex === -1 ? 0 : featuredIndex;
  const featured = sorted[idx];
  const rest = sorted.filter((_, i) => i !== idx).slice(0, compactCount);
  return { featured, rest };
}
