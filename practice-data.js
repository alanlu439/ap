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
    "AP 2-D Art and Design": {
        "mcqCount": 18,
        "mcqMinutes": 30,
        "frqCount": 2,
        "frqMinutes": 90,
        "mcqWeight": 40,
        "frqWeight": 60,
        "fullMinutes": 120,
        "note": "Portfolio assessment: Selected Works and Sustained Investigation. Practice maps portfolio review to MCQ and FRQ-style planning."
    },
    "AP 3-D Art and Design": {
        "mcqCount": 18,
        "mcqMinutes": 30,
        "frqCount": 2,
        "frqMinutes": 90,
        "mcqWeight": 40,
        "frqWeight": 60,
        "fullMinutes": 120,
        "note": "Portfolio assessment: Selected Works and Sustained Investigation. Practice maps portfolio review to MCQ and FRQ-style planning."
    },
    "AP African American Studies": {
        "mcqCount": 60,
        "mcqMinutes": 70,
        "frqCount": 5,
        "frqMinutes": 95,
        "mcqWeight": 60,
        "frqWeight": 31.5,
        "fullMinutes": 165,
        "note": "Practice includes project validation, short-answer, and DBQ-style tasks; the official course project is separate."
    },
    "AP Art History": {
        "mcqCount": 80,
        "mcqMinutes": 60,
        "frqCount": 6,
        "frqMinutes": 120,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "80 MCQ and 6 free-response questions."
    },
    "AP Biology": {
        "mcqCount": 60,
        "mcqMinutes": 90,
        "frqCount": 6,
        "frqMinutes": 90,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "2 long-response and 4 short-response questions."
    },
    "AP Business with Personal Finance": {
        "mcqCount": 60,
        "mcqMinutes": 70,
        "frqCount": 4,
        "frqMinutes": 90,
        "mcqWeight": 60,
        "frqWeight": 40,
        "fullMinutes": 160,
        "note": "AP Career Kickstart structure: MCQ plus 1 long and 3 short free-response questions."
    },
    "AP Calculus AB": {
        "mcqCount": 45,
        "mcqMinutes": 105,
        "frqCount": 6,
        "frqMinutes": 90,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 195,
        "note": "Calculator and no-calculator parts are combined here."
    },
    "AP Calculus BC": {
        "mcqCount": 45,
        "mcqMinutes": 105,
        "frqCount": 6,
        "frqMinutes": 90,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 195,
        "note": "Calculator and no-calculator parts are combined here."
    },
    "AP Chemistry": {
        "mcqCount": 60,
        "mcqMinutes": 90,
        "frqCount": 7,
        "frqMinutes": 105,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 195,
        "note": "3 long-answer and 4 short-answer questions."
    },
    "AP Chinese Language and Culture": {
        "mcqCount": 65,
        "mcqMinutes": 95,
        "frqCount": 4,
        "frqMinutes": 88,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 183,
        "note": "Interpretive communication plus written and spoken free-response tasks."
    },
    "AP Comparative Government and Politics": {
        "mcqCount": 55,
        "mcqMinutes": 60,
        "frqCount": 4,
        "frqMinutes": 90,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 150,
        "note": "55 MCQ and 4 free-response questions."
    },
    "AP Computer Science A": {
        "mcqCount": 42,
        "mcqMinutes": 90,
        "frqCount": 4,
        "frqMinutes": 90,
        "mcqWeight": 55,
        "frqWeight": 45,
        "fullMinutes": 180,
        "note": "Fully digital exam; code-analysis MCQ and Java free-response tasks."
    },
    "AP Computer Science Principles": {
        "mcqCount": 70,
        "mcqMinutes": 120,
        "frqCount": 4,
        "frqMinutes": 60,
        "mcqWeight": 70,
        "frqWeight": 30,
        "fullMinutes": 180,
        "note": "Includes Create performance task and exam-day written-response practice."
    },
    "AP Cybersecurity": {
        "mcqCount": 60,
        "mcqMinutes": 80,
        "frqCount": 1,
        "frqMinutes": 50,
        "mcqWeight": 70,
        "frqWeight": 30,
        "fullMinutes": 130,
        "note": "AP Career Kickstart structure: scenario-based MCQ plus one applied free-response task."
    },
    "AP Drawing": {
        "mcqCount": 18,
        "mcqMinutes": 30,
        "frqCount": 2,
        "frqMinutes": 90,
        "mcqWeight": 40,
        "frqWeight": 60,
        "fullMinutes": 120,
        "note": "Portfolio assessment: Selected Works and Sustained Investigation. Practice maps portfolio review to MCQ and FRQ-style planning."
    },
    "AP English Language and Composition": {
        "mcqCount": 45,
        "mcqMinutes": 60,
        "frqCount": 3,
        "frqMinutes": 135,
        "mcqWeight": 45,
        "frqWeight": 55,
        "fullMinutes": 195,
        "note": "FRQ time includes the 15-minute reading period."
    },
    "AP English Literature and Composition": {
        "mcqCount": 55,
        "mcqMinutes": 60,
        "frqCount": 3,
        "frqMinutes": 120,
        "mcqWeight": 45,
        "frqWeight": 55,
        "fullMinutes": 180,
        "note": "Three essay-style free-response questions."
    },
    "AP Environmental Science": {
        "mcqCount": 80,
        "mcqMinutes": 90,
        "frqCount": 3,
        "frqMinutes": 70,
        "mcqWeight": 60,
        "frqWeight": 40,
        "fullMinutes": 160,
        "note": "Fully digital exam."
    },
    "AP European History": {
        "mcqCount": 55,
        "mcqMinutes": 55,
        "frqCount": 5,
        "frqMinutes": 140,
        "mcqWeight": 40,
        "frqWeight": 60,
        "fullMinutes": 195,
        "note": "FRQ total combines short-answer questions, DBQ, and long essay."
    },
    "AP French Language and Culture": {
        "mcqCount": 65,
        "mcqMinutes": 95,
        "frqCount": 4,
        "frqMinutes": 88,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 183,
        "note": "Interpretive communication plus written and spoken free-response tasks."
    },
    "AP German Language and Culture": {
        "mcqCount": 65,
        "mcqMinutes": 95,
        "frqCount": 4,
        "frqMinutes": 88,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 183,
        "note": "Interpretive communication plus written and spoken free-response tasks."
    },
    "AP Human Geography": {
        "mcqCount": 60,
        "mcqMinutes": 60,
        "frqCount": 3,
        "frqMinutes": 75,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 135,
        "note": "FRQ prompts use geographic situations and stimuli."
    },
    "AP Italian Language and Culture": {
        "mcqCount": 65,
        "mcqMinutes": 95,
        "frqCount": 4,
        "frqMinutes": 88,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 183,
        "note": "Interpretive communication plus written and spoken free-response tasks."
    },
    "AP Japanese Language and Culture": {
        "mcqCount": 65,
        "mcqMinutes": 95,
        "frqCount": 4,
        "frqMinutes": 88,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 183,
        "note": "Interpretive communication plus written and spoken free-response tasks."
    },
    "AP Latin": {
        "mcqCount": 50,
        "mcqMinutes": 60,
        "frqCount": 5,
        "frqMinutes": 120,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "Latin reading, translation, and analytical-response practice."
    },
    "AP Macroeconomics": {
        "mcqCount": 60,
        "mcqMinutes": 70,
        "frqCount": 3,
        "frqMinutes": 60,
        "mcqWeight": 66.7,
        "frqWeight": 33.3,
        "fullMinutes": 130,
        "note": "FRQ time includes the 10-minute reading period."
    },
    "AP Microeconomics": {
        "mcqCount": 60,
        "mcqMinutes": 70,
        "frqCount": 3,
        "frqMinutes": 60,
        "mcqWeight": 66,
        "frqWeight": 33,
        "fullMinutes": 130,
        "note": "FRQ time includes the 10-minute reading period."
    },
    "AP Music Theory": {
        "mcqCount": 75,
        "mcqMinutes": 80,
        "frqCount": 9,
        "frqMinutes": 90,
        "mcqWeight": 45,
        "frqWeight": 55,
        "fullMinutes": 170,
        "note": "Includes free-response and sight-singing practice."
    },
    "AP Physics 1: Algebra-Based": {
        "mcqCount": 40,
        "mcqMinutes": 80,
        "frqCount": 4,
        "frqMinutes": 100,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "Updated 2025-26 clarified structure."
    },
    "AP Physics 2: Algebra-Based": {
        "mcqCount": 40,
        "mcqMinutes": 80,
        "frqCount": 4,
        "frqMinutes": 100,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "Updated 2025-26 clarified structure."
    },
    "AP Physics C: Electricity and Magnetism": {
        "mcqCount": 40,
        "mcqMinutes": 80,
        "frqCount": 4,
        "frqMinutes": 100,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "Updated 2025-26 clarified structure."
    },
    "AP Physics C: Mechanics": {
        "mcqCount": 40,
        "mcqMinutes": 80,
        "frqCount": 4,
        "frqMinutes": 100,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "Updated 2025-26 clarified structure."
    },
    "AP Precalculus": {
        "mcqCount": 40,
        "mcqMinutes": 120,
        "frqCount": 4,
        "frqMinutes": 60,
        "mcqWeight": 62.5,
        "frqWeight": 37.5,
        "fullMinutes": 180,
        "note": "Calculator and no-calculator parts are combined here."
    },
    "AP Psychology": {
        "mcqCount": 75,
        "mcqMinutes": 90,
        "frqCount": 2,
        "frqMinutes": 70,
        "mcqWeight": 66.7,
        "frqWeight": 33.3,
        "fullMinutes": 160,
        "note": "Revised AP Psychology format for the May 2026 exam."
    },
    "AP Research": {
        "mcqCount": 12,
        "mcqMinutes": 30,
        "frqCount": 2,
        "frqMinutes": 90,
        "mcqWeight": 20,
        "frqWeight": 80,
        "fullMinutes": 120,
        "note": "No traditional end-of-course exam; practice maps research checkpoints to MCQ and response tasks."
    },
    "AP Seminar": {
        "mcqCount": 15,
        "mcqMinutes": 30,
        "frqCount": 4,
        "frqMinutes": 120,
        "mcqWeight": 45,
        "frqWeight": 55,
        "fullMinutes": 150,
        "note": "Includes performance tasks plus an end-of-course exam; practice emphasizes source analysis and argument."
    },
    "AP Spanish Language and Culture": {
        "mcqCount": 65,
        "mcqMinutes": 95,
        "frqCount": 4,
        "frqMinutes": 88,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 183,
        "note": "FRQ combines written and spoken response sections."
    },
    "AP Spanish Literature and Culture": {
        "mcqCount": 65,
        "mcqMinutes": 80,
        "frqCount": 4,
        "frqMinutes": 100,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "Literary analysis MCQ and essay-style free-response questions."
    },
    "AP Statistics": {
        "mcqCount": 40,
        "mcqMinutes": 90,
        "frqCount": 6,
        "frqMinutes": 90,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "May 2026 format; 2026-27 revisions do not affect this exam."
    },
    "AP United States Government and Politics": {
        "mcqCount": 55,
        "mcqMinutes": 80,
        "frqCount": 4,
        "frqMinutes": 100,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "Four free-response question types."
    },
    "AP United States History": {
        "mcqCount": 55,
        "mcqMinutes": 55,
        "frqCount": 5,
        "frqMinutes": 140,
        "mcqWeight": 40,
        "frqWeight": 60,
        "fullMinutes": 195,
        "note": "FRQ total combines short-answer questions, DBQ, and long essay."
    },
    "AP World History: Modern": {
        "mcqCount": 55,
        "mcqMinutes": 55,
        "frqCount": 5,
        "frqMinutes": 140,
        "mcqWeight": 40,
        "frqWeight": 60,
        "fullMinutes": 195,
        "note": "FRQ total combines short-answer questions, DBQ, and long essay."
    }
};

  const SUBJECTS = [
    {
        "title": "AP 2-D Art and Design",
        "short": "2-D Art and Design",
        "group": "Arts",
        "units": [
            "Sustained investigation",
            "Selected works",
            "Design principles",
            "Visual evidence",
            "Materials and processes",
            "Composition",
            "Experimentation",
            "Written evidence"
        ]
    },
    {
        "title": "AP 3-D Art and Design",
        "short": "3-D Art and Design",
        "group": "Arts",
        "units": [
            "Sustained investigation",
            "Selected works",
            "3-D form",
            "Spatial relationships",
            "Materials and processes",
            "Surface and volume",
            "Installation decisions",
            "Written evidence"
        ]
    },
    {
        "title": "AP African American Studies",
        "short": "African American Studies",
        "group": "History",
        "units": [
            "Origins of the African diaspora",
            "Freedom and resistance",
            "The practice of freedom",
            "Movements and debates",
            "Sources and archives",
            "Cultural expression",
            "Political institutions",
            "Research project"
        ]
    },
    {
        "title": "AP Art History",
        "short": "Art History",
        "group": "Arts",
        "units": [
            "Global prehistory",
            "Ancient Mediterranean",
            "Early Europe and Colonial Americas",
            "Later Europe and Americas",
            "Indigenous Americas",
            "Africa",
            "West and Central Asia",
            "South, East, and Southeast Asia",
            "The Pacific",
            "Global contemporary"
        ]
    },
    {
        "title": "AP Biology",
        "short": "Biology",
        "group": "Science",
        "units": [
            "Chemistry of life",
            "Cell structure and function",
            "Cellular energetics",
            "Cell communication and cell cycle",
            "Heredity",
            "Gene expression and regulation",
            "Natural selection",
            "Ecology"
        ]
    },
    {
        "title": "AP Business with Personal Finance",
        "short": "Business and Finance",
        "group": "Career",
        "units": [
            "Markets and customers",
            "Business models",
            "Accounting basics",
            "Personal budgeting",
            "Credit and borrowing",
            "Investing and risk",
            "Entrepreneurship",
            "Financial decision-making"
        ]
    },
    {
        "title": "AP Calculus AB",
        "short": "Calculus AB",
        "group": "Math",
        "units": [
            "Limits and continuity",
            "Differentiation",
            "Implicit differentiation",
            "Applications of derivatives",
            "Analytical applications",
            "Integration",
            "Differential equations",
            "Applications of integration"
        ]
    },
    {
        "title": "AP Calculus BC",
        "short": "Calculus BC",
        "group": "Math",
        "units": [
            "Limits and continuity",
            "Derivatives",
            "Integrals",
            "Differential equations",
            "Parametric equations",
            "Polar functions",
            "Sequences and series",
            "Taylor series"
        ]
    },
    {
        "title": "AP Chemistry",
        "short": "Chemistry",
        "group": "Science",
        "units": [
            "Atomic structure",
            "Molecular and ionic compounds",
            "Intermolecular forces",
            "Chemical reactions",
            "Kinetics",
            "Thermodynamics",
            "Equilibrium",
            "Acids and bases",
            "Applications of thermodynamics"
        ]
    },
    {
        "title": "AP Chinese Language and Culture",
        "short": "Chinese Language",
        "group": "World Lang",
        "units": [
            "Families and communities",
            "Personal and public identities",
            "Beauty and aesthetics",
            "Science and technology",
            "Contemporary life",
            "Global challenges",
            "Interpretive communication",
            "Presentational communication"
        ]
    },
    {
        "title": "AP Comparative Government and Politics",
        "short": "Comparative Government",
        "group": "Social",
        "units": [
            "Political systems and regimes",
            "Political institutions",
            "Political culture and participation",
            "Party and electoral systems",
            "Civil rights and liberties",
            "Political and economic change",
            "Country comparison",
            "Argument analysis"
        ]
    },
    {
        "title": "AP Computer Science A",
        "short": "Computer Science A",
        "group": "CS",
        "units": [
            "Primitive types",
            "Using objects",
            "Boolean expressions",
            "Iteration",
            "Writing classes",
            "Arrays",
            "ArrayList",
            "2D arrays",
            "Inheritance",
            "Recursion"
        ]
    },
    {
        "title": "AP Computer Science Principles",
        "short": "CSP",
        "group": "CS",
        "units": [
            "Creative development",
            "Data",
            "Algorithms and programming",
            "Computer systems and networks",
            "Impact of computing",
            "Cybersecurity",
            "Internet protocols",
            "Abstraction"
        ]
    },
    {
        "title": "AP Cybersecurity",
        "short": "Cybersecurity",
        "group": "Career",
        "units": [
            "Security principles",
            "Threats and vulnerabilities",
            "Network defense",
            "Identity and access",
            "Cryptography basics",
            "Incident response",
            "Risk management",
            "Ethics and policy"
        ]
    },
    {
        "title": "AP Drawing",
        "short": "Drawing",
        "group": "Arts",
        "units": [
            "Sustained investigation",
            "Selected works",
            "Mark-making",
            "Composition",
            "Figure and space",
            "Materials and processes",
            "Experimentation",
            "Written evidence"
        ]
    },
    {
        "title": "AP English Language and Composition",
        "short": "English Language",
        "group": "English",
        "units": [
            "Rhetorical situation",
            "Claims and evidence",
            "Reasoning and organization",
            "Style",
            "Synthesis",
            "Rhetorical analysis",
            "Argument",
            "Revision"
        ]
    },
    {
        "title": "AP English Literature and Composition",
        "short": "English Literature",
        "group": "English",
        "units": [
            "Character",
            "Setting",
            "Structure",
            "Narration",
            "Figurative language",
            "Literary argument",
            "Poetry analysis",
            "Prose analysis"
        ]
    },
    {
        "title": "AP Environmental Science",
        "short": "Environmental Science",
        "group": "Science",
        "units": [
            "Ecosystems",
            "Biodiversity",
            "Populations",
            "Earth systems",
            "Land and water use",
            "Energy resources",
            "Atmospheric pollution",
            "Aquatic and terrestrial pollution",
            "Global change"
        ]
    },
    {
        "title": "AP European History",
        "short": "European History",
        "group": "History",
        "units": [
            "Renaissance and exploration",
            "Age of Reformation",
            "Absolutism and constitutionalism",
            "Scientific and philosophical developments",
            "Conflict and expansion",
            "Industrialization",
            "Nineteenth-century perspectives",
            "Twentieth-century global conflicts",
            "Cold War and contemporary Europe"
        ]
    },
    {
        "title": "AP French Language and Culture",
        "short": "French Language",
        "group": "World Lang",
        "units": [
            "Families and communities",
            "Personal and public identities",
            "Beauty and aesthetics",
            "Science and technology",
            "Contemporary life",
            "Global challenges",
            "Interpersonal communication",
            "Presentational communication"
        ]
    },
    {
        "title": "AP German Language and Culture",
        "short": "German Language",
        "group": "World Lang",
        "units": [
            "Families and communities",
            "Personal and public identities",
            "Beauty and aesthetics",
            "Science and technology",
            "Contemporary life",
            "Global challenges",
            "Interpersonal communication",
            "Presentational communication"
        ]
    },
    {
        "title": "AP Human Geography",
        "short": "Human Geography",
        "group": "Social",
        "units": [
            "Thinking geographically",
            "Population and migration",
            "Cultural patterns",
            "Political patterns",
            "Agriculture",
            "Cities and urban land use",
            "Industrial and economic development"
        ]
    },
    {
        "title": "AP Italian Language and Culture",
        "short": "Italian Language",
        "group": "World Lang",
        "units": [
            "Families and communities",
            "Personal and public identities",
            "Beauty and aesthetics",
            "Science and technology",
            "Contemporary life",
            "Global challenges",
            "Interpersonal communication",
            "Presentational communication"
        ]
    },
    {
        "title": "AP Japanese Language and Culture",
        "short": "Japanese Language",
        "group": "World Lang",
        "units": [
            "Families and communities",
            "Personal and public identities",
            "Beauty and aesthetics",
            "Science and technology",
            "Contemporary life",
            "Global challenges",
            "Interpretive communication",
            "Presentational communication"
        ]
    },
    {
        "title": "AP Latin",
        "short": "Latin",
        "group": "World Lang",
        "units": [
            "Vergil selections",
            "Caesar selections",
            "Latin vocabulary",
            "Grammar and syntax",
            "Translation",
            "Contextual analysis",
            "Short-answer analysis",
            "Essay analysis"
        ]
    },
    {
        "title": "AP Macroeconomics",
        "short": "Macroeconomics",
        "group": "Social",
        "units": [
            "Basic economic concepts",
            "Economic indicators",
            "National income",
            "Financial sector",
            "Long-run consequences",
            "Open economy",
            "Stabilization policy"
        ]
    },
    {
        "title": "AP Microeconomics",
        "short": "Microeconomics",
        "group": "Social",
        "units": [
            "Basic economic concepts",
            "Supply and demand",
            "Production, cost, and perfect competition",
            "Imperfect competition",
            "Factor markets",
            "Market failure and government",
            "Consumer choice",
            "Game theory"
        ]
    },
    {
        "title": "AP Music Theory",
        "short": "Music Theory",
        "group": "Arts",
        "units": [
            "Pitch and notation",
            "Rhythm and meter",
            "Scales and keys",
            "Intervals and chords",
            "Cadences and phrases",
            "Harmonic progression",
            "Melodic dictation",
            "Sight singing"
        ]
    },
    {
        "title": "AP Physics 1: Algebra-Based",
        "short": "Physics 1",
        "group": "Science",
        "units": [
            "Kinematics",
            "Dynamics",
            "Circular motion",
            "Energy",
            "Momentum",
            "Simple harmonic motion",
            "Torque",
            "Fluids"
        ]
    },
    {
        "title": "AP Physics 2: Algebra-Based",
        "short": "Physics 2",
        "group": "Science",
        "units": [
            "Thermodynamics",
            "Electric force field and potential",
            "Electric circuits",
            "Magnetism",
            "Geometric and physical optics",
            "Quantum atomic and nuclear physics",
            "Fluids",
            "Waves"
        ]
    },
    {
        "title": "AP Physics C: Electricity and Magnetism",
        "short": "Physics C: E&M",
        "group": "Science",
        "units": [
            "Electrostatics",
            "Conductors and capacitors",
            "Electric circuits",
            "Magnetic fields",
            "Electromagnetism",
            "Calculus-based electric fields",
            "Flux and Gauss law",
            "Induction"
        ]
    },
    {
        "title": "AP Physics C: Mechanics",
        "short": "Physics C: Mechanics",
        "group": "Science",
        "units": [
            "Kinematics",
            "Newton laws",
            "Work energy and power",
            "Systems of particles",
            "Rotation",
            "Oscillations",
            "Gravitation",
            "Calculus-based modeling"
        ]
    },
    {
        "title": "AP Precalculus",
        "short": "Precalculus",
        "group": "Math",
        "units": [
            "Polynomial and rational functions",
            "Exponential and logarithmic functions",
            "Trigonometric functions",
            "Polar functions",
            "Parametric functions",
            "Vectors",
            "Matrices",
            "Modeling change"
        ]
    },
    {
        "title": "AP Psychology",
        "short": "Psychology",
        "group": "Social",
        "units": [
            "Biological bases",
            "Cognition",
            "Development and learning",
            "Social psychology",
            "Mental and physical health",
            "Research methods",
            "Data interpretation",
            "Behavioral perspectives"
        ]
    },
    {
        "title": "AP Research",
        "short": "Research",
        "group": "Capstone",
        "units": [
            "Research question design",
            "Annotated bibliography",
            "Methodology",
            "Evidence evaluation",
            "Academic argument",
            "Limitations and implications",
            "Presentation defense",
            "Oral defense"
        ]
    },
    {
        "title": "AP Seminar",
        "short": "Seminar",
        "group": "Capstone",
        "units": [
            "Source credibility",
            "Argument lines",
            "Evidence selection",
            "Research lenses",
            "Team multimedia presentation",
            "Individual written argument",
            "End-of-course source analysis",
            "Synthesis essay"
        ]
    },
    {
        "title": "AP Spanish Language and Culture",
        "short": "Spanish Language",
        "group": "World Lang",
        "units": [
            "Families and communities",
            "Personal and public identities",
            "Beauty and aesthetics",
            "Science and technology",
            "Contemporary life",
            "Global challenges",
            "Interpersonal communication",
            "Presentational communication"
        ]
    },
    {
        "title": "AP Spanish Literature and Culture",
        "short": "Spanish Literature",
        "group": "World Lang",
        "units": [
            "La epoca medieval",
            "El siglo XVI",
            "El siglo XVII",
            "La literatura colonial",
            "El siglo XIX",
            "Modernismo",
            "Boom latinoamericano",
            "Contemporary literature"
        ]
    },
    {
        "title": "AP Statistics",
        "short": "AP Statistics",
        "group": "Math",
        "units": [
            "Exploring one-variable data",
            "Exploring two-variable data",
            "Collecting data",
            "Probability",
            "Random variables",
            "Sampling distributions",
            "Inference for categorical data",
            "Inference for quantitative data"
        ]
    },
    {
        "title": "AP United States Government and Politics",
        "short": "U.S. Government",
        "group": "Social",
        "units": [
            "Foundations of democracy",
            "Interactions among branches",
            "Civil liberties and civil rights",
            "Political ideologies",
            "Political participation",
            "Required documents",
            "Supreme Court cases",
            "Argument essay"
        ]
    },
    {
        "title": "AP United States History",
        "short": "U.S. History",
        "group": "History",
        "units": [
            "Period 1: 1491-1607",
            "Period 2: 1607-1754",
            "Period 3: 1754-1800",
            "Period 4: 1800-1848",
            "Period 5: 1844-1877",
            "Period 6: 1865-1898",
            "Period 7: 1890-1945",
            "Period 8: 1945-1980",
            "Period 9: 1980-present"
        ]
    },
    {
        "title": "AP World History: Modern",
        "short": "World History",
        "group": "History",
        "units": [
            "The global tapestry",
            "Networks of exchange",
            "Land-based empires",
            "Transoceanic interconnections",
            "Revolutions",
            "Consequences of industrialization",
            "Global conflict",
            "Cold War and decolonization",
            "Globalization"
        ]
    }
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

  const SUBJECT_ALIASES = {
    "AP Physics 1": "AP Physics 1: Algebra-Based",
    "AP Physics 2": "AP Physics 2: Algebra-Based"
  };

  function getSubjectByTitle(title) {
    const exact = SUBJECTS.find((subject) => subject.title === title);
    if (exact) return exact;
    return SUBJECTS.find((subject) => subject.title === SUBJECT_ALIASES[title]) || null;
  }

  function getSelectedSubject() {
    const saved = localStorage.getItem(SELECTED_AP_SUBJECT_KEY);
    return getSubjectByTitle(saved) || getSubjectByTitle("AP Statistics") || SUBJECTS[0];
  }

  function storageKey(kind, subject = getSelectedSubject(), scope = "") {
    const scopeSlug = scope ? "-" + slugify(scope) : "";
    return "ap-practice-" + subject.slug + "-" + kind + scopeSlug + "-state-v1";
  }

  function totalMinutes(format) {
    return format.fullMinutes || format.mcqMinutes + format.frqMinutes;
  }

  function formatWeight(value) {
    return Number.isInteger(value) ? value + "%" : value.toFixed(1) + "%";
  }

  const SCORE_HISTORY_KEY = "ap-practice-score-history-v1";
  const UNIT_FILTER_PREFIX = "ap-practice-unit-focus-v1-";

  function unitFilterKey(subject = getSelectedSubject()) {
    return UNIT_FILTER_PREFIX + subject.slug;
  }

  function getUnitFilter(subject = getSelectedSubject()) {
    try {
      const saved = localStorage.getItem(unitFilterKey(subject)) || "";
      return subject.units.includes(saved) ? saved : "";
    } catch {
      return "";
    }
  }

  function setUnitFilter(subject = getSelectedSubject(), unit = "") {
    try {
      if (unit && subject.units.includes(unit)) {
        localStorage.setItem(unitFilterKey(subject), unit);
      } else {
        localStorage.removeItem(unitFilterKey(subject));
      }
    } catch {
      // Unit focus is optional; practice still works without storage.
    }
  }

  function itemMatchesUnit(item, unit = "") {
    if (!unit) return true;
    return String(item.unit || "").toLowerCase().includes(String(unit).toLowerCase());
  }

  function filterItemsByUnit(items, unit = "") {
    return unit ? items.filter((item) => itemMatchesUnit(item, unit)) : items;
  }

  function choiceExplanation(question, choice, index) {
    if (index === question.correct) {
      return question.explanation || "This option matches the evidence and reasoning requested by the prompt.";
    }
    return "This distractor may sound plausible, but it does not fully satisfy the prompt's evidence, condition, or course reasoning.";
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function getScoreHistory() {
    const history = readJson(SCORE_HISTORY_KEY, []);
    return Array.isArray(history) ? history : [];
  }

  function recordScoreAttempt(attempt) {
    try {
      const next = [
        {
          id: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
          date: new Date().toISOString(),
          ...attempt
        },
        ...getScoreHistory()
      ].slice(0, 80);
      localStorage.setItem(SCORE_HISTORY_KEY, JSON.stringify(next));
      return next;
    } catch {
      return getScoreHistory();
    }
  }

  function latestScoreForSubject(subject = getSelectedSubject()) {
    return getScoreHistory().find((item) => item.subjectSlug === subject.slug) || null;
  }

  const OFFICIAL_SLUG_OVERRIDES = {
    "AP 2-D Art and Design": "ap-2-d-art-and-design",
    "AP 3-D Art and Design": "ap-3-d-art-and-design",
    "AP Computer Science Principles": "ap-computer-science-principles",
    "AP English Language and Composition": "ap-english-language-and-composition",
    "AP English Literature and Composition": "ap-english-literature-and-composition",
    "AP Physics 1: Algebra-Based": "ap-physics-1-algebra-based",
    "AP Physics 2: Algebra-Based": "ap-physics-2-algebra-based",
    "AP Physics C: Electricity and Magnetism": "ap-physics-c-electricity-and-magnetism",
    "AP Physics C: Mechanics": "ap-physics-c-mechanics",
    "AP United States Government and Politics": "ap-united-states-government-and-politics",
    "AP United States History": "ap-united-states-history",
    "AP World History: Modern": "ap-world-history-modern"
  };

  function officialCourseSlug(subject = getSelectedSubject()) {
    return OFFICIAL_SLUG_OVERRIDES[subject.title] || slugify(subject.title);
  }

  function officialLinksForSubject(subject = getSelectedSubject()) {
    if (subject.group === "Career") {
      return {
        students: "https://apstudents.collegeboard.org/courses",
        central: "https://apcentral.collegeboard.org/courses",
        dates: "https://apstudents.collegeboard.org/exam-dates"
      };
    }
    const courseSlug = officialCourseSlug(subject);
    return {
      students: "https://apstudents.collegeboard.org/courses/" + courseSlug,
      central: "https://apcentral.collegeboard.org/courses/" + courseSlug,
      dates: "https://apstudents.collegeboard.org/exam-dates"
    };
  }

  function rotateChoices(choices, seed) {
    const offset = seed % choices.length;
    return choices.slice(offset).concat(choices.slice(0, offset));
  }


  const MCQ_PROFILES = {
    Statistics: {
      focus: "statistical reasoning, design, probability, and inference",
      evidence: "graphs, summary statistics, sampling methods, probability models, and inference conditions",
      setLength: 3,
      choiceCount: 5,
      stimuli: [
        "A study or data display involving {unit} includes a claim and summary evidence.",
        "A sampling, probability, or inference scenario connected to {unit} asks for the best interpretation.",
        "A student conclusion about {unit} must be checked against conditions and context."
      ],
      stems: [
        "Which conclusion is statistically justified?",
        "Which interpretation best matches the context?",
        "Which condition or design issue matters most?",
        "Which answer avoids the common inference error?"
      ],
      correct: [
        "Use the data or design, check the relevant condition, and interpret the conclusion in context.",
        "State the parameter or probability model clearly and connect the result to the question asked."
      ],
      distractors: [
        "Treat association as proof of causation.",
        "Give a calculation without context.",
        "Ignore random assignment, independence, or sample size conditions.",
        "Use sample language when the conclusion requires a population or parameter."
      ],
      explanation: "AP Statistics questions reward context, conditions, design reasoning, and careful inference language."
    },
    Calculus: {
      focus: "calculus modeling, representation, and justification",
      evidence: "graphs, tables, symbolic rules, rates, accumulation, and conditions",
      setLength: 3,
      stimuli: [
        "A graph, table, or symbolic rule models {unit}. The item asks for a conclusion that follows from the representation.",
        "A particle, rate, or accumulation context involves {unit}. Students must select a valid setup and interpretation.",
        "A student solution for {unit} is shown with one missing justification."
      ],
      stems: [
        "Which response would earn credit for the next step?",
        "Which conclusion is justified by the information given?",
        "Which method correctly uses the representation?",
        "Which statement avoids the common error in this context?"
      ],
      correct: [
        "Use the relevant graph, table, or rule, state the needed condition, and interpret the result in context.",
        "Set up the derivative or integral relationship that matches the quantity and give units for the result."
      ],
      distractors: [
        "Apply a memorized formula without checking the hypotheses or the interval.",
        "Report a number but give no contextual interpretation.",
        "Reverse the meaning of rate and accumulation.",
        "Use endpoint values when the problem asks for behavior inside the interval."
      ],
      explanation: "AP Calculus items emphasize representation, valid setup, conditions, and interpretation rather than formula matching."
    },
    Precalculus: {
      focus: "function modeling and change",
      evidence: "graphs, tables, transformations, composition, rates of change, and model limits",
      setLength: 3,
      stimuli: [
        "A model for {unit} is represented by a graph, table, or rule in a real context.",
        "A student compares two representations of {unit} and must identify the same feature in both.",
        "A calculator output or graphing-window view is provided for {unit}."
      ],
      stems: [
        "Which interpretation is best supported?",
        "Which expression or graph matches the stated behavior?",
        "Which domain or model limitation matters most?",
        "Which statement correctly connects the representation to the context?"
      ],
      correct: [
        "Identify the function feature, connect it to the context, and state the limitation or domain when needed.",
        "Use the representation that preserves the same input-output relationship and interpret the parameter."
      ],
      distractors: [
        "Assume the model is valid beyond its stated domain.",
        "Confuse an input value with the function output.",
        "Choose a graph with the right shape but the wrong intercept or scale.",
        "Describe a trend without connecting it to the model parameter."
      ],
      explanation: "AP Precalculus questions ask students to model, compare representations, and interpret function behavior in context."
    },
    Science: {
      focus: "scientific modeling, data analysis, and experimental reasoning",
      evidence: "models, variables, data trends, uncertainty, and mechanisms",
      setLength: 4,
      stimuli: [
        "An investigation about {unit} includes a data table and a proposed explanation.",
        "A model or diagram represents a process related to {unit}.",
        "A lab group changes one variable in a system involving {unit} and observes a trend."
      ],
      stems: [
        "Which conclusion is best supported by the evidence?",
        "Which explanation best connects the model to the trend?",
        "Which experimental change would most improve the investigation?",
        "Which claim-evidence-reasoning statement is strongest?"
      ],
      correct: [
        "State a testable claim, cite the relevant trend, and explain the mechanism that links {unit} to the result.",
        "Use the model and data together, identify the variable relationship, and justify the conclusion scientifically."
      ],
      distractors: [
        "Name a concept but do not connect it to the evidence.",
        "Describe the trend but provide no mechanism.",
        "Change several variables at once, making the result hard to interpret.",
        "Make a claim that goes beyond the data in the stimulus."
      ],
      explanation: "AP science items reward claims supported by data, controlled designs, and mechanisms tied to models."
    },
    Chemistry: {
      focus: "chemical models, particulate reasoning, calculation, and lab evidence",
      evidence: "particulate diagrams, equations, tables, equilibrium expressions, and experimental data",
      setLength: 4,
      stimuli: [
        "A reaction or particulate model is shown for {unit} with supporting data.",
        "A lab scenario involving {unit} gives measurements and asks for an evidence-based conclusion.",
        "A chemical system is disturbed and the response must be explained using {unit}."
      ],
      stems: [
        "Which claim is best supported by the data?",
        "Which particulate-level explanation is most accurate?",
        "Which calculation or setup matches the chemical situation?",
        "Which change would improve the experimental design?"
      ],
      correct: [
        "Use the balanced relationship or model, connect it to the data, and explain the particulate or energetic reason.",
        "Identify the limiting condition, show the appropriate setup, and justify the chemical conclusion."
      ],
      distractors: [
        "Use coefficients as measurements without connecting them to moles or particles.",
        "State a trend but omit the particulate explanation.",
        "Ignore equilibrium or energy changes when predicting direction.",
        "Use an uncontrolled comparison from the experiment."
      ],
      explanation: "AP Chemistry blends calculations with particulate models, equations, and lab evidence."
    },
    Biology: {
      focus: "biological mechanisms, models, evolution, and data analysis",
      evidence: "graphs, experimental controls, models, genetic evidence, and ecological data",
      setLength: 4,
      stimuli: [
        "A biological investigation about {unit} presents data and a proposed mechanism.",
        "A model of a cellular, genetic, evolutionary, or ecological process related to {unit} is shown.",
        "A researcher changes one variable connected to {unit} and measures a response."
      ],
      stems: [
        "Which conclusion is best supported?",
        "Which mechanism explains the observed pattern?",
        "Which control or variable would strengthen the investigation?",
        "Which prediction follows from the model?"
      ],
      correct: [
        "Link the data trend to a biological mechanism and identify the relevant control or variable.",
        "Use the model to make a prediction and justify it with evidence from the stimulus."
      ],
      distractors: [
        "Describe the graph without explaining the biological mechanism.",
        "Confuse correlation with direct causation.",
        "Change multiple variables and weaken the experimental comparison.",
        "Make a population-level claim from one individual observation."
      ],
      explanation: "AP Biology questions pair data or models with mechanism, experimental design, and evidence-based prediction."
    },
    Physics: {
      focus: "physical models, representations, and quantitative reasoning",
      evidence: "diagrams, graphs, equations, units, assumptions, and experimental data",
      setLength: 3,
      stimuli: [
        "A physical system involving {unit} is represented by a diagram and graph.",
        "A student proposes a model for {unit} and compares it with data.",
        "A lab setup involving {unit} asks for a prediction, justification, or source of uncertainty."
      ],
      stems: [
        "Which statement best translates the representation?",
        "Which equation or graph best supports the prediction?",
        "Which justification uses the model correctly?",
        "Which experimental change would reduce uncertainty?"
      ],
      correct: [
        "Apply the physical law with consistent units, state the assumption, and connect the result to the representation.",
        "Use the graph or diagram to justify the direction, sign, or magnitude of the physical quantity."
      ],
      distractors: [
        "Use the correct equation but assign the wrong sign or direction.",
        "Ignore the stated assumption or system boundary.",
        "Treat a proportional relationship as an equality without a constant.",
        "Give a calculation with no physical interpretation."
      ],
      explanation: "AP Physics questions reward modeling, representation translation, assumptions, units, and experimental reasoning."
    },
    History: {
      focus: "historical evidence, sourcing, context, and argumentation",
      evidence: "documents, chronology, point of view, causation, comparison, continuity, and change",
      setLength: 3,
      stimuli: [
        "A short historical source about {unit} includes author, audience, and context.",
        "A set of events connected to {unit} must be analyzed using a historical reasoning process.",
        "A document excerpt is paired with a broader development involving {unit}."
      ],
      stems: [
        "Which statement best uses the source as evidence?",
        "Which claim would make the strongest historical argument?",
        "Which context best supports the analysis?",
        "Which explanation best addresses cause, comparison, continuity, or change?"
      ],
      correct: [
        "Make a defensible claim, connect the source to context, and explain how the evidence supports the argument.",
        "Use the source situation or point of view to support a specific claim about {unit}."
      ],
      distractors: [
        "Summarize the source without explaining historical significance.",
        "Use an anachronistic explanation outside the period.",
        "List facts about {unit} without linking them to an argument.",
        "Make a claim too broad to defend with the evidence."
      ],
      explanation: "AP history questions require evidence, contextualization, sourcing, and historical reasoning beyond summary."
    },
    Government: {
      focus: "institutions, constitutional principles, political data, and argument",
      evidence: "scenarios, Supreme Court cases, foundational documents, charts, and political behavior",
      setLength: 3,
      stimuli: [
        "A political scenario involving {unit} is paired with a chart or constitutional principle.",
        "A Supreme Court case or foundational document is connected to {unit}.",
        "A data display shows a pattern in political participation, policy, or institutions."
      ],
      stems: [
        "Which application of the concept is most accurate?",
        "Which conclusion is best supported by the data?",
        "Which required case or document is most relevant?",
        "Which reasoning would strengthen the argument?"
      ],
      correct: [
        "Apply the course concept to the scenario and cite the relevant constitutional, case, or data evidence.",
        "Connect the institution or behavior to the data pattern and explain the political effect."
      ],
      distractors: [
        "Define the term without applying it to the scenario.",
        "Choose a plausible case that does not match the principle.",
        "Ignore the data trend in the chart.",
        "Make a value judgment instead of a course-based claim."
      ],
      explanation: "AP government items emphasize application, required documents and cases, quantitative analysis, and argument."
    },
    Economics: {
      focus: "economic models, graph shifts, incentives, and policy effects",
      evidence: "supply-demand graphs, market models, macro indicators, and policy scenarios",
      setLength: 3,
      stimuli: [
        "An economic model involving {unit} is shown with a change in policy or market conditions.",
        "A graph or table gives data related to {unit} and asks for a predicted effect.",
        "A scenario describes an incentive, shock, or policy tool connected to {unit}."
      ],
      stems: [
        "Which graph change is most accurate?",
        "Which outcome follows from the model?",
        "Which policy effect is best supported?",
        "Which explanation correctly links incentives to the result?"
      ],
      correct: [
        "Identify the correct model shift, state the direction of the effect, and explain the incentive or policy mechanism.",
        "Use the graph and economic vocabulary to connect the change to price, quantity, output, or welfare."
      ],
      distractors: [
        "Shift the wrong curve or move in the wrong direction.",
        "Describe the policy but not its effect on the model.",
        "Confuse nominal and real values or short run and long run.",
        "State an outcome that is not supported by the graph."
      ],
      explanation: "AP Economics questions ask students to use models, graph shifts, incentives, and policy reasoning."
    },
    Psychology: {
      focus: "psychological concepts, research methods, data interpretation, and evidence",
      evidence: "scenarios, research designs, data displays, claims, and psychological perspectives",
      setLength: 3,
      stimuli: [
        "A research scenario about {unit} includes a claim, method, and data summary.",
        "A behavioral example connected to {unit} asks for the best psychological explanation.",
        "A table or graph presents evidence related to {unit}."
      ],
      stems: [
        "Which concept is best applied to the scenario?",
        "Which conclusion is best supported by the data?",
        "Which research-method issue matters most?",
        "Which explanation uses evidence rather than a definition only?"
      ],
      correct: [
        "Apply the psychological concept to the specific behavior and cite the relevant evidence or method issue.",
        "Connect the data pattern to the claim while noting the research design limitation."
      ],
      distractors: [
        "Define the term without applying it to the example.",
        "Treat correlation as proof of causation.",
        "Ignore the sampling or operational-definition issue.",
        "Use a popular explanation instead of course vocabulary."
      ],
      explanation: "AP Psychology questions emphasize application, data interpretation, and research-method reasoning."
    },
    Geography: {
      focus: "spatial patterns, scale, data, and geographic models",
      evidence: "maps, graphs, landscapes, spatial data, and regional comparisons",
      setLength: 3,
      stimuli: [
        "A map, table, or scenario shows a spatial pattern related to {unit}.",
        "A geographic model is applied to a real-world situation involving {unit}.",
        "A regional comparison asks for an explanation using scale and spatial relationships."
      ],
      stems: [
        "Which geographic explanation best fits the pattern?",
        "Which data detail supports the conclusion?",
        "Which model or scale is most appropriate?",
        "Which consequence follows from the spatial pattern?"
      ],
      correct: [
        "Use the spatial evidence, identify the relevant scale, and explain the geographic process behind the pattern.",
        "Connect the model to the data and state a likely consequence in context."
      ],
      distractors: [
        "Describe the map but do not explain the process.",
        "Use the wrong scale for the conclusion.",
        "Ignore regional variation in the data.",
        "Use a definition without applying it to the place or pattern."
      ],
      explanation: "AP Human Geography items ask for spatial reasoning, scale, models, and evidence from maps or data."
    },
    EnglishLanguage: {
      focus: "rhetorical reading, claims, evidence, and revision",
      evidence: "rhetorical situation, line of reasoning, diction, syntax, evidence, and commentary",
      setLength: 3,
      stimuli: [
        "A nonfiction passage related to {unit} presents a claim, audience, and rhetorical choices.",
        "A draft paragraph about {unit} needs evidence, commentary, or revision.",
        "A short passage uses organization and style to persuade a specific audience."
      ],
      stems: [
        "Which choice best explains the rhetorical effect?",
        "Which revision strengthens the line of reasoning?",
        "Which evidence best supports the claim?",
        "Which commentary moves beyond summary?"
      ],
      correct: [
        "Identify the rhetorical choice, connect it to audience and purpose, and explain its effect.",
        "Choose evidence that directly supports the claim and add commentary that advances the reasoning."
      ],
      distractors: [
        "Summarize the passage without analyzing how it works.",
        "Name a device but misstate its effect.",
        "Add evidence that is related but not relevant to the claim.",
        "Shift to personal opinion instead of rhetorical analysis."
      ],
      explanation: "AP English Language questions focus on rhetorical situation, evidence, commentary, and revision."
    },
    EnglishLiterature: {
      focus: "close reading, literary interpretation, and textual evidence",
      evidence: "character, structure, narration, imagery, figurative language, and literary argument",
      setLength: 3,
      stimuli: [
        "A literary passage involving {unit} uses details, structure, and language to develop meaning.",
        "A poem or prose excerpt invites analysis of how choices shape interpretation.",
        "A prompt asks for the strongest evidence supporting an interpretation of {unit}."
      ],
      stems: [
        "Which interpretation is best supported by the passage?",
        "Which detail most directly supports the claim?",
        "Which statement best explains the effect of the literary choice?",
        "Which answer avoids plot summary?"
      ],
      correct: [
        "Use specific textual evidence and explain how the literary choice develops meaning or complexity.",
        "Connect the passage detail to a defensible interpretation rather than a plot summary."
      ],
      distractors: [
        "Retell the passage without interpreting it.",
        "Use a detail that appears in the passage but does not support the claim.",
        "Overstate a theme not grounded in the text.",
        "Name a device while giving a generic effect."
      ],
      explanation: "AP English Literature questions reward defensible interpretation, precise evidence, and commentary on literary choices."
    },
    WorldLanguage: {
      focus: "interpretive, interpersonal, presentational, and cultural communication",
      evidence: "source details, audience, register, vocabulary in context, and cultural perspective",
      setLength: 4,
      stimuli: [
        "A message, article, chart, or audio-summary transcript about {unit} is provided.",
        "A communication task about {unit} requires the right audience and register.",
        "A cultural comparison prompt connects {unit} to practices, products, or perspectives."
      ],
      stems: [
        "Which response best fits the audience and purpose?",
        "Which interpretation is best supported by the source?",
        "Which sentence uses the most appropriate register?",
        "Which answer best connects culture and communication?"
      ],
      correct: [
        "Use source details, select an appropriate register, and connect the answer to cultural context.",
        "Interpret the message according to audience, purpose, and evidence from the source."
      ],
      distractors: [
        "Translate words literally without considering context.",
        "Respond to only part of the task.",
        "Use cultural information too vague to support the answer.",
        "Ignore the audience or register."
      ],
      explanation: "AP world language questions combine interpretation, audience awareness, register, and cultural evidence."
    },
    Latin: {
      focus: "Latin translation, grammar, context, and textual analysis",
      evidence: "syntax, vocabulary, grammar, meter, authorial purpose, and Roman context",
      setLength: 3,
      stimuli: [
        "A Latin passage or translation choice related to {unit} is presented with context.",
        "A grammar or syntax feature in a Caesar or Vergil-style passage must be interpreted.",
        "A short excerpt asks how language and context shape meaning."
      ],
      stems: [
        "Which translation best preserves the grammar and meaning?",
        "Which grammatical explanation is most accurate?",
        "Which contextual detail best supports the interpretation?",
        "Which analysis best connects language to effect?"
      ],
      correct: [
        "Preserve the Latin syntax, identify the relevant grammar, and connect the wording to context.",
        "Use precise vocabulary and grammatical evidence to justify the interpretation."
      ],
      distractors: [
        "Translate loosely while ignoring the syntax.",
        "Identify the case or mood incorrectly.",
        "Use context that does not fit the passage.",
        "Paraphrase without explaining the Latin evidence."
      ],
      explanation: "AP Latin questions combine accurate translation, grammar, and contextual analysis."
    },
    SpanishLiterature: {
      focus: "literary analysis across the required Spanish-language works",
      evidence: "genre, period, theme, devices, context, and textual comparison",
      setLength: 3,
      stimuli: [
        "An excerpt or comparison prompt about {unit} asks for literary interpretation.",
        "A passage from a required-work style text is paired with a question about context and devices.",
        "A literary period or theme connected to {unit} is tested through evidence."
      ],
      stems: [
        "Which interpretation is best supported?",
        "Which device or feature is most relevant?",
        "Which context strengthens the comparison?",
        "Which answer best connects theme and evidence?"
      ],
      correct: [
        "Identify the literary feature, connect it to theme and period, and support the interpretation with textual evidence.",
        "Compare the works through a shared theme while explaining a meaningful difference."
      ],
      distractors: [
        "Summarize the plot without literary analysis.",
        "Name a period or movement but give no textual support.",
        "Use a device label that does not fit the passage.",
        "Make a comparison that is too general to defend."
      ],
      explanation: "AP Spanish Literature questions test required-work knowledge, textual evidence, and literary comparison."
    },
    ComputerScienceA: {
      focus: "Java program behavior, algorithms, classes, arrays, and data structures",
      evidence: "code segments, object state, loop traces, method calls, and edge cases",
      setLength: 3,
      stimuli: [
        "A Java code segment involving {unit} is shown with sample input.",
        "A class or method using {unit} must be traced for output or state changes.",
        "A student proposes a correction to code involving {unit}."
      ],
      stems: [
        "What is the result of executing the code?",
        "Which statement best describes the method behavior?",
        "Which replacement correctly fixes the issue?",
        "Which test case exposes the boundary condition?"
      ],
      correct: [
        "Trace the loop or method call step by step, update state correctly, and check the boundary case.",
        "Use the object or array abstraction correctly and explain the resulting behavior."
      ],
      distractors: [
        "Assume the loop runs one extra time.",
        "Ignore zero-based indexing or an array boundary.",
        "Describe the intended purpose instead of actual behavior.",
        "Fix one case while breaking another case."
      ],
      explanation: "AP Computer Science A questions require precise Java tracing, abstraction, and boundary-case reasoning."
    },
    ComputerSciencePrinciples: {
      focus: "computing systems, algorithms, data, abstraction, security, and impacts",
      evidence: "program descriptions, data tables, algorithms, networks, and computing-impact scenarios",
      setLength: 4,
      stimuli: [
        "A computing scenario involving {unit} describes data, an algorithm, or an impact.",
        "A block-based or pseudocode algorithm processes information related to {unit}.",
        "A network, security, or data-use scenario asks for the best computing explanation."
      ],
      stems: [
        "Which statement best describes the program behavior?",
        "Which abstraction or algorithmic idea is being used?",
        "Which impact or security concern is most relevant?",
        "Which data conclusion is best supported?"
      ],
      correct: [
        "Trace the algorithm, identify the abstraction or data relationship, and state the computing impact accurately.",
        "Use the scenario evidence to explain the program purpose, data use, or security tradeoff."
      ],
      distractors: [
        "Describe the program goal but not the actual behavior.",
        "Confuse encryption, authentication, and authorization.",
        "Assume all collected data is accurate or unbiased.",
        "Ignore the abstraction that hides implementation details."
      ],
      explanation: "AP CSP questions emphasize algorithms, abstraction, data, systems, cybersecurity, and impacts."
    },
    Cybersecurity: {
      focus: "security principles, risk, defense, incident response, and policy",
      evidence: "network diagrams, logs, vulnerabilities, controls, and risk scenarios",
      setLength: 4,
      stimuli: [
        "A security scenario involving {unit} includes logs, controls, or a vulnerability.",
        "An organization chooses a defense or policy related to {unit}.",
        "An incident-response timeline asks for the best next action."
      ],
      stems: [
        "Which control best reduces the risk?",
        "Which vulnerability is most likely?",
        "Which incident-response action should happen next?",
        "Which explanation best balances security and usability?"
      ],
      correct: [
        "Identify the threat, match it to an appropriate control, and justify the risk reduction.",
        "Use the log or scenario evidence to choose a response that preserves confidentiality, integrity, or availability."
      ],
      distractors: [
        "Choose a control that does not address the stated threat.",
        "Focus only on convenience and ignore risk.",
        "Erase evidence before containment or documentation.",
        "Confuse authentication with authorization."
      ],
      explanation: "AP Cybersecurity practice emphasizes applied risk analysis, defensive controls, and incident-response reasoning."
    },
    Business: {
      focus: "business decisions, personal finance, markets, accounting, and risk",
      evidence: "financial statements, budgets, customer data, market scenarios, and tradeoffs",
      setLength: 4,
      stimuli: [
        "A business or personal-finance scenario involving {unit} gives data and a decision point.",
        "A budget, statement, or market snapshot is used to evaluate {unit}.",
        "An entrepreneur compares options related to {unit}."
      ],
      stems: [
        "Which decision is best supported by the data?",
        "Which financial effect is most likely?",
        "Which risk or tradeoff should be considered first?",
        "Which explanation best applies the business concept?"
      ],
      correct: [
        "Use the financial or market data, identify the tradeoff, and justify the decision with the relevant concept.",
        "Connect the scenario to costs, benefits, risk, or customer value before choosing an action."
      ],
      distractors: [
        "Choose the highest revenue option without considering costs.",
        "Ignore risk, cash flow, or opportunity cost.",
        "Use a personal preference instead of the data.",
        "Apply the concept generally but not to the scenario."
      ],
      explanation: "AP Business with Personal Finance practice centers on data-backed decisions, tradeoffs, and applied financial reasoning."
    },
    ArtPortfolio: {
      focus: "portfolio development, visual evidence, process, and artistic intent",
      evidence: "materials, composition, process images, revision, selected works, and written evidence",
      setLength: 2,
      stimuli: [
        "A portfolio statement describes a sustained investigation connected to {unit}.",
        "A critique compares materials, process, and intent in work involving {unit}.",
        "An artist revises selected works after reviewing visual evidence."
      ],
      stems: [
        "Which critique best connects form and intent?",
        "Which revision would most strengthen the evidence?",
        "Which statement best explains process and outcome?",
        "Which choice best supports the sustained investigation?"
      ],
      correct: [
        "Connect materials, composition, and process decisions to the stated inquiry and visual evidence.",
        "Explain how revision and experimentation clarify the portfolio intent."
      ],
      distractors: [
        "Praise the work generally without visual evidence.",
        "Describe materials but ignore the inquiry.",
        "Choose a revision only because it is decorative.",
        "Discuss theme without linking it to specific work."
      ],
      explanation: "AP Art and Design portfolio review values sustained investigation, selected works, process, and visual evidence."
    },
    ArtHistory: {
      focus: "visual analysis, attribution, context, comparison, and continuity/change",
      evidence: "materials, form, function, content, context, patronage, and cultural setting",
      setLength: 3,
      stimuli: [
        "An artwork or monument related to {unit} is shown with title, culture, and date information.",
        "Two works connected to {unit} are compared by form, function, and context.",
        "A work is presented for attribution using visual and contextual evidence."
      ],
      stems: [
        "Which visual evidence best supports the attribution?",
        "Which contextual claim is most accurate?",
        "Which comparison best explains form and function?",
        "Which interpretation connects content and cultural setting?"
      ],
      correct: [
        "Use specific visual evidence and connect it to function, context, or cultural meaning.",
        "Compare form and context to explain how the work communicates meaning."
      ],
      distractors: [
        "Name the culture but provide no visual evidence.",
        "Use a context that fits another period or region.",
        "Describe appearance without explaining function.",
        "Make a comparison based only on subject matter."
      ],
      explanation: "AP Art History questions require visual evidence, contextual knowledge, attribution, and comparison."
    },
    MusicTheory: {
      focus: "aural skills, notation, harmony, voice leading, and analysis",
      evidence: "melodic contour, rhythm, chords, cadences, Roman numerals, and part-writing rules",
      setLength: 3,
      stimuli: [
        "A notated or described musical excerpt involving {unit} is presented.",
        "A harmonic progression or melodic line asks for analysis of {unit}.",
        "A listening-style transcript describes rhythm, contour, and cadence."
      ],
      stems: [
        "Which analysis is most accurate?",
        "Which notation choice best fits the excerpt?",
        "Which chord or cadence is implied?",
        "Which revision follows common-practice voice-leading rules?"
      ],
      correct: [
        "Identify the pitch, rhythm, chord, or cadence from the evidence and apply standard notation or voice-leading rules.",
        "Use the melodic and harmonic context to justify the analysis."
      ],
      distractors: [
        "Choose a chord quality that conflicts with the key.",
        "Ignore the meter or rhythmic placement.",
        "Create parallel motion or unresolved tendency tones.",
        "Analyze the cadence without considering the bass and soprano."
      ],
      explanation: "AP Music Theory questions combine aural recognition, notation, harmony, and common-practice rules."
    },
    Capstone: {
      focus: "research design, source evaluation, synthesis, and argument",
      evidence: "claims, evidence, credibility, limitations, perspectives, and line of reasoning",
      setLength: 3,
      stimuli: [
        "A research scenario about {unit} includes a question, source, and limitation.",
        "A student develops an argument about {unit} using multiple perspectives.",
        "A presentation defense question asks the student to justify a research choice."
      ],
      stems: [
        "Which revision best narrows the research question?",
        "Which source evaluation is most useful?",
        "Which evidence best supports the line of reasoning?",
        "Which limitation should be acknowledged?"
      ],
      correct: [
        "Connect source credibility, relevance, and limitations to a focused research claim.",
        "Synthesize evidence from multiple perspectives and explain how it supports the argument."
      ],
      distractors: [
        "Use a source only because it agrees with the claim.",
        "Summarize sources one by one without synthesis.",
        "Ask a question too broad to investigate.",
        "Ignore a limitation in the evidence."
      ],
      explanation: "AP Capstone work values focused inquiry, credibility, synthesis, limitations, and defensible argument."
    }
  };

  function part(label, criterionLabel, groups, options = {}) {
    return { label, criteria: [{ label: criterionLabel, groups, ...options }] };
  }

  function frq(title, stimulus, parts) {
    return { title, stimulus, parts };
  }

  function claimParts() {
    return [
      part("(a) State a defensible claim or answer.", "States a defensible claim", [["claim", "argue", "answer", "thesis", "position", "because"]], { minWords: 6 }),
      part("(b) Use specific evidence from the stimulus or course content.", "Uses specific evidence", [["evidence", "data", "source", "example", "detail", "document", "shows"]], { minWords: 8 }),
      part("(c) Explain how the evidence supports the claim.", "Explains reasoning", [["because", "therefore", "explains", "causes", "supports", "reason", "leads"]], { minWords: 10 }),
      part("(d) Address a limitation, comparison, or broader implication.", "Adds complexity or implication", [["however", "although", "compare", "contrast", "limitation", "implication", "context"]], { minWords: 10, minHits: 1 })
    ];
  }

  function scienceParts() {
    return [
      part("(a) State a testable claim or prediction.", "States claim or prediction", [["claim", "predict", "hypothesis", "increase", "decrease", "relationship"]], { minWords: 6 }),
      part("(b) Identify the independent variable, dependent variable, or control.", "Identifies variables or control", [["independent", "dependent", "control", "variable", "constant", "treatment"]], { minWords: 6, minHits: 1 }),
      part("(c) Use data or a model as evidence.", "Uses data or model evidence", [["data", "evidence", "trend", "graph", "table", "model", "diagram"]], { minWords: 8 }),
      part("(d) Explain the mechanism or source of uncertainty.", "Explains mechanism or uncertainty", [["because", "mechanism", "uncertainty", "error", "process", "particle", "system", "control"]], { minWords: 10, minHits: 1 })
    ];
  }

  function mathParts() {
    return [
      part("(a) Identify the needed representation or quantity.", "Identifies representation or quantity", [["graph", "table", "quantity", "rate", "function", "model", "variable"]], { minWords: 5 }),
      part("(b) Set up the calculation or symbolic relationship.", "Sets up valid work", [["equation", "derivative", "integral", "limit", "calculate", "setup", "expression"]], { minWords: 5 }),
      part("(c) Carry out the work and report the result.", "Reports a result", [["equals", "result", "value", "answer", "approximately", "approx", "="]], { minWords: 3, minHits: 1 }),
      part("(d) Interpret or justify the result in context.", "Interprets or justifies", [["because", "context", "units", "means", "therefore", "valid", "represents"]], { minWords: 8, minHits: 1 })
    ];
  }

  function essayParts() {
    return [
      part("(a) Write a defensible thesis.", "States a defensible thesis", [["claim", "thesis", "argue", "reveals", "shows", "position"]], { minWords: 8 }),
      part("(b) Select specific textual or source evidence.", "Uses evidence", [["evidence", "quote", "detail", "source", "example", "document", "passage"]], { minWords: 8 }),
      part("(c) Explain how the evidence supports the line of reasoning.", "Provides commentary", [["because", "therefore", "suggests", "emphasizes", "develops", "supports", "conveys"]], { minWords: 12 }),
      part("(d) Address complexity, purpose, or context.", "Addresses complexity", [["although", "however", "complex", "purpose", "context", "tension", "audience", "period"]], { minWords: 12, minHits: 1 })
    ];
  }

  function codeParts() {
    return [
      part("(a) Describe the purpose, input, or output.", "Describes purpose or I/O", [["purpose", "input", "output", "program", "method", "procedure"]], { minWords: 6 }),
      part("(b) Explain the algorithm or abstraction.", "Explains algorithm or abstraction", [["algorithm", "abstraction", "loop", "condition", "list", "array", "class", "method"]], { minWords: 8 }),
      part("(c) Trace a test case or justify behavior.", "Traces behavior", [["test", "case", "trace", "returns", "result", "because", "iteration"]], { minWords: 8 }),
      part("(d) Identify an improvement, limitation, or impact.", "Identifies improvement or impact", [["improve", "limitation", "impact", "security", "efficiency", "privacy", "bias"]], { minWords: 8, minHits: 1 })
    ];
  }

  function portfolioParts() {
    return [
      part("(a) State the inquiry or artistic intent.", "States inquiry or intent", [["inquiry", "intent", "idea", "question", "investigation", "sustained"]], { minWords: 6 }),
      part("(b) Describe specific visual evidence.", "Uses visual evidence", [["visual", "composition", "material", "process", "form", "evidence", "surface", "space"]], { minWords: 8 }),
      part("(c) Explain revision or experimentation.", "Explains process", [["revise", "revision", "experiment", "process", "develop", "iteration", "choice"]], { minWords: 10, minHits: 1 }),
      part("(d) Justify why the work belongs in the portfolio.", "Justifies selection", [["selected", "portfolio", "because", "demonstrates", "supports", "skill", "intent"]], { minWords: 8, minHits: 1 })
    ];
  }

  const FRQ_BLUEPRINTS = {
    "AP 2-D Art and Design": [
      frq("Sustained Investigation Reflection", "Explain how a 2-D portfolio inquiry develops through materials, composition, and revision in {unit}.", portfolioParts()),
      frq("Selected Works Rationale", "Choose works for Selected Works review and justify how design decisions show skill and intent in {unit}.", portfolioParts())
    ],
    "AP 3-D Art and Design": [
      frq("Sustained Investigation Reflection", "Explain how a 3-D portfolio inquiry develops through space, materials, and revision in {unit}.", portfolioParts()),
      frq("Selected Works Rationale", "Choose works for Selected Works review and justify how form, surface, and installation choices show intent.", portfolioParts())
    ],
    "AP Drawing": [
      frq("Sustained Investigation Reflection", "Explain how a drawing inquiry develops through mark-making, composition, and revision in {unit}.", portfolioParts()),
      frq("Selected Works Rationale", "Choose drawings for Selected Works review and justify how visual evidence shows skill and intent.", portfolioParts())
    ],
    "AP Art History": [
      frq("Long Visual Analysis", "Analyze how form, function, content, and context shape meaning in a work connected to {unit}.", claimParts()),
      frq("Contextual Analysis", "Explain how historical context affects the function or meaning of a work from {unit}.", claimParts()),
      frq("Comparative Analysis", "Compare two works by visual evidence, function, and cultural context.", claimParts()),
      frq("Attribution", "Attribute an unknown work using visual and contextual evidence.", claimParts()),
      frq("Continuity and Change", "Explain continuity or change in artistic traditions connected to {unit}.", claimParts()),
      frq("Short Visual Evidence", "Use one visual detail to support an interpretation of a work.", claimParts())
    ],
    "AP Music Theory": [
      frq("Melodic Dictation", "Notate or describe the pitch and rhythm pattern from a listening-style transcript.", claimParts()),
      frq("Melodic Dictation", "Complete a second melodic-dictation style task using contour, meter, and cadence evidence.", claimParts()),
      frq("Harmonic Dictation", "Analyze a harmonic progression using bass motion, chord quality, and cadence.", claimParts()),
      frq("Harmonic Dictation", "Complete a second harmonic-dictation style task with Roman numerals and voice leading.", claimParts()),
      frq("Part Writing", "Write or evaluate outer voices using common-practice voice-leading rules.", claimParts()),
      frq("Figured Bass", "Realize a figured-bass style progression and justify the chord choices.", claimParts()),
      frq("Harmonic Analysis", "Analyze phrase structure, cadence, and harmonic function in an excerpt.", claimParts()),
      frq("Sight Singing", "Plan a sight-singing response using key, meter, contour, and cadence.", claimParts()),
      frq("Sight Singing", "Plan a second sight-singing response with rhythm and interval evidence.", claimParts())
    ],
    "AP Biology": [
      frq("Long Investigation", "A biological investigation about {unit} includes a model, variables, and data.", scienceParts()),
      frq("Long Model Analysis", "A model of a biological process related to {unit} must be explained and evaluated.", scienceParts()),
      frq("Scientific Investigation", "Design or critique a controlled experiment connected to {unit}.", scienceParts()),
      frq("Conceptual Analysis", "Use a biological mechanism to explain a pattern related to {unit}.", scienceParts()),
      frq("Model or Visual Analysis", "Interpret a model, diagram, or visual representation involving {unit}.", scienceParts()),
      frq("Data Analysis", "Use a graph or table to support a claim about {unit}.", scienceParts())
    ],
    "AP Chemistry": [
      frq("Long Experimental Design", "A laboratory investigation involving {unit} asks for variables, data, and chemical reasoning.", scienceParts()),
      frq("Long Quantitative Analysis", "A chemical system involving {unit} requires calculation and particulate-level reasoning.", scienceParts()),
      frq("Long Model Analysis", "A reaction or equilibrium model must be explained using evidence from {unit}.", scienceParts()),
      frq("Short Atomic or Molecular Reasoning", "Explain a trend or structure-property relationship involving {unit}.", scienceParts()),
      frq("Short Reaction Analysis", "Use a balanced relationship or rate data to justify a claim about {unit}.", scienceParts()),
      frq("Short Equilibrium or Acid-Base Task", "Predict and justify how a chemical system responds to a change.", scienceParts()),
      frq("Short Lab/Data Task", "Evaluate a measurement, error source, or data conclusion in a chemistry lab.", scienceParts())
    ],
    "AP Environmental Science": [
      frq("Design an Investigation", "Design a field or lab investigation related to {unit}.", scienceParts()),
      frq("Analyze a Problem and Propose a Solution", "Use environmental data to explain a problem and evaluate a solution involving {unit}.", scienceParts()),
      frq("Environmental Calculation", "Perform and interpret a calculation in an environmental context related to {unit}.", scienceParts())
    ],
    "AP Physics 1: Algebra-Based": [
      frq("Mathematical Routines", "Use algebraic relationships and units to analyze a system involving {unit}.", mathParts()),
      frq("Experimental Design", "Design or evaluate a physics experiment connected to {unit}.", scienceParts()),
      frq("Qualitative and Quantitative Translation", "Translate among diagrams, graphs, equations, and words for {unit}.", mathParts()),
      frq("Paragraph Argument", "Write a concise physics argument using evidence and a model.", claimParts())
    ],
    "AP Physics 2: Algebra-Based": [
      frq("Mathematical Routines", "Analyze a physical system involving {unit} with equations and units.", mathParts()),
      frq("Experimental Design", "Design or evaluate an experiment involving {unit}.", scienceParts()),
      frq("Representation Translation", "Translate among diagrams, graphs, and equations in a {unit} context.", mathParts()),
      frq("Paragraph Argument", "Write an evidence-based physics explanation using a model.", claimParts())
    ],
    "AP Physics C: Electricity and Magnetism": [
      frq("Calculus-Based Modeling", "Use calculus and physical laws to model a system involving {unit}.", mathParts()),
      frq("Experimental Design", "Design or critique an E&M investigation with variables and uncertainty.", scienceParts()),
      frq("Representation Translation", "Translate among fields, potentials, circuits, graphs, and equations.", mathParts()),
      frq("Derivation and Argument", "Derive or justify a relationship using calculus-based E&M reasoning.", claimParts())
    ],
    "AP Physics C: Mechanics": [
      frq("Calculus-Based Modeling", "Use calculus and physical laws to model a mechanics system involving {unit}.", mathParts()),
      frq("Experimental Design", "Design or critique a mechanics investigation with variables and uncertainty.", scienceParts()),
      frq("Representation Translation", "Translate among diagrams, graphs, equations, and physical meaning.", mathParts()),
      frq("Derivation and Argument", "Derive or justify a relationship using calculus-based mechanics reasoning.", claimParts())
    ],
    "AP Calculus AB": [
      frq("Graph and Rate Problem", "A graph or table gives a rate connected to {unit}; use it to answer multi-step questions.", mathParts()),
      frq("Differentiation in Context", "Use derivative information to analyze behavior and justify a conclusion.", mathParts()),
      frq("Integral and Accumulation", "Set up and interpret an accumulation problem involving {unit}.", mathParts()),
      frq("Differential Equation", "Solve or interpret a differential-equation model in context.", mathParts()),
      frq("Function Analysis", "Use limits, derivatives, and intervals to analyze a function.", mathParts()),
      frq("Application and Justification", "Choose a calculus method and justify the result in context.", mathParts())
    ],
    "AP Calculus BC": [
      frq("Graph and Rate Problem", "A graph or table gives a rate connected to {unit}; use it to answer multi-step questions.", mathParts()),
      frq("Parametric or Polar Analysis", "Analyze a parametric or polar relationship using calculus.", mathParts()),
      frq("Integral and Accumulation", "Set up and interpret an accumulation problem involving {unit}.", mathParts()),
      frq("Differential Equation", "Solve or interpret a differential-equation model in context.", mathParts()),
      frq("Series Analysis", "Use a Taylor or power series to approximate and justify an error bound.", mathParts()),
      frq("Function Analysis", "Use derivatives, integrals, and representation to analyze a function.", mathParts())
    ],
    "AP Precalculus": [
      frq("Function Model", "Build and interpret a function model involving {unit}.", mathParts()),
      frq("Graph and Table Analysis", "Use a graph or table to justify features of a model.", mathParts()),
      frq("Transformation or Composition", "Analyze transformations, composition, or inverse relationships in context.", mathParts()),
      frq("Modeling Choice", "Compare models and justify which is most appropriate for the context.", mathParts())
    ],
    "AP English Language and Composition": [
      frq("Synthesis Essay", "Use multiple sources to develop a defensible argument about an issue connected to {unit}.", essayParts()),
      frq("Rhetorical Analysis Essay", "Analyze how a writer uses rhetorical choices to achieve a purpose for an audience.", essayParts()),
      frq("Argument Essay", "Develop an evidence-based argument responding to a claim about {unit}.", essayParts())
    ],
    "AP English Literature and Composition": [
      frq("Poetry Analysis", "Analyze how poetic choices develop meaning in a poem connected to {unit}.", essayParts()),
      frq("Prose Fiction Analysis", "Analyze how narrative choices develop character, conflict, or theme.", essayParts()),
      frq("Literary Argument", "Use a work of literary merit to develop an argument about {unit}.", essayParts())
    ],
    "AP United States History": [
      frq("Short-Answer Question 1", "Use a secondary source or image to answer a short-answer prompt about {unit}.", claimParts()),
      frq("Short-Answer Question 2", "Use primary-source evidence to explain a historical development.", claimParts()),
      frq("Short-Answer Question 3", "Answer a period-focused prompt using specific historical evidence.", claimParts()),
      frq("Document-Based Question", "Use a document set, context, sourcing, and outside evidence to build an argument.", essayParts()),
      frq("Long Essay Question", "Develop a thesis-driven historical argument using a reasoning process.", essayParts())
    ],
    "AP European History": [
      frq("Short-Answer Question 1", "Use a source or image to answer a short-answer prompt about {unit}.", claimParts()),
      frq("Short-Answer Question 2", "Use primary-source evidence to explain a European historical development.", claimParts()),
      frq("Short-Answer Question 3", "Answer a period-focused prompt using specific historical evidence.", claimParts()),
      frq("Document-Based Question", "Use documents, context, sourcing, and outside evidence to build an argument.", essayParts()),
      frq("Long Essay Question", "Develop a thesis-driven historical argument using a reasoning process.", essayParts())
    ],
    "AP World History: Modern": [
      frq("Short-Answer Question 1", "Use a secondary source or image to answer a prompt about {unit}.", claimParts()),
      frq("Short-Answer Question 2", "Use primary-source evidence to explain a global historical development.", claimParts()),
      frq("Short-Answer Question 3", "Answer a period-focused prompt using specific historical evidence.", claimParts()),
      frq("Document-Based Question", "Use documents, context, sourcing, and outside evidence to build an argument.", essayParts()),
      frq("Long Essay Question", "Develop a thesis-driven historical argument using a reasoning process.", essayParts())
    ],
    "AP African American Studies": [
      frq("Project Validation", "Explain how a source, artifact, or method supports an individual project claim.", claimParts()),
      frq("Short-Answer Source Analysis", "Use a source to analyze a development in African American Studies.", claimParts()),
      frq("Short-Answer Data or Visual Analysis", "Use a data display or visual source as evidence.", claimParts()),
      frq("Short-Answer Course-Content Analysis", "Use course content to explain continuity, change, or comparison.", claimParts()),
      frq("Document-Based Question", "Use documents and course knowledge to build an argument.", essayParts())
    ],
    "AP United States Government and Politics": [
      frq("Concept Application", "Apply a political concept to a real-world scenario.", claimParts()),
      frq("Quantitative Analysis", "Use a chart, table, or map to support a political conclusion.", claimParts()),
      frq("SCOTUS Comparison", "Compare a required Supreme Court case to a new scenario or case.", claimParts()),
      frq("Argument Essay", "Use a foundational document or required case to support an argument.", essayParts())
    ],
    "AP Comparative Government and Politics": [
      frq("Conceptual Analysis", "Apply a comparative-government concept to a country scenario.", claimParts()),
      frq("Quantitative Analysis", "Use a political data display to support a comparative claim.", claimParts()),
      frq("Comparative Analysis", "Compare institutions, citizen behavior, or policy outcomes across countries.", claimParts()),
      frq("Argument Essay", "Develop an argument about comparative politics using country evidence.", essayParts())
    ],
    "AP Human Geography": [
      frq("No-Stimulus Geographic Situation", "Apply geographic concepts to a real-world situation involving {unit}.", claimParts()),
      frq("Data or Map Stimulus", "Use a map, table, or graph to explain a spatial pattern.", claimParts()),
      frq("Two-Stimulus Geographic Analysis", "Compare sources and explain a geographic process or consequence.", claimParts())
    ],
    "AP Macroeconomics": [
      frq("Long Macroeconomic Model", "Use a macroeconomic model, graph, and policy reasoning to analyze {unit}.", claimParts()),
      frq("Short Macroeconomic Graph", "Draw or explain a graph shift and its effect on an indicator.", claimParts()),
      frq("Short Policy or Open-Economy Task", "Explain a policy, money-market, or foreign-exchange effect.", claimParts())
    ],
    "AP Microeconomics": [
      frq("Long Microeconomic Model", "Use a market or firm model to analyze price, quantity, profit, or welfare.", claimParts()),
      frq("Short Market Graph", "Draw or explain a graph shift and its effect on a market outcome.", claimParts()),
      frq("Short Efficiency or Policy Task", "Explain efficiency, externalities, factor markets, or policy effects.", claimParts())
    ],
    "AP Psychology": [
      frq("Article Analysis Question", "Use research-method and data evidence to evaluate a psychology claim.", claimParts()),
      frq("Evidence-Based Question", "Apply psychological concepts to a scenario and support the answer with evidence.", claimParts())
    ],
    "AP Computer Science A": [
      frq("Methods and Control Structures", "Write or reason about a Java method using selection and iteration.", codeParts()),
      frq("Class Design", "Design or complete a Java class with fields, constructors, and methods.", codeParts()),
      frq("Array or ArrayList", "Process a one-dimensional array or ArrayList and justify behavior.", codeParts()),
      frq("2D Array", "Process a two-dimensional array using nested iteration and boundary reasoning.", codeParts())
    ],
    "AP Computer Science Principles": [
      frq("Program Design, Function, and Purpose", "Explain program purpose, input, output, and user need.", codeParts()),
      frq("Algorithm Development", "Explain sequencing, selection, iteration, and correctness for an algorithm.", codeParts()),
      frq("Errors and Testing", "Use test cases to explain a program error or limitation.", codeParts()),
      frq("Data and Procedural Abstraction", "Explain how data and abstraction manage complexity.", codeParts())
    ],
    "AP Cybersecurity": [
      frq("Applied Security Scenario", "Analyze a vulnerability, choose a control, and justify an incident-response plan.", codeParts())
    ],
    "AP Business with Personal Finance": [
      frq("Long Business Scenario", "Analyze a business and personal-finance decision using data and tradeoffs.", claimParts()),
      frq("Short Financial Calculation", "Use budget, credit, investing, or accounting data to justify a decision.", claimParts()),
      frq("Short Market or Customer Task", "Apply market or customer evidence to a business choice.", claimParts()),
      frq("Short Risk and Ethics Task", "Evaluate risk, ethics, or policy in a business scenario.", claimParts())
    ],
    "AP Chinese Language and Culture": [
      frq("Email Reply", "Write an interpersonal reply with appropriate register and details.", claimParts()),
      frq("Argumentative Essay", "Use sources to support a presentational argument.", essayParts()),
      frq("Conversation", "Plan spoken turns that address prompts and maintain interaction.", claimParts()),
      frq("Cultural Comparison", "Compare a cultural practice, product, or perspective.", claimParts())
    ],
    "AP French Language and Culture": [
      frq("Email Reply", "Write an interpersonal reply with appropriate register and details.", claimParts()),
      frq("Argumentative Essay", "Use sources to support a presentational argument.", essayParts()),
      frq("Conversation", "Plan spoken turns that address prompts and maintain interaction.", claimParts()),
      frq("Cultural Comparison", "Compare a cultural practice, product, or perspective.", claimParts())
    ],
    "AP German Language and Culture": [
      frq("Email Reply", "Write an interpersonal reply with appropriate register and details.", claimParts()),
      frq("Argumentative Essay", "Use sources to support a presentational argument.", essayParts()),
      frq("Conversation", "Plan spoken turns that address prompts and maintain interaction.", claimParts()),
      frq("Cultural Comparison", "Compare a cultural practice, product, or perspective.", claimParts())
    ],
    "AP Italian Language and Culture": [
      frq("Email Reply", "Write an interpersonal reply with appropriate register and details.", claimParts()),
      frq("Argumentative Essay", "Use sources to support a presentational argument.", essayParts()),
      frq("Conversation", "Plan spoken turns that address prompts and maintain interaction.", claimParts()),
      frq("Cultural Comparison", "Compare a cultural practice, product, or perspective.", claimParts())
    ],
    "AP Japanese Language and Culture": [
      frq("Text Chat", "Write an interpersonal reply with appropriate register and details.", claimParts()),
      frq("Compare and Contrast Essay", "Use sources or cultural knowledge to support a presentational comparison.", essayParts()),
      frq("Conversation", "Plan spoken turns that address prompts and maintain interaction.", claimParts()),
      frq("Cultural Presentation", "Present a cultural practice, product, or perspective with evidence.", claimParts())
    ],
    "AP Spanish Language and Culture": [
      frq("Email Reply", "Write an interpersonal reply with appropriate register and details.", claimParts()),
      frq("Argumentative Essay", "Use sources to support a presentational argument.", essayParts()),
      frq("Conversation", "Plan spoken turns that address prompts and maintain interaction.", claimParts()),
      frq("Cultural Comparison", "Compare a cultural practice, product, or perspective.", claimParts())
    ],
    "AP Latin": [
      frq("Translation", "Translate a Latin passage accurately and explain key grammar.", claimParts()),
      frq("Contextual Analysis", "Use context and Latin evidence to explain meaning.", claimParts()),
      frq("Short-Answer Analysis", "Answer grammar, syntax, or content questions with evidence.", claimParts()),
      frq("Analytical Essay", "Develop an essay about a theme, character, or authorial choice.", essayParts()),
      frq("Comparative Passage", "Compare Latin and non-syllabus evidence in context.", claimParts())
    ],
    "AP Spanish Literature and Culture": [
      frq("Textual Explanation", "Analyze an excerpt from a required-work style text.", claimParts()),
      frq("Text and Art Comparison", "Compare a literary text with an artwork or image.", claimParts()),
      frq("Analysis of Single Text", "Develop an essay analyzing theme, device, and context.", essayParts()),
      frq("Text Comparison Essay", "Compare two works through theme, period, and textual evidence.", essayParts())
    ],
    "AP Seminar": [
      frq("Source Analysis", "Evaluate source credibility, claims, and evidence.", claimParts()),
      frq("Evidence-Based Argument", "Synthesize provided sources into a defensible argument.", essayParts()),
      frq("Research Lens", "Explain how a lens changes interpretation of an issue.", claimParts()),
      frq("Presentation Defense", "Defend a research choice and acknowledge a limitation.", claimParts())
    ],
    "AP Research": [
      frq("Research Design Checkpoint", "Evaluate a research question, method, evidence, and limitation.", claimParts()),
      frq("Presentation and Oral Defense", "Defend conclusions, implications, and choices from a research project.", claimParts())
    ]
  };

  const MCQ_PROFILE_KEYS = {
    "AP Statistics": "Statistics",
    "AP Calculus AB": "Calculus",
    "AP Calculus BC": "Calculus",
    "AP Precalculus": "Precalculus",
    "AP Biology": "Biology",
    "AP Chemistry": "Chemistry",
    "AP Environmental Science": "Science",
    "AP Physics 1: Algebra-Based": "Physics",
    "AP Physics 2: Algebra-Based": "Physics",
    "AP Physics C: Electricity and Magnetism": "Physics",
    "AP Physics C: Mechanics": "Physics",
    "AP United States Government and Politics": "Government",
    "AP Comparative Government and Politics": "Government",
    "AP Macroeconomics": "Economics",
    "AP Microeconomics": "Economics",
    "AP Psychology": "Psychology",
    "AP Human Geography": "Geography",
    "AP English Language and Composition": "EnglishLanguage",
    "AP English Literature and Composition": "EnglishLiterature",
    "AP Latin": "Latin",
    "AP Spanish Literature and Culture": "SpanishLiterature",
    "AP Computer Science A": "ComputerScienceA",
    "AP Computer Science Principles": "ComputerSciencePrinciples",
    "AP Cybersecurity": "Cybersecurity",
    "AP Business with Personal Finance": "Business",
    "AP Art History": "ArtHistory",
    "AP Music Theory": "MusicTheory"
  };

  function subjectIconSvg(primary, secondary, accent, body) {
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-hidden='true'>" +
      "<defs><linearGradient id='g' x1='7' y1='5' x2='59' y2='61' gradientUnits='userSpaceOnUse'><stop stop-color='" + primary + "'/><stop offset='1' stop-color='" + secondary + "'/></linearGradient><radialGradient id='shine' cx='22%' cy='14%' r='70%'><stop stop-color='#ffffff' stop-opacity='.34'/><stop offset='.62' stop-color='#ffffff' stop-opacity='0'/></radialGradient><filter id='s' x='-20%' y='-20%' width='140%' height='150%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='#092d33' flood-opacity='.24'/></filter></defs>" +
      "<rect width='64' height='64' rx='16' fill='url(#g)'/><rect width='64' height='64' rx='16' fill='url(#shine)'/>" +
      body +
      "<circle cx='49' cy='49' r='9' fill='" + accent + "' stroke='#fff' stroke-width='3' filter='url(#s)'/></svg>";
  }

  const SUBJECT_ICON_SVGS = {
    "Math": subjectIconSvg("#075f64", "#2f6fed", "#ffd166", "<path d='M14 45h36M18 38c7-16 12-20 18-12 4 6 8 6 12-7' fill='none' stroke='#fff' stroke-width='4.4' stroke-linecap='round' stroke-linejoin='round'/><path d='M20 18v30M15 43h34' stroke='#c9fbff' stroke-width='3' stroke-linecap='round'/><circle cx='36' cy='28' r='3.5' fill='#ffe3a2'/><circle cx='47' cy='19' r='3.5' fill='#9bdcff'/>"),
    "Statistics": subjectIconSvg("#075f64", "#3498db", "#ffd166", "<path d='M16 45h34' stroke='#d7fbff' stroke-width='4' stroke-linecap='round'/><rect x='18' y='32' width='7' height='13' rx='2' fill='#ffffff'/><rect x='29' y='24' width='7' height='21' rx='2' fill='#fff7d7'/><rect x='40' y='17' width='7' height='28' rx='2' fill='#b9f4ff'/><path d='M18 20c9 7 18 8 30 1' fill='none' stroke='#ffd166' stroke-width='4' stroke-linecap='round'/>"),
    "Calculus": subjectIconSvg("#123c7c", "#5b6df0", "#ffd166", "<path d='M23 47c8-2 10-18 9-27-.5-5 2-8 8-7' fill='none' stroke='#fff' stroke-width='5' stroke-linecap='round'/><path d='M17 24c9-8 20-8 31 0M18 40c9 5 20 5 31 0' fill='none' stroke='#c9fbff' stroke-width='3.5' stroke-linecap='round'/><circle cx='43' cy='16' r='3.5' fill='#ffd166'/>"),
    "Precalculus": subjectIconSvg("#0b6b73", "#2f6fed", "#ffd166", "<path d='M17 44h31M20 44V17' stroke='#d7fbff' stroke-width='4' stroke-linecap='round'/><path d='M20 36c7-13 14-14 20-6 3 4 5 8 9 8' fill='none' stroke='#fff' stroke-width='4.5' stroke-linecap='round'/><path d='M27 22h14' stroke='#ffd166' stroke-width='4' stroke-linecap='round'/>"),
    "Science": subjectIconSvg("#0f766e", "#1f8bd8", "#ffd166", "<path d='M25 12h14M32 13v16l13 20H19l13-20' fill='#f2fffd' stroke='#fff' stroke-width='3.6' stroke-linejoin='round'/><path d='M23 43h18' stroke='#2f6fed' stroke-width='4.4' stroke-linecap='round'/><circle cx='42' cy='25' r='3' fill='#ffd166'/>"),
    "Biology": subjectIconSvg("#047857", "#22a06b", "#ffd166", "<path d='M18 39c12-20 26-24 32-20 0 15-13 28-32 20Z' fill='#f2fff8' stroke='#ffffff' stroke-width='3.4' stroke-linejoin='round'/><path d='M22 38c8-6 15-10 26-17M31 30c-1-5-4-9-8-12M37 26c3 2 7 3 12 2' fill='none' stroke='#0b7a62' stroke-width='3.2' stroke-linecap='round'/><circle cx='22' cy='47' r='4' fill='#9df2c9'/>"),
    "Chemistry": subjectIconSvg("#0f766e", "#7c3aed", "#ffd166", "<path d='M25 13h14M32 13v13l14 22H18l14-22' fill='#fbffff' stroke='#ffffff' stroke-width='3.6' stroke-linejoin='round'/><path d='M23 42h18' stroke='#f59e0b' stroke-width='4.2' stroke-linecap='round'/><circle cx='24' cy='30' r='3' fill='#38bdf8'/><circle cx='40' cy='33' r='3.5' fill='#a78bfa'/>"),
    "Physics": subjectIconSvg("#1d4ed8", "#111827", "#ffd166", "<circle cx='32' cy='32' r='4.5' fill='#ffffff'/><path d='M14 32c8-11 28-11 36 0-8 11-28 11-36 0ZM32 14c11 8 11 28 0 36-11-8-11-28 0-36Z' fill='none' stroke='#c9fbff' stroke-width='3.2'/><path d='M20 45l24-26' stroke='#ffd166' stroke-width='4' stroke-linecap='round'/>"),
    "Environmental": subjectIconSvg("#047857", "#0ea5a5", "#ffd166", "<path d='M17 42c8-18 21-26 34-24-1 15-15 26-34 24Z' fill='#ecfdf5' stroke='#fff' stroke-width='3.4' stroke-linejoin='round'/><path d='M21 40c7-5 15-10 27-19' stroke='#047857' stroke-width='3.4' stroke-linecap='round'/><path d='M18 21c3 6 8 9 15 9' fill='none' stroke='#b7ffdf' stroke-width='3.4' stroke-linecap='round'/>"),
    "History": subjectIconSvg("#6d28d9", "#b45309", "#ffd166", "<path d='M14 24l18-11 18 11H14Z' fill='#fff7ed'/><path d='M18 28h28v17H18z' fill='#ffffff'/><path d='M23 30v13M32 30v13M41 30v13' stroke='#6d28d9' stroke-width='3.4' stroke-linecap='round'/><path d='M16 49h32' stroke='#ffd166' stroke-width='4.5' stroke-linecap='round'/>"),
    "Government": subjectIconSvg("#0e7490", "#1d4ed8", "#ffd166", "<path d='M15 25l17-10 17 10H15Z' fill='#ffffff'/><path d='M20 28h24v16H20z' fill='#eefbff'/><path d='M25 30v12M32 30v12M39 30v12' stroke='#0e7490' stroke-width='3.3' stroke-linecap='round'/><path d='M17 48h30' stroke='#ffd166' stroke-width='4.5' stroke-linecap='round'/>"),
    "Economics": subjectIconSvg("#065f46", "#0f8a8a", "#ffd166", "<path d='M17 43h31M20 43V18' stroke='#d7fbff' stroke-width='4' stroke-linecap='round'/><path d='M20 37c8-9 16-12 29-17' fill='none' stroke='#ffffff' stroke-width='4.4' stroke-linecap='round'/><path d='M39 20h10v10' fill='none' stroke='#ffd166' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><circle cx='26' cy='33' r='3.5' fill='#9df2c9'/>"),
    "Psychology": subjectIconSvg("#7c3aed", "#db2777", "#ffd166", "<path d='M22 43c-4-4-6-9-5-15 2-11 13-16 23-10 6 4 8 12 5 20-2 5-6 8-11 9' fill='none' stroke='#ffffff' stroke-width='4.2' stroke-linecap='round'/><path d='M29 23c5 2 8 6 8 12M24 34h16' stroke='#fee2ff' stroke-width='3.4' stroke-linecap='round'/><circle cx='27' cy='27' r='3' fill='#ffd166'/>"),
    "Geography": subjectIconSvg("#047857", "#2f6fed", "#ffd166", "<circle cx='32' cy='32' r='18' fill='#eff6ff' stroke='#fff' stroke-width='3.5'/><path d='M14 32h36M32 14c-7 8-7 28 0 36M32 14c7 8 7 28 0 36' fill='none' stroke='#0f766e' stroke-width='2.8' stroke-linecap='round'/><path d='M22 24c4-3 8-4 13-3M25 41c5 2 10 2 17-2' stroke='#2f6fed' stroke-width='3' stroke-linecap='round'/>"),
    "English": subjectIconSvg("#9a3412", "#db2777", "#ffd166", "<path d='M16 18h19c6 0 10 4 10 10v20H26c-6 0-10-4-10-10Z' fill='#fff7ed' stroke='#fff' stroke-width='3'/><path d='M25 28h17M25 36h13' stroke='#9a3412' stroke-width='3.6' stroke-linecap='round'/><path d='M45 16l6 6-14 14-8 2 2-8Z' fill='#b9f4ff' stroke='#fff' stroke-width='2.2'/>"),
    "World Lang": subjectIconSvg("#1d4ed8", "#0f8a8a", "#ffd166", "<path d='M16 18h31a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8H35l-11 7v-7h-8a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8Z' fill='#eff6ff'/><path d='M19 32h27M32 22c-4 6-4 14 0 20M32 22c4 6 4 14 0 20' stroke='#1d4ed8' stroke-width='3' fill='none' stroke-linecap='round'/>"),
    "Latin": subjectIconSvg("#6d28d9", "#334155", "#ffd166", "<path d='M18 17h29' stroke='#fff' stroke-width='5' stroke-linecap='round'/><path d='M25 17v29h18' stroke='#fff7ed' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/><path d='M24 31h14' stroke='#ffd166' stroke-width='4' stroke-linecap='round'/><path d='M44 19c4 5 5 10 2 17' fill='none' stroke='#c9fbff' stroke-width='3.4' stroke-linecap='round'/>"),
    "SpanishLiterature": subjectIconSvg("#b91c1c", "#f59e0b", "#fff1a8", "<path d='M17 18h18c6 0 10 4 10 10v19H27c-6 0-10-4-10-10Z' fill='#fff7ed' stroke='#fff' stroke-width='3'/><path d='M24 29h18M24 37h13' stroke='#b91c1c' stroke-width='3.5' stroke-linecap='round'/><path d='M44 18l5 5' stroke='#ffd166' stroke-width='5' stroke-linecap='round'/>"),
    "Arts": subjectIconSvg("#db2777", "#7c3aed", "#ffd166", "<path d='M17 43c8-18 20-27 32-25 4 1 4 6 1 9-9 8-17 15-33 16Z' fill='#fff' stroke='#fff' stroke-width='2'/><circle cx='24' cy='26' r='4' fill='#fde047'/><circle cx='34' cy='21' r='4' fill='#38bdf8'/><circle cx='43' cy='28' r='4' fill='#34d399'/>"),
    "ArtPortfolio": subjectIconSvg("#be185d", "#f97316", "#fff1a8", "<rect x='17' y='16' width='30' height='33' rx='4' fill='#fff' stroke='#fff' stroke-width='3'/><path d='M21 39l8-9 6 6 4-5 6 8' fill='none' stroke='#be185d' stroke-width='3.6' stroke-linecap='round' stroke-linejoin='round'/><circle cx='26' cy='24' r='3.5' fill='#38bdf8'/>"),
    "ArtHistory": subjectIconSvg("#7c2d12", "#db2777", "#ffd166", "<path d='M18 46V25l14-9 14 9v21' fill='#fff7ed' stroke='#fff' stroke-width='3.4' stroke-linejoin='round'/><path d='M23 28h18M23 36h18' stroke='#7c2d12' stroke-width='3.3' stroke-linecap='round'/><path d='M16 50h32' stroke='#ffd166' stroke-width='4.5' stroke-linecap='round'/>"),
    "MusicTheory": subjectIconSvg("#4c1d95", "#1d4ed8", "#ffd166", "<path d='M38 17v24a7 7 0 1 1-5-7V22l15-4v18a7 7 0 1 1-5-7V16Z' fill='#fff7ed'/><path d='M20 22h15M20 30h15M20 38h15' stroke='#a7f3d0' stroke-width='2.8' stroke-linecap='round'/>"),
    "CS": subjectIconSvg("#111827", "#2563eb", "#ffd166", "<path d='M25 22l-9 10 9 10M39 22l9 10-9 10' fill='none' stroke='#67e8f9' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/><path d='M35 18l-6 28' stroke='#ffd166' stroke-width='4.8' stroke-linecap='round'/><rect x='18' y='15' width='28' height='34' rx='5' fill='none' stroke='#ffffff' stroke-opacity='.32' stroke-width='2'/>"),
    "Cybersecurity": subjectIconSvg("#111827", "#0f766e", "#ffd166", "<path d='M32 14l16 6v12c0 10-6 17-16 20-10-3-16-10-16-20V20Z' fill='#ecfdf5' stroke='#fff' stroke-width='3.3' stroke-linejoin='round'/><path d='M25 33l5 5 10-12' fill='none' stroke='#0f766e' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><path d='M23 23h18' stroke='#111827' stroke-width='3' stroke-linecap='round'/>"),
    "Social": subjectIconSvg("#0e7490", "#2f6fed", "#ffd166", "<path d='M18 46V28l14-10 14 10v18' fill='none' stroke='#fff' stroke-width='4.5' stroke-linejoin='round'/><path d='M24 46V34h16v12' fill='#cffafe'/><path d='M17 50h30' stroke='#ffd166' stroke-width='4.5' stroke-linecap='round'/>"),
    "Capstone": subjectIconSvg("#4338ca", "#0f8a8a", "#ffd166", "<path d='M18 45l14-28 14 28H18Z' fill='#fff' stroke='#fff' stroke-width='2.5' stroke-linejoin='round'/><circle cx='34' cy='32' r='8' fill='none' stroke='#4338ca' stroke-width='3.4'/><path d='M40 38l7 7' stroke='#4338ca' stroke-width='4' stroke-linecap='round'/><path d='M27 45h17' stroke='#ffd166' stroke-width='4' stroke-linecap='round'/>"),
    "Career": subjectIconSvg("#047857", "#0f8a8a", "#ffd166", "<path d='M18 24h28a6 6 0 0 1 6 6v17H12V30a6 6 0 0 1 6-6Z' fill='#ecfdf5'/><path d='M24 24v-5h16v5M12 35h40' stroke='#047857' stroke-width='3.8' stroke-linecap='round'/><path d='M22 46h20' stroke='#fbbf24' stroke-width='4.5' stroke-linecap='round'/>"),
    "Business": subjectIconSvg("#065f46", "#1f8bd8", "#ffd166", "<path d='M18 24h28a6 6 0 0 1 6 6v17H12V30a6 6 0 0 1 6-6Z' fill='#ecfdf5'/><path d='M20 42l7-7 6 5 10-12' fill='none' stroke='#047857' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><path d='M24 24v-5h16v5' stroke='#fff' stroke-width='3.5' stroke-linecap='round'/>"),
    "AfricanAmericanStudies": subjectIconSvg("#111827", "#b45309", "#ffd166", "<path d='M18 45V20h28v25' fill='#fff7ed' stroke='#fff' stroke-width='3.4'/><path d='M24 27h16M24 35h13' stroke='#111827' stroke-width='3.5' stroke-linecap='round'/><path d='M18 49h28' stroke='#ffd166' stroke-width='4.5' stroke-linecap='round'/><circle cx='43' cy='23' r='4' fill='#38bdf8'/>"),
    "Research": subjectIconSvg("#4338ca", "#0e7490", "#ffd166", "<path d='M17 44h30' stroke='#fff' stroke-width='4.5' stroke-linecap='round'/><path d='M22 39V18h20v21' fill='#f8feff' stroke='#fff' stroke-width='3.4' stroke-linejoin='round'/><path d='M27 26h10M27 33h8' stroke='#4338ca' stroke-width='3.2' stroke-linecap='round'/><circle cx='44' cy='42' r='7' fill='none' stroke='#ffd166' stroke-width='3.5'/>"),
    "Seminar": subjectIconSvg("#0e7490", "#4338ca", "#ffd166", "<path d='M16 23h31a7 7 0 0 1 7 7v13H23l-9 7v-7h-1V30a7 7 0 0 1 7-7Z' fill='#eff6ff'/><path d='M23 32h22M23 39h16' stroke='#0e7490' stroke-width='3.4' stroke-linecap='round'/><circle cx='20' cy='20' r='4' fill='#ffd166'/>")
  };

  function profileKeyFor(subject) {
    if (MCQ_PROFILE_KEYS[subject.title]) return MCQ_PROFILE_KEYS[subject.title];
    if (/Art and Design|Drawing/.test(subject.title)) return "ArtPortfolio";
    if (/Language and Culture/.test(subject.title)) return "WorldLanguage";
    if (/Research|Seminar/.test(subject.title)) return "Capstone";
    if (/United States History|European History|World History|African American Studies/.test(subject.title)) return "History";
    return MCQ_PROFILES[subject.group] ? subject.group : "Social";
  }

  function profileFor(subject) {
    return MCQ_PROFILES[profileKeyFor(subject)] || MCQ_PROFILES.Social;
  }

  function frqBlueprintFor(subject) {
    if (FRQ_BLUEPRINTS[subject.title]) return FRQ_BLUEPRINTS[subject.title];
    if (/Art and Design|Drawing/.test(subject.title)) return FRQ_BLUEPRINTS["AP 2-D Art and Design"];
    if (/Language and Culture/.test(subject.title)) return FRQ_BLUEPRINTS["AP Spanish Language and Culture"];
    if (/United States History|European History|World History/.test(subject.title)) return FRQ_BLUEPRINTS["AP United States History"];
    if (subject.group === "Science") return FRQ_BLUEPRINTS["AP Biology"];
    if (subject.group === "Math") return FRQ_BLUEPRINTS["AP Precalculus"];
    return [frq("Applied Response", "Use course concepts and stimulus evidence to answer a prompt about {unit}.", claimParts())];
  }

  function subjectIconKey(subject) {
    if (/African American Studies/.test(subject.title)) return "AfricanAmericanStudies";
    if (/Statistics/.test(subject.title)) return "Statistics";
    if (/Calculus/.test(subject.title)) return "Calculus";
    if (/Precalculus/.test(subject.title)) return "Precalculus";
    if (/Environmental Science/.test(subject.title)) return "Environmental";
    if (/Biology/.test(subject.title)) return "Biology";
    if (/Chemistry/.test(subject.title)) return "Chemistry";
    if (/Physics/.test(subject.title)) return "Physics";
    if (/Computer Science/.test(subject.title)) return "CS";
    if (/Cybersecurity/.test(subject.title)) return "Cybersecurity";
    if (/Business/.test(subject.title)) return "Business";
    if (/Research/.test(subject.title)) return "Research";
    if (/Seminar/.test(subject.title)) return "Seminar";
    if (/Spanish Literature/.test(subject.title)) return "SpanishLiterature";
    if (/Latin/.test(subject.title)) return "Latin";
    if (/Language and Culture/.test(subject.title)) return "World Lang";
    if (/Art History/.test(subject.title)) return "ArtHistory";
    if (/Music Theory/.test(subject.title)) return "MusicTheory";
    if (/Art and Design|Drawing/.test(subject.title)) return "ArtPortfolio";
    if (/Government/.test(subject.title)) return "Government";
    if (/Economics/.test(subject.title)) return "Economics";
    if (/Psychology/.test(subject.title)) return "Psychology";
    if (/Geography/.test(subject.title)) return "Geography";
    if (/English/.test(subject.title)) return "English";
    if (/United States History|European History|World History/.test(subject.title)) return "History";
    return subject.group || "Social";
  }

  function getSubjectIcon(subject = getSelectedSubject()) {
    const svg = SUBJECT_ICON_SVGS[subjectIconKey(subject)] || SUBJECT_ICON_SVGS.Social;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function keywordFrom(value) {
    return String(value || "concept").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ")[0] || "concept";
  }

  function fillTemplate(template, values) {
    const replacements = {
      unit: values.unit,
      unitLower: values.unitLower,
      unitKey: values.unitKey,
      subjectTitle: values.subjectTitle,
      subjectShort: values.subjectShort,
      subjectKey: values.subjectKey,
      evidence: values.evidence,
      focus: values.focus,
      sampleSize: values.sampleSize,
      valueOne: values.valueOne,
      valueTwo: values.valueTwo,
      percentOne: values.percentOne,
      percentTwo: values.percentTwo,
      sourceType: values.sourceType,
      comparisonGroup: values.comparisonGroup
    };

    return Object.entries(replacements).reduce((output, [key, value]) => {
      return output.replaceAll("{" + key + "}", value === undefined ? "" : String(value));
    }, String(template));
  }

  function filledCriteria(criteria, values) {
    return criteria.map((criterion) => ({
      label: fillTemplate(criterion.label, values),
      minHits: criterion.minHits,
      minWords: criterion.minWords,
      groups: criterion.groups.map((group) => group.map((term) => fillTemplate(term, values).toLowerCase()))
    }));
  }

  function buildValues(subject, unit) {
    const profile = profileFor(subject);
    return {
      unit,
      unitLower: unit.toLowerCase(),
      unitKey: keywordFrom(unit),
      subjectTitle: subject.title,
      subjectShort: subject.short,
      subjectKey: keywordFrom(subject.short),
      evidence: profile.evidence,
      focus: profile.focus
    };
  }

  function buildItemValues(subject, unit, index) {
    const values = buildValues(subject, unit);
    const base = index + subject.slug.length;

    return {
      ...values,
      sampleSize: 24 + ((base * 7) % 88),
      valueOne: 12 + ((base * 3) % 37),
      valueTwo: 28 + ((base * 5) % 53),
      percentOne: 6 + ((base * 4) % 32),
      percentTwo: 34 + ((base * 3) % 46),
      sourceType: ["graph", "table", "passage", "map", "model", "data display"][base % 6],
      comparisonGroup: ["control group", "second sample", "alternate model", "comparison period"][base % 4]
    };
  }

  function oneLine(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function makeTask(stimulus, question, correct, distractors, explanation) {
    return { stimulus, question, correct, distractors, explanation };
  }

  const MCQ_SCENARIO_DETAILS = {
    Statistics: [
      "The item gives a random sample of {sampleSize} observations, a statistic of {percentOne}%, and a claim about a population.",
      "A two-variable display compares a response near {valueOne} with another near {valueTwo} and asks for an inference-safe conclusion.",
      "A simulation or sampling distribution is described with repeated trials and a success rate near {percentOne}%.",
      "A significance test or confidence interval appears in context, with assumptions that must be checked before the conclusion."
    ],
    Calculus: [
      "A differentiable model for {unitLower} is shown by a graph and a short table with values near {valueOne} and {valueTwo}.",
      "A rate function in context is measured over a closed interval, so accumulation, units, and sign matter.",
      "The item compares information from f, f', and f'' to justify a conclusion about behavior.",
      "A contextual model asks for a calculus statement that remains valid under the stated domain."
    ],
    Precalculus: [
      "A model for {unitLower} is fit only on a stated interval and is represented by a rule, graph, and table.",
      "Two representations of the same function include an intercept, a rate of change, and a restricted domain.",
      "The item asks whether a transformation, inverse, or composition preserves the stated relationship.",
      "A real-world data set with {sampleSize} observations is modeled and compared with an alternate model."
    ],
    Biology: [
      "A biological investigation reports a measured response changing from {valueOne} to {valueTwo} while the {comparisonGroup} remains lower.",
      "A diagram of a pathway or feedback loop shows how one early step affects a later biological outcome.",
      "A data display connects {unitLower} to variation across individuals, cells, populations, or ecosystems.",
      "The item asks for a prediction that follows from a model and can be tested with controlled evidence."
    ],
    Chemistry: [
      "A lab scenario gives measured amounts, a balanced relationship, and a particulate diagram for {unitLower}.",
      "A reaction system is disturbed and the item asks for a prediction consistent with the model and conditions.",
      "A data table includes values near {valueOne} and {valueTwo}, requiring units and chemical reasoning together.",
      "A molecular-level explanation must agree with the observed change and the represented particles."
    ],
    Physics: [
      "A physical system is represented by a diagram and a graph with units; the relevant value is near {valueOne}.",
      "A lab group collects repeated measurements and asks how to reduce uncertainty in the model.",
      "The prompt requires translating among words, equations, graphs, and a physical interpretation.",
      "A prediction must use the stated assumptions, sign convention, and units for {unitLower}."
    ],
    History: [
      "A {sourceType} from a named period has an author, audience, purpose, and point of view connected to {unitLower}.",
      "Several developments are placed in sequence, and the item asks for causation, comparison, or continuity and change.",
      "A claim must be limited to the period and supported with specific historical evidence.",
      "A source is useful only when its context and limitation are considered with the broader development."
    ],
    Government: [
      "A scenario links an institution, a constitutional principle, and a political outcome related to {unitLower}.",
      "A data display compares groups or institutions with values near {percentOne}% and {percentTwo}%.",
      "The item asks for an application of a required document, case, or political concept to new facts.",
      "A political conclusion must stay within what the scenario and data support."
    ],
    Economics: [
      "A market or macro model begins in equilibrium before a policy change or shock affects incentives.",
      "A table compares marginal benefit, marginal cost, nominal value, or real value for {unitLower}.",
      "The item asks which curve, schedule, or account changes and what happens to equilibrium.",
      "A conclusion must use economic vocabulary and avoid claiming that one policy benefits every group."
    ],
    Psychology: [
      "A research design names participants, an operational definition, a measurement, and a possible confounding variable.",
      "A scenario describes behavior or cognition and asks which concept best explains the pattern.",
      "A data display reports a response difference near {percentOne}% across conditions.",
      "A conclusion must distinguish correlation, causation, ethics, and generalizability."
    ],
    Geography: [
      "A map and table show a spatial pattern at local and regional scales for {unitLower}.",
      "A scenario asks how scale, place, region, movement, or human-environment interaction changes an interpretation.",
      "A data display compares rates near {percentOne}% and {percentTwo}% across locations.",
      "The item requires a geographic explanation rather than a list of place names."
    ],
    EnglishLanguage: [
      "A nonfiction passage addresses a specific audience through evidence, organization, diction, and syntax.",
      "The item asks how a rhetorical choice advances purpose rather than merely naming a device.",
      "A source-based argument requires a claim, evidence, and commentary about {unitLower}.",
      "A revision must improve line of reasoning while preserving audience and purpose."
    ],
    EnglishLiterature: [
      "A poem or prose passage develops meaning through narration, imagery, structure, or figurative language.",
      "The item asks which interpretation is best supported by details from the passage.",
      "A tonal or structural shift changes the reader's understanding of character, conflict, or theme.",
      "A literary claim must connect evidence to meaning instead of summarizing plot."
    ],
    WorldLanguage: [
      "An authentic-style message or article has a purpose, audience, register, and cultural context.",
      "The item asks for interpretation or response using source details rather than word-by-word translation.",
      "A comparison prompt requires a product, practice, or perspective connected to {unitLower}.",
      "The best answer fits the task, register, and cultural context."
    ],
    Latin: [
      "A Latin passage provides a verb form, case ending, word order clue, and context.",
      "The item asks for translation or analysis that preserves grammar and meaning.",
      "A short excerpt uses syntax or emphasis to shape interpretation.",
      "The strongest answer uses Latin evidence rather than cognate guessing."
    ],
    SpanishLiterature: [
      "A literary excerpt is paired with genre, period, imagery, tone, or historical context.",
      "The item asks for interpretation supported by a device and textual evidence.",
      "A comparison pairs a text with another work or artwork connected to {unitLower}.",
      "The answer must use both evidence and context, not only plot summary."
    ],
    ComputerScienceA: [
      "A Java method includes a loop, a conditional, a collection or object state, and a boundary case.",
      "The item asks what code does for an input near {valueOne}, not what the author intended.",
      "A class design question asks which replacement preserves specification and encapsulation.",
      "The correct trace must handle types, scope, indexes, and method calls in order."
    ],
    ComputerSciencePrinciples: [
      "A pseudocode algorithm processes a list using selection, iteration, and abstraction.",
      "A computing-impact scenario involves data collection, privacy, security, or access.",
      "The item asks for the actual behavior or consequence of a computing choice.",
      "The answer must distinguish data, algorithms, networks, and social impact."
    ],
    Cybersecurity: [
      "A security log shows assets, events, risk, and possible controls for {unitLower}.",
      "A scenario asks which response best preserves evidence and reduces risk.",
      "A control must match confidentiality, integrity, availability, authentication, or authorization.",
      "The item asks for a practical security decision rather than the newest tool."
    ],
    Business: [
      "A decision compares costs, expected benefits, risk, cash flow, and customer value.",
      "A personal-finance case asks whether to borrow, save, invest, or insure.",
      "A table includes values near {valueOne} and {valueTwo}, requiring tradeoff analysis.",
      "The answer must balance financial reasoning with stakeholder needs."
    ],
    ArtPortfolio: [
      "A portfolio statement names an inquiry, materials, process evidence, and revisions.",
      "The item asks which critique best links visual evidence to intent.",
      "A selected-works rationale must show skill, decision-making, and relationship to investigation.",
      "The answer should evaluate process and evidence rather than personal taste."
    ],
    ArtHistory: [
      "An artwork is described by medium, function, content, visual features, and cultural setting.",
      "Two works are compared by form, patronage, function, or context.",
      "The item asks for visual and contextual evidence, not only identification.",
      "A claim about meaning must be supported by a specific detail."
    ],
    MusicTheory: [
      "A notated or listening-style excerpt gives key, meter, melody, bass motion, and cadence evidence.",
      "The item asks for a chord, rhythm, cadence, or voice-leading decision.",
      "A melody contains a leap, stepwise motion, and a cadence that must be resolved by rule.",
      "The best answer matches the notation and common-practice constraints."
    ],
    Capstone: [
      "A research scenario includes a question, sources, method, limitation, and defense prompt.",
      "The item asks how to narrow inquiry, evaluate credibility, or synthesize evidence.",
      "A presentation defense must justify a choice with relevance and limitation.",
      "The answer must support a focused claim rather than summarize sources separately."
    ],
    Social: [
      "A scenario about {unitLower} includes evidence, a claim, and a competing interpretation.",
      "The item asks for a course concept applied to a concrete situation.",
      "A data display or source supports a limited conclusion, not a universal claim.",
      "The answer must connect evidence to reasoning and avoid personal opinion."
    ]
  };

  const FRQ_CONTEXT_DETAILS = {
    Statistics: "The task includes a data summary, design feature, or inference condition that must be named in context.",
    Calculus: "The task includes a table or graph, units, and a contextual quantity that requires setup and interpretation.",
    Precalculus: "The task includes a model, domain restriction, and comparison of representations.",
    Biology: "The task includes a biological mechanism, variables, and evidence from a model or data display.",
    Chemistry: "The task includes measured quantities, a chemical model, and a particle-level or energy explanation.",
    Physics: "The task includes a diagram, units, assumptions, and a model that must be translated into a justified result.",
    History: "The task includes sourcing information and asks for a historically defensible claim supported by evidence.",
    Government: "The task includes a political scenario, data or a required case/document, and a limited conclusion.",
    Economics: "The task includes an economic model, graph shift, incentive, or policy effect in context.",
    Psychology: "The task includes participants, operational definitions, data, ethics, and a limitation.",
    Geography: "The task includes a map or spatial data at more than one scale.",
    EnglishLanguage: "The task includes audience, purpose, evidence, and commentary on rhetorical choices.",
    EnglishLiterature: "The task includes literary details that must be tied to meaning rather than plot summary.",
    WorldLanguage: "The task includes interpretive context, register, and a cultural comparison or interpersonal response.",
    Latin: "The task includes grammar, translation, and contextual analysis of a Latin passage.",
    SpanishLiterature: "The task includes text evidence, literary device, period context, and comparison when relevant.",
    ComputerScienceA: "The task includes a specification, input/output behavior, and a boundary case.",
    ComputerSciencePrinciples: "The task includes pseudocode, data, abstraction, and a computing impact or limitation.",
    Cybersecurity: "The task includes a security event, affected asset, risk, and appropriate control.",
    Business: "The task includes costs, benefits, risk, cash flow, and a recommendation.",
    ArtPortfolio: "The task includes inquiry, selected evidence, process documentation, and revision decisions.",
    ArtHistory: "The task includes form, function, content, and context.",
    MusicTheory: "The task includes notation or listening-style evidence, cadence, rhythm, and voice leading.",
    Capstone: "The task includes inquiry, source credibility, synthesis, method, and limitation.",
    Social: "The task includes a source, evidence, claim, and competing interpretation."
  };

  function mcqScenarioFor(subject, index, values) {
    const key = profileKeyFor(subject);
    const pool = MCQ_SCENARIO_DETAILS[key] || MCQ_SCENARIO_DETAILS[subject.group] || MCQ_SCENARIO_DETAILS.Social;
    return fillTemplate(pool[index % pool.length], values);
  }

  const MCQ_STYLE_TASKS = {
    Statistics: [
      makeTask("A random sample study about {unitLower} reports a sample statistic, a margin of error, and a claim about a larger population.", "Which conclusion uses statistical language correctly?", "The sample provides evidence about the population only if the sampling method and inference conditions are reasonable.", ["The statistic proves the claim is true for every individual in the population.", "The margin of error can be ignored because the sample was random.", "The sample result describes only the sample and cannot ever support a population claim.", "Association in the sample proves that one variable caused the other."], "The best AP Statistics answer connects the statistic to the population while checking design and inference conditions."),
      makeTask("A student compares two distributions for {unitLower}; one distribution has a larger median and a smaller IQR.", "Which interpretation is best supported?", "The group with the larger median has a higher typical value, and the smaller IQR shows less variability in the middle half.", ["The group with the smaller IQR must have the smaller mean.", "The larger median proves every observation in that group is larger.", "The range is smaller whenever the IQR is smaller.", "The distributions must be approximately normal."], "Median compares typical value, while IQR compares spread in the middle half.")
    ],
    Calculus: [
      makeTask("A differentiable function models {unitLower}. Its derivative is positive on an interval and changes from increasing to decreasing at one point.", "Which statement is justified?", "The original function is increasing on the interval, and the change in the derivative identifies a change in concavity.", ["The original function must have a local maximum where the derivative is positive.", "The derivative being positive means the original function is concave up everywhere.", "The average value of the function must equal the derivative at the midpoint.", "The graph must cross the x-axis at the point where concavity changes."], "Calculus questions distinguish increasing behavior from concavity and require conclusions justified by derivative information."),
      makeTask("A rate function r(t) is measured in units per hour for a context involving {unitLower}.", "Which expression gives the net change from t = a to t = b?", "The definite integral of r(t) from a to b, with units of the accumulated quantity.", ["The derivative r'(b), because it gives total accumulation.", "The value r(b) - r(a), because endpoint rates are always total change.", "The average of r(a) and r(b), without considering the interval length.", "The reciprocal of the definite integral, with units per hour."], "A definite integral of a rate over an interval gives net change in context.")
    ],
    Precalculus: [
      makeTask("A function model for {unitLower} is fitted to data only for inputs between 0 and 12.", "Which statement is most appropriate?", "Predictions inside the observed domain are more defensible than extrapolations far outside 0 to 12.", ["The model is guaranteed accurate for every input because it fits the data.", "The y-intercept must be the most important output in the context.", "A model with a higher output is always better.", "The domain restriction is unnecessary if a calculator can graph the function."], "AP Precalculus modeling questions reward attention to domain, representation, and context."),
      makeTask("Two representations of a function related to {unitLower} show the same input-output relationship in different forms.", "Which comparison is valid?", "A feature such as an intercept, extremum, or rate of change should match across the table, graph, and symbolic rule.", ["The graph and table must use the same scale to represent the same function.", "The larger-looking graph always has larger outputs.", "Only the symbolic rule can show the function's behavior.", "Transformations change the input-output relationship only when the graph is labeled."], "Equivalent representations must preserve the same function features.")
    ],
    Science: [
      makeTask("A controlled investigation of {unitLower} compares a treatment group with a control group and records a consistent upward trend in the response variable.", "Which conclusion is strongest?", "The treatment is associated with the response, and a causal claim requires controlled variables and random assignment when possible.", ["The trend proves the mechanism even if no variables were controlled.", "The control group is unnecessary because the treatment group changed.", "The largest single measurement is enough to establish the conclusion.", "The response variable should be changed halfway through the investigation."], "AP science questions connect data trends to design quality and mechanism."),
      makeTask("A model of {unitLower} predicts that changing one component will alter a measurable output.", "Which evidence would best test the model?", "Data from a controlled comparison in which only the predicted component is changed and the output is measured.", ["A description of the model without new data.", "A trial in which several components are changed at the same time.", "A conclusion based only on the first observation collected.", "A statement that the model is correct because it is simple."], "A useful model test isolates a variable and compares evidence to the prediction.")
    ],
    Biology: [
      makeTask("Researchers studying {unitLower} compare cells with and without a specific treatment and measure a change in a biological response.", "Which explanation best connects the evidence to biology?", "The treatment likely affects the response through a specific cellular, genetic, evolutionary, or ecological mechanism supported by the data trend.", ["The treatment caused the response because all biological changes have one cause.", "The data are irrelevant because mechanisms cannot be inferred from experiments.", "The response must be random if one individual differs from the group.", "The claim should describe the graph without mentioning a biological process."], "AP Biology items usually require data plus a biological mechanism."),
      makeTask("A model for {unitLower} shows a sequence of interactions in which one step affects a later outcome.", "Which prediction follows from the model?", "Disrupting an early step should change the later outcome if the model's pathway is accurate.", ["Changing a later outcome will always change every earlier step.", "No prediction can be made from a model.", "All parts of the model must change by the same amount.", "A model is valid only if it includes every molecule or organism."], "Biological models support predictions about pathways, feedback, and response.")
    ],
    Chemistry: [
      makeTask("A laboratory system involving {unitLower} includes a balanced relationship, measured data, and a particulate-level diagram.", "Which answer gives the best chemical reasoning?", "Use the balanced relationship to connect amounts and explain the observation with particles, attractions, energy, or equilibrium.", ["Use the coefficient as a measured mass without unit conversion.", "Report the numerical answer without any particulate explanation.", "Ignore the data because a diagram is always sufficient.", "Assume the reaction goes to completion in every chemical system."], "AP Chemistry responses often require calculation and particulate or energetic reasoning together."),
      makeTask("A chemical equilibrium or reaction involving {unitLower} is disturbed by a change in concentration, temperature, or pressure.", "Which prediction is most defensible?", "The system shifts in the direction that reduces the effect of the disturbance, and the explanation must match the reaction model.", ["The system always shifts toward products after any disturbance.", "The equilibrium constant changes after every concentration change.", "Only the color change matters, not the particle interactions.", "The side with more substances is always favored."], "Chemical systems must be interpreted through the balanced model and conditions.")
    ],
    Physics: [
      makeTask("A physical system involving {unitLower} is represented by a diagram and a graph with labeled axes.", "Which answer translates the representation correctly?", "The graph's slope, area, or intercept must be matched to the physical quantity with correct sign and units.", ["The steepest-looking line always means the largest force.", "The area under every graph has the same physical meaning.", "A negative value is impossible in a physical model.", "Units can be omitted if the equation is correct."], "AP Physics questions emphasize representations, units, sign, and assumptions."),
      makeTask("A lab group tests a model for {unitLower} and notices that measurements vary across repeated trials.", "Which revision would best reduce uncertainty?", "Measure the relevant quantities more precisely, repeat trials, and control variables that affect the model.", ["Change several variables to make the trend easier to see.", "Remove trials that do not match the prediction without explanation.", "Use only a verbal explanation instead of measurements.", "Choose a conclusion before collecting data."], "Experimental design in AP Physics depends on controls, repeated measurements, and uncertainty.")
    ],
    History: [
      makeTask("A source about {unitLower} was written for a specific audience during a period of political, social, or economic change.", "Which answer uses the source most effectively?", "It connects the author's perspective and historical context to a defensible claim about a broader development.", ["It restates the source without explaining why the evidence matters.", "It treats the source as neutral because all historical sources are factual.", "It makes a claim about a different time period with no connection to the source.", "It lists events without establishing a line of reasoning."], "AP history questions ask students to source, contextualize, and reason with evidence."),
      makeTask("Several developments related to {unitLower} can be explained through causation, comparison, or continuity and change.", "Which claim is strongest?", "A narrow claim that identifies a specific development and explains its relationship to evidence from the period.", ["A broad claim that could apply to any century.", "A claim based only on modern values.", "A claim that repeats the prompt without analysis.", "A claim that ignores chronology."], "Historical arguments need specificity, chronology, and a reasoning process.")
    ],
    Government: [
      makeTask("A scenario involving {unitLower} describes a conflict between an institution, a constitutional principle, and public policy.", "Which application is most accurate?", "The answer applies the correct constitutional principle or required case to the facts of the scenario.", ["The answer defines the principle but never applies it.", "The answer chooses a required case only because it is famous.", "The answer relies on personal opinion instead of course evidence.", "The answer ignores which institution has the power in the scenario."], "AP Government questions reward application of concepts, cases, documents, and political data."),
      makeTask("A chart about political participation or policy outcomes related to {unitLower} shows a clear trend across groups.", "Which conclusion is best supported?", "The data support a limited claim about the trend, but a causal explanation needs additional evidence.", ["The chart proves the cause of the trend by itself.", "Any group with the highest value must have the most political power.", "The trend is invalid unless every voter was surveyed.", "The data should be ignored if they challenge an expected result."], "Quantitative government items require reading trends without overstating causation.")
    ],
    Economics: [
      makeTask("A market or macroeconomic model involving {unitLower} begins in equilibrium before a policy change or shock occurs.", "Which effect follows from the model?", "The correct curve or schedule shifts, creating a predictable change in price, quantity, output, unemployment, inflation, or welfare.", ["Both curves must shift whenever conditions change.", "The model's labels are unnecessary if the direction seems obvious.", "A policy always improves every economic outcome.", "A shortage and surplus mean the same thing."], "AP Economics questions depend on graph shifts, incentives, and model vocabulary."),
      makeTask("A data table related to {unitLower} includes nominal values, real values, or opportunity costs.", "Which interpretation is best?", "The economic conclusion should distinguish nominal from real measures and compare the relevant marginal benefit and marginal cost.", ["The option with the largest dollar amount is always best.", "Opportunity cost is zero when no money is paid.", "Nominal and real values are interchangeable.", "Averages always answer marginal decision questions."], "Economic reasoning often hinges on real versus nominal values and marginal analysis.")
    ],
    Psychology: [
      makeTask("A study about {unitLower} compares behavior across groups and reports a correlation between two measured variables.", "Which conclusion is appropriate?", "The variables are associated, but causal claims require an experimental design with appropriate controls.", ["The correlation proves one variable caused the other.", "The study is useless because psychology cannot use data.", "The operational definition does not matter if the sample is large.", "A single case study proves the general pattern."], "AP Psychology questions emphasize concept application and research-method limits."),
      makeTask("A person in a scenario shows behavior related to {unitLower}.", "Which answer best applies the concept?", "It identifies the psychological concept and explains how the person's specific behavior illustrates it.", ["It defines the term without connecting it to the scenario.", "It gives a popular explanation without course vocabulary.", "It applies a different perspective without evidence.", "It assumes the behavior has only one possible explanation."], "Application requires matching the concept to specific evidence.")
    ],
    Geography: [
      makeTask("A map or data display related to {unitLower} shows a spatial pattern at local, regional, and global scales.", "Which explanation is strongest?", "It identifies the pattern, names the relevant scale, and explains the geographic process that produced it.", ["It describes where things are located but gives no process.", "It uses a global conclusion for a local pattern without support.", "It ignores regional variation in the data.", "It assumes every place follows the same pattern."], "AP Human Geography questions require spatial reasoning, scale, and process."),
      makeTask("A geographic model is applied to a real-world situation involving {unitLower}.", "Which use of the model is most defensible?", "The model can explain part of the pattern, but local context and exceptions must be considered.", ["The model predicts every place perfectly.", "The model is invalid whenever one exception exists.", "Only physical geography matters in human geography.", "Scale is irrelevant if the model is named correctly."], "Models are useful but must be applied with attention to place and scale.")
    ],
    EnglishLanguage: [
      makeTask("A nonfiction passage about {unitLower} addresses a particular audience and develops a claim through evidence and style.", "Which analysis is strongest?", "It identifies a rhetorical choice and explains how it helps the writer achieve a purpose for that audience.", ["It summarizes the passage without analyzing how it works.", "It names a device but gives a generic effect.", "It judges whether the writer is right without analyzing rhetoric.", "It quotes a detail that does not support the claim."], "AP English Language questions ask how rhetorical choices work for audience and purpose."),
      makeTask("A draft paragraph about {unitLower} includes a claim, evidence, and commentary.", "Which revision best strengthens the line of reasoning?", "Add commentary that directly explains how the evidence supports the claim.", ["Add a related fact without connecting it to the claim.", "Replace evidence with personal opinion.", "Use a more complicated sentence that does not clarify reasoning.", "Remove the claim so the evidence stands alone."], "Strong writing connects evidence to a defensible line of reasoning.")
    ],
    EnglishLiterature: [
      makeTask("A literary passage involving {unitLower} develops tension through narration, imagery, structure, or figurative language.", "Which interpretation is best supported?", "The selected detail should be tied to a defensible interpretation of meaning, character, conflict, or theme.", ["The passage should be retold in chronological order.", "A device label is enough without commentary.", "Any detail from the passage supports any theme.", "The author's biography is required for every interpretation."], "AP Literature questions reward close reading and commentary, not plot summary."),
      makeTask("A poem or prose excerpt uses a shift in tone connected to {unitLower}.", "Which answer best explains the effect?", "The tonal shift changes the reader's understanding of the speaker, situation, or central idea.", ["The shift proves the speaker and author are identical.", "The tone matters only if the poem rhymes.", "The effect is the same in every literary work.", "The shift should be ignored if the plot is clear."], "Literary analysis should connect choices to meaning.")
    ],
    WorldLanguage: [
      makeTask("A message or article about {unitLower} is written for a specific audience and purpose.", "Which response is most appropriate?", "The response uses source details, appropriate register, and language that fits the audience and task.", ["The response translates isolated words without context.", "The response answers only one part of the prompt.", "The response uses an informal register for every situation.", "The response gives cultural information too vague to support the task."], "World language questions combine interpretation, register, and cultural context."),
      makeTask("A cultural comparison prompt asks about a product, practice, or perspective related to {unitLower}.", "Which comparison is strongest?", "It compares a specific cultural example with a clear explanation of the perspective behind it.", ["It lists stereotypes without evidence.", "It mentions a country but no cultural practice.", "It avoids comparison and only describes one place.", "It gives a memorized fact unrelated to the prompt."], "Cultural comparison requires specific examples and perspective.")
    ],
    Latin: [
      makeTask("A Latin passage connected to {unitLower} contains a key verb form, case usage, and contextual clue.", "Which translation choice is best?", "The translation preserves the grammar, tense, and relationship among the words in context.", ["The translation sounds natural but ignores the case ending.", "The translation changes the tense to match the student's guess.", "The translation omits a word that affects meaning.", "The translation relies only on English cognates."], "AP Latin questions require grammar and context, not loose paraphrase."),
      makeTask("A short excerpt uses word order or syntax to emphasize an idea related to {unitLower}.", "Which analysis is strongest?", "It identifies the grammatical feature and explains how it shapes meaning in the passage.", ["It names a grammar term that is not present.", "It gives historical context but no Latin evidence.", "It translates the line without analysis.", "It treats word order as meaningless."], "Latin analysis links grammar, vocabulary, and effect.")
    ],
    SpanishLiterature: [
      makeTask("An excerpt related to {unitLower} uses imagery, tone, genre, or historical context to develop a theme.", "Which interpretation is best supported?", "It connects a specific literary device to theme and period with textual evidence.", ["It summarizes the plot without literary analysis.", "It names a movement but gives no evidence.", "It treats every symbol as having the same meaning.", "It compares works only by title or author."], "AP Spanish Literature questions require textual support, genre, context, and comparison."),
      makeTask("A comparison prompt pairs a literary text with another text or artwork connected to {unitLower}.", "Which comparison is strongest?", "It explains a meaningful similarity or difference using evidence from both works.", ["It discusses only one work.", "It makes a general claim about culture without textual support.", "It identifies a device in one work but not the other.", "It chooses the older work as automatically more important."], "Comparative analysis must use both works as evidence.")
    ],
    ComputerScienceA: [
      makeTask("A Java method involving {unitLower} uses a loop, a conditional statement, and an array or object state.", "Which result is most likely after execution?", "Trace each iteration, update variables in order, and check boundary conditions before choosing the output.", ["Assume the loop runs one more time than its condition allows.", "Ignore zero-based indexing.", "Describe what the method was intended to do instead of what it does.", "Assume object fields reset automatically between method calls."], "AP CSA questions require precise tracing and boundary awareness."),
      makeTask("A class design problem related to {unitLower} asks which replacement code preserves behavior.", "Which replacement is best?", "The replacement maintains encapsulation, uses the correct types, and handles all specified cases.", ["The replacement works for only the example input.", "The replacement exposes private state unnecessarily.", "The replacement changes the method signature required by the prompt.", "The replacement compiles only if an unrelated variable exists."], "CSA distractors often fail on type, scope, boundary, or specification details.")
    ],
    ComputerSciencePrinciples: [
      makeTask("A pseudocode algorithm related to {unitLower} processes a list and uses selection and iteration.", "Which statement best describes the algorithm?", "It describes the actual output after tracing the algorithm and explains how abstraction manages complexity.", ["It states the program's goal but not its behavior.", "It assumes the list is sorted when the prompt does not say so.", "It ignores a condition inside the loop.", "It treats every algorithm as equally efficient."], "AP CSP questions test algorithms, abstraction, data, and impacts."),
      makeTask("A computing-impact scenario involving {unitLower} describes data collection, security, or network behavior.", "Which concern is most relevant?", "The answer identifies the data, privacy, security, or access tradeoff that follows from the scenario.", ["The answer says technology has no social impact.", "The answer confuses authentication with authorization.", "The answer assumes all data are unbiased.", "The answer ignores who can access the data."], "CSP impact questions connect technical choices to consequences.")
    ],
    Cybersecurity: [
      makeTask("A security log related to {unitLower} shows repeated failed sign-ins followed by one successful sign-in from a new location.", "Which response is best?", "Preserve evidence, contain the account, verify identity, and reset credentials according to policy.", ["Delete the logs to protect privacy.", "Ignore the event because one sign-in succeeded.", "Disable all network access permanently before investigating.", "Send the password by email to confirm the user."], "Cybersecurity questions prioritize evidence, containment, identity, and risk."),
      makeTask("An organization chooses a control for a risk involving {unitLower}.", "Which control is best matched to the risk?", "Use the control that directly reduces the stated threat while balancing usability and policy requirements.", ["Choose the newest tool regardless of the threat.", "Use only training for every technical vulnerability.", "Remove authentication to improve usability.", "Treat confidentiality, integrity, and availability as the same goal."], "Controls must match threats and protect CIA goals.")
    ],
    Business: [
      makeTask("A business scenario involving {unitLower} compares two choices using costs, expected revenue, risk, and customer value.", "Which decision is best supported?", "Choose the option with the stronger net benefit after considering cost, risk, cash flow, and customer demand.", ["Choose the option with the highest revenue even if costs are higher.", "Ignore risk because expected revenue is positive.", "Choose based only on personal preference.", "Treat cash flow and profit as identical in every case."], "Business decisions require data, tradeoffs, and financial reasoning."),
      makeTask("A personal-finance case related to {unitLower} asks whether to borrow, save, invest, or insure.", "Which reasoning is strongest?", "Compare interest, opportunity cost, risk tolerance, time horizon, and consequences before deciding.", ["Choose the lowest monthly payment without considering total cost.", "Invest all money in the riskiest option for the highest possible return.", "Ignore credit terms because the purchase is needed.", "Assume insurance is unnecessary when losses are rare."], "Finance questions reward tradeoff analysis and risk awareness.")
    ],
    ArtPortfolio: [
      makeTask("A portfolio statement about {unitLower} describes an inquiry, materials, process images, and revisions.", "Which critique would be most useful?", "It connects visual evidence, materials, composition, and revision choices to the stated inquiry.", ["It praises the work generally without naming visual evidence.", "It focuses only on whether the subject is attractive.", "It recommends decoration unrelated to the inquiry.", "It ignores process because only the final image matters."], "Art portfolio practice should connect process, visual evidence, and intent."),
      makeTask("A student chooses selected works related to {unitLower} for review.", "Which rationale is strongest?", "The selected works show skill, purposeful decision-making, and clear relationship to the portfolio's investigation.", ["The works are selected only because they are the largest.", "The rationale repeats the title of each work.", "The works are unrelated but use similar colors.", "The rationale avoids discussing materials or composition."], "Selected works should demonstrate skill and intentional choices.")
    ],
    ArtHistory: [
      makeTask("An artwork connected to {unitLower} is identified by medium, function, and cultural setting.", "Which analysis is best supported?", "It uses specific visual evidence and context to explain function, content, or meaning.", ["It names the culture but gives no visual evidence.", "It assumes all works with the same material have the same function.", "It describes appearance without explaining meaning.", "It applies a context from a different region or period."], "AP Art History items require visual and contextual evidence."),
      makeTask("Two works related to {unitLower} are compared by form, function, and patronage.", "Which comparison is strongest?", "It explains how a similarity or difference in form relates to function or cultural context.", ["It compares only size.", "It says both works are art without analysis.", "It ignores patronage and function.", "It relies only on modern taste."], "Comparison must connect visual features to meaning and context.")
    ],
    MusicTheory: [
      makeTask("A notated excerpt involving {unitLower} gives key, meter, melody, and bass motion.", "Which analysis is most accurate?", "Identify the chord, cadence, rhythm, or voice-leading feature from the notated evidence.", ["Choose a chord that conflicts with the bass.", "Ignore meter when interpreting rhythm.", "Create parallel perfect intervals in part writing.", "Analyze the cadence without the final bass note."], "AP Music Theory questions require evidence from notation and aural-style context."),
      makeTask("A melody related to {unitLower} contains a leap followed by stepwise motion and a cadence.", "Which revision follows common-practice style?", "Resolve tendency tones, preserve the meter, and avoid forbidden parallels.", ["Double the leading tone in a final cadence.", "Leave tendency tones unresolved.", "Change the meter to make the rhythm easier.", "Use parallel fifths to strengthen the line."], "Voice-leading rules and cadence evidence guide the answer.")
    ],
    Capstone: [
      makeTask("A research project about {unitLower} includes a broad question, several sources, and a limitation.", "Which revision best improves the inquiry?", "Narrow the question, evaluate source credibility, and explain how the evidence supports a focused claim.", ["Keep the question broad so it can include every source.", "Use sources only because they agree with the claim.", "Summarize each source separately without synthesis.", "Hide limitations to make the argument seem stronger."], "AP Capstone work values focused inquiry, credible evidence, synthesis, and limitations."),
      makeTask("A presentation defense asks why a method or source was chosen for {unitLower}.", "Which answer is strongest?", "It justifies the choice by connecting credibility, relevance, limitations, and the research purpose.", ["It says the source was chosen because it was easy to find.", "It avoids discussing limitations.", "It repeats the title of the project.", "It claims one source proves the entire argument."], "Defense questions ask for choices that are justified and limited.")
    ],
    Social: [
      makeTask("A course scenario about {unitLower} includes a claim, data, and a competing explanation.", "Which answer is best supported?", "It applies the relevant course concept to the evidence and avoids a conclusion broader than the data allow.", ["It defines the concept without using the scenario.", "It uses personal opinion instead of evidence.", "It assumes the first explanation is automatically correct.", "It ignores the competing explanation."], "Strong AP responses apply concepts to evidence and avoid overclaiming.")
    ]
  };

  function mcqTasksFor(subject) {
    const key = profileKeyFor(subject);
    return MCQ_STYLE_TASKS[key] || MCQ_STYLE_TASKS[subject.group] || MCQ_STYLE_TASKS.Social;
  }

  function buildMcqTask(subject, index, values) {
    const tasks = mcqTasksFor(subject);
    const rawTask = tasks[index % tasks.length];
    const scenario = mcqScenarioFor(subject, index, values);
    return {
      stimulus: oneLine(scenario + " " + fillTemplate(rawTask.stimulus, values)),
      question: fillTemplate(rawTask.question, values),
      correct: fillTemplate(rawTask.correct, values),
      distractors: rawTask.distractors.map((choice) => fillTemplate(choice, values)),
      explanation: fillTemplate(rawTask.explanation, values)
    };
  }

  const FRQ_STYLE_PROMPTS = {
    Calculus: "A table and graph for a differentiable function model a situation involving {unitLower}; selected values and rates are given over a closed interval.",
    Precalculus: "A real-world model involving {unitLower} is represented by a table, graph, and symbolic rule, with a stated domain and units.",
    Science: "A controlled investigation of {unitLower} includes a treatment group, a control group, repeated trials, and a graph of the response variable.",
    Biology: "A biological model and data table about {unitLower} show how a change in one variable affects a cellular, genetic, evolutionary, or ecological response.",
    Chemistry: "A laboratory scenario about {unitLower} provides a balanced relationship, measured data, and a particulate or energy model.",
    Physics: "A physical system involving {unitLower} is represented by a diagram, a graph with units, and a proposed mathematical model.",
    History: "A historical source about {unitLower} is paired with information about its author, audience, purpose, and broader period context.",
    Government: "A political scenario involving {unitLower} includes a constitutional principle, institutional action, and a small data display.",
    Economics: "An economic model involving {unitLower} begins in equilibrium before a policy change, market shock, or decision changes incentives.",
    Psychology: "A research scenario about {unitLower} describes participants, an operational definition, a data display, and a possible limitation.",
    Geography: "A map and table related to {unitLower} show a spatial pattern at more than one scale.",
    EnglishLanguage: "A nonfiction passage about {unitLower} develops a claim for a specific audience through evidence, organization, and style.",
    EnglishLiterature: "A poem or prose passage involving {unitLower} uses narration, imagery, structure, or figurative language to develop meaning.",
    WorldLanguage: "A message, article, or cultural prompt about {unitLower} requires interpretation, appropriate register, and cultural comparison.",
    Latin: "A Latin passage related to {unitLower} includes grammatical features, context, and a translation decision.",
    SpanishLiterature: "An excerpt or comparison prompt related to {unitLower} asks for literary interpretation supported by textual and contextual evidence.",
    ComputerScienceA: "A Java programming task involving {unitLower} includes a method specification, sample input, and a boundary case.",
    ComputerSciencePrinciples: "A computing scenario about {unitLower} includes pseudocode, data use, and an impact or security consideration.",
    Cybersecurity: "A security incident involving {unitLower} includes a log excerpt, affected assets, risk level, and possible controls.",
    Business: "A business or personal-finance scenario involving {unitLower} provides costs, expected benefits, risks, and stakeholder needs.",
    ArtPortfolio: "A portfolio scenario about {unitLower} includes an inquiry statement, process evidence, selected works, and revision choices.",
    ArtHistory: "An artwork or comparison related to {unitLower} includes visual evidence, function, content, and cultural context.",
    MusicTheory: "A notated or listening-style excerpt involving {unitLower} includes melody, harmony, rhythm, and cadence evidence.",
    Capstone: "A research scenario about {unitLower} includes a question, sources, method, limitation, and presentation defense.",
    Social: "A source or scenario about {unitLower} includes evidence, a claim, and a competing interpretation."
  };

  function frqPromptFor(subject, values, frqType) {
    const key = profileKeyFor(subject);
    const base = FRQ_STYLE_PROMPTS[key] || FRQ_STYLE_PROMPTS[subject.group] || FRQ_STYLE_PROMPTS.Social;
    const context = FRQ_CONTEXT_DETAILS[key] || FRQ_CONTEXT_DETAILS[subject.group] || FRQ_CONTEXT_DETAILS.Social;
    return oneLine(fillTemplate(base, values) + " " + fillTemplate(context, values) + " " + fillTemplate(frqType.stimulus, values));
  }

  function buildMcqQuestions(subject = getSelectedSubject()) {
    const profile = profileFor(subject);
    const setLength = profile.setLength || (subject.format.mcqCount >= 40 ? 3 : 2);
    const choiceCount = profile.choiceCount || 4;

    return Array.from({ length: subject.format.mcqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const values = buildItemValues(subject, unit, index);
      const task = buildMcqTask(subject, index, values);
      const choices = rotateChoices([task.correct, ...task.distractors.slice(0, choiceCount - 1)], index + subject.slug.length);
      const setStart = Math.floor(index / setLength) * setLength + 1;
      const setEnd = Math.min(setStart + setLength - 1, subject.format.mcqCount);
      const prompt = oneLine(task.stimulus + " " + task.question);

      return {
        id: index + 1,
        unit: "Unit " + ((index % subject.units.length) + 1) + ": " + unit,
        skill: (index % 4) + 1,
        set: setStart === setEnd ? undefined : "Questions " + setStart + "-" + setEnd + " share a topic",
        stimulus: "",
        prompt,
        choices,
        correct: choices.indexOf(task.correct),
        explanation: task.explanation || fillTemplate(profile.explanation, values),
        choiceExplanations: choices.map((choice, choiceIndex) => choiceExplanation({
          correct: choices.indexOf(task.correct),
          explanation: task.explanation || fillTemplate(profile.explanation, values)
        }, choice, choiceIndex))
      };
    });
  }

  function buildFrqItems(subject = getSelectedSubject(), unitFocus = "") {
    const blueprint = frqBlueprintFor(subject);
    const units = unitFocus && subject.units.includes(unitFocus) ? [unitFocus] : subject.units;

    return Array.from({ length: subject.format.frqCount }, (_, index) => {
      const unit = units[index % units.length];
      const unitIndex = Math.max(0, subject.units.indexOf(unit));
      const frqType = blueprint[index % blueprint.length];
      const values = buildItemValues(subject, unit, index);

      return {
        id: index + 1,
        unit: "Unit " + (unitIndex + 1) + ": " + unit,
        title: fillTemplate(frqType.title, values),
        maxPoints: frqType.parts.length,
        stimulus: frqPromptFor(subject, values, frqType),
        parts: frqType.parts.map((item) => ({
          label: fillTemplate(item.label, values),
          criteria: filledCriteria(item.criteria, values)
        }))
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
    getSubjectIcon,
    getUnitFilter,
    setUnitFilter,
    filterItemsByUnit,
    getScoreHistory,
    recordScoreAttempt,
    latestScoreForSubject,
    officialLinksForSubject,
    buildMcqQuestions,
    buildFrqItems
  };
}());
