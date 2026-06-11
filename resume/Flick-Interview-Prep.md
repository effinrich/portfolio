# Flick — CEO Interview Prep

**Interview:** Sunday with Ray Wang, CEO/co-founder of Flick (flick.art)
**Stage:** Just-funded Seed ($6M, announced May 14, 2026)
**Source:** Ray tapped you directly. This is inbound, not a cold application.
**Likely format:** 30–60 min, conversational, single-panel. At seed, CEO interviews are about chemistry, motivation, ambiguity tolerance, and whether the CEO wants you next to them for five years. Less a tech screen than a "do we click" call.

---

## 0. ⚡ This Is Inbound — Read This First

**Ray reached out to you directly.** That fundamentally changes Sunday's dynamic. You are not pitching a stranger. You are confirming a fit with someone who already wants to talk to you.

What this changes:

1. **"Why us" gets easier.** You don't have to manufacture interest. The honest answer is _"you reached out, that got my attention, then I looked deeper and the product space is exactly where I want to spend the next decade."_ Lean on that.
2. **Lead with curiosity, not pitch.** Within the first 10 minutes, ask: _"What made you reach out to me specifically? Was it ForgeKit, the design-engineering arc, something else?"_ His answer tells you which beats to lean on for the rest of the call.
3. **You have more leverage than the posted band suggests.** A $100K–$200K JD is what they put on a public board. A direct CEO tap is them saying _"we'd pay above band for the right person."_ When comp comes up later, do not anchor low. (See updated comp question below.)
4. **This is mutual screening.** Sunday is also your call to decide if you want Ray as your founder for the next five years. Listen for: how he answers hard questions, whether he name-drops Zoey and the team or only himself, whether he's specific or vague about the product roadmap, whether he asks _you_ good questions back.
5. **Contrast with Flockjay.** Flockjay was a paragraph to their head of product — low-touch, you-after-them. Flick is a CEO tap — them-after-you. Different power dynamic. Optimize Sunday accordingly.

**Carry into the call:** warm, curious, prepared — but _not seeking approval_. You're already inside the funnel. Most of Sunday is about whether _you_ want to walk further in.

---

## 1. Company Brief

### What they're building

Flick is an AI-native filmmaking platform that gives filmmakers cinematic control over generative video. Their pitch back: **"Figma + Cursor for AI filmmaking."** Non-linear workflow, iterative creative loop, multi-model under the hood. Tagline on the site: **"We handle AI. You direct stories."**

### Founders

- **Ray Wang — CEO, co-founder.** Founding engineer at Instagram. Design-sensitive eng leader who has lived the design/engineering boundary at IG-scale. Will care deeply about the quality of UI craft, the calibre of the design-engineering relationship, and whether you can ship without an army.
- **Zoey Zhang — co-founder, creative.** Award-winning filmmaker. Runs the Flick Filmmaker Residency cohorts. She's the domain authority — Ray is the product/eng authority.

### Funding & timing

- **$6M Seed closed May 14, 2026** — the round literally landed yesterday.
- **Lead:** True Ventures. **Co-investors:** GV (Google Ventures), YC, Lightspeed, Formosa Capital, Pioneer Fund, Olive Tree Capital, N1, plus angels.
- Founded 2025 in Newark. Small team. The Seed round just unlocked hiring, which is why they're talking to you on a _Sunday_.

### What they're hiring for (your read on it)

Based on a likely Flick post that surfaced in the curator: **Senior FE Engineer · US Remote · $100K–$200K · "build next-gen AI filmmaking tools, developing high-performance editor interfaces like canvas, timeline, and visual workflows."**

Read between the lines: they need someone who can build a **performant canvas + timeline editor in React** that talks to AI generation pipelines without dropping frames. The seat is sized senior-to-staff IC. At seed stage, the title is whatever you negotiate — Ray will care about scope and impact, not the word on the door.

### Market & competitors

