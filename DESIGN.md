# Design System

A reference for the visual system as it exists in the codebase. Sourced from `src/styles.css`, `src/components/ui/**`, `src/components/portfolio/**`, `src/stories/**`, and `components.json`. For tooling/lint/format rules see `AGENTS.md`.

## 1. Overview

- **CSS framework**: Tailwind v4, imported in `src/styles.css` via `@import "tailwindcss"` with `@source "../src"`. Tokens declared in `@theme inline { … }`. No `tailwind.config.*` file.
- **Animations**: `tw-animate-css` (imported in `src/styles.css`) plus two local keyframes (`marquee`, `float-glow`).
- **Component library**: shadcn/ui — `style: "new-york"`, `baseColor: "slate"`, `iconLibrary: "lucide"`, CSS variables on (`components.json`). Primitives wrap Radix, composed with `class-variance-authority` + `cn` from `@/lib/utils`.
- **Theme**: dark-only. `html { color-scheme: dark }` in the base layer; the app never toggles a `.dark` class. The `@custom-variant dark (&:is(.dark *))` exists for future light-mode opt-in but is unused today.
- **Type**: Inter (sans), JetBrains Mono (mono). Body opts into `font-feature-settings: "ss01", "cv11"`.
- **Where to edit**:

  | Concern                      | Location                                            |
  | ---------------------------- | --------------------------------------------------- |
  | Color / radius / font tokens | `src/styles.css` (`:root` + `@theme inline`)        |
  | Reusable utility classes     | `src/styles.css` (`@layer components`)              |
  | shadcn primitives            | `src/components/ui/**` — lint-ignored, no app logic |
  | App sections                 | `src/components/portfolio/**`                       |
  | Storybook stories            | `src/stories/**` (config in `.storybook/`)          |

## 2. Design tokens

All values are oklch. Tokens are declared in `:root` and exposed to Tailwind through `@theme inline` as `--color-*`, so utilities like `bg-background`, `text-muted-foreground`, `border-border` resolve automatically.

### Color

| Token                      | Value                        | Notes                            |
| -------------------------- | ---------------------------- | -------------------------------- |
| `--background`             | `oklch(0.16 0.01 260)`       | Near-black with cool indigo tint |
| `--foreground`             | `oklch(0.97 0.005 260)`      | Off-white body text              |
| `--surface`                | `oklch(0.2 0.012 260)`       | Cards, nav chip background       |
| `--surface-2`              | `oklch(0.235 0.014 260)`     | Hover/elevated surface           |
| `--card`                   | `oklch(0.2 0.012 260)`       | Mirrors `surface`                |
| `--card-foreground`        | `oklch(0.97 0.005 260)`      |                                  |
| `--popover`                | `oklch(0.2 0.012 260)`       |                                  |
| `--popover-foreground`     | `oklch(0.97 0.005 260)`      |                                  |
| `--primary`                | `oklch(0.86 0.17 95)`        | Warm gold — brand accent         |
| `--primary-foreground`     | `oklch(0.18 0.02 260)`       | Dark text on gold                |
| `--secondary`              | `oklch(0.27 0.015 260)`      |                                  |
| `--secondary-foreground`   | `oklch(0.97 0.005 260)`      |                                  |
| `--muted`                  | `oklch(0.24 0.012 260)`      |                                  |
| `--muted-foreground`       | `oklch(0.7 0.02 260)`        |                                  |
| `--accent`                 | `oklch(0.78 0.16 200)`       | Cyan — secondary accent          |
| `--accent-foreground`      | `oklch(0.18 0.02 260)`       |                                  |
| `--destructive`            | `oklch(0.65 0.22 27)`        |                                  |
| `--destructive-foreground` | `oklch(0.98 0 0)`            |                                  |
| `--border`                 | `oklch(0.3 0.015 260 / 60%)` | Translucent — picks up bg hue    |
| `--input`                  | `oklch(0.3 0.015 260)`       |                                  |
| `--ring`                   | `oklch(0.86 0.17 95)`        | Matches `--primary`              |

**Always use these tokens.** Don't write raw colors (`text-white`, `bg-black`, hex/rgb literals) in components — the workspace rule and project-knowledge both forbid it.

### Radius

`--radius: 0.625rem`. Tailwind utilities resolve to:

| Class        | Value                       |
| ------------ | --------------------------- |
| `rounded-sm` | `calc(var(--radius) - 4px)` |
| `rounded-md` | `calc(var(--radius) - 2px)` |
| `rounded-lg` | `var(--radius)`             |
| `rounded-xl` | `calc(var(--radius) + 4px)` |

### Effects

