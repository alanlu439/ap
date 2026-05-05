# Security Policy

AP Exam Practice is a static browser app. Local registration stores account details only in the visitor browser.

## Reporting Issues

If you find a security or privacy issue, open a private report if GitHub security advisories are enabled for the repository. If not, open a regular issue with minimal reproduction details and avoid posting sensitive information.

## Privacy Notes

- Practice progress is stored locally in the visitor browser through `localStorage`.
- Local accounts store a name, email, PBKDF2 password hash, selected subject, and saved progress in that same browser storage.
- These accounts are not cloud-synced and should not be treated as secure identity accounts. Do not reuse a sensitive password.
- No official AP credentials or personal exam information should be entered into the site.
