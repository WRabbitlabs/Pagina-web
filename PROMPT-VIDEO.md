# Prompt para generar el vídeo del hero

Pegar en Sora, Veo 3, Runway Gen-4, Kling o Luma Dream Machine.

> **Antes de generar, lee esto:** el bucle en el sitio es **ping-pong** (avanza,
> luego retrocede, sin parar). Se hornea en el archivo con ffmpeg — el paso está
> en §6. Por eso **el vídeo no necesita cerrar en bucle**: el último fotograma no
> tiene que empalmar con el primero, porque a partir de ahí se reproduce al
> revés y el empalme es exacto por construcción. Cerrar un bucle es la parte más
> difícil de sacar de un generador y aquí sobra. Genera un plano continuo y ya.

---

> **Paleta de septiembre de 2026.** El vídeo publicado se generó con el
> párrafo de color verde de abajo y después se llevó al azul del logotipo con
> un duotono de ffmpeg (`scripts/video-tinte.mjs`, aplicado por
> `scripts/hero-tint.mjs` sobre el archivo publicado). Para generar uno nuevo,
> sustituye en el prompt el párrafo «Colour:» por este, y `hero-video.mjs`
> aplicará además el mismo duotono, que es lo que garantiza un solo matiz:
>
> ```
> Colour: near-black background (#0a1225). The forms read as deep navy ink
> (#1a2a45) with a cool slate sheen (#465368). Edge highlights are a
> luminous pale blue (#7fc7f9), used sparingly — only where an edge
> catches light.
> ```

## 1. Prompt principal — copiar tal cual

```
Abstract 3D render of translucent liquid-glass ribbons drifting through
black void. Two or three broad, smooth surfaces curve and fold past each
other like sheets of blown glass caught mid-motion — organic, continuous,
never touching, never breaking.

Material: highly translucent frosted glass with subsurface scattering.
Thick in the body, razor-thin at the edges. Where an edge catches light it
flares into a fine chromatic rim; where two surfaces overlap the render
deepens and darkens. Soft internal caustics. No hard reflections, no
mirror finish, no visible light source.

Colour: near-black background (#0a0f0f). The forms read as deep
green-black ink (#222f30) with a cool graphite sheen (#4d5757). Edge
highlights are a luminous pale lime-green (#cef79e), used sparingly — only
on the thinnest rim of each fold, like bioluminescence. A single restrained
warm bronze note (#8a6a4a) appears where two surfaces cross, and nowhere
else. Overall the frame is dark and calm: at least 70% of the image is
near-black.

Camera: locked off. No shake, no handheld, no dolly, no zoom, no cuts. The
frame never moves — only the forms inside it do.

Motion: extremely slow and continuous, like heavy fluid in zero gravity.
One single unbroken take. Forms rotate and fold gently across the frame.
No pulsing, no strobing, no rapid change, no morphing between recognisable
shapes.

Style: minimalist, editorial, scientific. Feels like a laboratory
instrument, not a screensaver.
```

## 2. Negativo — pegar en el campo negative prompt

```
text, letters, numbers, watermark, logo, UI, interface, chart, diagram,
people, faces, hands, animals, plants, product, machinery, recognisable
objects, city, landscape, sky, water surface, fire, smoke, particles,
sparkles, glitter, lens flare, bokeh balls, camera shake, handheld, zoom,
dolly, cut, transition, fade to black, strobe, flicker, rapid motion,
neon, rainbow, saturated colours, purple, magenta, pink, blue, red,
orange, high contrast, harsh lighting, mirror reflection, chrome, metal,
low resolution, compression artifacts, banding
```

## 3. Parámetros técnicos

| Parámetro | Valor | Por qué |
|---|---|---|
| Relación | **1:1 (cuadrado)** | El hero recorta a 16:9 en escritorio y casi 9:16 en móvil. Un cuadrado sobrevive a los dos recortes; un 16:9 se queda sin alto en móvil. |
| Resolución | **2160 × 2160** mínimo | Es lo que usa la referencia. Se reescala hacia abajo, nunca hacia arriba. |
| Duración | **10–14 s** | Con ping-pong rinde 20–28 s de movimiento percibido. |
| Fotogramas | 24 o 30 fps | Por encima de 30 no se nota y pesa. |
| Audio | **ninguno** | Se reproduce en silencio y `muted` es obligatorio para el autoplay. |
| Movimiento | el más lento que permita | Si el generador tiene "motion strength", ponlo al mínimo. |

## 4. Qué descartar al revisar el resultado

Rechaza la toma si aparece cualquiera de estas — no las arregles en post:

1. La cámara se mueve, tiembla o hace zoom.
2. Hay un corte, un fundido o un salto a mitad del plano.
3. Se reconoce un objeto (una gota, una flor, un ojo, una mano).
4. El color se sale a violeta, azul o magenta saturado.
5. La imagen se aclara: si el fondo deja de ser casi negro, el titular blanco
   encima deja de leerse y rompe el contraste AA.
6. Aparecen partículas, destellos o brillos tipo purpurina.

Genera 3 o 4 tomas y quédate con la más **aburrida** de las que cumplan.
En un hero, el fondo que no llama la atención es el que funciona.

## 5. Variante violeta

Si prefieres el violeta de la referencia de iOS en vez de la paleta de marca,
sustituye el párrafo de color por:

```
Colour: pure black background. Forms in deep violet and indigo with
luminous magenta and cyan edge highlights, iridescent and glassy.
```

**El coste:** el sistema entero se sostiene sobre un único acento (`#cef79e`)
sobre neutros. Un vídeo violeta mete un segundo color dominante y el verde de
los botones y los puntos pasa a leerse como un error, no como una señal. Es
tu decisión, pero si vamos por ahí hay que repintar el acento en todo el
sitio para que no choque.

## 6. Entrega

**Paso 1 — hornear el ping-pong.** Concatena la toma con su propia versión
invertida. El empalme es exacto porque el último fotograma de la ida es el
primero de la vuelta:

```bash
ffmpeg -i entrada.mov -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[out]" -map "[out]" -an public/video/hero-loop.mov
```

**Paso 2 — convertir al MP4 que espera el sitio:**

```bash
ffmpeg -i public/video/hero-loop.mov -an -vf "scale=1440:1440" -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart public/video/hero.mp4
```

Y la versión WebM, más ligera, para los navegadores que la aceptan:

```bash
ffmpeg -i public/video/hero-loop.mov -an -vf "scale=1440:1440" -c:v libvpx-vp9 -crf 34 -b:v 0 public/video/hero.webm
```

También hace falta un póster — el primer fotograma, que es lo que se ve
mientras el vídeo carga:

```bash
ffmpeg -i public/video/hero.mp4 -frames:v 1 -q:v 2 public/video/hero-poster.jpg
```
