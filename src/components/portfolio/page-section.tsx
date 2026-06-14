import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function PageSection({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("relative py-24 md:py-32", className)} {...props}>
      {children}
    </section>
  )
}
