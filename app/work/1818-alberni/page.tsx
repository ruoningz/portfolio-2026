import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";
import CampaignSlider from "@/components/CampaignSlider";
import ProjectVideoWithSound from "@/components/ProjectVideoWithSound";

export const metadata = {
  title: "1818 Alberni — Tiffany Zhang",
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
export default function AlberniPage() {
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
              text="1818 Alberni"
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
              text="Luxury Real Estate Campaign Creative & Performance Marketing"
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
              text="Long-term luxury campaign creative focused on maintaining audience engagement through controlled visual evolution and premium positioning."
              color="#666666"
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Section 1 — Rendering ══ */}
        <ProjectImage
          src="/projects/1818/1818-rendering.jpg"
          alt="1818 Alberni luxury penthouse development — campaign rendering"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Campaign Strategy" />
          <SectionHeading text="Sustaining a Long-Term Luxury Campaign" />
          <BodyText text="As an ongoing luxury real estate campaign, the key challenge was maintaining audience engagement over time while avoiding visual fatigue." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The creative approach focused on evolving visuals within a consistent luxury identity system, ensuring freshness without losing brand recognition."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 2 — Design ══ */}
        <ProjectImage
          src="/projects/1818/1818-design.png"
          alt="1818 Alberni campaign design — minimal layouts and cinematic imagery"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Visual Direction" />
          <SectionHeading text="Designing for Premium Positioning" />
          <BodyText text="The campaign used minimal layouts, cinematic imagery, and restrained motion to reinforce a high-end residential tone across all placements, maintaining clarity, elegance, and strong visual impact for luxury audiences." />
        </div>

        {/* ══ Campaign Slider ══ */}
        <CampaignSlider />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Creative Evolution" />
          <SectionHeading text="Controlled Creative Evolution" />
          <BodyText text="Multiple creative variations were developed within the same brand system to maintain freshness across long-term exposure." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Instead of changing the identity, the focus was on subtle shifts in layout, imagery, and composition to prevent audience fatigue while preserving consistency."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 4 — Clients ══ */}
        <ProjectImage
          src="/projects/1818/Clients.gif"
          alt="1818 Alberni — iterative client review process"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Client Process" />
          <SectionHeading text="Iterative Client Review Process" />
          <BodyText text="Each campaign asset went through structured client feedback cycles prior to launch. Revisions were made based on direction and requirements from the client, allowing each iteration to progressively refine the creative output." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="This ongoing feedback loop improved alignment throughout the production process and ensured that final deliverables met both brand expectations and campaign objectives efficiently."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 5 — Platforms ══ */}
        <ProjectVideoWithSound
          src="/projects/1818/1818-platforms.mp4"
          label="1818 Alberni campaign across Meta, Google, and other digital platforms"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Multi-Platform" />
          <SectionHeading text="Multi-Platform Campaign Adaptation" />
          <BodyText text="Assets were adapted across Meta, Google, and other digital platforms, including static, carousel, and motion formats to ensure consistent performance across placements." />
        </div>

        {/* ══ Section 6 — Graphs ══ */}
        <ProjectImage
          src="/projects/1818/1818-graphs.png"
          alt="1818 Alberni campaign performance data and optimization graphs"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Optimization" />
          <SectionHeading text="Optimization & Campaign Management" />
          <BodyText text="Campaign performance was continuously monitored through ongoing collaboration with Meta and Google, including troubleshooting, optimization, and creative adjustments during both launch and maintenance phases." />
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
              text="The project established a scalable luxury campaign system that maintained long-term engagement through controlled creative evolution while preserving a consistent premium brand presence."
              color={C_HEAD}
              highlightColor="#000fff"
            />
          </p>
        </div>

        <RelatedProjects currentSlug="1818-alberni" />

      </div>
    </main>
  );
}
