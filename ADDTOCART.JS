
let cartCount = 0;
const cartCounter = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.shop-btn');
const cartItemsList = document.getElementById('cartItems');

// Store carted items
const cartItems = new Map();

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.watch-card');
    const name = card.querySelector('h3').textContent;
    const price = card.querySelector('.price').textContent;

    const key = name; // unique key

    if (button.classList.contains('added')) {
      // Remove from cart
      button.classList.remove('added');
      button.textContent = 'Add to Cart';
      cartItems.delete(key);
      cartCount--;
    } else {
      // Add to cart
      button.classList.add('added');
      button.textContent = 'Remove from Cart';
      cartItems.set(key, { name, price });
      cartCount++;
    }

    updateCartDisplay();
  });
});



function updateCartDisplay() {
   
    cartCounter.textContent = cartCount;
  
   
    cartItemsList.innerHTML = '';
    let total = 0;
  
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      `;
      cartItemsList.appendChild(li);
  
      
      const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
      total += numericPrice;
    });
  
    
    document.getElementById('totalAmount').textContent = total.toFixed(2);
  }
  