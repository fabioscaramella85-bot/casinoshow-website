import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";
import { getNavLabels } from "@/i18n/labels";
import { Link } from "@/i18n/navigation";
import { primaryNavRouteIds, routePathnames, type RouteId } from "@/i18n/routes";

type SiteFooterProps = {
  routeId: RouteId | null;
};

export async function SiteFooter({ routeId }: SiteFooterProps) {
  const shell = await getTranslations("Shell");
  const labels = await getNavLabels();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-midnight text-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr]">
        <div className="max-w-sm">
          <Wordmark label={shell("logoLabel")} />
          <p className="type-body mt-5 text-text-muted-on-dark">{shell("brand")}</p>
        </div>
        <nav aria-label={shell("footerNav")}>
          <ul className="flex flex-col">
            {primaryNavRouteIds.map((id) => {
              const active = id === routeId;
              return (
                <li key={id}>
                  <Link
                    href={routePathnames[id]}
                    aria-current={active ? "page" : undefined}
                    data-active={active ? "true" : "false"}
                    className="type-nav inline-flex min-h-11 items-center text-ivory/80 transition-colors duration-[var(--duration-fast)] hover:text-ivory data-[active=true]:text-ivory data-[active=true]:shadow-[inset_0_-1px_0_0_var(--color-brand-gold)]"
                  >
                    {labels[id]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex flex-col items-start gap-6">
          <Button href={routePathnames.quote} ariaCurrent={routeId === "quote" ? "page" : undefined}>
            {labels.quote}
          </Button>
          <LanguageSwitcher routeId={routeId} />
          <div>
            <p className="type-eyebrow text-brand-gold">{shell("legalTitle")}</p>
            <p className="type-small mt-3 max-w-xs text-text-muted-on-dark">{shell("legal")}</p>
            <p className="type-small mt-4 text-text-muted-on-dark">
              {shell("copyright", { year })}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
