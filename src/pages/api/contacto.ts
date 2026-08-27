import type { APIRoute } from 'astro';
import {
  normalize,
  validate,
  hasErrors,
  sanitize,
  sanitizeHeader,
  HONEYPOT_FIELD,
  type ContactData,
} from '../../lib/contact';

/** Este endpoint necesita servidor: se excluye del prerender. */
export const prerender = false;

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/* ------------------------------------------------------------------ */

/**
 * Ventana deslizante en memoria del proceso.
 *
 * ⚠ Sirve para una instancia. Si el despliegue escala a varias réplicas o
 * a funciones serverless, esto hay que moverlo a un store compartido
 * (Redis, Upstash o el rate limiting del proveedor). Documentado en README.
 */
const hits = new Map<string, number[]>();

const MAX = Number(import.meta.env.RATE_LIMIT_MAX ?? 5);
const WINDOW = Number(import.meta.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000);

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);

  // Poda perezosa para que el Map no crezca sin límite.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW)) hits.delete(key);
    }
  }

  return recent.length > MAX;
}

/*
 * La IP del cliente para el limite de tasa.
 *
 * `x-forwarded-for` lo escribe quien hace la peticion, asi que creerselo sin
 * mas convierte el limite en decorativo: basta con cambiar la cabecera en cada
 * intento para tener cuota infinita. Solo se lee cuando el despliegue declara
 * que hay un proxy de confianza delante (Cloudflare, un balanceador, nginx),
 * que es quien la reescribe. Sin esa declaracion manda `clientAddress`, la IP
 * real del socket, que el cliente no puede falsificar.
 */
function clientIp(request: Request, fallback?: string): string {
  if (import.meta.env.TRUST_PROXY === 'true') {
    const fwd = request.headers.get('x-forwarded-for');
    if (fwd) return fwd.split(',')[0]!.trim();
    const real = request.headers.get('x-real-ip');
    if (real) return real;
  }
  return fallback ?? 'desconocida';
}

/* ------------------------------------------------------------------ */
/* Envío                                                               */
/* ------------------------------------------------------------------ */

function buildEmail(data: ContactData) {
  const lines = [
    `Nombre:       ${sanitizeHeader(data.nombre)}`,
    `Organización: ${sanitizeHeader(data.organizacion)}`,
    `Tipo:         ${data.tipo}`,
    `Correo:       ${sanitizeHeader(data.email)}`,
    `Teléfono:     ${sanitizeHeader(data.telefono || '—')}`,
    '',
    'Mensaje:',
    sanitize(data.mensaje),
    '',
    `Autorización de tratamiento de datos: sí, ${new Date().toISOString()}`,
  ];

  return {
    subject: `Contacto — ${sanitizeHeader(data.organizacion, 80)}`,
    text: lines.join('\n'),
  };
}

async function deliver(data: ContactData): Promise<void> {
  const { subject, text } = buildEmail(data);
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const provider = import.meta.env.MAIL_PROVIDER ?? 'log';

  if (provider === 'resend') {
    const key = import.meta.env.RESEND_API_KEY;
    if (!key || !to) throw new Error('Faltan RESEND_API_KEY o CONTACT_TO_EMAIL');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: import.meta.env.MAIL_FROM ?? 'WRabbit AI <no-reply@wrabbit.ai>',
        to: [to],
        reply_to: data.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend respondió ${res.status}: ${await res.text()}`);
    }
    return;
  }

  /*
   * En produccion, `log` significa que el mensaje no llega a nadie. Antes
   * el formulario respondia "enviado" igual y el lead se perdia sin rastro;
   * ahora falla, que es lo unico honesto: mas vale que el visitante vea un
   * error y escriba al correo que creer que ya lo atendieron.
   */
  if (import.meta.env.PROD) {
    throw new Error(
      'MAIL_PROVIDER=log en produccion: el mensaje no se entregaria a nadie. ' +
        'Configurar MAIL_PROVIDER=resend con RESEND_API_KEY y CONTACT_TO_EMAIL.',
    );
  }

  // provider === 'log' — desarrollo. No sale nada del proceso.
  console.info(`\n--- Mensaje de contacto (no enviado, MAIL_PROVIDER=log) ---`);
  console.info(`Para: ${to ?? '(sin CONTACT_TO_EMAIL)'}`);
  console.info(`Asunto: ${subject}`);
  console.info(text);
  console.info('-----------------------------------------------------------\n');
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (rateLimited(clientIp(request, clientAddress))) {
    return json(
      {
        ok: false,
        message:
          'Recibimos varios mensajes suyos en poco tiempo. Espere unos minutos y vuelva a intentar, o escríbanos directamente a contacto@wrabbit.ai.',
      },
      429,
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: 'No pudimos leer el formulario.' }, 400);
  }

  /*
   * Honeypot. Si viene lleno respondemos 200 y no hacemos nada: un bot que
   * ve un error reintenta; uno que ve éxito se va.
   */
  if (sanitize(form.get(HONEYPOT_FIELD), 200) !== '') {
    return json({ ok: true, message: 'Mensaje recibido.' });
  }

  const data = normalize(Object.fromEntries(form));
  const errors = validate(data);

  if (hasErrors(errors)) {
    return json(
      { ok: false, message: 'Revise los campos marcados y vuelva a enviar.', errors },
      422,
    );
  }

  try {
    await deliver(data);
  } catch (error) {
    console.error('[contacto] fallo al enviar:', error);
    return json(
      {
        ok: false,
        message:
          'No pudimos entregar su mensaje. Vuelva a intentar en unos minutos o escríbanos a contacto@wrabbit.ai.',
      },
      502,
    );
  }

  return json({
    ok: true,
    message: 'Mensaje recibido. Le respondemos dentro de los dos días hábiles siguientes.',
  });
};

/** Cualquier otro método sobre esta ruta no existe. */
export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { allow: 'POST' } });
