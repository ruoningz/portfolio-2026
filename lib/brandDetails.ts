export type ColorSwatch = {
  hex: string;
  name: string;
};

export type GalleryCard = {
  src: string;
  alt: string;
  caption: string;
  placeholderBg: string;
};

export type BrandProjectDetail = {
  slug: string;
  year: string;
  role: string;
  tagline: string;
  overview: string;
  approach?: string;
  deliverables: string[];
  colors: ColorSwatch[];
  gallery: GalleryCard[];
};

export const brandDetails: BrandProjectDetail[] = [
  // ─── Hugsmart ────────────────────────────────────────────────────────────────
  {
    slug: "hugsmart",
    year: "2024",
    role: "Logo Design",
    tagline: "A mark built for connection — warm, playful, and unmistakably pet-first.",
    overview:
      "Hugsmart came to the project with a clear brief: design a logo that could anchor a tech-enabled pet care brand without feeling cold or clinical. The challenge was balancing geometric precision with organic warmth — a mark that reads clearly across app icons, packaging, and physical signage alike.",
    deliverables: [
      "Primary logo",
      "Horizontal & stacked lockups",
      "App icon / monogram",
      "Brand colour system",
      "Typography pairing",
      "Usage guidelines",
    ],
    colors: [
      { hex: "#E8784A", name: "Hugsmart Coral" },
      { hex: "#1A2B3C", name: "Deep Navy" },
      { hex: "#F7F2EC", name: "Warm Off-White" },
      { hex: "#9BA8B0", name: "Mist Grey" },
    ],
    gallery: [
      { src: "/projects/hugsmart/01.jpg", alt: "Primary Logo", caption: "Primary mark — geometric precision meets organic warmth", placeholderBg: "#D4835A" },
      { src: "/projects/hugsmart/02.jpg", alt: "Colour Variations", caption: "Colour system — coral, deep navy, and monotone adaptations", placeholderBg: "#1A2B3C" },
      { src: "/projects/hugsmart/03.jpg", alt: "App Icon", caption: "App icon — readable at 16px, expressive at 512px", placeholderBg: "#E87848" },
      { src: "/projects/hugsmart/04.jpg", alt: "Brand Mockup", caption: "Applied — packaging and digital surfaces in context", placeholderBg: "#C4B0A0" },
      { src: "/projects/hugsmart/05.jpg", alt: "Type Pairing", caption: "Type pairing — supporting the mark without competing", placeholderBg: "#9BA8B0" },
    ],
  },

  // ─── Joyolight ───────────────────────────────────────────────────────────────
  {
    slug: "joyolight",
    year: "2024",
    role: "Brand Identity Uplift · Collateral Design",
    tagline: "Bringing coherence to a brand that was ready to grow.",
    overview:
      "Joyolight already had a logo they loved — what they needed was a visual language strong enough to carry it forward. The project focused on building a consistent brand system around the existing mark: refined typography, an extended colour palette, and a suite of marketing and product materials that felt premium and on-message.",
    approach:
      "Deliverables spanned both print and digital: packaging, social media templates, product cards, and trade show materials — all built from a single, flexible design system designed to scale.",
    deliverables: [
      "Brand guidelines document",
      "Typography system",
      "Extended colour palette",
      "Packaging design",
      "Social media templates",
      "Product cards",
      "Trade show materials",
      "Print collateral",
    ],
    colors: [
      { hex: "#C4A067", name: "Warm Amber" },
      { hex: "#2A2A2A", name: "Near Black" },
      { hex: "#F5F4F0", name: "Linen" },
      { hex: "#7B9EAE", name: "Sky" },
    ],
    gallery: [
      { src: "/projects/joyolight/01.jpg", alt: "Brand Overview", caption: "Brand overview — coherence built around the existing mark", placeholderBg: "#C4A067" },
      { src: "/projects/joyolight/02.jpg", alt: "Packaging", caption: "Packaging — premium materiality, sustainable finish", placeholderBg: "#2A2A2A" },
      { src: "/projects/joyolight/03.jpg", alt: "Social Templates", caption: "Social media suite — 12 adaptable template formats", placeholderBg: "#7B9EAE" },
      { src: "/projects/joyolight/04.jpg", alt: "Product Cards", caption: "Product collateral — consistent across all SKUs", placeholderBg: "#D4C4A0" },
      { src: "/projects/joyolight/05.jpg", alt: "Trade Show", caption: "Trade show display — 2.4 × 3.2m modular system", placeholderBg: "#9EB8C0" },
    ],
  },

  // ─── Lawyers Financial ───────────────────────────────────────────────────────
  // Note: this project has a dedicated page at /work/lawyers-financial
  // The modal is not used for this entry.
  {
    slug: "lawyers-financial",
    year: "2024",
    role: "Corporate Marketing & Brand Communications",
    tagline: "Cohesive communications built to scale within an established identity system.",
    overview:
      "Supporting a Toronto-based non-profit organization through cohesive digital and print communications aligned with an established corporate identity system.",
    deliverables: [
      "Print brochures",
      "Digital display advertising (EN & FR)",
      "Email campaign design",
      "Social media assets",
      "Large-format event materials",
    ],
    colors: [
      { hex: "#595959", name: "Charcoal" },
      { hex: "#F5E132", name: "Lawyers Yellow" },
      { hex: "#1A5CA8", name: "Deep Blue" },
      { hex: "#0D8A6A", name: "Teal" },
    ],
    gallery: [
      { src: "/projects/lawyers-financial/branding.jpg", alt: "Brand Identity", caption: "Corporate identity system", placeholderBg: "#595959" },
      { src: "/projects/lawyers-financial/brochures.jpg", alt: "Print Brochures", caption: "Print collateral suite", placeholderBg: "#1A5CA8" },
      { src: "/projects/lawyers-financial/email.jpg", alt: "Email Campaign", caption: "Student-focused email campaigns", placeholderBg: "#0D8A6A" },
      { src: "/projects/lawyers-financial/banners.jpg", alt: "Event Banners", caption: "Large-format event materials", placeholderBg: "#595959" },
      { src: "/projects/lawyers-financial/digital-en.gif", alt: "Digital Ads EN", caption: "Display advertising — English", placeholderBg: "#F5E132" },
    ],
  },
];

export function getBrandDetail(slug: string): BrandProjectDetail | undefined {
  return brandDetails.find((d) => d.slug === slug);
}
