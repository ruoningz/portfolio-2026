"use client";

import { useEffect, useRef } from "react";
import { transitionRef } from "@/lib/transition";

// Sections alternate: Hero=light, Brand=dark, Marketing=light, Web=dark
// Light = 247 (#F7F7F7), Dark = 17 (#111111)

export default function BackgroundReveal() {
  const bgRef  = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const rawP     = Math.max(0, Math.min(3, transitionRef.progress));
      const phaseIdx = Math.min(2, Math.floor(rawP));
      const progress = rawP - phaseIdx;

      // Even phases: light → dark. Odd phases: dark → light.
      const fromV = phaseIdx % 2 === 0 ? 247 : 17;
      const toV   = phaseIdx % 2 === 0 ? 17  : 247;
      const v     = Math.round(fromV + (toV - fromV) * progress);

      if (bgRef.current) bgRef.current.style.background = `rgb(${v},${v},${v})`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        1,
        background:    "#F7F7F7",
        pointerEvents: "none",
      }}
    />
  );
}
