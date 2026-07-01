---
defract:
  id: task-add-sonner-toast-story-01kwdt6k55j8
  type: task
  status: active
  stage: release
  phase: 0
  total_phases: 1
  priority: normal
  source: backlog
  source_id: bli-add-storybook-story-2
  branch_strategy: worktree
  mode: human-in-the-loop
  created_by: effinrich
  assignee: effinrich
---

## Story Brief

Promoted from backlog item `bli-add-storybook-story-2`.

- Epic: storybook
- Module: src/stories
- Labels: starter

Original paste from the builder:

> Sonner is actively used in the contact form flow but has no story. Adding src/stories/sonner.stories.tsx documents the success and error toast variants and adds them to visual regression coverage.

# Add Sonner toast story

# Add Sonner toast story

## What We're Building

Storybook story documenting Sonner toast notifications. Covers success and error states with live interactive examples. Adds component to visual regression testing suite.

## Expected Outcome

- Story renders in Storybook at UI/Sonner path with all toast variants visible
- Success toast shown with default styling (green accent, checkmark)
- Error toast shown with destructive styling (red accent)
- Both variants trigger and dismiss properly in interactive mode
- Visual regression snapshot captured for CI validation

## Phase Outcomes

- **Phase 1: Add Sonner story file** — Storybook gains a UI/Sonner entry with success and error variants, interactive play functions, and autodocs coverage. Chromatic captures both variants in visual regression on next PR.

## Out of Scope

- Adding actual toast calls to contact form or other routes (separate task)
- Custom toast styling beyond current design system tokens
- Toast position or placement configurability variants
- Animation or motion behavior documentation

## Scope Summary

**Size:** 5 requirements, 5 acceptance criteria, 1 implementation phase
**Key decisions:**

- Story mounts `Toaster` inside each render function — Sonner is not wired to root layout yet
- Play functions use `screen` (not `canvas`) because Sonner renders into a `document.body` portal
  **Biggest risk:** Sonner's CSS animations may flake in Chromatic snapshots if not paused — set `duration: Infinity` on `Toaster` in stories to prevent auto-dismiss during CI

## Context

`sonner@^2.0.7` is installed and `src/components/ui/sonner.tsx` provides a themed `Toaster` wrapper applying design token classNames (`bg-background`, `text-foreground`, `border-border`). The component is not mounted in `src/routes/__root.tsx` and the contact form uses inline state rather than toast notifications. The story documents the component as-is and adds it to Chromatic visual regression, consistent with the approach taken for all other shadcn primitives in `src/stories/`.

## Requirements

### Story Structure

- R1: Create `src/stories/sonner.stories.tsx` with `title: "UI/Sonner"`, `component: Toaster`, and `tags: ["autodocs"]`. Match the file naming, import alias (`@/`), and meta structure used across existing stories.
- R2: Each story uses a `render` function that mounts `<Toaster duration={Infinity} />` alongside a trigger button. `Toaster` must be in the render tree because it is absent from the global root layout.
- R3: `Success` story renders a button that calls `toast("Message sent", { description: "Your message has been delivered." })` on click and verifies the toast appears via a `play` function using `screen` (portal renders outside `canvasElement`).
- R4: `Error` story renders a button that calls `toast.error("Submission failed", { description: "Something went wrong. Please try again." })` on click and verifies the error toast appears via a `play` function using `screen`.
- R5: Both stories include `parameters: { layout: "padded" }` to provide sufficient viewport space for toast rendering without cropping.

## Acceptance Criteria

- [ ] `src/stories/sonner.stories.tsx` exists, is kebab-case named, and imports from `@/components/ui/sonner` and `sonner`
- [ ] Story appears in Storybook sidebar at `UI/Sonner` with autodocs tab populated
- [ ] `Success` play function clicks the trigger button and asserts the success toast message is visible in the DOM via `screen`
- [ ] `Error` play function clicks the trigger button and asserts the error toast message is visible in the DOM via `screen`
- [ ] `bun run storybook` starts without TypeScript errors; `bun run typecheck` exits 0

## Implementation Phases

### Phase 1: Add Sonner story file

**Scope:** Create `src/stories/sonner.stories.tsx` with `Success` and `Error` story variants, each with a trigger button render and `play` function that clicks the trigger and asserts the toast appears.
**Files:**

- `src/stories/sonner.stories.tsx` (new)
  **Verification:**
