/**
 * Vectoriza la marca y genera toda la cadena de iconos.
 *
 *   node scripts/logo.mjs "<ruta del png>"
 *
 * La marca de septiembre de 2026 es el conejo corriendo con la W: el conejo
 * en trazo negro, la W, la cola y los píxeles en azul. El director la entregó
 * como PNG con fondo transparente y un halo azul difuso alrededor, y solo en
 * negro: no pudo hacer la versión blanca. Aquí no hace falta que la haga.
 *
 * El archivo se separa en dos capas por color, y cada una se traza a vector
 * por su cuenta:
 *
 *   - lo oscuro (el conejo y el ojo) se rellena con `currentColor`, así que es
 *     negro sobre claro y blanco sobre oscuro sin un segundo archivo: la
 *     cabecera cambia de tinta al cruzar del hero al fondo claro y el conejo
 *     la sigue;
 *   - lo azul (la W, la cola y los píxeles) lleva su propio degradado, que es
 *     el mismo sobre cualquier fondo.
 *
 * El halo se descarta: solo entran los píxeles opacos (alpha ≥ 128). Los dos
 * trazados comparten el mismo recorte, así que encajan sin desplazamiento.
 *
 * Genera:
 *   src/components/icons/RabbitMark.astro   el símbolo, dos trazados
 *   public/icon.svg                          favicon vectorial
 *   public/favicon.ico                       32×32
 *   public/apple-touch-icon.png              180×180
 *   public/icon-192.png  ·  public/icon-512.png
 *   ../Logo/wr-ai-negro.svg · wr-ai-blanco.svg · y sus PNG   (para uso fuera de la web)
 */
import sharp from 'sharp';
import potrace from 'potrace';
import { optimize } from 'svgo';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
if (!src) {
  console.error('uso: node scripts/logo.mjs "<ruta del png del logo>"');
  process.exit(1);
}

const INK = '#222f30';
const PAPER = '#ffffff';
/* El degradado del azul, de izquierda a derecha: los píxeles y el pie de la W
   van en el azul profundo; la cola, en el claro. */
const AZUL = ['#123e9e', '#1a6fd8', '#2aa2f5'];

/* ------------------------------------------------------------------ */
/* 1. Dos capas por color, un solo recorte                             */
/* ------------------------------------------------------------------ */

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

const dark = Buffer.alloc(W * H, 255);
const blue = Buffer.alloc(W * H, 255);
let x0 = W;
let y0 = H;
let x1 = -1;
let y1 = -1;
let nDark = 0;
let nBlue = 0;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 128) continue; // el halo, fuera
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    let capa = null;
    if (sat < 70 && lum < 130) capa = dark;
    else if (b > r + 30 && b >= g) capa = blue;
    if (!capa) continue;
    capa[y * W + x] = 0;
    if (capa === dark) nDark++;
    else nBlue++;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
}
if (x1 < 0) throw new Error('no se encontró ningún trazo: ¿es el archivo correcto?');

const box = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
console.log(`[logo] capas: ${nDark} px oscuros, ${nBlue} px azules; recorte ${box.width}×${box.height}`);

const bitmap = (buf) =>
  sharp(buf, { raw: { width: W, height: H, channels: 1 } }).extract(box).png().toBuffer();

/* ------------------------------------------------------------------ */
/* 2. Vectorizar                                                       */
/* ------------------------------------------------------------------ */

const trace = (png, opts) =>
  new Promise((res, rej) => {
    potrace.trace(
      png,
      {
        turdSize: 2,
        optCurve: true,
        optTolerance: 0.2,
        threshold: 128,
        color: 'currentColor',
        background: 'transparent',
        ...opts,
      },
      (err, svg) => (err ? rej(err) : res(svg)),
    );
  });

/*
 * `floatPrecision` va en `convertPathData`: el path se incrusta en la
 * cabecera de todas las páginas, así que cada decimal de más viaja en todas.
 * A los 30 px de alto que mide ahí, el primer decimal ya sobra.
 */
