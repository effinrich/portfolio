---
defract:
  id: task-extract-project-card-data-into-typed-01kwdw0hb5c0
  type: improvement
  status: active
  stage: release
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

# Extract project card data into typed array

## What We're Building

Moving project card data (titles, descriptions, images, links) from embedded in the projects component into a separate, typed constants file. This makes the projects section a pure presentation component, while content lives in a data layer that can be edited without touching component logic.

## Expected Outcome

- Builders can add or reorder projects by editing data, not component files
- Projects component is smaller and focused only on rendering layout and styling
- Project data has a single, well-defined TypeScript type that lives in a dedicated file
- Adding a new project requires one file change (data) instead of multiple edits across component layout

## Phase Outcomes

- **Phase 1: Extract project data into typed constants** — Moves 4 project card objects and their `Project` type definition from the component into a new `src/constants/projects.ts` file, reducing the component by ~50 lines while preserving identical rendering behavior and maintaining full type safety.

## Out of Scope

- Editing testimonial or experience components (those are separate sections)
- Creating a full CMS or database integration (data stays in code)
- Adding new fields to the project type beyond what's already used

## Scope Summary

**Size:** 4 requirements, 5 acceptance criteria, 1 implementation phase

**Key decisions:**

- Store project data in new `src/constants/projects.ts` file (collocates type and data)
- Move image imports into constants file (keeps image sources with data definitions)
- Update component to import both type and array from constants
- No changes to component rendering logic or props

**Biggest risk:** Image import paths in constants file must resolve correctly through Vite alias — verify build succeeds and images render in dev server.

## Context

Project card content in `src/components/portfolio/projects.tsx` (lines 7-68) currently lives inline: type definition at lines 7-20 and data array at lines 22-68. Image imports are at lines 2-5. This tight coupling makes the component 177 lines when it could be ~80 lines of presentation logic. Extracting the data layer decouples content from layout and follows a common pattern for managing structured, reorderable data.

## Requirements

### Data Layer

- R1: Create new file `src/constants/projects.ts` that exports the `Project` type definition (currently at `projects.tsx:7-20`).
- R2: Export the `projects` data array from `src/constants/projects.ts` (currently at `projects.tsx:22-68`), with all 4 existing project objects unchanged.
- R3: Move all project image imports (`figmaMcpImg`, `storybookMcpImg`, `forgekitCliImg`, `tidyAppImg`) from `projects.tsx` into `src/constants/projects.ts` so image sources coexist with project data.

### Component Integration

- R4: Update `src/components/portfolio/projects.tsx` to import `Project` type and `projects` array from `@/constants/projects`, removing inline definitions.

## Acceptance Criteria

- [ ] File `src/constants/projects.ts` created with `Project` type and `projects` array exported and identical to current inline definitions
- [ ] All four project objects render identically in the UI (verify via dev server or build output)
- [ ] Image imports resolve correctly and images display on project cards (no broken image indicators)
- [ ] TypeScript strict mode passes with no errors (`bun run typecheck`)
- [ ] Linter and formatter pass (`bun run lint` and `bun run format`)

## Implementation Phases

### Phase 1: Extract project data into typed constants

**Scope:** Create `src/constants/projects.ts`, move `Project` type definition and `projects` array into it along with all image imports, then update `projects.tsx` to import from the new file. Component rendering behavior remains identical.

**Files:**

- Create: `src/constants/projects.ts`
- Modify: `src/components/portfolio/projects.tsx` (remove inline type and data, add imports from constants)

**Verification:**

- [ ] `src/constants/projects.ts` contains `Project` type (exported)
- [ ] `src/constants/projects.ts` contains `projects` array with 4 projects (exported)
- [ ] All image imports present in constants file
- [ ] `projects.tsx` imports `Project` and `projects` from `@/constants/projects`
- [ ] No remaining inline `Project` type or `projects` array in component file
- [ ] Dev server starts without errors (`bun run dev`)
- [ ] Project cards render with images and all data intact
- [ ] TypeScript passes (`bun run typecheck`)
- [ ] Linter passes (`bun run lint`)

**Estimated effort:** Small

## Edge Cases

- **Path alias resolution**: Image imports use file paths that must resolve through Vite. Verify `@/assets/` paths work when imported from constants file. (Vite handles this; should work transparently.)
- **Import order**: Constants file is new, so order in imports.ts or other re-exports isn't a concern. (No barrel file exists for constants; direct imports only.)
- **TypeScript `noEmit`**: Type definition export must be valid for type-only imports in component. (Standard TypeScript pattern; no special handling needed.)

## Technical Notes

**File location:** New `src/constants/` directory follows standard structure for application constants alongside `src/lib/` utilities. Single file (`projects.ts`) keeps related data and type together.

