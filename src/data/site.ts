/**
 * Datos de sitio. Nada de esto se escribe dentro de un componente.
 *
 * PENDIENTE DEL CLIENTE: razón social, NIT, dirección, teléfono y los
 * perfiles sociales reales. Los valores actuales son marcadores.
 */

export const site = {
  name: 'WRabbit AI',
  legalName: 'WRabbit AI S.A.S.',
  nit: '901.000.000-0', // PENDIENTE — reemplazar con el NIT real
  url: 'https://wrabbit.ai',
  lang: 'es',
  locale: 'es_CO',
  founded: '2023',
  city: 'Bogotá',
  country: 'CO',
  email: 'contacto@wrabbit.ai',
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
    'WRabbit AI construye software dedicado y automatizaciones para empresas medianas y grandes, buffets de abogados y entidades del Estado colombiano. Cada proceso deja evidencia auditable.',
} as const;

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wrabbit-ai' },
  { label: 'X', href: 'https://x.com/wrabbitai' },
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
