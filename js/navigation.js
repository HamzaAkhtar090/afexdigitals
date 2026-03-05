export function initNavigation() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
  const sections = document.querySelectorAll('section[id]');

  let isMenuOpen = false;

  // Sticky nav on scroll
  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    updateActiveLink();
  }

  // Active nav link based on scroll position
  function updateActiveLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  // Mobile menu toggle
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    toggle.classList.toggle('nav__toggle--open', isMenuOpen);
    toggle.setAttribute('aria-expanded', isMenuOpen);
    mobileMenu.classList.toggle('mobile-menu--open', isMenuOpen);
    mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  // Close menu on link click
  function closeMenu() {
    if (isMenuOpen) {
      toggleMenu();
    }
  }

  // Smooth scroll for anchor links
  function handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      closeMenu();
    }
  }

  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  toggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  // Also smooth scroll for footer links and hero CTA
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  // Initial check
  handleScroll();
}
