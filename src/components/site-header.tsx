import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AboutNav } from "@/components/about-nav";
import { GamesNav } from "@/components/games-nav";
import { BrandLogo } from "@/components/brand-logo";
import { HeaderFrame } from "@/components/header-frame";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { HeaderSocialButtons } from "@/components/social/header-social";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/social/icons";
import { contactDetails } from "@/config/contact";
import {
  facebookShortName,
  facebookUrl,
  instagramName,
  instagramUrl,
  whatsappUrl,
} from "@/config/social";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getNavLabels } from "@/i18n/labels";
import { Link } from "@/i18n/navigation";
import { gameLandingNavOrder, type GameLandingId } from "@/i18n/game-landings";
import {
  primaryNavRouteIds,
  routePathnames,
  type ShellRouteId,
} from "@/i18n/routes";

type SiteHeaderProps = {
  routeId: ShellRouteId | null;
};

const desktopNavRouteIds = primaryNavRouteIds.filter((id) => id !== "home");
const mobileNavRouteIds = primaryNavRouteIds.flatMap((id) =>
  id === "about" ? ([id, "careers"] as const) : [id],
);

const navLinkClass =
  "inline-flex min-h-11 items-center whitespace-nowrap px-1.5 font-sans text-[0.8125rem] font-medium uppercase leading-[1.3] text-midnight/75 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-midnight data-[active=true]:text-brand-green data-[active=true]:shadow-[inset_0_-2px_0_0_var(--color-brand-green)]";

export async function SiteHeader({ routeId }: SiteHeaderProps) {
  const shell = await getTranslations("Shell");
  const social = await getTranslations("Social");
  const labels = await getNavLabels();
  const landings = await getTranslations("GameLandings");
  const gameNames = Object.fromEntries(
    gameLandingNavOrder.map((id) => [id, landings(`${id}.name`)]),
  ) as Record<GameLandingId, string>;
  const whatsappHref = whatsappUrl(social("whatsappMessage"));

  const links = desktopNavRouteIds.map((id) => {
    if (id === "about") {
      return (
        <AboutNav
          key={id}
          aboutLabel={labels.about}
          careersLabel={labels.careers}
          menuLabel={shell("aboutMenu")}
          linkClass={navLinkClass}
          aboutCurrent={routeId === "about"}
          careersCurrent={routeId === "careers"}
        />
      );
    }

    if (id === "games") {
      return (
        <GamesNav
          key={id}
          variant="desktop"
          label={labels.games}
          overviewLabel={landings("overview")}
          menuLabel={landings("menu")}
          menuCloseLabel={landings("menuClose")}
          names={gameNames}
          linkClass={navLinkClass}
          sectionCurrent={routeId === "games"}
        />
      );
    }

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
      <Container className="relative flex flex-nowrap items-center gap-x-4 py-1.5">
        <BrandLogo variant="header" label={shell("logoLabel")} />
        <nav
          aria-label={shell("primaryNav")}
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center xl:flex"
        >
          {links}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden xl:block">
            <LanguageSwitcher routeId={routeId} />
          </div>
          <div className="hidden xl:block">
            <HeaderSocialButtons />
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
              {mobileNavRouteIds.map((id) => {
                if (id === "games") {
                  return (
                    <GamesNav
                      key={id}
                      variant="mobile"
                      label={labels.games}
                      overviewLabel={landings("overview")}
                      menuLabel={landings("menu")}
                      menuCloseLabel={landings("menuClose")}
                      names={gameNames}
                      linkClass={navLinkClass}
                      sectionCurrent={routeId === "games"}
                    />
                  );
                }

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
            </nav>
            <div className="border-t border-line-on-light px-4 py-4">
              <p className="type-eyebrow text-gold-ink">{social("follow")}</p>
              <ul className="mt-2">
                <li>
                  <ExternalSocialLink
                    href={instagramUrl}
                    label={`${social("instagram")} – ${instagramName}`}
                    newTab={shell("newTab")}
                    icon={<InstagramIcon />}
                    iconClass="bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)]"
                  />
                </li>
                <li>
                  <ExternalSocialLink
                    href={facebookUrl}
                    label={`${social("facebook")} – ${facebookShortName}`}
                    newTab={shell("newTab")}
                    icon={<FacebookIcon />}
                    iconClass="bg-[#1877F2]"
                  />
                </li>
                <li>
                  <ExternalSocialLink
                    href={whatsappHref}
                    label={`${social("whatsapp")} – ${contactDetails.phone}`}
                    newTab={shell("newTab")}
                    icon={<WhatsAppIcon />}
                    iconClass="bg-[#25D366]"
                  />
                </li>
              </ul>
              <Button
                href={routePathnames.quote}
                ariaCurrent={routeId === "quote" ? "page" : undefined}
                className="mt-4 w-full"
              >
                {labels.quote}
              </Button>
            </div>
          </MobileNav>
        </div>
      </Container>
    </HeaderFrame>
  );
}

function ExternalSocialLink({
  href,
  label,
  newTab,
  icon,
  iconClass,
}: {
  href: string;
  label: string;
  newTab: string;
  icon: ReactNode;
  iconClass: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-3 font-sans text-sm text-midnight"
    >
      <span className={`inline-flex size-9 items-center justify-center rounded-full text-white ${iconClass}`}>
        {icon}
      </span>
      {label}
      <span className="sr-only"> ({newTab})</span>
    </a>
  );
}
