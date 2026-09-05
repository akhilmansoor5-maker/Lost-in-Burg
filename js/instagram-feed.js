/**
 * Lost in Burg — Instagram feed grid
 * Source: window.LIB_MEDIA.instagram.posts (permalinks / shortcodes)
 * Renders official Instagram /embed/ iframes — not local stock photos.
 *
 * To update: paste latest post URLs into js/media.js → instagram.posts
 * Example: 'https://www.instagram.com/p/XXXXXXXX/'
 */
(function () {
  'use strict';

  function shortcodeFrom(entry) {
    if (!entry) return '';
    if (/^[A-Za-z0-9_-]+$/.test(entry)) return entry;
    const m = String(entry).match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i);
    return m ? m[1] : '';
  }

  function render() {
    const mount = document.getElementById('igFeed');
    if (!mount) return;

    const media = window.LIB_MEDIA || {};
    const ig = media.instagram || {};
    const profile = ig.profile || 'https://www.instagram.com/lostinburg_/';
    const posts = Array.isArray(ig.posts) ? ig.posts.map(shortcodeFrom).filter(Boolean).slice(0, 4) : [];

    if (!posts.length) {
      mount.innerHTML = `
        <a class="ig-cell ig-cell--live" href="${profile}" target="_blank" rel="noopener noreferrer" style="grid-column:1/-1;min-height:280px;display:flex;align-items:flex-end;padding:1.5rem;background:#111;border:3px solid var(--charcoal);text-decoration:none;">
          <div>
            <div class="section-label" style="color:var(--orange);margin-bottom:.75rem;">Live Instagram</div>
            <div class="font-anton text-cream uppercase" style="font-size:clamp(1.6rem,3vw,2.4rem);line-height:.9;">Open @lostinburg_</div>
            <p class="font-inter text-white/50 text-sm mt-3 max-w-md">Latest nights live on Instagram — tap through to @lostinburg_.</p>
          </div>
          <span class="ig-cell__hover">View</span>
        </a>`;
      return;
    }

    mount.innerHTML = posts.map((code) => {
      const href = `https://www.instagram.com/p/${code}/`;
      const embed = `https://www.instagram.com/p/${code}/embed/`;
      return `
        <a class="ig-cell ig-cell--embed" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Instagram post">
          <iframe src="${embed}" title="Instagram post ${code}" loading="lazy" scrolling="no" allowtransparency="true"></iframe>
          <span class="ig-cell__hover">View</span>
        </a>`;
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
