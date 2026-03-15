"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, FadeRule } from "@/lib/animations";

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.96, 1]);

  return (
    <section id="access" ref={sectionRef} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeRule className="mb-24" />

        <motion.div
          className="max-w-3xl mx-auto text-center"
          style={{ opacity, scale }}
        >
          {/* Diamond mark */}
          <div className="inline-flex items-center justify-center w-12 h-12 mb-12">
            <div className="w-6 h-6 border border-juju-signal/40 rotate-45" />
          </div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-juju-pure leading-[1.05] mb-8">
            Signal intelligence
            <br />
            <span className="text-juju-silver italic">for serious operators.</span>
          </h2>

          <p className="text-lg text-juju-gray leading-relaxed max-w-xl mx-auto mb-6">
            JUJU LAB is not for everyone. It is built for operators who
            value calibration over conviction, who understand that the hardest
            signal to produce is an honest one.
          </p>

          <p className="text-sm text-juju-gray/60 font-mono tracking-wider mb-14">
            Private beta · Limited access · Operator-vetted
          </p>

          {/* CTA */}
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:access@jujulab.io"
                className="group relative px-8 py-4 bg-transparent border border-juju-signal/30 text-juju-signal tracking-wider text-sm hover:border-juju-signal/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(61,214,140,0.08)]"
              >
                <span className="relative z-10">Request Access</span>
                <div className="absolute inset-0 bg-juju-signal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <span className="text-juju-muted text-sm">or</span>
              <a
                href="mailto:hello@jujulab.io"
                className="text-sm text-juju-gray hover:text-juju-light transition-colors duration-300 tracking-wide"
              >
                Contact the team →
              </a>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
