"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BrandProjectDetail } from "@/lib/brandDetails";

interface ProjectModalProps {
  detail: BrandProjectDetail | null;
  onClose: () => void;
}

const STAGGER: { h: number; mt: number }[] = [
  { h: 520, mt: 60 },
  { h: 340, mt: 220 },
  { h: 480, mt: 40 },
  { h: 400, mt: 150 },
  { h: 460, mt: 80 },
];

const FONT = "var(--font-poppins), system-ui, sans-serif";

function label(text: string) {
  return (
    <p
      style={{
        fontFamily: FONT,
        fontSize: "0.53rem",
        letterSpacing: "0.26em",
        textTransform: "uppercase" as const,
        color: "#777777",
        marginBottom: "0.75rem",
      }}
    >
      {text}
    </p>
  );
}

export default function ProjectModal({ detail, onClose }: ProjectModalProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollXRef = useRef(0);
  const velRef     = useRef(0);
  const rafRef     = useRef(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  /* ── Lock body scroll, Escape to close ── */
  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [detail, onClose]);

  /* ── Inertia scroll engine ── */
  useEffect(() => {
    if (!detail) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    scrollXRef.current = 0;
    velRef.current     = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      velRef.current += e.deltaY * 0.55;
    };

    const tick = () => {
      velRef.current  *= 0.90;
      scrollXRef.current += velRef.current;

      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      scrollXRef.current = Math.max(0, Math.min(maxScroll, scrollXRef.current));
      gallery.scrollLeft = scrollXRef.current;

      rafRef.current = requestAnimationFrame(tick);
    };

    gallery.addEventListener("wheel", onWheel, { passive: false });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      gallery.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafRef.current);
    };
  }, [detail]);

  return (
    <AnimatePresence>
      {detail && (
        <motion.div
          key="modal"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.55, ease: [0.32, 0, 0.18, 1] }}
          style={{
            position:   "fixed",
            inset:      0,
            zIndex:     500,
            background: "#F4F3EF",
            display:    "flex",
            overflow:   "hidden",
          }}
        >
          {/* ══════════════════════════════ LEFT PANEL ══════════════════════════════ */}
          <div
            style={{
              width:      "360px",
              flexShrink: 0,
              height:     "100%",
              overflowY:  "auto",
              padding:    "3.5rem 2.5rem",
              borderRight:"1px solid rgba(0,0,0,0.08)",
              display:    "flex",
              flexDirection: "column",
              gap:        "0",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                alignSelf:     "flex-start",
                marginBottom:  "3rem",
                width:         "1.8rem",
                height:        "1.8rem",
                border:        "1px solid #CCCCCC",
                background:    "transparent",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                color:         "#888888",
                fontFamily:    FONT,
                fontSize:      "0.7rem",
                cursor:        "pointer",
                transition:    "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#333";
                (e.currentTarget as HTMLElement).style.color = "#333";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#CCCCCC";
                (e.currentTarget as HTMLElement).style.color = "#888888";
              }}
            >
              ✕
            </button>

            {/* Meta */}
            <p style={{ fontFamily: FONT, fontSize: "0.53rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#999999", marginBottom: "0.6rem" }}>
              Brand Identity · {detail.year}
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.7rem, 2.5vw, 2.1rem)", fontWeight: 300, color: "#1A1A1A", lineHeight: 1.1, marginBottom: "0.4rem" }}>
              {detail.slug.charAt(0).toUpperCase() + detail.slug.slice(1)}
            </h2>
            <p style={{ fontFamily: FONT, fontSize: "0.65rem", color: "#999999", letterSpacing: "0.06em", marginBottom: "2rem" }}>
              {detail.role}
            </p>

            {/* Tagline */}
            <p
              style={{
                fontFamily:  FONT,
                fontSize:    "0.82rem",
                fontWeight:  300,
                color:       "#444444",
                lineHeight:  1.7,
                fontStyle:   "italic",
                borderLeft:  "2px solid #CCCCCC",
                paddingLeft: "0.9rem",
                marginBottom:"2rem",
              }}
            >
              {detail.tagline}
            </p>

            {/* Overview */}
            <div style={{ marginBottom: "2rem" }}>
              {label("Overview")}
              <p style={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 300, color: "#444444", lineHeight: 1.78 }}>
                {detail.overview}
              </p>
              {detail.approach && (
                <p style={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 300, color: "#444444", lineHeight: 1.78, marginTop: "0.9rem" }}>
                  {detail.approach}
                </p>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(0,0,0,0.08)", marginBottom: "2rem" }} />

            {/* Deliverables */}
            <div style={{ marginBottom: "2rem" }}>
              {label("Deliverables")}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {detail.deliverables.map((item, i) => (
                  <li key={i} style={{ fontFamily: FONT, fontSize: "0.75rem", fontWeight: 300, color: "#444444", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: "0.22rem", height: "0.22rem", borderRadius: "50%", background: "#BBBBBB", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Colour palette */}
            <div>
              {label("Colour Palette")}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {detail.colors.map((sw, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <div
                      style={{
                        width:        "2.2rem",
                        height:       "2.2rem",
                        borderRadius: "1px",
                        background:   sw.hex,
                        flexShrink:   0,
                        border:       sw.hex.toUpperCase().startsWith("#F") ? "1px solid rgba(0,0,0,0.08)" : "none",
                      }}
                    />
                    <div>
                      <p style={{ fontFamily: FONT, fontSize: "0.7rem", fontWeight: 300, color: "#333333", lineHeight: 1.3 }}>{sw.name}</p>
                      <p style={{ fontFamily: FONT, fontSize: "0.58rem", color: "#AAAAAA", letterSpacing: "0.08em" }}>{sw.hex.toUpperCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════ GALLERY ══════════════════════════════ */}
          <div
            ref={galleryRef}
            style={{
              flex:       1,
              height:     "100%",
              overflowX:  "scroll",
              overflowY:  "hidden",
              scrollbarWidth: "none",
              display:    "flex",
              alignItems: "flex-start",
              paddingLeft:"3rem",
              paddingRight:"3rem",
              paddingTop: "3.5rem",
              paddingBottom:"3.5rem",
              gap:        "1.5rem",
            }}
          >
            {detail.gallery.map((card, i) => {
              const s    = STAGGER[i % STAGGER.length];
              const isHov = hoveredCard === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    flexShrink: 0,
                    width:      "280px",
                    display:    "flex",
                    flexDirection: "column",
                    gap:        "0.75rem",
                    marginTop:  `${s.mt}px`,
                    cursor:     "default",
                  }}
                >
                  {/* Image area */}
                  <div
                    style={{
                      width:      "280px",
                      height:     `${s.h}px`,
                      background: card.placeholderBg,
                      overflow:   "hidden",
                      position:   "relative",
                      transition: "transform 0.4s ease",
                      transform:  isHov ? "scale(1.02)" : "scale(1)",
                    }}
                  >
                    {/* When real images are added: <Image src={card.src} alt={card.alt} fill style={{ objectFit:"cover", filter: isHov ? "none" : "grayscale(0.88)", transition:"filter 0.4s ease" }} /> */}
                    <div
                      style={{
                        position:   "absolute",
                        inset:      0,
                        background: card.placeholderBg,
                        filter:     isHov ? "grayscale(0)" : "grayscale(0.88)",
                        transition: "filter 0.4s ease",
                      }}
                    />
                    {/* Caption overlay on hover */}
                    <div
                      style={{
                        position:   "absolute",
                        inset:      0,
                        background: "rgba(0,0,0,0.28)",
                        display:    "flex",
                        alignItems: "flex-end",
                        padding:    "0.9rem",
                        opacity:    isHov ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <p style={{ fontFamily: FONT, fontSize: "0.62rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, letterSpacing: "0.03em" }}>
                        {card.alt}
                      </p>
                    </div>
                  </div>

                  {/* Caption below */}
                  <p style={{ fontFamily: FONT, fontSize: "0.65rem", fontWeight: 300, color: "#888888", lineHeight: 1.55, maxWidth: "260px" }}>
                    {card.caption}
                  </p>
                </div>
              );
            })}

            {/* Right breathing room */}
            <div style={{ flexShrink: 0, width: "1px" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
