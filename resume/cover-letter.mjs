// Builds RichTillman_CoverLetter_<id>.docx for each entry in LETTERS below.
// Single source of truth for every cover letter. Edit data, regenerate.
//
// ════════════════════════════════════════════════════════════════════
//  STOP — READ BEFORE MODIFYING ANY DATE OR NARRATIVE CLAIM
// ════════════════════════════════════════════════════════════════════
//  Dates referenced in any letter MUST match ./FACTS.md.
//  Claims about employers, products, or accomplishments MUST match
//  the same source of truth as the resume.
//  Never overclaim. Never undersell. Never guess.
//  See ./CLAUDE.md for the full operating rules.
// ════════════════════════════════════════════════════════════════════
//
// Run:
//   cd resume
//   node cover-letter.mjs           # generates ALL letters
//   node cover-letter.mjs workos    # generates just the one with id=workos
//
// Adding a new letter: copy the WorkOS block in LETTERS, change id/company/body.
//
// Output files land in this folder.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  AlignmentType,
  LevelFormat,
  BorderStyle,
  TabStopType,
  TabStopPosition,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ────────────────────────────────────────────────────────────────────
// SHARED HEADER (matches build-resume.mjs so docs read as a set)
// ────────────────────────────────────────────────────────────────────

const HEADER = {
  name: "RICH TILLMAN",
  title: "Principal Frontend Engineer · Design Systems · AI Developer Tooling",
  contacts: [
    { label: "Atlanta, GA" },
    { label: "richtillman@pm.me", href: "mailto:richtillman@pm.me" },
    { label: "linkedin.com/in/effinrich", href: "https://linkedin.com/in/effinrich" },
    { label: "github.com/effinrich", href: "https://github.com/effinrich" },
    { label: "richtillman.xyz", href: "https://richtillman.xyz" },
    { label: "forgekit.cloud", href: "https://forgekit.cloud" },
  ],
};

// ────────────────────────────────────────────────────────────────────
// LETTERS (add objects to this array per application)
// ────────────────────────────────────────────────────────────────────

