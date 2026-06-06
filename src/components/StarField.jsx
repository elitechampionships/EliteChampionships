import { useMemo } from 'react';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function StarField() {
  const stars = useMemo(() => Array.from({ length: 120 }, () => ({
    top: `${randomBetween(0, 100)}%`,
    left: `${randomBetween(0, 100)}%`,
    size: `${randomBetween(1, 3)}px`,
    opacity: randomBetween(0.15, 0.8),
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity }}
        />
      ))}
    </div>
  );
}
