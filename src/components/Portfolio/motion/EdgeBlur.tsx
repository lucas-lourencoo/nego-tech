"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41";

/** Progressive blur on the bottom viewport edge (Skiper UI skiper41); fades out at page end so the footer stays sharp. */
export default function EdgeBlur() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-24"
      style={{ opacity }}
    >
      <ProgressiveBlur
        position="bottom"
        backgroundColor="rgba(11, 11, 13, 0.72)"
        height="96px"
        blurAmount="4px"
      />
    </motion.div>
  );
}
