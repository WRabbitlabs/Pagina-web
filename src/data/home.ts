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
  headline: ['Ingeniería de procesos', 'que resisten', 'una auditoría.'],
  /** Texto accesible del h1, sin la partición visual en líneas. */
  headlineFlat: 'Ingeniería de procesos que resisten una auditoría.',
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
