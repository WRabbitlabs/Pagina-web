# WR AI Labs — Sistema de diseño

Documento vivo. Fija los tokens y **por qué** son esos y no otros.
Fase 0 aprobada — 26 de agosto de 2026.

---

## 1. Origen de la dirección

La dirección visual se calibra contra `integratedbio.com`. El sistema se derivó de dos fuentes independientes que se contrastaron entre sí:

1. **Medición propia en el DOM** (computed styles a 375 / 1280 / 1600 px).
2. **Extracción de Refero** (`DESIGN.md`, `theme.css`, `variables.css`, `tokens.json`).

Donde las dos discrepan, **gana la medición en vivo**. Ver §3.

### Límite legal y ético

Se replica el **lenguaje de diseño** (escala, ritmo, restricción cromática, lógica de secciones, tono de la motion). **No** se toma del sitio de referencia: ningún asset, ninguna imagen, ningún texto, ninguna línea de código, ningún nombre de clase. Todo el copy, todos los SVG y todo el CSS son originales.

Las tipografías se licencian por separado y de forma independiente:

| Familia | Autor | Licencia | Uso |
|---|---|---|---|
| Inter Tight | Rasmus Andersson | SIL OFL 1.1 | Display + texto |
| Roboto Mono | Christian Robertson | Apache 2.0 | Labels, contadores, metadatos |

Los archivos de licencia se copian junto a las fuentes en `public/fonts/`.

### Por qué Inter Tight y no Aspekta

La referencia usa **Aspekta** (Ivo Dolenc), libre para uso comercial. No se
adoptó porque **no existe canal de distribución verificable**: no está en npm
(404 en todas las variantes probadas), no está en Fontsource, y el repositorio
oficial no resultó accesible. Las únicas fuentes disponibles son agregadores
de fuentes gratuitas, de procedencia no auditable. Para un sitio comercial con
comprador institucional y de gobierno, la procedencia del archivo importa
tanto como la licencia.

**Inter Tight** es el sustituto que nombra el propio export de Refero: grotesca
apretada, geométrica, diseñada para tracking negativo agresivo. Se distribuye
por Fontsource bajo OFL 1.1, ya subseteada.

**Para cambiar a Aspekta** cuando el cliente obtenga los archivos de la fuente
oficial: sustituir los `@font-face` en `src/styles/tokens.css` y las entradas de
`scripts/fonts.mjs`. Nada más del sistema depende de ello.

---

## 2. La tesis del sistema

> La jerarquía se talla **solo** con tamaño, line-height y tracking negativo. Nunca con peso.

Un único peso (400) en toda la escala, de 13 px a 158 px. Esa restricción **es** la identidad. Añadir un semibold la rompe.

El segundo eje de contraste no es tipográfico sino de superficie: **dos lienzos que se alternan**, tinta petróleo y bone. El aire entre secciones no es decoración — es la señal de seriedad del género.

---

## 3. Auditoría de la referencia (medido, no asumido)

### Correcciones al export de Refero

| Punto | Refero dice | Medido en vivo | Resolución |
|---|---|---|---|
| Ancho de contenido | `1200px` | `max-width: 1620px` + `padding: 48px` | Se usa **1620px** |
| Acento (surface) | `#cef79` — hex inválido de 5 dígitos | `#CEF79E` | Corregido |
| Tracking del mono | `-0.02em` @13px | `letter-spacing: normal` | Se usa **normal** |
| Grid | "12 columnas" | `1fr 2fr` y `1fr 1fr`, `column-gap:20px`, `row-gap:44px` | Splits por `fr` sobre malla de 12 |

### Mecánica que el export no captura

- **Hero de ~3720 px.** `hero_main` a 100 vh + un `pin-spacer` de 3000 px con el slider pineado dentro. El slider **lo mueve el scroll**, no unas flechas.
- **Fondo `position: fixed`** detrás de todo el bloque oscuro (en la referencia, un `<video>` en loop).
- **Reveal del `h1` enmascarado línea por línea**: contenedor con `overflow: clip`, líneas que suben desde `translateY(110px)`.
- **Marquee a 141 px @1280** — el texto más grande de la página, por encima del `h1` (101 px). Movido por `requestAnimationFrame`, no por CSS `animation`.
- **Scroll nativo.** Sin Lenis. `scroll-behavior: auto`.

