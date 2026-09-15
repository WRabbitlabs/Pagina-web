/**
 * Retiñe el vídeo del hero que ya está en public/video/ sin volver a la fuente.
 *
 *   node scripts/hero-tint.mjs
 *
 * Parte de hero.mp4 (el bucle ping-pong ya horneado por hero-video.mjs), le
 * aplica el filtro de color de video-tinte.mjs y vuelve a escribir los cuatro
 * archivos que sirve el sitio: MP4, WebM, AV1 y el póster. Los ajustes de
 * calidad son los mismos de hero-video.mjs, salvo el MP4 intermedio, que
 * baja a CRF 22 para no sumar una segunda pérdida visible sobre la primera.
 *
 * Después hay que correr `npm run footer:bg`, porque el pie usa un fotograma
 * del vídeo, y `node scripts/og.mjs`, porque la tarjeta social usa el del pie.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, renameSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FILTRO_COLOR } from './video-tinte.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'video');
const MAX_W = 1440;

async function resolveFfmpeg() {
  try {
    const mod = await import('ffmpeg-static');
    const bin = mod.default ?? mod;
    if (bin && existsSync(bin)) return bin;
  } catch {
    /* sin ffmpeg-static: se prueba el del sistema */
  }
  return 'ffmpeg';
}

const ffmpeg = await resolveFfmpeg();
const mp4 = join(OUT, 'hero.mp4');
const webm = join(OUT, 'hero.webm');
const av1 = join(OUT, 'hero.av1.webm');
const poster = join(OUT, 'hero-poster.jpg');
const origen = join(OUT, '_origen.mp4');

if (!existsSync(mp4)) {
  console.error(`✗ No existe ${mp4}. Corre antes \`npm run hero:video\`.`);
  process.exit(1);
}

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

/* El MP4 publicado pasa a ser la fuente; se renombra para no leer y escribir el mismo archivo. */
renameSync(mp4, origen);
console.log(`Origen: ${origen} (${mb(origen)})  filtro: ${FILTRO_COLOR}\n`);

const vf = `scale='min(${MAX_W},iw)':-2,${FILTRO_COLOR}`;

run(
  ['-i', origen, '-an', '-vf', vf, '-c:v', 'libx264', '-crf', '22', '-preset', 'slow',
   '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4],
  'MP4',
);
run(
  ['-i', origen, '-an', '-vf', vf, '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0', '-row-mt', '1', webm],
  'WebM',
);
run(
  ['-i', origen, '-an', '-vf', vf, '-c:v', 'libaom-av1', '-crf', '38', '-b:v', '0',
   '-cpu-used', '6', '-row-mt', '1', '-tiles', '2x2', '-g', '240', '-pix_fmt', 'yuv420p', av1],
  'AV1',
);
run(['-i', mp4, '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '12', poster], 'póster');

unlinkSync(origen);

console.log(`
Listo:
  hero.mp4         ${mb(mp4)}
  hero.webm        ${mb(webm)}
  hero.av1.webm    ${mb(av1)}   <- la que se sirve
  hero-poster.jpg  ${mb(poster)}

Ahora: npm run footer:bg  y  node scripts/og.mjs
`);
