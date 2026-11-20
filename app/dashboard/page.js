"use client";
import { AppShell } from "../../components/layout/AppShell";
import { PageHeader } from "../../components/layout/PageHeader";

import { useDashboard } from "../../hooks/useDashboard";
import { DashboardMetrics } from "../../components/dashboard/DashboardMetrics";
import { CrossingsReportTable } from "../../components/dashboard/CrossingsReportTable";

const summaryMetrics = [
  {
    field: "total_travessias",
    title: "Travessias",
  },
  {
    field: "total_extensoes",
    title: "Extensões",
  },
  {
    field: "total_falhas",
    title: "Falhas",
  },
  {
    field: "total_ocorrencias",
    title: "Ocorrências",
  },
];

const timeMetrics = [
  {
    field: "tempo_medio_espera_s",
    title: "Tempo médio de espera",
    unit: "s",
    decimals: 1,
  },
  {
    field: "tempo_medio_travessia_s",
    title: "Tempo médio de travessia",
    unit: "s",
    decimals: 1,
  },
  {
    field: "percentual_extensoes",
    title: "Taxa de extensões",
    unit: "%",
    decimals: 1,
  },
];

export default function DashboardPage() {
  const {
    summary,
    times,
    crossings,
    loading,
    reloadDashboard,
  } = useDashboard();

  return (
    <AppShell activeHref="/dashboard">
      <PageHeader eyebrow="INTELIGÊNCIA OPERACIONAL / 06" title="Relatórios." description="Uma visão consolidada dos indicadores registrados no HAWK." action={<button
          type="button"
          onClick={reloadDashboard}
          disabled={loading}
          className="hawk-button-secondary"
        >
          {loading ? "Atualizando..." : "Atualizar relatórios"}
        </button>} />

      <DashboardMetrics
        title="Resumo operacional"
        report={summary}
        metrics={summaryMetrics}
        loading={loading}
      />

      <DashboardMetrics
        title="Tempos e extensões"
        report={times}
        metrics={timeMetrics}
        loading={loading}
      />

      <CrossingsReportTable
        report={crossings}
        loading={loading}
      />
    </AppShell>
  );
}