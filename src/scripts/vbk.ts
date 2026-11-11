// src/scripts/vbk.ts
// Comportamientos globales de VBK — porte de script.js original, adaptado al
// build Astro (rutas por locale en vez de toggle client-side; filas del
// tablero de resultados renderizadas server-side; datos ya no viven aquí).
// Se carga desde BaseLayout en todas las páginas; cada setup es opt-in y
// comprueba la presencia de sus elementos.
// prefers-reduced-motion se respeta (sin smooth scroll ni crossfade).

/* ─── Toast ────────────────────────────────────────────────────────── */

let toastTimer: ReturnType<typeof setTimeout> | undefined;

function showToast(message: string): void {
  const toast = document.querySelector<HTMLElement>('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 4500);
}

// Exponer para otros scripts (p. ej. el formulario de contacto)
declare global {
  interface Window {
    vbkToast: (message: string) => void;
  }
}
window.vbkToast = showToast;

/* ─── Menú móvil (focus trap + backdrop + Escape) ───────────────────── */

function setupMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const menu = document.querySelector<HTMLElement>('#mobile-menu');
  if (!toggle || !menu) return;
  const backdrop = document.querySelector<HTMLElement>('.menu-backdrop');
  const openLabel = toggle.dataset.menuOpenLabel ?? 'Abrir menú';
  const closeLabel = toggle.dataset.menuCloseLabel ?? 'Cerrar menú';
  let focusTrapHandler: ((e: KeyboardEvent) => void) | null = null;

  function getFocusableElements(): HTMLElement[] {
    const els = Array.from(
      menu.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
    );
    return [toggle, ...els];
  }

  function openMenu(): void {
    menu.hidden = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        menu.classList.add('is-open');
        toggle.classList.add('is-active');
        backdrop?.classList.add('is-open');
      });
    });
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', closeLabel);
    document.body.style.overflow = 'hidden';
    const firstLink = menu.querySelector<HTMLElement>('nav a');
    firstLink?.focus();
    focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusableElements();
      if (!focusable.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', focusTrapHandler);
  }

  function closeMenu(): void {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    backdrop?.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', openLabel);
    document.body.style.overflow = '';
    if (focusTrapHandler) {
      document.removeEventListener('keydown', focusTrapHandler);
      focusTrapHandler = null;
    }
    toggle.focus();
    let handled = false;
    function done(): void {
      if (handled) return;
      handled = true;
      if (!menu.classList.contains('is-open')) menu.hidden = true;
    }
    menu.addEventListener('transitionend', function handler(e: TransitionEvent): void {
      if (e.target !== menu) return;
      menu.removeEventListener('transitionend', handler);
      done();
    });
    setTimeout(done, 400);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  backdrop?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu();
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Cerrar el menú si el viewport pasa del breakpoint móvil
  const mql = window.matchMedia('(max-width: 760px)');
  function handleResize(e: MediaQueryListEvent): void {
    if (!e.matches && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  }
  mql.addEventListener('change', handleResize);
}

/* ─── Header scroll (se solidifica al pasar el umbral) ──────────────── */

function setupHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  const threshold = 100;
  const onScroll = (target: Window | Element): void => {
    const scrollY = (target as Window).scrollY ?? (target as Element).scrollTop ?? 0;
    header.classList.toggle('is-scrolled', scrollY > threshold);
  };
  window.addEventListener('scroll', () => onScroll(window), { passive: true });
  document.querySelectorAll<HTMLElement>('.valdivia-presentation').forEach((el) => {
    el.addEventListener('scroll', () => onScroll(el), { passive: true });
  });
  onScroll(window);
}

/* ─── Tabs de ruta (XCO/XCC) — home ─────────────────────────────────── */

