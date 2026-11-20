"use client";

import { useCrossings } from "./useCrossings";
import { useOccurrences } from "./useOccurrences";
import { useEvents } from "./useEvents";

export function useHomeOverview() {
  const crossings = useCrossings();
  const occurrences = useOccurrences();
  const events = useEvents();

  const crossingNames = Object.fromEntries(
    crossings.crossings.map((crossing) => [
      crossing.id,
      crossing.nome,
    ])
  );

  return {
    totalCrossings: crossings.crossings.length,
    crossingsLoading: crossings.loading,
    crossingsError: crossings.error,

    openOccurrences: occurrences.occurrences.filter(
      (occurrence) => occurrence.situacao === "aberta"
    ).length,
    occurrencesLoading: occurrences.loading,
    occurrencesError: occurrences.error,

    recentEvents: events.events.slice(0, 3),
    eventsLoading: events.loading,
    eventsError: events.error,

    crossingNames,
  };
}