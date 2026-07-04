---
defract:
  id: task-follow-up-add-storybook-story-for-the-01kwdx0w3c6m
  type: task
  status: active
  stage: scope
  phase: 0
  total_phases: 1
  priority: high
  source: manual
  branch_strategy: worktree
  mode: human-in-the-loop
  created_by: effinrich
  assignee: effinrich
  follows_from: task-add-storybook-story-for-the-dropdown-01kv28sbxa2q
---

## Story Brief

try making pr again

# Fix and commit dropdown-menu Storybook story

# Fix and commit dropdown-menu Storybook story

## What We're Building

Fix the dropdown-menu Storybook story that failed code review. Correct test selector issues, add missing keyboard interactions, and ensure the story file is properly committed to the feature branch.

## Expected Outcome

- Story file is committed to feature branch
- Test selector correctly targets disabled state element
- Play function includes Arrow and Escape key interactions
- All acceptance criteria pass (story renders, tests run, keyboard play works)
- Story ready for PR and Chromatic visual baseline

## Phase Outcomes

- **Phase 1: Fix and commit dropdown-menu story** — Resolves test selector failures, adds missing keyboard interactions, and pushes committed file to feature branch so story is PR-ready with passing Chromatic baseline.

## Out of Scope

- Other undocumented components (handled in separate tasks)
- Changes to dropdown-menu component itself (story file only)
- Broader Storybook configuration updates

## Scope Summary

**Size:** 3 requirements, 4 acceptance criteria, 1 implementation phase

**Key decisions:**

- Add play function to Disabled story to test disabled state with correct selector
- Verify KeyboardInteraction play function covers both Arrow Down and Escape key events
- Commit story file using git with conventional message

**Biggest risk:** Test selectors must match actual DOM structure in rendered stories; verify against browser DevTools if selector assertions fail.

## Context

Parent task `task-add-storybook-story-for-the-dropdown-01kv28sbxa2q` delivered dropdown-menu.stories.tsx but failed review on three acceptance criteria:

- AC-1: Story file not committed to feature branch
- AC-6: Disabled story test selector targets wrong element (likely testing wrong attribute/role)
- AC-9: Play function missing Arrow and Escape keyboard event handlers

Current story file at `src/stories/dropdown-menu.stories.tsx` (366 lines) contains 8 exported story variants: Default, Checkbox, RadioGroup, Disabled, SeparatorAndShortcut, Submenu, KeyboardInteraction, AllExportsComprehensive. Only KeyboardInteraction has a play function; Disabled story lacks keyboard/disabled-state test coverage. No stories are committed yet on the feature branch.

## Requirements

### Story Structure & Completeness

- R1: Disabled story renders with defaultOpen to show disabled menu items inline. (Disabled story at line 103–116 already has this; verify rendering.)
- R2: All 14 dropdown-menu exports verified as used across 8 story variants (currently AllExportsComprehensive covers all 14+; verify import list matches export count).

### Test Coverage (Play Functions)

- R3: Disabled story includes a play function that tests disabled state: finds DropdownMenuItem element(s) with `disabled` attribute, verifies they render and do not respond to interaction. Selector must use `data-disabled` or equivalent state marker if component auto-applies it.
- R4: KeyboardInteraction play function verifies Arrow Down navigation (highlights items sequentially) and Escape key closes the menu. (Already present at lines 215–264; verify arrow/escape event handling works.)

### Git & Build

- R5: Story file committed to feature branch with conventional commit message (`feat(stories): fix dropdown-menu story test selectors and keyboard interactions`).

## Acceptance Criteria

- [ ] Disabled story renders and has a play function that verifies disabled menu items do not respond to clicks or keyboard navigation. Use correct selector for disabled state (e.g., `screen.getByRole('menuitem', { disabled: true })` or query by `data-disabled` attribute if component uses it).
- [ ] KeyboardInteraction play function tests Arrow Down navigation (first arrow press focuses first item, second press focuses second item) and Escape key closes menu, with assertions on focus state before/after each event.
- [ ] All 14 dropdown-menu exports are imported at the top of the file and used in at least one story variant (verify import list matches component export list from `@/components/ui/dropdown-menu`).
- [ ] Story file committed to feature branch with conventional commit message; verify via `git log --oneline` and `git show` on the feature branch.

## Implementation Phases

### Phase 1: Fix and commit dropdown-menu story

**Scope:** Add missing play function to Disabled story with correct selector for disabled state testing, verify KeyboardInteraction play function covers Arrow and Escape events, commit story file to feature branch.

**Files:**

- `src/stories/dropdown-menu.stories.tsx` — add Disabled.play function, verify KeyboardInteraction.play function, no structural changes to other stories

**Verification:**

- [ ] Run `bun run test src/stories/dropdown-menu.stories.tsx` — all story tests pass, no selector failures
- [ ] Open Storybook (`bun run storybook`), navigate to DropdownMenu/Disabled story, verify it opens and disabled items are visually distinct and non-interactive
- [ ] In Storybook, navigate to DropdownMenu/KeyboardInteraction story, manually test: click trigger, press ArrowDown twice (verify focus), press Escape (verify menu closes)
- [ ] Run `git status` and `git log --oneline` on feature branch, confirm dropdown-menu.stories.tsx is committed with message matching `feat(stories): ...`

**Estimated effort:** Small

## Edge Cases

- Separator elements in menu do not have menuitem role, so keyboard navigation may skip them — play function should only count interactive items in focus assertions
- Disabled attribute behavior varies by browser and Radix implementation — may need to query by role with `disabled: true` option or inspect `data-disabled` attribute; verify against actual component props
- Multiple Escape presses should not error — play function should be idempotent for final Escape test

## Technical Notes

The dropdown-menu component is a shadcn/ui wrapper around Radix UI's `DropdownMenu` primitives. Disabled items are rendered with `disabled` prop; Radix may auto-apply `data-disabled` or aria-disabled depending on version. Verify selector against actual DOM by inspecting in Storybook browser DevTools (`Elements` tab, search for disabled menu item).

Play function tests should use `screen.*` queries (from `@storybook/test`) to find elements by accessible role/label, not by CSS class or data attribute, to validate semantic accessibility. If Radix marks disabled items with `aria-disabled="true"`, use that for querying; otherwise inspect rendered DOM.

Git commit uses lefthook pre-commit hook: oxlint and oxfmt will run automatically on staged files. If linting fails, fix reported issues (style, naming) and re-stage before committing.

### Dependencies

None — story file has no new dependencies beyond existing imports (Storybook test utilities, dropdown-menu component, Button, icons).
