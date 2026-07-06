(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  const contactForm = document.querySelector('.contact-form');
  const faqItems = document.querySelectorAll('.faq-item');

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

  /* FAQ accordion */
  function closeFaqItem(item) {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!button || !answer || !item.classList.contains('is-open')) return;

    answer.style.height = answer.scrollHeight + 'px';
    requestAnimationFrame(function () {
      item.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      answer.style.height = '0px';
    });

    answer.addEventListener('transitionend', function onClose() {
      if (!item.classList.contains('is-open')) {
        answer.hidden = true;
      }
      answer.removeEventListener('transitionend', onClose);
    });
  }

  function openFaqItem(item) {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');
    if (!button || !answer || !inner) return;

    answer.hidden = false;
    item.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    answer.style.height = inner.scrollHeight + 'px';

    answer.addEventListener('transitionend', function onOpen() {
      if (item.classList.contains('is-open')) {
        answer.style.height = 'auto';
      }
      answer.removeEventListener('transitionend', onOpen);
    });
  }

  faqItems.forEach(function (item) {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    button?.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        if (other !== item) closeFaqItem(other);
      });

      if (isOpen) {
        closeFaqItem(item);
      } else {
        openFaqItem(item);
      }
    });

    answer?.addEventListener('transitionend', function (e) {
      if (e.propertyName !== 'height') return;
      if (!item.classList.contains('is-open')) {
        answer.hidden = true;
        answer.style.height = '0px';
      }
    });
  });

  window.addEventListener('resize', function () {
    faqItems.forEach(function (item) {
      if (!item.classList.contains('is-open')) return;
      const answer = item.querySelector('.faq-answer');
      const inner = item.querySelector('.faq-answer-inner');
      if (answer && inner) {
        answer.style.height = inner.scrollHeight + 'px';
      }
    });
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
