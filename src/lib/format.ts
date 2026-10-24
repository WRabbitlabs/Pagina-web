/**
 * Formato numérico colombiano: punto para los miles, coma para los decimales.
 *
 * A mano y no con `toLocaleString('es-CO')` porque el mismo número lo escribe
 * el servidor al compilar y el contador en el navegador: si una de las dos
 * partes corre sobre un Node sin ICU completo, el separador cambia y la cifra
 * baila al empezar la cuenta. Con esto, las dos escriben igual siempre.
 */
export function esNumber(n: number, decimals = 0): string {
  const [int = '0', dec] = n.toFixed(decimals).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return dec ? `${grouped},${dec}` : grouped;
}

/**
 * Cuántos caracteres ocupa la cifra ya formateada. Sirve para reservarle el
 * ancho en `ch` y que el contador no empuje lo que tiene al lado.
 */
export const numWidth = (n: number, decimals = 0) => esNumber(n, decimals).length;

/**
 * La misma cifra en el formato de cada idioma del sitio: en inglés, coma para
 * los miles y punto para los decimales. A mano por la misma razón que
 * `esNumber`. En el navegador, el idioma sale de `<html lang>`.
 */
export function numero(n: number, decimals = 0, idioma: string = 'es'): string {
  if (idioma !== 'en') return esNumber(n, decimals);
  const [int = '0', dec] = n.toFixed(decimals).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec ? `${grouped}.${dec}` : grouped;
}
