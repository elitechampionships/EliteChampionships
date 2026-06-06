import { Link, useLocation } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { SITE } from '../data';

const items = [
  { to: '/', label: 'Start' },
  { to: '/tabela', label: 'Wyniki' },
  { to: '/porownaj', label: 'Porównanie' },
  { to: '/licytacje', label: 'Aukcje' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-zinc-950/90 px-4 py-3 shadow-xl shadow-black/20">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-amber-500 to-cyan-500 text-black shadow-lg shadow-red-800/40">
            <Flame className="h-5 w-5" />
          </span>
          <div className="text-left">
            <div className="text-sm font-bold tracking-[0.22em] text-white">{SITE.short}</div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-zinc-400">{SITE.title.toLowerCase()}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {items.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${active ? 'bg-white/10 text-white border-white/10 shadow-lg shadow-white/5' : 'border-white/5 text-zinc-300 hover:bg-white/5 hover:text-white'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-amber-300">
          <div className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-2">{SITE.season}</div>
        </div>
      </div>
    </header>
  );
}
