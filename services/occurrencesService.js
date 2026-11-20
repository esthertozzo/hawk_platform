import { apiFetch } from "./api";

export function getOccurrences(filters = {}) {
  const params = new URLSearchParams();

  if (filters.cruzamento_id) {
    params.set("cruzamento_id", filters.cruzamento_id);
  }

  if (filters.prioridade) {
    params.set("prioridade", filters.prioridade);
  }

  if (filters.situacao) {
    params.set("situacao", filters.situacao);
  }

  const query = params.toString();

  return apiFetch(`/ocorrencias${query ? `?${query}` : ""}`);
}

export function getOccurrenceById(id) {
  return apiFetch(`/ocorrencias/${encodeURIComponent(id)}`);
}

export function createOccurrence(data) {
  return apiFetch("/ocorrencias", {
    method: "POST",
    body: JSON.stringify({
      cruzamento_id: data.cruzamento_id,
      tipo: data.tipo,
      prioridade: data.prioridade,
      descricao: data.descricao,
      situacao: data.situacao,
    }),
  });
}

export function updateOccurrence(id, data) {
  return apiFetch(`/ocorrencias/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({
      tipo: data.tipo,
      prioridade: data.prioridade,
      descricao: data.descricao,
      situacao: data.situacao,
    }),
  });
}

export function updateOccurrenceSituation(id, situacao) {
  return apiFetch(
    `/ocorrencias/${encodeURIComponent(id)}/situacao`,
    {
      method: "PATCH",
      body: JSON.stringify({ situacao }),
    }
  );
}

export function deleteOccurrence(id) {
  return apiFetch(`/ocorrencias/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}