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

## Enforcement & DX

These tools are not optional. They run automatically and gate commits/pushes.

### Local loop (every change)

1. Edit code.
2. `bun run lint:fix` — autofix what oxlint can.
3. `bun run format` — oxfmt normalizes the diff.
4. `bun run typecheck` before opening a PR.

If a file you touched still has lint errors after autofix, fix them in the same change. **Never commit with `--no-verify`** to skip lefthook. If a hook is wrong, fix the hook, not the bypass.

### What each tool guards

- **oxlint** — correctness + a11y + perf. Treat `correctness` errors as build-breaking. `jsx-key` is `error` (don't downgrade). a11y violations on form controls (`label`/`id`/`htmlFor`, keyboard handlers on dialogs) are non-negotiable — see `src/routes/admin.tsx` for the pattern.
- **oxfmt** — single source of truth for whitespace, quotes, semicolons, trailing commas, line width (100). Don't hand-format. Don't add `// prettier-ignore` style pragmas; they do nothing here.
- **lefthook** — the enforcement layer. `pre-commit` blocks unformatted/unlinted staged files; `pre-push` blocks broken types. Run `bun run prepare` once after clone.
- **tsc (TS 6 + codecompose)** — strictness baseline. Do not loosen `tsconfig.json` to make an error go away; fix the type instead.
- **tsdown** — only invoked when bundling internal libs. Don't wire it into the app build path.

### Code style protections (don't undo these)

- Imports use `verbatimModuleSyntax: false` style — plain `import { Foo }`. Don't blanket-add `import type` unless TS demands it.
- Path alias is `@/*` only. Don't add new aliases without updating both `tsconfig.json#paths` and Vite resolution.
- File names: kebab-case (workspace rule). oxlint won't catch this — agents must.
- Design tokens from `src/styles.css` only; no raw color classes. Lint won't catch this either — review discipline.
- `src/components/ui/**` is shadcn surface and lint-ignored. Keep it that way: no app logic, no business imports, no edits beyond shadcn upgrades.

### Changing the rules

- Loosening an oxlint rule, adding an `ignorePatterns` entry, or relaxing a `tsconfig.json` flag requires a one-line justification in the commit message.
- Tightening is always welcome and doesn't need justification.
- If oxlint/oxfmt genuinely can't express a rule you need, raise it before reaching for ESLint/Prettier — those stay out.

### CI expectation

Any CI added later MUST run, in order: `bun run format:check`, `bun run lint`, `bun run typecheck`, then build. Failing any step fails the build. Mirror lefthook so local and CI agree.
