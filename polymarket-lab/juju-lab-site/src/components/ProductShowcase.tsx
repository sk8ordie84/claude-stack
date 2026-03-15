"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/lib/animations";

/* ── Mock UI Panels ── */
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
          { label: "US Election 2026 · Senate", status: "BUILDING", color: "bg-juju-caution" },
          { label: "Fed Rate Decision · June", status: "CONFIRMED", color: "bg-juju-signal" },
          { label: "UK PM Approval · Q2", status: "WATCH", color: "bg-juju-gray" },
          { label: "BTC > 120k · Dec 2026", status: "THIN", color: "bg-juju-danger/60" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3 px-4 bg-juju-dark/50 border border-juju-border/50">
            <span className="text-sm text-juju-light">{item.label}</span>
            <span className={`font-mono text-[10px] tracking-wider px-2 py-0.5 ${item.color}/10 border border-current`}>
              <span className={`inline-block w-1.5 h-1.5 ${item.color} rounded-full mr-1.5`} />
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
      {/* Simplified graph visualization */}
      <div className="relative h-40 flex items-end gap-1">
        {[35, 42, 38, 55, 62, 58, 70, 68, 74, 78, 72, 76, 80, 78, 82, 79, 84, 80, 85, 83].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-juju-signal/15 hover:bg-juju-signal/30 transition-colors duration-200 relative group"
            style={{ height: `${h}%` }}
          >
            {i === 19 && (
              <div className="absolute -top-6 right-0 font-mono text-[10px] text-juju-signal">
                84.2%
              </div>
            )}
          </div>
        ))}
        {/* Reference line */}
        <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-juju-gray/20">
          <span className="absolute -top-3 right-0 font-mono text-[9px] text-juju-gray">REF: 0.82</span>
        </div>
      </div>
      <div className="flex justify-between mt-3 font-mono text-[9px] text-juju-gray">
        <span>30d ago</span>
        <span>current</span>
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
          { label: "Calibration Score", value: "0.89", status: "good" },
          { label: "Resolution Rate", value: "94%", status: "good" },
          { label: "Calibration Gap", value: "+0.03", status: "neutral" },
          { label: "False Signals", value: "6.2%", status: "caution" },
        ].map((m) => (
          <div key={m.label} className="bg-juju-dark/50 p-3 border border-juju-border/30">
            <p className="font-mono text-[10px] text-juju-gray tracking-wider mb-2">{m.label}</p>
            <p className={`font-mono text-xl ${m.status === "good" ? "text-juju-signal" : m.status === "caution" ? "text-juju-caution" : "text-juju-light"}`}>
              {m.value}
            </p>
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
  {
    id: "workspace",
    title: "Workspace",
    subtitle: "Unified event monitoring across prediction markets",
    Component: WorkspacePanel,
  },
  {
    id: "action-board",
    title: "Daily Action Board",
    subtitle: "Triaged signals: actionable, watch, or thin",
    Component: ActionBoardPanel,
  },
  {
    id: "event-graph",
    title: "Event Graph",
    subtitle: "Lifecycle tracking with reference calibration",
    Component: EventGraphPanel,
  },
  {
    id: "validation",
    title: "Validation Layer",
    subtitle: "Continuous accuracy measurement against resolved outcomes",
    Component: ValidationPanel,
  },
];

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="product" ref={containerRef} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-24">
          <Reveal>
            <span className="text-xs font-mono tracking-[0.3em] text-juju-signal/70 uppercase mb-6 block">
              The System
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
              Feel the system
              <br />
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

        {/* Product panels */}
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-juju-border hidden md:block">
            <motion.div
              className="w-full bg-juju-signal/30 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <StaggerContainer className="space-y-16 md:space-y-24 md:pl-20" staggerDelay={0.15}>
            {panels.map((panel) => (
              <StaggerItem key={panel.id}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  {/* Panel info */}
                  <div className="lg:col-span-2 pt-4">
                    <h3 className="font-serif text-2xl md:text-3xl text-juju-light mb-3">
                      {panel.title}
                    </h3>
                    <p className="text-sm text-juju-gray leading-relaxed">
                      {panel.subtitle}
                    </p>
                  </div>
                  {/* Panel mock */}
                  <div className="lg:col-span-3">
                    <div className="glow-signal">
                      <panel.Component />
                    </div>
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
