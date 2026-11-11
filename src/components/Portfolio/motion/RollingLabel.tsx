"use client";

import { TextRoll } from "@/components/ui/skiper-ui/skiper58";

type RollingLabelProps = {
  label: string;
  active: boolean;
};

/** Nav label that rolls letter by letter on hover/focus (Skiper UI skiper58). */
export default function RollingLabel({ label, active }: RollingLabelProps) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        <TextRoll active={active} style={{ lineHeight: 1.25 }}>
          {label}
        </TextRoll>
      </span>
    </>
  );
}