### Defectos de accesibilidad de la referencia — **no se heredan**

| Defecto | Nuestra regla |
|---|---|
| Botones de 39 px de alto | Mínimo **44 × 44 px** en toda área táctil |
| `#C9CBBE` documentado como color de texto (1.53:1) | `--lichen` es **hairline decorativo**, jamás texto ni borde con significado |
| Acento usado sobre lienzo claro (1.12:1) | `--signal` **solo como relleno**, con `--ink` encima |
| `<h1>` completamente `aria-hidden="true"` | Las líneas visuales van `aria-hidden`; el `h1` conserva su texto accesible en `.sr-only` |

---

## 4. Color

Desde septiembre de 2026 la paleta se deriva del logotipo (el conejo con la W
en degradado azul, ver decisión 31). Antes la tinta era verde-fría y la señal
lima; con la W azul convivían dos señales cromáticas. La regla nueva: **la W es
lo único saturado de la página.** La tinta toma el matiz de la W pero no su
croma, para leerse como tinta de sello sobre papel y no como pantalla; el
lienzo claro sigue siendo cálido, así que el cambio de superficie es también un
cambio de temperatura (claro cálido, oscuro frío); y la señal es la parada
clara de la W llevada a luz.

### Núcleo

| Token | Hex | Nombre | Rol |
|---|---|---|---|
| `--ink` | `#1A2A45` | Tinta de sello | Lienzo oscuro + todo el texto sobre claro. Azul marino desaturado (matiz 220°, saturación 45 %). **No es `#000`.** |
| `--bone` | `#F7F7F5` | Bone | Lienzo claro. Off-white con carga cálida mínima. No cambia. |
| `--paper` | `#FFFFFF` | Papel | Tarjetas sobre bone; texto sobre tinta. |
| `--graphite` | `#465368` | Grafito | Texto secundario y prosa larga. Es `--ink` al 80 % sobre `--bone` — coherencia matemática, no elección arbitraria. |
| `--signal` | `#7FC7F9` | Señal | Micro-superficies interactivas **exclusivamente**. Es `#2AA2F5` (la parada clara de la W) al 60 % con blanco. |
| `--ember` | `#F3A469` | Ascua | Solo el estado de puntero de la llamada a la acción. Complementario de la tinta (26° frente a 220°): el cambio de matiz completo hace el hover inconfundible. Única excepción registrada a «un solo acento». |

### Derivados utilitarios

Los tres neutros salen de la misma regla que el grafito: tinta sobre hueso al
20, 8 y 4 %.

| Token | Hex | Rol |
|---|---|---|
| `--lichen` | `#CBCED2` | Hairline de 1 px, decorativo |
| `--tissue` | `#E5E7E7` | Tarjeta alterna |
| `--frost` | `#EEEFEE` | Banda del newsroom |
| `--void` | `#000000` | Solo footer. Cierre absoluto del sitio y fondo natal del logotipo. |
| `--error` | `#8E2F22` / `#E8836F` | Estado de error de formulario |
| `--marca-oscura-0/1/2` | `#3F8FF0` → `#52AEF7` → `#7FC7F9` | La W del símbolo sobre tinta. El degradado original (`#123E9E` → `#1A6FD8` → `#2AA2F5`) se apaga sobre azul; sobre oscuro sube tres pasos de luz y su última parada es exactamente la señal. |

`--error` **no es un segundo acento**: es color funcional, y el error nunca se
comunica solo con color (mensaje de texto + borde de 2 px + `aria-invalid`).
Óxido desaturado, a más de 180° de la señal para que aviso y proceso nunca se
confundan. 7.59:1 sobre bone; sobre tinta sube a `#E8836F` para dar 5.41:1.

### Por qué `--signal` es azul claro y no lima

La semántica que aplica es **estado activo del sistema**: un proceso corriendo.
Antes lo decía un lima; con el logotipo azul, el lima era una segunda voz. La
señal es ahora el píxel de la estela de la W cuando está encendido: la marca y
la interfaz se encienden con el mismo píxel. Frente a un comprador de gobierno
o un bufete sigue sin ser decoración: es un indicador, racionado a 44 × 44 px y
a puntos de 6 px.

### Vídeo y fotografía

