import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-12 text-center">
      <Heart className="mx-auto mb-4 h-8 w-8 fill-pink-400 text-pink-400 animate-heartbeat" />
      <p className="font-display text-3xl text-rose-glow">Made with all my love</p>
      <p className="mt-2 text-sm text-cream/70">Happy Birthday, My Forever Person ❤️</p>
    </footer>
  );
}