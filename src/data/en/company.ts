/**
 * El relato de la compañía en inglés. Misma forma que `data/company.ts`.
 * Traducción del 23 de octubre de 2026, pendiente de revisión.
 */
import type { Ancho } from '../../i18n/ancho';
import type * as es from '../company';
import { siteEn } from './site';

type Como<K extends keyof typeof es> = Ancho<(typeof es)[K]>;

export const intro: Como<'intro'> = {
  eyebrow: 'WR AI Labs — Artificial intelligence consultancy',
  motto: siteEn.motto,
  body: 'We inherited the craft of the first loom: following the signals others let pass and weaving the systems that carry out repetitive work — automation, orderly data and regulatory compliance in a single execution layer.',
  ctas: [
    { label: 'See what others miss', href: '/en#historia', primary: true },
    { label: 'Talk to us', href: '/en/contact', primary: false },
  ],
  promises: [
    {
      title: 'We measure savings from day one.',
      body: 'Before we build, we estimate with you how much time and cost automation can take out of your process.',
    },
    {
      title: 'And we prove it at the end.',
      body: 'At delivery, we measure the actual result against that estimate, and we keep measuring it every quarter.',
    },
  ],
};

export const craft: Como<'craft'> = {
  eyebrow: 'The craft',
  heading: 'Two hundred years of weaving instructions.',
  body: [
    'In 1804, Joseph-Marie Jacquard built a loom that read punched cards to decide the pattern of the fabric. Each card was an instruction; each thread, a decision. Without knowing it, he had invented the program.',
    'We inherited that craft. We do not deliver licenses or templates: we study your operation thread by thread and weave the exact system it needs, with artificial intelligence as the instrument — never the protagonist. From the white rabbit we took only the name and the habit: following what others miss.',
  ],
  milestones: [
    {
      year: 1804,
      title: "Jacquard's loom",
      body: ['A punched card decides the pattern of the fabric.', 'The programmable machine is born.'],
    },
    {
      year: 1890,
      title: "Hollerith's census",
      body: ["The loom's cards process a government census in record time.", 'The instruction jumps from fabric to data.'],
    },
    {
      year: 1946,
      title: 'Modern computing',
      body: ['Woven instructions become software.', 'The pattern is no longer fabric: it is process.'],
    },
    {
      year: 2026,
      title: 'WR AI Labs',
      body: ['AI carries out the repetitive work.', 'The craft goes on: we follow the signals others let pass.'],
    },
  ],
  cardLabel: 'Punched card with the year encoded in binary.',
};

export const method: Como<'method'> = {
  eyebrow: 'The method',
  heading: 'Four stages.',
  body: 'An engagement has a beginning and an end declared from day one. We work in the shortest time the scope allows without lowering quality: a complete build usually takes one to two months.',
  cta: { label: 'Talk to us', href: '/en/contact' },
  phases: [
    {
      n: '01',
      title: 'We understand your operation',
      name: 'Discovery',
      short: 'We step into your process, with interviews, observation and data.',
      body: 'We step into your process: interviews, observation and data. We come out with a map of where time and money are lost, and what to automate first.',
    },
    {
      n: '02',
      title: 'We design the structure',
      name: 'Design',
      short: 'Architecture, security and a fixed budget before any code is written.',
      body: 'Architecture, security and work plan. You approve the design and the fixed budget before a single line of code is written.',
    },
    {
      n: '03',
      title: 'We build in cycles',
      name: 'Build',
      short: 'Weekly deliveries you can see and use from the first Friday.',
      body: 'Weekly deliveries you can see and use. Every Friday something new is running; every adjustment arrives before it becomes costly.',
    },
    {
      n: '04',
      title: 'We deliver and stay with you',
      name: 'Delivery',
      short: 'Training, documentation and return measured every quarter.',
      body: 'Training for your team, complete documentation and ongoing support. The system stays anchored: we measure the return together every quarter.',
    },
  ],
};

export const team: Como<'team'> = {
  eyebrow: 'Team',
};
