import Link from "next/link";
import {
  eventTypeLabels,
  eventOriginLabels,
  formatEventDate,
} from "../../utils/eventPresentation";

export function RecentEvents({
  events,
  loading,
  error,
  crossingNames,
}) {
  return (
    <section className="border border-hawk-border bg-hawk-surface p-5">
      <h2 className="text-lg font-semibold">
        Linha do tempo / recente
      </h2>

      {loading ? (
        <p role="status" className="mt-4 text-sm text-hawk-muted">
          Carregando eventos...
        </p>
      ) : error ? (
        <p role="alert" className="mt-4 text-sm text-hawk-orange">
          Não foi possível carregar os eventos: {error}
        </p>
      ) : events.length === 0 ? (
        <p className="mt-4 text-sm text-hawk-muted">
          Nenhum evento registrado.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-hawk-border">
          {events.map((event) => (
            <li key={event.id} className="py-4">
              <p className="text-xs text-hawk-muted">
                {formatEventDate(event.data_hora)}
              </p>

              <Link
                href={`/historico/${encodeURIComponent(event.id)}`}
                className="mt-2 inline-block text-sm font-medium hover:text-hawk-green"
              >
                {eventTypeLabels[event.tipo] ?? event.tipo}
              </Link>

              <p className="mt-1 break-words text-xs text-hawk-muted">
                {crossingNames[event.cruzamento_id] ??
                  event.cruzamento_id}
              </p>

              <p className="mt-1 text-xs text-hawk-muted">
                {eventOriginLabels[event.origem] ?? event.origem}
              </p>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/historico"
        className="mt-4 inline-block text-sm text-hawk-green underline"
      >
        Ver histórico completo
      </Link>
    </section>
  );
}