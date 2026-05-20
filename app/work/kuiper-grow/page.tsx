import Link from "next/link";
import FloatingText from "@/components/FloatingText";
import RelatedProjects from "@/components/RelatedProjects";

export const metadata = {
  title: "Kuiper Grow — Tiffany Zhang",
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
export default function KuiperGrowPage() {
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
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{
            fontFamily:    FONT,
            fontSize:      "clamp(2.8rem, 5.5vw, 4.5rem)",
            fontWeight:    700,
            lineHeight:    1.05,
            marginBottom:  "2rem",
            letterSpacing: "-0.01em",
            textAlign:     "center",
          }}>
            <FloatingText
              text="Kuiper Grow"
              color={C_HEAD}
              highlightColor="#000fff"
              fakeBold="1.2px 0 0 currentColor, -1.2px 0 0 currentColor"
            />
          </h1>

          {/* Hero image — sits between title and subtitle */}
          <div style={{ width: "100%", background: "#EDEBE8", marginBottom: "2rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/kuiper-grow/Kuiper-product.jpg"
              alt="Kuiper Grow product — full-spectrum grow lighting system"
              style={{ width: "100%", display: "block" }}
            />
          </div>

          <p style={{
            fontFamily:    FONT,
            fontSize:      "clamp(0.8rem, 1.1vw, 0.95rem)",
            fontWeight:    300,
            letterSpacing: "0.04em",
            marginBottom:  "2rem",
            textAlign:     "center",
          }}>
            <FloatingText
              text="Brand Identity & Product Communication"
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
              text="End-to-end branding and product design for a full-spectrum grow light startup, spanning identity, packaging, web, and technical documentation."
              color="#666666"
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#EBEBEB", marginBottom: "5rem" }} />

        {/* ══ Section 1 — Logo ══ */}
        <ProjectImage
          src="/projects/kuiper-grow/Kuiper-logo-design.jpg"
          alt="Kuiper Grow logo design — K with leaf-inspired form mark"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Brand Identity" />
          <SectionHeading text="Building a Distinct Product Identity" />
          <BodyText text="A complete brand identity was developed from the ground up, including logo design, product visuals, packaging, website, and supporting print materials." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text={`The visual direction centered around simplicity, clarity, and energy. Product designs featured a bold orange accent as a recognizable visual signature, while the logo combined the letter "K" with a leaf-inspired form to reflect growth and sustainability through a minimal and modern approach.`}
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
        </div>

        {/* ══ Section 2 — Instruction Manual ══ */}
        <ProjectImage
          src="/projects/kuiper-grow/Kuiper-Instruction-Manual.gif"
          alt="Kuiper Grow instruction manual — IKEA-style installation guide"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Technical Communication" />
          <SectionHeading text="Designing for Technical Product Communication" />
          <BodyText text="As a technical hardware product requiring self-installation, the communication system focused heavily on clarity and usability." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Installation manuals were designed using a simplified visual approach inspired by IKEA-style instructional systems. Engineering 3D models were translated into clean line illustrations to support assembly guidance and technical communication for both customers and sales teams."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
          <a
            href="https://4219384b-dc77-42fc-b173-6a02fb2c4819.filesusr.com/ugd/785a73_e7154bdc115f47b6a5f5e079affa60e4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
          >
            View Installation Manual →
          </a>
        </div>

        {/* ══ Section 3 — Website ══ */}
        <ProjectImage
          src="/projects/kuiper-grow/Kuiper-website.jpg"
          alt="Kuiper Grow website — product features and specifications"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Web Design" />
          <SectionHeading text="Extending the Brand Into Digital Spaces" />
          <BodyText text="A fully designed website was created to clearly present product features, specifications, downloadable resources, and installation manuals through a clean and functional interface." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="The site focused on simplifying technical information while maintaining consistency with the broader visual identity system."
              color={C_BODY}
              highlightColor="#000fff"
            />
          </p>
          <a
            href="https://tiffanyzrn.wixsite.com/website"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
          >
            Visit Website →
          </a>
        </div>

        {/* ══ Section 4 — Packaging ══ */}
        <ProjectImage
          src="/projects/kuiper-grow/Kuiper-packaging.gif"
          alt="Kuiper Grow packaging — orange sticker system on corrugated boxes"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Packaging" />
          <SectionHeading text="Packaging Within Production Constraints" />
          <BodyText text={`Packaging solutions were developed within a limited startup budget by utilizing single-color printing on existing corrugated boxes. To introduce stronger brand personality and memorability, a bold orange sticker system featuring the phrase "Hello, I'm here!" was created as a more approachable and human-centered interaction point within the unboxing experience.`} />
        </div>

        {/* ══ Section 5 — Print ══ */}
        <ProjectImage
          src="/projects/kuiper-grow/Kuiper-print.jpg"
          alt="Kuiper Grow print materials — brochures, spec sheets, trade show graphics"
        />
        <div style={{ marginBottom: "5rem" }}>
          <SectionLabel text="Print Design" />
          <SectionHeading text="Supporting Print & Production Systems" />
          <BodyText text="Additional print materials including brochures, specification sheets, and trade show graphics were designed to maintain consistency across customer-facing touchpoints." />
          <p style={{ fontFamily: FONT, fontSize: "0.88rem", fontWeight: 300, lineHeight: 2.1, marginTop: "1.4rem" }}>
            <FloatingText
              text="Print production, specialty finishes, and sizing coordination were independently managed through direct communication with vendors to ensure accuracy and quality throughout final production."
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
              text="The project established a cohesive and recognizable visual identity for a growing startup brand while translating complex technical products into more approachable and accessible customer experiences across digital, print, and physical touchpoints."
              color={C_HEAD}
              highlightColor="#000fff"
            />
          </p>
        </div>

        <RelatedProjects currentSlug="kuiper-grow" />

      </div>
    </main>
  );
}
