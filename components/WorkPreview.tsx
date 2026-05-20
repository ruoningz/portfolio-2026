"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { categories } from "@/lib/projects";

const categoryMeta: Record<
  string,
  { accent: string; tagline: string }
> = {
  brand: {
    accent: "#D4CFC9",
    tagline: "Visual systems · Identity · Naming",
  },
  marketing: {
    accent: "#C9D0D4",
    tagline: "Campaign · Collateral · Social",
  },
  web: {
    accent: "#CDD4CE",
    tagline: "Web · Digital · Interaction",
  },
};

export default function WorkPreview() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-32">
      <ScrollReveal className="mb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8B0A8] mb-4">
          Selected Work
        </p>
        <h2
          className="font-[300] text-[#333] leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Three disciplines,
          <br />
          one design language.
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {categories.map((cat, i) => {
          const meta = categoryMeta[cat.id];
          return (
            <ScrollReveal key={cat.id} delay={i * 0.1}>
              <CategoryCard
                id={cat.id}
                label={cat.label}
                descriptor={cat.descriptor}
                tagline={meta.tagline}
                accent={meta.accent}
              />
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

function CategoryCard({
  id,
  label,
  descriptor,
  tagline,
  accent,
}: {
  id: string;
  label: string;
  descriptor: string;
  tagline: string;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work#${id}`} className="block">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          scale: hovered ? 1.03 : 1,
          boxShadow: hovered
            ? "0 20px 48px rgba(51,51,51,0.08)"
            : "0 2px 8px rgba(51,51,51,0.04)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className="relative overflow-hidden rounded-sm p-8 cursor-pointer"
        style={{ backgroundColor: "#EDEBE8" }}
      >
        {/* Thumbnail placeholder */}
        <motion.div
          className="w-full mb-7 rounded-[2px] overflow-hidden"
          style={{ paddingBottom: "62%", position: "relative" }}
        >
          <motion.div
            animate={{
              backgroundColor: hovered ? accent : "#E0DDD9",
              scale: hovered ? 1.04 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-[400]"
              style={{ color: "#8C8680", opacity: hovered ? 0.6 : 1 }}
            >
              Featured
            </span>
          </motion.div>
        </motion.div>

        {/* Tag */}
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#B8B0A8] mb-3 font-[400]">
          {tagline}
        </p>

        {/* Title */}
        <h3 className="text-[1.15rem] font-[400] text-[#333] mb-2 leading-[1.2]">
          {label}
        </h3>

        {/* Descriptor */}
        <p className="text-[0.82rem] font-[300] text-[#8C8680] leading-[1.6]">
          {descriptor}
        </p>

        {/* Hover arrow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex items-center gap-2"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#333] font-[400]">
            View Work
          </span>
          <span className="text-[#333]">→</span>
        </motion.div>
      </motion.div>
    </Link>
  );
}
