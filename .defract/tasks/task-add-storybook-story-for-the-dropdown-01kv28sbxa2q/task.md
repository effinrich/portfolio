---
defract:
  id: task-add-storybook-story-for-the-dropdown-01kv28sbxa2q
  type: task
  status: active
  stage: implementation
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

# Add Storybook story for the dropdown-menu component

# Add Storybook story for the dropdown-menu component

## What We're Building

Adding a Storybook story for the dropdown-menu component to provide visual regression testing coverage. This closes a documented gap in the design system and gives Chromatic a baseline to detect regressions as the component evolves.

## Expected Outcome

- Storybook displays a story showcasing the dropdown-menu component with various interaction states (open, closed, hovering, keyboard navigation)
- Visual regression testing baseline is established in Chromatic for the dropdown-menu
- Developers can use the story to review dropdown-menu behavior in isolation and ensure future changes don't break existing functionality

## Phase Outcomes

- **Phase 1: Create dropdown-menu story with full variant coverage** — Developers get a visual reference for all dropdown-menu patterns (basic items, checkboxes, radio groups, submenus, disabled states) and interactions (keyboard navigation, opening/closing) so they can review behavior in isolation and catch regressions before deployment.

## Out of Scope

- Stories for other shadcn primitives not yet covered (alert-dialog, form, sonner, table) — these belong in separate tasks
- Design system refactoring or component changes — this task is story-only
- Implementation of new features in the dropdown-menu itself — only adding story coverage

## Scope Summary

**Size:** 7 requirements, 14 acceptance criteria, 1 implementation phase
**Key decisions:**

- Single phase: story creation is self-contained, no architecture or design stage needed
- All 14 dropdown-menu exports covered across variants (no partial coverage)
- Keyboard interaction tests via play functions for accessibility validation
  **Biggest risk:** Submenu interactions are the most complex to test — must verify keyboard navigation through nested menus works correctly

## Context

dropdown-menu is a shadcn/ui primitive wrapping Radix UI's dropdown-menu. Currently has 14 exported sub-components (Root, Trigger, Content, Item, CheckboxItem, RadioItem, Label, Separator, Shortcut, Group, Portal, Sub, SubTrigger, SubContent, RadioGroup) with no Storybook story. DESIGN.md §6 lists it as a documented gap requiring story coverage. Chromatic runs visual regression on PRs, so baseline is critical. Pattern established by existing stories (button, select, dialog) shows Meta with title "UI/ComponentName", default args, argTypes with controls, and multiple story variants testing different states and interactions.

## Requirements

### Story Structure & Configuration

- R1: Create src/stories/dropdown-menu.stories.tsx with Meta configuration using title "UI/DropdownMenu" and tags: ["autodocs"] for auto-documentation in Storybook
- R2: Define default args and argTypes with Storybook controls to allow interactive property editing (e.g., disabled, open state where applicable)
- R3: Import all necessary exports from @/components/ui/dropdown-menu for variant composition

### Story Variants

- R4: Default variant showcasing basic dropdown with multiple menu items and proper spacing/styling applied
- R5: Variant demonstrating CheckboxItem usage with checked/unchecked states and indicator icons
- R6: Variant demonstrating RadioItem usage within RadioGroup with mutual exclusivity enforced
- R7: Variant showing disabled menu items to ensure opacity and cursor feedback render correctly
- R8: Variant combining DropdownMenuSeparator and DropdownMenuShortcut for realistic menu layouts
- R9: Variant demonstrating nested submenu via DropdownMenuSub + SubTrigger + SubContent

### Interaction Testing

- R10: Include play function on at least one story to test keyboard navigation (Arrow Up/Down, Enter, Escape) and verify menu opens/closes correctly
- R11: Accessibility validation: verify keyboard navigation reaches all items and shortcuts display correctly

### Integration & Visual Regression

- R12: Story must render with correct design tokens (bg-popover, text-popover-foreground, etc.) so Chromatic baseline captures intended styling
- R13: All Lucide icons used in examples must load without errors
- R14: Story must work in both light and dark modes (dark-only theme per project standard)

