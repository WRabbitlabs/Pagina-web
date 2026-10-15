/**
 * La empresa legal detrás de WR AI Labs y las condiciones comerciales que la
 * web publica.
 *
 * Lo leen el pie, los datos estructurados de la portada, /contact,
 * /privacidad, /terminos y /pagos. Cada dato vive aquí y solo aquí: si cambia
 * una dirección o un plazo, cambia en todas las páginas a la vez y ninguna
 * puede quedar contradiciendo a otra.
 *
 * Un dato que falta vale `null`, nunca un valor de ejemplo. La web publicó una
 * vez un NIT, una dirección y un teléfono de relleno, y la revisión previa a
 * Stripe lo señaló (9 de octubre de 2026). Hay dos clases de dato:
 *   - obligatorios (estado de constitución y domicilio legal): si faltan, en
 *     desarrollo se pinta «[pendiente: …]» y el build de producción se
 *     detiene nombrando lo que falta. Sin ellos no hay página legal que valga;
 *   - opcionales (dirección operativa y teléfono): si faltan, la web los
 *     omite. El director decidió el 14 de octubre de 2026 publicar con lo que
 *     hay y dejar estos como pendiente interno, no en la página. Mientras
 *     falte la dirección operativa, la web dice solo la ciudad, que es real.
 *
 * No se importa desde ningún <script> de cliente: el error es para el build,
 * no para el navegador del visitante.
 */

import { site } from './site';

export interface Direccion {
  /** Calle, número y oficina o suite. */
  calle: string;
  ciudad: string;
  /** Estado en EE. UU., departamento en Colombia. */
  region: string;
  codigoPostal?: string;
  /** ISO 3166-1 alfa-2. */
  pais: 'US' | 'CO';
}

/**
 * Los datos de la LLC. Salen del certificado de constitución y de la
 * dirección real de operación; nada de aquí se deduce ni se inventa.
 */
const datos: {
  entidad: string;
  estadoDeConstitucion: string | null;
  direccionLegal: Direccion | null;
  direccionOperativa: Direccion | null;
  telefono: string | null;
} = {
  /**
   * Nombre legal tal como figura en el certificado, «Ai» con la i
   * minúscula: documento de datos de la LLC que pasó el director el 14 de
   * octubre de 2026.
   */
  entidad: 'Wrabbit Ai LLC',
  /** Estado de EE. UU. donde se constituyó la LLC. Mismo documento. */
  estadoDeConstitucion: 'Delaware',
  /** Mismo documento: la dirección legal en Dover, Delaware. */
  direccionLegal: {
    calle: '8 The Green, Suite B',
    ciudad: 'Dover',
    region: 'Delaware',
    codigoPostal: '19901',
    pais: 'US',
  },
  /**
   * PENDIENTE INTERNO: donde trabaja el equipo, en Colombia. Mientras falte,
   * la web dice solo la ciudad.
   */
  direccionOperativa: null,
  /**
   * PENDIENTE INTERNO. La política de datos debería llevarlo: el Decreto 1377
   * de 2013 (hoy en el Decreto 1074 de 2015) pide nombre, domicilio,
   * dirección, correo y teléfono del responsable. En cuanto exista, va aquí.
   */
  telefono: null,
};

const PAISES = { US: 'Estados Unidos', CO: 'Colombia' } as const;

const faltan: string[] = [];

function exigir<T>(valor: T | null, nombre: string, marcador: T): T {
  if (valor !== null) return valor;
  faltan.push(nombre);
  return marcador;
}

const marca = (nombre: string) => `[pendiente: ${nombre}]`;

const direccionPendiente = (nombre: string, pais: Direccion['pais']): Direccion => ({
  calle: marca(nombre),
  ciudad: '',
  region: '',
  pais,
});

