import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getLegalMetadata("cookies");
}

export default function CookiesPage() {
  return <LegalDocument routeId="cookies" />;
}
