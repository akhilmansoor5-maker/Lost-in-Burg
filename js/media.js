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
      hero: 'Gallery/logo-hero-cropped.png',
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
    /** Homepage Instagram grid — local poster images (not reel embeds) */
    instagram: {
      profile: 'https://www.instagram.com/lostinburg_/',
      posts: [
        {
          title: 'Oyster',
          href: 'https://www.instagram.com/platesoffflavour/reel/Dc8sC8-pYhU/',
          image: 'Gallery/instagram/oyster.jpg',
        },
        {
          title: 'Bone marrow pasta',
          href: 'https://www.instagram.com/foodmaniac_nhd/reel/Dc73vZ0sz22/',
          image: 'Gallery/instagram/bone-marrow-pasta.jpg',
        },
        {
          title: 'Smaaashhing',
          href: 'https://www.instagram.com/lostinburg_/reel/Dc0npDcpF6U/',
          image: 'Gallery/instagram/smaaashhing.jpg',
        },
        {
          title: 'lost in burg Calicut',
          href: 'https://www.instagram.com/buckkket_list/reel/DclHER3OZQ3/',
          image: 'Gallery/instagram/calicut.jpg',
        },
        {
          title: 'SMASHED !N&OUT',
          href: 'https://www.instagram.com/lostinburg_/reel/DcVimq9TXwU/',
          image: 'Gallery/instagram/smashed.jpg',
        },
        {
          title: 'Love at first bite',
          href: 'https://www.instagram.com/homeinbites/reel/DbnCQc7PAGU/',
          image: 'Gallery/instagram/love-at-first-bite.jpg',
        },
        {
          title: 'Endlesscravings',
          href: 'https://www.instagram.com/lostinburg_/reel/Dbp8N3aJSbx/',
          image: 'Gallery/instagram/endlesscravings.jpg',
        },
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
