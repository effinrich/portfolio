---
defract:
  id: task-extract-project-card-data-into-typed-01kwdw0hb5c0
  type: improvement
  status: active
  stage: scope
  phase: 0
  total_phases: 1
  priority: normal
  source: backlog
  source_id: bli-extract-hardcoded-project-3
  branch_strategy: worktree
  mode: human-in-the-loop
  created_by: effinrich
  assignee: effinrich
---

## Story Brief

Promoted from backlog item `bli-extract-hardcoded-project-3`.

- Epic: portfolio
- Module: portfolio
- Labels: refactor

Original paste from the builder:

> Project card content in src/components/portfolio/projects.tsx is likely inline. Moving it to a typed data array makes adding or reordering projects a data edit instead of a layout edit.

# Extract project card data into typed array

## What We're Building

Moving project card data (titles, descriptions, images, links) from embedded in the projects component into a separate, typed constants file. This makes the projects section a pure presentation component, while content lives in a data layer that can be edited without touching component logic.

## Expected Outcome

- Builders can add or reorder projects by editing data, not component files
- Projects component is smaller and focused only on rendering layout and styling
- Project data has a single, well-defined TypeScript type that lives in a dedicated file
- Adding a new project requires one file change (data) instead of multiple edits across component layout

## Out of Scope

- Editing testimonial or experience components (those are separate sections)
- Creating a full CMS or database integration (data stays in code)
- Adding new fields to the project type beyond what's already used
