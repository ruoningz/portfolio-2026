"use client";
import { useEffect, useRef } from "react";

interface Star {
  x:  number; y:  number;
  ox: number; oy: number; // repulsion offset
  r:  number;
  speed:   number;
  opacity: number;
}

export default function Starfield({ count = 85 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0;
    const stars: Star[] = [];
    let rafId   = 0;
    let lastTime = 0;

    function resize() {
      const parent = canvas!.parentElement;
      w = parent ? parent.offsetWidth  : window.innerWidth;
      h = parent ? parent.offsetHeight : window.innerHeight;
      canvas!.width  = w;
      canvas!.height = h;
    }

    function spawn(atRight = false): Star {
      return {
        x:       atRight ? w + Math.random() * 60 : Math.random() * w,
        y:       Math.random() * h,
        ox: 0, oy: 0,
        r:       0.35 + Math.random() * 1.0,
        speed:   18 + Math.random() * 48,
        opacity: 0.15 + Math.random() * 0.35,
      };
    }

    resize();
    for (let i = 0; i < count; i++) stars.push(spawn(false));

    const REPULSE_R  = 90;
    const REPULSE_F  = 3.2;
    const OX_DECAY   = 0.91;

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;

      for (const s of stars) {
        // base drift
        s.x -= s.speed * dt;
        if (s.x + s.ox < -8) {
          s.x      = w + 4;
          s.y      = Math.random() * h;
          s.ox = 0; s.oy = 0;
          s.r      = 0.35 + Math.random() * 1.0;
          s.speed  = 18 + Math.random() * 48;
          s.opacity = 0.15 + Math.random() * 0.35;
        }

        // mouse repulsion
        const dx   = s.x - mx;
        const dy   = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSE_R && dist > 0.1) {
          const f = (1 - dist / REPULSE_R) * REPULSE_F;
          s.ox += (dx / dist) * f;
          s.oy += (dy / dist) * f;
        }
        s.ox *= OX_DECAY;
        s.oy *= OX_DECAY;

        const px = s.x + s.ox;
        const py = s.y + s.oy;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(70, 62, 54, ${s.opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame((now) => { lastTime = now; tick(now); });

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Track mouse relative to canvas
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    // Listen on the section (parent of canvas)
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", onMove);
      parent.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", onMove);
        parent.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
      }}
    />
  );
}
