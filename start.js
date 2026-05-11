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

function storageKey(kind, subject = getSelectedSubject(), scope = "") {
  return practiceData?.storageKey?.(kind, subject, scope) || `ap-practice-${subject.slug}-${kind}${scope ? "-" + normalizeSearch(scope).replaceAll(" ", "-") : ""}-state-v1`;
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
  const deadlineRow = document.querySelector(".deadline-row");
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
  if (deadlineRow) deadlineRow.hidden = !hasVisibleDeadline;
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
      timeZoneLabel.textContent = "Timezone";
    }
    if (timezoneSelect) {
      const autoOption = timezoneSelect.querySelector("option[value=\"auto\"]");
      if (autoOption) autoOption.textContent = `Auto (${formatTimeZoneName(timeZone)})`;
    }
    if (scheduleCopy) {
      scheduleCopy.textContent = `2026 AP Exams run May 4-15. Regular exams use testing-location local time; fixed digital deadlines are converted to ${formatTimeZoneName(timeZone)}.`;
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
  const focus = practiceData?.getUnitFilter?.(subject);
  const focusCopy = focus ? ` Focus: ${focus}.` : "";
  const mcqCount = focus && practiceData?.buildMcqQuestions
    ? Math.max(1, practiceData.filterItemsByUnit(practiceData.buildMcqQuestions(subject), focus).length)
    : format.mcqCount;
  const frqCount = focus && practiceData?.buildFrqItems
    ? Math.max(1, practiceData.buildFrqItems(subject, focus).length)
    : format.frqCount;
  const mcqMinutes = focus ? Math.max(5, Math.round(format.mcqMinutes * (mcqCount / format.mcqCount))) : format.mcqMinutes;
  const frqMinutes = focus ? Math.max(10, Math.round(format.frqMinutes * (frqCount / format.frqCount))) : format.frqMinutes;
  const practiceMinutes = focus ? mcqMinutes + frqMinutes : fullTime;

  if (mode === "full") {
    return {
      title: `Ready for ${subject.title} Full Practice?`,
      detail: `You will start with Section I, then move to Section II. Total practice time: ${practiceMinutes} minutes.${focusCopy}`
    };
  }

  if (mode === "mcq") {
    return {
      title: `Ready for ${subject.title} Section I?`,
      detail: `${mcqCount} multiple-choice questions. ${mcqMinutes} minutes. ${mcqWeight} of the exam score.${focusCopy}`
    };
  }

  if (mode === "frq") {
    return {
      title: `Ready for ${subject.title} Section II?`,
      detail: `${frqCount} free-response questions. ${frqMinutes} minutes. ${frqWeight} of the exam score.${focusCopy}`
    };
  }

  return null;
}

function readMcqProgress(subject = getSelectedSubject()) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey("mcq", subject, practiceData?.getUnitFilter?.(subject) || "")) || "{}");
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
    const saved = JSON.parse(localStorage.getItem(storageKey("frq", subject, practiceData?.getUnitFilter?.(subject) || "")) || "{}");
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
    return JSON.parse(localStorage.getItem(storageKey(kind, subject, practiceData?.getUnitFilter?.(subject) || "")) || "{}");
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

  updateStudyDashboard(subject);
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

function formatAttemptDate(isoString) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(new Date(isoString));
  } catch {
    return "Recent";
  }
}

function countSavedFlags(subject = getSelectedSubject()) {
  const mcq = readSectionState("mcq", subject);
  const frq = readSectionState("frq", subject);
  const mcqFlags = Array.isArray(mcq.flagged) ? mcq.flagged.filter(Boolean).length : 0;
  const frqFlags = Array.isArray(frq.flagged) ? frq.flagged.filter(Boolean).length : 0;
  return mcqFlags + frqFlags;
}

function countSavedGuesses(subject = getSelectedSubject()) {
  const mcq = readSectionState("mcq", subject);
  return Array.isArray(mcq.guessed) ? mcq.guessed.filter(Boolean).length : 0;
}

function getFocusedPracticeMeta(subject = getSelectedSubject()) {
  const focus = practiceData?.getUnitFilter?.(subject) || "";
  const format = subject.format;
  const mcqItems = practiceData?.buildMcqQuestions?.(subject) || [];
  const focusedMcq = focus && practiceData?.filterItemsByUnit ? practiceData.filterItemsByUnit(mcqItems, focus) : mcqItems;
  const frqItems = practiceData?.buildFrqItems?.(subject, focus) || [];
  const mcqCount = focus ? Math.max(1, focusedMcq.length) : format.mcqCount;
  const frqCount = focus ? Math.max(1, frqItems.length) : format.frqCount;

  return {
    focus,
    mcqItems: focus ? focusedMcq : mcqItems,
    mcqCount,
    frqCount,
    mcqMinutes: focus ? Math.max(5, Math.round(format.mcqMinutes * (mcqCount / format.mcqCount))) : format.mcqMinutes,
    frqMinutes: focus ? Math.max(10, Math.round(format.frqMinutes * (frqCount / format.frqCount))) : format.frqMinutes
  };
}

