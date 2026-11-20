"use client";

import { useEventPeriod } from "../../hooks/useEventPeriod";

export function EventsPeriodFilter({ onApply }) {
  const {
    start,
    end,
    error,
    changeStart,
    changeEnd,
    handleSubmit,
    clearPeriod,
  } = useEventPeriod({ onApply });

  return (
    <section className="border-b border-hawk-border bg-hawk-surface p-5">
      <h2 className="font-semibold">Período dos eventos</h2>

      <p className="mt-1 text-sm text-hawk-muted">
        Informe as datas no horário local do seu navegador.
        As alterações serão aplicadas ao clicar no botão.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Início</span>

            <input
              type="datetime-local"
              step="1"
              value={start}
              onChange={(event) => changeStart(event.target.value)}
              className="hawk-input"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Fim</span>

            <input
              type="datetime-local"
              step="1"
              value={end}
              onChange={(event) => changeEnd(event.target.value)}
              className="hawk-input"
            />
          </label>
        </div>

        {error && (
          <p role="alert" className="text-sm text-hawk-orange">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            className="rounded-sm bg-hawk-green px-4 py-2 text-sm font-medium text-hawk-sidebar"
          >
            Aplicar período
          </button>

          <button
            type="button"
            onClick={clearPeriod}
            className="text-sm font-medium underline"
          >
            Limpar período
          </button>
        </div>
      </form>
    </section>
  );
}