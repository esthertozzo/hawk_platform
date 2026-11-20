import { MetricCard } from "./MetricCard";
import { formatReportNumber } from "../../utils/reportPresentation";

export function DashboardMetrics({
  title,
  report,
  metrics,
  loading,
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>

      {report.error ? (
        <p role="alert" className="text-sm text-hawk-orange">
          Não foi possível carregar esta seção: {report.error}
        </p>
      ) : report.data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.field}
              title={metric.title}
              value={formatReportNumber(
                report.data[metric.field],
                metric.decimals ?? 0
              )}
              unit={metric.unit}
              description={metric.description}
            />
          ))}
        </div>
      ) : (
        <p role="status" className="text-sm text-hawk-muted">
          {loading ? "Carregando indicadores..." : "Sem dados disponíveis."}
        </p>
      )}
    </section>
  );
}