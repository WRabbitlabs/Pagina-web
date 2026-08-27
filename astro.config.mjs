// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

/**
 * Una sola forma canónica del dominio: apex, sin www.
 * Cambiar aquí también actualiza sitemap, canonical y JSON-LD.
 */
export const SITE_URL = 'https://wrabbit.ai';

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
