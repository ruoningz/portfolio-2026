"use client";

import { useRef } from "react";

const FONT = "var(--font-poppins), system-ui, sans-serif";

interface Props {
  href:     string;
  label:    string;
  target?:  string;
  rel?:     string;
}

export default function TiltButton({ href, label, target, rel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    el.style.transform  = `perspective(500px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg)`;
    el.style.transition = "transform 0.05s linear";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform  = "perspective(500px) rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 0.4s ease";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      data-cursor-invert
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "0.75rem",
        fontFamily:     FONT,
        fontSize:       "0.65rem",
        letterSpacing:  "0.22em",
        textTransform:  "uppercase",
        color:          "#ffffff",
        background:     "#000fff",
        padding:        "1rem 2.4rem",
        textDecoration: "none",
        transformStyle: "preserve-3d",
      }}
    >
      {label}
    </a>
  );
}
