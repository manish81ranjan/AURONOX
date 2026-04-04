// // frontend/assets/js/pages/client-portal.js

// const API_BASE = "https://auronox-b.onrender.com/api";

// const menuToggle = document.getElementById("menuToggle");
// const mobileDrawer = document.getElementById("mobileDrawer");
// const navCartCount = document.getElementById("navCartCount");

// const tabs = document.querySelectorAll(".portal-tab");
// const loginForm = document.getElementById("loginForm");
// const registerForm = document.getElementById("registerForm");
// const portalMessage = document.getElementById("portalMessage");
// const authPanel = document.getElementById("authPanel");
// const dashboardPanel = document.getElementById("dashboardPanel");
// const logoutBtn = document.getElementById("logoutBtn");

// const clientName = document.getElementById("clientName");
// const clientEmail = document.getElementById("clientEmail");
// const profileName = document.getElementById("profileName");
// const profileEmail = document.getElementById("profileEmail");
// const profileSince = document.getElementById("profileSince");
// const wishlistCount = document.getElementById("wishlistCount");
// const cartCount = document.getElementById("cartCount");

// menuToggle?.addEventListener("click", () => {
//   menuToggle.classList.toggle("active");
//   mobileDrawer.classList.toggle("open");
// });

// function updateCartBadge() {
//   const cart = JSON.parse(localStorage.getItem("auronox-cart") || "[]");
//   const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
//   if (navCartCount) navCartCount.textContent = count;
//   if (cartCount) cartCount.textContent = count;
// }

// function updateWishlistCount() {
//   const wishlist = JSON.parse(localStorage.getItem("auronox-wishlist") || "[]");
//   if (wishlistCount) wishlistCount.textContent = wishlist.length;
// }

// function showMessage(text, isError = false) {
//   portalMessage.textContent = text;
//   portalMessage.classList.add("show");
//   portalMessage.classList.toggle("error", isError);
// }

// function clearMessage() {
//   portalMessage.textContent = "";
//   portalMessage.classList.remove("show", "error");
// }

// function setActiveTab(tabName) {
//   tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
//   loginForm.classList.toggle("active", tabName === "login");
//   registerForm.classList.toggle("active", tabName === "register");
//   clearMessage();
// }

// tabs.forEach((tab) => {
//   tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
// });

// function getToken() {
//   return localStorage.getItem("auronox_token") || "";
// }

// function setToken(token) {
//   localStorage.setItem("auronox_token", token);
// }

// function clearToken() {
//   localStorage.removeItem("auronox_token");
// }

// async function api(path, options = {}) {
//   const token = getToken();

//   const headers = {
//     "Content-Type": "application/json",
//     ...(options.headers || {})
//   };

//   if (token) headers.Authorization = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method: options.method || "GET",
//     headers,
//     body: options.body ? JSON.stringify(options.body) : undefined
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.message || "Request failed");
//   }

//   return data;
// }

// function openDashboard(user) {
//   authPanel.classList.add("hidden");
//   dashboardPanel.classList.remove("hidden");

//   clientName.textContent = user.name || "AURONOX Client";
//   clientEmail.textContent = user.email || "";
//   profileName.textContent = user.name || "—";
//   profileEmail.textContent = user.email || "—";
//   profileSince.textContent = user.created_at || "—";

//   updateCartBadge();
//   updateWishlistCount();
// }

// function openAuth() {
//   dashboardPanel.classList.add("hidden");
//   authPanel.classList.remove("hidden");
// }

// loginForm?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   clearMessage();

//   const formData = new FormData(loginForm);
//   const payload = {
//     email: formData.get("email")?.toString().trim(),
//     password: formData.get("password")?.toString().trim()
//   };

//   try {
//     const data = await api("/auth/login", {
//       method: "POST",
//       body: payload
//     });

//     setToken(data.token);
//     showMessage("Login successful.");
//     openDashboard(data.user);
//     loginForm.reset();
//   } catch (err) {
//     showMessage(err.message, true);
//   }
// });

