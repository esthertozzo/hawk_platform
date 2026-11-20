"use client";

import { useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { PageHeader } from "../../components/layout/PageHeader";
import { Panel } from "../../components/ui/Panel";
import { OverviewStats } from "../../components/home/OverviewStats";
import { CrossingForm } from "../../components/crossings/CrossingForm";
import { CrossingsList } from "../../components/crossings/CrossingsList";
import { useCrossings } from "../../hooks/useCrossings";
import { useCrossingDirectory } from "../../hooks/useCrossingDirectory";
export default function CrossingsPage() {
  const {
    crossings,
    loading,
    error,
    addCrossing,
    editCrossing,
    removeCrossing
  } = useCrossings();
  const directory = useCrossingDirectory(crossings);
  const [editingCrossing, setEditingCrossing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  async function handleSubmit(data) {
    if (editingCrossing) await editCrossing(editingCrossing.id, data);else await addCrossing(data);
    setMessage(editingCrossing ? "Cruzamento atualizado com sucesso." : "Cruzamento cadastrado com sucesso.");
    setEditingCrossing(null);
    setShowForm(false);
  }
  function handleEdit(crossing) {
    setEditingCrossing(crossing);
    setShowForm(true);
    setMessage("");
  }
  function handleCancel() {
    setEditingCrossing(null);
    setShowForm(false);
  }
  async function handleDelete(crossing) {
    if (deleting || !window.confirm('Deseja excluir o cruzamento "' + crossing.nome + '"?')) return;
    try {
      setDeleting(true);
      setDeleteError("");
      await removeCrossing(crossing.id);
      if (editingCrossing?.id === crossing.id) handleCancel();
      setMessage("Cruzamento excluído com sucesso.");
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleting(false);
    }
  }
  return <AppShell activeHref="/cruzamentos">
    <PageHeader eyebrow="GESTÃO OPERACIONAL / 02" title="Cruzamentos." description="Consulte os registros e acesse os detalhes de cada cruzamento." action={<button type="button" className="hawk-button" onClick={() => {
      setEditingCrossing(null);
      setShowForm(true);
    }}>+ Novo cruzamento</button>} />
    <OverviewStats total={crossings.length} loading={loading} error={error} />
    {message && <p role="status" className="text-sm text-hawk-green">{message}</p>}{deleteError && <p role="alert" className="text-sm text-hawk-orange">{deleteError}</p>}
    {showForm && <div className="space-y-3"><button type="button" className="hawk-button-secondary" onClick={handleCancel}>Fechar formulário</button><CrossingForm key={editingCrossing?.id ?? "new"} initialData={editingCrossing} onSubmit={handleSubmit} onCancel={handleCancel} /></div>}
    <div className="grid items-start gap-5 xl:grid-cols-4"><div className="min-w-0 xl:col-span-3"><Panel eyebrow="REGISTROS / CRUZAMENTOS" title="Diretório operacional">
      <div className="grid gap-3 border-b border-hawk-border p-4 sm:grid-cols-3"><label className="sm:col-span-2"><span className="sr-only">Buscar cruzamento</span><input className="hawk-input" placeholder="Buscar nome, bairro ou identificador" value={directory.search} onChange={e => directory.setSearch(e.target.value)} /></label><label><span className="sr-only">Status cadastral</span><select className="hawk-input" value={directory.status} onChange={e => directory.setStatus(e.target.value)}><option value="">Status: todos</option><option value="ativo">Ativo</option><option value="manutencao">Em manutenção</option><option value="inativo">Inativo</option></select></label></div>
      <CrossingsList crossings={directory.visibleCrossings} loading={loading} error={error} onEdit={handleEdit} onDelete={handleDelete} />
    </Panel></div><Panel eyebrow="LEITURA OPERACIONAL" title="Entenda os estados."><div className="space-y-5 p-5 text-sm text-hawk-muted"><p>O status cadastral descreve o registro administrativo do cruzamento.</p><p><strong className="text-hawk-green">Ativo</strong><br />Cadastro em operação.</p><p><strong className="text-hawk-orange">Em manutenção</strong><br />Cadastro marcado para manutenção.</p><p><strong className="text-hawk-text">Inativo</strong><br />Cadastro fora de operação.</p><p className="border-t border-hawk-border pt-4 text-xs">Esses estados não confirmam a conectividade nem a condição física do semáforo.</p></div></Panel></div>
  </AppShell>;
}