function setupRouteTabs(): void {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-route-tab]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-route-detail]'));
  if (!tabs.length || !panels.length) return;

  function activate(tab: HTMLButtonElement): void {
    const id = tab.dataset.routeTab;
    tabs.forEach((candidate) => {
      const active = candidate === tab;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-selected', String(active));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== `route-panel-${id}`;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const idx = tabs.indexOf(tab);
      const next =
        e.key === 'ArrowRight'
          ? (idx + 1) % tabs.length
          : (idx - 1 + tabs.length) % tabs.length;
      tabs[next]!.focus();
      activate(tabs[next]!);
    });
  });
}

/* ─── Cuenta regresiva ──────────────────────────────────────────────── */

function setupCountdown(): void {
  const countdown = document.querySelector<HTMLElement>('[data-countdown]');
  if (!countdown) return;
  const date = countdown.dataset.date;
  const endMessage = countdown.dataset.endMessage ?? '';
  const message = document.querySelector<HTMLElement>('[data-countdown-message]');
  if (!date) return;
  const target = new Date(date).getTime();
  if (Number.isNaN(target)) return;
  let timer: ReturnType<typeof setInterval> | undefined;

  const tick = (): void => {
    const distance = target - Date.now();
    if (distance <= 0) {
      // Como el original: el mensaje de estado pasa a ser el mensaje final
      // (con flecha) cuando la carrera está en marcha.
      if (message) message.textContent = `${endMessage} \u2197\uFE0E`;
      if (timer) clearInterval(timer);
      return;
    }
    const values = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor(distance / 3600000) % 24,
      minutes: Math.floor(distance / 60000) % 60,
      seconds: Math.floor(distance / 1000) % 60,
    };
    for (const [key, value] of Object.entries(values)) {
      const node = countdown.querySelector<HTMLElement>(`[data-${key}]`);
      if (node) node.textContent = String(value).padStart(2, '0');
    }
  };
  tick();
  timer = setInterval(tick, 1000);
}

/* ─── Crossfade de carruseles ───────────────────────────────────────── */

function setupCrossfade(): void {
  const containers = document.querySelectorAll<HTMLElement>('[data-crossfade]');
  if (!containers.length) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  containers.forEach((container) => {
    const images = Array.from(container.querySelectorAll<HTMLImageElement>('.carousel-img'));
    if (images.length < 2) return;
    let current = 0;
    const interval = Number.parseInt(container.dataset.interval ?? '5000', 10) || 5000;
    setInterval(() => {
      images[current]!.classList.remove('active');
      current = (current + 1) % images.length;
      images[current]!.classList.add('active');
    }, interval);
  });
}

/* ─── Tablero de resultados: tabs + chips + filtro + renumeración ───── */

function renumberVisibleRows(tbody: HTMLTableSectionElement): void {
  const rows = Array.from(tbody.querySelectorAll<HTMLTableRowElement>('tr:not([hidden])'));
  rows.forEach((tr, i) => {
    const td = tr.querySelector<HTMLTableCellElement>('td');
    if (td) td.textContent = String(i + 1);
    if (i === 0) tr.dataset.podium = '1';
    else delete tr.dataset.podium;
  });
}

function applyCategoryFilter(): void {
  const activeChip = document.querySelector<HTMLButtonElement>('.results-chip.is-active');
  if (!activeChip) return;
  const cat = activeChip.dataset.category;
  document.querySelectorAll<HTMLElement>('.results-panel').forEach((panel) => {
    const tbody = panel.querySelector<HTMLTableSectionElement>('tbody');
    if (!tbody) return;
    tbody.querySelectorAll<HTMLTableRowElement>('tr').forEach((tr) => {
      if (cat === 'all' || tr.dataset.category === cat) tr.removeAttribute('hidden');
      else tr.setAttribute('hidden', '');
    });
    renumberVisibleRows(tbody);
  });
}

function setupResultsTabs(): void {
  const tablist = document.querySelector<HTMLElement>('.results-tabs');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('.results-tab'));
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = tab.getAttribute('aria-controls');
      document.querySelectorAll<HTMLElement>('.results-panel').forEach((p) => {
        p.hidden = p.id !== panelId;
      });
      applyCategoryFilter();
    });
    tab.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const idx = tabs.indexOf(tab);
      const next =
        e.key === 'ArrowRight'
          ? (idx + 1) % tabs.length
          : (idx - 1 + tabs.length) % tabs.length;
      tabs[next]!.focus();
      tabs[next]!.click();
    });
  });
}

