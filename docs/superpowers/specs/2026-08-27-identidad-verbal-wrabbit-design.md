# WRabbit AI — Identidad verbal

Cómo habla la compañía. Qué dice, qué no dice y con qué pruebas.

Derivado de `integratedbio.com` por medición, no por impresión. Fase 0 —
pendiente de aprobación. 27 de agosto de 2026.

Documento hermano de [`DESIGN.md`](../../../DESIGN.md), que fija cómo se ve el
sitio. Este fija cómo suena. Donde los dos se toquen —longitud de un titular,
altura de una sección— manda `DESIGN.md`, porque el texto se compone dentro de
un sistema visual que ya existe.

---

## 1. La tesis

> **WRabbit AI es la compañía que deja constancia.** Escribe como el registro
> que entrega: en primera persona del plural, en presente, con normas, fechas y
> entidades con nombre, y sin una sola afirmación que el lector no pueda ir a
> comprobar.

De ahí sale todo lo demás. Una compañía que vende trazabilidad no puede
publicar una frase sin trazabilidad; el sitio **es** la primera muestra del
entregable. Un dato de marcador en el pie no es un pendiente de maquetación:
es una demostración pública de cómo trabajamos.

---

## 2. Qué se copia de la referencia y qué no

La dirección visual se calibró contra `integratedbio.com` (`DESIGN.md` §1). La
verbal se calibra contra el mismo sitio, pero **no de la misma forma**, y la
razón es una asimetría de negocio que hay que tener delante todo el tiempo:

| | Integrated Biosciences | WRabbit AI |
|---|---|---|
| De dónde viene el dinero | Inversores de riesgo | Clientes que contratan |
| Qué tiene que lograr la web | Que la lean inversores, científicos y farmacéuticas | Que un director jurídico o de TI decida escribir |
| Qué la acredita | *Nature*, *Cell*, el MIT, un Nobel en el consejo | Todavía nada publicado |
| Puede permitirse | Hablar solo de sí misma durante toda la página | No |

**Integrated Biosciences no tiene que cerrar una venta en su web.** Ese es el
único hecho que importa al decidir qué se importa. Todo rasgo suyo que se
sostenga *solo* gracias a esa libertad es veneno aquí.

### Se copia

1. **Sustituir el adjetivo por el sustantivo verificable.** La referencia no
   dice «resultados extraordinarios»; dice «Cell, 4 de septiembre de 2025».
   Ninguna afirmación de calidad se publica sin un nombre propio, una fecha o
   un número de documento al lado.
2. **Afirmar corto, explicar largo, nunca las dos cosas en la misma frase.**
   Medido en la referencia: el 52 % de las frases tienen 14 palabras o menos, y
   solo 5 de 30 pasan de 25 — y esas cinco son exactamente las explicativas.
3. **Repetir la tesis literalmente en vez de reformularla.** La misma frase seis
   veces en la portada, subiendo de resolución: abstracta en el hero, método en
   la plataforma, concreta en el cierre. Nunca cambia la afirmación, solo su
   grado de concreción. Quien abandona a cualquier altura se lleva lo mismo.
4. **El pie y el techo en la misma frase**, con el adverbio temporal explícito:
   «*Today,* our mission targets age-related diseases, *while* our ultimate
   ambition is far bolder…». Es el único movimiento retórico que la referencia
   hace y sus ocho pares no, y no depende de credenciales: depende del pudor de
   nombrar lo modesto que se hace hoy.
5. **Cero exclamaciones, cero superlativos de agencia.** Medido: 0 y 0 en las
   2 507 palabras del sitio. Y cero apariciones de *innovation*, *best-in-class*,
   *trusted*, *seamless*, *empower*, *revolutionize*, *pricing*, *ROI*,
   *customer*, *demo*, *guarantee*, *case study*, *testimonial*, *success*.
6. **La jerga sin glosar como filtro**, cambiando el diccionario. La referencia
   usa TR-FRET porque su lector es doctor en biología. El lector de WRabbit es
   un director jurídico o de TI de una entidad: su jerga acreditante es
   *radicación*, *requisitos habilitantes*, *expediente electrónico*, *RNBD*,
   *MSPI*, *SECOP II*.
7. **La página de equipo como centro de gravedad reputacional**, en lugar de un
   bloque de «por qué elegirnos» con iconos. La referencia gasta ~1 000 de sus
   ~1 200 palabras de `/company` en personas con su procedencia institucional, y
   no tiene ni una lista de razones.
8. **La contención visual y la profundidad baja.** Todo a un clic. Cero popups,
   cero chat flotante, cero captura de correo, cero contadores animados. Ya está
   resuelto en `DESIGN.md` §2 y §9: no se toca.

### No se copia

1. **El 45 : 0 de persona gramatical.** En la referencia hay 45 marcadores de
   primera persona del plural y **cero** de segunda en 567 palabras de voz de
   marca. Pero cada «we» se salda dentro del mismo párrafo con un testigo:
   «our discoveries have been repeatedly featured in *Nature*…». Es una empresa
   que habla de sí misma **con testigos**. Hoy WRabbit tiene unos quince verbos
   en primera persona del plural y cero testigos: ni una entidad nombrada, ni un
   contrato, ni una fecha. El mismo molde gramatical produce autoridad cuando
   hay expediente detrás y **soliloquio** cuando no lo hay.
2. **La ausencia total de cifras.** La referencia puede no publicar magnitudes
   porque publica **nombres**. Quitó el número y dejó el sustantivo verificable.
   El commit `04e47a6` quitó el número de la portada de WRabbit y no dejó nada
   en su lugar.
