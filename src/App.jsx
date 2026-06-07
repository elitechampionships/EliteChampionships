import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StarField from './components/StarField';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import PlayerProfile from './pages/PlayerProfile';
import Compare from './pages/Compare';
import Auctions from './pages/Auctions';
import { Toaster } from './components/ui/toaster';
import { SITE } from './data';

function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800/60 py-10 px-4 text-center">
      <div className="text-xs uppercase tracking-[0.4em] text-zinc-500">{SITE.title} · {SITE.season}</div>
      <div className="mt-2 text-[11px] text-zinc-600">© {new Date().getFullYear()} {SITE.title} — Strona Społeczności EC</div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <div className="App min-h-screen text-white selection:bg-red-500/30 relative overflow-hidden">
      <StarField />
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tabela" element={<Leaderboard />} />
            <Route path="/profil/:playerName" element={<PlayerProfile />} />
            <Route path="/porownaj" element={<Compare />} />
            <Route path="/licytacje" element={<Auctions />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
