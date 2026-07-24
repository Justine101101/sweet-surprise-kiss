import { motion } from "framer-motion";
import { Gift, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export function Landing({ onOpen }: { onOpen: () => void }) {
  const handleClick = () => {
    const colors = ["#f9a8d4", "#fbcfe8", "#fde68a", "#fecaca", "#e9d5ff"];
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors }), 200);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors }), 400);
    setTimeout(onOpen, 700);
  };

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-6 flex items-center gap-2 rounded-full glass-card px-5 py-2 text-sm text-rose-500"
      >
        <Heart size={14} className="fill-pink-300 text-pink-300 animate-heartbeat" />
        26.7.25
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-display text-6xl leading-tight text-rose-glow sm:text-7xl md:text-8xl lg:text-9xl"
      >
        Happy Birthday
        <br />
        My Beautiful Love
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-8 max-w-2xl text-lg text-cream/80 sm:text-xl"
      >
        Today is all about celebrating the most wonderful person in my life. ✨
      </motion.p>

      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="btn-glow btn-glow-hover mt-12 inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium tracking-wide"
      >
        <Gift size={20} />
        Open My Birthday Surprise
      </motion.button>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-cream/50"
      >
        scroll to explore
      </motion.div>
    </section>
  );
}