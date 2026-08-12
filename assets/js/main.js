/* ============================================================
   Faisal ur Rehman — Portfolio
   Vanilla JS. No dependencies.
   ============================================================ */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, ctx) => (ctx || document).querySelector(s);
  const $$ = (s, ctx) => Array.from((ctx || document).querySelectorAll(s));

  /* ---------- Theme ---------------------------------------- */

  const root = document.documentElement;
  const themeBtn = $('#theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F5F6FB' : '#080B14');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label',
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }

  let stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) { /* private mode */ }

  if (stored) {
    applyTheme(stored);
  } else {
    applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Load-in stagger ------------------------------ */

  $$('.stagger').forEach(el => {
    el.style.setProperty('--d', el.dataset.delay || 0);
  });
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  /* ---------- Header state + scroll progress --------------- */

  const header = $('#header');
  const bar = $('#progress-bar');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 12);

    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------------------------------- */

  const menuBtn = $('#menu-btn');
  const nav = $('#nav');

  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    $$('a', nav).forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1000) closeMenu(); });
  }

  /* ---------- Scroll reveal -------------------------------- */

  const revealables = $$('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const idx = Math.min(siblings.indexOf(el), 5);
        el.style.transitionDelay = (idx > 0 ? idx * 70 : 0) + 'ms';
        el.classList.add('in');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(el => io.observe(el));
  }

  /* ---------- Count-up stats ------------------------------- */

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;

    if (reduceMotion) { el.textContent = target + suffix; return; }

    const duration = 1500;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => co.observe(el));
  } else {
    counters.forEach(countUp);
  }

  /* ---------- Active nav link ------------------------------ */

  const sections = $$('main section[id]');
  const navLinks = $$('.nav a');

  if (sections.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => so.observe(s));
  }

  /* ---------- Device app carousel (signature) -------------- */

  const stage = $('#stage');
  const dotsWrap = $('#dots');

  if (stage) {
    const screens = $$('.app-screen', stage);
    const device = $('#device');
    let index = 0;
    let timer = null;

    // Build indicator dots
    if (dotsWrap) {
      screens.forEach((_, i) => {
        const dot = document.createElement('i');
        if (i === 0) dot.classList.add('is-active');
        dotsWrap.appendChild(dot);
      });
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    function show(i) {
      index = (i + screens.length) % screens.length;
      screens.forEach((s, n) => s.classList.toggle('is-active', n === index));
      dots.forEach((d, n) => d.classList.toggle('is-active', n === index));

      // Sync the ambient glow behind the phone to the active app tint
      const tint = screens[index].style.getPropertyValue('--tint');
      if (device && tint) device.style.setProperty('--stage-tint', tint.trim());
    }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(() => show(index + 1), 3400);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    show(0);
    start();

    stage.addEventListener('pointerenter', stop);
    stage.addEventListener('pointerleave', start);
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });
  }

  /* ---------- Tech marquee: duplicate for seamless loop ----- */

  const track = $('#marquee-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- Material ripple ------------------------------ */

  function ripple(e) {
    const host = e.currentTarget;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.1;

    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - rect.left - size / 2) + 'px';
    span.style.top  = (e.clientY - rect.top  - size / 2) + 'px';

    host.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  }

  if (!reduceMotion) {
    $$('.ripple-host').forEach(el => el.addEventListener('pointerdown', ripple));
  }

  /* ---------- Footer year ---------------------------------- */

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

})();
