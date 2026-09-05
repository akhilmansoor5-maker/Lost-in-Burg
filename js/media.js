/**
 * Lost in Burg — centralized media paths
 * Swap files here to update every page that uses data-lib-* attributes.
 */
(function () {
  'use strict';

  const MEDIA = {
    logo: {
      nav: 'Gallery/text-logo-nav.png',
      /** Official lockup — black line art on transparent */
      hero: 'Gallery/LOGO%20BW%20PNG.png',
      mark: 'Gallery/LOGO%20BW%20PNG.png',
      favicon: 'Gallery/LOGO%20FAVICON.jpeg',
    },
    video: {
      /** Homepage hero — original main video (do not replace lightly) */
      homeHero: 'Gallery/videos/LOST%20IN%20BURG%20MAIN%20VIDEO.mp4',
      aboutCh1: 'Gallery/videos/delicious.mp4',
      aboutNight: 'Gallery/videos/ambience.mp4',
      aboutBeach: 'Gallery/videos/owner-cooking.mp4',
      aboutIntertitle: 'Gallery/videos/testimonial.mp4',
      aboutGrill: 'Gallery/videos/haario.mp4',
      aboutFood: 'Gallery/videos/BONEMARROW%20BURGER.mp4',
      nightsClose: 'Gallery/videos/nights.mp4',
      delicious: 'Gallery/videos/delicious.mp4',
      ambience: 'Gallery/videos/ambience.mp4',
      haario: 'Gallery/videos/haario.mp4',
      testimonial: 'Gallery/videos/testimonial.mp4',
    },
    image: {
      menuPlaceholder: 'Gallery/menu/placeholder.jpg',
      nightsHero: 'Gallery/CUSTOMER PICTURE 7.jpg',
      nightsClose: 'Gallery/CUSTOMER PICTURE 5.jpg',
      contactCta: 'Gallery/CUSTOMER PICTURE 7.jpg',
      aboutIntertitle: 'Gallery/CUSTOMER PICTURE 3.jpg',
    },
    /** Paste latest Instagram post URLs or shortcodes (max 4 shown on homepage) */
    instagram: {
      profile: 'https://www.instagram.com/lostinburg_/',
      posts: [
        // 'https://www.instagram.com/p/SHORTCODE/',
      ],
    },
  };

  window.LIB_MEDIA = MEDIA;

  function applyVideos() {
    document.querySelectorAll('[data-lib-video]').forEach((el) => {
      const key = el.getAttribute('data-lib-video');
      const src = MEDIA.video[key];
      if (!src) return;
      let source = el.querySelector('source');
      if (!source) {
        source = document.createElement('source');
        source.type = 'video/mp4';
        el.appendChild(source);
      }
      if (source.getAttribute('src') !== src) {
        source.setAttribute('src', src);
        if (typeof el.load === 'function') el.load();
      }
    });
  }

  function applyLogos() {
    document.querySelectorAll('[data-lib-logo]').forEach((el) => {
      const key = el.getAttribute('data-lib-logo');
      const src = MEDIA.logo[key];
      if (src) el.setAttribute('src', src);
    });
  }

  function applyImages() {
    document.querySelectorAll('[data-lib-image]').forEach((el) => {
      const key = el.getAttribute('data-lib-image');
      const src = MEDIA.image[key];
      if (src) el.setAttribute('src', src);
    });
  }

  function boot() {
    applyVideos();
    applyLogos();
    applyImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
