/**
 * Genera los assets de imagen del sitio.
 *
 * ⚠ PLACEHOLDERS. Geometría del sistema (El Trazado) sobre tinta, sin
 * fotografía —coherente con DESIGN.md §9, que prohíbe imagen de stock.
 * Pendiente de reemplazo por los assets definitivos del cliente.
 *
 *   src/assets/company.png     2400×1350  fuente para <Picture> (AVIF/WebP)
 *   public/og/default.png      1200×630   Open Graph
 *   public/apple-touch-icon.png  180×180
 *   public/icon.svg                       favicon vectorial
 *   public/favicon.ico           32×32
 *   public/site.webmanifest    + icon-192 / icon-512
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const INK = '#222f30';
const RULE = '#4d5757';
const SIGNAL = '#cef79e';
const PAPER = '#ffffff';

await mkdir(join(root, 'src', 'assets'), { recursive: true });
await mkdir(join(root, 'public', 'og'), { recursive: true });

const png = (svg, w, h) =>
  sharp(Buffer.from(svg)).resize(w, h, { fit: 'fill' }).png({ compressionLevel: 9 }).toBuffer();

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

await writeFile(join(root, 'src', 'assets', 'company.png'), await png(company, 2400, 1350));

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

await writeFile(join(root, 'src', 'assets', 'newsroom-registro.png'), await png(registro, 1600, 1000));

/* -------------------------------------------------------------- */
/* Open Graph — 1200×630                                           */
/* -------------------------------------------------------------- */

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <g transform="translate(-40 90) scale(0.62)" opacity="0.5">${diagram(1, 1, 1)}</g>
  <g transform="translate(72 92)" fill="none" stroke="${PAPER}"
     stroke-width="3.4" stroke-linecap="square">
    <path d="M0 0 10.5 27.5 21 7.75l10.5 19.75L42 0"/>
  </g>
  <text x="128" y="118" fill="${PAPER}" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="30" letter-spacing="1.4">WRABBIT AI</text>
  <text x="72" y="392" fill="${PAPER}" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="72" letter-spacing="-2.2">Ingeniería de procesos</text>
  <text x="72" y="470" fill="${PAPER}" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="72" letter-spacing="-2.2">que resisten una auditoría.</text>
  <rect x="72" y="530" width="14" height="14" fill="${SIGNAL}"/>
  <text x="102" y="542" fill="${SIGNAL}" font-family="Consolas, monospace" font-size="21"
        letter-spacing="0.8">AUTOMATIZACION AUDITABLE</text>
</svg>`;

await writeFile(join(root, 'public', 'og', 'default.png'), await png(og, 1200, 630));

/* -------------------------------------------------------------- */
/* Favicons                                                        */
/* -------------------------------------------------------------- */

const mark = (bg, fg, s = 64) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${bg}"/>
  <path d="M12 21 20.5 43 29 27.2 37.5 43 46 21" fill="none" stroke="${fg}"
        stroke-width="5" stroke-linecap="square" stroke-linejoin="miter"/>
  <rect x="46" y="40" width="7" height="7" fill="${SIGNAL}"/>
</svg>`;

await writeFile(join(root, 'public', 'icon.svg'), mark(INK, PAPER));
await writeFile(join(root, 'public', 'apple-touch-icon.png'), await png(mark(INK, PAPER, 180), 180, 180));
await writeFile(join(root, 'public', 'icon-192.png'), await png(mark(INK, PAPER, 192), 192, 192));
await writeFile(join(root, 'public', 'icon-512.png'), await png(mark(INK, PAPER, 512), 512, 512));

// .ico: un único frame de 32×32, que es lo que consumen los navegadores.
const ico32 = await sharp(Buffer.from(mark(INK, PAPER, 32))).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(ico32.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(join(root, 'public', 'favicon.ico'), Buffer.concat([header, ico32]));

await writeFile(
  join(root, 'public', 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'WRabbit AI',
      short_name: 'WRabbit',
      description: 'Automatización auditable para instituciones.',
      lang: 'es',
      start_url: '/',
      display: 'standalone',
      background_color: INK,
      theme_color: INK,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      ],
    },
    null,
    2,
  ) + '\n',
);

await writeFile(
  join(root, 'public', 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', 'Sitemap: https://wrabbit.ai/sitemap-index.xml', ''].join('\n'),
);

console.log('[assets] generados: company.png, og/default.png, favicons, manifest, robots.txt');
