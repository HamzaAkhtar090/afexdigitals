import { initNavigation } from './navigation.js';
import { initScrollAnimations } from './animations.js';
import { initCounters } from './counters.js';
import { initTestimonials } from './testimonials.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initCounters();
  initTestimonials();
});
