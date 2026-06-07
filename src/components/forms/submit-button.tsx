import { Loader2 } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SubmitButtonProps extends ButtonProps {
  pending?: boolean
  pendingLabel?: string
}

/**
 * Submit button with a built-in pending state: swaps the label for a spinner
 * and disables interaction while async work is in flight.
 */
export function SubmitButton({
  pending = false,
  pendingLabel = "Sending…",
  children,
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className={cn(
        "shadow-[var(--glow-primary)] transition-transform hover:-translate-y-0.5 disabled:hover:translate-y-0",
        className
      )}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
