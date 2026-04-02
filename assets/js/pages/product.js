// // document.addEventListener('DOMContentLoaded', () => {
// //   const page = document.querySelector('[data-product-page]');
// //   if(!page) return;
// //   const params = new URLSearchParams(location.search);
// //   const product = window.getProductById(params.get('id')) || window.getCatalog()[0];
// //   const thumbRail = document.querySelector('[data-thumbs]');
// //   const main = document.querySelector('[data-main-image]');
// //   document.querySelector('[data-product-name]').textContent = product.title;
// //   document.querySelector('[data-product-series]').textContent = product.series;
// //   document.querySelector('[data-product-price]').textContent = window.formatINR(product.price);
// //   document.querySelector('[data-product-desc]').textContent = product.description;
// //   document.querySelector('[data-product-movement]').textContent = product.movement;
// //   document.querySelector('[data-product-case]').textContent = product.case;
// //   document.querySelector('[data-product-dial]').textContent = product.dial;
// //   document.querySelector('[data-product-warranty]').textContent = product.warranty;
// //   main.src = window.normalizeAsset(product.images[0] || product.image);
// //   thumbRail.innerHTML = (product.images?.length ? product.images : [product.image]).map((src, index) => `<button class="thumb-card ${index===0 ? 'active' : ''}" data-thumb="${window.normalizeAsset(src)}"><img src="${window.normalizeAsset(src)}" alt="thumb ${index+1}" /></button>`).join('');
// //   thumbRail.addEventListener('click', (e) => {
// //     const btn = e.target.closest('[data-thumb]');
// //     if(!btn) return;
// //     main.src = btn.dataset.thumb;
// //     thumbRail.querySelectorAll('.thumb-card').forEach(el => el.classList.remove('active'));
// //     btn.classList.add('active');
// //   });
// //   document.querySelector('[data-add-product]').addEventListener('click', () => window.cartState.add(product.id, 1));
// //   document.querySelector('[data-buy-product]').addEventListener('click', () => { window.cartState.add(product.id, 1); location.href = './checkout.html'; });
// //   document.querySelector('[data-wishlist-product]').addEventListener('click', (e) => {
// //     const active = window.wishlistState.toggle(product.id);
// //     e.currentTarget.textContent = active ? '♥ Wishlisted' : '♡ Wishlist';
// //   });
// // });
// // frontend/assets/js/pages/product.js
// document.addEventListener("DOMContentLoaded", () => {
//   const menuToggle = document.getElementById("menuToggle");
//   const mobileDrawer = document.getElementById("mobileDrawer");
//   const navCartCount = document.getElementById("navCartCount");

//   const productId = new URLSearchParams(window.location.search).get("id");
//   const product = typeof window.getProductById === "function"
//     ? window.getProductById(productId)
//     : null;

//   const mainImage = document.getElementById("productMainImage");
//   const thumbs = document.getElementById("productThumbs");
//   const breadcrumb = document.getElementById("productBreadcrumb");
//   const title = document.getElementById("productTitle");
//   const series = document.getElementById("productSeries");
//   const price = document.getElementById("productPrice");
//   const desc = document.getElementById("productDescription");
//   const movement = document.getElementById("productMovement");
//   const caseEl = document.getElementById("productCase");
//   const dial = document.getElementById("productDial");
//   const warranty = document.getElementById("productWarranty");
//   const relatedGrid = document.getElementById("relatedGrid");
//   const addToCartBtn = document.getElementById("addToCartBtn");
//   const buyNowBtn = document.getElementById("buyNowBtn");
//   const wishlistBtn = document.getElementById("wishlistBtn");

//   menuToggle?.addEventListener("click", () => {
//     menuToggle.classList.toggle("active");
//     mobileDrawer.classList.toggle("open");
//   });

//   function updateCartBadge() {
//     const cart = JSON.parse(localStorage.getItem("auronox-cart") || "[]");
//     const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
//     if (navCartCount) navCartCount.textContent = count;
//   }

//   function getWishlist() {
//     return JSON.parse(localStorage.getItem("auronox-wishlist") || "[]");
//   }

//   function setWishlist(list) {
//     localStorage.setItem("auronox-wishlist", JSON.stringify(list));
//   }

//   function isWishlisted(id) {
//     return getWishlist().includes(id);
//   }

