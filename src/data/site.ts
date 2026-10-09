/**
 * Datos de sitio. Nada de esto se escribe dentro de un componente.
 *
 * La empresa legal (Wrabbit AI LLC), sus direcciones y las condiciones de
 * pago viven en `legal.ts`, que no deja publicar con datos de relleno.
 *
 * PENDIENTE: los perfiles sociales reales.
 */

export const site = {
  /**
   * Mientras esto sea `false`, cada página emite `noindex, nofollow` y
   * robots.txt prohíbe el rastreo completo. Es el interruptor de seguridad del
   * prototipo: las biografías del equipo siguen pendientes y los textos
   * legales no han pasado por abogado. Nada de eso debe acabar en un índice
   * de búsqueda.
   *
   * Se pone en `true` cuando: el equipo está completo y jurídica revisó
   * /privacidad, /terminos y /pagos. Los datos legales ya no bloquean: sin
   * ellos, el build no termina.
   */
  indexable: false,

  name: 'WR AI Labs',
  /** Espejo de SITE_URL en astro.config.mjs: mismo origen del entorno. */
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://wrailabs.com',
  lang: 'es',
  locale: 'es_CO',
  founded: '2023',
  city: 'Bogotá',
  country: 'CO',
  email: 'contacto@wrailabs.com',
  /** Tesis de la empresa. La cinta de la portada lleva su propio texto en home.ts; conviene que coincidan. */
  tagline: 'Automatización auditable.',
  /**
   * Las dos líneas que acompañan al logotipo fuera de la web: los tres campos
   * y el lema en inglés. El director pidió el 12 de septiembre de 2026 que
   * estuvieran en la página, y son la única excepción al idioma único del
   * sitio junto con «Newsroom». El lema se define aquí y solo aquí: la
   * cabecera de /company lo lee de este archivo.
   */
  fields: ['AI Compliance', 'Automation', 'Data Governance'],
  motto: 'Follow what others don\'t see.',
  description:
    'WR AI Labs construye software dedicado y automatizaciones para empresas medianas y grandes, bufetes de abogados y entidades del Estado colombiano. Cada proceso deja evidencia auditable.',
} as const;

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wrailabs' },
  { label: 'X', href: 'https://x.com/wrailabs' },
] as const;

/** Máximo 2 enlaces + 1 CTA. La navegación corta comunica foco. */
export const nav = [
  { label: 'Compañía', href: '/company' },
  { label: 'Newsroom', href: '/newsroom' },
] as const;

export const cta = {
  label: 'Trabajemos juntos',
  href: '/contact',
} as const;

export const legalNav = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
  { label: 'Pagos y reembolsos', href: '/pagos' },
] as const;
