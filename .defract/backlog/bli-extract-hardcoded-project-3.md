---
id: bli-extract-hardcoded-project-3
rawText: ""
title: Extract hardcoded project data out of projects.tsx into a typed constant
type: improvement
module: src/components/portfolio/projects.tsx
labels: []
groomingStatus: completed
createdAt: 2026-06-14T05:07:15Z
groomedAt: 2026-06-14T05:07:15Z
---

Project card content in src/components/portfolio/projects.tsx is likely inline. Moving it to a typed data array makes adding or reordering projects a data edit instead of a layout edit.
