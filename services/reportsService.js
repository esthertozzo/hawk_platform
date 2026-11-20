import { apiFetch } from "./api";

export function getSummaryReport(options = {}) {
  return apiFetch("/relatorios/resumo", options);
}

export function getTimesReport(options = {}) {
  return apiFetch("/relatorios/tempos", options);
}

export function getCrossingsReport(options = {}) {
  return apiFetch("/relatorios/por-cruzamento", options);
}