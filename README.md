# WRabbit AI Labs — sitio institucional

**Creado por Moshe Rafael Manrique.**

Sitio institucional de WRabbit AI Labs, compañía colombiana de automatización y
software dedicado para empresas reguladas, firmas de abogados y entidades del
Estado. Vive en **[wrailabs.com](https://wrailabs.com)**.

---

## Qué es esto

No es una landing de agencia. Es un sitio que **describe una compañía y su
método**, deliberadamente construido para no leerse como un folleto de ventas:
no hay precios, no hay testimonios, no hay cifras que la propia empresa se
adjudique, y ningún botón dice «agenda una demo». Lo que hay es una tesis, un
proceso explicado paso a paso, y evidencia publicada en el newsroom para que
cualquiera pueda revisarla antes de contratar.

Esa decisión no es estética. El comprador de WRabbit AI —un jefe de
cumplimiento, un socio de un bufete, un ordenador del gasto público— no compra
por entusiasmo: compra por trazabilidad. Un sitio que promete mucho y prueba
poco es exactamente el que ese comprador descarta.

### Lo que el sitio cuenta, en orden

1. **El hero** — la tesis de la compañía sobre un vídeo fijado, en un marco que
   se abre al cargar y se suelta a sangre completa al empezar a bajar.
2. **Qué hacemos** — tres declaraciones que se iluminan línea a línea con el
   scroll, con su contador `01/03`.
3. **La historia** — doscientos años de instrucciones perforadas, del telar de
   Jacquard al software, contados en tarjetas cuyos agujeros codifican cada año
   en binario. Explica el oficio antes de pedir nada.
4. **La plataforma** — el motor de ejecución auditable y sus tres pilares:
   integrar, ejecutar, dejar evidencia.
5. **El método** — las cuatro fases de un encargo, con sus plazos.
6. **Gobierno continuo** — una consola oscura que enseña la forma de la
   operación: qué se registra y cómo se ve mientras corre.
7. **La compañía, el newsroom y el cierre.**

### Cómo está construido

| | |
|---|---|
| **Framework** | Astro 7 — HTML pre-construido, islas de JavaScript mínimas |
| **Estilos** | CSS nativo con custom properties y `@layer`. Sin Tailwind, sin frameworks de UI |
| **Tipografía** | `.woff2` alojadas en el propio dominio, sin llamadas a Google Fonts |
| **Imágenes** | AVIF y WebP con `srcset`, generadas en el build |
| **Movimiento** | CSS y ~24 KB de JavaScript propio. Cero librerías de animación |
| **Despliegue** | GitHub Pages — once archivos HTML servidos desde el CDN |

Dos reglas gobiernan el código y no se negocian:

- **Cero valores escritos a mano en los componentes.** Todo color, medida,
  duración y curva sale de un token en `src/styles/tokens.css`. Un valor suelto
  dentro de un componente es un bug, no una excepción.
- **Cero contenido dentro de los componentes.** Todo el texto vive en
  `src/data/*` o en colecciones tipadas de `src/content/*`. Un componente sabe
  cómo se ve algo; nunca qué dice.

El sistema de diseño completo —escala tipográfica, ritmo vertical, motion,
y la bitácora de cada decisión con su porqué— está en
[`DESIGN.md`](./DESIGN.md).

### Accesibilidad y rendimiento

WCAG 2.1 AA, verificado sobre el build de producción y no sobre el servidor de
desarrollo: navegación completa por teclado, foco visible propio, trampa de
foco en el menú móvil, y un modo `prefers-reduced-motion` en el que el texto
nunca depende de la animación para leerse. Lighthouse móvil da 100 en las
cuatro categorías en las siete rutas. Los números están en
[Verificado](#verificado).

---

## Requisitos

- Node **≥ 22.12** — lo exige Astro 7, no el proyecto. Está fijado en
  `.nvmrc` para que el constructor de Cloudflare no elija uno más viejo.
- npm 10+

## Arrancar

```bash
npm install
npm run dev
```

`npm install` ejecuta `scripts/fonts.mjs` en `postinstall`, que copia los
`.woff2` desde `node_modules` a `public/fonts/` junto con sus licencias.
Esos archivos **no se versionan**: se regeneran solos.

Los assets de imagen (imagen de Compañía, OG, favicons, manifest,
`robots.txt`) se generan con:

```bash
node scripts/assets.mjs
```

Son **placeholders geométricos** construidos con el lenguaje del sistema. Se
generan una vez y se versionan. Al recibir los assets reales del cliente, se
reemplazan y este script deja de hacer falta.

La fotografía viene aparte, de Openverse:

```bash
npm run photos
```

### ⚠ Atribución obligatoria

`src/assets/CREDITOS.md` lista la procedencia de cada imagen. **Dos de ellas
son CC-BY**, no CC0: permiten uso comercial pero **exigen atribución visible**.
Son las dos de archivo documental, de The National Archives (Reino Unido).

**El crédito ya está puesto**: una línea en el pie, con enlace a la licencia.
El texto vive en `site.imageCredit` (`src/data/site.ts`), como todo el copy.

Si se prefiere el pie sin esa línea, hay que sustituir esas dos imágenes por
material CC0 o por fotografía propia del cliente, y entonces borrar
`site.imageCredit`. Lo que **no** es una opción es quitar la línea dejando las
imágenes: publicarlas sin crédito incumple la licencia.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Copia fuentes, corre `astro check` y compila a `dist/` |
| `npm run preview` | Sirve el build |
| `npm run fonts` | Solo copia las fuentes |
| `npm run hero:video` | Prepara el vídeo del hero desde el archivo del generador |
| `npm run photos` | Descarga la fotografía y regenera `CREDITOS.md` |

### Vídeo del hero

El fondo del hero es un vídeo en bucle ping-pong. El prompt para generarlo con
una IA está en [`PROMPT-VIDEO.md`](./PROMPT-VIDEO.md). Con el archivo en mano:

```bash
npm run hero:video -- ruta/al/video.mp4
```

Sin argumento coge el vídeo más reciente de la carpeta de Descargas. El script
hornea el ping-pong, genera MP4, WebM y póster en `public/video/`, y deja las
rutas apuntadas en `src/data/home.ts`. Usa `ffmpeg-static`, así que no hace
falta ffmpeg en el sistema.

**Mientras no exista el archivo** el marco lo rellena `Campo.astro`, un canvas
generativo. Poner las tres rutas de `hero.media` a `null` vuelve a ese estado.

## Estructura

```
src/
  content.config.ts        colecciones tipadas (newsroom, team)
  content/
    newsroom/*.md          artículos — orden por fecha descendente
    team/*.md              equipo — orden por campo `order`
  data/
    site.ts                razón social, NIT, navegación, redes
    home.ts                todo el copy de la home
  lib/
    contact.ts             validación del formulario (cliente + servidor)
    newsroom.ts            orden, formato de fecha, destacado/compactos
  layouts/Base.astro       head, OG, JSON-LD, skip link, header, footer
  components/
    Header.astro           widgets flotantes: marca y navegación
    Trazado.astro          el signature — sin montar hoy; ver DESIGN.md §8
    home/
      Stage.astro          fondo de vídeo compartido por hero y declaraciones
      Hero.astro           solo contenido; el marco lo pone Stage
      Statements.astro     las 3 declaraciones que se iluminan al scrollear
      Campo.astro          canvas generativo: suplente del vídeo
    icons/PillarIcon.astro set de iconos de pilar
  scripts/reveal.ts        reveals al scroll (IntersectionObserver)
  styles/
    tokens.css             @layer tokens — la fuente de verdad
    reset.css              @layer reset
    base.css               @layer base
  pages/
    index.astro            /
    company.astro          /company
    newsroom/              /newsroom y /newsroom/[slug]
    contact.astro          /contact
    privacidad.astro       /privacidad     ⚠ borrador legal
    terminos.astro         /terminos       ⚠ borrador legal
    404.astro              /404
    api/contacto.ts        endpoint del formulario (única ruta con servidor)
```

## Contenido

**Newsroom.** Un `.md` por artículo en `src/content/newsroom/`. El schema
está en `src/content.config.ts` y valida en build: si falta un campo o una
imagen no trae `alt`, el build falla.

```yaml
---
title: 'Título del artículo'
category: 'Publicación'          # Publicación | Anuncio | Prensa
date: 2026-08-06
excerpt: 'Dos o tres líneas.'
featured: true                   # el destacado del índice
image: '../../assets/mi-imagen.png'   # opcional
imageAlt: 'Descripción real.'         # obligatorio si hay image
externalUrl: 'https://…'         # opcional: no genera página propia
draft: false                     # los borradores no salen en producción
---
```

El orden es siempre por fecha descendente, automático. El destacado es el
más reciente marcado `featured`.

**Equipo.** Un `.md` por persona en `src/content/team/`, ordenado por
`order`. `founder: true` lo agrupa bajo "Fundadores".

**Copy de la home.** Todo en `src/data/home.ts`.

## Formulario de contacto

`src/lib/contact.ts` valida en el navegador: errores por campo, foco al primero
que falla, y consentimiento obligatorio.

Defensas que se quedan: el honeypot (`sitio-web`) y la sanitización que elimina
control chars, etiquetas HTML —incluido el contenido de `<script>`— y saltos de
línea. Lo que se fue con el endpoint es el límite por IP y la validación de
servidor; queda anotado en [`DEPLOY.md`](./DEPLOY.md).

Consentimiento de tratamiento de datos obligatorio (Ley 1581 de 2012). Sin
la casilla marcada, cliente y servidor rechazan el envío.

## Variables de entorno

Copiar `.env.example` a `.env`. Con `MAIL_PROVIDER=log` (por defecto) los
mensajes solo se imprimen en consola: útil para probar la validación sin
enviar nada.

| Variable | Para qué |
|---|---|
| `CONTACT_TO_EMAIL` | Destinatario del formulario |
| `MAIL_PROVIDER` | `log` o `resend` |
| `RESEND_API_KEY` | Solo si `MAIL_PROVIDER=resend` |
| `MAIL_FROM` | Remitente |
| `RATE_LIMIT_MAX` | Envíos por ventana e IP (por defecto 5) |
| `RATE_LIMIT_WINDOW_MS` | Ventana en ms (por defecto 900000) |

## Despliegue

**GitHub Pages.** El sitio es estático puro: once archivos HTML y nada que
ejecutar. Cada empujón a `main` construye y publica solo.

Y conviene decirlo porque el nombre confunde: «estático» describe cómo llega el
HTML al navegador, **no si la página se mueve**. Todas las animaciones son CSS
y JavaScript de cliente y funcionan igual. De hecho van mejor: el HTML sale de
un CDN sin que ningún proceso lo genere, así que pinta antes.

La renuncia es el formulario de contacto, que tenía endpoint propio y ya no lo
tiene. La validación por campo sobrevive —siempre corrió en el navegador— y lo
que falta es quién recibe el mensaje: un servicio de formularios, con su
dirección en `PUBLIC_FORM_ENDPOINT`. Sin esa variable, `/contact` enseña los
canales directos en vez de un formulario que no envía a ninguna parte.

El paso a paso completo, el DNS y lo que falta antes de abrirlo al público
están en [`DEPLOY.md`](./DEPLOY.md).

```bash
npm run build      # incluye astro check: un error de tipos no compila
```

### Dominio

`SITE_URL` en `astro.config.mjs` es la forma canónica: **`wrailabs.com`, apex y
sin `www`**. De ese único valor salen el `canonical`, el `og:url`, el sitemap y
el JSON-LD. Sale del entorno (`PUBLIC_SITE_URL`) para que las vistas previas de
Cloudflare no emitan enlaces absolutos al dominio de producción.

### El seguro de indexación

`site.indexable` en `src/data/site.ts` está en **`false`**. Mientras lo esté,
cada página emite `noindex, nofollow` y `robots.txt` responde `Disallow: /`. El
sitio se puede enseñar por enlace pero no se encuentra buscando.

Es deliberado: hay datos de relleno publicados —NIT, teléfono, dirección— y dos
páginas legales que se declaran borrador. Nada de eso debe acabar en un índice.
Se abre poniéndolo en `true`, y las condiciones para hacerlo están en
[`DEPLOY.md`](./DEPLOY.md).

## Verificado

Medido sobre el build de producción, no sobre el dev server.

**Lighthouse móvil (throttling simulado) — las 7 rutas:**

| Ruta | Perf | A11y | BP | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 1.7 s |
| `/company` | 100 | 100 | 100 | 100 | 1.7 s |
| `/newsroom` | 100 | 100 | 100 | 100 | 1.5 s |
| `/newsroom/[slug]` | 100 | 100 | 100 | 100 | 1.4 s |
| `/contact` | 100 | 100 | 100 | 100 | 1.5 s |
| `/privacidad` | 100 | 100 | 100 | 100 | 1.5 s |
| `/terminos` | 100 | 100 | 100 | 100 | 1.5 s |

CLS 0 y TBT 0 ms en todas. Cero auditorías en rojo.

- **JS: ≈1.1 KB gzip.** Cero dependencias de terceros en el cliente.
- Cero scroll horizontal entre 320 y 1920 px.
- Zoom 200 % sin desbordes ni texto cortado.
- Navegación completa por teclado; foco visible propio en todo elemento
  interactivo; skip link como primer elemento enfocable.
- Menú mobile: trap de foco en ambas direcciones, `Escape` cierra, scroll
  del body bloqueado, foco devuelto al botón.
- Declaraciones: el frente de iluminación avanza con el scroll y el bloque
  cambia en el tercio correspondiente; contador y `aria-hidden` siguen al
  índice vigente.
- `prefers-reduced-motion` y `html:not(.js)`: las tres declaraciones quedan
  apiladas, visibles y completamente iluminadas; el marco no se abre. El
  texto nunca depende de la animación.
- Formulario probado punta a punta: validación por campo, consentimiento
  obligatorio, honeypot silencioso, sanitización, rate limiting, 405 en
  métodos no permitidos.
- 8/8 títulos y descripciones únicos; `canonical`, OG y Twitter Card en
  todas las páginas; JSON-LD `Organization` + `WebSite` en la home y
  `Article` en cada entrada; `/404` responde con status 404 real.

## Pendiente del cliente

- Copy real. Lo actual son placeholders específicos, sin lorem ipsum y sin
  texto tomado de ninguna referencia.
- Razón social, NIT, dirección y teléfono reales en `src/data/site.ts`.
- Perfiles de LinkedIn y X reales.
- Biografías del equipo.
- Assets definitivos: imagen de Compañía, imágenes de artículos y OG.
- **Textos legales revisados por abogado.** `/privacidad` y `/terminos` son
  borradores con la estructura que exige la norma, no textos aprobados.

---

## Autoría

Creado por **Moshe Rafael Manrique**.

Diseño, arquitectura de contenido, sistema visual e implementación. El registro
de cada decisión de diseño, con su porqué y sus alternativas descartadas, está
en la bitácora de [`DESIGN.md`](./DESIGN.md).

La fotografía de archivo procede de Openverse; las licencias, autores y
orígenes de cada imagen están en
[`src/assets/CREDITOS.md`](./src/assets/CREDITOS.md). Una de ellas es CC-BY y
lleva su atribución bajo la propia foto, en el artículo que la publica.
