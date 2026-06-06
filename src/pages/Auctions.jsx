import { Shield, Zap, Eye } from 'lucide-react';

const ROLES = [
  {
    icon: Shield,
    title: 'Admin / Komisarz',
    description: 'Utwórz ligę, dodaj drużyny i graczy, zarządzaj aukcją na żywo.',
  },
  {
    icon: Zap,
    title: 'Kapitan drużyny',
    description: 'Dołącz do pokoju i licytuj zawodników do swojej drużyny.',
  },
  {
    icon: Eye,
    title: 'Widz',
    description: 'Obserwuj licytację na żywo bez możliwości składania ofert.',
  },
];

export default function Auctions() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.35em] text-red-200">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          Live wkrótce
        </div>
        <div className="mt-6">
          <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Aukcje /</div>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Draft na żywo</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">Wejdź jako admin, kapitan lub widz — i licytuj zawodników.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {ROLES.map((role) => {
          const Icon = role.icon;
          return (
            <div key={role.title} className="group relative overflow-hidden rounded-[2rem] border border-zinc-800/70 bg-zinc-900/50 p-6 shadow-soft transition hover:border-zinc-600/70">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400" />
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-zinc-900/60 to-zinc-800/60 shadow-lg shadow-black/30 text-cyan-300">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-white">{role.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{role.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">WYBIERZ →</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">Aktywne pokoje</div>
          <div className="mt-4 text-3xl font-black text-white">0</div>
        </div>
        <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">Drużyn online</div>
          <div className="mt-4 text-3xl font-black text-white">0</div>
        </div>
        <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">Bezpieczne PIN</div>
          <div className="mt-4 text-3xl font-black text-white">4-cyfrowe</div>
        </div>
      </div>
    </section>
  );
}
