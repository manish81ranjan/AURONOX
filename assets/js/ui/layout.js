(function(){
  const base = location.pathname.includes('/pages/') ? '..' : '.';
  const current = location.pathname.split('/').pop() || 'index.html';
  const navItems = [
    ['index.html','Home'],
    ['pages/shop.html','Shop'],
    ['pages/wishlist.html','Wishlist'],
    ['pages/orders.html','Orders'],
    ['pages/heritage.html','Heritage'],
    ['pages/contact.html','Contact'],
  ];
  const header = `
    <header class="navbar">
      <div class="container nav-shell">
        <a class="brand" href="${base}/index.html"><span class="brand-orb"></span><span>AURONOX</span></a>
        <nav class="nav-menu" data-nav-menu>
          ${navItems.map(([href, label]) => `<a href="${base}/${href}" class="${current === href.split('/').pop() ? 'active' : ''}">${label}</a>`).join('')}
          <a class="mobile-account-link" href="${base}/pages/account.html">Account</a>
        </nav>
        <div class="nav-actions">
          <a class="pill-btn" href="${base}/pages/cart.html">🛒 <span>Cart</span> <b data-cart-count>0</b></a>
          <a class="pill-btn" href="${base}/pages/account.html">⌁ <span>Account</span></a>
          <button class="hamburger" type="button" aria-label="menu" data-mobile-toggle>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">AURONOX</div>
        <div class="footer-links"><a href="${base}/pages/contact.html">Contact</a><a href="${base}/pages/heritage.html">Heritage</a><a href="${base}/pages/orders.html">Orders</a></div>
        <div class="footer-copy">© 2026 AURONOX. All rights reserved.</div>
      </div>
    </footer>`;

  document.addEventListener('DOMContentLoaded', () => {
    const h = document.querySelector('[data-header-slot]');
    const f = document.querySelector('[data-footer-slot]');
    if(h) h.innerHTML = header;
    if(f) f.innerHTML = footer;

    const toggle = document.querySelector('[data-mobile-toggle]');
    const menu = document.querySelector('[data-nav-menu]');
    toggle?.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu?.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add]');
      const wishBtn = e.target.closest('[data-wish]');
      if(addBtn){ window.cartState.add(addBtn.dataset.add, 1); addBtn.textContent = 'Added'; setTimeout(() => addBtn.textContent = 'Add', 900); }
      if(wishBtn){ const active = window.wishlistState.toggle(wishBtn.dataset.wish); wishBtn.textContent = active ? '♥' : '♡'; wishBtn.classList.toggle('active', active); }
    });

    const updateBadges = () => document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = window.cartState.count());
    updateBadges();
    window.addEventListener('cart:updated', updateBadges);
  });
})();
