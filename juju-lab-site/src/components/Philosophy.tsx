"use client";

import { Reveal, FadeRule } from "@/lib/animations";

const principles = [
  {
    number: "I",
    title: "Epistemic Honesty",
    text: "The system labels uncertainty. It does not manufacture conviction. When the signal is thin, it says so.",
  },
  {
    number: "II",
    title: "Calibration Over Certainty",
    text: "Every output is measured against resolved outcomes. Not once — continuously. Accuracy isn't claimed. It's proven.",
  },
  {
    number: "III",
    title: "Signal, Not Theater",
    text: "No decorative confidence scores. No algorithmic hype. Just structured intelligence with visible provenance.",
  },
  {
    number: "IV",
    title: "Structural Caution",
    text: "The system surfaces depth imbalance, conflicted reads, and thin markets — because real operators need to know what can break.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative paper-section paper-texture">
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 py-32 md:py-48">
        <FadeRule className="mb-24" />

        {/* Section header */}
        <div className="max-w-2xl mb-24">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.3em] text-juju-ink-muted uppercase mb-8 block">
              Philosophy &middot; Formulation Notes
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-juju-ink leading-[1.05] font-light mb-8">
              Not prediction theater.
              <br />
              <em className="font-serif text-juju-ink-light">Intelligence discipline.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base text-juju-ink-muted leading-relaxed max-w-lg font-light">
              Most prediction tools sell confidence. We built a system that earns it.
              JUJU LAB exists for operators who understand that honest uncertainty
              is more valuable than manufactured conviction.
            </p>
          </Reveal>
        </div>

        {/* Principles — editorial vertical layout */}
        <div className="max-w-3xl">
          {principles.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.08}>
              <div className="group py-10 border-b border-juju-ink/8 last:border-b-0">
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-display text-lg text-juju-ink-muted/40 min-w-[2rem] text-right">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-juju-ink font-normal mb-3 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-juju-ink-muted leading-relaxed max-w-lg font-light">
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Batch stamp */}
        <Reveal delay={0.4}>
          <div className="mt-20 pt-8 border-t border-juju-ink/6">
            <p className="font-mono text-[9px] tracking-[0.3em] text-juju-ink-muted/40 uppercase">
              Batch No. 001 &middot; Formulated 2024 &middot; Istanbul / Remote
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
