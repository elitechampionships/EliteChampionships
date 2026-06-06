import { Plus, Slash } from 'lucide-react';

export default function Compare() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Porównanie /</div>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Head to Head</h1>
        <p className="mt-4 max-w-2xl text-sm text-zinc-400">Zestawiaj 2–4 graczy z bazy wyników.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((slot) => (
          <div key={slot} className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-10 text-center text-zinc-400 hover:border-zinc-600/70 transition">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-950/70 text-zinc-400">
              <Plus className="h-6 w-6" />
            </div>
            <div className="text-lg font-semibold text-white">Dodaj gracza</div>
            <div className="mt-2 text-xs uppercase tracking-[0.35em] text-zinc-500">Brak bazy graczy</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-900/50 p-12 text-center text-zinc-400">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-950/70 text-zinc-400">
          <Slash className="h-6 w-6" />
        </div>
        <div className="text-xl font-semibold text-white">Brak graczy do porównania</div>
        <div className="mt-2 text-sm text-zinc-500">Dodaj graczy w src/data.js aby aktywować tę sekcję.</div>
      </div>
    </section>
  );
}
