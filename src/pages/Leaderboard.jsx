import { useMemo } from 'react';
import { Search, Trophy, Users, Sparkles } from 'lucide-react';
import { TOP_PLAYERS, TEAM_STANDINGS, SITE } from '../data';

function PlayerRow({ player }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-zinc-800/70 bg-zinc-900/60 p-4 hover:border-zinc-600/70 transition">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-zinc-950/70 text-sm font-bold text-zinc-100">{player.rank}</div>
        <div>
          <div className="font-semibold text-white">{player.displayName}</div>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">{player.team}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-black text-white">{player.points}</div>
        <div className="text-xs text-zinc-500">{player.editions} edycja</div>
      </div>
    </div>
  );
}

function TeamRow({ team }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-zinc-800/70 bg-zinc-900/60 p-4">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-3xl bg-gradient-to-br ${team.color}`} />
        <div>
          <div className="font-semibold text-white">{team.name}</div>
          <div className="text-xs text-zinc-500">{team.rank}. miejsce</div>
        </div>
      </div>
      <div className="text-white font-black">{team.points}</div>
    </div>
  );
}

export default function Leaderboard() {
  const topPlayers = useMemo(() => TOP_PLAYERS.slice(0, 12), []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="mb-10 sm:flex sm:items-end sm:justify-between sm:gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Wyniki /</div>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Tabela Wyników</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">Historia, punkty i rankingi z każdej edycji.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr_320px]">
        <aside className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-2 text-zinc-200">
            <Search className="h-4 w-4" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Filtry</span>
          </div>
          <div className="mt-6 space-y-4 text-sm text-zinc-400">
            <div className="rounded-3xl border border-zinc-700/70 bg-zinc-950/60 p-4">Nazwa gracza</div>
            <div className="rounded-3xl border border-zinc-700/70 bg-zinc-950/60 p-4">Wszystkie edycje</div>
            <div className="rounded-3xl border border-dashed border-zinc-700/70 bg-zinc-950/60 p-4 text-center text-zinc-500">Pełny ranking 32 zawodników, 8 drużyn, suma 137312 punktów.</div>
          </div>
        </aside>

        <main className="space-y-4">
          {topPlayers.map((player) => (
            <PlayerRow key={player.name} player={player} />
          ))}
        </main>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
            <div className="flex items-center gap-2 text-zinc-200">
              <Trophy className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Drużyny EC 1</span>
            </div>
            <div className="mt-6 space-y-3">
              {TEAM_STANDINGS.map((team) => (
                <TeamRow key={team.id} team={team} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
            <div className="flex items-center gap-2 text-zinc-200">
              <Users className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Profil gracza</span>
            </div>
            <div className="mt-6 rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-6 text-center text-zinc-500">
              Wybierz gracza z tabeli, aby zobaczyć szczegóły.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
