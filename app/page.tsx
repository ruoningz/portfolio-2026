"use client";


import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });
import BrandSection from "@/components/BrandSection";
import MarketingSection from "@/components/MarketingSection";
import WebSection from "@/components/WebSection";
import Starfield from "@/components/Starfield";
import { transitionRef } from "@/lib/transition";

function easeIO(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Home() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let current   = 0;
    let animating = false;
    let rafId     = 0;
    let lastSnap  = 0; // timestamp of last section snap

    function goTo(next: number) {
      const MAX = 4;
      if (animating || next < 0 || next > MAX) return;

      animating = true;
      cancelAnimationFrame(rafId);

      const fromProgress = transitionRef.progress;
      const toProgress   = next;
      const startY       = window.scrollY;
      const targetY      = next * window.innerHeight;
      const duration     = 1350;
      const t0           = performance.now();

      function tick(now: number) {
        const t  = Math.min((now - t0) / duration, 1);
        const et = easeIO(t);

        window.scrollTo(0, startY + (targetY - startY) * et);
        // Use raw t (not eased) so BackgroundReveal circle expands immediately on scroll
        transitionRef.progress = fromProgress + (toProgress - fromProgress) * t;
        transitionRef.scrollY  = window.scrollY;

        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, targetY);
          transitionRef.progress = toProgress;
          transitionRef.scrollY  = targetY;
          current   = next;
          animating = false;
          lastSnap  = performance.now();
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    const onWheel = (e: WheelEvent) => {
      if (animating) { e.preventDefault(); return; }

      // Ignore trackpad inertia tail within 700ms of last snap
      if (performance.now() - lastSnap < 700) { e.preventDefault(); return; }

      const goingDown = e.deltaY > 20;
      const goingUp   = e.deltaY < -20;

      // After section 4, let native scroll continue downward
      if (goingDown && current >= 4) return;
      // Before first section, let native scroll go naturally
      if (goingUp && current <= 0) return;

      // Section 4: allow free upward scroll; only snap once past a threshold
      if (goingUp && current === 4) {
        if (window.scrollY > 4 * window.innerHeight - window.innerHeight * 0.25) return;
        e.preventDefault();
        goTo(3);
        return;
      }

      e.preventDefault();
      goTo(current + (goingDown ? 1 : -1));
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (animating) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const goingDown = dy > 0;
      if (goingDown && current >= 4) return;
      if (!goingDown && current <= 0) return;
      goTo(current + (goingDown ? 1 : -1));
    };

    // Keyboard navigation
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (current >= 4) return;
        e.preventDefault(); goTo(current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (current <= 0) return;
        e.preventDefault(); goTo(current - 1);
      }
    };

    // Keep current in sync when user scrolls in footer area
    const onScroll = () => {
      if (animating) return;
      const s = Math.min(4, Math.max(0, Math.round(window.scrollY / window.innerHeight)));
      if (s !== current) {
        current = s;
        transitionRef.progress = s;
        transitionRef.scrollY  = window.scrollY;
      }
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true  });
    window.addEventListener("keydown",    onKey);
    window.addEventListener("scroll",     onScroll,     { passive: true  });

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("keydown",    onKey);
      window.removeEventListener("scroll",     onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main>
      <HeroScene />
      <MarketingSection />
      <BrandSection />
      <WebSection />

      {/* View all work */}
      <section style={{
        position:       "relative",
        zIndex:         10,
        background:     "#F7F7F7",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "10rem 1rem",
      }}>
        <Starfield count={85} />
        <h2 style={{
          position:     "relative",
          fontFamily:   "var(--font-poppins), system-ui, sans-serif",
          fontSize:     "clamp(1.6rem, 2.4vw, 2.4rem)",
          fontWeight:   300,
          lineHeight:   1.25,
          color:        "#333333",
          textAlign:    "center",
          marginBottom: "1.4rem",
          maxWidth:     "560px",
        }}>
          Interested in the systems behind the visuals?
        </h2>
        <p style={{
          position:      "relative",
          fontFamily:    "var(--font-poppins), system-ui, sans-serif",
          fontSize:      "0.82rem",
          fontWeight:    300,
          color:         "#8C8680",
          letterSpacing: "0.02em",
          textAlign:     "center",
          marginBottom:  "3rem",
          maxWidth:      "480px",
          lineHeight:    1.8,
        }}>
          Explore all projects in greater detail through selected case studies across branding, campaigns, UX/UI, and digital experiences.
        </p>
        <Link
          ref={btnRef}
          href="/work"
          data-cursor-invert
          style={{
            fontFamily:    "var(--font-poppins), system-ui, sans-serif",
            fontSize:      "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            position:      "relative",
            color:         "#ffffff",
            background:    "#000fff",
            padding:       "1rem 2.4rem",
            textDecoration:"none",
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "0.75rem",
            transition:    "transform 0.15s ease",
            transformStyle:"preserve-3d",
          }}
          onMouseMove={(e) => {
            const el = btnRef.current;
            if (!el) return;
            const r  = el.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
            const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
            el.style.transform = `perspective(500px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg)`;
          }}
          onMouseLeave={() => {
            if (btnRef.current) btnRef.current.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
          }}
        >
          <span>View Projects</span>
          <span>→</span>
        </Link>
      </section>
    </main>
  );
}
