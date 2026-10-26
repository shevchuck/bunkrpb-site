const viewer = document.querySelector('#image-viewer');
const enlarged = viewer.querySelector('img');
for (const button of document.querySelectorAll('[data-image]')) {
  button.addEventListener('click', () => {
    enlarged.src = button.dataset.image;
    enlarged.alt = button.querySelector('img').alt;
    viewer.showModal();
  });
}
viewer.querySelector('.close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
const contents = document.querySelector('aside details');
const mobile = window.matchMedia('(max-width: 760px)');
function sizeContents() { contents.open = !mobile.matches; }
sizeContents();
mobile.addEventListener('change', sizeContents);
contents.addEventListener('click', event => {
  if (event.target.closest('a') && mobile.matches) contents.open = false;
});
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    for (const link of document.querySelectorAll('aside nav a')) {
      if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
}, {rootMargin: '-15% 0px -65% 0px'});
document.querySelectorAll('main > section').forEach(section => observer.observe(section));
