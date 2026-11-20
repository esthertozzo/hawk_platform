import {
  eventTypeLabels,
  eventOriginLabels,
} from "../../utils/eventPresentation";

export function EventsFilters({
  filters,
  onFilterChange,
  onReset,
  crossings,
  crossingsLoading,
  crossingsError,
}) {
  const selectClass = "hawk-input";

  return (
    <section
      aria-label="Filtros do histórico"
      className="border-b border-hawk-border bg-hawk-surface p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium">Cruzamento</span>

          <select
            value={filters.cruzamento_id}
            onChange={(event) =>
              onFilterChange("cruzamento_id", event.target.value)
            }
            disabled={crossingsLoading || Boolean(crossingsError)}
            className={selectClass}
          >
            <option value="">
              {crossingsLoading ? "Carregando..." : "Todos"}
            </option>

            {crossings.map((crossing) => (
              <option key={crossing.id} value={crossing.id}>
                {crossing.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Tipo</span>

          <select
            value={filters.tipo}
            onChange={(event) =>
              onFilterChange("tipo", event.target.value)
            }
            className={selectClass}
          >
            <option value="">Todos</option>

            {Object.entries(eventTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Origem</span>

          <select
            value={filters.origem}
            onChange={(event) =>
              onFilterChange("origem", event.target.value)
            }
            className={selectClass}
          >
            <option value="">Todas</option>

            {Object.entries(eventOriginLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Máximo de registros</span>

          <select
            value={filters.limite}
            onChange={(event) =>
              onFilterChange("limite", Number(event.target.value))
            }
            className={selectClass}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
          </select>
        </label>
      </div>

      {crossingsError && (
        <p role="alert" className="mt-3 text-sm text-hawk-orange">
          Não foi possível carregar o filtro de cruzamentos:{" "}
          {crossingsError}
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-medium underline"
      >
        Limpar filtros
      </button>
    </section>
  );
}