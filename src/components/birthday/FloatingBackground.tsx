import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useMemo } from "react";

type Item = { id: number; left: number; delay: number; duration: number; size: number; kind: "heart" | "sparkle" | "petal" };

export function FloatingBackground({ density = 18 }: { density?: number }) {
  const items = useMemo<Item[]>(() => {
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 14,
      size: 12 + Math.random() * 20,
      kind: (["heart", "sparkle", "petal"] as const)[i % 3],
    }));
  }, [density]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{ y: "-15vh", opacity: [0, 0.8, 0.8, 0], rotate: 360 }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: "linear" }}
          style={{ left: `${it.left}%` }}
          className="absolute"
        >
          {it.kind === "heart" && (
            <Heart size={it.size} className="fill-pink-300/70 text-pink-300/70 drop-shadow-[0_0_8px_rgba(255,192,203,0.6)]" />
          )}
          {it.kind === "sparkle" && (
            <Sparkles size={it.size} className="text-amber-200/80 drop-shadow-[0_0_8px_rgba(255,215,120,0.7)]" />
          )}
          {it.kind === "petal" && (
            <div
              style={{ width: it.size, height: it.size * 1.2 }}
              className="rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br from-pink-200/80 to-rose-300/60 shadow-[0_0_10px_rgba(255,182,193,0.6)]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}