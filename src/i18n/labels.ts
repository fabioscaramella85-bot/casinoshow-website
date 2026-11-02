import { getTranslations } from "next-intl/server";
import type { RouteId } from "./routes";

export async function getNavLabels(): Promise<Record<RouteId, string>> {
  const t = await getTranslations("Nav");

  return {
    home: t("home"),
    events: t("events"),
    games: t("games"),
    gallery: t("gallery"),
    about: t("about"),
    contact: t("contact"),
    quote: t("quote"),
    careers: t("careers"),
  };
}
