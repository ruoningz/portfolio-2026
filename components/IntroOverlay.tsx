"use client";

import { useState, useEffect } from "react";

let hasShownIntro = false;

export default function IntroOverlay() {
  // Start invisible in SSR — only mount the overlay client-side
  const [mounted, setMounted] = useState(false);
  const [faded,   setFaded]   = useState(false);

  useEffect(() => {
    setMounted(true);
    if (hasShownIntro) { setFaded(true); return; }
    hasShownIntro = true;
    // One frame to paint black, then fade out
    const id = requestAnimationFrame(() => setFaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9999,
        background: "#0a0a0a",
        opacity:    faded ? 0 : 1,
        transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "none",
      }}
    />
  );
}
