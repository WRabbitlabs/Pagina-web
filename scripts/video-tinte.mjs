/**
 * El tinte del vídeo del hero, en un solo sitio.
 *
 * El generador entregó las cintas de vidrio en verde-teal. La marca de
 * septiembre de 2026 es azul, así que el vídeo se lleva al azul de la W sin
 * volver a generarlo. No se rota el tono: el cuerpo de las cintas ya era casi
 * gris y lo único saturado era la cresta lima, así que una rotación dejaría
 * dos matices. Se hace un duotono: se desatura del todo y la luminancia se
 * mapea, con el filtro `curves` de ffmpeg, entre tres puntos fijos:
 *
 *   negro  → #0a1225  algo más oscuro que la tinta, para que el marco del
 *                     hero (tinta) y el vídeo no se separen
 *   medio  → #285490  la tinta encendida
 *   blanco → #5cb8ff  la segunda parada de la W sobre oscuro
 *
 * El blanco se limita a la segunda parada, no a la señal (#7fc7f9): la señal
 * queda reservada a la interfaz y sigue leyéndose como estado activo, no
 * como brillo del fondo. Lo usan `hero-video.mjs` (al preparar un vídeo nuevo)
 * y `hero-tint.mjs` (al reteñir el que ya está publicado).
 */
const punto = (hex) => [1, 3, 5].map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3));
const NEGRO = punto('#0a1225');
const MEDIO = punto('#285490');
const BLANCO = punto('#5cb8ff');
const curva = (i) => `0/${NEGRO[i]} 0.5/${MEDIO[i]} 1/${BLANCO[i]}`;

export const FILTRO_COLOR = `hue=s=0,curves=r='${curva(0)}':g='${curva(1)}':b='${curva(2)}'`;