## Acceptance Criteria

- [ ] File src/stories/dropdown-menu.stories.tsx exists with valid TypeScript syntax and no linting errors
- [ ] Meta exports with title "UI/DropdownMenu", component DropdownMenu, tags: ["autodocs"]
- [ ] Default story renders without errors and displays a basic dropdown menu with 3+ menu items
- [ ] Checkbox variant shows CheckboxItem with checked state, unchecked state, and Check icon indicator
- [ ] RadioGroup variant shows 3+ RadioItem options with mutual exclusivity (only one checked at time)
- [ ] Disabled variant renders DropdownMenuItem with data-disabled styling and opacity applied
- [ ] Separator and Shortcut variant renders DropdownMenuSeparator and DropdownMenuShortcut with correct spacing
- [ ] Submenu variant renders nested menu structure (Sub > SubTrigger > SubContent > items) with ChevronRight indicator
- [ ] At least one story includes play function testing keyboard navigation (Arrow keys, Enter, Escape)
- [ ] play function uses Storybook test utilities (userEvent, within, expect, screen, waitFor)
- [ ] All 14 dropdown-menu exports are used or directly tested across story variants
- [ ] Story follows naming convention from existing stories (button.stories.tsx, select.stories.tsx) for consistency
- [ ] No TypeScript errors in story file (verified via npm run typecheck)
- [ ] Storybook builds and renders story without console errors (verified via npm run storybook)

## Implementation Phases

### Phase 1: Create dropdown-menu story with full variant coverage

**Scope:** Create src/stories/dropdown-menu.stories.tsx with Meta configuration, 7 story variants (Default, Checkbox, RadioGroup, Disabled, Separator+Shortcut, Submenu, plus one with keyboard interaction tests), and interaction play functions demonstrating open/close and keyboard navigation.

**Files:**

- src/stories/dropdown-menu.stories.tsx (create)
- src/components/ui/dropdown-menu.tsx (read-only reference)

**Verification:**

- [ ] File created at src/stories/dropdown-menu.stories.tsx with no syntax errors
- [ ] Meta configuration includes title "UI/DropdownMenu", component DropdownMenu, tags: ["autodocs"]
- [ ] All 7 variants render without console errors in Storybook
- [ ] Keyboard interaction tests in play function pass (Arrow Up/Down opens menu, Enter selects item, Escape closes menu)
- [ ] npm run typecheck passes with no errors
- [ ] npm run storybook launches and renders story without errors
- [ ] Chromatic visual regression baseline is captured on PR (visual regression CI)

**Estimated effort:** Small

## Edge Cases

- **Rapid keyboard navigation:** User presses Arrow Up/Down multiple times in succession — verify cursor doesn't go out of bounds and wraps correctly
- **Submenu focus management:** User opens submenu, navigates with Arrow keys within submenu, then closes submenu with Escape — verify focus returns to parent trigger, not lost
- **Checkbox/RadioItem exclusivity:** Multiple RadioItems in same RadioGroup — verify only one can be checked at a time; CheckboxItems allow independent selection
- **Disabled items in navigation:** Disabled menu items present in menu — verify keyboard navigation skips disabled items and doesn't focus them
- **Shortcut display:** DropdownMenuShortcut text displays correctly with opacity-60 and tracking-widest applied
- **Nested submenu rendering:** SubContent portal renders outside main dropdown — verify z-index and positioning are correct even with deep nesting

## Technical Notes

### Implementation Hints

- Use ref from button/select story as template for Meta structure (tags: ["autodocs"], argTypes with control definitions)
- Dialog story provides pattern for Portal + portal content (similar to DropdownMenuContent portal behavior)
- Select story shows RadioGroup pattern; adapt for DropdownMenuRadioGroup variant
- Import icons from lucide-react (Check, ChevronRight, Circle) to match component usage
- Use fn() from Storybook test utilities for callback args (e.g., onClick handler for menu items)
- Keyboard interaction testing: use userEvent.keyboard() for multi-key sequences (e.g., {ArrowDown}{Enter})
- Verify story follows CLAUDE.md naming convention: component-relative filename (dropdown-menu.stories.tsx, not dropdownMenu.stories.tsx)

