/**
 * Copy de la home.
 *
 * ⚠ PLACEHOLDER. Específico y plausible para WRabbit AI, pero pendiente de
 * reemplazo por el copy real del cliente. Cero lorem ipsum. Cero texto
 * tomado del sitio de referencia.
 *
 * Reglas de escritura (DESIGN.md §9): voz activa, frases declarativas, sin
 * adjetivos de marketing vacíos, sentence case, los botones dicen qué pasa.
 */

export const hero = {
  /** Tesis de la empresa. Una oración declarativa, con punto final. */
  headline: ['IA aplicada,', 'resultados medibles.'],
  /** Texto accesible del h1, sin la partición visual en líneas. */
  headlineFlat: 'IA aplicada, resultados medibles.',
  subtitle:
    'Software dedicado y automatización para empresas, buffets de abogados y entidades del Estado colombiano.',
  cta: { label: 'Ver la compañía', href: '/company' },
  scrollHint: 'Desplazar',
  /**
   * Fondo del hero.
   *
   * Con `video: null` se dibuja el Campo (canvas generativo) dentro del marco,
   * que es lo que se ve mientras no exista el archivo. Al dejar el vídeo en
   * `public/video/` basta con poner aquí las rutas — ver PROMPT-VIDEO.md.
   */
  media: {
    video: '/video/hero.mp4' as string | null,
    webm: '/video/hero.webm' as string | null,
    poster: '/video/hero-poster.jpg' as string | null,
  },
} as const;

/**
 * Fondo del pie: un fotograma del vídeo del hero, extraído por
 * `npm run footer:bg`. A null, el pie se queda con su superficie plana.
 */
export const footer = {
  bg: '/video/footer-bg.jpg' as string | null,
} as const;

export const whatWeDo = {
  eyebrow: 'Qué hacemos',
  /**
   * Un array de líneas por enunciado, no una cadena suelta.
   *
   * El salto va decidido aquí y no lo decide el navegador porque cada línea es
   * una máscara independiente: entra y sale por su cuenta, escalonada. Si el
   * corte lo eligiera el reflujo del texto, no habría dónde poner la máscara.
   *
   * Regla al escribir: ~30 caracteres por línea. Más largo y la línea se parte
   * sola en pantallas estrechas; el efecto aguanta el reflujo, pero el
   * escalonado pierde su ritmo.
   */
  statements: [
    [
      'Construimos sistemas que',
      'ejecutan procesos completos',
      '—no tareas sueltas— dentro de',
      'la infraestructura que la',
      'organización ya opera.',
    ],
    [
      'Cada ejecución deja un',
      'registro verificable: qué se',
      'hizo, con qué datos, bajo qué',
      'regla y en qué momento exacto.',
    ],
    [
      'Trabajamos donde equivocarse',
      'tiene consecuencias jurídicas:',
      'contratación pública, litigio,',
      'cumplimiento normativo y',
      'reporte regulatorio.',
    ],
  ],
} as const;

export const platform = {
  eyebrow: 'La plataforma',
  /**
   * El titular va a dos tonos: `heading` en tinta plena y `headingTail` en un
   * tono apagado. El corte no es decorativo — separa lo que la plataforma es
   * de lo que no es, y el peso tipográfico cae sobre lo primero.
   */
  heading: 'Un motor de ejecución auditable,',
  headingTail: 'no un conjunto de integraciones.',
  body: 'La mayoría de las automatizaciones fallan por el mismo motivo: conectan sistemas pero no responden por lo que ocurre entre ellos. Nuestra plataforma modela el proceso completo como una secuencia declarada —entrada, transformación, validación, salida— y registra cada paso con su insumo, su regla y su resultado. Cuando un ente de control pregunta qué pasó el 14 de marzo a las 09:42, la respuesta existe y se puede imprimir.',
  cta: { label: 'Ver la plataforma', href: '/company#plataforma' },
  /**
   * Van numerados porque son una secuencia real, no categorías paralelas:
   * integrar → ejecutar → dejar evidencia. Ver DESIGN.md §11, decisión 5.
   */
  pillars: [
    {
      n: '01',
      icon: 'integracion',
      title: 'Integración',
      body: 'Conectamos los sistemas que la organización ya opera, sin pedirle que los reemplace.',
    },
    {
      n: '02',
      icon: 'automatizacion',
      title: 'Automatización',
      body: 'Ejecutamos el proceso de punta a punta, con las reglas declaradas por escrito antes de correr.',
    },
    {
      n: '03',
      icon: 'trazabilidad',
      title: 'Trazabilidad',
      body: 'Cada paso deja evidencia que resiste una auditoría interna o externa.',
    },
  ],
} as const;