function setupCategoryChips(): void {
  const chipGroup = document.querySelector<HTMLElement>('.results-chips');
  if (!chipGroup) return;
  const chips = Array.from(chipGroup.querySelectorAll<HTMLButtonElement>('.results-chip'));
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      applyCategoryFilter();
    });
  });
}

/* ─── Navegación lateral de destinos (scrollspy + smooth scroll) ────── */

function setupDestinationsNav(): void {
  const nav = document.querySelector<HTMLElement>('.destinations-nav');
  if (!nav) return;
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.destination-section'));
  const navItems = Array.from(nav.querySelectorAll<HTMLAnchorElement>('.destinations-nav-item'));
  if (!sections.length || !navItems.length) return;

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navItems.forEach((item) => {
        const isActive = item.getAttribute('href') === `#${id}`;
        item.classList.toggle('is-active', isActive);
      });
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  navItems.forEach((item) => {
    item.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      if (!targetId) return;
      const targetSection = document.querySelector<HTMLElement>(targetId);
      targetSection?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });
}

/* ─── Animaciones de entrada (IntersectionObserver) ─────────────────── */

function setupScrollAnimations(): void {
  const animatedElements = document.querySelectorAll<HTMLElement>('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  animatedElements.forEach((element) => observer.observe(element));
}

/* ─── Lightbox de galería (data-gallery-trigger) ────────────────────── */

interface LightboxElements {
  overlay: HTMLElement;
  figure: HTMLElement;
  img: HTMLImageElement;
  caption: HTMLElement;
  close: HTMLButtonElement;
}

function buildLightbox(closeLabel: string): LightboxElements {
  const overlay = document.createElement('div');
  overlay.className = 'gallery-lightbox';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const figure = document.createElement('figure');
  figure.className = 'gallery-lightbox-figure';

  const img = document.createElement('img');
  img.className = 'gallery-lightbox-img';
  img.alt = '';

  const caption = document.createElement('figcaption');
  caption.className = 'gallery-lightbox-caption';

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'gallery-lightbox-close';
  close.setAttribute('aria-label', closeLabel);
  close.textContent = '✕';

  figure.append(img, caption);
  overlay.append(close, figure);
  document.body.append(overlay);
  return { overlay, figure, img, caption, close };
}

function setupGalleryLightbox(): void {
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-gallery-trigger]');
  if (!triggers.length) return;
  const gallery = triggers[0]!.closest('[data-l10n-lightbox-close]');
  const closeLabel = gallery?.getAttribute('data-l10n-lightbox-close') ?? '✕';
  const lb = buildLightbox(closeLabel);
  let lastTrigger: HTMLButtonElement | null = null;

  function open(trigger: HTMLButtonElement): void {
    const img = trigger.querySelector('img');
    if (!img) return;
    lastTrigger = trigger;
    lb.img.src = trigger.dataset.full || img.currentSrc || img.src;
    lb.img.alt = img.alt;
    lb.caption.textContent = img.alt;
    lb.overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.close.focus();
  }

  function close(): void {
    lb.overlay.hidden = true;
    document.body.style.overflow = '';
    lastTrigger?.focus();
    lastTrigger = null;
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
  });

  lb.close.addEventListener('click', close);
  lb.overlay.addEventListener('click', (e: MouseEvent) => {
    if (e.target === lb.overlay || e.target === lb.figure) close();
  });
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !lb.overlay.hidden) close();
  });
}

/* ─── Init ──────────────────────────────────────────────────────────── */

setupMobileMenu();
setupHeaderScroll();
setupRouteTabs();
setupCountdown();
setupCrossfade();
setupResultsTabs();
setupCategoryChips();
applyCategoryFilter();
setupDestinationsNav();
setupScrollAnimations();
setupGalleryLightbox();
