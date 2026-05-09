const practiceData = window.APPracticeData;
const SELECTED_AP_SUBJECT_KEY = practiceData?.SELECTED_AP_SUBJECT_KEY || "ap-practice-selected-subject-v1";
const SUBJECT_SORT_KEY = "ap-practice-subject-sort-v1";
const TIMELINE_TIMEZONE_KEY = "ap-practice-timeline-timezone-v1";
const SUBJECT_SORTS = new Set(["az", "za", "group", "duration-asc", "duration-desc"]);
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

function compareHomeText(first, second) {
  return String(first || "").localeCompare(String(second || ""), undefined, {
    numeric: true,
    sensitivity: "base"
  });
}

function getSubjectSortMode(value) {
  return SUBJECT_SORTS.has(value) ? value : "az";
}

function subjectSortTitle(subject) {
  return String(subject?.short || subject?.title || "").replace(/^AP\s+/i, "").trim();
}

function sortedSubjects(sortMode = "az") {
  const subjects = [...(practiceData?.subjects || [])];
  const mode = getSubjectSortMode(sortMode);

  return subjects.sort((first, second) => {
    const firstTitle = subjectSortTitle(first);
    const secondTitle = subjectSortTitle(second);
    const firstMinutes = totalMinutes(first.format);
    const secondMinutes = totalMinutes(second.format);

    if (mode === "za") return compareHomeText(secondTitle, firstTitle);
    if (mode === "group") {
      return compareHomeText(first.group, second.group) || compareHomeText(firstTitle, secondTitle);
    }
    if (mode === "duration-asc") {
      return firstMinutes - secondMinutes || compareHomeText(firstTitle, secondTitle);
    }
    if (mode === "duration-desc") {
      return secondMinutes - firstMinutes || compareHomeText(firstTitle, secondTitle);
    }

    return compareHomeText(firstTitle, secondTitle);
  });
}

function getDeviceTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "your device timezone";
}

function getTimelineTimeZone() {
  const saved = localStorage.getItem(TIMELINE_TIMEZONE_KEY);
  return saved && saved !== "auto" ? saved : getDeviceTimeZone();
}

function formatTimeZoneName(timeZone) {
  return String(timeZone || "Device").split("/").pop().replaceAll("_", " ");
}

function formatTimelineDeadline(isoString, timeZone) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short"
  });
  return formatter.format(new Date(isoString));
}

function wallTimeInTimeZone(date, timeZone) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      hourCycle: "h23",
      timeZone
    }).formatToParts(date).reduce((values, part) => {
      values[part.type] = part.value;
      return values;
    }, {});
    return new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second));
  } catch {
    return new Date();
  }
}

function nowInTimeZone(timeZone) {
  return wallTimeInTimeZone(new Date(), timeZone);
}

function parseTimelineLocalDate(dateString, hour) {
  const [year, month, day] = String(dateString || "").split("-").map(Number);
  return new Date(year, month - 1, day, Number(hour) || 0, 0, 0, 0);
}

function sameTimelineDay(first, second) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

function formatTimelineCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days) return `${days}d ${hours}h ${minutes}m`;
  if (hours) return `${hours}h ${minutes}m`;
  if (minutes) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function collectTimelineSessions(timeline) {
  return Array.from(timeline.querySelectorAll(".timeline-session")).map((session) => {
    const day = session.closest(".timeline-day");
    const start = parseTimelineLocalDate(day?.dataset.date, session.dataset.startHour);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const name = session.querySelector("strong")?.textContent?.trim() || "AP exam";
    const timeLabel = session.querySelector("[data-time-local]")?.dataset.timeLocal || session.querySelector("[data-time-local]")?.textContent?.trim() || "";
    const dateLabel = day?.querySelector(".timeline-date")?.textContent?.trim() || "";

    return { session, day, start, end, name, timeLabel, dateLabel };
  }).sort((first, second) => first.start - second.start);
}

