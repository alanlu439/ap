(function () {
  const SELECTED_AP_SUBJECT_KEY = "ap-practice-selected-subject-v1";
  const DEFAULT_FORMAT = {
    mcqCount: 40,
    mcqMinutes: 90,
    frqCount: 6,
    frqMinutes: 90,
    mcqWeight: 50,
    frqWeight: 50,
    fullMinutes: 180,
    note: "Practice made by Alan."
  };

  const EXAM_FORMATS = {
    "AP Biology": { mcqCount: 60, mcqMinutes: 90, frqCount: 6, frqMinutes: 90, mcqWeight: 50, frqWeight: 50, fullMinutes: 180, note: "2 long-response and 4 short-response questions." },
    "AP Calculus AB": { mcqCount: 45, mcqMinutes: 105, frqCount: 6, frqMinutes: 90, mcqWeight: 50, frqWeight: 50, fullMinutes: 195, note: "Calculator and no-calculator parts are combined here." },
    "AP Calculus BC": { mcqCount: 45, mcqMinutes: 105, frqCount: 6, frqMinutes: 90, mcqWeight: 50, frqWeight: 50, fullMinutes: 195, note: "Calculator and no-calculator parts are combined here." },
    "AP Chemistry": { mcqCount: 60, mcqMinutes: 90, frqCount: 7, frqMinutes: 105, mcqWeight: 50, frqWeight: 50, fullMinutes: 195, note: "3 long-answer and 4 short-answer questions." },
    "AP Computer Science A": { mcqCount: 42, mcqMinutes: 90, frqCount: 4, frqMinutes: 90, mcqWeight: 55, frqWeight: 45, fullMinutes: 180, note: "Fully digital exam." },
    "AP Computer Science Principles": { mcqCount: 70, mcqMinutes: 120, frqCount: 2, frqMinutes: 60, mcqWeight: 70, frqWeight: 30, fullMinutes: 180, note: "Includes Create performance task plus exam-day written response." },
    "AP English Language and Composition": { mcqCount: 45, mcqMinutes: 60, frqCount: 3, frqMinutes: 135, mcqWeight: 45, frqWeight: 55, fullMinutes: 195, note: "FRQ time includes the 15-minute reading period." },
    "AP English Literature and Composition": { mcqCount: 55, mcqMinutes: 60, frqCount: 3, frqMinutes: 120, mcqWeight: 45, frqWeight: 55, fullMinutes: 180, note: "Three essay-style free-response questions." },
    "AP Environmental Science": { mcqCount: 80, mcqMinutes: 90, frqCount: 3, frqMinutes: 70, mcqWeight: 60, frqWeight: 40, fullMinutes: 160, note: "Fully digital exam." },
    "AP Human Geography": { mcqCount: 60, mcqMinutes: 60, frqCount: 3, frqMinutes: 75, mcqWeight: 50, frqWeight: 50, fullMinutes: 135, note: "FRQ prompts use geographic situations and stimuli." },
    "AP Macroeconomics": { mcqCount: 60, mcqMinutes: 70, frqCount: 3, frqMinutes: 60, mcqWeight: 66, frqWeight: 33, fullMinutes: 130, note: "FRQ time includes the 10-minute reading period." },
    "AP Physics 1": { mcqCount: 40, mcqMinutes: 80, frqCount: 4, frqMinutes: 100, mcqWeight: 50, frqWeight: 50, fullMinutes: 180, note: "Updated 2025-26 clarified structure." },
    "AP Physics C: Mechanics": { mcqCount: 40, mcqMinutes: 80, frqCount: 4, frqMinutes: 100, mcqWeight: 50, frqWeight: 50, fullMinutes: 180, note: "Updated 2025-26 clarified structure." },
    "AP Precalculus": { mcqCount: 40, mcqMinutes: 120, frqCount: 4, frqMinutes: 60, mcqWeight: 62.5, frqWeight: 37.5, fullMinutes: 180, note: "Calculator and no-calculator parts are combined here." },
    "AP Psychology": { mcqCount: 75, mcqMinutes: 90, frqCount: 2, frqMinutes: 70, mcqWeight: 66.7, frqWeight: 33.3, fullMinutes: 160, note: "Revised AP Psychology format for the May 2026 exam." },
    "AP Spanish Language and Culture": { mcqCount: 65, mcqMinutes: 95, frqCount: 4, frqMinutes: 88, mcqWeight: 50, frqWeight: 50, fullMinutes: 183, note: "FRQ combines written and spoken response sections." },
    "AP Statistics": { mcqCount: 40, mcqMinutes: 90, frqCount: 6, frqMinutes: 90, mcqWeight: 50, frqWeight: 50, fullMinutes: 180, note: "May 2026 format; 2026-27 revisions do not affect this exam." },
    "AP United States Government and Politics": { mcqCount: 55, mcqMinutes: 80, frqCount: 4, frqMinutes: 100, mcqWeight: 50, frqWeight: 50, fullMinutes: 180, note: "Four free-response question types." },
    "AP United States History": { mcqCount: 55, mcqMinutes: 55, frqCount: 5, frqMinutes: 140, mcqWeight: 40, frqWeight: 60, fullMinutes: 195, note: "FRQ total combines 3 short-answer questions, DBQ, and long essay." },
    "AP World History: Modern": { mcqCount: 55, mcqMinutes: 55, frqCount: 5, frqMinutes: 140, mcqWeight: 40, frqWeight: 60, fullMinutes: 195, note: "FRQ total combines 3 short-answer questions, DBQ, and long essay." }
  };

  const SUBJECTS = [
    { title: "AP Biology", short: "Biology", group: "Science", units: ["Chemistry of life", "Cell structure and function", "Cellular energetics", "Cell communication and cell cycle", "Heredity", "Gene expression and regulation", "Natural selection", "Ecology"] },
    { title: "AP Calculus AB", short: "Calculus AB", group: "Math", units: ["Limits and continuity", "Differentiation", "Implicit differentiation", "Applications of derivatives", "Analytical applications", "Integration", "Differential equations", "Applications of integration"] },
    { title: "AP Calculus BC", short: "Calculus BC", group: "Math", units: ["Limits and continuity", "Derivatives", "Integrals", "Differential equations", "Parametric equations", "Polar functions", "Sequences and series", "Taylor series"] },
    { title: "AP Chemistry", short: "Chemistry", group: "Science", units: ["Atomic structure", "Molecular and ionic compounds", "Intermolecular forces", "Chemical reactions", "Kinetics", "Thermodynamics", "Equilibrium", "Acids and bases", "Applications of thermodynamics"] },
    { title: "AP Computer Science A", short: "Computer Science A", group: "CS", units: ["Primitive types", "Using objects", "Boolean expressions", "Iteration", "Writing classes", "Arrays", "ArrayList", "2D arrays", "Inheritance", "Recursion"] },
    { title: "AP Computer Science Principles", short: "CSP", group: "CS", units: ["Creative development", "Data", "Algorithms and programming", "Computer systems and networks", "Impact of computing", "Cybersecurity", "Internet protocols", "Abstraction"] },
    { title: "AP English Language and Composition", short: "English Language", group: "English", units: ["Rhetorical situation", "Claims and evidence", "Reasoning and organization", "Style", "Synthesis", "Rhetorical analysis", "Argument", "Revision"] },
    { title: "AP English Literature and Composition", short: "English Literature", group: "English", units: ["Character", "Setting", "Structure", "Narration", "Figurative language", "Literary argument", "Poetry analysis", "Prose analysis"] },
    { title: "AP Environmental Science", short: "Environmental Science", group: "Science", units: ["Ecosystems", "Biodiversity", "Populations", "Earth systems", "Land and water use", "Energy resources", "Atmospheric pollution", "Aquatic and terrestrial pollution", "Global change"] },
    { title: "AP Human Geography", short: "Human Geography", group: "Social", units: ["Thinking geographically", "Population and migration", "Cultural patterns", "Political patterns", "Agriculture", "Cities and urban land use", "Industrial and economic development"] },
    { title: "AP Macroeconomics", short: "Macroeconomics", group: "Social", units: ["Basic economic concepts", "Economic indicators", "National income", "Financial sector", "Long-run consequences", "Open economy", "Stabilization policy"] },
    { title: "AP Physics 1", short: "Physics 1", group: "Science", units: ["Kinematics", "Dynamics", "Circular motion", "Energy", "Momentum", "Simple harmonic motion", "Torque", "Fluids"] },
    { title: "AP Physics C: Mechanics", short: "Physics C", group: "Science", units: ["Kinematics", "Newton laws", "Work energy and power", "Systems of particles", "Rotation", "Oscillations", "Gravitation", "Calculus-based modeling"] },
    { title: "AP Precalculus", short: "Precalculus", group: "Math", units: ["Polynomial and rational functions", "Exponential and logarithmic functions", "Trigonometric functions", "Polar functions", "Parametric functions", "Vectors", "Matrices", "Modeling change"] },
    { title: "AP Psychology", short: "Psychology", group: "Social", units: ["Biological bases", "Cognition", "Development and learning", "Social psychology", "Mental and physical health", "Research methods", "Data interpretation", "Behavioral perspectives"] },
    { title: "AP Spanish Language and Culture", short: "Spanish Language", group: "World Lang", units: ["Families and communities", "Personal and public identities", "Beauty and aesthetics", "Science and technology", "Contemporary life", "Global challenges", "Interpersonal communication", "Presentational communication"] },
    { title: "AP Statistics", short: "AP Statistics", group: "Math", units: ["Exploring one-variable data", "Exploring two-variable data", "Collecting data", "Probability", "Random variables", "Sampling distributions", "Inference for categorical data", "Inference for quantitative data"] },
    { title: "AP United States Government and Politics", short: "U.S. Government", group: "Social", units: ["Foundations of democracy", "Interactions among branches", "Civil liberties and civil rights", "Political ideologies", "Political participation", "Required documents", "Supreme Court cases", "Argument essay"] },
    { title: "AP United States History", short: "U.S. History", group: "History", units: ["Period 1: 1491-1607", "Period 2: 1607-1754", "Period 3: 1754-1800", "Period 4: 1800-1848", "Period 5: 1844-1877", "Period 6: 1865-1898", "Period 7: 1890-1945", "Period 8: 1945-1980", "Period 9: 1980-present"] },
    { title: "AP World History: Modern", short: "World History", group: "History", units: ["The global tapestry", "Networks of exchange", "Land-based empires", "Transoceanic interconnections", "Revolutions", "Consequences of industrialization", "Global conflict", "Cold War and decolonization", "Globalization"] }
  ].map((subject) => ({
    ...subject,
    slug: slugify(subject.title),
    format: { ...(EXAM_FORMATS[subject.title] || DEFAULT_FORMAT) }
  }));

  const skillLabels = {
    1: "Skill 1: Course Concept Selection",
    2: "Skill 2: Evidence and Data Analysis",
    3: "Skill 3: Process and Reasoning",
    4: "Skill 4: Argumentation and Justification"
  };

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function getSubjectByTitle(title) {
    return SUBJECTS.find((subject) => subject.title === title) || null;
  }

  function getSelectedSubject() {
    const saved = localStorage.getItem(SELECTED_AP_SUBJECT_KEY);
    return getSubjectByTitle(saved) || getSubjectByTitle("AP Statistics") || SUBJECTS[0];
  }

  function storageKey(kind, subject = getSelectedSubject()) {
    return "ap-practice-" + subject.slug + "-" + kind + "-state-v1";
  }

  function totalMinutes(format) {
    return format.fullMinutes || format.mcqMinutes + format.frqMinutes;
  }

  function formatWeight(value) {
    return Number.isInteger(value) ? value + "%" : value.toFixed(1) + "%";
  }

  function rotateChoices(choices, seed) {
    const offset = seed % choices.length;
    return choices.slice(offset).concat(choices.slice(0, offset));
  }

  function buildMcqQuestions(subject = getSelectedSubject()) {
    const stems = [
      "Which response best applies the course concept of {unit}?",
      "A student is preparing an AP-style answer about {unit}. Which statement is strongest?",
      "Which choice gives the best evidence-based reasoning for a question on {unit}?",
      "Which answer would most likely earn credit for explaining {unit}?",
      "Which response avoids the most common misconception about {unit}?"
    ];

    return Array.from({ length: subject.format.mcqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const stem = stems[index % stems.length].replace("{unit}", unit.toLowerCase());
      const correct = `Connect ${unit.toLowerCase()} to specific evidence, use accurate ${subject.short} vocabulary, and explain why the evidence supports the conclusion.`;
      const distractors = [
        `Define ${unit.toLowerCase()} but do not apply it to the evidence or task.`,
        `Rely on personal opinion instead of course reasoning from ${subject.short}.`,
        `Use an unrelated topic from ${subject.short} and ignore the question focus.`,
        `State a conclusion about ${unit.toLowerCase()} without justification or context.`
      ];
      const choices = rotateChoices([correct, ...distractors], index + subject.slug.length);

      return {
        id: index + 1,
        unit: `Unit ${(index % subject.units.length) + 1}: ${unit}`,
        skill: (index % 4) + 1,
        set: index % 5 === 0 ? `Questions ${index + 1}-${Math.min(index + 3, subject.format.mcqCount)} share a topic` : undefined,
        stimulus: index % 5 === 0 ? `Topic focus: ${unit}. Use course-specific reasoning for ${subject.title}.` : "",
        prompt: stem,
        choices,
        correct: choices.indexOf(correct),
        explanation: `The strongest AP-style response applies ${unit.toLowerCase()} to evidence and explains the reasoning. The other choices are incomplete because they are vague, off-topic, opinion-based, or unjustified.`
      };
    });
  }

  function buildFrqItems(subject = getSelectedSubject()) {
    return Array.from({ length: subject.format.frqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      return {
        id: index + 1,
        title: `${unit} Task`,
        maxPoints: 4,
        stimulus: `Original ${subject.title} practice prompt. A student must analyze a scenario involving ${unit.toLowerCase()}, apply relevant course vocabulary, and justify a conclusion with evidence.`,
        parts: [
          {
            label: `(a) Identify the main course concept connected to ${unit.toLowerCase()}.`,
            criteria: [
              { label: `Names or clearly describes ${unit}`, groups: [[unit.split(" ")[0].toLowerCase(), subject.short.toLowerCase().split(" ")[0]]] }
            ]
          },
          {
            label: "(b) Explain how evidence from the scenario supports the claim.",
            criteria: [
              { label: "Uses evidence from the scenario", groups: [["evidence", "scenario", "source", "data", "example"]] },
              { label: "Provides reasoning rather than only a label", groups: [["because", "therefore", "shows", "supports", "leads", "causes", "explains"]] }
            ]
          },
          {
            label: "(c) State a justified conclusion in context.",
            criteria: [
              { label: "States a conclusion with subject-specific context", groups: [["conclude", "conclusion", "therefore", "overall"], [subject.short.toLowerCase().split(" ")[0], unit.split(" ")[0].toLowerCase()]] }
            ]
          }
        ]
      };
    });
  }

  window.APPracticeData = {
    SELECTED_AP_SUBJECT_KEY,
    subjects: SUBJECTS,
    skillLabels,
    getSubjectByTitle,
    getSelectedSubject,
    storageKey,
    totalMinutes,
    formatWeight,
    buildMcqQuestions,
    buildFrqItems
  };
}());
