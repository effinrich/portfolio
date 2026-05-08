const items = [
  "React 18+", "TypeScript", "Next.js", "TanStack Start", "React Native",
  "Expo", "Storybook 8+", "Chromatic", "Nx", "Turborepo", "Chakra UI",
  "shadcn/ui", "Tamagui", "Radix UI", "Figma MCP", "Claude Code", "Cursor",
  "Zustand", "TanStack Query", "tRPC", "Playwright", "Vitest", "Supabase",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="border-y border-border bg-surface/40 py-5">
      <div className="ticker overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-8 px-4 font-mono text-sm text-muted-foreground">
          {row.map((it, i) => (
            <li key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span>{it}</span>
              <span className="text-primary/50">/</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
