# Design System

## Overview

Tailwind CSS v4 configured entirely in CSS (`src/styles.css`) — no `tailwind.config.*` file. Tokens declared via `@theme inline {}` and `:root` custom properties. Component library is shadcn/ui (New York style, slate base) with Radix UI primitives composed using `class-variance-authority` and `cn`. Dark-only theme (`color-scheme: dark` on `html`; `.dark` class variant exists but is unused). Animations via `tw-animate-css` plus two local keyframes.

## Colors

All color values are oklch.

### Semantic Colors

| Token                      | Value                        | Role                                           |
| -------------------------- | ---------------------------- | ---------------------------------------------- |
| `--background`             | `oklch(0.16 0.01 260)`       | Page background — near-black, cool indigo tint |
| `--foreground`             | `oklch(0.97 0.005 260)`      | Body text — off-white                          |
| `--surface`                | `oklch(0.2 0.012 260)`       | Cards, nav chip background                     |
| `--surface-2`              | `oklch(0.235 0.014 260)`     | Hover / elevated surface                       |
| `--card`                   | `oklch(0.2 0.012 260)`       | Card background (mirrors surface)              |
| `--card-foreground`        | `oklch(0.97 0.005 260)`      | Card text                                      |
| `--popover`                | `oklch(0.2 0.012 260)`       | Popover background                             |
| `--popover-foreground`     | `oklch(0.97 0.005 260)`      | Popover text                                   |
| `--primary`                | `oklch(0.86 0.17 95)`        | Warm gold — brand accent                       |
| `--primary-foreground`     | `oklch(0.18 0.02 260)`       | Dark text on gold                              |
| `--secondary`              | `oklch(0.27 0.015 260)`      | Secondary surface                              |
| `--secondary-foreground`   | `oklch(0.97 0.005 260)`      | Secondary text                                 |
| `--muted`                  | `oklch(0.24 0.012 260)`      | Muted surface                                  |
| `--muted-foreground`       | `oklch(0.7 0.02 260)`        | Muted text                                     |
| `--accent`                 | `oklch(0.78 0.16 200)`       | Cyan — secondary accent                        |
| `--accent-foreground`      | `oklch(0.18 0.02 260)`       | Dark text on cyan                              |
| `--destructive`            | `oklch(0.65 0.22 27)`        | Error / destructive                            |
| `--destructive-foreground` | `oklch(0.98 0 0)`            | Text on destructive                            |
| `--border`                 | `oklch(0.3 0.015 260 / 60%)` | Translucent border                             |
| `--input`                  | `oklch(0.3 0.015 260)`       | Input border                                   |
| `--ring`                   | `oklch(0.86 0.17 95)`        | Focus ring (matches primary)                   |

Tokens are exposed to Tailwind as `--color-*`, so utilities like `bg-background`, `text-muted-foreground`, and `border-border` resolve automatically.

**Rule:** never write raw colors (`text-white`, hex, rgb) in components — always use semantic token utilities.

## Typography

### Font Families

- Sans: `"Inter", ui-sans-serif, system-ui, sans-serif`
- Mono: `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace`

Body applies `font-feature-settings: "ss01", "cv11"` (Inter stylistic alternates) and `-webkit-font-smoothing: antialiased`.

## Spacing and Layout

### Container

`.container-x` utility: `mx-auto w-full max-w-6xl px-6 md:px-10` — use on every section wrapper.

### Grid

`.grid-bg`: faint `oklch(1 0 0 / 4%)` grid at 48×48px, masked to radial vignette. Used as `Hero` backdrop.

## Borders and Shadows

### Border Radius

Base: `--radius: 0.625rem`

| Class         | Value                        |
| ------------- | ---------------------------- |
| `--radius-sm` | `calc(var(--radius) - 4px)`  |
| `--radius-md` | `calc(var(--radius) - 2px)`  |
| `--radius-lg` | `var(--radius)` — `0.625rem` |
| `--radius-xl` | `calc(var(--radius) + 4px)`  |

### Effects

| Token            | Value                                                                     |
| ---------------- | ------------------------------------------------------------------------- |
| `--glow-primary` | `0 0 60px -10px oklch(0.86 0.17 95 / 35%)`                                |
| `--glow-accent`  | `0 0 60px -10px oklch(0.78 0.16 200 / 35%)`                               |
| `--shadow-soft`  | `0 1px 0 0 oklch(1 0 0 / 6%) inset, 0 20px 60px -20px oklch(0 0 0 / 50%)` |
| `--grid-color`   | `oklch(1 0 0 / 4%)`                                                       |

## Components

### Organization

Two tiers:

- `src/components/ui/` — shadcn/ui primitives wrapping Radix UI. Lint-ignored. No app logic. Upgrade via shadcn CLI only.
- `src/components/portfolio/` — app-specific composites built on primitives and utility classes.
- `src/components/forms/` — form-specific composites.

### UI Primitives (55 components)

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`

### Portfolio Composites (10 components)

`nav`, `hero`, `marquee`, `testimonial`, `experience`, `projects`, `stack`, `contact`, `contact-form`, `section-heading`

### Component Utility Classes

Defined in `@layer components` in `src/styles.css`:

| Class             | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `.container-x`    | Page gutter — `mx-auto w-full max-w-6xl px-6 md:px-10`              |
| `.grid-bg`        | Faint dotted grid masked to radial vignette                         |
| `.chip`           | Small rounded pill with translucent border + bg                     |
| `.pill-dot`       | 6px gold dot with matching glow                                     |
| `.card-elevated`  | Surface→bg gradient, hairline border, `--shadow-soft`, `rounded-xl` |
| `.link-underline` | Animated bottom border that grows on hover (220ms)                  |
| `.text-gradient`  | Foreground → gold → cyan clipped text gradient                      |
| `.ticker`         | Edge-fade mask for marquee strips                                   |

### Animations

| Name                     | Spec                                             | Class                 |
| ------------------------ | ------------------------------------------------ | --------------------- |
| `marquee`                | 40s linear infinite, `translateX(0 → -50%)`      | `.animate-marquee`    |
| `float-glow`             | 6s ease-in-out infinite, opacity + 6px lift      | `.animate-float-glow` |
| `tw-animate-css` presets | `animate-in`, `animate-out`, `fade-*`, `slide-*` | via imported package  |

### Button Variants

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

## Conventions

### Styling Approach

- Framework: Tailwind CSS v4 (CSS-native config, no JS config file)
- Tokens: CSS custom properties in `:root`, exposed via `@theme inline`
- Components: shadcn/ui (New York, slate) + Radix UI primitives
- Composition: `class-variance-authority` + `cn` (`tailwind-merge` + `clsx`)
- File pattern: co-located TSX, global stylesheet in `src/styles.css`
- Naming: kebab-case filenames, PascalCase exports, Tailwind utility classes

### Accessibility

- Focus ring: `focus-visible:ring-1 focus-visible:ring-ring` on interactive elements
- Disabled state: `disabled:pointer-events-none disabled:opacity-50`
- SVG icons: `pointer-events-none` and fixed size via `[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`
- Storybook a11y addon enabled (`@storybook/addon-a11y`)

### Dark Mode

Dark-only. `color-scheme: dark` on `html`. `@custom-variant dark (&:is(.dark *))` defined for future light-mode opt-in but unused. No toggle in app.
