import type { LegalRouteId } from "@/i18n/routes";

/**
 * Publication switch for one legal page.
 * The public copy is shown when the flag is on and every locale is publishable.
 * Turning a flag on does not show a form and does not send email.
 */
export const legalContentPublished: Record<LegalRouteId, boolean> = {
  privacy: true,
  cookies: true,
  legalNotice: true,
};

export function isLegalContentPublished(routeId: LegalRouteId): boolean {
  return legalContentPublished[routeId] === true;
}
