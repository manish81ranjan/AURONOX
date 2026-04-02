// frontend/assets/js/pages/checkout.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");

  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutMessage = document.getElementById("checkoutMessage");
  const paymentMethod = document.getElementById("paymentMethod");
  const paymentFields = document.getElementById("paymentFields");
  const cardNumber = document.getElementById("cardNumber");
  const holderName = document.getElementById("holderName");
  const checkoutMain = document.querySelector(".checkout-main");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function getCartSafe() {
    return typeof window.getCartItems === "function" ? window.getCartItems() : [];
  }

  function updateCartBadge() {
    const count = getCartSafe().reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  function formatPrice(value) {
    return `₹ ${Number(value).toLocaleString("en-IN")}`;
  }

  function showMessage(text, isError = false) {
    checkoutMessage.textContent = text;
    checkoutMessage.classList.add("show");
    checkoutMessage.classList.toggle("error", isError);
  }

  function renderEmptyState() {
    checkoutMain.innerHTML = `
      <div class="checkout-empty">
        <h3>Your cart is empty</h3>
        <p>Add premium timepieces and accessories before proceeding to checkout.</p>
        <a href="./shop.html" class="btn btn-gold">Explore Collection</a>
      </div>
    `;
    checkoutItems.innerHTML = "";
    checkoutSubtotal.textContent = "₹ 0";
    checkoutTotal.textContent = "₹ 0";
  }

  function itemTemplate(item) {
    return `
      <article class="checkout-item">
        <div class="checkout-item__media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>

        <div>
          <div class="checkout-item__title">${item.title}</div>
          <div class="checkout-item__meta">
            Qty ${item.qty} • ${formatPrice(item.price * item.qty)}
          </div>
        </div>
      </article>
    `;
  }

  function renderSummary(cart) {
    checkoutItems.innerHTML = cart.map(itemTemplate).join("");
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    checkoutSubtotal.textContent = formatPrice(subtotal);
    checkoutTotal.textContent = formatPrice(subtotal);
  }

  function togglePaymentFields() {
    const method = paymentMethod.value;
    const needsDetails = method !== "Cash on Delivery";

    paymentFields.style.display = needsDetails ? "grid" : "none";
    cardNumber.required = needsDetails;
    holderName.required = needsDetails;
  }

  paymentMethod?.addEventListener("change", togglePaymentFields);

  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = getCartSafe();
    if (!cart.length) {
      showMessage("Your cart is empty.", true);
      return;
    }

    const formData = new FormData(checkoutForm);
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pinCode",
      "paymentMethod"
    ];

    const missing = required.some((key) => !String(formData.get(key) || "").trim());
    if (missing) {
      showMessage("Please complete all required fields.", true);
      return;
    }

    if (paymentMethod.value !== "Cash on Delivery") {
      if (!String(formData.get("cardNumber") || "").trim() || !String(formData.get("holderName") || "").trim()) {
        showMessage("Please enter payment details.", true);
        return;
      }
    }

    localStorage.removeItem("auronox-cart");
    updateCartBadge();
    checkoutForm.reset();
    togglePaymentFields();
    renderEmptyState();
    showMessage("Order placed successfully. Your AURONOX concierge confirmation is on the way.");
  });

  updateCartBadge();

  const cart = getCartSafe();
  if (!cart.length) {
    renderEmptyState();
  } else {
    renderSummary(cart);
    togglePaymentFields();
  }
});