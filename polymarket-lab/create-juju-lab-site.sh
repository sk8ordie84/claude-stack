#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# JUJU LAB — Marketing Site Generator
# Run from inside ~/Desktop/polymarket-lab:
#   bash create-juju-lab-site.sh
# Then:
#   cd juju-lab-site && npm install && npm run dev
# ─────────────────────────────────────────────────────────────────────────────

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)/juju-lab-site"

echo "Creating JUJU LAB site at: $ROOT"
mkdir -p "$ROOT/src/app"
mkdir -p "$ROOT/src/components"
mkdir -p "$ROOT/src/lib"
mkdir -p "$ROOT/public"

# ─── .gitignore ──────────────────────────────────────────────────────────────
cat > "$ROOT/.gitignore" << 'GITIGNORE'
node_modules
.next
out
.DS_Store
*.tsbuildinfo
next-env.d.ts
GITIGNORE

# ─── package.json ────────────────────────────────────────────────────────────
cat > "$ROOT/package.json" << 'PKGJSON'
{
  "name": "juju-lab-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tailwindcss/postcss": "^4.2.1",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "next": "^15.3.0",
    "postcss": "^8.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.2.1",
    "typescript": "^5.0.0"
  }
}
PKGJSON

# ─── tsconfig.json ───────────────────────────────────────────────────────────
cat > "$ROOT/tsconfig.json" << 'TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TSCONFIG

# ─── next.config.ts ──────────────────────────────────────────────────────────
cat > "$ROOT/next.config.ts" << 'NEXTCONFIG'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
NEXTCONFIG

# ─── postcss.config.mjs ──────────────────────────────────────────────────────
cat > "$ROOT/postcss.config.mjs" << 'POSTCSS'
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
POSTCSS

# ─── src/app/globals.css ─────────────────────────────────────────────────────
cat > "$ROOT/src/app/globals.css" << 'GLOBALCSS'
@import "tailwindcss";

@theme {
  --color-juju-black: #08090c;
  --color-juju-charcoal: #0e1015;
  --color-juju-dark: #13151b;
  --color-juju-panel: #181b23;
  --color-juju-border: #1e2230;
  --color-juju-muted: #2a2e3b;
  --color-juju-gray: #6b7084;
  --color-juju-silver: #9499ae;
  --color-juju-light: #c8ccd8;
  --color-juju-white: #e8eaf0;
  --color-juju-pure: #f4f5f7;
  --color-juju-signal: #3dd68c;
  --color-juju-signal-dim: #1a5c3d;
  --color-juju-caution: #e8a838;
  --color-juju-danger: #e05454;
  --color-juju-blue: #4a8fe8;

  --font-serif: "Instrument Serif", Georgia, serif;
  --font-sans: "DM Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", monospace;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: rgba(61, 214, 140, 0.18);
  color: var(--color-juju-pure);
}

html { scroll-behavior: smooth; }

body {
  background: var(--color-juju-black);
  color: var(--color-juju-white);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-juju-black); }
::-webkit-scrollbar-thumb { background: var(--color-juju-muted); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-juju-gray); }

.noise-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 1;
}

.grid-pattern {
  background-image:
    linear-gradient(var(--color-juju-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-juju-border) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
}

@keyframes signal-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.animate-signal-pulse { animation: signal-pulse 2.4s ease-in-out infinite; }

.glow-signal {
  box-shadow: 0 0 40px rgba(61, 214, 140, 0.06), 0 0 80px rgba(61, 214, 140, 0.03);
}

.section-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-juju-border) 20%,
    var(--color-juju-muted) 50%,
    var(--color-juju-border) 80%,
    transparent 100%
  );
}
GLOBALCSS

# ─── src/app/layout.tsx ──────────────────────────────────────────────────────
cat > "$ROOT/src/app/layout.tsx" << 'LAYOUT'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUJU LAB — Signal Intelligence",
  description: "Intelligence-driven operator terminal for prediction markets. Signal intelligence, not prediction theater.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-juju-black text-juju-white antialiased">
        {children}
      </body>
    </html>
  );
}
LAYOUT

