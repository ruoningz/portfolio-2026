"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjectsByCategory } from "@/lib/projects";
import { getBrandDetail } from "@/lib/brandDetails";
import type { BrandProjectDetail } from "@/lib/brandDetails";
import ProjectModal from "@/components/ProjectModal";
import FloatingText from "@/components/FloatingText";

const PAGE_SLUGS = new Set(["joyolight", "lawyers-financial", "kuiper-grow"]);
const items = getProjectsByCategory("brand");

const CARD_IMAGES = [
  "/home/thumbnails/Joyo-Catalog-thumbnail.jpg",
  "/home/thumbnails/LawyersFinancial_thumbnail.jpg",
  "/home/thumbnails/Kuiper-packaging.jpg",
];

const CARD_BG = [
  "linear-gradient(160deg, #1a1710 0%, #211e12 100%)",
  "linear-gradient(160deg, #111520 0%, #151a2a 100%)",
  "linear-gradient(160deg, #18121a 0%, #1d141f 100%)",
];

export default function BrandSection() {
  const [activeDetail, setActiveDetail] = useState<BrandProjectDetail | null>(null);
  const [hoveredIdx,   setHoveredIdx]   = useState(-1);
  const [isMobile,     setIsMobile]     = useState(false);
  const [isTouch,      setIsTouch]      = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  const openModal = (slug: string) => {
    const detail = getBrandDetail(slug);
    if (detail) setActiveDetail(detail);
  };

  return (
    <>
      <section className="home-section-bleed" style={{
        position:      "relative",
        zIndex:        10,
        height:        "100vh",
        background:    "transparent",
        display:       "flex",
        flexDirection: "column",
        overflow:      "hidden",
      }}>

        {/* ── Transparent upper zone — 3D disc floats here, title centered within ── */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          style={{ textAlign: "center", padding: "0 1rem", position: "relative", zIndex: 11, width: "100%" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p style={{
            fontFamily:    "var(--font-poppins), system-ui, sans-serif",
            fontSize:      "0.6rem",
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color:         "#AAAAAA",
            marginBottom:  "1.8rem",
          }}>
            02 — Brand System
          </p>
          <h2 style={{
            fontFamily: "var(--font-poppins), system-ui, sans-serif",
            fontSize:   "clamp(1.6rem, 2.4vw, 2.4rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            color:      "#333333",
          }}>
            <strong style={{ fontWeight: 700, fontStyle: "italic", fontFamily: "var(--font-baskerville), Georgia, serif" }}>Identities</strong> that
            {" "}outlast the <strong style={{ fontWeight: 700, fontStyle: "italic", fontFamily: "var(--font-baskerville), Georgia, serif" }}>moment.</strong>
          </h2>
        </motion.div>
        </div>

        {/* ── Three project cards ── */}
        <motion.div
          className="home-section-cards"
          style={{ display: "flex", height: isMobile ? "auto" : "50vh", position: "relative", zIndex: 11 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {items.map((p, i) => {
            const isHov    = hoveredIdx === i;
            const img      = CARD_IMAGES[i];
            const flexBase: React.CSSProperties = {
              flexGrow:   isMobile ? 1 : (isHov ? 1.55 : 1),
              flexShrink: 1,
              flexBasis:  0,
              transition: "flex-grow 0.38s cubic-bezier(0.34, 1.4, 0.64, 1)",
              display:    "block",
              minWidth:   0,
              minHeight:  isMobile ? "56vw" : 0,
              position:   "relative",
            };

            const inner = (
              <div style={{
                position:           "absolute",
                inset:              0,
                backgroundImage:    img ? `url('${img}'), ${CARD_BG[i]}` : CARD_BG[i],
                backgroundSize:     "cover",
                backgroundPosition: "center",
                overflow:           "hidden",
              }}>
                {/* Frosted white overlay */}
                <div style={{
                  position:             "absolute",
                  inset:                0,
                  background:           "rgba(247,247,247,0.88)",
                  backdropFilter:       "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  opacity:              (isHov || isMobile || isTouch) ? 1 : 0,
                  transition:           "opacity 0.35s ease",
                  zIndex:               1,
                }} />
                {/* Text */}
                <div style={{
                  position:       "absolute",
                  inset:          0,
                  zIndex:         2,
                  display:        "flex",
                  flexDirection:  "column",
                  alignItems:     "center",
                  justifyContent: "center",
                  padding:        "0 2rem",
                  transform:      "translateY(-8%)",
                  opacity:        (isHov || isMobile) ? 1 : 0,
                  transition:     "opacity 0.35s ease",
                }}>
                  <p style={{
                    fontFamily:    "var(--font-poppins), system-ui, sans-serif",
                    fontSize:      "1.05rem",
                    fontWeight:    500,
                    letterSpacing: "0.04em",
                    textAlign:     "center",
                    marginBottom:  "0.65rem",
                    lineHeight:    1.4,
                  }}>
                    <FloatingText text={p.title} color="#333333" highlightColor="#000fff" />
                  </p>
                  <p style={{
                    fontFamily:    "var(--font-poppins), system-ui, sans-serif",
                    fontSize:      "0.78rem",
                    fontWeight:    300,
                    letterSpacing: "0.03em",
                    lineHeight:    1.75,
                    textAlign:     "center",
                    maxWidth:      "26ch",
                  }}>
                    <FloatingText text={p.description} color="#666666" highlightColor="#000fff" />
                  </p>
                </div>
              </div>
            );

            if (PAGE_SLUGS.has(p.slug)) {
              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  style={{ textDecoration: "none", ...flexBase }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(-1)}
                >
                  {inner}
                </Link>
              );
            }

            return (
              <button
                key={p.slug}
                onClick={() => openModal(p.slug)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(-1)}
                data-cursor-label="View"
                style={{ padding: 0, border: "none", background: "none", cursor: "none", ...flexBase }}
              >
                {inner}
              </button>
            );
          })}
        </motion.div>
      </section>

      <ProjectModal detail={activeDetail} onClose={() => setActiveDetail(null)} />
    </>
  );
}