3. **«No hay equivalente a *Nature*».** Es el error más caro del ejercicio, y es
   falso. El equivalente colombiano existe, es más barato y es **más
   verificable**: los contratos con el Estado son información pública por la Ley
   1712 de 2014 y se publican en SECOP II con número, objeto, valor, plazo y
   partes. Una consultora que ha contratado con el Estado no puede alegar
   confidencialidad sobre la existencia del contrato: ya está publicado. Hoy el
   sitio no lo usa ni una vez.
4. **El newsroom como bibliografía ajena.** El 100 % de los titulares de la
   referencia enlaza *fuera* de su dominio. La externalidad **es** el argumento:
   acepta perder la sesión a cambio de que la prueba se lea en `nature.com`.
   WRabbit copió la forma e invirtió la fuente: los cinco elementos son markdown
   propio. «Cerramos la alineación con el MSPI», publicado por WRabbit, es
   WRabbit certificando a WRabbit — un blog corporativo con estética de
   bibliografía, que es peor que un blog corporativo honesto porque promete
   verificación y no la entrega.
5. **La brevedad como rasgo de marca.** Medido: 438 palabras es la mediana del
   género (241 en Xaira, 671 en Recursion). La brevedad de la referencia no la
   distingue de nadie; es el estándar del sector. Recortar por parecerse a ella
   es recortar contra la mediana de otro negocio.
6. **No decir dónde está la empresa.** En la referencia la geografía funciona
   sola: el código postal de la bahía de San Francisco ya es una credencial. En
   Colombia, ante un comprador público, la ausencia de domicilio, NIT y teléfono
   no se lee como sobriedad sino como sociedad de papel.
7. **La ausencia de piezas legales.** No es una opción estética aquí: la Ley 1581
   de 2012 y el Decreto 1377 de 2013 obligan a informar la finalidad y obtener
   autorización. WRabbit ya lo tiene bien resuelto. El riesgo no es adoptarlo:
   es que alguien lo pode en una ronda de limpieza «para parecerse más».

---

## 3. Cómo habla

Reglas falsables. Si una regla no permite decir si un texto la cumple o la
incumple, no es una regla y no está aquí.

### Persona y tiempo

1. **La voz institucional no nombra al lector.** Portada, `/company` y newsroom
   van en primera persona del plural o en tercera («la organización», «la
   entidad», «el proceso»). Cero «tú», «tu», «ti».
2. **El «usted» se autoriza en tres lugares y en ninguno más**: la banda de
   cierre de conversión, `/contact`, y las dos páginas legales — donde no es una
   elección de estilo sino una obligación normativa (§9.5). Es la decisión
   arbitrada de §7.1.
3. **Los botones sí hablan al lector**, en imperativo y sin pronombre: «Ver la
   compañía», «Leer el artículo». Es lo mismo que hace la referencia con
   *Discover our company*, y no cuenta como segunda persona.
4. **La empresa es el sujeto.** Al menos seis de cada diez frases de la voz
   institucional abren con un verbo en primera persona del plural
   —«Construimos», «Ejecutamos», «Registramos»— o con «WRabbit AI».
5. **Presente simple.** Cero futuro («permitirá», «lograremos», «transformará»)
   y cero progresivo («estamos construyendo», «venimos desarrollando») en la voz
   institucional. Lo que la compañía hace, lo hace hoy; lo que no hace todavía,
   no se enuncia.
6. **De sus personas habla en tercera persona**, con nombre y apellido, cargo y
   al menos una procedencia institucional nombrable.

### Frase y párrafo

7. Ninguna frase de cuerpo supera las **40 palabras**. Ningún párrafo, las **60**.
8. En cada sección, al menos **la mitad** de las frases tienen 14 palabras o menos.
9. Ningún titular pasa de **7 palabras**. Termina en punto. Sin cifra, sin
   adjetivo evaluativo, sin nombre de producto. Exento: el H1 de página
   interior, que llega a 12 (§9.4).
10. El subtítulo del hero tiene entre **10 y 14 palabras**, en orden
    **método → terreno**. Ese orden es lo que impide que el titular suene a
    eslogan: la frase siguiente demuestra que detrás hay maquinaria.
11. Los titulares de sección van **en positivo** y hablan de lo que hacemos,
    aunque la sección trate de un problema. Regla ya vigente en el proyecto:
    «Lo que cuesta no implementar» se rechazó por la forma, y la versión buena
    fue «Un proceso manual se paga dos veces.»
12. Ninguna sección de la portada supera las **120 palabras**, y solo una supera
    las 60.

### Puntuación

13. **Cero signos de exclamación** en cualquier página, en cualquier posición.
14. **Una sola pregunta en todo el sitio**: la de la banda de cierre. Como esa
    banda se repite idéntica en las tres páginas (§8), el signo aparece tres
    veces, pero la pregunta es una. Es de calificación —el lector la contesta sí
    o no y la respuesta decide si escribe—, no retórica de publicidad. Se
    blinda: es la mejor frase de conversión del repositorio.
15. **Máximo tres dos puntos por sección** (no por página: en `/company` y en
    cualquier artículo el techo por página es incumplible). Cada uno anuncia algo
    que se despliega dentro de la misma frase.
16. **Sin coma de Oxford.** Las enumeraciones cierran con «y» sin coma previa.
    Una sola convención en todo el sitio.

### Prueba

17. **Regla de canje 3 : 1.** Por cada tres frases en primera persona del plural
    hay una frase con un **verificador externo nombrado**: norma con número,
    entidad, número de proceso, medio o publicación. Es la regla que separa la
    autoridad del soliloquio.
