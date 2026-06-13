// Builds RichTillman_Resume.docx from structured content below.
// Single-file, ATS-safe, US Letter, Arial, no fancy tricks.
//
// ════════════════════════════════════════════════════════════════════
//  STOP — READ BEFORE MODIFYING ANY DATE
// ════════════════════════════════════════════════════════════════════
//  All employment/project dates in this file MUST match ./FACTS.md.
//  NEVER guess a date. NEVER interpolate from chat context.
//  If a date is missing or ambiguous, stop and ask the user.
//  Date errors on resumes fail background checks. Be paranoid.
//  See ./CLAUDE.md for the full operating rules.
// ════════════════════════════════════════════════════════════════════
//
// Run:
//   cd resume
//   bun add docx
//   bun run build-resume.mjs
//
// Output: ./RichTillman_Resume.docx (same folder)
//
// For PDF: open the .docx in Word / Google Docs / Pages → Save as PDF.
// Or with LibreOffice CLI: soffice --headless --convert-to pdf RichTillman_Resume.docx

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
  HeadingLevel,
  LevelFormat,
  BorderStyle,
  TabStopType,
  TabStopPosition,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ────────────────────────────────────────────────────────────────────
// CONTENT (edit here, regenerate the .docx)
// ────────────────────────────────────────────────────────────────────

const HEADER = {
  name: "RICH TILLMAN",
  title: "Principal Frontend Engineer · Design Systems · AI Developer Tooling",
  contacts: [
    { label: "Remote · USA" },
    { label: "richtillman@pm.me", href: "mailto:richtillman@pm.me" },
    { label: "linkedin.com/in/effinrich", href: "https://linkedin.com/in/effinrich" },
    { label: "github.com/effinrich", href: "https://github.com/effinrich" },
    { label: "richtillman.xyz", href: "https://richtillman.xyz" },
    { label: "forgekit.cloud", href: "https://forgekit.cloud" },
  ],
};

const PULL_QUOTE = {
  text:
    "Rich can “speak design” in a way that few engineers can — he can explain the engineering to design and the design to engineering. We have hardcore data engineers working productively on intricate styling problems, all on the rails Rich laid down.",
  attribution: "Matt Stephenson, Director of Engineering, Redesign Health (2023 review)",
};

const SUMMARY =
  "Senior/Principal Frontend Engineer with 15+ years shipping production React UI apps and design systems at scale. Modern stack throughout — React 19, TypeScript 5.x, TanStack Router, TanStack Query, Tailwind CSS 4, Figma + Figma Code Connect. Double-promoted to Engineering Director at Redesign Health, building a 50+ component design system that cut team dev-time 30%. Shipped a 200-component React/React Native library at Freebird and a $400K/mo browser-based AR app for NARS Cosmetics. Creator of ForgeKit, an MCP toolchain (5,703+ npm installs) bridging Figma design systems to production React. Targeting Senior, Staff, or Principal FE roles on React-heavy product teams and design systems.";

const IMPACT_METRICS = [
  ["5,703+", "External npm installs — ForgeKit MCP packages, active production adoption"],
  ["200+", "Production React component library spanning B2B, B2C, and React Native (Freebird)"],
  ["500K+", "Monthly active users across shipped React Native applications"],
  ["50+", "Reusable design system components, 30% dev-time reduction (Redesign Health)"],
  ["$400K/mo", "Revenue lift via browser-based AR app for NARS Cosmetics"],
  ["40%", "Rendering-overhead reduction via custom hooks and Zustand optimization"],
];

