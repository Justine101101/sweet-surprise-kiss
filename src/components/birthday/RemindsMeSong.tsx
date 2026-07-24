import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const YOUTUBE_ID = "v82VtUUGFqk";

export function RemindsMeSong() {
  return (
    <section className="relative z-10 px-6 py-24">
      <SectionHeading
        eyebrow="Our song"
        title="You Remind Me Of"
        subtitle="Every time I hear this, I think of you."
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl"
      >
        <div className="glass-card overflow-hidden rounded-3xl p-3 sm:p-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-rose-100">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0`}
              title="PALAGI - TJ Monterde | OFFICIAL MUSIC VIDEO"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="px-2 pb-2 pt-5 text-center sm:px-4">
            <p className="font-display text-3xl text-rose-glow sm:text-4xl">Palagi</p>
            <p className="mt-1 text-sm text-cream/70">TJ Monterde</p>
            <a
              href={`https://youtu.be/${YOUTUBE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-rose-400 transition hover:text-rose-600"
            >
              Open on YouTube
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
