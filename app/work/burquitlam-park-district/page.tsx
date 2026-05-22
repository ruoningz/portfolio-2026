import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";
import CampaignStats from "@/components/CampaignStats";
import ProjectVideoWithSound from "@/components/ProjectVideoWithSound";
import LanguageSlider from "@/components/LanguageSlider";
import type { StatDef } from "@/components/CampaignStats";

export const metadata = {
  title: "Burquitlam Park District — Tiffany Zhang",
};

// ── Style tokens ──────────────────────────────────────────────────────────────
const FONT    = "var(--font-poppins), system-ui, sans-serif";
const C_LABEL = "#AAAAAA";
const C_HEAD  = "#333333";
const C_BODY  = "#555555";
const ACCENT  = "#000fff";

// ── Stats ─────────────────────────────────────────────────────────────────────
const BPD_STATS: StatDef[] = [
  { value: 29,  decimals: 0, suffix: "M+", label: "Impressions",      delay: 0   },
  { value: 550, decimals: 0, suffix: "K+", label: "Website Clicks",   delay: 200 },
  { value: 2,   decimals: 0, suffix: "K+", label: "Leads Generated",  delay: 400 },
];

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
      <FloatingText text={text} color={C_BODY} highlightColor={ACCENT} />
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
export default function BPDPage() {
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
              text="Burquitlam Park District"
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
              text="Integrated Campaign Creative & Performance Marketing"
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
              text="Integrated multilingual campaign systems combining performance marketing, A/B testing, platform optimization, and large-scale print advertising."
              color="#666666"
              highlightColor={ACCENT}
            />
          </p>
        </div>

        {/* Opening image */}
        <ProjectImage
          src="/projects/BPD/BPD-jogging.jpg"
          alt="Burquitlam Park District — campaign lifestyle photography"
        />

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Section 1 — Overlay / Creative Strategy ══ */}
        <ProjectVideoWithSound
          src="/projects/BPD/BPD-overlay.mp4"
          label="Burquitlam Park District — data-driven creative strategy with safe zone overlays"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Creative Strategy" />
          <SectionHeading text="Data-Driven Creative Strategy" />
          <BodyText text="Creative decisions were continuously informed by campaign performance monitoring and platform behavior analysis to maximize engagement and advertising effectiveness." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Layouts were carefully structured around platform-specific safe zones to ensure key messaging remained visible across placements and interface overlays."
              color={C_BODY}
              highlightColor={ACCENT}
            />
          </p>
        </div>

        {/* ══ Section 2 — A/B Testing ══ */}
        <ProjectVideoWithSound
          src="/projects/BPD/BPD-abtesting.mp4"
          label="Burquitlam Park District — A/B testing creative variations"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Testing & Iteration" />
          <SectionHeading text="A/B Testing & Performance Iteration" />
          <BodyText text="Multiple creative directions were tested throughout the campaign to evaluate engagement, click-through performance, and audience response across different placements." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Creative variations explored differences in color treatment, hierarchy, messaging density, and layout composition, allowing campaign decisions to be continuously refined based on performance insights and platform behavior."
              color={C_BODY}
              highlightColor={ACCENT}
            />
          </p>
        </div>

        {/* ══ Section 3 — Platforms ══ */}
        <ProjectVideoWithSound
          src="/projects/BPD/BPD-platforms.mp4"
          label="Burquitlam Park District — multi-platform campaign adaptation"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Platform Adaptation" />
          <SectionHeading text="Optimizing for Platform Behavior" />
          <BodyText text="Campaign assets were adapted across multiple digital platforms with consideration for each platform's unique placement requirements, audience behaviors, and content consumption patterns." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Static, carousel, motion, and multi-format assets were developed to maintain consistency while improving flexibility and delivery performance across campaigns."
              color={C_BODY}
              highlightColor={ACCENT}
            />
          </p>
        </div>

        {/* ══ Section 4 — Language Slider ══ */}
        <LanguageSlider />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Multilingual Campaign" />
          <SectionHeading text="Seamless Creativity Across Languages" />
          <BodyText text="Multilingual campaigns were developed to reach broader audience segments while maintaining a cohesive visual identity system." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Rather than directly translating layouts, each language version was carefully adapted to suit different reading patterns, content density, and communication styles while preserving overall campaign consistency."
              color={C_BODY}
              highlightColor={ACCENT}
            />
          </p>
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Creative variations also explored multiple color directions within the same system to increase platform flexibility and support broader performance testing."
              color={C_BODY}
              highlightColor={ACCENT}
            />
          </p>
        </div>

        {/* ══ Section 5 — Print ══ */}
        <ProjectImage
          src="/projects/BPD/BPD-Print.jpg"
          alt="Burquitlam Park District — large-scale print campaign including transit ads and billboards"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Print & OOH" />
          <SectionHeading text="Extending the Campaign Into Physical Spaces" />
          <BodyText text="The campaign extended beyond digital advertising into large-scale print applications including transit ads, publications, billboards, and high-traffic public placements." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Strong attention to detail was applied throughout production to ensure high-quality output across varying formats, dimensions, and viewing environments. Print specifications, file preparation, and vendor coordination were independently managed throughout execution."
              color={C_BODY}
              highlightColor={ACCENT}
            />
          </p>
        </div>

        {/* ══ Section 6 — Graphs + Stats ══ */}
        <ProjectImage
          src="/projects/BPD/BPD-graphs.png"
          alt="Burquitlam Park District — campaign performance graphs and optimization data"
        />
        <CampaignStats stats={BPD_STATS} />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Performance" />
          <SectionHeading text="Performance & Optimization Impact" />
          <BodyText text="Throughout the campaign, performance was continuously monitored across platforms, and creative decisions were refined based on real-time data feedback and user behavior." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="This optimization process resulted in consistently strong campaign performance, with improvements in key metrics such as impressions, clicks, and lead generation over time."
              color={C_BODY}
              highlightColor={ACCENT}
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
              text="The project established a scalable and adaptable campaign system that integrated multilingual communication, platform-specific optimization, and large-scale physical advertising into a cohesive brand experience across multiple audience touchpoints."
              color={C_HEAD}
              highlightColor={ACCENT}
            />
          </p>
        </div>

        <RelatedProjects currentSlug="burquitlam-park-district" />

      </div>
    </main>
  );
}
