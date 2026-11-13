import { getCareersMailConfig } from "../careers/mail";
import { isLegalRoutePublic } from "../legal/publication";
import { previewOutboundMailBlocked } from "../preview/protection";

/**
 * Quote delivery stays off unless CASINO_SHOW_QUOTE_DELIVERY is exactly "enabled".
 * Published privacy and mail configuration are also required. Nothing here sends mail.
 */
export type QuoteSubmissionStatus = "unconfigured" | "ready" | "submitting" | "success" | "error";

export function quoteSendingEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CASINO_SHOW_QUOTE_DELIVERY === "enabled";
}

export function canTransmitQuote(
  env: NodeJS.ProcessEnv = process.env,
  privacyPublished: boolean = isLegalRoutePublic("privacy"),
): boolean {
  return (
    quoteSendingEnabled(env) &&
    !previewOutboundMailBlocked(env) &&
    privacyPublished &&
    getCareersMailConfig(env).ready
  );
}

export function quoteSubmissionStatus(env: NodeJS.ProcessEnv = process.env): QuoteSubmissionStatus {
  return canTransmitQuote(env) ? "ready" : "unconfigured";
}
