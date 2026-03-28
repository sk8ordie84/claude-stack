"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/lib/animations";

function WorkspacePanel() {
  return (
    <div className="border border-juju-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] text-juju-silver tracking-[0.2em] uppercase">Workspace</span>
        <span className="font-mono text-[9px] text-juju-gray">12 Active Events</span>
      </div>
      <div className="space-y-2">
        {[
          { label: "US Election 2026 · Senate", status: "BUILDING", color: "text-juju-caution" },
          { label: "Fed Rate Decision · June", status: "CONFIRMED", color: "text-juju-signal" },
          { label: "UK PM Approval · Q2", status: "WATCH", color: "text-juju-gray" },
          { label: "BTC > 120k · Dec 2026", status: "THIN", color: "text-juju-danger" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3 px-4 border-b border-juju-border/40 last:border-b-0">
            <span className="text-sm text-juju-light font-light">{item.label}</span>
            <span className={`font-mono text-[9px] tracking-[0.15em] ${item.color}`}>
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
    <div className="border border-juju-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] text-juju-silver tracking-[0.2em] uppercase">Daily Action Board</span>
        <span className="font-mono text-[9px] text-juju-gray">15 Mar 2026</span>
      </div>
      <div className="space-y-5">
        <div className="border-l border-juju-signal/40 pl-4">
          <p className="font-mono text-[9px] text-juju-signal/70 tracking-[0.15em] mb-1.5">ACTIONABLE</p>
          <p className="text-sm text-juju-light font-light">Fed Rate — 78% hold probability confirmed by 3 independent clusters</p>
          <p className="font-mono text-[9px] text-juju-gray mt-1.5">Depth: strong · Calibration: 0.91 · Signal age: 14d</p>
        </div>
        <div className="border-l border-juju-caution/40 pl-4">
          <p className="font-mono text-[9px] text-juju-caution/70 tracking-[0.15em] mb-1.5">WATCH</p>
          <p className="text-sm text-juju-light font-light">Senate Control — case building, insufficient depth</p>
          <p className="font-mono text-[9px] text-juju-gray mt-1.5">Depth: moderate · Calibration: 0.67 · Conflicted</p>
        </div>
        <div className="border-l border-juju-muted pl-4">
          <p className="font-mono text-[9px] text-juju-gray tracking-[0.15em] mb-1.5">THIN SIGNAL</p>
          <p className="text-sm text-juju-gray font-light">BTC target — low liquidity, no structural confirmation</p>
          <p className="font-mono text-[9px] text-juju-muted mt-1.5">Depth: thin · No reference metric</p>
        </div>
      </div>
    </div>
  );
}

function EventGraphPanel() {
  return (
    <div className="border border-juju-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] text-juju-silver tracking-[0.2em] uppercase">Event Graph</span>
        <span className="font-mono text-[9px] text-juju-gray">30d Window</span>
      </div>
      <div className="relative h-36 flex items-end gap-[3px]">
        {[35, 42, 38, 55, 62, 58, 70, 68, 74, 78, 72, 76, 80, 78, 82, 79, 84, 80, 85, 83].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-juju-signal/10 hover:bg-juju-signal/20 transition-colors duration-300 relative"
            style={{ height: `${h}%` }}
          >
            {i === 19 && (
              <div className="absolute -top-5 right-0 font-mono text-[9px] text-juju-signal">
                84.2%
              </div>
            )}
          </div>
        ))}
        <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-juju-muted/40">
          <span className="absolute -top-3 right-0 font-mono text-[8px] text-juju-gray">REF 0.82</span>
        </div>
      </div>
      <div className="flex justify-between mt-3 font-mono text-[8px] text-juju-gray">
        <span>30d ago</span>
        <span>current</span>
      </div>
    </div>
  );
}

function ValidationPanel() {
  return (
    <div className="border border-juju-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] text-juju-silver tracking-[0.2em] uppercase">Validation</span>
        <span className="font-mono text-[9px] text-juju-gray">847 Resolved</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "Calibration", value: "0.89", color: "text-juju-signal" },
          { label: "Resolution", value: "94%", color: "text-juju-signal" },
          { label: "Cal. Gap", value: "+0.03", color: "text-juju-light" },
          { label: "False Rate", value: "6.2%", color: "text-juju-caution" },
        ].map((m) => (
          <div key={m.label} className="py-3 border-b border-juju-border/30">
            <p className="font-mono text-[9px] text-juju-gray tracking-wider mb-2">{m.label}</p>
            <p className={`font-mono text-xl font-light ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="font-mono text-[8px] text-juju-gray/50 pt-2">
        Last validation: 14 Mar 2026 · 23:41 UTC
      </div>
    </div>
  );
}

const panels = [
  {
    id: "workspace",
    formulation: "Formulation No. 01",
    title: "Workspace",
    subtitle: "Unified event monitoring across prediction markets.",
    Component: WorkspacePanel,
  },
  {
    id: "action-board",
    formulation: "Formulation No. 02",
    title: "Daily Action Board",
    subtitle: "Triaged signals — actionable, watch, or thin.",
    Component: ActionBoardPanel,
  },
  {
    id: "event-graph",
    formulation: "Formulation No. 03",
    title: "Event Graph",
    subtitle: "Lifecycle tracking with reference calibration.",
    Component: EventGraphPanel,
  },
  {
    id: "validation",
    formulation: "Formulation No. 04",
    title: "Validation Layer",
    subtitle: "Continuous accuracy measurement against resolved outcomes.",
    Component: ValidationPanel,
  },
];

export default function ProductShowcase() {
  return (
    <section id="product" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section header */}
        <div className="max-w-2xl mb-28">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.3em] text-juju-gray uppercase mb-8 block">
              The System &middot; Four Surfaces
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] font-light mb-8">
              Feel the system
              <br />
              <em className="font-serif text-juju-silver">before you read it.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-juju-gray leading-relaxed max-w-lg font-light">
              Four integrated surfaces. One coherent intelligence layer.
              Each view earns its place by serving a distinct operator need.
            </p>
          </Reveal>
        </div>

        {/* Product panels */}
        <StaggerContainer className="space-y-20 md:space-y-28" staggerDelay={0.12}>
          {panels.map((panel) => (
            <StaggerItem key={panel.id}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                {/* Panel info */}
                <div className="lg:col-span-2 pt-2">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-juju-signal/50 uppercase block mb-4">
                    {panel.formulation}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-juju-light font-normal mb-3 tracking-tight">
                    {panel.title}
                  </h3>
                  <p className="text-sm text-juju-gray leading-relaxed font-light">
                    {panel.subtitle}
                  </p>
                </div>
                {/* Panel mock */}
                <div className="lg:col-span-3">
                  <panel.Component />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
