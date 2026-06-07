import type * as React from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface TextFieldProps<TValues extends FieldValues> {
  control: Control<TValues>
  name: FieldPath<TValues>
  label: string
  placeholder?: string
  description?: string
  /** Render a multi-line textarea instead of a single-line input. */
  multiline?: boolean
  rows?: number
  maxLength?: number
  /** Show a live `current/max` character counter (needs `maxLength`). */
  showCount?: boolean
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
  inputMode?: React.ComponentProps<"input">["inputMode"]
  spellCheck?: boolean
}

const fieldClass =
  "rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-primary/50 aria-[invalid=true]:border-destructive"

/**
 * Drop-in form field for react-hook-form: wires label, control, validation
 * message, optional helper text, and an optional character counter. Switches
 * between shadcn `Input` and `Textarea` via the `multiline` prop.
 */
export function TextField<TValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  multiline = false,
  rows = 5,
  maxLength,
  showCount = false,
  type = "text",
  autoComplete,
  inputMode,
  spellCheck
}: TextFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const count = String(field.value ?? "").length
        return (
          <FormItem>
            <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {label}
            </FormLabel>
            <FormControl>
              {multiline ? (
                <Textarea
                  {...field}
                  rows={rows}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  className={cn("min-h-32 resize-y", fieldClass)}
                />
              ) : (
                <Input
                  {...field}
                  type={type}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  inputMode={inputMode}
                  spellCheck={spellCheck}
                  className={cn("h-11", fieldClass)}
                />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <div className="flex items-center justify-between gap-2">
              <FormMessage />
              {showCount && maxLength ? (
                <span className="ml-auto text-[0.8rem] tabular-nums text-muted-foreground">
                  {count}/{maxLength}
                </span>
              ) : null}
            </div>
          </FormItem>
        )
      }}
    />
  )
}