- **Generative video model providers:** Runway, Pika, Sora, Google Veo, Luma. Flick sits on top of these (probably multi-model under the hood) and competes on **UX, control, and iteration loop** — not on the underlying model.
- **Adjacent UX patterns:** Figma (collaborative canvas, multiplayer), tldraw, Excalidraw (canvas), Final Cut / Premiere (timeline). Flick is fusing those mental models.
- **What's unique:** "cinematic control" — filmmakers want to direct _non-linearly_ with knobs that mean something to a director (shot, beat, scene), not prompts that mean nothing.

### Why this is interesting for _you_

Three sharp alignments worth saying out loud in the call:

1. **NARS AR ($400K/mo) was generative creative tooling.** You've been building gen-creative interfaces since browser AR existed in JavaScript. That's a 15-year arc into Flick's product space — not a pivot.
2. **ForgeKit is the same loop, different domain.** Flick = "Figma + Cursor for filmmaking." ForgeKit = "Figma + Cursor for design systems." You're already shipping the canonical version of their UX pattern in a different vertical.
3. **You speak design-and-engineering.** Ray was at IG. He lived the design-eng boundary at one of the most design-driven products on earth. The Matt Stephenson quote on your resume is exactly the trait he hires for.

---

## 2. Likely CEO Questions (with what they're really probing for)

A seed-stage CEO will spend most of the time on the _first column_ questions. Have 60–90 second answers ready for each.

### Motivation & narrative

**1. "Walk me through your background."**

> _Probing:_ arc clarity. Can you compress 15 years into a story with a thesis? Does it lead naturally to _us_?
> _Land:_ "I've spent 15 years on the design-engineering boundary. Started with browser AR for NARS — $400K/mo from a try-on app. Spent the last decade building React design systems at scale. Now I'm building AI-native developer tooling at the same boundary with ForgeKit. Flick is the same problem space — creative tooling for AI, with cinematic control — and that's exactly where I want to spend the next decade."

**2. "Why Flick? Why now?"**

> _Probing:_ did you read the room. Did the $6M news register. Do you actually care about filmmaking or do you just want a job?
> _Land (inbound version):_ "Honestly — you reached out, which got my attention, and then I looked deeper. Three things landed: the Seed close yesterday says the market's bought the vision, the canvas/timeline + AI loop is the exact UI problem I've been working in via ForgeKit, and the fact that you came from IG and Zoey's a filmmaker means both sides of the design-eng-creative triangle are real on the founding team. That's not common."

**3. "What are you optimizing for in your next role?"**

> _Probing:_ are you compensation-mercenary, title-mercenary, or mission-real. They want mission-real with realistic comp expectations.
> _Land:_ "Scope and ownership over title. Working at the design-engineering boundary on something I'd build anyway. Seed stage is a feature, not a bug — I want to set the bar for the FE codebase before anyone else does."

### Story / proof of craft

**4. "Tell me about something you built that you're most proud of."**

> _Probing:_ depth. Can you talk about one thing for 5 minutes with technical specificity?
> _Land:_ **ForgeKit, the recursive proof.** Lead with "ForgeKit scaffolded ForgeKit." Walk through the MCP architecture (Figma tokens in, Storybook metadata out, agent-callable). Land on the 5,703 install number. _Have a follow-up demo URL or repo handy if asked._

**5. "Walk me through the hardest technical problem you've solved recently."**

> _Probing:_ depth + judgment. Are you a deep engineer or a surface engineer?
> _Land:_ Pick ONE — either (a) ForgeKit MCP server design (interesting if they care about agents), or (b) the 40% rendering-overhead reduction at Redesign Health (interesting if they care about canvas perf, which they will). For Flick, **lean perf.** Walk through the custom-hooks-and-Zustand refactor on data-viz components — that's the muscle that matters for timeline/canvas.

**6. "Tell me about a time you disagreed with a designer or PM and held the line."**

