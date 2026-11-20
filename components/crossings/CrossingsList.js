import Link from "next/link";
import { StatusBadge } from "../ui/StatusBadge";
export function CrossingsList({
  crossings,
  loading,
  error,
  onEdit,
  onDelete
}) {
  if (loading) return <p role="status" className="p-6 text-sm text-hawk-muted">Carregando cruzamentos...</p>;
  if (error) return <p role="alert" className="p-6 text-sm text-hawk-orange">Não foi possível carregar os cruzamentos: {error}</p>;
  if (!crossings.length) return <p className="p-8 text-sm text-hawk-muted">Nenhum cruzamento encontrado. Cadastre um registro ou ajuste a busca.</p>;
  return <div className="overflow-x-auto"><table className="w-full text-left text-sm">
    <caption className="sr-only">Diretório de cruzamentos cadastrados</caption>
    <thead className="bg-hawk-sidebar text-xs uppercase tracking-wider text-hawk-muted"><tr><th scope="col" className="p-4">Cruzamento</th><th scope="col" className="p-4">Status cadastral</th><th scope="col" className="p-4">Via</th><th scope="col" className="p-4">Acesso</th></tr></thead>
    <tbody className="divide-y divide-hawk-border">{crossings.map((crossing, index) => <tr key={crossing.id} className="hover:bg-hawk-card">
      <th scope="row" className="min-w-48 p-4 font-normal"><div className="flex gap-3"><span className="text-xs text-hawk-green">{String(index + 1).padStart(2, '0')}</span><div><Link href={'/cruzamentos/' + crossing.id} className="font-semibold hover:text-hawk-green">{crossing.nome}</Link><p className="mt-1 text-xs text-hawk-muted">{crossing.bairro}</p></div></div></th>
      <td className="p-4"><StatusBadge value={crossing.status} /></td><td className="whitespace-nowrap p-4 text-hawk-muted">{crossing.largura_via_m} m</td>
      <td className="p-4"><div className="flex flex-wrap gap-3"><Link href={'/cruzamentos/' + crossing.id} className="text-hawk-green hover:underline">Detalhes ↗</Link><button type="button" onClick={() => onEdit(crossing)} className="text-hawk-muted hover:text-hawk-text">Editar</button><button type="button" onClick={() => onDelete(crossing)} className="text-hawk-orange hover:underline">Excluir</button></div></td>
    </tr>)}</tbody></table><p className="border-t border-hawk-border p-4 text-xs text-hawk-muted">{crossings.length} registro(s) exibido(s)</p></div>;
}
