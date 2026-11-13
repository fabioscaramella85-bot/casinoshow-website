import { previewOutboundMailBlocked } from "../preview/protection";
import { careersSendAuthorized } from "./authorization";
import { getCareersMailConfig } from "./mail";

export type CareersIntake = "open" | "preview" | "unpublished";

/**
 * Preview shows the form and never accepts an application.
 * Production shows the form only when every send condition is already true.
 */
export function careersDeliveryAllowed(
  env: NodeJS.ProcessEnv = process.env,
  privacyPublished?: boolean,
): boolean {
  return careersSendAuthorized(env, privacyPublished) && getCareersMailConfig(env).ready;
}

export function careersIntake(
  env: NodeJS.ProcessEnv = process.env,
  privacyPublished?: boolean,
): CareersIntake {
  if (previewOutboundMailBlocked(env)) return "preview";
  if (careersDeliveryAllowed(env, privacyPublished)) return "open";
  return "unpublished";
}
