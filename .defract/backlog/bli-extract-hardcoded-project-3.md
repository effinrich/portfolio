---
id: bli-extract-hardcoded-project-3
rawText: ""
title: Extract project card data into typed array
type: improvement
epic: portfolio
module: portfolio
size: s
labels:
  - refactor
groomingStatus: completed
createdAt: 2026-06-14T05:07:15Z
groomedAt: 2026-07-01T03:00:33Z
promotedTaskId: task-extract-project-card-data-into-typed-01kwdw0hb5c0
events:
  - type: grooming_started
    timestamp: 2026-07-01T03:00:00Z
  - type: grooming_completed
    timestamp: 2026-07-01T03:00:33Z
    summary: Cleaned title, set type=improvement, epic=portfolio, module=portfolio, size=s, labels=[refactor]
---

Project card content in src/components/portfolio/projects.tsx is likely inline. Moving it to a typed data array makes adding or reordering projects a data edit instead of a layout edit.