18. **Toda afirmación de prueba tiene su verificación en la sección
    inmediatamente siguiente**, sin bloque intermedio. Así funciona la
    referencia: dice «featured in *Nature*» y acto seguido pone los papers.
19. **Cero cifras sin las tres marcas**: entidad o número de documento, fecha o
    periodo, y **fuente distinta de WRabbit**. Prohibidos los rangos de más de
    diez puntos y los «hasta».
20. **Nombrar instancias, no categorías.** «Entidades del orden nacional y
    territorial» es una categoría y ante este comprador se lee como «si
    tuviéramos clientes, los nombraríamos».
21. **El dato más específico de una sección vive en un elemento estático.**
    Nunca en un carrusel, un turno rotativo ni algo que dependa del scroll.

### Repetición e idioma

22. **La tesis se repite literal, no se reformula.** Aparece al menos cinco veces
    en la portada; dos de ellas palabra por palabra (H1 y banda de cierre) y las
    otras tres son la misma afirmación a mayor resolución, nunca una afirmación
    distinta.
23. **Una sola autodefinición** en los tres archivos de datos. Cero rótulos
    alternativos.
24. **Una sola etiqueta por destino.** «Trabajemos juntos» en las cuatro
    apariciones; nunca «Hablar con nosotros» en paralelo.
25. **Un solo idioma en el cuerpo.** Cero cadenas en inglés. No cuentan como
    inglés: la marca, los nombres de plataforma (LinkedIn, X, SECOP II), las
    siglas normativas y **«Newsroom»**, que por decisión de §12.4 se conserva
    como nombre propio de sección. La excepción se escribe aquí precisamente
    para que no se lea como un descuido.

---

## 4. Cómo no habla

Cada error con su corrección. Los ejemplos «mal» son texto real del repositorio
hoy, no hipótesis.

| | |
|---|---|
| **Promesa de beneficio en el titular** | ✗ «IA aplicada, resultados medibles.» — la portada promete medición en la primera línea y en 11 708 px no entrega ni una medición real.<br>✓ Un titular que declare lo que la compañía es, no lo que el lector obtiene. |
| **Dinero, en cualquier forma** | ✗ «qué se entrega, cuándo y **por cuánto**»<br>✓ «qué se entrega, bajo qué regla y en qué fecha» |
| **Presupuesto como garantía** | ✗ «Arquitectura, seguridad y **presupuesto cerrado** antes de escribir código.»<br>✓ «Arquitectura, seguridad y reglas escritas antes de la primera línea de código.» |
| **Retorno económico** | ✗ «El sistema queda amarrado: medimos juntos **el retorno** cada trimestre.»<br>✓ «El sistema queda amarrado, y cada trimestre se mide cómo está corriendo y qué evidencia produjo.» |
| **Cifra sin fuente ajena** | ✗ «hasta 70 % menos tiempo de ejecución» · «20–40 % de reducción en costos operativos» — fuente: «Portafolio WRabbit AI 2026», es decir, nosotros.<br>✓ «Radicación en tres entidades territoriales: de once a dos días hábiles entre marzo y agosto de 2025, según los tiempos registrados por cada entidad.» |
| **Unidad comprable** | ✗ «**La suscripción** mantiene cada proceso monitoreado…»<br>✓ «El acompañamiento no termina con la entrega: cada proceso queda vigilado, corregido y dentro del marco regulatorio.» |
| **La IA de protagonista** | ✗ «La IA ejecuta el trabajo repetitivo.»<br>✓ «Ejecutamos el trabajo repetitivo con la inteligencia artificial como instrumento, nunca como protagonista.» |
| **Tuteo, y mezcla de tratamientos** | ✗ «estudiamos **tu** operación hilo por hilo» conviviendo con «Dos semanas dentro de **su** proceso»<br>✓ «estudiamos la operación hilo por hilo» · «Dos semanas dentro del proceso» |
| **Tesis reformulada** | ✗ «Trabajamos donde equivocarse tiene consecuencias **jurídicas**» y, tres secciones abajo, «Construimos donde equivocarse tiene consecuencias **legales**».<br>✓ La misma frase, con la misma palabra, en las dos apariciones. |
| **Lema disperso en variantes** | ✗ «follow what others don't see» · «Ver lo que otros no ven» · «seguir las señales que otros dejan pasar» · «seguimos las señales que otros dejan pasar» — cuatro formas de lo mismo.<br>✓ Una sola forma, repetida literal. |
| **Metáfora que contradice la tesis** | ✗ «Del **conejo blanco** tomamos el nombre y la costumbre» — la madriguera es el emblema de perder el rastro, en un sitio que vende no perderlo.<br>✓ «La tarjeta se escribe antes de que la máquina corra; doscientos años después, esa sigue siendo la regla.» |
| **Prestigio por vecindad** | ✗ El hito «2026 — WRabbit AI» puesto en fila detrás de Jacquard, Hollerith y 1946.<br>✓ Bajar el bloque del oficio a `/company` y dejar que la portada acredite con expediente. |
| **Categorías donde van instancias** | ✗ «entidades del orden nacional y territorial, firmas de práctica corporativa y compañías de los sectores financiero, asegurador y de infraestructura»<br>✓ «Los componentes de ingesta, ejecución y registro están alineados con el MSPI del MinTIC, requisito habitual en contratación con entidades del orden nacional.» |
| **Superlativos de agencia** | ✗ «aliado estratégico en transformación digital con soluciones integrales de vanguardia»<br>✓ «Ejecutamos el proceso de punta a punta, con las reglas declaradas por escrito antes de correr.» |
| **Datos de ejemplo con forma de prueba** | ✗ «24 procesos en producción», «99,4 %», «0 hallazgos críticos», con el descargo al pie.<br>✓ Ver §7.2: la consola se queda, pero deja de fingir que mide algo. |
| **Marcadores en producción** | ✗ `NIT 901.000.000-0` · `+57 601 000 0000` · `Calle 100 # 00-00` · `name: 'Nombre Apellido'` · `externalUrl: example.org`<br>✓ El dato real, o la omisión completa del campo. Un pie que dice «WRabbit AI S.A.S. — Bogotá D.C. — contacto@wrabbit.ai» es correcto; uno con un NIT inventado publica un dato falso. |
| **Errata en el vocabulario del cliente** | ✗ «**buffets** de abogados» — un buffet es una comida servida. Vive también en `src/lib/contact.ts:47`, donde el bufete se autodescribe con la errata al rellenar el formulario.<br>✓ «bufetes de abogados» |
| **Dos etiquetas para la misma puerta** | ✗ «Hablar con nosotros» en `/company` y «Trabajemos juntos» en la portada, ambos a `/contact`.<br>✓ «Trabajemos juntos», siempre. |

