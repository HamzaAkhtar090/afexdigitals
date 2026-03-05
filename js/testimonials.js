export function initTestimonials() {
  const slides = document.querySelectorAll('.testimonials__slide');
  const dots = document.querySelectorAll('.testimonials__dot');

  if (slides.length === 0) return;

  let current = 0;
  let interval = null;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = index;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startAutoPlay() {
    interval = setInterval(next, 5000);
  }

  function stopAutoPlay() {
    clearInterval(interval);
  }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      goTo(i);
      startAutoPlay();
    });
  });

  // Touch/swipe support
  const slider = document.querySelector('.testimonials__slider');
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      stopAutoPlay();
      if (diff > 0) {
        goTo((current + 1) % slides.length);
      } else {
        goTo((current - 1 + slides.length) % slides.length);
      }
      startAutoPlay();
    }
  }, { passive: true });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();
}
