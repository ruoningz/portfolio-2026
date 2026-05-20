"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";

const FONT = "var(--font-poppins), system-ui, sans-serif";

const PAGE_SLUGS = new Set(["joyolight", "lawyers-financial", "kuiper-grow", "oyobid", "colivease", "youlivemarketing", "latitude", "1818-alberni", "burquitlam-park-district"]);

const THUMBNAILS: Record<string, string> = {
  "joyolight":         "/home/thumbnails/Joyo-Catalog-thumbnail.jpg",
  "lawyers-financial": "/home/thumbnails/LawyersFinancial_thumbnail.jpg",
  "kuiper-grow":       "/home/thumbnails/Kuiper-packaging.jpg",
  "oyobid":            "/projects/oyobid/OYOBID-website.gif",
  "colivease":         "/projects/colivease/Colivease-prototype-1.gif",
  "youlivemarketing":  "/projects/youlive-marketing/Youlivemarketing-prototype.gif",
  "latitude":          "/home/thumbnails/Latitude-thumbnail.jpg",
  "1818-alberni":           "/home/thumbnails/1818-thumbnail.jpg",
  "burquitlam-park-district": "/home/thumbnails/BPD-thumbnail.jpg",
};

const GRADIENTS: Record<string, string> = {
  "joyolight":               "linear-gradient(160deg, #1a1710 0%, #211e12 100%)",
  "lawyers-financial":       "linear-gradient(160deg, #111520 0%, #151a2a 100%)",
  "kuiper-grow":             "linear-gradient(160deg, #18121a 0%, #1d141f 100%)",
  "latitude":                "linear-gradient(160deg, #1a1a18 0%, #202018 100%)",
  "1818-alberni":            "linear-gradient(160deg, #121820 0%, #141b25 100%)",
  "burquitlam-park-district":"linear-gradient(160deg, #16181a 0%, #1b1e20 100%)",
  "colivease":               "linear-gradient(160deg, #0e1218 0%, #121620 100%)",
  "youlivemarketing":        "linear-gradient(160deg, #121018 0%, #16141e 100%)",
  "oyobid":                  "linear-gradient(160deg, #0d1020 0%, #101525 100%)",
};

const CATEGORY_LABEL: Record<string, string> = {
  brand:     "Brand System",
  marketing: "Marketing Design",
  web:       "Web Design",
};

interface Props {
  currentSlug: string;
}

export default function RelatedProjects({ currentSlug }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const others = projects.filter((p) => p.slug !== currentSlug);

  const applyTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    el.style.transform  = `perspective(600px) scale(0.95) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
    el.style.transition = "transform 0.05s linear";
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    setHoveredIdx(-1);
    const el = e.currentTarget;
    el.style.transform  = "perspective(600px) scale(1) rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 0.4s ease";
  };

  return (
    <section style={{
      borderTop:  "1px solid #EBEBEB",
      marginTop:  "6rem",
      paddingTop: "3.5rem",
    }}>
      <p style={{
        fontFamily:    FONT,
        fontSize:      "0.53rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color:         "#AAAAAA",
        marginBottom:  "2.5rem",
      }}>
        More Work
      </p>

      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap:                 "1px",
        background:          "#E8E6E2",
      }}>
        {others.map((p, i) => {
          const isHov = hoveredIdx === i;
          const img   = THUMBNAILS[p.slug];
          const bg    = GRADIENTS[p.slug] ?? "linear-gradient(160deg, #111 0%, #1a1a1a 100%)";
          const href  = PAGE_SLUGS.has(p.slug) ? `/work/${p.slug}` : "/work";

          const cardInner = (
            <div
              style={{
                position:           "relative",
                height:             "150px",
                backgroundImage:    img ? `url('${img}'), ${bg}` : bg,
                backgroundSize:     "cover",
                backgroundPosition: "center",
                overflow:           "hidden",
              }}
            >
              {/* Overlay — darkens + blurs on hover */}
              <div style={{
                position:             "absolute",
                inset:                0,
                background:           isHov ? "rgba(0,0,0,0.70)" : "rgba(0,0,0,0.42)",
                backdropFilter:       isHov ? "blur(5px)" : "none",
                WebkitBackdropFilter: isHov ? "blur(5px)" : "none",
                transition:           "background 0.3s ease, backdrop-filter 0.3s ease",
              }} />

              {/* Text */}
              <div style={{
                position:       "absolute",
                inset:          0,
                display:        "flex",
                flexDirection:  "column",
                justifyContent: "flex-end",
                padding:        "1rem",
              }}>
                <p style={{
                  fontFamily:    FONT,
                  fontSize:      "0.48rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.5)",
                  marginBottom:  "0.3rem",
                }}>
                  {CATEGORY_LABEL[p.category]}
                </p>
                <p style={{
                  fontFamily: FONT,
                  fontSize:   "0.8rem",
                  fontWeight: 500,
                  color:      "#FFFFFF",
                  lineHeight: 1.3,
                }}>
                  {p.title}
                </p>
              </div>
            </div>
          );

          return (
            <div
              key={p.slug}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={(e) => resetTilt(e, i)}
              onMouseMove={applyTilt}
              style={{ display: "block", zIndex: isHov ? 2 : 1, position: "relative" }}
            >
              {PAGE_SLUGS.has(p.slug) ? (
                <Link href={href} style={{ textDecoration: "none", display: "block" }}>
                  {cardInner}
                </Link>
              ) : (
                cardInner
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
