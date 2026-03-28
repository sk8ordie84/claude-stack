"use client";

import { Reveal, FadeRule, StaggerContainer, StaggerItem, AnimatedCounter } from "@/lib/animations";

const metrics = [
  {
    label: "Market-Level Reference Metric",
    value: "0.89",
    description:
      "Aggregate calibration score across all monitored prediction markets.",
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
      "Identifies markets where liquidity is asymmetric — where surface price doesn't reflect actual depth.",
    status: "active",
  },
  {
    label: "Signal Classification",
    value: "3-tier",
    description:
      "Every signal is classified as Building, Confirmed, or Dissolved. No ambiguity.",
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
    <section id="evidence" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <FadeRule className="mb-24" />

        {/* Lab report header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.3em] text-juju-gray uppercase mb-8 block">
                Evidence &middot; Lab Report
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] font-light mb-8">
                Trust is measured.
                <br />
                <em className="font-serif text-juju-silver">Never assumed.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-juju-gray leading-relaxed max-w-lg font-light">
                Every claim the system makes is validated against resolved outcomes.
                These are the system&rsquo;s own scorecard — always visible, always current.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="font-mono text-[9px] tracking-[0.2em] text-juju-muted text-right leading-relaxed">
              <p>Report Date: 15 Mar 2026</p>
              <p>Specimen: Market Signal Validation</p>
              <p>Batch: 2024-001 → Current</p>
            </div>
          </Reveal>
        </div>

        {/* Metrics */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 mb-24 max-w-4xl" staggerDelay={0.08}>
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="py-8 border-b border-juju-border/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-juju-gray uppercase">
                    {metric.label}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      metric.status === "nominal"
                        ? "bg-juju-signal/60"
                        : metric.status === "active"
                        ? "bg-juju-signal/60"
                        : "bg-juju-caution/60"
                    }`}
                  />
                </div>
                <p className="font-mono text-3xl text-juju-pure mb-3 font-light tracking-tight">
                  {metric.value}
                </p>
                <p className="text-sm text-juju-gray leading-relaxed font-light">
                  {metric.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24 max-w-4xl">
            {[
              { value: 847, suffix: "", label: "Resolved Outcomes" },
              { value: 94, suffix: "%", label: "Resolution Coverage" },
              { value: 23, suffix: "", label: "Active Clusters" },
              { value: 6, suffix: ".2%", label: "False Signal Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl text-juju-pure font-light mb-1.5">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-mono text-[9px] tracking-[0.15em] text-juju-gray uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Epistemic honesty glossary */}
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-[9px] tracking-[0.25em] text-juju-gray uppercase mb-10">
              Lexicon &middot; The Language of Epistemic Honesty
            </p>
          </Reveal>
          {honestyConcepts.map((concept, i) => (
            <Reveal key={concept.term} delay={i * 0.04}>
              <div className="group flex flex-col md:flex-row md:items-start gap-2 md:gap-10 py-5 border-b border-juju-border/40 hover:border-juju-border/70 transition-colors duration-500">
                <span className="font-mono text-[11px] text-juju-signal/50 tracking-wide min-w-[160px] group-hover:text-juju-signal/70 transition-colors duration-500">
                  {concept.term}
                </span>
                <p className="text-sm text-juju-gray leading-relaxed font-light">
                  {concept.definition}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