# ─── src/app/page.tsx ────────────────────────────────────────────────────────
cat > "$ROOT/src/app/page.tsx" << 'PAGE'
"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ProductShowcase from "@/components/ProductShowcase";
import Capabilities from "@/components/Capabilities";
import WhyDifferent from "@/components/WhyDifferent";
import Evidence from "@/components/Evidence";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Philosophy />
      <ProductShowcase />
      <Capabilities />
      <WhyDifferent />
      <Evidence />
      <Closing />
      <Footer />
    </main>
  );
}
PAGE

# ─── src/lib/animations.tsx ──────────────────────────────────────────────────
cat > "$ROOT/src/lib/animations.tsx" << 'ANIMATIONS'
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const offsets: Record<string, object> = {
    up: { y: 40 }, down: { y: -40 }, left: { x: 40 }, right: { x: -40 }, none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children, className = "", staggerDelay = 0.1,
}: {
  children: ReactNode; className?: string; staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.1 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };
  return <motion.div variants={itemVariants} className={className}>{children}</motion.div>;
}

export function Parallax({
  children, speed = 0.5, className = "",
}: {
  children: ReactNode; speed?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function AnimatedCounter({
  value, suffix = "", prefix = "", className = "",
}: {
  value: number; suffix?: string; prefix?: string; className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, 1500 / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref} className={className}>{prefix}{count}{suffix}</span>;
}

export function FadeRule({ className = "" }: { className?: string }) {
  return (
    <Reveal className={className}>
      <div className="section-divider w-full" />
    </Reveal>
  );
}
ANIMATIONS

# ─── src/components/Navigation.tsx ───────────────────────────────────────────
cat > "$ROOT/src/components/Navigation.tsx" << 'NAV'
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "System", href: "#product" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Evidence", href: "#evidence" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
      style={{ backgroundColor: `rgba(8, 9, 12, ${bgOpacity})`, backdropFilter: "blur(20px)" }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-juju-border"
        style={{ opacity: borderOpacity }}
      />
      <div className="mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 border border-juju-signal/30 rotate-45 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-juju-signal/60" />
            <span className="font-mono text-xs text-juju-signal font-medium tracking-wider">JL</span>
          </div>
          <span className="font-serif text-lg tracking-wide text-juju-light hidden sm:block">JUJU LAB</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm text-juju-gray hover:text-juju-light transition-colors duration-300 tracking-wide font-light">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#access"
          className="text-sm tracking-wider text-juju-signal/80 hover:text-juju-signal border border-juju-signal/20 hover:border-juju-signal/40 px-5 py-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(61,214,140,0.08)]">
          Request Access
        </a>
      </div>
    </motion.nav>
  );
}
NAV

# ─── src/components/Hero.tsx ─────────────────────────────────────────────────
cat > "$ROOT/src/components/Hero.tsx" << 'HERO'
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08090c_70%)]" />
      <div className="absolute inset-0 grid-pattern" />
      <motion.div
        className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-juju-signal/10 to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.div
        className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-juju-signal/8 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
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
    const update = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-6 text-xs font-mono text-juju-gray tracking-wider"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }}
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
        <motion.div
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 border border-juju-border bg-juju-charcoal/50"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="w-1.5 h-1.5 bg-juju-signal rounded-full animate-signal-pulse" />
          <span className="text-xs font-mono tracking-[0.2em] text-juju-silver">v1.9 · SIGNAL INTELLIGENCE</span>
        </motion.div>

        <motion.h1
          className="font-serif text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] tracking-tight text-juju-pure mb-8"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          JUJU LAB
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-juju-silver font-light tracking-wide max-w-2xl mx-auto mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          An intelligence-driven operator terminal for prediction markets.
          <br className="hidden md:block" />
          Calibration over certainty. Signal over noise.
        </motion.p>

        <motion.p
          className="text-sm text-juju-gray font-mono tracking-widest uppercase mb-14"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Built for operators who demand epistemic honesty
        </motion.p>

        <SystemStatus />
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-juju-gray uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-juju-gray/50 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
HERO

# ─── src/components/Philosophy.tsx ───────────────────────────────────────────
cat > "$ROOT/src/components/Philosophy.tsx" << 'PHILOSOPHY'
"use client";

import { Reveal, FadeRule } from "@/lib/animations";

