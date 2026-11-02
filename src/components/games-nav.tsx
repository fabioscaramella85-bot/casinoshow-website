"use client";

import { useId, useState, type ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useMobileMenu } from "@/components/mobile-nav";
import { gameLandingHref, gameLandingNavOrder, type GameLandingId } from "@/i18n/game-landings";
import { routePathnames } from "@/i18n/routes";

type GamesNavProps = {
  variant: "desktop" | "mobile";
  label: string;
  overviewLabel: string;
  menuLabel: string;
  menuCloseLabel: string;
  names: Record<GameLandingId, string>;
  linkClass: string;
  sectionCurrent: boolean;
};

const itemClass =
  "flex min-h-11 items-center px-4 font-sans text-sm text-midnight/80 hover:bg-midnight/5 hover:text-midnight data-[active=true]:text-brand-green";

export function GamesNav({
  variant,
  label,
  overviewLabel,
  menuLabel,
  menuCloseLabel,
  names,
  linkClass,
  sectionCurrent,
}: GamesNavProps) {
  const pathname = usePathname();
  const overviewCurrent = pathname === routePathnames.games;
  const { open: menuOpen } = useMobileMenu();
  const [expanded, setExpanded] = useState(false);
  const [trackedMenuOpen, setTrackedMenuOpen] = useState(menuOpen);
  const panelId = useId();

  if (variant === "mobile" && trackedMenuOpen !== menuOpen) {
    setTrackedMenuOpen(menuOpen);
    if (!menuOpen) {
      setExpanded(false);
    }
  }

  const links: ReactNode[] = gameLandingNavOrder.map((id) => {
    const href = gameLandingHref[id];
    const current = pathname === href;
    return (
      <Link
        key={id}
        href={href}
        aria-current={current ? "page" : undefined}
        data-active={current ? "true" : "false"}
        className={
          variant === "desktop"
            ? itemClass
            : "flex min-h-11 w-full items-center px-1 pl-4 font-sans text-sm text-midnight/75 hover:text-midnight data-[active=true]:text-brand-green"
        }
      >
        {names[id]}
      </Link>
    );
  });

  if (variant === "mobile") {
    return (
      <div>
        <div className="flex items-center">
          <Link
            href={routePathnames.games}
            aria-current={overviewCurrent ? "page" : undefined}
            data-active={sectionCurrent ? "true" : "false"}
            className={`${linkClass} min-w-0 flex-1 justify-start px-1`}
          >
            {label}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center text-midnight/70"
            aria-expanded={expanded}
            aria-controls={panelId}
            aria-label={expanded ? menuCloseLabel : menuLabel}
            onClick={() => setExpanded((current) => !current)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            >
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <ul id={panelId} hidden={!expanded} className="list-none">
          {gameLandingNavOrder.map((id, index) => (
            <li key={id}>{links[index]}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <Link
        href={routePathnames.games}
        aria-current={overviewCurrent ? "page" : undefined}
        data-active={sectionCurrent ? "true" : "false"}
        className={linkClass}
      >
        {label}
      </Link>
      <details
        key={pathname}
        className="group relative"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.currentTarget.open = false;
          }
        }}
      >
        <summary
          aria-label={menuLabel}
          className="flex size-8 cursor-pointer list-none items-center justify-center text-midnight/70 marker:content-none hover:text-midnight [&::-webkit-details-marker]:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 transition-transform group-open:rotate-180">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </summary>
        <div className="absolute top-[calc(100%+0.35rem)] left-0 z-50 min-w-64 border border-line-on-light bg-white py-1 text-midnight shadow-[0_12px_32px_rgb(16_17_20/0.12)]">
          <Link
            href={routePathnames.games}
            aria-current={overviewCurrent ? "page" : undefined}
            data-active={overviewCurrent ? "true" : "false"}
            className={itemClass}
          >
            {overviewLabel}
          </Link>
          {links}
        </div>
      </details>
    </div>
  );
}
