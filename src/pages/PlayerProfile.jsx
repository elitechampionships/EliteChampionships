import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Crown, Shield } from 'lucide-react';
import { TOP_PLAYERS, PLAYER_PARTNERS, avatarUrl } from '../data';

function getMedalColor(avgPlace) {
  if (avgPlace === 1.0) return 'from-yellow-300 to-yellow-500';
  if (avgPlace === 2.0) return 'from-gray-300 to-gray-400';
  if (avgPlace === 3.0) return 'from-orange-300 to-orange-500';
  return 'from-zinc-400 to-zinc-500';
}

function getMedalGlow(avgPlace) {
  if (avgPlace === 1.0) return 'shadow-yellow-500/50 glow-gold';
  if (avgPlace === 2.0) return 'shadow-gray-400/50 glow-silver';
  if (avgPlace === 3.0) return 'shadow-orange-400/50 glow-bronze';
  return 'shadow-zinc-500/20';
}

export default function PlayerProfile() {
  const { playerName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');

  const player = TOP_PLAYERS.find((p) => p.name === playerName);
  if (!player) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Powrót
        </button>
        <div className="rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-12 text-center">
          <div className="text-xl font-semibold text-white">Gracz nie znaleziony</div>
          <div className="mt-2 text-sm text-zinc-500">Powróć do tabeli wyników i spróbuj ponownie.</div>
        </div>
      </section>
    );
  }

  const partners = PLAYER_PARTNERS[player.name] || [];
  const medalGlow = getMedalGlow(player.avgPlace);
  const medalGradient = getMedalColor(player.avgPlace);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Powrót do tabeli
      </button>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Player Skin Card */}
          <div className="relative rounded-3xl border-2 overflow-hidden shadow-2xl" style={{ borderColor: player.teamColor.replace('bg-', 'rgb(').replace('-', ' ').split(' ')[0] }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${medalGradient} opacity-20`} />
            <div className="relative p-6 text-center backdrop-blur-xl bg-zinc-950/80">
              <img 
                src={avatarUrl(player.mcName, 256)} 
                alt={player.name} 
                className={`mx-auto mb-4 w-48 h-48 rounded-2xl border-4 shadow-2xl ${medalGlow}`}
                style={{ 
                  filter: player.avgPlace <= 3 ? `drop-shadow(0 0 20px ${player.avgPlace === 1.0 ? 'rgba(250,204,21,0.6)' : player.avgPlace === 2.0 ? 'rgba(209,213,219,0.6)' : 'rgba(234,88,12,0.6)'})` : 'none'
                }}
              />
              <div className="text-2xl font-black text-white">{player.displayName}</div>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-white/20 bg-white/5 text-sm font-bold text-amber-300 uppercase tracking-widest">
                #{player.rank}
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          {player.avgPlace <= 3 && (
            <div className={`rounded-3xl border-2 p-4 text-center backdrop-blur-xl bg-gradient-to-br ${medalGradient} bg-opacity-10`} style={{ borderColor: player.avgPlace === 1.0 ? '#fcd34d' : player.avgPlace === 2.0 ? '#d1d5db' : '#ea580c' }}>
              <div className="text-sm font-bold uppercase tracking-widest" style={{ color: player.avgPlace === 1.0 ? '#fcd34d' : player.avgPlace === 2.0 ? '#d1d5db' : '#ea580c' }}>
                {player.avgPlace === 1.0 ? '🏆 Złota Medalistka' : player.avgPlace === 2.0 ? '🥈 Srebrna Medalistka' : '🥉 Brązowa Medalistka'}
              </div>
              <div className="mt-2 text-xs text-zinc-300">Średnie miejsce: {player.avgPlace.toFixed(1)}</div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-900/60 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">Punkty</div>
              <div className="text-2xl font-black text-white">{player.points.toLocaleString('pl-PL')}</div>
            </div>
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-900/60 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">Drużyna</div>
              <div className="text-lg font-black text-white">{player.team}</div>
            </div>
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-900/60 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">Edycje</div>
              <div className="text-2xl font-black text-white">{player.editions}</div>
            </div>
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-900/60 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">Najlepszy Wynik</div>
              <div className="text-2xl font-black text-white">#{player.bestFinish}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-zinc-700/70">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  activeTab === 'stats'
                    ? 'text-cyan-300 border-cyan-300'
                    : 'text-zinc-500 border-transparent hover:text-zinc-300'
                }`}
              >
                Średnie Statystyki
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  activeTab === 'partners'
                    ? 'text-cyan-300 border-cyan-300'
                    : 'text-zinc-500 border-transparent hover:text-zinc-300'
                }`}
              >
                Najczęstsi Partnerzy
              </button>
            </div>
          </div>

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-purple-400/30 bg-purple-500/10 p-4 text-center">
                <div className="text-xs uppercase tracking-[0.25em] text-purple-300 mb-2">Średnia Punktów</div>
                <div className="text-2xl font-black text-white">{player.avg.toLocaleString('pl-PL')}</div>
              </div>
              <div className="rounded-2xl border border-pink-400/30 bg-pink-500/10 p-4 text-center">
                <div className="text-xs uppercase tracking-[0.25em] text-pink-300 mb-2">Średnie Miejsce</div>
                <div className="text-2xl font-black text-white">{player.avgPlace.toFixed(1)}</div>
              </div>
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-center">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-2">Liczba Edycji</div>
                <div className="text-2xl font-black text-white">{player.editions}</div>
              </div>
            </div>
          )}

          {/* Partners Tab */}
          {activeTab === 'partners' && (
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-4">✨ Najczęstsi Partnerzy z Zespołu</div>
              {partners.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {partners.map((partner) => {
                    const partnerData = TOP_PLAYERS.find((p) => p.name === partner.name);
                    return (
                      <Link
                        key={partner.name}
                        to={`/profil/${partner.name}`}
                        className="group rounded-2xl border border-zinc-700/70 bg-zinc-900/60 p-4 text-center hover:border-cyan-400/50 transition-all hover:bg-zinc-900/80"
                      >
                        <img 
                          src={avatarUrl(partner.name, 128)} 
                          alt={partner.name} 
                          className="mx-auto mb-3 w-20 h-20 rounded-xl border-2 border-white/10 group-hover:border-cyan-400/50 transition-colors"
                        />
                        <div className="text-sm font-bold text-white truncate group-hover:text-cyan-300">{partner.name}</div>
                        <div className="mt-2 text-xs text-zinc-500">
                          <div>{partner.editions} edycj{partner.editions === 1 ? 'a' : 'e'}</div>
                          <div className="text-zinc-400 mt-1">#{partnerData?.rank || '?'}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-8 text-center">
                  <div className="text-sm text-zinc-500">Brak danych o partnerach</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
