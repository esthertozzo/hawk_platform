import { apiFetch } from "./api";

export function getCrossings(status){
    const query = status ? `?status=${status}` : "";
    return apiFetch(`/cruzamentos${query}`);
}

export function getCrossingById(id, options = {}){
    return apiFetch(`/cruzamentos/${encodeURIComponent(id)}`, options);
}

export function getCrossingState(id, options = {}) {
    return apiFetch(`/cruzamentos/${encodeURIComponent(id)}/estado-atual`, options);
}

export function createCrossing(data) {
    return apiFetch("/cruzamentos", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateCrossing(id, data) {
    return apiFetch(`/cruzamentos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteCrossing(id) {
    return apiFetch(`/cruzamentos/${id}`, {
        method: "DELETE",
    });
}