const ROLES = [
  {
    company: "Redesign Health",
    role: "Engineering Director (Staff Frontend Engineer & Tech Lead, 0→1)",
    location: "Remote",
    period: "Jul 2022 – May 2024",
    bullets: [
      "Double-promoted (skip-level) to Engineering Director. Managed direct reports, ran 1:1s, and coordinated delivery across 3 cross-functional teams (15+ members) asynchronously while remaining hands-on.",
      "Engineered a proprietary onboarding methodology (Storybook + feature-based architecture + custom hooks) that trained 2 backend engineers to production-level React in 1 month.",
      "Spearheaded a React design system with 50+ reusable components in Storybook + Chromatic — 30% dev-time reduction across a 10–15 engineer org.",
      "Engineered 20+ data-visualization components with custom hooks and Zustand — 40% rendering-overhead reduction. Established Chromatic visual-regression workflow catching UI regressions pre-merge.",
      "Implemented a fixture-based mock API strategy that unblocked a high-stakes product demo under a 2-day deadline — zero integration friction while backend built real endpoints in parallel.",
    ],
  },
  {
    company: "Pineapple Corporation",
    role: "Senior Frontend Engineer & Tech Lead · Consultant",
    location: "Remote · Contract",
    period: "Jan 2022 – Jul 2022",
    bullets: [
      "Orchestrated adoption of an Nx monorepo across 8+ applications — 35% version-control efficiency gain via shared libraries and Nx affected commands.",
      "Engineered cross-platform architecture with Expo, Nx, NativeBase, and React Native in TypeScript — 25% iOS/Android performance gain for 100K+ users.",
      "Implemented Storybook + Chromatic component-driven workflow for 60+ components, accelerating stakeholder design reviews by 50%.",
    ],
  },
  {
    company: "PHC Global",
    role: "Founding Frontend Engineer · 0→1 Startup",
    location: "Remote",
    period: "Jul 2021 – Jan 2022",
    bullets: [
      "Established the foundational Nx monorepo for the B2B fintech dashboard with 30+ shared libraries, integrating gRPC middleware — 40% developer-experience improvement.",
      "Refined UX for 8+ key fintech workflows, lifting NPS-measured satisfaction by 35%.",
      "Reduced infrastructure costs by 30% and accelerated time-to-market by 8 weeks via scalable backend API on GCP, gRPC, Helm, and Kubernetes.",
    ],
  },
  {
    company: "Freebird",
    role: "Lead Frontend Engineer · 0→1 Startup",
    location: "Santa Monica, CA",
    period: "Sep 2016 – Jan 2021",
    bullets: [
      "Built one of the earliest production React UI libraries on Storybook — a 200-component system spanning B2B, B2C, and React Native. Extending to React Native eliminated the need for separate iOS and Android teams.",
      "Served as design-engineering liaison in client, sales, and internal marketing conversations — pulled into stakeholder interactions to translate technical constraints into actionable language. Led offshore teams across India and the Philippines.",
      "Planned, developed, and maintained B2B/B2C/internal dashboards with React and NestJS, plus the React Native mobile product.",
    ],
  },
];

const EARLIER_EXPERIENCE =
  "Earlier roles in senior frontend engineering and lead web development — including pioneering browser-based AR with computer vision in JavaScript (Lead Web Developer, FaceCake Marketing). NARS Cosmetics try-on campaign drove a $400K/mo revenue lift. Detail available on request.";

