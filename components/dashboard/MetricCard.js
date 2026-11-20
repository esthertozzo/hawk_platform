export function MetricCard({ title, value, unit, description }) {
  return (
    <article className="rounded-sm border border-hawk-border bg-hawk-surface p-5">
      <h3 className="text-sm font-medium text-hawk-muted">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold text-hawk-text">
        {value ?? "—"}

        {unit && (
          <span className="ml-1 text-base font-medium text-hawk-muted">
            {unit}
          </span>
        )}
      </p>

      {description && (
        <p className="mt-2 text-sm text-hawk-muted">
          {description}
        </p>
      )}
    </article>
  );
}