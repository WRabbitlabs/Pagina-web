/**
 * Validación del formulario de contacto — sin dependencias.
 *
 * El MISMO módulo corre en el cliente y en el servidor. No es que las
 * reglas "coincidan": son literalmente el mismo código, así que no pueden
 * divergir. El servidor valida siempre; lo del cliente es una cortesía.
 *
 * Se evitó zod a propósito: son ~13 KB en el bundle del cliente para
 * reglas que caben aquí. Ver DESIGN.md §7, presupuesto de JS.
 */

/** Control chars excepto \n, \r y \t. Escapado para no meter bytes crudos. */
const CONTROL_CHARS = new RegExp(
  '[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]',
  'g',
);

/**
 * Quita caracteres de control, elimina cualquier etiqueta HTML y colapsa
 * espacios horizontales. Nada de marcado llega nunca al correo.
 */
export function sanitize(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return '';
  return (
    value
      .replace(CONTROL_CHARS, '')
      /*
       * Primero script y style CON su contenido. Quitar solo las etiquetas
       * dejaría el cuerpo del script como texto plano, que es inofensivo en
       * un correo de texto pero se convierte en XSS almacenado en cuanto
       * alguien renderice ese valor como HTML.
       */
      .replace(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, '')
      .replace(/<(script|style)\b[\s\S]*$/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[ \t]+/g, ' ')
      .trim()
      .slice(0, max)
  );
}

/** Para encabezados de correo: además, cero saltos de línea (inyección de CC). */
export function sanitizeHeader(value: unknown, max = 200): string {
  return sanitize(value, max).replace(/[\r\n]+/g, ' ');
}

export const ORG_TYPES = ['Empresa', 'Buffet de abogados', 'Entidad pública', 'Otro'] as const;
export type OrgType = (typeof ORG_TYPES)[number];

/** Campo trampa: un bot lo llena, una persona no lo ve. */
export const HONEYPOT_FIELD = 'sitio-web';

export interface ContactData {
  nombre: string;
  organizacion: string;
  tipo: OrgType;
  email: string;
  telefono: string;
  mensaje: string;
  consentimiento: boolean;
}

export type FieldErrors = Partial<Record<keyof ContactData, string>>;

export const LIMITS = {
  nombre: { min: 2, max: 80 },
  organizacion: { min: 2, max: 120 },
  email: { max: 160 },
  telefono: { max: 40 },
  mensaje: { min: 20, max: 2000 },
} as const;

/**
 * Suficientemente estricta para atrapar errores de dedo, deliberadamente
 * no exhaustiva: la validación real de un correo es enviarlo.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** Normaliza lo que venga (FormData, JSON, objeto) a la forma esperada. */
export function normalize(raw: Record<string, unknown>): ContactData {
  const consent = raw.consentimiento;
  return {
    nombre: sanitizeHeader(raw.nombre, LIMITS.nombre.max),
    organizacion: sanitizeHeader(raw.organizacion, LIMITS.organizacion.max),
    tipo: sanitizeHeader(raw.tipo, 40) as OrgType,
    email: sanitizeHeader(raw.email, LIMITS.email.max),
    telefono: sanitizeHeader(raw.telefono, LIMITS.telefono.max),
    mensaje: sanitize(raw.mensaje, LIMITS.mensaje.max),
    consentimiento: consent === true || consent === 'on' || consent === 'true',
  };
}

/**
 * Devuelve un error por campo. Objeto vacío = válido.
 * Los mensajes dicen qué pasó y qué hacer, nunca solo "campo inválido".
 */
export function validate(data: ContactData): FieldErrors {
  const errors: FieldErrors = {};

  if (data.nombre.length < LIMITS.nombre.min) {
    errors.nombre = 'Escriba su nombre completo.';
  }

  if (data.organizacion.length < LIMITS.organizacion.min) {
    errors.organizacion = 'Escriba el nombre de su organización.';
  }

  if (!ORG_TYPES.includes(data.tipo)) {
    errors.tipo = 'Seleccione el tipo de organización.';
  }

  if (!data.email) {
    errors.email = 'Escriba un correo donde podamos responderle.';
  } else if (!EMAIL.test(data.email)) {
    errors.email = 'Ese correo no parece válido. Revise que tenga @ y un dominio.';
  }

  if (data.telefono.length > LIMITS.telefono.max) {
    errors.telefono = `El teléfono no puede pasar de ${LIMITS.telefono.max} caracteres.`;
  }

  if (data.mensaje.length < LIMITS.mensaje.min) {
    errors.mensaje = `Cuéntenos algo más: mínimo ${LIMITS.mensaje.min} caracteres.`;
  }

  // Ley 1581 de 2012: sin autorización no se puede tratar el dato.
  if (!data.consentimiento) {
    errors.consentimiento = 'Necesitamos su autorización para tratar sus datos personales.';
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