function countSavedMisses(subject = getSelectedSubject()) {
  const saved = readSectionState("mcq", subject);
  if (!saved.submitted || !Array.isArray(saved.answers)) return 0;
  const questions = getFocusedPracticeMeta(subject).mcqItems;
  if (!questions.length || questions.length !== saved.answers.length) return 0;
  return questions.reduce((total, question, index) => total + (saved.answers[index] === question.correct ? 0 : 1), 0);
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function formatDashboardItems(count) {
  return count + " item" + (count === 1 ? "" : "s");
}

function updateStudyDashboard(subject = getSelectedSubject()) {
  const meta = getFocusedPracticeMeta(subject);
  const focus = meta.focus;
  const mcq = readMcqProgress(subject);
  const frq = readFrqProgress(subject);
  const history = practiceData?.getScoreHistory?.() || [];
  const subjectHistory = history.filter((item) => item.subjectSlug === subject.slug);
  const focusHistory = focus ? subjectHistory.filter((item) => item.unitFocus === focus) : subjectHistory;
  const rowsSource = focusHistory.length ? focusHistory : subjectHistory;
  const latest = rowsSource[0] || subjectHistory[0] || null;
  const best = subjectHistory.reduce((top, item) => Math.max(top, Number(item.percent) || 0), 0);
  const previous = rowsSource[1] || null;
  const progressTotal = meta.mcqCount + meta.frqCount;
  const progressAnswered = Math.min(progressTotal, mcq.answered + frq.answered);
  const progressPercent = progressTotal ? clampPercent((progressAnswered / progressTotal) * 100) : 0;
  const missed = countSavedMisses(subject);
  const flagged = countSavedFlags(subject);
  const guessed = countSavedGuesses(subject);
  const reviewQueue = missed + flagged + guessed;
  const weakUnit = latest?.weakUnits?.[0] || "";
  const focusEl = document.getElementById("dashboardFocus");
  const subjectEl = document.getElementById("dashboardSubject");
  const summaryEl = document.getElementById("dashboardSummary");
  const ring = document.getElementById("dashboardRing");
  const ringValue = document.getElementById("dashboardRingValue");
  const subjectBadge = document.getElementById("dashboardSubjectBadge");
  const nextStep = document.getElementById("dashboardNextStep");
  const nextMeta = document.getElementById("dashboardNextMeta");
  const overallBar = document.getElementById("dashboardOverallBar");
  const resumeLink = document.getElementById("dashboardResumeLink") || document.querySelector("[data-resume-link]");
  const mcqEl = document.getElementById("dashboardMcqProgress");
  const mcqHint = document.getElementById("dashboardMcqHint");
  const frqEl = document.getElementById("dashboardFrqProgress");
  const frqHint = document.getElementById("dashboardFrqHint");
  const scoreEl = document.getElementById("dashboardLastScore");
  const scoreMeta = document.getElementById("dashboardLastScoreMeta");
  const reviewEl = document.getElementById("dashboardReviewQueue");
  const reviewHint = document.getElementById("dashboardReviewHint");
  const weakEl = document.getElementById("dashboardWeakUnit");
  const weakMeta = document.getElementById("dashboardWeakMeta");
  const historyList = document.getElementById("scoreHistoryList");

  if (summaryEl) {
    summaryEl.textContent = focus
      ? `${subject.title} · focused practice for ${focus}.`
      : `${subject.title} · all units.`;
  }
  if (focusEl) focusEl.textContent = focus || "All units";
  if (subjectEl) subjectEl.textContent = subject.title;
  if (subjectBadge) subjectBadge.textContent = subject.short || subject.title;
  if (ring) ring.style.setProperty("--dashboard-progress", progressPercent + "%");
  if (ringValue) ringValue.textContent = progressPercent + "%";
  if (overallBar) overallBar.style.width = progressPercent + "%";
  if (mcqEl) {
    mcqEl.textContent = `${Math.min(mcq.answered, meta.mcqCount)} / ${meta.mcqCount}`;
  }
  if (mcqHint) {
    mcqHint.textContent = mcq.submitted
      ? "Submitted. Review is open."
      : mcq.answered
        ? "Resume Section I."
        : `${meta.mcqMinutes} minutes.`;
  }
  if (frqEl) {
    frqEl.textContent = `${Math.min(frq.answered, meta.frqCount)} / ${meta.frqCount}`;
  }
  if (frqHint) {
    frqHint.textContent = frq.submitted
      ? "Submitted. Rubric review is open."
      : frq.answered
        ? "Resume Section II."
        : `${meta.frqMinutes} minutes.`;
  }
  if (nextStep && nextMeta && resumeLink) {
    if (!mcq.submitted) {
      resumeLink.href = "mcq.html";
      resumeLink.textContent = mcq.answered ? "Resume MCQ" : "Start MCQ";
      nextStep.textContent = mcq.answered ? "Continue Section I." : "Start Section I.";
      nextMeta.textContent = `${Math.min(mcq.answered, meta.mcqCount)} of ${meta.mcqCount} MCQs answered${focus ? " for " + focus : ""}.`;
    } else if (!frq.submitted) {
      resumeLink.href = "frq.html";
      resumeLink.textContent = frq.answered ? "Resume FRQ" : "Start FRQ";
      nextStep.textContent = frq.answered ? "Continue Section II." : "Move to Section II.";
      nextMeta.textContent = `${Math.min(frq.answered, meta.frqCount)} of ${meta.frqCount} FRQs started${focus ? " for " + focus : ""}.`;
    } else {
      resumeLink.href = "mcq.html";
      resumeLink.textContent = "Review";
      nextStep.textContent = "Review submitted work.";
      nextMeta.textContent = "Both sections have submitted work saved locally.";
    }
  }
  if (latest && scoreEl && scoreMeta) {
    scoreEl.textContent = `${Math.round(latest.percent)}%`;
    scoreMeta.textContent = `${latest.mode} · ${formatAttemptDate(latest.date)}${best ? " · best " + Math.round(best) + "%" : ""}`;
    if (previous) {
      const delta = Math.round((Number(latest.percent) || 0) - (Number(previous.percent) || 0));
      if (delta !== 0) scoreMeta.textContent += ` · ${delta > 0 ? "+" : ""}${delta} pts`;
    }
  } else {
    if (scoreEl) scoreEl.textContent = "--";
    if (scoreMeta) scoreMeta.textContent = "Submit a section to track scores.";
  }
  if (reviewEl) reviewEl.textContent = formatDashboardItems(reviewQueue);
  if (reviewHint) {
    reviewHint.textContent = reviewQueue
      ? `${missed} missed · ${flagged} flagged · ${guessed} guessed`
      : "Missed, flagged, and guessed items appear here.";
  }
  if (weakEl) {
    weakEl.textContent = weakUnit || "No data yet";
  }
  if (weakMeta) {
    weakMeta.textContent = weakUnit
      ? `Based on the latest ${latest?.mode || "practice"} attempt.`
      : "Submit MCQ or FRQ to identify priority units.";
  }
  if (historyList) {
    const rows = (rowsSource.length ? rowsSource : history).slice(0, 4);
    historyList.innerHTML = rows.length
      ? rows.map((item) => '<li><strong>' + escapeHomeHtml(item.subjectShort || item.subjectTitle || "AP") + ' ' + escapeHomeHtml(item.mode || "Practice") + '</strong><span>' + Math.round(Number(item.percent) || 0) + '% · ' + escapeHomeHtml(item.unitFocus || "All units") + '</span><em>' + escapeHomeHtml(formatAttemptDate(item.date)) + '</em></li>').join("")
      : '<li><strong>No attempts yet</strong><span>Submit MCQ or FRQ to build history.</span></li>';
  }
}

function updateModePopoutCopy(subject, available = true) {
  const subjectObject = typeof subject === "string" ? getSubjectByTitle(subject) || getSelectedSubject() : subject;
  const format = subjectObject.format;
  const subjectName = document.getElementById("modePopoutSubject");
  const status = document.getElementById("modePopoutStatus");
  const fullCard = document.querySelector("[data-mode=\"full\"]");
  const mcqCard = document.querySelector("[data-mode=\"mcq\"]");
  const frqCard = document.querySelector("[data-mode=\"frq\"]");
  const unitSelect = document.getElementById("unitFocusSelect");
  const officialLinks = practiceData?.officialLinksForSubject?.(subjectObject);
  const studentsLink = document.getElementById("officialStudentsLink");
  const centralLink = document.getElementById("officialCentralLink");

  if (subjectName) subjectName.textContent = subjectObject.title;
  if (unitSelect) {
    const currentUnit = practiceData?.getUnitFilter?.(subjectObject) || "";
    unitSelect.innerHTML = '<option value="">All units</option>' + subjectObject.units.map((unit) =>
      '<option value="' + escapeHomeHtml(unit) + '">' + escapeHomeHtml(unit) + '</option>'
    ).join("");
    unitSelect.value = currentUnit;
  }

  if (studentsLink && officialLinks) studentsLink.href = officialLinks.students;
  if (centralLink && officialLinks) centralLink.href = officialLinks.central;

  const currentFocus = practiceData?.getUnitFilter?.(subjectObject) || "";
  const mcqCount = currentFocus && practiceData?.buildMcqQuestions
    ? Math.max(1, practiceData.filterItemsByUnit(practiceData.buildMcqQuestions(subjectObject), currentFocus).length)
    : format.mcqCount;
  const frqCount = currentFocus && practiceData?.buildFrqItems
    ? Math.max(1, practiceData.buildFrqItems(subjectObject, currentFocus).length)
    : format.frqCount;
  const mcqMinutes = currentFocus ? Math.max(5, Math.round(format.mcqMinutes * (mcqCount / format.mcqCount))) : format.mcqMinutes;
  const frqMinutes = currentFocus ? Math.max(10, Math.round(format.frqMinutes * (frqCount / format.frqCount))) : format.frqMinutes;

  if (status) {
    status.textContent = available
      ? `${format.note || "Practice made by Alan."}${currentFocus ? " Focus: " + currentFocus + "." : ""}`
      : "Practice for this subject is coming soon.";
  }

  if (fullCard) {
    fullCard.querySelector("strong").textContent = `${currentFocus ? mcqMinutes + frqMinutes : totalMinutes(format)} min`;
    fullCard.querySelector("span:last-child").textContent = `${mcqCount} MCQ + ${frqCount} FRQ`;
  }

  if (mcqCard) {
    mcqCard.querySelector("strong").textContent = `${mcqCount} MCQ`;
    mcqCard.querySelector("span:last-child").textContent = `${mcqMinutes} min · ${formatWeight(format.mcqWeight)}`;
  }

  if (frqCard) {
    frqCard.querySelector("strong").textContent = `${frqCount} FRQ`;
    frqCard.querySelector("span:last-child").textContent = `${frqMinutes} min · ${formatWeight(format.frqWeight)}`;
  }
}

function updateFullPracticePage(subject = getSelectedSubject()) {
  if (!document.querySelector(".path-page")) return;
  const format = subject.format;
  const focus = practiceData?.getUnitFilter?.(subject) || "";
  const mcqCount = focus && practiceData?.buildMcqQuestions
    ? Math.max(1, practiceData.filterItemsByUnit(practiceData.buildMcqQuestions(subject), focus).length)
    : format.mcqCount;
  const frqCount = focus && practiceData?.buildFrqItems
    ? Math.max(1, practiceData.buildFrqItems(subject, focus).length)
    : format.frqCount;
  const mcqMinutes = focus ? Math.max(5, Math.round(format.mcqMinutes * (mcqCount / format.mcqCount))) : format.mcqMinutes;
  const frqMinutes = focus ? Math.max(10, Math.round(format.frqMinutes * (frqCount / format.frqCount))) : format.frqMinutes;
  const practiceMinutes = focus ? mcqMinutes + frqMinutes : totalMinutes(format);
  const topbarMeta = document.querySelector(".topbar .brand-block p");
  const pathHeroTitle = document.querySelector(".path-hero h2");
  const pathHeroCopy = document.querySelector(".path-hero p");
  const pathTotal = document.querySelector(".path-total strong");
  const pathCards = document.querySelectorAll(".path-card");

  document.title = `AP Exam Practice | ${subject.title} Full Practice`;
  if (topbarMeta) topbarMeta.textContent = `${subject.title} · MCQ, then FRQ`;
  if (pathHeroTitle) pathHeroTitle.textContent = `${subject.short} full practice.`;
  if (pathHeroCopy) pathHeroCopy.textContent = `Start with ${mcqCount} MCQ, then complete ${frqCount} FRQ. Auto-saved.${focus ? " Focus: " + focus + "." : ""}`;
  if (pathTotal) pathTotal.textContent = `${practiceMinutes} min`;

  if (pathCards[0]) {
    pathCards[0].querySelector("p").textContent = `${mcqCount} questions. ${mcqMinutes} minutes. ${formatWeight(format.mcqWeight)}.`;
  }
  if (pathCards[1]) {
    pathCards[1].querySelector("p").textContent = `${frqCount} questions. ${frqMinutes} minutes. ${formatWeight(format.frqWeight)}.`;
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
  const unitSelect = document.getElementById("unitFocusSelect");
  const dashboardChooseBtn = document.getElementById("dashboardChooseBtn");
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

  if (unitSelect) {
    unitSelect.addEventListener("change", () => {
      const subject = getSelectedSubject();
      practiceData?.setUnitFilter?.(subject, unitSelect.value);
      updateModePopoutCopy(subject, true);
      updateHomeProgress();
    });
  }

  dashboardChooseBtn?.addEventListener("click", () => {
    updateModePopoutCopy(getSelectedSubject(), true);
    jumpToModeSelection();
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
