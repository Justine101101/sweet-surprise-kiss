import { AnimatePresence, motion } from "framer-motion";
import { Gift } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SectionHeading } from "./SectionHeading";

const GIFTS = [
  "🍿 Movie Date",
  "❤️ Unlimited Hugs",
];

export function GiftBox() {
  const [open, setOpen] = useState(false);

  const openGift = () => {
    setOpen(true);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ["#fbbf24", "#fde68a", "#f9a8d4"] });
  };

  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading eyebrow="A little something" title="Your Surprise Gift" />
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        {!open ? (
          <motion.button
            onClick={openGift}
            whileHover={{ scale: 1.05, y: -6 }}
            className="relative"
            aria-label="Open gift"
          >
            <div className="absolute -inset-8 rounded-full bg-amber-400/30 blur-3xl" />
            <div className="relative">
              <div className="h-48 w-48 rounded-lg bg-gradient-to-br from-rose-400 to-pink-600 shadow-glow-pink">
                <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300" />
                <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-gradient-to-b from-amber-300 via-amber-100 to-amber-300" />
              </div>
              <motion.div
                animate={{ rotate: [0, -3, 3, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl"
              >
                🎀
              </motion.div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm font-medium">
              <Gift size={16} /> Open Your Gift
            </div>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="glass-card w-full max-w-md rounded-3xl p-8 text-center"
            >
              <div className="font-display text-4xl text-gold">✨ Your Birthday Surprise ✨</div>
              <ul className="mt-6 space-y-3 text-left">
                {GIFTS.map((g, i) => (
                  <motion.li
                    key={g}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl bg-rose-50 px-4 py-3 text-cream"
                  >
                    {g}
                  </motion.li>
                ))}
              </ul>
              <button className="mt-6 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm">I Can't Wait ❤️</button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}