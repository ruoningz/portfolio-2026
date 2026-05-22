import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";
import CampaignStats from "@/components/CampaignStats";
import type { StatDef } from "@/components/CampaignStats";
import ProjectVideoWithSound from "@/components/ProjectVideoWithSound";

export const metadata = {
  title: "Latitude — Tiffany Zhang",
};

// ── Style tokens ──────────────────────────────────────────────────────────────
const FONT    = "var(--font-poppins), system-ui, sans-serif";

// ── Stats ─────────────────────────────────────────────────────────────────────
const LAT_STATS: StatDef[] = [
  { value: 21,  decimals: 0, suffix: "M+", label: "Impressions",     delay: 0   },
  { value: 267, decimals: 0, suffix: "K+", label: "Website Clicks",  delay: 200 },
  { value: 800, decimals: 0, suffix: "+",  label: "Leads Generated", delay: 400 },
];
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
export default function LatitudePage() {
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
              text="Latitude"
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
              text="Performance Marketing Campaign for a Luxury Residential Development"
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
              text="Performance-driven multilingual campaign design for a luxury real estate development targeting niche cultural audiences across digital platforms."
              color="#666666"
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Section 1 — Rendering ══ */}
        <ProjectImage
          src="/projects/latitude/Latitude-rendering.jpg"
          alt="Latitude luxury residential development — campaign rendering"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Audience Strategy" />
          <SectionHeading text="Building a Campaign for a Niche Audience" />
          <BodyText text="The campaign targeted two key audience groups: second-generation Chinese professionals and older downsized immigrants seeking more manageable housing options." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="As a Chinese-language campaign running primarily on Meta, the project required careful audience positioning, platform monitoring, and creative adaptation within a more niche advertising environment."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 2 — Designs ══ */}
        <ProjectVideoWithSound
          src="/projects/latitude/Latitude-designs.mp4"
          label="Latitude campaign creative designs — gold-toned luxury visual direction"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Creative Direction" />
          <SectionHeading text="Establishing a Luxury Visual Direction" />
          <BodyText text="The creative direction centered around a refined gold-toned visual palette designed to reinforce a premium and aspirational brand image." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Motion design elements were intentionally kept subtle to maintain a clean and sophisticated aesthetic, while all campaign messaging — including headlines, primary text, and CTAs — was fully adapted for each platform placement."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 3 — Platforms ══ */}
        <ProjectVideoWithSound
          src="/projects/latitude/Latitude-platforms.mp4"
          label="Latitude campaign across Meta, WeChat, and Ming Pao placements"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Multi-Platform Deployment" />
          <SectionHeading text="Designing Across Multiple Platforms" />
          <BodyText text="The campaign was deployed across Google, Meta, WeChat, and Ming Pao to maintain a more cohesive brand presence within both mainstream and Chinese-language media spaces." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="To support platform flexibility and placement optimization, multiple creative formats were developed including static ads, carousel ads, and motion-based video content across varying dimensions and placements."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 4 — A/B Testing ══ */}
        <ProjectImage
          src="/projects/latitude/latitude-abtesting.gif"
          alt="Latitude A/B testing — creative optimization and campaign management"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Optimization" />
          <SectionHeading text="Optimization & Campaign Management" />
          <BodyText text="Creative testing and campaign optimization were continuously monitored throughout launch and maintenance phases." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="A/B testing was conducted to evaluate different visual directions, while in-house creative production allowed for faster iteration and adjustment based on platform performance and audience response."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Due to Meta's housing-related restrictions, additional attention was required around targeting limitations, auditing processes, and delivery performance throughout the campaign lifecycle."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Campaign Stats ══ */}
        <ProjectImage
          src="/projects/latitude/Latitude-graphs.png"
          alt="Latitude campaign performance graphs — impressions, clicks, and leads data"
        />
        <CampaignStats stats={LAT_STATS} />

        {/* ══ Section 5 — Ongoing ══ */}
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Campaign Management" />
          <SectionHeading text="Ongoing Monitoring & Cross-Platform Coordination" />
          <BodyText text="The campaign followed a full lifecycle process including launch, monitoring, optimization, maintenance, and reporting." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Weekly coordination meetings were held with advertising platform representatives during launch phases, transitioning into bi-weekly support during long-term maintenance. Troubleshooting, performance reviews, and platform communication were managed continuously to address issues such as delivery instability, declining CTR, or lead fluctuations."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Post-campaign reporting and ongoing client communication were also handled to support campaign transparency and future optimization planning."
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
              text="The project established a scalable multilingual campaign system that balanced luxury positioning, platform restrictions, and niche audience targeting while maintaining consistent brand communication across multiple advertising channels."
              color={C_HEAD}
              highlightColor="#000fff"
            />
          </p>
        </div>

        <RelatedProjects currentSlug="latitude" />

      </div>
    </main>
  );
}