// registerForm?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   clearMessage();

//   const formData = new FormData(registerForm);
//   const payload = {
//     name: formData.get("name")?.toString().trim(),
//     email: formData.get("email")?.toString().trim(),
//     password: formData.get("password")?.toString().trim()
//   };

//   try {
//     const data = await api("/auth/register", {
//       method: "POST",
//       body: payload
//     });

//     setToken(data.token);
//     showMessage("Account created successfully.");
//     openDashboard(data.user);
//     registerForm.reset();
//   } catch (err) {
//     showMessage(err.message, true);
//   }
// });

// logoutBtn?.addEventListener("click", () => {
//   clearToken();
//   openAuth();
//   setActiveTab("login");
//   showMessage("Logged out successfully.");
// });

// async function boot() {
//   updateCartBadge();
//   updateWishlistCount();

//   const token = getToken();
//   if (!token) {
//     openAuth();
//     setActiveTab("login");
//     return;
//   }

//   try {
//     const data = await api("/auth/me");
//     openDashboard(data.user);
//   } catch (err) {
//     clearToken();
//     openAuth();
//     setActiveTab("login");
//   }
// }

// boot();

// frontend/assets/js/pages/client-portal.js

// const API_BASE = "https://auronox-b.onrender.com/api";

// const menuToggle = document.getElementById("menuToggle");
// const mobileDrawer = document.getElementById("mobileDrawer");
// const navCartCount = document.getElementById("navCartCount");

// const tabs = document.querySelectorAll(".portal-tab");
// const loginForm = document.getElementById("loginForm");
// const registerForm = document.getElementById("registerForm");
// const portalMessage = document.getElementById("portalMessage");
// const authPanel = document.getElementById("authPanel");
// const dashboardPanel = document.getElementById("dashboardPanel");
// const logoutBtn = document.getElementById("logoutBtn");

// const clientName = document.getElementById("clientName");
// const clientEmail = document.getElementById("clientEmail");
// const profileName = document.getElementById("profileName");
// const profileEmail = document.getElementById("profileEmail");
// const profileSince = document.getElementById("profileSince");
// const wishlistCount = document.getElementById("wishlistCount");
// const cartCount = document.getElementById("cartCount");

// menuToggle?.addEventListener("click", () => {
//   menuToggle.classList.toggle("active");
//   mobileDrawer.classList.toggle("open");
// });

// function updateCartBadge() {
//   const cart = JSON.parse(localStorage.getItem("auronox-cart") || "[]");
//   const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
//   if (navCartCount) navCartCount.textContent = count;
//   if (cartCount) cartCount.textContent = count;
// }

// function updateWishlistCount() {
//   const wishlist = JSON.parse(localStorage.getItem("auronox-wishlist") || "[]");
//   if (wishlistCount) wishlistCount.textContent = wishlist.length;
// }

// function showMessage(text, isError = false) {
//   if (!portalMessage) return;
//   portalMessage.textContent = text;
//   portalMessage.classList.add("show");
//   portalMessage.classList.toggle("error", isError);
// }

// function clearMessage() {
//   if (!portalMessage) return;
//   portalMessage.textContent = "";
//   portalMessage.classList.remove("show", "error");
// }

// function setActiveTab(tabName) {
//   tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
//   loginForm?.classList.toggle("active", tabName === "login");
//   registerForm?.classList.toggle("active", tabName === "register");
//   clearMessage();
// }

// tabs.forEach((tab) => {
//   tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
// });

// function getToken() {
//   return localStorage.getItem("auronox_token") || "";
// }

// function setToken(token) {
//   localStorage.setItem("auronox_token", token);
// }

// function clearToken() {
//   localStorage.removeItem("auronox_token");
// }

// function getSavedUser() {
//   try {
//     return JSON.parse(localStorage.getItem("auronox_user") || "null");
//   } catch {
//     return null;
//   }
// }

// function saveUser(user) {
//   localStorage.setItem("auronox_user", JSON.stringify(user));
// }

