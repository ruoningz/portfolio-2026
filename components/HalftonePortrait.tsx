"use client";

import {
  useState, useEffect, useRef,
  createContext, useContext, useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Config ──────────────────────────────────────────────────────────────────
const MAX_DEPTH  = 7;
const IMG_SIZE   = 512;
const BRUSH_MULT = 1.15;
const BRUSH_MIN  = 0.055;
// Zero grace = cascade as fast as React re-renders (~1 frame) — eliminates visible depth seams
const GRACE_MS   = 0;

function spring(depth: number) {
  const t = depth / MAX_DEPTH;
  return {
    type:      "spring" as const,
    stiffness: 380 + t * 380,
    damping:   26  + t * 14,
    mass:      0.7 - t * 0.35,
  };
}

// ─── Pixel context ────────────────────────────────────────────────────────────
type PixelCtx = { data: Uint8ClampedArray | null; size: number };
const Pixels = createContext<PixelCtx>({ data: null, size: 0 });

function sample(ctx: PixelCtx, cx: number, cy: number) {
  if (!ctx.data) return "#909090";
  const px = Math.max(0, Math.min(ctx.size - 1, Math.round(cx * ctx.size)));
  const py = Math.max(0, Math.min(ctx.size - 1, Math.round(cy * ctx.size)));
  const i  = (py * ctx.size + px) * 4;
  return `rgb(${ctx.data[i]},${ctx.data[i + 1]},${ctx.data[i + 2]})`;
}

// ─── Registry context ─────────────────────────────────────────────────────────
type Reg = { cx: number; cy: number; brushR: number; split: () => void; born: number };
type RegCtx = {
  register:   (id: string, r: Reg) => void;
  unregister: (id: string)          => void;
};
const Registry = createContext<RegCtx>({ register: () => {}, unregister: () => {} });

// ─── Circle ──────────────────────────────────────────────────────────────────
interface NodeData { id: string; cx: number; cy: number; r: number; depth: number }
interface CircleProps { node: NodeData; isRoot?: boolean }

function Circle({ node, isRoot }: CircleProps) {
  const [split, setSplit] = useState(false);
  const pix    = useContext(Pixels);
  const reg    = useContext(Registry);
  const color  = sample(pix, node.cx, node.cy);
  const canSplit = node.depth < MAX_DEPTH;

  useEffect(() => {
    if (split || !canSplit) return;
    const brushR = Math.max(node.r * BRUSH_MULT, BRUSH_MIN);
    reg.register(node.id, {
      cx: node.cx, cy: node.cy, brushR,
      split: () => setSplit(true),
      born: Date.now(),
    });
    return () => reg.unregister(node.id);
  }, [split, canSplit, node.id, node.cx, node.cy, node.r, reg]);

  const childR = node.r / 2;
  const children: NodeData[] = split
    ? ([-1, 1] as const).flatMap((dy) =>
        ([-1, 1] as const).map((dx, j) => ({
          id:    `${node.id}${dy < 0 ? "t" : "b"}${j}`,
          cx:    node.cx + dx * childR,
          cy:    node.cy + dy * childR,
          r:     childR,
          depth: node.depth + 1,
        }))
      )
    : [];

  const pct = (v: number) => `${v * 100}%`;

  return (
    <>
      <AnimatePresence>
        {!split && (
          <motion.div
            key={node.id}
            initial={{ scale: isRoot ? 1 : 0 }}
            animate={{ scale: 1 }}
            // Fade out in-place — no shrink — so children cover before parent leaves
            exit={{ opacity: 0, scale: 1, transition: { duration: 0.18 } }}
            transition={spring(node.depth)}
            style={{
              position:        "absolute",
              left:            pct(node.cx - node.r),
              top:             pct(node.cy - node.r),
              width:           pct(node.r * 2),
              height:          pct(node.r * 2),
              borderRadius:    "50%",
              background:      color,
              cursor:          canSplit ? "crosshair" : "default",
              transformOrigin: "center",
              // scale(1.08) fills the inter-circle corner gaps without visible color bleed
              transform:       "scale(1.08)",
            }}
          />
        )}
      </AnimatePresence>
      {children.map((c) => <Circle key={c.id} node={c} />)}
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HalftonePortrait({ src }: { src: string }) {
  const [pixelCtx, setPixelCtx]       = useState<PixelCtx>({ data: null, size: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const mountKey    = useRef(0);
  const mapRef      = useRef<Map<string, Reg>>(new Map());
  const mousePosRef = useRef({ x: -9, y: -9 });
  const rafRef      = useRef(0);

  // Load image
  useEffect(() => {
    mountKey.current += 1;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = IMG_SIZE;
      const oc = c.getContext("2d")!;
      const { naturalWidth: nw, naturalHeight: nh } = img;
      if (nw >= nh) oc.drawImage(img, (nw - nh) / 2, 0, nh, nh, 0, 0, IMG_SIZE, IMG_SIZE);
      else          oc.drawImage(img, 0, (nh - nw) / 2, nw, nw, 0, 0, IMG_SIZE, IMG_SIZE);
      setPixelCtx({ data: oc.getImageData(0, 0, IMG_SIZE, IMG_SIZE).data, size: IMG_SIZE });
    };
  }, [src]);

  // RAF loop — split any circle within brush radius once its grace period expires
  useEffect(() => {
    const tick = () => {
      const { x: mx, y: my } = mousePosRef.current;
      const now = Date.now();
      mapRef.current.forEach((reg, id) => {
        if (now - reg.born < GRACE_MS) return;
        const dx = mx - reg.cx, dy = my - reg.cy;
        if (dx * dx + dy * dy < reg.brushR * reg.brushR) {
          reg.split();
          mapRef.current.delete(id);
        }
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const register   = useCallback((id: string, r: Reg) => { mapRef.current.set(id, r); }, []);
  const unregister = useCallback((id: string)          => { mapRef.current.delete(id); }, []);

  const onMouseMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    };
  };
  const onMouseLeave = () => { mousePosRef.current = { x: -9, y: -9 }; };
  const onMouseEnter = () => { if (!hasInteracted) setHasInteracted(true); };

  const root: NodeData = { id: "r", cx: 0.5, cy: 0.5, r: 0.5, depth: 0 };

  return (
    <div
      style={{ position: "relative", width: "100%", paddingBottom: "100%", overflow: "hidden" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Registry.Provider value={{ register, unregister }}>
          <Pixels.Provider value={pixelCtx}>
            <Circle key={mountKey.current} node={root} isRoot />
          </Pixels.Provider>
        </Registry.Provider>
      </div>

      {/* "hover here" hint — fades out on first mouse enter */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
          pointerEvents: "none",
          opacity:       hasInteracted ? 0 : 1,
          transition:    "opacity 0.5s ease",
          zIndex:        5,
        }}
      >
        <span
          style={{
            fontFamily:    "var(--font-poppins)",
            fontWeight:    500,
            fontSize:      "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color:         "#FFFFFF",
          }}
        >
          hover here
        </span>
      </div>
    </div>
  );
}