---

## 5. Léxico

### Siempre — el idioma del comprador

**El orden de esta lista es el orden de prioridad del comprador** (§12.3):
empresas reguladas primero, bufetes después, Estado en tercer lugar. Cuando haya
que recortar, se recorta desde abajo.

- **Sectores regulados** — *el primer comprador*: marco regulatorio, reporte
  regulatorio, área de cumplimiento, riesgo operativo, matriz de riesgos,
  control interno, revisoría fiscal, circular externa, conciliación,
  Superintendencia Financiera, Superintendencia de Servicios Públicos,
  Superintendencia de Sociedades.
- **Control y auditoría** — común a los tres compradores: hallazgo,
  requerimiento, auditoría interna y externa, papel de trabajo, plan de
  remediación, ente de control.
- **Datos personales** — común a los tres: habeas data, tratamiento, finalidad,
  autorización, Ley 1581 de 2012, Decreto 1377 de 2013, RNBD, Superintendencia
  de Industria y Comercio.
- **Gestión documental**: radicación, radicado, expediente electrónico, anexo,
  minuta, término, traslado.
- **Práctica jurídica** — *el segundo comprador*: bufete, firma de práctica
  corporativa, dirección jurídica, litigio, derecho de petición, tutela.
- **Contratación pública** — *el tercer comprador*: SECOP II, RUP, requisitos
  habilitantes, códigos UNSPSC, estudio de mercado, pliego, certificación de
  experiencia, supervisión del contrato; entidad del orden nacional, entidad
  territorial, alcaldía, gobernación, establecimiento público.
- **Estado digital**: MinTIC, MSPI, MIPG, Ley 1712 de 2014, Gobierno Digital.
- **Lo nuestro** — transversal, nunca se recorta: trazabilidad, evidencia,
  registro de ejecución, marca temporal, regla declarada, versión,
  reconstrucción, corrida; automatización auditable, capa de ejecución, proceso
  de punta a punta, secuencia declarada.
- **Los cinco nodos del Trazado**, siempre en este orden: ingesta, extracción,
  validación, radicación, auditoría.

### Nunca

- **Dinero**: precio, tarifa, cotización, presupuesto, costo, costos operativos,
  ahorro, retorno, ROI, inversión en sentido comercial, «por cuánto».
- **Unidades comprables**: suscripción, plan, paquete, nivel de servicio,
  licencia mensual, demo, prueba gratuita, diagnóstico gratuito.
- **Comodines de agencia**: solución, solución integral, soluciones a la medida;
  potencial, potenciar, desbloquear el potencial, empoderar, habilitar;
  innovación, innovador, líder, de clase mundial, vanguardia, estado del arte;
  aliado estratégico, socio estratégico, partner; transformación digital como
  sustantivo suelto, disrupción, revolucionar.
- **Promesa**: caso de éxito, garantía, garantizado, resultados garantizados;
  fácil, sencillo, sin esfuerzo, llave en mano; confianza, confiable, «nuestros
  clientes confían en nosotros».
- **Tiempos prohibidos**: permitirá, lograremos, transformaremos, será; estamos
  construyendo, venimos desarrollando, seguimos trabajando en.
- **Jerga de aprendizaje automático sin glosar**: RAG, embeddings, fine-tuning,
  agentes, LLM, prompt. Esa filtra al comprador, no al curioso.
- **Urgencia**: cupos limitados, por tiempo limitado, agende su llamada,
  contáctenos ya.
- **Erratas de oficio**: buffet por bufete.

### Con cuidado

| Término | Régimen |
|---|---|
| «inteligencia artificial» / «IA» | Máximo dos apariciones por página. Nunca en el H1. **Nunca como sujeto gramatical.** Siempre instrumento. El «AI» del nombre de la compañía no cuenta. |
| «plataforma» | Minúscula, sin marca ni símbolo registrado, una vez por página. «Motor de ejecución auditable» es la misma tesis a mayor resolución, no una categoría nueva. |
| «auditable», «evidencia», «auditoría» | Son la tesis y deben repetirse — pero siempre referidas a lo que WRabbit **produce**, nunca como promesa sobre el negocio del lector. |
| Cifras | Solo con las tres marcas de §3.19. |
| **Plazos** («Semanas 1–2», «cada viernes») | **Permitidos y deseables.** Son alcance y ritmo, no precio. Ver §7.3. |
| «usted» | Solo en la banda de cierre, en `/contact` y en las dos páginas legales. |
| Nombres de clientes | Solo con autorización escrita, o cuando el contrato es público en SECOP II y se cita con número, entidad y fecha. |
| El telar de Jacquard | Una vez por sitio, en `/company`, como explicación del nombre. Nunca en posición de prueba, nunca vestido sobre el método. |
| «Colombia», «colombiano» | Como jurisdicción y marco normativo. No como argumento de cercanía ni de orgullo. |
| Siglas MSPI, RNBD, SECOP II, RUP, MIPG | Sin glosar en el cuerpo; glosadas una vez por página en su primera aparición larga. |

