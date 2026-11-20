import { StatusBadge } from "../ui/StatusBadge";
import { formatEventDate } from "../../utils/eventPresentation";
export function OccurrencesList({
  occurrences,
  loading,
  error,
  onRetry,
  onSelect,
  selectedId,
  onEdit,
  onDelete,
  onSituationChange,
  actionsDisabled,
  crossingNames = {}
}) {
  if (loading) return <p role="status" className="p-6 text-sm text-hawk-muted">Carregando ocorrências...</p>;
  if (error) return <div className="p-6"><p role="alert" className="text-sm text-hawk-orange">{error}</p><button type="button" onClick={onRetry} className="mt-3 text-sm text-hawk-green underline">Tentar novamente</button></div>;
  if (!occurrences.length) return <p className="p-8 text-sm text-hawk-muted">Nenhuma ocorrência encontrada para estes filtros.</p>;
  return <ul className="divide-y divide-hawk-border">{occurrences.map(o => <li key={o.id} className={selectedId === o.id ? "border-l-2 border-hawk-green bg-hawk-green/5 p-5" : "border-l-2 border-transparent p-5 hover:bg-hawk-card"}>
 <button type="button" onClick={() => onSelect(o.id)} aria-pressed={selectedId === o.id} className="flex w-full flex-wrap items-start justify-between gap-3 text-left"><div className="min-w-0"><p className="text-xs text-hawk-muted">{formatEventDate(o.criado_em)}</p><h3 className="mt-2 font-semibold">{o.tipo}</h3><p className="mt-1 break-all text-xs text-hawk-muted">{crossingNames[o.cruzamento_id] ?? o.cruzamento_id}</p></div><div className="flex flex-wrap gap-2"><StatusBadge value={o.prioridade} /><StatusBadge value={o.situacao} /></div></button>
 <div className="mt-4 flex flex-wrap gap-4 text-xs"><button type="button" disabled={actionsDisabled} onClick={() => onEdit(o)} className="text-hawk-green hover:underline">Editar</button><button type="button" disabled={actionsDisabled} onClick={() => onDelete(o)} className="text-hawk-orange hover:underline">Excluir</button>{o.situacao === 'aberta' && <button type="button" disabled={actionsDisabled} onClick={() => onSituationChange(o, 'em_andamento')} className="text-hawk-muted hover:text-hawk-text">Iniciar atendimento</button>}{o.situacao === 'em_andamento' && <button type="button" disabled={actionsDisabled} onClick={() => onSituationChange(o, 'resolvida')} className="text-hawk-green hover:underline">Marcar como resolvida</button>}</div>
 </li>)}</ul>;
}
