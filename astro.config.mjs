// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Canonical production domain — override per project via PUBLIC_SITE_URL
const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'https://valdiviabikefest.cl';

// Base path — override for GitHub Pages via PUBLIC_BASE_PATH (e.g. '/valdivia-bikefest-demo')
const BASE_PATH = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig(async ({ mode }) => {
  // Keystatic CMS — lee ASTRO_ENABLE_KEYSTATIC de .env vía loadEnv (ver skill
  // keystatic-astro). El admin de Keystatic inyecta rutas on-demand
  // (/keystatic y /api/keystatic) que requieren adapter SSR: en el build
  // estático (GitHub Pages) se mantiene DESACTIVADO por diseño y la edición
  // se hace en local con `npm run keystatic` (astro dev).
  const { ASTRO_ENABLE_KEYSTATIC } = loadEnv(mode, process.cwd(), 'ASTRO_');
  const enableKeystatic = mode === 'development' && ASTRO_ENABLE_KEYSTATIC === 'true';

  return {
    site: SITE_URL,
    base: BASE_PATH,
    output: 'static',
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
      // Keystatic integration — solo en dev con ASTRO_ENABLE_KEYSTATIC=true
      ...(enableKeystatic
        ? [
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
  };
});
