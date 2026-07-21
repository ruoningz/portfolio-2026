"use client";

import { useEffect } from "react";

export default function IntroOverlay() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.setAttribute("data-loaded", "1");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
