import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { FormSuccessCard } from "@/components/forms/form-success"
import { HoneypotField } from "@/components/forms/honeypot-field"
import { SubmitButton } from "@/components/forms/submit-button"
import { TextField } from "@/components/forms/text-field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form } from "@/components/ui/form"
import { supabase } from "@/integrations/supabase/client"
import { useAntiSpam } from "@/lib/forms/use-anti-spam"

import {
  contactDefaults,
  contactSchema,
  MESSAGE_MAX_LENGTH,
  type ContactValues
} from "./contact-schema"

export function ContactForm({
  initialStatus
}: {
  initialStatus?: "ok" | "error" | "invalid"
} = {}) {
  const antiSpam = useAntiSpam()
  const [sentTo, setSentTo] = useState<ContactValues | null>(null)
  const [showInitialSuccess, setShowInitialSuccess] = useState(initialStatus === "ok")
  const [initialError, setInitialError] = useState<string | null>(
    initialStatus === "error"
      ? "Something went wrong sending your message. Please try again."
      : initialStatus === "invalid"
        ? "Please check your entries and try again."
        : null
  )

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults
  })

  const mutation = useMutation({
    mutationFn: async (values: ContactValues) => {
      const { error } = await supabase.from("contact_submissions").insert(values)
      if (error) throw error
      return values
    },
    onSuccess: (values) => setSentTo(values),
    onError: () =>
      form.setError("root", {
        message: "Something went wrong sending your message. Please try again."
      })
  })

  function onSubmit(values: ContactValues) {
    setShowInitialSuccess(false)
    setInitialError(null)
    form.clearErrors("root")
    switch (antiSpam.evaluate()) {
      case "bot":
        // Fake success so the bot moves on; nothing is actually sent.
        setSentTo(values)
        return
      case "too-fast":
        form.setError("root", {
          message: "Submission looked automated. Please try again in a moment."
        })
        return
      default:
        mutation.mutate(values)
    }
  }

  function reset() {
    form.reset(contactDefaults)
    antiSpam.reset()
    mutation.reset()
    setSentTo(null)
    setShowInitialSuccess(false)
    setInitialError(null)
  }

  if (showInitialSuccess) {
    return (
      <FormSuccessCard
        title="Message sent"
        description="Thanks for reaching out — I'll get back to you shortly."
        actionLabel="Send another message"
        onAction={reset}
      />
    )
  }

  if (sentTo) {
    return (
      <FormSuccessCard
        title="Message sent"
        description={
          <>
            Thanks, {sentTo.name.split(" ")[0]}. I&apos;ll get back to you at {sentTo.email}{" "}
            shortly.
          </>
        }
        actionLabel="Send another message"
        onAction={reset}
      />
    )
  }

  const rootError = form.formState.errors.root?.message ?? initialError

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6"
      >
        <HoneypotField value={antiSpam.website} onValueChange={antiSpam.setWebsite} />

        <TextField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Ada Lovelace"
          autoComplete="name"
        />
        <TextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@company.com"
        />
        <TextField
          control={form.control}
          name="message"
          label="Message"
          multiline
          rows={5}
          maxLength={MESSAGE_MAX_LENGTH}
          showCount
          placeholder="Tell me about the role, team, or problem you're working on…"
        />

        {rootError ? (
          <Alert variant="destructive">
            <AlertDescription>{rootError}</AlertDescription>
          </Alert>
        ) : null}

        <SubmitButton pending={mutation.isPending} size="lg" className="font-semibold">
          Send message →
        </SubmitButton>
      </form>
    </Form>
  )
}
