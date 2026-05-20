"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function LenisScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Homepage uses its own custom snap-scroll — Lenis conflicts with it
    if (pathname === "/") return;

    const lenis = new Lenis({
      duration:  1.3,
      easing:    (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
