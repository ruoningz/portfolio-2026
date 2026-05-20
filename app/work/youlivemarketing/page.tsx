import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";
import TiltButton from "@/components/TiltButton";

export const metadata = {
  title: "YouLiveMarketing — Tiffany Zhang",
};

// ── Style tokens ──────────────────────────────────────────────────────────────
const FONT    = "var(--font-poppins), system-ui, sans-serif";
const C_LABEL = "#AAAAAA";
const C_HEAD  = "#333333";
const C_BODY  = "#555555";

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
export default function YouLiveMarketingPage() {
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
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Back */}
        <Link
          href="/work"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "0.5rem",
            fontFamily:     FONT,
            fontSize:       "0.58rem",
            letterSpacing:  "0.2em",
            textTransform:  "uppercase",
            color:          C_LABEL,
            textDecoration: "none",
            marginBottom:   "4rem",
          }}
        >
          ← Back to Work
        </Link>

        {/* Header */}
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
              text="YouLiveMarketing"
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
              text="Web Design & Digital Maintenance"
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
              text="Website redesign and ongoing digital maintenance for a marketing agency, focused on clarity, SEO, and scalable content structure."
              color="#666666"
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Section 1 — Logo ══ */}
        <ProjectImage
          src="/projects/youlive-marketing/youlivemaketing-logo.jpg"
          alt="YouLiveMarketing logo and brand identity"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Web Design" />
          <SectionHeading text="Clarifying Complex Service Offerings" />
          <BodyText text="The primary challenge of the project was organizing a broad range of marketing services into a clearer and more straightforward web experience." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The website structure focused on improving content hierarchy, simplifying navigation, and making key services easier to understand for potential clients."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 2 — Prototype ══ */}
        <ProjectImage
          src="/projects/youlive-marketing/Youlivemarketing-prototype.gif"
          alt="YouLiveMarketing website prototype — service pages and navigation"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="SEO & Discoverability" />
          <SectionHeading text="Designing for Communication & Discoverability" />
          <BodyText text="In addition to the visual interface design, SEO and metadata strategies were incorporated to improve search visibility and help users more easily discover relevant services online." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The design process prioritized clarity, accessibility, and streamlined communication across all pages and user touchpoints."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>

          <div style={{ marginTop: "2.5rem" }}>
            <TiltButton
              href="https://www.youlivemarketing.ca/"
              label="Visit Live Website"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>

        {/* ══ Section 3 — Pages ══ */}
        <ProjectImage
          src="/projects/youlive-marketing/Youlivemaketing-pages.jpg"
          alt="YouLiveMarketing website pages — service layout and content structure"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Development & Maintenance" />
          <SectionHeading text="Managing Cross-Functional Collaboration" />
          <BodyText text="The project involved close coordination with external developers throughout implementation, revisions, and troubleshooting to ensure consistency between design intent and final execution." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Website updates, ongoing maintenance, and WordPress content management were independently handled after launch to support long-term usability and operational continuity."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
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
              text="The project established a more organized and accessible digital presence by improving communication clarity, strengthening service visibility, and supporting ongoing website maintenance through a scalable and manageable system."
              color={C_HEAD}
              highlightColor="#000fff"
            />
          </p>
        </div>

        <RelatedProjects currentSlug="youlivemarketing" />

      </div>
    </main>
  );
}