---

## 6. El inventario de prueba

Lo que sustituye a *Nature* y al MIT. Ninguno requiere un cofundador del MIT y
**ninguno se usa hoy**.

El orden responde al comprador decidido en §12.3. Una empresa regulada no
pregunta primero «¿a quién le ha vendido?»: pregunta **«¿pasa mi evaluación de
proveedores y entiende a mi superintendencia?»**. Por eso la certificación va
antes que la referencia.

1. **Certificaciones y auditorías con número y fecha** — ISO/IEC 27001, SOC 2 si
   llega, la alineación con el MSPI del MinTIC. Es lo primero que pide un área
   de riesgo antes de dejar entrar a un proveedor a sus datos.
2. **Registro en el RNBD ante la SIC**, con fecha. Un banco o una aseguradora
   responde solidariamente por el tratamiento que hace su encargado: es un
   requisito, no un adorno.
3. **Referencias de cliente nombradas**, con autorización escrita. En el sector
   privado la existencia del contrato es confidencial por defecto — al revés que
   en el público. Cuesta más conseguirla y por eso vale más.
4. **SECOP II** — número de proceso o de contrato, entidad, objeto y fecha, con
   enlace al expediente público. Baja del primer puesto, pero **no se descarta:
   es la única prueba del inventario que un tercero verifica en treinta segundos
   sin pedirnos permiso**, porque la Ley 1712 de 2014 la hace pública. Sirve
   doble: acredita ante el Estado y le demuestra a un privado que la compañía
   pasó un listón de contratación ajeno.
5. **RUP**, con los códigos UNSPSC de inscripción y la capacidad organizacional.
   Solo relevante ante el comprador público.
6. **Personas** con nombre, apellido, LinkedIn activo y trayectoria institucional
   verificable.
7. **Solo al final**, testimonio nominado de un director.

---

## 7. Decisiones arbitradas

Cinco puntos donde el análisis de voz y la crítica adversaria llegaron a
conclusiones opuestas. Se resuelven aquí, con su razón.

### 7.1 · El «usted» se conserva, racionado a la conversión

El análisis de la referencia pedía cero segunda persona. La crítica señaló que
las dos frases que convierten en todo el repositorio usan «usted».

**Resuelto: la voz institucional no nombra al lector; la voz de conversión sí.**
La propia referencia lo hace — interpela con imperativos sin sujeto («Discover
our company») y solo dice «you» cuando ofrece un empleo. WRabbit necesita el
reparto inverso: el imperativo en los botones, y el «usted» en los dos únicos
puntos donde se pide algo. Fuera de ahí, tercera persona.

Consecuencia: `closing.heading` —«¿Tiene un proceso que hoy depende de que nadie
se equivoque?»— **se blinda**. Es pregunta de calificación, no de publicidad, y
no existe ninguna frase equivalente en la referencia.

### 7.2 · La consola de gobierno se queda; el titular del hero es el problema

Hoy la portada dice «resultados medibles» en la primera línea y las **únicas**
cifras que contiene son las de la consola, que el propio panel declara falsas.
Se borraron las cifras reales con fuente y se conservaron las ilustrativas.

La lectura fácil sería quitar la consola. Es la equivocada: la sección enseña la
**forma** de una operación montada —el software dedicado corriendo, los datos de
varios sistemas en una sola vista— y eso es mostrar, no vender.

**Resuelto: el defecto no es la consola, es el pareado.** Se corrige el titular
del hero para que no prometa una medición que la página no entrega, y la consola
se queda diciendo con todas las letras lo que es: la forma del registro, no la
operación de un cliente. Se retiran los contadores animados. Cuando exista un
trimestre real anonimizado, vuelve con fuente citada.

### 7.3 · El método se queda, sube de rango y pierde el dinero

Es la sección que distingue a WRabbit de la referencia y de las otras
consultoras: la única que responde «¿qué pasa si escribo?». La referencia no
tiene ni una frase equivalente en todo su corpus.

**La línea divisoria es: el método describe qué ocurre, nunca qué se garantiza.**

| Se queda — es proceso | Se va — es venta |
|---|---|
| «Dos semanas dentro del proceso: entrevistas, observación y datos.» | «Usted aprueba el diseño **y el presupuesto cerrado** antes de que se escriba una línea de código.» |
| «Semanas 5–12» · «Semana 13 en adelante» | «qué se entrega, cuándo y **por cuánto**» |
| «Cada viernes hay algo nuevo funcionando.» | «cada ajuste llega **antes de que sea costoso**» |

El plazo aproximado es información sobre la forma del trabajo, igual que decir
cuánto tarda una radicación. El presupuesto cerrado es manejo de objeciones:
responde a un miedo que el lector todavía no ha dicho en voz alta.

Le falta una sola cosa: **el siguiente paso y el plazo de respuesta**, que hoy
viven escondidos en `/contact` («Respondemos dentro de los dos días hábiles
siguientes») y deberían estar junto a la llamada a la acción.

### 7.4 · El oficio baja a `/company`

El bloque del telar ocupa hoy la posición de prueba en la portada con hechos que
son ciertos pero **no son de WRabbit**: es linaje prestado sin vínculo. Jim
Collins firma los papers de Integrated Bio; Jacquard no firma nada nuestro. Un
director que evalúa idoneidad registra «doscientas palabras sobre un telar
francés, cero sobre un contrato entregado».

