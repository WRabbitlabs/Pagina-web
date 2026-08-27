# Despliegue — Cloudflare

Dominio canónico: **`wrailabs.com`**, apex y sin `www`.

Vive en `SITE_URL` (`astro.config.mjs`) y desde ahí alimenta el `canonical`, el
`og:url`, el sitemap y el JSON-LD. Cambiarlo en un solo sitio los cambia todos.

---

## Por qué Cloudflare y no GitHub Pages

Se descartó por una razón concreta, no por preferencia.

GitHub Pages sirve **archivos estáticos y nada más**. Este sitio es estático
salvo una ruta: `/api/contacto` declara `prerender = false` porque valida,
sanea y limita por IP en el servidor. Publicado en GitHub Pages, el sitio se
vería perfecto y **el formulario haría POST contra un 404 — en silencio, para
todos los visitantes**. El navegador no avisa: la persona escribe, pulsa enviar
y no pasa nada.

Cloudflare sirve el estático **y** ejecuta la función, bajo el mismo dominio.

Y una aclaración que suele confundir: «estático» describe cómo llega el HTML al
navegador, no si la página se mueve. **Todas las animaciones del sitio son CSS
y JavaScript de cliente** y funcionan igual. De hecho van mejor: el HTML sale
del CDN sin que ningún proceso lo genere, así que pinta antes y las animaciones
arrancan antes.

---

## Qué genera el build

```bash
npm run build      # incluye astro check: un error de tipos no compila
```

| Ruta | Qué es |
|---|---|
| `dist/client/` | El sitio estático. Se sirve por el binding `ASSETS`. |
| `dist/server/entry.mjs` | La función. Solo la ejecuta `/api/contacto`. |
| `dist/server/wrangler.json` | Configuración generada por el adaptador. **No se edita a mano**: se regenera en cada build. |

El Worker se llama **`wrabbit-ai`** (campo `name` del `wrangler.json`).

---

## Opción A — conectar el repositorio (recomendada)

Cloudflare compila y publica solo, en cada `push`. No hace falta instalar ni
autenticar nada en local.

1. En el panel de Cloudflare: **Workers & Pages → Create → Import a repository**.
2. Autorizar GitHub y elegir **`WRabbitlabs/Pagina-web`**.
3. Rama de producción: **`main`**.
4. Ajustes de compilación:

   | Campo | Valor |
   |---|---|
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy -c dist/server/wrangler.json` |
   | Root directory | *(vacío)* |

5. Variables de entorno y secretos: ver la tabla de abajo.
6. Guardar y desplegar. Sale una URL `*.workers.dev` para comprobar.

## Opción B — desde local

```bash
npx wrangler login
npm run build
npx wrangler deploy -c dist/server/wrangler.json
```

---

## Variables y secretos

En el panel del Worker, **Settings → Variables and Secrets**. Los que llevan
clave van como **Secret**, no como texto plano.

| Nombre | Tipo | Valor | Si falta |
|---|---|---|---|
| `PUBLIC_SITE_URL` | Variable | `https://wrailabs.com` | Cae al valor por defecto, que ya es ese. En vistas previas conviene poner la URL de la vista previa. |
| `MAIL_PROVIDER` | Variable | `resend` | **Cae a `log` y la función falla a propósito.** Con `log` el mensaje no llega a nadie; antes respondía «enviado» y el lead se perdía sin rastro. |
| `CONTACT_TO_EMAIL` | Secret | El correo que recibe los mensajes | La función responde error. |
| `RESEND_API_KEY` | Secret | La clave de Resend | Igual. |
| `MAIL_FROM` | Variable | `WRabbit AI <no-reply@wrailabs.com>` | Usa ese mismo valor por defecto. |
| `TRUST_PROXY` | Variable | `true` | En Cloudflare debe ir en `true`: hay proxy delante y es quien reescribe `X-Forwarded-For`. En un servidor desnudo debe ir en falso, o cualquiera falsifica la cabecera y salta el límite. |

