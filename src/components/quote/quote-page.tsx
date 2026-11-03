import { getLocale, getTranslations } from "next-intl/server";
import { QuoteSubmissionNotice } from "@/components/quote/quote-submission-notice";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { previewOutboundMailBlocked } from "@/lib/preview/protection";
import { canTransmitQuote } from "@/lib/quote/submission";
import { SiteShell } from "@/components/site-shell";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export async function QuotePageView() {
  const page = await getTranslations("Pages.quote");
  const t = await getTranslations("Quote");
  const locale = await getLocale();
  const deliveryEnabled = canTransmitQuote() && !previewOutboundMailBlocked();

  return (
    <SiteShell routeId="quote">
      <Section
        tone="light"
        labelledBy="quote-page-title"
        className="!pt-6 !pb-12 sm:!pt-8 sm:!pb-16 lg:!pt-10 lg:!pb-20"
      >
        <Container>
          <div className="mx-auto w-full min-w-0 max-w-[60rem] rounded-[0.625rem] border border-line-on-light bg-white px-4 py-6 shadow-[0_10px_36px_rgb(16_17_20/0.05)] sm:px-8 sm:py-8 lg:px-12 lg:py-12">
            <header>
              <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
              <h1 id="quote-page-title" className="type-h1 mt-3 max-w-2xl text-balance">
                {page("heading")}
              </h1>
              <p className="type-body mt-4 max-w-2xl text-text-muted-on-light">{t("intro.description")}</p>
            </header>
            {deliveryEnabled ? null : (
              <div className="mt-6">
                <QuoteSubmissionNotice />
              </div>
            )}
            <div className="mt-8 min-w-0">
              <QuoteWizard key={locale} deliveryEnabled={deliveryEnabled} />
            </div>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
