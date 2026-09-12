/**
 * Hoja de contactos para curar fotografía.
 *
 * `photos.mjs` acepta la primera candidata que descargue bien, y eso deja
 * pasar imágenes legalmente correctas pero editorialmente malas: fondos de
 * catálogo, material desordenado, marcas de terceros a la vista. Este script
 * baja varias candidatas por hueco y las monta en una lámina numerada para
 * poder elegir mirándolas.
 *
 *   node scripts/photos-pick.mjs <slot>
 *
 * La elección se aplica después con:
 *   node scripts/photos-pick.mjs <slot> --use <n>
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const SCRATCH =
  'C:/Users/Rafael/AppData/Local/Temp/claude/C--dev-WRabbit-AI/97d75d18-1533-446d-af65-f4de6ffed8f8/scratchpad';

/** Consultas por hueco, elegidas para material oscuro y sin marca visible. */
const SLOTS = {
  registro: {
    file: 'newsroom-registro.png',
    w: 1600,
    h: 1000,
    q: ['archive repository shelves', 'documents repository archives', 'record office storage'],
  },
  mintic: {
    file: 'newsroom-mintic.png',
    w: 1600,
    h: 1000,
    q: ['fiber optic cables light', 'data center corridor', 'supercomputer cabinet'],
  },
  expedientes: {
    file: 'newsroom-expedientes.png',
    w: 1600,
    h: 1000,
    q: ['library reading room', 'archive boxes shelves', 'manuscript archive'],
  },
  radicacion: {
    file: 'newsroom-radicacion.png',
    w: 1600,
    h: 1000,
    q: ['courthouse facade', 'government building columns', 'ministry building'],
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(
    q,
  )}&license=cc0,pdm,by&page_size=20&mature=false`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) return [];
  const { results = [] } = await res.json();
  const rank = (r) => (r.url.includes('staticflickr') ? 1 : 0);
  return results
    .filter((r) => r.url && (r.width ?? 0) >= 1600)
    .sort((a, b) => rank(a) - rank(b));
}

/*
 * Wikimedia exige un User-Agent descriptivo con contacto; uno genérico lo
 * estrangula a 429. Aun así conviene reintentar con espera creciente.
 */
async function grab(url, attempt = 0) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'WrAILabs-site-assets/1.0 (https://wrailabs.com; rafaelmanriquebrasil2@gmail.com)' },
    redirect: 'follow',
  });
  if (res.status === 429 && attempt < 3) {
    await sleep(3000 * (attempt + 1));
    return grab(url, attempt + 1);
  }
  if (!res.ok) throw new Error(String(res.status));
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 20_000) throw new Error('pequeña');
  return buf;
}

const treat = (buf, w, h) =>
  sharp(buf)
    .resize(w, h, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.18, brightness: 0.94 })
    .tint('#2f4041')
    .linear(1.06, -10)
    .png({ compressionLevel: 9 })
    .toBuffer();

const name = process.argv[2];
const slot = SLOTS[name];
if (!slot) {
  console.error(`Huecos: ${Object.keys(SLOTS).join(', ')}`);
  process.exit(1);
}

const useIdx = process.argv.indexOf('--use');
const cacheFile = join(SCRATCH, `cand-${name}.json`);

if (useIdx !== -1) {
  /* Segunda pasada: aplica la candidata elegida. */
  const { readFile } = await import('node:fs/promises');
  const cands = JSON.parse(await readFile(cacheFile, 'utf8'));
  const pick = cands[Number(process.argv[useIdx + 1]) - 1];
  if (!pick) {
    console.error('índice fuera de rango');
    process.exit(1);
  }
  const out = await treat(await grab(pick.url), slot.w, slot.h);
  await writeFile(join(ASSETS, slot.file), out);
  console.log(JSON.stringify({ file: slot.file, ...pick }, null, 1));
  process.exit(0);
}

/* Primera pasada: junta candidatas y monta la lámina. */
await mkdir(SCRATCH, { recursive: true });

const cands = [];
const thumbs = [];

for (const q of slot.q) {
  if (cands.length >= 8) break;
  for (const hit of (await search(q)).slice(0, 6)) {
    if (cands.length >= 8) break;
    if (cands.some((c) => c.url === hit.url)) continue;
    try {
      await sleep(1200);
      const raw = await grab(hit.url);
      thumbs.push(await treat(raw, 400, 250));
      cands.push({
        url: hit.url,
        title: hit.title ?? '',
        creator: hit.creator ?? '',
        license: (hit.license ?? '').toUpperCase(),
        source: hit.foreign_landing_url ?? hit.url,
      });
      console.log(`${cands.length}. ${hit.title?.slice(0, 60)}`);
    } catch (err) {
      console.warn(`  descartada (${err.message})`);
    }
  }
}

if (!thumbs.length) {
  console.error('sin candidatas');
  process.exit(1);
}

/* Lámina de 2 columnas. */
const COLS = 2;
const rows = Math.ceil(thumbs.length / COLS);
const sheet = await sharp({
  create: {
    width: COLS * 400,
    height: rows * 250,
    channels: 3,
    background: '#111',
  },
})
  .composite(
    thumbs.map((input, i) => ({
      input,
      left: (i % COLS) * 400,
      top: Math.floor(i / COLS) * 250,
    })),
  )
  .jpeg({ quality: 82 })
  .toBuffer();

await writeFile(join(SCRATCH, `sheet-${name}.jpg`), sheet);
await writeFile(cacheFile, JSON.stringify(cands, null, 1), 'utf8');

console.log(`\nLámina: ${SCRATCH}/sheet-${name}.jpg  (${cands.length}, orden izq→der)`);
