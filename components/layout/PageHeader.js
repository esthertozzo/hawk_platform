export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-hawk-green">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-hawk-text md:text-4xl">
            {title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-hawk-muted">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 xl:items-end"><span className="inline-flex items-center gap-2 self-start border border-hawk-border bg-hawk-green-dark px-4 py-3 text-xs font-medium text-hawk-green">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-hawk-green"
          />
          AMBIENTE DEMONSTRATIVO
        </span>{action}</div>
      </div>

      <div className="mt-6 h-0.5 w-20 bg-hawk-orange" />
    </header>
  );
}
