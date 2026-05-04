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
        "frqCount": 4,
        "frqMinutes": 100,
        "mcqWeight": 40,
        "frqWeight": 60,
        "fullMinutes": 170,
        "note": "Includes an individual student project; practice combines written-response and project reasoning."
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
        "mcqMinutes": 90,
        "frqCount": 4,
        "frqMinutes": 90,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "AP Career Kickstart practice structure; confirm local exam details with official AP resources."
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
        "mcqWeight": 60,
        "frqWeight": 40,
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
        "mcqMinutes": 90,
        "frqCount": 4,
        "frqMinutes": 90,
        "mcqWeight": 50,
        "frqWeight": 50,
        "fullMinutes": 180,
        "note": "AP Career Kickstart practice structure; confirm local exam details with official AP resources."
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
        "mcqWeight": 66,
        "frqWeight": 33,
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

  const assessmentProfiles = {
    Math: {
      focus: "mathematical modeling and justification",
      evidence: "definitions, representations, calculations, and conditions",
      stimuli: [
        "A problem gives a graph, table, or symbolic rule connected to {unit}. The answer must choose a valid method and interpret the result in context.",
        "A student models a real situation using {unit}. Several solution paths are proposed, but only one keeps the needed conditions and units.",
        "A calculator or algebraic result is shown for {unit}. The task is to decide which conclusion follows from the result."
      ],
      stems: [
        "Which response best justifies the next step in the solution?",
        "Which statement correctly interprets the result in context?",
        "Which method is valid for the information given?",
        "Which answer avoids the most common procedural error?"
      ],
      correct: [
        "Use the representation to set up the correct relationship, check the required conditions, and interpret the answer with units.",
        "Connect the calculation to the meaning of {unit} and explain why the result answers the question asked."
      ],
      distractors: [
        "Use a familiar formula without checking that its conditions match the problem.",
        "Give a numeric answer with no interpretation or units.",
        "Use the correct vocabulary for {unit} but reverse the direction of the conclusion.",
        "Ignore the graph or table and choose a method based only on a keyword."
      ],
      explanation: "AP math questions reward a valid setup, attention to conditions, and interpretation in context; the distractors reflect common formula-only or context-free errors.",
      frqTypes: [
        {
          title: "Modeling and Interpretation",
          stimulus: "A multi-part free-response problem presents a representation involving {unit}. Students must choose a method, carry out the work, and interpret the result.",
          parts: [
            { label: "(a) Identify the relevant representation, quantity, or condition.", criteria: [{ label: "Identifies the relevant quantity or condition", groups: [["condition", "given", "quantity", "representation", "{unitKey}"]] }] },
            { label: "(b) Set up and carry out an appropriate calculation or symbolic step.", criteria: [{ label: "Shows a valid setup", groups: [["equation", "function", "derivative", "integral", "model", "setup", "calculate"]] }] },
            { label: "(c) Justify why the method is valid.", criteria: [{ label: "Provides mathematical justification", groups: [["because", "therefore", "valid", "condition", "reason", "justifies"]] }] },
            { label: "(d) Interpret the result in context.", criteria: [{ label: "Interprets in context", groups: [["context", "means", "represents", "units", "therefore", "conclude"]] }] }
          ]
        }
      ]
    },
    Science: {
      focus: "scientific modeling, data analysis, and experimental reasoning",
      evidence: "data, models, variables, uncertainty, and experimental conditions",
      stimuli: [
        "An investigation about {unit} reports a data table and a proposed scientific explanation.",
        "A diagram or model represents a process related to {unit}. Students must connect the model to evidence.",
        "A lab group changes one variable in a system involving {unit} and compares the resulting trend."
      ],
      stems: [
        "Which conclusion is best supported by the evidence?",
        "Which claim-evidence-reasoning response would earn credit?",
        "Which experimental change would most improve the investigation?",
        "Which explanation best connects the model to the observed trend?"
      ],
      correct: [
        "State a testable claim, cite the relevant data trend, and explain the mechanism connecting {unit} to the observation.",
        "Use the model and data together, identify the variable relationship, and justify the conclusion scientifically."
      ],
      distractors: [
        "Name the science concept but do not connect it to the data.",
        "Describe the trend but give no mechanism or reasoning.",
        "Change several variables at once, making the result hard to interpret.",
        "Make a claim that goes beyond the evidence in the stimulus."
      ],
      explanation: "AP science items commonly ask for claim, evidence, and reasoning from a model or data display; unsupported claims and uncontrolled designs are weak.",
      frqTypes: [
        {
          title: "Experimental Analysis",
          stimulus: "A lab scenario involving {unit} includes variables, data, and a proposed explanation.",
          parts: [
            { label: "(a) State a scientific claim related to the scenario.", criteria: [{ label: "States a claim", groups: [["claim", "predict", "increase", "decrease", "relationship"]] }] },
            { label: "(b) Use evidence from the data or model to support the claim.", criteria: [{ label: "Uses evidence", groups: [["data", "evidence", "trend", "table", "graph", "model"]] }] },
            { label: "(c) Explain the biological, chemical, physical, or environmental mechanism.", criteria: [{ label: "Explains a mechanism", groups: [["because", "mechanism", "process", "causes", "therefore", "explains"]] }] },
            { label: "(d) Propose a controlled improvement or follow-up investigation.", criteria: [{ label: "Controls variables or proposes a follow-up", groups: [["control", "variable", "repeat", "trial", "measure", "investigate"]] }] }
          ]
        }
      ]
    },
    History: {
      focus: "historical argumentation from documents and context",
      evidence: "historical evidence, sourcing, chronology, and context",
      stimuli: [
        "A historical source about {unit} includes an author, audience, and point of view.",
        "A set of events related to {unit} must be explained using causation, comparison, continuity, or change over time.",
        "A document excerpt is paired with a broader historical development connected to {unit}."
      ],
      stems: [
        "Which statement best uses the source as historical evidence?",
        "Which claim would make the strongest historical argument?",
        "Which contextualization would best support the analysis?",
        "Which response best explains cause, comparison, continuity, or change?"
      ],
      correct: [
        "Make a defensible claim, connect the source to broader context, and explain how the evidence supports the argument.",
        "Use the document's point of view and historical situation to support a specific argument about {unit}."
      ],
      distractors: [
        "Quote or summarize the source without explaining its historical significance.",
        "Make a claim that is too broad to be defended with the evidence.",
        "Ignore the time period and use an anachronistic explanation.",
        "List facts about {unit} without connecting them to an argument."
      ],
      explanation: "AP history questions reward defensible claims, contextualization, sourcing, and evidence-based reasoning rather than simple summary.",
      frqTypes: [
        {
          title: "Document-Based Historical Argument",
          stimulus: "A document set addresses a historical development involving {unit}. Use source analysis and outside context to build an argument.",
          parts: [
            { label: "(a) Write a defensible thesis or claim.", criteria: [{ label: "States a defensible claim", groups: [["claim", "argue", "because", "although", "thesis"]] }] },
            { label: "(b) Describe relevant historical context.", criteria: [{ label: "Provides context", groups: [["context", "period", "before", "during", "broader", "historical"]] }] },
            { label: "(c) Use evidence from the source or course content.", criteria: [{ label: "Uses evidence", groups: [["evidence", "document", "source", "example", "shows"]] }] },
            { label: "(d) Explain sourcing, causation, comparison, continuity, or change.", criteria: [{ label: "Explains historical reasoning", groups: [["cause", "change", "continuity", "comparison", "point of view", "purpose", "audience"]] }] }
          ]
        }
      ]
    },
    English: {
      focus: "close reading, rhetoric, evidence, and commentary",
      evidence: "textual evidence, rhetorical choices, structure, and commentary",
      stimuli: [
        "A passage related to {unit} uses deliberate diction, structure, and detail to shape meaning.",
        "A writer develops a claim about {unit} through evidence, organization, and style.",
        "A literary or rhetorical excerpt invites analysis of how choices create an effect."
      ],
      stems: [
        "Which commentary best explains how the evidence supports the claim?",
        "Which revision would strengthen the line of reasoning?",
        "Which statement best analyzes the author's choices?",
        "Which answer moves beyond summary into analysis?"
      ],
      correct: [
        "Identify the textual choice, connect it to the writer's purpose, and explain how it shapes meaning or effect.",
        "Use specific evidence and commentary to develop a defensible interpretation of {unit}."
      ],
      distractors: [
        "Summarize what happens in the passage without analyzing how it is written.",
        "Use a quotation but leave the connection to the claim unstated.",
        "Offer a personal reaction instead of commentary on the text.",
        "Name a device from {unit} but misidentify its effect."
      ],
      explanation: "AP English responses earn credit for defensible interpretation, specific evidence, and commentary explaining how choices create meaning.",
      frqTypes: [
        {
          title: "Evidence-Based Essay Response",
          stimulus: "A passage or prompt connected to {unit} asks for a defensible interpretation supported by evidence.",
          parts: [
            { label: "(a) State a defensible thesis or claim.", criteria: [{ label: "States a defensible thesis", groups: [["claim", "argue", "thesis", "shows", "reveals"]] }] },
            { label: "(b) Select specific textual or rhetorical evidence.", criteria: [{ label: "Uses textual evidence", groups: [["evidence", "quote", "detail", "diction", "imagery", "structure"]] }] },
            { label: "(c) Explain how the evidence supports the line of reasoning.", criteria: [{ label: "Provides commentary", groups: [["because", "therefore", "suggests", "emphasizes", "conveys", "develops"]] }] },
            { label: "(d) Address complexity, purpose, or broader significance.", criteria: [{ label: "Addresses complexity or significance", groups: [["complex", "although", "however", "purpose", "significance", "tension"]] }] }
          ]
        }
      ]
    },
    WorldLang: {
      focus: "interpretive, interpersonal, presentational, and cultural communication",
      evidence: "cultural context, vocabulary, audience, register, and source details",
      stimuli: [
        "A message, article, chart, or audio summary about {unit} requires interpretation of purpose and audience.",
        "A communication task about {unit} asks for an appropriate register and culturally aware response.",
        "A cultural comparison prompt connects {unit} to practices, products, or perspectives."
      ],
      stems: [
        "Which response best fits the audience and purpose?",
        "Which interpretation is best supported by the source?",
        "Which sentence uses the most appropriate register?",
        "Which answer best connects culture and communication?"
      ],
      correct: [
        "Use details from the source, choose an appropriate register, and connect the response to cultural context.",
        "Interpret the message according to audience, purpose, and evidence from {unit}."
      ],
      distractors: [
        "Translate words literally without considering context or register.",
        "Respond to only part of the prompt and ignore the audience.",
        "Use cultural information that is too vague to support the answer.",
        "Make a claim about {unit} without source evidence."
      ],
      explanation: "AP world language tasks combine interpretation, audience awareness, register, and cultural evidence.",
      frqTypes: [
        {
          title: "Communication Task",
          stimulus: "A source or prompt about {unit} asks for an interpersonal or presentational response.",
          parts: [
            { label: "(a) Identify the source purpose, audience, or main idea.", criteria: [{ label: "Identifies purpose or main idea", groups: [["purpose", "audience", "main", "source", "message"]] }] },
            { label: "(b) Use source details or cultural evidence.", criteria: [{ label: "Uses evidence", groups: [["evidence", "source", "detail", "example", "culture", "cultural"]] }] },
            { label: "(c) Respond with appropriate register and organization.", criteria: [{ label: "Uses register and organization", groups: [["formal", "informal", "register", "greeting", "organized", "audience"]] }] },
            { label: "(d) Make a cultural comparison or supported conclusion.", criteria: [{ label: "Connects culture to conclusion", groups: [["compare", "culture", "perspective", "practice", "product", "conclusion"]] }] }
          ]
        }
      ]
    },
    Portfolio: {
      focus: "portfolio development, visual evidence, and artistic intent",
      evidence: "visual evidence, materials, process, composition, and written intent",
      stimuli: [
        "A portfolio statement describes work connected to {unit}, including process images and selected final pieces.",
        "A critique compares how materials, composition, and experimentation communicate an idea in {unit}.",
        "An artist revises a sustained investigation around {unit} after reviewing visual evidence."
      ],
      stems: [
        "Which critique best connects form and intent?",
        "Which revision would most strengthen the portfolio evidence?",
        "Which statement best explains the relationship between process and outcome?",
        "Which response would best support a sustained investigation?"
      ],
      correct: [
        "Connect materials, composition, and process decisions to the stated inquiry and visual evidence.",
        "Explain how the selected work demonstrates investigation, revision, and intentional decision-making."
      ],
      distractors: [
        "Praise the work generally without citing visual evidence.",
        "Describe materials but ignore the artist's intent or inquiry.",
        "Choose a revision only because it is more decorative.",
        "Discuss {unit} as a theme without linking it to specific portfolio evidence."
      ],
      explanation: "Portfolio scoring emphasizes sustained investigation, selected works, materials, process, and written evidence tied to intent.",
      frqTypes: [
        {
          title: "Portfolio Reflection",
          stimulus: "A portfolio prompt asks the artist to explain choices and evidence connected to {unit}.",
          parts: [
            { label: "(a) State the inquiry or artistic intent.", criteria: [{ label: "States intent or inquiry", groups: [["intent", "inquiry", "idea", "question", "investigation"]] }] },
            { label: "(b) Describe specific visual evidence.", criteria: [{ label: "Uses visual evidence", groups: [["visual", "evidence", "composition", "material", "process", "form"]] }] },
            { label: "(c) Explain how revision or experimentation strengthened the work.", criteria: [{ label: "Explains process or revision", groups: [["revise", "revision", "experiment", "process", "because", "develop"]] }] },
            { label: "(d) Justify why the selected work belongs in the portfolio.", criteria: [{ label: "Justifies selection", groups: [["selected", "portfolio", "because", "demonstrates", "supports", "investigation"]] }] }
          ]
        }
      ]
    },
    Capstone: {
      focus: "research design, source evaluation, and argument synthesis",
      evidence: "source credibility, claims, limitations, and line of reasoning",
      stimuli: [
        "A research team examines sources connected to {unit} and must evaluate credibility and relevance.",
        "A student develops a line of reasoning about {unit} using multiple perspectives.",
        "A presentation defense question asks the student to justify choices in research on {unit}."
      ],
      stems: [
        "Which revision best strengthens the research question?",
        "Which evaluation of the source is most useful?",
        "Which evidence best supports the line of reasoning?",
        "Which limitation should the researcher acknowledge?"
      ],
      correct: [
        "Connect the source's credibility, relevance, and limitations to a focused research claim.",
        "Synthesize evidence from multiple perspectives and explain how it supports the argument."
      ],
      distractors: [
        "Use a source only because it agrees with the claim.",
        "Summarize sources one by one without synthesis.",
        "Ask a question that is too broad to investigate.",
        "Ignore limitations in the evidence about {unit}."
      ],
      explanation: "AP Capstone work values focused inquiry, source credibility, synthesis, limitations, and defensible argumentation.",
      frqTypes: [
        {
          title: "Research and Argument Response",
          stimulus: "A research prompt about {unit} asks for evaluation, synthesis, and defense of a claim.",
          parts: [
            { label: "(a) Write or refine a focused research question.", criteria: [{ label: "Focuses a research question", groups: [["research", "question", "focused", "scope", "investigate"]] }] },
            { label: "(b) Evaluate source credibility and relevance.", criteria: [{ label: "Evaluates credibility", groups: [["credibility", "relevant", "source", "bias", "reliable", "limitation"]] }] },
            { label: "(c) Synthesize evidence into a line of reasoning.", criteria: [{ label: "Synthesizes evidence", groups: [["synthesize", "evidence", "perspective", "reasoning", "connects", "supports"]] }] },
            { label: "(d) Defend the conclusion and acknowledge a limitation.", criteria: [{ label: "Defends with limitation", groups: [["defend", "conclusion", "limitation", "however", "because", "therefore"]] }] }
          ]
        }
      ]
    },
    CS: {
      focus: "program behavior, algorithms, data, and computing impacts",
      evidence: "code behavior, algorithms, data, abstractions, and impacts",
      stimuli: [
        "A short algorithm processes data related to {unit}. Students must trace the output or identify an error.",
        "A computing scenario involving {unit} asks about abstraction, data, security, or impact.",
        "A program segment is described with inputs, conditions, and repeated steps."
      ],
      stems: [
        "Which statement best describes the program behavior?",
        "Which change would correctly fix or improve the algorithm?",
        "Which explanation best traces the data through the process?",
        "Which answer best accounts for impact, security, or abstraction?"
      ],
      correct: [
        "Trace each step of the algorithm, connect the data to the condition being tested, and state the resulting behavior.",
        "Use the abstraction correctly and explain how the program logic produces the outcome."
      ],
      distractors: [
        "Assume the loop runs once without checking the condition.",
        "Describe the purpose of the program but not its actual behavior.",
        "Ignore the data representation used in {unit}.",
        "Choose a fix that solves one case but fails a boundary case."
      ],
      explanation: "AP computer science questions reward accurate tracing, abstraction, data reasoning, and attention to edge cases or impacts.",
      frqTypes: [
        {
          title: "Algorithm and Program Reasoning",
          stimulus: "A program or computing scenario connected to {unit} includes inputs, processing, and expected behavior.",
          parts: [
            { label: "(a) Describe the purpose, input, or output of the program.", criteria: [{ label: "Describes purpose or I/O", groups: [["purpose", "input", "output", "program", "data"]] }] },
            { label: "(b) Explain the algorithm or abstraction used.", criteria: [{ label: "Explains algorithm or abstraction", groups: [["algorithm", "abstraction", "loop", "condition", "list", "method"]] }] },
            { label: "(c) Trace or justify the result for a test case.", criteria: [{ label: "Traces a test case", groups: [["test", "case", "trace", "because", "result", "returns"]] }] },
            { label: "(d) Identify an improvement, limitation, or impact.", criteria: [{ label: "Identifies improvement or impact", groups: [["improve", "limitation", "impact", "security", "privacy", "efficiency"]] }] }
          ]
        }
      ]
    },
    Social: {
      focus: "models, institutions, behavior, data, and policy reasoning",
      evidence: "models, institutions, data, cases, and policy context",
      stimuli: [
        "A scenario or data display about {unit} asks students to apply a course model.",
        "A policy, institution, market, or behavior pattern connected to {unit} is described.",
        "A chart or case study requires interpretation using course vocabulary."
      ],
      stems: [
        "Which application of the course concept is most accurate?",
        "Which conclusion is best supported by the data or scenario?",
        "Which explanation best connects the model to the outcome?",
        "Which response avoids a definition-only answer?"
      ],
      correct: [
        "Apply the course concept to the scenario, use the relevant data or case evidence, and explain the effect on behavior or outcomes.",
        "Connect {unit} to a specific model, institution, or decision and justify the conclusion."
      ],
      distractors: [
        "Define the term but do not apply it to the scenario.",
        "Choose a conclusion that is plausible but not supported by the data.",
        "Ignore the institution, incentive, or context in {unit}.",
        "Make a value judgment instead of a course-based explanation."
      ],
      explanation: "AP social science questions often require applying a model or institution to data and explaining behavior, incentives, or outcomes.",
      frqTypes: [
        {
          title: "Applied Concept Response",
          stimulus: "A scenario, model, or data source connected to {unit} asks for application and explanation.",
          parts: [
            { label: "(a) Define or identify the relevant course concept.", criteria: [{ label: "Identifies concept", groups: [["define", "concept", "model", "institution", "{unitKey}"]] }] },
            { label: "(b) Apply the concept to the scenario or data.", criteria: [{ label: "Applies to scenario", groups: [["scenario", "data", "case", "example", "shows", "applies"]] }] },
            { label: "(c) Explain the reasoning or causal mechanism.", criteria: [{ label: "Explains reasoning", groups: [["because", "therefore", "causes", "effect", "incentive", "explains"]] }] },
            { label: "(d) State a supported implication, comparison, or limitation.", criteria: [{ label: "States implication or limitation", groups: [["implication", "compare", "limitation", "however", "conclusion", "policy"]] }] }
          ]
        }
      ]
    }
  };

  function profileKeyFor(subject) {
    if (/Art and Design|Drawing/.test(subject.title)) return "Portfolio";
    if (/Research|Seminar/.test(subject.title)) return "Capstone";
    if (/Computer Science|Cybersecurity/.test(subject.title)) return "CS";
    if (/Language and Culture|Latin|Spanish Literature/.test(subject.title)) return "WorldLang";
    return assessmentProfiles[subject.group] ? subject.group : "Social";
  }

  function profileFor(subject) {
    return assessmentProfiles[profileKeyFor(subject)] || assessmentProfiles.Social;
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

  function buildMcqQuestions(subject = getSelectedSubject()) {
    const profile = profileFor(subject);
    const setLength = subject.format.mcqCount >= 40 ? 3 : 2;

    return Array.from({ length: subject.format.mcqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const values = {
        unit,
        unitLower: unit.toLowerCase(),
        unitKey: keywordFrom(unit),
        subjectTitle: subject.title,
        subjectShort: subject.short,
        subjectKey: keywordFrom(subject.short),
        evidence: profile.evidence,
        focus: profile.focus
      };
      const correct = fillTemplate(profile.correct[index % profile.correct.length], values);
      const distractors = profile.distractors.map((choice) => fillTemplate(choice, values));
      const choices = rotateChoices([correct, ...distractors.slice(0, 4)], index + subject.slug.length);
      const setStart = Math.floor(index / setLength) * setLength + 1;
      const setEnd = Math.min(setStart + setLength - 1, subject.format.mcqCount);

      return {
        id: index + 1,
        unit: "Unit " + ((index % subject.units.length) + 1) + ": " + unit,
        skill: (index % 4) + 1,
        set: setEnd > setStart ? "Questions " + setStart + "-" + setEnd + " share a stimulus" : undefined,
        stimulus: fillTemplate(profile.stimuli[index % profile.stimuli.length], values),
        prompt: fillTemplate(profile.stems[index % profile.stems.length], values),
        choices,
        correct: choices.indexOf(correct),
        explanation: fillTemplate(profile.explanation, values)
      };
    });
  }

  function buildFrqItems(subject = getSelectedSubject()) {
    const profile = profileFor(subject);

    return Array.from({ length: subject.format.frqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const frqType = profile.frqTypes[index % profile.frqTypes.length];
      const values = {
        unit,
        unitLower: unit.toLowerCase(),
        unitKey: keywordFrom(unit),
        subjectTitle: subject.title,
        subjectShort: subject.short,
        subjectKey: keywordFrom(subject.short),
        evidence: profile.evidence,
        focus: profile.focus
      };

      return {
        id: index + 1,
        title: fillTemplate(frqType.title, values),
        maxPoints: frqType.parts.length,
        stimulus: "Practice made by Alan for " + subject.title + ". " + fillTemplate(frqType.stimulus, values),
        parts: frqType.parts.map((part) => ({
          label: fillTemplate(part.label, values),
          criteria: filledCriteria(part.criteria, values)
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
    buildMcqQuestions,
    buildFrqItems
  };
}());