// function clearUser() {
//   localStorage.removeItem("auronox_user");
// }

// async function api(path, options = {}) {
//   const token = getToken();

//   const headers = {
//     "Content-Type": "application/json",
//     ...(options.headers || {})
//   };

//   if (token) headers.Authorization = `Bearer ${token}`;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method: options.method || "GET",
//     headers,
//     body: options.body ? JSON.stringify(options.body) : undefined
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.message || "Request failed");
//   }

//   return data;
// }

// function renderDashboard(user) {
//   if (!user) return;

//   if (authPanel) authPanel.classList.add("hidden");
//   if (dashboardPanel) dashboardPanel.classList.remove("hidden");

//   if (clientName) clientName.textContent = user.name || "AURONOX Client";
//   if (clientEmail) clientEmail.textContent = user.email || "";
//   if (profileName) profileName.textContent = user.name || "—";
//   if (profileEmail) profileEmail.textContent = user.email || "—";
//   if (profileSince) profileSince.textContent = user.created_at || "—";

//   updateCartBadge();
//   updateWishlistCount();
// }

// function openAuth() {
//   if (dashboardPanel) dashboardPanel.classList.add("hidden");
//   if (authPanel) authPanel.classList.remove("hidden");
// }

// function loginSuccess(data, successText) {
//   setToken(data.token);
//   saveUser(data.user);
//   renderDashboard(data.user);
//   showMessage(successText);
// }

// loginForm?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   clearMessage();

//   const formData = new FormData(loginForm);
//   const payload = {
//     email: String(formData.get("email") || "").trim(),
//     password: String(formData.get("password") || "").trim()
//   };

//   try {
//     const data = await api("/auth/login", {
//       method: "POST",
//       body: payload
//     });

//     loginSuccess(data, "Login successful.");
//     loginForm.reset();
//   } catch (err) {
//     showMessage(err.message, true);
//   }
// });

// registerForm?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   clearMessage();


  
//   const formData = new FormData(registerForm);
//   const payload = {
//     name: String(formData.get("name") || "").trim(),
//     email: String(formData.get("email") || "").trim(),
//     password: String(formData.get("password") || "").trim()
//   };

//   try {
//     const data = await api("/auth/register", {
//       method: "POST",
//       body: payload
//     });

//     loginSuccess(data, "Account created successfully.");
//     registerForm.reset();
//   } catch (err) {
//     showMessage(err.message, true);
//   }
// });

// logoutBtn?.addEventListener("click", () => {
//   clearToken();
//   clearUser();
//   openAuth();
//   setActiveTab("login");
//   showMessage("Logged out successfully.");
// });

// async function boot() {
//   updateCartBadge();
//   updateWishlistCount();

//   const token = getToken();
//   const savedUser = getSavedUser();

//   if (!token) {
//     clearUser();
//     openAuth();
//     setActiveTab("login");
//     return;
//   }

//   // Show saved user instantly on refresh
//   if (savedUser) {
//     renderDashboard(savedUser);
//   }

//   try {
//     const data = await api("/auth/me");
//     saveUser(data.user);
//     renderDashboard(data.user);
//   } catch (err) {
//     // Keep saved user visible if backend check temporarily fails
//     if (!savedUser) {
//       clearToken();
//       clearUser();
//       openAuth();
//       setActiveTab("login");
//     }
//   }
// }

// boot();

// frontend/assets/js/pages/client-portal.js

const API_BASE = "https://auronox-b.onrender.com/api";

