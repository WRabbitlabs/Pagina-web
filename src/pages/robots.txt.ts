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
    : `# Prototipo cerrado: hay datos de relleno publicados y dos páginas legales\n# que se declaran borrador. Se abre poniendo site.indexable en true; las\n# condiciones están en DEPLOY.md.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
