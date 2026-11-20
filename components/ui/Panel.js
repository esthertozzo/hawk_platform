export function Panel({
  eyebrow,
  title,
  action,
  children,
  className = ""
}) {
  return <section className={`min-w-0 border border-hawk-border bg-hawk-surface ${className}`}>
      {(title || eyebrow) && <header className="flex flex-wrap items-start justify-between gap-3 border-b border-hawk-border p-5">
        <div>{eyebrow && <p className="mb-2 text-xs tracking-widest text-hawk-green">{eyebrow}</p>}<h2 className="text-lg font-semibold">{title}</h2></div>
        {action}
      </header>}
      {children}
    </section>;
}
