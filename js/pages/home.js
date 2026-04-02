document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('[data-home-products]');
  if(!target) return;
  target.innerHTML = window.getCatalog().slice(0, 6).map(window.productCard).join('');
});
