import type { APIRoute } from 'astro';
import { site } from '../data/site';

/**
 * robots.txt generado, no estático.
 *
 * Era un archivo en `public/` con el dominio escrito a mano, lo que tenía dos
 * problemas: apuntaba el sitemap a un dominio que no es de la compañía, y
 * permitía el rastreo completo de un prototipo con datos de relleno y dos
 * páginas legales que se declaran borrador.
 *
 * Ahora deriva del origen real del despliegue y obedece a `site.indexable`.
 */

/**
 * Los rastreadores de vista previa de enlace.
 *
 * Van ANTES que la regla general, porque en robots.txt gana el grupo de
 * `User-agent` más específico. Sin esto, el `Disallow: /` los alcanzaría
 * también y pegar un enlace del sitio en WhatsApp, LinkedIn o Slack mostraría
 * la URL pelada, sin título ni imagen: esos rastreadores respetan robots.txt
 * aunque no indexen nada.
 *
 * Dejarles leer la página no la hace encontrable. Lo que la mantiene fuera de
 * los buscadores es el `Disallow` de abajo y el `noindex` de cada página.
 */
const PREVIEW = [
  'facebookexternalhit',
  'WhatsApp',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot-LinkExpanding',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'Applebot',
];

const cerrado = [
  '# Prototipo cerrado: hay datos de relleno publicados y dos páginas legales',
  '# que se declaran borrador. Se abre poniendo site.indexable en true; las',
  '# condiciones están en DEPLOY.md.',
  '',
  '# Las vistas previas de enlace sí pueden leer: no indexan, solo leen las',
  '# etiquetas Open Graph.',
  ...PREVIEW.map((ua) => `User-agent: ${ua}`),
  'Allow: /',
  '',
  'User-agent: *',
  'Disallow: /',
  '',
].join('\n');

const abierto = (origin: URL | undefined) =>
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', origin).href}`, ''].join(
    '\n',
  );

export const GET: APIRoute = ({ site: origin }) =>
  new Response(site.indexable ? abierto(origin) : cerrado, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
