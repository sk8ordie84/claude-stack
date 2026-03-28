"use client";

export default function Footer() {
  return (
    <footer className="border-t border-juju-border/40 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-display text-base tracking-[0.2em] text-juju-silver font-light uppercase">
              JUJU LAB
            </span>
            <p className="font-mono text-[8px] tracking-[0.2em] text-juju-muted mt-1.5">
              Est. 2024 &middot; Signal Intelligence House
            </p>
          </div>

          <div className="flex items-center gap-8">
            {[
              ["Philosophy", "#philosophy"],
              ["System", "#product"],
              ["Index", "#capabilities"],
              ["Evidence", "#evidence"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[11px] text-juju-gray hover:text-juju-light transition-colors duration-500 font-light"
              >
                {label}
              </a>
            ))}
          </div>

          <p className="font-mono text-[9px] text-juju-muted tracking-wider">
            &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
