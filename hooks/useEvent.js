"use client";

import { useEffect, useState } from "react";
import { getEventById } from "../services/eventsService";

export function useEvent(id) {
  const [result, setResult] = useState({
    id: null,
    event: null,
    loading: true,
    error: "",
  });

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    if (!id) {
      return () => controller.abort();
    }

    async function loadEvent() {
      setResult({
        id,
        event: null,
        loading: true,
        error: "",
      });

      try {
        const data = await getEventById(id, {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setResult({
            id,
            event: data,
            loading: false,
            error: "",
          });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult({
            id,
            event: null,
            loading: false,
            error: err.message || "Não foi possível carregar o evento.",
          });
        }
      }
    }

    loadEvent();

    return () => controller.abort();
  }, [id, refreshKey]);

  function reloadEvent() {
    setRefreshKey((current) => current + 1);
  }

  const isCurrent = result.id === id;

  return {
    event: isCurrent ? result.event : null,
    loading: Boolean(id) && (!isCurrent || result.loading),
    error: isCurrent ? result.error : "",
    reloadEvent,
  };
}