const principles = [
  {
    number: "01",
    title: "Epistemic Honesty",
    text: "The system labels uncertainty. It does not manufacture conviction. When the signal is thin, it says so.",
  },
  {
    number: "02",
    title: "Calibration Over Certainty",
    text: "Every output is measured against resolved outcomes. Not once — continuously. Accuracy isn't claimed. It's proven.",
  },
  {
    number: "03",
    title: "Signal, Not Theater",
    text: "No decorative confidence scores. No algorithmic hype. Just structured intelligence with visible provenance.",
  },
  {
    number: "04",
    title: "Structural Caution",
    text: "The system surfaces depth imbalance, conflicted reads, and thin markets — because real operators need to know what can break.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />

        <div className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">Philosophy</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
              Not prediction theater.
              <br />
              <span className="text-juju-silver italic">Intelligence discipline.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-juju-gray leading-relaxed max-w-xl">
              Most prediction tools sell confidence. We built a system that earns it.
              JUJU LAB exists for operators who understand that honest uncertainty
              is more valuable than manufactured conviction.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-juju-border">
          {principles.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.1}>
              <div className="bg-juju-black p-8 md:p-12 group hover:bg-juju-charcoal/50 transition-colors duration-500">
                <span className="font-mono text-xs text-juju-signal/50 tracking-widest mb-4 block">{p.number}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-juju-light mb-4 tracking-tight">{p.title}</h3>
                <p className="text-sm text-juju-gray leading-relaxed">{p.text}</p>
                <div className="mt-6 w-8 h-px bg-juju-border group-hover:w-16 group-hover:bg-juju-signal/30 transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
PHILOSOPHY

# ─── src/components/ProductShowcase.tsx ──────────────────────────────────────
cat > "$ROOT/src/components/ProductShowcase.tsx" << 'PRODUCT'
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/lib/animations";

function WorkspacePanel() {
  return (
    <div className="bg-juju-charcoal border border-juju-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-juju-signal rounded-full" />
          <span className="font-mono text-xs text-juju-silver tracking-wider">WORKSPACE</span>
        </div>
        <span className="font-mono text-[10px] text-juju-gray">12 ACTIVE EVENTS</span>
      </div>
      <div className="space-y-3">
        {[
          { label: "US Election 2026 · Senate", status: "BUILDING", dot: "bg-juju-caution" },
          { label: "Fed Rate Decision · June", status: "CONFIRMED", dot: "bg-juju-signal" },
          { label: "UK PM Approval · Q2", status: "WATCH", dot: "bg-juju-gray" },
          { label: "BTC > 120k · Dec 2026", status: "THIN", dot: "bg-juju-danger/60" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3 px-4 bg-juju-dark/50 border border-juju-border/50">
            <span className="text-sm text-juju-light">{item.label}</span>
            <span className="font-mono text-[10px] tracking-wider flex items-center gap-1.5 text-juju-silver">
              <span className={`inline-block w-1.5 h-1.5 ${item.dot} rounded-full`} />
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionBoardPanel() {
  return (
    <div className="bg-juju-charcoal border border-juju-border p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-juju-caution rounded-full" />
        <span className="font-mono text-xs text-juju-silver tracking-wider">DAILY ACTION BOARD</span>
      </div>
      <div className="space-y-4">
        <div className="border-l-2 border-juju-signal/50 pl-4">
          <p className="text-xs font-mono text-juju-signal/70 mb-1">ACTIONABLE</p>
          <p className="text-sm text-juju-light">Fed Rate — 78% hold probability confirmed by 3 independent clusters</p>
          <p className="text-xs text-juju-gray mt-1">Depth: strong · Calibration: 0.91 · Signal age: 14d</p>
        </div>
        <div className="border-l-2 border-juju-caution/50 pl-4">
          <p className="text-xs font-mono text-juju-caution/70 mb-1">WATCH</p>
          <p className="text-sm text-juju-light">Senate Control — case building, insufficient depth</p>
          <p className="text-xs text-juju-gray mt-1">Depth: moderate · Calibration: 0.67 · Conflicted</p>
        </div>
        <div className="border-l-2 border-juju-gray/30 pl-4">
          <p className="text-xs font-mono text-juju-gray mb-1">THIN SIGNAL</p>
          <p className="text-sm text-juju-gray">BTC target — low liquidity, no structural confirmation</p>
          <p className="text-xs text-juju-muted mt-1">Depth: thin · No reference metric</p>
        </div>
      </div>
    </div>
  );
}

function EventGraphPanel() {
  return (
    <div className="bg-juju-charcoal border border-juju-border p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-juju-blue rounded-full" />
        <span className="font-mono text-xs text-juju-silver tracking-wider">EVENT GRAPH</span>
      </div>
      <div className="relative h-40 flex items-end gap-1">
        {[35,42,38,55,62,58,70,68,74,78,72,76,80,78,82,79,84,80,85,83].map((h, i) => (
          <div key={i} className="flex-1 bg-juju-signal/15 hover:bg-juju-signal/30 transition-colors duration-200 relative"
            style={{ height: `${h}%` }}>
            {i === 19 && <div className="absolute -top-6 right-0 font-mono text-[10px] text-juju-signal">84.2%</div>}
          </div>
        ))}
        <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-juju-gray/20">
          <span className="absolute -top-3 right-0 font-mono text-[9px] text-juju-gray">REF: 0.82</span>
        </div>
      </div>
      <div className="flex justify-between mt-3 font-mono text-[9px] text-juju-gray">
        <span>30d ago</span><span>current</span>
      </div>
    </div>
  );
}

function ValidationPanel() {
  return (
    <div className="bg-juju-charcoal border border-juju-border p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-juju-signal rounded-full" />
        <span className="font-mono text-xs text-juju-silver tracking-wider">VALIDATION</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "Calibration Score", value: "0.89", color: "text-juju-signal" },
          { label: "Resolution Rate", value: "94%", color: "text-juju-signal" },
          { label: "Calibration Gap", value: "+0.03", color: "text-juju-light" },
          { label: "False Signals", value: "6.2%", color: "text-juju-caution" },
        ].map((m) => (
          <div key={m.label} className="bg-juju-dark/50 p-3 border border-juju-border/30">
            <p className="font-mono text-[10px] text-juju-gray tracking-wider mb-2">{m.label}</p>
            <p className={`font-mono text-xl ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="text-[10px] font-mono text-juju-gray/60 border-t border-juju-border/30 pt-3">
        Last validated against 847 resolved outcomes
      </div>
    </div>
  );
}

const panels = [
  { id: "workspace", title: "Workspace", subtitle: "Unified event monitoring across prediction markets", Component: WorkspacePanel },
  { id: "action-board", title: "Daily Action Board", subtitle: "Triaged signals: actionable, watch, or thin", Component: ActionBoardPanel },
  { id: "event-graph", title: "Event Graph", subtitle: "Lifecycle tracking with reference calibration", Component: EventGraphPanel },
  { id: "validation", title: "Validation Layer", subtitle: "Continuous accuracy measurement against resolved outcomes", Component: ValidationPanel },
];

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="product" ref={containerRef} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-3xl mb-24">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">The System</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
              Feel the system<br />
              <span className="text-juju-silver italic">before you read it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-juju-gray leading-relaxed max-w-xl">
              Four integrated surfaces. One coherent intelligence layer.
              Each view earns its place by serving a distinct operator need.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-juju-border hidden md:block">
            <motion.div className="w-full bg-juju-signal/30 origin-top" style={{ height: lineHeight }} />
          </div>
          <StaggerContainer className="space-y-16 md:space-y-24 md:pl-20" staggerDelay={0.15}>
            {panels.map((panel) => (
              <StaggerItem key={panel.id}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-2 pt-4">
                    <h3 className="font-serif text-2xl md:text-3xl text-juju-light mb-3">{panel.title}</h3>
                    <p className="text-sm text-juju-gray leading-relaxed">{panel.subtitle}</p>
                  </div>
                  <div className="lg:col-span-3 glow-signal">
                    <panel.Component />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
PRODUCT

# ─── src/components/Capabilities.tsx ─────────────────────────────────────────
cat > "$ROOT/src/components/Capabilities.tsx" << 'CAPS'
"use client";

import { Reveal, FadeRule, StaggerContainer, StaggerItem } from "@/lib/animations";

const capabilities = [
  { icon: "◆", title: "Anomaly Detection", description: "Surfaces statistical anomalies across prediction markets — price movements, volume spikes, and structural shifts that deviate from baseline behavior." },
  { icon: "◇", title: "Signal Lifecycle", description: "Tracks every signal from emergence through confirmation or decay. You see the full trajectory — building, confirmed, conflicted, or dissolved." },
  { icon: "▸", title: "Operator Framing", description: "Reframes raw market data into operator-relevant intelligence. Not what the market says — what an operator needs to know." },
  { icon: "◌", title: "Calibration & Validation", description: "Continuous measurement against resolved outcomes. The system knows its own accuracy — and shows you where it has been right and wrong." },
  { icon: "⬡", title: "Multi-Perspective Analysis", description: "Market-level, event-level, and observation-level views. Zoom between macro structure and micro signal with coherent attribution." },
  { icon: "◈", title: "Event Graph Intelligence", description: "Maps relationships between events, clusters correlated predictions, and surfaces hidden dependencies that single-market views miss." },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 md:py-48 bg-juju-charcoal/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 mb-20">
          <div className="lg:col-span-1">
            <Reveal>
              <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">Capabilities</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl text-juju-pure leading-[1.1] mb-6">What the system sees.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-juju-gray leading-relaxed">Six integrated intelligence capabilities. Each one validated, each one transparent in its methods.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-2">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-juju-border" staggerDelay={0.08}>
              {capabilities.map((cap) => (
                <StaggerItem key={cap.title}>
                  <div className="bg-juju-black p-8 md:p-10 h-full group hover:bg-juju-dark/80 transition-colors duration-500">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-juju-signal/40 text-lg font-light mt-0.5 group-hover:text-juju-signal/70 transition-colors duration-500">{cap.icon}</span>
                      <h3 className="font-serif text-xl text-juju-light tracking-tight">{cap.title}</h3>
                    </div>
                    <p className="text-sm text-juju-gray leading-relaxed pl-8">{cap.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
        <Reveal>
          <div className="mt-16 border border-juju-border bg-juju-dark/30 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-juju-signal" />
                  <span className="font-mono text-xs tracking-[0.2em] text-juju-signal/80">ACTIONABLE</span>
                </div>
                <p className="text-sm text-juju-light leading-relaxed">Confirmed signal with sufficient depth, calibration history, and structural support. The system has earned the right to surface this.</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-juju-caution" />
                  <span className="font-mono text-xs tracking-[0.2em] text-juju-caution/80">WATCH</span>
                </div>
                <p className="text-sm text-juju-light leading-relaxed">Signal detected but unconfirmed. The case is building, depth is insufficient, or the read is conflicted. Not silence — structured patience.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
CAPS

# ─── src/components/WhyDifferent.tsx ─────────────────────────────────────────
cat > "$ROOT/src/components/WhyDifferent.tsx" << 'WHY'
"use client";

import { Reveal, FadeRule } from "@/lib/animations";

const comparisons = [
  { them: "Decorative confidence scores", us: "Calibrated probability with measured accuracy" },
  { them: '"AI picks" with no validation', us: "Every signal validated against resolved outcomes" },
  { them: "Always-on recommendations", us: "Silence when the system doesn't know enough" },
  { them: "Hype-driven interface", us: "Operator-framed intelligence with uncertainty labels" },
  { them: "Single-market tunnel vision", us: "Cross-market event clustering and dependency mapping" },
  { them: "Black-box algorithms", us: "Transparent signal lifecycle with visible provenance" },
];

export default function WhyDifferent() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />
        <div className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">Differentiation</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
              Most tools sell confidence.<br />
              <span className="text-juju-silver italic">We measure it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-juju-gray leading-relaxed max-w-xl">
              The market is full of tools that perform certainty. JUJU LAB is built for operators
              who know that honest uncertainty is the only defensible foundation.
            </p>
          </Reveal>
        </div>

        <div className="border border-juju-border">
          <div className="grid grid-cols-2 border-b border-juju-border">
            <div className="p-4 md:p-6 bg-juju-dark/30">
              <span className="font-mono text-[10px] tracking-[0.2em] text-juju-gray uppercase">Prediction Theater</span>
            </div>
            <div className="p-4 md:p-6 bg-juju-charcoal/30">
              <span className="font-mono text-[10px] tracking-[0.2em] text-juju-signal/60 uppercase">JUJU LAB</span>
            </div>
          </div>
          {comparisons.map((row, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="grid grid-cols-2 border-b border-juju-border/50 last:border-b-0 group hover:bg-juju-charcoal/20 transition-colors duration-300">
                <div className="p-4 md:p-6 border-r border-juju-border/50">
                  <p className="text-sm text-juju-gray line-through decoration-juju-danger/30">{row.them}</p>
                </div>
                <div className="p-4 md:p-6">
                  <p className="text-sm text-juju-light">{row.us}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-20 max-w-2xl mx-auto text-center">
            <blockquote className="font-serif text-2xl md:text-3xl text-juju-light leading-relaxed italic">
              &ldquo;A system that knows what it knows —<br />and what it doesn&rsquo;t.&rdquo;
            </blockquote>
            <div className="mt-6 w-12 h-px bg-juju-signal/30 mx-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
WHY

# ─── src/components/Evidence.tsx ─────────────────────────────────────────────
cat > "$ROOT/src/components/Evidence.tsx" << 'EVIDENCE'
"use client";

import { Reveal, FadeRule, StaggerContainer, StaggerItem, AnimatedCounter } from "@/lib/animations";

const metrics = [
  { label: "Market-Level Reference Metric", value: "0.89", description: "Aggregate calibration score across all monitored prediction markets. Measures alignment between system confidence and actual resolution rates.", status: "nominal" },
  { label: "Calibration Gap", value: "+0.034", description: "Deviation between predicted probability and observed frequency. A positive gap means the system is slightly overconfident — and it tells you so.", status: "neutral" },
  { label: "Depth Imbalance Detection", value: "Active", description: "Identifies markets where liquidity is asymmetric — where surface price doesn't reflect actual depth of conviction on either side.", status: "active" },
  { label: "Signal Classification", value: "3-tier", description: "Every signal is classified as Building, Confirmed, or Dissolved. No ambiguity about where in its lifecycle a signal sits.", status: "nominal" },
];

const glossary = [
  { term: "Building Case", definition: "Signal detected with early structural support. Not yet confirmed — the system is watching, not recommending." },
  { term: "Confirmed Signal", definition: "Multiple independent clusters agree. Calibration history supports the read. Depth is sufficient for operator consideration." },
  { term: "Conflicted Read", definition: "The system has detected contradictory signals. Rather than choosing a side, it surfaces the conflict explicitly." },
  { term: "Thin Market", definition: "Insufficient liquidity or participation to generate reliable signal. The system labels this, rather than guessing through it." },
  { term: "Epistemic Label", definition: "Every output carries its uncertainty. Not a single confidence number — a structured description of what the system knows and doesn't." },
];

export default function Evidence() {
  return (
    <section id="evidence" className="relative py-32 md:py-48 bg-juju-charcoal/20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />
        <div className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">Evidence</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
              Trust is measured.<br />
              <span className="text-juju-silver italic">Never assumed.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-juju-gray leading-relaxed max-w-xl">
              Every claim the system makes is validated against resolved outcomes. These are not marketing
              numbers. They are the system&rsquo;s own scorecard, always visible, always current.
            </p>
          </Reveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-juju-border mb-24" staggerDelay={0.1}>
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="bg-juju-black p-8 md:p-10 h-full group hover:bg-juju-dark/50 transition-colors duration-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-juju-gray uppercase">{metric.label}</span>
                  <span className={`w-2 h-2 rounded-full ${metric.status === "nominal" ? "bg-juju-signal" : metric.status === "active" ? "bg-juju-blue animate-signal-pulse" : "bg-juju-caution"}`} />
                </div>
                <p className="font-mono text-3xl md:text-4xl text-juju-pure mb-4 tracking-tight">{metric.value}</p>
                <p className="text-sm text-juju-gray leading-relaxed">{metric.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-juju-border border border-juju-border mb-24">
            {[
              { value: 847, suffix: "", label: "Resolved Outcomes Validated" },
              { value: 94, suffix: "%", label: "Resolution Coverage" },
              { value: 23, suffix: "", label: "Active Market Clusters" },
              { value: 6, suffix: ".2%", label: "False Signal Rate" },
            ].map((stat) => (
              <div key={stat.label} className="bg-juju-black p-6 md:p-8 text-center">
                <p className="font-mono text-2xl md:text-3xl text-juju-pure mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-mono text-[10px] tracking-wider text-juju-gray uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="max-w-3xl">
          <Reveal>
            <h3 className="font-serif text-2xl md:text-3xl text-juju-light mb-10">The language of epistemic honesty</h3>
          </Reveal>
          {glossary.map((item, i) => (
            <Reveal key={item.term} delay={i * 0.05}>
              <div className="group flex flex-col md:flex-row md:items-start gap-2 md:gap-8 py-5 border-b border-juju-border/50 hover:border-juju-border transition-colors duration-300">
                <span className="font-mono text-sm text-juju-signal/60 tracking-wide min-w-[180px] group-hover:text-juju-signal/80 transition-colors duration-300">{item.term}</span>
                <p className="text-sm text-juju-gray leading-relaxed">{item.definition}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
EVIDENCE

# ─── src/components/Closing.tsx ──────────────────────────────────────────────
cat > "$ROOT/src/components/Closing.tsx" << 'CLOSING'
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, FadeRule } from "@/lib/animations";

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.96, 1]);

  return (
    <section id="access" ref={sectionRef} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />
        <motion.div className="max-w-3xl mx-auto text-center" style={{ opacity, scale }}>
          <div className="inline-flex items-center justify-center w-12 h-12 mb-12">
            <div className="w-6 h-6 border border-juju-signal/40 rotate-45" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
            Signal intelligence<br />
            <span className="text-juju-silver italic">for serious operators.</span>
          </h2>
          <p className="text-lg text-juju-gray leading-relaxed max-w-xl mx-auto mb-6">
            JUJU LAB is not for everyone. It is built for operators who value calibration over
            conviction, who understand that the hardest signal to produce is an honest one.
          </p>
          <p className="text-sm text-juju-gray/60 font-mono tracking-wider mb-14">
            Private beta · Limited access · Operator-vetted
          </p>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:access@jujulab.io"
                className="group relative px-8 py-4 bg-transparent border border-juju-signal/30 text-juju-signal tracking-wider text-sm hover:border-juju-signal/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(61,214,140,0.08)]">
                Request Access
              </a>
              <span className="text-juju-muted text-sm">or</span>
              <a href="mailto:hello@jujulab.io"
                className="text-sm text-juju-gray hover:text-juju-light transition-colors duration-300 tracking-wide">
                Contact the team →
              </a>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
CLOSING

# ─── src/components/Footer.tsx ───────────────────────────────────────────────
cat > "$ROOT/src/components/Footer.tsx" << 'FOOTER'
"use client";

export default function Footer() {
  return (
    <footer className="border-t border-juju-border/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 border border-juju-signal/20 rotate-45" />
                <span className="font-mono text-[9px] text-juju-signal/60">JL</span>
              </div>
              <span className="font-serif text-lg tracking-wide text-juju-silver">JUJU LAB</span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-juju-gray">v1.9 · SIGNAL INTELLIGENCE</p>
          </div>
          <div className="flex items-center gap-8">
            {[["Philosophy","#philosophy"],["System","#product"],["Capabilities","#capabilities"],["Evidence","#evidence"]].map(([label,href]) => (
              <a key={href} href={href} className="text-xs text-juju-gray hover:text-juju-light transition-colors duration-300">{label}</a>
            ))}
          </div>
          <p className="text-xs text-juju-muted">© 2026 JUJU LAB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
FOOTER

# ─── Done ─────────────────────────────────────────────────────────────────────
echo ""
echo "✓ All files created. Verifying..."
echo ""
find "$ROOT" -maxdepth 3 -type f | grep -v node_modules | grep -v ".next" | sort
echo ""
echo "─────────────────────────────────────────────────────────"
echo " JUJU LAB site ready at: $ROOT"
echo "─────────────────────────────────────────────────────────"
echo ""
echo " Next steps:"
echo "   cd juju-lab-site"
echo "   npm install"
echo "   npm run dev"
echo ""
echo " Then open: http://localhost:3000"
echo "─────────────────────────────────────────────────────────"
