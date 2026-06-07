import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { supabaseAdmin } from "@/integrations/supabase/client.server"

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(1000),
  website: z.string().optional(), // honeypot
})

function redirectTo(url: string, status: "ok" | "error" | "invalid") {
  const origin = new URL(url).origin
  return new Response(null, {
    status: 303,
    headers: { Location: `${origin}/?contact=${status}#contact` },
  })
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let form: FormData
        try {
          form = await request.formData()
        } catch {
          return redirectTo(request.url, "invalid")
        }

        const raw = Object.fromEntries(form) as Record<string, string>
        const parsed = schema.safeParse(raw)
        if (!parsed.success) return redirectTo(request.url, "invalid")

        // Honeypot — silently treat as success so bots don't retry.
        if ((parsed.data.website ?? "").trim() !== "") {
          return redirectTo(request.url, "ok")
        }

        const { error } = await supabaseAdmin.from("contact_submissions").insert({
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
        })
        return redirectTo(request.url, error ? "error" : "ok")
      },
    },
  },
})
