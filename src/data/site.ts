/**
 * Datos de sitio. Nada de esto se escribe dentro de un componente.
 *
 * PENDIENTE DEL CLIENTE: razón social, NIT, dirección, teléfono y los
 * perfiles sociales reales. Los valores actuales son marcadores.
 */

export const site = {
  /**
   * Mientras esto sea `false`, cada página emite `noindex, nofollow` y
   * robots.txt prohíbe el rastreo completo. Es el interruptor de seguridad del
   * prototipo: hay datos de relleno publicados —NIT, teléfono, dirección— y
   * dos páginas legales que se declaran borrador. Ninguna de esas cosas debe
   * acabar en un índice de búsqueda.
   *
   * Se pone en `true` cuando: hay dominio propio, el NIT y los datos de
   * contacto son reales, y jurídica aprobó /privacidad y /terminos.
   */
  indexable: false,

  name: 'Wr AI Labs',
  legalName: 'Wr AI S.A.S.',
  nit: '901.000.000-0', // PENDIENTE — reemplazar con el NIT real
  /** Espejo de SITE_URL en astro.config.mjs: mismo origen del entorno. */
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://wrailabs.com',
  lang: 'es',
  locale: 'es_CO',
  founded: '2023',
  city: 'Bogotá',
  country: 'CO',
  email: 'contacto@wrailabs.com',
  phone: '+57 601 000 0000', // PENDIENTE
  address: {
    street: 'Calle 100 # 00-00',
    city: 'Bogotá D.C.',
    region: 'Cundinamarca',
    country: 'CO',
  },
  /** Tesis de la empresa. Se repite en el marquee y en el JSON-LD. */
  tagline: 'Automatización auditable para instituciones.',
  description:
    'Wr AI Labs construye software dedicado y automatizaciones para empresas medianas y grandes, buffets de abogados y entidades del Estado colombiano. Cada proceso deja evidencia auditable.',
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
] as const;
