import { AboutPageView } from "@/components/about/about-page";
import { getPageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getPageMetadata("about");
}

export default function AboutPage() {
  return <AboutPageView />;
}
