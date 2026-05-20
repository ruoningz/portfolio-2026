import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";

export const metadata = {
  title: "Joyolight — Tiffany Zhang",
};

// ── Style tokens ──────────────────────────────────────────────────────────────
const FONT     = "var(--font-poppins), system-ui, sans-serif";
const C_LABEL  = "#AAAAAA";
const C_HEAD   = "#333333";
const C_BODY   = "#555555";

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
      fontFamily:   FONT,
      fontSize:     "clamp(1.25rem, 2vw, 1.65rem)",
      fontWeight:   500,
      lineHeight:   1.25,
      marginBottom: "2rem",
    }}>
      <FloatingText
        text={text}
        color={C_HEAD}
        highlightColor="#000fff"
        fakeBold="0.9px 0 0 currentColor, -0.9px 0 0 currentColor"
      />
    </h2>
  );
}

function BodyText({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1 }}>
      <FloatingText text={text} color={C_BODY} highlightColor="#000fff" />
    </p>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", background: "#EDEBE8", marginBottom: "2.5rem" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function JoyolightPage() {
  return (
    <main style={{
      position:      "relative",
      zIndex:        10,
      minHeight:     "100vh",
      background:    "transparent",
      paddingTop:    "clamp(5rem, 10vh, 8rem)",
      paddingBottom: "6rem",
      paddingLeft:   "1.5rem",
      paddingRight:  "1.5rem",
    }}>
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .project-intro-header {
            padding-top: 1.5rem !important;
            margin-bottom: 3rem !important;
          }
          .project-intro-header h1 {
            font-size: clamp(2rem, 10vw, 3rem) !important;
          }
          .project-intro-meta {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
          }
          .project-back-link {
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Back */}
        <Link
          href="/work"
          className="project-back-link"
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
          }}
        >
          ← Back to Work
        </Link>

        {/* Header */}
        <div className="project-intro-header" style={{ marginBottom: "5rem" }}>
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
              text="Joyolight"
              color={C_HEAD}
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
              text="B2B Lighting Brand & Digital Experience"
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
              text="Building a cohesive B2B lighting brand through catalog design, web design, product photography, and marketing materials."
              color="#666666"
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Section 1 — Logo ══ */}
        <ProjectImage
          src="/projects/joyolight/Logo-display.jpg"
          alt="Joyolight logo display — brand identity overview"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Brand Identity" />
          <SectionHeading text="Building a Cohesive Brand Presence" />
          <BodyText text="Joyolight is a Canadian lighting manufacturer specializing in customizable LED and linear lighting solutions. As a growing B2B brand with a wide range of technical products, the challenge was to create a more cohesive and accessible visual experience across digital and print touchpoints while maintaining clarity and consistency throughout the brand." />
        </div>

        {/* ══ Section 2 — Catalog ══ */}
        <ProjectImage
          src="/projects/joyolight/catalog.jpg"
          alt="Joyolight product catalog — 120-page layout system"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Print Design" />
          <SectionHeading text="Designing for Product Discovery" />
          <BodyText text="A 120-page product catalog was designed to organize complex product information into a clearer and more navigable system. Product categories, specifications, and customization options were carefully structured to improve readability while maintaining a clean and visually engaging layout." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="A custom icon system was developed to simplify technical information and help users quickly understand key product features. Print production and specialty finishing coordination were also independently managed to ensure consistency from design to final output."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 3 — Photography ══ */}
        <ProjectImage
          src="/projects/joyolight/photography.gif"
          alt="Joyolight product photography — studio direction and editing"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Art Direction" />
          <SectionHeading text="Art Direction Through Product Photography" />
          <BodyText text="All product photography and post-production editing were independently executed to support the brand's clean and minimal visual direction. Despite limited studio resources, the imagery maintained a bright, consistent, and product-focused aesthetic across all applications." />
        </div>

        {/* ══ Section 4 — Website ══ */}
        <ProjectImage
          src="/projects/joyolight/website.gif"
          alt="Joyolight website — product categorization and navigation design"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Web Design" />
          <SectionHeading text="Extending the Brand Into Digital Spaces" />
          <BodyText text="The website was designed to better organize a large catalog of customizable products through clearer categorization and navigation. A custom online tool was also created to support product selection workflows for industry professionals." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The full web design process — including layout design, developer communication, revisions, and QA — was independently managed to ensure consistency between design intent and final implementation."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 5 — Instagram ══ */}
        <ProjectImage
          src="/projects/joyolight/instagram.gif"
          alt="Joyolight social media content — Instagram design system"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Social Media" />
          <SectionHeading text="Maintaining Consistency Across Social Content" />
          <BodyText text="Social media content was designed to maintain consistency across the brand's broader digital presence. Product imagery, layouts, and graphic treatments were aligned with the website and marketing materials to create a more cohesive visual identity across platforms." />
        </div>

        {/* ══ Section 6 — Brochure ══ */}
        <ProjectImage
          src="/projects/joyolight/Brochure.jpg"
          alt="Joyolight brochures and operational materials"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Marketing Materials" />
          <SectionHeading text="Supporting Operational & Marketing Materials" />
          <BodyText text="Additional materials including brochures, price lists, warehouse stickers, and operational labels were designed to extend visual consistency across both customer-facing and internal business applications." />
        </div>

        {/* ══ Outcome ══ */}
        <div style={{ borderTop: "1px solid #EBEBEB", paddingTop: "3.5rem" }}>
          <SectionLabel text="Outcome" />
          <p style={{
            fontFamily: FONT,
            fontSize:   "clamp(1.1rem, 1.6vw, 1.35rem)",
            fontWeight: 300,
            lineHeight: 1.65,
          }}>
            <FloatingText
              text="The project helped establish a more cohesive and professional brand experience across digital, print, and operational touchpoints while making complex product information more accessible through clearer visual communication systems."
              color={C_HEAD}
              highlightColor="#000fff"
            />
          </p>
        </div>

        <RelatedProjects currentSlug="joyolight" />

      </div>
    </main>
  );
}
