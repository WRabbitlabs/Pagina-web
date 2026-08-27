# WRabbit AI — sitio institucional

Sitio estático en Astro. Todo el contenido vive en archivos de datos y
colecciones tipadas; ningún componente lleva copy hardcodeado.

El sistema de diseño (tokens, escala, motion, decisiones) está en
[`DESIGN.md`](./DESIGN.md). Cualquier valor que aparezca en un componente y
no esté ahí es un bug.

---

## Requisitos

- Node **≥ 20.3**
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
    Trazado.astro          el signature — vive en /company#plataforma
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

`src/lib/contact.ts` es **el mismo módulo** en cliente y servidor: las reglas
no pueden divergir porque son el mismo código. El servidor valida siempre.

Defensas: honeypot (`sitio-web`), rate limiting por IP, sanitización que
elimina control chars, etiquetas HTML —incluido el contenido de `<script>`—
y saltos de línea en los campos que van a encabezados de correo.

Consentimiento de tratamiento de datos obligatorio (Ley 1581 de 2012). Sin
la casilla marcada, cliente y servidor rechazan el envío.

### ⚠ Rate limiting y despliegue

El rate limiting vive **en memoria del proceso** (`src/pages/api/contacto.ts`).
Sirve para una única instancia. Si el despliegue escala a varias réplicas o
a funciones serverless, hay que moverlo a un store compartido (Redis,
Upstash) o al rate limiting del proveedor. Está marcado en el código.

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

Todo el sitio se prerenderiza salvo `/api/contacto`, que declara
`prerender = false` porque el brief exige validación en el servidor.

Por defecto usa `@astrojs/node` en modo standalone:

```bash
npm run build
HOST=0.0.0.0 PORT=4321 node dist/server/entry.mjs
```

Para Vercel o Netlify, cambiar el adaptador en `astro.config.mjs`:

```js
import vercel from '@astrojs/vercel';
// …
adapter: vercel(),
```

Nada más del proyecto depende del adaptador.

### Dominio

`SITE_URL` en `astro.config.mjs` es la forma canónica: **apex, sin `www`**.
Configurar una redirección 301 de `www` al apex en el proveedor. De ese
valor salen el `canonical`, el sitemap y el JSON-LD.

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
