"use client";

import { useState } from "react";

const FONT = "var(--font-poppins), system-ui, sans-serif";

export default function DigitalToggle() {
  const [lang, setLang] = useState<"en" | "fr">("en");

  return (
    <div style={{ width: "100%" }}>
      {/* GIF — both images stay mounted to prevent height jitter on switch */}
      <div style={{ width: "100%", background: "#E8E6E2", marginBottom: "1.5rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/lawyers-financial/Digital-EN.gif"
          alt="English digital ad suite"
          style={{ width: "100%", display: lang === "en" ? "block" : "none" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/lawyers-financial/Digital-FR.gif"
          alt="French digital ad suite — Financière des avocates et avocats"
          style={{ width: "100%", display: lang === "fr" ? "block" : "none" }}
        />
      </div>

      {/* Pill segmented control below GIF */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            position:            "relative",
            display:             "inline-grid",
            gridTemplateColumns: "1fr 1fr",
            background:          "#EBEBEB",
            borderRadius:        "9999px",
            padding:             "3px",
            gap:                 0,
          }}
        >
          {/* Sliding pill */}
          <div
            style={{
              position:      "absolute",
              top:           "3px",
              bottom:        "3px",
              left:          lang === "en" ? "3px" : "calc(50% + 0px)",
              width:         "calc(50% - 3px)",
              background:    "#1A1A1A",
              borderRadius:  "9999px",
              transition:    "left 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none",
            }}
          />
          {(["en", "fr"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                position:      "relative",
                zIndex:        1,
                fontFamily:    FONT,
                fontSize:      "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding:       "0.55rem 1.8rem",
                border:        "none",
                background:    "transparent",
                color:         lang === l ? "#FFFFFF" : "#888888",
                cursor:        "pointer",
                borderRadius:  "9999px",
                transition:    "color 0.28s ease",
                lineHeight:    1,
              }}
            >
              {l === "en" ? "English" : "Français"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
