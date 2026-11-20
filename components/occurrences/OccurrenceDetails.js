import Link from "next/link";
import { Panel } from "../ui/Panel";
import { StatusBadge } from "../ui/StatusBadge";
import { formatEventDate } from "../../utils/eventPresentation";
export function OccurrenceDetails({
  occurrence,
  crossingName,
  onEdit,
  disabled
}) {
  return <Panel eyebrow="02 / OCORRÊNCIA SELECIONADA" title={occurrence?.tipo ?? "Detalhe do registro"}>{!occurrence ? <p className="p-6 text-sm text-hawk-muted">Selecione uma ocorrência na lista para consultar seus detalhes.</p> : <div className="space-y-5 p-5"><p className="break-all text-xs text-hawk-muted">{occurrence.id}</p><div className="flex flex-wrap gap-2"><StatusBadge value={occurrence.prioridade} /><StatusBadge value={occurrence.situacao} /></div><div><h3 className="text-xs tracking-wider text-hawk-muted">CONTEXTO</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{occurrence.descricao}</p></div><dl className="space-y-3 text-sm"><div className="border-t border-hawk-border pt-3"><dt className="text-hawk-muted">Cruzamento</dt><dd className="mt-1 break-all">{crossingName ?? occurrence.cruzamento_id}</dd></div><div><dt className="text-hawk-muted">Data de registro</dt><dd className="mt-1">{formatEventDate(occurrence.criado_em)}</dd></div><div><dt className="text-hawk-muted">Última atualização</dt><dd className="mt-1">{formatEventDate(occurrence.atualizado_em)}</dd></div></dl><div className="border-l-2 border-hawk-orange bg-hawk-orange/5 p-4 text-xs leading-relaxed text-hawk-muted">Uma ocorrência é um registro de acompanhamento. A condição física da travessia precisa ser verificada pela equipe responsável.</div><button type="button" onClick={() => onEdit(occurrence)} disabled={disabled} className="hawk-button w-full">Atualizar ocorrência ↗</button><Link href={'/cruzamentos/' + occurrence.cruzamento_id} className="hawk-button-secondary w-full">Ver cruzamento</Link></div>}</Panel>;
}
