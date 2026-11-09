// src/i18n/ruta.ts
// Copy de /ruta en ES/EN. Fuente: ruta.html + pageCopy.ruta de script.js.
// Nota: la sección "Congreso técnico" está omitida en el original (comentada
// hasta confirmación oficial) y se conserva como comentario en RutaPage.astro.

import type { Locale } from './config';

export interface CircuitCard {
  label: string;
  name: string;
  fullName: string;
  metrics: Array<{ value: string; unit: string; label: string }>;
  details: string;
  statusLabel: string;
  statusValue: string;
}

export interface RutaCopy {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    headingHtml: string;
    intro: string;
  };
  keyData: Array<{ icon: 'calendar' | 'people' | 'clock' | 'flag' | 'uci'; label: string; value: string }>;
  formatos: {
    kicker: string;
    headingHtml: string;
    cards: [CircuitCard, CircuitCard];
    note: string;
  };
  programa: {
    kicker: string;
    headingHtml: string;
    rows: Array<{ n: string; day: string; activity: string; status: 'confirmed' | 'pending'; statusLabel: string }>;
  };
  categorias: {
    kicker: string;
    headingHtml: string;
    groups: Array<{ title: string; items: string[] }>;
    note: string;
  };
  galeriaLabel: string;
  lightboxLabel: string;
  lightboxClose: string;
  galeria: Array<{ src: string; alt: string }>;
}

