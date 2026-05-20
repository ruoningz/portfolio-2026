"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        zIndex: 10,
        height: "100vh",
        scrollSnapAlign: "start",
        // Solid left half, dissolves to transparent on right so the glass disc shows through
        background:
          "linear-gradient(to right, #F5F3F1 0%, #F5F3F1 50%, rgba(245,243,241,0.72) 65%, rgba(245,243,241,0.18) 82%, transparent 100%)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Text — left half only */}
      <motion.div
        style={{ y: textY }}
        className="px-8 md:px-16 lg:px-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="font-poppins text-[10px] tracking-[0.32em] uppercase text-[#B8B0A8] mb-8">
          Practice
        </p>

        <h2
          className="font-cormorant font-[300] italic text-[#333] leading-[1.12] max-w-[520px]"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}
        >
          Design that makes
          <br />
          the complex feel&nbsp;obvious.
        </h2>

        <div className="mt-10 w-10 h-px bg-[#C4BDB7]" />

        <p
          className="font-poppins font-[300] text-[#8C8680] leading-[1.8] mt-8 max-w-[360px]"
          style={{ fontSize: "clamp(0.78rem, 1vw, 0.88rem)" }}
        >
          Research-led brand and digital work, built for clarity,
          intent, and cross-platform consistency.
        </p>
      </motion.div>
    </section>
  );
}
