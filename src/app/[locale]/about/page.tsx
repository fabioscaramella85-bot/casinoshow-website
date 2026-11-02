import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPageView } from "@/components/about/about-page";
import { getPageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata("about");
  const t = await getTranslations("Pages.about");
  const title = t("title");

  return {
    ...metadata,
    title: { absolute: title },
    openGraph: {
      ...metadata.openGraph,
      title,
    },
  };
}

export default function AboutPage() {
  return <AboutPageView />;
}
