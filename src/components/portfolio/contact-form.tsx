import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function update<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const firstKey = (["name", "email", "message"] as const).find((k) => next[k]);
      if (firstKey) document.getElementById(`cf-${firstKey}`)?.focus();
      return;
    }
    setStatus("submitting");
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-full flex-col items-start justify-center gap-4 rounded-xl border border-border bg-background p-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
          ✓
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Message sent</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks, {values.name.split(" ")[0]}. I&apos;ll get back to you at {values.email} shortly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", message: "" });
            setStatus("idle");
          }}
          className="text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
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
        <label htmlFor="cf-email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
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
        <label htmlFor="cf-message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
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
          placeholder="Tell me about the role, team, or problem you&apos;re working on…"
          maxLength={1000}
        />
        {errors.message ? (
          <p id="cf-message-err" className="text-xs text-destructive">
            {errors.message}
          </p>
        ) : (
          <p id="cf-message-hint" className="text-xs text-muted-foreground">
            {values.message.length}/1000
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            Sending…
          </>
        ) : (
          <>Send message →</>
        )}
      </button>
    </form>
  );
}
