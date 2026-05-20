"use client";

import { useEffect, useRef, useState } from "react";
import { prepareWithSegments, layoutNextLine, type LayoutCursor } from "@chenglou/pretext";

// ── Poem ──────────────────────────────────────────────────────────────────────
const POEM =
  `Bergère ô tour Eiffel le troupeau des ponts bèle ce matin Tu en as assez de vivre dans l'antiquité grecque et romaine Ici même les automobiles ont l'air d'être anciennes La religion seule est restée toute neuve la religion Est restée simple comme les hangars de Port-Aviation Seul en Europe tu n'es pas antique ô Christianisme L'Européen le plus moderne c'est vous Pape Pie X Et toi que les fenêtres observent la honte te retient D'entrer dans une église et de t'y confesser ce matin Tu lis les prospectus les catalogues les affiches qui chantent tout haut Voilà la poésie ce matin et pour la prose il y a les journaux Il y a les livraisons à 25 centimes pleines d'aventures policières Portraits des grands hommes et mille titres divers`;

// ── Constants ─────────────────────────────────────────────────────────────────
const FONT         = `18px "Palatino Linotype","Book Antiqua",Palatino,serif`;
const LINE_H       = 36;
const MIN_W        = 16;
const MAX_W        = 560;
const LIMIT        = 80;
const BLUE         = "#3a52e8";
const MAX_FLOAT    = 7;
const SIGMA2       = 5;
const WORD_PENALTY = 0.50;
// text-shadow faux-bold: strokes the glyph ±0.45px without changing metric width
const FAKE_BOLD    = "0.45px 0 0 currentColor, -0.45px 0 0 currentColor";

type CharData = { char: string; isSpace: boolean; wordPos: number };
type Line     = { text: string; lineWidth: number; containerW: number; chars: CharData[] };

// ── Helpers ───────────────────────────────────────────────────────────────────
function tokenizeLine(text: string): CharData[] {
  const out: CharData[] = [];
  let wordIdx = 0;
  for (const ch of text) {
    if (ch === " ") {
      out.push({ char: ch, isSpace: true,  wordPos: wordIdx + 0.5 });
      wordIdx++;
    } else {
      out.push({ char: ch, isSpace: false, wordPos: wordIdx });
    }
  }
  return out;
}

function buildPyramid(): Line[] {
  const prepared = prepareWithSegments(POEM, FONT);
  let cur: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  const out: Line[] = [];
  for (let i = 0; i < LIMIT; i++) {
    const containerW = Math.round(MIN_W + (MAX_W - MIN_W) * (i / (LIMIT - 1)));
    const line = layoutNextLine(prepared, cur, containerW);
    if (!line) break;
    out.push({ text: line.text, lineWidth: line.width, containerW, chars: tokenizeLine(line.text) });
    cur = line.end;
  }
  return out;
}

