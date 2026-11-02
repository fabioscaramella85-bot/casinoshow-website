import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CareersPageView } from "@/components/careers/careers-page";
import { getPageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata("careers");
  const t = await getTranslations("Pages.careers");
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

export default function CareersPage() {
  return <CareersPageView />;
}
