import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";

const LETTER = `Happy Birthday, Kat!
Gusto ko lang sabihin na sobrang thankful ako kasi nakilala kita.
You make my days lighter and my heart fuller.

Nandito lang ako always for you sa saya, sa lungkot, sa lahat.
I pray for your good health, more blessings, and a lifetime of happiness.

Thank you for being you.
Enjoy your day, baby. You deserve all the love today and everyday.
I love you 💛`;

export function LoveLetter() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!open) {
      setTyped("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(LETTER.slice(0, i));
      if (i >= LETTER.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [open]);

  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading eyebrow="From my heart" title="A Letter For You" />
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.03, y: -4 }}
          className="relative h-64 w-96 max-w-full"
          aria-label="Open love letter"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-200 to-pink-300 shadow-2xl shadow-pink-500/40" />
          <div
            className="absolute inset-x-0 top-0 h-1/2"
            style={{
              clipPath: "polygon(0 0, 50% 60%, 100% 0)",
              background: "linear-gradient(to bottom, oklch(0.85 0.09 15), oklch(0.78 0.13 15))",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-rose-600 shadow-lg"
          >
            💌 Click to Open My Letter
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card relative max-w-lg rounded-2xl p-8 sm:p-10"
                style={{ background: "linear-gradient(135deg, oklch(0.97 0.02 80 / 0.98), oklch(0.94 0.04 30 / 0.95))" }}
              >
                <p className="whitespace-pre-line font-display text-2xl leading-relaxed text-rose-900 sm:text-3xl">
                  {typed}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>|</motion.span>
                </p>
                <button onClick={() => setOpen(false)} className="mt-6 rounded-full bg-rose-500 px-6 py-2 text-sm text-white shadow-lg hover:bg-rose-600">
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}