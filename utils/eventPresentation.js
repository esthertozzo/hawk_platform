export const eventTypeLabels = {
  deteccao: "Detecção",
  travessia_normal: "Travessia normal",
  travessia_estendida: "Travessia estendida",
  falha: "Falha",
};

export const eventOriginLabels = {
  simulacao_console: "Simulação pelo console",
  wokwi: "Wokwi",
  esp32: "ESP32",
  camera: "Câmera",
  painel: "Painel",
};

export function formatEventDate(value) {
  if (!value) return "Não informada";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data inválida";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/Sao_Paulo",
  }).format(date);
}