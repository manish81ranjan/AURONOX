// document.addEventListener('DOMContentLoaded', () => {
//   const grid = document.querySelector('[data-shop-grid]');
//   if(!grid) return;
//   const queryCategory = new URLSearchParams(location.search).get('category') || 'all';
//   const chips = [...document.querySelectorAll('[data-category]')];
//   const mobileTabs = document.querySelector('[data-mobile-tabs]');
//   const sortSelect = document.querySelector('[data-sort]');
//   const sortMobile = document.querySelector('[data-sort-mobile]');
//   const seriesList = document.querySelector('[data-series-list]');
//   const categories = ['all','men','women','accessories'];
//   if(mobileTabs){ mobileTabs.innerHTML = categories.map(cat => `<button class="chip ${cat===queryCategory ? 'active' : ''}" data-mobile-category="${cat}">${cat[0].toUpperCase()+cat.slice(1)}</button>`).join(''); }
//   let category = queryCategory;
//   let sort = 'featured';
//   function render(){
//     let items = [...window.getCatalog()];
//     if(category !== 'all') items = items.filter(p => p.category === category);
//     if(sort === 'price-asc') items.sort((a,b) => a.price - b.price);
//     if(sort === 'price-desc') items.sort((a,b) => b.price - a.price);
//     grid.innerHTML = items.map(window.productCard).join('');
//     if(seriesList) seriesList.innerHTML = [...new Set(items.map(i => i.series))].map(x => `<div><span>Series</span><strong>${x}</strong></div>`).join('');
//     chips.forEach(c => c.classList.toggle('active', c.dataset.category === category));
//     document.querySelectorAll('[data-mobile-category]').forEach(c => c.classList.toggle('active', c.dataset.mobileCategory === category));
//   }
//   chips.forEach(chip => chip.addEventListener('click', () => { category = chip.dataset.category; render(); }));
//   document.addEventListener('click', (e) => { const btn = e.target.closest('[data-mobile-category]'); if(btn){ category = btn.dataset.mobileCategory; render(); } });
//   sortSelect?.addEventListener('change', () => { sort = sortSelect.value; if(sortMobile) sortMobile.value = sort; render(); });
//   sortMobile?.addEventListener('change', () => { sort = sortMobile.value; if(sortSelect) sortSelect.value = sort; render(); });
//   render();
// });

// frontend/assets/js/pages/shop.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-shop-grid]");
  if (!grid) return;

  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("auronox-cart") || "[]");
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  updateCartBadge();

  const queryCategory =
    new URLSearchParams(window.location.search).get("category") || "all";

  const chips = [...document.querySelectorAll("[data-category]")];
  const mobileTabs = document.querySelector("[data-mobile-tabs]");
  const sortSelect = document.querySelector("[data-sort]");
  const sortMobile = document.querySelector("[data-sort-mobile]");
  const seriesList = document.querySelector("[data-series-list]");
  const categories = ["all", "men", "women", "accessories"];

  let category = queryCategory;
  let sort = sortSelect?.value || "featured";

  function getCatalogSafe() {
    return typeof window.getCatalog === "function" ? window.getCatalog() : [];
  }

  function updateSeries(items) {
    if (!seriesList) return;

    const uniqueSeries = [...new Set(items.map((item) => item.series).filter(Boolean))];

    seriesList.innerHTML = uniqueSeries
      .map(
        (series) => `
          <div class="series-item">
            <span>Series</span>
            <strong>${series}</strong>
          </div>
        `
      )
      .join("");
  }

  function updateMobileTabs() {
    if (!mobileTabs) return;

    mobileTabs.innerHTML = categories
      .map(
        (cat) => `
          <button
            class="chip ${cat === category ? "active" : ""}"
            data-mobile-category="${cat}"
            type="button"
          >
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        `
      )
      .join("");
  }

  function updateActiveChips() {
    chips.forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.category === category);
    });

    document.querySelectorAll("[data-mobile-category]").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.mobileCategory === category);
    });
  }

  function getItems() {
    let items = [...getCatalogSafe()];

    if (category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") items.sort((a, b) => a.title.localeCompare(b.title));

    return items;
  }

  function render() {
    const items = getItems();

    updateMobileTabs();
    updateActiveChips();
    updateSeries(items);

    if (!items.length) {
      grid.innerHTML = `
        <div class="shop-empty">
          <h3>No products found</h3>
          <p>Try another collection or update your catalog data.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map((item) => window.productCard(item)).join("");
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      category = chip.dataset.category;
      render();
    });
  });

  document.addEventListener("click", (e) => {
    const mobileChip = e.target.closest("[data-mobile-category]");
    if (mobileChip) {
      category = mobileChip.dataset.mobileCategory;
      render();
      return;
    }

    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn && typeof window.addToCart === "function") {
      window.addToCart(addBtn.dataset.addCart, 1);
      updateCartBadge();
    }
  });

  sortSelect?.addEventListener("change", () => {
    sort = sortSelect.value;
    if (sortMobile) sortMobile.value = sort;
    render();
  });

  sortMobile?.addEventListener("change", () => {
    sort = sortMobile.value;
    if (sortSelect) sortSelect.value = sort;
    render();
  });

  render();
});