> _Probing:_ are you a yes-engineer or do you have a point of view. CEOs at design-heavy startups want engineers who push back on bad design constructively.
> _Land:_ Use the Redesign Health fixture-based mock API story OR a Freebird design-system pushback. Show how you held the line _with_ the relationship intact.

### Ambiguity & ownership

**7. "What's the first thing you'd do in this role in the first 30 days?"**

> _Probing:_ do you have a real ramp-up instinct or are you waiting for a JIRA ticket.
> _Land:_ "Pair with Ray and a filmmaker for a week. Watch the actual workflow, not the marketing video. Find the three places the canvas drops frames or the timeline lies about state. Ship a fix for the worst one in week two so the team knows what to expect from me."

**8. "How do you make decisions when there's no clear right answer?"**

> _Probing:_ are you decisive without being reckless.
> _Land:_ "Reversibility test first — if I can ship and undo in a day, I ship. If the decision compounds (architecture, schema, type contracts), I write the smallest possible doc, ask one other engineer to red-team it, then commit. Don't let perfect block motion."

**9. "How do you handle a hard week where you fall behind?"**

> _Probing:_ will you hide, or will you raise the flag.
> _Land:_ short, specific story. Raise the flag early, scope-cut, communicate to stakeholders, finish.

### Tech-screen-flavor (be ready, might not come)

**10. "How would you architect a real-time collaborative canvas + timeline editor in React?"**