function collectTimelineDeadlines(timeline) {
  return Array.from(timeline.querySelectorAll(".deadline-card")).map((card) => {
    const stamp = card.querySelector("[data-deadline-utc]");
    const due = new Date(stamp?.dataset.deadlineUtc || "");
    const name = card.querySelector("strong")?.textContent?.trim() || "Deadline";
    return { card, due, name };
  }).filter((item) => !Number.isNaN(item.due.getTime()));
}

function timelineSessionStatus(item, now) {
  if (now >= item.end) return "completed";
  if (now >= item.start) return "live";
  return "upcoming";
}

function timelineDeadlineStatus(item, now) {
  return now >= item.due ? "completed" : "upcoming";
}

function updateTimelineSessionState(item, now, nextSession, selectedSession) {
  const status = timelineSessionStatus(item, now);
  const statusText = item.session.querySelector("em");
  const isToday = sameTimelineDay(item.start, now);
  const isNext = item === nextSession;
  const isSelected = item === selectedSession;

  item.session.dataset.timelineStatus = status;
  item.session.classList.toggle("is-live", status === "live");
  item.session.classList.toggle("is-completed", status === "completed");
  item.session.classList.toggle("is-next", isNext);
  item.session.classList.toggle("is-selected", isSelected);
  item.session.setAttribute("aria-pressed", String(isSelected));

  if (statusText) {
    statusText.textContent = status === "live"
      ? "Live now"
      : status === "completed"
        ? "Done"
        : isNext
          ? "Up next"
          : isToday
            ? "Today"
            : "Upcoming";
  }
}

function updateTimelineLiveCard(sessions, selectedSession, now) {
  const label = document.getElementById("timelineLiveLabel");
  const title = document.getElementById("timelineNextTitle");
  const countdown = document.getElementById("timelineCountdown");
  const fill = document.getElementById("timelineProgressFill");
  if (!sessions.length || !label || !title || !countdown || !fill) return;

  const activeSession = sessions.find((item) => now >= item.start && now < item.end);
  const nextSession = sessions.find((item) => item.start > now);
  const previousSession = [...sessions].reverse().find((item) => item.end <= now);
  const displaySession = selectedSession || activeSession || nextSession || previousSession || sessions[0];

  if (selectedSession) {
    label.textContent = "Selected exam";
    title.textContent = `${displaySession.name} · ${displaySession.dateLabel}`;
  } else if (activeSession) {
    label.textContent = "Live now";
    title.textContent = `${displaySession.name} is in progress`;
  } else if (nextSession) {
    label.textContent = "Up next";
    title.textContent = `${displaySession.name} · ${displaySession.dateLabel}`;
  } else {
    label.textContent = "Schedule complete";
    title.textContent = "All regular AP exam sessions are complete.";
  }

  if (now < displaySession.start) {
    countdown.textContent = `${displaySession.timeLabel} local · starts in ${formatTimelineCountdown(displaySession.start - now)}`;
    fill.style.width = "0%";
  } else if (now < displaySession.end) {
    const progress = Math.min(100, Math.max(0, ((now - displaySession.start) / (displaySession.end - displaySession.start)) * 100));
    countdown.textContent = `${displaySession.timeLabel} local · live for ${formatTimelineCountdown(now - displaySession.start)}`;
    fill.style.width = `${progress}%`;
  } else {
    countdown.textContent = `${displaySession.timeLabel} local · completed`;
    fill.style.width = "100%";
  }
}

function updateTimelineDeadlineState(item, now) {
  const status = timelineDeadlineStatus(item, now);
  item.card.dataset.timelineStatus = status;
  item.card.hidden = false;
  item.card.classList.toggle("is-completed", status === "completed");
  item.card.classList.toggle("is-upcoming", status === "upcoming");
}

