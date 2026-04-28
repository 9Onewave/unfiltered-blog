// ============================================================
//  UNFILTERED — MAIN JS
//  Author: 9onewave | https://9onewave.github.io
// ============================================================

// Copy protection
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && ['c','u','s','a'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});

// Reading progress bar (post pages only)
function initReadingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    bar.style.width = scrollHeight > 0 ? (scrollTop / scrollHeight * 100) + '%' : '0%';
  });
}

// Render post cards
function renderPosts(filter) {
  const grid = document.getElementById('posts-grid');
  const noResults = document.getElementById('no-results');
  if (!grid) return;

  const filtered = filter === 'all'
    ? POSTS
    : POSTS.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  filtered.forEach((post, i) => {
    const card = document.createElement('div');
    card.className = 'post-card protected';
    card.style.animationDelay = `${i * 0.07}s`;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', post.title);
    card.innerHTML = `
      <div class="post-card-image">
        <img src="${post.image}" alt="${post.title}" loading="lazy" draggable="false" oncontextmenu="return false">
      </div>
      <div class="post-card-body">
        <div class="post-card-category">${post.category}</div>
        <div class="post-card-title">${post.title}</div>
        <div class="post-card-summary">${post.summary}</div>
        <div class="post-card-footer">
          <span class="post-card-date">${post.date} &middot; ${post.readTime}</span>
          <span class="post-card-link">Read &rarr;</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => { window.location.href = post.file; });
    card.addEventListener('keydown', e => { if (e.key === 'Enter') window.location.href = post.file; });
    card.setAttribute('tabindex', '0');
    grid.appendChild(card);
  });
}

// Filter buttons
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPosts(btn.dataset.filter);
    });
  });
  renderPosts('all');
}

// Active nav link — works for both root and /posts/ depth
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.navbar-links a').forEach(a => {
    const href = a.getAttribute('href');
    // Normalise: strip leading ../
    const normHref = href.replace(/^\.\.\//, '');
    if (
      (normHref === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))) ||
      (normHref !== 'index.html' && path.includes(normHref.replace('.html', '')))
    ) {
      a.classList.add('active');
    }
  });
}

// Contact form — works with Formspree (real send) or fallback
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const successMsg = document.getElementById('form-success');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        successMsg.style.display = 'block';
        form.reset();
        btn.textContent = 'Send message';
        btn.disabled = false;
        setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Fallback for local testing / Formspree not yet set up
      successMsg.style.display = 'block';
      form.reset();
      btn.textContent = 'Send message';
      btn.disabled = false;
      setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
    }
  });
}

// Share buttons on post pages
function initShareButtons() {
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.share;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      const links = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        copy: null
      };
      if (platform === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = 'Copy link'; }, 2000);
        });
      } else if (links[platform]) {
        window.open(links[platform], '_blank', 'width=600,height=400');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initFilters();
  initContactForm();
  initReadingProgress();
  initShareButtons();
});
