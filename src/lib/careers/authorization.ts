import { isLegalRoutePublic } from "../legal/publication";
import { previewOutboundMailBlocked } from "../preview/protection";

/** Exact value only. Absent or any other value keeps the form unauthorized. */
export function careersFormAuthorized(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CASINO_SHOW_CAREERS_FORM === "enabled";
}

/** Exact value only. Absent or any other value keeps delivery off. */
export function careersDeliveryEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CASINO_SHOW_CAREERS_DELIVERY === "enabled";
}

/**
 * Mail configuration is checked separately.
 * privacyPublished is injected by tests; production reads the public privacy document.
 */
export function careersSendAuthorized(
  env: NodeJS.ProcessEnv = process.env,
  privacyPublished: boolean = isLegalRoutePublic("privacy"),
): boolean {
  return (
    !previewOutboundMailBlocked(env) &&
    privacyPublished &&
    careersFormAuthorized(env) &&
    careersDeliveryEnabled(env)
  );
}
