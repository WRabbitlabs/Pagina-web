# Despliegue

Estado: **prototipo**. El sitio compila, pasa `astro check` sin errores y sirve
las diez rutas, pero **no está listo para un público real**. Lo que falta no es
código: son datos del cliente y una revisión jurídica. Ver [Antes de
abrir](#antes-de-abrir).

Mientras tanto el sitio se despliega en modo cerrado: `site.indexable` está en
`false`, así que cada página emite `noindex, nofollow` y `robots.txt` prohíbe el
rastreo completo. Se puede enseñar por enlace; no se puede encontrar buscando.

---

## GitHub Pages no sirve este sitio

Conviene decirlo antes que nada, porque es la primera opción que la gente
prueba y falla en silencio.

GitHub Pages solo entrega archivos estáticos. Este sitio tiene una ruta de
servidor —`src/pages/api/contacto.ts`, declarada `prerender = false`— que es la
que recibe el formulario de `/contact`. Sirve para validar, sanear y limitar
por IP antes de enviar el correo.

En GitHub Pages esa ruta no existe. El formulario haría `POST` contra un 404 y
cada mensaje se perdería. Todo lo demás —las nueve rutas restantes— sí
funcionaría, porque ya se prerenderiza.

Hay dos salidas y hay que elegir una.

### Opción A — un host que ejecute Node (recomendada)

Cloudflare Pages, Vercel o Netlify. El formulario sigue funcionando tal cual y
el cambio es de una línea en `astro.config.mjs`:

```bash
npm i @astrojs/cloudflare && npm rm @astrojs/node
```

Después, en `astro.config.mjs`, sustituir `node({ mode: 'standalone' })` por
`cloudflare()`. Nada más del proyecto lo toca: el adaptador está aislado a
propósito.

### Opción B — GitHub Pages, sin formulario propio

Poner `output: 'static'`, borrar `src/pages/api/contacto.ts` y apuntar el
formulario a un servicio externo (Formspree, Basin) o dejar solo el correo de
contacto. Se pierde el límite de tasa y el saneamiento del servidor, que es
justo lo que un sitio que habla de trazabilidad no debería perder.

Si aun así se elige: hace falta un `CNAME` con el dominio y, si se publica en
`usuario.github.io/repo`, un `base` en la configuración.

---

## Variables de entorno

Copiar `.env.example` a `.env` y rellenar. En el host se configuran como
variables del proyecto, nunca en el repositorio.

| Variable | Para qué | Si falta |
|---|---|---|
| `PUBLIC_SITE_URL` | Dominio canónico. Alimenta `canonical`, `og:url`, JSON-LD y sitemap. | Cae a `http://localhost:4321` y **todos los enlaces absolutos quedan mal**. |
| `MAIL_PROVIDER` | `log` o `resend`. | Cae a `log`. **En producción la API falla a propósito**: con `log` el mensaje no llega a nadie, y fallar es mejor que decir «enviado» y perderlo. |
| `RESEND_API_KEY` | Clave de Resend. | Con `MAIL_PROVIDER=resend`, la API responde error. |
| `CONTACT_TO_EMAIL` | Destinatario de los mensajes. | Igual que la anterior. |
| `MAIL_FROM` | Remitente. | Cae a un `no-reply@` del dominio. |
| `TRUST_PROXY` | `true` solo si hay un proxy que reescriba `X-Forwarded-For`. | Falso. El límite de tasa usa la IP real del socket, que no se puede falsificar. |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` | Ventana del límite por IP. | 5 mensajes cada 15 minutos. |

**Sobre `TRUST_PROXY`:** ponerlo en `true` sin un proxy delante deja el límite
de tasa en decoración — cualquiera cambia la cabecera en cada intento y tiene
cuota infinita. En Cloudflare o Vercel va en `true`; en un Node desnudo, no.

**Sobre el límite de tasa:** vive en la memoria del proceso. Con más de una
instancia, cada una lleva su propia cuenta. Para un prototipo alcanza; para
tráfico real hace falta un almacén compartido.

---

## Antes de abrir

Nada de esto es código. Son decisiones y datos que solo el cliente tiene.

### Bloqueantes

1. **El dominio.** `wrabbit.ai` **no es de la compañía**: hoy responde con
   «wrabbit — sovereign browser intelligence», de una organización llamada
   ZYNTHIO, con su propio canonical a `wrabbit.app`. Por eso el dominio salió
   del código a `PUBLIC_SITE_URL`. Hay que decidir cuál es el dominio real
   antes de publicar, porque de él dependen el canonical, el sitemap, las
   tarjetas sociales y el correo `contacto@…`.

2. **Las páginas legales.** `/privacidad` y `/terminos` muestran, visible para
   cualquiera, un aviso que dice que el texto es un borrador sin revisión
   jurídica. Y `/contact` recoge nombre, organización, correo y teléfono bajo
   esa misma política. Bajo la Ley 1581 de 2012 eso hay que resolverlo antes de
   recoger un solo dato real: o jurídica aprueba el texto y se quita el aviso,
   o esas rutas no se publican.

### Datos de relleno que hoy se renderizan

| Dato | Valor actual | Dónde sale |
|---|---|---|
| NIT | `901.000.000-0` | pie de todas las páginas y cuerpo de `/privacidad` |
| Teléfono | `+57 601 000 0000` | JSON-LD `Organization` |
| Dirección | `Calle 100 # 00-00` | JSON-LD y `/privacidad` |
| LinkedIn de la compañía | `/company/wrabbit-ai` | **404** — pie y `sameAs` |
| X | `x.com/wrabbitai` | **404** — pie y `sameAs` |

El LinkedIn del director general sí es real y ya está en su ficha.

### Lo demás

- Las biografías del equipo siguen en `PENDIENTE`. Hoy no se renderizan: la
  plantilla solo muestra nombre, cargo y enlaces.
- Dos de las tres fichas de `src/content/team/` están en `draft: true`. Vuelven
  quitando esa línea.
- La tipografía Aspekta no está: el sistema usa Inter Tight como sustituta.
  Ver `src/styles/tokens.css`.

---

## Publicar

```bash
npm ci && npm run build
```

`npm run build` incluye `astro check`. Si hay un error de tipos, no compila.

La salida queda en `dist/`: `dist/client` son los archivos estáticos y
`dist/server` el servidor de Node. Se arranca con:

```bash
node dist/server/entry.mjs
```

**Compresión:** `@astrojs/node` no comprime. Sin gzip o brotli delante, el HTML
viaja sin comprimir y el primer pintado en móvil se resiente de forma medible.
Cloudflare, Vercel y Netlify lo hacen solos; un Node desnudo necesita un proxy.

## Abrir al público

Cuando el dominio sea propio, los datos reales y jurídica haya aprobado:

1. `PUBLIC_SITE_URL` con el dominio definitivo.
2. `site.indexable = true` en `src/data/site.ts`.
3. `npm run build` y comprobar que `robots.txt` ya dice `Allow: /` y que las
   páginas no llevan `noindex`.
