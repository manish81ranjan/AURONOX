window.formatINR = function formatINR(value){
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value).replace('₹', '₹ ');
};
window.escapeHtml = (s='') => s.replace(/[&<>"]/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m] || m));
window.relativeBase = () => location.pathname.includes('/pages/') ? '..' : '.';
window.normalizeAsset = function normalizeAsset(path){
  if(!path) return '';
  const base = window.relativeBase();
  return base === '.' ? path.replace(/^\.\.\//, './') : path;
};
window.productCard = function productCard(product){
  const base = window.relativeBase();
  const fav = window.wishlistState?.has(product.id);
  return `
    <article class="product-card-clean panel luxury-outline">
      <a class="product-image-wrap" href="${base}/pages/product.html?id=${product.id}">
        <img src="${window.normalizeAsset(product.image)}" alt="${window.escapeHtml(product.title)}" />
      </a>
      <div class="product-body-clean">
        <div class="product-card-top">
          <div>
            <div class="mini-kicker">${product.series}</div>
            <h3>${window.escapeHtml(product.title)}</h3>
          </div>
          <button class="wish-btn ${fav ? 'active' : ''}" data-wish="${product.id}">${fav ? '♥' : '♡'}</button>
        </div>
        <p>${window.escapeHtml(product.description)}</p>
        <div class="product-bottom-row">
          <strong>${window.formatINR(product.price)}</strong>
          <div class="mini-actions">
            <a class="btn btn-ghost btn-small" href="${base}/pages/product.html?id=${product.id}">View</a>
            <button class="btn btn-gold btn-small" data-add="${product.id}">Add</button>
          </div>
        </div>
      </div>
    </article>`;
};
