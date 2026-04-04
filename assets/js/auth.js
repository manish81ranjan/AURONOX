function isLoggedIn() {
  return !!localStorage.getItem("auronox_user");
}

function requireAuth(event) {
  if (!isLoggedIn()) {
    event.preventDefault();

    // save where user was going
    const target = event.currentTarget.getAttribute("href");
    localStorage.setItem("redirect_after_login", target);

    // redirect to login page
    window.location.href = "/pages/client-portal.html";
  }
}
