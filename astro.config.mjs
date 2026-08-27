// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

/**
 * Una sola forma canónica del dominio: apex, sin www.
 * Cambiar aquí también actualiza sitemap, canonical y JSON-LD.
 *
 * Sale del entorno porque el dominio definitivo todavía no está decidido:
 * `wrabbit.ai` NO es de la compañía —hoy sirve el producto de un tercero, con
 * su propio canonical a wrabbit.app—, así que clavarlo aquí haría que cada
 * canonical, cada og:url y cada entrada del sitemap declararan la propiedad de
 * un dominio ajeno.
 *
 * Al desplegar: definir PUBLIC_SITE_URL con el dominio real.
 */
export const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',

  /**
   * Todo el sitio se prerenderiza. La única excepción es /api/contacto,
   * que declara `prerender = false` porque el brief exige validación,
   * sanitización y rate limiting en el servidor.
   *
   * Para desplegar en Vercel o Netlify: cambiar este adaptador por
   * @astrojs/vercel o @astrojs/netlify. Nada más del proyecto lo toca.
   */
  adapter: node({ mode: 'standalone' }),

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
