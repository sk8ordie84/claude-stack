"use client";

import { Reveal, FadeRule, StaggerContainer, StaggerItem } from "@/lib/animations";

const capabilities = [
  {
    index: "01",
    title: "Anomaly Detection",
    description:
      "Surfaces statistical anomalies across prediction markets — price movements, volume spikes, and structural shifts that deviate from baseline behavior.",
  },
  {
    index: "02",
    title: "Signal Lifecycle",
    description:
      "Tracks every signal from emergence through confirmation or decay. You see the full trajectory — building, confirmed, conflicted, or dissolved.",
  },
  {
    index: "03",
    title: "Operator Framing",
    description:
      "Reframes raw market data into operator-relevant intelligence. Not what the market says — what an operator needs to know.",
  },
  {
    index: "04",
    title: "Calibration & Validation",
    description:
      "Continuous measurement against resolved outcomes. The system knows its own accuracy — and shows you where it has been right and wrong.",
  },
  {
    index: "05",
    title: "Multi-Perspective Analysis",
    description:
      "Market-level, event-level, and observation-level views. Zoom between macro structure and micro signal with coherent attribution.",
  },
  {
    index: "06",
    title: "Event Graph Intelligence",
    description:
      "Maps relationships between events, clusters correlated predictions, and surfaces hidden dependencies that single-market views miss.",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <FadeRule className="mb-24" />

        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.3em] text-juju-gray uppercase mb-8 block">
              Capabilities Index
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-juju-pure leading-[1.1] font-light mb-6">
              What the system sees.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm text-juju-gray leading-relaxed font-light">
              Six integrated intelligence capabilities.
              Each one validated, each one transparent in its methods.
            </p>
          </Reveal>
        </div>

        {/* Index list */}
        <StaggerContainer className="max-w-4xl" staggerDelay={0.06}>
          {capabilities.map((cap) => (
            <StaggerItem key={cap.index}>
              <div className="group grid grid-cols-[3rem_1fr] md:grid-cols-[3rem_200px_1fr] gap-4 py-7 border-b border-juju-border/60 hover:border-juju-border transition-colors duration-500">
                <span className="font-mono text-[10px] text-juju-muted tracking-wider pt-1">
                  {cap.index}
                </span>
                <h3 className="font-display text-xl text-juju-light font-normal tracking-tight group-hover:text-juju-pure transition-colors duration-500">
                  {cap.title}
                </h3>
                <p className="text-sm text-juju-gray leading-relaxed font-light col-start-2 md:col-start-3">
                  {cap.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Signal classification key */}
        <Reveal>
          <div className="mt-20 max-w-4xl">
            <p className="font-mono text-[9px] tracking-[0.25em] text-juju-gray uppercase mb-8">
              Signal Classification Key
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-start gap-4">
                <div className="w-1 h-full min-h-[3rem] bg-juju-signal/40 mt-1 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-juju-signal/70 uppercase block mb-2">Actionable</span>
                  <p className="text-sm text-juju-light leading-relaxed font-light">
                    Confirmed signal with sufficient depth, calibration history,
                    and structural support.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-full min-h-[3rem] bg-juju-caution/40 mt-1 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-juju-caution/70 uppercase block mb-2">Watch</span>
                  <p className="text-sm text-juju-light leading-relaxed font-light">
                    Signal detected but unconfirmed. The case is building,
                    depth is insufficient, or the read is conflicted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