const clean = (svg) =>
  optimize(svg, {
    multipass: true,
    plugins: [
      { name: 'preset-default', params: { overrides: { convertPathData: { floatPrecision: 1 } } } },
    ],
  }).data;

const pathOf = (svg) => {
  const d = svg.match(/ d="([^"]+)"/)?.[1];
  if (!d) throw new Error('el trazado no devolvió ningún path');
  return d;
};

/* El conejo es curva orgánica: suavizado normal. Los píxeles son cuadrados y
   la W es recta: menos suavizado para que las esquinas sigan siendo esquinas. */
const svgDark = clean(await trace(await bitmap(dark), { alphaMax: 1 }));
const svgBlue = clean(await trace(await bitmap(blue), { alphaMax: 0.5 }));

const vb = svgDark.match(/viewBox="([^"]+)"/)?.[1] ?? `0 0 ${box.width} ${box.height}`;
const dDark = pathOf(svgDark);
const dBlue = pathOf(svgBlue);
console.log(
  `[logo] vectorizado: viewBox ${vb}; conejo ${(dDark.length / 1024).toFixed(1)} KB, azul ${(dBlue.length / 1024).toFixed(1)} KB`,
);

/* ------------------------------------------------------------------ */
/* 3. El componente                                                    */
/* ------------------------------------------------------------------ */

await mkdir(join(root, 'src', 'components', 'icons'), { recursive: true });

const component = `---
/**
 * La marca: el conejo corriendo con la W.
 *
 * GENERADO por scripts/logo.mjs a partir del PNG del director. No se edita a
 * mano: se vuelve a generar.
 *
 * Dos trazados. El conejo se rellena con \`currentColor\`, así que es negro
 * sobre claro y blanco sobre oscuro sin un segundo archivo: sigue el cambio de
 * tinta de la cabecera al cruzar del hero al fondo claro. La W, la cola y los
 * píxeles llevan su degradado azul, que es el mismo sobre cualquier fondo.
 *
 * El id del degradado se genera por instancia: la cabecera y la pantalla de
 * entrada dibujan la marca en la misma página, y dos \`<linearGradient>\` con
 * el mismo id harían que la segunda dependiera de la primera.
 *
 * Por defecto es decorativo —el nombre va al lado, en texto— y solo toma
 * \`title\` cuando aparece sin él.
 */
interface Props {
  /** Alto en px. El ancho sale de la proporción (${box.width}:${box.height}). */
  size?: number;
  /** Nombre accesible. Sin él, el símbolo es decorativo. */
  title?: string;
  class?: string;
}

const { size = 24, title, class: className } = Astro.props;
const gradId = \`wr-azul-\${Math.random().toString(36).slice(2, 8)}\`;
---

<svg
  class={className}
  viewBox="${vb}"
  height={size}
  fill="currentColor"
  role={title ? 'img' : undefined}
  aria-hidden={title ? undefined : 'true'}
  focusable="false"
  xmlns="http://www.w3.org/2000/svg"
>
  {title && <title>{title}</title>}
  <defs>
    <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${AZUL[0]}" />
      <stop offset="0.55" stop-color="${AZUL[1]}" />
      <stop offset="1" stop-color="${AZUL[2]}" />
    </linearGradient>
  </defs>
  <path d="${dBlue}" fill={\`url(#\${gradId})\`} fill-rule="evenodd" />
  <path d="${dDark}" fill-rule="evenodd" />
</svg>
`;

await writeFile(join(root, 'src', 'components', 'icons', 'RabbitMark.astro'), component);

/* ------------------------------------------------------------------ */
/* 4. SVG sueltos: la marca en negro y en blanco, con el azul           */
/* ------------------------------------------------------------------ */

const [, , vbW, vbH] = vb.split(/\s+/).map(Number);

