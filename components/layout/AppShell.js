import { Sidebar } from "./Sidebar";

export function AppShell({ activeHref, children }) {
  return (
    <div className="min-h-screen bg-hawk-background font-hawk text-hawk-text lg:flex">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-hawk-green focus:p-3 focus:text-hawk-sidebar">Pular para o conteúdo</a>
      <Sidebar activeHref={activeHref} />
      <main id="conteudo" className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        <footer className="mx-auto mt-8 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-hawk-border pt-4 text-xs text-hawk-muted">
          <span className="tracking-wider">HAWK CONTROL / PAINEL OPERACIONAL</span>
          <span>HAWK · Global Solution 2.0 | @FIAP</span>
        </footer>
      </main>
    </div>
  );
}
