// scripts/generate-keystatic-content.mjs
// MIGRACIÓN ONE-OFF (Fase 1 → Fase 2): extrae el contenido hardcodeado de los
// diccionarios src/i18n/*.ts y src/data/*.ts y lo escribe como archivos JSON
// de las colecciones Keystatic (src/content/**). Se ejecuta una sola vez y
// luego se elimina junto con los diccionarios fuente.
//
// Ejecutar desde la raíz del proyecto: node scripts/generate-keystatic-content.mjs
// (Node >= 22.12 con type stripping para importar los módulos .ts directamente.)

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const { homeCopy } = await import('../src/i18n/home.ts');
const { eventoCopy } = await import('../src/i18n/evento.ts');
const { rutaCopy } = await import('../src/i18n/ruta.ts');
const { resultadosCopy } = await import('../src/i18n/resultados.ts');
const { valdiviaCopy } = await import('../src/i18n/valdivia.ts');
const { contactoCopy } = await import('../src/i18n/contacto.ts');
const { commonCopy } = await import('../src/i18n/common.ts');
const { demoResultsData } = await import('../src/data/results.ts');

// site.ts usa import.meta.env (no disponible en Node plano): los dos valores
// que necesita el singleton se replican aquí tal cual están en src/data/site.ts
// (REGISTRATION_URL y EVENT_TARGET_DATE).
const REGISTRATION_URL = 'https://www.eventrid.cl/eventos/mvk/valdivia-bikefest-2026';
const EVENT_TARGET_DATE = '2027-03-14T14:10:00-03:00';

/** Slugs de categoría del tablero (mismo orden que los chips del original). */
const CATEGORY_SLUGS = [
  'elite-m', 'elite-f', 'sub23-m', 'sub23-f', 'junior-m', 'junior-f',
  'master-a', 'master-b', 'master-c', 'master-d', 'open',
];

const write = (relPath, data) => {
  const abs = join(root, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`✓ ${relPath}`);
};

for (const locale of ['es', 'en']) {
  // ── pagesHome ──────────────────────────────────────────────────────────
  const h = homeCopy[locale];
  write(`src/content/pages/home/${locale}.json`, {
    locale,
    metaTitle: h.meta.title,
    metaDescription: h.meta.description,
    signal: h.signal,
    signalBrand: h.signalBrand,
    headingHtml: h.headingHtml,
    intro: h.intro,
    exploreRoute: h.exploreRoute,
    status: h.status,
    statusAriaLabel: h.statusAriaLabel,
    countdown: h.countdown,
    statusMessage: h.statusMessage,
    endMessage: h.endMessage,
    evento: h.evento,
    ruta: h.ruta,
    schedule: h.schedule,
    resultados: h.resultados,
    valdivia: h.valdivia,
  });

  // ── pagesEvento ────────────────────────────────────────────────────────
  const e = eventoCopy[locale];
  write(`src/content/pages/evento/${locale}.json`, {
    locale,
    metaTitle: e.meta.title,
    metaDescription: e.meta.description,
    hero: e.hero,
    organizers: e.organizers,
    queEs: e.queEs,
    proposito: e.proposito,
    internacional: e.internacional,
    comunidad: e.comunidad,
  });

  // ── pagesRuta ──────────────────────────────────────────────────────────
  const r = rutaCopy[locale];
  write(`src/content/pages/ruta/${locale}.json`, {
    locale,
    metaTitle: r.meta.title,
    metaDescription: r.meta.description,
    hero: r.hero,
    keyData: r.keyData,
    formatos: r.formatos,
    programa: r.programa,
    categorias: r.categorias,
    galeriaLabel: r.galeriaLabel,
    lightboxLabel: r.lightboxLabel,
    lightboxClose: r.lightboxClose,
    galeria: r.galeria,
  });

  // ── pagesResultados ────────────────────────────────────────────────────
  const res = resultadosCopy[locale];
  write(`src/content/pages/resultados/${locale}.json`, {
    locale,
    metaTitle: res.meta.title,
    metaDescription: res.meta.description,
    hero: res.hero,
    demoBadge: res.demoBadge,
    demoNote: res.demoNote,
    boardHeadLeft: res.boardHeadLeft,
    boardHeadRight: res.boardHeadRight,
    tabsLabel: res.tabsLabel,
    chipsLabel: res.chipsLabel,
    chipAll: res.chipAll,
    categories: CATEGORY_SLUGS.map((slug, i) => ({ slug, label: res.categories[i] ?? slug })),
    columns: res.columns,
    boardFoot: res.boardFoot,
    xcoRows: demoResultsData.xco,
    xccRows: demoResultsData.xcc,
  });

  // ── pagesValdivia ──────────────────────────────────────────────────────
  // Nota: infoAction/mapAction del diccionario no se usan en el componente
  // (cada destino define sus propias etiquetas) → se omiten.
  const v = valdiviaCopy[locale];
  write(`src/content/pages/valdivia/${locale}.json`, {
    locale,
    metaTitle: v.meta.title,
    metaDescription: v.meta.description,
    hero: v.hero,
    navLabel: v.navLabel,
    destinations: v.destinations,
  });

  // ── pagesContacto ──────────────────────────────────────────────────────
  const c = contactoCopy[locale];
  write(`src/content/pages/contacto/${locale}.json`, {
    locale,
    metaTitle: c.meta.title,
    metaDescription: c.meta.description,
    hero: c.hero,
    // Nota: channelsLabel del diccionario no se usa en el componente → se omite.
    form: c.form,
    mapTitle: c.mapTitle,
  });

  // ── siteCommon ─────────────────────────────────────────────────────────
  const cm = commonCopy[locale];
  write(`src/content/common/${locale}.json`, {
    locale,
    skipToContent: cm.skipToContent,
    nav: cm.nav,
    register: cm.register,
    changeLanguage: cm.changeLanguage,
    openMenu: cm.openMenu,
    closeMenu: cm.closeMenu,
    mobileNavLabel: cm.mobileNavLabel,
    mainNavLabel: cm.mainNavLabel,
    homeLabel: cm.homeLabel,
    footerMeta: cm.footerMeta,
    finalCta: cm.finalCta,
  });
}

// ── siteSettings (singleton) ──────────────────────────────────────────────
write('src/content/settings/index.json', {
  registrationUrl: REGISTRATION_URL,
  eventTargetDate: EVENT_TARGET_DATE,
});

console.log('\nMigración de contenido completa: 15 archivos JSON en src/content/.');
