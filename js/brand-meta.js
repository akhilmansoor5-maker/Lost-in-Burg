/**
 * Lost in Burg — Shared Open Graph defaults + Restaurant schema
 * Pages may override document.title / meta description before this runs.
 */
(function () {
  'use strict';

  const SITE = 'https://akhilmansoor5-maker.github.io/Lost-in-Burg/';
  const OG_IMAGE = SITE + 'Gallery/ARISTROCRAT%20BURGER.jpeg';

  function ensureMeta(attr, key, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    if (!el.getAttribute('content')) el.setAttribute('content', content);
  }

  function ensureLink(rel, href) {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    if (!el.getAttribute('href')) el.setAttribute('href', href);
  }

  const title = document.title || 'Lost in Burg — Kozhikode Beach';
  const desc =
    document.querySelector('meta[name="description"]')?.getAttribute('content') ||
    'Lost in Burg — premium late-night burgers on Kozhikode Beach. The Craver\'s Loop. Open daily 4:30 PM–3:00 AM.';

  const path = location.pathname.split('/').pop() || 'index.html';
  const pageUrl = SITE + (path === '' || path === 'index' ? '' : path);

  ensureLink('icon', 'Gallery/LOGO%20FAVICON.jpeg');
  ensureMeta('property', 'og:type', 'website');
  ensureMeta('property', 'og:site_name', 'Lost in Burg');
  ensureMeta('property', 'og:title', title);
  ensureMeta('property', 'og:description', desc);
  ensureMeta('property', 'og:url', pageUrl);
  ensureMeta('property', 'og:image', OG_IMAGE);
  ensureMeta('name', 'twitter:card', 'summary_large_image');
  ensureMeta('name', 'twitter:title', title);
  ensureMeta('name', 'twitter:description', desc);
  ensureMeta('name', 'twitter:image', OG_IMAGE);

  if (!document.getElementById('restaurant-schema')) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'restaurant-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'Lost in Burg',
      alternateName: "The Craver's Loop",
      description:
        'Premium late-night burgers and steaks on Kozhikode Beach. Open daily 4:30 PM–3:00 AM.',
      url: SITE,
      image: OG_IMAGE,
      servesCuisine: ['Burgers', 'Steakhouse', 'Seafood'],
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kozhikode',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
        streetAddress: 'Kozhikode Beach',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 11.253,
        longitude: 75.776,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '16:30',
        closes: '03:00',
      },
      sameAs: ['https://www.instagram.com/lostinburg_/'],
    });
    document.head.appendChild(script);
  }
})();
