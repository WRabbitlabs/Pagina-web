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
  eyebrow: 'Wr AI Labs — Consultora de inteligencia artificial',

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
  source: 'Portafolio Wr AI Labs 2026',
} as const;

/* ------------------------------------------------------------------------ */
/* El oficio — de dónde viene esto                                            */
/* ------------------------------------------------------------------------ */

/**
 * La historia que explica el nombre y el método.
 *
 * No es adorno histórico: es el argumento de por qué la compañía no entrega
 * licencias. Las cuatro fechas son públicas y verificables, y por eso esta es
 * la única sección del sitio con cifras que no necesitan una nota de fuente
 * —son hechos de manual, no mediciones de nuestro portafolio.
 */
export const craft = {
  eyebrow: 'El oficio',
  heading: 'Doscientos años tejiendo instrucciones.',
  body: [
    'En 1804, Joseph-Marie Jacquard construyó un telar que leía tarjetas perforadas para decidir el patrón de la tela. Cada tarjeta era una instrucción; cada hilo, una decisión. Sin saberlo, había inventado el programa.',
    'Nosotros heredamos ese oficio. No entregamos licencias ni plantillas: estudiamos tu operación hilo por hilo y tejemos el sistema exacto que necesita, con la inteligencia artificial como instrumento — nunca como protagonista. Del conejo blanco tomamos solo el nombre y la costumbre: seguir lo que otros no ven.',
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
      title: 'Wr AI Labs',
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
 * Las cuatro fases del encargo.
 *
 * Nombres llanos —diagnóstico, diseño, construcción, entrega— y no los del
 * telar. La historia del oficio se cuenta UNA vez, en su sección; vestir
 * también el método de urdimbre y trama convertiría una metáfora en un
 * disfraz, y aquí lo que el cliente necesita saber es en qué orden ocurren
 * las cosas.
 *
 * SIN PLAZOS POR FASE, y es una decisión, no un olvido. Cada fase llevaba su
 * ventana en semanas —«Semanas 1–2», «Semanas 5–12»— y el conjunto se leía
 * como un calendario de trece semanas igual para todos. Eso contradice cómo
 * trabaja la compañía: en el menor tiempo que el alcance admita. Un encargo
 * pequeño no tarda trece semanas porque la retícula lo diga, y uno grande no
 * cabe en ellas. La duración típica se dice UNA vez, en `body`, y como rango
 * de lo que suele ocurrir — no como promesa.
 *
 * `short` es la versión de portada: una línea. `body` es la de /company, que
 * tiene sitio para el detalle. Se escriben las dos aquí para que no acaben
 * contradiciéndose en dos archivos distintos.
 */
export const method = {
  eyebrow: 'El método',
  heading: 'Cuatro tiempos.',
  body: 'Un encargo tiene principio y final declarados desde el primer día. Trabajamos en el menor tiempo que el alcance admita sin bajar la calidad: un desarrollo completo suele tomar entre uno y dos meses.',
  cta: { label: 'Hablar con nosotros', href: '/contact' },

  phases: [
    {
      n: '01',
      title: 'Entendemos su operación',
      name: 'Diagnóstico',
      short: 'Entramos en su proceso, con entrevistas, observación y datos.',
      body: 'Entramos en su proceso: entrevistas, observación y datos. Salimos con un mapa de dónde se pierde tiempo y dinero, y qué automatizar primero.',
    },
    {
      n: '02',
      title: 'Diseñamos la estructura',
      name: 'Diseño',
      short: 'Arquitectura, seguridad y presupuesto cerrado antes de escribir código.',
      body: 'Arquitectura, seguridad y plan de trabajo. Usted aprueba el diseño y el presupuesto cerrado antes de que se escriba una línea de código.',
    },
    {
      n: '03',
      title: 'Construimos por ciclos',
      name: 'Construcción',
      short: 'Entregas semanales que puede ver y usar desde el primer viernes.',
      body: 'Entregas semanales que puede ver y usar. Cada viernes hay algo nuevo funcionando; cada ajuste llega antes de que sea costoso.',
    },
    {
      n: '04',
      title: 'Entregamos y acompañamos',
      name: 'Entrega',
      short: 'Capacitación, documentación y medición del retorno cada trimestre.',
      body: 'Capacitación a su equipo, documentación completa y soporte continuo. El sistema queda amarrado: medimos juntos el retorno cada trimestre.',
    },
  ],
} as const;

/* ------------------------------------------------------------------------ */
/* Equipo                                                                     */
/* ------------------------------------------------------------------------ */

/**
 * SIN LEDE, y es deliberado.
 *
 * Aquí hubo dos frases y las dos fallaban por lo mismo: hablaban del tamaño
 * del equipo en vez de presentarlo. «Ingeniería y criterio jurídico en la
 * misma mesa» prometía perfiles que no estaban publicados. La que la
 * sustituyó —«cada proceso que entregamos tiene un responsable con nombre»—
 * sonaba a que cada proceso lo sostiene una sola persona, que es exactamente
 * lo contrario de lo que una empresa regulada quiere leer de su proveedor.
 *
 * La sección presenta al fundador y ya. La ficha dice quién es, qué hace y
 * dónde verificarlo, que es más de lo que decía cualquiera de las dos frases.
 * Cuando haya más fichas, el reparto en grupos vuelve solo — lo gobierna
 * `showGroups` en la plantilla, no una frase escrita a mano.
 */
export const team = {
  eyebrow: 'Equipo',
} as const;