const SELECTED_PROJECTS = [
  {
    name: "richtillman.xyz — Personal Site · TanStack Start · React 19 · Tailwind CSS 4",
    links: [
      { kind: "Live", label: "richtillman.xyz", href: "https://richtillman.xyz" },
      {
        kind: "Source",
        label: "github.com/effinrich/portfolio",
        href: "https://github.com/effinrich/portfolio",
      },
    ],
    period: "Live · 2025 – Present",
    bullets: [
      "Built on the exact modern stack production teams are adopting now: React 19, TypeScript (strict), TanStack Router, TanStack Query, TanStack Start (SSR/edge), Tailwind CSS 4, and Radix UI.",
      "Deployed on Cloudflare via the official Vite plugin — edge-rendered for fast TTFB.",
      "Component library backed by Storybook 10+ with a11y, docs, and themes addons; forms wired with React Hook Form + Zod; data viz with Recharts.",
      "Modern toolchain throughout: Vite 7, oxlint + oxfmt (Rust-based), lefthook for git hooks — same stack choices a 2026 senior FE team would make.",
    ],
  },
  {
    name: "Tidy App — React Native · Expo · TanStack Query · Supabase",
    link: "tidyapp.me",
    href: "https://tidyapp.me",
    period: "Internal beta · 2024 – Present",
    bullets: [
      "Offline-first, ADHD-friendly home management app on React Native + Expo Router, styled with Gluestack UI / NativeWind and accessibility-first design principles.",
      "Architected a resilient offline-first data layer with Zustand + TanStack Query for optimistic UI updates — instant feedback loops core to neurodivergent UX.",
      "Integrated Supabase (Auth, PostgREST, Realtime DB) for backend; subscription monetization via RevenueCat.",
      "Built invisible background AI tracking that learns user patterns and optimizes task scheduling without intrusive prompts.",
      "Comprehensive Figma Code Connect integration: figma.config.json, 8 primitive .figma.tsx mappings, and 20 component annotations with ADHD-friendly design principle documentation.",
    ],
  },
  {
    name: "ForgeKit — Open-Source MCP Suite",
    link: "forgekit.cloud · npm · 5,703+ installs",
    href: "https://forgekit.cloud",
    period: "Oct 2025 – Present",
    bullets: [
      "ForgeKit was scaffolded by ForgeKit. The full toolchain — CLI, two MCP servers, Storybook integration, CI/CD — was bootstrapped using prior versions of itself. Every release ships through its own pipeline, the recursive proof of production-readiness.",
      "ForgeKit Core CLI (forgekit.cloud) — scaffolds production-ready Nx monorepos with React, Storybook, Vitest, Playwright, and CI/CD baked in. Targets Chakra UI, shadcn/ui, and Tamagui across web and React Native.",
      "ForgeKit Figma MCP (npmjs.com/package/forgekit-figma-mcp) — MCP server extracting Figma variables and design tokens; generates typed theme configurations for Chakra UI, Tailwind, and shadcn.",
      "ForgeKit Storybook MCP (npmjs.com/package/forgekit-storybook-mcp) — MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents; automates story, documentation, and test generation.",
    ],
  },
  {
    name: "AI Training & Evaluations — Mercor · micro1 · Handshake",
    link: "Concurrent contracts",
    period: "Nov 2025 – Present",
    bullets: [
      "Authored programming prompts and evaluation rubrics for an AI lab's frontend benchmark suite — head-to-head model comparisons against frontier LLMs from Anthropic, OpenAI, Google, and Meta — covering React component architecture, TypeScript strict-mode patterns, and Storybook-driven development.",
      "Built AI-driven developer interfaces and UI components for interactive coding environments using React 19, TanStack Start, Chakra UI, Storybook 10+, and Nx.",
      "Advised engineering teams on integrating AI-assisted workflows (Claude Code, Cursor) into production systems.",
    ],
  },
];

const SKILL_GROUPS = [
  [
    "Frontend",
    "React 19, TypeScript 5.x (strict), Next.js, React Native, Expo, TanStack Router, TanStack Start",
  ],
  [
    "UI & Styling",
    "Tailwind CSS 4, Chakra UI, shadcn/ui, Tamagui, Ark UI, Radix UI, NativeWind",
  ],
  [
    "Design Systems",
    "Figma, Figma Code Connect, Figma MCP, Storybook 10+, Chromatic, Design Tokens",
  ],
  ["State & Data", "TanStack Query, Zustand, Supabase, PostgreSQL, tRPC, gRPC"],
  ["AI & MCP", "Model Context Protocol, Claude Code, Cursor, Anthropic API"],
  [
    "Monorepo & DX",
    "Nx, Nx Agents, Turborepo, pnpm workspaces, Module Federation, GitHub Actions, EAS Build",
  ],
  ["Testing & a11y", "Vitest, Jest, Playwright, RTL, Storybook a11y, WCAG 2.1 AA"],
];

