// document.addEventListener('DOMContentLoaded', () => {
//   const grid = document.querySelector('[data-wishlist-grid]');
//   if(!grid) return;
//   function render(){
//     const items = window.wishlistState.items();
//     grid.innerHTML = items.length ? items.map(window.productCard).join('') : '<div class="empty-state">No items in wishlist yet.</div>';
//   }
//   render();
//   window.addEventListener('wishlist:updated', render);
// });
// frontend/assets/js/pages/wishlist.js
// REPLACE FULL FILE

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");
  const wishlistGrid = document.getElementById("wishlistGrid");
  const clearWishlistBtn = document.getElementById("clearWishlistBtn");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("auronox-cart") || "[]");
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  function getWishlistIds() {
    return JSON.parse(localStorage.getItem("auronox-wishlist") || "[]");
  }

  function saveWishlistIds(ids) {
    localStorage.setItem("auronox-wishlist", JSON.stringify(ids));
  }

  function removeFromWishlist(productId) {
    const next = getWishlistIds().filter((id) => id !== productId);
    saveWishlistIds(next);
    renderWishlist();
  }

  function clearWishlist() {
    saveWishlistIds([]);
    renderWishlist();
  }

  function getProducts() {
    if (typeof window.getProductById !== "function") return [];
    return getWishlistIds()
      .map((id) => window.getProductById(id))
      .filter(Boolean);
  }

  function renderEmpty() {
    wishlistGrid.innerHTML = `
      <div class="wishlist-empty">
        <h3>Your wishlist is empty</h3>
        <p>Save your favorite timepieces and accessories here for quick access later.</p>
        <a href="./shop.html" class="btn btn-gold">Explore Collection</a>
      </div>
    `;
  }

  function cardTemplate(product) {
    return `
      <article class="wishlist-card">
        <a href="./product.html?id=${product.id}" class="wishlist-card__media">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
        </a>

        <div class="wishlist-card__content">
          <p class="wishlist-card__series">${product.series || ""}</p>
          <a href="./product.html?id=${product.id}" class="wishlist-card__title">${product.title}</a>
          <p class="wishlist-card__desc">${product.description || ""}</p>

          <div class="wishlist-card__bottom">
            <strong class="wishlist-card__price">₹ ${Number(product.price).toLocaleString("en-IN")}</strong>

            <div class="wishlist-card__actions">
              <a href="./product.html?id=${product.id}" class="btn-outline">View</a>
              <button class="btn btn-gold" type="button" data-add-cart="${product.id}">Add to Cart</button>
            </div>

            <div class="wishlist-card__actions-row">
              <button class="wishlist-remove" type="button" data-remove-wishlist="${product.id}">Remove from Wishlist</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderWishlist() {
    const products = getProducts();

    if (!products.length) {
      renderEmpty();
      return;
    }

    wishlistGrid.innerHTML = products.map(cardTemplate).join("");
  }

  clearWishlistBtn?.addEventListener("click", () => {
    clearWishlist();
  });

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn && typeof window.addToCart === "function") {
      window.addToCart(addBtn.dataset.addCart, 1);
      updateCartBadge();
      addBtn.textContent = "Added";
      setTimeout(() => {
        addBtn.textContent = "Add to Cart";
      }, 1200);
      return;
    }

    const removeBtn = e.target.closest("[data-remove-wishlist]");
    if (removeBtn) {
      removeFromWishlist(removeBtn.dataset.removeWishlist);
    }
  });

  updateCartBadge();
  renderWishlist();
});