//   function updateWishlistButton() {
//     if (!wishlistBtn || !product) return;
//     wishlistBtn.textContent = isWishlisted(product.id) ? "Wishlisted" : "Wishlist";
//   }

//   function toggleWishlist(id) {
//     const list = getWishlist();
//     const exists = list.includes(id);

//     const next = exists ? list.filter((item) => item !== id) : [...list, id];
//     setWishlist(next);
//     updateWishlistButton();
//   }

//   function setMainImage(src, alt) {
//     mainImage.src = src;
//     mainImage.alt = alt || "AURONOX product";
//   }

//   function renderThumbs(images) {
//     thumbs.innerHTML = images.map((src, index) => `
//       <button class="product-thumb ${index === 0 ? "active" : ""}" type="button" data-image="${src}">
//         <img src="${src}" alt="Product thumbnail ${index + 1}" />
//       </button>
//     `).join("");

//     thumbs.querySelectorAll(".product-thumb").forEach((btn) => {
//       btn.addEventListener("click", () => {
//         thumbs.querySelectorAll(".product-thumb").forEach((el) => el.classList.remove("active"));
//         btn.classList.add("active");
//         setMainImage(btn.dataset.image, product.title);
//       });
//     });
//   }

//   function renderRelated() {
//     if (!relatedGrid || !product || typeof window.getCatalog !== "function" || typeof window.productCard !== "function") return;

//     const items = window.getCatalog()
//       .filter((item) => item.id !== product.id && item.category === product.category)
//       .slice(0, 3);

//     relatedGrid.innerHTML = items.map((item) => window.productCard(item)).join("");
//   }

//   if (!product) {
//     document.querySelector(".product-section").innerHTML = `
//       <div class="container">
//         <div class="shop-empty">
//           <h3>Product not found</h3>
//           <p>This item does not exist in your catalog.</p>
//         </div>
//       </div>
//     `;
//     updateCartBadge();
//     return;
//   }

//   const images = Array.isArray(product.images) && product.images.length
//     ? product.images
//     : [product.image];

//   breadcrumb.textContent = `Home / Shop / ${product.title}`;
//   title.textContent = product.title;
//   series.textContent = product.series || "Collection";
//   price.textContent = `₹ ${Number(product.price).toLocaleString("en-IN")}`;
//   desc.textContent = product.description || "";
//   movement.textContent = product.movement || "—";
//   caseEl.textContent = product.case || "—";
//   dial.textContent = product.dial || "—";
//   warranty.textContent = product.warranty || "—";

//   setMainImage(images[0], product.title);
//   renderThumbs(images);
//   renderRelated();
//   updateCartBadge();
//   updateWishlistButton();

//   addToCartBtn?.addEventListener("click", () => {
//     if (typeof window.addToCart === "function") {
//       window.addToCart(product.id, 1);
//       updateCartBadge();
//       addToCartBtn.textContent = "Added";
//       setTimeout(() => {
//         addToCartBtn.textContent = "Add to Cart";
//       }, 1200);
//     }
//   });

//   buyNowBtn?.addEventListener("click", () => {
//     if (typeof window.addToCart === "function") {
//       window.addToCart(product.id, 1);
//       window.location.href = "./cart.html";
//     }
//   });

//   wishlistBtn?.addEventListener("click", () => {
//     toggleWishlist(product.id);
//   });

//   document.addEventListener("click", (e) => {
//     const addBtn = e.target.closest("[data-add-cart]");
//     if (addBtn && typeof window.addToCart === "function") {
//       window.addToCart(addBtn.dataset.addCart, 1);
//       updateCartBadge();
//     }
//   });
// });

