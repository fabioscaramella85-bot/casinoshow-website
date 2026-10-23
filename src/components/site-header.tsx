import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderFrame } from "@/components/header-frame";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getNavLabels } from "@/i18n/labels";
import { Link } from "@/i18n/navigation";
import {
  primaryNavRouteIds,
  routePathnames,
  type ShellRouteId,
} from "@/i18n/routes";

type SiteHeaderProps = {
  routeId: ShellRouteId | null;
};

const navLinkClass =
  "inline-flex min-h-11 items-center whitespace-nowrap px-1.5 font-sans text-[0.8125rem] font-medium uppercase leading-[1.3] text-midnight/75 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-midnight data-[active=true]:text-brand-green data-[active=true]:shadow-[inset_0_-2px_0_0_var(--color-brand-green)] xl:px-2";

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
      <Container className="relative flex flex-wrap items-center gap-x-3 gap-y-2 py-1.5">
        <BrandLogo variant="header" label={shell("logoLabel")} />
        <nav
          aria-label={shell("primaryNav")}
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-center xl:flex"
        >
          {links}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden xl:block">
            <LanguageSwitcher routeId={routeId} />
          </div>
          <div className="hidden xl:block">
            <Button
              href={routePathnames.quote}
              ariaCurrent={routeId === "quote" ? "page" : undefined}
            >
              {labels.quote}
            </Button>
          </div>
          <MobileNav openLabel={shell("menuOpen")} closeLabel={shell("menuClose")}>
            <div className="border-b border-line-on-light px-4 py-3">
              <p className="type-eyebrow text-gold-ink">{shell("languageNav")}</p>
              <LanguageSwitcher routeId={routeId} align="start" placement="flow" />
            </div>
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
