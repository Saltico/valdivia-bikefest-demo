// src/lib/results.ts
// Visibilidad de Resultados, controlada desde Keystatic → Ajustes del sitio →
// "Publicar resultados" (siteSettings.showResults). Cuando está desmarcado:
//  - se quita el enlace /resultados del menú (header, móvil) y del pie;
//  - se oculta la sección de resultados de la portada;
//  - /resultados y /en/resultados muestran el aviso de espera (noindex);
//  - el sitemap excluye esas URLs (astro.config.mjs lee el mismo JSON).
// El sitio es estático: el cambio se aplica en el siguiente build (el guardado
// en Keystatic Cloud hace un commit que dispara el despliegue automático).

import { getEntry } from 'astro:content';

export const RESULTS_PATH = '/resultados';

export async function areResultsPublished(): Promise<boolean> {
  const settings = await getEntry('siteSettings', 'index');
  return settings?.data.showResults ?? false;
}

/** Quita el enlace a Resultados de una lista de navegación si no están publicados. */
export function filterResultsNav<T extends { href: string }>(items: T[], published: boolean): T[] {
  return published ? items : items.filter((item) => item.href.replace(/\/$/, '') !== RESULTS_PATH);
}
