// document.addEventListener('DOMContentLoaded', () => {
//   const list = document.querySelector('[data-cart-items]');
//   const summary = document.querySelector('[data-cart-summary]');
//   if(!list || !summary) return;
//   function render(){
//     const items = window.cartState.items();
//     if(!items.length){
//       list.innerHTML = '<div class="empty-state">Your cart is empty. Add a timepiece from the shop.</div>';
//       summary.innerHTML = `<div class="summary-row"><span>Total</span><strong>${window.formatINR(0)}</strong></div>`;
//       return;
//     }
//     list.innerHTML = items.map(item => `
//       <article class="cart-line">
//         <img src="${item.image}" alt="${item.title}" />
//         <div class="cart-line-copy">
//           <div class="mini-kicker">${item.series}</div>
//           <h3>${item.title}</h3>
//           <p>${item.description}</p>
//           <div class="qty-row">
//             <button data-dec="${item.id}">−</button>
//             <strong>${item.qty}</strong>
//             <button data-inc="${item.id}">+</button>
//             <button class="text-btn" data-remove="${item.id}">Remove</button>
//           </div>
//         </div>
//         <strong class="cart-line-price">${window.formatINR(item.lineTotal)}</strong>
//       </article>`).join('');
//     const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
//     const gst = Math.round(subtotal * 0.18);
//     const total = subtotal + gst;
//     summary.innerHTML = `
//       <div class="summary-row"><span>Subtotal</span><strong>${window.formatINR(subtotal)}</strong></div>
//       <div class="summary-row"><span>GST</span><strong>${window.formatINR(gst)}</strong></div>
//       <div class="summary-row"><span>Delivery</span><strong>Included</strong></div>
//       <div class="summary-row total"><span>Total</span><strong>${window.formatINR(total)}</strong></div>
//       <a class="btn btn-gold btn-block" href="./checkout.html">Checkout</a>`;
//   }
//   list.addEventListener('click', (e) => {
//     const inc = e.target.closest('[data-inc]')?.dataset.inc;
//     const dec = e.target.closest('[data-dec]')?.dataset.dec;
//     const remove = e.target.closest('[data-remove]')?.dataset.remove;
//     if(inc){ const item = window.cartState.get().find(i => i.id === inc); window.cartState.setQty(inc, (item?.qty || 1) + 1); }
//     if(dec){ const item = window.cartState.get().find(i => i.id === dec); window.cartState.setQty(dec, Math.max(1, (item?.qty || 1) - 1)); }
//     if(remove) window.cartState.remove(remove);
//     render();
//   });
//   window.addEventListener('cart:updated', render);
//   render();
// });
// frontend/assets/js/pages/cart.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");
  const cartList = document.getElementById("cartList");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartTotal = document.getElementById("cartTotal");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function formatPrice(value) {
    return `₹ ${Number(value).toLocaleString("en-IN")}`;
  }

  function getCartSafe() {
    return typeof window.getCartItems === "function" ? window.getCartItems() : [];
  }

  function updateBadge() {
    const count = getCartSafe().reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  function updateSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
    if (cartTotal) cartTotal.textContent = formatPrice(subtotal);
  }

  function renderEmpty() {
    cartList.innerHTML = `
      <div class="cart-empty">
        <h3>Your cart is empty</h3>
        <p>Add premium timepieces and accessories to continue to checkout.</p>
        <a href="./shop.html" class="btn btn-gold">Explore Collection</a>
      </div>
    `;
    updateSummary([]);
  }

  function itemTemplate(item) {
    return `
      <article class="cart-item">
        <a href="./product.html?id=${item.id}" class="cart-item__media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </a>

        <div class="cart-item__content">
          <p class="cart-item__series">${item.series || ""}</p>
          <a href="./product.html?id=${item.id}" class="cart-item__title">${item.title}</a>
          <p class="cart-item__desc">${item.description || ""}</p>

          <div class="cart-item__bottom">
            <strong class="cart-item__price">${formatPrice(item.price * item.qty)}</strong>

            <div class="cart-item__controls">
              <div class="qty-box">
                <button class="qty-btn" type="button" data-qty-minus="${item.id}">−</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" type="button" data-qty-plus="${item.id}">+</button>
              </div>

              <button class="cart-remove" type="button" data-remove-cart="${item.id}">
                Remove
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderCart() {
    const cart = getCartSafe();

    updateBadge();
    updateSummary(cart);

    if (!cart.length) {
      renderEmpty();
      return;
    }

    cartList.innerHTML = cart.map(itemTemplate).join("");
  }

  document.addEventListener("click", (e) => {
    const plusBtn = e.target.closest("[data-qty-plus]");
    if (plusBtn && typeof window.updateCartQty === "function") {
      const id = plusBtn.dataset.qtyPlus;
      const item = getCartSafe().find((x) => x.id === id);
      if (!item) return;
      window.updateCartQty(id, item.qty + 1);
      renderCart();
      return;
    }

    const minusBtn = e.target.closest("[data-qty-minus]");
    if (minusBtn && typeof window.updateCartQty === "function") {
      const id = minusBtn.dataset.qtyMinus;
      const item = getCartSafe().find((x) => x.id === id);
      if (!item) return;
      window.updateCartQty(id, item.qty - 1);
      renderCart();
      return;
    }

    const removeBtn = e.target.closest("[data-remove-cart]");
    if (removeBtn && typeof window.removeCartItem === "function") {
      window.removeCartItem(removeBtn.dataset.removeCart);
      renderCart();
    }
  });

  renderCart();
});