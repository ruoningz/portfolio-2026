"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue, useInView } from "framer-motion";
import HalftonePortrait from "@/components/HalftonePortrait";
import FloatingText from "@/components/FloatingText";

// Full-viewport overlay per word — scale/y anchor to viewport center via inset:0 + flex
function AnimatedWord({
  label,
  scrollYProgress,
  index,
  total,
}: {
  label: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const seg    = 1 / total;
  const center = (index + 0.5) * seg;

  // Slow fade-in (wide range) creates overlap between consecutive words.
  // Asymmetric: fade-out range is wider than fade-in → slower exit, no hard plateau.
  const fadeIn  = Math.max(0, center - seg * 0.85);
  const fadeOut = Math.min(1, center + seg * 1.15);

  // No flat plateau — single peak at `center` so it always keeps moving
  const opacity = useTransform(scrollYProgress, [fadeIn, center, fadeOut], [0, 1, 0]);
  // Scale: grows from small → full → bursts large on exit
  const scale   = useTransform(scrollYProgress, [fadeIn, center, fadeOut], [0.6, 1, 5]);
  // Arc: rises from below → viewport center → sinks back below (not upward exit)
  const y       = useTransform(scrollYProgress, [fadeIn, center, fadeOut], [110, 0, 110]);

  return (
    <motion.div
      style={{
        position:       "absolute",
        inset:          0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        opacity,
        scale,
        y,
        pointerEvents:  "none",
      }}
    >
      <span
        style={{
          fontFamily:    "var(--font-baskerville), Georgia, serif",
          fontWeight:    700,
          fontStyle:     "italic",
          fontSize:      "clamp(3rem, 6vw, 7rem)",
          color:         "#EEEEEE",
          letterSpacing: "-0.02em",
          whiteSpace:    "nowrap",
          userSelect:    "none",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// position:fixed panel — immune to overflow:hidden on ancestors (which kills sticky)
function WorkflowSection({ wordLabels }: { wordLabels: string[] }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(runwayRef, { once: false, margin: "0px 0px 0px 0px" });

  // Mobile detection for faster scroll multiplier
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const multiplier = isMobile
    ? wordLabels.length * 0.6 + 1
    : wordLabels.length + 1;

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value — adds ease/lag so animation isn't mechanical
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 28, restDelta: 0.0005 });

  // Fade panel in/out at section boundaries
  const panelOpacity = useTransform(
    smooth,
    [0, 0.02, 0.98, 1],
    [0,    1,    1, 0],
  );

  return (
    <>
      {/* Scroll runway — dark bg; higher z-index slides over Section 1 */}
      <div
        ref={runwayRef}
        className="home-section-bleed"
        style={{
          height:     `${multiplier * 100}vh`,
          background: "#1C1C1C",
          position:   "relative",
          zIndex:     20,
        }}
      />

      {/* Fixed panel — viewport-locked, only active while runway is in view */}
      <motion.div
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        inView ? 25 : -1,
          background:    "#1C1C1C",
          pointerEvents: "none",
          opacity:       panelOpacity,
        }}
      >
        {/* Title at top of viewport */}
        <div
          style={{
            position:  "absolute",
            top:       "5.5rem",
            left:      0,
            right:     0,
            textAlign: "center",
            zIndex:    10,
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-poppins)",
              fontSize:      "0.55rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:         "#888888",
              marginBottom:  "1.5rem",
            }}
          >
            Workflow
          </p>
          <h2
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize:   "clamp(1.5rem, 2.5vw, 2.2rem)",
              color:      "#EEEEEE",
              lineHeight: 1.15,
            }}
          >
            How I Work
          </h2>
        </div>

        {/* Words — inset:0 + flex = always perfectly centered in viewport */}
        {wordLabels.map((label, i) => (
          <AnimatedWord
            key={label}
            label={label}
            scrollYProgress={smooth}
            index={i}
            total={wordLabels.length}
          />
        ))}
      </motion.div>
    </>
  );
}

