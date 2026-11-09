// src/i18n/common.ts
// Cadenas compartidas (header, footer, CTA final, a11y) en ES/EN.
// Fuente: HTML original + diccionario `common` de script.js.

import type { Locale } from './config';

export interface NavLink {
  label: string;
  href: string;
}

export interface CommonCopy {
  skipToContent: string;
  nav: NavLink[];
  register: string;
  changeLanguage: string;
  openMenu: string;
  closeMenu: string;
  mobileNavLabel: string;
  mainNavLabel: string;
  homeLabel: string;
  footerMeta: string;
  finalCta: {
    coordinate: string;
    kicker: string;
    headingHtml: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

const es: CommonCopy = {
  skipToContent: 'Saltar al contenido principal',
  nav: [
    { label: 'Evento', href: '/evento' },
    { label: 'Ruta y horario', href: '/ruta' },
    { label: 'Resultados', href: '/resultados' },
    { label: 'Valdivia', href: '/valdivia' },
    { label: 'Contacto', href: '/contacto' },
  ],
  register: 'Inscríbete',
  changeLanguage: 'Cambiar idioma',
  openMenu: 'Abrir menú',
  closeMenu: 'Cerrar menú',
  mobileNavLabel: 'Navegación móvil',
  mainNavLabel: 'Navegación principal',
  homeLabel: 'Valdivia Bike Fest, inicio',
  footerMeta: '© VBF / Valdivia, Chile',
  finalCta: {
    coordinate: 'VALDIVIA / CHILE',
    kicker: 'Tu próxima carrera',
    headingHtml: 'Nos vemos<br>en la <em>ruta</em>',
    primaryLabel: 'Inscríbete',
    secondaryLabel: 'Contáctanos',
    secondaryHref: '/contacto',
  },
};

const en: CommonCopy = {
  skipToContent: 'Skip to main content',
  nav: [
    { label: 'Event', href: '/evento' },
    { label: 'Route & schedule', href: '/ruta' },
    { label: 'Results', href: '/resultados' },
    { label: 'Valdivia', href: '/valdivia' },
    { label: 'Contact', href: '/contacto' },
  ],
  register: 'Register',
  changeLanguage: 'Change language',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  mobileNavLabel: 'Mobile navigation',
  mainNavLabel: 'Main navigation',
  homeLabel: 'Valdivia Bike Fest, home',
  footerMeta: '© VBF / Valdivia, Chile',
  finalCta: {
    coordinate: 'VALDIVIA / CHILE',
    kicker: 'Your next race',
    headingHtml: 'See you<br>on the <em>route</em>',
    primaryLabel: 'Register',
    secondaryLabel: 'Contact us',
    secondaryHref: '/contacto',
  },
};

export const commonCopy: Record<Locale, CommonCopy> = { es, en };
