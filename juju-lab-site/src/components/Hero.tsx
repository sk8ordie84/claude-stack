"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Minimal vertical line accent */}
      <motion.div
        className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-juju-border/40 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Batch label */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.35em] text-juju-gray uppercase mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Est. 2024 &middot; Signal Intelligence House
        </motion.p>

        {/* Wordmark */}
        <motion.h1
          className="font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-[0.08em] text-juju-pure font-light mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          JUJU LAB
        </motion.h1>

        {/* Thin rule */}
        <motion.div
          className="w-16 h-px bg-juju-muted mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        {/* Editorial tagline */}
        <motion.p
          className="font-serif text-xl md:text-2xl text-juju-silver font-normal italic leading-relaxed max-w-lg mx-auto mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          Calibration over certainty.<br />
          Signal over noise.
        </motion.p>

        {/* Descriptor */}
        <motion.p
          className="text-[13px] text-juju-gray font-light tracking-wide max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          An intelligence-driven operator terminal<br className="hidden md:block" />
          for prediction markets.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-juju-muted to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
