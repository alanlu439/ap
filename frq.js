const practiceData = window.APPracticeData;
const selectedPracticeSubject = practiceData?.getSelectedSubject?.() || {
  title: "AP Statistics",
  short: "AP Statistics",
  slug: "ap-statistics",
  format: { mcqCount: 40, mcqMinutes: 90, frqCount: 6, frqMinutes: 90, mcqWeight: 50, frqWeight: 50, fullMinutes: 180 }
};
const FRQ_SECONDS = selectedPracticeSubject.format.frqMinutes * 60;
const FRQ_STORAGE_KEY = practiceData?.storageKey?.("frq", selectedPracticeSubject) || "ap-practice-" + selectedPracticeSubject.slug + "-frq-state-v1";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatText(value) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

const statsFrqItems = [
  {
    id: 1,
    title: "Focus on Collecting Data",
    maxPoints: 4,
    stimulus: "A school wants to know whether using a phone-free study room improves quiz performance. Eighty students volunteer for a two-week study program. Half will study in a phone-free room and half will study in a regular study room. At the end of two weeks, all students take the same statistics quiz.",
    parts: [
      {
        label: "(a) Identify the experimental units, treatments, and response variable.",
        criteria: [
          { label: "Identifies students or volunteers as experimental units", groups: [["student", "volunteer", "participant"]] },
          { label: "Identifies both study-room treatments", groups: [["phone-free", "phone free", "no phone"], ["regular", "normal", "standard"]] },
          { label: "Identifies quiz score or quiz performance as the response", groups: [["quiz score", "performance", "score", "result"]] }
        ]
      },
      {
        label: "(b) Describe a randomized comparative design for this experiment.",
        criteria: [
          { label: "Uses random assignment to treatment groups", groups: [["randomly assign", "random assignment", "randomly assigned", "randomize"]] }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Focus on Exploring Data",
    maxPoints: 4,
    stimulus: "Two AP Statistics classes took the same 20-point quiz. Class A: median 14, IQR 4, minimum 6, maximum 20. Class B: median 16, IQR 2, minimum 12, maximum 20.",
    parts: [
      {
        label: "(a) Compare the centers and variabilities of the two quiz-score distributions.",
        criteria: [
          { label: "Compares medians and names Class B as higher", groups: [["median", "center"], ["class b", "b"], ["higher", "larger", "greater", "16"]] },
          { label: "Compares IQRs and names Class A as more variable", groups: [["iqr", "middle 50", "spread", "variability"], ["class a", "a"], ["larger", "greater", "more variable", "4"]] }
        ]
      },
      {
        label: "(b) A student says Class B definitely learned more because its median was higher. Explain a limitation of that claim.",
        criteria: [
          { label: "Notes that the comparison alone does not prove greater learning", groups: [["not prove", "cannot prove", "does not prove", "not necessarily", "insufficient"], ["learning", "learned more", "cause", "causation"]] },
          { label: "Mentions a relevant missing context such as prior ability, teacher, randomness, or sample design", groups: [["prior", "before", "teacher", "random", "assignment", "sample", "confounding", "different students"]] }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Focus on Probability and Sampling Distributions",
    maxPoints: 4,
    stimulus: "A filling machine overfills a bag 8% of the time. Assume fills are independent. A quality-control worker inspects 20 bags.",
    parts: [
      {
        label: "(a) Let X be the number of overfilled bags among the 20. Identify the distribution of X and its parameters.",
        criteria: [
          { label: "Identifies a binomial setting", groups: [["binomial"]] },
          { label: "States n = 20 and p = 0.08", groups: [["20"], ["0.08", "8%"]] }
        ]
      },
      {
        label: "(b) Find P(X = 2).",
        criteria: [
          { label: "Gives an appropriate probability calculation or value near 0.271", groups: [["0.27", "0.271", "0.270", "27.1", "20 choose 2", "c(20,2)", "binompdf"]] }
        ]
      },
      {
        label: "(c) Find the mean and standard deviation of X.",
        criteria: [
          { label: "Gives mean 1.6 and standard deviation about 1.21", groups: [["1.6"], ["1.21", "1.2", "sqrt", "1.213"]] }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Focus on Inference",
    maxPoints: 4,
    stimulus: "A random sample of 200 voters in a city finds that 120 support a new transit plan. A researcher tests H0: p = 0.50 versus Ha: p > 0.50, where p is the true proportion of all city voters who support the plan.",
    parts: [
      {
        label: "(a) Check the conditions for a one-sample z test for a proportion.",
        criteria: [
          { label: "Mentions random sampling or independence", groups: [["random", "independent", "10%"]] },
          { label: "Checks large counts using the null value", groups: [["200(0.5)", "100", "large counts", "success", "failure", "at least 10"]] }
        ]
      },
      {
        label: "(b) Compute the test statistic and p-value.",
        criteria: [
          { label: "Gives z about 2.83 and p-value about 0.002", groups: [["2.83", "2.828", "2.8"], ["0.002", "0.0023", "0.003"]] }
        ]
      },
      {
        label: "(c) State the conclusion in context at alpha = 0.05.",
        criteria: [
          { label: "Rejects H0 and concludes convincing evidence of majority support", groups: [["reject"], ["convincing", "evidence", "support"], ["greater than 0.5", "more than half", "majority", "p > 0.5"]] }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Multi-Focus Question",
    maxPoints: 4,
    stimulus: "A delivery company records wait times for 64 randomly selected lunch deliveries. The sample mean wait time is 18.2 minutes, and the sample standard deviation is 4.8 minutes. The company advertises that the mean lunch wait time is 17 minutes.",
    parts: [
      {
        label: "(a) Explain why a t procedure is appropriate instead of a z procedure.",
        criteria: [
          { label: "Notes population standard deviation is unknown and s is used", groups: [["population standard deviation", "sigma", "unknown"], ["sample standard deviation", "s", "4.8", "t"]] }
        ]
      },
      {
        label: "(b) Compute the test statistic for H0: mu = 17 versus Ha: mu > 17.",
        criteria: [
          { label: "Gives t = 2.00 or equivalent setup", groups: [["2.00", "2", "(18.2-17)", "18.2 - 17"]] }
        ]
      },
      {
        label: "(c) The one-sided p-value is about 0.025. Interpret it in context.",
        criteria: [
          { label: "Interprets p-value assuming mean wait is 17", groups: [["if", "assuming"], ["17"], ["probability", "chance"], ["18.2", "larger", "greater"]] }
        ]
      },
      {
        label: "(d) State whether the result is practically important, not just statistically significant.",
        criteria: [
          { label: "Distinguishes statistical significance from practical importance using the 1.2-minute difference", groups: [["practical", "important", "meaningful"], ["1.2", "minute", "difference"]] }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Investigative Task",
    maxPoints: 4,
    stimulus: "A company tests a new sensor that flags produce boxes as possibly underweight. Under the old process, 6% of boxes were underweight. In a pilot day with the new sensor, 9 of 80 boxes were flagged and confirmed underweight. The operations team asks whether the sensor data suggest an underweight rate above the old 6% rate.",
    parts: [
      {
        label: "(a) Describe a simulation for estimating how surprising 9 or more underweight boxes would be if the true rate were still 6%.",
        criteria: [
          { label: "Simulates 80 boxes with probability 0.06 under the null", groups: [["simulate", "simulation", "random"], ["80"], ["0.06", "6%"]] }
        ]
      },
      {
        label: "(b) The simulation finds that 9 or more underweight boxes occurs in about 6.5% of trials. Interpret this result.",
        criteria: [
          { label: "Interprets the simulated p-value in context", groups: [["6.5", "0.065"], ["if", "assuming"], ["6%", "0.06"], ["9 or more", "at least 9"]] }
        ]
      },
      {
        label: "(c) At alpha = 0.05, what should the team conclude?",
        criteria: [
          { label: "Fails to reject and avoids claiming convincing evidence above 6%", groups: [["fail to reject", "do not reject", "not reject"], ["not convincing", "insufficient", "not enough"], ["above", "greater", "more than", "6%"]] }
        ]
      },
      {
        label: "(d) Name one reason the pilot day might not generalize to all production days.",
        criteria: [
          { label: "Gives a relevant generalizability limitation", groups: [["one day", "single day", "pilot"], ["not random", "representative", "machine", "shift", "season", "sample"]] }
        ]
      }
    ]
  }
];

const frqItems = selectedPracticeSubject.title === "AP Statistics"
  ? statsFrqItems
  : practiceData?.buildFrqItems?.(selectedPracticeSubject) || statsFrqItems;

let frqState = loadFrqState();
let frqTimerHandle = null;
let activeFrqIndex = 0;

const frqEls = {
  timer: document.getElementById("frqTimer"),
  answered: document.getElementById("frqAnswered"),
  score: document.getElementById("frqScore"),
  start: document.getElementById("frqStartBtn"),
  submit: document.getElementById("frqSubmitBtn"),
  jump: document.getElementById("frqJumpBtn"),
  reset: document.getElementById("frqResetBtn"),
  progressBar: document.getElementById("frqProgressBar"),
  saveStatus: document.getElementById("frqSaveStatus"),
  railText: document.getElementById("frqRailText"),
  nav: document.getElementById("frqNav"),
  list: document.getElementById("frqList"),
  summary: document.getElementById("frqSummary"),
  summaryTitle: document.getElementById("frqSummaryTitle"),
  summaryText: document.getElementById("frqSummaryText"),
  results: document.getElementById("frqResults")
};

function defaultFrqState() {
  return {
    answers: frqItems.map((item) => item.parts.map(() => "")),
    started: false,
    submitted: false,
    remaining: FRQ_SECONDS,
    lastTick: null,
    results: null
  };
}

function loadFrqState() {
  try {
    const raw = localStorage.getItem(FRQ_STORAGE_KEY);
    if (!raw) return defaultFrqState();
    const saved = JSON.parse(raw);
    if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== frqItems.length) {
      return defaultFrqState();
    }
    return { ...defaultFrqState(), ...saved };
  } catch {
    return defaultFrqState();
  }
}

function saveFrqState() {
  localStorage.setItem(FRQ_STORAGE_KEY, JSON.stringify(frqState));
}

function normalizeAnswer(value) {
  return String(value)
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function criterionMet(text, criterion) {
  return criterion.groups.every((group) => group.some((term) => text.includes(term.toLowerCase())));
}

function gradeFrqItem(item, answers) {
  const feedback = [];
  let score = 0;

  item.parts.forEach((part, partIndex) => {
    const text = normalizeAnswer(answers[partIndex] || "");
    part.criteria.forEach((criterion) => {
      const met = criterionMet(text, criterion);
      if (met) score += 1;
      feedback.push({
        met,
        label: `${part.label.split(")")[0]}) ${criterion.label}`
      });
    });
  });

  return {
    id: item.id,
    title: item.title,
    score: Math.min(score, item.maxPoints),
    maxPoints: item.maxPoints,
    feedback
  };
}

function gradeAllFrqs() {
  return frqItems.map((item, index) => gradeFrqItem(item, frqState.answers[index]));
}

function formatFrqTime(seconds) {
  const clamped = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function applyFrqSubjectChrome() {
  const format = selectedPracticeSubject.format;
  const weight = practiceData?.formatWeight?.(format.frqWeight) || format.frqWeight + "%";
  const topbarTitle = document.querySelector(".topbar h1");
  const topbarMeta = document.querySelector(".topbar .brand-block p");
  const headerTitle = document.querySelector(".frq-header h2");
  const headerCopy = document.querySelector(".frq-header p");

  document.title = "AP Exam Practice | " + selectedPracticeSubject.title + " FRQ";
  if (topbarTitle) topbarTitle.textContent = selectedPracticeSubject.short + " FRQ";
  if (topbarMeta) topbarMeta.textContent = format.frqCount + " questions · " + format.frqMinutes + " minutes · " + weight;
  if (headerTitle) headerTitle.textContent = "Free Response";
  if (headerCopy) headerCopy.textContent = format.frqCount + " prompts. Rubric estimate after submit. " + (format.note || "");
}

function isFrqAnswered(index) {
  return frqState.answers[index].some((answer) => answer.trim().length > 0);
}

function getFrqAnsweredCount() {
  return frqState.answers.filter((_, index) => isFrqAnswered(index)).length;
}

function getFrqTotalMax() {
  return frqItems.reduce((sum, item) => sum + item.maxPoints, 0);
}

function getFrqTotalScore() {
  return frqState.results ? frqState.results.reduce((sum, result) => sum + result.score, 0) : null;
}

function wordCount(value) {
  const matches = String(value).trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

function formatWordCount(value) {
  const count = wordCount(value);
  return `${count} word${count === 1 ? "" : "s"}`;
}

function setFrqSaveStatus(text) {
  if (frqEls.saveStatus) frqEls.saveStatus.textContent = text;
}

function updateFrqWordCount(itemIndex, partIndex) {
  const count = document.getElementById(`frq-words-${itemIndex}-${partIndex}`);
  if (count) count.textContent = formatWordCount(frqState.answers[itemIndex][partIndex] || "");
}

function setActiveFrq(index) {
  activeFrqIndex = Math.max(0, Math.min(frqItems.length - 1, index));
  renderFrqStatusOnly();
}

function scrollToFrq(index, focus = false) {
  setActiveFrq(index);
  const card = document.getElementById(`frq-card-${activeFrqIndex}`);
  if (!card) return;

  card.scrollIntoView({ behavior: "smooth", block: "start" });
  if (focus && !frqState.submitted) {
    const firstField = card.querySelector("textarea");
    if (firstField) {
      window.setTimeout(() => firstField.focus({ preventScroll: true }), 160);
    }
  }
}

function jumpToNextBlank() {
  const firstBlank = frqState.answers.findIndex((_, index) => !isFrqAnswered(index));
  if (firstBlank >= 0 && !frqState.submitted) {
    scrollToFrq(firstBlank, true);
    return;
  }

  if (frqState.submitted && frqEls.summary) {
    frqEls.summary.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  frqEls.submit.focus();
}

function renderFrqNav() {
  if (!frqEls.nav) return;

  frqEls.nav.innerHTML = frqItems.map((item, index) => {
    const classes = ["frq-nav-dot"];
    if (index === activeFrqIndex) classes.push("current");
    if (isFrqAnswered(index)) classes.push("answered");
    if (frqState.submitted) classes.push("graded");

    return `
      <button class="${classes.join(" ")}" type="button" data-frq-index="${index}" ${index === activeFrqIndex ? 'aria-current="true"' : ""} aria-label="Question ${item.id}">
        ${item.id}
      </button>
    `;
  }).join("");

  frqEls.nav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => scrollToFrq(Number(button.dataset.frqIndex), true));
  });
}

function updateFrqNavState() {
  if (!frqEls.nav) return;

  frqEls.nav.querySelectorAll("button").forEach((button) => {
    const index = Number(button.dataset.frqIndex);
    button.classList.toggle("current", index === activeFrqIndex);
    button.classList.toggle("answered", isFrqAnswered(index));
    button.classList.toggle("graded", frqState.submitted);
    if (index === activeFrqIndex) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function renderFrqs() {
  const answeredCount = getFrqAnsweredCount();
  const totalScore = getFrqTotalScore();
  const totalMax = getFrqTotalMax();

  frqEls.timer.textContent = formatFrqTime(frqState.remaining);
  frqEls.answered.textContent = `${answeredCount} / ${frqItems.length}`;
  frqEls.score.textContent = frqState.submitted ? `${totalScore} / ${totalMax}` : "--";
  frqEls.start.textContent = frqState.submitted ? "Review Done" : frqState.started ? "Pause Timer" : "Start Timer";
  frqEls.start.disabled = frqState.submitted;
  frqEls.submit.disabled = frqState.submitted;
  frqEls.jump.textContent = frqState.submitted || answeredCount === frqItems.length ? "Review" : "Next Blank";

  frqEls.list.innerHTML = frqItems.map((item, itemIndex) => `
    <article class="frq-card${frqState.submitted ? " is-graded" : ""}" id="frq-card-${itemIndex}" data-frq-index="${itemIndex}">
      <div class="frq-card-header">
        <h3>Question ${item.id}: ${escapeHtml(item.title)}</h3>
        <span>${item.maxPoints} rubric points</span>
      </div>
      <div class="frq-stimulus">${formatText(item.stimulus)}</div>
      ${item.parts.map((part, partIndex) => `
        <div class="frq-part">
          <label for="frq-${itemIndex}-${partIndex}">${escapeHtml(part.label)}</label>
          <textarea id="frq-${itemIndex}-${partIndex}" data-item="${itemIndex}" data-part="${partIndex}" ${frqState.submitted ? "disabled" : ""}>${escapeHtml(frqState.answers[itemIndex][partIndex] || "")}</textarea>
          <div class="frq-part-meta" id="frq-words-${itemIndex}-${partIndex}">${formatWordCount(frqState.answers[itemIndex][partIndex] || "")}</div>
        </div>
      `).join("")}
    </article>
  `).join("");

  frqEls.list.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("focus", (event) => {
      setActiveFrq(Number(event.target.dataset.item));
    });

    textarea.addEventListener("input", (event) => {
      const itemIndex = Number(event.target.dataset.item);
      const partIndex = Number(event.target.dataset.part);
      activeFrqIndex = itemIndex;
      frqState.answers[itemIndex][partIndex] = event.target.value;
      if (!frqState.started && frqState.remaining === FRQ_SECONDS) startFrqTimer();
      updateFrqWordCount(itemIndex, partIndex);
      saveFrqState();
      setFrqSaveStatus("Saved");
      renderFrqStatusOnly();
    });
  });

  renderFrqNav();
  renderFrqStatusOnly();
  renderFrqSummary(totalScore, totalMax);
  saveFrqState();
}

function renderFrqStatusOnly() {
  const answeredCount = getFrqAnsweredCount();
  const totalScore = getFrqTotalScore();
  const totalMax = getFrqTotalMax();

  frqEls.timer.textContent = formatFrqTime(frqState.remaining);
  frqEls.answered.textContent = `${answeredCount} / ${frqItems.length}`;
  frqEls.score.textContent = frqState.submitted ? `${totalScore} / ${totalMax}` : "--";
  frqEls.start.textContent = frqState.submitted ? "Review Done" : frqState.started ? "Pause Timer" : "Start Timer";
  frqEls.start.disabled = frqState.submitted;
  frqEls.submit.disabled = frqState.submitted;
  frqEls.jump.textContent = frqState.submitted || answeredCount === frqItems.length ? "Review" : "Next Blank";
  if (frqEls.progressBar) {
    frqEls.progressBar.style.width = `${(answeredCount / frqItems.length) * 100}%`;
  }
  if (frqEls.railText) {
    frqEls.railText.textContent = `${answeredCount} / ${frqItems.length}`;
  }
  setFrqSaveStatus(frqState.submitted ? "Graded" : "Saved");
  updateFrqNavState();
}

function renderFrqSummary(totalScore, totalMax) {
  if (!frqState.submitted || !frqState.results) {
    frqEls.summary.hidden = true;
    frqEls.results.innerHTML = "";
    return;
  }

  frqEls.summary.hidden = false;
  frqEls.summaryTitle.textContent = `Estimated score: ${totalScore} / ${totalMax}`;
  frqEls.summaryText.textContent = "Local rubric estimate. Official AP scoring may differ.";
  frqEls.results.innerHTML = frqState.results.map((result) => `
    <div class="frq-result">
      <strong>Question ${result.id}: ${escapeHtml(result.title)} - ${result.score} / ${result.maxPoints}</strong>
      <ul>
        ${result.feedback.map((item) => `<li>${item.met ? "Met" : "Missing"}: ${escapeHtml(item.label)}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

function startFrqTimer() {
  if (frqState.submitted) return;
  frqState.started = true;
  frqState.lastTick = Date.now();
  runFrqTimer();
}

function pauseFrqTimer() {
  updateFrqRemainingFromClock();
  frqState.started = false;
  frqState.lastTick = null;
  stopFrqTimer();
}

function runFrqTimer() {
  stopFrqTimer();
  frqTimerHandle = window.setInterval(() => {
    if (!frqState.started || frqState.submitted) return;
    updateFrqRemainingFromClock();
    if (frqState.remaining <= 0) {
      frqState.remaining = 0;
      submitFrqs(true);
      return;
    }
    frqEls.timer.textContent = formatFrqTime(frqState.remaining);
    saveFrqState();
  }, 1000);
}

function stopFrqTimer() {
  if (frqTimerHandle) {
    window.clearInterval(frqTimerHandle);
    frqTimerHandle = null;
  }
}

function updateFrqRemainingFromClock() {
  if (!frqState.started || !frqState.lastTick) return;
  const now = Date.now();
  const elapsed = Math.floor((now - frqState.lastTick) / 1000);
  if (elapsed > 0) {
    frqState.remaining = Math.max(0, frqState.remaining - elapsed);
    frqState.lastTick = now;
  }
}

function reconcileLoadedFrqTimer() {
  if (!frqState.started || frqState.submitted) return;
  updateFrqRemainingFromClock();
  if (frqState.remaining <= 0) {
    frqState.remaining = 0;
    frqState.started = false;
    frqState.submitted = true;
    frqState.results = gradeAllFrqs();
    frqState.lastTick = null;
    stopFrqTimer();
  } else {
    frqState.lastTick = Date.now();
  }
}

function submitFrqs(auto = false) {
  if (frqState.submitted) return;
  const unanswered = frqState.answers.filter((answers) => !answers.some((answer) => answer.trim())).length;
  if (!auto && unanswered > 0) {
    const proceed = window.confirm(`You have ${unanswered} FRQ question${unanswered === 1 ? "" : "s"} with no response. Submit and auto grade anyway?`);
    if (!proceed) return;
  }

  updateFrqRemainingFromClock();
  frqState.results = gradeAllFrqs();
  frqState.started = false;
  frqState.submitted = true;
  frqState.lastTick = null;
  stopFrqTimer();
  renderFrqs();
}

function resetFrqs() {
  const proceed = window.confirm("Clear all FRQ responses and grading?");
  if (!proceed) return;
  frqState = defaultFrqState();
  activeFrqIndex = 0;
  stopFrqTimer();
  localStorage.removeItem(FRQ_STORAGE_KEY);
  renderFrqs();
}

frqEls.start.addEventListener("click", () => {
  if (frqState.started) {
    pauseFrqTimer();
  } else {
    startFrqTimer();
  }
  renderFrqs();
});

frqEls.submit.addEventListener("click", () => submitFrqs(false));
frqEls.jump.addEventListener("click", jumpToNextBlank);
frqEls.reset.addEventListener("click", resetFrqs);

reconcileLoadedFrqTimer();

if (frqState.started && !frqState.submitted) runFrqTimer();

applyFrqSubjectChrome();
renderFrqs();