const menuToggle = document.getElementById("menuToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const navCartCount = document.getElementById("navCartCount");

const tabs = document.querySelectorAll(".portal-tab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const portalMessage = document.getElementById("portalMessage");
const authPanel = document.getElementById("authPanel");
const dashboardPanel = document.getElementById("dashboardPanel");
const logoutBtn = document.getElementById("logoutBtn");

const clientName = document.getElementById("clientName");
const clientEmail = document.getElementById("clientEmail");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileSince = document.getElementById("profileSince");
const wishlistCount = document.getElementById("wishlistCount");
const cartCount = document.getElementById("cartCount");

menuToggle?.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileDrawer.classList.toggle("open");
});

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("auronox-cart") || "[]");
  const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  if (navCartCount) navCartCount.textContent = count;
  if (cartCount) cartCount.textContent = count;
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("auronox-wishlist") || "[]");
  if (wishlistCount) wishlistCount.textContent = wishlist.length;
}

function showMessage(text, isError = false) {
  if (!portalMessage) return;
  portalMessage.textContent = text;
  portalMessage.classList.add("show");
  portalMessage.classList.toggle("error", isError);
}

function clearMessage() {
  if (!portalMessage) return;
  portalMessage.textContent = "";
  portalMessage.classList.remove("show", "error");
}

function setActiveTab(tabName) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  loginForm?.classList.toggle("active", tabName === "login");
  registerForm?.classList.toggle("active", tabName === "register");
  clearMessage();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

function getToken() {
  return localStorage.getItem("auronox_token") || "";
}

function setToken(token) {
  localStorage.setItem("auronox_token", token);
}

function clearToken() {
  localStorage.removeItem("auronox_token");
}

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("auronox_user") || "null");
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem("auronox_user", JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem("auronox_user");
}

function redirectAfterAuth() {
  const redirect = localStorage.getItem("redirect_after_login");

  if (redirect) {
    localStorage.removeItem("redirect_after_login");
    window.location.href = redirect;
  } else {
    window.location.href = "/index.html";
  }
}

async function api(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function renderDashboard(user) {
  if (!user) return;

  authPanel?.classList.add("hidden");
  dashboardPanel?.classList.remove("hidden");

  if (clientName) clientName.textContent = user.name || "AURONOX Client";
  if (clientEmail) clientEmail.textContent = user.email || "";
  if (profileName) profileName.textContent = user.name || "—";
  if (profileEmail) profileEmail.textContent = user.email || "—";
  if (profileSince) profileSince.textContent = user.created_at || "—";

  updateCartBadge();
  updateWishlistCount();
}

function openAuth() {
  dashboardPanel?.classList.add("hidden");
  authPanel?.classList.remove("hidden");
}

function loginSuccess(data, successText) {
  setToken(data.token);
  saveUser(data.user);
  renderDashboard(data.user);
  showMessage(successText);

  setTimeout(() => {
    redirectAfterAuth();
  }, 500);
}

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();

  const formData = new FormData(loginForm);
  const payload = {
    email: String(formData.get("email") || "").trim(),
    password: String(formData.get("password") || "").trim()
  };

  try {
    const data = await api("/auth/login", {
      method: "POST",
      body: payload
    });

    loginSuccess(data, "Login successful.");
    loginForm.reset();
  } catch (err) {
    showMessage(err.message, true);
  }
});

registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();

  const formData = new FormData(registerForm);
  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    password: String(formData.get("password") || "").trim()
  };

  try {
    const data = await api("/auth/register", {
      method: "POST",
      body: payload
    });

    loginSuccess(data, "Account created successfully.");
    registerForm.reset();
  } catch (err) {
    showMessage(err.message, true);
  }
});

logoutBtn?.addEventListener("click", () => {
  clearToken();
  clearUser();
  openAuth();
  setActiveTab("login");
  showMessage("Logged out successfully.");
});

async function boot() {
  updateCartBadge();
  updateWishlistCount();

  const token = getToken();
  const savedUser = getSavedUser();

  if (!token) {
    clearUser();
    openAuth();
    setActiveTab("login");
    return;
  }

  if (savedUser) {
    renderDashboard(savedUser);
  }

  try {
    const data = await api("/auth/me");
    saveUser(data.user);
    renderDashboard(data.user);
  } catch (err) {
    if (!savedUser) {
      clearToken();
      clearUser();
      openAuth();
      setActiveTab("login");
    }
  }
}

boot();
