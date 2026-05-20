"use client";

import { useEffect, useRef, useState } from "react";

const FONT = "var(--font-poppins), system-ui, sans-serif";

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3.5);
}

export interface StatDef {
  value:    number;
  decimals: number;
  suffix:   string;
  label:    string;
  delay:    number;
}

const DEFAULT_STATS: StatDef[] = [
  { value: 21.4, decimals: 1, suffix: "M",  label: "Impressions",    delay: 0   },
  { value: 267.1,decimals: 1, suffix: "K",  label: "Website Clicks", delay: 200 },
  { value: 856,  decimals: 0, suffix: "",   label: "Leads Generated", delay: 400 },
];

function Counter({ stat, triggered }: { stat: StatDef; triggered: boolean }) {
  const [display, setDisplay] = useState(stat.decimals > 0 ? "0.0" : "0");
  const rafRef   = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!triggered) return;
    const duration = 2800;

    timerRef.current = setTimeout(() => {
      let start: number | null = null;

      const tick = (now: number) => {
        if (start === null) start = now;
        const elapsed = now - start;
        const rawT  = Math.min(elapsed / duration, 1);
        const eased = easeOut(rawT);
        const cur   = eased * stat.value;

        setDisplay(stat.decimals > 0 ? cur.toFixed(stat.decimals) : Math.floor(cur).toString());

        if (rawT < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(stat.decimals > 0 ? stat.value.toFixed(stat.decimals) : stat.value.toString());
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, stat.delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, stat]);

  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <p style={{
        fontFamily:    "var(--font-baskerville), Georgia, serif",
        fontStyle:     "italic",
        fontSize:      "clamp(2.6rem, 4.5vw, 3.8rem)",
        fontWeight:    700,
        letterSpacing: "-0.02em",
        color:         "#2a2a2a",
        lineHeight:    1,
        marginBottom:  "0.7rem",
      }}>
        {display}{stat.suffix}
      </p>
      <p style={{
        fontFamily:    FONT,
        fontSize:      "0.5rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color:         "#AAAAAA",
      }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function CampaignStats({ stats = DEFAULT_STATS }: { stats?: StatDef[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display:      "flex",
        alignItems:   "flex-start",
        gap:          "1rem",
        padding:      "3.5rem 0",
        borderTop:    "1px solid #EBEBEB",
        borderBottom: "1px solid #EBEBEB",
        marginBottom: "5rem",
      }}
    >
      {stats.map((s) => (
        <Counter key={s.label} stat={s} triggered={triggered} />
      ))}
    </div>
  );
}
