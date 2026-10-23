import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/ui/container";
import { enabledContactChannels } from "@/config/contact";
import { legalContentPublished } from "@/config/legal";
import { Link } from "@/i18n/navigation";
import { legalPathnames, routePathnames, type LegalRouteId } from "@/i18n/routes";

const copyrightYear = 2026;

const legalRouteIds = ["privacy", "cookies", "legalNotice"] as const satisfies readonly LegalRouteId[];

const footerColumns = [
  { heading: "discover", ids: ["home", "about", "gallery"] },
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
  const games = await getTranslations("Games");
  const legal = await getTranslations("Legal");
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
            </ul>
          </div>

          <nav aria-label={shell("footerNav")} className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
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
          </nav>
        </div>

        <div data-legal-publication={published.length > 0 ? "published" : "unpublished"}>
          {published.length > 0 ? (
            <ul className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-8">
              {published.map((id) => (
                <li key={id}>
                  <Link href={legalPathnames[id]} className={footerLinkClass}>
                    {legal(`${id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <hr className="mt-8 h-px border-0 bg-line-on-dark" />

        <div className="flex flex-col gap-1 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted-on-dark">{shell("copyright", { year: copyrightYear })}</p>
          <p className="text-sm text-text-muted-on-dark">
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
