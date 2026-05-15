# Plan: DESIGN.md

Create a single `DESIGN.md` at the repo root that captures the live design system as it exists in the codebase — no changes to components, tokens, or stories. Sourced from `src/styles.css`, `src/components/ui/**`, `src/components/portfolio/**`, `src/stories/**`, `components.json`, and `tailwind`/`tw-animate-css` setup.

## Sections

1. **Overview**
   - Stack: Tailwind v4 (`@import "tailwindcss"` in `src/styles.css`), shadcn/ui ("new-york" style, slate base, lucide icons — from `components.json`), `tw-animate-css`, Radix primitives, `class-variance-authority`, `cn` from `@/lib/utils`.
   - Dark-only theme (`color-scheme: dark`, no `.dark` class toggled in app), Inter + JetBrains Mono.
   - Where to edit what: tokens → `src/styles.css`, primitives → `src/components/ui/**` (lint-ignored shadcn surface, no app logic), portfolio sections → `src/components/portfolio/**`, stories → `src/stories/**`.

2. **Design tokens** (transcribed from `src/styles.css`)
   - Color tokens table (oklch values): `background`, `foreground`, `surface`, `surface-2`, `card`, `popover`, `primary` (warm gold `oklch(0.86 0.17 95)`), `primary-foreground`, `secondary`, `muted`, `muted-foreground`, `accent` (cyan `oklch(0.78 0.16 200)`), `destructive`, `border`, `input`, `ring`.
   - Radius scale: `--radius: 0.625rem` with `sm/md/lg/xl` derived in `@theme inline`.
   - Effects: `--glow-primary`, `--glow-accent`, `--shadow-soft`, `--grid-color`.
   - Fonts: `--font-sans` (Inter), `--font-mono` (JetBrains Mono); body uses `font-feature-settings: "ss01", "cv11"`.
   - Base layer: global border-color reset, body radial-gradient backdrop, gold selection.

3. **Component classes** (from `@layer components` in `src/styles.css`)
   - `.container-x`, `.grid-bg`, `.chip`, `.pill-dot`, `.card-elevated`, `.link-underline`, `.text-gradient`, `.ticker` — purpose + when to use.
   - Animations: `marquee` (40s linear), `float-glow` (6s ease-in-out), plus `tw-animate-css`.

4. **UI primitives** (`src/components/ui/**`)
   - Inventory table of all shadcn components present (accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip).
   - Document `Button` variants/sizes (default/destructive/outline/secondary/ghost/link × default/sm/lg/icon) and `Badge` variants (default/secondary/destructive/outline) — verbatim from CVAs.
   - Card composition (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
   - Rule: do not edit files in `src/components/ui/**` beyond shadcn upgrades.

5. **Portfolio components** (`src/components/portfolio/**`)
   - Short entry per file with role + key tokens used:
     - `nav.tsx` — fixed scroll-aware header.
     - `hero.tsx` — `grid-bg`, `text-gradient`, stats grid.
     - `marquee.tsx` — animated tech ticker.
     - `testimonial.tsx`, `experience.tsx` (`card-elevated` timeline), `projects.tsx`, `stack.tsx` (token grid), `contact.tsx`/`contact-form.tsx`, `section-heading.tsx` (eyebrow+title+desc pattern).

6. **Storybook coverage**
   - Path: `src/stories/**`, config in `.storybook/`.
   - Table mapping primitive → story file, plus list of UI primitives that currently have no story (gap for future contributions).

7. **Conventions**
   - Always use semantic tokens, never raw colors; kebab-case filenames; `@/*` alias only; no app logic in `components/ui`; design tokens are the single source of truth.
   - Reference `AGENTS.md` for tooling rules (oxlint, oxfmt, lefthook).

## Out of scope

- No code, token, or story changes.
- No new components or refactors.
- No screenshots — text-only reference doc.

## Deliverable

- `DESIGN.md` at repo root, ~250–400 lines, formatted with tables for tokens/variants/coverage.
