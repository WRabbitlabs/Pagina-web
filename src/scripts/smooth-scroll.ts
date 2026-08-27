/**
 * Scroll con inercia.
 *
 * El scroll nativo se detiene en seco al soltar la rueda. Este interpola la
 * posición hacia el destino cada fotograma, así que el movimiento sigue un
 * instante después de que pares — el "eco" de la referencia.
 *
 * Tres condiciones de diseño, y las tres importan:
 *
 * 1. Desplaza la ventana de verdad (`window.scrollTo` por fotograma), no
 *    transforma un contenedor. Es la única variante compatible con
 *    `position: sticky`, y este sitio se sostiene sobre sticky: el marco del
 *    hero y las tres declaraciones. Un scroll por `transform` los rompería.
 *
 * 2. Al desplazar de verdad, `scrollY` y `getBoundingClientRect()` siguen
 *    siendo ciertos y el evento `scroll` nativo sigue disparándose. Nada del
 *    resto del sitio necesita enterarse de que esto existe.
 *
 * 3. Se carga por importación dinámica y sólo donde aporta: con puntero fino
 *    (rueda o trackpad) y sin movimiento reducido. En móvil el gesto táctil ya
 *    trae su propia inercia del sistema, mejor que cualquier emulación, así
 *    que ahí no se descarga ni un byte.
 */

const canGlide =
  matchMedia('(pointer: fine)').matches &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches;

export function smoothScroll() {
  if (!canGlide) return;

  void import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      /*
       * Cuánto se acerca al destino por fotograma. Más bajo, más deslizamiento:
       * 0.1 es el reposo habitual y 0.09 alarga el eco lo justo para que se
       * note el hielo sin que la página se sienta pesada al frenar.
       */
      lerp: 0.09,
      /* El táctil se queda nativo: la inercia del sistema es mejor. */
      syncTouch: false,
      /* Lenis lleva su propio rAF; no hace falta uno nuestro. */
      autoRaf: true,
      /*
       * Las anclas se quedan en salto instantáneo. La única del sitio es el
       * enlace de salto al contenido, y un usuario de teclado que lo pulsa
       * quiere llegar, no viajar.
       */
      anchors: false,
    });

    /*
     * Si el sistema pasa a movimiento reducido a mitad de sesión, esto se
     * desmonta. El ajuste puede cambiar sin recargar la página.
     */
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener(
      'change',
      (e) => {
        if (e.matches) lenis.destroy();
      },
      { once: true },
    );
  });
}
