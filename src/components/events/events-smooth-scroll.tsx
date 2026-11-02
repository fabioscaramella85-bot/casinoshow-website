"use client";

import { useEffect } from "react";

export function EventsSmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";

    const onChange = () => {
      root.style.scrollBehavior = media.matches ? previous : "smooth";
    };
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      root.style.scrollBehavior = previous;
    };
  }, []);

  return null;
}
