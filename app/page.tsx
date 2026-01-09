const kpis = [
  { label: "Reservas confirmadas", value: 42, trend: "+8%" },
  { label: "Conflitos detectados", value: 3, trend: "-2" },
  { label: "Itens danificados/faltando", value: 5, trend: "+1" },
  { label: "Transfers pendentes", value: 7, trend: "+2" }
];

const occupancy = [
  { day: "Hoje", value: 68 },
  { day: "+7d", value: 74 },
  { day: "+14d", value: 61 },
  { day: "+21d", value: 70 },
  { day: "+30d", value: 64 }
];

const tasks = [
  {
    title: "Pré check-in - Casa Aurora",
    when: "21/08 10:00",
    owner: "Equipe Limpeza",
    status: "Em andamento"
  },
  {
    title: "Pós check-out - Quarto 2A",
    when: "21/08 14:30",
    owner: "Equipe Manutenção",
    status: "Pendente"
  },
  {
    title: "Manutenção - Cama 3B",
    when: "22/08 09:00",
    owner: "Carlos Santos",
    status: "Agendada"
  }
];

const calendarDays = Array.from({ length: 31 }).map((_, index) => ({
  day: index + 1,
  occupied: index % 6 === 0 || index % 7 === 0
}));

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <section className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-8 py-10 text-white shadow-lg">
        <span className="text-sm uppercase tracking-[0.3em] text-brand-50">
          Hospedagem Nexus
        </span>
        <h1 className="text-4xl font-semibold">Painel Operacional</h1>
        <p className="max-w-2xl text-base text-brand-50/90">
          Gestão integrada de casas, quartos e camas com exclusividade hierárquica,
          calendário visual, operações e métricas em tempo real.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-4 py-1">TZ: Europe/Rome</span>
          <span className="rounded-full bg-white/20 px-4 py-1">Moeda: EUR (€)</span>
          <span className="rounded-full bg-white/20 px-4 py-1">Status: MVP</span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {kpi.label}
            </p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-semibold text-slate-900">
                {kpi.value}
              </span>
              <span className="text-sm font-medium text-emerald-600">
                {kpi.trend}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Ocupação diária (próximos 30 dias)
              </h2>
              <p className="text-sm text-slate-500">
                Visualização rápida por casas com nível de ocupação.
              </p>
            </div>
            <button className="rounded-full border border-brand-500 px-4 py-2 text-sm text-brand-600">
              Exportar ICS
            </button>
          </header>
          <div className="mt-6 flex items-end justify-between gap-4">
            {occupancy.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-2">
                <div className="flex h-32 w-12 items-end justify-center rounded-full bg-brand-50">
                  <div
                    className="w-full rounded-full bg-brand-600"
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs text-slate-600">{item.day}</span>
                <span className="text-xs font-semibold text-slate-800">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <header>
            <h2 className="text-lg font-semibold text-slate-900">
              Operações do dia
            </h2>
            <p className="text-sm text-slate-500">
              Faxina, manutenção e tarefas recorrentes.
            </p>
          </header>
          <ul className="mt-5 space-y-4">
            {tasks.map((task) => (
              <li key={task.title} className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  {task.title}
                </p>
                <div className="mt-2 text-xs text-slate-500">
                  <span>{task.when}</span>
                  <span className="mx-2">•</span>
                  <span>{task.owner}</span>
                </div>
                <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Calendário diário (31 dias rolantes)
            </h2>
            <p className="text-sm text-slate-500">
              Unidades com exclusividade por nível (Casa/Quarto/Cama).
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm">
              Casa
            </button>
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm">
              Quarto
            </button>
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm">
              Cama
            </button>
          </div>
        </header>
        <div className="mt-6 grid grid-cols-7 gap-2">
          {calendarDays.map((day) => (
            <div
              key={day.day}
              className={`flex h-16 flex-col items-center justify-center rounded-xl border text-sm font-medium ${
                day.occupied
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-100 bg-slate-50 text-slate-600"
              }`}
            >
              <span>{day.day}</span>
              {day.occupied && (
                <span className="text-[10px] font-semibold uppercase">OCUP</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Checklist automático</h2>
          <p className="mt-2 text-sm text-slate-500">
            Itens puxados por reserva para check-in e check-out.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Mobiliário",
              "Utensílios",
              "Eletrodomésticos",
              "Roupa de cama",
              "Decoração",
              "Conferência geral"
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-100 p-4 text-sm text-slate-700"
              >
                <p className="font-semibold text-slate-900">{item}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Estado padrão: Íntegro • Editável por equipe
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Utilidades & lavanderia
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Consumo consolidado e status de roupas de cama.
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Luz (kWh)
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">382</p>
              <p className="text-xs text-slate-500">Últimos 30 dias</p>
            </div>
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Gás (m³)
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">119</p>
              <p className="text-xs text-slate-500">Últimos 30 dias</p>
            </div>
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Lavanderia
              </p>
              <p className="mt-2 text-sm text-slate-700">
                14 itens em lavagem • 6 prontos
              </p>
              <p className="text-xs text-slate-500">
                Fornecedor: CleanHouse
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
