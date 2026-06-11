# Resume Folder — Operating Rules

> Read this file before modifying anything in `/resume/`. These rules exist because date errors on resumes are a serious failure mode and have already caused friction in this project.

## CRITICAL: Dates are not negotiable

1. **`FACTS.md` is the single source of truth for all employment and project dates.**
2. **Never** guess, interpolate, or "fill in" a date from context, conversational hints, or the prior version of a resume. If a date isn't in `FACTS.md`, **stop and ask the user**.
3. To change a date: update `FACTS.md` first, propagate to `build-resume.mjs` and `cover-letter.mjs` second.
4. If two facts conflict (e.g., `FACTS.md` says one thing, the user says another in chat), the user's explicit instruction wins — but **update `FACTS.md` immediately** so the next session inherits the correction.
5. Treat the ⚠️ "Needs verification" markers in `FACTS.md` as blockers. Don't ship a resume to a real application until those are resolved.

## Other invariants (do not undo without explicit user direction)

- **No phone number** on the resume.
- **No graduation year**, no education section (self-taught framing).
- **No** "15+ years", "since 2016", "Storybook 8+", "React 18+", "AI Expert" — these are age and staleness signals already flagged for removal.
- **Verizon role removed** — do not re-add. User decision based on the engagement quality.
- **FaceCake and EPCVIP rolled into "Earlier experience"** — not re-listed as discrete entries unless the user explicitly directs it for a role where browser-AR / computer-vision credentials matter (e.g., the Flick application).
- **Pull-quote at the top** — Matt Stephenson (Director of Engineering, Redesign Health) "speak design" quote stays as the lede. Don't move or remove without user direction.
- **US Letter, Arial, ATS-safe** — no tables for content, no images, no fancy fonts.

## Layout invariants

- **Single page preferred, two pages acceptable.** Three or more = strip something.
- **Section spacing** has been deliberately tuned — see `build-resume.mjs` for the values. If a user asks for "more breathing room" or "tighter," adjust those constants, don't add ad-hoc paragraph spacing.

## Cover letters

- Each cover letter in `cover-letter.mjs` is a structured object — keep the schema consistent across letters.
- **No restating the resume verbatim.** Cover letters should pull the resume forward, not duplicate it.
- **Always preserve the "honest note on fit" pattern** if the user is writing toward a role with adjacent-but-not-perfect alignment. Be specific about what they HAVE done vs. what they HAVEN'T. Never overclaim. Never undersell.

## When in doubt

Stop. Ask the user. A 30-second clarification is cheaper than a date mismatch that fails a background check.
