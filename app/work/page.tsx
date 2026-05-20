import { categories, getProjectsByCategory } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Work — Tiffany Zhang",
};

export default function WorkPage() {
  return (
    <main className="pt-32 pb-32 px-8 md:px-16 lg:px-24" style={{ position: "relative", zIndex: 10 }}>
      {/* Page header */}
      <ScrollReveal className="mb-24">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8B0A8] mb-5">
          Selected Work
        </p>
        <h1
          className="text-[#333] leading-[1.05]"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontFamily: "var(--font-baskerville), Georgia, serif", fontStyle: "italic", fontWeight: 700 }}
        >
          Brand
          <br />Marketing
          <br /><span style={{ fontStyle: "normal", display: "inline-block", transform: "skewX(-12deg)" }}>&amp;</span> Web Design
        </h1>
      </ScrollReveal>

      {/* Category sections */}
      {categories.map((cat, catIndex) => {
        const projects = getProjectsByCategory(cat.id);
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={catIndex < categories.length - 1 ? "mb-28" : ""}
          >
            {/* Category header */}
            <ScrollReveal className="mb-10 pb-4 border-b border-[#E0DDD9]">
              <div className="flex items-baseline gap-6">
                <h2 className="text-[1.1rem] font-[500] text-[#333] tracking-[0.04em]">
                  {cat.label}
                </h2>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#B8B0A8] font-[300]">
                  {projects.length} selected projects
                </span>
              </div>
            </ScrollReveal>

            {/* Project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {projects.map((project, i) => (
                <ScrollReveal key={project.slug} delay={i * 0.08}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
