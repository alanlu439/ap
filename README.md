# AP Exam Practice

Browser-based AP practice exam hub with subject-specific MCQ and FRQ practice, official structure timing, saved progress, and estimated grading.

AP Exam Practice is an independent study tool made by Alan. It lets students choose a major AP subject, review the official-style exam structure, and practice MCQ, FRQ, or a full exam flow in the browser.

## Try It Online

Website URL after GitHub Pages is enabled:

[https://alanlu439.github.io/ap/](https://alanlu439.github.io/ap/)

If the page returns 404, enable GitHub Pages in repository settings:

`Settings -> Pages -> Deploy from a branch -> main -> /root -> Save`

## What Visitors Can Do

- Choose from 42 AP subjects
- Register or sign in to a local browser account for per-user saved progress
- Start Full Exam, MCQ, or FRQ practice from a pop-out structure selector
- See per-subject section counts, minutes, and score weights
- Answer MCQs with saved progress and review feedback
- Write FRQ responses and get estimated rubric feedback after submission
- Check official AP exam schedule, location guidance, and registration links
- Read the independent-use disclaimer and official source links

## Included Subjects

- AP 2-D Art and Design
- AP 3-D Art and Design
- AP African American Studies
- AP Art History
- AP Biology
- AP Business with Personal Finance
- AP Calculus AB
- AP Calculus BC
- AP Chemistry
- AP Chinese Language and Culture
- AP Comparative Government and Politics
- AP Computer Science A
- AP Computer Science Principles
- AP Cybersecurity
- AP Drawing
- AP English Language and Composition
- AP English Literature and Composition
- AP Environmental Science
- AP European History
- AP French Language and Culture
- AP German Language and Culture
- AP Human Geography
- AP Italian Language and Culture
- AP Japanese Language and Culture
- AP Latin
- AP Macroeconomics
- AP Microeconomics
- AP Music Theory
- AP Physics 1: Algebra-Based
- AP Physics 2: Algebra-Based
- AP Physics C: Electricity and Magnetism
- AP Physics C: Mechanics
- AP Precalculus
- AP Psychology
- AP Research
- AP Seminar
- AP Spanish Language and Culture
- AP Spanish Literature and Culture
- AP Statistics
- AP United States Government and Politics
- AP United States History
- AP World History: Modern

## Project Structure

```text
.
├── index.html          # Home page and AP subject picker
├── full.html           # Full practice path
├── mcq.html            # Multiple-choice section UI
├── frq.html            # Free-response section UI
├── legal.html          # Disclaimer and legal notice
├── practice-data.js    # Subject list, exam structures, generated practice data
├── auth.js             # Local browser login, registration, and per-user storage scoping
├── app.js              # MCQ logic and grading
├── frq.js              # FRQ writing flow and estimated rubric grading
├── start.js            # Home page, subject selection, ready dialogs
├── chrome.js           # Shared header, picker, cursor, progress helpers
├── styles.css          # Visual system and responsive layout
├── assets/ap-icon.svg  # App icon and favicon
├── assets/social-preview.svg # Editable social preview source
└── assets/social-preview.png # 1280x640 GitHub social preview image
```

## Run Locally

This is a static site. Open `index.html` directly, or serve the folder with any static file server.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Release

The first public release is available here:

[AP Exam Practice v1.0.0](https://github.com/alanlu439/ap/releases/tag/v1.0.0)

## GitHub Social Preview

Use `assets/social-preview.png` for the repository social preview in GitHub settings. It is 1280x640 for best display.

GitHub path: `Settings -> General -> Social preview -> Edit -> Upload an image`

## Official Reference Links

Exam structures and the AP course catalog were checked against official College Board/AP pages, including AP Central course exam pages and AP Students course resources. The app stores the structure data and original practice-bank profiles in `practice-data.js`. Portfolio, AP Capstone, and AP Career Kickstart courses use practice mappings so the site can still offer MCQ and FRQ-style study flows while noting their nontraditional official assessment formats.

- [AP Central Courses](https://apcentral.collegeboard.org/courses)
- [AP Students Courses](https://apstudents.collegeboard.org/courses)
- [2026 AP Exam Dates](https://apstudents.collegeboard.org/exam-dates)
- [Register for AP Exams](https://apstudents.collegeboard.org/register-for-ap-exams)
- [Where do I take my AP Exam?](https://apstudents.collegeboard.org/help-center/when-where-do-i-take-ap-exam)

## Repository Description

Use this for the GitHub repository description:

`Browser-based AP practice exam hub with subject-specific MCQ and FRQ practice, official structure timing, saved progress, and estimated grading.`

Suggested topics:

`ap`, `ap-exams`, `practice-exam`, `education`, `static-site`, `mcq`, `frq`, `github-pages`

## Local Accounts

Registration and login are local to the current browser. The static GitHub Pages site stores a name, email, PBKDF2 password hash, selected subject, and practice progress in `localStorage`; it does not provide secure cloud accounts or cross-device sync. Visitors should not reuse a sensitive password.

## Disclaimer

AP(R) and Advanced Placement(R) are trademarks registered by the College Board. This site is independent and is not affiliated with, endorsed by, or reviewed by the College Board. Questions, explanations, scoring, and auto grading are original practice materials and are not official AP Exam content, scoring guidelines, official score reports, or score predictions. Subjects with portfolios, performance tasks, or AP Career Kickstart assessments are mapped into MCQ and FRQ-style practice for local auto grading; users should verify current official rules, timing, and test-day instructions with College Board/AP sources.
