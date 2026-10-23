import { LegalPlaceholder } from "@/components/legal/legal-placeholder";
import { getLegalMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getLegalMetadata("cookies");
}

export default function CookiesPage() {
  return <LegalPlaceholder routeId="cookies" />;
}
