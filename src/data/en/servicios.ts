/**
 * La página de Servicios en inglés. Misma forma que `data/servicios.ts`.
 * Traducción del 23 de octubre de 2026, pendiente de revisión.
 */
import type { Ancho } from '../../i18n/ancho';
import type { servicios as es } from '../servicios';
import { condiciones } from '../legal';

export const servicios: Ancho<typeof es> = {
  eyebrow: 'Services',
  heading: 'Seven modules, one end-to-end process.',
  intro:
    'Each module can be hired on its own or combined with others to fit what your organization needs. All of them follow the same method: we understand your operation, design with you, build in cycles and leave evidence of every step.',

  modulos: [
    {
      n: '01',
      id: 'diagnostico',
      title: 'Strategic assessment',
      lead: 'The starting point: knowing where your organization stands and what is worth automating first.',
      items: [
        'Digital maturity assessment through interviews with executives and key teams, and an executive gap report.',
        'Process inventory with priorities: what to automate first and how much return to expect from each.',
        'Technology and information security risk map, with a treatment plan and owners.',
        'Short-, medium- and long-term roadmap, validated with your leadership team.',
      ],
    },
    {
      n: '02',
      id: 'automatizacion',
      title: 'Artificial intelligence and automation',
      lead: 'Systems that run complete processes and record every decision.',
      items: [
        'AI process automation, starting with a pilot on the highest-return process, with testing and a sign-off from your team.',
        'Virtual assistants connected to your systems (CRM, ERP and others) and tuned periodically.',
        'Integration of the systems your organization already runs, without replacing them.',
        'Predictive models validated with real data from your operation, with continuous monitoring.',
      ],
      lectura: {
        label: 'Document extraction from heterogeneous court case files (in Spanish)',
        href: '/newsroom/extraccion-documental-expedientes-judiciales',
      },
    },
    {
      n: '03',
      id: 'datos',
      title: 'Data architecture and governance',
      lead: 'Reliable, orderly information, ready for decisions.',
      items: [
        'Data architecture design across all your sources, with the technical decisions documented.',
        'Cloud data warehouses or data lakes, connected to your dashboards (Power BI, Tableau or Looker).',
        'Governance model: owners for each dataset, access and retention policies, and a data catalog.',
        'Automated quality control, with a monitoring dashboard and an incident remediation plan.',
      ],
    },
    {
      n: '04',
      id: 'cumplimiento',
      title: 'Technical support for regulatory compliance',
      lead: 'The tools and evidence your legal team needs to comply and to prove it.',
      items: [
        'Mapping of personal data flows and the record of processing activities.',
        'Technical authorization and consent mechanisms in your systems.',
        'Technical gap analysis against the regulation that applies to you (Law 1581 of 2012 in Colombia, LGPD in Brazil, LFPDPPP in Mexico), with a remediation plan, owners and deadlines.',
        'Technical compliance audits: evidence collection, findings report and follow-up of corrective actions.',
        'Periodic alerts on regulatory changes in technology, data and artificial intelligence.',
      ],
      nota: 'Interpreting the law and making legal decisions are the responsibility of your organization and its legal counsel. We build and document the technical support.',
    },
    {
      n: '05',
      id: 'seguridad',
      title: 'Information security',
      lead: 'Technical and organizational controls to protect your assets and business continuity.',
      items: [
        'ISO/IEC 27001:2022 controls: gap analysis, risk assessment, implementation and internal audit, with support through the certification audit.',
        'Identity and access management: least privilege, single sign-on and two-factor authentication.',
        'Data protection: classification by sensitivity, encryption and data loss prevention.',
        'Incident response plan with defined roles, drills and a post-incident review of every incident.',
      ],
    },
    {
      n: '06',
      id: 'capacitacion',
      title: 'Training and technology adoption',
      lead: 'So that technology gets used, and used well.',
      items: [
        'Executive training, with industry cases and impact measurement.',
        'Hands-on training by role and tool, with practice in test environments.',
        'Change management: impact analysis by area, internal champions who drive adoption, and progress tracking.',
        'Digital culture: assessment, workshops and communities of practice.',
      ],
    },
    {
      n: '07',
      id: 'soporte',
      title: 'Ongoing support and evolution',
      lead: 'The system keeps running and improving after delivery.',
      items: [
        'Monitoring with health indicators, agreed service levels and a monthly executive report.',
        'Periodic review and tuning of AI models, with version history.',
        'Technology updates planned in maintenance windows, with testing before and after.',
        'Capacity and scalability analysis, with documentation and handover to your internal team.',
      ],
    },
  ],

  contratacion: {
    heading: 'How do we contract?',
    body: `Every project is quoted to measure and in writing, in ${condiciones.monedasEn}.`,
    pagos: { label: 'Payments, cancellations and refunds', href: '/en/payments' },
    cta: { label: "Let's work together", href: '/en/contact' },
  },
};
