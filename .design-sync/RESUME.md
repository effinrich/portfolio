# Resume the claude.ai/design sync

The design-sync **upload** is the only step left — it needs design-system auth that
the cowork/CLI session it was started in could not get. Everything else is done and
committed. Finish it from a **terminal Claude Code CLI** (has the login flows the
other client lacks).

## Steps

```bash
cd <repo-root> # or: cd "$(git rev-parse --show-toplevel)"
claude
```

Inside that session:

```
/design-login          # browser approve   (or: /login → "Claude account with subscription")
/design-sync           # resumes from .design-sync/
```

`/design-sync` reads `.design-sync/config.json` + `NOTES.md`, so every fix already made
carries over. It will: rebuild the bundle, grade the remaining ~20 primitives against the
Storybook reference, author the conventions header from `DESIGN.md`, and upload to a **new
"Portfolio Design System"** project (first sync → incremental upload).

## State at handoff (2026-06-23)

- **Shape:** storybook. Config: `.design-sync/config.json`. Learnings: `.design-sync/NOTES.md`.
- **Bundle prep (committed):** `src/index.ts` barrel + `tsdown.config.ts` entry → `dist/index.mjs`;
  `package.json` `types` + `buildCmd` dts copy.
- **Global fix (committed):** dark-only DS → `cfg.provider` = `DesignSurface`
  (`.design-sync/ds-preview-surface.tsx`) gives previews the app's dark background.
- **Pilot graded `match`:** Button (6/6), Badge (4/4), Card (1/1), Dialog (trigger; the
  "Opens On Click" interaction story is a known static-render limitation).
- **Not yet graded:** the other ~20 storied primitives (they build + render clean — validate
  24/24 — just not screenshot-graded). The full run grades them.
- **Project intentionally un-anchored:** no `_ds_sync.json` uploaded yet, so the full run
  re-verifies everything cleanly.

## Watch items (detail in NOTES.md "Re-sync risks")

- `[FONT_MISSING]` Inter / JetBrains Mono — no webfont ships. Decide: `cfg.extraFonts` woff2 vs
  accept system fonts.
- `[GRID_OVERFLOW]` Accordion/Alert/Tabs → `cfg.overrides.<Name>.cardMode: "column"`.
- `[RENDER_THIN]` HoverCard/RadioGroup/Toggle/Tooltip → owned preview or `cardMode: "single"`.
- Converter run gotchas (if invoking scripts by hand): `--node-modules` = the MAIN checkout's
  `<repo-root>/node_modules` (worktree's is sparse), `--entry dist/index.mjs`.

## Separate, already shipped

The Storybook **docs site** (branded dark theme + Foundations + autodocs) is independent of this
sync and is already committed + on PR #18 with Chromatic publishing it. No action needed here.
