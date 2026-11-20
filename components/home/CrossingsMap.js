import Link from "next/link";
import { Panel } from "../ui/Panel";
export function CrossingsMap({
  detail = false
}) {
  const points = detail ? [[350, 175]] : [[135, 95], [370, 95], [575, 95], [135, 245], [370, 245], [575, 245]];
  return <Panel title={detail ? "Leitura espacial" : "Panorama dos cruzamentos"} eyebrow={detail ? "01 / REPRESENTAÇÃO DO CRUZAMENTO" : undefined} action={<span className="border border-hawk-border px-3 py-2 text-xs text-hawk-muted">VISÃO ILUSTRATIVA</span>}>
      <p className="px-5 pt-4 text-xs text-hawk-muted">Representação esquemática · Localizações fictícias</p>
      <svg viewBox="0 0 700 340" role="img" aria-label="Mapa esquemático de ruas e cruzamentos fictícios, sem indicação de conectividade" className="mt-4 block h-auto w-full bg-hawk-sidebar">
        <defs>
          <pattern id={detail ? "detail-grid" : "overview-grid"} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern>
        </defs>
        <rect width="700" height="340" fill={`url(#${detail ? "detail-grid" : "overview-grid"})`} className="text-hawk-border" opacity="0.45" />
        <g fill="none" className="stroke-hawk-border" strokeWidth="26"><path d="M-30 125L730 70M-30 285L730 225M115-30L150 370M345-30L390 370M565-30L605 370" /></g>
        <g fill="none" className="stroke-hawk-muted" opacity="0.3" strokeWidth="1" strokeDasharray="8 10"><path d="M-30 125L730 70M-30 285L730 225M115-30L150 370M345-30L390 370M565-30L605 370" /></g>
        <g className="fill-hawk-notice stroke-hawk-border"><rect x="25" y="25" width="65" height="55" rx="3" /><rect x="190" y="20" width="110" height="55" rx="3" /><rect x="425" y="20" width="95" height="40" rx="3" /><rect x="30" y="165" width="65" height="65" rx="3" /><rect x="195" y="150" width="110" height="70" rx="3" /><rect x="435" y="140" width="90" height="70" rx="3" /><rect x="195" y="290" width="115" height="35" rx="3" /><rect x="440" y="275" width="95" height="45" rx="3" /></g>
        <g className="fill-hawk-muted" fontSize="10" letterSpacing="2"><text x="30" y="145">AV. CENTRAL</text><text x="425" y="255">RUA DAS FLORES</text></g>
        {points.map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r="17" className={index % 3 === 1 ? "fill-hawk-orange/15" : "fill-hawk-green/15"} /><circle cx={x} cy={y} r="6" className={index % 3 === 1 ? "fill-hawk-orange" : "fill-hawk-green"} /></g>)}
        {detail && <g className="stroke-hawk-text" strokeWidth="5">{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${315 + i * 12} 130v30 M${315 + i * 12} 200v30`} />)}</g>}
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hawk-border px-5 py-3 text-xs text-hawk-muted"><span>Pontos e cores ilustrativos · Não indicam estado real</span><Link href="/cruzamentos" className="text-hawk-green hover:underline">Consultar cadastros ↗</Link></div>
    </Panel>;
}
