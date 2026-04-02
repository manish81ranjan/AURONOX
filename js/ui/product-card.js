// // frontend/assets/js/ui/product-card.js
// window.productCard = function productCard(product) {
//   return `
//     <article class="product-card">
//       <a href="./product.html?id=${product.id}" class="product-card__media">
//         <img src="${product.image}" alt="${product.title}" loading="lazy" />
//       </a>

//       <div class="product-card__content">
//         <p class="product-card__series">${product.series || ""}</p>

//         <h3 class="product-card__title">
//           <a href="./product.html?id=${product.id}">${product.title}</a>
//         </h3>

//         <p class="product-card__desc">${product.description || ""}</p>

//         <div class="product-card__footer">
//           <strong class="product-card__price">₹ ${Number(product.price).toLocaleString("en-IN")}</strong>

//           <div class="product-card__actions">
//             <a href="./product.html?id=${product.id}" class="btn-outline">View</a>
//             <button class="btn btn-gold" type="button" data-add-cart="${product.id}">Add</button>
//           </div>
//         </div>
//       </div>
//     </article>
//   `;
// };

// frontend/assets/js/ui/product-card.js
window.productCard = function productCard(product) {
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
            <button class="btn btn-gold" type="button" data-add-cart="${product.id}">Add</button>
          </div>
        </div>
      </div>
    </article>
  `;
};