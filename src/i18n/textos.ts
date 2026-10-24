/**
 * Todos los textos de una página, en su idioma.
 *
 * Un componente pide `textos(idiomaDe(Astro.url))` y recibe el mismo objeto
 * con las mismas claves en los dos idiomas; no tiene que saber en cuál está.
 * El español es el molde: el inglés está tipado contra él (ver `ancho.ts`),
 * así que una clave que falte en la traducción rompe el build y no la página.
 */
import type { Ancho } from './ancho';
import type { Idioma } from './idioma';
import { ui, type Ui } from './ui';

import * as siteEs from '../data/site';
import * as homeEs from '../data/home';
import * as companyEs from '../data/company';
import { servicios as serviciosEs } from '../data/servicios';

import * as siteEn from '../data/en/site';
import * as homeEn from '../data/en/home';
import * as companyEn from '../data/en/company';
import { servicios as serviciosEn } from '../data/en/servicios';

const ES = {
  idioma: 'es' as Idioma,
  /** Prefijo de las rutas de este idioma: '' o '/en'. */
  raiz: '',
  site: siteEs.site,
  nav: siteEs.nav,
  cta: siteEs.cta,
  legalNav: siteEs.legalNav,
  social: siteEs.social,
  home: homeEs,
  company: companyEs,
  servicios: serviciosEs,
};

export type Textos = Ancho<typeof ES> & { ui: Ui };

const TEXTOS: Record<Idioma, Textos> = {
  es: { ...ES, ui: ui.es },
  en: {
    idioma: 'en',
    raiz: '/en',
    site: { ...siteEs.site, ...siteEn.siteEn },
    nav: siteEn.nav,
    cta: siteEn.cta,
    legalNav: siteEn.legalNav,
    social: siteEs.social,
    home: homeEn,
    company: companyEn,
    servicios: serviciosEn,
    ui: ui.en,
  },
};

export function textos(idioma: Idioma): Textos {
  return TEXTOS[idioma];
}
