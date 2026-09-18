/**
 * El tinte de las fotografías, en un solo sitio.
 *
 * Toda foto del sitio se desatura y se tiñe hacia la tinta para que conviva
 * con los bloques oscuros. El tinte no es la tinta exacta sino la tinta subida
 * unos puntos de luz: sharp conserva la luminancia de la foto y solo toma de
 * aquí la dirección del croma, así que un tinte demasiado oscuro apaga los
 * medios tonos. Lo usan `photos.mjs` (al adquirir fotos) y `photos-retint.mjs`
 * (al reteñir las que ya están en src/assets/).
 */
export const TINTE_FOTOS = '#273b56';
export const SATURACION_FOTOS = 0.18;
export const BRILLO_FOTOS = 0.94;
