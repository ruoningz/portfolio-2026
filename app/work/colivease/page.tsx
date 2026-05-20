import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";

export const metadata = {
  title: "Colivease — Tiffany Zhang",
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
export default function ColiveasePage() {
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
              text="Colivease"
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
              text="UI Design for a Shared Living Platform"
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
              text="UI design exploration for a youth-focused co-living platform built around clean layouts and playful 3D visual systems."
              color="#666666"
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Section 1 — Logo ══ */}
        <ProjectImage
          src="/projects/colivease/Colivease-logo.jpg"
          alt="Colivease logo and 3D illustration system"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Visual Direction" />
          <SectionHeading text="Building a Visual Language Around 3D Illustration" />
          <BodyText text="The project began with an existing set of 3D illustrations provided by the client. The challenge was to translate these assets into a cohesive interface system while maintaining a clean layout structure and a more youthful visual tone." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The visual direction focused on balancing personality and usability through simplified layouts, soft color usage, and consistent spacing systems."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 2 — Characters ══ */}
        <ProjectImage
          src="/projects/colivease/characters.jpg"
          alt="Colivease character illustrations — community-oriented design"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Audience & Tone" />
          <SectionHeading text="Designing for a Younger Audience" />
          <BodyText text="As a platform targeting younger users and shared living communities, the interface prioritized approachability, clarity, and ease of navigation." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="UI components were designed to feel lightweight and accessible while supporting a more friendly and community-oriented product experience."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 3 — Prototype 1 ══ */}
        <ProjectImage
          src="/projects/colivease/Colivease-prototype-1.gif"
          alt="Colivease UI system — typography, color, and interaction patterns"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="UI System" />
          <SectionHeading text="Creating Consistency Across the Interface System" />
          <BodyText text="A consistent UI system was developed to unify typography, color usage, spacing, and interaction patterns across the platform." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Special attention was given to maintaining visual cohesion between the 3D illustrations and the surrounding interface elements to avoid visual imbalance or distraction."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 4 — Home ══ */}
        <ProjectImage
          src="/projects/colivease/Colivease-home.gif"
          alt="Colivease home screen — navigation and content hierarchy"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="UX Design" />
          <SectionHeading text="Simplifying the User Experience" />
          <BodyText text="The interface structure focused on reducing visual clutter and improving content hierarchy through clearer navigation, modular layouts, and simplified interaction flows." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The overall experience aimed to feel intuitive and visually engaging without overwhelming users with unnecessary complexity."
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
              text="The project established a cohesive and youthful visual interface system that balanced playful brand elements with clean and accessible user experience principles."
              color={C_HEAD}
              highlightColor="#000fff"
            />
          </p>
        </div>

        <RelatedProjects currentSlug="colivease" />

      </div>
    </main>
  );
}
