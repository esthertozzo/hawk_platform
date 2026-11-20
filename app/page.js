"use client";

import { AppShell } from "../components/layout/AppShell";
import { CrossingsMap } from "../components/home/CrossingsMap";
import { PageHeader } from "../components/layout/PageHeader";
import { OverviewStats } from "../components/home/OverviewStats";
import { OpenOccurrencesCard } from "../components/home/OpenOccurrencesCard";
import { RecentEvents } from "../components/home/RecentEvents";
import { useHomeOverview } from "../hooks/useHomeOverview";

export default function HomePage() {
  const overview = useHomeOverview();

  return (
    <AppShell activeHref="/">
          <PageHeader
            eyebrow="CENTRAL DE MONITORAMENTO / 01"
            title="A cidade, em perspectiva."
            description="Uma leitura operacional dos cruzamentos e dos eventos registrados."
          />

          <div className="grid items-start gap-5 xl:grid-cols-3">
            <div className="space-y-5 xl:col-span-2">
              <CrossingsMap />
              <OverviewStats
                total={overview.totalCrossings}
                loading={overview.crossingsLoading}
                error={overview.crossingsError}
              />
            </div>

            <div className="space-y-5">
              <OpenOccurrencesCard
                total={overview.openOccurrences}
                loading={overview.occurrencesLoading}
                error={overview.occurrencesError}
              />

              <RecentEvents
                events={overview.recentEvents}
                loading={overview.eventsLoading}
                error={overview.eventsError}
                crossingNames={overview.crossingNames}
              />

              <section className="border-l-2 border-hawk-green bg-hawk-notice p-5">
                <h2 className="text-sm font-semibold">
                  Leitura responsável dos estados
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-hawk-muted">
                  A ausência de comunicação com o painel não confirma
                  falha física do semáforo. A proteção da travessia é
                  responsabilidade da lógica local do HAWK Cross.
                </p>
              </section>
            </div>
          </div>
    </AppShell>
  );
}
