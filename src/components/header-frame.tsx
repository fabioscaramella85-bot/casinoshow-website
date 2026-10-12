"use client";

import { useEffect, useState, type ReactNode } from "react";

type HeaderFrameProps = {
  children: ReactNode;
};

export function HeaderFrame({ children }: HeaderFrameProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="sticky top-0 z-40 border-b border-transparent bg-midnight text-ivory transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-standard)] data-[scrolled=true]:border-line-on-dark data-[scrolled=true]:shadow-[var(--shadow-header)]"
    >
      {children}
    </header>
  );
}
