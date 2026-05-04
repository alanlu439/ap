# AP Exam Practice

Browser-based AP practice exam hub with subject-specific MCQ and FRQ practice, official structure timing, saved progress, and estimated grading.

AP Exam Practice is an independent study tool made by Alan. It lets students choose a major AP subject, review the official-style exam structure, and practice MCQ, FRQ, or a full exam flow in the browser.

## Try It Online

Website URL after GitHub Pages is enabled:

[https://alanlu439.github.io/ap/](https://alanlu439.github.io/ap/)

If the page returns 404, enable GitHub Pages in repository settings:

`Settings -> Pages -> Deploy from a branch -> main -> /root -> Save`

## What Visitors Can Do

- Choose from 20 major AP subjects
- Start Full Exam, MCQ, or FRQ practice from a pop-out structure selector
- See per-subject section counts, minutes, and score weights
- Answer MCQs with saved progress and review feedback
- Write FRQ responses and get estimated rubric feedback after submission
- Check official AP exam schedule, location guidance, and registration links
- Read the independent-use disclaimer and official source links

## Included Subjects

- AP Biology
- AP Calculus AB
- AP Calculus BC
- AP Chemistry
- AP Computer Science A
- AP Computer Science Principles
- AP English Language and Composition
- AP English Literature and Composition
- AP Environmental Science
- AP Human Geography
- AP Macroeconomics
- AP Physics 1
- AP Physics C: Mechanics
- AP Precalculus
- AP Psychology
- AP Spanish Language and Culture
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
├── app.js              # MCQ logic and grading
├── frq.js              # FRQ writing flow and estimated rubric grading
├── start.js            # Home page, subject selection, ready dialogs
├── chrome.js           # Shared header, picker, cursor, progress helpers
├── styles.css          # Visual system and responsive layout
└── assets/ap-icon.svg  # App icon and favicon
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

## Official Reference Links

Exam structures were checked against official College Board/AP pages, including AP Central course exam pages and AP Students course resources. The app stores the structure data in `practice-data.js`.

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

## Disclaimer

AP(R) and Advanced Placement(R) are trademarks registered by the College Board. This site is independent and is not affiliated with, endorsed by, or reviewed by the College Board. Questions, explanations, scoring, and auto grading are original practice materials and are not official AP Exam content, scoring guidelines, official score reports, or score predictions.
