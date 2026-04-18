/* =====================================================
   MAIN.JS — Ali Healthcare Solutions — Premium v6
   Features: mobile menu, smooth scroll, staggered
   reveal, number counters, parallax hero, form UX
===================================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. STICKY NAV ─── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    navbar.classList.toggle('scrolled', curr > 50);
    // Hide nav on scroll down, show on scroll up
    if (curr > 120 && curr > lastScroll) {
      navbar.classList.add('nav--hidden');
    } else {
      navbar.classList.remove('nav--hidden');
    }
    lastScroll = curr;
  }, { passive: true });

  /* ─── 2. MOBILE MENU ─── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', e => {
      e.stopPropagation();
      const open = mobileMenu.classList.toggle('open');
      burger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    }));
    document.addEventListener('click', e => {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── 3. SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── 4. STAGGERED SCROLL REVEAL ─── */
  const revealGroups = [
    { selector: '.serve-card',   delay: 0.08 },
    { selector: '.svc-block',    delay: 0.10 },
    { selector: '.c-method',     delay: 0.10 },
    { selector: '.reviews-soon', delay: 0 },
    { selector: '.sec-hd',       delay: 0 },
    { selector: '.hero__tag, .hero__title, .hero__sub, .hero__desc, .hero__btns, .hero__chips', delay: 0 },
  ];

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  revealGroups.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * delay}s`;
      io.observe(el);
    });
  });

  /* ─── 5. HERO PARALLAX (subtle) ─── */
  const heroInner = document.querySelector('.hero__inner');
  const heroShapes = document.querySelectorAll('.hero__shape--1, .hero__shape--2');
  if (heroInner) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroInner.style.transform = `translateY(${y * 0.18}px)`;
        heroShapes.forEach((s, i) => {
          s.style.transform = `translateY(${y * (i === 0 ? 0.08 : -0.06)}px)`;
        });
      }
    }, { passive: true });
  }

  /* ─── 6. ACTIVE NAV LINK on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('nav__link--active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* ─── 7. FORM UX ─── */
  const form = document.getElementById('contactForm');
  if (form) {
    // Float label effect
    form.querySelectorAll('input, select').forEach(field => {
      field.addEventListener('focus', () => field.parentElement.classList.add('focused'));
      field.addEventListener('blur',  () => field.parentElement.classList.remove('focused'));
    });
    form.addEventListener('submit', function () {
      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.innerHTML = '<span class="btn-spinner"></span> Sending…';
        btn.disabled = true;
      }
    });
  }

  /* ─── 8. BUTTON RIPPLE EFFECT ─── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width:${size}px; height:${size}px;
        top:${e.clientY - rect.top - size/2}px;
        left:${e.clientX - rect.left - size/2}px;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ─── 9. SERVICE ITEM HOVER SHIMMER ─── */
  document.querySelectorAll('.svc-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.classList.add('svc-item--hovered');
    });
    item.addEventListener('mouseleave', function () {
      this.classList.remove('svc-item--hovered');
    });
  });

});
