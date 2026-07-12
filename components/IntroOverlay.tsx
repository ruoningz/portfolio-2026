"use client";

import { useState, useEffect } from "react";

let hasShownIntro = false;

export default function IntroOverlay() {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    if (hasShownIntro) { setFaded(true); return; }
    hasShownIntro = true;
    const id = setTimeout(() => setFaded(true), 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9999,
        background:    "#0a0a0a",
        opacity:       faded ? 0 : 1,
        transition:    "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: faded ? "none" : "all",
      }}
    />
  );
}
