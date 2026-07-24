"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

const finePointerQuery = "(hover: hover) and (pointer: fine)";
const interactiveSelector =
  'a, button, [role="button"], input, textarea, select';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor || !window.matchMedia(finePointerQuery).matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.classList.add(styles.customCursorVisible);
      cursor.classList.toggle(
        styles.customCursorInteractive,
        Boolean(target?.closest(interactiveSelector)),
      );
    };

    const handlePointerLeave = () => {
      cursor.classList.remove(styles.customCursorVisible);
      cursor.classList.remove(styles.customCursorInteractive);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <span
      ref={cursorRef}
      className={styles.customCursor}
      aria-hidden="true"
    />
  );
}
