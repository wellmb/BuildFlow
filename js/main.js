(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  const contactForm = document.querySelector('.contact-form');

  /* Header scroll state */
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.hidden = true;
    document.body.style.overflow = '';
  }

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  menuToggle?.addEventListener('click', function () {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks?.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  /* Contact form */
  contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Request Received';
    btn.disabled = true;
    setTimeout(function () {
      contactForm.reset();
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
})();
