import { useEffect, useState, useCallback } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin — Contact Submissions" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "not-admin"; email: string }
  | { status: "admin"; email: string };

function AdminPage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [query, setQuery] = useState("");

  const checkAuth = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    if (!session) {
      setAuth({ status: "unauthenticated" });
      return null;
    }
    const { data: roleRows, error: roleErr } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);
    if (roleErr) {
      console.error(roleErr);
    }
    const isAdmin = roleRows?.some((r) => r.role === "admin") ?? false;
    setAuth(
      isAdmin
        ? { status: "admin", email: session.user.email ?? "" }
        : { status: "not-admin", email: session.user.email ?? "" }
    );
    return isAdmin;
  }, []);

  const loadSubmissions = useCallback(async () => {
    setLoadingData(true);
    setError(null);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setSubmissions(data ?? []);
    setLoadingData(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const isAdmin = await checkAuth();
      if (!cancelled && isAdmin) await loadSubmissions();
    })();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [checkAuth, loadSubmissions]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission permanently?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (auth.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (auth.status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-foreground">Sign in required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You need to sign in to view this page.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  if (auth.status === "not-admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-foreground">Not authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're signed in as <span className="text-foreground">{auth.email}</span>, but this account
            doesn't have admin access.
          </p>
          <button
            onClick={handleSignOut}
            className="mt-6 inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-surface"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const filtered = submissions.filter((s) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground">
              ← Site
            </Link>
            <span className="text-sm font-semibold">Contact submissions</span>
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground">
              {submissions.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{auth.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            placeholder="Search name, email, or message…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:max-w-sm"
          />
          <button
            onClick={loadSubmissions}
            disabled={loadingData}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-surface disabled:opacity-60"
          >
            {loadingData ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {!loadingData && filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">
              {submissions.length === 0
                ? "No submissions yet. They'll appear here as they arrive."
                : "No submissions match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Message</th>
                  <th className="px-4 py-3 text-left font-medium">Received</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-surface/50">
                    <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <a href={`mailto:${s.email}`} className="hover:text-foreground hover:underline">
                        {s.email}
                      </a>
                    </td>
                    <td className="hidden max-w-md px-4 py-3 text-muted-foreground md:table-cell">
                      <span className="line-clamp-1">{s.message}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                      {new Date(s.created_at).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <button
                        onClick={() => setSelected(s)}
                        className="mr-2 text-xs font-medium text-primary hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-xs font-medium text-destructive hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{selected.name}</h2>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  {selected.email}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(selected.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md p-1 text-muted-foreground hover:bg-surface hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 text-sm text-foreground">
              {selected.message}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: your message`}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                Reply
              </a>
              <button
                onClick={() => handleDelete(selected.id)}
                className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