### Design System Integration

- All popover background/foreground tokens must be applied (bg-popover, text-popover-foreground) — these are set in design system and story baseline captures them for Chromatic
- Dark-only theme: story renders in dark mode (project standard per DESIGN.md §1)
- No custom colors or styles — rely entirely on design tokens and component-applied Tailwind utilities
- Reference existing stories for token usage pattern (button.stories.tsx, badge.stories.tsx)

### Dependencies

- Storybook 10 + react-vite with testing utilities (userEvent, within, expect, screen, waitFor from "storybook/test")
- Radix UI dropdown-menu primitive (wrapped by shadcn DropdownMenu, already installed)
- Lucide-react icons (Check, ChevronRight, Circle) — already imported in dropdown-menu.tsx
- TypeScript 6 with strict mode (tsconfig.json enforces it)
- Chromatic visual regression service (CI/CD triggered on PR via chromatic.yml)

## Review

## Verdict

**Verdict:** REQUEST CHANGES
**Files reviewed:** 2 files changed across 1 phases

Story file exists only as an untracked file in the main repo — the feature branch has no story. Disabled story tests a disabled trigger not disabled items, and play function never dispatches Arrow key or Escape events.

### Automated Checks

| Check      | Result | Details                             |
| ---------- | ------ | ----------------------------------- |
| Type check | PASS   | bun run typecheck — 0 errors        |
| Lint       | PASS   | bun run lint — 0 warnings, 0 errors |

### Acceptance Criteria (11/14 passed)

- [ ] AC-1: File src/stories/dropdown-menu.stories.tsx exists with valid TypeScript syntax and no linting errors — FAIL: File is untracked in main repo only. git diff main..HEAD in feature worktree shows only .defract changes — no story file on the branch.
- [x] AC-2: Meta exports with title UI/DropdownMenu, component DropdownMenu, tags autodocs — PASS: dropdown-menu.stories.tsx:23-30 — title UI/DropdownMenu, component DropdownMenu, tags autodocs all present.
- [x] AC-3: Default story renders without errors and displays a basic dropdown menu with 3+ menu items — PASS: dropdown-menu.stories.tsx:38-51 — Default story renders Profile, Settings, Help (3 items).
- [x] AC-4: Checkbox variant shows CheckboxItem with checked state, unchecked state, and Check icon indicator — PASS: dropdown-menu.stories.tsx:66-74 — checked=true on Dark Mode and Animations, checked=false on Notifications. Check icon via ItemIndicator in dropdown-menu.tsx:108-110.
- [x] AC-5: RadioGroup variant shows 3+ RadioItem options with mutual exclusivity — PASS: dropdown-menu.stories.tsx:94-98 — RadioGroup value=light with Light, Dark, Auto (3 RadioItems).
- [ ] AC-6: Disabled variant renders DropdownMenuItem with data-disabled styling and opacity applied — FAIL: dropdown-menu.stories.tsx:109-123 — story disables DropdownMenuTrigger and Button; no DropdownMenuItem has disabled prop; data-[disabled]:opacity-50 (dropdown-menu.tsx:85) never triggered.
- [x] AC-7: Separator and Shortcut variant renders DropdownMenuSeparator and DropdownMenuShortcut with correct spacing — PASS: dropdown-menu.stories.tsx:138-155 — DropdownMenuSeparator at lines 138,152,155; DropdownMenuShortcut at 141,144,149.
- [x] AC-8: Submenu variant renders nested menu structure with ChevronRight indicator — PASS: dropdown-menu.stories.tsx:179-188 — Sub > SubTrigger > Portal > SubContent > Items. ChevronRight built into SubTrigger at dropdown-menu.tsx:37.
- [ ] AC-9: At least one story includes play function testing keyboard navigation (Arrow keys, Enter, Escape) — FAIL: dropdown-menu.stories.tsx:226-265 — play function clicks trigger and dispatches Enter but no ArrowDown, ArrowUp, or Escape keyboard events appear anywhere.
- [x] AC-10: play function uses Storybook test utilities (userEvent, within, expect, screen, waitFor) — PASS: dropdown-menu.stories.tsx:2,227-264 — all five utilities imported from storybook/test and used.
- [x] AC-11: All 14 dropdown-menu exports are used or directly tested across story variants — PASS: All 15 exports imported at lines 4-20 and used across stories.
- [x] AC-12: Story follows naming convention from existing stories — PASS: Filename dropdown-menu.stories.tsx is kebab-case matching button.stories.tsx, select.stories.tsx.
- [x] AC-13: No TypeScript errors in story file — PASS: bun run typecheck returned exit 0 with 0 errors.
- [x] AC-14: Storybook builds and renders story without console errors — PASS: Implementation agent reported build-storybook exit 0; typecheck and lint pass independently.

