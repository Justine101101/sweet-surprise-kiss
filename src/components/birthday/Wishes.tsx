import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const WISHES = [
  "✨ Travel Together",
  "✨ Watch More Sunsets",
  "✨ Celebrate Many Birthdays",
  "✨ Build Our Dream Home",
  "✨ Grow Old Together",
  "✨ Dance in the Rain",
];

export function Wishes() {
  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading eyebrow="Our future" title="Wishes For Us" />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {WISHES.map((w, i) => (
          <motion.div
            key={w}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="glass-card rounded-2xl p-6 text-center font-display text-2xl text-rose-glow"
          >
            {w}
          </motion.div>
        ))}
      </div>
    </section>
  );
}