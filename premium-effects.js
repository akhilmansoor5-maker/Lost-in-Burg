/**
 * Lost in Burg — Premium Effects Engine (Optimized, No Cursor)
 * Requires: Lenis, GSAP, ScrollTrigger — loaded before this file.
 */

/* ─────────────────────────────────────────────
   1. LENIS + GSAP SYNC
───────────────────────────────────────────── */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/* ─────────────────────────────────────────────
   2. SCROLL-VELOCITY MARQUEE  (fixed)
───────────────────────────────────────────── */
function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach((track) => {
    track.style.animation = 'none';
    track.style.transform = 'none';

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
    tl.to(track, { xPercent: -50, duration: 20 });
    track._marqueeTL = tl;
  });
}

function bindMarqueeVelocity(lenis) {
  let resetTimer = null;

  lenis.on('scroll', ({ velocity }) => {
    const speed = 1 + Math.min(Math.abs(velocity) * 0.08, 3.5);

    document.querySelectorAll('.marquee-track').forEach((track) => {
      if (track._marqueeTL) {
        gsap.to(track._marqueeTL, { timeScale: speed, duration: 0.4, ease: 'power1.out', overwrite: true });
      }
    });

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      document.querySelectorAll('.marquee-track').forEach((track) => {
        if (track._marqueeTL) {
          gsap.to(track._marqueeTL, { timeScale: 1, duration: 1.4, ease: 'power2.inOut', overwrite: true });
        }
      });
    }, 300);
  });
}

/* ─────────────────────────────────────────────
   3. MAGNETIC BUTTONS  (lightweight)
───────────────────────────────────────────── */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    const strength = parseFloat(btn.dataset.magnetic) || 0.3;

    btn.addEventListener('mousemove', (e) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * strength;
      const dy = (e.clientY - r.top  - r.height / 2) * strength;
      gsap.to(btn, { x: dx, y: dy, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    });
  });
}

/* ─────────────────────────────────────────────
   4. SCROLL-TRIGGERED TEXT REVEALS
   Usage: wrap each line in  .reveal-wrap > .reveal-line
          put [data-reveal] on the parent container
───────────────────────────────────────────── */
function initTextReveals() {
  document.querySelectorAll('[data-reveal]').forEach((group) => {
    const lines   = group.querySelectorAll('.reveal-line');
    if (!lines.length) return;

    const stagger = parseFloat(group.dataset.revealStagger) || 0.09;
    const delay   = parseFloat(group.dataset.revealDelay)   || 0;

    gsap.from(lines, {
      scrollTrigger: {
        trigger: group,
        start: 'top 84%',
        once: true,
      },
      y: '110%',
      duration: 0.9,
      ease: 'power3.out',
      stagger,
      delay,
    });
  });
}

/* ─────────────────────────────────────────────
   5. PARALLAX IMAGES  (desktop only, scrub)
   Usage: data-parallax-wrap on container, data-parallax="0.15" on img
───────────────────────────────────────────── */
function initParallax() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    const wrap  = el.closest('[data-parallax-wrap]') || el.parentElement;

    gsap.fromTo(el,
      { yPercent: -(speed * 40) },
      {
        yPercent: speed * 40,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}

/* ─────────────────────────────────────────────
   6. NAV COLOUR SWITCH  (over dark hero)
   Sections with class "hero-dark" trigger inverted nav
───────────────────────────────────────────── */
function initNavBlend() {
  const nav  = document.querySelector('nav');
  const hero = document.querySelector('.hero-dark');
  if (!nav || !hero) return;

  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    onEnter:     () => nav.classList.add('nav-on-dark'),
    onLeave:     () => nav.classList.remove('nav-on-dark'),
    onEnterBack: () => nav.classList.add('nav-on-dark'),
    onLeaveBack: () => nav.classList.remove('nav-on-dark'),
  });
}

/* ─────────────────────────────────────────────
   7. NUMBER COUNTER ANIMATION  (fixed)
───────────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.countSuffix || '';
    const isInt  = Number.isInteger(target);
    const obj    = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = (isInt ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          },
        });
      },
    });
  });
}

/* ─────────────────────────────────────────────
   MASTER INIT  — call once per page
───────────────────────────────────────────── */
function initPremiumEffects() {
  gsap.registerPlugin(ScrollTrigger);

  // Respect user's motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('load', () => {
    const lenis = initLenis();
    initMarquee();
    bindMarqueeVelocity(lenis);
    initMagneticButtons();
    initTextReveals();
    initParallax();
    initNavBlend();
    initCounters();

    // Refresh ScrollTrigger after everything is painted
    ScrollTrigger.refresh();
  });
}
