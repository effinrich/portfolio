# @portfolio/career

The single source of truth for career **facts** — identity, hero chips/stats,
roles, and project descriptions (`src/career.json`) with a typed accessor
(`src/index.ts`).

## Who consumes it

- **The portfolio app** (`src/components/portfolio/*`) — imports `@portfolio/career`
  for the hero, experience, and projects sections. Presentation that isn't a fact
  (project images, accent colors, CTA labels, badges) stays in the components.
- **The résumé + LinkedIn tooling** (from `forgekit-sync`, once imported into this
  workspace) — reads `career.json` to generate the résumé and LinkedIn copy.

One file, three surfaces — so the portfolio, résumé, and LinkedIn can't drift.

## Next step — import the sync tooling

`forgekit-sync` (the code→Figma + résumé/LinkedIn generator) lives in its own repo.
Bring it into this Nx workspace as a project, preserving history:

```bash
nx import <path-or-url-to/forgekit-sync> packages/forgekit-sync
```

Then point its résumé generator at this lib's data
(`node packages/forgekit-sync/career/resume.mjs` reading `libs/career/src/career.json`),
and the whole hub — portfolio, résumé, LinkedIn — runs from this one file.

> Run the `nx import` yourself so you can watch the Cloudflare preview deploy and
> Nx graph update — it adds a second project to the workspace.