// ─── Capability row: tag | large title | comma-separated tools (narrow) ───────
function CapabilityRow({
  cap,
  tag,
  index,
}: {
  cap: { category: string; tools: string[] };
  tag: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="capability-row"
      style={{
        display:    "flex",
        alignItems: "flex-start",
        padding:    "3rem 0",
      }}
    >
      {/* Tag — fixed narrow column */}
      <div className="cap-tag" style={{ width: "7rem", flexShrink: 0, paddingTop: "0.4rem" }}>
        <span
          style={{
            fontFamily:    "var(--font-poppins)",
            fontWeight:    400,
            fontSize:      "0.5rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "#AAAAAA",
          }}
        >
          {tag}
        </span>
      </div>

      {/* Large gutter */}
      <div className="cap-gutter" style={{ width: "clamp(3rem, 6vw, 7rem)", flexShrink: 0 }} />

      {/* Category title — large, 2-3 lines */}
      <div className="cap-category" style={{ width: "clamp(14rem, 22vw, 22rem)", flexShrink: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize:   "clamp(1.4rem, 2.2vw, 2rem)",
            color:      "#222222",
            lineHeight: 1.2,
          }}
        >
          <FloatingText text={cap.category} color="#222222" highlightColor="#000fff" />
        </p>
      </div>

      {/* Large gutter */}
      <div className="cap-gutter" style={{ width: "clamp(3rem, 6vw, 7rem)", flexShrink: 0 }} />

      {/* Tools — wider column, fills remaining space */}
      <p
        className="cap-tools"
        style={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 300,
          fontSize:   "0.8rem",
          color:      "#666666",
          lineHeight: 1.9,
          flex:       1,
          maxWidth:   "clamp(20rem, 36vw, 34rem)",
        }}
      >
        <FloatingText text={cap.tools.join(", ")} color="#666666" highlightColor="#000fff" />
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  const wordLabels = ["Research", "Strategy", "Creative Direction", "Optimization", "Delivery"];

  const capabilities = [
    {
      tag:      "Brand",
      category: "Brand & Visual Communication",
      tools:    ["Brand Identity Systems", "Campaign Creative", "Art Direction", "Catalog Design", "Editorial Layouts", "Print Design", "Visual Storytelling", "Marketing Collateral", "Packaging Design", "Typography Systems", "Cross-Platform Visual Consistency"],
    },
    {
      tag:      "UI/UX",
      category: "UX/UI & Digital Experiences",
      tools:    ["Figma", "Wireframing", "Prototyping", "User Flows", "Design Systems", "Information Architecture", "Responsive Web Design", "Usability Thinking", "Interface Design", "WordPress", "Developer Collaboration", "User-Centered Design"],
    },
    {
      tag:      "Campaign",
      category: "Campaign & Performance Marketing",
      tools:    ["Meta Ads", "Google Ads", "A/B Testing", "SEO Optimization", "Analytics", "Google Tag Manager", "Campaign Optimization", "Cross-Platform Advertising", "Performance Monitoring", "Audience Targeting", "Creative Iteration", "Lead Generation Campaigns"],
    },
    {
      tag:      "Motion",
      category: "Motion, Content & Media",
      tools:    ["After Effects", "Premiere Pro", "Photography", "Videography", "Motion Graphics", "Social Media Content Creation", "Content Direction", "Visual Asset Production", "Digital Campaign Content", "Short-Form Motion Design"],
    },
    {
      tag:      "Dev",
      category: "Production & Technical Execution",
      tools:    ["Print Production", "Vendor Coordination", "Asset Optimization", "File Preparation", "Large-Format Print Design", "HTML/CSS", "Email Marketing Systems", "Production Specifications", "Website Maintenance", "Quality Control", "Marketing Asset Deployment"],
    },
    {
      tag:      "3D",
      category: "3D & Spatial Visualization",
      tools:    ["Rhino 3D", "SketchUp", "AutoCAD", "V-Ray", "Enscape", "Spatial Visualization", "Technical Drafting", "Architectural Modeling", "Rendering", "Product Visualization", "Environmental Design Thinking"],
    },
  ];

  const sectionFadeIn = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <main
      style={{
        background: "#F7F7F7",
        position:   "relative",
        zIndex:     10,  // stacking context — all children paint above the fixed hero (zIndex:2)
      }}
    >
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .about-hero-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            overflow-y: auto !important;
            justify-content: flex-start !important;
          }
          .about-hero-photo {
            width: 100% !important;
            justify-content: center !important;
            padding-right: 0 !important;
            padding-top: 1rem !important;
          }
          .about-hero-photo > div {
            width: 80% !important;
          }
          .about-hero-text {
            width: 100% !important;
            padding-left: 0 !important;
            padding-top: 1.5rem !important;
          }

          /* Capability rows — 2-column mobile layout */
          .capability-row {
            flex-wrap: wrap !important;
            padding: 1.5rem 0 !important;
          }
          .cap-tag {
            width: auto !important;
            flex: 0 0 30% !important;
            max-width: 30% !important;
            padding-top: 0.2rem !important;
          }
          .cap-gutter {
            display: none !important;
          }
          .cap-category {
            width: auto !important;
            flex: 1 1 70% !important;
            max-width: 70% !important;
          }
          .cap-tools {
            flex: none !important;
            width: 70% !important;
            max-width: 70% !important;
            margin-left: 30% !important;
            margin-top: 0.5rem !important;
          }
        }
      `}</style>

      {/* ─── Section 1 scroll-space placeholder ─────────────────────────────── */}
      {/* Hero is position:fixed so this spacer maintains the scroll height */}
      <div style={{ height: "100vh" }} />

      {/* ─── Section 1: Hero — truly fixed, Section 2 slides over it ─────────── */}
      {/* zIndex:2 sits BELOW main's stacking context (zIndex:10), so WorkflowSection
          naturally covers it as it scrolls into view */}
      <div
        style={{
          position:   "fixed",
          inset:      0,
          zIndex:     2,
          background: "#F7F7F7",
          display:    "flex",
          alignItems: "stretch",
        }}
      >
        <div
          className="about-hero-inner"
          style={{
            maxWidth:      "1440px",
            margin:        "0 auto",
            width:         "100%",
            display:       "flex",
            alignItems:    "center",
            paddingTop:    "clamp(5rem, 10vh, 8rem)",
            paddingLeft:   "clamp(1.5rem, 5.5vw, 5rem)",
            paddingRight:  "clamp(1.5rem, 5.5vw, 5rem)",
            paddingBottom: "4rem",
          }}
        >
          {/* Left: Portrait — justify end so portrait hugs the center divider */}
          <motion.div
            className="about-hero-photo"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width:           "50%",
              flexShrink:      0,
              display:         "flex",
              alignItems:      "flex-start",
              justifyContent:  "flex-end",
              paddingTop:      "2rem",
              paddingRight:    "clamp(1.5rem, 3vw, 3rem)",
            }}
          >
            <div
              style={{
                width:       "72%",
                aspectRatio: "1 / 1",
                position:    "relative",
                overflow:    "hidden",
              }}
            >
              <HalftonePortrait src="/about/Photo.jpg" />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="about-hero-text"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width:       "50%",
              display:     "flex",
              alignItems:  "center",
              paddingLeft: "clamp(2rem, 5vw, 5rem)",
            }}
          >
            <div style={{ maxWidth: "520px" }}>
              <p
                style={{
                  fontFamily:    "var(--font-poppins)",
                  fontSize:      "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color:         "#AAAAAA",
                  marginBottom:  "1.5rem",
                }}
              >
                About
              </p>
              <h1
                style={{
                  fontFamily:    "var(--font-baskerville), Georgia, serif",
                  fontWeight:    700,
                  fontStyle:     "italic",
                  fontSize:      "clamp(2.8rem, 5vw, 5rem)",
                  color:         "#222222",
                  lineHeight:    1.1,
                  marginBottom:  "1.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                <FloatingText text="From noise to form." color="#222222" highlightColor="#000fff" />
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 300,
                  fontSize:   "0.9rem",
                  color:      "#555555",
                  lineHeight: 1.9,
                }}
              >
                <FloatingText
                  text="I'm Tiffany Zhang, a Multidisciplinary Designer focused on branding, campaign systems, and digital experiences. Designing across visual identity, performance marketing, UX/UI, and production systems with an emphasis on clarity, scalability, and cohesive communication."
                  color="#555555"
                  highlightColor="#000fff"
                />
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Section 2: Workflow ─────────────────────────────────────────────── */}
      <WorkflowSection wordLabels={wordLabels} />

      {/* ─── Section 3: Capabilities ─────────────────────────────────────────── */}
      <section
        style={{
          position:      "relative",
          zIndex:        30,
          paddingTop:    "6rem",
          paddingBottom: "6rem",
          paddingLeft:   "clamp(1.5rem, 5.5vw, 5rem)",
          paddingRight:  "clamp(1.5rem, 5.5vw, 5rem)",
          background:    "#F7F7F7",
        }}
      >
        {/* Label + Heading */}
        <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#AAAAAA",
              marginBottom: "1.5rem",
            }}
          >
            Capabilities
          </p>
          <h2
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
              color: "#222222",
              lineHeight: 1.15,
            }}
          >
            <FloatingText text="Tools, Systems & Capabilities" color="#222222" highlightColor="#000fff" />
          </h2>
        </div>

        {/* Rows — bordered list, tools inline with / separator */}
        <div>
          {capabilities.map((cap, i) => (
            <CapabilityRow key={cap.category} cap={cap} tag={cap.tag} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
