# richtillman.xyz

Personal portfolio site. Public portfolio at `/`, authenticated admin inbox at `/admin` for triaging contact submissions.

**Live:** https://richtillman.xyz

## Stack

- **Framework:** TanStack Start (React 19, TanStack Router + Query)
- **Styling:** Tailwind v4
- **Data:** Supabase (Postgres, RLS, Realtime)
- **Runtime:** Cloudflare Workers via Wrangler
- **Tooling:** Bun, oxlint, oxfmt, lefthook, Storybook 10+
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
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

## Scripts

| Script              | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `bun run dev`       | Local dev server                             |
| `bun run build`     | Production build (Cloudflare Workers target) |
| `bun run lint`      | oxlint                                       |
| `bun run format`    | oxfmt                                        |
| `bun run storybook` | Storybook 8 component sandbox                |
| `bun run typecheck` | `tsc --noEmit`                               |

## Deployment

Cloudflare Workers via Wrangler. Secrets set with `wrangler secret put`. Auto-deploys from `main` via Cloudflare's GitHub integration.

## Links

- [forgekit.cloud](https://forgekit.cloud) — MCP tooling for Figma → React design systems
- [LinkedIn](https://www.linkedin.com/in/effinrich)
- [npm](https://www.npmjs.com/~effinrich)
