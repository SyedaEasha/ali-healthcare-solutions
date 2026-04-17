// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// MOBILE MENU
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 66, behavior: 'smooth' });
    }
  });
});

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.serve-card, .svc-block, .reviews-soon, .c-method').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.45s ${i * 0.07}s ease, transform 0.45s ${i * 0.07}s ease`;
  revealObserver.observe(el);
});

// FORM — show a thank-you message on submit
// (FormSubmit.co handles the actual email sending via action= on the form)
// This just gives a quick visual response before redirect
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function() {
    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }
  });
}
