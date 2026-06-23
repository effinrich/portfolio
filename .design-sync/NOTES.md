# design-sync notes — portfolio

Storybook-shape sync of the portfolio's shadcn/ui primitives to claude.ai/design.

## Setup decisions (durable)

- **No library bundle existed.** Portfolio is a Vite/Cloudflare _app_, `tsdown.config.ts` had `entry: []`. Added `src/index.ts` barrel re-exporting every `src/components/ui/*` + `cn`, pointed tsdown at it (`entry: ["src/index.ts"]`, react/react-dom external). Bundle → `dist/index.mjs` (~116 KB). globalName `PortfolioDS`.
- **DTS extension.** tsdown emits `dist/index.d.mts`; the converter's dts scan globs `**/*.d.ts` and reads `pkg.types`. Added `"types": "./dist/index.d.ts"` to package.json and `buildCmd` copies `index.d.mts → index.d.ts`. Without this: 0 components discovered (`[TITLE_UNMAPPED]` on all 24).
- **node_modules lives in the MAIN checkout, not the worktree.** Run the converter with `--node-modules /Users/richtillman/Documents/GitHub/portfolio/node_modules` (worktree's own `node_modules` is sparse — no react). `--entry dist/index.mjs` (own-source repo, no `node_modules/portfolio`).

## [GENERAL] Dark-only DS needs a dark preview surface

The card scaffold (`emit.mjs`, do-not-fork) hardcodes `body{background:#fff}`. This DS is **dark-only** (tokens on `:root`, near-black `--background`, off-white `--foreground`; app never toggles `.dark`). On white, every transparent/ghost/outline variant and all `text-foreground` content renders invisible/wrong.
Fix: `cfg.provider` → `DesignSurface` (a preview-only wrapper in `.design-sync/ds-preview-surface.tsx`, merged onto the global via `cfg.extraEntries`). Wraps each preview component in a `var(--background)`/`var(--foreground)` div. After this, Button/Badge ghost+outline+link render on dark and match storybook. The decorator bundle ALSO fails (`Could not resolve "tailwindcss"` from `src/styles.css`'s `@import "tailwindcss"`), so an explicit provider is required regardless.

## Re-sync risks / open items for the full run

- **[FONT_MISSING] Inter, JetBrains Mono (+ Cambria).** Named in `--font-sans`/`--font-mono` but NO `@font-face` ships anywhere in the repo (no Google Fonts link, no @fontsource). Both storybook and preview fall back to system fonts equally, so compare can't see it. Decide for the real run: ship woff2 via `cfg.extraFonts` (so the design pane is correct regardless of viewer's system) or accept system substitute. Cambria leaks from a default serif stack.
- **[TOKENS_MISSING] `--sidebar-border`, `--sidebar-accent`** referenced by `sidebar.tsx` but never defined in `src/styles.css` — pre-existing repo gap. (`--radix-navigation-menu-viewport-*` are runtime-injected by Radix — expected absent.)
- **[GRID_OVERFLOW] (wide): Accordion, Alert, Tabs** — set `cfg.overrides.<Name>.cardMode: "column"`.
- **[RENDER_THIN]: HoverCard, RadioGroup, Toggle, Tooltip** — variants render identically (hover/overlay triggers don't fire statically). Author owned `.design-sync/previews/<Name>.tsx` or `cardMode: single`.
- **Dialog "Opens On Click"** — interaction story; static preview shows the closed trigger. Owned preview rendering `<Dialog open>` or `cfg.overrides.Dialog.skip` that story.
- **Pilot scope.** Only Button, Card, Dialog, Badge graded (all match except the Dialog interaction story). Other 20 build + render clean (validate 24/24) but are NOT screenshot-graded. Project intentionally left **un-anchored** (no `_ds_sync.json` uploaded) until the full run grades everything.