// ── Component ─────────────────────────────────────────────────────────────────
// standalone=true  → used on its own page (/pretext-test): hides main cursor, shows own cursor
// standalone=false → embedded in homepage: main cursor stays active
export default function PretextDemo({ standalone = false }: { standalone?: boolean }) {
  const [lines,   setLines]   = useState<Line[]>([]);
  const [isTouch, setIsTouch] = useState(false);
  const [scale,   setScale]   = useState(1);

  // scaleRef — used inside RAF without re-subscribing
  const scaleRef = useRef(1);

  const wrapRef   = useRef<HTMLDivElement>(null); // scaled pyramid wrapper, used for hit-test
  const dotRef    = useRef<HTMLDivElement>(null);
  const gradRef   = useRef<HTMLDivElement>(null);
  const lineRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const charRefs  = useRef<(HTMLSpanElement | null)[][]>([]);

  // ── Build pyramid once ──────────────────────────────────────────────────────
  useEffect(() => { setLines(buildPyramid()); }, []);

  // ── Detect touch + responsive scale ────────────────────────────────────────
  useEffect(() => {
    setIsTouch(navigator.maxTouchPoints > 0);
    const compute = () => {
      const s = Math.min(1, (window.innerWidth - 32) / MAX_W);
      scaleRef.current = s;
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // ── Portfolio cursor visibility (standalone only) ──────────────────────────
  useEffect(() => {
    if (!standalone || isTouch) return;
    const dot  = document.getElementById("__cursor-dot");
    const ring = document.getElementById("__cursor-ring");
    if (dot)  dot.style.display  = "none";
    if (ring) ring.style.display = "none";
    document.body.style.cursor = "none";
    return () => {
      if (dot)  dot.style.display  = "";
      if (ring) ring.style.display = "";
      document.body.style.cursor = "";
    };
  }, [standalone, isTouch]);

  // ── RAF interaction loop ────────────────────────────────────────────────────
  useEffect(() => {
    if (!lines.length) return;

    let mx = -999, my = -999;
    let gx = -999, gy = -999;
    let prevLi = -1, prevCi = -1;
    let touchActive = false;
    let boostStart  = -9999;
    let rafId       = 0;

    const onMouseMove   = (e: MouseEvent)  => { mx = e.clientX; my = e.clientY; };
    const onTouchStart  = (e: TouchEvent)  => {
      const t = e.touches[0];
      mx = t.clientX; my = t.clientY;
      touchActive = true; boostStart = performance.now();
    };
    const onTouchMove   = (e: TouchEvent)  => { mx = e.touches[0].clientX; my = e.touches[0].clientY; };
    const onTouchEnd    = ()               => { touchActive = false; };

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("touchend",   onTouchEnd);

    function resetLine(li: number) {
      const el = lineRefs.current[li];
      if (el) el.style.color = "";
      for (const cel of charRefs.current[li] ?? []) {
        if (cel) { cel.style.transform = "translateY(0)"; cel.style.textShadow = ""; }
      }
    }

    const tick = (now: number) => {
      const s = scaleRef.current;

      // ── Desktop: move cursor elements ─────────────────────────────────────
      if (!isTouch) {
        const dot = dotRef.current;
        if (dot) dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
        gx += (mx - gx) * 0.075;
        gy += (my - gy) * 0.075;
        const grad = gradRef.current;
        if (grad) grad.style.transform = `translate(${gx - 44}px, ${gy - 44}px)`;
      }

      // ── Mobile: idle when finger is not on screen ─────────────────────────
      if (isTouch && !touchActive) {
        if (prevLi >= 0) { resetLine(prevLi); prevLi = -1; prevCi = -1; }
        rafId = requestAnimationFrame(tick); return;
      }

      // ── Line hit-test via scaled visual position ──────────────────────────
      const box = wrapRef.current?.getBoundingClientRect();
      if (!box) { rafId = requestAnimationFrame(tick); return; }

      const li = Math.floor((my - box.top) / (LINE_H * s));

      // ── Char hit-test via actual bounding rects ───────────────────────────
      let ci = -1;
      if (li >= 0 && li < lines.length) {
        const chars = lines[li].chars;
        for (let c = 0; c < chars.length; c++) {
          if (chars[c].isSpace) continue;
          const el = charRefs.current[li]?.[c];
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (mx >= r.left && mx <= r.right) { ci = c; break; }
        }
      }

      // ── Skip if nothing changed and boost expired ─────────────────────────
      const boostT  = Math.max(0, 1 - (now - boostStart) / 350);
      if (prevLi === li && prevCi === ci && boostT <= 0) {
        rafId = requestAnimationFrame(tick); return;
      }

      // ── Reset previous line if we moved to a new one ──────────────────────
      if (prevLi >= 0 && prevLi !== li) resetLine(prevLi);

      // ── Apply wave + fake-bold to current line ────────────────────────────
      if (li >= 0 && li < lines.length) {
        const lineEl = lineRefs.current[li];
        if (lineEl && prevLi !== li) lineEl.style.color = BLUE;

        const chars      = lines[li].chars;
        const hovWPos    = ci >= 0 ? chars[ci].wordPos : -1;
        const hovWordIdx = ci >= 0 ? Math.floor(chars[ci].wordPos) : -1;
        const boost      = 1 + (isTouch ? 0.8 * boostT : 0);
        const refs       = charRefs.current[li] ?? [];

        for (let c = 0; c < refs.length; c++) {
          const el = refs[c];
          if (!el) continue;

          if (ci >= 0) {
            const charDist = Math.abs(c - ci);
            const wordDist = Math.abs(chars[c].wordPos - hovWPos);
            const float    = MAX_FLOAT * boost
              * Math.exp(-(charDist * charDist) / SIGMA2)
              * Math.pow(WORD_PENALTY, wordDist);
            el.style.transform = `translateY(${(-float).toFixed(2)}px)`;

            // Fake-bold for same word (text-shadow doubles the stroke, no metric change)
            const cw = !chars[c].isSpace ? Math.floor(chars[c].wordPos) : -1;
            el.style.textShadow = (cw >= 0 && cw === hovWordIdx) ? FAKE_BOLD : "";
          } else {
            el.style.transform = "translateY(0)"; el.style.textShadow = "";
          }
        }
      }

      prevLi = li; prevCi = ci;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, [lines, isTouch]);

  return (
    <div style={{
      position:   "relative",
      cursor:     isTouch ? undefined : "none",
      userSelect: "none",
      padding:    "4rem 0 8rem",
      overflow:   "hidden",
    }}>

      {/* ── Desktop cursor (standalone page only) ── */}
      {standalone && !isTouch && (
        <>
          <div ref={gradRef} style={{
            position: "fixed", top: 0, left: 0,
            width: 88, height: 88, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,178,4,0.52) 0%, rgba(124,178,4,0.18) 42%, transparent 70%)",
            filter: "blur(8px)", mixBlendMode: "multiply",
            pointerEvents: "none", zIndex: 99998, willChange: "transform",
          }} />
          <div ref={dotRef} style={{
            position: "fixed", top: 0, left: 0,
            width: 6, height: 6, borderRadius: "50%", background: "#333333",
            pointerEvents: "none", zIndex: 99999, willChange: "transform",
          }} />
        </>
      )}

      {/* ── Mobile hint ── */}
      {isTouch && (
        <p style={{
          textAlign:   "center",
          fontFamily:  `"Palatino Linotype","Book Antiqua",Palatino,serif`,
          fontSize:    "0.7rem",
          letterSpacing: "0.22em",
          color:       "#CCCCCC",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}>
          Touch the poem
        </p>
      )}

      {/* ── Pyramid (scale for mobile) ── */}
      <div
        ref={wrapRef}
        style={{
          width:           MAX_W,
          margin:          "0 auto",
          transform:       scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top center",
        }}
      >
        <div style={{
          fontFamily: `"Palatino Linotype","Book Antiqua",Palatino,serif`,
          fontSize:   18,
          color:      "#1a1a2e",
        }}>
          {lines.map((line, li) => (
            <div
              key={li}
              ref={el => { lineRefs.current[li] = el; }}
              style={{
                width:          line.containerW,
                height:         LINE_H,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                margin:         "0 auto",
                overflow:       "visible",
              }}
            >
              {line.chars.map((ch, ci) => (
                <span
                  key={ci}
                  ref={el => {
                    if (!charRefs.current[li]) charRefs.current[li] = [];
                    charRefs.current[li][ci] = el;
                  }}
                  style={{
                    display:    "inline-block",
                    lineHeight: `${LINE_H}px`,
                    whiteSpace: ch.isSpace ? "pre" : undefined,
                    transition: "transform 0.30s cubic-bezier(0.34,1.4,0.64,1)",
                    willChange: "transform",
                  }}
                >
                  {ch.char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
