/**
 * Los textos sueltos de la interfaz: etiquetas para lectores de pantalla,
 * botones, rótulos del pie y de Noticias. Los textos de contenido (portada,
 * compañía, servicios) viven en `data/` y `data/en/`; aquí solo lo que antes
 * estaba escrito a mano dentro de un componente.
 */
import type { Category } from '../lib/categories';

export interface Ui {
  /** Para `Intl`: fechas y números. */
  locale: string;
  saltar: string;
  inicio: string;
  navPrincipal: string;
  menuAbrir: string;
  menuCerrar: string;
  menuEtiqueta: string;
  /** El selector de idioma lleva al OTRO idioma: estos textos son los de destino. */
  otroIdioma: { corto: string; largo: string; etiqueta: string; lang: string };
  pestanaNueva: string;
  pestanaNuevaDe: (nombre: string) => string;
  whatsappPestana: string;
  pieNav: string;
  pieNavegar: string;
  pieConectar: string;
  pieRedes: string;
  volverArriba: string;
  nombreComercial: (nombre: string, entidad: string, anio: number) => string;
  domicilioLegal: string;
  operacion: string;
  leerArticulo: string;
  leerFuente: string;
  filtrarPorCategoria: string;
  /** «3 de 12». */
  conteo: (n: number, total: number) => string;
  articulos: string;
  categoria: (c: Category) => string;
  serieGrafico: string;
  semana: string;
  /** «de la semana 1 a la 12», para el resumen del gráfico. */
  semanasDel: (n: number) => string;
  /** El idioma de los artículos: solo existen en español. */
  langArticulos?: string;
  ultimaActualizacion: string;
  modulos: string;
  modulosServicio: string;
  leaEn: string;
  fundadores: string;
  direccion: string;
}

/** Las categorías de Noticias en inglés: la del artículo y la del filtro. */
export const CATEGORIAS_EN: Record<Category, { singular: string; plural: string }> = {
  Publicación: { singular: 'Publication', plural: 'Publications' },
  Anuncio: { singular: 'Announcement', plural: 'Announcements' },
  Prensa: { singular: 'Press', plural: 'Press' },
  Actualidad: { singular: 'Current affairs', plural: 'Current affairs' },
};

export const ui: Record<'es' | 'en', Ui> = {
  es: {
    locale: 'es-CO',
    saltar: 'Saltar al contenido',
    inicio: 'ir al inicio',
    navPrincipal: 'Principal',
    menuAbrir: 'Abrir el menú',
    menuCerrar: 'Cerrar el menú',
    menuEtiqueta: 'Menú de navegación',
    otroIdioma: { corto: 'EN', largo: 'English', etiqueta: 'Read this site in English', lang: 'en' },
    pestanaNueva: ' (se abre en una pestaña nueva)',
    pestanaNuevaDe: (nombre) => ` de ${nombre} (se abre en una pestaña nueva)`,
    whatsappPestana: ' (abre WhatsApp en una pestaña nueva)',
    pieNav: 'Navegación del pie',
    pieNavegar: 'Navegar',
    pieConectar: 'Conectar',
    pieRedes: 'Redes sociales',
    volverArriba: 'Volver arriba',
    nombreComercial: (nombre, entidad, anio) =>
      `${nombre} es un nombre comercial de ${entidad} · © ${anio}. Todos los derechos reservados.`,
    domicilioLegal: 'Domicilio legal',
    operacion: 'Operación',
    leerArticulo: 'Leer artículo',
    leerFuente: 'Leer en la fuente',
    filtrarPorCategoria: 'Filtrar por categoría',
    conteo: (n, total) => `${n} de ${total}`,
    articulos: 'Artículos',
    categoria: (c) => c,
    serieGrafico: 'Serie del gráfico',
    semana: 'Semana',
    semanasDel: (n) => `de la semana 1 a la ${n}`,
    ultimaActualizacion: 'Última actualización',
    modulos: 'Módulos',
    modulosServicio: 'Módulos de servicio',
    leaEn: 'Lea en Noticias',
    fundadores: 'Fundadores',
    direccion: 'Dirección',
  },
  en: {
    locale: 'en-US',
    saltar: 'Skip to content',
    inicio: 'go to home page',
    navPrincipal: 'Main',
    menuAbrir: 'Open menu',
    menuCerrar: 'Close menu',
    menuEtiqueta: 'Navigation menu',
    otroIdioma: { corto: 'ES', largo: 'Español', etiqueta: 'Leer este sitio en español', lang: 'es' },
    pestanaNueva: ' (opens in a new tab)',
    pestanaNuevaDe: (nombre) => ` for ${nombre} (opens in a new tab)`,
    whatsappPestana: ' (opens WhatsApp in a new tab)',
    pieNav: 'Footer navigation',
    pieNavegar: 'Navigate',
    pieConectar: 'Connect',
    pieRedes: 'Social media',
    volverArriba: 'Back to top',
    nombreComercial: (nombre, entidad, anio) =>
      `${nombre} is a trade name of ${entidad} · © ${anio}. All rights reserved.`,
    domicilioLegal: 'Registered office',
    operacion: 'Operations',
    leerArticulo: 'Read article (in Spanish)',
    leerFuente: 'Read at the source',
    filtrarPorCategoria: 'Filter by category',
    conteo: (n, total) => `${n} of ${total}`,
    articulos: 'Articles',
    categoria: (c) => CATEGORIAS_EN[c].singular,
    serieGrafico: 'Chart series',
    semana: 'Week',
    semanasDel: (n) => `from week 1 to week ${n}`,
    langArticulos: 'es',
    ultimaActualizacion: 'Last updated',
    modulos: 'Modules',
    modulosServicio: 'Service modules',
    leaEn: 'Read in News',
    fundadores: 'Founders',
    direccion: 'Leadership',
  },
};
