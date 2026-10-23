import { LegalPlaceholder } from "@/components/legal/legal-placeholder";
import { getLegalMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getLegalMetadata("legalNotice");
}

export default function LegalNoticePage() {
  return <LegalPlaceholder routeId="legalNotice" />;
}
