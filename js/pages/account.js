document.addEventListener('DOMContentLoaded', () => {
  const panel = document.querySelector('[data-account-panel]');
  if(!panel) return;
  panel.innerHTML = `
    <div class="account-top">
      <div class="avatar-circle">A</div>
      <div>
        <h2>AURONOX Client</h2>
        <p>client@auronox.com</p>
      </div>
    </div>
    <div class="info-list-simple">
      <div><span>Wishlist</span><strong>${window.wishlistState.count()} saved</strong></div>
      <div><span>Cart</span><strong>${window.cartState.count()} items</strong></div>
      <div><span>Status</span><strong>Premium member</strong></div>
    </div>`;
});
