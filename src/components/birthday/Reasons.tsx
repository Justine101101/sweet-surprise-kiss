import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";

const REASONS = [
  { front: "Your smile", back: "It lights up my darkest days." },
  { front: "Your kindness", back: "You make the world softer." },
  { front: "Your laugh", back: "The best sound I know." },
  { front: "Your hugs", back: "My favorite place on earth." },
  { front: "Your eyes", back: "I get lost in them every time." },
  { front: "Your support", back: "You believe in me endlessly." },
  { front: "Your patience", back: "You love me through everything." },
  { front: "Your heart", back: "The most beautiful thing about you." },
  { front: "Everything about you", back: "There's nothing I would change." },
  { front: "Simply because you're you", back: "That's more than enough." },
];

export function Reasons() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setFlipped((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };

  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading eyebrow="A hundred reasons" title="Why I Love You" subtitle="Tap each card." />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {REASONS.map((r, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="group aspect-[3/4] [perspective:1000px]"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-full w-full [transform-style:preserve-3d]"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl glass-card p-4 text-center [backface-visibility:hidden]">
                  <span className="mb-2 text-2xl">❤️</span>
                  <span className="font-display text-xl text-rose-glow">{r.front}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 p-4 text-center text-sm text-white shadow-glow-pink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  {r.back}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
    </section>
  );
}