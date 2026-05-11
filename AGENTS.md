# Agent Rules

Conventions for AI agents (and humans) working in this repo. Keep this file short, prescriptive, and current.

## Stack

- **TypeScript**: `typescript@6` with `@codecompose/typescript-config/react-library` as the base. App config lives in `tsconfig.json` — extend, don't replace.
- **Linter**: [oxlint](https://oxc.rs/docs/guide/usage/linter) via `.oxlintrc.json`.
- **Formatter**: [oxfmt](https://oxc.rs/docs/guide/usage/formatter) via `.oxfmtrc.json`.
- **Git hooks**: [lefthook](https://lefthook.dev) via `lefthook.yml`.
- **Library bundler**: [tsdown](https://tsdown.dev) via `tsdown.config.ts` (app itself still builds with Vite for the Cloudflare Worker target).

## Hard rules

- **NEVER** reintroduce ESLint, Prettier, Husky, or lint-staged. They were removed deliberately. No `eslint.config.*`, `.prettierrc*`, `.husky/`, or `lint-staged` config in `package.json`.
- **NEVER** edit `src/routeTree.gen.ts`, `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`, or `.env`.
- **NEVER** rename `.env.example` back to `.env copy`.
- **NEVER** downgrade TypeScript below 6.x or remove the `@codecompose/typescript-config` extends.

## Scripts (use these — don't invent new ones)

| Task | Command |
|---|---|
| Lint | `bun run lint` (`oxlint`) |
| Lint + autofix | `bun run lint:fix` |
| Format | `bun run format` (`oxfmt .`) |
| Format check | `bun run format:check` |
| Typecheck | `bun run typecheck` (`tsc --noEmit`) |
| Bundle internal libs | `bun run bundle` (`tsdown`) |
| Install hooks | `bun run prepare` (auto on `bun install`) |

Don't run `npm run build` / `tsc` manually — the harness runs builds automatically.

## Editing the lint/format configs

- Disable rules in `.oxlintrc.json` only with a one-line justification in the PR/commit, never silently.
- Keep `ignorePatterns` in `.oxlintrc.json` and `.oxfmtrc.json` in sync for generated files (`src/routeTree.gen.ts`, `src/integrations/supabase/types.ts`, `dist`, `.output`, `.vinxi`).
- `src/components/ui/**` is lint-ignored (shadcn surface). Don't add app logic there.

## lefthook

- `pre-commit`: `oxlint --fix` + `oxfmt` on staged files (parallel, `stage_fixed: true`).
- `pre-push`: `tsc --noEmit`.
- If you add a hook, keep it fast (<2s typical) and scoped to staged files via `{staged_files}`.

## tsdown

- The Cloudflare Worker app is built by Vite — do **not** point tsdown at app entry points or routes.
- Use tsdown only for internal libraries / shared packages. Add entries to `tsdown.config.ts#entry` when extracting one.

## TypeScript

- Strict base from codecompose. Local overrides in `tsconfig.json` are intentional; touch only with reason:
  - `verbatimModuleSyntax: false` — keeps existing `import` style working.
  - `noUncheckedIndexedAccess: false` — opt-in later, file-by-file.
  - `moduleResolution: "Bundler"` — required for Vite + path aliases.
- New code should aim to be clean under stricter settings even though they're disabled globally.

## When in doubt

Prefer the new tool over a familiar old one. If oxlint/oxfmt can't express a rule you need, open a discussion before pulling ESLint/Prettier back in.
