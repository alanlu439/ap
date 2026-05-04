# AP Exam Practice

AP Exam Practice is an independent, browser-based AP practice site made by Alan. It includes selectable practice for major AP subjects, dynamic exam structures, multiple-choice practice, free-response practice, estimated FRQ grading, saved progress, and official resource links for schedule/location checks.

## Repository Description

Browser-based AP practice exam hub with subject-specific MCQ and FRQ practice, official structure timing, saved progress, and estimated grading.

## Features

- Home page subject picker with AP subjects sorted alphabetically
- Pop-out exam structure selector after a subject is chosen
- Full practice, MCQ-only, and FRQ-only flows
- Per-subject AP exam counts, timing, and score weights
- Auto-saved progress in local browser storage
- Estimated FRQ rubric feedback after submission
- Ready confirmation before starting a section
- Disclaimer and legal notice for independent practice use
- Official College Board links for exam dates, location guidance, registration, and AP course information

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

## Exam Structure Sources

Exam structures were checked against official College Board/AP pages, including AP Central course exam pages and AP Students course resources. The app stores the structure data in `practice-data.js`.

Useful official links:

- [AP Central Courses](https://apcentral.collegeboard.org/courses)
- [AP Students Courses](https://apstudents.collegeboard.org/courses)
- [2026 AP Exam Dates](https://apstudents.collegeboard.org/exam-dates)
- [Register for AP Exams](https://apstudents.collegeboard.org/register-for-ap-exams)
- [Where do I take my AP Exam?](https://apstudents.collegeboard.org/help-center/when-where-do-i-take-ap-exam)

## Run Locally

This is a static site. Open `index.html` in a browser, or serve the folder with any static file server.

Example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `index.html` - home page and subject picker
- `mcq.html` / `app.js` - multiple-choice practice
- `frq.html` / `frq.js` - free-response practice and estimated grading
- `full.html` - full practice path
- `practice-data.js` - AP subject data, exam structures, and generated practice items
- `chrome.js` - shared header, picker, progress, focus mode, and cursor effects
- `styles.css` - full visual system
- `legal.html` - disclaimer and legal notice

## Disclaimer

AP(R) and Advanced Placement(R) are trademarks registered by the College Board. This site is independent and is not affiliated with, endorsed by, or reviewed by the College Board. Questions, explanations, scoring, and auto grading are original practice materials and are not official AP Exam content, scoring guidelines, or score predictions.
