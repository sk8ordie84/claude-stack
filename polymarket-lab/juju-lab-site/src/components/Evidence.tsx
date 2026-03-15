"use client";

import { Reveal, FadeRule, StaggerContainer, StaggerItem, AnimatedCounter } from "@/lib/animations";

const metrics = [
  {
    label: "Market-Level Reference Metric",
    value: "0.89",
    description:
      "Aggregate calibration score across all monitored prediction markets. Measures alignment between system confidence and actual resolution rates.",
    status: "nominal",
  },
  {
    label: "Calibration Gap",
    value: "+0.034",
    description:
      "Deviation between predicted probability and observed frequency. A positive gap means the system is slightly overconfident — and it tells you so.",
    status: "neutral",
  },
  {
    label: "Depth Imbalance Detection",
    value: "Active",
    description:
      "Identifies markets where liquidity is asymmetric — where surface price doesn't reflect actual depth of conviction on either side.",
    status: "active",
  },
  {
    label: "Signal Classification",
    value: "3-tier",
    description:
      "Every signal is classified as Building, Confirmed, or Dissolved. No ambiguity about where in its lifecycle a signal sits.",
    status: "nominal",
  },
];

const honestyConcepts = [
  {
    term: "Building Case",
    definition: "Signal detected with early structural support. Not yet confirmed — the system is watching, not recommending.",
  },
  {
    term: "Confirmed Signal",
    definition: "Multiple independent clusters agree. Calibration history supports the read. Depth is sufficient for operator consideration.",
  },
  {
    term: "Conflicted Read",
    definition: "The system has detected contradictory signals. Rather than choosing a side, it surfaces the conflict explicitly.",
  },
  {
    term: "Thin Market",
    definition: "Insufficient liquidity or participation to generate reliable signal. The system labels this, rather than guessing through it.",
  },
  {
    term: "Epistemic Label",
    definition: "Every output carries its uncertainty. Not a single confidence number — a structured description of what the system knows and doesn't.",
  },
];

export default function Evidence() {
  return (
    <section id="evidence" className="relative py-32 md:py-48 bg-juju-charcoal/20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />

        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">
              Evidence
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
              Trust is measured.
              <br />
              <span className="text-juju-silver italic">Never assumed.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-juju-gray leading-relaxed max-w-xl">
              Every claim the system makes is validated against resolved outcomes.
              These are not marketing numbers. They are the system&rsquo;s own
              scorecard, always visible, always current.
            </p>
          </Reveal>
        </div>

        {/* Metrics cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-juju-border mb-24" staggerDelay={0.1}>
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="bg-juju-black p-8 md:p-10 h-full group hover:bg-juju-dark/50 transition-colors duration-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-juju-gray uppercase">
                    {metric.label}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      metric.status === "nominal"
                        ? "bg-juju-signal"
                        : metric.status === "active"
                        ? "bg-juju-blue animate-signal-pulse"
                        : "bg-juju-caution"
                    }`}
                  />
                </div>
                <p className="font-mono text-3xl md:text-4xl text-juju-pure mb-4 tracking-tight">
                  {metric.value}
                </p>
                <p className="text-sm text-juju-gray leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats bar */}
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
                <p className="font-mono text-[10px] tracking-wider text-juju-gray uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Epistemic honesty glossary */}
        <div className="max-w-3xl">
          <Reveal>
            <h3 className="font-serif text-2xl md:text-3xl text-juju-light mb-10">
              The language of epistemic honesty
            </h3>
          </Reveal>
          <div className="space-y-1">
            {honestyConcepts.map((concept, i) => (
              <Reveal key={concept.term} delay={i * 0.05}>
                <div className="group flex flex-col md:flex-row md:items-start gap-2 md:gap-8 py-5 border-b border-juju-border/50 hover:border-juju-border transition-colors duration-300">
                  <span className="font-mono text-sm text-juju-signal/60 tracking-wide min-w-[180px] group-hover:text-juju-signal/80 transition-colors duration-300">
                    {concept.term}
                  </span>
                  <p className="text-sm text-juju-gray leading-relaxed">
                    {concept.definition}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
