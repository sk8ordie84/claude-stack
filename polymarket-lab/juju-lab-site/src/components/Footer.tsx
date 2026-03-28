"use client";

export default function Footer() {
  return (
    <footer className="border-t border-juju-border/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 border border-juju-signal/20 rotate-45" />
                <span className="font-mono text-[9px] text-juju-signal/60">JL</span>
              </div>
              <span className="font-serif text-lg tracking-wide text-juju-silver">
                JUJU LAB
              </span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-juju-gray">
              v1.9 · SIGNAL INTELLIGENCE
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="#philosophy" className="text-xs text-juju-gray hover:text-juju-light transition-colors duration-300">
              Philosophy
            </a>
            <a href="#product" className="text-xs text-juju-gray hover:text-juju-light transition-colors duration-300">
              System
            </a>
            <a href="#capabilities" className="text-xs text-juju-gray hover:text-juju-light transition-colors duration-300">
              Capabilities
            </a>
            <a href="#evidence" className="text-xs text-juju-gray hover:text-juju-light transition-colors duration-300">
              Evidence
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-juju-muted">
            © 2026 JUJU LAB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
