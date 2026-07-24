"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type TypingNameProps = {
  text: string;
};

type TypingFrame = {
  value: string;
  delay: number;
};

const typingInterval = 100;
const correctionInterval = 180;

function buildTypingFrames(text: string): TypingFrame[] {
  const characters = Array.from(text);
  const cedillaIndex = characters.indexOf("ç");

  if (cedillaIndex === -1) {
    return characters.map((_, index) => ({
      value: characters.slice(0, index + 1).join(""),
      delay: typingInterval,
    }));
  }

  const beforeCedilla = characters.slice(0, cedillaIndex).join("");
  const frames = characters.slice(0, cedillaIndex).map((_, index) => ({
    value: characters.slice(0, index + 1).join(""),
    delay: typingInterval,
  }));

  frames.push(
    { value: `${beforeCedilla}c`, delay: 400 },
    { value: beforeCedilla, delay: 220 },
    { value: `${beforeCedilla}ç`, delay: correctionInterval },
  );

  for (let index = cedillaIndex + 1; index < characters.length; index += 1) {
    frames.push({
      value: characters.slice(0, index + 1).join(""),
      delay: typingInterval,
    });
  }

  return frames;
}

export default function TypingName({ text }: TypingNameProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeout = window.setTimeout(() => setDisplayedText(text), 0);
      return () => window.clearTimeout(timeout);
    }

    const frames = buildTypingFrames(text);
    let frameIndex = 0;
    let timeout: number;

    const advance = () => {
      const frame = frames[frameIndex];
      setDisplayedText(frame.value);
      frameIndex += 1;

      if (frameIndex < frames.length) {
        timeout = window.setTimeout(advance, frame.delay);
      }
    };

    timeout = window.setTimeout(advance, typingInterval);
    return () => window.clearTimeout(timeout);
  }, [text]);

  const isComplete = displayedText === text;

  return (
    <span className={styles.typingName} aria-label={text}>
      <span className={styles.typingNameText} aria-hidden="true">
        {displayedText}
      </span>
      <span
        className={`${styles.typingCaret} ${
          isComplete ? styles.typingCaretBlink : ""
        }`}
        aria-hidden="true"
      />
    </span>
  );
}
