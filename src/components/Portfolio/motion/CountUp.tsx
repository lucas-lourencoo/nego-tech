"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { useRef } from "react";

type CountUpProps = {
  value: string;
  locale: "en" | "pt";
};

const numberPattern = /^(\d+(?:[.,]\d+)?)([\s\S]*)$/;

/** Counts a metric like "1.3K+ followers" up from zero when it scrolls into view (Skiper UI skiper37 pattern). */
export default function CountUp({ value, locale }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const match = value.match(numberPattern);

  if (!match) return <>{value}</>;

  const [, rawNumber, suffix] = match;
  const target = Number(rawNumber.replace(",", "."));
  const decimals = rawNumber.split(/[.,]/)[1]?.length ?? 0;

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <NumberFlow
        aria-hidden="true"
        value={isInView ? target : 0}
        suffix={suffix}
        locales={locale === "pt" ? "pt-BR" : "en-US"}
        format={{
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }}
      />
    </span>
  );
}
