"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transitionRef } from "@/lib/transition";

const links = [
  { href: "/",      label: "Home"  },
  { href: "/work",  label: "Work"  },
  { href: "/about", label: "About" },
];

function easeIO(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Nav() {
  const logoRef   = useRef<HTMLAnchorElement>(null);
  const navRef    = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const rafRef    = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const rawP = Math.min(3, Math.max(0, transitionRef.progress));
      let t: number;
      if (rawP <= 1)      t = easeIO(rawP);
      else if (rawP <= 2) t = easeIO(2 - rawP);
      else                t = easeIO(rawP - 2);

      const ch    = Math.round(51 + (221 - 51) * t);
      const color = `rgb(${ch},${ch},${ch})`;
      const bgCh  = Math.round(247 - (247 - 17) * t);
      const bg    = `rgba(${bgCh},${bgCh},${bgCh},0.85)`;

      if (logoRef.current)  logoRef.current.style.color = color;
      if (navRef.current) {
        navRef.current.querySelectorAll("a").forEach(el => {
          (el as HTMLElement).style.color = color;
        });
      }
      if (headerRef.current) headerRef.current.style.background = bg;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        <div
          style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}
          className="px-8 py-6"
        >
          {/* Logo — left */}
          <Link
            ref={logoRef}
            href="/"
            className="link-hover font-poppins font-[300] text-[0.92rem] tracking-[0.04em]"
            style={{ color: "#333" }}
          >
            Tiffany Zhang
          </Link>

          {/* Nav links — absolutely centered — desktop only */}
          <nav className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            <div ref={navRef} className="flex items-center gap-10 pointer-events-auto">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="link-hover font-poppins text-[0.69rem] font-[400] tracking-[0.16em] uppercase"
                  style={{ color: "#333", padding: "0.5rem 0.6rem", margin: "-0.5rem -0.6rem" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[210]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "#333",
                transition: "transform 0.28s ease, opacity 0.2s ease",
                transformOrigin: "center",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "#333",
                transition: "opacity 0.2s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "#333",
                transition: "transform 0.28s ease, opacity 0.2s ease",
                transformOrigin: "center",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              position:        "fixed",
              inset:           0,
              zIndex:          200,
              background:      "rgba(247,247,247,0.97)",
              backdropFilter:  "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display:         "flex",
              flexDirection:   "column",
              alignItems:      "center",
              justifyContent:  "center",
              gap:             "2.5rem",
            }}
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily:    "var(--font-poppins), system-ui, sans-serif",
                  fontSize:      "1.5rem",
                  fontWeight:    300,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         "#222222",
                  textDecoration:"none",
                }}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
