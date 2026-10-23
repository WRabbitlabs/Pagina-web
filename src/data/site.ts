/**
 * Datos de sitio. Nada de esto se escribe dentro de un componente.
 *
 * La empresa legal (Wrabbit Ai LLC), sus direcciones y las condiciones de
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
  city: 'Bogotá',
  country: 'CO',
  email: 'contacto@wrailabs.com',
  /**
   * WhatsApp de contacto, con indicativo. Lo pidieron las observaciones del
   * 23 de octubre de 2026: «en Colombia eso acelera mucho». El enlace abre el
   * chat en la aplicación de quien escribe; la web no recoge nada.
   */
  whatsapp: '+57 322 685 6979',
  /**
   * Enlace para agendar una llamada de 30 minutos (Calendly, Google Calendar
   * u otro). PENDIENTE: lo crea quien tenga la cuenta. Mientras sea `null`,
   * /contact no pinta el botón.
   */
  agenda: null as string | null,
  /** Tesis de la empresa. La cinta de la portada lleva su propio texto en home.ts; conviene que coincidan. */
  tagline: 'Automatización auditable.',
  /**
   * Las dos líneas que acompañan al logotipo: los tres campos y el lema. Hasta
   * el 23 de octubre de 2026 iban en inglés («AI Compliance · Automation ·
   * Data Governance», «Follow what others don't see»); las observaciones de
   * ese día pidieron el sitio entero en español. El lema se define aquí y
   * solo aquí: la cabecera de /company lo lee de este archivo.
   */
  fields: ['Cumplimiento en IA', 'Automatización', 'Gobierno de datos'],
  motto: 'Vemos lo que otros no ven.',
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
  { label: 'Noticias', href: '/newsroom' },
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
