// frontend/assets/js/pages/heritage.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function updateCartBadge() {
    const cart = typeof window.getCartItems === "function" ? window.getCartItems() : [];
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  updateCartBadge();
});