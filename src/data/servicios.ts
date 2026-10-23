/**
 * La página de Servicios: siete módulos de un mismo proceso.
 *
 * El texto es el del director (documento «Observaciones Generales», 23 de
 * octubre de 2026, «WR AI Labs — Página de Servicios»). Aquí solo se ordena
 * en datos para que la plantilla no lleve copy escrito a mano.
 *
 * Sin precios, como el resto del sitio (V-09: fuera de la web la oferta sí
 * cotiza). La moneda sale de `condiciones`, la misma que publican /pagos y
 * /terminos, para que las tres páginas no puedan contradecirse.
 */
import { condiciones } from './legal';

export interface Modulo {
  n: string;
  /** Ancla en la página: /servicios#diagnostico. */
  id: string;
  title: string;
  lead: string;
  items: string[];
  /** Un artículo de Noticias que muestra el módulo en la práctica. */
  lectura?: { label: string; href: string };
  /** Una aclaración que va al pie del módulo, con menos peso. */
  nota?: string;
}

export const servicios = {
  eyebrow: 'Servicios',
  heading: 'Siete módulos, un solo proceso de punta a punta.',
  intro:
    'Cada módulo se puede contratar por separado o combinarse según lo que su organización necesite. Todos siguen el mismo método: entendemos su operación, diseñamos con usted, construimos por ciclos y dejamos evidencia de cada paso.',

  modulos: [
    {
      n: '01',
      id: 'diagnostico',
      title: 'Diagnóstico estratégico',
      lead: 'El punto de partida: saber dónde está su organización y qué conviene automatizar primero.',
      items: [
        'Evaluación de madurez digital con entrevistas a directivos y equipos clave, y un informe ejecutivo de brechas.',
        'Inventario de procesos con su priorización: qué automatizar primero y cuánto retorno puede esperar de cada uno.',
        'Mapa de riesgos tecnológicos y de seguridad de la información, con un plan de tratamiento y responsables.',
        'Hoja de ruta a corto, mediano y largo plazo, validada con su equipo directivo.',
      ],
    },
    {
      n: '02',
      id: 'automatizacion',
      title: 'Inteligencia artificial y automatización',
      lead: 'Sistemas que ejecutan procesos completos y dejan registro de cada decisión.',
      items: [
        'Automatización de procesos con IA, empezando por un piloto en el proceso de mayor retorno, con pruebas y acta de aceptación de su equipo.',
        'Asistentes virtuales conectados a sus sistemas (CRM, ERP y otros) y ajustados de forma periódica.',
        'Integración de los sistemas que ya opera su organización, sin reemplazarlos.',
        'Modelos predictivos validados con datos reales de su operación y con monitoreo continuo.',
      ],
      lectura: {
        label: 'Extracción documental sobre expedientes judiciales heterogéneos',
        href: '/newsroom/extraccion-documental-expedientes-judiciales',
      },
    },
    {
      n: '03',
      id: 'datos',
      title: 'Arquitectura y gobierno de datos',
      lead: 'Información confiable, ordenada y lista para decidir.',
      items: [
        'Diseño de la arquitectura de datos a partir de todas sus fuentes, con las decisiones técnicas documentadas.',
        'Implementación de bodegas o lagos de datos en la nube, conectados a sus tableros (Power BI, Tableau o Looker).',
        'Modelo de gobierno: responsables por conjunto de datos, políticas de acceso y retención, y catálogo de datos.',
        'Control de calidad automático, con tablero de seguimiento y plan de corrección de incidentes.',
      ],
    },
    {
      n: '04',
      id: 'cumplimiento',
      title: 'Apoyo técnico al cumplimiento normativo',
      lead: 'Las herramientas y la evidencia que su equipo legal necesita para cumplir y demostrarlo.',
      items: [
        'Mapeo de los flujos de datos personales y el registro de actividades de tratamiento.',
        'Mecanismos técnicos de autorización y consentimiento en sus sistemas.',
        'Análisis de brechas técnicas frente a la regulación que le aplique (Ley 1581 de 2012 en Colombia, LGPD en Brasil, LFPDPPP en México), con un plan de adecuación con responsables y plazos.',
        'Auditorías técnicas de cumplimiento: recopilación de evidencias, informe de hallazgos y seguimiento de acciones correctivas.',
        'Alertas periódicas sobre cambios normativos en tecnología, datos e inteligencia artificial.',
      ],
      nota: 'La interpretación de la norma y las decisiones jurídicas corresponden a su organización y a sus asesores legales. Nosotros construimos y documentamos el soporte técnico.',
    },
    {
      n: '05',
      id: 'seguridad',
      title: 'Seguridad de la información',
      lead: 'Controles técnicos y organizacionales para proteger sus activos y la continuidad del negocio.',
      items: [
        'Implementación de controles ISO/IEC 27001:2022: análisis de brechas, evaluación de riesgos, implementación y auditoría interna, con acompañamiento hasta la auditoría de certificación.',
        'Gestión de accesos e identidades: mínimo privilegio, inicio de sesión único y doble factor de autenticación.',
        'Protección de datos: clasificación por sensibilidad, cifrado y prevención de fuga de información.',
        'Plan de respuesta a incidentes con roles definidos, simulacros y análisis posterior de cada incidente.',
      ],
    },
    {
      n: '06',
      id: 'capacitacion',
      title: 'Capacitación y adopción tecnológica',
      lead: 'Para que la tecnología se use, y se use bien.',
      items: [
        'Formación para directivos, con casos del sector y medición de impacto.',
        'Entrenamiento operativo por cargo y herramienta, con práctica en ambientes de prueba.',
        'Gestión del cambio: análisis de impacto por área, líderes internos que impulsan la adopción y seguimiento del avance.',
        'Cultura digital: diagnóstico, talleres y comunidades de práctica.',
      ],
    },
    {
      n: '07',
      id: 'soporte',
      title: 'Soporte y evolución continua',
      lead: 'El sistema sigue funcionando y mejorando después de la entrega.',
      items: [
        'Monitoreo con indicadores de salud, niveles de servicio acordados y un informe ejecutivo mensual.',
        'Revisión y ajuste periódico de los modelos de IA, con historial de versiones.',
        'Actualizaciones tecnológicas planeadas en ventanas de mantenimiento, con pruebas antes y después.',
        'Análisis de capacidad y escalabilidad, con documentación y traspaso a su equipo interno.',
      ],
    },
  ] satisfies readonly Modulo[],

  contratacion: {
    heading: '¿Cómo contratamos?',
    body: `Cada proyecto se cotiza a la medida y por escrito, en ${condiciones.monedas}.`,
    pagos: { label: 'Pagos, cancelaciones y reembolsos', href: '/pagos' },
    cta: { label: 'Trabajemos juntos', href: '/contact' },
  },
} as const;
