import { useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";

// Customize: target date for celebrating together
const TARGET = new Date();
TARGET.setDate(TARGET.getDate() + 30);

function calc() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { l: "Days", v: t.days },
    { l: "Hours", v: t.hours },
    { l: "Minutes", v: t.minutes },
    { l: "Seconds", v: t.seconds },
  ];

  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading eyebrow="⏳ Counting the moments" title="Until We Celebrate Together" />
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.l} className="glass-card rounded-3xl p-6 text-center">
            <div className="font-display text-6xl text-gold">{String(it.v).padStart(2, "0")}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-cream/60">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}