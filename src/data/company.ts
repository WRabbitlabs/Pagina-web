/**
 * El relato de la compañía: de dónde viene, cómo trabaja y qué promete.
 *
 * Lo consumen las DOS páginas —la portada y /company—, así que vive aparte de
 * `home.ts`, que es copy de portada y solo de portada. El export `company` de
 * home.ts sigue siendo el bloque corto de la home; no se toca.
 *
 * Reparto actual:
 *   intro  → /company (entrada de la página)
 *   craft  → portada, justo después del hero
 *   method → portada en versión corta, /company completa
 *
 * ⚠ PLACEHOLDER salvo lo que venga del cliente. Ver el aviso de home.ts.
 */

/* ------------------------------------------------------------------------ */
/* Entrada de la página                                                       */
/* ------------------------------------------------------------------------ */

export const intro = {
  /**
   * Qué es la compañía, dicho sin rodeos antes del titular. El titular de la
   * página lo pone : «IA aplicada, resultados medibles.» es
   * ahora el del hero de la portada.
   */
  eyebrow: 'WRabbit AI — Consultora de inteligencia artificial',

  /**
   * El lema. Va en inglés y por eso lleva `lang` propio en la plantilla: sin
   * él, un lector de pantalla en español lo pronuncia como si lo fuera.
   */
  motto: 'follow what others don’t see',

  body: 'Heredamos el oficio del primer telar: seguir las señales que otros dejan pasar y tejer los sistemas que ejecutan el trabajo repetitivo — automatización, datos en orden y cumplimiento normativo en una sola capa de ejecución.',

  ctas: [
    { label: 'Ver lo que otros no ven', href: '/#historia', primary: true },
    { label: 'Hablar con nosotros', href: '/contact', primary: false },
  ],

  /**
   * Dos cifras de portada. Son dos de las cinco de la home, no unas nuevas:
   * repetir la misma medición con otro número sería el modo más rápido de
   * perder la credibilidad que la sección de evidencia intenta construir.
   */
  stats: [
    {
      prefix: 'hasta',
      figure: '70%',
      label: 'menos tiempo de ejecución en procesos que sustituyen tareas manuales repetitivas',
    },
    {
      prefix: '',
      figure: '20–40%',
      label: 'de reducción en costos operativos',
    },
  ],

  /** Fuente de las dos cifras. La misma que la de la home. */
  source: 'Portafolio WRabbit AI 2026',
} as const;

/* ------------------------------------------------------------------------ */
/* El oficio — de dónde viene esto                                            */
/* ------------------------------------------------------------------------ */

/**
 * La historia que explica el nombre y el método.
 *
 * No es adorno histórico: es el argumento de por qué la compañía no vende
 * licencias. Las cuatro fechas son públicas y verificables, y por eso esta es
 * la única sección del sitio con cifras que no necesitan una nota de fuente
 * —son hechos de manual, no mediciones de nuestro portafolio.
 */
export const craft = {
  eyebrow: 'El oficio',
  heading: 'Doscientos años tejiendo instrucciones.',
  body: [
    'En 1804, Joseph-Marie Jacquard construyó un telar que leía tarjetas perforadas para decidir el patrón de la tela. Cada tarjeta era una instrucción; cada hilo, una decisión. Sin saberlo, había inventado el programa.',
    'Nosotros heredamos ese oficio. No vendemos licencias ni plantillas: estudiamos tu operación hilo por hilo y tejemos el sistema exacto que necesita, con la inteligencia artificial como instrumento — nunca como protagonista. Del conejo blanco tomamos solo el nombre y la costumbre: seguir lo que otros no ven.',
  ],

  /**
   * Cuatro hitos, en orden. `body` va en dos frases cortas: la primera dice
   * qué pasó, la segunda qué cambió. El ritmo es lo que hace que la línea se
   * lea como una sola idea y no como cuatro fichas sueltas.
   */
  milestones: [
    {
      year: 1804,
      title: 'El telar de Jacquard',
      body: [
        'Una tarjeta perforada decide el patrón de la tela.',
        'Nace la máquina programable.',
      ],
    },
    {
      year: 1890,
      title: 'El censo de Hollerith',
      body: [
        'Las tarjetas del telar procesan un censo de gobierno en tiempo récord.',
        'La instrucción salta de la tela a los datos.',
      ],
    },
    {
      year: 1946,
      title: 'La computación moderna',
      body: [
        'Las instrucciones tejidas se vuelven software.',
        'El patrón ya no es tela: es proceso.',
      ],
    },
    {
      year: 2026,
      title: 'WRabbit AI',
      body: [
        'La IA ejecuta el trabajo repetitivo.',
        'El oficio continúa: seguimos las señales que otros dejan pasar.',
      ],
    },
  ],

  /** Se lee sobre la tarjeta perforada, que es decorativa. */
  cardLabel: 'Tarjeta perforada con el año codificado en binario.',
} as const;

