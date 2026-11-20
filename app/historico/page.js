"use client";
import { AppShell } from "../../components/layout/AppShell";
import { PageHeader } from "../../components/layout/PageHeader";

import { useState } from "react";
import { Panel } from "../../components/ui/Panel";
import { EventDetails } from "../../components/events/EventDetails";
import { EventsPeriodFilter } from "../../components/events/EventsPeriodFilter";
import { useEvents } from "../../hooks/useEvents";
import { useCrossings } from "../../hooks/useCrossings";
import { EventsFilters } from "../../components/events/EventsFilters";
import { EventsList } from "../../components/events/EventsList";

export default function HistoryPage() {
  const {
    events,
    filters,
    loading,
    error,
    changeFilter,
    resetFilters,
    reloadEvents,
    applyPeriod,
  } = useEvents();

  const {
    crossings,
    loading: crossingsLoading,
    error: crossingsError,
  } = useCrossings();

  const crossingNames = Object.fromEntries(
    crossings.map((crossing) => [crossing.id, crossing.nome])
  );

  const [periodKey, setPeriodKey] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const selected = events.find(event => event.id === selectedId) ?? events[0] ?? null;

function handleResetFilters() {
  resetFilters();
  setPeriodKey((current) => current + 1);
}

  return (
    <AppShell activeHref="/historico">
      <PageHeader eyebrow="MEMÓRIA OPERACIONAL / 05" title="Histórico." description="Cada evento conta uma parte da operação." action={<button
          type="button"
          onClick={reloadEvents}
          disabled={loading}
          className="hawk-button-secondary"
        >
          {loading ? "Atualizando..." : "Atualizar histórico"}
        </button>} />

      <EventsFilters
        filters={filters}
        onFilterChange={changeFilter}
        onReset={handleResetFilters}
        crossings={crossings}
        crossingsLoading={crossingsLoading}
        crossingsError={crossingsError}
      />

      <EventsPeriodFilter
  key={periodKey}
  onApply={applyPeriod}
/>

      <div className="grid items-start gap-5 xl:grid-cols-5"><div className="min-w-0 xl:col-span-3"><Panel eyebrow="02 / LINHA DO TEMPO" title="Eventos recentes">
      <EventsList
        onSelect={setSelectedId}
        selectedId={selected?.id}
        events={events}
        loading={loading}
        error={error}
        onRetry={reloadEvents}
        crossingNames={crossingNames}
        limit={filters.limite}
      />
      </Panel></div><aside className="min-w-0 space-y-4 xl:col-span-2"><p className="text-xs tracking-widest text-hawk-green">03 / EVENTO SELECIONADO</p>{!loading && !error && selected ? <EventDetails event={selected}/> : <Panel title="Detalhe do evento"><p className="p-5 text-sm text-hawk-muted">Selecione um evento após carregar os registros.</p></Panel>}</aside></div>
    </AppShell>
  );
}