function applyTimelineFilter(sessions, deadlines, filter, timelineNow, actualNow, timeZone) {
  const empty = document.getElementById("timelineEmpty");
  sessions.forEach((item) => {
    const status = timelineSessionStatus(item, timelineNow);
    const visible = filter === "all"
      || (filter === "upcoming" && status !== "completed")
      || (filter === "completed" && status === "completed")
      || (filter === "today" && sameTimelineDay(item.start, timelineNow));
    item.session.hidden = !visible;
  });

  deadlines.forEach((item) => {
    const status = timelineDeadlineStatus(item, actualNow);
    const deadlineWallTime = wallTimeInTimeZone(item.due, timeZone);
    const visible = filter === "all"
      || (filter === "upcoming" && status !== "completed")
      || (filter === "completed" && status === "completed")
      || (filter === "today" && sameTimelineDay(deadlineWallTime, timelineNow));
    item.card.hidden = !visible;
  });

  const days = [...new Set(sessions.map((item) => item.day).filter(Boolean))];
  days.forEach((day) => {
    day.hidden = !sessions.some((item) => item.day === day && !item.session.hidden);
    day.classList.toggle("is-today", sameTimelineDay(parseTimelineLocalDate(day.dataset.date, 0), timelineNow));
    day.classList.toggle("has-live-session", sessions.some((item) => item.day === day && timelineSessionStatus(item, timelineNow) === "live"));
  });

  const hasVisibleSession = sessions.some((item) => !item.session.hidden);
  const hasVisibleDeadline = deadlines.some((item) => !item.card.hidden);
  if (empty) {
    empty.hidden = hasVisibleSession || hasVisibleDeadline;
    empty.textContent = filter === "today"
      ? "No AP timeline items match today's selected timezone date."
      : "No sessions match this view.";
  }
}

function initTimelineTimezone() {
  const timeline = document.querySelector(".exam-timeline-panel");
  if (!timeline) return;

  let timeZone = getTimelineTimeZone();
  const timezoneSelect = document.getElementById("timelineTimezoneSelect");
  const timeZoneLabel = document.getElementById("timelineTimezone");
  const scheduleCopy = document.getElementById("scheduleTimeCopy");

  if (timezoneSelect) {
    const savedTimeZone = localStorage.getItem(TIMELINE_TIMEZONE_KEY) || "auto";
    timezoneSelect.value = Array.from(timezoneSelect.options).some((option) => option.value === savedTimeZone) ? savedTimeZone : "auto";
  }

  const updateTimezoneCopy = () => {
    timeZone = getTimelineTimeZone();

    if (timeZoneLabel) {
      timeZoneLabel.textContent = timezoneSelect?.value === "auto"
        ? `Auto: ${formatTimeZoneName(timeZone)}`
        : formatTimeZoneName(timeZone);
    }
    if (scheduleCopy) {
      scheduleCopy.textContent = `2026 AP Exams run May 4-15. Regular exams use testing-location local time; fixed digital deadlines are converted to ${timeZone}.`;
    }

    document.querySelectorAll("[data-deadline-utc]").forEach((item) => {
      const converted = formatTimelineDeadline(item.dataset.deadlineUtc, timeZone);
      item.textContent = converted;
      item.title = `Official Eastern Time: ${item.dataset.deadlineEt}`;
      item.setAttribute("aria-label", `${converted}. Official Eastern Time: ${item.dataset.deadlineEt}`);
    });
  };

  document.querySelectorAll("[data-time-local]").forEach((item) => {
    item.textContent = `${item.dataset.timeLocal} local`;
    item.title = "Regular AP Exam start windows are based on the exam testing location.";
  });

  const sessions = collectTimelineSessions(timeline);
  const deadlines = collectTimelineDeadlines(timeline);
  const filters = Array.from(timeline.querySelectorAll("[data-timeline-filter]"));
  let activeFilter = "all";
  let selectedSession = null;

  const refreshTimeline = () => {
    const actualNow = new Date();
    const timelineNow = nowInTimeZone(timeZone);
    const nextSession = sessions.find((item) => item.start > timelineNow);
    sessions.forEach((item) => updateTimelineSessionState(item, timelineNow, nextSession, selectedSession));
    deadlines.forEach((item) => updateTimelineDeadlineState(item, actualNow));
    applyTimelineFilter(sessions, deadlines, activeFilter, timelineNow, actualNow, timeZone);
    updateTimelineLiveCard(sessions, selectedSession, timelineNow);
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.timelineFilter || "all";
      filters.forEach((item) => item.classList.toggle("is-active", item === button));
      selectedSession = null;
      refreshTimeline();
    });
  });

  timezoneSelect?.addEventListener("change", () => {
    localStorage.setItem(TIMELINE_TIMEZONE_KEY, timezoneSelect.value);
    updateTimezoneCopy();
    refreshTimeline();
  });

  sessions.forEach((item) => {
    item.session.addEventListener("click", () => {
      selectedSession = selectedSession === item ? null : item;
      refreshTimeline();
    });
  });

  updateTimezoneCopy();
  refreshTimeline();
  window.setInterval(refreshTimeline, 1000);
}

