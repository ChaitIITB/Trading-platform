import TokenTable from '../components/TokenTable'

export default function Page() {
  return (
    <main className="min-h-screen bg-axiom-dark p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-axiom-text">Token Discovery</h1>
          <p className="text-xs sm:text-sm text-axiom-muted">Real-time token tracking — Axiom Trade replica</p>
        </header>

        <section>
          <TokenTable />
        </section>
      </div>
    </main>
  )
}
