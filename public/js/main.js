/* =====================================================
   MAIN.JS — Ali Healthcare Solutions
   Fixes: mobile menu, burger animation, smooth scroll,
   scroll-reveal, sticky nav, form feedback
===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. STICKY NAV ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── 2. MOBILE MENU — FULLY FIXED ── */
  const burger  = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('active', isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when any link inside menu is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking outside the menu
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !burger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 3. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 4. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(
    '.serve-card, .svc-block, .reviews-soon, .c-method, .sec-hd'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach((el, i) => {
      el.classList.add('reveal-ready');
      el.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* ── 5. FORM FEEDBACK ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function () {
      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
        btn.style.opacity = '0.75';
      }
    });
  }

});
