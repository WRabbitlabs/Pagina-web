/**
 * Genera los assets de imagen del sitio.
 *
 * ⚠ PLACEHOLDERS. Geometría del sistema (El Trazado) sobre tinta, sin
 * fotografía —coherente con DESIGN.md §9, que prohíbe imagen de stock.
 * Pendiente de reemplazo por los assets definitivos del cliente.
 *
 *   src/assets/company.png     2400×1350  fuente para <Picture> (AVIF/WebP)
 *   public/site.webmanifest               el manifiesto (los iconos que
 *                                         enlaza los genera scripts/logo.mjs;
 *                                         la tarjeta Open Graph, scripts/og.mjs)
 */
import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const INK = '#1a2a45';
const RULE = '#465368';
const SIGNAL = '#7fc7f9';
const PAPER = '#ffffff';

await mkdir(join(root, 'src', 'assets'), { recursive: true });
await mkdir(join(root, 'public', 'og'), { recursive: true });

const png = (svg, w, h) =>
  sharp(Buffer.from(svg)).resize(w, h, { fit: 'fill' }).png({ compressionLevel: 9 }).toBuffer();

/**
 * Escribe solo si el archivo NO existe.
 *
 * Este script pisaba sin preguntar, y costó caro: al correrlo para regenerar el
 * manifest se llevó por delante dos fotografías reales —company.png bajó de 389
 * a 57 KB y newsroom-registro.png de 763 a 9— sustituidas por los marcadores
 * geométricos que genera aquí abajo. El sitio quedó publicado con ellas.
 *
 * Estos marcadores existen para arrancar un proyecto vacío, no para reemplazar
 * lo que ya hay. Cuando llegan los assets de verdad, el script deja de tener
 * nada que hacer y su trabajo es apartarse.
 *
 * Para regenerarlos a propósito: borrar el archivo y volver a correrlo.
 */
async function escribirSiFalta(ruta, buffer) {
  try {
    await stat(ruta);
    console.log(`[assets] se conserva ${relative(root, ruta)} — ya existe`);
    return false;
  } catch {
    await writeFile(ruta, buffer);
    console.log(`[assets] generado ${relative(root, ruta)}`);
    return true;
  }
}

/** Fragmento del diagrama, escalable a cualquier lienzo. */
const diagram = (sx = 1, sy = 1, op = 0.55) => `
  <g transform="scale(${sx} ${sy})" opacity="${op}"
     fill="none" stroke="${RULE}" stroke-width="${1.4 / Math.max(sx, sy)}"
     stroke-linecap="square">
    <path d="M300 177 H640 V327 H930 V177 H1075 V470"/>
    <path d="M785 354 V620 H495 V204"/>
    <rect x="110"  y="150" width="190" height="54" fill="${INK}"/>
    <rect x="400"  y="150" width="190" height="54" fill="${INK}"/>
    <rect x="690"  y="300" width="190" height="54" fill="${INK}"/>
    <rect x="980"  y="150" width="190" height="54" fill="${INK}"/>
    <rect x="980"  y="470" width="190" height="54" fill="${INK}"/>
    <rect x="1147" y="486" width="16"  height="16" fill="${SIGNAL}" stroke="none"/>
  </g>`;

/* -------------------------------------------------------------- */
/* Imagen del bloque Compañía — 2400×1350 (16:9)                   */
/* -------------------------------------------------------------- */

const company = `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1350" viewBox="0 0 2400 1350">
  <rect width="2400" height="1350" fill="${INK}"/>
  <g opacity="0.10" stroke="${RULE}" stroke-width="1" fill="none">
    ${Array.from({ length: 30 }, (_, i) => `<path d="M0 ${i * 48} H2400"/>`).join('')}
    ${Array.from({ length: 51 }, (_, i) => `<path d="M${i * 48} 0 V1350"/>`).join('')}
  </g>
  <g transform="translate(120 240)">${diagram(1.5, 1.5, 0.7)}</g>
</svg>`;

await escribirSiFalta(join(root, 'src', 'assets', 'company.png'), await png(company, 2400, 1350));

/* -------------------------------------------------------------- */
/* Imagen del artículo destacado — 1600×1000                       */
/* -------------------------------------------------------------- */

// Un registro de ejecución: asientos sucesivos, uno marcado como evidencia.
const rows = Array.from({ length: 14 }, (_, i) => {
  const y = 120 + i * 56;
  const w = 320 + ((i * 137) % 620);
  return `<path d="M180 ${y} H${180 + w}"/><path d="M120 ${y - 9} h12 v18 h-12 z"/>`;
}).join('');

const registro = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <rect width="1600" height="1000" fill="${INK}"/>
  <g opacity="0.55" fill="none" stroke="${RULE}" stroke-width="1.6" stroke-linecap="square">
    ${rows}
  </g>
  <rect x="120" y="459" width="12" height="18" fill="${SIGNAL}"/>
  <path d="M180 468 H1000" stroke="${SIGNAL}" stroke-width="1.6" opacity="0.9"/>
</svg>`;

await escribirSiFalta(join(root, 'src', 'assets', 'newsroom-registro.png'), await png(registro, 1600, 1000));

/* -------------------------------------------------------------- */
/* Lo que este script YA NO genera                                 */
/* -------------------------------------------------------------- */

/*
 * Aquí vivían la tarjeta de Open Graph, los favicons y un robots.txt
 * estático. Los tres se fueron, y quitarlos importaba: este script escribe
 * sin preguntar, así que cualquiera que lo corriera para regenerar las
 * imágenes de relleno se habría llevado por delante los assets reales.
 *
 *   public/og/default.png   → scripts/og.mjs
 *                             el fotograma del pie con el nombre encima.
 *
 *   public/icon.svg y los PNG y el .ico
 *                           → scripts/logo.mjs
 *                             la marca del conejo, vectorizada del original.
 *
 *   public/robots.txt       → src/pages/robots.txt.ts
 *                             generado, porque depende de site.indexable y
 *                             del dominio del entorno. El estático que había
 *                             aquí traía escrito a mano un dominio que ni
 *                             siquiera es de la compañía, y un `Allow: /` que
 *                             habría abierto al rastreo un sitio que todavía
 *                             publica datos de relleno.
 *
 * El manifest sí se queda: es el único que no tiene otro dueño.
 */

await writeFile(
  join(root, 'public', 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'WR AI Labs',
      short_name: 'WR AI Labs',
      description: 'Automatización auditable.',
      lang: 'es',
      start_url: '/',
      display: 'standalone',
      background_color: INK,
      theme_color: INK,
      icons: [
        /* La versión va también aquí: el manifiesto se cachea como el favicon. */
        { src: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
        { src: '/icon.svg?v=3', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      ],
    },
    null,
    2,
  ) + '\n',
);

console.log('[assets] manifest actualizado');
