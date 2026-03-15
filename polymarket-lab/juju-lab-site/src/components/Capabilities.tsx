"use client";

import { Reveal, FadeRule, StaggerContainer, StaggerItem } from "@/lib/animations";

const capabilities = [
  {
    icon: "◆",
    title: "Anomaly Detection",
    description:
      "Surfaces statistical anomalies across prediction markets — price movements, volume spikes, and structural shifts that deviate from baseline behavior.",
  },
  {
    icon: "◇",
    title: "Signal Lifecycle",
    description:
      "Tracks every signal from emergence through confirmation or decay. You see the full trajectory — building, confirmed, conflicted, or dissolved.",
  },
  {
    icon: "▸",
    title: "Operator Framing",
    description:
      "Reframes raw market data into operator-relevant intelligence. Not what the market says — what an operator needs to know.",
  },
  {
    icon: "◌",
    title: "Calibration & Validation",
    description:
      "Continuous measurement against resolved outcomes. The system knows its own accuracy — and shows you where it has been right and wrong.",
  },
  {
    icon: "⬡",
    title: "Multi-Perspective Analysis",
    description:
      "Market-level, event-level, and observation-level views. Zoom between macro structure and micro signal with coherent attribution.",
  },
  {
    icon: "◈",
    title: "Event Graph Intelligence",
    description:
      "Maps relationships between events, clusters correlated predictions, and surfaces hidden dependencies that single-market views miss.",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 md:py-48 bg-juju-charcoal/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 mb-20">
          {/* Left column - header */}
          <div className="lg:col-span-1">
            <Reveal>
              <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">
                Capabilities
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl text-juju-pure leading-[1.1] mb-6">
                What the system sees.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-juju-gray leading-relaxed">
                Six integrated intelligence capabilities.
                Each one validated, each one transparent in its methods.
              </p>
            </Reveal>
          </div>

          {/* Right column - capabilities grid */}
          <div className="lg:col-span-2">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-juju-border" staggerDelay={0.08}>
              {capabilities.map((cap) => (
                <StaggerItem key={cap.title}>
                  <div className="bg-juju-black p-8 md:p-10 h-full group hover:bg-juju-dark/80 transition-colors duration-500">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-juju-signal/40 text-lg font-light mt-0.5 group-hover:text-juju-signal/70 transition-colors duration-500">
                        {cap.icon}
                      </span>
                      <h3 className="font-serif text-xl text-juju-light tracking-tight">
                        {cap.title}
                      </h3>
                    </div>
                    <p className="text-sm text-juju-gray leading-relaxed pl-8">
                      {cap.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Actionable vs Watch separator */}
        <Reveal>
          <div className="mt-16 border border-juju-border bg-juju-dark/30 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-juju-signal" />
                  <span className="font-mono text-xs tracking-[0.2em] text-juju-signal/80">ACTIONABLE</span>
                </div>
                <p className="text-sm text-juju-light leading-relaxed">
                  Confirmed signal with sufficient depth, calibration history,
                  and structural support. The system has earned the right to surface this.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-juju-caution" />
                  <span className="font-mono text-xs tracking-[0.2em] text-juju-caution/80">WATCH</span>
                </div>
                <p className="text-sm text-juju-light leading-relaxed">
                  Signal detected but unconfirmed. The case is building, depth is
                  insufficient, or the read is conflicted. Not silence — structured patience.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
