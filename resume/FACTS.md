# Employment & Project Facts — Source of Truth

> **This file is the only authoritative source for employment dates and immutable facts in resume artifacts.**
>
> If you (or an AI assistant) want to change a date in `build-resume.mjs` or `cover-letter.mjs`, update this file **first**, then propagate the change downstream. Never the other way around. Never guess. When in doubt, stop and ask.
>
> Background checks (Checkr, HireRight, The Work Number) pull employment dates from third-party HR sources. Date mismatches between a resume and those systems are a fast rescind.

---

## Verification status

- ✅ **Verified:** dates are confirmed by the user, traceable to W-2s, paystubs, contract start dates, or first commit / first npm publish.
- ⚠️ **Needs verification:** placeholder or inherited from prior resume — confirm against primary source before sending to anyone.

---

## Current

### Mercor — Senior Frontend Engineer · AI Training & Evaluations

- **Start:** November 2025
- **End:** Present
- **Type:** Contract, remote
- **Status:** ✅ Verified

### micro1 — Senior Frontend Engineer · AI Training & Evaluations

- **Start:** November 2025
- **End:** Present
- **Type:** Contract, remote
- **Status:** ✅ Verified

### Independent — Open-Source Author · ForgeKit

- **Start:** October 2025 (placeholder — verify with first npm publish or first commit date)
- **End:** Present
- **Type:** Self-directed open-source work
- **Status:** ⚠️ Needs verification — check `npmjs.com/~effinrich` first-publish date or `git log --reverse` on the ForgeKit core repo

---

## Previous

### Redesign Health — Engineering Director (Staff Frontend Engineer & Tech Lead, 0→1)

- **Start:** July 2022
- **End:** May 2024
- **Type:** Full-time, remote
- **Status:** ⚠️ Needs verification (inherited from prior resume)

### Pineapple Corporation — Senior Frontend Engineer & Tech Lead · Consultant

- **Start:** January 2022
- **End:** July 2022
- **Type:** Contract, remote
- **Status:** ⚠️ Needs verification

### PHC Global — Founding Frontend Engineer (0→1)

- **Start:** July 2021
- **End:** January 2022
- **Type:** Full-time, remote
- **Status:** ⚠️ Needs verification

### Freebird — Lead Frontend Engineer (0→1)

- **Start:** September 2016
- **End:** January 2021
- **Type:** Full-time, Santa Monica CA
- **Status:** ⚠️ Needs verification

### EPCVIP — Senior Frontend Engineer (NOT on current resume; here for the record)

- **Start:** [unknown]
- **End:** [unknown]
- **Type:** Contract
- **Status:** ⚠️ Folded into "Earlier experience" line

### FaceCake Marketing Tech — Lead Web Developer (NOT on current resume; here for the record)

- **Start:** October 2010
- **End:** September 2016
- **Type:** Full-time, Los Angeles CA
- **Status:** ⚠️ Folded into "Earlier experience" line. Dates retained in case a future application surfaces this role explicitly (e.g. canvas/AR roles).

---

## How to verify a date

1. **W-2 forms** — `~/Documents/tax/` or wherever you keep them. Year-by-year, shows the employer name and at least confirms tenure crossed each calendar year.
2. **Paystubs** — first paystub of any role establishes start month/year.
3. **Bank deposit history** — earliest direct deposit from an employer establishes start.
4. **LinkedIn export** — if you trust your own historical edits. Caveat: LinkedIn dates are self-reported and may be stale.
5. **The Work Number** (theworknumber.com) — request a free employment data report on yourself; it shows what background checkers will see.
6. **For ForgeKit specifically:** `git log --reverse --format="%ai" | head -1` in the repo, or check the first-publish date on `npmjs.com/package/forgekit-figma-mcp` and `forgekit-storybook-mcp`.

---

## Project URLs (verified)

- **Tidy App** — landing page: https://tidyapp.me
- **ForgeKit** — https://forgekit.cloud
- **ForgeKit Figma MCP** — https://npmjs.com/package/forgekit-figma-mcp
- **ForgeKit Storybook MCP** — https://npmjs.com/package/forgekit-storybook-mcp
- **Personal portfolio** — https://richtillman.xyz
- **Design system docs site (planned)** — design.richtillman.xyz (NOT YET DEPLOYED — do not include in resume/cover letters until live)

---

## Immutable rules

- **No employer is removed without an explicit user decision logged here.** Currently removed from active resume: EPCVIP and FaceCake (rolled into "Earlier experience"). Verizon — fully removed per user decision (disaster engagement).
- **No graduation year on the resume.** Self-taught framing per user direction. College of Charleston entry, if it ever resurfaces, should be year-stripped.
- **No phone number** on the resume per user decision (May 2026).
- **No "15+ years," "since 2016," "Storybook 8+," "React 18+," or "AI Expert" language** — all flagged as age or staleness signals.
