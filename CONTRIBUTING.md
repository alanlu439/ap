# Contributing

Thanks for helping improve AP Exam Practice.

## Good Contributions

- Fix broken links or typos
- Improve accessibility, responsive layout, or performance
- Add clearer original practice questions
- Improve estimated FRQ feedback
- Update exam structure data after checking official College Board/AP sources

## Before You Change Exam Data

Exam counts, timing, and weights should be double-checked against official sources before edits. Prefer AP Central and AP Students pages.

## Local Checks

This is a static site. Before opening a pull request, run:

```bash
node --check practice-data.js
node --check start.js
node --check app.js
node --check frq.js
node --check chrome.js
```

Then open `index.html` or serve the folder locally:

```bash
python3 -m http.server 8000
```

## Content Rules

Do not add official AP Exam questions, secured exam content, or copyrighted College Board materials. Practice questions should be original.