export const marquee = {
  text: 'Automatización auditable',
  separator: '–',
} as const;

export const company = {
  eyebrow: 'La compañía',
  heading: 'Construimos donde equivocarse tiene consecuencias legales.',
  image: {
    src: '/img/company.avif',
    alt: 'Dos personas revisando y firmando un documento sobre una mesa de trabajo, junto a un portátil.',
    width: 1024,
    height: 683,
  },
  /**
   * Cuatro párrafos cortos, y tanto el número como la brevedad son requisitos
   * de composición, no de estilo:
   *
   * - La sección tiene que caber entera en una pantalla junto al titular y la
   *   imagen. Presupuesto: unos 600 caracteres en total.
   * - Van en dos columnas y ningún párrafo se parte entre ellas, así que el
   *   navegador solo puede equilibrar moviendo párrafos enteros. Con tres
   *   piezas desiguales una columna queda al doble que la otra; con cuatro
   *   cortas, el reparto sale parejo.
   *
   * La versión larga de esta historia vive en /company, que sí tiene sitio.
   */
  paragraphs: [
    'Nacimos en Bogotá en 2023, del cruce entre un equipo de ingeniería de datos y un grupo de abogados con el mismo diagnóstico.',
    'Los procesos de una entidad grande no fallan por falta de tecnología: fallan porque después nadie puede reconstruir qué se decidió y con qué información.',
    'Hoy trabajamos con entidades del orden nacional y territorial, firmas de práctica corporativa y compañías de los sectores financiero, asegurador y de infraestructura.',
    'No vendemos modelos: vendemos procesos que se ejecutan igual la primera vez y la número diez mil, y que pueden explicarse línea por línea.',
  ],
  cta: { label: 'Ver la compañía', href: '/company' },
} as const;

export const newsroom = {
  eyebrow: 'Newsroom',
  cta: { label: 'Ver todo', href: '/newsroom' },
} as const;

/**
 * Cierre de /company. En la home no existe: el pie ya dice lo mismo con su
 * propia llamada a la acción, y repetirlo dos pantallas seguidas restaba
 * fuerza a las dos.
 */
export const closing = {
  heading: '¿Tiene un proceso que hoy depende de que nadie se equivoque?',
  cta: { label: 'Trabajemos juntos', href: '/contact' },
} as const;

/* ------------------------------------------------------------------------ */
/* El problema — la brecha                                                    */
/* ------------------------------------------------------------------------ */

export const gap = {
  eyebrow: 'La brecha',
  /**
   * Declarativa y sobre lo que hacemos, no un lamento sobre lo que el cliente
   * no hizo. «Dos veces» es el puente con la tesis del sitio: el proceso
   * manual se paga en horas y se vuelve a pagar cuando hay que reconstruir
   * qué pasó. Lo segundo es exactamente lo que vendemos.
   */
  heading: 'Un proceso manual se paga dos veces.',
  body: 'La brecha no es tener inteligencia artificial o no tenerla: es la distancia entre probarla y ponerla a ejecutar. Solo el 39% de las organizaciones reporta impacto en sus resultados y apenas un 6% captura valor significativo.',

  /** Fuente de las dos cifras de arriba. Sin ella no se publican. */
  source: {
    text: 'McKinsey, The state of AI, 2025.',
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
  },

  /**
   * Las dos facturas del mismo proceso.
   *
   * Antes esto era un diagrama de tres trayectorias con un área rayada. Se
   * quitó por una razón concreta: necesitaba una nota debajo aclarando que no
   * eran datos medidos. Una forma de gráfica promete medición; si hay que
   * defenderla por escrito, es el aparato equivocado. Un recibo no promete
   * medición: promete partidas, y de partidas sí tenemos.
   *
   * Tres renglones por columna. Con dos la columna se ve coja; con cuatro, la
   * sección deja de caber en una pantalla.
   */
  payments: [
    {
      n: '01',
      label: 'Primer pago',
      name: 'Horas',
      items: [
        'Cada trámite cuesta lo mismo con el doble de volumen.',
        'La capacidad se compra contratando gente, no operando mejor.',
        'Cada error se paga rehaciendo el trámite completo.',
      ],
    },
    {
      n: '02',
      label: 'Segundo pago',
      name: 'Reconstrucción',
      items: [
        'Sin registro de qué se decidió y con qué dato, cada auditoría se responde a pulso.',
        'La Ley 1581 no admite «no sé»: el responsable contesta igual.',
        'Reconstruir un expediente cuesta más que haberlo registrado.',
      ],
    },
  ],

  /**
   * El renglón de abajo del recibo. Aquí vive la tercera idea —la ventaja que
   * acumula quien ya ejecuta—, que como tarjeta suelta competía con las otras
   * dos y como total las remata.
   */
  total: {
    label: 'Total',
    text: 'La distancia con quien ya ejecuta se abre cada trimestre, y no se recupera contratando.',
  },
} as const;

