"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid #222222" }}>
      {/* Main footer body */}
      <div className="px-8 md:px-16 lg:px-24 py-20 grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Left — identity */}
        <div>
          <p
            className="font-poppins font-[300] mb-3 leading-none"
            style={{ fontSize: "clamp(1.4rem, 2vw, 1.8rem)", color: "#DDDDDD" }}
          >
            Tiffany Zhang
          </p>
          <p className="font-poppins font-[300] text-[0.78rem] leading-[1.7]" style={{ maxWidth: "14rem", color: "#666666" }}>
            Multidisciplinary Design
            <br />
            Vancouver, Canada
          </p>
        </div>

        {/* Center — navigation */}
        <div className="flex flex-col gap-4">
          <p className="font-poppins text-[0.6rem] tracking-[0.25em] uppercase mb-1" style={{ color: "#444444" }}>
            Navigate
          </p>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="link-hover font-poppins font-[300] text-[0.85rem] w-fit"
              style={{ color: "#AAAAAA" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right — contact */}
        <div className="flex flex-col gap-4">
          <p className="font-poppins text-[0.6rem] tracking-[0.25em] uppercase mb-1" style={{ color: "#444444" }}>
            Contact
          </p>
          <a
            href="mailto:ruoningz@outlook.com"
            className="link-hover font-poppins font-[300] text-[0.85rem] w-fit"
            style={{ color: "#AAAAAA" }}
          >
            ruoningz@outlook.com
          </a>
          <p className="font-poppins font-[300] text-[0.78rem]" style={{ color: "#555555" }}>
            Open to freelance & full-time
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between" style={{ borderTop: "1px solid #1a1a1a" }}>
        <p className="font-poppins font-[300] text-[0.72rem] tracking-[0.08em]" style={{ color: "#444444" }}>
          © {year} Tiffany Zhang. All rights reserved.
        </p>
        <p className="font-poppins font-[300] text-[0.72rem] tracking-[0.06em]" style={{ color: "#444444" }}>
          Designed & built with intent.
        </p>
      </div>
    </footer>
  );
}
