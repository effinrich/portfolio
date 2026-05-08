import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center rounded-md border border-border bg-surface font-mono text-sm font-bold text-primary">
            R
            <span className="absolute -inset-px rounded-md ring-1 ring-primary/30 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Rich Tillman
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            / Principal Frontend Engineer
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:richtillman@pm.me"
          className="hidden md:inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_24px_-4px_oklch(0.86_0.17_95/0.5)]"
        >
          <span className="pill-dot" /> Available
        </a>
      </nav>
    </header>
  );
}
