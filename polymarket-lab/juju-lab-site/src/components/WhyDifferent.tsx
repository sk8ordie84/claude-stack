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
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />

        <div className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">
              Differentiation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
              Most tools sell confidence.
              <br />
              <span className="text-juju-silver italic">We measure it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-juju-gray leading-relaxed max-w-xl">
              The market is full of tools that perform certainty.
              JUJU LAB is built for operators who know that honest
              uncertainty is the only defensible foundation.
            </p>
          </Reveal>
        </div>

        {/* Comparison table */}
        <div className="border border-juju-border">
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-juju-border">
            <div className="p-4 md:p-6 bg-juju-dark/30">
              <span className="font-mono text-[10px] tracking-[0.2em] text-juju-gray uppercase">
                Prediction Theater
              </span>
            </div>
            <div className="p-4 md:p-6 bg-juju-charcoal/30">
              <span className="font-mono text-[10px] tracking-[0.2em] text-juju-signal/60 uppercase">
                JUJU LAB
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="grid grid-cols-2 border-b border-juju-border/50 last:border-b-0 group hover:bg-juju-charcoal/20 transition-colors duration-300">
                <div className="p-4 md:p-6 border-r border-juju-border/50">
                  <p className="text-sm text-juju-gray line-through decoration-juju-danger/30">
                    {row.them}
                  </p>
                </div>
                <div className="p-4 md:p-6">
                  <p className="text-sm text-juju-light">{row.us}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pull quote */}
        <Reveal delay={0.3}>
          <div className="mt-20 max-w-2xl mx-auto text-center">
            <blockquote className="font-serif text-2xl md:text-3xl text-juju-light leading-relaxed italic">
              &ldquo;A system that knows what it knows —
              <br />
              and what it doesn&rsquo;t.&rdquo;
            </blockquote>
            <div className="mt-6 w-12 h-px bg-juju-signal/30 mx-auto" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
