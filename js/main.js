/* ============================================================
   MELEK CLOTHING — MAIN SITE LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE LOADER ──────────────────────────────────────────
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
    document.querySelector('.hero')?.classList.add('loaded');
  }, 1400);

  // ── NAVBAR ───────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
    document.querySelector('.back-top')?.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile?.classList.toggle('open');
    document.body.classList.toggle('no-scroll', navMobile?.classList.contains('open'));
  });

  navMobile?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMobile.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  // Active link highlight
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // ── SEARCH OVERLAY ────────────────────────────────────────
  const searchBtn = document.querySelector('.search-btn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-box input');

  searchBtn?.addEventListener('click', () => {
    searchOverlay?.classList.add('open');
    document.body.classList.add('no-scroll');
    setTimeout(() => searchInput?.focus(), 200);
  });
  searchClose?.addEventListener('click', closeSearch);
  searchOverlay?.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });
  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'Enter') handleSearch(searchInput.value.trim());
  });

  function closeSearch() {
    searchOverlay?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function handleSearch(q) {
    if (!q) return;
    closeSearch();
    // Store search query and redirect to catalogue
    localStorage.setItem('melek_search', q);
    location.href = 'homme.html';
  }

  // ── BACK TO TOP ───────────────────────────────────────────
  document.querySelector('.back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── WHATSAPP MODAL ────────────────────────────────────────
  const modalBackdrop = document.getElementById('wa-modal');
  document.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.getElementById('btn-send-wa')?.addEventListener('click', sendWhatsApp);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) closeModal();
  });

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function observeReveal() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });
  }
  observeReveal();

  // ── FILTER CHIPS ─────────────────────────────────────────
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.closest('.filter-bar').querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      filterProducts(filter);
    });
  });

  function filterProducts(filter) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach(card => {
      const sub = card.querySelector('.product-sub')?.textContent.toLowerCase() || '';
      const match = filter === 'all' || sub.includes(filter.toLowerCase());
      card.style.display = match ? '' : 'none';
    });
    // Re-observe for animation
    setTimeout(observeReveal, 50);
  }

  // ── SORT ─────────────────────────────────────────────────
  document.querySelector('.filter-sort')?.addEventListener('change', function() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.product-card')];
    cards.sort((a, b) => {
      const pa = parseFloat(a.querySelector('.product-price')?.textContent) || 0;
      const pb = parseFloat(b.querySelector('.product-price')?.textContent) || 0;
      return this.value === 'asc' ? pa - pb : pb - pa;
    });
    cards.forEach(c => grid.appendChild(c));
  });

  // ── SEARCH ON PRODUCT PAGES ───────────────────────────────
  const savedQuery = localStorage.getItem('melek_search');
  if (savedQuery) {
    localStorage.removeItem('melek_search');
    const allCards = document.querySelectorAll('.product-card');
    if (allCards.length > 0) {
      allCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(savedQuery.toLowerCase()) ? '' : 'none';
      });
    }
  }

});

/* Expose globals */
window.observeReveal = function() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
};
