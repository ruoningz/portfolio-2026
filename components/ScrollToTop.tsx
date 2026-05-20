"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { transitionRef } from "@/lib/transition";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    transitionRef.progress = 0;
    transitionRef.scrollY  = 0;
  }, [pathname]);

  return null;
}
