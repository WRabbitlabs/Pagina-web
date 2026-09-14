/**
 * Vectoriza la marca y genera toda la cadena de iconos.
 *
 *   node scripts/logo.mjs "<ruta del png>" ["<carpeta para los archivos de marca>"]
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
 *   - lo azul (la W, la cola y los píxeles) lleva su propio degradado. Sobre
 *     tinta el azul profundo se apaga, así que las paradas leen las variables
 *     --marca-azul-0/1/2 con el azul original como valor por defecto: quien
 *     ponga la marca sobre fondo oscuro (cabecera sobre el hero, pantalla de
 *     entrada) define una paleta más clara y el símbolo no cambia.
 *
 * El halo se descarta: solo entran los píxeles opacos (alpha ≥ 128). Los dos
 * trazados comparten el mismo recorte, así que encajan sin desplazamiento.
 *
 * Genera siempre:
 *   src/components/icons/RabbitMark.astro   el símbolo, dos trazados
 *   public/icon.svg                          favicon vectorial
 *   public/favicon.ico                       32×32
 *   public/apple-touch-icon.png              180×180
 *   public/icon-192.png  ·  public/icon-512.png
 *
 * Y solo si se pasa la carpeta como segundo argumento (para uso fuera de la
 * web; no se versiona con el sitio):
 *   wr-ai-negro.svg · wr-ai-blanco.svg · sus PNG · wr-ai-blanco-sobre-oscuro.png
 */
import sharp from 'sharp';
import potrace from 'potrace';
import { optimize } from 'svgo';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
const carpetaMarca = process.argv[3];
if (!src) {
  console.error('uso: node scripts/logo.mjs "<ruta del png del logo>" ["<carpeta de marca>"]');
  process.exit(1);
}

const INK = '#222f30';
const PAPER = '#ffffff';
/* El degradado del azul, de izquierda a derecha: los píxeles y el pie de la W
   van en el azul profundo; la cola, en el claro. Las paradas van en el mismo
   sitio en todas las salidas. */
const AZUL = ['#123e9e', '#1a6fd8', '#2aa2f5'];
const PARADAS = [0, 0.55, 1];

/* ------------------------------------------------------------------ */
/* 1. Dos capas por color, un solo recorte                             */
/* ------------------------------------------------------------------ */

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const ancho = info.width;
const alto = info.height;

const oscuro = Buffer.alloc(ancho * alto, 255);
const azul = Buffer.alloc(ancho * alto, 255);
let x0 = ancho;
let y0 = alto;
let x1 = -1;
let y1 = -1;
let nOscuro = 0;
let nAzul = 0;

for (let y = 0; y < alto; y++) {
  for (let x = 0; x < ancho; x++) {
    const i = (y * ancho + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 128) continue; // el halo, fuera
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    let capa = null;
    if (sat < 70 && lum < 130) capa = oscuro;
    else if (b > r + 30 && b >= g) capa = azul;
    if (!capa) continue;
    capa[y * ancho + x] = 0;
    if (capa === oscuro) nOscuro++;
    else nAzul++;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
}
if (x1 < 0) throw new Error('no se encontró ningún trazo: ¿es el archivo correcto?');

const caja = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
console.log(`[logo] capas: ${nOscuro} px oscuros, ${nAzul} px azules; recorte ${caja.width}×${caja.height}`);

const bitmap = (buf) =>
  sharp(buf, { raw: { width: ancho, height: alto, channels: 1 } }).extract(caja).png().toBuffer();

/* ------------------------------------------------------------------ */
/* 2. Vectorizar                                                       */
/* ------------------------------------------------------------------ */

const trazar = (png, opciones) =>
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
        ...opciones,
      },
      (err, svg) => (err ? rej(err) : res(svg)),
    );
  });

/*
 * `floatPrecision` va en `convertPathData`: el path se incrusta en la
 * cabecera de todas las páginas, así que cada decimal de más viaja en todas.
 * A los 30 px de alto que mide ahí, el primer decimal ya sobra.
 */