**Resend:** hay que verificar `wrailabs.com` como dominio remitente. Sin eso
Resend rechaza el envío y el visitante recibe el error con la salida al correo
directo.

---

## El espacio KV `SESSION`

El `wrangler.json` generado declara un binding `SESSION` para las sesiones de
Astro. El sitio no las usa, pero el binding va declarado.

Cloudflare lo **aprovisiona solo** en el primer despliegue. Si aun así el
despliegue se queja de que falta:

```bash
npx wrangler kv namespace create SESSION
```

y añadir el binding en **Settings → Bindings** del Worker.

---

## El dominio

`wrailabs.com` todavía no resuelve. Para apuntarlo:

1. **Añadir el dominio a Cloudflare**: panel principal → **Add a site** →
   `wrailabs.com`. Cloudflare da dos servidores de nombres.
2. **Cambiar los nameservers** en el registrador donde se compró el dominio,
   por los dos que dio Cloudflare. Tarda entre minutos y unas horas.
3. Cuando el dominio esté activo: en el Worker, **Settings → Domains &
   Routes → Add → Custom domain** → `wrailabs.com`.
4. Añadir también `www.wrailabs.com` **como redirección 301 al apex**, no como
   una segunda copia del sitio.

---

## Limitación conocida — el límite por IP

El límite de `/api/contacto` es una **ventana en memoria del proceso**. En
Workers cada isolate tiene la suya y se recicla a menudo, así que el límite es
orientativo: alguien decidido puede pasarlo abriendo conexiones que caigan en
isolates distintos.

**La barrera que sí aguanta es el honeypot**, que no depende de estado
compartido: el campo trampa se rellena o no se rellena.

Para un límite real hace falta estado compartido — KV, un Durable Object, o la
regla de rate limiting del propio Cloudflare, que es la más barata de las tres
porque no toca el código. **No está hecho.** Se documenta aquí para que la
degradación sea una decisión y no una sorpresa.

---

## Antes de abrir al público

El sitio se despliega **en modo cerrado**: `site.indexable` está en `false`, así
que cada página emite `noindex, nofollow` y `robots.txt` responde
`Disallow: /`. Se puede enseñar por enlace; no se encuentra buscando.

Es deliberado. Para abrirlo hay que resolver esto primero, y nada de ello es
código:

### Bloqueante — las páginas legales

`/privacidad` y `/terminos` muestran, visible para cualquiera, un aviso que dice
que el texto es un borrador sin revisión jurídica. Y `/contact` recoge nombre,
organización, correo y teléfono bajo esa misma política. Bajo la Ley 1581 de
2012 eso hay que resolverlo antes de recoger un solo dato real.

### Datos de relleno que hoy se renderizan

| Dato | Valor actual | Dónde sale |
|---|---|---|
| NIT | `901.000.000-0` | pie de todas las páginas y cuerpo de `/privacidad` |
| Teléfono | `+57 601 000 0000` | JSON-LD `Organization` |
| Dirección | `Calle 100 # 00-00` | JSON-LD y `/privacidad` |
| LinkedIn de la compañía | `/company/wrabbit-ai` | **404** — pie y `sameAs` |
| X | `x.com/wrabbitai` | **404** — pie y `sameAs` |
| Correo | `contacto@wrailabs.com` | hay que crear el buzón |

El LinkedIn del director general sí es real y ya está en su ficha.

### Lo demás

- Las biografías del equipo siguen en `PENDIENTE`. Hoy no se renderizan: la
  plantilla solo muestra nombre, cargo y enlaces.
- Dos de las tres fichas de `src/content/team/` están en `draft: true`. Vuelven
  quitando esa línea.
- La tipografía Aspekta no está: el sistema usa Inter Tight como sustituta.

### Y entonces

1. Confirmar que `PUBLIC_SITE_URL` es `https://wrailabs.com`.
2. `site.indexable = true` en `src/data/site.ts`.
3. `npm run build` y comprobar que `robots.txt` ya dice `Allow: /` y que las
   páginas no llevan `noindex`.