**Resuelto: no se borra —explica el nombre y es memorable— pero se degrada de
rango.** Abre la historia en `/company`. La portada acredita con expediente.

### 7.5 · El newsroom admite ancla propia, con condiciones

La regla dura —«sin ancla externa verificable no es newsroom»— vacía el newsroom:
cuatro de cinco piezas no la tienen y la quinta apunta a `example.org`.

**Resuelto: dos taxonomías separadas, no mezcladas.**

- **Prensa / Anuncio** — exige ancla externa: SECOP II, la nota de la propia
  entidad, el texto oficial de la norma, el certificado con su número.
- **Publicación** — admite ancla propia **si** el documento es descargable,
  fechado y versionado. Un método publicado es verificable por su contenido.

Máximo dos categorías, y ninguna con menos de dos piezas. Cero enlaces a
`example.org`.

---

## 8. Estructura narrativa de la portada

El arco de la referencia, traducido. Entre paréntesis, el presupuesto de
palabras. Cada sección sigue sujeta a la regla del proyecto: **no más alta que la
ventana**.

| # | Sección | Qué hace | Palabras |
|---|---|---|---|
| 01 | **Hero** | Planta la bandera y se aparta. Tesis literal, sin promesa de resultado. Subtítulo en orden **método → terreno**, y el terreno abre por empresas reguladas (§12.3). Un solo enlace. | 14–18 |
| 02 | **Qué hacemos** | Tres enunciados de una idea cada uno: qué construimos, qué deja cada ejecución, dónde trabajamos. Los cuatro terrenos salen del turno rotativo y quedan estáticos, **en este orden** (§12.3): cumplimiento normativo, reporte regulatorio, litigio y contratación pública. | ≤50 |
| 03 | **La plataforma** | El mecanismo. Primero el diagnóstico, después la secuencia declarada, y la coda del ente de control en frase propia: «Cuando un ente de control pregunta qué pasó el 14 de marzo a las 09:42, la respuesta existe y se puede imprimir.» | ≤60 |
| 04 | **Tres pilares** | Integración → automatización → trazabilidad. Es una secuencia real, por eso van numerados. Una frase de ≤14 palabras cada uno. | ≤45 |
| 05 | **Marquee** | Repetición literal del H1. Cero información nueva. Junta de dilatación entre el bloque técnico y el de identidad. | 3–6 |
| 06 | **Prueba** | **La sección que hoy no existe y que decide el sitio.** Norma con número, entidad nombrada, fecha, número de proceso. Sin ella, todo lo anterior es soliloquio. | ≤80 |
| 07 | **Gobierno continuo** | La forma de una operación montada. Se queda (§7.2). | ≤60 |
| 08 | **La compañía** | Cuatro párrafos cortos a dos columnas. Aquí, y solo aquí, la **frase escalera**: «Hoy automatizamos trámites concretos —radicación, extracción documental, revisión de minutas—; lo que perseguimos es que ninguna decisión de una entidad quede sin registro de por qué se tomó.» | ≤120 |
| 09 | **El método** | Cuatro tiempos con plazos y entregables, cero palabras de dinero, más el siguiente paso y el plazo de respuesta. | ≤100 |
| 10 | **Newsroom** | Penúltimo, nunca último: sus enlaces son salidas del argumento. | variable |
| 11 | **Banda de cierre** | La tesis en su versión más concreta y el único enlace de conversión. Idéntica palabra por palabra en portada, `/company` y `/newsroom`. | ≤15 |
| — | **Pie** | Razón social, NIT, domicilio, teléfono, correo, legales y redes. Cero destinos nuevos. | ≤25 |

**Movimientos que la estructura exige:** el bloque del oficio baja a `/company`
(§7.4); aparece la sección de prueba; y `Statements`, que hoy ocupa 450 svh para
tres frases, se revisa —tres pantallas por dos afirmaciones es caro si se le
quitan los cuatro terrenos.

**Techo total de la portada: ocho pantallas.** Once bloques con la regla de «una
sección, una pantalla» darían once pantallas de scroll; el marquee y la banda de
cierre no cuentan como pantalla completa, y `Qué hacemos` con `La plataforma`
pueden compartir una.

---

## 9. Los registros menores

La prosa no es todo el sitio. Estos cinco registros tienen sus propias reglas y
hoy no tienen dueño.

### 9.1 Voz de sistema

Unas 25 cadenas de interfaz: «Saltar al contenido», «Volver arriba», «Menú de
navegación», «Ver todo», «Leer artículo», «Enviando…».

**Regla: verbo + objeto, sin nombrar al lector, sin punto final, ≤4 palabras.**
Exentas de la regla de persona y del presupuesto de palabras. No cuentan como
enlaces de conversión.

### 9.2 Errores y acuses

Ocho cadenas vivas en `src/lib/contact.ts` y `src/pages/api/contacto.ts`.

- **Error de campo**: nombra qué falta y qué hacer, en una frase. Sin culpar,
  sin «Lo sentimos».
- **Error de sistema**: nombra la causa y da la salida alterna (el correo).
- **Acuse**: declara el plazo con **número de días hábiles**. Nunca «pronto».

El sitio promete hoy respuesta en dos días hábiles y el endpoint solo envía
correo interno: **quien escribe no recibe nada**. O se escribe el
autorespondedor, o se borra la promesa.

### 9.3 Páginas de estado

404, error de servidor, formulario enviado. **Titular nominal con punto, una
frase de causa en tercera persona, un solo enlace, nunca una disculpa.** El 404
actual dice «La dirección que **buscaba** no existe» (usted fuera de sitio),
tiene dos botones y ninguno lleva a `/contact`.