// frontend/assets/js/pages/product.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = typeof window.getProductById === "function"
    ? window.getProductById(productId)
    : null;

  const mainImage = document.getElementById("productMainImage");
  const thumbs = document.getElementById("productThumbs");
  const breadcrumb = document.getElementById("productBreadcrumb");
  const title = document.getElementById("productTitle");
  const series = document.getElementById("productSeries");
  const price = document.getElementById("productPrice");
  const desc = document.getElementById("productDescription");
  const movement = document.getElementById("productMovement");
  const caseEl = document.getElementById("productCase");
  const dial = document.getElementById("productDial");
  const warranty = document.getElementById("productWarranty");
  const relatedGrid = document.getElementById("relatedGrid");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const buyNowBtn = document.getElementById("buyNowBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function updateCartBadge() {
    const cart = typeof window.getCartItems === "function" ? window.getCartItems() : [];
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  function getWishlist() {
    return JSON.parse(localStorage.getItem("auronox-wishlist") || "[]");
  }

  function setWishlist(list) {
    localStorage.setItem("auronox-wishlist", JSON.stringify(list));
  }

  function isWishlisted(id) {
    return getWishlist().includes(id);
  }

  function updateWishlistButton() {
    if (!product) return;
    wishlistBtn.textContent = isWishlisted(product.id) ? "Wishlisted" : "Wishlist";
  }

  function toggleWishlistLocal(id) {
    const list = getWishlist();
    const exists = list.includes(id);
    const next = exists ? list.filter((item) => item !== id) : [...list, id];
    setWishlist(next);
    updateWishlistButton();
  }

  function setMainImage(src, alt) {
    mainImage.src = src;
    mainImage.alt = alt || "AURONOX product";
  }

  function renderThumbs(images) {
    thumbs.innerHTML = images.map((src, index) => `
      <button class="product-thumb ${index === 0 ? "active" : ""}" type="button" data-image="${src}">
        <img src="${src}" alt="Product thumbnail ${index + 1}" />
      </button>
    `).join("");

    thumbs.querySelectorAll(".product-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        thumbs.querySelectorAll(".product-thumb").forEach((el) => el.classList.remove("active"));
        btn.classList.add("active");
        setMainImage(btn.dataset.image, product.title);
      });
    });
  }

  function relatedCard(product) {
    return `
      <article class="product-card">
        <a href="./product.html?id=${product.id}" class="product-card__media">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
        </a>

        <div class="product-card__content">
          <p class="product-card__series">${product.series || ""}</p>

          <h3 class="product-card__title">
            <a href="./product.html?id=${product.id}">${product.title}</a>
          </h3>

          <p class="product-card__desc">${product.description || ""}</p>

          <div class="product-card__footer">
            <strong class="product-card__price">₹ ${Number(product.price).toLocaleString("en-IN")}</strong>

            <div class="product-card__actions">
              <a href="./product.html?id=${product.id}" class="btn-outline">View</a>
              <button class="btn btn-gold" type="button" data-add-cart="${product.id}">Add to Cart</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderRelated() {
    if (!product || typeof window.getCatalog !== "function") return;

    const items = window.getCatalog()
      .filter((item) => item.id !== product.id && item.category === product.category)
      .slice(0, 3);

    relatedGrid.innerHTML = items.map(relatedCard).join("");
  }

  if (!product) {
    document.querySelector(".product-section").innerHTML = `
      <div class="container">
        <div class="cart-empty">
          <h3>Product not found</h3>
          <p>This item does not exist in your catalog.</p>
          <a href="./shop.html" class="btn btn-gold">Back to Shop</a>
        </div>
      </div>
    `;
    updateCartBadge();
    return;
  }

  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.image];

  breadcrumb.textContent = `Home / Shop / ${product.title}`;
  title.textContent = product.title;
  series.textContent = product.series || "Collection";
  price.textContent = `₹ ${Number(product.price).toLocaleString("en-IN")}`;
  desc.textContent = product.description || "";
  movement.textContent = product.movement || "—";
  caseEl.textContent = product.case || "—";
  dial.textContent = product.dial || "—";
  warranty.textContent = product.warranty || "—";

  setMainImage(images[0], product.title);
  renderThumbs(images);
  renderRelated();
  updateCartBadge();
  updateWishlistButton();

  addToCartBtn?.addEventListener("click", () => {
    if (typeof window.addToCart === "function") {
      window.addToCart(product.id, 1);
      updateCartBadge();
      addToCartBtn.textContent = "Added";
      setTimeout(() => {
        addToCartBtn.textContent = "Add to Cart";
      }, 1200);
    }
  });

  buyNowBtn?.addEventListener("click", () => {
    if (typeof window.addToCart === "function") {
      window.addToCart(product.id, 1);
      window.location.href = "./cart.html";
    }
  });

  wishlistBtn?.addEventListener("click", () => {
    toggleWishlistLocal(product.id);
  });

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn && typeof window.addToCart === "function") {
      window.addToCart(addBtn.dataset.addCart, 1);
      updateCartBadge();
      addBtn.textContent = "Added";
      setTimeout(() => {
        addBtn.textContent = "Add to Cart";
      }, 1000);
    }
  });
});