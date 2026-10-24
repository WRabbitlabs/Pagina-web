/**
 * La portada en inglés. Misma forma que `data/home.ts`, que es el original:
 * si allí cambia una clave, aquí el build pide la suya.
 *
 * Traducción del 23 de octubre de 2026, pendiente de la revisión de la
 * persona que el director designó. Se tradujo el sentido, no palabra por
 * palabra, en el registro de una consultora que escribe a directivos de
 * EE. UU.; los términos colombianos que no tienen equivalente (RNBD, SIC) se
 * dejan con su sigla.
 */
import type { Ancho } from '../../i18n/ancho';
import type * as es from '../home';
import { CATEGORIES } from '../../lib/categories';
import { CATEGORIAS_EN } from '../../i18n/ui';
import { legal, cuandoSeConstituyo } from '../legal';

type Como<K extends keyof typeof es> = Ancho<(typeof es)[K]>;

export const hero: Como<'hero'> = {
  headline: ['Applied AI,', 'measurable results.'],
  headlineFlat: 'Applied AI, measurable results.',
  subtitle: 'Dedicated software and automation, built with AI.',
  cta: { label: 'Meet the company', href: '/en/company' },
  scrollHint: 'Scroll',
  media: {
    video: '/video/hero.mp4',
    webm: '/video/hero.webm',
    av1: '/video/hero.av1.webm',
    poster: '/video/hero-poster.jpg',
  },
};

export const footer: Como<'footer'> = {
  bg: '/video/footer-bg.jpg',
};

/** Los saltos de línea los decide el ancho del bloque fijado, igual que en español. */
export const whatWeDo: Como<'whatWeDo'> = {
  eyebrow: 'What we do',
  statements: [
    [
      'We build systems that run',
      'entire processes —not',
      'isolated tasks— inside the',
      'infrastructure the',
      'organization already runs.',
    ],
    [
      'Every run leaves a',
      'verifiable record: what was',
      'done, with which data, under',
      'which rule and at what time.',
    ],
    [
      'We work where every step',
      'has to stand up to scrutiny:',
      'public procurement, litigation,',
      'regulatory compliance and',
      'regulatory reporting.',
    ],
  ],
};

export const platform: Como<'platform'> = {
  eyebrow: 'How we execute',
  heading: 'An auditable execution method,',
  headingTail: 'not a bundle of integrations.',
  body: 'Most automations fail for the same reason: they connect systems but cannot account for what happens between them. We model the entire process as a declared sequence (input, transformation, validation and output) and record every step with its input, its rule and its result. When an oversight body asks what happened on March 14 at 9:42 a.m., the answer exists and can be printed.',
  cta: { label: 'See how we execute', href: '/en/company#plataforma' },
  pillars: [
    {
      n: '01',
      icon: 'integracion',
      title: 'Integration',
      body: 'We connect the systems the organization already runs, without asking it to replace them.',
    },
    {
      n: '02',
      icon: 'automatizacion',
      title: 'Automation',
      body: 'We run the process end to end, with the rules declared in writing before it runs.',
    },
    {
      n: '03',
      icon: 'trazabilidad',
      title: 'Traceability',
      body: 'Every step leaves evidence that holds up to an internal or external audit.',
    },
  ],
};

export const marquee: Como<'marquee'> = {
  text: 'Auditable automation',
  separator: '–',
};

export const company: Como<'company'> = {
  eyebrow: 'The company',
  heading: 'We build for organizations that are held accountable.',
  image: {
    src: '/img/company.avif',
    alt: 'Two people reviewing and signing a document on a work table, next to a laptop.',
    width: 1024,
    height: 683,
  },
  paragraphs: [
    legal.fechaDeConstitucion
      ? `We started in Bogotá, where public management, law and technology meet, with a shared diagnosis. ${legal.entidad} was organized in ${legal.estadoDeConstitucion} ${cuandoSeConstituyo(legal.fechaDeConstitucion, 'en')}.`
      : 'We started in Bogotá, where public management, law and technology meet, with a shared diagnosis.',
    'Processes in large organizations do not fail for lack of technology: they fail because, afterwards, nobody can reconstruct what was decided and on what information.',
    'We build for public entities, law firms and mid-sized and large companies in regulated industries.',
    'We do not deliver models: we deliver processes that run the same way the first time and the ten-thousandth, and that can be explained line by line.',
  ],
  cta: { label: 'Meet the company', href: '/en/company' },
};

export const newsroom: Como<'newsroom'> = {
  eyebrow: 'News',
  cta: { label: 'See all', href: '/en/newsroom' },
  filters: [
    { value: 'all', label: 'All' },
    ...Object.keys(CATEGORIES).map((value) => ({
      value,
      label: CATEGORIAS_EN[value as keyof typeof CATEGORIES].plural,
    })),
  ],
};

export const closing: Como<'closing'> = {
  heading: 'Do you have a process that depends on nobody making a mistake?',
  cta: { label: "Let's work together", href: '/en/contact' },
};

export const governance: Como<'governance'> = {
  eyebrow: 'Continuous governance',
  heading: 'Invisible work, made visible.',
  body: 'The subscription keeps every process monitored, optimized and within the regulatory framework. This is what a quarter of operation under continuous governance looks like.',
  panel: {
    title: 'Continuous governance',
    disclaimer: 'Illustrative view with sample data.',
  },
  kpis: [
    { value: 24, suffix: '', label: 'processes in production' },
    { value: 99.4, suffix: '%', label: 'runs without manual intervention' },
    { value: 0, suffix: '', label: 'open critical findings' },
  ],
  chart: {
    title: 'Weekly activity',
    weeks: 12,
    series: [
      {
        id: 'ejecuciones',
        label: 'Runs',
        unit: 'runs',
        values: [182, 214, 196, 243, 268, 251, 302, 331, 318, 384, 421, 468],
      },
      {
        id: 'evidencias',
        label: 'Evidence',
        unit: 'evidence records',
        values: [548, 661, 590, 712, 802, 769, 918, 1004, 947, 1156, 1272, 1410],
      },
      {
        id: 'incidencias',
        label: 'Incidents',
        unit: 'open incidents',
        values: [7, 6, 8, 5, 4, 5, 3, 4, 2, 2, 1, 1],
      },
    ],
  },
  plan: {
    title: 'Compliance plan',
    items: [
      { task: 'Database registry (RNBD) updated with the SIC', state: 'hecho' },
      { task: 'Quarterly access review', state: 'hecho' },
      { task: 'Extraction model retraining', state: 'curso' },
      { task: 'Incident response drill', state: 'previsto' },
    ],
  },
  activity: {
    title: 'Recent activity',
    items: [
      { time: '09:41', text: 'Monthly operations report generated' },
      { time: '08:15', text: 'Data drift alert resolved' },
      { time: '07:02', text: 'Ingestion pipeline verified' },
    ],
  },
};

export const planStates: Como<'planStates'> = {
  hecho: 'Completed',
  curso: 'In progress',
  previsto: 'Scheduled',
};

export const trazado: Como<'trazado'> = {
  label: 'Process diagram: ingestion, extraction, validation, filing and audit.',
  nodes: [
    { id: 'ingesta', label: 'INGESTION' },
    { id: 'extraccion', label: 'EXTRACTION' },
    { id: 'validacion', label: 'VALIDATION' },
    { id: 'radicacion', label: 'FILING' },
    { id: 'auditoria', label: 'AUDIT' },
  ],
};
