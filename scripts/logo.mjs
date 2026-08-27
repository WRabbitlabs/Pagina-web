/**
 * Vectoriza la marca del conejo y genera toda la cadena de iconos.
 *
 *   node scripts/logo.mjs "<ruta del jpeg>"
 *
 * El cliente entregó dos JPEG de 1024×1024, uno con el trazo negro y otro con
 * el blanco, ambos «sin fondo». No lo estaban: JPEG no admite transparencia,
 * así que el tablero de ajedrez que marca la transparencia venía **pintado
 * dentro del archivo**. Era un dibujo de la transparencia, no transparencia.
 *
 * La separación tonal sí era limpia —el histograma da 0 puro para el trazo y
 * 208/240 para el tablero— así que se umbraliza en 100, se traza a vector y
 * se descarta el original.
 *
 * Con la marca en SVG el segundo archivo sobra: el trazo hereda `currentColor`,
 * así que el mismo símbolo sirve sobre claro y sobre oscuro. Ese era el motivo
 * de entregar dos versiones.
 *
 * Genera:
 *   src/components/icons/RabbitMark.astro   el símbolo, con currentColor
 *   public/icon.svg                          favicon vectorial
 *   public/favicon.ico                       32×32
 *   public/apple-touch-icon.png              180×180
 *   public/icon-192.png  ·  public/icon-512.png
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
  console.error('uso: node scripts/logo.mjs "<ruta del jpeg del logo>"');
  process.exit(1);
}

const INK = '#222f30';
const PAPER = '#ffffff';

/* ------------------------------------------------------------------ */
/* 1. Umbral: fuera el tablero, queda el trazo                         */
/* ------------------------------------------------------------------ */

const mono = sharp(src).greyscale().threshold(100);

/*
 * El recorte va calculado a mano y no con `sharp.trim()`: el JPEG trae ruido
 * de compresión en el borde que basta para que trim no encuentre un marco
 * uniforme y devuelva el lienzo entero. Recorrer los píxeles y quedarse con
 * la caja de los negros no falla.
 *
 * Importa porque el original es una marca flotando en un cuadrado con mucho
 * aire: sin recortar, cada uso tendría que compensar ese margen a mano.
 */
const { data: px, info } = await mono.clone().raw().toBuffer({ resolveWithObject: true });
let x0 = info.width;
let y0 = info.height;
let x1 = -1;
let y1 = -1;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (px[y * info.width + x] < 128) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
}
if (x1 < 0) throw new Error('no se encontró ningún trazo: ¿el umbral es el correcto?');

const bitmap = await mono
  .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
  .png()
  .toBuffer();

const { width, height } = await sharp(bitmap).metadata();
console.log(`[logo] trazo aislado: ${width}×${height} (recortado de ${info.width}×${info.height})`);

/* ------------------------------------------------------------------ */
/* 2. Vectorizar                                                       */
/* ------------------------------------------------------------------ */

const traced = await new Promise((res, rej) => {
  potrace.trace(
    bitmap,
    {
      // El original es geometría de líneas rectas, no una silueta orgánica:
      // sin suavizado de esquinas los vértices salen como los dibujó su autor.
      alphaMax: 0,
      turdSize: 2,
      optCurve: true,
      optTolerance: 0.2,
      threshold: 128,
      color: 'currentColor',
      background: 'transparent',
    },
    (err, svg) => (err ? rej(err) : res(svg)),
  );
});

/*
 * `floatPrecision` va en `convertPathData`, no en `cleanupNumericValues`: el
 * segundo redondea los atributos sueltos y deja el `d` intacto. Y no es
 * cosmético. El path se incrusta en el header, que
 * está en las once páginas, así que cada decimal de más viaja once veces.
 * Potrace saca tres decimales sobre un viewBox de 438×684: a los 26px que mide
 * en el header, y aun a 512 en el icono, el tercer decimal es medio milésimo
 * de píxel. Bajar a uno recorta el path a la mitad sin que se note.
 */
const { data: clean } = optimize(traced, {
  multipass: true,
  plugins: [
    { name: 'preset-default', params: { overrides: { convertPathData: { floatPrecision: 1 } } } },
  ],
});

/* El viewBox real, para que quien lo use no tenga que adivinarlo. */
const vb = clean.match(/viewBox="([^"]+)"/)?.[1] ?? `0 0 ${width} ${height}`;
const path = clean.match(/ d="([^"]+)"/)?.[1];
if (!path) throw new Error('el trazado no devolvió ningún path');

/*
 * `evenodd` no es opcional.
 *
 * Potrace devuelve los doce subtrazos de la marca en un solo path: los
 * contornos exteriores y los interiores mezclados. Con la regla de relleno
 * por defecto (`nonzero`) los interiores no calan y las orejas y la cara
 * salen macizas — la marca deja de ser línea y se vuelve silueta.
 */

console.log(`[logo] vectorizado: viewBox ${vb}, ${(path.length / 1024).toFixed(1)} KB de path`);

/* ------------------------------------------------------------------ */
/* 3. El componente                                                    */
/* ------------------------------------------------------------------ */

await mkdir(join(root, 'src', 'components', 'icons'), { recursive: true });

const component = `---
/**
 * La marca: el conejo con el circuito bajo la barbilla.
 *
 * GENERADO por scripts/logo.mjs a partir del JPEG del cliente. No se edita a
 * mano: se vuelve a generar.
 *
 * Rellena con \`currentColor\`, así que el mismo símbolo sirve sobre claro y
 * sobre oscuro sin un segundo archivo. Por defecto es decorativo —el nombre
 * de la agencia va al lado, en texto— y solo toma \`title\` cuando aparece sin
 * él.
 */
interface Props {
  /** Alto en px. El ancho sale de la proporción. */
  size?: number;
  /** Nombre accesible. Sin él, el símbolo es decorativo. */
  title?: string;
  class?: string;
}

const { size = 24, title, class: className } = Astro.props;
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
  <path d="${path}" fill-rule="evenodd" />
</svg>
`;

await writeFile(join(root, 'src', 'components', 'icons', 'RabbitMark.astro'), component);

/* ------------------------------------------------------------------ */
/* 4. Los iconos                                                       */
/* ------------------------------------------------------------------ */

const [, , vbW, vbH] = vb.split(/\s+/).map(Number);
/* Lienzo cuadrado con aire: un favicon pegado al borde se ve apretado. */
const pad = Math.max(vbW, vbH) * 0.16;
const side = Math.max(vbW, vbH) + pad * 2;
const ox = (side - vbW) / 2;
const oy = (side - vbH) / 2;

const icon = (bg, fg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" width="${side}" height="${side}">` +
  `<rect width="${side}" height="${side}" rx="${side * 0.18}" fill="${bg}"/>` +
  `<g transform="translate(${ox} ${oy})" fill="${fg}">` +
  `<path d="${path}" fill-rule="evenodd"/></g></svg>`;

const svgIcon = icon(INK, PAPER);
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
