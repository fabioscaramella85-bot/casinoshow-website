import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing } from "./routing";
import type { Locale } from "./routes";

async function loadMessages(locale: Locale) {
  switch (locale) {
    case "it":
      return (await import("../messages/it.json")).default;
    case "de":
      return (await import("../messages/de.json")).default;
    case "fr":
      return (await import("../messages/fr.json")).default;
    case "en":
      return (await import("../messages/en.json")).default;
  }
}

export default getRequestConfig(async ({ locale }) => {
  let resolved = locale;

  if (!resolved) {
    const paramValue = await rootParams.locale();
    if (typeof paramValue === "string") {
      resolved = paramValue;
    }
  }

  if (!resolved || !hasLocale(routing.locales, resolved)) {
    notFound();
  }

  return {
    locale: resolved,
    messages: await loadMessages(resolved),
  };
});
