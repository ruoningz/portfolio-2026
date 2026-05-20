import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";

export const metadata = {
  title: "OYOBID — Tiffany Zhang",
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
export default function OyobidPage() {
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
              text="OYOBID"
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
              text="UX/UI Design for a Dual-Sided Bidding Platform"
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
              text="UX/UI design for a dual-sided bidding platform focused on simplifying complex user flows through structured systems and scalable interfaces."
              color="#666666"
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Figma prototype embed ══ */}
        <div style={{ width: "100%", marginBottom: "5rem", background: "#EDEBE8" }}>
          <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
            <iframe
              style={{
                position: "absolute",
                top:      0,
                left:     0,
                width:    "100%",
                height:   "100%",
                border:   "1px solid rgba(0,0,0,0.1)",
              }}
              src="https://embed.figma.com/proto/Nex6l0OYhldUV6YCF4JmGw/OYOBID---Prototype?node-id=10-380&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=168%3A2131&embed-host=share"
              allowFullScreen
            />
          </div>
        </div>

        {/* ══ Section 1 — Overview (text-only) ══ */}
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Platform Design" />
          <SectionHeading text="Designing for Two Distinct User Groups" />
          <BodyText text="OYOBID was designed as a dual-sided platform similar to marketplaces like Airbnb, where different user groups interact through separate but interconnected workflows." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The platform required distinct experiences for buyers and sellers, each with different goals, actions, and communication needs throughout the bidding process."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 2 — Wireframes ══ */}
        <ProjectImage
          src="/projects/oyobid/OYOBID-Wireframes.jpg"
          alt="OYOBID wireframes — user flows and site maps"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="UX Research" />
          <SectionHeading text="Structuring Complex User Flows" />
          <BodyText text="The project began with detailed user persona development and workflow mapping to better understand user motivations, platform behaviors, and interaction pain points across both sides of the marketplace." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Site maps and user flows were then created to organize complex platform functionality into clearer and more intuitive journeys."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 3 — Design System ══ */}
        <ProjectImage
          src="/projects/oyobid/Design-system.jpg"
          alt="OYOBID design system — UI components and visual direction"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Design System" />
          <SectionHeading text="Aligning Early Through Design Systems" />
          <BodyText text="Before moving into high-fidelity design, a UI system preview was developed to establish visual direction, interaction patterns, and component consistency early in the process." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="This helped streamline stakeholder communication, reduce unnecessary revisions, and create stronger alignment before wireframes and prototypes were finalized."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 4 — Bidding Experience ══ */}
        <ProjectImage
          src="/projects/oyobid/bidding-experience.png"
          alt="OYOBID bidding experience — dashboard and messaging flows"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Interface Design" />
          <SectionHeading text="Simplifying the Bidding Experience" />
          <BodyText text="The interface was designed to simplify a complex bidding workflow through clearer hierarchy, structured actions, and streamlined communication between users." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Special attention was given to reducing cognitive load across dashboards, messaging flows, and bidding interactions while maintaining consistency across both user experiences."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 5 — Prototype ══ */}
        <ProjectImage
          src="/projects/oyobid/OYOBID-website.gif"
          alt="OYOBID prototype — interactive navigation and user flows"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Prototyping" />
          <SectionHeading text="Prototyping User Interactions" />
          <BodyText text="Interactive prototypes were developed to test navigation flow, communication patterns, and platform usability across multiple user scenarios before development." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The prototyping process helped refine interaction details and improve clarity throughout the user journey."
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
              text="The project established a scalable UX/UI framework for a complex dual-sided platform by simplifying communication workflows, improving task clarity, and creating a more structured user experience across multiple interaction points."
              color={C_HEAD}
              highlightColor="#000fff"
            />
          </p>
        </div>

        <RelatedProjects currentSlug="oyobid" />

      </div>
    </main>
  );
}