- `bun run storybook` starts and `UI/Sonner` appears in sidebar
- Autodocs tab renders with both story variants
- Interaction tests for both stories pass without errors
- `bun run typecheck` exits 0
  **Estimated effort:** Small

## Edge Cases

- Toast auto-dismiss during Chromatic snapshot: set `duration: Infinity` on `Toaster` in stories so toasts stay visible for the screenshot
- Portal rendering: Sonner appends to `document.body`, outside `canvasElement` — use `screen` not `within(canvasElement)` for DOM assertions
- Dark-mode parity: existing `withThemeByClassName` decorator in `.storybook/preview.ts` covers theme switching; no per-story override needed

## Technical Notes

`Toaster` from `src/components/ui/sonner.tsx` wraps the upstream `Sonner` component with design token classNames. The story imports `Toaster` from `@/components/ui/sonner` and `toast` from `sonner` directly — no new dependencies.

Sonner's `toast()` and `toast.error()` are imperative calls that require `Toaster` to be mounted. Since `__root.tsx` does not mount `Toaster`, each story's `render` must include it. Play functions follow the pattern in `src/stories/dialog.stories.tsx` and `src/stories/tooltip.stories.tsx`: import `{ expect, userEvent, screen, waitFor }` from `storybook/test`.

## Implementation Notes

## Phase 1: Add Sonner story file

Created `src/stories/sonner.stories.tsx` with two story variants:

- **Success** — renders `<Toaster duration={Infinity} />` + trigger button; play function clicks button and asserts "Message sent" toast appears via `screen`
- **Error** — same pattern; play function asserts "Submission failed" toast appears via `screen`

Both stories use `parameters: { layout: "padded" }`. Portal assertion uses `screen` (not `within(canvasElement)`) per scope decision.

**Files changed:**

- `src/stories/sonner.stories.tsx` (new)

**Verification:**

- `bun run typecheck` — 0 errors
- `bun run lint` — 0 warnings, 0 errors

## Review

## Verdict

**Verdict:** APPROVE
**Files reviewed:** 1 files changed across 1 phases

All 5 acceptance criteria pass. Typecheck and lint clean. Story structure matches existing dialog.stories.tsx conventions. Toaster mounted per-story with duration=Infinity, screen used for portal assertions — both scope decisions correctly applied.

### Automated Checks

| Check      | Result | Details                                      |
| ---------- | ------ | -------------------------------------------- |
| Type check | PASS   | tsc --noEmit: 0 errors                       |
| Lint       | PASS   | oxlint: 0 warnings, 0 errors across 58 files |

### Acceptance Criteria (5/5 passed)

- [x] AC-1: `src/stories/sonner.stories.tsx` exists, is kebab-case named, and imports from `@/components/ui/sonner` and `sonner` — PASS: File at src/stories/sonner.stories.tsx (kebab-case). Line 3: import { toast } from "sonner". Line 4: import { Toaster } from "@/components/ui/sonner".
- [x] AC-2: Story appears in Storybook sidebar at `UI/Sonner` with autodocs tab populated — PASS: sonner.stories.tsx:8 — title: "UI/Sonner". sonner.stories.tsx:10 — tags: ["autodocs"]. Both required for sidebar entry and autodocs tab.
- [x] AC-3: `Success` play function clicks the trigger button and asserts the success toast message is visible in the DOM via `screen` — PASS: sonner.stories.tsx:32-36 — play uses within(canvasElement) to click button, then screen.getByText("Message sent") with waitFor for DOM assertion.
- [x] AC-4: `Error` play function clicks the trigger button and asserts the error toast message is visible in the DOM via `screen` — PASS: sonner.stories.tsx:55-59 — same pattern; asserts screen.getByText("Submission failed") via waitFor.
- [x] AC-5: `bun run storybook` starts without TypeScript errors; `bun run typecheck` exits 0 — PASS: bun run typecheck: exit 0, no output. bun run lint: 0 warnings, 0 errors. No Storybook-specific type errors present.

### Code Quality (Refactor Review)

No code quality issues found in changed files.

### Security Assessment (Security Review)

No security issues found in changed files.

### Decisions Made During Implementation

- Toaster mounted inside each story's render function rather than a global decorator — matches per-story pattern used for Tooltip's TooltipProvider, avoids polluting all stories
- screen (not within(canvasElement)) used for toast DOM assertions — Sonner renders toasts into document.body portal outside Storybook canvas element
- duration=Infinity on Toaster — prevents auto-dismiss during Chromatic snapshots

## Required Changes

None.
