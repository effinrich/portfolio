---
defract:
  id: task-follow-up-extract-project-card-data-01kwdx4d50bj
  type: improvement
  status: active
  stage: scope
  phase: 0
  total_phases: 1
  priority: normal
  source: manual
  branch_strategy: worktree
  mode: human-in-the-loop
  created_by: effinrich
  assignee: effinrich
  follows_from: task-extract-project-card-data-into-typed-01kwdw0hb5c0
---

## Story Brief

do the thing

# Follow-up: Extract project card data into typed array

## What We're Building

Complete the refactoring to use the extracted project data in the projects component and any other sections that reference projects. The parent task moved project card data to a typed constant file; this follow-up ensures the component wiring is complete and uses that data consistently rather than inline JSX.

## Expected Outcome

- Projects component renders from the typed data constant instead of inline card definitions
- All project edits are made in the data file, not in component markup
- Project structure is validated by TypeScript and reusable across the app
- Adding or reordering projects requires only data edits
- No hardcoded project content remains in component files

## Out of Scope

- Building an admin UI for project management (future task, different scope)
- Adding new projects beyond current portfolio content (data maintenance task)
- Styling or design changes to project cards (polish / design task)

---

**Note for builder:** The intent assumes the follow-up work is wiring the component to use the extracted data constant. If "do the thing" means something different (e.g., add more projects, create tests, different refactor), let me know and I'll adjust the scope.
