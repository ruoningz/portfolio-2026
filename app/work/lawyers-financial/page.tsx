import Link from "next/link";
import DigitalToggle from "@/components/DigitalToggle";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";

export const metadata = {
  title: "Lawyers Financial — Tiffany Zhang",
};

// ── Shared style tokens ───────────────────────────────────────────────────────
const FONT = "var(--font-poppins), system-ui, sans-serif";
const C_LABEL   = "#AAAAAA";
const C_HEADING = "#333333";
const C_BODY    = "#555555";

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily:    FONT,
      fontSize:      "0.53rem",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color:         C_LABEL,
      marginBottom:  "0.75rem",
    }}>
      {text}
    </p>
  );
}

function SectionHeading({ text }: { text: string }) {
  return (
    <h2 style={{
      fontFamily: FONT,
      fontSize:   "clamp(1.25rem, 2vw, 1.65rem)",
      fontWeight: 500,
      lineHeight: 1.25,
      marginBottom: "2rem",
    }}>
      <FloatingText
        text={text}
        color={C_HEADING}
        highlightColor="#000fff"
        fakeBold="0.9px 0 0 currentColor, -0.9px 0 0 currentColor"
      />
    </h2>
  );
}

function BodyText({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: FONT,
      fontSize:   "0.88rem",
      fontWeight: 300,
      lineHeight: 2.1,
    }}>
      <FloatingText text={text} color={C_BODY} highlightColor="#000fff" />
    </p>
  );
}

