// src/pages/robots.txt.ts
// robots.txt prerenderizado: el dominio/base salen de PUBLIC_SITE_URL + base
// (getSiteUrl), así sirve igual en GitHub Pages (subruta) y en Hostinger.
import type { APIRoute } from 'astro';
import { getSiteUrl } from '@/lib/seo';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    // Sin barra final: cubre la ruta exacta y sus subrutas.
    'Disallow: /keystatic',
    'Disallow: /api/keystatic',
    '',
    `Sitemap: ${getSiteUrl('/sitemap-index.xml')}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
