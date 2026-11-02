import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getLegalMetadata("privacy");
}

export default function PrivacyPage() {
  return <LegalDocument routeId="privacy" />;
}
