// // const CART_KEY = 'auronox_cart_v2';
// // window.cartState = {
// //   get(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } },
// //   save(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); window.dispatchEvent(new CustomEvent('cart:updated')); },
// //   add(id, qty=1){ const cart = this.get(); const found = cart.find(i => i.id === id); if(found) found.qty += qty; else cart.push({id, qty}); this.save(cart); },
// //   remove(id){ this.save(this.get().filter(i => i.id !== id)); },
// //   setQty(id, qty){ const cart = this.get().map(i => i.id === id ? ({...i, qty: Math.max(1, qty)}) : i); this.save(cart); },
// //   count(){ return this.get().reduce((sum, i) => sum + i.qty, 0); },
// //   items(){ return this.get().map(item => { const p = window.getProductById(item.id); return p ? ({...p, qty: item.qty, lineTotal: p.price * item.qty}) : null; }).filter(Boolean); },
// //   clear(){ localStorage.removeItem(CART_KEY); window.dispatchEvent(new CustomEvent('cart:updated')); }
// // };
// // frontend/assets/js/state/cart.state.js
// function getCart() {
//   return JSON.parse(localStorage.getItem("auronox-cart") || "[]");
// }

// function saveCart(cart) {
//   localStorage.setItem("auronox-cart", JSON.stringify(cart));
// }

// window.addToCart = function addToCart(productId, qty = 1) {
//   if (typeof window.getProductById !== "function") return;

//   const product = window.getProductById(productId);
//   if (!product) return;

//   const cart = getCart();
//   const existing = cart.find((item) => item.id === productId);

//   if (existing) {
//     existing.qty += qty;
//   } else {
//     cart.push({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       image: product.image,
//       qty
//     });
//   }

//   saveCart(cart);
// };

// frontend/assets/js/state/cart.state.js
function getCart() {
  return JSON.parse(localStorage.getItem("auronox-cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("auronox-cart", JSON.stringify(cart));
}

window.addToCart = function addToCart(productId, qty = 1) {
  if (typeof window.getProductById !== "function") return;

  const product = window.getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      series: product.series || "",
      description: product.description || "",
      price: product.price,
      image: product.image,
      qty
    });
  }

  saveCart(cart);
};

window.getCartItems = getCart;
window.saveCartItems = saveCart;

window.updateCartQty = function updateCartQty(productId, nextQty) {
  const cart = getCart()
    .map((item) => item.id === productId ? { ...item, qty: nextQty } : item)
    .filter((item) => item.qty > 0);

  saveCart(cart);
};

window.removeCartItem = function removeCartItem(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
};