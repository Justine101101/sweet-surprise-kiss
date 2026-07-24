import { motion } from "framer-motion";
import { Music, Pause, Play, Repeat } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  const toggle = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_1bffd85f2b.mp3"
        preload="none"
      />
      <motion.div
        layout
        className="glass-card flex items-center gap-3 rounded-full px-3 py-3 text-cream shadow-glow-pink"
      >
        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-11 w-11 items-center justify-center rounded-full btn-glow"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={18} className="fill-white" /> : <Play size={18} className="fill-white ml-0.5" />}
        </motion.button>

        {expanded && (
          <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} className="flex items-center gap-3 overflow-hidden pr-3">
            <div className="whitespace-nowrap">
              <div className="font-display text-lg leading-none text-rose-glow">Until I Found You</div>
              <div className="text-[10px] text-cream/70">This song reminds me of you</div>
            </div>
            <button
              onClick={() => setLoop((l) => !l)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 transition ${loop ? "bg-pink-200/60 text-rose-600" : "text-cream/60"}`}
              aria-label="Toggle loop"
            >
              <Repeat size={14} />
            </button>
          </motion.div>
        )}

        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 hover:text-rose-500"
          aria-label="Toggle player"
        >
          <Music size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}