> _Land:_ virtualization for the canvas (don't render off-screen clips), CRDT or operational-transform for collab state (Yjs/Liveblocks/Replicache class), web workers for any heavy non-UI work, structured event bus between the AI-generation pipeline and the timeline. Be honest about what you'd need to research — you haven't built a full collab canvas, but you've built perf-critical React at scale and you can name the primitives.

**11. "How do you think about AI-pipeline state in a UI?"**

> _Land:_ AI generation is async, long-running, expensive, and failable. Treat it like a job system: queue → in-flight → result, with optimistic UI that the user can cancel or remix. TanStack Query for the boring parts. Custom state for the long-lived AI jobs.

**12. "What's your take on Storybook in 2026 — still worth it?"**

> _Probing:_ are you a tools dogmatist or a tools pragmatist.
> _Land:_ "Yes, but only where it earns its keep — a real design system or a complex component library. For a 5-component app it's overkill. Flick at seed stage probably wants Storybook the moment you have a second engineer touching the canvas chrome — sooner than most teams realize."

### Leadership / scale

**13. "Tell me about a time you ran a team. What did you change about how you led?"**

> _Probing:_ this is where the double-promotion arc earns its keep. Have a clean story.
> _Land:_ Redesign Health double-promotion. Onboarding methodology (Storybook + feature-arch + custom hooks) that took 2 backend engineers to production React in a month. The lesson: structure beats talent at scale.

**14. "Are you looking for IC or management?"**

> _Probing:_ clarity. Don't say "both" — that signals indecision.
> _Land:_ "Staff IC, with the understanding that at seed stage IC and lead aren't really separable. I've done both — happy to mentor and run 1:1s when the team grows, but I'm here to ship code first."

### Closing / pitch back

**15. "What questions do you have for me?"**

> _Probing:_ did you do homework, do you have founder-grade instincts, are you serious.
> _See "Questions to Ask Ray" below._

**16. "What would make you say no to this role?"**

> _Probing:_ are you honest. They want a real answer.
> _Land:_ "If the FE is treated as a thin wrapper over the AI pipeline. I want to work somewhere the UI is the product, not the chrome. The fact that you're hiring a canvas/timeline lead at seed tells me you already get this — I'd just want to confirm it on the team."

### Compensation

**17. "What are you looking for, comp-wise?"**

> _Probing:_ are you in the band, are you reasonable.
> _Land (inbound version — DO NOT anchor low):_ The posted band was $100K–$200K, but that's the public board number. A direct CEO tap means they're prepared to pay above band. Don't volunteer a number first; flip it:
> _"I'd love to hear your equity philosophy before naming a base — at seed, the equity story tells me more about how you think than the salary does. That said, I'm targeting senior IC compensation that reflects the depth I bring on AI tooling and design systems — top of band on cash, plus equity that reflects coming in pre-PMF as one of the early FE hires."_
> If pressed for a number anyway: **$190–220K base, 0.75–1.5% equity** (higher end if you're FE hire #1–2). Frame the equity as the leverage point, not the base.

---

## 3. Questions to Ask Ray (Pick 4–5)

Asking sharp questions is how you close. These are sorted from "founder-grade" to "table-stakes."

**Ask this first — it's the highest-leverage question of the call.**

0. _"Before we go deep — what made you reach out to me specifically? Was it ForgeKit, the design-engineering arc, something else?"_ — His answer tells you which of your beats to weight for the rest of the conversation. If he says "ForgeKit," talk MCP and dogfooding. If he says "design-engineering," talk Freebird liaison + the Stephenson quote. If he says "Redesign Health," talk perf and the Director arc. This question alone is worth the prep.

**Founder-grade** _(ask these next — they signal you've done homework)_

1. _"Now that the round just closed, what does the first six months look like? What needs to be true at the end of the year for the Series A?"_ — Forces him to share strategy. You'll hear exactly what they're staffing toward.

2. _"You came from Instagram. What did IG get right about design-engineering that you're trying to bring to Flick, and what are you deliberately doing differently?"_ — Founder questions. He'll love this. You're inviting him to talk about his proudest work and his thesis simultaneously.

3. _"Zoey's a filmmaker. How tight is the feedback loop between the engineering team and the filmmaker residency? Where do those two cultures rub against each other?"_ — Shows you understand the org dynamic.

4. *"What's the highest-leverage thing your current FE team is *not* doing because no one has the bandwidth?"* — Lets him talk about the gap you'd fill. Functions as a self-interview.

**Strong middle questions**

5. _"Where's the canvas/timeline editor today? Is it in production, prototype, or whiteboard?"_ — Reality check on what you're actually walking into.

6. _"How do you think about the multi-model layer? Which generation providers are you wrapping today, and what's the abstraction over them?"_ — Probes their tech stack without being pushy.

7. _"Who else has been hired or is in the funnel? What's the eng team going to look like in 3 months?"_ — Tells you whether you'd be #1 or #5 on FE, which changes the equity math.

**Operational / closing questions**

8. _"How do you make decisions when the eng team and the creative team disagree? Walk me through a recent example."_ — Cultural probe.

9. _"What does success look like for this role at 90 days, 6 months, and 1 year?"_ — Forces him to articulate a real ramp.

**Don't ask** (these are weak / table-stakes / signal junior)

- Health/benefits/PTO (HR handles this — don't burn a CEO question on it)
- Remote policy (you're remote; assume it works)
- "What's the culture like?" (vague, signals you didn't research)

---

## 4. Red & Green Flags — What to Listen For in Ray's Answers

You are also screening him. Most candidates forget this part. While he answers your questions in Section 3, listen actively for these signals.

### 🟢 Green flags (lean in)

- **Names specifics.** Says "Runway's at this, Pika's at this, Sora's at this — we're different because X." Generic "we're disrupting video" is hand-wave; specific positioning is rigor.
- **Talks about Zoey, the residency, design partners.** Founders who only say "I" are red. Founders who say "we, Zoey, our filmmakers, our team" are real.
- **Comfortable saying "I don't know yet."** Especially on roadmap specifics or technical bets. Honest uncertainty > confident BS.
- **Has a real answer on the multi-model layer.** Knows which generation providers they wrap, what they own vs. rent, what the abstraction looks like. Vague answers here are dangerous — it's their core dependency.
- **Has a thoughtful answer on AI unit economics.** Generation is expensive. If he hand-waves margin and cost, that's a runway problem you'd inherit. Good answer mentions cost-per-render, caching, model tiering, or pricing strategy.
- **Asks YOU sharp questions back.** A CEO who doesn't ask good questions of senior candidates is not rigorous enough. Watch for: specifics on your stack choices, follow-ups on ForgeKit, probes on how you'd ship a hard tradeoff.
- **References specific creative tools by name.** Figma, Premiere, DaVinci, Excalidraw, tldraw, Linear, Notion — vocabulary matters. He should be literate in the design + creative tool space he's competing in.
- **Concrete first-90-days answer.** "Pair with Zoey, ship the timeline-state refactor, get our render queue off the critical path." Not "see where you can help."
- **Mentions accessibility, quality, or design craft.** Not just velocity. Founders who only optimize speed under-invest in everything that compounds.
- **Knows your work specifically.** Mentions a ForgeKit package name, the Stephenson quote, a specific bullet on your resume. Means he read it. _Not_ "I saw your background and it looked great" — that's pre-read code for _I haven't actually read it._

### 🔴 Red flags (slow down, ask harder questions, or pass)

- **Vague on the roadmap.** Can't articulate what needs to be true by end of year for Series A. Cofounders who haven't aligned on this are pre-aligned, not aligned.
- **CEO-only language.** Everything is "I built, I shipped, I decided." No "we." No mention of Zoey on product decisions. That's a culture preview.
- **Can't differentiate from Runway / Pika / Sora.** If "cinematic control" is the differentiator, he should be able to define it in one sentence with examples.
- **"We move fast" is the entire culture answer.** Code for "we don't sleep, we don't sustain, we don't document." Probe with: "How do you protect against burnout when the team is small?"
- **No self-aware miss.** Ask "what did the eng team get wrong recently?" — if he can't name something, he either isn't paying attention or isn't honest about it.
- **Calls engineers "rockstars" or "10x" unironically.** Cultural tell. Real seniors hate that vocabulary.
- **Hand-waves cost / burn / runway.** $6M is real money but burnable. If he can't tell you the team size at month 12 with a straight face, he doesn't know.
- **"You'd report to me directly" with no FE lead plan.** At seed that's fine for #1 hire, but probe — is he planning to hire above you in 6 months? Will he respect your judgment, or override?
- **Pushes you to decide fast.** Senior offers should give you a week. "We need to know by Tuesday" 48 hours after a first call is a leverage play, not urgency.
- **Talks about Ray more than the product.** Founder ego is a real risk multiplier at seed. You want someone proud of the team and the work, not of themselves.
- **No mention of design.** Their product is a creative tool. If he doesn't talk about visual quality, motion, or craft, the FE seat won't be respected.
- **Equity philosophy is opaque.** "We'll figure it out" or "we're being thoughtful" without specifics means they haven't actually thought about it. Ask for: typical refresh cadence, vesting cliff, secondary policy.

### 🤔 Gray zone (probe, don't write off)

- He didn't read your resume deeply → ask "what got you to reach out?" _(your Question 0 covers this)_
- He's hesitant on comp → not necessarily a red flag; could be process. Ask when comp would be discussed and who decides.
- He emphasizes urgency → could be authentic startup energy, could be a leverage tactic. Ask: "What's driving the timeline for this hire?"
- He doesn't have a specific role title yet → fine at seed. Title is your negotiation surface. The question is whether scope is clear.

### Closing read

You're looking for **a founder who is clear-eyed, specific, collaborative, and curious** — someone who will let you do your best work and tell you when you're wrong. The Stephenson quote on your resume is the trait _you_ hire founders for. Look for it in Ray.

If by minute 45 you have 4+ green flags and 0–1 red, this is real. If it's 1–2 greens and 2+ reds, that's a "next steps" call, not a "let's get you talking to the team" call.

---

## 5. Story-to-Role Map

For each story you tell, know what it's _for_. Don't waste a story on the wrong question.

| Story                                      | Use it when they ask…                         | What it proves                                                                |
| ------------------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------- |
| **NARS AR — $400K/mo**                     | Why this space? Early career?                 | You've been doing generative creative tools for 15 years. This isn't a pivot. |
| **ForgeKit recursion**                     | What are you proud of? Cool hacks?            | Deep eng curiosity, dogfooding instinct, MCP fluency                          |
| **ForgeKit MCP servers + 5,703 installs**  | Why are you credible on AI tooling?           | Production adoption signals, not just side-project signals                    |
| **Redesign Health 40% perf win**           | Hard technical problem? Canvas/timeline perf? | You can ship the React perf muscle Flick needs                                |
| **Redesign Health double-promotion**       | Leadership story?                             | You can scale, but you're not asking for an MGR title                         |
| **Redesign Health onboarding methodology** | How do you scale yourself?                    | You've built systems to teach others, not just code                           |
| **Redesign Health mock-API fixture demo**  | Trade-offs under deadline?                    | You ship under pressure, with judgment                                        |
| **Freebird 200-component RN library**      | Design-system breadth?                        | You've operated at scale — IG-scale primitives don't scare you                |
| **Freebird design-eng liaison**            | Disagreement with design?                     | You navigate the design-eng boundary professionally, the Ray-instinct trait   |
| **Pineapple 100K-user RN perf**            | Mobile / cross-platform?                      | RN is a real skill, not a buzzword                                            |
| **PHC Global gRPC + Nx 0→1**               | Founding-engineer instincts?                  | You've shipped from zero, with backend depth                                  |
| **Verizon NDA enterprise work**            | Working under constraint?                     | You operate in environments without context-leakage                           |
| **Mercor / micro1 LLM benchmark work**     | AI/frontier-model fluency?                    | You understand frontier-model evaluation from the inside                      |

---

## 5. The Night Before

A short, brutal pre-flight checklist. Hit all of these Saturday:

- [ ] **Re-read the Flick landing page** at flick.art. Watch any product demo video twice. Make sure you can name the actual UI primitives in the product (scenes? shots? clips? canvas? timeline?). Don't use the word "video" — use _their_ vocabulary.
- [ ] **Read the BusinessWire $6M Seed announcement.** Know the lead investor (True Ventures), at least 3 co-investors, and the angle of the announcement copy.
- [ ] **Spend 10 minutes on Ray's LinkedIn and X/Twitter.** What does he repost? What does he write about? Reflect 1–2 of those themes back during the conversation.
- [ ] **Same for Zoey** — even though she's probably not in the call, you should know enough to name-drop respectfully if it comes up.
- [ ] **Have your demo URLs in a tab:** forgekit.cloud, npmjs.com/~effinrich (or your packages page), one ForgeKit repo. If he asks, you screenshare or paste in the chat.
- [ ] **Test your camera, mic, and lighting** at the time of the call (Sunday's light is different from Saturday's). Test your headphones. Have water within reach.
- [ ] **Have a clean notebook open** (paper, not Notes — looks better on camera). Write down questions as he answers them.
- [ ] **Cold-read this prep doc one more time Sunday morning.** Don't memorize answers — internalize the _beats_.

---

## 6. Bonus: Flockjay (Lighter Read)

Flockjay is sales-enablement / coaching SaaS. Founded by Shaan Hathiramani. YC alum. Series A-ish. Their product is the opposite end of the spectrum from Flick — content-heavy, multi-tenant, dashboard-driven, mature stage.

If Flockjay is a real Plan B, the prep would lean on **Freebird's 200-component B2B/B2C library** and the **Redesign Health design system + onboarding methodology**. Less "ship the canvas," more "scale the platform." Different story, same engineer.

Say the word and I'll write a full Flockjay prep doc too — but Flick first.

---

_Built Friday night. Update with anything Ray says on the call so we can use it for follow-up._
