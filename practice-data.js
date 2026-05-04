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

  const groupGuidance = {
    Arts: {
      evidence: "visual evidence, materials, composition, and written intent",
      reasoning: "connects artistic choices to purpose and viewer effect",
      misconception: "describes appearance without explaining design decisions"
    },
    Capstone: {
      evidence: "source credibility, claims, limitations, and line of reasoning",
      reasoning: "connects evidence to a defensible research argument",
      misconception: "summarizes sources without evaluating or synthesizing them"
    },
    Career: {
      evidence: "scenario details, risk tradeoffs, and practical constraints",
      reasoning: "connects a decision to costs, benefits, ethics, and stakeholder impact",
      misconception: "chooses an action without considering constraints or consequences"
    },
    CS: {
      evidence: "code behavior, algorithms, data, and computing impacts",
      reasoning: "traces logic accurately and explains why the program or system behaves that way",
      misconception: "states an output or policy without tracing the process"
    },
    English: {
      evidence: "textual evidence, rhetorical choices, structure, and commentary",
      reasoning: "links language or literary choices to meaning, purpose, or effect",
      misconception: "summarizes the passage instead of analyzing how it works"
    },
    History: {
      evidence: "historical evidence, sourcing, chronology, and context",
      reasoning: "builds a defensible claim using causation, comparison, continuity, or change",
      misconception: "lists facts without connecting them to a historical argument"
    },
    Math: {
      evidence: "definitions, representations, calculations, and conditions",
      reasoning: "connects each step to the mathematical meaning of the problem",
      misconception: "performs a procedure without checking assumptions or interpreting the result"
    },
    Science: {
      evidence: "data, models, variables, and experimental conditions",
      reasoning: "connects evidence to a scientific claim or mechanism",
      misconception: "names a concept but ignores the data or model in the prompt"
    },
    Social: {
      evidence: "models, institutions, data, cases, and policy context",
      reasoning: "explains how the concept affects behavior, incentives, or outcomes",
      misconception: "gives a definition without applying it to the scenario"
    },
    "World Lang": {
      evidence: "cultural context, vocabulary, audience, register, and source details",
      reasoning: "selects language or interpretation that fits purpose, audience, and culture",
      misconception: "translates words literally without considering context or register"
    }
  };

  function guidanceFor(subject) {
    return groupGuidance[subject.group] || groupGuidance.Social;
  }

  function buildMcqQuestions(subject = getSelectedSubject()) {
    const guidance = guidanceFor(subject);
    const stems = [
      "A student is working with {unit}. Which response would best meet AP-style scoring expectations?",
      "Which revision would make an answer about {unit} strongest?",
      "Which choice shows the best use of evidence for {unit}?",
      "Which answer best avoids a common error when explaining {unit}?",
      "A prompt asks students to reason about {unit}. Which response is most complete?"
    ];

    return Array.from({ length: subject.format.mcqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const unitLower = unit.toLowerCase();
      const stem = stems[index % stems.length].replace("{unit}", unitLower);
      const correct = "Apply " + unitLower + " to the specific prompt, use " + guidance.evidence + ", and explain why that evidence supports the conclusion.";
      const distractors = [
        "Define " + unitLower + " accurately but do not apply it to the prompt.",
        "Rely on a broad opinion instead of " + guidance.evidence + ".",
        "Shift to an unrelated " + subject.short + " topic and ignore the task.",
        "Make a claim about " + unitLower + " but skip the reasoning that earns credit."
      ];
      const choices = rotateChoices([correct, ...distractors], index + subject.slug.length);

      return {
        id: index + 1,
        unit: "Unit " + ((index % subject.units.length) + 1) + ": " + unit,
        skill: (index % 4) + 1,
        set: index % 5 === 0 ? "Questions " + (index + 1) + "-" + Math.min(index + 3, subject.format.mcqCount) + " share a topic" : undefined,
        stimulus: index % 5 === 0 ? "Topic focus: " + unit + ". Use course-specific reasoning for " + subject.title + "." : "",
        prompt: stem,
        choices,
        correct: choices.indexOf(correct),
        explanation: "The best AP-style response " + guidance.reasoning + ". The other choices are incomplete because one " + guidance.misconception + ", one is off task, and one lacks support."
      };
    });
  }

  function buildFrqItems(subject = getSelectedSubject()) {
    const guidance = guidanceFor(subject);
    return Array.from({ length: subject.format.frqCount }, (_, index) => {
      const unit = subject.units[index % subject.units.length];
      const unitLower = unit.toLowerCase();
      const keyTerm = unit.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      const subjectTerm = subject.short.toLowerCase().split(" ")[0].replace(/[^a-z0-9]/g, "");

      return {
        id: index + 1,
        title: unit + " Task",
        maxPoints: 4,
        stimulus: "Practice made by Alan for " + subject.title + ". Analyze a scenario involving " + unitLower + ", use course vocabulary, and justify a conclusion with evidence.",
        parts: [
          {
            label: "(a) Identify the main course concept connected to " + unitLower + ".",
            criteria: [
              { label: "Identifies the relevant concept", groups: [[keyTerm, subjectTerm, "concept", "claim"]] }
            ]
          },
          {
            label: "(b) Use specific evidence from the scenario to support the claim.",
            criteria: [
              { label: "Uses evidence from the prompt", groups: [["evidence", "scenario", "source", "data", "example", "text"]] },
              { label: "Connects evidence to the claim", groups: [["because", "therefore", "shows", "supports", "leads", "causes", "explains"]] }
            ]
          },
          {
            label: "(c) Explain the reasoning in " + subject.short + " terms.",
            criteria: [
              { label: "Explains reasoning with course vocabulary", groups: [[subjectTerm, keyTerm, "model", "process", "context", "method"]] }
            ]
          },
          {
            label: "(d) State a justified conclusion, limitation, or next step.",
            criteria: [
              { label: "States a justified conclusion or limitation", groups: [["conclude", "conclusion", "limitation", "however", "therefore", "next"]] }
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
