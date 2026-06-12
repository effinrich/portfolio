import { useRef, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { FormSuccessCard } from "@/components/forms/form-success"
import { SubmitButton } from "@/components/forms/submit-button"
import { contactSchema, contactDefaults, MESSAGE_MAX_LENGTH } from "./contact-schema"

type Errors = Partial<Record<"name" | "email" | "message", string>>

// Bots typically submit forms in well under a second.
const MIN_SUBMIT_MS = 1500

export function ContactForm({ initialStatus }: { initialStatus?: "ok" | "error" | "invalid" }) {
  const [values, setValues] = useState(contactDefaults)
  const [website, setWebsite] = useState("") // honeypot — must stay empty
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    initialStatus === "ok" ? "success" : "idle",
  )
  const [formError, setFormError] = useState<string | null>(
    initialStatus === "error"
      ? "Something went wrong sending your message. Please try again."
      : initialStatus === "invalid"
        ? "Please check your entries and try again."
        : null,
  )
  const mountedAt = useRef<number>(Date.now())

  function update<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)

    // Spam check 1: honeypot field. Real users can't see it; bots fill every input.
    if (website.trim() !== "") {
      // Pretend success so bots don't retry, but don't actually do anything.
      setStatus("success")
      return
    }

    // Spam check 2: minimum time-to-submit.
    if (Date.now() - mountedAt.current < MIN_SUBMIT_MS) {
      setFormError("Submission looked automated. Please try again in a moment.")
      return
    }

    const result = contactSchema.safeParse(values)
    if (!result.success) {
      const next: Errors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors
        if (!next[key]) next[key] = issue.message
      }
      setErrors(next)
      const firstKey = (["name", "email", "message"] as const).find((k) => next[k])
      if (firstKey) document.getElementById(`cf-${firstKey}`)?.focus()
      return
    }
    setStatus("submitting")
    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
    })
    if (error) {
      setFormError("Something went wrong sending your message. Please try again.")
      setStatus("idle")
      return
    }
    setStatus("success")
  }

  if (status === "success") {
    return (
      <FormSuccessCard
        title="Message sent"
        description={
          values.name
            ? `Thanks, ${values.name.split(" ")[0]}. I'll get back to you at ${values.email} shortly.`
            : "Thanks for reaching out — I'll get back to you shortly."
        }
        actionLabel="Send another message"
        onAction={() => {
          setValues(contactDefaults)
          setWebsite("")
          setFormError(null)
          mountedAt.current = Date.now()
          setStatus("idle")
        }}
      />
    )
  }

  const inputBase =
    "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"

  return (
    <form
      action="/api/contact"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
    >
      {/* Honeypot — hidden from real users, irresistible to bots. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="cf-website">Website (leave blank)</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-name"
          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
        >
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
          className={`${inputBase} ${errors.name ? "border-destructive" : "border-border"}`}
          placeholder="Ada Lovelace"
        />
        {errors.name && (
          <p id="cf-name-err" className="text-xs text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-email"
          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
        >
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          inputMode="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
          className={`${inputBase} ${errors.email ? "border-destructive" : "border-border"}`}
          placeholder="you@company.com"
        />
        {errors.email && (
          <p id="cf-email-err" className="text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-message"
          className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : "cf-message-hint"}
          className={`${inputBase} resize-y ${errors.message ? "border-destructive" : "border-border"}`}
          placeholder="Tell me about the role, team, or problem you're working on…"
          maxLength={MESSAGE_MAX_LENGTH}
        />
        {errors.message ? (
          <p id="cf-message-err" className="text-xs text-destructive">
            {errors.message}
          </p>
        ) : (
          <p id="cf-message-hint" className="text-xs text-muted-foreground">
            {values.message.length}/{MESSAGE_MAX_LENGTH}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      )}

      <SubmitButton pending={status === "submitting"}>Send message →</SubmitButton>
    </form>
  )
}
