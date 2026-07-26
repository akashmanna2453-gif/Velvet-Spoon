const loadingScreen = document.querySelector('.loading-screen');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const progressBar = document.querySelector('.progress-bar');
const toast = document.getElementById('toast');
const heroTitle = document.getElementById('hero-title');
const liveClock = document.getElementById('live-clock');
const reservationForm = document.getElementById('reservation-form');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
const searchInput = document.getElementById('menu-search');
const favoriteButtons = document.querySelectorAll('.favorite-btn');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const revealItems = document.querySelectorAll('.reveal');

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1200);

  if (heroTitle) {
    typeTitle(heroTitle, 'Experience Fine Dining Like Never Before');
  }
});

function typeTitle(element, text) {
  let index = 0;
  element.textContent = '';

  const typing = setInterval(() => {
    element.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      clearInterval(typing);
    }
  }, 70);
}

window.addEventListener('mousemove', (event) => {
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
});

const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .menu-card, .gallery-item, .benefit-card');
interactiveElements.forEach((element) => {
  element.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  element.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  navbar.classList.toggle('scrolled', scrollTop > 80);
  backToTop.classList.toggle('show', scrollTop > 600);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => observer.observe(item));

function updateClock() {
  const now = new Date();
  liveClock.textContent = `Local time: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

updateClock();
setInterval(updateClock, 1000);

reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(reservationForm);
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid name and email.');
    return;
  }

  showToast(`Reservation request received for ${name}. We will contact you shortly.`);
  reservationForm.reset();
});

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input');
  const value = input.value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    newsletterMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  newsletterMessage.textContent = 'Thank you for subscribing to our chef notes.';
  newsletterForm.reset();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

let currentSlide = 0;
function rotateTestimonials() {
  testimonialCards.forEach((card, index) => {
    card.classList.toggle('active', index === currentSlide);
  });
  currentSlide = (currentSlide + 1) % testimonialCards.length;
}

setInterval(rotateTestimonials, 4500);
rotateTestimonials();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    menuCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden-card', !matches);
    });
  });
});

searchInput?.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();

  menuCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    const matches = name.includes(query) || description.includes(query);
    card.classList.toggle('hidden-card', !matches);
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    button.textContent = button.classList.contains('active') ? '♥' : '♡';
    showToast('Added to your favorites list.');
  });
});

const hero = document.querySelector('.hero');
hero?.addEventListener('mousemove', (event) => {
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  hero.style.setProperty('--mouse-x', `${x * 8}deg`);
  hero.style.setProperty('--mouse-y', `${y * 8}deg`);
});

hero?.addEventListener('mouseleave', () => {
  hero.style.setProperty('--mouse-x', '0deg');
  hero.style.setProperty('--mouse-y', '0deg');
});

const style = document.createElement('style');
style.textContent = `
  .hero-content {
    transform: perspective(1000px) rotateX(var(--mouse-y, 0deg)) rotateY(var(--mouse-x, 0deg));
    transition: transform 0.2s ease;
  }
`;
document.head.appendChild(style);
