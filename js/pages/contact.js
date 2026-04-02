// frontend/assets/js/pages/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navCartCount = document.getElementById("navCartCount");
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileDrawer.classList.toggle("open");
  });

  function updateCartBadge() {
    const cart = typeof window.getCartItems === "function" ? window.getCartItems() : [];
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (navCartCount) navCartCount.textContent = count;
  }

  function showMessage(text, isError = false) {
    contactMessage.textContent = text;
    contactMessage.classList.add("show");
    contactMessage.classList.toggle("error", isError);
  }

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const subject = formData.get("subject")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !subject || !message) {
      showMessage("Please complete all fields.", true);
      return;
    }

    showMessage("Your request has been received. The AURONOX concierge team will contact you shortly.");
    contactForm.reset();
  });

  updateCartBadge();
});