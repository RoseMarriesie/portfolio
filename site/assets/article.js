document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     NAV
  ========================================================= */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function openNav(){
    mobileMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav(){
    mobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && mobileMenu){
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.contains('is-open') ? closeNav() : openNav();
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  } else {
    console.warn('Nav toggle or mobile menu not found — check #navToggle / #mobileMenu in the HTML.');
  }

  /* =========================================================
     ARTICLE CONTENT
     Replace these placeholders with your real writing samples.
  ========================================================= */
  const articles = {
    featured: {
      category: 'SEO Content',
      title: 'Your featured article headline goes here',
      meta: 'SEO Writing • Website Content',
      body: '<p>Drop the full text of your featured piece here.</p>'
    },
    article1: {
      category: 'SEO',
      title: 'Your First Article Title',
      meta: 'SEO Article',
      body: '<p>Drop the full text of this article here.</p>'
    },
    article2: {
      category: 'Digital Marketing',
      title: 'Your Second Article Title',
      meta: 'Blog Article',
      body: '<p>Drop the full text of this article here.</p>'
    },
    article3: {
      category: 'Website',
      title: 'Your Third Article Title',
      meta: 'Web Copy',
      body: '<p>Drop the full text of this article here.</p>'
    },
    article4: {
      category: 'Industry',
      title: 'Your Fourth Article Title',
      meta: 'Industry Content',
      body: '<p>Drop the full text of this article here.</p>'
    },
    article5: {
      category: 'SEO',
      title: 'Your Fifth Article Title',
      meta: 'SEO Content',
      body: '<p>Drop the full text of this article here.</p>'
    },
    article6: {
      category: 'Digital Marketing',
      title: 'Your Sixth Article Title',
      meta: 'Marketing Content',
      body: '<p>Drop the full text of this article here.</p>'
    }
  };

  /* =========================================================
     MODAL
  ========================================================= */
  const modal = document.getElementById('articleModal');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalText = document.getElementById('modalText');
  const modalClose = modal ? modal.querySelector('.ws-modal__close') : null;
  const modalBackdrop = modal ? modal.querySelector('.ws-modal__backdrop') : null;

  let lastFocusedEl = null;

  function openArticle(id){
    const data = articles[id];
    if (!data){
      console.warn('No article content found for id:', id);
      return;
    }
    if (!modal){
      console.warn('Modal element (#articleModal) not found in the HTML.');
      return;
    }

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalMeta.textContent = data.meta;
    modalText.innerHTML = data.body;

    lastFocusedEl = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (modalClose) modalClose.focus();
  }

  function closeArticle(){
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  if (modal){
    document.querySelectorAll('[data-article]').forEach(btn => {
      btn.addEventListener('click', () => openArticle(btn.dataset.article));
    });
    if (modalClose) modalClose.addEventListener('click', closeArticle);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeArticle);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeArticle();
    });
  } else {
    console.warn('Modal (#articleModal) not found — read buttons will not open it.');
  }

  /* =========================================================
     FILTERS
  ========================================================= */
  const filterButtons = document.querySelectorAll('.ws-filter');
  const cards = document.querySelectorAll('.ws-card');
  const emptyState = document.getElementById('emptyState');

  if (filterButtons.length && cards.length){
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.dataset.filter;
        let visibleCount = 0;

        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? '' : 'none';
          if (match) visibleCount++;
        });

        if (emptyState) emptyState.hidden = visibleCount !== 0;
      });
    });
  } else {
    console.warn('Filter buttons (.ws-filter) or cards (.ws-card) not found.');
  }

  /* =========================================================
     BACK TO TOP
  ========================================================= */
  const backToTop = document.getElementById('backToTop');
  if (backToTop){
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 400);
    });
  } else {
    console.warn('Back-to-top button (#backToTop) not found.');
  }

});