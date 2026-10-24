/**
 * Los dos idiomas del sitio y la correspondencia entre sus rutas.
 *
 * El español es el idioma de siempre y vive en la raíz (/company, /servicios);
 * el inglés vive bajo /en, con rutas en inglés (/en/company, /en/services).
 * La versión en inglés llegó con las observaciones del 23 de octubre de 2026,
 * para clientes de EE. UU., y la revisa una persona de confianza del director.
 *
 * El idioma de una página se deduce de su dirección, no de un parámetro: así
 * cualquier componente lo sabe con `Astro.url`, sin que cada página tenga que
 * pasárselo a mano.
 */

export type Idioma = 'es' | 'en';

export function idiomaDe(url: URL): Idioma {
  return /^\/en(\/|$)/.test(url.pathname) ? 'en' : 'es';
}

/**
 * Cada página en español con su gemela en inglés. Las que no tienen gemela
 * (los artículos de Noticias, que solo existen en español) caen en el índice
 * de Noticias del otro idioma.
 */
const PARES: ReadonlyArray<readonly [es: string, en: string]> = [
  ['/', '/en'],
  ['/company', '/en/company'],
  ['/servicios', '/en/services'],
  ['/contact', '/en/contact'],
  ['/newsroom', '/en/newsroom'],
  ['/privacidad', '/en/privacy'],
  ['/terminos', '/en/terms'],
  ['/pagos', '/en/payments'],
];

const sinBarra = (p: string) => p.replace(/\/$/, '') || '/';

/** La ruta de esta misma página en cada idioma, o `null` si no tiene gemela. */
export function gemelas(url: URL): { es: string; en: string } | null {
  const ruta = sinBarra(url.pathname);
  const par = PARES.find(([es, en]) => es === ruta || en === ruta);
  return par ? { es: par[0], en: par[1] } : null;
}

/** Adónde lleva el selector de idioma desde esta página. */
export function rutaEn(url: URL, destino: Idioma): string {
  const par = gemelas(url);
  if (par) return par[destino];
  return destino === 'en' ? '/en/newsroom' : '/newsroom';
}