const limpiar = (svg) =>
  optimize(svg, {
    multipass: true,
    plugins: [
      { name: 'preset-default', params: { overrides: { convertPathData: { floatPrecision: 1 } } } },
    ],
  }).data;

const trazadoDe = (svg) => {
  const d = svg.match(/ d="([^"]+)"/)?.[1];
  if (!d) throw new Error('el trazado no devolvió ningún path');
  return d;
};

/* El conejo es curva orgánica: suavizado normal. Los píxeles son cuadrados y
   la W es recta: menos suavizado para que las esquinas sigan siendo esquinas. */
const dOscuro = trazadoDe(limpiar(await trazar(await bitmap(oscuro), { alphaMax: 1 })));
const dAzul = trazadoDe(limpiar(await trazar(await bitmap(azul), { alphaMax: 0.5 })));

/* Las dos capas se recortan con la misma caja, así que el viewBox es la caja. */
const vbW = caja.width;
const vbH = caja.height;
const vb = `0 0 ${vbW} ${vbH}`;
console.log(
  `[logo] vectorizado: viewBox ${vb}; conejo ${(dOscuro.length / 1024).toFixed(1)} KB, azul ${(dAzul.length / 1024).toFixed(1)} KB`,
);

/* ------------------------------------------------------------------ */
/* 3. El degradado, una sola definición para todas las salidas         */
/* ------------------------------------------------------------------ */

/**
 * Con `variables`, cada parada lee --marca-azul-N y cae al azul original: es
 * lo que usa el componente. Sin ellas, el color va fijo: SVG sueltos e iconos.
 */
const degradado = (id, { variables = false, sangria = '' } = {}) => {
  const paradas = AZUL.map((color, i) =>
    variables
      ? `<stop offset="${PARADAS[i]}" style="stop-color: var(--marca-azul-${i}, ${color})" />`
      : `<stop offset="${PARADAS[i]}" stop-color="${color}"/>`,
  );
  return (
    `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">` +
    (sangria ? `\n${sangria}  ` : '') +
    paradas.join(sangria ? `\n${sangria}  ` : '') +
    (sangria ? `\n${sangria}` : '') +
    `</linearGradient>`
  );
};

/* ------------------------------------------------------------------ */
/* 4. El componente                                                    */
/* ------------------------------------------------------------------ */

await mkdir(join(root, 'src', 'components', 'icons'), { recursive: true });

