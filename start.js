const practiceData = window.APPracticeData;
const SELECTED_AP_SUBJECT_KEY = practiceData?.SELECTED_AP_SUBJECT_KEY || "ap-practice-selected-subject-v1";

function selectedSubjectStorageKey() {
  return practiceData?.selectedSubjectStorageKey?.() || practiceData?.scopedStorageKey?.(SELECTED_AP_SUBJECT_KEY) || SELECTED_AP_SUBJECT_KEY;
}
const fallbackSubject = {
  title: "AP Statistics",
  short: "AP Statistics",
  slug: "ap-statistics",
  format: {
    mcqCount: 40,
    mcqMinutes: 90,
    frqCount: 6,
    frqMinutes: 90,
    mcqWeight: 50,
    frqWeight: 50,
    fullMinutes: 180
  }
};

function getSelectedSubject() {
  return practiceData?.getSelectedSubject?.() || fallbackSubject;
}

function getSubjectByTitle(title) {
  return practiceData?.getSubjectByTitle?.(title) || (title === fallbackSubject.title ? fallbackSubject : null);
}

function storageKey(kind, subject = getSelectedSubject()) {
  return practiceData?.storageKey?.(kind, subject) || `ap-practice-${subject.slug}-${kind}-state-v1`;
}

function totalMinutes(format) {
  return practiceData?.totalMinutes?.(format) || format.fullMinutes || format.mcqMinutes + format.frqMinutes;
}

function formatWeight(value) {
  return practiceData?.formatWeight?.(value) || (Number.isInteger(value) ? `${value}%` : `${Number(value).toFixed(1)}%`);
}

function normalizeSearch(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function escapeHomeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderSubjectCards() {
  const grid = document.getElementById("subjectGrid");
  if (!grid || !practiceData?.subjects?.length) return;

  grid.innerHTML = practiceData.subjects.map((subject) => [
    '<button class="subject-card is-available" type="button" data-subject-card data-subject="' + escapeHomeHtml(subject.title) + '" data-short="' + escapeHomeHtml(subject.short) + '" data-available="true">',
    '<span>' + escapeHomeHtml(subject.group) + '</span>',
    '<strong>' + escapeHomeHtml(subject.short || subject.title) + '</strong>',
    '<em>Available</em>',
    '</button>'
  ].join("")).join("");
}

function formatReadyCopy(mode, subject = getSelectedSubject()) {
  const format = subject.format;
  const fullTime = totalMinutes(format);
  const mcqWeight = formatWeight(format.mcqWeight);
  const frqWeight = formatWeight(format.frqWeight);

  if (mode === "full") {
    return {
      title: `Ready for ${subject.title} Full Practice?`,
      detail: `You will start with Section I, then move to Section II. Total practice time: ${fullTime} minutes.`
    };
  }

  if (mode === "mcq") {
    return {
      title: `Ready for ${subject.title} Section I?`,
      detail: `${format.mcqCount} multiple-choice questions. ${format.mcqMinutes} minutes. ${mcqWeight} of the exam score.`
    };
  }

  if (mode === "frq") {
    return {
      title: `Ready for ${subject.title} Section II?`,
      detail: `${format.frqCount} free-response questions. ${format.frqMinutes} minutes. ${frqWeight} of the exam score.`
    };
  }

  return null;
}

function readMcqProgress(subject = getSelectedSubject()) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey("mcq", subject)) || "{}");
    if (!Array.isArray(saved.answers)) return { answered: 0, submitted: false };
    return {
      answered: saved.answers.filter((answer) => answer !== null).length,
      submitted: Boolean(saved.submitted)
    };
  } catch {
    return { answered: 0, submitted: false };
  }
}

function readFrqProgress(subject = getSelectedSubject()) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey("frq", subject)) || "{}");
    if (!Array.isArray(saved.answers)) return { answered: 0, submitted: false };
    return {
      answered: saved.answers.filter((answers) =>
        Array.isArray(answers) && answers.some((answer) => String(answer || "").trim().length > 0)
      ).length,
      submitted: Boolean(saved.submitted)
    };
  } catch {
    return { answered: 0, submitted: false };
  }
}

function readSectionState(kind, subject = getSelectedSubject()) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(kind, subject)) || "{}");
  } catch {
    return {};
  }
}

