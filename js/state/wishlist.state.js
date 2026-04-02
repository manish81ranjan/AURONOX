// const WISHLIST_KEY = 'auronox_wishlist_v1';
// window.wishlistState = {
//   get(){ try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch { return []; } },
//   save(items){ localStorage.setItem(WISHLIST_KEY, JSON.stringify(items)); window.dispatchEvent(new CustomEvent('wishlist:updated')); },
//   toggle(id){ const items = this.get(); const exists = items.includes(id); this.save(exists ? items.filter(x => x !== id) : [...items, id]); return !exists; },
//   has(id){ return this.get().includes(id); },
//   items(){ return this.get().map(id => window.getProductById(id)).filter(Boolean); },
//   count(){ return this.get().length; }
// };
// frontend/assets/js/state/wishlist.state.js
function getWishlistItems() {
  return JSON.parse(localStorage.getItem("auronox-wishlist") || "[]");
}

function saveWishlistItems(items) {
  localStorage.setItem("auronox-wishlist", JSON.stringify(items));
}

window.toggleWishlist = function toggleWishlist(productId) {
  const list = getWishlistItems();
  const exists = list.includes(productId);
  const next = exists ? list.filter((id) => id !== productId) : [...list, productId];
  saveWishlistItems(next);
  return !exists;
};

window.isInWishlist = function isInWishlist(productId) {
  return getWishlistItems().includes(productId);
};