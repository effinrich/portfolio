---
defract:
  id: task-add-storybook-story-for-the-dropdown-01kv28sbxa2q
  type: task
  status: active
  stage: scope
  phase: 0
  total_phases: 1
  priority: normal
  source: backlog
  source_id: bli-add-storybook-story-1
  branch_strategy: worktree
  mode: human-in-the-loop
  created_by: effinrich
  assignee: effinrich
---

## Story Brief

Promoted from backlog item `bli-add-storybook-story-1`.

- Module: src/stories
- Labels: starter

Original paste from the builder:

> The dropdown-menu shadcn primitive has no story coverage. Adding src/stories/dropdown-menu.stories.tsx closes one of the documented gaps in DESIGN.md §6 and gives Chromatic a baseline for visual regression.

# Add Storybook story for the dropdown-menu component

## What We're Building

Adding a Storybook story for the dropdown-menu component to provide visual regression testing coverage. This closes a documented gap in the design system and gives Chromatic a baseline to detect regressions as the component evolves.

## Expected Outcome

- Storybook displays a story showcasing the dropdown-menu component with various interaction states (open, closed, hovering, keyboard navigation)
- Visual regression testing baseline is established in Chromatic for the dropdown-menu
- Developers can use the story to review dropdown-menu behavior in isolation and ensure future changes don't break existing functionality

## Out of Scope

- Stories for other shadcn primitives not yet covered (alert-dialog, form, sonner, table) — these belong in separate tasks
- Design system refactoring or component changes — this task is story-only
- Implementation of new features in the dropdown-menu itself — only adding story coverage
