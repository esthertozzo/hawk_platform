"use client";

import { useState } from "react";

export function useEventPeriod({ onApply }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  function changeStart(value) {
    setStart(value);
    setError("");
  }

  function changeEnd(value) {
    setEnd(value);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (
      (startDate && Number.isNaN(startDate.getTime())) ||
      (endDate && Number.isNaN(endDate.getTime()))
    ) {
      setError("Informe datas válidas.");
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      setError("O início não pode ser posterior ao fim.");
      return;
    }

    onApply({
      de: startDate ? startDate.toISOString() : "",
      ate: endDate ? endDate.toISOString() : "",
    });
  }

  function clearPeriod() {
    setStart("");
    setEnd("");
    setError("");

    onApply({ de: "", ate: "" });
  }

  return {
    start,
    end,
    error,
    changeStart,
    changeEnd,
    handleSubmit,
    clearPeriod,
  };
}