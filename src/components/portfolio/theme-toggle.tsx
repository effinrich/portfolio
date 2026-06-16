import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme =
      saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setTheme(initialTheme)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  if (!mounted) {
    return <div className="h-9 w-9 rounded-md border border-border bg-surface" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-all hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
