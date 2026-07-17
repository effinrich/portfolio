---
defract:
  version: 1
  generated_at: "2026-06-14T00:00:00Z"
  updated_at: "2026-06-14T00:00:00Z"
  source: extracted
---

# Project Profile

## Overview

Personal developer portfolio site built with TanStack Start (SSR) running on Cloudflare Workers. Includes a contact form backed by Supabase and an auth-gated admin route.

## Stack

- **Runtime**: Cloudflare Workers (Wrangler, `src/server.ts` entry)
- **Frontend**: React 19, TanStack Start + TanStack Router (file-based), TanStack Query
- **Bundler**: Vite 8 + `@cloudflare/vite-plugin`; `tsdown` for internal lib bundling only
- **Styling**: Tailwind v4 (CSS-only, no `tailwind.config.*`), dark-only theme, shadcn/ui (new-york / slate)
- **Database**: Supabase (hosted, `contact_submissions` table)
- **Testing**: Vitest (configured), Storybook 10 + Chromatic (visual regression on PRs)
- **Package manager**: Bun
- **Linter / Formatter**: oxlint + oxfmt (no ESLint / Prettier)
- **Git hooks**: lefthook — pre-commit: lint+fmt on staged files; pre-push: typecheck
- **CI/CD**: GitHub Actions — Chromatic visual regression on PRs (`chromatic.yml`); Stark a11y (`stark.yml`)
- **TypeScript**: v6 via `@codecompose/typescript-config/react-library`

## Conventions

- Filenames kebab-case — enforced by `unicorn/filename-case` in `.oxlintrc.json` (`AGENTS.md`)
- No raw colors — always use design token utilities (`bg-background`, `text-primary`, etc.) (`DESIGN.md §7`)
- `src/components/ui/**` is shadcn surface only, lint-ignored — no app logic (`AGENTS.md`)
- Path alias `@/*` only — both `tsconfig.json#paths` and Vite must stay in sync (`AGENTS.md`)
- Data fetching: route `loader` + `useSuspenseQuery` for reads; `useMutation` for writes — no `useState+useEffect+fetch` chains (`AGENTS.md`)
- Auth-gated routes redirect in `beforeLoad`, not in `useEffect` (`AGENTS.md`)
- `SectionHeading` component used for every new page section (`DESIGN.md §5`)
- Never edit generated files: `src/routeTree.gen.ts`, `src/integrations/supabase/{client,client.server,types}.ts` (`AGENTS.md`)
- Never reintroduce ESLint, Prettier, Husky, or lint-staged (`AGENTS.md`)

## File Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── portfolio/       # App sections: nav, hero, marquee, experience, projects,
│   │   │                    #   stack, contact, contact-form, testimonial, section-heading
│   │   ├── forms/           # Shared form helpers: form-success, submit-button
│   │   └── ui/              # shadcn primitives (lint-ignored, no app logic)
│   ├── routes/
│   │   ├── __root.tsx       # TanStack Router root layout
│   │   ├── index.tsx        # Main portfolio page
│   │   ├── admin.tsx        # Auth-gated admin view
│   │   ├── login.tsx        # Login page
│   │   ├── api/
│   │   │   └── contact.ts   # POST handler → Supabase contact_submissions
│   │   └── sitemap[.]xml.ts # Sitemap route
│   ├── integrations/
│   │   └── supabase/        # Generated client, server client, auth middleware, types
│   ├── hooks/               # use-mobile.tsx
│   ├── lib/                 # Utilities (cn, etc.)
│   ├── assets/              # Project images (jpg)
│   ├── styles.css           # Tailwind v4 theme tokens, base layer, utility classes
│   ├── router.tsx           # TanStack Router setup
│   └── server.ts            # Cloudflare Worker entry
├── src/stories/             # Storybook stories for shadcn primitives
├── .storybook/              # Storybook config (main.ts, preview.ts, vite.config.ts)
├── .github/workflows/       # chromatic.yml, stark.yml
├── lefthook.yml             # Git hook config
├── components.json          # shadcn config (new-york, slate, lucide)
├── tsconfig.json            # TS 6, Bundler resolution, @/* alias
├── AGENTS.md                # Tooling rules and conventions (source of truth)
└── DESIGN.md                # Design system reference
```

## Key Dependencies

### Frontend

- `react@^19.2.0` — UI rendering
- `@tanstack/react-start@latest` — SSR framework
- `@tanstack/react-router@latest` — file-based routing
- `@tanstack/react-query@latest` — server state
- `tailwindcss@^4.2.1` — utility CSS
- `@radix-ui/*` — headless primitives under shadcn
- `class-variance-authority@^0.7.1` — variant composition
- `react-hook-form@^7.71.2` + `zod@^3.24.2` — form validation
- `lucide-react@^0.575.0` — icons
- `sonner@^2.0.7` — toast notifications

### Backend / Infra

- `@cloudflare/vite-plugin@^1.26.0` — Cloudflare Workers build target
- `@supabase/supabase-js@^2.105.3` — database + auth client

### Dev

- `storybook@^10.4.0` + `@storybook/react-vite` — component sandbox
- `chromatic@^16.0.0` — visual regression CI
- `oxlint@^1.63.0` + `oxfmt@^0.48.0` — lint + format
- `lefthook@^2.1.6` — git hooks
- `typescript@^6.0.3`
- `vite@^8.0.0`
- `vitest@^4.1.5`
- `tsdown@^0.22.0` — internal lib bundler

## Build Commands

| Command             | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `bun run dev`       | Vite dev server with Cloudflare Workers emulation (port 5173) |
| `bun run build`     | Production Vite build                                         |
| `bun run storybook` | Storybook dev server (port 6006)                              |
| `bun run lint`      | oxlint                                                        |
| `bun run lint:fix`  | oxlint with autofix                                           |
| `bun run format`    | oxfmt                                                         |
| `bun run typecheck` | `tsc --noEmit`                                                |
| `bun run bundle`    | tsdown (internal libs only)                                   |

## Project-Specific Notes

- Deployment target is **Cloudflare Workers**, not Vercel — skip Vercel-specific advice (`AGENTS.md`).
- Supabase is **hosted** — no local Supabase CLI or Docker needed. Credentials come from `.env.local` and `.dev.vars`.
- `DESIGN.md` is the design system reference. `AGENTS.md` is the tooling/convention source of truth. Both are checked in — refer to them rather than re-deriving conventions.
- Several shadcn primitives in `src/components/ui/**` have no Storybook story yet (`DESIGN.md §6` lists them: `alert-dialog`, `dropdown-menu`, `form`, `sonner`, `table`, and others).
- Chromatic runs on PRs only, never on push (`AGENTS.md` Chromatic section).
