/**
 * Retiñe las fotografías que ya están en src/assets/ sin volver a Openverse.
 *
 *   node scripts/photos-retint.mjs
 *
 * Las fotos publicadas ya están desaturadas y teñidas hacia la tinta antigua.
 * sharp tiñe en el espacio LAB conservando la luminancia, así que aplicar el
 * tinte nuevo sobre la foto ya tratada da el mismo resultado que tratar el
 * original con ese tinte: no hace falta descargar nada. Reescribe también la
 * línea del tratamiento en CREDITOS.md, que documenta el tinte vigente.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { TINTE_FOTOS, SATURACION_FOTOS, BRILLO_FOTOS } from './foto-tinte.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');

const fotos = (await readdir(ASSETS)).filter((f) => f.endsWith('.png'));
for (const f of fotos) {
  const ruta = join(ASSETS, f);
  const antes = (await readFile(ruta)).length;
  const salida = await sharp(ruta).tint(TINTE_FOTOS).png({ quality: 92, compressionLevel: 9 }).toBuffer();
  await writeFile(ruta, salida);
  console.log(`[fotos] ${f}: ${(antes / 1024).toFixed(0)} KB → ${(salida.length / 1024).toFixed(0)} KB, tinte ${TINTE_FOTOS}`);
}

const creditos = join(ASSETS, 'CREDITOS.md');
const md = await readFile(creditos, 'utf8');
const linea = /Tratamiento común: desaturación a [\d.]+, brillo [\d.]+, tinte hacia `#[0-9a-f]{6}`\./;
if (!linea.test(md)) throw new Error('CREDITOS.md no tiene la línea del tratamiento');
await writeFile(
  creditos,
  md.replace(
    linea,
    `Tratamiento común: desaturación a ${SATURACION_FOTOS}, brillo ${BRILLO_FOTOS}, tinte hacia \`${TINTE_FOTOS}\`.`,
  ),
);
console.log('[fotos] CREDITOS.md actualizado');