Los tres soportes apuntan al mismo azul. El vídeo del hero se lleva a la
familia con un duotono (`scripts/video-tinte.mjs`): se desatura y la
luminancia se mapea entre `#0A1225` (negro), `#285490` (medio) y
`#5CB8FF` (blanco, la segunda parada de la W sobre oscuro). El blanco se limita
a esa parada y nunca alcanza la señal: la señal queda reservada a la interfaz.
Las fotografías se desaturan y se tiñen hacia `#273B56`
(`scripts/foto-tinte.mjs`), la tinta subida unos puntos de luz.

### Contrastes verificados (WCAG 2.1)

| Combinación | Ratio | Nivel |
|---|---|---|
| `--ink` sobre `--bone` | **13.40:1** | AAA |
| `--paper` sobre `--ink` | **14.37:1** | AAA |
| `--signal` sobre `--ink` | **7.83:1** | AAA |
| `--ink` sobre `--signal` | **7.83:1** | AAA |
| `--ink` sobre `--ember` | **7.07:1** | AAA |
| `--graphite` sobre `--bone` | **7.26:1** | AAA |
| `--marca-oscura-0` sobre `--ink` | **4.38:1** | AA (gráfico ≥ 3:1) |
| `--lichen` sobre `--bone` | 1.47:1 | ✗ solo decorativo |
| `--signal` sobre `--bone` | 1.71:1 | ✗ solo relleno |
| `#2AA2F5` (W clara) sobre `--bone` | 2.58:1 | logotipo, exento (1.4.11) |

Las tres últimas filas son **restricciones de uso**, no fallos pendientes.

---

## 5. Tipografía

Self-hosted, `.woff2`, subset `latin + latin-ext`. Preload únicamente Aspekta 400.

> Se envía el **estático 400**, no el variable. El sistema prohíbe variar peso, así que el archivo variable sería payload muerto (~90 KB frente a ~20 KB del subset).

`font-display: swap` con `size-adjust` / `ascent-override` calibrados contra la fallback para que el swap no genere CLS.

### Escala

| Rol | 375 px | 1600 px | LH | LS | `clamp()` |
|---|---|---|---|---|---|
| `display` | 50 | 112 (tope 132) | 1.00 | −0.03em | `clamp(3.125rem, 1.939rem + 5.061vw, 8.25rem)` |
| `h1` | 42 | 89 | 1.05 | −0.025em | `clamp(2.625rem, 1.726rem + 3.837vw, 5.5625rem)` |
| `h2` | 28 | 76 | 1.10 | −0.02em | `clamp(1.75rem, 0.832rem + 3.918vw, 4.75rem)` |
| `statement` | 28 | 58 | 1.10 | −0.02em | `clamp(1.75rem, 1.176rem + 2.449vw, 3.625rem)` |
| `h3` | 22 | 36 | 1.15 | −0.02em | `clamp(1.375rem, 1.107rem + 1.143vw, 2.25rem)` |
| `lead` | 20 | 24 | 1.20 | −0.02em | `clamp(1.25rem, 1.173rem + 0.327vw, 1.5rem)` |
| `body` | 17 | 19 | 1.30 | −0.006em | `clamp(1.0625rem, 1.024rem + 0.163vw, 1.1875rem)` |
| `small` | 15 | 16 | 1.40 | −0.006em | `clamp(0.9375rem, 0.918rem + 0.082vw, 1rem)` |
| `eyebrow` | 13 | 15 | 1.00 | 0 | `clamp(0.8125rem, 0.774rem + 0.163vw, 0.9375rem)` · mono · uppercase |
| `marquee` | 72 | 158 | 1.00 | −0.01em | `clamp(4.5rem, 2.854rem + 7.02vw, 9.875rem)` |

Curvas lineales calibradas en el rango 375 → 1600 px contra la medición de la referencia.
`--lh-prose: 1.6` se aplica **solo** al ensayo de la sección Compañía; el resto del sitio queda en 1.30.

### Reparto de familias

- **Aspekta** — display, headings, statements, body, prosa.
- **Roboto Mono** — eyebrows, nav, contadores (`01 / 03`), fechas, tags, texto de botón. Uppercase. Nunca para titulares ni para nada más largo que una etiqueta.

---

## 6. Espaciado y grid

```
--container-max : 1620px
--pad-page      : clamp(20px, 1.25rem + 1.6vw, 48px)
--gutter        : 20px
--row-gap       : 44px
--measure       : 62ch
```

