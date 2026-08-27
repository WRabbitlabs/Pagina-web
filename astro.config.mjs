// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

/**
 * Una sola forma canónica del dominio: apex, sin www.
 * Cambiar aquí también actualiza sitemap, canonical y JSON-LD.
 *
 * Dominio confirmado por el cliente: `wrailabs.com`, apex y sin `www`.
 *
 * NO es `wrabbit.ai`: ese dominio no es de la compañía —hoy sirve el producto
 * de un tercero, con su propio canonical a wrabbit.app—, y tenerlo aquí hacía
 * que cada canonical, cada og:url y cada entrada del sitemap declararan la
 * propiedad de un dominio ajeno.
 *
 * Sigue saliendo del entorno para que las vistas previas de Cloudflare no
 * emitan enlaces absolutos al dominio de producción.
 */
export const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'https://wrailabs.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',

  /**
   * Todo el sitio se prerenderiza. La única excepción es /api/contacto,
   * que declara `prerender = false` porque el brief exige validación,
   * sanitización y rate limiting en el servidor.
   *
   * CLOUDFLARE, no GitHub Pages. La razón no es de preferencia: GitHub Pages
   * sirve archivos estáticos y nada más. Publicado ahí, el sitio se vería
   * perfecto y el formulario haría POST contra un 404 —en silencio, para todos
   * los visitantes— porque /api/contacto no existiría. Cloudflare sirve el
   * estático Y ejecuta la función, bajo el mismo dominio.
   *
   * ⚠ El límite por IP de /api/contacto es una ventana en memoria del proceso.
   * En Workers cada isolate tiene la suya y se recicla a menudo, así que el
   * límite es orientativo, no una garantía; la barrera que sí aguanta es el
   * honeypot. Para un límite real hace falta KV, un Durable Object o la regla
   * de rate limiting del propio Cloudflare. Está anotado en DEPLOY.md.
   *
   * Para cambiar a Netlify o Vercel: sustituir este adaptador por
   * @astrojs/netlify o @astrojs/vercel. Nada más del proyecto lo toca.
   */
  adapter: cloudflare({ imageService: 'compile' }),

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],

  build: {
    /*
     * 'auto' solo incorpora las hojas de menos de 4KB, así que las dos del
     * sitio (13.7 y 19.3KB) salían como enlaces externos y bloqueaban el
     * primer pintado 610ms en 4G simulada. Incorporarlas elimina esa espera.
     * El coste —no compartir caché de CSS entre páginas— es menor aquí: casi
     * todas las visitas llegan a una sola página desde un enlace externo.
     */
    inlineStylesheets: 'always',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
