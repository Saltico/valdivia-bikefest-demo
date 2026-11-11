// src/utils/url.ts
// Helper único para prefijar `import.meta.env.BASE_URL` a rutas internas.
// Astro solo aplica `base` a /_astro/*; enlaces, imágenes y favicon deben
// prefijarse a mano (GitHub Pages sirve bajo /<repo>; Hostinger bajo '/').

/** Base normalizada sin slash final: '' (raíz) o '/subruta'. */
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

/** URLs que nunca se tocan: esquemas (http, mailto, tel, data…), protocolo-relativas y #anclas. */
const UNTOUCHED = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

/**
 * Prefija la base a una ruta interna. Idempotente: no duplica la base ni
 * slashes, y no modifica URLs absolutas, mailto:, tel:, #anclas ni rutas
 * relativas (sin "/" inicial).
 */
export function withBase(path: string): string {
  if (!path || UNTOUCHED.test(path) || !path.startsWith('/')) return path;
  if (!BASE) return path;
  if (path === BASE || path.startsWith(`${BASE}/`) || path.startsWith(`${BASE}?`) || path.startsWith(`${BASE}#`)) {
    return path;
  }
  return `${BASE}${path === '/' ? '' : path}` || '/';
}
