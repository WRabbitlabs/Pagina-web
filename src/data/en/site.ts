/**
 * Lo que cambia del sitio en inglés: los textos de marca y la navegación.
 * Lo demás (dominio, correo, WhatsApp, redes) es el mismo y sale de
 * `data/site.ts`.
 */
import type { Ancho } from '../../i18n/ancho';
import type * as es from '../site';

type Como<K extends keyof typeof es> = Ancho<(typeof es)[K]>;

export const siteEn = {
  lang: 'en',
  locale: 'en_US',
  tagline: 'Auditable automation.',
  fields: ['AI compliance', 'Automation', 'Data governance'],
  motto: 'We see what others miss.',
  description:
    'WR AI Labs builds dedicated software and automation for mid-sized and large companies, law firms and Colombian government entities. Every process leaves auditable evidence.',
} as const;

export const nav: Como<'nav'> = [
  { label: 'Services', href: '/en/services' },
  { label: 'Company', href: '/en/company' },
  { label: 'News', href: '/en/newsroom' },
];

export const cta: Como<'cta'> = {
  label: "Let's work together",
  href: '/en/contact',
};

export const legalNav: Como<'legalNav'> = [
  { label: 'Privacy', href: '/en/privacy' },
  { label: 'Terms', href: '/en/terms' },
  { label: 'Payments and refunds', href: '/en/payments' },
];