### 9.4 Prosa larga — el newsroom

Único lugar donde WRabbit escribe texto largo, y las reglas de §3 lo matarían:
los titulares reales tienen 8–13 palabras, dos puntos y cifras.

**Régimen propio:** título de artículo hasta **12 palabras**, admite dos puntos y
cifra; H2 nominales; las ≤40 palabras por frase se mantienen; los dos puntos se
cuentan por sección; el H1 de página interior queda exento del techo de 7.

*«Publicamos el método antes de que nos lo pidan.»* —H1 de `/newsroom`, nueve
palabras— es de lo mejor que hay escrito en el sitio. La regla se dobla para que
sobreviva.

**Firma:** una compañía que exige nombre, apellido y procedencia para publicar
una biografía no puede publicar cinco artículos anónimos. O byline con persona y
cargo, o una línea explícita de que la compañía firma como institución.

### 9.5 Voz legal

`/privacidad` y `/terminos` se dirigen al titular del dato en «usted» **por
obligación normativa**. Es imposible bajo la regla de §3.2, así que se declara
como **tercer registro autorizado**: usted, presente, cero adjetivos.

Y un bloqueante: las dos publican hoy en producción un aviso que dice
**«Borrador pendiente de revisión jurídica»**. Una compañía que vende
cumplimiento normativo está declarando en su propia web que sus documentos
legales no están revisados.

### 9.6 Textos alternativos y metadatos

- **Alt**: sintagma nominal descriptivo, ≤25 palabras, sin «imagen de», sin
  adjetivo evaluativo, sin metáfora. Los del newsroom ya son el mejor texto no
  institucional del sitio, pero por accidente.
- **`<title>`**: `Página — WRabbit AI`. **`description`**: 150–160 caracteres con
  la tesis dentro. **`og:image:alt`**: el alt real de la imagen, no la
  descripción de la página.

---

## 10. Fuera de la web

**La prohibición de hablar de dinero es del sitio público, y solo del sitio
público.** Una propuesta técnico-económica y una oferta en SECOP II **tienen**
que cotizar: el pliego lo exige. Cuatro registros declarados:

| Registro | Persona | Dinero | Notas |
|---|---|---|---|
| **Sitio** | 1.ª plural / 3.ª | **Cero** | Este documento |
| **Oferta y propuesta** | 1.ª plural | **Sí, obligatorio** | Mismo léxico y misma sintaxis; con cifras, plazos y valor |
| **Correo** | Usted | Solo si el cliente lo pregunta | Tres frases, plazo declarado, firma con cargo |
| **LinkedIn** | 1.ª plural | Cero | Mismo léxico; se permite la afirmación general, nunca la pregunta-gancho ni la cifra sin fuente |

---

## 11. Bloqueantes de publicación

No son pendientes de maquetación. Con cualquiera de estos abierto, el sitio no
sale a producción.

1. **Razón social, NIT, matrícula mercantil, domicilio y teléfono reales.** Un
   funcionario que debe justificar idoneidad por escrito no puede citar un NIT de
   marcador. Van en el pie y en el JSON-LD.
2. **Cero marcadores** en `src/data`, `src/lib`, `src/pages`, `src/content` y
   `public/*.json`. El grep cubre los cinco, no solo `src/data`.
3. **Equipo: nombre, apellido, cargo, LinkedIn activo y una procedencia
   institucional nombrable por persona.** Sin eso, la sección **se elimina**.
   Publicarla con «Nombre Apellido» es prueba positiva de que no hay nadie detrás.
4. **Política de Tratamiento aprobada por abogado.** Fuera el aviso de borrador.
5. **Ninguna fecha publicada posterior a la fecha de despliegue.** Hay artículos
   fechados por delante de hoy, en un sitio cuya tesis es la marca temporal.
6. **Grep de dinero**: precio, tarifa, cotización, presupuesto, costo, ahorro,
   retorno, ROI, suscripción, plan, paquete.
7. **Grep de persona**: cero «tú/tu/ti/usted» fuera de la banda de cierre,
   `/contact` y las dos páginas legales.
8. **El año de fundación es uno solo** y coincide en `site.founded`, en el
   párrafo de la portada y en el último hito de `/company`. Hoy el sitio dice
   2023 y 2026 con dos clics de diferencia. Una empresa que vende reconstruir qué
   pasó y cuándo no puede equivocarse en su propia fecha.
9. **Ortografía institucional**: «bufete(s)»; MinTIC, SECOP II, RNBD, MSPI, RUP y
   SIC escritos tal cual.

---

## 12. Decisiones

### Cerradas — 27 de agosto de 2026

**12.1 · La tesis única es «Automatización que deja constancia.»**

Sustituye a las tres que competían: `hero.headlineFlat` («IA aplicada,
resultados medibles.»), `site.tagline` («Automatización auditable para
instituciones.») y `marquee.text` («Automatización auditable»). Va **palabra por
palabra** en los tres sitios, y el H1 la parte en dos tiempos:

```
H1        Automatización
          que deja constancia.

SUBTÍTULO Software dedicado y automatización para empresas
          reguladas, bufetes y entidades del Estado.
```

Por qué esta y no otra:

- **Es la tesis de identidad de §1 dicha literal.** El documento dice «la
  compañía que deja constancia»; el titular lo dice sin traducirlo.
- **«Dejar constancia» es vocabulario del comprador**, no de la agencia. Es lo
  que dice un acta, un requerimiento y un papel de trabajo. Un director de
  cumplimiento no tiene que aprenderla.
- **El sujeto es el trabajo**, no la empresa ni el lector. Cumple §3.4 sin
  presumir y sin prometer.
