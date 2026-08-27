/**
 * Fondo del pie: un fotograma del vídeo del hero.
 *
 * El pie cierra con la misma imagen con la que abre la página, pero quieta.
 * No se reutiliza el vídeo: dos decodificaciones simultáneas por un fondo
 * estático no se pagan, y el póster —que es el primer fotograma— suele ser el
 * momento más plano de la animación.
 *
 * El script prueba varios instantes y se queda con el MÁS OSCURO, no con el
 * más bonito: sobre ese fotograma va texto blanco, y cuanto más oscuro sea
 * menos velo hace falta para que sea legible. Imprime el contraste medido de
 * cada candidato para que la elección quede auditada.
 *
 *   npm run footer:bg
 *
 * Hay que volver a correrlo cada vez que cambie el vídeo del hero.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const IN = 'public/video/hero.mp4';
const OUT = 'public/video/footer-bg.jpg';
/** Instantes a probar, en segundos. */
const MARKS = ['3', '6', '9', '12', '15', '18'];

if (!existsSync(IN)) {
  console.error(`✗ No existe ${IN}. Corre antes \`npm run hero:video\`.`);
  process.exit(1);
}

const lin = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
/** Contraste contra blanco puro, que es el color del texto del pie. */
const ratio = (l) => 1.05 / (l + 0.05);

const best = { L: Infinity };

for (const t of MARKS) {
  const tmp = `public/video/_frame-${t}.jpg`;
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', t, '-i', IN, '-frames:v', '1', '-q:v', '2', tmp]);

  const { channels } = await sharp(tmp).stats();
  const [r, g, b] = channels;
  const L = lum(r.mean, g.mean, b.mean);
  const peak = lum(r.max, g.max, b.max);

  console.log(
    `  t=${t}s  medio ${ratio(L).toFixed(1)}:1   pico ${ratio(peak).toFixed(2)}:1`,
  );

  if (L < best.L) {
    if (best.file) unlinkSync(best.file);
    Object.assign(best, { t, L, peak, file: tmp });
  } else {
    unlinkSync(tmp);
  }
}

await sharp(best.file)
  .resize(1600, 900, { fit: 'cover' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);
unlinkSync(best.file);

console.log(`\n✓ ${OUT}  ←  t=${best.t}s`);
console.log(
  `  Sin velo, el píxel más claro daría ${ratio(best.peak).toFixed(2)}:1 contra blanco.`,
);
console.log(
  '  El degradado del pie está calculado para ese peor caso: ver Footer.astro.',
);