// ────────────────────────────────────────────────────────────────────
// STYLES & HELPERS
// ────────────────────────────────────────────────────────────────────

const FONT = "Arial";
const BODY_SIZE = 20; // 10pt (half-points)
const NAME_SIZE = 40; // 20pt
const SECTION_SIZE = 22; // 11pt bold caps
const ROLE_SIZE = 22; // 11pt

const ACCENT_BORDER = {
  bottom: {
    style: BorderStyle.SINGLE,
    size: 6,
    color: "888888",
    space: 4,
  },
};

function bodyRun(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: BODY_SIZE, ...opts });
}

function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 480, after: 240 },
    border: ACCENT_BORDER,
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: FONT,
        size: SECTION_SIZE,
        bold: true,
        characterSpacing: 30,
      }),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 120, line: 300 },
    children: [bodyRun(text)],
  });
}

function paragraph(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 180, line: 300, ...opts.spacing },
    alignment: opts.alignment,
    children: [bodyRun(text, opts.run)],
  });
}

function hyperlink(label, href) {
  return new ExternalHyperlink({
    link: href,
    children: [
      new TextRun({
        text: label,
        font: FONT,
        size: BODY_SIZE,
        style: "Hyperlink",
      }),
    ],
  });
}

// Right-aligned period using tab stops
function roleHeader({ role, company, location, period }) {
  return new Paragraph({
    spacing: { before: 320, after: 100 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: role, font: FONT, size: ROLE_SIZE, bold: true }),
      new TextRun({ text: "  ·  ", font: FONT, size: ROLE_SIZE }),
      new TextRun({ text: company, font: FONT, size: ROLE_SIZE, bold: true }),
      new TextRun({ text: `  ·  ${location}`, font: FONT, size: BODY_SIZE, italics: true }),
      new TextRun({ text: "\t", font: FONT, size: BODY_SIZE }),
      new TextRun({ text: period, font: FONT, size: BODY_SIZE }),
    ],
  });
}

// ────────────────────────────────────────────────────────────────────
// DOCUMENT
// ────────────────────────────────────────────────────────────────────

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
    new TextRun({ text: HEADER.title, font: FONT, size: BODY_SIZE + 2, italics: false }),
  ],
});

const contactChildren = [];
HEADER.contacts.forEach((c, i) => {
  if (i > 0) {
    contactChildren.push(
      new TextRun({ text: "  ·  ", font: FONT, size: BODY_SIZE, color: "888888" }),
    );
  }
  if (c.href) {
    contactChildren.push(hyperlink(c.label, c.href));
  } else {
    contactChildren.push(bodyRun(c.label));
  }
});

const headerContacts = new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: contactChildren,
});

const pullQuote = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 40 },
    indent: { left: 720, right: 720 },
    children: [
      new TextRun({
        text: `“${PULL_QUOTE.text}”`,
        font: FONT,
        size: BODY_SIZE,
        italics: true,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: `— ${PULL_QUOTE.attribution}`,
        font: FONT,
        size: BODY_SIZE - 2,
        italics: true,
        color: "555555",
      }),
    ],
  }),
];

const summary = [sectionHeader("Summary"), paragraph(SUMMARY)];

const impact = [
  sectionHeader("Career Impact"),
  ...IMPACT_METRICS.map(
    ([metric, ctx]) =>
      new Paragraph({
        spacing: { after: 100, line: 280 },
        tabStops: [{ type: TabStopType.LEFT, position: 1440 }],
        children: [
          new TextRun({ text: metric, font: FONT, size: BODY_SIZE, bold: true }),
          new TextRun({ text: "\t", font: FONT, size: BODY_SIZE }),
          bodyRun(ctx),
        ],
      }),
  ),
];

