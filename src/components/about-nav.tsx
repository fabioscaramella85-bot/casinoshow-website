"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routePathnames } from "@/i18n/routes";

type AboutNavProps = {
  aboutLabel: string;
  careersLabel: string;
  menuLabel: string;
  linkClass: string;
  aboutCurrent: boolean;
  careersCurrent: boolean;
};

export function AboutNav({
  aboutLabel,
  careersLabel,
  menuLabel,
  linkClass,
  aboutCurrent,
  careersCurrent,
}: AboutNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative inline-flex items-center">
      <Link
        href={routePathnames.about}
        aria-current={aboutCurrent ? "page" : undefined}
        data-active={aboutCurrent ? "true" : "false"}
        className={linkClass}
      >
        {aboutLabel}
      </Link>
      <details key={pathname} className="group relative">
        <summary
          aria-label={menuLabel}
          className="flex size-8 cursor-pointer list-none items-center justify-center text-midnight/70 marker:content-none hover:text-midnight [&::-webkit-details-marker]:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 group-open:rotate-180">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </summary>
        <div className="absolute top-[calc(100%+0.35rem)] left-0 z-50 min-w-56 border border-line-on-light bg-white py-1 text-midnight shadow-[0_12px_32px_rgb(16_17_20/0.12)]">
          <Link
            href={routePathnames.careers}
            aria-current={careersCurrent ? "page" : undefined}
            data-active={careersCurrent ? "true" : "false"}
            className="flex min-h-11 items-center px-4 font-sans text-sm text-midnight/80 hover:bg-midnight/5 hover:text-midnight data-[active=true]:text-brand-green"
          >
            {careersLabel}
          </Link>
        </div>
      </details>
    </div>
  );
}