const marca = (tinta, { ancho = vbW, alto = vbH, ox = 0, oy = 0, fondo = null, radio = 0 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}" width="${ancho}" height="${alto}">` +
  `<defs><linearGradient id="azul" x1="0" y1="0" x2="1" y2="0">` +
  `<stop offset="0" stop-color="${AZUL[0]}"/><stop offset="0.55" stop-color="${AZUL[1]}"/><stop offset="1" stop-color="${AZUL[2]}"/>` +
  `</linearGradient></defs>` +
  (fondo ? `<rect width="${ancho}" height="${alto}" rx="${radio}" fill="${fondo}"/>` : '') +
  `<g transform="translate(${ox} ${oy})">` +
  `<path d="${dBlue}" fill="url(#azul)" fill-rule="evenodd"/>` +
  `<path d="${dDark}" fill="${tinta}" fill-rule="evenodd"/>` +
  `</g></svg>`;

const salida = join(root, '..', 'Logo');
await mkdir(salida, { recursive: true });
const negro = marca('#000000');
const blanco = marca(PAPER);
await writeFile(join(salida, 'wr-ai-negro.svg'), negro);
await writeFile(join(salida, 'wr-ai-blanco.svg'), blanco);

const png = (svg, ancho) =>
  sharp(Buffer.from(svg), { density: 384 }).resize({ width: ancho }).png({ compressionLevel: 9 }).toBuffer();

await writeFile(join(salida, 'wr-ai-negro.png'), await png(negro, 2000));
await writeFile(join(salida, 'wr-ai-blanco.png'), await png(blanco, 2000));
/* El blanco sobre transparente no se ve en un visor claro: una copia sobre
   tinta para poder mirarlo. */
const margen = vbW * 0.08;
await writeFile(
  join(salida, 'wr-ai-blanco-sobre-oscuro.png'),
  await png(
    marca(PAPER, { ancho: vbW + margen * 2, alto: vbH + margen * 2, ox: margen, oy: margen, fondo: INK }),
    2000,
  ),
);
console.log('[logo] Logo/: wr-ai-negro y wr-ai-blanco en SVG y PNG, más el blanco sobre oscuro');

/* ------------------------------------------------------------------ */
/* 5. Los iconos                                                       */
/* ------------------------------------------------------------------ */

/* Lienzo cuadrado con aire: un favicon pegado al borde se ve apretado. */
const pad = Math.max(vbW, vbH) * 0.12;
const side = Math.max(vbW, vbH) + pad * 2;
const svgIcon = marca(PAPER, {
  ancho: side,
  alto: side,
  ox: (side - vbW) / 2,
  oy: (side - vbH) / 2,
  fondo: INK,
  radio: side * 0.18,
});
await writeFile(join(root, 'public', 'icon.svg'), svgIcon);

const raster = (px) =>
  sharp(Buffer.from(svgIcon), { density: 384 }).resize(px, px).png({ compressionLevel: 9 }).toBuffer();

await writeFile(join(root, 'public', 'apple-touch-icon.png'), await raster(180));
await writeFile(join(root, 'public', 'icon-192.png'), await raster(192));
await writeFile(join(root, 'public', 'icon-512.png'), await raster(512));

/* .ico mínimo: una sola imagen PNG de 32×32 dentro del contenedor. */
const png32 = await raster(32);
const ico = Buffer.concat([
  Buffer.from([0, 0, 1, 0, 1, 0, 32, 32, 0, 0, 1, 0, 32, 0]),
  (() => {
    const b = Buffer.alloc(8);
    b.writeUInt32LE(png32.length, 0);
    b.writeUInt32LE(22, 4);
    return b;
  })(),
  png32,
]);
await writeFile(join(root, 'public', 'favicon.ico'), ico);

console.log('[logo] iconos: icon.svg, favicon.ico, apple-touch-icon, 192, 512');
