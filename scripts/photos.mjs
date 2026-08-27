/**
 * Adquisición de fotografía para el sitio.
 *
 * Fuente: Openverse (api.openverse.org), filtrado a licencias CC0 y dominio
 * público. CC0 permite uso comercial sin atribución obligatoria; aun así este
 * script deja constancia de autor, licencia y URL de origen en
 * `src/assets/CREDITOS.md`, porque el comprador es institucional y la
 * procedencia de cada activo tiene que poder auditarse.
 *
 * Tratamiento: la referencia no admite fotografía de stock en color. Cada
 * imagen se desatura y se tiñe hacia la tinta del sistema, que es lo que
 * permite que conviva con los bloques oscuros sin romper el lenguaje.
 *
 *   node scripts/photos.mjs
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');

/**
 * Un slot por imagen que el sitio necesita. `q` son las consultas en orden
 * de preferencia: se usa la primera que devuelva un resultado utilizable.
 */
const SLOTS = [
  {
    file: 'company.png',
    w: 2400,
    h: 1350,
    q: ['data center servers', 'server room', 'network infrastructure'],
    alt: 'Sala de servidores en penumbra, con las luces de estado de los bastidores alineadas en vertical.',
  },
  {
    file: 'newsroom-registro.png',
    w: 1600,
    h: 1000,
    q: ['archive boxes documents', 'archive shelves', 'filing cabinet'],
    alt: 'Estantería de archivo con cajas de expedientes numeradas.',
  },
  {
    file: 'newsroom-expedientes.png',
    w: 1600,
    h: 1000,
    q: ['library reading room', 'archive shelves documents', 'library interior'],
    alt: 'Volúmenes encuadernados alineados en una estantería de archivo.',
  },
  {
    file: 'newsroom-radicacion.png',
    w: 1600,
    h: 1000,
    q: ['courthouse facade', 'government building columns', 'parliament building'],
    alt: 'Fachada de un edificio institucional con columnas.',
  },
  {
    file: 'newsroom-reglas.png',
    w: 1600,
    h: 1000,
    q: ['circuit board macro', 'electronics circuit', 'computer hardware'],
    alt: 'Detalle macro de una placa de circuito impreso.',
  },
  {
    file: 'newsroom-mintic.png',
    w: 1600,
    h: 1000,
    q: ['network cables patch panel', 'ethernet cables', 'fiber optic cables'],
    alt: 'Panel de conexiones con cables de red ordenados por color.',
  },
];

const API = 'https://api.openverse.org/v1/images/';

/** Busca en Openverse restringido a CC0 y dominio público. */
async function search(q) {
  const url = `${API}?q=${encodeURIComponent(q)}&license=cc0,pdm&page_size=12&mature=false`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Openverse ${res.status} para "${q}"`);
  const { results = [] } = await res.json();

  /*
   * Flickr limita la tasa con dureza en cuanto se le piden varias imágenes
   * seguidas, y hay consultas que solo devuelven resultados suyos. Las de
   * Wikimedia van primero: aguantan la descarga en serie.
   */
  const rank = (r) => (r.url.includes('staticflickr') ? 1 : 0);

  return results
    .filter((r) => r.url && (r.width ?? 0) >= 1400)
    .sort((a, b) => rank(a) - rank(b));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Los hosts de origen (Flickr y compañía) devuelven 429 si se les piden
 * varias imágenes seguidas. Se espera y se reintenta con espera creciente
 * en lugar de dar el slot por perdido.
 */
async function download(url, attempt = 0) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'WRabbitAI-site-assets/1.0 (https://wrabbit.ai; rafaelmanriquebrasil2@gmail.com)' },
    redirect: 'follow',
  });

  if (res.status === 429 && attempt < 3) {
    const wait = 2500 * (attempt + 1);
    console.warn(`  429 — esperando ${wait}ms`);
    await sleep(wait);
    return download(url, attempt + 1);
  }

  if (!res.ok) throw new Error(`descarga ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 20_000) throw new Error('archivo demasiado pequeño');
  return buf;
}

