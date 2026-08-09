// ===== PHOTO LOADERS (used across the site for editable image slots) =====
function loadPhoto(e, imgId, placeholderId) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById(imgId);
        const ph  = document.getElementById(placeholderId);
        if (!img) return;
        img.src = ev.target.result;
        img.style.display = 'block';
        if (ph) ph.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function triggerUpload(inputId) {
    const input = document.getElementById(inputId);
    if (input) input.click();
}

function loadPortfolioImg(e, imgId, phId) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById(imgId);
        const ph  = document.getElementById(phId);
        if (!img) return;
        img.src = ev.target.result;
        img.style.display = 'block';
        if (ph) ph.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// ===== HOBBIES GRID (index page only) =====
(function buildHobbies() {
    const grid = document.getElementById('hobbiesGrid');
    if (!grid) return;

    const hobbyPhotos = [
        'images/myhobbies/hobbies1.jpg',
        'images/myhobbies/hobbies2.jpg',
        'images/myhobbies/hobbies3.jpg',
        'images/myhobbies/hobbies4.jpg',
        'images/myhobbies/hobbies5.jpg',
        'images/myhobbies/hobbies6.jpg'
    ];

    for (let i = 0; i < 6; i++) {
        const label = document.createElement('label');
        label.className = 'hobby-card';
        label.setAttribute('tabindex', '0');
        label.setAttribute('aria-label', `Hobby photo ${i + 1}`);

        label.innerHTML = `

            <img
                id="hImg${i}"
                class="hobby-card-img"
                src="${hobbyPhotos[i]}"
                alt="Hobby photo ${i + 1}"
                style="display:block;"
            >

            <span class="hobby-icon" id="hIcon${i}" aria-hidden="true">
                📷
            </span>

            <span class="hobby-hint" id="hHint${i}">
                Change Photo
            </span>
        `;

        grid.appendChild(label);
    }
})();

function previewHobby(e, i) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {
        const img = document.getElementById('hImg' + i);
        if (!img) return;

        img.src = ev.target.result;
        img.style.display = 'block';

        document.getElementById('hIcon' + i).style.display = 'none';
        document.getElementById('hHint' + i).style.display = 'none';
    };

    reader.readAsDataURL(file);
}

// ===== MOBILE NAV =====
function toggleNav() {
    const menu = document.getElementById('mobileMenu');
    const btn  = document.querySelector('.nav-toggle');
    if (!menu || !btn) return;
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
}
function closeNav() {
    const menu = document.getElementById('mobileMenu');
    const btn  = document.querySelector('.nav-toggle');
    if (menu) menu.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

// ===== CONTACT FORM (index page only) =====
function submitContact() {
    const nameEl  = document.getElementById('contactName');
    const emailEl = document.getElementById('contactEmail');
    const msgEl   = document.getElementById('contactMsg');
    if (!nameEl || !emailEl || !msgEl) return;
    const name  = nameEl.value.trim();
    const email = emailEl.value.trim();
    const msg   = msgEl.value.trim();
    if (!name || !email || !msg) {
        alert('Please fill in all fields before sending.');
        return;
    }
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body    = encodeURIComponent(`${msg}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:rosemarrydaparre@gmail.com?subject=${subject}&body=${body}`;
}

// ===== COLLEGE GALLERY (index page only) =====
function loadCollegeHero(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById('collegeHeroImg');
        if (!img) return;
        img.src = ev.target.result; img.style.display = 'block';
        document.getElementById('collegeHeroIcon').style.display = 'none';
        document.getElementById('collegeHeroHint').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function loadGalleryImg(e, imgId, innerId) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById(imgId);
        if (!img) return;
        img.src = ev.target.result; img.style.display = 'block';
        const inner = document.getElementById(innerId);
        if (inner) inner.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// ===== CERTIFICATE IMAGES =====
function loadCertImg(e, imgId, thumbId) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById(imgId);
        if (!img) return;
        img.src = ev.target.result; img.style.display = 'block';
        const thumb = document.getElementById(thumbId);
        if (thumb) thumb.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== BACK TO TOP =====
const btt = document.getElementById('backToTop');
if (btt) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) btt.classList.add('visible');
        else btt.classList.remove('visible');
    }, { passive: true });
}

// ===== ACTIVE NAV HIGHLIGHT (index page — sections with matching #hash nav links) =====
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
if (navSections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href') || '';
                    link.style.color = href.endsWith('#' + entry.target.id) ? 'var(--rose)' : '';
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    navSections.forEach(s => navObserver.observe(s));
}

const textarea = document.querySelector('.caption-textarea');

function autoResize() {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}


function openGraphic(element) {
    const image = element.querySelector('img');
    const lightbox = document.getElementById('graphicLightbox');
    const expandedImage = document.getElementById('expandedGraphic');

    expandedImage.src = image.src;
    expandedImage.alt = image.alt;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGraphic(event) {
    if (
        event &&
        event.target !== event.currentTarget &&
        !event.target.classList.contains('graphic-close')
    ) {
        return;
    }

    const lightbox = document.getElementById('graphicLightbox');

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGraphic();
    }
});


function openGmbImage(image) {
    const lightbox = document.getElementById("gmbLightbox");
    const lightboxImage = document.getElementById("gmbLightboxImage");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");
}

function closeGmbImage() {
    document.getElementById("gmbLightbox").classList.remove("active");
}


function toggleNav(){
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.nav-toggle');
  const isOpen = menu.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
 
function closeNav(){
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.nav-toggle');
  menu.classList.remove('is-open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
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
let lastFocusedEl = null;
 
function openArticle(id){
  const data = articles[id];
  if (!data) return;
 
  document.getElementById('modalCategory').textContent = data.category;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalMeta').textContent = data.meta;
  document.getElementById('modalText').innerHTML = data.body;
 
  const modal = document.getElementById('articleModal');
  lastFocusedEl = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.ws-modal__close').focus();
}
 
function closeArticle(){
  const modal = document.getElementById('articleModal');
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.getElementById('articleModal').hidden){
    closeArticle();
  }
});
 
/* =========================================================
   FILTERS
========================================================= */
function initFilters(){
  const buttons = document.querySelectorAll('.ws-filter');
  const cards = document.querySelectorAll('.ws-card');
  const emptyState = document.getElementById('emptyState');
 
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
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
 
      emptyState.hidden = visibleCount !== 0;
    });
  });
}
 
/* =========================================================
   BACK TO TOP
========================================================= */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  });
}
 
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initBackToTop();
});
 



