"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "System", href: "#product" },
  { label: "Index", href: "#capabilities" },
  { label: "Evidence", href: "#evidence" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.97]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
      style={{
        backgroundColor: `rgba(11, 11, 9, ${bgOpacity})`,
        backdropFilter: "blur(16px)",
      }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-juju-border"
        style={{ opacity: borderOpacity }}
      />
      <div className="mx-auto max-w-6xl flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <a href="#" className="group">
          <span className="font-display text-lg md:text-xl tracking-[0.25em] text-juju-pure font-light uppercase">
            JUJU LAB
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-juju-gray hover:text-juju-light transition-colors duration-500 tracking-wide font-light"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#access"
          className="text-[11px] tracking-[0.2em] uppercase text-juju-silver hover:text-juju-pure border-b border-juju-muted hover:border-juju-silver pb-1 transition-all duration-500"
        >
          Request Access
        </a>
      </div>
    </motion.nav>
  );
}
