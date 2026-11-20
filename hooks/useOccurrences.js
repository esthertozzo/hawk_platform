"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getOccurrences,
  createOccurrence,
  updateOccurrence,
  deleteOccurrence,
  updateOccurrenceSituation,
} from "../services/occurrencesService";

export function useOccurrences() {
  const [occurrences, setOccurrences] = useState([]);
  const [filters, setFilters] = useState({
    cruzamento_id: "",
    prioridade: "",
    situacao: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOccurrences = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOccurrences(filters);
      setOccurrences(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadOccurrences();
  }, [loadOccurrences]);

  async function addOccurrence(data) {
    const created = await createOccurrence(data);
    await loadOccurrences();
    return created;
  }

  async function editOccurrence(id, data) {
    const updated = await updateOccurrence(id, data);
    await loadOccurrences();
    return updated;
  }

  async function removeOccurrence(id) {
    await deleteOccurrence(id);
    await loadOccurrences();
  }

  async function changeSituation(id, situacao) {
    const updated = await updateOccurrenceSituation(id, situacao);
    await loadOccurrences();
    return updated;
  }

  function changeFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  return {
    occurrences,
    filters,
    loading,
    error,
    loadOccurrences,
    changeFilter,
    addOccurrence,
    editOccurrence,
    removeOccurrence,
    changeSituation,
  };
}