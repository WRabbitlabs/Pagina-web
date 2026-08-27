/**
 * Contadores que suben al entrar en pantalla.
 *
 * Marcado esperado:
 *
 *   <span data-count="99.4" data-decimals="1">99,4</span>
 *
 * El valor final ya viene escrito por el servidor. El script solo lo pone a
 * cero un instante y lo vuelve a subir: si no hay JS, si el usuario pidió
 * menos movimiento o si el observer nunca dispara, en pantalla queda la cifra
 * correcta. Nunca hay un estado en el que el número esté mal.
 *
 * El ancho lo reserva el CSS con `ch` y cifras tabulares, así que la cuenta
 * no mueve nada de su sitio: cero CLS.
 */

import { esNumber } from '../lib/format';

const DUR = 900;

export function counters(root: ParentNode = document): void {
  /*
   * `data-counted` porque esto lo llaman dos componentes distintos y los dos
   * barren el documento entero: sin la marca, cada cifra acabaría con dos
   * observers y dos bucles escribiendo encima del otro.
   */
  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-count]:not([data-counted])'));
  if (!els.length) return;

  els.forEach((el) => (el.dataset.counted = ''));

  /* Con movimiento reducido no se toca nada: el número ya está puesto. */
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let pending = els.length;

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    if (!Number.isFinite(target)) return;

    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      /* easeOutCubic: llega deprisa y frena, como el resto del sitio. */
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = esNumber(target * e, decimals);
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        obs.unobserve(entry.target);
        pending--;
        run(entry.target as HTMLElement);
      }
      if (pending <= 0) obs.disconnect();
    },
    { threshold: 0.4 },
  );

  els.forEach((el) => observer.observe(el));
}
