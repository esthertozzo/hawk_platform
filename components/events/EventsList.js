import Link from "next/link";
import { eventTypeLabels, eventOriginLabels, formatEventDate } from "../../utils/eventPresentation";
export function EventsList({
  events,
  loading,
  error,
  onRetry,
  crossingNames = {},
  limit,
  onSelect,
  selectedId
}) {
  if (loading) return <p role="status" className="p-6 text-sm text-hawk-muted">Carregando eventos...</p>;
  if (error) return <div className="p-6"><p role="alert" className="text-sm text-hawk-orange">{error}</p><button type="button" onClick={onRetry} className="mt-3 text-sm text-hawk-green underline">Tentar novamente</button></div>;
  if (!events.length) return <p className="p-8 text-sm text-hawk-muted">Nenhum evento encontrado para os filtros selecionados.</p>;
  return <section aria-label="Eventos registrados"><ul className="divide-y divide-hawk-border">{events.map(event => <li key={event.id} className={selectedId === event.id ? 'border-l-2 border-hawk-green bg-hawk-green/5 p-5' : 'border-l-2 border-transparent p-5 hover:bg-hawk-card'}><div className="flex gap-4"><span aria-hidden="true" className={event.tipo === 'falha' ? 'mt-1 h-2 w-2 shrink-0 rounded-full bg-hawk-orange' : 'mt-1 h-2 w-2 shrink-0 rounded-full bg-hawk-green'} /><div className="min-w-0 flex-1"><p className="text-xs text-hawk-muted">{formatEventDate(event.data_hora)}</p><button type="button" onClick={() => onSelect?.(event.id)} aria-pressed={selectedId === event.id} className="mt-2 text-left font-semibold hover:text-hawk-green">{eventTypeLabels[event.tipo] ?? event.tipo}</button><p className="mt-2 break-all text-xs text-hawk-muted">{crossingNames[event.cruzamento_id] ?? event.cruzamento_id}</p><div className="mt-3 flex flex-wrap justify-between gap-3 text-xs"><span className="text-hawk-muted">{eventOriginLabels[event.origem] ?? event.origem}</span><Link href={'/historico/' + encodeURIComponent(event.id)} className="text-hawk-green hover:underline">Abrir detalhe ↗</Link></div></div></div></li>)}</ul><p className="border-t border-hawk-border px-5 py-3 text-xs text-hawk-muted">{events.length} evento(s) exibido(s) · Mais recentes primeiro · Limite: {limit}</p></section>;
}
