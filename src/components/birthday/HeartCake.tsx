import { AnimatePresence, motion } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SectionHeading } from "./SectionHeading";

const MEMORY_PHOTOS = Array.from({ length: 14 }, (_, i) => `/memories/memory-${String(i + 1).padStart(2, "0")}.png`);
// Heart has 16 slots — reuse two favorites so every spot is filled
const PHOTOS = [...MEMORY_PHOTOS, MEMORY_PHOTOS[1], MEMORY_PHOTOS[8]];

// Heart-shaped grid positions (percentage-based)
const HEART_POSITIONS = [
  { x: 30, y: 15 }, { x: 50, y: 10 }, { x: 70, y: 15 },
  { x: 20, y: 30 }, { x: 40, y: 28 }, { x: 60, y: 28 }, { x: 80, y: 30 },
  { x: 15, y: 48 }, { x: 35, y: 46 }, { x: 55, y: 46 }, { x: 75, y: 48 }, { x: 85, y: 50 },
  { x: 25, y: 65 }, { x: 45, y: 64 }, { x: 65, y: 64 },
  { x: 50, y: 82 },
];

export function HeartCake() {
  const [revealed, setRevealed] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const reveal = () => {
    setRevealed(true);
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ["#fbbf24", "#f9a8d4", "#fecaca", "#fde68a"] });
    setTimeout(() => confetti({ particleCount: 150, angle: 60, spread: 55, origin: { x: 0.1 } }), 300);
    setTimeout(() => confetti({ particleCount: 150, angle: 120, spread: 55, origin: { x: 0.9 } }), 500);
  };

  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length));
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % PHOTOS.length));

  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading
        eyebrow="Made with memories"
        title="Our Heart Cake"
        subtitle="A cake baked with love, decorated with our memories, and made just for you."
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          animate={{ scale: [1, 1.02, 1, 1.02, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="relative mx-auto aspect-square w-full max-w-2xl"
        >
          {/* glow */}
          <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-3xl" />

          {/* Heart shape container */}
          <div className="relative h-full w-full" style={{
            filter: "drop-shadow(0 20px 40px rgba(255, 100, 150, 0.4))",
          }}>
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="cakeFrost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fce7f3" />
                  <stop offset="50%" stopColor="#fbcfe8" />
                  <stop offset="100%" stopColor="#f9a8d4" />
                </linearGradient>
                <linearGradient id="goldBand" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              <motion.g
                animate={revealed ? { scale: 1.05 } : { scale: 1 }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <motion.path
                  d="M50,85 C15,60 5,35 20,20 C30,10 42,15 50,28 C58,15 70,10 80,20 C95,35 85,60 50,85 Z"
                  fill="url(#cakeFrost)"
                  stroke="url(#goldBand)"
                  strokeWidth="0.8"
                  animate={revealed ? { x: [-2, 2, 0] } : {}}
                />
              </motion.g>
            </svg>

            {/* Photo collage inside heart */}
            <div className="absolute inset-0">
              {HEART_POSITIONS.map((pos, i) => (
                <motion.button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.2, zIndex: 20, y: -4 }}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: `translate(-50%, -50%) rotate(${(i % 5 - 2) * 4}deg)`,
                  }}
                  className="absolute h-[14%] w-[14%] overflow-hidden rounded-md border-2 border-white bg-white shadow-lg transition-shadow hover:shadow-pink-400/60 hover:shadow-2xl"
                >
                  <img src={PHOTOS[i]} alt={`Memory ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </motion.button>
              ))}
            </div>

            {/* Fairy lights */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                className="absolute h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_8px_4px_rgba(255,215,120,0.6)]"
              />
            ))}
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <motion.button
            onClick={reveal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-glow btn-glow-hover inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium"
          >
            <Heart size={18} className="fill-white" />
            Reveal Our Love Story
          </motion.button>

          <AnimatePresence>
            {revealed && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-8 max-w-2xl font-display text-2xl text-rose-glow sm:text-3xl"
              >
                Every picture is a reminder that every moment with you is the sweetest part of my life.
                <br />Happy Birthday, my love. ❤️
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          >
            <button onClick={() => setLightboxIdx(null)} className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
              <X />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
              <ChevronLeft />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
              <ChevronRight />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={PHOTOS[lightboxIdx]}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[85vw] rounded-lg border-4 border-white shadow-2xl"
              alt="Memory"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}