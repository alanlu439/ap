(function () {
  const USERS_KEY = "ap-practice-auth-users-v1";
  const SESSION_KEY = "ap-practice-auth-session-v1";
  const USER_PREFIX = "ap-practice-user-";
  const AUTH_PREFIX = "ap-practice-auth-";
  const SELECTED_SUBJECT_KEY = "ap-practice-selected-subject-v1";
  const FIREBASE_SDK_VERSION = "12.7.0";
  const GOOGLE_PROVIDER = "google";
  const APPLE_PROVIDER = "apple";
  const PASSWORD_HASH = {
    algorithm: "PBKDF2-SHA-256",
    iterations: 210000,
    length: 256
  };

  const listeners = new Set();
  let authMode = "login";
  let firebaseModulesPromise = null;
  let firebaseRedirectChecked = false;

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value) || fallback;
    } catch {
      return fallback;
    }
  }

  function readUsers() {
    return safeJsonParse(localStorage.getItem(USERS_KEY), {});
  }

  function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function readSession() {
    return safeJsonParse(localStorage.getItem(SESSION_KEY), null);
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function firstName(user) {
    const name = String(user?.name || "").trim();
    if (name) return name.split(/\s+/)[0];
    return String(user?.email || "User").split("@")[0];
  }

  function escapeAuthHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function simpleHash(value) {
    let hash = 2166136261;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function makeUserId(email) {
    return "u-" + simpleHash(normalizeEmail(email));
  }

  function safeUser(user) {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      authType: user.authType || "local",
      provider: user.provider || "password",
      photoURL: user.photoURL || ""
    };
  }

  function getCurrentUserInternal() {
    const session = readSession();
    if (!session?.email) return null;
    const users = readUsers();
    return users[normalizeEmail(session.email)] || null;
  }

  function getCurrentUser() {
    return safeUser(getCurrentUserInternal());
  }

  function getUserNamespace(user = getCurrentUserInternal()) {
    return user?.id || "guest";
  }

  function shouldScopeKey(key) {
    const text = String(key || "");
    return text && !text.startsWith(AUTH_PREFIX) && !text.startsWith(USER_PREFIX);
  }

  function scopeKeyForUser(user, key) {
    if (!user || !shouldScopeKey(key)) return key;
    return USER_PREFIX + user.id + "-" + key;
  }

  function scopeKey(key) {
    return scopeKeyForUser(getCurrentUserInternal(), key);
  }

  function emitAuthChange() {
    const user = getCurrentUser();
    listeners.forEach((listener) => listener(user));
    window.dispatchEvent(new CustomEvent("ap-auth-change", { detail: { user } }));
  }

  function hasPasswordCrypto() {
    return Boolean(window.crypto?.subtle && window.crypto?.getRandomValues && window.TextEncoder && window.btoa && window.atob);
  }

  function bytesToBase64(bytes) {
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  }

  function base64ToBytes(value) {
    const binary = window.atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  function randomSalt(length = 16) {
    if (!hasPasswordCrypto()) throw new Error("Secure password hashing is not available in this browser.");
    const bytes = new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    return bytesToBase64(bytes);
  }

  async function hashPassword(password, salt, iterations = PASSWORD_HASH.iterations) {
    if (!hasPasswordCrypto()) throw new Error("Secure password hashing is not available in this browser.");
    const encoder = new TextEncoder();
    const key = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(String(password || "")),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const bits = await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: base64ToBytes(salt),
        iterations,
        hash: "SHA-256"
      },
      key,
      PASSWORD_HASH.length
    );
    return bytesToBase64(new Uint8Array(bits));
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function migrateGuestProgressToUser(user) {
    if (!user) return;
    const keys = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key || key.startsWith(USER_PREFIX) || key.startsWith(AUTH_PREFIX)) continue;
      if (key !== SELECTED_SUBJECT_KEY && !key.endsWith("-state-v1")) continue;
      keys.push(key);
    }

    keys.forEach((key) => {
      const destination = scopeKeyForUser(user, key);
      if (!localStorage.getItem(destination)) {
        localStorage.setItem(destination, localStorage.getItem(key) || "");
      }
    });
  }

  async function register({ name, email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const displayName = String(name || "").trim();
    const users = readUsers();

    if (!displayName) throw new Error("Enter your name.");
    if (!validEmail(normalizedEmail)) throw new Error("Enter a valid email.");
    if (String(password || "").length < 6) throw new Error("Use at least 6 characters.");
    if (users[normalizedEmail]) throw new Error("That email already has a local account.");

    const passwordSalt = randomSalt();
    const passwordHash = await hashPassword(password, passwordSalt);
    const user = {
      id: makeUserId(normalizedEmail),
      name: displayName,
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
      passwordSalt,
      passwordHash,
      passwordAlgorithm: PASSWORD_HASH.algorithm,
      passwordIterations: PASSWORD_HASH.iterations
    };

    users[normalizedEmail] = user;
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedEmail, signedInAt: new Date().toISOString() }));
    migrateGuestProgressToUser(user);
    emitAuthChange();
    return safeUser(user);
  }

  async function login({ email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const users = readUsers();
    const user = users[normalizedEmail];

    if (!user) throw new Error("No local account found for that email.");
    if (!user.passwordSalt || !user.passwordHash) throw new Error("Use the provider you used to create this account.");
    const passwordHash = await hashPassword(password, user.passwordSalt, user.passwordIterations || PASSWORD_HASH.iterations);
    if (passwordHash !== user.passwordHash) throw new Error("Password does not match.");

    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedEmail, signedInAt: new Date().toISOString() }));
    migrateGuestProgressToUser(user);
    emitAuthChange();
    return safeUser(user);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    emitAuthChange();
  }

  function updateProfile({ name }) {
    const current = getCurrentUserInternal();
    if (!current) throw new Error("Sign in first.");
    const users = readUsers();
    const updated = { ...current, name: String(name || current.name).trim() || current.name };
    users[current.email] = updated;
    writeUsers(users);
    emitAuthChange();
    return safeUser(updated);
  }


  function getFirebaseConfig() {
    const config = window.AP_FIREBASE_CONFIG;
    if (!config || typeof config !== "object") return null;
    const required = ["apiKey", "authDomain", "projectId", "appId"];
    const missing = required.some((key) => {
      const value = String(config[key] || "").trim();
      return !value || value.includes("YOUR_");
    });
    return missing ? null : config;
  }

  function firebaseSetupMessage() {
    return "Google and Apple sign-in need Firebase setup first. Add your Firebase web config in firebase-config.js and enable both providers.";
  }

  function cloudAuthReady() {
    return Boolean(getFirebaseConfig());
  }

  async function loadFirebaseModules() {
    const config = getFirebaseConfig();
    if (!config) throw new Error(firebaseSetupMessage());

    if (!firebaseModulesPromise) {
      firebaseModulesPromise = Promise.all([
        import("https://www.gstatic.com/firebasejs/" + FIREBASE_SDK_VERSION + "/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/" + FIREBASE_SDK_VERSION + "/firebase-auth.js")
      ]).then(([appModule, authModule]) => {
        const firebaseApp = appModule.getApps().length ? appModule.getApp() : appModule.initializeApp(config);
        const firebaseAuth = authModule.getAuth(firebaseApp);
        firebaseAuth.useDeviceLanguage();
        return { appModule, authModule, firebaseApp, firebaseAuth };
      });
    }

    return firebaseModulesPromise;
  }

  function providerLabel(providerName) {
    return providerName === APPLE_PROVIDER ? "Apple" : "Google";
  }

  function makeFirebaseProvider(authModule, providerName) {
    if (providerName === APPLE_PROVIDER) {
      const provider = new authModule.OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
      return provider;
    }
    const provider = new authModule.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    return provider;
  }

  function providerFromFirebaseUser(firebaseUser, fallbackProvider) {
    const providerId = firebaseUser?.providerData?.[0]?.providerId || "";
    if (providerId.includes("apple")) return APPLE_PROVIDER;
    if (providerId.includes("google")) return GOOGLE_PROVIDER;
    return fallbackProvider || "firebase";
  }

  function cloudEmail(firebaseUser, providerName) {
    const email = normalizeEmail(firebaseUser?.email);
    if (email) return email;
    return providerName + "-" + simpleHash(firebaseUser?.uid || Date.now()) + "@ap-practice.local";
  }

  function activateFirebaseUser(firebaseUser, fallbackProvider) {
    if (!firebaseUser?.uid) throw new Error("Provider sign-in did not return a user.");
    const provider = providerFromFirebaseUser(firebaseUser, fallbackProvider);
    const email = cloudEmail(firebaseUser, provider);
    const users = readUsers();
    const existing = users[email] || {};
    const now = new Date().toISOString();
    const user = {
      ...existing,
      id: existing.id || makeUserId(email),
      name: firebaseUser.displayName || existing.name || providerLabel(provider) + " User",
      email,
      createdAt: existing.createdAt || now,
      updatedAt: now,
      authType: "firebase",
      provider,
      firebaseUid: firebaseUser.uid,
      photoURL: firebaseUser.photoURL || existing.photoURL || ""
    };

    users[email] = user;
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, provider, firebaseUid: firebaseUser.uid, signedInAt: now }));
    migrateGuestProgressToUser(user);
    emitAuthChange();
    return safeUser(user);
  }

  async function signInWithProvider(providerName) {
    const modules = await loadFirebaseModules();
    const provider = makeFirebaseProvider(modules.authModule, providerName);

    try {
      const result = await modules.authModule.signInWithPopup(modules.firebaseAuth, provider);
      return activateFirebaseUser(result.user, providerName);
    } catch (error) {
      if (["auth/popup-blocked", "auth/cancelled-popup-request", "auth/operation-not-supported-in-this-environment"].includes(error.code)) {
        await modules.authModule.signInWithRedirect(modules.firebaseAuth, provider);
        return null;
      }
      throw error;
    }
  }

  async function checkFirebaseRedirectResult() {
    if (firebaseRedirectChecked || !getFirebaseConfig()) return;
    firebaseRedirectChecked = true;
    try {
      const modules = await loadFirebaseModules();
      const result = await modules.authModule.getRedirectResult(modules.firebaseAuth);
      if (result?.user) {
        activateFirebaseUser(result.user);
        window.location.reload();
      }
    } catch (error) {
      window.console?.warn?.("Provider sign-in redirect check failed", error);
    }
  }

  function onChange(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getInitials(user) {
    const source = String(user?.name || user?.email || "?").trim();
    const parts = source.split(/\s+/).filter(Boolean);
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return source.slice(0, 1).toUpperCase();
  }

  function accountButtonHtml(user) {
    if (user) {
      return [
        '<span class="account-avatar" aria-hidden="true">' + escapeAuthHtml(getInitials(user)) + '</span>',
        '<span class="account-copy"><strong>' + escapeAuthHtml(firstName(user)) + '</strong><em>Saved profile</em></span>'
      ].join("");
    }
    return [
      '<span class="account-avatar" aria-hidden="true">+</span>',
      '<span class="account-copy"><strong>Sign In</strong><em>Save progress</em></span>'
    ].join("");
  }

  function updateAccountButtons() {
    const user = getCurrentUser();
    document.querySelectorAll("[data-auth-trigger]").forEach((button) => {
      button.innerHTML = accountButtonHtml(user);
      button.setAttribute("aria-label", user ? "Open account for " + firstName(user) : "Sign in or register");
    });
  }

  function mountAccountButtons() {
    document.querySelectorAll(".start-nav, .page-nav").forEach((nav) => {
      if (nav.querySelector("[data-auth-trigger]")) return;
      const button = document.createElement("button");
      button.className = "account-button";
      button.type = "button";
      button.setAttribute("data-auth-trigger", "");
      button.setAttribute("aria-haspopup", "dialog");
      button.addEventListener("click", () => openAuthModal());
      nav.appendChild(button);
    });
    updateAccountButtons();
  }

  function setAuthMessage(modal, message, tone = "neutral") {
    const messageEl = modal.querySelector("[data-auth-message]");
    if (!messageEl) return;
    messageEl.textContent = message || "";
    messageEl.dataset.tone = tone;
  }

  function setAuthMode(modal, mode) {
    authMode = mode;
    const isRegister = authMode === "register";
    modal.querySelectorAll("[data-auth-mode]").forEach((button) => {
      const active = button.dataset.authMode === authMode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    const nameField = modal.querySelector("[data-register-only]");
    const nameInput = modal.querySelector('input[name="name"]');
    const passwordInput = modal.querySelector('input[name="password"]');
    const submit = modal.querySelector("[data-auth-submit]");
    const title = modal.querySelector("#authTitle");
    const copy = modal.querySelector("[data-auth-copy]");

    if (nameField) nameField.hidden = !isRegister;
    if (nameInput) nameInput.required = isRegister;
    if (passwordInput) passwordInput.autocomplete = isRegister ? "new-password" : "current-password";
    if (submit) submit.textContent = isRegister ? "Create Account" : "Sign In";
    if (title) title.textContent = isRegister ? "Create a local account" : "Sign in";
    if (copy) {
      copy.textContent = isRegister
        ? "Create a local browser profile so progress can save under your name."
        : "Sign in on this browser to continue saved AP practice progress.";
    }
    if (!cloudAuthReady()) {
      setAuthMessage(modal, firebaseSetupMessage());
    } else {
      setAuthMessage(modal, "");
    }
  }

  function renderSignedInPanel(modal) {
    const user = getCurrentUser();
    const formArea = modal.querySelector("[data-auth-form-area]");
    const signedInPanel = modal.querySelector("[data-auth-signed-in]");
    const title = modal.querySelector("#authTitle");
    const copy = modal.querySelector("[data-auth-copy]");

    if (formArea) formArea.hidden = Boolean(user);
    if (signedInPanel) {
      signedInPanel.hidden = !user;
      if (user) {
        signedInPanel.innerHTML = [
          '<div class="auth-profile-row">',
          '<span class="account-avatar large" aria-hidden="true">' + escapeAuthHtml(getInitials(user)) + '</span>',
          '<div><strong>' + escapeAuthHtml(user.name || firstName(user)) + '</strong><span>' + escapeAuthHtml(user.email) + '</span></div>',
          '</div>',
          '<p>Your answers, timers, scores, and selected subject save to this profile on this browser.</p>',
          '<div class="auth-actions">',
          '<button class="text-button secondary" type="button" data-auth-close>Close</button>',
          '<button class="text-button primary" type="button" data-auth-logout>Sign Out</button>',
          '</div>'
        ].join("");
        signedInPanel.querySelector("[data-auth-close]")?.addEventListener("click", () => closeAuthModal(modal));
        signedInPanel.querySelector("[data-auth-logout]")?.addEventListener("click", () => {
          logout();
          setAuthMessage(modal, "Signed out. Switching back to guest progress...", "success");
          window.setTimeout(() => window.location.reload(), 450);
        });
      }
    }

    if (user) {
      if (title) title.textContent = "Progress is saving";
      if (copy) copy.textContent = "This account is for AP Exam Practice only. Provider sign-in uses Firebase when configured.";
    } else {
      setAuthMode(modal, authMode);
    }
  }

  function ensureAuthModal() {
    let modal = document.getElementById("authDialog");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "authDialog";
    modal.className = "auth-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "authTitle");
    modal.innerHTML = [
      '<button class="auth-backdrop" type="button" data-auth-close aria-label="Close account dialog"></button>',
      '<section class="auth-card" role="document">',
      '<div class="auth-head">',
      '<div><span>Account</span><h2 id="authTitle">Sign in</h2></div>',
      '<button class="mode-close" type="button" data-auth-close aria-label="Close account dialog"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>',
      '</div>',
      '<p class="auth-copy" data-auth-copy>Sign in on this browser to continue saved AP practice progress.</p>',
      '<div class="auth-signed-in" data-auth-signed-in hidden></div>',
      '<div data-auth-form-area>',
      '<div class="auth-provider-grid" aria-label="Provider sign-in options">',
      '<button class="auth-provider-button" type="button" data-auth-provider="google"><span aria-hidden="true">G</span><strong>Continue with Google</strong><em data-provider-state>Setup required</em></button>',
      '<button class="auth-provider-button" type="button" data-auth-provider="apple"><span aria-hidden="true">Apple</span><strong>Continue with Apple</strong><em data-provider-state>Setup required</em></button>',
      '</div>',
      '<div class="auth-divider"><span>or</span></div>',
      '<div class="auth-tabs" role="tablist" aria-label="Account mode">',
      '<button type="button" data-auth-mode="login" role="tab" aria-selected="true">Login</button>',
      '<button type="button" data-auth-mode="register" role="tab" aria-selected="false">Register</button>',
      '</div>',
      '<form class="auth-form" data-auth-form>',
      '<label class="auth-field" data-register-only hidden><span>Name</span><input name="name" type="text" autocomplete="name" placeholder="Alan"></label>',
      '<label class="auth-field"><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label>',
      '<label class="auth-field"><span>Password</span><input name="password" type="password" minlength="6" autocomplete="current-password" placeholder="6+ characters" required></label>',
      '<p class="auth-message" data-auth-message aria-live="polite"></p>',
      '<p class="auth-note">Social sign-in uses Firebase when configured. Local accounts and progress still save in this browser.</p>',
      '<button class="text-button primary full" type="submit" data-auth-submit>Sign In</button>',
      '</form>',
      '</div>',
      '</section>'
    ].join("");

    document.body.appendChild(modal);

    modal.querySelectorAll("[data-auth-close]").forEach((control) => {
      control.addEventListener("click", () => closeAuthModal(modal));
    });
    modal.querySelectorAll("[data-auth-mode]").forEach((control) => {
      control.addEventListener("click", () => setAuthMode(modal, control.dataset.authMode));
    });
    const providerReady = cloudAuthReady();
    modal.querySelectorAll("[data-auth-provider]").forEach((control) => {
      control.classList.toggle("is-unconfigured", !providerReady);
      control.querySelector("[data-provider-state]").textContent = providerReady ? "Ready" : "Setup required";
      control.title = providerReady ? "" : firebaseSetupMessage();
      control.addEventListener("click", async () => {
        const provider = control.dataset.authProvider;
        if (!cloudAuthReady()) {
          setAuthMessage(modal, firebaseSetupMessage(), "error");
          return;
        }
        modal.querySelectorAll("[data-auth-provider]").forEach((button) => {
          button.disabled = true;
        });
        setAuthMessage(modal, "Opening " + providerLabel(provider) + " sign-in...");
        try {
          const user = await signInWithProvider(provider);
          if (user) {
            setAuthMessage(modal, "Signed in with " + providerLabel(provider) + ". Loading your saved workspace...", "success");
            updateAccountButtons();
            window.setTimeout(() => window.location.reload(), 550);
          } else {
            setAuthMessage(modal, "Continue in the provider window to finish sign-in.", "success");
          }
        } catch (error) {
          setAuthMessage(modal, error.message || providerLabel(provider) + " sign-in failed.", "error");
          modal.querySelectorAll("[data-auth-provider]").forEach((button) => {
            button.disabled = false;
          });
        }
      });
    });
    modal.querySelector("[data-auth-form]")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const submit = modal.querySelector("[data-auth-submit]");
      const data = new FormData(form);
      submit.disabled = true;
      setAuthMessage(modal, authMode === "register" ? "Creating local account..." : "Signing in...");
      try {
        if (authMode === "register") {
          await register({
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password")
          });
          setAuthMessage(modal, "Account created. Loading your saved workspace...", "success");
        } else {
          await login({
            email: data.get("email"),
            password: data.get("password")
          });
          setAuthMessage(modal, "Signed in. Loading your saved workspace...", "success");
        }
        updateAccountButtons();
        window.setTimeout(() => window.location.reload(), 550);
      } catch (error) {
        setAuthMessage(modal, error.message || "Could not complete sign in.", "error");
        submit.disabled = false;
      }
    });
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAuthModal(modal);
    });

    return modal;
  }

  function openAuthModal() {
    const modal = ensureAuthModal();
    renderSignedInPanel(modal);
    modal.hidden = false;
    document.body.classList.add("auth-open");
    const focusTarget = modal.querySelector('input[name="email"]') || modal.querySelector("[data-auth-close]");
    window.setTimeout(() => focusTarget?.focus(), 20);
  }

  function closeAuthModal(modal = document.getElementById("authDialog")) {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("auth-open");
  }

  function initAuthUi() {
    mountAccountButtons();
    window.addEventListener("storage", updateAccountButtons);
    checkFirebaseRedirectResult();
  }

  window.APPracticeAuth = {
    getCurrentUser,
    getUserNamespace,
    isSignedIn: () => Boolean(getCurrentUserInternal()),
    login,
    logout,
    register,
    updateProfile,
    signInWithProvider,
    hasCloudAuthConfig: cloudAuthReady,
    onChange,
    scopeKey,
    open: openAuthModal
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuthUi);
  } else {
    initAuthUi();
  }
}());
