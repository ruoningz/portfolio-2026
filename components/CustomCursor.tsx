"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type CursorState = "default" | "clickable" | "text";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(window.matchMedia("(hover: none)").matches);
  }, []);

  const dotRef    = useRef<HTMLDivElement>(null);
  const ballRef   = useRef<HTMLDivElement>(null);
  const badgeRef  = useRef<HTMLDivElement>(null);
  const badgeText = useRef<HTMLSpanElement>(null);
  const ibeamRef  = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ x: -300, y: -300 });
  const ballPos = useRef({ x: -300, y: -300 });
  const state   = useRef<CursorState>("default");
  const raf     = useRef(0);
  const pathname = usePathname();

  useEffect(() => { state.current = "default"; }, [pathname]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!el) { state.current = "default"; return; }
      if (el.closest('input, textarea, [contenteditable="true"]')) {
        state.current = "text";
      } else if (el.closest("a, button, [role='button']")) {
        state.current = "clickable";
        const soundEl   = el.closest("[data-cursor-mute]")  as HTMLElement | null;
        const labelEl   = el.closest("[data-cursor-label]") as HTMLElement | null;
        const anchor    = el.closest("a") as HTMLAnchorElement | null;
        const isProject = anchor && /^\/work\/.+/.test(anchor.pathname);
        if (badgeText.current) {
          if (soundEl) {
            badgeText.current.textContent = soundEl.dataset.cursorMute  ?? "mute";
          } else if (labelEl) {
            badgeText.current.textContent = labelEl.dataset.cursorLabel ?? "Go";
          } else {
            badgeText.current.textContent = isProject ? "View" : "Go";
          }
        }
      } else {
        state.current = "default";
      }
    };

    const animate = () => {
      const { x: mx, y: my } = mouse.current;
      ballPos.current.x += (mx - ballPos.current.x) * 0.08;
      ballPos.current.y += (my - ballPos.current.y) * 0.08;

      const dot   = dotRef.current;
      const ball  = ballRef.current;
      const badge = badgeRef.current;
      const ibeam = ibeamRef.current;
      if (!dot || !ball || !badge || !ibeam) {
        raf.current = requestAnimationFrame(animate);
        return;
      }

      if ((window as any).__customCursorHidden) {
        dot.style.opacity = ball.style.opacity =
          badge.style.opacity = ibeam.style.opacity = "0";
        raf.current = requestAnimationFrame(animate);
        return;
      }

      // When cursor is over FloatingText content, show i-beam instead of ball
      const s = (window as any).__floatTextActive ? "text" : state.current;
      const DOT_R  = 10;
      const BALL_R = 14;

      // Invert cursor color on data-cursor-invert elements (e.g. #000fff button)
      const el2 = document.elementFromPoint(mx, my) as HTMLElement | null;
      const onInvert = !!el2?.closest("[data-cursor-invert]");
      const cursorColor = onInvert ? "#ffffff" : "#000fff";
      dot.style.background  = cursorColor;
      ball.style.background = cursorColor;
      badge.style.background = onInvert ? "#ffffff" : "#000fff";
      if (badgeText.current) badgeText.current.style.color = onInvert ? "#000fff" : "#ffffff";

      if (s === "default") {
        dot.style.opacity    = "1";
        ball.style.opacity   = "1";
        dot.style.transform  = `translate(${(mx - DOT_R).toFixed(1)}px, ${(my - DOT_R).toFixed(1)}px)`;
        ball.style.transform = `translate(${(ballPos.current.x - BALL_R).toFixed(1)}px, ${(ballPos.current.y - BALL_R).toFixed(1)}px)`;
        badge.style.opacity  = "0";
        ibeam.style.opacity  = "0";
      } else if (s === "clickable") {
        dot.style.opacity     = "1";
        ball.style.opacity    = "0";
        dot.style.transform   = `translate(${(mx - DOT_R).toFixed(1)}px, ${(my - DOT_R).toFixed(1)}px)`;
        badge.style.transform = `translate(${(mx + 10).toFixed(1)}px, ${(my + 10).toFixed(1)}px) rotate(-6deg)`;
        badge.style.opacity   = "1";
        ibeam.style.opacity   = "0";
      } else {
        dot.style.opacity     = "0";
        ball.style.opacity    = "0";
        badge.style.opacity   = "0";
        ibeam.style.transform = `translate(${(mx - 1).toFixed(1)}px, ${(my - 10).toFixed(1)}px)`;
        ibeam.style.opacity   = "1";
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/*
        Goo filter: feGaussianBlur spreads both circles' edges,
        feColorMatrix amplifies alpha contrast → shared blurred regions snap
        into a crisp organic bridge (metaball). No feComposite so the
        contrast-sharpened output is the final result — crisp, not re-blurred.
        stdDeviation=6 gives ~40px sticky pull range.
      */}
      <svg style={{ position: "fixed", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <filter id="goo-cursor" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>

      {/* Goo layer — both dot and ball share the filter so BOTH morph organically */}
      <div
        style={{
          position:      "fixed",
          inset:         0,
          pointerEvents: "none",
          zIndex:        99998,
          filter:        "url(#goo-cursor)",
        }}
      >
        {/* Dot — 14px so it survives stdDeviation 6 (peak alpha ~0.58 > threshold 0.45) */}
        <div
          ref={dotRef}
          style={{
            position:     "absolute",
            top:          0,
            left:         0,
            width:        20,
            height:       20,
            borderRadius: "50%",
            background:   "#000fff",
            willChange:   "transform",
          }}
        />

        {/* Ball — 28px trailing */}
        <div
          ref={ballRef}
          style={{
            position:     "absolute",
            top:          0,
            left:         0,
            width:        28,
            height:       28,
            borderRadius: "50%",
            background:   "#000fff",
            opacity:      0,
            willChange:   "transform, opacity",
          }}
        />
      </div>

      {/* Badge — outside goo so text stays crisp */}
      <div
        ref={badgeRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        99999,
          opacity:       0,
          willChange:    "transform, opacity",
          background:    "#000fff",
          borderRadius:  "8px",
          padding:       "0 11px",
          height:        "22px",
          display:       "flex",
          alignItems:    "center",
          transition:    "opacity 0.12s ease",
        }}
      >
        <span
          ref={badgeText}
          style={{
            fontFamily:    "var(--font-poppins), system-ui, sans-serif",
            fontSize:      "8px",
            fontWeight:    600,
            letterSpacing: "0.16em",
            color:         "#ffffff",
            textTransform: "uppercase",
            whiteSpace:    "nowrap",
            userSelect:    "none",
            lineHeight:    1,
          }}
        >
          View
        </span>
      </div>

      {/* I-beam — plain vertical line */}
      <div
        ref={ibeamRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "2px",
          height:        "20px",
          background:    "#000fff",
          pointerEvents: "none",
          zIndex:        99999,
          opacity:       0,
          willChange:    "transform, opacity",
        }}
      />
    </>
  );
}
