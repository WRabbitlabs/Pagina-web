// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
 * Sigue saliendo del entorno para que una vista previa o un despliegue de
 * prueba no emitan enlaces absolutos al dominio de producción.
 */
export const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'https://wrailabs.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',

  /**
   * Estático puro: once archivos HTML y nada que ejecutar. Sin adaptador y sin
   * servidor, que es lo que pide GitHub Pages.
   *
   * Y conviene decirlo porque el nombre confunde: «estático» describe cómo
   * llega el HTML al navegador, no si la página se mueve. Todas las
   * animaciones del sitio son CSS y JavaScript de cliente y funcionan igual.
   * De hecho van mejor: el HTML sale de un CDN sin que ningún proceso lo
   * genere, así que pinta antes y el movimiento arranca antes.
   *
   * Lo único que no cabe aquí es una ruta de servidor. Había una —el endpoint
   * del formulario— y se fue con esta decisión; ver src/pages/contact.astro.
   */
  output: 'static',

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
