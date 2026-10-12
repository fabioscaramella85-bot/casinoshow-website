import { HomePage } from "@/components/home/home-page";
import { getPageMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getPageMetadata("home");
}

export default function Page() {
  return <HomePage />;
}
