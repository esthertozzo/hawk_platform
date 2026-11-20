"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "../../../components/layout/AppShell";
import { PageHeader } from "../../../components/layout/PageHeader";
import { Panel } from "../../../components/ui/Panel";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { CrossingsMap } from "../../../components/home/CrossingsMap";
import { RecentEvents } from "../../../components/home/RecentEvents";
import { useCrossingDetails } from "../../../hooks/useCrossingDetails";
import { formatEventDate } from "../../../utils/eventPresentation";


function CrossingDetailsContent() {
  const { id } = useParams();
  const { crossing, loading, error, events, eventsError, state, stateError } =
    useCrossingDetails(id);
  if (loading)
    return (
      <p role="status" className="py-10 text-hawk-muted">
        Carregando cruzamento...
      </p>
    );
  if (error || !crossing)
    return (
      <div
        role="alert"
        className="border border-hawk-border p-6 text-hawk-orange"
      >
        Não foi possível carregar o cruzamento:{" "}
        {error || "Registro não encontrado."}
      </div>
    );
  return (
    <>
      <Link
        href="/cruzamentos"
        className="text-xs text-hawk-green hover:underline"
      >
        ← Voltar aos cruzamentos
      </Link>
      <PageHeader
        eyebrow="MONITORAMENTO OPERACIONAL / 03"
        title={crossing.nome}
        description="Detalhes do cadastro, último estado registrado e eventos operacionais."
      />
      <dl className="grid gap-5 border-y border-hawk-border py-5 text-sm sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <dt className="text-xs text-hawk-muted">IDENTIFICADOR</dt>
          <dd className="mt-2 break-all">{crossing.id}</dd>
        </div>
        <div>
          <dt className="text-xs text-hawk-muted">BAIRRO</dt>
          <dd className="mt-2">{crossing.bairro}</dd>
        </div>
        <div>
          <dt className="text-xs text-hawk-muted">STATUS CADASTRAL</dt>
          <dd className="mt-2">
            <StatusBadge value={crossing.status} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-hawk-muted">LARGURA DA VIA</dt>
          <dd className="mt-2">{crossing.largura_via_m} m</dd>
        </div>
      </dl>
      <div className="grid items-start gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <CrossingsMap detail />
          <section className="border-l-2 border-hawk-orange bg-hawk-orange/5 p-5">
            <h2 className="font-semibold text-hawk-orange">
              Proteção local independente do painel
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-hawk-muted">
              O HAWK Cross executa a lógica de travessia localmente. Esta
              interface não envia comandos aos semáforos.
            </p>
          </section>
        </div>
        <div className="space-y-5">
          <Panel eyebrow="02 / ESTADO CONHECIDO" title="Último registro">
            <div className="space-y-4 p-5 text-sm">
              {stateError ? (
                <p role="alert" className="text-hawk-orange">
                  {stateError}
                </p>
              ) : (
                <>
                  <StatusBadge value={state?.estado} />
                  <p className="text-hawk-muted">
                    {state?.evento
                      ? formatEventDate(state.evento.data_hora)
                      : "Nenhum evento registrado. O estado normal é o padrão retornado pela API."}
                  </p>
                </>
              )}
              <p className="text-xs text-hawk-muted">
                O último evento não comprova comunicação em tempo real.
              </p>
              <p className="break-words text-hawk-muted">
                Coordenadas: {crossing.latitude}, {crossing.longitude}
              </p>
            </div>
          </Panel>
          <RecentEvents
            events={events}
            loading={false}
            error={eventsError}
            crossingNames={{
              [crossing.id]: crossing.nome,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function CrossingDetailsPage() {
  return (
    <AppShell activeHref="/cruzamentos">
      <Suspense fallback={<p role="status">Preparando detalhe...</p>}>
        <CrossingDetailsContent />
      </Suspense>
    </AppShell>
  );
}
