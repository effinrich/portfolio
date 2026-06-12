import { z } from "zod"

/** Shared length cap for the message field, reused by the live character counter. */
export const MESSAGE_MAX_LENGTH = 1000

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255, "Email must be less than 255 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(MESSAGE_MAX_LENGTH, `Message must be less than ${MESSAGE_MAX_LENGTH} characters`),
})

export type ContactValues = z.infer<typeof contactSchema>

export const contactDefaults: ContactValues = {
  name: "",
  email: "",
  message: "",
}