| Token            | Purpose                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `--glow-primary` | `0 0 60px -10px oklch(0.86 0.17 95 / 35%)` — gold halo for CTAs    |
| `--glow-accent`  | `0 0 60px -10px oklch(0.78 0.16 200 / 35%)` — cyan halo            |
| `--shadow-soft`  | Inset top highlight + large drop shadow — used by `.card-elevated` |
| `--grid-color`   | `oklch(1 0 0 / 4%)` — used by `.grid-bg`                           |

### Type

| Token         | Stack                                                         |
| ------------- | ------------------------------------------------------------- |
| `--font-sans` | `"Inter", ui-sans-serif, system-ui, sans-serif`               |
| `--font-mono` | `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace` |

Body sets `font-feature-settings: "ss01", "cv11"` for Inter's stylistic alternates and applies `-webkit-font-smoothing: antialiased`.

### Base layer

- Global selector applies `border-color: var(--color-border)` so any Tailwind border utility inherits the token border by default.
- `html`: `color-scheme: dark`, `scroll-behavior: smooth`.
- `body`: token background + foreground, plus two fixed radial gradients (gold top-center, cyan top-right) that give the page its ambient glow.
- `::selection`: gold at 30% opacity.

## 3. Component utility classes

Defined in `@layer components` in `src/styles.css`. Use these instead of re-deriving the same recipes inline.

| Class             | What it does                                                        | Where it's used              |
| ----------------- | ------------------------------------------------------------------- | ---------------------------- |
| `.container-x`    | `mx-auto w-full max-w-6xl px-6 md:px-10` page gutter                | every section                |
| `.grid-bg`        | Faint dotted grid masked to a radial vignette                       | `Hero` backdrop              |
| `.chip`           | Small rounded pill with translucent border + bg, mono-ish meta text | hero meta tags               |
| `.pill-dot`       | 6px gold dot with matching glow                                     | "Available" indicator, chips |
| `.card-elevated`  | Surface→bg gradient, hairline border, `--shadow-soft`, `rounded-xl` | `Experience` timeline cards  |
| `.link-underline` | Animated bottom border that grows on hover (220ms)                  | inline links                 |
| `.text-gradient`  | Foreground → gold → cyan text gradient (clipped)                    | hero headline highlights     |
| `.ticker`         | Edge-fade mask for marquee strips                                   | `Marquee` wrapper            |

### Animations

| Name                     | Duration / easing                                      | Source                |
| ------------------------ | ------------------------------------------------------ | --------------------- |
| `marquee`                | 40s linear infinite, translates `0 → -50%`             | `.animate-marquee`    |
| `float-glow`             | 6s ease-in-out infinite, opacity + 6px lift            | `.animate-float-glow` |
| `tw-animate-css` presets | `animate-in`, `animate-out`, `fade-*`, `slide-*`, etc. | imported package      |

## 4. UI primitives (`src/components/ui/**`)

Standard shadcn surface — **do not put app logic here**. The directory is lint-ignored (`src/components/ui/**` excluded in `.oxlintrc.json`); changes should be limited to shadcn upgrades or pulling in new primitives.

Inventory:

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`.

### Button (`src/components/ui/button.tsx`)

Base classes: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`.

| Variant       | Classes                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| `default`     | `bg-primary text-primary-foreground shadow hover:bg-primary/90`                            |
| `destructive` | `bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90`             |
| `outline`     | `border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground` |
| `secondary`   | `bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`                   |
| `ghost`       | `hover:bg-accent hover:text-accent-foreground`                                             |
| `link`        | `text-primary underline-offset-4 hover:underline`                                          |

| Size      | Classes                       |
| --------- | ----------------------------- |
| `default` | `h-9 px-4 py-2`               |
| `sm`      | `h-8 rounded-md px-3 text-xs` |
| `lg`      | `h-10 rounded-md px-8`        |
| `icon`    | `h-9 w-9`                     |

Defaults: `variant: "default"`, `size: "default"`. Supports `asChild` via Radix `Slot`.

### Badge (`src/components/ui/badge.tsx`)

| Variant       | Classes                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `default`     | `border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80`             |
| `secondary`   | `border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`              |
| `destructive` | `border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80` |
| `outline`     | `text-foreground`                                                                              |

### Card (`src/components/ui/card.tsx`)

Composition: `Card` → `CardHeader` (`flex flex-col space-y-1.5 p-6`) → `CardTitle` / `CardDescription` → `CardContent` (`p-6 pt-0`) → `CardFooter` (`flex items-center p-6 pt-0`). Container is `rounded-xl border bg-card text-card-foreground shadow`.

For the more visually loaded portfolio cards, prefer the `.card-elevated` utility instead of `<Card>`.

## 5. Portfolio sections (`src/components/portfolio/**`)

App-specific composites built on the primitives + utility classes above.

