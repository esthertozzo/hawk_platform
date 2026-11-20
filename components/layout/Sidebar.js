import Link from "next/link";
import Image from "next/image";

const navigation = [
  { number: "01", label: "Visão geral", href: "/" },
  { number: "02", label: "Cruzamentos", href: "/cruzamentos" },
  { number: "03", label: "Ocorrências", href: "/ocorrencias" },
  { number: "04", label: "Histórico", href: "/historico" },
  { number: "05", label: "Relatórios", href: "/dashboard" },
];

export function Sidebar({ activeHref }) {
  return (
    <aside className="flex w-full flex-col border-b border-hawk-border bg-hawk-sidebar p-5 lg:sticky lg:top-0 lg:h-screen lg:w-56 lg:shrink-0 lg:border-r lg:border-b-0">
      <Link
        href="/"
        aria-label="HAWK Control — página inicial"
        className="text-3xl font-bold tracking-widest text-hawk-green"
      ><Image src="/hawk-logo.svg" width={94} height={23} alt="HAWK" priority /></Link>

      <p className="mt-2 text-xs leading-relaxed text-hawk-muted">
        CONTROL / PAINEL OPERACIONAL
      </p>

      <p className="mt-8 text-xs tracking-widest text-hawk-muted lg:mt-14">
        NAVEGAÇÃO
      </p>

      <nav aria-label="Navegação principal" className="mt-4">
        <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {navigation.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 border-l-2 px-3 py-3 text-sm transition-colors ${
                    isActive
                      ? "border-hawk-green bg-hawk-green-dark text-hawk-text"
                      : "border-transparent text-hawk-muted hover:bg-hawk-surface hover:text-hawk-text"
                  }`}
                >
                  <span className="text-xs text-hawk-muted">
                    {item.number}
                  </span>

                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 hidden border-t border-hawk-border pt-5 text-xs lg:mt-auto lg:block">
        <p className="font-bold text-hawk-text">HAWK CONTROL</p>

        <p className="mt-3 leading-relaxed text-hawk-muted">
          Global Solution 2.0 | @FIAP
        </p>

        <p className="mt-4 flex items-center gap-2 text-hawk-muted">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-hawk-green"
          />
          CitizenTech
        </p>
      </div>
    </aside>
  );
}