import { Suspense, useDeferredValue, useEffect, useRef, useState } from "react"
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { buildPageHead } from "@/lib/seo"

type Submission = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

type Reply = {
  id: string
  submission_id: string
  admin_user_id: string
  body: string
  created_at: string
}

type SortField = "created_at" | "name" | "email"
type SortDir = "asc" | "desc"
type SearchField = "all" | "name" | "email"

type Filters = {
  q: string
  field: SearchField
  from: string
  to: string
  sortField: SortField
  sortDir: SortDir
  pageSize: number
}

type AuthState =
  | { status: "unauthenticated" }
  | { status: "not-admin"; email: string }
  | { status: "admin"; email: string; userId: string }

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const

const DEFAULT_FILTERS: Filters = {
  q: "",
  field: "all",
  from: "",
  to: "",
  sortField: "created_at",
  sortDir: "desc",
  pageSize: 25,
}

const INPUT_CLS =
  "rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"

const authQueryOptions = queryOptions({
  queryKey: ["admin", "auth"] as const,
  queryFn: async (): Promise<AuthState> => {
    const { data: sessionData } = await supabase.auth.getSession()
    const session = sessionData.session
    if (!session) return { status: "unauthenticated" }
    const { data: roleRows, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
    if (error) console.error(error)
    const isAdmin = roleRows?.some((r) => r.role === "admin") ?? false
    const email = session.user.email ?? ""
    return isAdmin
      ? { status: "admin", email, userId: session.user.id }
      : { status: "not-admin", email }
  },
  staleTime: 60_000,
})

function submissionsQueryOptions(filters: Filters, page: number) {
  return queryOptions({
    queryKey: ["admin", "submissions", filters, page] as const,
    queryFn: async () => {
      const from = (page - 1) * filters.pageSize
      const to = from + filters.pageSize - 1
      let q = supabase
        .from("contact_submissions")
        .select("*", { count: "exact" })
        .order(filters.sortField, { ascending: filters.sortDir === "asc" })
        .range(from, to)
      const trimmed = filters.q.trim()
      if (trimmed) {
        const safe = trimmed.replace(/[%,()]/g, " ")
        const pattern = `%${safe}%`
        if (filters.field === "name") q = q.ilike("name", pattern)
        else if (filters.field === "email") q = q.ilike("email", pattern)
        else q = q.or(`name.ilike.${pattern},email.ilike.${pattern},message.ilike.${pattern}`)
      }
      if (filters.from) q = q.gte("created_at", new Date(filters.from).toISOString())
      if (filters.to) {
        const end = new Date(filters.to)
        end.setHours(23, 59, 59, 999)
        q = q.lte("created_at", end.toISOString())
      }
      const { data, error, count } = await q
      if (error) throw error
      return { rows: (data ?? []) as Submission[], total: count ?? 0 }
    },
  })
}

function repliesQueryOptions(submissionId: string) {
  return queryOptions({
    queryKey: ["admin", "replies", submissionId] as const,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submission_replies")
        .select("*")
        .eq("submission_id", submissionId)
        .order("created_at", { ascending: true })
      if (error) throw error
      return (data ?? []) as Reply[]
    },
  })
}

export const Route = createFileRoute("/admin")({
  loader: ({ context }) => context.queryClient.ensureQueryData(authQueryOptions),
  component: AdminPage,
  head: () =>
    buildPageHead({
      title: "Admin — Contact Submissions",
      description: "Admin inbox for portfolio contact submissions.",
      path: "/admin",
      noIndex: true,
    }),
})

function AdminPage() {
  const { data: auth } = useSuspenseQuery(authQueryOptions)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["admin", "auth"] })
    })
    return () => sub.subscription.unsubscribe()
  }, [queryClient])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate({ to: "/login" })
  }

  if (auth.status === "unauthenticated") {
    return (
      <CenteredCard
        title="Sign in required"
        description="You need to sign in to view this page."
        action={
          <Link
            to="/login"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Go to sign in
          </Link>
        }
      />
    )
  }

  if (auth.status === "not-admin") {
    return (
      <CenteredCard
        title="Not authorized"
        description={
          <>
            You&apos;re signed in as <span className="text-foreground">{auth.email}</span>, but this
            account doesn&apos;t have admin access.
          </>
        }
        action={
          <button
            onClick={handleSignOut}
            className="mt-6 inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-surface"
          >
            Sign out
          </button>
        }
      />
    )
  }

  return <AdminAuthedView email={auth.email} userId={auth.userId} onSignOut={handleSignOut} />
}

function CenteredCard({
  title,
  description,
  action,
}: {
  title: string
  description: React.ReactNode
  action: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {action}
      </div>
    </div>
  )
}

