/**
 * Lost in Burg — Shared Nav + Footer
 * Mount: <div id="site-nav" data-variant="hero|solid|dark" data-cta="See Menu" data-cta-href="menu.html"></div>
 *        <div id="site-footer" data-variant="default|dark"></div>
 */
(function () {
  'use strict';

  const BRAND = {
    name: 'Lost in Burg',
    line: "The Craver's Loop",
    location: 'Kozhikode Beach, Kerala',
    hours: '4:30 PM – 3:00 AM',
    igHandle: '@lostinburg_',
    igUrl: 'https://www.instagram.com/lostinburg_/',
    logoWord: 'Gallery/text-logo-nav.png',
    logoIcon: 'Gallery/logo-footer.png',
    logoStamp: 'Gallery/LOGO%20ICON.jpeg',
    year: 2026,
  };

  const NAV_LINKS = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'about.html', label: 'Our Story', id: 'about' },
    { href: 'menu.html', label: 'Menu', id: 'menu' },
    { href: 'events.html', label: 'Nights', id: 'events' },
    { href: 'partner.html', label: 'Partner', id: 'partner' },
    { href: 'contact.html', label: 'Find Us', id: 'contact' },
  ];

  function currentPageId() {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!file || file === '' || file === 'index.html' || file === 'index') return 'home';
    if (file.startsWith('about')) return 'about';
    if (file.startsWith('menu')) return 'menu';
    if (file.startsWith('events')) return 'events';
    if (file.startsWith('partner')) return 'partner';
    if (file.startsWith('contact')) return 'contact';
    return 'home';
  }

  function igIcon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
  }

  function renderNav(mount) {
    const variant = mount.dataset.variant || 'solid';
    const ctaLabel = mount.dataset.cta || 'See Menu';
    const ctaHref = mount.dataset.ctaHref || 'menu.html';
    const page = currentPageId();
    const navId = 'mainNav';

    const links = NAV_LINKS.map((l) => {
      const active = l.id === page ? ' is-active' : '';
      return `<a href="${l.href}" class="site-nav__link${active}">${l.label}</a>`;
    }).join('');

    const mobileLinks = NAV_LINKS.map((l) => {
      const active = l.id === page ? ' is-active' : '';
      return `<a href="${l.href}" class="${active.trim()}">${l.label}</a>`;
    }).join('');

    mount.outerHTML = `
<nav id="${navId}" class="site-nav site-nav--${variant}" aria-label="Primary">
  <div class="site-nav__inner">
    <a href="index.html" class="site-nav__logo" aria-label="${BRAND.name} — ${BRAND.line}">
      <img src="${BRAND.logoWord}" alt="${BRAND.name}" class="logo-wordmark" width="240" height="52" />
    </a>
    <div class="site-nav__links">${links}</div>
    <div class="site-nav__actions">
      <span class="site-nav__hours">${BRAND.hours}</span>
      <a href="${ctaHref}" class="btn-primary btn-p--sm" data-magnetic="0.25"><span class="btn-inner">${ctaLabel}</span></a>
    </div>
    <button type="button" class="site-nav__ham" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu" data-nav-toggle>
      <span class="site-nav__ham-bar"></span>
      <span class="site-nav__ham-bar"></span>
      <span class="site-nav__ham-bar"></span>
    </button>
  </div>
  <div id="mobileMenu" class="site-nav__mobile">
    ${mobileLinks}
    <div class="site-nav__mobile-hours"><p class="section-label" style="color:var(--orange);margin:0">Open Daily · ${BRAND.hours}</p></div>
  </div>
</nav>`;

    bindNav(variant);
  }

  function bindNav(variant) {
    const nav = document.getElementById('mainNav');
    const toggle = nav && nav.querySelector('[data-nav-toggle]');
    const mobile = document.getElementById('mobileMenu');
    if (!nav || !toggle || !mobile) return;

    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    window.toggleMobileMenu = function () {
      const open = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    if (variant === 'hero') {
      const heroEl = document.querySelector('.about-hero, .nights-hero, .contact-hero, .menu-header, .partner-hero, body > section');
      const onScroll = () => {
        const heroH = heroEl ? heroEl.offsetHeight : window.innerHeight;
        const threshold = Math.max(120, Math.min(heroH * 0.72, window.innerHeight * 0.82));
        nav.classList.toggle('is-scrolled', window.scrollY > threshold);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();
    } else if (variant === 'dark') {
      const onScroll = () => {
        nav.classList.toggle('is-scrolled', window.scrollY > 40);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  function renderFooter(mount) {
    const variant = mount.dataset.variant || 'default';
    const darkClass = variant === 'dark' ? ' site-footer--dark' : '';
    const page = currentPageId();

    const navItems = NAV_LINKS.map((l) => {
      const active = l.id === page ? ' style="color:var(--orange)"' : '';
      return `<li><a href="${l.href}"${active}>${l.label}</a></li>`;
    }).join('');

    mount.outerHTML = `
<footer class="site-footer${darkClass}">
  <div class="site-footer__inner">
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        <img src="${BRAND.logoIcon}" alt="${BRAND.name} — ${BRAND.line}" class="logo-mark logo-mark--footer" width="220" height="148" />
        <p class="site-footer__blurb" style="margin-top:1.25rem">Premium late-night burgers and steaks on Kozhikode Beach. Open when the rest are closed.</p>
        <a href="${BRAND.igUrl}" target="_blank" rel="noopener noreferrer" class="site-footer__social" aria-label="Instagram ${BRAND.igHandle}">${igIcon()}</a>
      </div>
      <div>
        <h4 class="site-footer__heading">Navigation</h4>
        <ul class="site-footer__nav">${navItems}</ul>
      </div>
      <div>
        <h4 class="site-footer__heading">Hours &amp; Location</h4>
        <div class="site-footer__meta">
          <div class="site-footer__meta-row">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Open Daily: <strong>${BRAND.hours}</strong></span>
          </div>
          <div class="site-footer__meta-row">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>${BRAND.location}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© ${BRAND.year} ${BRAND.name}. All rights reserved.</p>
      <p>Built for the late-night crowd.</p>
    </div>
  </div>
</footer>`;
  }

  function init() {
    const navMount = document.getElementById('site-nav');
    if (navMount) renderNav(navMount);
    const footerMount = document.getElementById('site-footer');
    if (footerMount) renderFooter(footerMount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
