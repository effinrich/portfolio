/**
 * Rich Tillman — Resume v3.5 generator
 *
 * Run from this directory:
 *   npm i --no-save docx
 *   node build-resume.cjs
 *
 * Output: ./RichTillman_Resume_v3.5.docx
 *
 * To turn into a PDF: open in Word/Pages and File → Export → PDF.
 * (No need for a separate PDF script — that round-trip preserves the design better
 *  than a programmatic PDFKit render of the same document.)
 */
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat, HeadingLevel,
  PageNumber, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType,
  TabStopType, TabStopPosition,
} = require('docx');

const FONT = 'Calibri'; // close to the v3 typeface; use 'Helvetica' or 'Arial' if preferred

// ---------- Theme ----------
const TEXT = '111111';
const MUTED = '5C5C5C';
const FAINT = '8A8378';
const BRAND = '1F4E8C';   // navy from the v3 PDF
const RULE = 'CCCCCC';

// ---------- Paragraph helpers ----------
const p = (text, opts = {}) => new Paragraph({
  spacing: { after: 80, line: 280 },
  ...opts,
  children: [new TextRun({ text, font: FONT, size: 21 })],
});

const para = (runs, opts = {}) => new Paragraph({
  spacing: { after: 80, line: 280 },
  ...opts,
  children: runs,
});

const r = (text, opts = {}) => new TextRun({ text, font: FONT, size: 21, ...opts });

// Section heading: caps, letter-spacing, brand color, divider rule below
const section = (text) => new Paragraph({
  spacing: { before: 320, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 4 } },
  children: [new TextRun({
    text: text.toUpperCase(),
    font: FONT, bold: true, size: 22, color: BRAND, characterSpacing: 40,
  })],
});

// Job role title
const jobTitle = (title, dates) => new Paragraph({
  spacing: { before: 140, after: 0 },
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
  children: [
    new TextRun({ text: title, font: FONT, bold: true, size: 22, color: TEXT }),
    new TextRun({ text: '\t' + dates, font: FONT, size: 20, color: MUTED }),
  ],
});

const jobMeta = (text) => new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text, font: FONT, italics: true, size: 20, color: MUTED })],
});

// Bullet
const bullet = (text) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 60, line: 280 },
  children: [new TextRun({ text, font: FONT, size: 21 })],
});

const bulletRich = (runs) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 60, line: 280 },
  children: runs,
});

// 2-column key-value row used for Career Impact + Technical Skills
function kvTable(rows, leftWidth = 1500, rightWidth = 8000) {
  return new Table({
    width: { size: leftWidth + rightWidth, type: WidthType.DXA },
    columnWidths: [leftWidth, rightWidth],
    rows: rows.map(([k, v]) => new TableRow({
      children: [
        new TableCell({
          borders: noBorders(),
          width: { size: leftWidth, type: WidthType.DXA },
          margins: { top: 50, bottom: 50, left: 0, right: 80 },
          children: [new Paragraph({
            children: [new TextRun({ text: k, font: FONT, bold: true, size: 21, color: BRAND })],
          })],
        }),
        new TableCell({
          borders: noBorders(),
          width: { size: rightWidth, type: WidthType.DXA },
          margins: { top: 50, bottom: 50, left: 80, right: 0 },
          children: [new Paragraph({
            children: [new TextRun({ text: v, font: FONT, size: 21 })],
          })],
        }),
      ],
    })),
  });
}

function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
}