function AdminAuthedView({
  email,
  userId,
  onSignOut,
}: {
  email: string
  userId: string
  onSignOut: () => void
}) {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Submission | null>(null)
  const deferredFilters = useDeferredValue(filters)

  function updateFilters(patch: Partial<Filters>) {
    setFilters((f) => ({ ...f, ...patch }))
    setPage(1)
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }

  function toggleSort(field: SortField) {
    setFilters((f) => {
      const nextDir: SortDir =
        f.sortField === field
          ? f.sortDir === "asc"
            ? "desc"
            : "asc"
          : field === "created_at"
            ? "desc"
            : "asc"
      return { ...f, sortField: field, sortDir: nextDir }
    })
    setPage(1)
  }

  // Realtime subscription — stable, never re-subscribes
  useEffect(() => {
    const channel = supabase
      .channel("contact_submissions_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const old = payload.old as { id: string }
            setSelected((cur) => (cur?.id === old.id ? null : cur))
          }
          queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] })
        },
      )
      .subscribe()
    return () => {
      void supabase.removeChannel(channel)
    }
  }, [queryClient])

  const deleteSubmission = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id)
      if (error) throw error
      return id
    },
    onSuccess: (id) => {
      if (selected?.id === id) setSelected(null)
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] })
    },
    onError: (e) => alert(e instanceof Error ? e.message : "Delete failed"),
  })

  function handleDelete(id: string) {
    if (!confirm("Delete this submission permanently?")) return
    deleteSubmission.mutate(id)
  }

  const hasFilters =
    Boolean(filters.q.trim()) || filters.from !== "" || filters.to !== "" || filters.field !== "all"

  const sortIndicator = (field: SortField) =>
    filters.sortField === field ? (filters.sortDir === "asc" ? " ↑" : " ↓") : ""

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← Site
            </Link>
            <span className="text-sm font-semibold">Contact submissions</span>
            <Suspense fallback={null}>
              <SubmissionCountBadge filters={deferredFilters} page={page} />
            </Suspense>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{email}</span>
            <button
              onClick={onSignOut}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <FilterBar
          filters={filters}
          onUpdate={updateFilters}
          onRefresh={() => queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] })}
          onClear={clearFilters}
          hasFilters={hasFilters}
        />

        <Suspense fallback={<TableSkeleton />}>
          <SubmissionsTable
            filters={deferredFilters}
            page={page}
            onPageChange={setPage}
            onPageSizeChange={(pageSize) => updateFilters({ pageSize })}
            onSelect={setSelected}
            onDelete={handleDelete}
            toggleSort={toggleSort}
            sortIndicator={sortIndicator}
            hasFilters={hasFilters}
          />
        </Suspense>
      </main>

      {selected && (
        <SubmissionDialog
          submission={selected}
          userId={userId}
          onClose={() => setSelected(null)}
          onDelete={() => handleDelete(selected.id)}
        />
      )}
    </div>
  )
}

function SubmissionCountBadge({ filters, page }: { filters: Filters; page: number }) {
  const { data } = useSuspenseQuery(submissionsQueryOptions(filters, page))
  return (
    <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground">
      {data.total}
    </span>
  )
}

function FilterBar({
  filters,
  onUpdate,
  onRefresh,
  onClear,
  hasFilters,
}: {
  filters: Filters
  onUpdate: (patch: Partial<Filters>) => void
  onRefresh: () => void
  onClear: () => void
  hasFilters: boolean
}) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 rounded-xl border border-border bg-surface/30 p-4 sm:grid-cols-2 lg:grid-cols-12">
      <label className="lg:col-span-5">
        <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Search
        </span>
        <input
          type="search"
          placeholder="Search…"
          value={filters.q}
          onChange={(e) => onUpdate({ q: e.target.value })}
          className={`${INPUT_CLS} w-full`}
        />
      </label>
      <label className="lg:col-span-2">
        <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Field
        </span>
        <select
          value={filters.field}
          onChange={(e) => onUpdate({ field: e.target.value as SearchField })}
          className={`${INPUT_CLS} w-full`}
        >
          <option value="all">All fields</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </label>
      <label className="lg:col-span-2">
        <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          From
        </span>
        <input
          type="date"
          value={filters.from}
          onChange={(e) => onUpdate({ from: e.target.value })}
          className={`${INPUT_CLS} w-full`}
        />
      </label>
      <label className="lg:col-span-2">
        <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
          To
        </span>
        <input
          type="date"
          value={filters.to}
          onChange={(e) => onUpdate({ to: e.target.value })}
          className={`${INPUT_CLS} w-full`}
        />
      </label>
      <div className="flex items-end gap-2 lg:col-span-1">
        <button
          onClick={onRefresh}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-surface"
          title="Refresh"
        >
          ↻
        </button>
      </div>
      {hasFilters && (
        <div className="lg:col-span-12">
          <button onClick={onClear} className="text-xs font-medium text-primary hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="h-64 animate-pulse bg-surface/30" />
    </div>
  )
}

