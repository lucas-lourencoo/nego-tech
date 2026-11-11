"use client";

import { useLenis } from "lenis/react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { finishPreloader, isPreloaderActive } from "./preloaderState";

type Phase = "counting" | "exit" | "done";

const countDuration = 1.6;
const easeInOut = [0.65, 0, 0.35, 1] as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

/** First-visit intro: the <LL/> wordmark, a 000→100 counter, then the curtain lifts. */
export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("counting");
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (value) =>
    String(Math.round(value)).padStart(3, "0"),
  );
  const lineScale = useTransform(progress, [0, 100], [0, 1]);
  const lenis = useLenis();

  useEffect(() => {
    if (!isPreloaderActive()) return;

    const controls = animate(progress, 100, {
      duration: countDuration,
      ease: easeInOut,
      onComplete: () => setPhase("exit"),
    });

    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    if (lenis && isPreloaderActive()) lenis.stop();
  }, [lenis]);

  const handleExitComplete = () => {
    if (phase !== "exit") return;
    finishPreloader();
    lenis?.start();
    setPhase("done");
  };

  if (phase === "done") return null;

  return (
    <motion.div
      className={styles.preloader}
      aria-hidden="true"
      initial={false}
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.85, ease: easeInOut }}
      onAnimationComplete={handleExitComplete}
    >
      <motion.span
        className={styles.preloaderWordmark}
        initial={{ opacity: 0, y: 24 }}
        animate={
          phase === "exit" ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <span>&lt;</span>LL<span>/&gt;</span>
      </motion.span>

      <div className={styles.preloaderFooter}>
        <motion.span className={styles.preloaderCounter}>{counter}</motion.span>
        <span className={styles.preloaderTrack}>
          <motion.span
            className={styles.preloaderLine}
            style={{ scaleX: lineScale }}
          />
        </span>
      </div>
    </motion.div>
  );
}
