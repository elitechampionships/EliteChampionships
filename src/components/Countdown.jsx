import { useEffect, useState } from 'react';

function pad(value) {
  return String(value).padStart(2, '0');
}

export default function Countdown({ target }) {
  const [time, setTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTime({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTime({ days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) });
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: 'Dni', value: time.days, color: 'from-red-400 to-rose-500', text: 'text-white' },
        { label: 'Godzin', value: time.hours, color: 'from-amber-400 to-yellow-400', text: 'text-zinc-950' },
        { label: 'Minut', value: time.minutes, color: 'from-cyan-400 to-sky-400', text: 'text-zinc-950' },
        { label: 'Sekund', value: time.seconds, color: 'from-violet-400 to-fuchsia-400', text: 'text-white' },
      ].map((item) => (
        <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
          <div className={`inline-flex min-w-[3.2rem] items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} py-3 px-4 text-3xl font-black ${item.text}`}>
            {item.value}
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.35em] text-zinc-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