/**
 * Tratamiento del sistema: desaturar y teñir hacia la tinta. Sin esto la
 * fotografía en color rompe el bloque oscuro.
 */
function treat(buf, w, h) {
  return sharp(buf)
    .resize(w, h, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.18, brightness: 0.94 })
    .tint('#2f4041')
    .linear(1.06, -10)
    .png({ quality: 92, compressionLevel: 9 })
    .toBuffer();
}

await mkdir(ASSETS, { recursive: true });

/*
 * La procedencia se acumula en un JSON al lado de las imágenes. Sin esto, una
 * ejecución que solo rellena los huecos borraría los créditos de todo lo que
 * ya estaba en disco, y la tabla dejaría de ser auditable.
 */
const LEDGER = join(ASSETS, 'creditos.json');
const credits = existsSync(LEDGER)
  ? JSON.parse(await readFile(LEDGER, 'utf8'))
  : [];

const record = (entry) => {
  const i = credits.findIndex((c) => c.file === entry.file);
  if (i === -1) credits.push(entry);
  else credits[i] = entry;
};

let ok = 0;

/* Reanudable: sin --force no se vuelve a bajar lo que ya está en disco. */
const force = process.argv.includes('--force');

for (const slot of SLOTS) {
  let done = false;

  if (!force && existsSync(join(ASSETS, slot.file))) {
    console.log(`· ${slot.file} ya existe — se conserva`);
    ok++;
    continue;
  }

  for (const q of slot.q) {
    if (done) break;
    let hits = [];
    try {
      hits = await search(q);
    } catch (err) {
      console.warn(`  búsqueda "${q}" falló: ${err.message}`);
      continue;
    }

    for (const hit of hits.slice(0, 5)) {
      try {
        /* Respiro entre descargas: evita que el host nos corte en seco. */
        await sleep(1800);
        const raw = await download(hit.url);
        const out = await treat(raw, slot.w, slot.h);
        await writeFile(join(ASSETS, slot.file), out);

        record({
          file: slot.file,
          title: hit.title ?? '(sin título)',
          creator: hit.creator ?? '(desconocido)',
          license: (hit.license ?? '').toUpperCase(),
          source: hit.foreign_landing_url ?? hit.url,
        });

        console.log(`✓ ${slot.file}  ←  "${q}"  ·  ${hit.license?.toUpperCase()}`);
        ok++;
        done = true;
        break;
      } catch (err) {
        console.warn(`  descartada (${err.message})`);
      }
    }
  }

  if (!done) console.error(`✗ ${slot.file} — ninguna candidata utilizable`);
}

credits.sort((a, b) => a.file.localeCompare(b.file));

const md = [
  '# Créditos de imagen',
  '',
  'Todas las fotografías proceden de Openverse con licencia **CC0 / dominio',
  'público**: uso comercial permitido y sin atribución obligatoria. Se deja',
  'constancia igualmente para que la procedencia de cada activo sea',
  'auditable.',
  '',
  'Tratamiento aplicado a todas: desaturación a 0.18, brillo 0.94 y tinte',
  'hacia `#2f4041`. Generado por `scripts/photos.mjs`.',
  '',
  '| Archivo | Título | Autor | Licencia | Origen |',
  '|---|---|---|---|---|',
  ...credits.map(
    (c) => `| \`${c.file}\` | ${c.title} | ${c.creator} | ${c.license} | <${c.source}> |`,
  ),
  '',
].join('\n');

await writeFile(LEDGER, `${JSON.stringify(credits, null, 2)}\n`, 'utf8');
await writeFile(join(ASSETS, 'CREDITOS.md'), md, 'utf8');

console.log(`\n${ok}/${SLOTS.length} imágenes. Procedencia en src/assets/CREDITOS.md`);
if (ok < SLOTS.length) process.exitCode = 1;
