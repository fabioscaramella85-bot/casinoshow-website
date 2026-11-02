import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalMetadata } from "@/i18n/metadata";

export function generateMetadata() {
  return getLegalMetadata("legalNotice");
}

export default function LegalNoticePage() {
  return <LegalDocument routeId="legalNotice" />;
}
