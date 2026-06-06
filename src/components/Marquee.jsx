export default function Marquee({ items }) {
  return (
    <section className="relative overflow-hidden border-t border-b border-white/5 bg-black/40 py-4">
      <div className="marquee flex animate-marquee whitespace-nowrap text-xs uppercase tracking-[0.35em] text-zinc-400">
        {items.concat(items).map((item, index) => (
          <span key={`${item}-${index}`} className="mx-6 inline-flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-amber-300" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
