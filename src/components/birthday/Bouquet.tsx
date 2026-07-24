import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";

function Rose({ delay = 0, color = "rose" }: { delay?: number; color?: "rose" | "pink" }) {
  const petal = color === "rose" ? "from-rose-400 to-red-600" : "from-pink-200 to-pink-400";
  return (
    <motion.div
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay }}
      className="relative h-24 w-24"
    >
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${petal} shadow-[0_0_20px_rgba(255,100,150,0.4)]`} />
      <div className={`absolute inset-2 rounded-full bg-gradient-to-tr ${petal} opacity-90`} />
      <div className={`absolute inset-5 rounded-full bg-gradient-to-br ${petal} opacity-95`} />
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-yellow-100 to-amber-200" />
    </motion.div>
  );
}

function Tulip({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay }}
      className="relative h-28 w-16"
    >
      <div className="absolute inset-x-0 top-0 h-16 rounded-t-full rounded-b-lg bg-gradient-to-b from-pink-300 via-pink-400 to-rose-500 shadow-[0_0_20px_rgba(255,150,180,0.5)]" />
      <div className="absolute inset-x-2 top-1 h-14 rounded-t-full bg-gradient-to-b from-pink-200 to-pink-400 opacity-80" />
      <div className="absolute left-1/2 top-14 h-14 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700" />
    </motion.div>
  );
}

export function Bouquet() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading eyebrow="For you" title="A Bouquet That Never Fades" />
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.02 }}
          className="relative flex flex-col items-center"
          aria-label="Open bouquet"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative flex items-end justify-center"
          >
            <div className="absolute -inset-10 rounded-full bg-pink-400/20 blur-3xl" />
            <div className="relative grid grid-cols-5 items-end gap-1">
              <Tulip delay={0} />
              <Rose delay={0.3} />
              <Tulip delay={0.6} />
              <Rose delay={0.2} color="pink" />
              <Tulip delay={0.4} />
            </div>
          </motion.div>
          <div className="relative -mt-2 h-32 w-40 rounded-b-3xl bg-gradient-to-b from-amber-100/80 via-amber-200/60 to-amber-300/40 backdrop-blur-md border border-white/30 shadow-xl">
            <div className="absolute inset-x-6 top-4 h-1 rounded-full bg-white/40" />
          </div>
        </motion.button>

        <p className="mt-8 text-center font-display text-2xl text-cream/90 sm:text-3xl">
          "These flowers will never fade, just like my love for you."
        </p>

        <AnimatePresence>
          {open &&
            Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -200 - Math.random() * 200, x: (Math.random() - 0.5) * 400, scale: 1, rotate: Math.random() * 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 + Math.random() * 1.5, delay: Math.random() * 0.3 }}
                onAnimationComplete={() => i === 19 && setOpen(false)}
                className="absolute h-4 w-4 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br from-pink-200 to-rose-400"
              />
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
}