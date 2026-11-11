// src/middleware.ts
// Mantiene el admin de Keystatic fuera de los buscadores (target node).
// Solo actúa sobre /keystatic* y /api/keystatic*; el resto de rutas (todas
// prerenderizadas) pasa intacto, así que no afecta al build static.
import { defineMiddleware } from 'astro:middleware';

const ADMIN_PATH = /^\/(?:api\/)?keystatic(?:\/|$)/;
const META = '<meta name="robots" content="noindex, nofollow">';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!ADMIN_PATH.test(context.url.pathname)) return response;

  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow');

  const isHtml = headers.get('content-type')?.includes('text/html');
  if (!isHtml) {
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  // HTML del admin: añade también <meta robots> dentro de <head>.
  // La página del admin puede no traer <head> explícito: en ese caso se inserta
  // tras el doctype (el parser la ubica en el <head> implícito).
  const original = await response.text();
  const html = /<head[^>]*>/i.test(original)
    ? original.replace(/<head([^>]*)>/i, `<head$1>${META}`)
    : original.replace(/^(<!doctype html>)?/i, `$1${META}`);
  headers.delete('content-length');
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
});
