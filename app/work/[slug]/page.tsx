import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.title} — Tiffany Zhang` };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const categoryLabel: Record<string, string> = {
    brand: "Brand Identity",
    marketing: "Marketing Design",
    web: "Web Design",
  };

  return (
    <main className="min-h-screen pt-36 pb-32 px-8 md:px-16 lg:px-24 flex flex-col" style={{ position: "relative", zIndex: 10 }}>
      {/* Back */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#B8B0A8] hover:text-[#333] transition-colors duration-300 mb-20"
      >
        <span>←</span>
        <span>Back to Work</span>
      </Link>

      {/* Project header */}
      <div className="max-w-[640px] mb-20">
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#B8B0A8] mb-5 font-[400]">
          {categoryLabel[project.category]}
        </p>
        <h1
          className="font-[300] text-[#333] leading-[1.08] mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          {project.title}
        </h1>
        <p className="text-[1rem] font-[300] text-[#8C8680] leading-[1.65]">
          {project.description}
        </p>
      </div>

      {/* Placeholder state */}
      <div
        className="flex-1 rounded-[2px] flex flex-col items-center justify-center py-32 gap-6"
        style={{ backgroundColor: "#EDEBE8", minHeight: "480px" }}
      >
        <div className="w-8 h-px bg-[#B8B0A8]" />
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#B8B0A8] text-center font-[400]">
          Case study in progress
        </p>
        <p className="text-[0.8rem] font-[300] text-[#B8B0A8] text-center max-w-[280px] leading-[1.65]">
          This project will be expanded into a full case study documenting
          process, decisions, and outcomes.
        </p>
        <div className="w-8 h-px bg-[#B8B0A8]" />
      </div>
    </main>
  );
}
