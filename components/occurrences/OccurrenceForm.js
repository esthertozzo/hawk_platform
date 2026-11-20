"use client";

import { useOccurrenceForm } from "../../hooks/useOccurrenceForm";

export function OccurrenceForm({
  initialData,
  onSubmit,
  onCancel,
  crossings,
  crossingsLoading,
  crossingsError,
}) {
  const {
    formData,
    submitting,
    error,
    successMessage,
    isEditing,
    handleChange,
    handleSubmit,
  } = useOccurrenceForm({ initialData, onSubmit });

  const crossingName = crossings.find(
    (crossing) => crossing.id === formData.cruzamento_id
  )?.nome;

  const cannotCreate =
    !isEditing &&
    (crossingsLoading || Boolean(crossingsError) || crossings.length === 0);

  return (
    <section className="border border-hawk-border bg-hawk-surface p-5">
      <h2 className="text-xl font-semibold">
        {isEditing ? "Editar ocorrência" : "Cadastrar ocorrência"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <fieldset
          disabled={submitting}
          className="grid gap-4 disabled:opacity-60"
        >
          {isEditing ? (
            <div>
              <p className="text-sm font-medium">Cruzamento</p>
              <p className="mt-1 break-all text-sm text-hawk-muted">
                {crossingName || formData.cruzamento_id}
              </p>
              <p className="mt-1 text-xs text-hawk-muted">
                O cruzamento associado não pode ser alterado.
              </p>
            </div>
          ) : (
            <label className="grid gap-1">
              <span className="text-sm font-medium">Cruzamento</span>

              <select
                name="cruzamento_id"
                value={formData.cruzamento_id}
                onChange={handleChange}
                disabled={cannotCreate}
                required
                className="hawk-input"
              >
                <option value="">
                  {crossingsLoading
                    ? "Carregando cruzamentos..."
                    : "Selecione um cruzamento"}
                </option>

                {crossings.map((crossing) => (
                  <option key={crossing.id} value={crossing.id}>
                    {crossing.nome}
                  </option>
                ))}
              </select>
            </label>
          )}

          {!isEditing && crossingsError && (
            <p role="alert" className="text-sm text-hawk-orange">
              Não foi possível carregar os cruzamentos: {crossingsError}
            </p>
          )}

          {!isEditing &&
            !crossingsLoading &&
            !crossingsError &&
            crossings.length === 0 && (
              <p className="text-sm text-hawk-orange">
                Cadastre um cruzamento antes de registrar uma ocorrência.
              </p>
            )}

          <label className="grid gap-1">
            <span className="text-sm font-medium">Tipo</span>
            <input
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              placeholder="Ex.: falha no sinal sonoro"
              required
              className="hawk-input"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Prioridade</span>
            <select
              name="prioridade"
              value={formData.prioridade}
              onChange={handleChange}
              className="hawk-input"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Descrição</span>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              required
              className="hawk-input"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Situação</span>
            <select
              name="situacao"
              value={formData.situacao}
              onChange={handleChange}
              className="hawk-input"
            >
              <option value="aberta">Aberta</option>
              <option value="em_andamento">Em andamento</option>
              <option value="resolvida">Resolvida</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={cannotCreate}
            className="hawk-button"
          >
            {submitting
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar ocorrência"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-sm border border-hawk-border px-4 py-2"
            >
              Cancelar edição
            </button>
          )}
        </fieldset>

        {error && (
          <p role="alert" className="text-sm text-hawk-orange">
            {error}
          </p>
        )}

        {successMessage && (
          <p role="status" className="text-sm text-hawk-green">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  );
}