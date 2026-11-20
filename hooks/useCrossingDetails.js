"use client";

import { useEffect, useState } from "react";
import { getCrossingById, getCrossingState } from "../services/crossingsService";
import { getEvents } from "../services/eventsService";
export function useCrossingDetails(id) {
  const [result, setResult] = useState({
    id: null,
    crossing: null,
    state: null,
    events: [],
    loading: true,
    error: "",
    eventsError: "",
    stateError: ""
  });
  useEffect(() => {
    const controller = new AbortController();
    if (!id) return () => controller.abort();
    async function load() {
      const [crossing, state, events] = await Promise.allSettled([getCrossingById(id, {
        signal: controller.signal
      }), getCrossingState(id, {
        signal: controller.signal
      }), getEvents({
        cruzamento_id: id,
        limite: 4
      }, {
        signal: controller.signal
      })]);
      if (controller.signal.aborted) return;
      setResult({
        id,
        crossing: crossing.status === "fulfilled" ? crossing.value : null,
        error: crossing.status === "rejected" ? crossing.reason.message : "",
        state: state.status === "fulfilled" ? state.value : null,
        stateError: state.status === "rejected" ? state.reason.message : "",
        events: events.status === "fulfilled" ? events.value : [],
        eventsError: events.status === "rejected" ? events.reason.message : "",
        loading: false
      });
    }
    load();
    return () => controller.abort();
  }, [id]);
  return {
    ...result,
    loading: result.id !== id || result.loading
  };
}
