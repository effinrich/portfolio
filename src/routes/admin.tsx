import { useEffect, useState, useCallback, useMemo } from "react";
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

type SortField = "created_at" | "name" | "email";
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

function AdminPage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Submission | null>(null);

  // Filter state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchField, setSearchField] = useState<"all" | "name" | "email">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, searchField, dateFrom, dateTo, sortField, sortDir, pageSize]);

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

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let q = supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .order(sortField, { ascending: sortDir === "asc" })
      .range(from, to);

    if (debouncedQuery) {
      // Escape PostgREST special chars in ilike pattern
      const safe = debouncedQuery.replace(/[%,()]/g, " ");
      const pattern = `%${safe}%`;
      if (searchField === "name") q = q.ilike("name", pattern);
      else if (searchField === "email") q = q.ilike("email", pattern);
      else q = q.or(`name.ilike.${pattern},email.ilike.${pattern},message.ilike.${pattern}`);
    }
    if (dateFrom) q = q.gte("created_at", new Date(dateFrom).toISOString());
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      q = q.lte("created_at", end.toISOString());
    }

    const { data, error, count } = await q;
    if (error) setError(error.message);
    else {
      setSubmissions(data ?? []);
      setTotalCount(count ?? 0);
    }
    setLoadingData(false);
  }, [page, pageSize, sortField, sortDir, debouncedQuery, searchField, dateFrom, dateTo]);

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

  // Subscribe to realtime changes once the user is confirmed admin.
  useEffect(() => {
    if (auth.status !== "admin") return;
    const channel = supabase
      .channel("contact_submissions_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const old = payload.old as { id: string };
            setSelected((cur) => (cur?.id === old.id ? null : cur));
          }
          loadSubmissions();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [auth.status, loadSubmissions]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission permanently?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    if (selected?.id === id) setSelected(null);
    loadSubmissions();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "created_at" ? "desc" : "asc");
    }
  }

  function clearFilters() {
    setQuery("");
    setSearchField("all");
    setDateFrom("");
    setDateTo("");
    setSortField("created_at");
    setSortDir("desc");
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const hasFilters = useMemo(
    () => Boolean(debouncedQuery || dateFrom || dateTo || searchField !== "all"),
    [debouncedQuery, dateFrom, dateTo, searchField]
  );
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

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

  const sortIndicator = (field: SortField) =>
    sortField === field ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  const inputCls =
    "rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

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
              {totalCount}
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
        {/* Filter bar */}
        <div className="mb-4 grid grid-cols-1 gap-3 rounded-xl border border-border bg-surface/30 p-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Search
            </label>
            <input
              type="search"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`${inputCls} w-full`}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Field
            </label>
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as typeof searchField)}
              className={`${inputCls} w-full`}
            >
              <option value="all">All fields</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={`${inputCls} w-full`}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={`${inputCls} w-full`}
            />
          </div>
          <div className="flex items-end gap-2 lg:col-span-1">
            <button
              onClick={loadSubmissions}
              disabled={loadingData}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-surface disabled:opacity-60"
              title="Refresh"
            >
              {loadingData ? "…" : "↻"}
            </button>
          </div>
          {hasFilters && (
            <div className="lg:col-span-12">
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {!loadingData && submissions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">
              {totalCount === 0 && !hasFilters
                ? "No submissions yet. They'll appear here as they arrive."
                : "No submissions match your filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">
                    <button onClick={() => toggleSort("name")} className="hover:text-foreground">
                      Name{sortIndicator("name")}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button onClick={() => toggleSort("email")} className="hover:text-foreground">
                      Email{sortIndicator("email")}
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Message</th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button onClick={() => toggleSort("created_at")} className="hover:text-foreground">
                      Received{sortIndicator("created_at")}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {submissions.map((s) => (
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

        {/* Pagination */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              {rangeStart}–{rangeEnd} of {totalCount}
            </span>
            <label className="flex items-center gap-2">
              Rows
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className={`${inputCls} py-1`}
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(1)}
              disabled={page <= 1 || loadingData}
              className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
            >
              «
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loadingData}
              className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
            >
              ‹ Prev
            </button>
            <span className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loadingData}
              className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
            >
              Next ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages || loadingData}
              className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
            >
              »
            </button>
          </div>
        </div>
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