// Full-width image with a warm placeholder while the file loads
function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", background: "#EDEBE8", marginBottom: "2.5rem" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LawyersFinancialPage() {
  return (
    <main
      style={{
        position:      "relative",
        zIndex:        10,
        minHeight:     "100vh",
        background:    "transparent",
        paddingTop:    "clamp(5rem, 10vh, 8rem)",
        paddingBottom: "6rem",
        paddingLeft:   "1.5rem",
        paddingRight:  "1.5rem",
      }}
    >
      {/* ── Centered reading column ── */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

      {/* ── Back ── */}
      <Link
        href="/work"
        style={{
          display:       "inline-flex",
          alignItems:    "center",
          gap:           "0.5rem",
          fontFamily:    FONT,
          fontSize:      "0.58rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         C_LABEL,
          textDecoration:"none",
          marginBottom:  "4rem",
          transition:    "color 0.2s",
        }}
        onMouseEnter={undefined}
      >
        ← Back to Work
      </Link>

      {/* ── Header ── */}
      <div style={{ marginBottom: "5rem" }}>
        <h1 style={{
          fontFamily:    FONT,
          fontSize:      "clamp(2.8rem, 5.5vw, 4.5rem)",
          fontWeight:    700,
          lineHeight:    1.05,
          marginBottom:  "0.8rem",
          letterSpacing: "-0.01em",
          textAlign:     "center",
        }}>
          <FloatingText
            text="Lawyers Financial"
            color={C_HEADING}
            highlightColor="#000fff"
            fakeBold="1.2px 0 0 currentColor, -1.2px 0 0 currentColor"
          />
        </h1>

        <p style={{
          fontFamily:    FONT,
          fontSize:      "clamp(0.8rem, 1.1vw, 0.95rem)",
          fontWeight:    300,
          letterSpacing: "0.04em",
          marginBottom:  "2rem",
          textAlign:     "center",
        }}>
          <FloatingText
            text="Corporate Marketing & Brand Communications"
            color="#888888"
            highlightColor="#000fff"
          />
        </p>

        <div style={{ width: "2rem", height: "1px", background: "#DDDDDD", margin: "0 auto 2rem" }} />

        <p style={{
          fontFamily: FONT,
          fontSize:   "clamp(0.9rem, 1.3vw, 1.05rem)",
          fontWeight: 300,
          lineHeight: 1.78,
        }}>
          <FloatingText
            text="Corporate marketing and brand communication design for a Toronto-based non-profit organization across digital and print platforms."
            color="#666666"
            highlightColor="#000fff"
          />
        </p>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

      {/* ══════════ Section 1 — Branding ══════════ */}
      <ProjectImage
        src="/projects/lawyers-financial/Branding.jpg"
        alt="Lawyers Financial brand identity — signage and colour system"
      />
      <div style={{ marginBottom: "5rem" }}>
        <SectionLabel text="Brand System" />
        <SectionHeading text="Working Within an Established Brand System" />
        <BodyText text="Lawyers Financial operates within a well-established corporate identity centred around professionalism, trust, and clarity. The challenge was to create cohesive communication materials that aligned with existing brand standards while elevating the overall visual quality across both digital and print touchpoints." />
      </div>

      {/* ══════════ Section 2 — Brochures ══════════ */}
      <ProjectImage
        src="/projects/lawyers-financial/bochures.jpg"
        alt="Lawyers Financial print brochures — four product brochures laid out"
      />
      <div style={{ marginBottom: "5rem" }}>
        <SectionLabel text="Print Collateral" />
        <SectionHeading text="Elevating Corporate Communication" />
        <BodyText text="Rather than redefining the brand, the focus was on elevating communication through cleaner layouts, improved hierarchy, and more cohesive visual execution across print and digital materials." />
      </div>

      {/* ══════════ Section 3 — Digital (EN / FR toggle) ══════════ */}
      {/* GIF + pill button first, then text below */}
      <div style={{ marginBottom: "2.5rem" }}>
        <DigitalToggle />
      </div>
      <div style={{ marginBottom: "5rem" }}>
        <SectionLabel text="Digital Advertising" />
        <SectionHeading text="Building Scalable & Multilingual Systems" />
        <BodyText text="Digital assets were designed as flexible communication systems capable of adapting across varying sizes, formats, and language requirements while maintaining consistency, readability, and visual balance across all applications." />
      </div>

      {/* ══════════ Section 4 — Email / Social ══════════ */}
      <ProjectImage
        src="/projects/lawyers-financial/email.jpg"
        alt="Lawyers Financial student email campaign — social and email assets"
      />
      <div style={{ marginBottom: "5rem" }}>
        <SectionLabel text="Email &amp; Social" />
        <SectionHeading text="Balancing Flexibility Within a Corporate System" />
        <BodyText text="Student-focused email campaigns introduced a slightly more approachable and energetic visual tone while remaining aligned with the organisation's broader brand system and communication standards." />
      </div>

      {/* ══════════ Section 5 — Roll-up Banners ══════════ */}
      <ProjectImage
        src="/projects/lawyers-financial/banners.jpg"
        alt="Lawyers Financial roll-up banners — event display materials"
      />
      <div style={{ marginBottom: "5rem" }}>
        <SectionLabel text="Event Materials" />
        <SectionHeading text="Extending the Brand Into Physical Spaces" />
        <BodyText text="Large-format event materials extended the organisation's visual identity into physical environments while maintaining clarity, professionalism, and strong visual presence at scale." />
      </div>

      {/* ══════════ Outcome ══════════ */}
      <div style={{
        borderTop:  "1px solid #EBEBEB",
        paddingTop: "3.5rem",
      }}>
        <SectionLabel text="Outcome" />
        <p style={{
          fontFamily: FONT,
          fontSize:   "clamp(1.1rem, 1.6vw, 1.35rem)",
          fontWeight: 300,
          lineHeight: 1.65,
        }}>
          <FloatingText
            text="The project strengthened visual consistency across multiple communication channels while modernising the organisation's presentation through more refined and system-oriented design execution."
            color={C_HEADING}
            highlightColor="#000fff"
          />
        </p>
      </div>

      <RelatedProjects currentSlug="lawyers-financial" />

      </div>{/* end centered column */}
    </main>
  );
}
