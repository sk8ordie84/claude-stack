"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeRule } from "@/lib/animations";

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section id="access" ref={sectionRef} className="relative py-40 md:py-56">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <FadeRule className="mb-28" />

        <motion.div
          className="max-w-2xl mx-auto text-center"
          style={{ opacity }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] font-light mb-8">
            Signal intelligence
            <br />
            <em className="font-serif text-juju-silver">for serious operators.</em>
          </h2>

          <p className="text-base text-juju-gray leading-relaxed max-w-md mx-auto mb-8 font-light">
            Built for operators who value calibration over conviction,
            who understand that the hardest signal to produce is an honest one.
          </p>

          <p className="font-mono text-[9px] tracking-[0.25em] text-juju-muted uppercase mb-16">
            Private Beta &middot; Limited Access &middot; Operator-Vetted
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:access@jujulab.io"
              className="text-[12px] tracking-[0.2em] uppercase text-juju-pure border-b border-juju-silver/30 pb-1.5 hover:border-juju-pure transition-colors duration-500"
            >
              Request Access
            </a>
            <span className="text-juju-muted text-sm font-light hidden sm:block">/</span>
            <a
              href="mailto:hello@jujulab.io"
              className="text-[12px] text-juju-gray hover:text-juju-light transition-colors duration-500 tracking-wide font-light"
            >
              Contact the team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
