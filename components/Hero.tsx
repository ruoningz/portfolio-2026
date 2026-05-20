"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useTransform, SpringOptions } from "framer-motion";

type LayerDef = {
  depth: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  opacity: number;
  border?: boolean;
  filled?: boolean;
};

const LAYERS: LayerDef[] = [
  { depth: 0.08, x: 62, y: 18, w: 28, h: 44, rotate: -1.5, opacity: 0.06, filled: true },
  { depth: 0.18, x: 8,  y: 24, w: 10, h: 52, rotate: 0.8,  opacity: 0.07, border: true },
  { depth: 0.22, x: 72, y: 55, w: 20, h: 14, rotate: -0.5, opacity: 0.09, border: true },
  { depth: 0.3,  x: 14, y: 12, w: 7,  h: 7,  rotate: 2,    opacity: 0.10, border: true },
  { depth: 0.45, x: 58, y: 28, w: 14, h: 22, rotate: 1.2,  opacity: 0.08, filled: true },
  { depth: 0.5,  x: 22, y: 72, w: 30, h: 3,  rotate: -0.3, opacity: 0.10, border: true },
  { depth: 0.65, x: 80, y: 16, w: 5,  h: 5,  rotate: 3,    opacity: 0.12, filled: true },
  { depth: 0.75, x: 2,  y: 60, w: 18, h: 28, rotate: -1,   opacity: 0.06, border: true },
];

const SPRING_CFG: SpringOptions = { stiffness: 50, damping: 18, mass: 1.4 };
const SPRING_ROT: SpringOptions = { stiffness: 30, damping: 16, mass: 1.6 };

// Shared mutable refs for raw mouse position — passed down as refs so layers read live values
type MouseRef = { x: React.MutableRefObject<number>; y: React.MutableRefObject<number> };

function ParallaxLayer({
  layer,
  mouseRef,
}: {
  layer: LayerDef;
  mouseRef: MouseRef;
}) {
  const springX = useSpring(0, SPRING_CFG);
  const springY = useSpring(0, SPRING_CFG);
  const springR = useSpring(0, SPRING_ROT);

  const rotateValue = useTransform(springR, (v) => layer.rotate + v);

  // Register this layer's updater via a RAF callback
  useEffect(() => {
    let raf: number;
    const update = () => {
      const strength = layer.depth * 32;
      const rotStrength = layer.depth * 3;
      springX.set(mouseRef.x.current * strength);
      springY.set(mouseRef.y.current * strength);
      springR.set(mouseRef.x.current * rotStrength);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [layer.depth, mouseRef, springR, springX, springY]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${layer.x}%`,
        top: `${layer.y}%`,
        width: `${layer.w}vw`,
        height: `${layer.h}vh`,
        opacity: layer.opacity,
        x: springX,
        y: springY,
        rotate: rotateValue,
        backgroundColor: layer.filled ? "#333" : "transparent",
        border: layer.border ? "1px solid #333" : "none",
        borderRadius: "1px",
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

export default function Hero() {
  const rawX = useRef(0);
  const rawY = useRef(0);
  const mouseRef: MouseRef = { x: rawX, y: rawY };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    rawX.current = e.clientX / window.innerWidth - 0.5;
    rawY.current = e.clientY / window.innerHeight - 0.5;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{ background: "#F5F3F1" }}
    >
      {/* Parallax layers */}
      {LAYERS.map((layer, i) => (
        <ParallaxLayer key={i} layer={layer} mouseRef={mouseRef} />
      ))}

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      >
        <motion.p
          className="text-[11px] font-[400] tracking-[0.3em] uppercase text-[#8C8680] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Portfolio — 2026
        </motion.p>

        <h1
          className="font-[300] text-[#333] leading-[1.08] tracking-[-0.02em] mb-8"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          Tiffany Zhang
        </h1>

        <motion.p
          className="font-[300] text-[#8C8680] leading-[1.65] max-w-[520px] mx-auto"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
        >
          Designer translating brand and digital systems through
          research-led thinking, with a focus on clarity, intent,
          and cross-platform consistency.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <span className="w-5 h-px bg-[#B8B0A8]" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#B8B0A8] font-[400]">
            Selected Work Below
          </span>
          <span className="w-5 h-px bg-[#B8B0A8]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
