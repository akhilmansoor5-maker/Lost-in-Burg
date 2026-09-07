/**
 * Lost in Burg — Instagram feed grid
 * Source: window.LIB_MEDIA.instagram.posts
 * Renders local poster images (not reel iframes).
 *
 * Each post: { title, href, image } or a legacy Instagram permalink string.
 */
(function () {
  'use strict';

  function parseEntry(entry) {
    if (!entry) return null;

    if (typeof entry === 'object') {
      const href = entry.href || entry.url || '';
      const image = entry.image || entry.src || '';
      const title = entry.title || entry.caption || 'Instagram';
      if (!image) return null;
      return {
        title,
        href: href || 'https://www.instagram.com/lostinburg_/',
        image,
      };
    }

    if (/^[A-Za-z0-9_-]+$/.test(entry)) {
      return {
        title: 'Instagram',
        href: `https://www.instagram.com/p/${entry}/`,
        image: '',
      };
    }

    const m = String(entry).match(
      /instagram\.com\/(?:[^/?#]+\/)?(p|reel)\/([A-Za-z0-9_-]+)/i
    );
    if (!m) return null;
    return {
      title: 'Instagram',
      href: `https://www.instagram.com/${m[1].toLowerCase()}/${m[2]}/`,
      image: '',
    };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    const mount = document.getElementById('igFeed');
    if (!mount) return;

    const media = window.LIB_MEDIA || {};
    const ig = media.instagram || {};
    const profile = ig.profile || 'https://www.instagram.com/lostinburg_/';
    const posts = Array.isArray(ig.posts)
      ? ig.posts.map(parseEntry).filter((p) => p && p.image).slice(0, 7)
      : [];

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

    mount.classList.toggle('ig-grid--five', posts.length >= 5);
    mount.classList.toggle('ig-grid--seven', posts.length >= 7);

    mount.innerHTML = posts
      .map((post) => {
        const title = escapeHtml(post.title);
        return `
        <a class="ig-cell" href="${escapeHtml(post.href)}" target="_blank" rel="noopener noreferrer" aria-label="${title}">
          <img src="${escapeHtml(post.image)}" alt="${title}" loading="lazy" decoding="async" width="640" height="640" />
          <span class="ig-cell__hover">${title}</span>
        </a>`;
      })
      .join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
