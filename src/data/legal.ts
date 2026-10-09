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
 * Stripe lo señaló (9 de octubre de 2026). Desde entonces:
 *   - en desarrollo, el dato que falta se pinta «[pendiente: …]» en su sitio,
 *     para que se vea dónde va;
 *   - en el build de producción, el build se detiene y nombra lo que falta.
 *     Ningún despliegue sale con un hueco ni con un relleno.
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
   * Grafía de la revisión previa a Stripe que reenvió el director el 9 de
   * octubre de 2026. Confirmar contra el certificado (mayúsculas, coma).
   */
  entidad: 'Wrabbit AI LLC',
  /** Estado de EE. UU. donde se constituyó la LLC. */
  estadoDeConstitucion: null,
  /** La del certificado o la del agente registrado. */
  direccionLegal: null,
  /** Donde trabaja el equipo, en Colombia. */
  direccionOperativa: null,
  /**
   * Obligatorio en la política de datos: el Decreto 1377 de 2013 (hoy en el
   * Decreto 1074 de 2015) exige nombre, domicilio, dirección, correo y
   * teléfono del responsable.
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
  direccionOperativa: exigir(datos.direccionOperativa, 'dirección operativa en Colombia', direccionPendiente('dirección operativa en Colombia', 'CO')),
  telefono: exigir(datos.telefono, 'teléfono', marca('teléfono')),
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

/** Para `href="tel:…"`: solo el signo y los dígitos. */
export const telefonoHref = (t: string) => `tel:${t.replace(/[^+\d]/g, '')}`;

/**
 * Las condiciones comerciales que se publican en /pagos y /terminos, y que
 * /contact resume. Son reglas por defecto: una cotización firmada puede fijar
 * otras, y entonces manda la cotización.
 *
 * Valores propuestos el 9 de octubre de 2026 y pendientes de que el director
 * los confirme; cada uno está registrado en el cerebro.
 */
export const condiciones = {
  moneda: 'USD',
  monedaNombre: 'dólares estadounidenses',
  /** Proyectos a la medida, si la cotización no fija otro calendario. */
  anticipoPorcentaje: 50,
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
