/**
 * Reveals al scroll — el único patrón de aparición del sitio.
 *
 * opacidad 0→1 + translateY(20px)→0. Se dispara una vez por elemento,
 * se deja de observar en cuanto ocurre, y el observer se desconecta
 * cuando ya no queda nada por revelar.
 */
const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

if (els.length) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Nada aparece: todo estaba visible desde el principio.
    els.forEach((el) => el.classList.add('is-revealed'));
  } else {
    let pending = els.length;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
          pending--;
        }
        if (pending <= 0) obs.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    els.forEach((el) => observer.observe(el));
  }
}
