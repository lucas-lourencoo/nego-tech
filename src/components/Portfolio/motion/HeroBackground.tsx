"use client";

import { useEffect, useRef } from "react";
import styles from "../styles.module.css";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const lime = [199, 255, 94] as const;
const violet = [144, 146, 255] as const;

/**
 * Drifting dot field behind the hero. Dots swell along slow sine waves and glow
 * near the pointer. Pauses offscreen / in background tabs and renders a single
 * static frame when the visitor prefers reduced motion.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const prefersReducedMotion = window.matchMedia(reducedMotionQuery).matches;
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let spacing = 28;
    let frame = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      spacing = width < 760 ? 34 : 28;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      context.clearRect(0, 0, width, height);

      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const wave =
            Math.sin(x * 0.012 + t * 0.6) * Math.cos(y * 0.014 - t * 0.4);
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const glow = Math.max(0, 1 - distance / 220);
          const intensity = Math.max(0, (wave + 1) / 2) * 0.55 + glow * 0.9;
          const mix = (Math.sin(x * 0.004 + y * 0.003 + t * 0.2) + 1) / 2;
          const [r, g, b] = lime.map((channel, index) =>
            Math.round(channel * mix + violet[index] * (1 - mix)),
          );

          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.08 + intensity * 0.5})`;
          context.beginPath();
          context.arc(x, y, 0.9 + intensity * 1.6, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (prefersReducedMotion || frame || !isVisible || document.hidden) return;
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const handleVisibility = () => (document.hidden ? stop() : start());

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw(0);
    });

    resize();
    draw(0);
    start();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={styles.heroBackground} aria-hidden="true" />
  );
}
