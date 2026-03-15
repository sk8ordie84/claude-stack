"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "System", href: "#product" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Evidence", href: "#evidence" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
      style={{
        backgroundColor: `rgba(8, 9, 12, ${bgOpacity})`,
        backdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-juju-border"
        style={{ opacity: borderOpacity }}
      />
      <div className="mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 border border-juju-signal/30 rotate-45 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-juju-signal/60" />
            <span className="font-mono text-xs text-juju-signal font-medium tracking-wider">
              JL
            </span>
          </div>
          <span className="font-serif text-lg tracking-wide text-juju-light hidden sm:block">
            JUJU LAB
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-juju-gray hover:text-juju-light transition-colors duration-300 tracking-wide font-light"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#access"
          className="text-sm tracking-wider text-juju-signal/80 hover:text-juju-signal border border-juju-signal/20 hover:border-juju-signal/40 px-5 py-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(61,214,140,0.08)]"
        >
          Request Access
        </a>
      </div>
    </motion.nav>
  );
}
