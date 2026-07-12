"use client";

import { useEffect } from "react";

let hasShownIntro = false;

export default function IntroOverlay() {
  useEffect(() => {
    const el = document.getElementById("intro-overlay");
    if (!el) return;

    if (hasShownIntro) {
      // Subsequent client-side navigation — remove immediately
      el.remove();
      return;
    }

    hasShownIntro = true;

    // Wait 500ms then fade out over 1.2s
    const fadeId = setTimeout(() => {
      el.style.transition = "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      const removeId = setTimeout(() => el.remove(), 1200);
      return () => clearTimeout(removeId);
    }, 500);

    return () => clearTimeout(fadeId);
  }, []);

  return null;
}
