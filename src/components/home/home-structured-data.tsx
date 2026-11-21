import { getLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { absoluteLocalizedUrl } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";
import { CANONICAL_ORIGIN } from "@/i18n/site";

/**
 * Registered office of the company, not a public counter.
 * The commercial brand stays Casino Show; the legal entity stays Immoevents360 Sagl.
 */
export async function HomeStructuredData() {
  const locale = await getLocale();
  if (!hasLocale(routing.locales, locale)) return null;

  const home = await getTranslations("Pages.home");
  const games = await getTranslations("GameLandings");
  const pageUrl = absoluteLocalizedUrl("home", locale);
  const organizationId = `${CANONICAL_ORIGIN}/#organization`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Casino Show",
        legalName: "Immoevents360 Sagl",
        url: CANONICAL_ORIGIN,
        email: "info@casinoshow.ch",
        telephone: "+41 76 527 71 78",
        identifier: {
          "@type": "PropertyValue",
          name: "UID",
          value: "CHE-139.225.071",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via Carona 47",
          postalCode: "6815",
          addressLocality: "Melide",
          addressCountry: "CH",
        },
        brand: {
          "@type": "Brand",
          name: "Casino Show",
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: home("heading"),
        description: home("description"),
        serviceType: games("serviceType"),
        url: pageUrl,
        provider: { "@id": organizationId },
        areaServed: {
          "@type": "Country",
          name: games("areaServed"),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
