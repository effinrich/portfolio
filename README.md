# richtillman.xyz

Personal portfolio site. Public portfolio at `/`, authenticated admin inbox at `/admin` for triaging contact submissions.

**Live:** https://richtillman.xyz

## Stack

- **Framework:** TanStack Start (React 19, TanStack Router + Query)
- **Styling:** Tailwind v4
- **Data:** Supabase (Postgres, RLS, Realtime)
- **Runtime:** Cloudflare Workers via Wrangler
- **Tooling:** Bun, oxlint, oxfmt, lefthook, Storybook 10+, Chromatic
- **Language:** TypeScript (strict)

## Architecture

Single repo, single deploy target. Two route trees: public portfolio (`/`) and authenticated admin (`/admin`). The server entry at `src/server.ts` is a Cloudflare Workers `fetch` handler wrapping TanStack Start's SSR pipeline with a custom error boundary — h3 swallows in-handler throws into a generic JSON 500; this layer detects that shape and serves a branded error page instead.

Contact submissions land in Supabase with row-level security: public writes allowed, reads and replies admin-only. Role checks use a `security-definer` `has_role()` SQL helper rather than client-side trust. Realtime subscriptions push new submissions to the admin inbox without polling.

## Data model

| Table                 | Notes                                       |
| --------------------- | ------------------------------------------- |
| `contact_submissions` | Public insert. Admin read/delete via RLS.   |
| `user_roles`          | Role assignments backed by `app_role` enum. |
| `submission_replies`  | Admin-only threaded replies.                |

## Local development

```bash
bun install
cp .env.example .env
supabase db push
bun run dev
```

Required environment variables:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_ANON_PUBLIC_KEY
VITE_SUPABASE_PROJECT_ID
```

## Scripts

| Script                    | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `bun run dev`             | Local dev server                             |
| `bun run build`           | Production build (Cloudflare Workers target) |
| `bun run lint`            | oxlint                                       |
| `bun run format`          | oxfmt                                        |
| `bun run typecheck`       | `tsc --noEmit`                               |
| `bun run storybook`       | Storybook 10 component sandbox               |
| `bun run build-storybook` | Static Storybook build                       |
| `bun run chromatic`       | Publish + visual-regression run on Chromatic |
| `bun run figma:check`     | Parse/validate Figma Code Connect mappings   |
| `bun run figma:publish`   | Publish Code Connect to the Figma library    |

## Storybook & visual QA

The full component sandbox — Tailwind tokens, shadcn primitives, and the portfolio's own design components — runs in Storybook 10 with the a11y, docs, and themes addons.

> **Live sandbox →** [Storybook on Chromatic](https://6a06fa237708f9da65107759-puycxjsmyy.chromatic.com/)
>
> Always-on, deploy-previewed, and the same build the visual-regression suite snapshots against.

Every pull request runs [`.github/workflows/chromatic.yml`](.github/workflows/chromatic.yml), which publishes the Storybook build to Chromatic and diffs it against the `main` baseline. `fetch-depth: 0` is required so TurboSnap can narrow the snapshot set to only the stories affected by the diff — full rebuilds are reserved for changes under `src/**`, `.storybook/**`, `chromatic.config.json`, or the lockfile.

Run it locally against your branch with `bun run chromatic` (requires `CHROMATIC_PROJECT_TOKEN`).

## Design system

A shadcn/ui (new-york) component set on Radix primitives, themed by a single dark token layer. **Code is the source of truth:**

- **Tokens** — `src/styles.css` (`@theme` + `:root`): colors (oklch), radii, fonts, effects.
- **Components** — `src/components/ui/*`, composed into portfolio sections in `src/components/portfolio/*`.

A matching **Figma library** is _generated from_ that code — every variable, text/effect style, and component mirrors the repo, so designs map 1:1 onto shippable parts.

> **Figma →** [Portfolio Design System](https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD)

**Code Connect** links the two: each `src/components/ui/<name>.figma.tsx` binds a Figma component node to its code component with prop mappings, so Figma's Dev Mode surfaces the real import and API. Config lives in [`figma.config.json`](figma.config.json). Validate with `bun run figma:check`; `bun run figma:publish` pushes the mappings (requires the library published to a team library and a Figma plan that supports Code Connect).

Sync is **one direction — code → Figma**. When tokens or components change, regenerate the Figma library rather than hand-editing Figma and syncing back.

## Deployment

Cloudflare Workers via Wrangler. Secrets set with `wrangler secret put`. Auto-deploys from `main` via Cloudflare's GitHub integration.

## Links

- [Portfolio Design System](https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD) — the Figma library generated from this repo
- [forgekit.cloud](https://forgekit.cloud) — MCP tooling for Figma → React design systems
- [LinkedIn](https://www.linkedin.com/in/effinrich)
- [npm](https://www.npmjs.com/~effinrich)
