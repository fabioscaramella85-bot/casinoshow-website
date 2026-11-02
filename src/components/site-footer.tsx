import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/ui/container";
import { enabledContactChannels } from "@/config/contact";
import { legalContentPublished } from "@/config/legal";
import { facebookUrl, instagramUrl, whatsappUrl } from "@/config/social";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/social/icons";
import { Link } from "@/i18n/navigation";
import { gameLandingHref, gameLandingNavOrder } from "@/i18n/game-landings";
import { legalPathnames, routePathnames, type LegalRouteId } from "@/i18n/routes";

const copyrightYear = 2026;

const legalRouteIds = ["privacy", "cookies", "legalNotice"] as const satisfies readonly LegalRouteId[];

const footerColumns = [
  { heading: "discover", ids: ["home", "about", "careers", "gallery"] },
  { heading: "experiences", ids: ["events", "games"] },
  { heading: "contact", ids: ["contact", "quote"] },
] as const;

const footerLinkClass =
  "inline-flex min-h-11 items-center text-sm text-ivory transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-brand-gold";

const gamesSectionLinks = [
  { hash: "other-games", label: "other.eyebrow" },
  { hash: "extras", label: "extras.eyebrow" },
] as const;

export async function SiteFooter() {
  const shell = await getTranslations("Shell");
  const footer = await getTranslations("Footer");
  const social = await getTranslations("Social");
  const games = await getTranslations("Games");
  const landings = await getTranslations("GameLandings");
  const channels = enabledContactChannels();
  const published = legalRouteIds.filter((id) => legalContentPublished[id]);

  return (
    <footer className="mt-auto bg-midnight text-ivory">
      <Container className="py-12 md:py-14">
        <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,2.4fr)] xl:gap-x-14">
          <div>
            <BrandLogo variant="footer" label={shell("logoLabel")} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-muted-on-dark">{footer("brand")}</p>
            <ul className="mt-3">
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a href={channel.href} className={footerLinkClass}>
                    {channel.value}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrl(social("whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  {social("whatsapp")}
                  <span className="sr-only"> ({shell("newTab")})</span>
                </a>
              </li>
            </ul>
            <ul className="mt-4 flex gap-3">
              {instagramUrl ? (
                <li>
                  <FooterSocialIcon
                    href={instagramUrl}
                    label={social("instagram")}
                    newTab={shell("newTab")}
                    className="bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)]"
                    icon={<InstagramIcon />}
                  />
                </li>
              ) : null}
              {facebookUrl ? (
                <li>
                  <FooterSocialIcon
                    href={facebookUrl}
                    label={social("facebook")}
                    newTab={shell("newTab")}
                    className="bg-[#1877F2]"
                    icon={<FacebookIcon />}
                  />
                </li>
              ) : null}
              <li>
                <FooterSocialIcon
                  href={whatsappUrl(social("whatsappMessage"))}
                  label={social("whatsapp")}
                  newTab={shell("newTab")}
                  className="bg-[#25D366]"
                  icon={<WhatsAppIcon />}
                />
              </li>
            </ul>
          </div>

          <nav aria-label={shell("footerNav")} className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h2 className="font-sans text-xs font-semibold uppercase leading-snug tracking-[0.14em] text-brand-gold">
                  {footer(`columns.${column.heading}`)}
                </h2>
                <ul className="mt-3">
                  {column.ids.map((id) => (
                    <li key={id}>
                      <Link href={routePathnames[id]} className={footerLinkClass}>
                        {footer(`nav.${id}`)}
                      </Link>
                    </li>
                  ))}
                  {column.heading === "experiences"
                    ? gamesSectionLinks.map((item) => (
                        <li key={item.hash}>
                          <Link
                            href={{ pathname: routePathnames.games, hash: item.hash }}
                            className={footerLinkClass}
                          >
                            {games(item.label)}
                          </Link>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase leading-snug tracking-[0.14em] text-brand-gold">
                {footer("columns.rentals")}
              </h2>
              <ul className="mt-3">
                {gameLandingNavOrder.map((id) => (
                  <li key={id}>
                    <Link href={gameLandingHref[id]} className={footerLinkClass}>
                      {landings(`${id}.name`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <hr className="mt-8 h-px border-0 bg-line-on-dark" />

        <div
          data-legal-publication={published.length > 0 ? "published" : "unpublished"}
          className="flex flex-col items-center gap-1 pt-5 text-center xl:flex-row xl:items-center xl:gap-8 xl:text-left"
        >
          <p className="text-sm text-text-muted-on-dark xl:min-w-0 xl:flex-1">
            {shell("copyright", { year: copyrightYear })}
          </p>
          {published.length > 0 ? (
            <nav aria-label={footer("legalNav")} className="max-w-full xl:shrink">
              <ul className="flex flex-wrap items-center justify-center">
                {published.map((id, index) => (
                  <li key={id} className="inline-flex items-center">
                    {index > 0 ? (
                      <span aria-hidden="true" className="px-2 text-sm text-text-muted-on-dark">
                        ·
                      </span>
                    ) : null}
                    <Link
                      href={legalPathnames[id]}
                      className="inline-flex min-h-11 items-center px-1 text-sm text-ivory transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-brand-gold"
                    >
                      {footer(`legal.${id}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <p className="text-sm text-text-muted-on-dark xl:min-w-0 xl:flex-1 xl:text-right">
            {shell("creditLead")}{" "}
            <a
              href="https://www.linkedin.com/in/fabio-scaramella"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-ivory underline decoration-brand-gold/70 underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-brand-gold"
            >
              Fabio Scaramella
              <span className="sr-only"> ({shell("newTab")})</span>
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterSocialIcon({
  href,
  label,
  newTab,
  className,
  icon,
}: {
  href: string;
  label: string;
  newTab: string;
  className: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (${newTab})`}
      className={`inline-flex size-11 items-center justify-center rounded-full text-white ${className}`}
    >
      {icon}
    </a>
  );
}