Malla conceptual de 12 columnas, usada en la práctica como `1fr 2fr` (sidebar / contenido) y `1fr 1fr`.

### Escala vertical — 8 pasos, base 4 px

| Token | Valor | Uso |
|---|---|---|
| `--space-3xs` | `8px` | gap icono ↔ label |
| `--space-2xs` | `12px` | padding interno de botón |
| `--space-xs` | `20px` | gutter, gap de lista |
| `--space-s` | `32px` | eyebrow ↔ título |
| `--space-m` | `clamp(40px, 2rem + 1.6vw, 60px)` | título ↔ párrafo |
| `--space-l` | `clamp(56px, 2.5rem + 2.6vw, 88px)` | bloque ↔ bloque |
| `--space-xl` | `clamp(72px, 3rem + 3.5vw, 120px)` | sub-sección |
| `--space-2xl` | `clamp(88px, 3.5rem + 5.2vw, 160px)` | **padding de sección** |

### Radios

`8px` botones · `12px` nav e imágenes · `16px` · `20px` tarjetas · `40px` bloques redondeados · `9999px` tags.

---

## 7. Motion

### Tokens

```
--ease-out    : cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out : cubic-bezier(0.65, 0, 0.35, 1)
--ease-spring : cubic-bezier(0.34, 1.56, 0.64, 1)   /* solo botón flecha */

--dur-fast : 180ms   /* micro-interacciones */
--dur-mid  : 320ms   /* transiciones de estado y de página */
--dur-slow : 640ms   /* reveals de sección */
```

Nada por encima de 800 ms. Prohibido `ease` por defecto.

### Reglas

- **Un solo patrón de reveal:** `opacity 0→1` + `translateY(20px)→0`. Se dispara una vez y se desconecta el observer. No re-anima al volver a subir.
- **Escalonamiento:** 80–120 ms entre elementos, máximo 4 elementos por grupo.
- **Solo se animan `transform` y `opacity`.** Única excepción documentada: `stroke-dashoffset` en El Trazado (§8), que es la técnica estándar de dibujo de trazo SVG y se compone en GPU.
- **Cero animación entre 0 y 400 px de scroll** que compita con la lectura del hero.
- **Sin smooth scroll.** No se carga Lenis: la referencia usa scroll nativo, y Lenis rompe el trackpad y complica la accesibilidad sin aportar nada aquí.

### `prefers-reduced-motion: reduce`

Todo el contenido visible y estático. Sin parallax, sin marquee, sin reveals, sin pin. **GSAP no se descarga siquiera** — el import es dinámico y va detrás del guard, así que el cumplimiento es por construcción, no por CSS defensivo.

### Presupuesto de JS — medido, no estimado

| Chunk | gzip |
|---|---|
| Reveals + revelado por palabras | 1.1 KB |
| Escenario, declaraciones, header, marquee, parallax | inline en el HTML |
| **Total** | **≈ 1.1 KB** de 50 KB |

**GSAP se retiró por completo.** Entró para fijar el slider del hero; esa
sección ya no existe y su único consumidor restante era el parallax de una
imagen, donde hacía de mero lector de progreso mientras el `transform` se
escribía a mano. Costaba **36.9 KB comprimidos** por tres líneas de
aritmética que ahora hace `getBoundingClientRect()`.

El presupuesto pasó de ≈40 KB a ≈1.1 KB.

- Cero dependencias de terceros en el cliente.
- Todos los efectos de scroll comparten el mismo patrón: un listener pasivo,
  `requestAnimationFrame`, y un `IntersectionObserver` que deja de escuchar
  cuando el bloque sale de pantalla.
- Los guards de `prefers-reduced-motion` están **antes** de registrar nada.

---

## 8. Signature — "El trazado"

**Un solo elemento.** El fondo fijo del hero es un SVG original: un diagrama de proceso que se dibuja solo.

- Nodos rectangulares y aristas **ortogonales** en hairline `--lichen` sobre `--ink`.
- Etiquetas en Roboto Mono: `INGESTA · EXTRACCIÓN · VALIDACIÓN · RADICACIÓN · AUDITORÍA`.
- Un único token `--signal` recorre una ruta y se detiene en el nodo de auditoría.
- Se dibuja **una vez** (`stroke-dashoffset`) y queda quieto.

