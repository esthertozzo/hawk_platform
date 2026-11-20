import {
  eventTypeLabels,
  eventOriginLabels,
  formatEventDate,
} from "../../utils/eventPresentation";

function DetailField({ label, children }) {
  return (
    <div>
      <dt className="text-sm text-hawk-muted">{label}</dt>
      <dd className="mt-1 break-words font-medium">
        {children}
      </dd>
    </div>
  );
}

function formatSeconds(value) {
  return value == null ? "Não informado" : `${value} s`;
}

function formatBoolean(value) {
  if (value === true) return "Sim";
  if (value === false) return "Não";
  return "Não informado";
}

const situationLabels = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  resolvida: "Resolvida",
};

const priorityLabels = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

export function EventDetails({ event }) {
  const occurrence = event.ocorrencia_criada;

  return (
    <div className="space-y-6">
      <section className="border border-hawk-border bg-hawk-surface p-5">
        <h2 className="text-xl font-semibold">
          Informações do evento
        </h2>

        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <DetailField label="Identificador">
            {event.id}
          </DetailField>

          <DetailField label="ID do cruzamento">
            {event.cruzamento_id}
          </DetailField>

          <DetailField label="Tipo">
            {eventTypeLabels[event.tipo] ?? event.tipo}
          </DetailField>

          <DetailField label="Estado registrado">
            {event.estado ?? "Não informado"}
          </DetailField>

          <DetailField label="Origem">
            {eventOriginLabels[event.origem] ?? event.origem}
          </DetailField>

          <DetailField label="Data e hora — São Paulo">
            {formatEventDate(event.data_hora)}
          </DetailField>

          <DetailField label="Confiança retornada">
            {event.confianca ?? "Não informada"}
          </DetailField>

          <DetailField label="Acionador">
            {formatBoolean(event.acionador)}
          </DetailField>

          <DetailField label="Tempo de espera">
            {formatSeconds(event.tempo_espera_s)}
          </DetailField>

          <DetailField label="Tempo de travessia">
            {formatSeconds(event.tempo_travessia_s)}
          </DetailField>
        </dl>
      </section>

      <section className="border border-hawk-border bg-hawk-surface p-5">
        <h2 className="text-xl font-semibold">
          Ocorrência associada
        </h2>

        {occurrence ? (
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <DetailField label="Identificador da ocorrência">
              {occurrence.id}
            </DetailField>

            <DetailField label="Prioridade informada no evento">
              {priorityLabels[occurrence.prioridade] ??
                occurrence.prioridade ??
                "Não informada"}
            </DetailField>

            <DetailField label="Situação informada no evento">
              {situationLabels[occurrence.situacao] ??
                occurrence.situacao ??
                "Não informada"}
            </DetailField>
          </dl>
        ) : (
          <p className="mt-3 text-sm text-hawk-muted">
            A API não retornou uma ocorrência associada a este evento.
          </p>
        )}
      </section>
    </div>
  );
}