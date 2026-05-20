"use client";

// Mirrors PretextDemo interaction exactly, with proper multi-row support:
//   Row detection: find the visual row closest to cursor Y (from char BBox Y centers)
//   Char detection: closest char by X within that row
//   Color: per-char (active row → highlight, others → resting)
//   Wave: Gaussian × word-penalty, active-row only
//   Wrap: word-level inline-block prevents mid-word line breaks

import { useEffect, useRef, useMemo } from "react";

const MAX_FLOAT    = 7;
const SIGMA2       = 12;  // wider Gaussian — less arc, tighter within-word cohesion
const WORD_PENALTY = 0.50;
const FAKE_BOLD    = "0.45px 0 0 currentColor, -0.45px 0 0 currentColor";

type CharData = { char: string; isSpace: boolean; wordPos: number };

function tokenize(text: string): CharData[] {
  const out: CharData[] = [];
  let wordIdx = 0;
  for (const ch of text) {
    if (ch === " ") {
      out.push({ char: ch, isSpace: true, wordPos: wordIdx + 0.5 });
      wordIdx++;
    } else {
      out.push({ char: ch, isSpace: false, wordPos: wordIdx });
    }
  }
  return out;
}

type WordGroup = { indices: number[]; chars: CharData[] };
type Token     = WordGroup | "space";

function groupByWord(chars: CharData[]): Token[] {
  const tokens: Token[] = [];
  let cur: WordGroup = { indices: [], chars: [] };
  chars.forEach((ch, i) => {
    if (ch.isSpace) {
      if (cur.chars.length) { tokens.push(cur); cur = { indices: [], chars: [] }; }
      tokens.push("space");
    } else {
      cur.chars.push(ch); cur.indices.push(i);
    }
  });
  if (cur.chars.length) tokens.push(cur);
  return tokens;
}

type Props = {
  text:            string;
  color?:          string;
  highlightColor?: string;
  fakeBold?:       string;
  style?:          React.CSSProperties;
};

export default function FloatingText({
  text,
  color          = "#FFFFFF",
  highlightColor = "#000fff",
  fakeBold       = FAKE_BOLD,
  style,
}: Props) {
  const chars      = useMemo(() => tokenize(text), [text]);
  const tokens     = useMemo(() => groupByWord(chars), [chars]);
  const spanRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef     = useRef(0);
  const mx         = useRef(-9999);
  const my         = useRef(-9999);
  const instanceId = useRef(Math.random().toString(36).slice(2));
  const colorRef    = useRef(color);
  const hlRef       = useRef(highlightColor);
  const boldRef     = useRef(fakeBold);

  useEffect(() => { colorRef.current = color; },          [color]);
  useEffect(() => { hlRef.current    = highlightColor; }, [highlightColor]);
  useEffect(() => { boldRef.current  = fakeBold; },       [fakeBold]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mx.current = e.clientX; my.current = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      // ── Row height from first rendered non-space char ──────────────────
      let rowH = 20;
      for (let c = 0; c < chars.length; c++) {
        if (chars[c].isSpace) continue;
        const el = spanRefs.current[c];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.height > 0) { rowH = r.height; break; }
      }
      const rowHalf = rowH * 0.5;

      // ── Active visual row: row center Y closest to cursor Y ─────────────
      let activeRowCY = -1;
      let minYDist    = Infinity;
      for (let c = 0; c < chars.length; c++) {
        if (chars[c].isSpace) continue;
        const el = spanRefs.current[c];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        const cy = (r.top + r.bottom) / 2;
        const dy = Math.abs(my.current - cy);
        if (dy < minYDist) { minYDist = dy; activeRowCY = cy; }
      }
      // X-bounds of the active row — cursor must be over the text, not just same Y
      let rowLeft = Infinity, rowRight = -Infinity;
      if (activeRowCY >= 0) {
        for (let c = 0; c < chars.length; c++) {
          if (chars[c].isSpace) continue;
          const el = spanRefs.current[c];
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          if (Math.abs((r.top + r.bottom) / 2 - activeRowCY) > rowHalf) continue;
          if (r.left  < rowLeft)  rowLeft  = r.left;
          if (r.right > rowRight) rowRight = r.right;
        }
      }

      const isActive = activeRowCY >= 0 && minYDist <= rowHalf
        && mx.current >= rowLeft && mx.current <= rowRight;

      // Use a global Set so multiple FloatingText instances don't race:
      // any active instance keeps the flag true regardless of tick order.
      const activeSet: Set<string> = ((window as any).__floatTextActiveSet ??= new Set());
      if (isActive) activeSet.add(instanceId.current);
      else          activeSet.delete(instanceId.current);
      (window as any).__floatTextActive = activeSet.size > 0;

      // ── Closest char by X on the active row ────────────────────────────
      let ci       = -1;
      let minXDist = Infinity;
      if (isActive) {
        for (let c = 0; c < chars.length; c++) {
          if (chars[c].isSpace) continue;
          const el = spanRefs.current[c];
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          if (Math.abs((r.top + r.bottom) / 2 - activeRowCY) > rowHalf) continue;
          const xDist = Math.abs(mx.current - (r.left + r.right) / 2);
          if (xDist < minXDist) { minXDist = xDist; ci = c; }
        }
      }

      const hovWPos    = ci >= 0 ? chars[ci].wordPos : -1;
      const hovWordIdx = ci >= 0 ? Math.floor(chars[ci].wordPos) : -1;

      // ── Per-char: color + wave + bold ───────────────────────────────────
      for (let c = 0; c < chars.length; c++) {
        if (chars[c].isSpace) continue;
        const el = spanRefs.current[c];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;

        const cy          = (r.top + r.bottom) / 2;
        const onActiveRow = isActive && Math.abs(cy - activeRowCY) <= rowHalf;

        el.style.color = onActiveRow ? hlRef.current : colorRef.current;

        if (ci >= 0 && onActiveRow) {
          const charDist = Math.abs(c - ci);
          const wordDist = Math.abs(chars[c].wordPos - hovWPos);
          const float    = MAX_FLOAT
            * Math.exp(-(charDist * charDist) / SIGMA2)
            * Math.pow(WORD_PENALTY, wordDist);
          el.style.transform  = `translateY(${(-float).toFixed(2)}px)`;
          el.style.textShadow = Math.floor(chars[c].wordPos) === hovWordIdx ? boldRef.current : "";
        } else {
          el.style.transform  = "translateY(0)";
          el.style.textShadow = "";
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      const activeSet: Set<string> | undefined = (window as any).__floatTextActiveSet;
      if (activeSet) {
        activeSet.delete(instanceId.current);
        (window as any).__floatTextActive = activeSet.size > 0;
      }
    };
  }, [chars]);

  return (
    <span style={{ color, ...style }}>
      {tokens.map((tok, ti) => {
        if (tok === "space") {
          return <span key={ti} style={{ display: "inline" }}>{" "}</span>;
        }
        return (
          // inline-block word wrapper prevents mid-word line breaks
          <span key={ti} style={{ display: "inline-block" }}>
            {tok.chars.map((ch, li) => {
              const gi = tok.indices[li];
              return (
                <span
                  key={li}
                  ref={el => { spanRefs.current[gi] = el; }}
                  style={{
                    display:    "inline-block",
                    transition: "transform 0.30s cubic-bezier(0.34,1.4,0.64,1)",
                    willChange: "transform",
                  }}
                >
                  {ch.char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