function SubmissionsTable({
  filters,
  page,
  onPageChange,
  onPageSizeChange,
  onSelect,
  onDelete,
  toggleSort,
  sortIndicator,
  hasFilters,
}: {
  filters: Filters
  page: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onSelect: (s: Submission) => void
  onDelete: (id: string) => void
  toggleSort: (f: SortField) => void
  sortIndicator: (f: SortField) => string
  hasFilters: boolean
}) {
  const { data } = useSuspenseQuery(submissionsQueryOptions(filters, page))
  const { rows, total } = data
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize))
  const rangeStart = total === 0 ? 0 : (page - 1) * filters.pageSize + 1
  const rangeEnd = Math.min(page * filters.pageSize, total)

  return (
    <>
      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">
            {total === 0 && !hasFilters
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
                  <button
                    onClick={() => toggleSort("created_at")}
                    className="hover:text-foreground"
                  >
                    Received{sortIndicator("created_at")}
                  </button>
                </th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {rows.map((s) => (
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
                      onClick={() => onSelect(s)}
                      className="mr-2 text-xs font-medium text-primary hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
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

      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            {rangeStart}–{rangeEnd} of {total}
          </span>
          <label className="flex items-center gap-2">
            Rows
            <select
              value={filters.pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={`${INPUT_CLS} py-1`}
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
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
          >
            «
          </button>
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
          >
            ‹ Prev
          </button>
          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
          >
            Next ›
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-surface disabled:opacity-40"
          >
            »
          </button>
        </div>
      </div>
    </>
  )
}

function SubmissionDialog({
  submission,
  userId,
  onClose,
  onDelete,
}: {
  submission: Submission
  userId: string
  onClose: () => void
  onDelete: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <dialog
        aria-modal="true"
        aria-labelledby="submission-dialog-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-background p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="submission-dialog-title" className="text-lg font-semibold text-foreground">
              {submission.name}
            </h2>
            <a
              href={`mailto:${submission.email}`}
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              {submission.email}
            </a>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(submission.created_at).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 text-sm text-foreground">
          {submission.message}
        </p>

        <Suspense fallback={<p className="mt-6 text-xs text-muted-foreground">Loading replies…</p>}>
          <RepliesPanel submission={submission} userId={userId} onDelete={onDelete} />
        </Suspense>
      </dialog>
    </div>
  )
}

function RepliesPanel({
  submission,
  userId,
  onDelete,
}: {
  submission: Submission
  userId: string
  onDelete: () => void
}) {
  const queryClient = useQueryClient()
  const { data: replies } = useSuspenseQuery(repliesQueryOptions(submission.id))
  const [body, setBody] = useState("")
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const addReply = useMutation({
    mutationFn: async (text: string) => {
      const { data, error: dbError } = await supabase
        .from("submission_replies")
        .insert({ submission_id: submission.id, admin_user_id: userId, body: text })
        .select()
        .single()
      if (dbError) throw dbError
      return data as Reply
    },
    onSuccess: (newReply) => {
      queryClient.setQueryData(
        repliesQueryOptions(submission.id).queryKey,
        (prev: Reply[] | undefined) => [...(prev ?? []), newReply],
      )
      setBody("")
      textareaRef.current?.focus()
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Save failed"),
  })

  const deleteReply = useMutation({
    mutationFn: async (id: string) => {
      const { error: dbError } = await supabase.from("submission_replies").delete().eq("id", id)
      if (dbError) throw dbError
      return id
    },
    onSuccess: (id) => {
      queryClient.setQueryData(
        repliesQueryOptions(submission.id).queryKey,
        (prev: Reply[] | undefined) => (prev ?? []).filter((r) => r.id !== id),
      )
    },
    onError: (e) => alert(e instanceof Error ? e.message : "Delete failed"),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = body.trim()
    if (trimmed.length < 1) return
    setError(null)
    addReply.mutate(trimmed)
  }

  function handleDeleteReply(id: string) {
    if (!confirm("Delete this reply?")) return
    deleteReply.mutate(id)
  }

  return (
    <>
      <div className="mt-6">
        <h3 className="mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Replies {replies.length > 0 && `(${replies.length})`}
        </h3>
        {replies.length === 0 ? (
          <p className="text-xs text-muted-foreground">No replies yet.</p>
        ) : (
          <ul className="space-y-2">
            {replies.map((r) => (
              <li key={r.id} className="rounded-lg border border-border bg-surface/50 p-3 text-sm">
                <div className="mb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                  <button
                    onClick={() => handleDeleteReply(r.id)}
                    className="text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <p className="whitespace-pre-wrap text-foreground">{r.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <label
          htmlFor="reply-body"
          className="block text-xs font-mono uppercase tracking-wider text-muted-foreground"
        >
          Add a reply
        </label>
        <textarea
          ref={textareaRef}
          id="reply-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          maxLength={5000}
          placeholder="Write your reply…"
          className={`${INPUT_CLS} w-full resize-y`}
          disabled={addReply.isPending}
        />
        {error && (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <a
            href={`mailto:${submission.email}?subject=Re: your message&body=${encodeURIComponent(body)}`}
            className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface"
          >
            Open in email
          </a>
          <button
            type="submit"
            disabled={addReply.isPending || body.trim().length === 0}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-60"
          >
            {addReply.isPending ? "Saving…" : "Save reply"}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/20"
          >
            Delete submission
          </button>
        </div>
      </form>
    </>
  )
}
