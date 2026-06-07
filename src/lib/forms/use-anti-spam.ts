import { useCallback, useEffect, useRef, useState } from "react"

// Bots typically submit forms in well under a second.
export const MIN_SUBMIT_MS = 1500

export type AntiSpamVerdict = "clean" | "bot" | "too-fast"

/**
 * Lightweight, dependency-free spam defenses for any form:
 * - a honeypot field that real users never see but bots fill in
 * - a minimum time-to-submit check to catch instant automated posts
 *
 * Returns the honeypot value/setter for the hidden field plus an `evaluate()`
 * to run at submit time. Keep it UI-agnostic so it can back any form.
 */
export function useAntiSpam() {
  const [website, setWebsite] = useState("")
  const mountedAt = useRef(Date.now())

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  const evaluate = useCallback((): AntiSpamVerdict => {
    if (website.trim() !== "") return "bot"
    if (Date.now() - mountedAt.current < MIN_SUBMIT_MS) return "too-fast"
    return "clean"
  }, [website])

  const reset = useCallback(() => {
    setWebsite("")
    mountedAt.current = Date.now()
  }, [])

  return { website, setWebsite, evaluate, reset }
}
