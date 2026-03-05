export function initScrollAnimations() {
  const animateElements = document.querySelectorAll('[data-animate]');
  const staggerElements = document.querySelectorAll('[data-animate-stagger]');
  const processSteps = document.querySelectorAll('.process__step');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));
  staggerElements.forEach(el => observer.observe(el));
  processSteps.forEach(el => observer.observe(el));

  // Subtle parallax on hero orbs
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let ticking = false;

    function handleParallax() {
      const scrollY = window.scrollY;
      const heroOrbs = document.querySelectorAll('.hero__orb');

      heroOrbs.forEach((orb, i) => {
        const speed = 0.1 + (i * 0.05);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleParallax);
        ticking = true;
      }
    }, { passive: true });
  }
}