const experience = [
  sectionHeader("Professional Experience"),
  ...ROLES.flatMap((r) => [roleHeader(r), ...r.bullets.map(bullet)]),
  new Paragraph({
    spacing: { before: 240, after: 120, line: 300 },
    children: [
      new TextRun({ text: "Earlier experience: ", font: FONT, size: BODY_SIZE, bold: true }),
      bodyRun(EARLIER_EXPERIENCE.replace(/^Earlier roles[^—]*—\s*/, "")),
    ],
  }),
];

const projects = [
  sectionHeader("Selected Projects & Current Work"),
  ...SELECTED_PROJECTS.flatMap((p) => {
    // Project header line: name + (legacy inline link) + right-aligned period
    const headerChildren = [
      new TextRun({ text: p.name, font: FONT, size: ROLE_SIZE, bold: true }),
    ];
    if (p.link && !p.links) {
      headerChildren.push(
        new TextRun({ text: "  ·  ", font: FONT, size: BODY_SIZE, color: "888888" }),
        p.href
          ? hyperlink(p.link, p.href)
          : new TextRun({ text: p.link, font: FONT, size: BODY_SIZE, italics: true }),
      );
    }
    if (p.period) {
      headerChildren.push(
        new TextRun({ text: "\t", font: FONT, size: BODY_SIZE }),
        new TextRun({ text: p.period, font: FONT, size: BODY_SIZE, italics: true }),
      );
    }
    const headerPara = new Paragraph({
      spacing: { before: 320, after: 60 },
      tabStops: p.period
        ? [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }]
        : undefined,
      children: headerChildren,
    });

    // Sub-line for multiple labeled links ("Live: ... · Source: ...")
    const linksPara = Array.isArray(p.links) && p.links.length > 0
      ? [
          new Paragraph({
            spacing: { before: 0, after: 100, line: 280 },
            children: p.links.flatMap((l, i) => {
              const runs = [];
              if (i > 0) {
                runs.push(
                  new TextRun({
                    text: "  ·  ",
                    font: FONT,
                    size: BODY_SIZE,
                    color: "888888",
                  }),
                );
              }
              if (l.kind) {
                runs.push(
                  new TextRun({
                    text: `${l.kind}: `,
                    font: FONT,
                    size: BODY_SIZE,
                    bold: true,
                  }),
                );
              }
              runs.push(
                l.href
                  ? hyperlink(l.label, l.href)
                  : new TextRun({ text: l.label, font: FONT, size: BODY_SIZE, italics: true }),
              );
              return runs;
            }),
          }),
        ]
      : [];

    return [
      headerPara,
      ...linksPara,
      ...(p.blurb ? [paragraph(p.blurb, { spacing: { after: 80 } })] : []),
      ...(p.bullets ?? []).map(bullet),
    ];
  }),
];

const skills = [
  sectionHeader("Technical Skills"),
  ...SKILL_GROUPS.map(([label, items]) =>
    new Paragraph({
      spacing: { after: 120, line: 280 },
      tabStops: [{ type: TabStopType.LEFT, position: 1800 }],
      children: [
        new TextRun({ text: label, font: FONT, size: BODY_SIZE, bold: true }),
        new TextRun({ text: "\t", font: FONT, size: BODY_SIZE }),
        bodyRun(items),
      ],
    }),
  ),
];

const doc = new Document({
  creator: "Rich Tillman",
  title: "Rich Tillman — Resume",
  styles: {
    default: {
      document: {
        run: { font: FONT, size: BODY_SIZE },
      },
    },
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
            style: {
              paragraph: { indent: { left: 360, hanging: 240 } },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      children: [
        headerName,
        headerTitle,
        headerContacts,
        ...pullQuote,
        ...summary,
        ...impact,
        ...projects,
        ...experience,
        ...skills,
      ],
    },
  ],
});

const outPath = path.join(__dirname, "RichTillman_Resume.docx");
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log(`✓ Wrote ${outPath} (${buffer.length} bytes)`);
