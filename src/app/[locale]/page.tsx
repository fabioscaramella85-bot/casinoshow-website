import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomePage } from "@/components/home/home-page";
import { HomeStructuredData } from "@/components/home/home-structured-data";
import { getPageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata("home");
  const home = await getTranslations("Pages.home");

  return {
    ...metadata,
    title: { absolute: `${home("heading")} · Casino Show` },
  };
}

export default function Page() {
  return (
    <>
      <HomeStructuredData />
      <HomePage />
    </>
  );
}
