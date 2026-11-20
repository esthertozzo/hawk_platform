"use client";

import { AppShell } from "../../components/layout/AppShell";
import { PageHeader } from "../../components/layout/PageHeader";
import { useState } from "react";
import { Panel } from "../../components/ui/Panel";
import { OccurrenceDetails } from "../../components/occurrences/OccurrenceDetails";
import { useOccurrences } from "../../hooks/useOccurrences";
import { useCrossings } from "../../hooks/useCrossings";
import { OccurrenceForm } from "../../components/occurrences/OccurrenceForm";
import { OccurrencesFilters } from "../../components/occurrences/OccurrencesFilters";
import { OccurrencesList } from "../../components/occurrences/OccurrencesList";
export default function OccurrencesPage() {
  const {
    occurrences,
    filters,
    loading,
    error,
    changeFilter,
    loadOccurrences,
    addOccurrence,
    editOccurrence,
    removeOccurrence,
    changeSituation
  } = useOccurrences();
  const {
    crossings,
    loading: crossingsLoading,
    error: crossingsError
  } = useCrossings();
  const [editingOccurrence, setEditingOccurrence] = useState(null);
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionPending, setActionPending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const crossingNames = Object.fromEntries(crossings.map(c => [c.id, c.nome]));
  const selected = occurrences.find(o => o.id === selectedId) ?? occurrences[0] ?? null;
  async function handleSubmit(data) {
    setMessage("");
    if (editingOccurrence) {
      await editOccurrence(editingOccurrence.id, data);
      setEditingOccurrence(null);
      setShowForm(false);
      setMessage("Ocorrência atualizada com sucesso.");
      return;
    }
    await addOccurrence(data);
    setShowForm(false);
    setMessage("Ocorrência cadastrada com sucesso.");
  }
  function handleEdit(occurrence) {
    setMessage("");
    setEditingOccurrence(occurrence);
    setShowForm(true);
  }
  function handleCancelEdit() {
    setEditingOccurrence(null);
  }
  async function handleDelete(occurrence) {
    if (actionPending) return;
    const confirmed = window.confirm(`Deseja excluir a ocorrência "${occurrence.tipo}"?`);
    if (!confirmed) return;
    try {
      setActionPending(true);
      setActionError("");
      setMessage("");
      await removeOccurrence(occurrence.id);
      if (editingOccurrence?.id === occurrence.id) {
        setEditingOccurrence(null);
      }
      setMessage("Ocorrência excluída com sucesso.");
    } catch (err) {
      setActionError(err.message || "Não foi possível excluir a ocorrência.");
    } finally {
      setActionPending(false);
    }
  }
  async function handleSituationChange(occurrence, situacao) {
    if (actionPending) return;
    try {
      setActionPending(true);
      setActionError("");
      setMessage("");
      await changeSituation(occurrence.id, situacao);
      setMessage("Situação atualizada com sucesso.");
    } catch (err) {
      setActionError(err.message || "Não foi possível atualizar a situação.");
    } finally {
      setActionPending(false);
    }
  }
  return <AppShell activeHref="/ocorrencias">
    <PageHeader eyebrow="GESTÃO OPERACIONAL / 04" title="Ocorrências." description="Registre, acompanhe e organize situações que exigem atenção." action={<button type="button" className="hawk-button" disabled={actionPending} onClick={() => {
      setEditingOccurrence(null);
      setShowForm(true);
    }}>+ Nova ocorrência</button>} />
    <div className="flex flex-wrap gap-8 border-y border-hawk-border py-5">{[['aberta', 'Em aberto'], ['em_andamento', 'Em andamento'], ['resolvida', 'Resolvidas']].map(([value, label]) => <div key={value} className="flex items-center gap-4"><span className={value === 'aberta' ? 'text-3xl font-bold text-hawk-orange' : 'text-3xl font-bold text-hawk-green'}>{loading || error ? '—' : occurrences.filter(o => o.situacao === value).length}</span><span className="text-sm text-hawk-muted">{label}<small className="mt-1 block text-xs">Na consulta atual</small></span></div>)}</div>
    {message && <p role="status" className="text-sm text-hawk-green">{message}</p>}{actionError && <p role="alert" className="text-sm text-hawk-orange">{actionError}</p>}
    {showForm && <div className="space-y-3"><button type="button" className="hawk-button-secondary" onClick={handleCancelEdit}>Fechar formulário</button><OccurrenceForm key={editingOccurrence?.id ?? 'new'} initialData={editingOccurrence} onSubmit={handleSubmit} onCancel={handleCancelEdit} crossings={crossings} crossingsLoading={crossingsLoading} crossingsError={crossingsError} /></div>}
    <div className="grid items-start gap-5 xl:grid-cols-5"><div className="min-w-0 xl:col-span-3"><Panel eyebrow="01 / FILA DE ACOMPANHAMENTO" title="Registros operacionais"><OccurrencesFilters filters={filters} onFilterChange={changeFilter} /><OccurrencesList occurrences={occurrences} loading={loading} error={error} onRetry={loadOccurrences} onSelect={setSelectedId} selectedId={selected?.id} onEdit={handleEdit} onDelete={handleDelete} onSituationChange={handleSituationChange} actionsDisabled={actionPending || Boolean(editingOccurrence)} crossingNames={crossingNames} /></Panel></div><div className="xl:col-span-2"><OccurrenceDetails occurrence={loading || error ? null : selected} crossingName={crossingNames[selected?.cruzamento_id]} onEdit={handleEdit} disabled={actionPending} /></div></div>
  </AppShell>;
}
