import Link from "next/link";

export function OpenOccurrencesCard({ total, loading, error }) {
  return (
    <section className="border border-hawk-border bg-hawk-surface p-5">
      <p className="text-xs tracking-wide text-hawk-muted">
        ACOMPANHAMENTO OPERACIONAL
      </p>

      <h2 className="mt-4 text-xl font-semibold">
        Ocorrências abertas
      </h2>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-hawk-orange">
          Não foi possível carregar as ocorrências: {error}
        </p>
      ) : (
        <p className="mt-5 text-5xl font-bold text-hawk-orange">
          {loading ? "..." : total}
          <span className="ml-3 text-sm font-normal text-hawk-muted">
            registros
          </span>
        </p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-hawk-muted">
        Ocorrências cadastradas para acompanhamento pela equipe.
      </p>

      <Link
        href="/ocorrencias"
        className="mt-4 inline-block text-sm text-hawk-green underline"
      >
        Consultar ocorrências
      </Link>
    </section>
  );
}