const LETTERS = [
  {
    id: "workos",
    company: "WorkOS",
    // Optional: overrides today's date. Leave undefined to auto-stamp.
    date: undefined,
    greeting: "Hi WorkOS team,",
    paragraphs: [
      "You build Radix, and you power the enterprise stack for Cursor, Perplexity, Vercel, and OpenAI. That's a rare combination — world-class UI primitives on one side, the infrastructure layer for the companies defining modern dev tooling on the other — and it's the reason this role jumped to the top of my list.",
      "I'm a Principal Frontend Engineer focused on design systems and AI developer tooling, most recently Engineering Director at Redesign Health. For the past year my primary focus has been ForgeKit — an AI-driven CLI scaffolding platform with a TypeScript SDK suite and an MCP server that exposes component scanning, Storybook inspection, design token extraction, and scaffolding as agent-callable tools. Across its packages it has ~5,700 external npm installs. The core idea: bridge Figma → code → Storybook so design systems stay coherent as teams scale, and make the whole pipeline agent-callable. ForgeKit scaffolded ForgeKit, which is the recursive proof point I keep coming back to.",
    ],
    bulletIntro: "Where I think I map onto the role:",
    bullets: [
      {
        label: "Raising the UI bar.",
        body: "The headless-primitive philosophy Radix embodies — accessibility and behavior as a contract, styling as a separate concern — is the model I've spent years building tooling around. ForgeKit's docs site (dark industrial, amber/flame, JetBrains Mono + Syne) and recent dashboard work in Spoke AI Canvas (AI-native design tool) and a property management app (Chakra v3, shadcn/Tailwind) are where I'd point for taste evidence.",
      },
      {
        label: "Component patterns for product engineers.",
        body: "This is exactly what ForgeKit's CLI tiers, Storybook MCP server (12 tools), and Figma Code Connect integrations are designed to enable. The thing I optimize for is letting product engineers ship features without re-litigating primitives.",
      },
      {
        label: "Agent identity is the real frontier.",
        body: "Your framing of “who are your agents, and what are they allowed to do” is something I think about constantly from the tool-builder side. Every MCP server is a small identity-and-permissions problem in disguise, and I'd love to be on the side of the table actually solving it.",
      },
      {
        label: "Accessibility.",
        body: "WCAG 2.1 AA is a non-negotiable in my standing engineering principles, not an afterthought.",
      },
      {
        label: "Public representation.",
        body: "I can carry the voice externally — docs, blog posts, design system resources, conference talks. ForgeKit's docs and LinkedIn presence are mostly my work.",
      },
    ],
    closing: [
      "One honest note on fit: I've shipped B2B applications with auth integrations — Auth0, Clerk, NextAuth, OAuth flows — across Freebird, EPCVIP, and Redesign Health. What I haven't built is the primitive layer itself (SCIM provisioning, federated SSO protocol implementations, fine-grained authorization engines). The role itself reads as frontend architecture, component patterns, and developer experience — squarely where I'm strongest — and I go deep on adjacent domains quickly.",
      "Happy to walk through ForgeKit, the MCP server architecture, or any of the design system work in more detail. Thanks for the consideration.",
    ],
    signoff: "Rich",
  },

  {
    id: "prizepicks",
    company: "PrizePicks",
    greeting: "Hi PrizePicks team,",
    paragraphs: [
      "Thanks for the reach-out. The combination of category-defining scale (10M+ members), a product that lives or dies by mobile UX, and an Atlanta home base hit me at the right moment — I'm in Atlanta and squarely in the React Native space you're hiring for.",
    ],
    bulletIntro: "Quick context on why I think this is a real match for the Checkout & Gameplay role:",
    bullets: [
      {
        label: "Deep React Native depth across production scale.",
        body: "Freebird (200-component cross-platform system spanning B2B, B2C, and native — the React Native extension eliminated the need for separate iOS/Android teams), Pineapple Corporation (Expo + Nx monorepo, 100K+ users, 25% iOS/Android performance gain), and currently Tidy App — an offline-first ADHD-friendly RN/Expo app with Zustand + TanStack Query optimistic UI, Supabase, and RevenueCat subscriptions, in TestFlight beta now.",
      },
      {
        label: "TypeScript strict, Expo/EAS, and monorepo workflows native to me.",
        body: "EAS Build pipelines, OTA updates, Jest for components, Playwright for e2e, and comfortable adopting Maestro. Yarn workspaces, pnpm, or Nx — I've used all three; the monorepo pattern transfers cleanly.",
      },
      {
        label: "AI-assisted development as a discipline, not a shortcut.",
        body: "This is your “What Makes You Stand Out” line and it's where I lean in hard. For the past year my focus has been ForgeKit — an AI-driven CLI and MCP server suite (5,703+ external npm installs) bridging Figma → React → Storybook with scoped, typed agent tools. The process I run on teams: collaborative planning, repo-pinned rules, strict TypeScript/lint/test gates. AI accelerates throughput; it doesn't lower the quality bar.",
      },
      {
        label: "Mobile performance, accessibility, and observability as standing principles.",
        body: "WCAG 2.1 AA, crash reporting, performance monitoring, bundle-size budgets — how I architect from day one, not add-ons.",
      },
      {
        label: "Mentorship and technical direction.",
        body: "Double-promoted to Engineering Director at Redesign Health; ran technical direction across 3 cross-functional teams (15+ engineers) while staying hands-on. Engineered a proprietary onboarding methodology that trained 2 backend engineers to production-level React in 1 month. Comfortable carrying IC work and mentorship of SE I/II/III together.",
      },
    ],
    closing: [
      "One open thread I'd surface early: the role is titled Senior with a band aligned to strong Senior IC. My recent trajectory (Engineering Director at Redesign Health, currently founding ForgeKit) reads at Staff/Principal. I'm not precious about title, but I'd want to confirm the level and scope match the value I'd bring. Happy to talk through where I'd plug in best on Checkout & Gameplay.",
      "Atlanta-based, immediately available, and excited to talk. Thanks again for the inbound.",
    ],
    signoff: "Rich",
  },
];

// ────────────────────────────────────────────────────────────────────
// STYLES & HELPERS
// ────────────────────────────────────────────────────────────────────

