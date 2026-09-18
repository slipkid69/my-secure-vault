const toc = document.querySelector('.toc');
const toggle = document.querySelector('.menu-toggle');
const topButton = document.querySelector('.back-to-top');
const progress = document.querySelector('.reading-progress');
const links = [...document.querySelectorAll('.toc a[href^="#chapter-"]')];
const sections = [...document.querySelectorAll('.chapter')];

toggle?.addEventListener('click', () => {
  const open = toc.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Chapters';
});

toc?.addEventListener('click', event => {
  if (event.target.closest('a') && window.innerWidth <= 900) {
    toc.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Chapters';
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-18% 0px -70% 0px', threshold: 0 });
sections.forEach(section => observer.observe(section));

const updateScroll = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
  topButton.classList.toggle('visible', window.scrollY > 700);
};
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