const componente = `---
/**
 * La marca: el conejo corriendo con la W.
 *
 * GENERADO por scripts/logo.mjs a partir del PNG del director. No se edita a
 * mano: se vuelve a generar.
 *
 * Dos trazados. El conejo se rellena con \`currentColor\`, así que es negro
 * sobre claro y blanco sobre oscuro sin un segundo archivo: sigue el cambio de
 * tinta de la cabecera al cruzar del hero al fondo claro. La W, la cola y los
 * píxeles llevan su degradado azul; cada parada lee --marca-azul-N y cae al
 * azul original del logotipo, así que quien ponga la marca sobre tinta puede
 * aclararla desde CSS (ver Header.astro y Base.astro) sin tocar el símbolo.
 *
 * El id del degradado sale de la prop \`id\`: la cabecera y la pantalla de
 * entrada dibujan la marca en la misma página, y dos \`<linearGradient>\` con
 * el mismo id harían que la segunda dependiera de la primera.
 *
 * Por defecto es decorativo —el nombre va al lado, en texto— y solo toma
 * \`title\` cuando aparece sin él.
 */
interface Props {
  /** Alto en px. El ancho sale de la proporción (${vbW}:${vbH}). */
  size?: number;
  /** Nombre accesible. Sin él, el símbolo es decorativo. */
  title?: string;
  class?: string;
  /** Distingue el degradado cuando la marca aparece más de una vez por página. */
  id?: string;
}

const { size = 24, title, class: className, id = 'marca' } = Astro.props;
const gradId = \`wr-azul-\${id}\`;
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
${AZUL.map((color, i) => `      <stop offset="${PARADAS[i]}" style={\`stop-color: var(--marca-azul-${i}, ${color})\`} />`).join('\n')}
    </linearGradient>
  </defs>
  <path d="${dAzul}" fill={\`url(#\${gradId})\`} fill-rule="evenodd" />
  <path d="${dOscuro}" fill-rule="evenodd" />
</svg>
`;

await writeFile(join(root, 'src', 'components', 'icons', 'RabbitMark.astro'), componente);

/* ------------------------------------------------------------------ */
/* 5. SVG completo: la marca con un fondo opcional                     */
/* ------------------------------------------------------------------ */

const marca = (tinta, { ancho: w = vbW, alto: h = vbH, ox = 0, oy = 0, fondo = null, radio = 0 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
  `<defs>${degradado('azul')}</defs>` +
  (fondo ? `<rect width="${w}" height="${h}" rx="${radio}" fill="${fondo}"/>` : '') +
  `<g transform="translate(${ox} ${oy})">` +
  `<path d="${dAzul}" fill="url(#azul)" fill-rule="evenodd"/>` +
  `<path d="${dOscuro}" fill="${tinta}" fill-rule="evenodd"/>` +
  `</g></svg>`;

const rasterizar = (svg, { ancho: w, lado } = {}) =>
  sharp(Buffer.from(svg), { density: 384 })
    .resize(lado ? { width: lado, height: lado } : { width: w })
    .png({ compressionLevel: 9 })
    .toBuffer();

/* ------------------------------------------------------------------ */
/* 6. Los iconos                                                       */
/* ------------------------------------------------------------------ */

/*
 * La marca es apaisada y el icono, cuadrado: el ancho manda. Un margen del
 * seis por ciento a cada lado y el conejo centrado en vertical: llena el
 * icono sin tocar el borde, que es lo que se ve bien en una pestaña.
 */
const margen = vbW * 0.06;
const lado = vbW + margen * 2;
const svgIcono = marca(PAPER, {
  ancho: lado,
  alto: lado,
  ox: margen,
  oy: (lado - vbH) / 2,
  fondo: INK,
  radio: lado * 0.18,
});
await writeFile(join(root, 'public', 'icon.svg'), svgIcono);

await writeFile(join(root, 'public', 'apple-touch-icon.png'), await rasterizar(svgIcono, { lado: 180 }));
await writeFile(join(root, 'public', 'icon-192.png'), await rasterizar(svgIcono, { lado: 192 }));
await writeFile(join(root, 'public', 'icon-512.png'), await rasterizar(svgIcono, { lado: 512 }));

/* .ico mínimo: una sola imagen PNG de 32×32 dentro del contenedor. */
const png32 = await rasterizar(svgIcono, { lado: 32 });
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

/* ------------------------------------------------------------------ */
/* 7. Los archivos de marca para uso fuera de la web (opcional)        */
/* ------------------------------------------------------------------ */

if (carpetaMarca) {
  const salida = resolve(carpetaMarca);
  await mkdir(salida, { recursive: true });
  const negro = marca('#000000');
  const blanco = marca(PAPER);
  await writeFile(join(salida, 'wr-ai-negro.svg'), negro);
  await writeFile(join(salida, 'wr-ai-blanco.svg'), blanco);
  await writeFile(join(salida, 'wr-ai-negro.png'), await rasterizar(negro, { ancho: 2000 }));
  await writeFile(join(salida, 'wr-ai-blanco.png'), await rasterizar(blanco, { ancho: 2000 }));
  /* El blanco sobre transparente no se ve en un visor claro: una copia sobre
     tinta para poder mirarlo. */
  const aire = vbW * 0.08;
  await writeFile(
    join(salida, 'wr-ai-blanco-sobre-oscuro.png'),
    await rasterizar(
      marca(PAPER, { ancho: vbW + aire * 2, alto: vbH + aire * 2, ox: aire, oy: aire, fondo: INK }),
      { ancho: 2000 },
    ),
  );
  console.log(`[logo] marca para uso externo en ${salida}: negro y blanco en SVG y PNG`);
}
