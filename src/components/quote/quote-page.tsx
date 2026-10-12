import { getLocale, getTranslations } from "next-intl/server";
import { QuoteHero } from "@/components/quote/quote-hero";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { SiteShell } from "@/components/site-shell";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export async function QuotePageView() {
  const t = await getTranslations("Quote");
  const locale = await getLocale();

  return (
    <SiteShell routeId="quote">
      <QuoteHero />
      <Section tone="light" label={t("wizard.label")}>
        <Container>
          <div className="mx-auto w-full max-w-3xl">
            <QuoteWizard key={locale} />
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
