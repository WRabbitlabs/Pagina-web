# Despliegue — GitHub Pages

Dominio canónico: **`wrailabs.com`**, apex y sin `www`.

Vive en `SITE_URL` (`astro.config.mjs`) y desde ahí alimenta el `canonical`, el
`og:url`, el sitemap y el JSON-LD. Cambiarlo en un solo sitio los cambia todos.
El propio dominio va en `public/CNAME`, que el build copia a la raíz de `dist/`.

---

## Qué se publica

El sitio es **estático puro**: once archivos HTML y nada que ejecutar. Sin
adaptador, sin servidor, sin proceso.

Y conviene decirlo porque el nombre confunde: **«estático» describe cómo llega
el HTML al navegador, no si la página se mueve.** Todas las animaciones son CSS
y JavaScript de cliente y funcionan igual. De hecho van mejor: el HTML sale de
un CDN sin que ningún proceso lo genere, así que pinta antes y el movimiento
arranca antes.

```bash
npm run build      # incluye astro check: un error de tipos no compila
```

La salida queda en `dist/`, plana: `index.html`, `company/`, `newsroom/`,
`robots.txt`, `sitemap-*.xml`, `CNAME` y los assets.

---

## Puesta en marcha

Una sola cosa a mano, y solo una vez:

> **Settings → Pages → Build and deployment → Source: `GitHub Actions`**

**Y hay que comprobar que la selección se guardó**, porque el desplegable puede
enseñar «GitHub Actions» sin que el sitio exista. Lo único que no miente es la
API:

```bash
curl -sI https://api.github.com/repos/WRabbitlabs/Pagina-web/pages | head -1
```

`200` es que está activado. `404` es que no, diga lo que diga la pantalla — y
con 404 el despliegue falla con *«Get Pages site failed»*.

Si da 404: elegir primero **«Deploy from a branch»** con `main` / `/ (root)` y
guardar —eso sí crea el sitio siempre—, y volver después a **«GitHub Actions»**.

El parámetro `enablement` de `actions/configure-pages` no sirve para esto: su
propia documentación dice que exige un token personal, no el del flujo.

Después, cada empujón a `main` construye y publica solo
(`.github/workflows/deploy.yml`). También se puede relanzar desde la pestaña
**Actions**, sin empujar nada.

### El dominio

`wrailabs.com` todavía no resuelve. En el registrador donde se compró:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `wrabbitlabs.github.io` |

Cuando propague, en **Settings → Pages** activar **Enforce HTTPS**. GitHub
emite el certificado solo; tarda unos minutos desde que el DNS resuelve.

---

## El formulario de contacto

Aquí está la renuncia de haber elegido GitHub Pages, y conviene tenerla escrita.

Había un endpoint propio, `/api/contacto`, que validaba, saneaba y limitaba por
IP **en el servidor**. GitHub Pages no ejecuta nada, así que se fue.

**La validación por campo sobrevive entera**: siempre corrió en el navegador
con el mismo módulo (`src/lib/contact.ts`), y de eso no dependía el servidor.
Los errores por campo, el foco al primero que falla, el consentimiento
obligatorio y el honeypot siguen funcionando igual.

Lo que falta es quién recibe el mensaje al final. Se resuelve con un servicio de
formularios —Formspree, Basin— y su dirección puesta en una variable del
repositorio:

> **Settings → Secrets and variables → Actions → Variables → New variable**
> `PUBLIC_FORM_ENDPOINT` = la URL que dé el servicio

**Mientras esa variable esté vacía, `/contact` no pinta un formulario**: enseña
los canales directos. Es deliberado. Un formulario que envía a ninguna parte es
peor que no tenerlo, porque el visitante escribe, pulsa enviar y cree que le
llegó a alguien.

Lo que se pierde frente al endpoint propio: el límite por IP y el saneamiento
en servidor. El honeypot y la validación de cliente se quedan.

---

## Antes de abrir al público

El sitio se publica **en modo cerrado**: `site.indexable` está en `false`, así
que cada página emite `noindex, nofollow` y `robots.txt` responde
`Disallow: /` a todo salvo a los rastreadores de vista previa de enlace, que sí
pueden leer las etiquetas Open Graph. Se puede enseñar por enlace y se ve bien
al pegarlo en WhatsApp; no se encuentra buscando.

Es deliberado. Para abrirlo hay que resolver esto primero, y nada de ello es
código:

### Bloqueante — las páginas legales

`/privacidad` y `/terminos` muestran, visible para cualquiera, un aviso que dice
que el texto es un borrador sin revisión jurídica. Bajo la Ley 1581 de 2012 eso
hay que resolverlo antes de recoger un solo dato real.

### Datos de relleno que hoy se renderizan

| Dato | Valor actual | Dónde sale |
|---|---|---|
| NIT | `901.000.000-0` | pie de todas las páginas y cuerpo de `/privacidad` |
| Teléfono | `+57 601 000 0000` | JSON-LD `Organization` |
| Dirección | `Calle 100 # 00-00` | JSON-LD y `/privacidad` |
| Razón social | `WRabbit AI S.A.S.` | pie y `/privacidad` — la marca es «WRabbit AI Labs»; el nombre registrado hay que confirmarlo |
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

1. `site.indexable = true` en `src/data/site.ts`.
2. `npm run build` y comprobar que `robots.txt` ya dice `Allow: /` y que las
   páginas no llevan `noindex`.

---

## Node

Astro 7 exige **Node ≥ 22.12**. Está fijado en `.nvmrc`, y los dos flujos de
GitHub Actions lo leen de ahí para no tener la versión escrita en dos sitios.

`package.json` declaraba `>=20.3.0`, que era sencillamente falso y ya rompió un
despliegue. Si vuelve a tocarse, que coincida con lo que Astro pide de verdad.

---

## Por qué no Cloudflare

Se intentó y se abandonó. El adaptador de Cloudflare permitía conservar el
endpoint del formulario, pero el despliegue no llegó a aterrizar: el proyecto
servía la plantilla por defecto en vez del sitio. Entre depurar el constructor
conectado y quitarse el servidor de encima, se eligió lo segundo — el sitio ya
era estático salvo por una ruta.

Si algún día hace falta recuperar el endpoint, el camino es un host que ejecute
Node: se añade el adaptador correspondiente en `astro.config.mjs` y se recupera
`src/pages/api/contacto.ts` del historial. Nada más del proyecto lo toca.
