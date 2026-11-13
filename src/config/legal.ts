import type { LegalRouteId } from "@/i18n/routes";

/**
 * Necessary switch for one legal page.
 * The page stays unpublished until approved public copy exists in every locale.
 * Turning a flag on does not show a form and does not send email.
 */
export const legalContentPublished: Record<LegalRouteId, boolean> = {
  privacy: false,
  cookies: false,
  legalNotice: false,
};

export function isLegalContentPublished(routeId: LegalRouteId): boolean {
  return legalContentPublished[routeId] === true;
}