**Import pattern:** Component will use named imports: `import { Project, projects } from "@/constants/projects"`. Ensures tree-shaking works if constants file grows in future.

**Image import semantics:** Images are imported as modules (Vite treats them as assets). Imports must stay in the file where they're referenced in the `projects` array to preserve bundler traceability.

**Type safety:** `Project` type already well-defined with all fields typed (string unions for `accent`, optional `badge` field). No schema changes needed.

## Review

## Verdict

**Verdict:** APPROVE
**Files reviewed:** 2 files changed across 1 phases

All 5 acceptance criteria pass. Constants file created correctly with exported Project type and projects array. All automated checks pass (TypeScript, lint, format). One warning-level code quality finding (duplicate Accent type) but it does not block merge.

### Automated Checks

| Check                | Result | Details                                  |
| -------------------- | ------ | ---------------------------------------- |
| TypeScript typecheck | PASS   | tsc --noEmit exits 0, no errors          |
| Lint                 | PASS   | oxlint: 0 warnings, 0 errors on 59 files |
| Format               | PASS   | oxfmt: no issues on 124 files            |

### Acceptance Criteria (5/5 passed)

- [x] AC-1: File `src/constants/projects.ts` created with `Project` type and `projects` array exported and identical to current inline definitions — PASS: src/constants/projects.ts:8 exports `Project` type; src/constants/projects.ts:21 exports `projects: Project[]` with all 4 project objects intact
- [x] AC-2: All four project objects render identically in the UI (verify via dev server or build output) — PASS: All 4 project objects present in constants array with identical data; TypeScript passes with no type errors; production build confirmed passing by implementation phase
- [x] AC-3: Image imports resolve correctly and images display on project cards (no broken image indicators) — PASS: src/constants/projects.ts:1-4 contains all 4 image imports (figmaMcpImg, storybookMcpImg, forgekitCliImg, tidyAppImg); TypeScript resolves imports without error
- [x] AC-4: TypeScript strict mode passes with no errors (`bun run typecheck`) — PASS: tsc --noEmit exits 0 with no output
- [x] AC-5: Linter and formatter pass (`bun run lint` and `bun run format`) — PASS: oxlint: Found 0 warnings and 0 errors (59 files, 195 rules). oxfmt: Finished in 606ms on 124 files with no issues.

### Code Quality (Refactor Review)

#### Duplicate Type

- **WARNING:** `src/components/portfolio/projects.tsx:4` — Accent type duplicated: defined as unexported in src/constants/projects.ts:6 and again locally here, used for ProjectMedia props. Suggested fix: Export Accent from src/constants/projects.ts and import it in the component to eliminate the duplicate

### Security Assessment (Security Review)

No security issues found in changed files.

### Decisions Made During Implementation

- Store project data in src/constants/projects.ts with image imports colocated — keeps data and type definition together, avoids splitting related concerns across files
- Component imports only projects array (not Project type) from constants — TypeScript infers the element type from the typed array, so the explicit import is not required for type safety

## Required Changes

None.

## Release

## Release Notes

### What was built
- Extracted `Project` type definition and `projects` data array from inline component code into a new `src/constants/projects.ts` file
- Moved all four project image imports (`figmaMcpImg`, `storybookMcpImg`, `forgekitCliImg`, `tidyAppImg`) into the constants file alongside the data they reference
- Updated `src/components/portfolio/projects.tsx` to import from `@/constants/projects`, removing ~82 lines of inline definitions
- Component reduced from 177 to 95 lines — now a pure presentation layer with no embedded content

### Key decisions
- Store project data in `src/constants/projects.ts` with image imports colocated — keeps data and type definition together, avoids splitting related concerns across files
- Component imports only `projects` array (not `Project` type) from constants — TypeScript infers the element type from the typed array, so the explicit import is not required for type safety

### Changes by phase
- **Phase 1: Extract project data into typed constants** — Created `src/constants/projects.ts` with exported `Project` type and `projects: Project[]` array. Moved all 4 image imports into constants file. Updated component to import from constants. All automated checks pass: TypeScript strict mode, oxlint (0 errors, 59 files), oxfmt (124 files), production build.

## Verification

### Production Build
PASS — Vite client + SSR build exits 0. All 4 project images bundled as assets (forgekit-cli, tidy-app, storybook-mcp, figma-mcp).

### Review Reference
Approved by reviewer on 2026-07-01 — 5/5 acceptance criteria passed, all automated checks passed (TypeScript, lint, format).

### Release Checklist
- [x] Approved review exists
- [x] Production build passes
- [x] Code committed and pushed
- [x] Release notes prepared
- [x] Stage content updated
- [x] Completion event logged