/* ------------------------------------------------------------------------ */
/* El método — cuatro tiempos                                                 */
/* ------------------------------------------------------------------------ */

/**
 * Las cuatro fases del encargo, con sus plazos.
 *
 * Nombres llanos —diagnóstico, diseño, construcción, entrega— y no los del
 * telar. La historia del oficio se cuenta UNA vez, en su sección; vestir
 * también el método de urdimbre y trama convertiría una metáfora en un
 * disfraz, y aquí lo que el cliente necesita saber es cuándo ve la primera
 * entrega y cuándo se cierra el presupuesto.
 *
 * `short` es la versión de portada: una línea. `body` es la de /company, que
 * tiene sitio para el detalle. Se escriben las dos aquí para que no acaben
 * contradiciéndose en dos archivos distintos.
 */
export const method = {
  eyebrow: 'El método',
  heading: 'Cuatro tiempos.',
  body: 'Un encargo tiene principio y final declarados desde el primer día: qué se entrega, cuándo y por cuánto.',
  cta: { label: 'Hablar con nosotros', href: '/contact' },

  phases: [
    {
      n: '01',
      title: 'Entendemos su operación',
      name: 'Diagnóstico',
      short: 'Dos semanas dentro de su proceso, con entrevistas, observación y datos.',
      body: 'Dos semanas dentro de su proceso: entrevistas, observación y datos. Salimos con un mapa de dónde se pierde tiempo y dinero, y qué automatizar primero.',
      when: 'Semanas 1–2',
    },
    {
      n: '02',
      title: 'Diseñamos la estructura',
      name: 'Diseño',
      short: 'Arquitectura, seguridad y presupuesto cerrado antes de escribir código.',
      body: 'Arquitectura, seguridad y plan de trabajo. Usted aprueba el diseño y el presupuesto cerrado antes de que se escriba una línea de código.',
      when: 'Semanas 3–4',
    },
    {
      n: '03',
      title: 'Construimos por ciclos',
      name: 'Construcción',
      short: 'Entregas semanales que puede ver y usar desde el primer viernes.',
      body: 'Entregas semanales que puede ver y usar. Cada viernes hay algo nuevo funcionando; cada ajuste llega antes de que sea costoso.',
      when: 'Semanas 5–12',
    },
    {
      n: '04',
      title: 'Entregamos y acompañamos',
      name: 'Entrega',
      short: 'Capacitación, documentación y medición del retorno cada trimestre.',
      body: 'Capacitación a su equipo, documentación completa y soporte continuo. El sistema queda amarrado: medimos juntos el retorno cada trimestre.',
      when: 'Semana 13 en adelante',
    },
  ],
} as const;

/* ------------------------------------------------------------------------ */
/* Equipo                                                                     */
/* ------------------------------------------------------------------------ */

export const team = {
  eyebrow: 'Equipo',
  /**
   * El lede decía «Ingeniería y criterio jurídico en la misma mesa» cuando la
   * página listaba tres fichas, una por disciplina. Publicada una sola, esa
   * frase prometía dos perfiles que ya no se ven: la sección se desmentía a sí
   * misma. Esta versión dice lo que la ficha de abajo demuestra —hay un
   * responsable con nombre— y sigue siendo cierta cuando el equipo crezca.
   */
  lede: 'Cada proceso que entregamos tiene un responsable con nombre.',
} as const;
