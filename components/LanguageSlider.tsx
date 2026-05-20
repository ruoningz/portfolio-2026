"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const FONT = "var(--font-poppins), system-ui, sans-serif";

interface Slide { label: string; lang: string; src: string }

const SLIDES: Slide[] = [
  { label: "English",  lang: "EN", src: "/projects/BPD/BPD-language-1-English.jpg"  },
  { label: "中文",      lang: "ZH", src: "/projects/BPD/BPD-language-2-Chinese.jpg"  },
  { label: "한국어",    lang: "KO", src: "/projects/BPD/BPD-language-3-Korean.jpg"   },
  { label: "فارسی",    lang: "FA", src: "/projects/BPD/BPD-language-4-Persian.jpg"  },
];

const AUTO_INTERVAL = 4000;
const N = SLIDES.length;

export default function LanguageSlider() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % N);
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleDotClick = (idx: number) => {
    setActive(idx);
    startTimer();
  };

  const indicatorPct = (active / (N - 1)) * 100;

  return (
    <div style={{ marginBottom: "2.5rem" }}>

      {/* Image crossfade stack */}
      <div style={{
        position:    "relative",
        width:       "100%",
        background:  "#F7F7F7",
        aspectRatio: "16 / 9",
        overflow:    "hidden",
      }}>
        {SLIDES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={s.src}
            alt={s.label}
            style={{
              position:   "absolute",
              inset:      0,
              width:      "100%",
              height:     "100%",
              objectFit:  "contain",
              opacity:    i === active ? 1 : 0,
              transition: "opacity 0.85s ease",
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div style={{ padding: "1.8rem 0 0" }}>

        {/* Active language label */}
        <p style={{
          fontFamily:    FONT,
          fontSize:      "0.48rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "#AAAAAA",
          textAlign:     "center",
          marginBottom:  "1.5rem",
        }}>
          {SLIDES[active].label}
        </p>

        {/* Track + dots */}
        <div style={{ position: "relative", height: "24px", margin: "0 1.5rem" }}>

          {/* Track line */}
          <div style={{
            position:   "absolute",
            top:        "50%",
            left:       0,
            right:      0,
            height:     "1px",
            background: "#DDDDDD",
            transform:  "translateY(-50%)",
          }} />

          {/* Sliding ring indicator */}
          <div style={{
            position:      "absolute",
            top:           "50%",
            left:          `${indicatorPct}%`,
            transform:     "translate(-50%, -50%)",
            width:         "18px",
            height:        "18px",
            borderRadius:  "50%",
            border:        "1px solid #666666",
            pointerEvents: "none",
            zIndex:        1,
            transition:    "left 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }} />

          {/* Dots */}
          {SLIDES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={s.label}
                style={{
                  position:       "absolute",
                  top:            "50%",
                  left:           `${(i / (N - 1)) * 100}%`,
                  transform:      "translate(-50%, -50%)",
                  width:          `calc(100% / ${N - 1})`,
                  height:         "40px",
                  borderRadius:   0,
                  background:     "transparent",
                  border:         "none",
                  padding:        0,
                  cursor:         "none",
                  zIndex:         2,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                }}
              >
                <span style={{
                  display:      "block",
                  width:        isActive ? "9px" : "5px",
                  height:       isActive ? "9px" : "5px",
                  borderRadius: "50%",
                  background:   isActive ? "#333333" : "#CCCCCC",
                  transition:   "width 0.6s cubic-bezier(0.34, 1.4, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.4s ease",
                }} />
              </button>
            );
          })}
        </div>

        {/* Language name labels */}
        <div style={{ position: "relative", height: "1.5rem", margin: "0.5rem 1.5rem 0" }}>
          {SLIDES.map((s, i) => (
            <span
              key={s.lang}
              style={{
                position:      "absolute",
                left:          `${(i / (N - 1)) * 100}%`,
                transform:     "translateX(-50%)",
                fontFamily:    FONT,
                fontSize:      "0.46rem",
                letterSpacing: "0.08em",
                color:         i === active ? "#333333" : "#BBBBBB",
                transition:    "color 0.5s ease",
                whiteSpace:    "nowrap",
              }}
            >
              {s.label}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
