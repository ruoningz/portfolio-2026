"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";

const THUMBNAILS: Record<string, string> = {
  "joyolight":         "/home/thumbnails/Joyo-Catalog-thumbnail.jpg",
  "lawyers-financial": "/home/thumbnails/LawyersFinancial_thumbnail.jpg",
  "kuiper-grow":       "/home/thumbnails/Kuiper-packaging.jpg",
  "latitude":          "/home/thumbnails/Latitude-thumbnail.jpg",
  "1818-alberni":           "/home/thumbnails/1818-thumbnail.jpg",
  "burquitlam-park-district": "/home/thumbnails/BPD-thumbnail.jpg",
  "colivease":         "/projects/colivease/Colivease-prototype-1.gif",
  "youlivemarketing":  "/projects/youlive-marketing/Youlivemarketing-prototype.gif",
  "oyobid":            "/projects/oyobid/OYOBID-website.gif",
};

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const thumb   = THUMBNAILS[project.slug];

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    el.style.transform  = `perspective(700px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
    el.style.transition = "transform 0.06s linear";
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform  = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 0.5s ease";
  };

  return (
    <Link href={`/work/${project.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Thumbnail */}
        <div
          className="relative w-full overflow-hidden rounded-[2px]"
          style={{ paddingBottom: "68%", background: "#ECEAE7" }}
        >
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt={project.title}
              style={{
                position:   "absolute",
                inset:      0,
                width:      "100%",
                height:     "100%",
                objectFit:  "cover",
                display:    "block",
              }}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(#B8B0A8 1px, transparent 1px), linear-gradient(90deg, #B8B0A8 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.2,
              }}
            />
          )}
        </div>

        {/* Meta */}
        <div className="pt-5 pb-2">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-[1rem] font-[500] text-[#333] leading-[1.2]">
              {project.title}
            </h3>
            <span className="text-[#8C8680] text-sm">→</span>
          </div>
          <p className="text-[0.8rem] font-[300] text-[#8C8680] leading-[1.55]">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
