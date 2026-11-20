import { apiFetch } from "./api";

export function getEvents(filters = {}, options = {}) {
  const params = new URLSearchParams();

  const filterNames = [
    "cruzamento_id",
    "tipo",
    "origem",
    "de",
    "ate",
  ];

  for (const name of filterNames) {
    const value = filters[name];

    if (value) {
      params.set(name, value);
    }
  }

  params.set("limite", String(filters.limite ?? 50));

  return apiFetch(`/eventos?${params.toString()}`, options);
}

export function getEventById(id, options = {}) {
  return apiFetch(
    `/eventos/${encodeURIComponent(id)}`,
    options
  );
}