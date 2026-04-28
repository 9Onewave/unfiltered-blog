// ============================================================
//  UNFILTERED — MAIN JS
// ============================================================

// Copy protection
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && ['c','u','s','a'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});

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
    card.addEventListener('click', () => {
      window.location.href = post.file;
    });
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

// Active nav link
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('form-success').style.display = 'block';
    form.reset();
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'none';
    }, 5000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initFilters();
  initContactForm();
});
