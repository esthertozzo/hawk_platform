"use client";

import { useState } from "react";

const emptyForm = {
  cruzamento_id: "",
  tipo: "",
  prioridade: "baixa",
  descricao: "",
  situacao: "aberta",
};

export function useOccurrenceForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(() => ({
    cruzamento_id: initialData?.cruzamento_id ?? "",
    tipo: initialData?.tipo ?? "",
    prioridade: initialData?.prioridade ?? "baixa",
    descricao: initialData?.descricao ?? "",
    situacao: initialData?.situacao ?? "aberta",
  }));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isEditing = Boolean(initialData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setError("");
    setSuccessMessage("");

    const data = {
      tipo: formData.tipo.trim(),
      prioridade: formData.prioridade,
      descricao: formData.descricao.trim(),
      situacao: formData.situacao,
    };

    if (!data.tipo || !data.descricao) {
      setError("Preencha o tipo e a descrição da ocorrência.");
      return;
    }

    if (!isEditing) {
      if (!formData.cruzamento_id) {
        setError("Selecione um cruzamento.");
        return;
      }

      data.cruzamento_id = formData.cruzamento_id;
    }

    try {
      setSubmitting(true);
      await onSubmit(data);

      if (!isEditing) {
        setFormData({ ...emptyForm });
        setSuccessMessage("Ocorrência cadastrada com sucesso.");
      }
    } catch (err) {
      setError(err.message || "Não foi possível salvar a ocorrência.");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    formData,
    submitting,
    error,
    successMessage,
    isEditing,
    handleChange,
    handleSubmit,
  };
}