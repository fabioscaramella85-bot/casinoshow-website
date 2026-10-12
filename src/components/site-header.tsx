import { getTranslations } from "next-intl/server";
import { HeaderFrame } from "@/components/header-frame";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";
import { getNavLabels } from "@/i18n/labels";
import { Link } from "@/i18n/navigation";
import {
  primaryNavRouteIds,
  routePathnames,
  type RouteId,
} from "@/i18n/routes";

type SiteHeaderProps = {
  routeId: RouteId | null;
};

const navLinkClass =
  "type-nav inline-flex min-h-11 items-center whitespace-nowrap px-2 text-ivory/88 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ivory data-[active=true]:text-ivory data-[active=true]:shadow-[inset_0_-1px_0_0_var(--color-brand-gold)] xl:px-2.5";

export async function SiteHeader({ routeId }: SiteHeaderProps) {
  const shell = await getTranslations("Shell");
  const labels = await getNavLabels();

  const links = primaryNavRouteIds.map((id) => {
    const active = id === routeId;
    return (
      <Link
        key={id}
        href={routePathnames[id]}
        aria-current={active ? "page" : undefined}
        data-active={active ? "true" : "false"}
        className={navLinkClass}
      >
        {labels[id]}
      </Link>
    );
  });

  return (
    <HeaderFrame>
      <Container className="relative flex flex-wrap items-center gap-x-3 gap-y-2 py-3 lg:gap-6">
        <Wordmark label={shell("logoLabel")} />
        <nav
          aria-label={shell("primaryNav")}
          className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
        >
          {links}
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher routeId={routeId} />
          <div className="hidden xl:block">
            <Button
              href={routePathnames.quote}
              ariaCurrent={routeId === "quote" ? "page" : undefined}
            >
              {labels.quote}
            </Button>
          </div>
          <MobileNav openLabel={shell("menuOpen")} closeLabel={shell("menuClose")}>
            <nav aria-label={shell("primaryNav")} className="flex flex-col px-4 py-4">
              {primaryNavRouteIds.map((id) => {
                const active = id === routeId;
                return (
                  <Link
                    key={id}
                    href={routePathnames[id]}
                    aria-current={active ? "page" : undefined}
                    data-active={active ? "true" : "false"}
                    className={`${navLinkClass} w-full justify-start px-1`}
                  >
                    {labels[id]}
                  </Link>
                );
              })}
              <Button
                href={routePathnames.quote}
                ariaCurrent={routeId === "quote" ? "page" : undefined}
                className="mt-4 w-full"
              >
                {labels.quote}
              </Button>
            </nav>
          </MobileNav>
        </div>
      </Container>
    </HeaderFrame>
  );
}
