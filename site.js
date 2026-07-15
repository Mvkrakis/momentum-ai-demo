const nav = document.querySelector('.site-nav');
const links = [...document.querySelectorAll('.site-nav nav a')];
const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 30 ? '0 8px 25px #0b0a1426' : 'none';
  const position = window.scrollY + 140;
  let current = null;
  sections.forEach((section) => { if (section.offsetTop <= position) current = section.id; });
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
});
