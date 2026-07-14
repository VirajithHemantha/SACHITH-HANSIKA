'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock3, MapPin, Sparkles } from 'lucide-react';

export default function CeremonyDetails() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat px-4 py-24 sm:px-6 md:py-32 lg:px-8"
      style={{ backgroundImage: 'url("/ChatGPT%20Image%20Jul%2015,%202026,%2004_57_16%20AM.png")' }}
    >
      <div className="relative z-10 mx-auto max-w-2xl pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex flex-col text-left"
        >
          {/* Top Badge */}
          <div className="mb-8 inline-flex items-center gap-2 self-start rounded-full border border-secondary/40 bg-[#FAF6F0]/80 px-5 py-2 backdrop-blur-md shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary sm:text-xs">
              The Sacred Celebration
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-6 flex flex-col font-serif text-5xl sm:text-6xl md:text-7xl text-primary leading-tight drop-shadow-sm">
            <span className="font-normal">Wedding</span>
            <span className="italic text-[#A87C71]">Ceremony</span>
          </h2>
          
          <div className="mb-6 flex items-center gap-3">
             <span className="h-px flex-1 bg-secondary/40" />
             <Sparkles className="h-4 w-4 text-secondary" />
             <span className="h-px flex-1 bg-secondary/40" />
          </div>

          {/* Paragraph */}
          <p className="mb-12 text-sm sm:text-base leading-relaxed text-primary/80 max-w-lg">
            With immense joy in our hearts, we invite you to share our happiness as we embark on this new chapter. Join us for a traditional Poruwa Ceremony surrounded by our loved ones.
          </p>
        </motion.div>

        {/* Event Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full overflow-hidden rounded-[2rem] border border-secondary/30 bg-[#FAF6F0]/85 p-6 sm:p-10 shadow-xl backdrop-blur-md"
        >
          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 h-10 w-10 border-t border-l border-secondary/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute bottom-3 right-3 h-10 w-10 border-b border-r border-secondary/40 rounded-br-xl pointer-events-none" />

          <div className="mb-8 flex items-center justify-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-primary/80">
            <Sparkles className="h-3 w-3" />
            EVENT DETAILS
            <Sparkles className="h-3 w-3" />
          </div>

          <div className="flex flex-col gap-8">
            {/* Venue Block */}
            <div className="flex items-start gap-5">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-[#E8DCC8]/60 shadow-inner">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-2">Venue</p>
                <h3 className="font-serif text-2xl text-primary">Seethawaka Regency</h3>
                <p className="text-sm text-primary/60 mt-1">Avissawella</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <span className="h-px w-full bg-secondary/20" />
              <div className="h-2 w-2 rotate-45 bg-secondary/40 mx-2" />
              <span className="h-px w-full bg-secondary/20" />
            </div>

            {/* Auspicious Time */}
            <div className="flex items-start gap-5">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-[#E8DCC8]/60 shadow-inner">
                <Clock3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-2">Poruwa Auspicious Time</p>
                <h3 className="font-serif text-2xl text-primary">9:54 AM</h3>
                <p className="text-sm text-primary/60 mt-1">Traditional wedding rituals</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <span className="h-px w-full bg-secondary/20" />
              <div className="h-2 w-2 rotate-45 bg-secondary/40 mx-2" />
              <span className="h-px w-full bg-secondary/20" />
            </div>

            {/* Celebration Time */}
            <div className="flex items-start gap-5">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-[#E8DCC8]/60 shadow-inner">
                <Clock3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-2">Celebration Time</p>
                <h3 className="font-serif text-2xl text-primary">9:54 AM - 4:00 PM</h3>
                <p className="text-sm text-primary/60 mt-1">Wedding celebration</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}