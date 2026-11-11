"use client";

import type { PointerEvent, ReactNode } from "react";

type SpotlightCardProps = {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
};

const maxTilt = 4;

/** External project card with a pointer-tracked glow and a subtle 3D tilt. */
export default function SpotlightCard({
  href,
  className,
  ariaLabel,
  children,
}: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--spot-x", `${x * 100}%`);
    card.style.setProperty("--spot-y", `${y * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - y) * maxTilt * 2}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * maxTilt * 2}deg`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </a>
  );
}
