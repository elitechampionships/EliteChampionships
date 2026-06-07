import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, Users } from 'lucide-react';
import { TOP_PLAYERS, TEAM_STANDINGS, ALL_TIME_PLAYERS, SITE } from '../data';

function getPlayerCardStyle(avgPlace) {
  if (avgPlace === 1.0) {
    return {
      border: 'border-yellow-400/50',
      bg: 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5',
      glow: 'shadow-lg shadow-yellow-500/20',
      medal: '🏆 ZŁOTO'
    };
  }
  if (avgPlace === 2.0) {
    return {
      border: 'border-gray-300/50',
      bg: 'bg-gradient-to-r from-gray-400/10 to-gray-500/5',
      glow: 'shadow-lg shadow-gray-400/20',
      medal: '🥈 SREBRO'
    };
  }
  if (avgPlace === 3.0) {
    return {
      border: 'border-orange-400/50',
      bg: 'bg-gradient-to-r from-orange-500/10 to-orange-600/5',
      glow: 'shadow-lg shadow-orange-500/20',
      medal: '🥉 BRĄZ'
    };
  }
  return {
    border: 'border-zinc-800/70',
    bg: 'bg-zinc-900/60',
    glow: '',
    medal: null
  };
}

const TEAM_COLORS = {
  GREEN: 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]',
  ORANGE: 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]',
  PURPLE: 'text-violet-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]',
  YELLOW: 'text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]',
  RED: 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]',
  BLUE: 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]',
  CYAN: 'text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]',
  AQUA: 'text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]',
};

function PlayerRow({ player }) {
  const style = getPlayerCardStyle(player.avgPlace);

  return (
    <Link to={`/profil/${player.name}`}>
      <div
        className={`flex items-center justify-between rounded-3xl border ${style.border} ${style.bg} p-4 hover:border-zinc-600/70 transition cursor-pointer transform hover:scale-105 ${style.glow}`}
      >
        <div className="flex items-center gap-4">
          <img
            src={`https://mc-heads.net/avatar/${player.name}/48`}
            alt={player.name}
            className="h-12 w-12 rounded-xl border border-zinc-700"
          />

          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-zinc-950/70 text-sm font-bold text-zinc-100">
            {player.rank}
          </div>

          <div>
            <div className="font-semibold text-white">
              {player.displayName}
            </div>

            <div
              className={`text-xs uppercase tracking-[0.25em] ${
                TEAM_COLORS[player.team] || 'text-zinc-500'
              }`}
            >
              {player.team}
            </div>

            {style.medal && (
              <div className="text-xs font-bold text-yellow-300 mt-1">
                {style.medal}
              </div>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="font-black text-white">
            {player.points}
          </div>

          <div className="text-xs text-zinc-500">
            {player.avgPlace.toFixed(1)} śr. msc
          </div>
        </div>
      </div>
    </Link>
  );
}

function TeamRow({ team }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/60 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full ${team.color}`} />

          <div>
            <div className="font-bold text-white">
              {team.name}
            </div>

            <div className="flex items-center gap-2">
  <div className="text-xs text-zinc-500">
    {team.rank}. miejsce
  </div>

  {team.id === 'orange' && (
    <div className="text-[10px] font-black tracking-[0.25em] text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]">
      WINNERS
    </div>
  )}
</div>
          </div>
        </div>

        <div className="text-white font-black text-xl">
          {team.points}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {team.players?.map((player) => (
          <div key={player} title={player}>
            <img
              src={`https://mc-heads.net/avatar/${player}/40`}
              alt={player}
              className="h-10 w-10 rounded-full border border-zinc-700 bg-zinc-800"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const topPlayers = useMemo(() => TOP_PLAYERS, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [edition, setEdition] = useState('EC1');

  const filteredPlayers = useMemo(() => {
  const source =
    edition === 'ALL'
      ? ALL_TIME_PLAYERS
      : TOP_PLAYERS;

  if (!searchTerm.trim()) return source;

  return source.filter((p) =>
    p.displayName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
}, [searchTerm, edition]);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="mb-10 sm:flex sm:items-end sm:justify-between sm:gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Wyniki /</div>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Tabela Wyników</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">
  {edition === 'ALL'
    ? 'TOP 10 graczy według średniej punktów ze wszystkich edycji Elite Championships'
    : 'Historia, punkty i rankingi z każdej edycji.'}
</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr_320px]">
        <aside className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-2 text-zinc-200">
            <Search className="h-4 w-4" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Filtry</span>
          </div>
          <div className="mt-6 space-y-4 text-sm text-zinc-400">
            <div className="rounded-3xl border border-zinc-700/70 bg-zinc-950/60 p-4">
              <input
                type="text"
                placeholder="Szukaj gracza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-white placeholder-zinc-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
  <button
    onClick={() => setEdition('EC1')}
    className={`rounded-3xl border p-4 transition ${
      edition === 'EC1'
        ? 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
        : 'border-zinc-700/70 bg-zinc-950/60 text-zinc-400'
    }`}
  >
    EC 1
  </button>

  <button
    onClick={() => setEdition('ALL')}
    className={`rounded-3xl border p-4 transition ${
      edition === 'ALL'
        ? 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
        : 'border-zinc-700/70 bg-zinc-950/60 text-zinc-400'
    }`}
  >
    Wszystkie Edycje
  </button>
</div>
            <div className="rounded-3xl border border-dashed border-zinc-700/70 bg-zinc-950/60 p-4 text-center text-zinc-500">Pełny ranking 32 zawodników, 8 drużyn, suma 137312 punktów.</div>
          </div>
        </aside>

        <main className="space-y-4">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <PlayerRow key={player.name} player={player} />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-12 text-center text-zinc-400">
              <div className="text-lg font-semibold text-white">Brak wyników</div>
              <div className="mt-2 text-sm">Nie znaleziono gracza "{searchTerm}"</div>
            </div>
          )}
        </main>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
            <div className="flex items-center gap-2 text-zinc-200">
              <Trophy className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Drużyny EC 1</span>
            </div>
            <div className="mt-6 space-y-4">
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
            <div className="mt-6 rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-6 text-center text-zinc-500 text-sm">
              Kliknij na gracza z tabeli aby zobaczyć szczegóły i partnerów.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