function calculateSavedMcqScore(subject, saved) {
  if (Number.isFinite(saved.score)) return saved.score;
  if (!saved.submitted || !Array.isArray(saved.answers) || !practiceData?.buildMcqQuestions) return null;
  const questions = practiceData.buildMcqQuestions(subject);
  if (questions.length !== saved.answers.length) return null;
  return questions.reduce((score, question, index) => score + (saved.answers[index] === question.correct ? 1 : 0), 0);
}

function calculateSavedFrqScore(saved) {
  if (!saved.submitted || !Array.isArray(saved.results)) return null;
  return saved.results.reduce((sum, result) => sum + (Number(result.score) || 0), 0);
}

function calculateSavedFrqMax(saved, subject) {
  if (Array.isArray(saved.results) && saved.results.length) {
    return saved.results.reduce((sum, result) => sum + (Number(result.maxPoints) || 0), 0);
  }
  const items = practiceData?.buildFrqItems?.(subject) || [];
  return items.reduce((sum, item) => sum + (Number(item.maxPoints) || 0), 0);
}

function updateFullScoreCard(subject = getSelectedSubject()) {
  const card = document.getElementById("fullScoreCard");
  if (!card) return;

  const title = document.getElementById("fullScoreTitle");
  const text = document.getElementById("fullScoreText");
  const mcqSaved = readSectionState("mcq", subject);
  const frqSaved = readSectionState("frq", subject);
  const mcqScore = calculateSavedMcqScore(subject, mcqSaved);
  const frqScore = calculateSavedFrqScore(frqSaved);
  const frqMax = calculateSavedFrqMax(frqSaved, subject);

  if (!mcqSaved.submitted || !frqSaved.submitted || mcqScore === null || frqScore === null || !frqMax) {
    card.hidden = true;
    return;
  }

  const format = subject.format;
  const mcqRatio = mcqScore / format.mcqCount;
  const frqRatio = frqScore / frqMax;
  const totalWeight = (Number(format.mcqWeight) || 0) + (Number(format.frqWeight) || 0) || 100;
  const weighted = ((mcqRatio * format.mcqWeight) + (frqRatio * format.frqWeight)) / totalWeight;
  card.hidden = false;
  if (title) title.textContent = Math.round(weighted * 100) + "% estimated practice score";
  if (text) {
    text.textContent = "MCQ " + mcqScore + " / " + format.mcqCount + " and FRQ " + frqScore + " / " + frqMax + ". This is local auto grading for practice, not an official AP score.";
  }
}

function updateHomeProgress() {
  const subject = getSelectedSubject();
  const format = subject.format;
  const mcq = readMcqProgress(subject);
  const frq = readFrqProgress(subject);
  const savedStateText = document.getElementById("savedStateText");
  const mcqPathStatus = document.getElementById("mcqPathStatus");
  const frqPathStatus = document.getElementById("frqPathStatus");
  const hasSavedWork = Boolean(mcq.answered || frq.answered);

  if (savedStateText) {
    savedStateText.textContent = hasSavedWork
      ? `${mcq.answered}/${format.mcqCount} MCQ · ${frq.answered}/${format.frqCount} FRQ`
      : "No saved work";
  }

  if (mcqPathStatus) {
    mcqPathStatus.textContent = mcq.submitted
      ? "Review MCQ"
      : mcq.answered
        ? `Resume ${mcq.answered}/${format.mcqCount}`
        : "Open MCQ";
  }

  if (frqPathStatus) {
    frqPathStatus.textContent = frq.submitted
      ? "Review FRQ"
      : frq.answered
        ? `Resume ${frq.answered}/${format.frqCount}`
        : "Open FRQ";
  }
}

function setPracticeLinksAvailable(available) {
  const readyLinks = document.querySelectorAll("[data-ready]");

  readyLinks.forEach((link) => {
    link.classList.toggle("is-disabled", !available);
    link.setAttribute("aria-disabled", String(!available));
    if (available) {
      delete link.dataset.unavailable;
    } else {
      link.dataset.unavailable = "true";
    }
  });
}

