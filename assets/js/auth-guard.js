function isLoggedIn() {
  return !!localStorage.getItem("auronox_user") && !!localStorage.getItem("auronox_token");
}

function requireAuth(event) {
  if (isLoggedIn()) return;

  event.preventDefault();

  const href = event.currentTarget.getAttribute("href");
  if (href) {
    localStorage.setItem("redirect_after_login", href);
  }

  window.location.href = "/pages/client-portal.html";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".require-auth").forEach((el) => {
    el.addEventListener("click", requireAuth);
  });
});
