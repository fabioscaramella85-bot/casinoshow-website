import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CareersPageView } from "@/components/careers/careers-page";
import { getPageMetadata } from "@/i18n/metadata";
import { careersIntake } from "@/lib/careers/intake";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata("careers");
  const t = await getTranslations("Pages.careers");
  const title = t("title");
  const description = careersIntake() === "open" ? t("descriptionOpen") : t("description");

  return {
    ...metadata,
    title: { absolute: title },
    description,
    openGraph: {
      ...metadata.openGraph,
      title,
      description,
    },
    twitter: {
      ...metadata.twitter,
      title,
      description,
    },
  };
}

export default function CareersPage() {
  return <CareersPageView />;
}
