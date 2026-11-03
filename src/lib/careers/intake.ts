import { isLegalContentPublished } from "../../config/legal";
import { previewOutboundMailBlocked } from "../preview/protection";
import { getCareersMailConfig } from "./mail";

export type CareersIntake = "open" | "preview" | "unpublished";

/**
 * Preview never accepts an application.
 * Production stays closed until the privacy document is published.
 * Mail configuration is required as well, and is enforced again before delivery.
 */
export function careersIntake(env: NodeJS.ProcessEnv = process.env): CareersIntake {
  if (previewOutboundMailBlocked(env)) return "preview";
  if (!isLegalContentPublished("privacy")) return "unpublished";
  return "open";
}

export function careersDeliveryAllowed(env: NodeJS.ProcessEnv = process.env): boolean {
  return careersIntake(env) === "open" && getCareersMailConfig(env).ready;
}