- **Cuatro palabras, cero cifra, cero adjetivo evaluativo, cero «IA».** Cumple
  §3.9 y el régimen de «IA» de §5.
- **Deja el subtítulo con trabajo que hacer**: el H1 pone el método, la línea
  siguiente pone el terreno. Es el orden método → terreno de §3.10, que es lo
  que impide que el titular suene a eslogan.

**12.2 · «Newsroom» no se traduce.** Se conserva como nombre propio de sección y
queda **declarado como excepción expresa** a la regla de un solo idioma (§3.25),
para que no se lea como un descuido. Consecuencia: es la única palabra inglesa
del cuerpo, así que no puede haber una segunda. Las dos taxonomías de §7.5
—Prensa/Anuncio y Publicación— viven dentro de ese rótulo.

**12.3 · El sitio le habla primero a las empresas reguladas.** Financiero,
asegurador e infraestructura. Los bufetes van segundos y el Estado tercero.

Es la decisión de mayor alcance de todo el documento, porque reordena tres cosas
que ya estaban escritas:

- **El léxico** (§5) se reordena: reporte regulatorio, área de cumplimiento,
  riesgo operativo, revisoría fiscal, circular externa y las tres
  superintendencias suben al primer bloque. El vocabulario de contratación
  pública baja al tercero, y es lo primero que se recorta cuando falte sitio.
- **El inventario de prueba** (§6) se reordena: la certificación y el RNBD van
  antes que la referencia de cliente, porque una empresa regulada pregunta
  primero si el proveedor pasa su evaluación de riesgo, no a quién le ha
  vendido. SECOP II baja al cuarto puesto pero **no se descarta**, por la razón
  que se explica ahí.
- **Los cuatro terrenos** (§8, bloque 02) quedan en este orden: cumplimiento
  normativo, reporte regulatorio, litigio y contratación pública.

Aviso: buena parte del copy actual está escrito para el comprador público
—`governance.plan` habla de RNBD y SIC, el newsroom abre con MinTIC y con
radicación territorial, `whatWeDo` pone la contratación pública primera—. Ese
material **no se tira**: se reordena y el registro del Estado pasa a ser el
segundo plano, no el primero.

### Abiertas — dependen del cliente

1. **¿Hay contratos con entidades públicas citables en SECOP II?** *Pendiente de
   consultar.* De esto depende cuánto peso carga el punto 4 del inventario de
   prueba. Con la decisión 12.3 tomada ya no es bloqueante de la sección de
   prueba —la certificación y el RNBD pueden sostenerla—, pero sigue siendo la
   única prueba que un tercero verifica sin pedirnos permiso, así que vale la
   pena averiguarlo antes de escribir esa sección.
2. **¿El MSPI y el RNBD están cerrados y verificables hoy, con fecha y
   documento?** Ahora son las dos anclas **principales**, no las de reserva. Si
   son aspiracionales, se retira la pieza del newsroom y la afirmación de
   `/company`, y el sitio se queda sin ningún verificador externo.
3. ~~La redacción exacta de la tesis.~~ Cerrada en 12.1.
4. **¿«follow what others don't see» es marca registrada?** Si lo es, vive solo
   dentro del lockup del logo. Si no, se elimina y se adopta una sola forma en
   español. Nota: con «Newsroom» ya gastando la única excepción de idioma, un
   lema en inglés en el cuerpo pasa a ser insostenible.
5. **¿Hay vacantes abiertas?** Si las hay, necesitan ruta propia enlazada solo
   desde el pie, y `/contact` deja de titularse «Trabaja con nosotros», que en
   español significa empleo. Hoy el botón promete negocio y la página aterriza
   con un titular de reclutamiento.
6. **¿Existe un trimestre real de operación publicable anonimizado?** De eso
   depende que la consola recupere números de verdad.
7. **¿La operación sostiene los plazos publicados?** Dos semanas de diagnóstico,
   primera entrega el viernes de la quinta semana, acompañamiento desde la
   semana trece. Son el mejor activo del sitio y lo único que lo distingue de
   cualquier otra consultora, pero comprometen. Se publican solo si el cliente
   los confirma.
8. **La fotografía.** Las imágenes del newsroom son de The National Archives del
   Reino Unido, CC-BY, con atribución obligatoria en el pie. Un sitio sobre
   compañías y entidades colombianas ilustrado con archivos británicos, y la
   atribución lo confiesa en el pie. O material propio, o se asume y se escribe
   la atribución en la voz de la casa.

---

## 13. Origen

Derivado de `integratedbio.com` mediante trece agentes en cuatro fases:
transcripción literal de las cuatro rutas del sitio, investigación de la empresa
y su financiación, comparación con ocho pares del género, análisis lingüístico
con conteo (persona gramatical, aspecto verbal, longitud de frase, puntuación,
léxico ausente verificado por búsqueda), reconstrucción del arco narrativo con
presupuesto de palabras por sección, auditoría del copy actual de WRabbit y una
pasada adversaria contra el propio ejercicio.

**Límite ético, el mismo de `DESIGN.md` §1:** se replica el **lenguaje** —el
molde de la frase, la disciplina de prueba, la lógica del arco—. No se toma
ningún texto, ningún asset ni ninguna línea de código. Todo el copy es original.

Los datos medidos que sostienen este documento: 45 : 0 de persona gramatical en
567 palabras de voz de marca; 438 palabras en la home entera; el argumento
propio en 162; la conversión en 12; el 52 % de las frases con 14 palabras o
menos; 0 exclamaciones y 0 interrogaciones en 2 507 palabras; 4 URL de contenido
y profundidad máxima de un clic.
