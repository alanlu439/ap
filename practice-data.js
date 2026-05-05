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

  function scopedStorageKey(key) {
    return window.APPracticeAuth?.scopeKey?.(key) || key;
  }

  function selectedSubjectStorageKey() {
    return scopedStorageKey(SELECTED_AP_SUBJECT_KEY);
  }

  function getSelectedSubject() {
    const saved = localStorage.getItem(selectedSubjectStorageKey());
    return getSubjectByTitle(saved) || getSubjectByTitle("AP Statistics") || SUBJECTS[0];
  }

  function storageKey(kind, subject = getSelectedSubject()) {
    return scopedStorageKey("ap-practice-" + subject.slug + "-" + kind + "-state-v1");
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

  function part(label, criterionLabel, groups) {
    return { label, criteria: [{ label: criterionLabel, groups }] };
  }

  function frq(title, stimulus, parts) {
    return { title, stimulus, parts };
  }

  function claimParts() {
    return [
      part("(a) State a defensible claim or answer.", "States a defensible claim", [["claim", "argue", "answer", "thesis", "because"]]),
      part("(b) Use specific evidence from the stimulus or course content.", "Uses specific evidence", [["evidence", "data", "source", "example", "shows"]]),
      part("(c) Explain how the evidence supports the claim.", "Explains reasoning", [["because", "therefore", "explains", "causes", "reason"]]),
      part("(d) Address a limitation, comparison, or broader implication.", "Adds complexity or implication", [["however", "although", "compare", "limitation", "implication"]])
    ];
  }

  function scienceParts() {
    return [
      part("(a) State a testable claim or prediction.", "States claim or prediction", [["claim", "predict", "increase", "decrease", "relationship"]]),
      part("(b) Identify the independent variable, dependent variable, or control.", "Identifies variables or control", [["independent", "dependent", "control", "variable"]]),
      part("(c) Use data or a model as evidence.", "Uses data or model evidence", [["data", "evidence", "trend", "graph", "model"]]),
      part("(d) Explain the mechanism or source of uncertainty.", "Explains mechanism or uncertainty", [["because", "mechanism", "uncertainty", "error", "process"]])
    ];
  }

  function mathParts() {
    return [
      part("(a) Identify the needed representation or quantity.", "Identifies representation or quantity", [["graph", "table", "quantity", "rate", "function", "model"]]),
      part("(b) Set up the calculation or symbolic relationship.", "Sets up valid work", [["equation", "derivative", "integral", "limit", "calculate", "setup"]]),
      part("(c) Carry out the work and report the result.", "Reports a result", [["equals", "result", "value", "answer", "approximately"]]),
      part("(d) Interpret or justify the result in context.", "Interprets or justifies", [["because", "context", "units", "means", "therefore", "valid"]])
    ];
  }

  function essayParts() {
    return [
      part("(a) Write a defensible thesis.", "States a defensible thesis", [["claim", "thesis", "argue", "reveals", "shows"]]),
      part("(b) Select specific textual or source evidence.", "Uses evidence", [["evidence", "quote", "detail", "source", "example"]]),
      part("(c) Explain how the evidence supports the line of reasoning.", "Provides commentary", [["because", "therefore", "suggests", "emphasizes", "develops"]]),
      part("(d) Address complexity, purpose, or context.", "Addresses complexity", [["although", "however", "complex", "purpose", "context", "tension"]])
    ];
  }

  function codeParts() {
    return [
      part("(a) Describe the purpose, input, or output.", "Describes purpose or I/O", [["purpose", "input", "output", "program", "method"]]),
      part("(b) Explain the algorithm or abstraction.", "Explains algorithm or abstraction", [["algorithm", "abstraction", "loop", "condition", "list", "class"]]),
      part("(c) Trace a test case or justify behavior.", "Traces behavior", [["test", "case", "trace", "returns", "result", "because"]]),
      part("(d) Identify an improvement, limitation, or impact.", "Identifies improvement or impact", [["improve", "limitation", "impact", "security", "efficiency", "privacy"]])
    ];
  }

  function portfolioParts() {
    return [
      part("(a) State the inquiry or artistic intent.", "States inquiry or intent", [["inquiry", "intent", "idea", "question", "investigation"]]),
      part("(b) Describe specific visual evidence.", "Uses visual evidence", [["visual", "composition", "material", "process", "form", "evidence"]]),
      part("(c) Explain revision or experimentation.", "Explains process", [["revise", "revision", "experiment", "process", "develop", "because"]]),
      part("(d) Justify why the work belongs in the portfolio.", "Justifies selection", [["selected", "portfolio", "because", "demonstrates", "supports"]])
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
    return String(template)
      .replaceAll("{unit}", values.unit)
      .replaceAll("{unitLower}", values.unitLower)
      .replaceAll("{unitKey}", values.unitKey)
      .replaceAll("{subjectTitle}", values.subjectTitle)
      .replaceAll("{subjectShort}", values.subjectShort)
      .replaceAll("{subjectKey}", values.subjectKey)
      .replaceAll("{evidence}", values.evidence)
      .replaceAll("{focus}", values.focus);
  }

  function filledCriteria(criteria, values) {
    return criteria.map((criterion) => ({
      label: fillTemplate(criterion.label, values),
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

  function buildMcqQuestions(subject = getSelectedSubject()) {
    const profile = profileFor(subject);
    const setLength = profile.setLength || (subject.format.mcqCount >= 40 ? 3 : 2);
    const choiceCount = profile.choiceCount || 4;

    return Array.from({ length: subject.format.mcqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const values = buildValues(subject, unit);
      const correct = fillTemplate(profile.correct[index % profile.correct.length], values);
      const distractors = profile.distractors.map((choice) => fillTemplate(choice, values));
      const choices = rotateChoices([correct, ...distractors.slice(0, choiceCount - 1)], index + subject.slug.length);
      const setStart = Math.floor(index / setLength) * setLength + 1;
      const setEnd = Math.min(setStart + setLength - 1, subject.format.mcqCount);
      const stimulus = fillTemplate(profile.stimuli[index % profile.stimuli.length], values).replace(/\.$/, "");
      const stem = fillTemplate(profile.stems[index % profile.stems.length], values);
      const prompt = stimulus ? stimulus + ". " + stem : stem;

      return {
        id: index + 1,
        unit: "Unit " + ((index % subject.units.length) + 1) + ": " + unit,
        skill: (index % 4) + 1,
        set: undefined,
        stimulus: "",
        prompt,
        choices,
        correct: choices.indexOf(correct),
        explanation: fillTemplate(profile.explanation, values)
      };
    });
  }

  function buildFrqItems(subject = getSelectedSubject()) {
    const blueprint = frqBlueprintFor(subject);

    return Array.from({ length: subject.format.frqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const frqType = blueprint[index % blueprint.length];
      const values = buildValues(subject, unit);

      return {
        id: index + 1,
        title: fillTemplate(frqType.title, values),
        maxPoints: frqType.parts.length,
        stimulus: fillTemplate(frqType.stimulus, values),
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
    scopedStorageKey,
    selectedSubjectStorageKey,
    getSubjectByTitle,
    getSelectedSubject,
    storageKey,
    totalMinutes,
    formatWeight,
    getSubjectIcon,
    buildMcqQuestions,
    buildFrqItems
  };
}());
