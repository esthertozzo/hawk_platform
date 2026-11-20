"use client";

import { useState } from "react";
export function useCrossingDirectory(crossings) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const query = search.trim().toLocaleLowerCase("pt-BR");
  const visibleCrossings = crossings.filter(crossing => (!status || crossing.status === status) && (crossing.nome + ' ' + crossing.bairro + ' ' + crossing.id).toLocaleLowerCase("pt-BR").includes(query));
  return {
    search,
    setSearch,
    status,
    setStatus,
    visibleCrossings
  };
}
