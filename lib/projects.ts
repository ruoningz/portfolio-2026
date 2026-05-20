export type Project = {
  slug: string;
  title: string;
  description: string;
  category: "brand" | "marketing" | "web";
  placeholder?: boolean;
};

export type Category = {
  id: "brand" | "marketing" | "web";
  label: string;
  descriptor: string;
};

export const categories: Category[] = [
  {
    id: "marketing",
    label: "Marketing Design",
    descriptor: "Campaign and collateral design that converts attention into intent.",
  },
  {
    id: "brand",
    label: "Brand System",
    descriptor: "Visual systems that define how a brand lives across every surface.",
  },
  {
    id: "web",
    label: "Web Design",
    descriptor: "Digital experiences built for clarity, usability, and consistency.",
  },
];

export const projects: Project[] = [
  // Brand Identity
  {
    slug: "joyolight",
    title: "Joyolight",
    description: "Building a cohesive B2B lighting brand through catalog design, web design, product photography, and marketing materials.",
    category: "brand",
  },
  {
    slug: "lawyers-financial",
    title: "Lawyers Financial",
    description: "Corporate marketing and brand communication design for a Toronto-based non-profit organization across digital and print platforms.",
    category: "brand",
  },
  {
    slug: "kuiper-grow",
    title: "Kuiper Grow",
    description: "End-to-end branding and product design for a full-spectrum grow light startup, spanning identity, packaging, web, and technical documentation.",
    category: "brand",
  },

  // Marketing Design
  {
    slug: "latitude",
    title: "Latitude",
    description: "Performance-driven multilingual campaign design for a luxury real estate development targeting niche cultural audiences across digital platforms.",
    category: "marketing",
  },
  {
    slug: "1818-alberni",
    title: "1818 Alberni",
    description: "Long-term luxury campaign creative focused on maintaining audience engagement through controlled visual evolution and premium positioning.",
    category: "marketing",
  },
  {
    slug: "burquitlam-park-district",
    title: "Burquitlam Park District",
    description: "Integrated multilingual campaign systems combining performance marketing, A/B testing, platform optimization, and large-scale print advertising.",
    category: "marketing",
  },

  // Web Design
  {
    slug: "colivease",
    title: "Colivease",
    description: "UI design exploration for a youth-focused co-living platform built around clean layouts and playful 3D visual systems.",
    category: "web",
  },
  {
    slug: "youlivemarketing",
    title: "Youlivemarketing",
    description: "Website redesign and ongoing digital maintenance for a marketing agency, focused on clarity, SEO, and scalable content structure.",
    category: "web",
  },
  {
    slug: "oyobid",
    title: "OYOBID",
    description: "UX/UI design for a dual-sided bidding platform focused on simplifying complex user flows through structured systems and scalable interfaces.",
    category: "web",
  },
];

export function getProjectsByCategory(categoryId: Category["id"]) {
  return projects.filter((p) => p.category === categoryId);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