**Por qué encaja con WR AI Labs.** La empresa vende procesos que antes ejecutaba gente y ahora ejecuta una máquina, a compradores — bufetes, entidades del Estado — cuya pregunta número uno no es *¿funciona?* sino *¿puedo auditar lo que hizo?*. El signature es el producto dibujado, y termina en la respuesta.

**Reglas que lo salvan del default generado por IA:**

- Aristas solo ortogonales. Nunca curvas orgánicas.
- Cero partículas. Cero glow. Cero "red neuronal".
- Etiquetas reales, en español.
- Se dibuja una vez y se detiene. No hay loop ambiental.

Debe leerse como el anexo técnico de un contrato, no como un wallpaper.

**Descartado:** un índice de cláusulas vivo (`§ 03 — la plataforma`) en el header. Buena idea y muy afín al comprador, pero el mecanismo de fondo es un scroll-progress común y el brief exige **uno solo**.

---

## 9. Reglas del sistema

### Sí

- Un único peso 400 de Aspekta en toda la escala.
- Tracking proporcional: −0.03em en display, −0.02em en headings y statements, −0.006em en body.
- `--signal` como relleno de 44 × 44 px (botón flecha) o punto de 6 px (tag). Nunca mayor.
- Hairlines de 1 px: `--lichen` sobre claro, `--graphite` sobre oscuro. Solo horizontales.
- Superficies planas. La profundidad viene del contraste de lienzo, no de la elevación.
- Cada acción usa la superficie opuesta: botón `--ink` sobre claro, botón `--paper` sobre oscuro.
- Sentence case. Title Case solo en nombres propios.
- Los botones dicen qué pasa: "Ver la compañía", no "Saber más". El mismo nombre para la misma acción en todo el sitio.

### No

- Un segundo peso de Aspekta, o una segunda sans.
- `--signal` como fondo de texto, superficie grande, degradado u overlay.
- `box-shadow` o cualquier efecto de elevación, en ningún elemento.
- `#000000` fuera del footer.
- `--lichen` o `--tissue` sobre superficies oscuras: desaparecen.
- Un segundo color de acento. La tensión del sistema está en monocromo + una señal.
- Imágenes fuera de contenedores redondeados (mínimo 12 px de radio).

---

## 10. Resultados verificados

Medido sobre el **build de producción**, no sobre el dev server.

### Lighthouse (móvil simulado)

