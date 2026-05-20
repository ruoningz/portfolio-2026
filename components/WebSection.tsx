"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjectsByCategory } from "@/lib/projects";
import FloatingText from "@/components/FloatingText";

const items = getProjectsByCategory("web");

const CARD_IMAGES = [
  "/projects/colivease/Colivease-prototype-1.gif",
  "/projects/youlive-marketing/Youlivemarketing-prototype.gif",
  "/projects/oyobid/OYOBID-website.gif",
];

const CARD_BG = [
  "linear-gradient(160deg, #0e1218 0%, #121620 100%)",
  "linear-gradient(160deg, #121018 0%, #16141e 100%)",
  "linear-gradient(160deg, #0e1414 0%, #111818 100%)",
];

export default function WebSection() {
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [isMobile,   setIsMobile]   = useState(false);
  const [isTouch,    setIsTouch]    = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  return (
    <section style={{
      position:      "relative",
      zIndex:        10,
      height:        "100vh",
      background:    "transparent",
      display:       "flex",
      flexDirection: "column",
      overflow:      "hidden",
    }}>

      {/* Transparent upper zone — title centered within */}
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
          color:         "#666666",
          marginBottom:  "1.8rem",
        }}>
          03 — Web Design
        </p>
        <h2 style={{
          fontFamily: "var(--font-poppins), system-ui, sans-serif",
          fontSize:   "clamp(1.6rem, 2.4vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.15,
          color:      "#EEEEEE",
        }}>
          Interfaces built for how{" "}
          <strong style={{ fontWeight: 700, fontStyle: "italic", fontFamily: "var(--font-baskerville), Georgia, serif" }}>people</strong> think.
        </h2>
      </motion.div>
      </div>

      {/* Three project cards */}
      <motion.div
        className="home-section-cards"
        style={{ display: "flex", height: isMobile ? "auto" : "50vh", position: "relative", zIndex: 11 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {items.map((p, i) => {
          const isHov = hoveredIdx === i;
          const img   = CARD_IMAGES[i];

          return (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              style={{
                textDecoration: "none",
                flexGrow:       isMobile ? 1 : (isHov ? 1.55 : 1),
                flexShrink:     1,
                flexBasis:      0,
                minHeight:      isMobile ? "56vw" : 0,
                transition:     "flex-grow 0.38s cubic-bezier(0.34, 1.4, 0.64, 1)",
                display:        "block",
                minWidth:       0,
              }}
            >
              <div
                style={{
                  position:           "relative",
                  width:              "100%",
                  height:             "100%",
                  backgroundImage:    img ? `url('${img}'), ${CARD_BG[i]}` : CARD_BG[i],
                  backgroundSize:     "cover",
                  backgroundPosition: "center",
                  overflow:           "hidden",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(-1)}
              >
                {/* Blur + dark overlay */}
                <div style={{
                  position:             "absolute",
                  inset:                0,
                  background:           "rgba(0,0,0,0.65)",
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
                    <FloatingText text={p.title} color="#FFFFFF" highlightColor="#92a2ff" />
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
                    <FloatingText text={p.description} color="rgba(255,255,255,0.72)" highlightColor="#92a2ff" />
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}
