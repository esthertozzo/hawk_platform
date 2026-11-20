"use client";

import { useEffect, useState } from "react";
import { getEvents } from "../services/eventsService";

const initialFilters = {
  cruzamento_id: "",
  tipo: "",
  origem: "",
  de: "",
  ate: "",
  limite: 50,
};

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      setLoading(true);
      setError("");

      try {
        const data = await getEvents(filters, {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setEvents(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err.message || "Não foi possível carregar os eventos."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => controller.abort();
  }, [filters, refreshKey]);

  function changeFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetFilters() {
    setFilters({ ...initialFilters });
  }

  function reloadEvents() {
    setRefreshKey((current) => current + 1);
  }

  function applyPeriod({ de, ate }) {
  setFilters((current) => ({
    ...current,
    de,
    ate,
  }));
}

  return {
  events,
  filters,
  loading,
  error,
  changeFilter,
  resetFilters,
  reloadEvents,
  applyPeriod,
};
}