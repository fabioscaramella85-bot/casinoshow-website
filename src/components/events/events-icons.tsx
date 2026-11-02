import type { ReactNode } from "react";

type IconName = "spark" | "guests" | "croupier" | "layout" | "table" | "sliders" | "check";

const glyphs: Record<IconName, ReactNode> = {
  spark: (
    <>
      <path d="M12 3.5 13.4 8 18 9.4 13.4 10.8 12 15.3 10.6 10.8 6 9.4 10.6 8 12 3.5z" />
      <path d="M18.2 14.2 18.8 16 20.6 16.6 18.8 17.2 18.2 19 17.6 17.2 15.8 16.6 17.6 16 18.2 14.2z" />
    </>
  ),
  guests: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3.2" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a3.2 3.2 0 0 1 0 6.2" />
    </>
  ),
  croupier: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="3.2" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M9.5 20.5v-11" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M3 11h18" />
      <path d="M8 6v12" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21V14" />
      <path d="M4 10V3" />
      <path d="M12 21V12" />
      <path d="M12 8V3" />
      <path d="M20 21V16" />
      <path d="M20 12V3" />
      <path d="M2 14h4" />
      <path d="M10 8h4" />
      <path d="M18 16h4" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
};

export function EventIcon({ name }: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="ev-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyphs[name]}
    </svg>
  );
}