// ---------- Cover (name + tagline + contact) ----------
const header = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({
      text: 'RICH TILLMAN', font: FONT, bold: true, size: 56, color: TEXT, characterSpacing: 60,
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({
      text: 'Principal Frontend Engineer  ·  Design Systems  ·  AI Developer Tooling',
      font: FONT, size: 22, color: MUTED,
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [
      new TextRun({ text: 'Remote · USA  ·  richtillman@pm.me  ·  ', font: FONT, size: 19, color: MUTED }),
      new TextRun({ text: 'linkedin.com/in/effinrich', font: FONT, size: 19, color: BRAND, underline: {} }),
      new TextRun({ text: '  ·  ', font: FONT, size: 19, color: MUTED }),
      new TextRun({ text: 'github.com/effinrich', font: FONT, size: 19, color: BRAND, underline: {} }),
      new TextRun({ text: '  ·  ', font: FONT, size: 19, color: MUTED }),
      new TextRun({ text: 'richtillman.xyz', font: FONT, size: 19, color: BRAND, underline: {} }),
      new TextRun({ text: '  ·  ', font: FONT, size: 19, color: MUTED }),
      new TextRun({ text: 'forgekit.cloud', font: FONT, size: 19, color: BRAND, underline: {} }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    indent: { left: 720, right: 720 },
    children: [new TextRun({
      text: '"Rich can ‘speak design’ in a way that few engineers can — he can explain the engineering to design and the design to engineering. We have hardcore data engineers working productively on intricate styling problems, all on the rails Rich laid down."',
      font: FONT, italics: true, size: 21, color: TEXT,
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    indent: { left: 720, right: 720 },
    children: [new TextRun({
      text: '— Matt Stephenson, Director of Engineering, Redesign Health (2023 review)',
      font: FONT, italics: true, size: 19, color: MUTED,
    })],
  }),
];

// ---------- Sections ----------
const summary = [
  section('Summary'),
  para([
    r('Principal Frontend Engineer building production React UI systems, design-to-code platforms, and AI/MCP developer tooling. Creator of '),
    r('ForgeKit', { bold: true }),
    r(' — MCP servers connecting Figma design systems to production React with '),
    r('5,703+ external npm installs', { bold: true }),
    r(' and active production adoption. '),
    r('Double-promoted to Engineering Director at Redesign Health.', { bold: true }),
    r(' Earlier work shipped one of the first browser-based AR experiences at scale — a NARS Cosmetics try-on that lifted monthly revenue by '),
    r('$400K/mo', { bold: true }),
    r('. Targeting Staff and Principal IC roles in AI developer tooling, design systems, or platform frontend.'),
  ]),
];

const careerImpact = [
  section('Career Impact'),
  kvTable([
    ['5,703+', 'External npm installs — ForgeKit MCP packages, active production adoption'],
    ['$400K/mo', 'Revenue lift via browser-based AR app for NARS Cosmetics'],
    ['200+', 'Production React component library spanning B2B, B2C, and React Native (Freebird)'],
    ['500K+', 'Monthly active users across shipped React Native applications'],
    ['50+', 'Reusable design system components, 30% dev-time reduction (Redesign Health)'],
    ['40%', 'Rendering-overhead reduction via custom hooks and Zustand optimization'],
  ]),
  new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: '', font: FONT })] }),
];

const currentFocus = [
  section('Current Focus — AI Developer Tooling (Oct 2025 – Present)'),

  jobTitle('Open-Source Author — ForgeKit', 'Oct 2025 – Present'),
  jobMeta('Independent  ·  Remote'),
  bulletRich([
    r('ForgeKit was scaffolded by ForgeKit.', { bold: true }),
    r(' The full toolchain — CLI, two MCP servers, Storybook integration, CI/CD — was bootstrapped using prior versions of itself. Every release ships through its own pipeline, the recursive proof that the tool is production-ready.'),
  ]),
  bulletRich([
    r('Author and maintainer of '),
    r('ForgeKit', { bold: true }),
    r(' — open-source CLI + MCP server suite (forgekit-figma-mcp, forgekit-storybook-mcp, ForgeKit Core CLI) bridging Figma → React → Storybook for design system teams.'),
  ]),
  bulletRich([
    r('5,703+ external npm installs', { bold: true }),
    r(' across teams using AI agents (Claude, Cursor, Copilot) for design-system work. Active production adoption with weekly install growth.'),
  ]),
  bullet('The MCP servers expose live design tokens (forgekit-figma-mcp) and Storybook metadata (forgekit-storybook-mcp) directly to AI agents, so they generate token-aware code, stories, and tests against the real design system instead of guessing.'),

  jobTitle('Senior Frontend Engineer — AI Training & Evaluations', 'Nov 2025 – Present'),
  jobMeta('Mercor  ·  micro1  ·  Remote  ·  Concurrent contract'),
  bullet("Authored programming prompts and evaluation rubrics for an AI lab's frontend benchmark suite — head-to-head model comparisons against frontier LLMs from Anthropic, OpenAI, Google, and Meta — covering React component architecture, TypeScript strict-mode patterns, and Storybook-driven development."),
  bulletRich([
    r('Built AI-driven developer interfaces and UI components for interactive coding environments using '),
    r('React 19, TanStack Start, Chakra UI, Storybook 10+, and Nx', { bold: true }),
    r('.'),
  ]),
  bullet('Advised engineering teams on integrating AI-assisted workflows (Claude Code, Cursor) into production systems.'),
];

const experience = [
  section('Professional Experience'),

  jobTitle('Engineering Director (Staff Frontend Engineer & Tech Lead, 0→1)', 'Jul 2022 – May 2024'),
  jobMeta('Redesign Health  ·  Remote'),
  bulletRich([
    r('Double-promoted (skip-level) to Engineering Director.', { bold: true }),
    r(' Managed direct reports, ran 1:1s, and coordinated delivery across 3 cross-functional teams (15+ members) asynchronously while remaining hands-on.'),
  ]),
  bullet('Engineered a proprietary onboarding methodology (Storybook + feature-based architecture + custom hooks) that trained 2 backend engineers to production-level React in 1 month.'),
  bulletRich([
    r('Spearheaded a React design system with '),
    r('50+ reusable components', { bold: true }),
    r(' in Storybook + Chromatic — '),
    r('30% dev-time reduction', { bold: true }),
    r(' across a 10–15 engineer org.'),
  ]),
  bulletRich([
    r('Engineered 20+ data-visualization components with custom hooks and Zustand — '),
    r('40% rendering-overhead reduction', { bold: true }),
    r('. Established Chromatic visual-regression workflow catching UI regressions pre-merge.'),
  ]),
  bullet('Implemented a fixture-based mock API strategy that unblocked a high-stakes product demo under a 2-day deadline — zero integration friction while backend built real endpoints in parallel.'),

  jobTitle('Senior Frontend Engineer & Tech Lead · Consultant', 'Jan 2022 – Jul 2022'),
  jobMeta('Pineapple Corporation  ·  Remote  ·  Contract'),
  bulletRich([
    r('Orchestrated adoption of an Nx monorepo across 8+ applications — '),
    r('35% version-control efficiency gain', { bold: true }),
    r(' via shared libraries and Nx affected commands.'),
  ]),
  bulletRich([
    r('Engineered cross-platform architecture with Expo, Nx, NativeBase, and React Native in TypeScript — '),
    r('25% iOS/Android performance gain', { bold: true }),
    r(' for 100K+ users.'),
  ]),
  bulletRich([
    r('Implemented Storybook + Chromatic component-driven workflow for '),
    r('60+ components', { bold: true }),
    r(', accelerating stakeholder design reviews by '),
    r('50%', { bold: true }),
    r('.'),
  ]),

  jobTitle('Founding Frontend Engineer · 0→1 Startup', 'Jul 2021 – Jan 2022'),
  jobMeta('PHC Global  ·  Remote'),
  bulletRich([
    r('Established the foundational Nx monorepo for the B2B fintech dashboard with 30+ shared libraries, integrating gRPC middleware — '),
    r('40% developer-experience improvement', { bold: true }),
    r('.'),
  ]),
  bulletRich([
    r('Refined UX for 8+ key fintech workflows, lifting NPS-measured satisfaction by '),
    r('35%', { bold: true }),
    r('.'),
  ]),
  bulletRich([
    r('Reduced infrastructure costs by '),
    r('30%', { bold: true }),
    r(' and accelerated time-to-market by 8 weeks via scalable backend API on GCP, gRPC, Helm, and Kubernetes.'),
  ]),

  jobTitle('Lead Frontend Engineer · 0→1 Startup', 'Sep 2016 – Jan 2021'),
  jobMeta('Freebird  ·  Santa Monica, CA'),
  bulletRich([
    r('Built one of the earliest production React UI libraries on Storybook — a '),
    r('200-component system', { bold: true }),
    r(' spanning B2B, B2C, and React Native. Extending to React Native eliminated the need for separate iOS and Android teams.'),
  ]),
  bullet('Served as design-engineering liaison in client, sales, and internal marketing conversations — pulled into stakeholder interactions to translate technical constraints into actionable language. Led offshore teams across India and the Philippines.'),
  bullet('Planned, developed, and maintained B2B/B2C/internal dashboards with React and NestJS, plus the React Native mobile product.'),

  jobTitle('Lead Web Developer', 'Oct 2010 – Sep 2016'),
  jobMeta('FaceCake Marketing Technologies  ·  Los Angeles, CA'),
  bulletRich([
    r('NARS Cosmetics try-on campaign drove a $400K/mo revenue lift', { bold: true }),
    r(' over a 6-month launch. Built and deployed a browser-based AR makeup try-on app, plus a Firebase-powered CMS for the NARS marketing team.'),
  ]),
  bullet('Pioneered browser-based AR with computer vision in JavaScript — built before WebXR or modern CV libraries existed. Directed the full lifecycle of AR applications across web and mobile.'),
];

const projects = [
  section('Selected Projects'),

  para([r('Tidy App', { bold: true }), r('  ·  React Native  ·  Expo  ·  Internal beta')], { spacing: { before: 100, after: 0 } }),
  p('Offline-first, ADHD-friendly home management app on React Native + Expo. Resilient offline-first data layer using Zustand and TanStack Query for optimistic UI; Supabase Auth/PostgREST/Realtime; subscription monetization via RevenueCat; comprehensive Figma Code Connect integration.'),

  para([r('ForgeKit Core CLI', { bold: true }), r('  ·  forgekit.cloud')], { spacing: { before: 100, after: 0 } }),
  p('CLI that scaffolds production-ready Nx monorepos with React, Storybook, Vitest, Playwright, and CI/CD baked in. Targets Chakra UI, shadcn/ui, and Tamagui across web and universal React Native. Used recursively to scaffold ForgeKit itself — the entire ForgeKit suite is the proof-of-concept output of running its own Core CLI.'),

  para([r('ForgeKit Figma MCP', { bold: true }), r('  ·  npmjs.com/package/forgekit-figma-mcp')], { spacing: { before: 100, after: 0 } }),
  p('MCP server extracting Figma variables and design tokens; generates typed theme configurations for Chakra UI, Tailwind, and shadcn. Enables AI-driven design-to-code workflows for frontend engineers.'),

  para([r('ForgeKit Storybook MCP', { bold: true }), r('  ·  npmjs.com/package/forgekit-storybook-mcp')], { spacing: { before: 100, after: 0 } }),
  p('MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents — automates story generation, documentation scaffolding, and component testing workflows.'),
];

const skills = [
  section('Technical Skills'),
  kvTable([
    ['Frontend', 'React 19, TypeScript (strict), Next.js, React Native, Expo, TanStack Start'],
    ['Design Systems', 'Storybook 10+, Chromatic, Chakra UI, shadcn/ui, Tamagui, Ark UI, Radix UI'],
    ['AI & MCP', 'Model Context Protocol, Claude Code, Cursor, Figma Code Connect, Figma MCP'],
    ['Monorepo & DX', 'Nx, Nx Agents, Turborepo, pnpm workspaces, Module Federation, GitHub Actions, EAS Build'],
    ['State & Data', 'TanStack Query, Zustand, Supabase, PostgreSQL, tRPC, gRPC'],
    ['Testing & a11y', 'Vitest, Jest, Playwright, RTL, Storybook a11y, WCAG 2.1 AA'],
  ], 1700, 7800),
];

// ---------- Document ----------
const doc = new Document({
  creator: 'Rich Tillman',
  title: 'Rich Tillman — Resume v3.5',
  description: 'Principal Frontend Engineer · Design Systems · AI Developer Tooling',
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 220 } } },
        }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 }, // US Letter
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }, // 0.75" margins
      },
    },
    children: [
      ...header,
      ...summary,
      ...careerImpact,
      ...currentFocus,
      ...experience,
      ...projects,
      ...skills,
    ],
  }],
});

const outPath = path.join(__dirname, 'RichTillman_Resume_v3.5.docx');
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log('Wrote', outPath, buf.length, 'bytes');
  console.log('Open in Word/Pages, swap [X%] for the real Mercor delta, then File → Export → PDF.');
});
