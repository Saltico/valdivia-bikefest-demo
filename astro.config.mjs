// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Selector de target de build (ver README):
//   DEPLOY_TARGET=static (default) → GitHub Pages: sitio estático puro, SIN adapter
//                                    y SIN Keystatic. Respeta PUBLIC_BASE_PATH.
//   DEPLOY_TARGET=node             → Hostinger (Node.js): adapter @astrojs/node
//                                    standalone + Keystatic (storage cloud). base '/'.
//                                    Las páginas públicas siguen prerenderizadas;
//                                    solo /keystatic y /api/keystatic son on-demand.
//   `astro dev` con ASTRO_ENABLE_KEYSTATIC=true → Keystatic local en desarrollo.
const VALID_TARGETS = ['static', 'node'];

// Astro NO admite defineConfig como función: se exporta un objeto (top-level await).
// .env no se carga solo en astro.config.mjs: process.env (CI / panel de Hostinger)
// tiene prioridad y .env es el fallback local.
const fileEnv = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const env = (/** @type {string} */ key) => process.env[key] ?? fileEnv[key];

const target = env('DEPLOY_TARGET') ?? 'static';
if (!VALID_TARGETS.includes(target)) {
  throw new Error(`DEPLOY_TARGET inválido: "${target}". Usa "static" o "node".`);
}
const isNode = target === 'node';
const isDev = process.argv.includes('dev');

// Keystatic: siempre en el target node; en dev solo si se pide; nunca en static.
const enableKeystatic = isNode || (isDev && env('ASTRO_ENABLE_KEYSTATIC') === 'true');

// Dominio canónico (sitemap, canonicals, OG). Override con PUBLIC_SITE_URL.
const site = env('PUBLIC_SITE_URL') ?? 'https://valdiviabikefest.cl';
// GitHub Pages sirve bajo un subpath (PUBLIC_BASE_PATH=/valdivia-bikefest-demo).
// Hostinger (node) sirve en la raíz del dominio/subdominio.
const base = isNode ? '/' : (env('PUBLIC_BASE_PATH') ?? '/');

export default defineConfig({
  site,
  base,
  // Siempre 'static': todas las páginas públicas se prerenderizan. Con el
  // adapter node, solo las rutas inyectadas por Keystatic son on-demand.
  output: 'static',
  adapter: isNode
    ? (await import('@astrojs/node')).default({ mode: 'standalone' })
    : undefined,
  // CSS crítico inline: evita el <link rel=stylesheet> bloqueante (un solo CSS
  // global de ~55 kB; 'auto' no lo inlinearía por el límite de 4 kB).
  build: { inlineStylesheets: 'always' },
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !['/thank-you', '/404', '/500', '/legal', '/privacy', '/cookies', '/keystatic']
          .some((p) => page.includes(p)),
    }),
    ...(enableKeystatic
      ? [
          // Keystatic exige la integración de React para su UI de admin.
          (await import('@astrojs/react')).default(),
          (await import('@keystatic/astro')).default(),
        ]
      : []),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  },
});
