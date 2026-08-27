/**
 * Genera public/og/default.png — la tarjeta que sale al pegar un enlace del
 * sitio en WhatsApp, LinkedIn, Slack o X.
 *
 *   node scripts/og.mjs
 *
 * Es el fotograma del vídeo que ya viste al pie de la página, con el nombre
 * de la agencia grande y en blanco encima. La misma imagen que cierra el
 * sitio es la que lo anuncia fuera.
 *
 * Tres restricciones mandan aquí, y ninguna es estética:
 *
 * 1. 1200×630. Es la proporción que esperan Open Graph y Twitter Card. Con
 *    otra, los clientes recortan por su cuenta y el recorte no se elige.
 *
 * 2. Menos de 300 KB. WhatsApp descarta la vista previa por encima de ese
 *    peso y deja el enlace pelado, sin avisar. Por eso el PNG sale con
 *    paleta reducida: a 256 colores esta imagen baja de 1 MB a ~150 KB sin
 *    que se note, porque es un fotograma oscuro y desaturado.
 *
 * 3. El texto va CENTRADO. Algunos clientes recortan la tarjeta a cuadrado;
 *    centrado sobrevive al recorte, alineado a la izquierda no.
 *
 * ⚠ La tipografía. El sistema del sitio usa Inter Tight, pero aquí el texto
 * lo dibuja librsvg a través de fontconfig, que solo lee fuentes instaladas
 * en el sistema: no puede abrir los .woff2 de public/fonts. Se cae a la pila
 * de sistema, que en la práctica da Segoe UI o Helvetica —neogrotescas de la
 * misma familia visual—. Es la misma decisión que ya tomaba scripts/assets.mjs.
 * Para fidelidad exacta habría que rasterizar la tarjeta en un navegador.
 */
import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const W = 1200;
const H = 630;
const SIGNAL = '#cef79e';
const PAPER = '#ffffff';

/** Lo que dice la tarjeta. El único sitio donde se cambia. */
const NAME = 'WRabbit AI Labs';
const EYEBROW = 'AUTOMATIZACIÓN AUDITABLE';

const SANS = 'Segoe UI, Inter, Helvetica Neue, Helvetica, Arial, sans-serif';
const MONO = 'Cascadia Mono, Consolas, DejaVu Sans Mono, monospace';

await mkdir(join(root, 'public', 'og'), { recursive: true });

/*
 * El velo. El fotograma ya es oscuro —luminancia media de 49 sobre 255— pero
 * tiene zonas claras donde el blanco perdería contraste. Un velo plano lo
 * apagaría entero; este cae hacia el centro, que es justo donde va el nombre,
 * y deja respirar los bordes.
 */
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="veil" cx="50%" cy="50%" r="72%">
      <stop offset="0%"   stop-color="#11191a" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#11191a" stop-opacity="0.42"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#veil)"/>

  <text x="${W / 2}" y="252" text-anchor="middle" fill="${PAPER}" opacity="0.72"
        font-family="${MONO}" font-size="22" letter-spacing="4.6">${EYEBROW}</text>

  <text x="${W / 2}" y="368" text-anchor="middle" fill="${PAPER}"
        font-family="${SANS}" font-size="104" letter-spacing="-3.2">${NAME}</text>

  <!-- La ración de lima: un filete corto, no un relleno. -->
  <rect x="${W / 2 - 26}" y="424" width="52" height="3" fill="${SIGNAL}"/>
</svg>`;

const png = await sharp(join(root, 'public', 'video', 'footer-bg.jpg'))
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: Buffer.from(overlay) }])
  .png({ palette: true, quality: 92, compressionLevel: 9 })
  .toBuffer();

const out = join(root, 'public', 'og', 'default.png');
await writeFile(out, png);

const kb = (await stat(out)).size / 1024;
const limit = kb < 300;
console.log(
  `[og] public/og/default.png  ${W}×${H}  ${kb.toFixed(0)} KB  ` +
    `${limit ? 'ok' : '⚠ PASA DE 300 KB: WhatsApp descartaria la vista previa'}`,
);
if (!limit) process.exitCode = 1;
