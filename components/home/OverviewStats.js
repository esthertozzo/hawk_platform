export function OverviewStats({ total, loading, error }) {
  const cards = [
    {
      title: "Cruzamentos cadastrados",
      value: error ? "—" : loading ? "..." : total,
      description: "Cadastros registrados na plataforma",
    },
    {
      title: "Comunicação disponível",
      value: "—",
      description: "Não informado",
    },
    {
      title: "Sem comunicação",
      value: "—",
      description: "Não informado",
    },
  ];

  return (
    <section aria-label="Indicadores dos cruzamentos">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`border-t-2 bg-hawk-card p-5 ${card.title === "Sem comunicação" ? "border-hawk-orange" : "border-hawk-green"}`}
          >
            <h2 className="text-xs font-medium uppercase tracking-wide text-hawk-muted">
              {card.title}
            </h2>

            <p className={`mt-5 text-4xl font-bold ${card.title === "Sem comunicação" ? "text-hawk-orange" : "text-hawk-text"}`}>
              {card.value}
            </p>

            <p className="mt-3 text-xs text-hawk-muted">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-hawk-orange">
          Não foi possível carregar os cruzamentos: {error}
        </p>
      )}
    </section>
  );
}