const es: RutaCopy = {
  meta: {
    title: 'Ruta y horario | Valdivia Bike Fest',
    description:
      'Todo sobre la edición 2027 de Valdivia Bike Fest: programa, circuitos XCO y XCC, categorías, congreso técnico, sede e inscripción.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / Edición 2027',
    headingHtml: 'Dos circuitos<br><em>Una sede</em>',
    intro: 'Todo lo que necesitas saber sobre la edición 2027: fechas, circuitos, categorías, programa e inscripción.',
  },
  keyData: [
    { icon: 'calendar', label: 'Fecha', value: '10–14 marzo 2027' },
    { icon: 'people', label: 'Sede', value: 'C.D. ASENAV, Valdivia' },
    { icon: 'clock', label: 'Primera actividad', value: 'Mié 10 mar — 09:00 hrs' },
    { icon: 'flag', label: 'Formatos', value: 'XCO / XCC' },
    { icon: 'uci', label: 'Puntos UCI', value: 'Ranking mundial' },
  ],
  formatos: {
    kicker: 'Formatos de competencia',
    headingHtml: 'Dos circuitos<br><em>Una sede</em>',
    cards: [
      {
        label: 'Circuito 01',
        name: 'XCO',
        fullName: 'Cross-Country Olímpico',
        metrics: [
          { value: '~3,6', unit: 'km', label: 'Distancia por vuelta' },
          { value: '~170', unit: 'm', label: 'Desnivel acumulado' },
          { value: '1', unit: 'punto', label: 'Abastecimiento' },
        ],
        details:
          'Circuito técnico con sectores de bosque, escalada y descenso. Sectores destinados al público permiten seguir la carrera en puntos estratégicos.',
        statusLabel: 'Horario',
        statusValue: 'Se define en congreso técnico',
      },
      {
        label: 'Circuito 02',
        name: 'XCC',
        fullName: 'Short Track',
        metrics: [
          { value: '~0,81', unit: 'km', label: 'Distancia por vuelta' },
          { value: '~18', unit: 'm', label: 'Desnivel acumulado' },
          { value: '~20', unit: 'min', label: 'Duración aprox.' },
        ],
        details:
          'Circuito corto y explosivo. Formato de carrera intenso con múltiples vueltas. Referencia 2026: ~10 vueltas Elite Masculino, ~9 Elite Femenino.',
        statusLabel: 'Horario',
        statusValue: 'Se define en congreso técnico',
      },
    ],
    note: 'Horarios, vueltas y categorías se definen en el congreso técnico.',
  },
  programa: {
    kicker: 'Programa',
    headingHtml: 'Cinco días<br>que se viven <em>completos</em>',
    rows: [
      { n: '01', day: 'Miércoles 10 de marzo', activity: 'Retiro de kits + acreditación — 09:00 hrs', status: 'confirmed', statusLabel: 'Confirmado' },
      { n: '02', day: 'Jueves 11 de marzo', activity: 'Congreso técnico — Horario por confirmar', status: 'pending', statusLabel: 'Pendiente' },
      { n: '03', day: 'Viernes 12 de marzo', activity: 'Competencias — Horario por confirmar', status: 'pending', statusLabel: 'Pendiente' },
      { n: '04', day: 'Sábado 13 de marzo', activity: 'Competencias — Horario por confirmar', status: 'pending', statusLabel: 'Pendiente' },
      { n: '05', day: 'Domingo 14 de marzo', activity: 'Largadas finales + premiación — Horario por confirmar', status: 'pending', statusLabel: 'Pendiente' },
    ],
  },
  categorias: {
    kicker: 'Categorías',
    headingHtml: 'Todas las<br><em>categorías</em>',
    groups: [
      {
        title: 'UCI Internacional',
        items: ['Elite Masculino', 'Elite Femenino', 'Sub23 Masculino', 'Sub23 Femenino', 'Junior Masculino', 'Junior Femenino'],
      },
      {
        title: 'Master',
        items: ['Master A (30–39)', 'Master B (40–49)', 'Master C (50–59)', 'Master D (60+)'],
      },
      {
        title: 'Abiertas',
        items: ['Short Track Open', 'Promocional'],
      },
      {
        title: 'Menores',
        items: ['Cadete', 'Juvenil', 'Pre-juvenil'],
      },
    ],
    note: 'Listado de categorías sujeto a confirmación oficial.',
  },
  galeriaLabel: 'Galería de la competencia',
  lightboxLabel: 'Galería ampliada',
  lightboxClose: 'Cerrar galería',
  galeria: [
    { src: '/img/carrera.avif', alt: 'Competencia en curso' },
    { src: '/img/salto.avif', alt: 'Salto en competencia' },
    { src: '/img/terreno.avif', alt: 'Terreno de carrera' },
    { src: '/img/ruta.avif', alt: 'Recorrido de competencia' },
    { src: '/img/bajada.avif', alt: 'Descenso en competencia' },
    { src: '/img/pista.avif', alt: 'Pista de competencia' },
    { src: '/img/resultados_hombre.avif', alt: 'Competidor masculino' },
    { src: '/img/resultados_mujer.avif', alt: 'Competidora femenina' },
    { src: '/img/valdivia_1.avif', alt: 'Valdivia paisaje 1' },
    { src: '/img/valdivia_2.avif', alt: 'Valdivia paisaje 2' },
    { src: '/img/valdivia_3.avif', alt: 'Valdivia paisaje 3' },
    { src: '/img/valdivia_4.avif', alt: 'Valdivia paisaje 4' },
  ],
};

