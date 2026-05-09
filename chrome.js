const chromePracticeData = window.APPracticeData;
const CHROME_FOCUS_KEY = "ap-practice-focus-mode-v1";
const CHROME_THEME_KEY = "ap-practice-theme-mode-v1";
const fallbackChromeSubject = {
  title: "AP Statistics",
  short: "AP Statistics",
  slug: "ap-statistics",
  format: { mcqCount: 40, mcqMinutes: 90, frqCount: 6, frqMinutes: 90, mcqWeight: 50, frqWeight: 50, fullMinutes: 180 }
};

function getChromeSubject() {
  return chromePracticeData?.getSelectedSubject?.() || fallbackChromeSubject;
}

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readThemeMode() {
  try {
    const saved = localStorage.getItem(CHROME_THEME_KEY);
    if (saved === "auto" || saved === "dark" || saved === "light") return saved;
  } catch {
    // Storage can be blocked; the page still follows the system theme.
  }
  return "auto";
}

function resolveTheme(mode) {
  return mode === "dark" || mode === "light" ? mode : getSystemTheme();
}

function applyTheme(mode = readThemeMode(), shouldPersist = false) {
  const nextMode = mode === "dark" || mode === "light" ? mode : "auto";
  const nextTheme = resolveTheme(nextMode);
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.dataset.themeMode = nextMode;
  if (shouldPersist) {
    try {
      localStorage.setItem(CHROME_THEME_KEY, nextMode);
    } catch {
      // Theme still applies for this page even if storage is blocked.
    }
  }
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const labelText = nextMode === "auto" ? "Auto" : nextMode === "dark" ? "Dark" : "Light";
    const nextLabel = nextMode === "auto" ? "Switch to light mode" : nextMode === "light" ? "Switch to dark mode" : "Switch to auto theme";
    button.setAttribute("aria-pressed", String(nextMode !== "auto"));
    button.setAttribute("aria-label", `${labelText} theme active. ${nextLabel}.`);
    button.title = nextMode === "auto" ? `Theme follows system appearance (${nextTheme})` : `${labelText} theme`;
    const label = button.querySelector("span");
    if (label) label.textContent = labelText;
  });
}

function nextThemeMode() {
  const current = readThemeMode();
  if (current === "auto") return "light";
  if (current === "light") return "dark";
  return "auto";
}

function createThemeButton() {
  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.type = "button";
  button.dataset.themeToggle = "true";
  button.innerHTML = '<svg view="0 0 24 24" aria-hidden="true"><path d="M12 3v2.2M12 18.8V21M4.22 4.22l1.55 1.55M18.23 18.23l1.55 1.55M3 12h2.2M18.8 12H21M4.22 19.78l1.55-1.55M18.23 5.77l1.55-1.55"/><circle cx="12" cy="12" r="4.2"/></svg><span>Dark</span>';
  button.addEventListener("click", () => {
    applyTheme(nextThemeMode(), true);
  });
  return button;
}

function initThemeToggle() {
  const host = document.querySelector(".page-nav") || document.querySelector(".start-nav");
  if (host && !host.querySelector("[data-theme-toggle]")) {
    host.appendChild(createThemeButton());
  }
  applyTheme(readThemeMode());
  const systemTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  if (systemTheme) {
    systemTheme.addEventListener("change", () => {
      if (readThemeMode() === "auto") applyTheme("auto");
    });
  }
}

function chromeStorageKey(kind, subject = getChromeSubject()) {
  return chromePracticeData?.storageKey?.(kind, subject) || "ap-practice-" + subject.slug + "-" + kind + "-state-v1";
}

function chromeWeight(value) {
  return chromePracticeData?.formatWeight?.(value) || (Number.isInteger(value) ? value + "%" : Number(value).toFixed(1) + "%");
}

function chromeTotalMinutes(format) {
  return chromePracticeData?.totalMinutes?.(format) || format.fullMinutes || format.mcqMinutes + format.frqMinutes;
}

function getTestOptions(subject = getChromeSubject()) {
  const format = subject.format;
  return [
    {
      href: "full.html",
      mode: "full",
      label: subject.title + " Full Practice",
      meta: chromeTotalMinutes(format) + " minutes · MCQ, then FRQ"
    },
    {
      href: "mcq.html",
      mode: "mcq",
      label: subject.title + " MCQ",
      meta: format.mcqCount + " questions · " + format.mcqMinutes + " minutes · " + chromeWeight(format.mcqWeight)
    },
    {
      href: "frq.html",
      mode: "frq",
      label: subject.title + " FRQ",
      meta: format.frqCount + " prompts · " + format.frqMinutes + " minutes · " + chromeWeight(format.frqWeight)
    }
  ];
}

function readChromeJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function getChromeProgress(subject = getChromeSubject()) {
  const mcq = readChromeJson(chromeStorageKey("mcq", subject));
  const frq = readChromeJson(chromeStorageKey("frq", subject));
  const mcqAnswered = Array.isArray(mcq.answers) ? mcq.answers.filter((answer) => answer !== null).length : 0;
  const frqAnswered = Array.isArray(frq.answers)
    ? frq.answers.filter((answers) =>
        Array.isArray(answers) && answers.some((answer) => String(answer || "").trim().length > 0)
      ).length
    : 0;

  return {
    mcqAnswered,
    frqAnswered,
    mcqSubmitted: Boolean(mcq.submitted),
    frqSubmitted: Boolean(frq.submitted)
  };
}

function getResumeTarget(progress) {
  if (progress.mcqSubmitted && !progress.frqSubmitted) return "frq.html";
  if (progress.frqAnswered || progress.frqSubmitted) return "frq.html";
  if (progress.mcqAnswered || progress.mcqSubmitted) return "mcq.html";
  return "mcq.html";
}

function updateChromeProgress() {
  const subject = getChromeSubject();
  const progress = getChromeProgress(subject);
  const resumeLinks = document.querySelectorAll("[data-resume-link]");
  const progressLabels = document.querySelectorAll("[data-footer-progress]");
  const resumeTarget = getResumeTarget(progress);
  const label =
    progress.mcqAnswered || progress.frqAnswered
      ? `${progress.mcqAnswered}/${subject.format.mcqCount} MCQ · ${progress.frqAnswered}/${subject.format.frqCount} FRQ`
      : "No saved work";

  resumeLinks.forEach((link) => {
    link.setAttribute("href", resumeTarget);
    link.textContent = progress.mcqAnswered || progress.frqAnswered ? "Resume" : "Start";
  });
  progressLabels.forEach((item) => {
    item.textContent = label;
  });
}

function initFocusMode() {
  const buttons = document.querySelectorAll("[data-focus-toggle]");
  const apply = (enabled) => {
    document.body.classList.toggle("focus-mode", enabled);
    buttons.forEach((button) => {
      button.textContent = enabled ? "Vibrant" : "Focus";
      button.setAttribute("aria-pressed", String(enabled));
    });
  };

  apply(localStorage.getItem(CHROME_FOCUS_KEY) === "true");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const enabled = !document.body.classList.contains("focus-mode");
      localStorage.setItem(CHROME_FOCUS_KEY, String(enabled));
      apply(enabled);
    });
  });
}

function initScrollTop() {
  document.querySelectorAll("[data-scroll-top]").forEach((button) => {
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function openReadyConfirm(option) {
  const proceed = window.confirm("Ready to begin " + option.label + "?\n" + option.meta);
  if (proceed) window.location.href = option.href;
}

function renderTestPickerOptions(modal) {
  const subject = getChromeSubject();
  const title = modal.querySelector("#testPickerTitle");
  const copy = modal.querySelector("[data-test-picker-copy]");
  const grid = modal.querySelector(".test-picker-grid");

  if (title) title.textContent = "Select " + subject.short + " practice";
  if (copy) copy.textContent = subject.title + " is selected.";
  if (grid) {
    const options = getTestOptions(subject);
    grid.innerHTML = options.map((option, index) =>
      "<a class=\"test-picker-option\" href=\"" + option.href + "\" data-test-option=\"" + index + "\">" +
      "<strong>" + option.label + "</strong>" +
      "<span>" + option.meta + "</span>" +
      "</a>"
    ).join("");
    grid.querySelectorAll("[data-test-option]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        closeTestPicker(modal);
        openReadyConfirm(options[Number(link.dataset.testOption)]);
      });
    });
  }
}

