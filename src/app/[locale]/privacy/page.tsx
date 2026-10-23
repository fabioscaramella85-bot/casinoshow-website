import { LegalPlaceholder } from "@/components/legal/legal-placeholder";
import { getLegalMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getLegalMetadata("privacy");
}

export default function PrivacyPage() {
  return <LegalPlaceholder routeId="privacy" />;
}