/* ------------------------------------------------------------------------ */
/* Gobierno continuo — la consola                                             */
/* ------------------------------------------------------------------------ */

/**
 * ⚠ DATOS DE EJEMPLO, y el panel lo dice en su propia cabecera.
 *
 * Es una maqueta de producto: enseña la forma de la operación, no la
 * operación de un cliente. El descargo no es una nota al pie escondida —va
 * dentro del panel, al mismo peso que su título— porque una consola con
 * cifras es exactamente el tipo de imagen que se lee como real.
 *
 * Al reemplazar por datos reales: quitar `disclaimer` y citar la fuente.
 */
export const governance = {
  eyebrow: 'Gobierno continuo',
  heading: 'El trabajo invisible, visible.',
  body: 'La suscripción mantiene cada proceso monitoreado, optimizado y dentro del marco regulatorio. Así se ve un trimestre de operación bajo gobierno continuo.',

  panel: {
    title: 'Gobierno continuo',
    disclaimer: 'Vista ilustrativa con datos de ejemplo.',
  },

  kpis: [
    { value: 24, suffix: '', label: 'procesos en producción' },
    { value: 99.4, suffix: '%', label: 'ejecuciones sin intervención manual' },
    { value: 0, suffix: '', label: 'hallazgos críticos abiertos' },
  ],

  chart: {
    title: 'Actividad por semana',
    /** Doce semanas: un trimestre, que es el ciclo del que habla la sección. */
    weeks: 12,
    series: [
      {
        id: 'ejecuciones',
        label: 'Ejecuciones',
        unit: 'ejecuciones',
        values: [182, 214, 196, 243, 268, 251, 302, 331, 318, 384, 421, 468],
      },
      {
        id: 'evidencias',
        label: 'Evidencias',
        unit: 'registros de evidencia',
        values: [548, 661, 590, 712, 802, 769, 918, 1004, 947, 1156, 1272, 1410],
      },
      {
        id: 'incidencias',
        label: 'Incidencias',
        unit: 'incidencias abiertas',
        values: [7, 6, 8, 5, 4, 5, 3, 4, 2, 2, 1, 1],
      },
    ],
  },

  /**
   * Plan de cumplimiento. El vocabulario es el colombiano a propósito: ante la
   * SIC lo que se actualiza es el RNBD, no un ROPA europeo.
   */
  plan: {
    title: 'Plan de cumplimiento',
    items: [
      { task: 'RNBD actualizado ante la SIC', state: 'hecho' },
      { task: 'Revisión trimestral de accesos', state: 'hecho' },
      { task: 'Reentrenamiento del modelo de extracción', state: 'curso' },
      { task: 'Simulacro de respuesta a incidentes', state: 'previsto' },
    ],
  },

  activity: {
    title: 'Actividad reciente',
    items: [
      { time: '09:41', text: 'Informe mensual de operación generado' },
      { time: '08:15', text: 'Alerta de deriva de datos resuelta' },
      { time: '07:02', text: 'Pipeline de ingesta verificado' },
    ],
  },
} as const;

/** Etiquetas de estado del plan. Fuera del bucle: el orden no las decide. */
export const planStates = {
  hecho: 'Completado',
  curso: 'En curso',
  previsto: 'Programado',
} as const;

/* ------------------------------------------------------------------------ */
/* Evidencia — resultados medibles                                            */
/* ------------------------------------------------------------------------ */

