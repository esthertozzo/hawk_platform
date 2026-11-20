const labels = {
  ativo: "Ativo",
  inativo: "Inativo",
  manutencao: "Em manutenção",
  aberta: "Aberta",
  em_andamento: "Em andamento",
  resolvida: "Resolvida",
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
  normal: "Normal",
  falha: "Falha",
  detectado: "Detectado",
  travessia: "Travessia",
  liberacao: "Liberação"
};
export function StatusBadge({
  value
}) {
  const tone = ["alta", "aberta", "falha", "manutencao"].includes(value) ? "bg-hawk-orange/10 text-hawk-orange" : ["ativo", "resolvida", "normal"].includes(value) ? "bg-hawk-green-dark text-hawk-green" : "bg-hawk-card text-hawk-muted";
  return <span className={`inline-flex items-center gap-2 whitespace-nowrap px-2.5 py-1 text-xs font-medium ${tone}`}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />{labels[value] ?? value ?? "Não informado"}</span>;
}
