"use client";

import { Reveal, FadeRule } from "@/lib/animations";

const comparisons = [
  {
    them: "Decorative confidence scores",
    us: "Calibrated probability with measured accuracy",
  },
  {
    them: "\"AI picks\" with no validation",
    us: "Every signal validated against resolved outcomes",
  },
  {
    them: "Always-on recommendations",
    us: "Silence when the system doesn't know enough",
  },
  {
    them: "Hype-driven interface",
    us: "Operator-framed intelligence with uncertainty labels",
  },
  {
    them: "Single-market tunnel vision",
    us: "Cross-market event clustering and dependency mapping",
  },
  {
    them: "Black-box algorithms",
    us: "Transparent signal lifecycle with visible provenance",
  },
];

export default function WhyDifferent() {
  return (
    <section className="relative paper-section paper-texture">
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 py-32 md:py-48">
        <FadeRule className="mb-24" />

        <div className="max-w-2xl mb-20">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.3em] text-juju-ink-muted uppercase mb-8 block">
              Differentiation &middot; Comparison Sheet
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-juju-ink leading-[1.05] font-light mb-8">
              Most tools sell confidence.
              <br />
              <em className="font-serif text-juju-ink-light">We measure it.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-juju-ink-muted leading-relaxed max-w-lg font-light">
              The market is full of tools that perform certainty.
              JUJU LAB is built for operators who know that honest
              uncertainty is the only defensible foundation.
            </p>
          </Reveal>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl">
          {/* Header */}
          <div className="grid grid-cols-2 pb-4 border-b border-juju-ink/10 mb-2">
            <span className="font-mono text-[9px] tracking-[0.2em] text-juju-ink-muted/50 uppercase">
              Prediction Theater
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-juju-ink-muted uppercase">
              JUJU LAB
            </span>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="grid grid-cols-2 py-4 border-b border-juju-ink/6 last:border-b-0">
                <p className="text-sm text-juju-ink-muted/40 font-light line-through decoration-juju-danger/20">
                  {row.them}
                </p>
                <p className="text-sm text-juju-ink font-light">
                  {row.us}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pull quote */}
        <Reveal delay={0.3}>
          <div className="mt-24 max-w-xl">
            <blockquote className="font-display text-2xl md:text-3xl text-juju-ink font-light leading-relaxed italic">
              &ldquo;A system that knows what it knows —
              and what it doesn&rsquo;t.&rdquo;
            </blockquote>
            <div className="mt-6 w-10 h-px bg-juju-ink/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