### Code Quality (Refactor Review)

#### Incorrect Radix nesting

- **WARNING:** `src/stories/dropdown-menu.stories.tsx:178` — DropdownMenuSub wrapped in extra DropdownMenu inside DropdownMenuContent at lines 178 and 190. Nested Radix Roots break context propagation. Suggested fix: Remove the DropdownMenu wrapper at lines 178 and 190 so DropdownMenuSub is a direct child of DropdownMenuGroup
- **WARNING:** `src/stories/dropdown-menu.stories.tsx:349` — Same extra DropdownMenu wrapper around DropdownMenuSub in AllExportsComprehensive at line 349. Suggested fix: Remove the DropdownMenu wrapper at line 349

#### Incomplete interaction test

- **WARNING:** `src/stories/dropdown-menu.stories.tsx:239` — Comment claims Arrow Down navigation testing but no keyboard event dispatched — only DOM presence assertions. Suggested fix: Add userEvent.keyboard ArrowDown after menu opens and assert focus moves; add Escape and assert menu closes

#### Disabled state coverage

- **WARNING:** `src/stories/dropdown-menu.stories.tsx:109` — Disabled story prevents menu from opening via disabled trigger; DropdownMenuItem disabled prop and data-disabled styles never exercised. Suggested fix: Use DropdownMenu defaultOpen and set disabled on DropdownMenuItems to capture actual disabled-item visual state

### Security Assessment (Security Review)

No security issues found in changed files.

### Decisions Made During Implementation

- Single implementation phase — story creation self-contained, no architectural decisions required.
- All 15 dropdown-menu exports covered across variants for comprehensive Chromatic baseline.
- Keyboard interaction play function intended to cover Arrow Up/Down, Enter, Escape — only Enter implemented.

## Headline Findings

- **critical** — Story file was written to the main repo as an untracked file — feature branch has no story, PR ships nothing, Chromatic gets no baseline.
- **critical** — Disabled story shows a disabled trigger preventing menu opening, not disabled DropdownMenuItems — data-disabled opacity styles are never captured by Chromatic.
- **critical** — KeyboardInteraction play function never dispatches Arrow key or Escape events — accessibility regression coverage is absent despite comments claiming otherwise.
- **recommended** — Submenu and AllExportsComprehensive stories wrap DropdownMenuSub inside an extra DropdownMenu (nested Radix Root) which breaks context propagation.

## Required Changes

**Blocking**

- Copy src/stories/dropdown-menu.stories.tsx into the feature branch worktree at .defract-worktrees/task-add-storybook-story-for-the-dropdown-01kv28sbxa2q/src/stories/ and commit it.
- Replace Disabled story in src/stories/dropdown-menu.stories.tsx lines 109-123 to use DropdownMenu defaultOpen and DropdownMenuItem with disabled prop so data-disabled opacity is visible.
- Add userEvent.keyboard ArrowDown and Escape dispatches to KeyboardInteraction play function in src/stories/dropdown-menu.stories.tsx around line 239.

**Recommended**

- Remove extra DropdownMenu wrappers around DropdownMenuSub at src/stories/dropdown-menu.stories.tsx lines 178, 190, and 349.