| Ruta | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/company` | 100 | 100 | 100 | 100 | 1.6 s | 0 | 0 ms |
| `/newsroom` | 100 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| `/newsroom/[slug]` | 100 | 100 | 100 | 100 | 1.6 s | 0 | 0 ms |
| `/contact` | 100 | 100 | 100 | 100 | 1.6 s | 0 | 0 ms |
| `/privacidad` | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms |

Objetivo: Perf ≥95 · A11y 100 · BP ≥95 · SEO 100 · LCP <2.0 s · CLS <0.05.
**Superado en todas las rutas.**

`/404` no recibe puntuación porque Lighthouse no audita respuestas que no
sean 200 — y una página 404 correcta **debe** responder 404. Verificada
aparte: status 404, título propio, un solo `h1`, `noindex`.

### Accesibilidad

- **Cero fallos de contraste** en 172 elementos de texto sobre 4 páginas,
  medidos sobre el color computado (no sobre los tokens). Repetido tras el
  cambio de paleta de septiembre de 2026: 438 elementos sobre 6 páginas, los
  mismos dos avisos preexistentes que antes (la cola apagada del titular de
  la plataforma, decisión deliberada, y el cierre de `/company`, que va sobre
  el fotograma del pie y la medición no puede resolver), y el mínimo de los
  pares reales sube de 4.70:1 a 5.19:1.
- Cero scroll horizontal entre **320 y 1920 px**.
- Zoom 200 % (viewports de 720 y 640 px): sin desbordes ni texto cortado.
- Un solo `h1` por página, sin saltos de nivel en ninguna ruta.
- Menú mobile: trap de foco en ambas direcciones, `Escape` cierra, scroll
  bloqueado, foco devuelto al botón.
- Áreas táctiles ≥ 44 × 44 px en todo elemento interactivo.

### Formulario

Validación por campo, consentimiento obligatorio, honeypot silencioso (200
sin entrega), sanitización que neutraliza inyección de encabezados CRLF y
etiquetas HTML incluido el contenido de `<script>`, rate limiting (429 al
sexto envío) y 405 en métodos no permitidos.

---

## 11. Registro de decisiones

| # | Decisión | Razón |
|---|---|---|
| 1 | Mantener `--signal #CEF79E` y `--void #000` en el footer | Fidelidad total a la referencia. Contradice la prohibición inicial del brief; confirmado explícitamente por el cliente. La disciplina de racionamiento es lo que lo separa del default de IA. |
| 2 | Una sola familia + un mono, no dos display | El brief pedía dos familias; la referencia usa una. Dos romperían el sistema de peso único. El contraste ya existe entre grotesca y mono. |
| 3 | Slider pineado por scroll **y** con flechas / teclado / swipe | La referencia solo tiene scroll; el brief solo pide controles. Se hacen los dos: scroll como motor, controles como acceso. |
| 4 | `--lichen` degradado a hairline decorativo | 1.53:1 sobre bone. Refero lo documenta como color de texto; eso reprobaría WCAG. |
| 5 | Pilares numerados `01. 02. 03.` | Son una secuencia real: integrar → ejecutar → dejar evidencia. Si fueran categorías paralelas, los números sobrarían. |
| 6 | Sin Lenis | La referencia usa scroll nativo (medido). Rompe trackpad, complica a11y, no aporta. |
| 7 | GSAP + ScrollTrigger sobre `sticky` + IO | Decisión del cliente frente a la recomendación técnica (~34 KB vs ~6 KB). Se mitiga con import dinámico, isla `client:idle`, solo en `/`, y guard de reduced-motion. |
| 8 | Estático 400 en vez de variable | El sistema no varía peso. ~70 KB de ahorro. |
| 9 | `--lh-prose: 1.6` solo en el ensayo | La referencia usa 1.30 en todo; a 62ch se lee apretado y el brief exige legibilidad en párrafos largos. |
| 10 | Signature = El Trazado | Ver §8. Animado 100 % en CSS: no consume del presupuesto de JS. |
| 11 | `--error` como color funcional | El sistema prohíbe un segundo acento; un estado de error no es un acento. Nunca comunica solo con color. |
| 12 | Inter Tight en vez de Aspekta | Aspekta no tiene canal de distribución verificable. Ver §1. Cambiarlo es editar un archivo. |
| 13 | Validación de contacto sin zod | zod cuesta ~13 KB en el cliente para reglas que caben en 40 líneas. El mismo módulo corre en cliente y servidor, así que no pueden divergir. |
| 14 | `goTo()` del slider calcula desde el DOM, no desde `st.start`/`st.end` | Esas propiedades de ScrollTrigger daban `NaN` y convertían `scrollTo` en un no-op silencioso: las flechas y el teclado no hacían nada. |
| 15 | Hero como marco interior redondeado sobre hueso, no a sangre | Es la estructura real de la referencia, medida en vivo: el contenido vive dentro de un rectángulo con margen y radio, y el lienzo de página se ve alrededor. |
| 16 | Apertura con `clip-path: inset()` y `@property` | Escalar el marco deformaría el radio y el vídeo. Recortar deja ambos intactos. Sin `@property` la propiedad no existe, `clip-path` queda inválida y el marco aparece completo — degradación correcta. |
| 17 | El acento ocupa una superficie grande en los tres pilares | El documento escrito dice que nunca pase de micro-superficie, pero **el sitio en vivo llena una tarjeta entera de `#cef79e`**. Se sigue lo medido, no lo redactado. |
| 18 | Fotografía de Openverse (CC0 y CC-BY) con tratamiento oscuro | El corpus CC0 no tiene resolución para estos temas; CC-BY sí, y permite uso comercial con atribución. La procedencia de cada archivo queda en `src/assets/CREDITOS.md`. |
| 19 | Sin foto en el artículo de radicación territorial | Todas las candidatas eran juzgados extranjeros **identificables con su nombre a la vista**. Ilustrar entidades territoriales colombianas con el juzgado del condado de Anson daña la credibilidad ante este comprador. |
| 20 | `inlineStylesheets: 'always'` | Con `'auto'` solo se incorporan las hojas de menos de 4 KB; las dos del sitio (13.7 y 19.3 KB) bloqueaban el primer pintado 610 ms. Casi todas las visitas llegan a una sola página desde un enlace externo, así que no compartir caché de CSS cuesta poco. |
| 21 | Bucle ping-pong horneado con ffmpeg, no invertido por JS | Reproducir hacia atrás obliga a mover `currentTime` cada fotograma y salta según los keyframes del códec. Horneado, el empalme es exacto y el generador **no tiene que cerrar el bucle**, que es la parte difícil de obtener de un modelo. |
| 22 | El vídeo se descarga después de `load`, no en la ruta crítica | `preload="none"` + carga diferida. Con 2 MB compitiendo por el ancho de banda el LCP se degradaba; el póster (15 KB) cubre el intervalo y es el primer fotograma exacto. |
| 23 | Hero y declaraciones comparten un único fondo (`Stage.astro`) | Duplicar el `<video>` costaría dos decodificaciones simultáneas durante la transición. Un solo elemento fijado con `sticky` sirve a los dos bloques. |
| 24 | El hueso lo pinta `.stage__pin`, limitado a un viewport | Cuando el hueso cubría todo el escenario quedaba una capa `#f7f7f5` superpuesta al texto blanco de las declaraciones. No era un tecnicismo de la herramienta: si la capa de tinta no llegara a pintarse, el texto sería blanco sobre hueso. |
| 25 | GSAP retirado por completo | Su única justificación era el pin del slider, que ya no existe. Lo que quedaba era un lector de progreso de 36.9 KB para tres líneas de aritmética. El bundle pasa de ≈40 KB a ≈1.1 KB. |
| 26 | El header deja de ser una barra: son widgets sueltos | Decisión del cliente sobre la referencia. Sin fondo ni desenfoque de extremo a extremo; el desenfoque vive dentro de cada widget. Como son claros sobre cualquier fondo, desaparece también el observer que recoloreaba el header sobre bloques oscuros. |
| 27 | Los widgets se alinean con el marco, no con la ventana | El header repite la geometría del hero (marco + container). Sin eso el logo quedaba `--pad-frame` a la izquierda del titular, que es lo que se veía desalineado. |
| 28 | Iluminación por palabras con `--ramp: 7` | Con un frente de una palabra el borde es un corte seco. Siete palabras de degradado reproducen la onda de lectura de la referencia. El frente viaja hasta `--n + --ramp` porque si parase en `--n` las últimas palabras nunca se encenderían del todo. |
| 29 | El troceo en palabras se hace en el servidor | En el cliente habría reflujo al hidratar, y sin JS el texto se quedaría sin partir. Cada declaración lleva además una copia intacta en `.sr-only`: leerla palabra por palabra sería insufrible. |
| 30 | El Trazado se muda a `/company#plataforma` | La reestructuración del hero lo dejó sin sitio. Ahí ilustraba la secuencia que describe el texto —entrada, transformación, validación, salida— en vez de hacer de fondo. **Revertida:** se retiró de `/company` a petición del cliente; los tres pilares ya dicen lo mismo en texto y la sección pasó de +815 px sobre la ventana a +181 px. El componente sigue en el repo, sin montar. |
| 31 | La paleta se deriva del logotipo: tinta de sello azul, señal azul claro | Con el logotipo de septiembre de 2026 (W en degradado azul) el sitio tenía dos señales cromáticas, el lima y el azul. Revierte la mitad del lima de la decisión 1; el negro del pie se mantiene. Se eligió entre tres direcciones (heredera pura, marina con ámbar, evolución conservadora): el ámbar se descartó porque en el sector público significa advertencia, y la heredera pura porque teñía también el lienzo claro y se leía como pantalla. Tinta desaturada y hueso cálido para que siga siendo papel y tinta. Vídeo y fotos reteñidos hacia el mismo azul. Los pilares (decisión 17) siguen llenando una tarjeta con la señal: en azul claro es un panel calmado, no un foco. |

---

## 12. Pendiente

- **Copy real.** Todo el contenido actual son placeholders específicos y plausibles. Cero lorem ipsum, cero texto de la referencia.
- **Razón social y NIT** para el footer y la política de privacidad.
- **Imágenes.** Falta la del bloque Compañía y la OG de 1200 × 630.
- **Política de Tratamiento de Datos Personales** (Ley 1581 de 2012): hace falta el texto legal aprobado por el cliente antes de publicar `/privacidad`.
- **Dominio canónico** — apex o www, una sola forma. Decisión pendiente.