function updateModePopoutCopy(subject, available = true) {
  const subjectObject = typeof subject === "string" ? getSubjectByTitle(subject) || getSelectedSubject() : subject;
  const format = subjectObject.format;
  const subjectName = document.getElementById("modePopoutSubject");
  const status = document.getElementById("modePopoutStatus");
  const fullCard = document.querySelector("[data-mode=\"full\"]");
  const mcqCard = document.querySelector("[data-mode=\"mcq\"]");
  const frqCard = document.querySelector("[data-mode=\"frq\"]");

  if (subjectName) subjectName.textContent = subjectObject.title;
  if (status) {
    status.textContent = available
      ? `${format.note || "Practice made by Alan."}`
      : "Practice for this subject is coming soon.";
  }

  if (fullCard) {
    fullCard.querySelector("strong").textContent = `${totalMinutes(format)} min`;
    fullCard.querySelector("span:last-child").textContent = `${format.mcqCount} MCQ + ${format.frqCount} FRQ`;
  }

  if (mcqCard) {
    mcqCard.querySelector("strong").textContent = `${format.mcqCount} MCQ`;
    mcqCard.querySelector("span:last-child").textContent = `${format.mcqMinutes} min · ${formatWeight(format.mcqWeight)}`;
  }

  if (frqCard) {
    frqCard.querySelector("strong").textContent = `${format.frqCount} FRQ`;
    frqCard.querySelector("span:last-child").textContent = `${format.frqMinutes} min · ${formatWeight(format.frqWeight)}`;
  }
}

function updateFullPracticePage(subject = getSelectedSubject()) {
  if (!document.querySelector(".path-page")) return;
  const format = subject.format;
  const topbarMeta = document.querySelector(".topbar .brand-block p");
  const pathHeroTitle = document.querySelector(".path-hero h2");
  const pathHeroCopy = document.querySelector(".path-hero p");
  const pathTotal = document.querySelector(".path-total strong");
  const pathCards = document.querySelectorAll(".path-card");

  document.title = `AP Exam Practice | ${subject.title} Full Practice`;
  if (topbarMeta) topbarMeta.textContent = `${subject.title} · MCQ, then FRQ`;
  if (pathHeroTitle) pathHeroTitle.textContent = `${subject.short} full practice.`;
  if (pathHeroCopy) pathHeroCopy.textContent = `Start with ${format.mcqCount} MCQ, then complete ${format.frqCount} FRQ. Auto-saved.`;
  if (pathTotal) pathTotal.textContent = `${totalMinutes(format)} min`;

  if (pathCards[0]) {
    pathCards[0].querySelector("p").textContent = `${format.mcqCount} questions. ${format.mcqMinutes} minutes. ${formatWeight(format.mcqWeight)}.`;
  }
  if (pathCards[1]) {
    pathCards[1].querySelector("p").textContent = `${format.frqCount} questions. ${format.frqMinutes} minutes. ${formatWeight(format.frqWeight)}.`;
  }

  updateFullScoreCard(subject);
}

function closeModeSelection() {
  const modePopout = document.getElementById("modePopout");
  if (!modePopout) return;

  modePopout.hidden = true;
  document.body.classList.remove("mode-popout-open");
}

function jumpToModeSelection() {
  const modePopout = document.getElementById("modePopout");
  const modeGrid = document.getElementById("modeGrid");
  if (!modePopout || !modeGrid) return;

  modePopout.hidden = false;
  document.body.classList.add("mode-popout-open");
  modeGrid.classList.remove("is-pulsing");

  requestAnimationFrame(() => {
    modeGrid.classList.add("is-pulsing");
    window.setTimeout(() => modeGrid.classList.remove("is-pulsing"), 1000);
    const firstCard = modeGrid.querySelector(".mode-card");
    if (firstCard) firstCard.focus();
  });
}

