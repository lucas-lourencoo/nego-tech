"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin lime reading-progress bar, adapted from Skiper UI skiper89. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-30 h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
