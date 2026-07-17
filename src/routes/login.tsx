import { useState } from "react"
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { buildPageHead } from "@/lib/seo"

type Mode = "signin" | "signup"

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    // Already signed in → bounce straight to admin instead of flashing the form.
    const { data } = await supabase.auth.getSession()
    if (data.session) throw redirect({ to: "/admin" })
  },
  component: LoginPage,
  head: () =>
    buildPageHead({
      title: "Sign in — Admin",
      description: "Admin sign-in for Rich Tillman portfolio contact inbox.",
      path: "/login",
      noIndex: true,
    }),
})

function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [info, setInfo] = useState<string | null>(null)

  const authMutation = useMutation({
    mutationFn: async (m: Mode) => {
      if (m === "signup") {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        })
        if (authError) throw authError
        return { kind: "signup" } as const
      }
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (authError) throw authError
      return { kind: "signin" } as const
    },
    onSuccess: (result) => {
      if (result.kind === "signup") {
        setInfo("Check your email to confirm your account, then sign in.")
        setMode("signin")
      } else {
        navigate({ to: "/admin" })
      }
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setInfo(null)
    authMutation.reset()
    authMutation.mutate(mode)
  }

  const errorMessage =
    authMutation.error instanceof Error
      ? authMutation.error.message
      : authMutation.error
        ? "Something went wrong"
        : null

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← Back to site
        </Link>
        <div className="mt-4 rounded-xl border border-border bg-surface p-8">
          <h1 className="text-2xl font-semibold text-foreground">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Admin access to contact submissions.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>

            {errorMessage && (
              <p role="alert" className="text-sm text-destructive">
                {errorMessage}
              </p>
            )}
            {info && <p className="text-sm text-primary">{info}</p>}

            <button
              type="submit"
              disabled={authMutation.isPending}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              {authMutation.isPending
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin")
                setInfo(null)
                authMutation.reset()
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
