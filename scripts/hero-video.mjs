/**
 * Prepara el vídeo del hero a partir del archivo que entregue el generador.
 *
 *   node scripts/hero-video.mjs                    ← busca el vídeo más
 *                                                    reciente en Descargas
 *   node scripts/hero-video.mjs ruta/al/video.mp4  ← o se le pasa la ruta
 *
 * Hace tres cosas:
 *   1. Hornea el bucle ping-pong (la toma, seguida de sí misma al revés).
 *      Así el empalme es exacto y el generador no tiene que cerrar el bucle.
 *   2. Genera MP4, WebM y el póster del primer fotograma en public/video/.
 *   3. Deja apuntadas las rutas en src/data/home.ts.
 *
 * ffmpeg sale de `ffmpeg-static` (dependencia de desarrollo). Si no está, usa
 * el del sistema.
 */

import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'video');
const DOWNLOADS = join(process.env.USERPROFILE ?? process.env.HOME ?? '', 'Downloads');

/**
 * Ancho máximo de salida.
 *
 * No se fuerza ninguna relación de aspecto ni se escala hacia arriba: el hero
 * usa `object-fit: cover`, así que recorta él. Forzar un cuadrado sobre una
 * fuente 16:9 tiraría dos tercios del encuadre y ampliaría píxeles que no
 * existen. `min(ANCHO,iw)` deja pasar la fuente tal cual si es más pequeña.
 */
const MAX_W = 1440;

async function resolveFfmpeg() {
  try {
    const mod = await import('ffmpeg-static');
    const bin = mod.default ?? mod;
    if (bin && existsSync(bin)) return bin;
  } catch {
    /* sin ffmpeg-static: se prueba el del sistema */
  }
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return 'ffmpeg';
  } catch {
    console.error(
      'No hay ffmpeg. Instálalo con:\n  npm install --save-dev ffmpeg-static',
    );
    process.exit(1);
  }
}

/** El vídeo más reciente en Descargas, si no se pasó una ruta. */
function findSource() {
  const arg = process.argv[2];
  if (arg) {
    if (!existsSync(arg)) {
      console.error(`No existe: ${arg}`);
      process.exit(1);
    }
    return arg;
  }

  if (!existsSync(DOWNLOADS)) {
    console.error('Pásame la ruta del vídeo: node scripts/hero-video.mjs <archivo>');
    process.exit(1);
  }

  const vids = readdirSync(DOWNLOADS)
    .filter((f) => ['.mp4', '.mov', '.webm', '.m4v'].includes(extname(f).toLowerCase()))
    .map((f) => {
      const p = join(DOWNLOADS, f);
      return { p, t: statSync(p).mtimeMs };
    })
    .sort((a, b) => b.t - a.t);

  if (!vids.length) {
    console.error(
      `No encontré ningún vídeo en ${DOWNLOADS}.\n` +
        'Pásame la ruta: node scripts/hero-video.mjs <archivo>',
    );
    process.exit(1);
  }

  return vids[0].p;
}

const ffmpeg = await resolveFfmpeg();
const src = findSource();
mkdirSync(OUT, { recursive: true });

const run = (args, label) => {
  process.stdout.write(`  ${label}… `);
  try {
    execFileSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', ...args], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    console.log('ok');
  } catch (err) {
    console.log('falló');
    console.error(String(err.stderr ?? err.message).slice(0, 600));
    process.exit(1);
  }
};

const mb = (p) => `${(statSync(p).size / 1048576).toFixed(1)} MB`;

console.log(`Origen: ${src}  (${mb(src)})\n`);

const loop = join(OUT, '_pingpong.mp4');
const mp4 = join(OUT, 'hero.mp4');
const webm = join(OUT, 'hero.webm');
const poster = join(OUT, 'hero-poster.jpg');

/*
 * Ping-pong. `reverse` carga la secuencia entera en memoria, así que esto solo
 * es viable con tomas cortas — de ahí que el prompt pida 10–14 s.
 * El segundo tramo se recorta un fotograma por cada extremo para que el
 * fotograma bisagra no se repita y el movimiento no “tartamudee” al girar.
 */
run(
  [
    '-i', src,
    '-filter_complex',
    '[0:v]split[a][b];[b]reverse,trim=start_frame=1[r];[a][r]concat=n=2:v=1[v]',
    '-map', '[v]', '-an',
    '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p',
    loop,
  ],
  'horneando el ping-pong',
);

/* -2 mantiene la relación y garantiza alto par, que exige yuv420p. */
const scale = `scale='min(${MAX_W},iw)':-2`;

run(
  ['-i', loop, '-an', '-vf', scale,
   '-c:v', 'libx264', '-crf', '26', '-preset', 'slow',
   '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4],
  'MP4',
);

run(
  ['-i', loop, '-an', '-vf', scale,
   '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0', '-row-mt', '1', webm],
  'WebM',
);

/*
 * Póster ligero a propósito. Es el elemento LCP —lo primero grande que se
 * pinta— y solo tiene que cubrir el segundo que tarda el vídeo en arrancar,
 * sobre una imagen oscura y difusa donde la compresión no se aprecia. A
 * calidad de archivo pesaba 44KB y empujaba el LCP; así son 15KB.
 */
run(
  ['-i', mp4, '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '12', poster],
  'póster',
);

/* El intermedio ya no hace falta. */
try {
  const { unlinkSync } = await import('node:fs');
  unlinkSync(loop);
} catch {
  /* si no se puede borrar, no es un fallo del pipeline */
}

/* Deja las rutas apuntadas en los datos. */
const dataPath = join(ROOT, 'src', 'data', 'home.ts');
let data = await readFile(dataPath, 'utf8');
const before = data;
data = data
  .replace(/video: null as string \| null,[^\n]*/, "video: '/video/hero.mp4' as string | null,")
  .replace(/webm: null as string \| null,[^\n]*/, "webm: '/video/hero.webm' as string | null,")
  .replace(
    /poster: null as string \| null,[^\n]*/,
    "poster: '/video/hero-poster.jpg' as string | null,",
  );

if (data !== before) {
  await writeFile(dataPath, data, 'utf8');
  console.log('\nsrc/data/home.ts actualizado.');
} else {
  console.log('\nsrc/data/home.ts ya apuntaba al vídeo.');
}

console.log(
  [
    '',
    `  hero.mp4         ${mb(mp4)}`,
    `  hero.webm        ${mb(webm)}`,
    `  hero-poster.jpg  ${mb(poster)}`,
    '',
    'Listo. `npm run build` y el hero ya lo usa.',
  ].join('\n'),
);
