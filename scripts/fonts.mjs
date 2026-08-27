/**
 * Copia los .woff2 self-hosted desde node_modules a public/fonts/,
 * junto con sus licencias.
 *
 * Solo se copia el peso 400. El sistema de diseño prohíbe variar peso
 * (ver DESIGN.md §2), así que cualquier otro corte sería payload muerto.
 *
 * PARA CAMBIAR A ASPEKTA: reemplazar las entradas de `inter-tight` por los
 * .woff2 de Aspekta 400 (latin y latin-ext) y ajustar el @font-face y las
 * métricas de fallback en src/styles/tokens.css. Nada más depende de esto.
 */
import { mkdir, copyFile, access, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'fonts');

/** @type {{from: string, to: string, required: boolean}[]} */
const files = [
  // Display + texto
  { from: '@fontsource/inter-tight/files/inter-tight-latin-400-normal.woff2', to: 'inter-tight-latin-400.woff2', required: true },
  { from: '@fontsource/inter-tight/files/inter-tight-latin-ext-400-normal.woff2', to: 'inter-tight-latin-ext-400.woff2', required: true },
  { from: '@fontsource/inter-tight/LICENSE', to: 'inter-tight-LICENSE.txt', required: false },
  // Labels, contadores, metadatos
  { from: '@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff2', to: 'roboto-mono-latin-400.woff2', required: true },
  { from: '@fontsource/roboto-mono/files/roboto-mono-latin-ext-400-normal.woff2', to: 'roboto-mono-latin-ext-400.woff2', required: true },
  { from: '@fontsource/roboto-mono/LICENSE', to: 'roboto-mono-LICENSE.txt', required: false },
];

const exists = async (p) => access(p).then(() => true, () => false);

await mkdir(out, { recursive: true });

let copied = 0;
const missing = [];

for (const f of files) {
  const src = join(root, 'node_modules', f.from);
  if (await exists(src)) {
    await copyFile(src, join(out, f.to));
    copied++;
  } else if (f.required) {
    missing.push(f.from);
  }
}

if (missing.length) {
  console.error('\n[fonts] Faltan archivos de fuente obligatorios:');
  for (const m of missing) console.error(`  - node_modules/${m}`);
  const base = join(root, 'node_modules', '@fontsource', 'inter-tight', 'files');
  if (await exists(base)) {
    const found = (await readdir(base)).filter((n) => n.includes('400')).slice(0, 10);
    console.error(`\n[fonts] Disponibles en @fontsource/inter-tight/files:\n  ${found.join('\n  ')}`);
  }
  console.error('\n[fonts] Ejecuta `npm install` y vuelve a intentar.\n');
  process.exit(1);
}

console.log(`[fonts] ${copied} archivos en public/fonts/`);
