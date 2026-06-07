interface HoneypotFieldProps {
  value: string
  onValueChange: (value: string) => void
  id?: string
  label?: string
}

/**
 * Visually hidden field that traps form-filling bots. Pair with `useAntiSpam`.
 * Positioned off-screen and removed from the tab order so humans never reach it.
 */
export function HoneypotField({
  value,
  onValueChange,
  id = "hp-website",
  label = "Website (leave blank)"
}: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  )
}
