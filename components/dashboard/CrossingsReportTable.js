import { formatReportNumber } from "../../utils/reportPresentation";

const columns = [
  { field: "total_travessias", label: "Travessias" },
  { field: "total_extensoes", label: "Extensões" },
  { field: "total_falhas", label: "Falhas" },
  { field: "total_ocorrencias", label: "Ocorrências" },
  {
    field: "tempo_medio_espera_s",
    label: "Espera média (s)",
    decimals: 1,
  },
  {
    field: "tempo_medio_travessia_s",
    label: "Travessia média (s)",
    decimals: 1,
  },
  {
    field: "percentual_extensoes",
    label: "Extensões (%)",
    decimals: 1,
  },
];

export function CrossingsReportTable({ report, loading }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">
        Indicadores por cruzamento
      </h2>

      {report.error ? (
        <p role="alert" className="text-sm text-hawk-orange">
          Não foi possível carregar os cruzamentos: {report.error}
        </p>
      ) : report.data === null ? (
        <p role="status" className="text-sm text-hawk-muted">
          {loading ? "Carregando relatório..." : "Sem dados disponíveis."}
        </p>
      ) : report.data.length === 0 ? (
        <p className="rounded-sm border border-dashed border-hawk-border p-6 text-sm text-hawk-muted">
          Nenhum cruzamento cadastrado para apresentar no relatório.
        </p>
      ) : (
        <div
          role="region"
          aria-label="Tabela de indicadores por cruzamento"
          tabIndex={0}
          className="overflow-x-auto rounded-sm border border-hawk-border"
        >
          <table className="w-full text-sm">
            <caption className="sr-only">
              Totais e médias operacionais dos cruzamentos cadastrados
            </caption>

            <thead className="bg-hawk-sidebar text-hawk-muted">
              <tr>
                <th scope="col" className="p-4 text-left">
                  Cruzamento
                </th>

                {columns.map((column) => (
                  <th
                    key={column.field}
                    scope="col"
                    className="whitespace-nowrap p-4 text-right"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-hawk-border bg-hawk-surface">
              {report.data.map((crossing) => (
                <tr key={crossing.cruzamento_id}>
                  <th
                    scope="row"
                    className="min-w-48 p-4 text-left font-medium"
                  >
                    {crossing.nome}
                  </th>

                  {columns.map((column) => (
                    <td
                      key={column.field}
                      className="p-4 text-right tabular-nums"
                    >
                      {formatReportNumber(
                        crossing[column.field],
                        column.decimals ?? 0
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}