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

        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">
              Philosophy
            </span>
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

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-juju-border">
          {principles.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.1}>
              <div className="bg-juju-black p-8 md:p-12 group hover:bg-juju-charcoal/50 transition-colors duration-500">
                <span className="font-mono text-xs text-juju-signal/50 tracking-widest mb-4 block">
                  {p.number}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-juju-light mb-4 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-juju-gray leading-relaxed">
                  {p.text}
                </p>
                <div className="mt-6 w-8 h-px bg-juju-border group-hover:w-16 group-hover:bg-juju-signal/30 transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
