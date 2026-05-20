"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const FONT = "var(--font-poppins), system-ui, sans-serif";

interface Props {
  src:   string;
  label: string;
}

export default function ProjectVideoWithSound({ src, label }: Props) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const soundRef   = useRef(false);
  const fadeRafRef = useRef(0);
  const [soundOn, setSoundOn] = useState(false);

  // Smooth fade to a target volume over `duration` ms
  const fadeTo = useCallback((target: number, duration: number) => {
    cancelAnimationFrame(fadeRafRef.current);
    const video = videoRef.current;
    if (!video) return;
    const startVol = video.volume;
    if (startVol === target) return;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const t   = Math.min((now - startTime) / duration, 1);
      const vol = startVol + (target - startVol) * t;
      video.volume = Math.max(0, Math.min(1, vol));
      video.muted  = video.volume < 0.01;
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(tick);
      }
    };
    fadeRafRef.current = requestAnimationFrame(tick);
  }, []);

  // IntersectionObserver: fade out when video leaves viewport, restore when it returns
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!soundRef.current) return;
        if (entry.isIntersecting) {
          fadeTo(1, 600);
        } else {
          fadeTo(0, 1400);
        }
      },
      { threshold: 0 }
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(fadeRafRef.current);
    };
  }, [fadeTo]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (soundOn) {
      cancelAnimationFrame(fadeRafRef.current);
      video.muted  = true;
      video.volume = 1;
      soundRef.current = false;
      setSoundOn(false);
    } else {
      video.muted  = false;
      video.volume = 1;
      soundRef.current = true;
      setSoundOn(true);
    }
  };

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ width: "100%", background: "#EDEBE8" }}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          aria-label={label}
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Sound toggle — vertical stack */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem", marginTop: "1.5rem" }}>
        {/* Pill track */}
        <button
          onClick={toggleSound}
          data-cursor-mute={soundOn ? "mute" : "unmute"}
          aria-label={soundOn ? "Mute video" : "Unmute video"}
          style={{
            position:     "relative",
            width:        "2.6rem",
            height:       "1.4rem",
            borderRadius: "9999px",
            background:   soundOn ? "#333333" : "#DDDDDD",
            border:       "none",
            padding:      0,
            flexShrink:   0,
            transition:   "background 0.3s ease",
          }}
        >
          {/* Thumb */}
          <span style={{
            position:     "absolute",
            top:          "50%",
            left:         soundOn ? "calc(100% - 1.225rem)" : "0.175rem",
            transform:    "translateY(-50%)",
            width:        "1.05rem",
            height:       "1.05rem",
            borderRadius: "50%",
            background:   "#FFFFFF",
            boxShadow:    "0 1px 3px rgba(0,0,0,0.25)",
            transition:   "left 0.3s cubic-bezier(0.34, 1.4, 0.64, 1)",
            display:      "block",
          }} />
        </button>

        <span style={{
          fontFamily:    FONT,
          fontSize:      "0.44rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         soundOn ? "#555555" : "#BBBBBB",
          transition:    "color 0.3s ease",
          userSelect:    "none",
        }}>
          {soundOn ? "Sound On" : "Sound Off"}
        </span>
      </div>
    </div>
  );
}
