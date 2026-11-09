// src/i18n/resultados.ts
// Copy de /resultados en ES/EN. Fuente: resultados.html + pageCopy.resultados.

import type { Locale } from './config';

export interface ResultadosCopy {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    headingHtml: string;
    intro: string;
  };
  demoBadge: string;
  demoNote: string;
  boardHeadLeft: string;
  boardHeadRight: string;
  tabsLabel: string;
  chipsLabel: string;
  chipAll: string;
  categories: string[]; // etiquetas de chips (Elite M, Elite F, …)
  columns: string[]; // POS / DORSAL / CORREDOR/A / CLUB / CATEGORÍA / TIEMPO / DIF.
  boardFoot: string[];
}

const es: ResultadosCopy = {
  meta: {
    title: 'Resultados | Valdivia Bike Fest',
    description: 'Consulta los resultados de Valdivia Bike Fest por categoría y tiempo.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / Resultados 2027',
    headingHtml: 'Tu marca<br><em>queda aquí</em>',
    intro: 'El tablero oficial se activará después de cada largada. Vuelve para buscar tu tiempo y revisar el resultado de tu categoría.',
  },
  demoBadge: 'DATOS DE PRUEBA',
  demoNote: 'Tabla de demostración con datos ficticios. El tablero oficial se activa después de cada largada.',
  boardHeadLeft: 'VBF / RESULTADOS',
  boardHeadRight: 'EN VIVO · DEMO',
  tabsLabel: 'Formato de competencia',
  chipsLabel: 'Filtro de categoría',
  chipAll: 'Todas',
  categories: ['Elite M', 'Elite F', 'Sub23 M', 'Sub23 F', 'Junior M', 'Junior F', 'Master A', 'Master B', 'Master C', 'Master D', 'Open'],
  columns: ['POS', 'DORSAL', 'CORREDOR/A', 'CLUB', 'CATEGORÍA', 'TIEMPO', 'DIF.'],
  boardFoot: ['XCO', 'XCC', 'CATEGORÍAS'],
};

const en: ResultadosCopy = {
  meta: {
    title: 'Results | Valdivia Bike Fest 2027 by category and time',
    description:
      'Check the official Valdivia Bike Fest results: positions, times, and gaps by category for the XCO and XCC formats, updated after every finish.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / Results 2027',
    headingHtml: 'Your mark<br><em>goes here</em>',
    intro: 'The official board goes live after each start. Come back to find your time and check your category result.',
  },
  demoBadge: 'DEMO DATA',
  demoNote: 'Demo table with fictitious data. The official board activates after each start.',
  boardHeadLeft: 'VBF / RESULTS',
  boardHeadRight: 'LIVE · DEMO',
  tabsLabel: 'Race format',
  chipsLabel: 'Category filter',
  chipAll: 'All',
  categories: ['Elite M', 'Elite F', 'Sub23 M', 'Sub23 F', 'Junior M', 'Junior F', 'Master A', 'Master B', 'Master C', 'Master D', 'Open'],
  columns: ['POS', 'BIB', 'RIDER', 'CLUB', 'CATEGORY', 'TIME', 'DIFF.'],
  boardFoot: ['XCO', 'XCC', 'CATEGORIES'],
};

export const resultadosCopy: Record<Locale, ResultadosCopy> = { es, en };
