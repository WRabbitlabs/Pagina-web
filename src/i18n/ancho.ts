/**
 * El mismo molde que un objeto `as const`, pero con los textos abiertos.
 *
 * Los datos en español se declaran `as const`, así que su tipo dice el texto
 * exacto («Ver la compañía») y no «un texto». La versión en inglés tiene que
 * tener la misma forma —las mismas claves, la misma cantidad de niveles— con
 * otras palabras. `Ancho` conserva la forma y abre los literales: si a la
 * traducción le falta una clave o le sobra una, el build lo dice.
 */
/**
 * Claves que no son texto sino nombres internos (qué icono, qué estado del
 * plan): se traducen las etiquetas, nunca estas. Conservan sus valores
 * exactos para que un error de tipeo en la traducción no pase el build.
 */
type Fijas = 'icon' | 'state';

export type Ancho<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Ancho<U>[]
        : T extends object
          ? { readonly [K in keyof T]: K extends Fijas ? T[K] : Ancho<T[K]> }
          : T;