const en: RutaCopy = {
  meta: {
    title: 'Route & schedule | Valdivia Bike Fest 2027: full program',
    description:
      'Everything about the 2027 edition of Valdivia Bike Fest: schedule, XCO and XCC circuits, categories, technical meeting, venue, and registration.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / 2027 Edition',
    headingHtml: 'Two circuits<br><em>One venue</em>',
    intro: 'Everything you need to know about the 2027 edition: dates, circuits, categories, schedule, and registration.',
  },
  keyData: [
    { icon: 'calendar', label: 'Date', value: '10–14 March 2027' },
    { icon: 'people', label: 'Venue', value: 'C.D. ASENAV, Valdivia' },
    { icon: 'clock', label: 'First activity', value: 'Wed 10 Mar — 9:00 AM' },
    { icon: 'flag', label: 'Formats', value: 'XCO / XCC' },
    { icon: 'uci', label: 'UCI points', value: 'World ranking' },
  ],
  formatos: {
    kicker: 'Race formats',
    headingHtml: 'Two circuits<br><em>One venue</em>',
    cards: [
      {
        label: 'Circuit 01',
        name: 'XCO',
        fullName: 'Cross-Country Olympic',
        metrics: [
          { value: '~3.6', unit: 'km', label: 'Distance per lap' },
          { value: '~170', unit: 'm', label: 'Elevation gain' },
          { value: '1', unit: 'point', label: 'Feed zone' },
        ],
        details:
          'Technical circuit with forest sectors, climbs, and descents. Spectator zones allow you to follow the race at strategic points.',
        statusLabel: 'Schedule',
        statusValue: 'Set at the technical meeting',
      },
      {
        label: 'Circuit 02',
        name: 'XCC',
        fullName: 'Short Track',
        metrics: [
          { value: '~0.81', unit: 'km', label: 'Distance per lap' },
          { value: '~18', unit: 'm', label: 'Elevation gain' },
          { value: '~20', unit: 'min', label: 'Approx. duration' },
        ],
        details:
          'Short and explosive circuit. Intense race format with multiple laps. 2026 reference: ~10 laps Elite Men, ~9 Elite Women.',
        statusLabel: 'Schedule',
        statusValue: 'Set at the technical meeting',
      },
    ],
    note: 'Schedules, laps, and categories are set at the technical meeting.',
  },
  programa: {
    kicker: 'Schedule',
    headingHtml: 'Five days<br>lived in <em>full</em>',
    rows: [
      { n: '01', day: 'Wednesday, March 10', activity: 'Kit pickup + accreditation — 9:00 AM', status: 'confirmed', statusLabel: 'Confirmed' },
      { n: '02', day: 'Thursday, March 11', activity: 'Technical meeting — Time TBC', status: 'pending', statusLabel: 'Pending' },
      { n: '03', day: 'Friday, March 12', activity: 'Races — Time TBC', status: 'pending', statusLabel: 'Pending' },
      { n: '04', day: 'Saturday, March 13', activity: 'Races — Time TBC', status: 'pending', statusLabel: 'Pending' },
      { n: '05', day: 'Sunday, March 14', activity: 'Final starts + awards — Time TBC', status: 'pending', statusLabel: 'Pending' },
    ],
  },
  categorias: {
    kicker: 'Categories',
    headingHtml: 'All the<br><em>categories</em>',
    groups: [
      {
        title: 'UCI International',
        items: ['Elite Men', 'Elite Women', 'Sub23 Men', 'Sub23 Women', 'Junior Men', 'Junior Women'],
      },
      {
        title: 'Master',
        items: ['Master A (30–39)', 'Master B (40–49)', 'Master C (50–59)', 'Master D (60+)'],
      },
      {
        title: 'Open',
        items: ['Short Track Open', 'Promotional'],
      },
      {
        title: 'Youth',
        items: ['Cadet', 'Youth', 'Pre-youth'],
      },
    ],
    note: 'Category list subject to official confirmation.',
  },
  galeriaLabel: 'Race gallery',
  lightboxLabel: 'Expanded gallery',
  lightboxClose: 'Close gallery',
  galeria: [
    { src: '/img/carrera.avif', alt: 'Race in progress' },
    { src: '/img/salto.avif', alt: 'Jump during the race' },
    { src: '/img/terreno.avif', alt: 'Race terrain' },
    { src: '/img/ruta.avif', alt: 'Race course' },
    { src: '/img/bajada.avif', alt: 'Descent during the race' },
    { src: '/img/pista.avif', alt: 'Race track' },
    { src: '/img/resultados_hombre.avif', alt: 'Male competitor' },
    { src: '/img/resultados_mujer.avif', alt: 'Female competitor' },
    { src: '/img/valdivia_1.avif', alt: 'Valdivia landscape 1' },
    { src: '/img/valdivia_2.avif', alt: 'Valdivia landscape 2' },
    { src: '/img/valdivia_3.avif', alt: 'Valdivia landscape 3' },
    { src: '/img/valdivia_4.avif', alt: 'Valdivia landscape 4' },
  ],
};

export const rutaCopy: Record<Locale, RutaCopy> = { es, en };
