import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";

// Customize: birthday date
const BIRTHDAY_DAY = 25;
const BIRTHDAY_MONTH = 6; // July (0-indexed)
const BIRTHDAY_YEAR = 2025;

export function Calendar() {
  const [showPopup, setShowPopup] = useState(false);
  const monthName = new Date(BIRTHDAY_YEAR, BIRTHDAY_MONTH).toLocaleString("en", { month: "long" });
  const daysInMonth = new Date(BIRTHDAY_YEAR, BIRTHDAY_MONTH + 1, 0).getDate();
  const firstDay = new Date(BIRTHDAY_YEAR, BIRTHDAY_MONTH, 1).getDay();

  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading eyebrow="A special date" title="Today Is The Day" />
      <div className="mx-auto max-w-md">
        <div className="glass-card rounded-3xl p-6">
          <div className="mb-4 text-center">
            <div className="font-display text-3xl text-gold">{monthName}</div>
            <div className="text-xs uppercase tracking-widest text-cream/60">{BIRTHDAY_YEAR}</div>
          </div>
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-cream/50">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const isBirthday = day === BIRTHDAY_DAY;
              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => isBirthday && setShowPopup(true)}
                  className={`aspect-square rounded-lg text-sm transition ${
                    isBirthday
                      ? "bg-gradient-to-br from-pink-400 to-rose-500 font-bold text-white shadow-[0_0_20px_rgba(244,114,182,0.7)] animate-heartbeat"
                      : "text-cream/70 hover:bg-rose-100"
                  }`}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-sm rounded-3xl p-8 text-center"
            >
              <Heart className="mx-auto mb-4 h-16 w-16 fill-pink-400 text-pink-400 animate-heartbeat" />
              <h3 className="font-display text-4xl text-rose-glow">Today is Your Special Day!</h3>
              <p className="mt-4 text-cream/80">I'll always remember this date because it's the day my favorite person was born.</p>
              <button onClick={() => setShowPopup(false)} className="mt-6 rounded-full btn-glow px-6 py-2 text-sm">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}