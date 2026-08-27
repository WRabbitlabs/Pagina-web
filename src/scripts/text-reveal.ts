/**
 * Revelado tipográfico palabra por palabra.
 *
 * Cada palabra queda dentro de una caja recortada con una tapa encima pintada
 * en `currentColor` — del color exacto del texto que oculta. Al entrar en
 * pantalla la tapa se desliza hacia abajo y descubre la palabra.
 *
 * Que la tapa sea `currentColor` importa: antes de revelarse, el titular se
 * lee como una serie de bloques macizos del color de la tinta, no como un
 * hueco vacío. Y en un titular a dos tonos cada tapa toma el tono de su
 * palabra sin que haya que decírselo.
 *
 * Ninguna palabra baja a la vez que otra ni a la misma velocidad: cada una
 * lleva su propio retardo y su propia duración. Con un escalonado regular el
 * gesto se lee como una persiana; con la variación, como veinte piezas
 * sueltas.
 *
 * No depende del scroll: se dispara una vez, al entrar el bloque, y el
 * elemento deja de observarse.
 *
 * Accesibilidad: la frase entera se conserva en un nodo `.sr-only` y las
 * palabras troceadas quedan `aria-hidden`, así que el lector de pantalla la
 * anuncia de una vez y nunca palabra por palabra.
 */

/** ms entre palabra y palabra. */
const STEP = 34;
/** Tope del escalonado: pasado esto sólo las separa la variación. */
const MAX_DELAY = 520;
/** Margen aleatorio del arranque, en ms. */
const JITTER = 130;
/** Duración de la tapa: mínimo y recorrido. */
const DUR_MIN = 520;
const DUR_SPAN = 460;

/**
 * Ruido determinista a partir del índice. Determinista y no `Math.random`
 * para que el mismo titular se comporte igual en cada carga: si algo se ve
 * raro, se puede reproducir.
 */
const noise = (n: number): number => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Trocea los nodos de texto en cajas de palabra sin tocar los elementos que
 * encuentre por el camino. Recorre en profundidad porque un titular a dos
 * tonos lleva un <span> dentro, y reescribir el contenido desde textContent
 * —como hacía la versión anterior— se lo llevaba por delante.
 */
function split(node: Node, ctx: { i: number }): void {
  Array.from(node.childNodes).forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      split(child, ctx);
      return;
    }

    if (child.nodeType !== Node.TEXT_NODE) return;
    const text = child.textContent ?? '';
    if (!text.trim()) return;

    const frag = document.createDocumentFragment();

    /* El separador se conserva: sin él se pierde el espacio que había entre
       el último texto suelto y el <span> del segundo tono. */
    text.split(/(\s+)/).forEach((chunk) => {
      if (!chunk) return;

      if (/^\s+$/.test(chunk)) {
        frag.appendChild(document.createTextNode(' '));
        return;
      }

      const i = ctx.i++;
      const box = document.createElement('span');
      box.className = 'rw';
      box.setAttribute('aria-hidden', 'true');
      box.style.setProperty(
        '--d',
        `${Math.round(Math.min(i * STEP, MAX_DELAY) + noise(i) * JITTER)}ms`,
      );
      box.style.setProperty(
        '--rd',
        `${Math.round(DUR_MIN + noise(i + 101) * DUR_SPAN)}ms`,
      );

      box.appendChild(document.createTextNode(chunk));

      const cover = document.createElement('span');
      cover.className = 'rw__o';
      box.appendChild(cover);

      frag.appendChild(box);
    });

    node.replaceChild(frag, child);
  });
}

export function textReveal(): void {
  const nodes = document.querySelectorAll<HTMLElement>('[data-text-reveal]');
  if (!nodes.length) return;

  /* Con reduced-motion no se trocea nada: el texto ya está en el HTML. */
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets: HTMLElement[] = [];

  nodes.forEach((el) => {
    const text = el.textContent?.replace(/\s+/g, ' ').trim();
    if (!text) return;

    const ctx = { i: 0 };
    split(el, ctx);
    if (!ctx.i) return;

    /*
     * La frase entera, oculta a la vista pero legible por el lector de
     * pantalla. No se usa aria-label: en un <p> —que no tiene rol implícito—
     * ese atributo está prohibido y lo marca como error de accesibilidad.
     * Un nodo real funciona en cualquier elemento.
     */
    const whole = document.createElement('span');
    whole.className = 'sr-only';
    whole.textContent = text;
    el.insertBefore(whole, el.firstChild);

    el.classList.add('is-split');
    targets.push(el);
  });

  if (!targets.length) return;

  let left = targets.length;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        (e.target as HTMLElement).classList.add('is-in');
        io.unobserve(e.target);
        if (--left === 0) io.disconnect();
      });
    },
    /* Arranca cuando el bloque ya entró de verdad, no al rozar el borde. */
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  );

  targets.forEach((t) => io.observe(t));
}
