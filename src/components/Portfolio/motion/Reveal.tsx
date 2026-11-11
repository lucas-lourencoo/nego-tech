"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const elements = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  header: motion.header,
  section: motion.section,
};

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof elements;
  className?: string;
  delay?: number;
};

/** Fades and lifts content in once it enters the viewport. */
export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
}: RevealProps) {
  const Element = elements[as];

  return (
    <Element
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Element>
  );
}
