// document.addEventListener('DOMContentLoaded', () => {
//   const list = document.querySelector('[data-orders-list]');
//   if(!list) return;
//   const orders = JSON.parse(localStorage.getItem('auronox_orders_v1') || '[]');
//   if(!orders.length){ list.innerHTML = '<div class="empty-state">No orders yet. Place an order from checkout.</div>'; return; }
//   list.innerHTML = orders.map(order => `
//     <article class="order-card">
//       <div class="order-head"><strong>${order.id}</strong><span class="status-pill">${order.status}</span></div>
//       <div class="summary-row"><span>Date</span><strong>${order.date}</strong></div>
//       <div class="summary-row"><span>Items</span><strong>${order.items.reduce((s,i)=>s+i.qty,0)}</strong></div>
//       <div class="summary-row"><span>Amount</span><strong>${window.formatINR(order.total)}</strong></div>
//     </article>`).join('');
// });
// frontend/assets/js/pages/orders.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");
  const ordersTable = document.getElementById("ordersTable");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function updateCartBadge() {
    const cart = typeof window.getCartItems === "function" ? window.getCartItems() : [];
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  function formatPrice(value) {
    return `₹ ${Number(value).toLocaleString("en-IN")}`;
  }

  // demo professional order data
  const ORDERS = [
    {
      id: "ORD-743293",
      date: "02 Apr 2026",
      items: 2,
      amount: 870000,
      status: "Confirmed",
      products: ["AURONOX Men Chrono", "AURONOX Men Classic I"]
    },
    {
      id: "ORD-743118",
      date: "28 Mar 2026",
      items: 1,
      amount: 365000,
      status: "Processing",
      products: ["AURONOX Men Classic II"]
    },
    {
      id: "ORD-742860",
      date: "17 Mar 2026",
      items: 3,
      amount: 314700,
      status: "Delivered",
      products: ["Women Elegance", "Crocodile Strap — Black", "Alligator Strap — Gold"]
    }
  ];

  function statusClass(status) {
    const safe = String(status).toLowerCase();
    if (safe === "confirmed") return "order-status order-status--confirmed";
    if (safe === "processing") return "order-status order-status--processing";
    if (safe === "delivered") return "order-status order-status--delivered";
    return "order-status";
  }

  function orderTemplate(order) {
    return `
      <article class="order-card">
        <div class="order-card__top">
          <div class="order-meta">
            <span>Order ID</span>
            <strong>${order.id}</strong>
          </div>

          <div class="order-meta">
            <span>Date</span>
            <strong>${order.date}</strong>
          </div>

          <div class="order-meta">
            <span>Items</span>
            <strong>${order.items}</strong>
          </div>

          <div class="order-meta">
            <span>Amount</span>
            <strong>${formatPrice(order.amount)}</strong>
          </div>
        </div>

        <div class="order-card__bottom">
          <div class="order-items">
            <strong>${order.products.join(", ")}</strong>
          </div>

          <div class="order-actions">
            <span class="${statusClass(order.status)}">${order.status}</span>
            <a href="./contact.html" class="btn-outline">Support</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderOrders() {
    if (!ORDERS.length) {
      ordersTable.innerHTML = `
        <div class="orders-empty">
          <h3>No orders yet</h3>
          <p>Your confirmed purchases will appear here with status and delivery updates.</p>
          <a href="./shop.html" class="btn btn-gold">Explore Collection</a>
        </div>
      `;
      return;
    }

    ordersTable.innerHTML = ORDERS.map(orderTemplate).join("");
  }

  updateCartBadge();
  renderOrders();
});