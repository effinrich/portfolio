# Resume

Versioned, code-built `.docx`. Edit content in `build-resume.mjs` (top of file is structured data), then regenerate.

## Build

cd resume
bun add docx           # one-time, ~5 MB
bun run build-resume.mjs

Output: `RichTillman_Resume.docx` in this folder.

## To PDF

Three options, pick whichever's handy:

```bash
# macOS / LibreOffice
soffice --headless --convert-to pdf RichTillman_Resume.docx

# Pandoc
pandoc RichTillman_Resume.docx -o RichTillman_Resume.pdf

# Word / Google Docs / Pages → File → Save as PDF
```

## Why a build script

- Single source of truth — content lives in typed objects, not hand-formatted prose
- Diffs are readable in git
- Regenerate in seconds when a role ends or a metric updates
- ATS-safe: US Letter, Arial 11pt, no tables, no images, clean section hierarchy
