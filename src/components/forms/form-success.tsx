import type * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"

interface FormSuccessCardProps {
  title: string
  description: React.ReactNode
  actionLabel?: string
  onAction?: () => void
}

/**
 * Confirmation panel shown after a successful submission. Announces itself to
 * assistive tech and offers an optional reset action to submit again.
 */
export function FormSuccessCard({
  title,
  description,
  actionLabel,
  onAction,
}: FormSuccessCardProps) {
  return (
    <output
      aria-live="polite"
      className="flex h-full flex-col items-start justify-center gap-4 rounded-xl border border-border bg-background p-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {actionLabel && onAction ? (
        <Button
          type="button"
          variant="link"
          onClick={onAction}
          className="h-auto p-0 text-sm font-medium text-primary"
        >
          {actionLabel}
        </Button>
      ) : null}
    </output>
  )
}
