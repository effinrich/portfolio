export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
}: {
  eyebrow: string
  title: string
  description?: string
  index?: string
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span className="h-px w-8 bg-primary/60" />
        {index && <span className="opacity-50">{index} /\/\ </span>}
        {eyebrow}
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-3 text-pretty text-muted-foreground">{description}</p> : null}
    </div>
  )
}
