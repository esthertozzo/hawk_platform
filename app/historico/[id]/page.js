"use client";
import { AppShell } from "../../../components/layout/AppShell";
import { PageHeader } from "../../../components/layout/PageHeader";


import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEvent } from "../../../hooks/useEvent";
import { EventDetails } from "../../../components/events/EventDetails";

function EventDetailsContent() {
  const { id } = useParams();

  const {
    event,
    loading,
    error,
    reloadEvent,
  } = useEvent(id);

  return (
    <AppShell activeHref="/historico">
      <Link href="/historico" className="text-xs text-hawk-green hover:underline">← Voltar ao histórico</Link>
      <PageHeader eyebrow="MEMÓRIA OPERACIONAL / EVENTO" title="Detalhe do evento." description="Informações e contexto do evento registrado." />

      {loading ? (
        <p role="status">Carregando evento...</p>
      ) : error ? (
        <section className="rounded-sm border border-hawk-orange/40 p-5">
          <p role="alert" className="text-sm text-hawk-orange">
            Não foi possível carregar o evento: {error}
          </p>

          <button
            type="button"
            onClick={reloadEvent}
            className="mt-3 text-sm font-medium underline"
          >
            Tentar novamente
          </button>
        </section>
      ) : event ? (
        <EventDetails event={event} />
      ) : (
        <p role="status">Nenhum dado de evento disponível.</p>
      )}
    </AppShell>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-4xl p-6 md:p-8">
          <p role="status">Preparando detalhe do evento...</p>
        </main>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}