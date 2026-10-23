import type { LegalRouteId } from "@/i18n/routes";

/**
 * Publication gate for legal pages.
 * A route may be linked from the footer only after its text is approved.
 */
export const legalContentPublished: Record<LegalRouteId, boolean> = {
  privacy: false,
  cookies: false,
  legalNotice: false,
};