/**
 * ⚠ La FUENTE ya está confirmada por el cliente: Portafolio WRabbit AI 2026.
 * Va escrita bajo el eje, que es donde manda para las cinco filas.
 *
 * Lo que sigue siendo PLACEHOLDER es la línea `source` de cada fila —la base
 * concreta de cada medición—: la redacté yo a partir de la cifra, y hay que
 * contrastarla contra el portafolio. Esta sección afirma por escrito que
 * ninguna cifra existe sin su fuente, así que es la única del sitio donde
 * publicar algo sin confirmar convierte su propio argumento en falso.
 *
 * `source` es obligatorio por tipo: si se borra, la fila no compila.
 */
export const results = {
  eyebrow: 'Evidencia',
  heading: 'Resultados medibles,',
  headingTail: 'con la fuente a la vista.',
  body: 'Trabajamos con rangos reales de nuestro portafolio, según tipo de proceso y sector. Ninguna cifra de esta página existe sin su fuente.',

  /** El primero es el estado inicial. `all` no filtra nada. */
  filters: [
    { id: 'all', label: 'Todos' },
    { id: 'transversal', label: 'Transversal' },
    { id: 'legal', label: 'Legal' },
    { id: 'publico', label: 'Público' },
    { id: 'salud', label: 'Salud' },
  ],

  /** Rótulo del eje común. Sin él, cinco barras sueltas no dicen sobre qué. */
  axis: {
    caption:
      'Todas las cifras sobre la línea base del propio proceso, antes de la implantación. Fuente: Portafolio WRabbit AI 2026.',
    ticks: [0, 25, 50, 75, 100],
  },

  /**
   * `shape` decide el dibujo, no el adorno:
   *
   *   'range' — un intervalo. La barra flota entre `from` y `to`, con un
   *             trazo fino desde cero que sitúa dónde empieza.
   *   'point' — una magnitud. La barra va de cero a `to`.
   *
   * Las cinco comparten un mismo eje de 0 a 100, que es lo que permite
   * compararlas de un vistazo. Antes cada una tenía su propio anillo o su
   * propia barra y no se podían leer juntas.
   */
  metrics: [
    {
      id: 'costos',
      shape: 'range',
      from: 20,
      to: 40,
      unit: '%',
      label: 'de reducción en costos operativos',
      sector: 'transversal',
      source: 'Costo por trámite, antes y después.',
    },
    {
      id: 'ejecucion',
      shape: 'point',
      prefix: 'hasta',
      from: 0,
      to: 70,
      unit: '%',
      label: 'menos tiempo de ejecución en tareas manuales repetitivas',
      sector: 'transversal',
      source: 'Tope en captura y validación documental.',
    },
    {
      id: 'contratos',
      shape: 'point',
      from: 0,
      to: 60,
      unit: '%',
      label: 'menos tiempo de revisión contractual',
      sector: 'legal',
      source: 'Revisión de minutas, práctica corporativa.',
    },
    {
      id: 'proyectos',
      shape: 'point',
      from: 0,
      to: 40,
      unit: '%',
      label: 'menos tiempo en formulación de proyectos',
      sector: 'publico',
      source: 'Formulación de proyectos de inversión pública.',
    },
    {
      id: 'atencion',
      shape: 'range',
      from: 30,
      to: 50,
      unit: '%',
      label: 'más capacidad de atención médica',
      sector: 'salud',
      source: 'Agenda liberada de tareas administrativas.',
    },
  ],
} as const;

/** Nombre visible de cada sector. Se usa en la etiqueta de la tarjeta. */
export const sectors = {
  transversal: 'Transversal',
  legal: 'Sector legal',
  publico: 'Sector público',
  salud: 'Sector salud',
} as const;

/**
 * Nodos de El Trazado (el signature). Coordenadas en el viewBox del SVG.
 * Ver DESIGN.md §8.
 */
export const trazado = {
  label: 'Diagrama del proceso: ingesta, extracción, validación, radicación y auditoría.',
  nodes: [
    { id: 'ingesta', label: 'INGESTA' },
    { id: 'extraccion', label: 'EXTRACCIÓN' },
    { id: 'validacion', label: 'VALIDACIÓN' },
    { id: 'radicacion', label: 'RADICACIÓN' },
    { id: 'auditoria', label: 'AUDITORÍA' },
  ],
} as const;
