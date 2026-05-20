"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { projects, categories, type Project } from "@/lib/projects";

// ─── Tab config ───────────────────────────────────────────────────────────────
type TabId = "all" | "brand" | "marketing" | "web";
const TABS: { id: TabId; label: string }[] = [
  { id: "all",       label: "All"               },
  { id: "brand",     label: "Brand Identity"     },
  { id: "marketing", label: "Marketing Design"   },
  { id: "web",       label: "Web Design"         },
];

// ─── Uneven layout for single-category mode (3 cards) ────────────────────────
const LAYOUTS: Record<string, { w: string; h: number }[]> = {
  brand:     [{ w: "44%", h: 440 }, { w: "30%", h: 300 }, { w: "24%", h: 370 }],
  marketing: [{ w: "26%", h: 360 }, { w: "44%", h: 410 }, { w: "28%", h: 295 }],
  web:       [{ w: "32%", h: 308 }, { w: "26%", h: 435 }, { w: "40%", h: 355 }],
};

// ─── Single project card ──────────────────────────────────────────────────────
function Card({
  project,
  height,
  index,
}: {
  project: Project;
  height: number;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.07 }}
    >
      <Link href={`/work/${project.slug}`} className="block">
        <motion.article
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="cursor-pointer"
        >
          {/* Image area */}
          <div
            className="relative w-full overflow-hidden rounded-[2px] mb-5"
            style={{ height }}
          >
            <motion.div
              animate={{
                scale: hovered ? 1.04 : 1,
                backgroundColor: hovered ? "#E2DEDB" : "#ECEAE7",
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 flex items-end p-5"
            >
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(#B8B0A8 1px, transparent 1px), linear-gradient(90deg, #B8B0A8 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <motion.span
                animate={{ opacity: hovered ? 0.4 : 0.75 }}
                className="relative font-poppins text-[9px] tracking-[0.22em] uppercase text-[#8C8680]"
              >
                {project.title}
              </motion.span>
            </motion.div>
          </div>

          {/* Meta */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="font-cormorant font-[400] text-[#333] leading-[1.15] mb-1"
                style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.2rem)" }}
              >
                {project.title}
              </p>
              <p className="font-poppins font-[300] text-[0.73rem] text-[#8C8680] leading-[1.6]">
                {project.description}
              </p>
            </div>
            <motion.span
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
              transition={{ duration: 0.2 }}
              className="font-poppins text-[#8C8680] text-sm flex-shrink-0 pt-0.5"
            >
              →
            </motion.span>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

// ─── "All" grid — 3-column uniform ───────────────────────────────────────────
function AllGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
      {items.map((project, i) => (
        <Card key={project.slug} project={project} height={300} index={i} />
      ))}
    </div>
  );
}

// ─── Single-category uneven row ───────────────────────────────────────────────
function CategoryGrid({ id, items }: { id: string; items: Project[] }) {
  const layout = LAYOUTS[id];
  return (
    <div className="flex items-end gap-4 md:gap-6">
      {items.slice(0, 3).map((project, i) => (
        <div key={project.slug} style={{ width: layout[i].w, flexShrink: 0 }}>
          <Card project={project} height={layout[i].h} index={i} />
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function WorkSection() {
  const [active, setActive] = useState<TabId>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="pt-36 pb-28 px-8 md:px-16 lg:px-24 w-full">
      {/* Heading */}
      <ScrollReveal className="mb-16">
        <p className="font-poppins text-[10px] tracking-[0.32em] uppercase text-[#B8B0A8] mb-5">
          Selected Work
        </p>
        <h2
          className="font-cormorant font-[300] text-[#333] leading-[1.08]"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
        >
          Brand, Marketing
          <br />
          <em>& Web Design</em>
        </h2>
      </ScrollReveal>

      {/* Tabs */}
      <ScrollReveal className="mb-14">
        <div className="flex items-center gap-0 border-b border-[#E0DDD9]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative pb-4 pr-8 font-poppins text-[11px] tracking-[0.14em] uppercase transition-colors duration-300"
              style={{ color: active === tab.id ? "#333" : "#B8B0A8" }}
            >
              {tab.label}
              {active === tab.id && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-8 h-px bg-[#333]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Cards — AnimatePresence handles tab switch */}
      <AnimatePresence mode="wait">
        <motion.div key={active}>
          {active === "all" ? (
            <AllGrid items={filtered} />
          ) : (
            <>
              {categories
                .filter((c) => c.id === active)
                .map((cat) => (
                  <div key={cat.id}>
                    <ScrollReveal className="mb-8 flex items-baseline gap-5 pb-3 border-b border-[#EAE7E4]">
                      <h3 className="font-poppins font-[400] text-[0.8rem] tracking-[0.15em] uppercase text-[#333]">
                        {cat.label}
                      </h3>
                      <span className="font-poppins font-[300] text-[0.7rem] tracking-[0.1em] uppercase text-[#B8B0A8]">
                        {filtered.length} Projects
                      </span>
                    </ScrollReveal>
                    <CategoryGrid id={cat.id} items={filtered} />
                  </div>
                ))}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* View all CTA */}
      <ScrollReveal className="mt-20">
        <Link
          href="/work"
          className="inline-flex items-center gap-3 font-poppins text-[10px] tracking-[0.22em] uppercase text-[#333] border border-[#C8C4C0] px-7 py-4 hover:bg-[#333] hover:text-[#F5F3F1] hover:border-[#333] transition-all duration-300"
        >
          View Full Archive
          <span>→</span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