function renderSubjectCards(sortMode = "az") {
  const grid = document.getElementById("subjectGrid");
  if (!grid || !practiceData?.subjects?.length) return;

  grid.innerHTML = sortedSubjects(sortMode).map((subject) => [
    '<button class="subject-card is-available" type="button" data-subject-card data-subject="' + escapeHomeHtml(subject.title) + '" data-short="' + escapeHomeHtml(subject.short) + '" data-group="' + escapeHomeHtml(subject.group) + '" data-available="true">',
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
  const grid = document.getElementById("subjectGrid");
  const searchInput = document.getElementById("subjectSearch");
  const sortSelect = document.getElementById("subjectSort");
  let cardsArray = [];

  if (!grid || !practiceData?.subjects?.length) return;
  if (sortSelect) {
    sortSelect.value = getSubjectSortMode(localStorage.getItem(SUBJECT_SORT_KEY));
  }

  const subjectKeywords = (card) => normalizeSearch([
    card.dataset.subject,
    card.dataset.short,
    card.querySelector("span")?.textContent,
    card.querySelector("strong")?.textContent
  ].join(" "));

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
    return visibleCards;
  };

  const refreshCards = () => {
    renderSubjectCards(sortSelect?.value || "az");
    cardsArray = Array.from(grid.querySelectorAll("[data-subject-card]"));
    updateSearchResults();
  };

  const selectSubject = (card, options = {}) => {
    const subjectName = card.dataset.subject || fallbackSubject.title;
    const subject = getSubjectByTitle(subjectName) || fallbackSubject;
    const available = card.dataset.available === "true";

    cardsArray.forEach((item) => {
      item.classList.remove("is-selected");
      item.removeAttribute("aria-pressed");
    });

    localStorage.setItem(SELECTED_AP_SUBJECT_KEY, subject.title);
    setPracticeLinksAvailable(available);
    updateModePopoutCopy(subject, available);
    updateHomeProgress();
    if (searchInput && options.openModes) searchInput.blur();
    if (options.openModes) jumpToModeSelection();
  };

  refreshCards();
  if (!cardsArray.length) return;

  const savedSubject = localStorage.getItem(SELECTED_AP_SUBJECT_KEY);
  const availableCard = cardsArray.find((card) => card.dataset.available === "true");
  const initialCard = cardsArray.find((card) => card.dataset.subject === savedSubject) || availableCard || cardsArray[0];
  selectSubject(initialCard);

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-subject-card]");
    if (card) selectSubject(card, { openModes: true });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      localStorage.setItem(SUBJECT_SORT_KEY, getSubjectSortMode(sortSelect.value));
      refreshCards();
    });
  }

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
    document.body.classList.remove("custom-cursor-enabled");
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    document.body.classList.add("ready-modal-open");
    confirm.focus();
  };

  readyLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.dataset.unavailable === "true") {
        event.preventDefault();
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
initTimelineTimezone();
initSubjectPicker();
initModeCards();
initReadyDialog();
