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
export const GET: APIRoute = ({ site: origin }) => {
  const body = site.indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', origin).href}\n`
    : `# Prototipo: sin dominio definitivo y con datos pendientes del cliente.\n# Se abre al rastreo poniendo site.indexable en true.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