function initSubjectPicker() {
  renderSubjectCards();
  const cards = document.querySelectorAll("[data-subject-card]");
  const cardsArray = Array.from(cards);
  const searchInput = document.getElementById("subjectSearch");
  const status = document.getElementById("selectedSubjectStatus");
  if (!cards.length) return;

  const subjectKeywords = (card) => normalizeSearch([
    card.dataset.subject,
    card.dataset.short,
    card.querySelector("span")?.textContent,
    card.querySelector("strong")?.textContent
  ].join(" "));

  const selectedStatusText = (subject, available) => available
    ? subject.title + " selected"
    : subject.title + " selected · coming soon";

  const updateSearchResults = () => {
    const query = normalizeSearch(searchInput?.value);
    const visibleCards = [];

    cardsArray.forEach((card) => {
      const matched = !query || subjectKeywords(card).includes(query);
      card.hidden = !matched;
      card.classList.remove("is-search-match");
      if (matched) visibleCards.push(card);
    });

    if (query && visibleCards[0]) visibleCards[0].classList.add("is-search-match");

    if (status && query) {
      status.textContent = visibleCards.length
        ? visibleCards.length + " subject" + (visibleCards.length === 1 ? "" : "s") + " found"
        : "No AP subjects found";
    }

    if (status && !query) {
      const selectedCard = cardsArray.find((card) => card.classList.contains("is-selected"));
      if (selectedCard) {
        const subject = getSubjectByTitle(selectedCard.dataset.subject) || fallbackSubject;
        status.textContent = selectedStatusText(subject, selectedCard.dataset.available === "true");
      }
    }

    return visibleCards;
  };

  const selectSubject = (card, options = {}) => {
    const subjectName = card.dataset.subject || fallbackSubject.title;
    const subject = getSubjectByTitle(subjectName) || fallbackSubject;
    const available = card.dataset.available === "true";

    cardsArray.forEach((item) => {
      const selected = item === card;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    localStorage.setItem(selectedSubjectStorageKey(), subject.title);
    setPracticeLinksAvailable(available);
    updateModePopoutCopy(subject, available);
    updateHomeProgress();

    if (status) status.textContent = selectedStatusText(subject, available);
    if (searchInput && options.openModes) searchInput.blur();
    if (options.openModes) jumpToModeSelection();
  };

  const savedSubject = localStorage.getItem(selectedSubjectStorageKey());
  const availableCard = cardsArray.find((card) => card.dataset.available === "true");
  const initialCard = cardsArray.find((card) => card.dataset.subject === savedSubject) || availableCard || cards[0];
  selectSubject(initialCard);

  cardsArray.forEach((card) => {
    card.addEventListener("click", () => {
      selectSubject(card, { openModes: true });
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", updateSearchResults);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const firstVisible = updateSearchResults().find((card) => !card.hidden);
        if (firstVisible) {
          event.preventDefault();
          selectSubject(firstVisible, { openModes: true });
        }
      }

      if (event.key === "Escape") {
        searchInput.value = "";
        updateSearchResults();
      }
    });
  }

  updateSearchResults();
}

function initModeCards() {
  const modeGrid = document.getElementById("modeGrid");
  const modePopout = document.getElementById("modePopout");
  if (!modeGrid) return;

  document.querySelectorAll("[data-mode-close]").forEach((control) => {
    control.addEventListener("click", closeModeSelection);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modePopout && !modePopout.hidden) closeModeSelection();
  });
  modeGrid.addEventListener("pointerover", (event) => {
    const card = event.target.closest(".mode-card");
    if (!card) return;
    modeGrid.querySelectorAll(".mode-card").forEach((item) => {
      item.classList.toggle("is-selected", item === card);
    });
  });
}

function initReadyDialog() {
  const dialog = document.getElementById("readyDialog");
  const title = document.getElementById("readyTitle");
  const detail = document.getElementById("readyDetail");
  const confirm = document.getElementById("readyConfirmBtn");
  const cancel = document.getElementById("readyCancelBtn");
  const readyLinks = document.querySelectorAll("[data-ready]");
  let targetHref = "";

  if (!dialog || !title || !detail || !confirm || !readyLinks.length) return;

  const closeDialog = () => {
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    dialog.hidden = true;
    document.body.classList.remove("ready-modal-open");
    targetHref = "";
  };

  const openDialog = () => {
    dialog.hidden = false;
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    document.body.classList.add("ready-modal-open");
    confirm.focus();
  };

  readyLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.dataset.unavailable === "true") {
        event.preventDefault();
        const selected = getSelectedSubject();
        const status = document.getElementById("selectedSubjectStatus");
        if (status) status.textContent = `${selected.title} practice is coming soon`;
        return;
      }

      const mode = link.dataset.ready;
      const copy = formatReadyCopy(mode);
      if (!copy) return;

      event.preventDefault();
      targetHref = link.getAttribute("href") || "";
      title.textContent = copy.title;
      detail.textContent = copy.detail;
      closeModeSelection();
      openDialog();
    });
  });

  dialog.querySelectorAll("[data-ready-close]").forEach((control) => {
    control.addEventListener("click", closeDialog);
  });

  if (cancel && !cancel.matches("[data-ready-close]")) {
    cancel.addEventListener("click", closeDialog);
  }

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDialog();
  });

  confirm.addEventListener("click", () => {
    if (targetHref) window.location.href = targetHref;
  });
}

updateFullPracticePage();
updateHomeProgress();
initSubjectPicker();
initModeCards();
initReadyDialog();
