"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08090c_70%)]" />

      {/* Grid lines */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Vertical accent line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-juju-signal/10 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Horizontal accent line */}
      <motion.div
        className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-juju-signal/8 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Floating data points */}
      {[
        { x: "15%", y: "25%", delay: 1.5 },
        { x: "78%", y: "35%", delay: 2.0 },
        { x: "25%", y: "68%", delay: 2.5 },
        { x: "65%", y: "72%", delay: 1.8 },
        { x: "85%", y: "55%", delay: 2.2 },
      ].map((point, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-juju-signal/40 rounded-full"
          style={{ left: point.x, top: point.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: point.delay }}
        >
          <div className="absolute inset-0 bg-juju-signal/20 rounded-full animate-signal-pulse" />
        </motion.div>
      ))}
    </div>
  );
}

function SystemStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-6 text-xs font-mono text-juju-gray tracking-wider"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-juju-signal rounded-full animate-signal-pulse" />
        SYSTEM ACTIVE
      </span>
      <span className="text-juju-muted">|</span>
      <span>{time} UTC</span>
      <span className="text-juju-muted">|</span>
      <span>FEED NOMINAL</span>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay">
      <GridBackground />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Version badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 border border-juju-border bg-juju-charcoal/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="w-1.5 h-1.5 bg-juju-signal rounded-full animate-signal-pulse" />
          <span className="text-xs font-mono tracking-[0.2em] text-juju-silver">
            v1.9 · SIGNAL INTELLIGENCE
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-serif text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] tracking-tight text-juju-pure mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          JUJU LAB
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-juju-silver font-light tracking-wide max-w-2xl mx-auto mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          An intelligence-driven operator terminal for prediction markets.
          <br className="hidden md:block" />
          Calibration over certainty. Signal over noise.
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-sm text-juju-gray font-mono tracking-widest uppercase mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Built for operators who demand epistemic honesty
        </motion.p>

        {/* System status */}
        <SystemStatus />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-juju-gray uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-juju-gray/50 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
