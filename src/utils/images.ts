// src/utils/images.ts
// Resuelve rutas de imagen guardadas como texto (p. ej. '/img/ruta.avif' en el
// contenido Keystatic) al ImageMetadata de src/assets/img, para que astro:assets
// genere variantes responsive (avif/webp + srcset). Si la ruta no existe en
// el mapa (https externa, archivo en public/), el llamador cae a <img> plano.

import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/*.{avif,jpg,jpeg,png,webp}',
  { eager: true },
);

/** nombre de archivo → ImageMetadata */
const byName = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([file, mod]) => [file.split('/').pop()!, mod.default]),
);

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * Acepta '/img/x.avif', 'x.avif' o la ruta con base ('/subruta/img/x.avif').
 * Solo se compara el nombre de archivo. Devuelve undefined para URLs externas
 * o archivos que no estén en src/assets/img.
 */
export function resolveImage(src: string): ImageMetadata | undefined {
  if (!src || EXTERNAL.test(src)) return undefined;
  return byName.get(src.split(/[?#]/)[0]!.split('/').pop()!);
}
