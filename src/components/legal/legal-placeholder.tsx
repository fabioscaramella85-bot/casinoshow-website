import { getTranslations } from "next-intl/server";
import { SiteShell } from "@/components/site-shell";
import { Container } from "@/components/ui/container";
import type { LegalRouteId } from "@/i18n/routes";

type LegalPlaceholderProps = {
  routeId: LegalRouteId;
};

export async function LegalPlaceholder({ routeId }: LegalPlaceholderProps) {
  const legal = await getTranslations("Legal");
  const copy = await getTranslations(`Legal.${routeId}`);

  return (
    <SiteShell routeId={routeId}>
      <article className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="type-eyebrow text-gold-ink">{legal("status")}</p>
            <h1 className="type-h1 mt-4 text-balance">{copy("title")}</h1>
            <p className="type-body mt-6 max-w-2xl text-text-muted-on-light">{copy("unavailable")}</p>
          </div>
        </Container>
      </article>
    </SiteShell>
  );
}
