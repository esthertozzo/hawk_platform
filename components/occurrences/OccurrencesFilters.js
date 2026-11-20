export function OccurrencesFilters({ filters, onFilterChange }) {
  return (
    <section
      aria-label="Filtros de ocorrências"
      className="grid gap-4 border-b border-hawk-border bg-hawk-surface p-5 sm:grid-cols-2"
    >
      <label className="grid gap-1">
        <span className="text-sm font-medium">Prioridade</span>

        <select
          value={filters.prioridade}
          onChange={(event) =>
            onFilterChange("prioridade", event.target.value)
          }
          className="hawk-input"
        >
          <option value="">Todas</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-medium">Situação</span>

        <select
          value={filters.situacao}
          onChange={(event) =>
            onFilterChange("situacao", event.target.value)
          }
          className="hawk-input"
        >
          <option value="">Todas</option>
          <option value="aberta">Aberta</option>
          <option value="em_andamento">Em andamento</option>
          <option value="resolvida">Resolvida</option>
        </select>
      </label>
    </section>
  );
}