| File                               | Role                                                                                    | Notable tokens / classes                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `nav.tsx`                          | Fixed top header that gains a blurred bg + bottom border after 8px of scroll            | `container-x`, `pill-dot`, `bg-surface`, `border-border`                       |
| `hero.tsx`                         | Landing intro: meta chips, oversized headline with `text-gradient`, CTA row, stats grid | `grid-bg`, `chip`, `text-gradient`, `--glow-primary` shadow on the primary CTA |
| `marquee.tsx`                      | Continuously scrolling tech keyword ticker                                              | `.ticker`, `.animate-marquee`, mono text                                       |
| `testimonial.tsx`                  | Single quoted testimonial block                                                         | tokens only                                                                    |
| `experience.tsx`                   | Timeline-style role list, one row per company                                           | `.card-elevated`, mono eyebrows in `text-primary/90`                           |
| `projects.tsx`                     | Selected work grid                                                                      | `.card-elevated`, badge-style tag pills                                        |
| `stack.tsx`                        | Tooling matrix grouped by domain                                                        | grid with `bg-border` 1px gutters                                              |
| `contact.tsx` / `contact-form.tsx` | Contact section + form posting to backend                                               | shadcn `input`/`textarea`/`button`                                             |
| `section-heading.tsx`              | Eyebrow + balanced title + optional description — use this for every new section        | `font-mono text-xs uppercase tracking-[0.2em] text-primary`                    |

`SectionHeading` is the canonical pattern for new sections — hairline rule + uppercase mono eyebrow, large tracking-tight `h2`, optional muted description. Don't reinvent it.

## 6. Storybook coverage

Config: `.storybook/main.ts`, `.storybook/preview.ts`, `.storybook/vite.config.ts`. Stories live in `src/stories/**.stories.tsx`.

| Primitive   | Story                     |
| ----------- | ------------------------- |
| accordion   | `accordion.stories.tsx`   |
| alert       | `alert.stories.tsx`       |
| avatar      | `avatar.stories.tsx`      |
| badge       | `badge.stories.tsx`       |
| breadcrumb  | `breadcrumb.stories.tsx`  |
| button      | `button.stories.tsx`      |
| card        | `card.stories.tsx`        |
| checkbox    | `checkbox.stories.tsx`    |
| dialog      | `dialog.stories.tsx`      |
| hover-card  | `hover-card.stories.tsx`  |
| input       | `input.stories.tsx`       |
| label       | `label.stories.tsx`       |
| popover     | `popover.stories.tsx`     |
| progress    | `progress.stories.tsx`    |
| radio-group | `radio-group.stories.tsx` |
| select      | `select.stories.tsx`      |
| separator   | `separator.stories.tsx`   |
| skeleton    | `skeleton.stories.tsx`    |
| slider      | `slider.stories.tsx`      |
| switch      | `switch.stories.tsx`      |
| tabs        | `tabs.stories.tsx`        |
| textarea    | `textarea.stories.tsx`    |
| toggle      | `toggle.stories.tsx`      |
| tooltip     | `tooltip.stories.tsx`     |

**Primitives without stories** (gap for future contributions): `alert-dialog`, `aspect-ratio`, `calendar`, `carousel`, `chart`, `collapsible`, `command`, `context-menu`, `drawer`, `dropdown-menu`, `form`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `resizable`, `scroll-area`, `sheet`, `sidebar`, `sonner`, `table`, `toggle-group`.

Portfolio composites in `src/components/portfolio/**` are intentionally not storied — they are page-level compositions, not reusable primitives.

## 7. Conventions

- **Tokens are the source of truth.** Never write raw colors in components; always use semantic Tailwind utilities backed by `--color-*`.
- **No app logic in `src/components/ui/**`.** It's the shadcn surface and is lint-ignored. Compose primitives in `src/components/portfolio/\*\*` or other feature folders.
- **Filenames are kebab-case** (enforced by `unicorn/filename-case` in `.oxlintrc.json`); the documented exceptions are listed in `AGENTS.md`.
- **Path alias is `@/*` only.** Don't add new aliases without updating both `tsconfig.json#paths` and Vite resolution.
- **Use `SectionHeading`** for every new top-level section so eyebrow/title rhythm stays consistent.
- **Reach for `.card-elevated`, `.chip`, `.text-gradient`, `.grid-bg`** before re-deriving the same effect inline — that's why they exist.
- **Animations**: prefer `tw-animate-css` utilities; add a new keyframe to `src/styles.css` only when no preset fits.
- For tooling rules (oxlint, oxfmt, lefthook, tsdown, TS strictness), see `AGENTS.md`. For data-fetching patterns (TanStack Router + Query), also `AGENTS.md`.