const FONT = "Arial";
const BODY_SIZE = 22; // 11pt (slightly larger than resume for readability)
const NAME_SIZE = 36; // 18pt
const ACCENT_BORDER = {
  bottom: { style: BorderStyle.SINGLE, size: 6, color: "888888", space: 4 },
};

function bodyRun(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: BODY_SIZE, ...opts });
}

function hyperlink(label, href) {
  return new ExternalHyperlink({
    link: href,
    children: [
      new TextRun({ text: label, font: FONT, size: BODY_SIZE - 2, style: "Hyperlink" }),
    ],
  });
}

function buildHeader() {
  const headerName = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: HEADER.name,
        font: FONT,
        size: NAME_SIZE,
        bold: true,
        characterSpacing: 40,
      }),
    ],
  });

  const headerTitle = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({ text: HEADER.title, font: FONT, size: BODY_SIZE - 2 }),
    ],
  });

  const contactChildren = [];
  HEADER.contacts.forEach((c, i) => {
    if (i > 0) {
      contactChildren.push(
        new TextRun({
          text: "  ·  ",
          font: FONT,
          size: BODY_SIZE - 2,
          color: "888888",
        }),
      );
    }
    if (c.href) {
      contactChildren.push(hyperlink(c.label, c.href));
    } else {
      contactChildren.push(
        new TextRun({ text: c.label, font: FONT, size: BODY_SIZE - 2 }),
      );
    }
  });

  const headerContacts = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    border: ACCENT_BORDER,
    children: contactChildren,
  });

  return [headerName, headerTitle, headerContacts];
}

function todayLong() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildDateLine(date) {
  return new Paragraph({
    spacing: { after: 200 },
    children: [bodyRun(date || todayLong())],
  });
}

function buildGreeting(text) {
  return new Paragraph({
    spacing: { after: 160 },
    children: [bodyRun(text)],
  });
}

function buildBodyParagraph(text) {
  return new Paragraph({
    spacing: { after: 200 },
    children: [bodyRun(text)],
  });
}

function buildBulletIntro(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [bodyRun(text)],
  });
}

function buildBullet({ label, body }) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 100 },
    children: [
      new TextRun({ text: label + " ", font: FONT, size: BODY_SIZE, bold: true }),
      bodyRun(body),
    ],
  });
}

function buildSignoff(name) {
  return [
    new Paragraph({ spacing: { after: 60 }, children: [bodyRun("Thanks,")] }),
    new Paragraph({ spacing: { after: 0 }, children: [bodyRun(name)] }),
  ];
}

// ────────────────────────────────────────────────────────────────────
// BUILD ONE LETTER
// ────────────────────────────────────────────────────────────────────

function buildLetterDoc(letter) {
  const children = [
    ...buildHeader(),
    buildDateLine(letter.date),
    buildGreeting(letter.greeting),
    ...letter.paragraphs.map(buildBodyParagraph),
  ];

  if (letter.bulletIntro) children.push(buildBulletIntro(letter.bulletIntro));
  if (letter.bullets?.length) children.push(...letter.bullets.map(buildBullet));
  if (letter.closing?.length) children.push(...letter.closing.map(buildBodyParagraph));

  children.push(...buildSignoff(letter.signoff || "Rich"));

  return new Document({
    creator: "Rich Tillman",
    title: `Rich Tillman — Cover Letter — ${letter.company}`,
    styles: {
      default: { document: { run: { font: FONT, size: BODY_SIZE } } },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 360, hanging: 240 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 }, // US Letter
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });
}

// ────────────────────────────────────────────────────────────────────
// CLI
// ────────────────────────────────────────────────────────────────────

const filter = process.argv[2];
const queue = filter ? LETTERS.filter((l) => l.id === filter) : LETTERS;

if (!queue.length) {
  if (filter) {
    console.error(`No letter with id="${filter}". Available: ${LETTERS.map((l) => l.id).join(", ")}`);
    process.exit(1);
  }
  console.error("LETTERS is empty. Add an entry to the array.");
  process.exit(1);
}

for (const letter of queue) {
  const doc = buildLetterDoc(letter);
  const outName = `RichTillman_CoverLetter_${letter.company.replace(/\s+/g, "")}.docx`;
  const outPath = path.join(__dirname, outName);
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  console.log(`✓ Wrote ${outName} (${buffer.length} bytes)`);
}