function ensureTestPicker() {
  let modal = document.getElementById("testPickerDialog");
  if (modal) {
    renderTestPickerOptions(modal);
    return modal;
  }

  modal = document.createElement("div");
  modal.className = "test-picker-modal";
  modal.id = "testPickerDialog";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "testPickerTitle");
  modal.innerHTML = `
    <div class="test-picker-backdrop" data-test-picker-close></div>
    <div class="test-picker ready-dialog" role="document">
      <div class="ready-dialog-body">
        <span class="home-greeting">Start test</span>
        <h2 id="testPickerTitle">Select practice</h2>
        <p data-test-picker-copy>Choose a section.</p>
        <div class="test-picker-grid"></div>
        <div class="ready-actions">
          <button class="text-button secondary" value="cancel" type="button" data-test-picker-close>Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-test-picker-close]").forEach((control) => {
    control.addEventListener("click", () => closeTestPicker(modal));
  });
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTestPicker(modal);
  });
  renderTestPickerOptions(modal);
  return modal;
}

function openTestPicker(modal) {
  renderTestPickerOptions(modal);
  modal.hidden = false;
  document.body.classList.add("test-picker-open");
  const firstOption = modal.querySelector(".test-picker-option");
  if (firstOption) firstOption.focus();
}

function closeTestPicker(modal) {
  modal.hidden = true;
  document.body.classList.remove("test-picker-open");
}

function initTestPicker() {
  document.querySelectorAll("[data-start-test]").forEach((button) => {
    button.addEventListener("click", () => {
      const subjectPanel = document.querySelector(".subject-panel");
      if (subjectPanel) {
        subjectPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        subjectPanel.classList.add("is-pulsing");
        window.setTimeout(() => subjectPanel.classList.remove("is-pulsing"), 900);
        return;
      }
      openTestPicker(ensureTestPicker());
    });
  });
}

function initBackButtons() {
  document.querySelectorAll("[data-back-button]").forEach((button) => {
    button.addEventListener("click", () => {
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
      window.location.href = "index.html";
    });
  });
}

function applySubjectLogo() {
  if (document.querySelector(".start-screen")) return;
  const subject = getChromeSubject();
  const icon = chromePracticeData?.getSubjectIcon?.(subject);
  const mark = document.querySelector(".brand-mark img");
  if (mark && icon) {
    mark.src = icon;
    mark.alt = subject.short + " topic icon";
  }
}

function initMouseTracking() {
  const glow = document.createElement("div");
  const cursor = document.createElement("div");
  glow.className = "mouse-glow";
  cursor.className = "custom-cursor";
  document.body.appendChild(glow);
  document.body.appendChild(cursor);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let cursorX = targetX;
  let cursorY = targetY;
  let glowX = targetX;
  let glowY = targetY;

  const hidePointer = () => {
    document.body.classList.remove("has-mouse");
    document.body.classList.remove("custom-cursor-enabled");
    cursor.classList.remove("is-action", "is-down");
  };

  const showPointer = () => {
    document.body.classList.add("has-mouse");
    const modalOpen = document.querySelector("dialog[open], .ready-modal:not([hidden]), .mode-popout:not([hidden]), .test-picker-modal:not([hidden])");
    document.body.classList.toggle("custom-cursor-enabled", !modalOpen);
  };

  const move = (event) => {
    if (event.clientX < 0 || event.clientY < 0 || event.clientX > window.innerWidth || event.clientY > window.innerHeight) {
      hidePointer();
      return;
    }

    targetX = event.clientX;
    targetY = event.clientY;
    showPointer();
    cursor.classList.toggle(
      "is-action",
      Boolean(event.target.closest("a, button, input, textarea, select, [role=button]"))
    );
  };

  const animate = () => {
    cursorX += (targetX - cursorX) * 0.34;
    cursorY += (targetY - cursorY) * 0.34;
    glowX += (targetX - glowX) * 0.11;
    glowY += (targetY - glowY) * 0.11;
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    window.requestAnimationFrame(animate);
  };

  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("pointerdown", () => {
    cursor.classList.add("is-down");
  });
  window.addEventListener("pointerup", () => {
    cursor.classList.remove("is-down");
  });
  window.addEventListener("pointerleave", hidePointer);
  window.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) hidePointer();
  });
  window.addEventListener("blur", hidePointer);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hidePointer();
  });
  animate();
}

applySubjectLogo();
initThemeToggle();
updateChromeProgress();
initFocusMode();
initScrollTop();
initTestPicker();
initBackButtons();
initMouseTracking();
