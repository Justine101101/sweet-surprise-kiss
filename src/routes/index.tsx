import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FloatingBackground } from "@/components/birthday/FloatingBackground";
import { Landing } from "@/components/birthday/Landing";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { Bouquet } from "@/components/birthday/Bouquet";
import { LoveLetter } from "@/components/birthday/LoveLetter";
import { HeartCake } from "@/components/birthday/HeartCake";
import { Calendar } from "@/components/birthday/Calendar";
import { Reasons } from "@/components/birthday/Reasons";
import { GiftBox } from "@/components/birthday/GiftBox";
import { RemindsMeSong } from "@/components/birthday/RemindsMeSong";
import { Wishes } from "@/components/birthday/Wishes";
import { Footer } from "@/components/birthday/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingBackground density={22} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="landing" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.7 }}>
            <Landing onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <section className="relative z-10 flex min-h-[70vh] items-center justify-center px-6 py-24 text-center">
              <div>
                <h1 className="font-display text-6xl text-rose-glow sm:text-8xl">Welcome, my love</h1>
                <p className="mt-6 text-cream/80">Scroll gently — each surprise was made just for you.</p>
              </div>
            </section>
            <Bouquet />
            <LoveLetter />
            <RemindsMeSong />
            <HeartCake />
            <Calendar />
            <Reasons />
            <GiftBox />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      <MusicPlayer />
    </div>
  );
}