export const legal = {
  entidad: datos.entidad,
  nombreComercial: site.name,
  estadoDeConstitucion: exigir(datos.estadoDeConstitucion, 'estado de constitución de la LLC', marca('estado de constitución')),
  direccionLegal: exigir(datos.direccionLegal, 'dirección legal en EE. UU.', direccionPendiente('dirección legal en EE. UU.', 'US')),
  /** Opcional: `null` mientras falte. Para pintarla, `operacionEnLinea()`. */
  direccionOperativa: datos.direccionOperativa,
  /** Opcional: `null` mientras falte; quien lo pinta lo omite. */
  telefono: datos.telefono,
  ciudadOperativa: site.city,
  correo: site.email,
} as const;

if (faltan.length > 0 && !import.meta.env.DEV) {
  throw new Error(
    `Faltan datos legales en src/data/legal.ts: ${faltan.join(', ')}. ` +
      'La web no se publica con datos de relleno; complételos con los del certificado de la LLC.',
  );
}

/** «Calle, ciudad, región CP, país» en una línea, sin comas colgando. */
export function enLinea(d: Direccion): string {
  const region = [d.region, d.codigoPostal].filter(Boolean).join(' ');
  return [d.calle, d.ciudad, region, PAISES[d.pais]].filter(Boolean).join(', ');
}

/** Para JSON-LD. */
export function direccionSchema(d: Direccion) {
  return {
    '@type': 'PostalAddress',
    streetAddress: d.calle,
    addressLocality: d.ciudad,
    addressRegion: d.region,
    ...(d.codigoPostal ? { postalCode: d.codigoPostal } : {}),
    addressCountry: d.pais,
  };
}

/** La dirección de operación completa, o solo la ciudad mientras falte. */
export function operacionEnLinea(): string {
  return legal.direccionOperativa
    ? enLinea(legal.direccionOperativa)
    : `${legal.ciudadOperativa}, ${PAISES.CO}`;
}

/** Lo mismo para JSON-LD: sin calle mientras no se tenga. */
export function operacionSchema() {
  return legal.direccionOperativa
    ? direccionSchema(legal.direccionOperativa)
    : { '@type': 'PostalAddress', addressLocality: legal.ciudadOperativa, addressCountry: 'CO' };
}

/** Para `href="tel:…"`: solo el signo y los dígitos. */
export const telefonoHref = (t: string) => `tel:${t.replace(/[^+\d]/g, '')}`;

/**
 * Las condiciones comerciales que se publican en /pagos y /terminos, y que
 * /contact resume. Son reglas por defecto: una cotización firmada puede fijar
 * otras, y entonces manda la cotización.
 *
 * Propuestos el 9 de octubre de 2026. La reunión de revisión del 14 de
 * octubre de 2026 confirmó el calendario de pagos por hitos, la vigencia de
 * la cotización y la garantía; el resto sigue pendiente de confirmar. Todo
 * está registrado en el cerebro (C-03).
 */
export const condiciones = {
  moneda: 'USD',
  monedaNombre: 'dólares estadounidenses',
  /**
   * Proyectos a la medida, si la cotización no fija otro calendario: tres
   * pagos por hitos. El anticipo es para contratar al equipo y arrancar.
   */
  pagoAnticipo: 30,
  pagoPrimerEntregable: 50,
  pagoEntregaFinal: 20,
  vigenciaCotizacionDias: 30,
  plazoPagoFacturaDias: 15,
  /** Días de mora tras los cuales se puede pausar el trabajo, con aviso. */
  pausaPorMoraDias: 15,
  /** Servicios recurrentes. */
  avisoCancelacionDias: 30,
  avisoCambioPrecioDias: 30,
  /** Corrección sin costo de un entregable que no cumple lo pactado. */
  garantiaDias: 30,
  respuestaReembolsoDiasHabiles: 5,
  procesoReembolsoDiasHabiles: 10,
} as const;

// Si alguien cambia un hito y los tres dejan de sumar 100, que se note en el
// build y no en una página que promete cobrar el 110 %.
if (condiciones.pagoAnticipo + condiciones.pagoPrimerEntregable + condiciones.pagoEntregaFinal !== 100) {
  throw new Error('Los tres pagos por hitos de src/data/legal.ts no suman 100 %.');
}
